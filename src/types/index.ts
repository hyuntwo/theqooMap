export interface Restaurant {
  id: string;
  name: string;
  category: number;
  location: string;
  lat: number;
  lng: number;
  description?: string;
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