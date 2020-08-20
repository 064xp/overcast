import React from "react";
import PropTypes from "prop-types";
import "./topInfoPanel.css";
import humidityIcon from "../../assets/icons/humidity.svg";
import pressureIcon from "../../assets/icons/pressure.svg";
import sunIcon from "../../assets/icons/sun.svg";
import waterIcon from "../../assets/icons/waterLevel.svg";

const TopInfoPanel = (props) => {
  return (
    <div className="topPanel">
      <div className="topPanel-tempLocation">
        <h1 id="topPanel-temperature">23°</h1>
        <h5 id="topPanel-location">Zapopan, Jalisco</h5>
      </div>
      <div className="topPanel-additionalValues">
        <div className="topPanel-additionalValues_value" title="Humidity">
          <img src={humidityIcon} alt="humidity" />
          <p>88%</p>
        </div>
        <div className="topPanel-additionalValues_value" title="Pressure">
          <img src={pressureIcon} alt="Pressure" />
          <p>1024 hpa</p>
        </div>
        <div
          className="topPanel-additionalValues_value"
          title="Rain Water Level"
        >
          <img src={waterIcon} alt="Rain Level" />
          <p>10 cm</p>
        </div>
        <div className="topPanel-additionalValues_value" title="Light level">
          <img src={sunIcon} alt="Light Level" />
          <p>1102 lux</p>
        </div>
      </div>
      <div className="topPanel-dateTime">
        <h4 className="topPanel-dateTime_time">
          2:30<span>PM</span>
        </h4>
        <h5 className="topPanel-dateTime_date">Wednesday 19 August 2020</h5>
      </div>
    </div>
  );
};

export default TopInfoPanel;
