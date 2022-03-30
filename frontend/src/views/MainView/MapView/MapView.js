import React, { useEffect, useState } from "react";
import Map from "../../../components/Map/Map";
import { getStations } from "./query/stations";
import "./style.css";
import arrowLeftIcon from "../../../assets/icons/arrow-left.svg";
import { Link } from "react-router-dom";

const MapView = ({ defaultStation, setDefaultStation }) => {
  const testStations = [
    {
      id: "AIDPK2SOU4ZUWamXkOLp",
      temperature: 24.86,
      pressure: 835.47,
      light: 148.33,
      timeStamp: { seconds: 1648347328, nanoseconds: 756000000 },
      humidity: 22.11,
      location: { _lat: 20.657306, _long: -103.429217 },
      name: "Estación de Paulo",
      waterLevel: 4,
    },
  ];
  const [stations, setStations] = useState(testStations);
  const mapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_KEY}`;

  useEffect(() => {
    queryStations();
  }, []);

  const queryStations = async () => {
    const stations = await getStations();
    console.log(stations);
    setStations(stations);
  };

  return (
    <div>
      <header className="mapHeader">
        <Link to={"/"} className="mapView-backLink">
          <img src={arrowLeftIcon} className="mapView-backBtn" />
        </Link>
        <div>
          <h1 className="mapHeader_title">Station Map</h1>
          <h3 className="mapHeader_subtitle">Choose a default station</h3>
        </div>
      </header>
      <Map
        googleMapURL={mapURL}
        containerElement={<div style={{ height: "100vh" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<p> Cargando mapa </p>}
        stations={stations}
        defaultStation={defaultStation}
        setDefaultStation={setDefaultStation}
      />
    </div>
  );
};

export default MapView;
