import React, { useState } from 'react';
import Header from './components/Header';
import SearchSection from './components/SearchSection';
import MapContainer from './components/MapContainer';
import RestaurantList from './components/RestaurantList';
import Footer from './components/Footer';
import { useKakaoMap } from './hooks/useKakaoMap';
import { useRestaurantFilter } from './hooks/useRestaurantFilter';
import { Restaurant } from './types';
import { Analytics } from "@vercel/analytics/react";
import './App.css';

const App: React.FC = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  const {
    filters,
    filteredRestaurants,
    categories,
    updateSearchTerm,
    updateCategory,
    clearFilters
  } = useRestaurantFilter();

  const { mapRef, moveToRestaurant, isLoading, error } = useKakaoMap({
    restaurants: filteredRestaurants,
    onRestaurantSelect: setSelectedRestaurant
  });

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    moveToRestaurant(restaurant);
  };

  // 카카오맵 에러 처리
  if (error) {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <div className="error-container">
            <h2>🚫 지도 로딩 오류</h2>
            <div className="error-message">
              <p>{error}</p>
            </div>
            
            <div className="troubleshooting">
              <h3>🔧 문제 해결 방법</h3>
              <ol>
                <li><strong>도메인 등록 확인</strong>: 카카오 개발자 센터에서 현재 도메인이 등록되어 있는지 확인</li>
                <li><strong>API 키 확인</strong>: JavaScript 키가 올바르게 설정되었는지 확인</li>
                <li><strong>사용량 확인</strong>: 일일 API 호출 한도 초과 여부 확인</li>
                <li><strong>브라우저 캐시</strong>: 브라우저 캐시 삭제 후 재시도</li>
              </ol>
            </div>
            
            <div className="error-actions">
              <button onClick={() => window.location.reload()} className="retry-btn">
                🔄 새로고침
              </button>
              <button onClick={() => window.open('https://developers.kakao.com/console/app', '_blank')} className="console-btn">
                📋 카카오 개발자 콘솔
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <Analytics />
        <Header />
        
        <SearchSection
          filters={filters}
          categories={categories}
          onSearchChange={updateSearchTerm}
          onCategoryChange={updateCategory}
          onClearFilters={clearFilters}
        />
        
        <div className="main-content">
          <MapContainer
            mapRef={mapRef}
            onRestaurantSelect={handleRestaurantSelect}
            isLoading={isLoading}
          />
          
          <RestaurantList
            restaurants={filteredRestaurants}
            onRestaurantSelect={handleRestaurantSelect}
          />
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default App; 