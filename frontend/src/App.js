import React, { useState, useEffect } from "react";
import "./App.css";
import MainView from "./views/MainView/MainView";
import MapView from "./views/MainView/MapView/MapView";
import { Routes, Route } from "react-router-dom";

function App() {
  const [defaultStation, setDefaultStation] = useState(null);
  useEffect(() => {
    // get station from localstorage
    const defaultStation = localStorage.getItem("defaultStation");
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainView
              defaultStation={defaultStation}
              setDefaultStation={setDefaultStation}
            />
          }
        />
        <Route path="map" element={<MapView />} />
      </Routes>
    </div>
  );
}

export default App;
