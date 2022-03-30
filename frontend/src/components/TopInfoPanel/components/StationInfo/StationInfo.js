import React from "react";
import humidityIcon from "../../../../assets/icons/humidity.svg";
import pressureIcon from "../../../../assets/icons/pressure.svg";
import sunIcon from "../../../../assets/icons/sun.svg";
import waterIcon from "../../../../assets/icons/waterLevel.svg";
import "../../topInfoPanel.css";

const StationInfo = ({ values }) => {
  return (
    <div className="topPanel-mainContainer">
      <div className="topPanel-tempLocation">
        <h1 id="topPanel-temperature">{values.temperature}°C</h1>
        {/* <h5 id="topPanel-location">Zapopan, Jalisco</h5> */}
        <h5 id="topPanel-location">{values.name}</h5>
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
          <p>{values.waterLevel} mm</p>
        </div>
        <div className="topPanel-additionalValues_value" title="Light level">
          <img src={sunIcon} alt="Light Level" />
          <p>{values.light} lux</p>
        </div>
      </div>
    </div>
  );
};

export default StationInfo;
