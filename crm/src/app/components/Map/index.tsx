'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { GeocodedCityData } from './Geocode';

interface MapProps {
  data: GeocodedCityData[];
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
      {data.map((city) => (
        <Marker key={city._id} position={[city.y, city.x] as LatLngExpression}>
          <Popup>
            <div>
              <h2>{city.title}</h2>
              <h3 className="text-[12px]">{city.countryTitle}</h3>
              <h4 className="mt-2 text-[11px]">Companies:</h4>
              <ul>
                {city.companyTitles.map((title, index) => (
                  <li key={index}>{title}</li>
                ))}
              </ul>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
