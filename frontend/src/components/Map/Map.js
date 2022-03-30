import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
import StationInfoWindow from "../StationInfoWindow/StationInfoWindow";
// import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

const markers = [
  {
    id: 1,
    name: "Casa de Gerardo",
    position: {
      lat: 20.69416,
      lng: -103.41468,
    },
    datos: {
      temperatura: 19,
      humedad: 60,
      mm: 1.3,
      presion: 1024,
      intensidad: 45,
    },
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 },
    datos: {
      temperatura: 25,
      humedad: 40,
      mm: 2.1,
      presion: 1100,
      intensidad: 55,
    },
  },
];

const Map = ({ stations, ...props }) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const defaultCenter = { lat: 20.663812, lng: -103.418752 };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <>
      <GoogleMap defaultZoom={12} defaultCenter={defaultCenter}>
        {stations.map(({ id, name, location, ...data }) => (
          <Marker
            key={id}
            position={{ lat: location._lat, lng: location._long }}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <StationInfoWindow
                name={name}
                data={data}
                onCloseClick={() => setActiveMarker(null)}
              />
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </>
  );
};

export default withScriptjs(withGoogleMap(Map));
