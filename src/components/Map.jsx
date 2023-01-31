import "leaflet/dist/leaflet.css";

import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

import states from "../data/states.json";

const getColor = (numOrders, totalOrders) => {
  if (!numOrders || numOrders == 0) return "#000"; //"#1e3a8a";

  const percent = (numOrders / totalOrders) * 100;
  if (percent < 0.5) return "#1e40af";
  else if (percent < 1) return "#1d4ed8";
  else if (percent < 2) return "#2563eb";
  else if (percent < 5) return "#3b82f6";
  else if (percent < 10) return "#60a5fa";
  else if (percent < 12) return "#93c5fd";
  else if (percent < 15) return "#bfdbfe";
  else if (percent < 20) return "#dbeafe";
  else return "#eff6ff";
};

const Map = ({ data }) => {
  return (
    <MapContainer zoom={3} center={[50, -100]} style={{ height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && (
        <GeoJSON
          data={states}
          style={(feature) => {
            if (!data) return;

            const numOrders = data.states.get(feature.properties.NAME);

            return {
              fillColor: getColor(numOrders, data.totalOrders),
              weight: 2,
              color: "#1e3a8a",
              fillOpacity: 0.7,
            };
          }}
          onEachFeature={(feature, layer) => {
            if (!data) return;

            const numOrders = data.states.get(feature.properties.NAME);

            layer.bindPopup(
              `<h1>${feature.properties.NAME} - ${numOrders ?? 0} order${
                numOrders !== 1 ? "s" : ""
              } - ${((numOrders / data.totalOrders) * 100).toFixed(1)}%</h1>`
            );
          }}
        />
      )}
    </MapContainer>
  );
};

export default Map;
