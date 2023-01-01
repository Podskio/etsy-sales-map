import "leaflet/dist/leaflet.css";

import { GeoJSON, MapContainer, TileLayer } from "react-leaflet";

import states from "../data/states.json";

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
            const numOrders = data.get(feature.properties.NAME);
            return {
              color: numOrders > 0 ? "#2563eb" : "#db2777",
              weight: 1,
            };
          }}
          onEachFeature={(feature, layer) => {
            if (!data) return;
            const numOrders = data.get(feature.properties.NAME);
            layer.bindPopup(
              `<h1>${feature.properties.NAME} - ${
                numOrders ? numOrders : 0
              } order${numOrders !== 1 ? "s" : ""}</h1>`
            );
          }}
        />
      )}
    </MapContainer>
  );
};

export default Map;
