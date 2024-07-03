'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { GeocodedCountryData } from './Geocode';

interface MapProps {
  // posix: LatLngExpression | LatLngTuple;
  data: GeocodedCountryData[];
}

const Map = ({ data }: MapProps) => {
  const defaultPosition: LatLngExpression = [20, 0];

  return (
    <MapContainer
      center={defaultPosition}
      zoom={1}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((country) => (
        <Marker
          key={country.countryId}
          position={[country.y, country.x] as LatLngExpression}
        >
          <Popup>{`${country.countryTitle} - ${country.companyCount} companies`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
