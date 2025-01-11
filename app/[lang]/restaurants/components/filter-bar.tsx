'use client';

import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import type { Filters } from './restaurant-filters';
import { Dispatch, SetStateAction } from 'react';

interface FilterBarProps {
  filters: Filters;
  metadata: {
    types: string[];
    categories: string[];
    areas: string[];
    priceRanges: string[];
  };
  onFilterChange: (filters: Partial<Filters>) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  dict: {
    searchPlaceholder: string;
    filter: string;
    type: string;
    category: string;
    priceRange: string;
    area: string;
    rating: string;
    clearFilters: string;
    apply: string;
  };
}

export function FilterBar({
  filters,
  metadata,
  onFilterChange,
  onClearFilters,
  isOpen,
  setIsOpen,
  dict
}: FilterBarProps) {
  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== '' && value !== 0
  ).length;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={filters.search}
          placeholder={dict.searchPlaceholder}
          className="pl-9"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="mr-2 h-4 w-4" />
            {dict.filter}
            {activeFiltersCount > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle>{dict.filter}</SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-8 px-2 lg:px-3"
              >
                {dict.clearFilters}
              </Button>
            </div>
          </SheetHeader>
          
          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{dict.type}</label>
              <Select
                value={filters.type}
                onValueChange={(value) => onFilterChange({ type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All types</SelectItem>
                  {metadata.types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{dict.category}</label>
              <Select
                value={filters.category}
                onValueChange={(value) => onFilterChange({ category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {metadata.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{dict.area}</label>
              <Select
                value={filters.area}
                onValueChange={(value) => onFilterChange({ area: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All areas</SelectItem>
                  {metadata.areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{dict.priceRange}</label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) => onFilterChange({ priceRange: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any price</SelectItem>
                  {metadata.priceRanges.map((price) => (
                    <SelectItem key={price} value={price}>
                      {price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{dict.rating}</label>
              <Slider
                value={[filters.rating]}
                min={0}
                max={5}
                step={0.5}
                onValueChange={([value]) => onFilterChange({ rating: value })}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Any</span>
                <span>{filters.rating > 0 ? `${filters.rating}+` : 'Any'}</span>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}