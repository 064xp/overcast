import React from "react";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";

const StationInfoWindow = ({
  station,
  defaultStation,
  setDefaultStation,
  ...props
}) => {
  const onStationSelected = () => {
    setDefaultStation(station.id);
  };

  return (
    <InfoWindow {...props}>
      <div>
        <h1> {station.name} </h1>
        {station.id === defaultStation && <p>Default Station</p>}

        <h2> {`Temperatura: ${station.temperature} °C `} </h2>
        <h2> {`Humedad: ${station.humidity} %`} </h2>
        <h2> {`Milimetros: ${station.waterLevel} mm`} </h2>
        <h2> {`Presion: ${station.pressure} hPa `} </h2>
        <h2> {`Intensidad Luminica: ${station.light} lux`} </h2>
        <button onClick={onStationSelected}>
          Establecer como predeterminada
        </button>
      </div>
    </InfoWindow>
  );
};

export default StationInfoWindow;
