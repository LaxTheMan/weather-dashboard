import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type MapComponentProps = {
  latitude: number;
  longitude: number;
};

const MapComponent = ({ latitude, longitude }: MapComponentProps) => {
  return (
    <div style={{ height: "300px", width: "280px", borderRadius: "10px" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            You are here: [{latitude}, {longitude}]
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
