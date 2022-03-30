import React, { useState, useEffect } from "react";
import "./App.css";
import MainView from "./views/MainView/MainView";
import MapView from "./views/MainView/MapView/MapView";
import { Routes, Route } from "react-router-dom";

function App() {
  const [defaultStation, setDefaultStation] = useState(null);
  useEffect(() => {
    // get station from localstorage
    const cachedStation = localStorage.getItem("defaultStation");
    setDefaultStation(cachedStation);
  }, []);

  const changeDefaultStation = (station) => {
    setDefaultStation(station);
    localStorage.setItem("defaultStation", station);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<MainView defaultStation={defaultStation} />}
        />
        <Route
          path="map"
          element={
            <MapView
              defaultStation={defaultStation}
              setDefaultStation={changeDefaultStation}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
