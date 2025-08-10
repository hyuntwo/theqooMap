import { useState, useMemo } from 'react';
import { Restaurant, SearchFilters } from '../types';
import { restaurantData, categories, getCategoryName, getCategoryIndex } from '../data/restaurants';

export const useRestaurantFilter = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    selectedCategory: ''
  });

  const filteredRestaurants = useMemo(() => {
    return restaurantData.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           restaurant.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           (restaurant.description && restaurant.description.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      // 카테고리 매칭: 문자열 카테고리명을 인덱스로 변환하여 비교
      const matchesCategory = !filters.selectedCategory || 
                             getCategoryName(restaurant.category) === filters.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [filters]);

  const updateSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const updateCategory = (selectedCategory: string) => {
    setFilters(prev => ({ ...prev, selectedCategory }));
  };

  const clearFilters = () => {
    setFilters({ searchTerm: '', selectedCategory: '' });
  };

  return {
    filters,
    filteredRestaurants,
    categories,
    updateSearchTerm,
    updateCategory,
    clearFilters
  };
}; 