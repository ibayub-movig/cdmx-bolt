'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Restaurant } from '@/types/restaurant';
import { getServerDictionary } from '@/src/lib/get-dictionary';

type CuisineContentProps = {
  restaurants: Restaurant[];
  cuisineName: string;
  dict: Awaited<ReturnType<typeof getServerDictionary>>;
  lang: string;
};

export function CuisineContent({ restaurants, cuisineName, dict, lang }: CuisineContentProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold">{cuisineName} {dict.restaurant.cuisine}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {dict.metadata.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => {
          const translation = restaurant.restaurant_translations.find(t => t.language === lang) 
            || restaurant.restaurant_translations[0];
          const neighborhood = restaurant.neighborhoods[0]?.neighborhood_translations.find(t => t.language === lang)?.name;
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
                  src={restaurant.image_url}
                  alt={translation.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{translation.name}</h2>
                <p className="mt-1 line-clamp-2 text-gray-600">
                  {translation.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {'$'.repeat(restaurant.price_range)}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    ★ {restaurant.rating.toFixed(1)} ({restaurant.review_count} {dict.restaurant.reviews})
                  </span>
                  {neighborhood && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {dict.restaurant.neighborhood}: {neighborhood}
                    </span>
                  )}
                  {categories.map((category, index) => (
                    <span key={index} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                      {category}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Link>
          );
        })}
      </div>
    </div>
  );
}