'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Restaurant } from '@/types/restaurant';
import { getServerDictionary } from '@/lib/get-dictionary';

type CuisineContentProps = {
  restaurants: Restaurant[];
  cuisineName: string;
  dict: Awaited<ReturnType<typeof getServerDictionary>>;
  lang: string;
};

export function CuisineContent({ restaurants, cuisineName, dict, lang }: CuisineContentProps) {
  return (
    <>
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold">
          {cuisineName} {dict.navigation.restaurants}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {dict.metadata.description}
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href={`/${lang}/restaurants/${restaurant.slug}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                    <span className="text-sm font-medium">{restaurant.priceRange}</span>
                  </div>
                  <p className="mt-2 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {restaurant.location}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{restaurant.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({restaurant.reviews})
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}