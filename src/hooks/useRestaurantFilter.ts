import { useState, useMemo } from 'react';
import { Restaurant, SearchFilters } from '../types';
import { restaurantData, categories } from '../data/restaurants';

export const useRestaurantFilter = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    selectedCategory: ''
  });

  const filteredRestaurants = useMemo(() => {
    return restaurantData.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           restaurant.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           restaurant.category.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesCategory = !filters.selectedCategory || restaurant.category === filters.selectedCategory;
      
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