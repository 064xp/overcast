import React from "react";
import "./App.css";
import MainView from "./views/MainView/MainView";
import MapView from "./views/MainView/MapView/MapView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="map" element={<MapView />} />
      </Routes>
    </div>
  );
}

export default App;
