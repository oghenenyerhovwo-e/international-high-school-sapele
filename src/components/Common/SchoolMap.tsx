"use client"

// modules
import { useState } from 'react';

// components
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import L from 'leaflet';

// css
import 'leaflet/dist/leaflet.css';
import styles from './schoolmap.module.css';

// Fix for default markers in react-leaflet - using proper type assertion
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon to avoid default marker issues
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Map configuration
const center = {
  lat: Number(process.env.NEXT_PUBLIC_SCHOOL_LATTITUDE),
  lng: Number(process.env.NEXT_PUBLIC_SCHOOL_LONGITUDE)
};

const GoogleLocationMap = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.mapContainer}>
      <h3 className={styles.mapTitle}>
        <FaMapMarkerAlt /> Find Us
      </h3>
      
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        style={{ width: '100%', height: '200px', borderRadius: '8px' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[center.lat, center.lng]}
          icon={customIcon}
          eventHandlers={{
            click: () => setIsPopupOpen(true),
          }}
        >
          {isPopupOpen && (
            <Popup
            eventHandlers={{
              remove: () => setIsPopupOpen(false),
            }}
          >
            <div className={styles.infoWindow}>
              <h4>International High School</h4>
              <p>Sapele, Delta State</p>
            </div>
          </Popup>
          )}
        </Marker>
      </MapContainer>
    </div>
  );
};

export default GoogleLocationMap;