import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import StationInfo from "./components/StationInfo/StationInfo";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./topInfoPanel.css";
import { padNumber } from "../../utils/numberUtils";
import NoStationSet from "./components/NoStationSet/NoStationSet";
import { Link } from "react-router-dom";
import mapIcon from "../../assets/icons/map.svg";

const TopInfoPanel = ({ defaultStation }) => {
  const [values, setValues] = useState({});
  const [dateTime, setDateTime] = useState({});
  const unSubscribe = useRef(null);

  const onSnap = (snapshot) => {
    const data = snapshot.data();
    setValues(data);
    localStorage.setItem("cachedValues", JSON.stringify(data));
  };

  useEffect(() => {
    const cachedValues = localStorage.getItem("cachedValues")
      ? JSON.parse(localStorage.getItem("cachedValues"))
      : {};
    setValues(cachedValues);

    updateDateTime();
    setInterval(updateDateTime, 1000);
  }, []);

  useEffect(() => {
    if (!defaultStation) return;

    if (unSubscribe.current) {
      unSubscribe.current();
    }

    unSubscribe.current = onSnapshot(
      doc(db, "stations", defaultStation),
      onSnap
    );
  }, [defaultStation]);

  const updateDateTime = () => {
    const formatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const current = new Date();
    const hours = padNumber(String(current.getHours() % 12 || 12), 2);
    const minutes = padNumber(String(current.getMinutes()), 2);
    const amPm = current.getHours() >= 12 ? "PM" : "AM";
    const dateString = current
      .toLocaleDateString("en-US", formatOptions)
      .replace(",", "");

    setDateTime({
      hours,
      minutes,
      amPm,
      dateString,
    });
  };

  return (
    <div className="topPanel">
      {defaultStation ? (
        <>
          <StationInfo values={values} />
        </>
      ) : (
        <NoStationSet />
      )}
      <div className="topPanel-dateTime">
        <h4 className="topPanel-dateTime_time">
          {dateTime.hours}:{dateTime.minutes}
          <span>{dateTime.amPm}</span>
        </h4>
        <h5 className="topPanel-dateTime_date">{dateTime.dateString}</h5>
      </div>

      <Link className="topPanel-mapBtn" to="/map">
        <img src={mapIcon} alt="Map" />
      </Link>
    </div>
  );
};

export default TopInfoPanel;
