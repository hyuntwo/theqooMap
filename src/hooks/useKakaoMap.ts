import { useEffect, useRef, useState, useCallback } from 'react';
import { Restaurant } from '../types';
import { KakaoMap, KakaoMarker, KakaoInfoWindow } from '../types/kakao';

interface UseKakaoMapProps {
  restaurants: Restaurant[];
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

export const useKakaoMap = ({ restaurants, onRestaurantSelect }: UseKakaoMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<KakaoMap | null>(null);
  const [markers, setMarkers] = useState<KakaoMarker[]>([]);
  const [infoWindow, setInfoWindow] = useState<KakaoInfoWindow | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 카카오맵 초기화
  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current) {
        setError('지도 컨테이너를 찾을 수 없습니다.');
        setIsLoading(false);
        return;
      }

      // 전역 에러 체크
      if ((window as any).kakaoMapError) {
        setError((window as any).kakaoMapError);
        setIsLoading(false);
        return;
      }

      if (typeof window.kakao === 'undefined') {
        setError('카카오맵 API가 로드되지 않았습니다. API 키와 도메인 설정을 확인해주세요.');
        setIsLoading(false);
        return;
      }

      try {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9850), // 서울시청
          level: 8
        };

        const kakaoMap = new window.kakao.maps.Map(container, options);
        const kakaoInfoWindow = new window.kakao.maps.InfoWindow();

        setMap(kakaoMap);
        setInfoWindow(kakaoInfoWindow);
        setError(null);
        setIsLoading(false);
      } catch (err: any) {
        console.error('카카오맵 초기화 오류:', err);
        
        // 403 Forbidden 오류 처리
        if (err.message && err.message.includes('403')) {
          setError('API 접근이 거부되었습니다. 다음을 확인해주세요:\n1. API 키가 올바른지 확인\n2. 도메인이 카카오 개발자 센터에 등록되었는지 확인\n3. API 사용량 한도 초과 여부 확인');
        } else if (err.message && err.message.includes('Forbidden')) {
          setError('API 접근이 금지되었습니다. 도메인 설정과 API 키를 확인해주세요.');
        } else {
          setError('지도 초기화 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        setIsLoading(false);
      }
    };

    // 카카오맵 API가 로드될 때까지 대기
    if (typeof window.kakao !== 'undefined') {
      initializeMap();
    } else {
      // API 로딩 대기
      const checkKakaoAPI = setInterval(() => {
        if (typeof window.kakao !== 'undefined') {
          clearInterval(checkKakaoAPI);
          initializeMap();
        }
      }, 100);

      // 10초 후 타임아웃
      setTimeout(() => {
        clearInterval(checkKakaoAPI);
        if (typeof window.kakao === 'undefined') {
          setError('카카오맵 API 로딩 시간이 초과되었습니다. 네트워크 연결과 API 키를 확인해주세요.');
          setIsLoading(false);
        }
      }, 10000);
    }

    return () => {
      // 정리 작업
      if (map) {
        markers.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  // 마커 업데이트
  useEffect(() => {
    if (!map || !infoWindow) return;

    // 기존 마커들 제거
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: KakaoMarker[] = restaurants.map(restaurant => {
      const position = new window.kakao.maps.LatLng(restaurant.lat, restaurant.lng);
      const marker = new window.kakao.maps.Marker({ position });

      // 마커 클릭 이벤트 핸들러
      const clickHandler = () => {
        const content = `
          <div style="padding:10px;min-width:200px;">
            <h3 style="margin:0 0 5px 0;color:#333;">${restaurant.name}</h3>
            <p style="margin:0 0 5px 0;color:#666;">${restaurant.category}</p>
            <p style="margin:0;color:#888;font-size:12px;">${restaurant.location}</p>
          </div>
        `;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        onRestaurantSelect(restaurant);
      };

      // 이벤트 리스너 추가
      window.kakao.maps.event.addListener(marker, 'click', clickHandler);

      // 마커에 이벤트 핸들러 참조 저장 (나중에 제거하기 위해)
      (marker as any)._clickHandler = clickHandler;

      marker.setMap(map);
      return marker;
    });

    setMarkers(newMarkers);

    // 정리 함수
    return () => {
      newMarkers.forEach(marker => {
        if ((marker as any)._clickHandler) {
          window.kakao.maps.event.removeListener(marker, 'click', (marker as any)._clickHandler);
        }
        marker.setMap(null);
      });
    };
  }, [map, restaurants, infoWindow, onRestaurantSelect]);

  // 지도 중심 이동
  const moveToRestaurant = useCallback((restaurant: Restaurant) => {
    if (!map) return;
    
    try {
      const position = new window.kakao.maps.LatLng(restaurant.lat, restaurant.lng);
      map.setCenter(position);
      map.setLevel(3);
    } catch (err) {
      console.error('지도 이동 중 오류:', err);
    }
  }, [map]);

  return {
    mapRef,
    map,
    markers,
    moveToRestaurant,
    isLoading,
    error
  };
}; 