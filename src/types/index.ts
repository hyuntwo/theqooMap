export interface Restaurant {
  id: string;
  name: string;
  category: string;
  location: string;
  lat: number;
  lng: number;
}

export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  restaurant: Restaurant;
}

export interface SearchFilters {
  searchTerm: string;
  selectedCategory: string;
} 