import React from "react";
import InfoWindow from "react-google-maps/lib/components/InfoWindow";

const StationInfoWindow = ({ name, data, ...props }) => {
  return (
    <InfoWindow {...props}>
      <div>
        <h1> {name} </h1>

        <h2> {`Temperatura: ${data.temperature} °C `} </h2>
        <h2> {`Humedad: ${data.humidity} %`} </h2>
        <h2> {`Milimetros: ${data.waterLevel} mm`} </h2>
        <h2> {`Presion: ${data.pressure} hPa `} </h2>
        <h2> {`Intensidad Luminica: ${data.light} lux`} </h2>
        <button>Establecer como predeterminada</button>
      </div>
    </InfoWindow>
  );
};

export default StationInfoWindow;
