'use client';

import { useState } from 'react';
import { FilterBar } from './filter-bar';
import type { Restaurant, RestaurantFilters as Filters } from '@/types/restaurant';

interface RestaurantFiltersProps {
  dict: {
    searchPlaceholder: string;
    filter: string;
  };
  restaurants: Restaurant[];
}

const initialFilters: Filters = {
  cuisine: '',
  priceRange: '',
  area: '',
  rating: 0
};

export function RestaurantFilters({ dict, restaurants }: RestaurantFiltersProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Here you can add logic to filter restaurants based on the new filters
  };

  return (
    <FilterBar 
      filters={filters}
      onFilterChange={handleFilterChange}
      dict={dict}
    />
  );
} 