import React from "react";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";
import { useNavigate } from "react-router-dom";

import humidityIcon from "../../assets/icons/humidity.svg";
import pressureIcon from "../../assets/icons/pressure.svg";
import sunIcon from "../../assets/icons/sun.svg";
import waterIcon from "../../assets/icons/waterLevel.svg";
import "./stationInfoWindow.css";

const StationInfoWindow = ({
  station,
  defaultStation,
  setDefaultStation,
  ...props
}) => {
  const navigate = useNavigate();

  const onStationSelected = () => {
    setDefaultStation(station.id);
    navigate("/");
  };

  return (
    <InfoWindow {...props}>
      <div>
        <div className="stationInfo-header">
          <h1> {station.name} </h1>
        </div>

        <div className="stationInfo-body">
          <h2 className="stationInfo-temperature">
            {" "}
            {station.temperature} °C{" "}
          </h2>
          <div className="stationInfo-row">
            <div className="stationInfo-value">
              <img src={humidityIcon} alt="humidity" />
              <h2>{station.humidity}%</h2>
            </div>

            <div className="stationInfo-value">
              <img src={pressureIcon} alt="pressure" />
              <h2>{station.pressure} hPa</h2>
            </div>
          </div>

          <div className="stationInfo-row">
            <div className="stationInfo-value">
              <img src={waterIcon} alt="rain" />
              <h2>{station.waterLevel} cm</h2>
            </div>

            <div className="stationInfo-value">
              <img src={sunIcon} alt="light intensity" />
              <h2>{station.light} lux</h2>
            </div>
          </div>
        </div>

        {station.id !== defaultStation ? (
          <button
            className="stationInfo-setDefaultBtn"
            onClick={onStationSelected}
          >
            Set as default station
          </button>
        ) : (
          <p className="stationInfo-chip">This is your default station</p>
        )}
      </div>
    </InfoWindow>
  );
};

export default StationInfoWindow;
