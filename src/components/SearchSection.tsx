import React from 'react';
import { SearchFilters } from '../types';

interface SearchSectionProps {
  filters: SearchFilters;
  categories: string[];
  onSearchChange: (searchTerm: string) => void;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  filters,
  categories,
  onSearchChange,
  onCategoryChange,
  onClearFilters
}) => {
  return (
    <div className="search-section">
      <div className="search-box">
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="맛집 이름을 검색해보세요..."
          className="search-input"
        />
        <button 
          onClick={onClearFilters}
          className="clear-button"
        >
          초기화
        </button>
      </div>
      
      <div className="category-filter">
        <select
          value={filters.selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          <option value="">전체 카테고리</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchSection; 