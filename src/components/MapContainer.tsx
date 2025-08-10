import React from 'react';
import { Restaurant } from '../types';

interface MapContainerProps {
  mapRef: React.RefObject<HTMLDivElement>;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  isLoading: boolean;
}

const MapContainer: React.FC<MapContainerProps> = ({ mapRef, onRestaurantSelect, isLoading }) => {
  return (
    <div className="map-container">
      {isLoading && (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>지도를 불러오는 중...</p>
        </div>
      )}
      <div 
        ref={mapRef} 
        id="map" 
        style={{ 
          width: '100%', 
          height: '600px',
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

export default MapContainer; 