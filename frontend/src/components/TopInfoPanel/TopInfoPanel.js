import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { latestRef } from "../../firebase/firebase";
import "./topInfoPanel.css";
import humidityIcon from "../../assets/icons/humidity.svg";
import pressureIcon from "../../assets/icons/pressure.svg";
import sunIcon from "../../assets/icons/sun.svg";
import waterIcon from "../../assets/icons/waterLevel.svg";

const TopInfoPanel = (props) => {
  const [values, setValues] = useState({});
  const [dateTime, setDateTime] = useState({});

  useEffect(() => {
    latestRef.onSnapshot((doc) => {
      setValues(doc.data());
    });

    updateDateTime();
    setInterval(updateDateTime, 1000);
  }, []);

  const updateDateTime = () => {
    const formatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const current = new Date();
    const hours = String(current.getHours() % 12 || 12);
    const minutes = String(current.getMinutes());
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
      <div className="topPanel-tempLocation">
        <h1 id="topPanel-temperature">{values.temperature}°</h1>
        <h5 id="topPanel-location">Zapopan, Jalisco</h5>
      </div>
      <div className="topPanel-additionalValues">
        <div className="topPanel-additionalValues_value" title="Humidity">
          <img src={humidityIcon} alt="humidity" />
          <p>{values.humidity}%</p>
        </div>
        <div className="topPanel-additionalValues_value" title="Pressure">
          <img src={pressureIcon} alt="Pressure" />
          <p>{values.pressure} hpa</p>
        </div>
        <div
          className="topPanel-additionalValues_value"
          title="Rain Water Level"
        >
          <img src={waterIcon} alt="Rain Level" />
          <p>{values.waterLevel} cm</p>
        </div>
        <div className="topPanel-additionalValues_value" title="Light level">
          <img src={sunIcon} alt="Light Level" />
          <p>{values.light} lux</p>
        </div>
      </div>
      <div className="topPanel-dateTime">
        <h4 className="topPanel-dateTime_time">
          {dateTime.hours}:{dateTime.minutes}
          <span>{dateTime.amPm}</span>
        </h4>
        <h5 className="topPanel-dateTime_date">{dateTime.dateString}</h5>
      </div>
    </div>
  );
};

export default TopInfoPanel;
