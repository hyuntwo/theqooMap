import React from 'react';
import { Restaurant } from '../types';
import { getCategoryName } from '../data/restaurants';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantSelect }) => {
  if (restaurants.length === 0) {
    return (
      <div className="restaurant-list">
        <h3>맛집 목록</h3>
        <div className="no-results">
          <p>검색 결과가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      <h3>맛집 목록 ({restaurants.length}개)</h3>
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="restaurant-item"
            onClick={() => onRestaurantSelect(restaurant)}
          >
            <div className="restaurant-info">
              <h4 className="restaurant-name">{restaurant.name}</h4>
              <p className="restaurant-category">{getCategoryName(restaurant.category)}</p>
              <p className="restaurant-location">{restaurant.location}</p>
            </div>
            <div className="restaurant-actions">
              <button className="select-button">지도에서 보기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList; 