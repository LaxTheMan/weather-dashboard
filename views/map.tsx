import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Coord } from "./hooks/useWeather";

type LeafletMapProps = {
  coord: Coord;
  zoom: number;
};

const MapUpdater = ({ coord, zoom }: LeafletMapProps) => {
  const map = useMap();

  useEffect(() => {
    if (coord.lat !== 0 && coord.lon !== 0) {
      map.setView([coord.lat, coord.lon], zoom);
    }
  }, [coord, map, zoom]);

  return null;
};

export const LeafletMap = ({ coord, zoom }: LeafletMapProps) => {
  return (
    <MapContainer
      center={[coord.lat, coord.lon]}
      className="h-full w-full"
      zoom={zoom}
      maxZoom={12}
      minZoom={8}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapUpdater coord={coord} zoom={zoom} />
    </MapContainer>
  );
};

export default LeafletMap;
