import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";
import StationInfoWindow from "../StationInfoWindow/StationInfoWindow";

const Map = ({ stations, defaultStation, setDefaultStation, ...props }) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const defaultCenter = { lat: 20.663812, lng: -103.418752 };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const mapOptions = {
    clickableIcons: false,
    disableDefaultUI: true,
  };

  return (
    <>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={defaultCenter}
        defaultTilt={45}
        options={mapOptions}
        onClick={() => setActiveMarker(null)}
      >
        {stations.map((station) => {
          const { id, location } = station;
          return (
            <Marker
              key={id}
              position={{ lat: location._lat, lng: location._long }}
              onClick={() => handleActiveMarker(id)}
            >
              {activeMarker === id ? (
                <StationInfoWindow
                  station={station}
                  onCloseClick={() => setActiveMarker(null)}
                  defaultStation={defaultStation}
                  setDefaultStation={setDefaultStation}
                />
              ) : null}
            </Marker>
          );
        })}
      </GoogleMap>
    </>
  );
};

export default withScriptjs(withGoogleMap(Map));
