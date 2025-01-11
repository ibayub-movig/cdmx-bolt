'use client';

import { useState } from 'react';
import { FilterBar } from './filter-bar';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantMetadata {
  types: string[];
  categories: string[];
  areas: string[];
  priceRanges: string[];
}

interface RestaurantFiltersProps {
  dict: {
    searchPlaceholder: string;
    filter: string;
    type: string;
    category: string;
    priceRange: string;
    area: string;
    rating: string;
    clearFilters: string;
    noResults: string;
    apply: string;
  };
  restaurants: Restaurant[];
  metadata: RestaurantMetadata;
}

export interface Filters {
  search: string;
  type: string;
  category: string;
  priceRange: string;
  area: string;
  rating: number;
}

const initialFilters: Filters = {
  search: '',
  type: '',
  category: '',
  priceRange: '',
  area: '',
  rating: 0
};

export function RestaurantFilters({ dict, restaurants, metadata }: RestaurantFiltersProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setIsOpen(false);
  };

  return (
    <div className="mb-8">
      <FilterBar 
        filters={filters}
        metadata={metadata}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dict={dict}
      />
    </div>
  );
} 