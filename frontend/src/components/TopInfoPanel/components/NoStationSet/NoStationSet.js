import React from "react";
import { Link } from "react-router-dom";
import PlusIcon from "../../../../assets/icons/plus-thick.svg";
import "./noStationSet.css";

const NoStationSet = () => {
  return (
    <div>
      <h2>No station selected</h2>
      <div className="noStation-button">
        <Link to="/map">
          <h3>Select a station</h3>
          <img src={PlusIcon} alt="Add station" />
        </Link>
      </div>
    </div>
  );
};

export default NoStationSet;
