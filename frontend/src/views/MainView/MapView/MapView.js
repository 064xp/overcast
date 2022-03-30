import React, { useEffect, useState } from "react";
import Map from "../../../components/Map/Map";
import { getStations } from "./query/stations";

const MapView = () => {
  const [stations, setStations] = useState([]);
  const mapURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPS_KEY}`;

  useEffect(() => {
    queryStations();
  }, []);

  const queryStations = async () => {
    const stations = await getStations();
    setStations(stations);
    console.log(stations);
  };

  return (
    <div>
      <Map
        googleMapURL={mapURL}
        containerElement={<div style={{ height: "100vh" }} />}
        mapElement={<div style={{ height: `100%` }} />}
        loadingElement={<p> Cargando mapa </p>}
        stations={stations}
      />
    </div>
  );
};

export default MapView;
