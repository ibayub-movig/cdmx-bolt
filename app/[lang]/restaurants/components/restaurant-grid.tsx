'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Restaurant } from '@/types/restaurant';
import type { Filters } from './restaurant-filters';
import { useMemo } from 'react';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  dict: {
    reviews: string;
    location: string;
    priceRange: string;
    viewDetails: string;
  };
  lang: string;
  filters?: {
    search?: string;
    type?: string;
    category?: string;
    area?: string;
    priceRange?: string;
  };
}

export function RestaurantGrid({ restaurants, dict, lang, filters = {} }: RestaurantGridProps) {
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const translation = restaurant.restaurant_translations.find(t => t.language === lang) 
        || restaurant.restaurant_translations[0];
      const neighborhood = restaurant.neighborhoods.neighborhood_translations.find(t => t.language === lang)?.name;
      const categories = restaurant.restaurant_categories.map(rc => 
        rc.category.category_translations.find(t => t.language === lang)?.name
      ).filter(Boolean);

      const matchesSearch = !filters.search || 
        translation.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        translation.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType = !filters.type || categories.includes(filters.type);
      const matchesCategory = !filters.category || categories.includes(filters.category);
      const matchesArea = !filters.area || neighborhood === filters.area;
      const matchesPriceLevel = !filters.priceRange || 
        '$'.repeat(restaurant.price_range) === filters.priceRange;

      return matchesSearch && matchesType && matchesCategory && 
        matchesArea && matchesPriceLevel;
    });
  }, [restaurants, filters, lang]);

  if (filteredRestaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No restaurants found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredRestaurants.map((restaurant) => {
        const translation = restaurant.restaurant_translations.find(t => t.language === lang) 
          || restaurant.restaurant_translations[0];
        const neighborhood = restaurant.neighborhoods.neighborhood_translations.find(t => t.language === lang)?.name;
        const categories = restaurant.restaurant_categories.map(rc => 
          rc.category.category_translations.find(t => t.language === lang)?.name
        ).filter(Boolean);

        return (
          <Link
            key={restaurant.id}
            href={`/${lang}/restaurants/${restaurant.slug}`}
            className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={restaurant.image_url || '/placeholder-restaurant.jpg'}
                alt={translation.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{translation.name}</h2>
              <p className="mt-1 line-clamp-2 text-gray-600">
                {translation.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  {'$'.repeat(restaurant.price_range)}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  ★ {restaurant.rating.toFixed(1)} ({restaurant.review_count} {dict.reviews})
                </span>
                {neighborhood && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {dict.location}: {neighborhood}
                  </span>
                )}
                {categories.map((category, index) => (
                  <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}