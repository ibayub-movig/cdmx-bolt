'use client';

import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RestaurantFilters } from '@/types/restaurant';

interface FilterBarProps {
  filters: RestaurantFilters;
  onFilterChange: (filters: RestaurantFilters) => void;
  dict: {
    searchPlaceholder: string;
    filter: string;
  };
}

export function FilterBar({ filters, onFilterChange, dict }: FilterBarProps) {
  return (
    <div className="flex gap-4">
      <div className="relative flex-1 md:w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={dict.searchPlaceholder}
          className="pl-9"
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>
      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        {dict.filter}
      </Button>
    </div>
  );
}