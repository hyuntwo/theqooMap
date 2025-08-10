import { Restaurant } from '../types';

// JSON 파일에서 좌표 데이터 불러오기
import coordinateData from './categoryOne.json';

// 카테고리 배열 정의
export const categories = [
  "평양냉면", "메밀국수", "막국수", "콩국수", "국밥", "설렁탕", "감자탕", "순대", "닭볶음탕", "추어탕",
  "육개장", "대구탕", "김밥", "김치찌개", "부대찌개", "청국장", "된장", "간장게장", "삼계탕", "보쌈",
  "족발", "치킨", "돈까스", "떡볶이", "라면", "라멘", "우동", "튀김", "순두부", "피자",
  "아이스크림", "갓포요리", "죽", "덮밥", "꼬치구이", "냉동삼겹살", "기사식당", "스테이크", "칼국수", "수제맥주",
  "아구찜", "생선구이", "돼지갈비", "돼지고기", "유럽음식", "중동음식", "아프리카음식", "북중남미", "아시아음식", "기네스",
  "사케", "몰트위스키", "칵테일", "막걸리", "중국집", "한국만두", "수제비", "국수", "스시", "해물탕",
  "갈비찜", "소고기", "곱창", "샤브샤브", "낙지", "쭈꾸미", "장어", "보양", "양고기", "오리",
  "닭", "Italian", "French", "Contemporary", "NewKorean", "WineDine", "Pasta", "햄버거", "호텔", "비빔밥",
  "채식", "참치", "랍스터", "남도음식", "횟집", "방송맛집", "서울노포", "떡집", "디저트", "빵집", "커피"
];

// 평양냉면의 카테고리 인덱스
const PYEONGYANG_NAENGMYEON_INDEX = 0; // "평양냉면"은 categories[0]

// 좌표 데이터 타입 정의
interface CoordinateData {
  name: string;
  lat: number;
  lng: number;
  address: string;
  success: boolean;
  searchKeyword: string;
  errorStatus?: string;
}

// 좌표 데이터를 Restaurant 배열로 변환하는 함수
function convertCoordinatesToRestaurants(coordinates: CoordinateData[]): Restaurant[] {
  return coordinates.map((item, index) => ({
    id: (index + 1).toString(),
    name: item.name,
    category: PYEONGYANG_NAENGMYEON_INDEX, // 인덱스로 변경
    location: item.success ? item.address : "위치 정보 없음",
    lat: item.lat,
    lng: item.lng,
    description: `${item.name}에서 전통 평양냉면의 맛을 느낄 수 있는 곳`
  }));
}

// 성공한 검색 결과만 필터링하는 함수
function getSuccessfulRestaurants(coordinates: CoordinateData[]): Restaurant[] {
  const successfulData = coordinates.filter(item => item.success);
  return convertCoordinatesToRestaurants(successfulData);
}

// 모든 맛집 데이터 (성공/실패 포함)
export const restaurantData: Restaurant[] = convertCoordinatesToRestaurants(coordinateData);

// 성공한 검색 결과만
export const successfulRestaurants: Restaurant[] = getSuccessfulRestaurants(coordinateData);

// 검색 통계
export const searchStats = {
  total: coordinateData.length,
  successful: coordinateData.filter(item => item.success).length,
  failed: coordinateData.filter(item => !item.success).length,
  successRate: Math.round((coordinateData.filter(item => item.success).length / coordinateData.length) * 100)
};

// 실패한 검색 결과들
export const failedSearches = coordinateData
  .filter(item => !item.success)
  .map(item => ({
    name: item.name,
    searchKeyword: item.searchKeyword,
    errorStatus: item.errorStatus
  }));

// 맛집 이름 배열 (검색용)
export const restaurantNames = coordinateData.map(item => item.name);

// 성공한 맛집 이름 배열
export const successfulRestaurantNames = coordinateData
  .filter(item => item.success)
  .map(item => item.name);

// 카테고리별 맛집 필터링 함수
export function getRestaurantsByCategory(categoryIndex: number): Restaurant[] {
  if (categoryIndex === PYEONGYANG_NAENGMYEON_INDEX) {
    return successfulRestaurants;
  }
  return [];
}

// 카테고리 이름으로 맛집 필터링 함수
export function getRestaurantsByCategoryName(categoryName: string): Restaurant[] {
  const categoryIndex = categories.indexOf(categoryName);
  if (categoryIndex !== -1) {
    return getRestaurantsByCategory(categoryIndex);
  }
  return [];
}

// 지역별 맛집 필터링 함수
export function getRestaurantsByRegion(region: string): Restaurant[] {
  return successfulRestaurants.filter(restaurant => 
    restaurant.location.includes(region)
  );
}

// 검색어로 맛집 찾기 함수
export function searchRestaurants(query: string): Restaurant[] {
  const lowerQuery = query.toLowerCase();
  return successfulRestaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(lowerQuery) ||
    restaurant.location.toLowerCase().includes(lowerQuery) ||
    (restaurant.description && restaurant.description.toLowerCase().includes(lowerQuery))
  );
}

// 좌표 기반 근처 맛집 찾기 함수
export function getNearbyRestaurants(lat: number, lng: number, radiusKm: number = 5): Restaurant[] {
  return successfulRestaurants.filter(restaurant => {
    const distance = calculateDistance(lat, lng, restaurant.lat, restaurant.lng);
    return distance <= radiusKm;
  });
}

// 두 지점 간의 거리 계산 (km)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // 지구의 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// 카테고리 인덱스를 이름으로 변환하는 함수
export function getCategoryName(categoryIndex: number): string {
  return categories[categoryIndex] || "알 수 없음";
}

// 카테고리 이름을 인덱스로 변환하는 함수
export function getCategoryIndex(categoryName: string): number {
  return categories.indexOf(categoryName);
}

// 통계 정보 출력
console.log('🍜 평양냉면 맛집 데이터 로드 완료!');
console.log(`📊 검색 통계: ${searchStats.successful}/${searchStats.total} 성공 (${searchStats.successRate}%)`);
console.log(`🏷️ 카테고리: ${getCategoryName(PYEONGYANG_NAENGMYEON_INDEX)} (인덱스: ${PYEONGYANG_NAENGMYEON_INDEX})`);

if (searchStats.failed > 0) {
  console.log(`❌ 실패한 검색: ${searchStats.failed}개`);
  console.log('실패한 맛집들:', failedSearches.map(item => item.name).join(', '));
} 