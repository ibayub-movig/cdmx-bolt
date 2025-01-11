'use client';

import Image from 'next/image';
import { Star, MapPin, Clock, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Restaurant } from '@/types/restaurant';

interface RestaurantContentProps {
  restaurant: Restaurant;
  dict: {
    reviews: string;
    information: string;
    reservation: string;
    bookTable: string;
  };
}

export function RestaurantContent({ restaurant, dict }: RestaurantContentProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold">{restaurant.name}</h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-medium">{restaurant.rating}</span>
            <span className="ml-1 text-sm text-muted-foreground">
              ({restaurant.reviews} {dict.reviews})
            </span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{restaurant.cuisine}</span>
          <span className="text-muted-foreground">•</span>
          <span>{restaurant.priceRange}</span>
        </div>

        <p className="mt-6 text-lg leading-relaxed">{restaurant.description}</p>

        <div className="mt-8 grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold">{dict.information}</h2>
            <Separator className="my-4" />
            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>{restaurant.location}</span>
              </div>
              {restaurant.hours && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{restaurant.hours}</span>
                </div>
              )}
              {restaurant.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{restaurant.phone}</span>
                </div>
              )}
              {restaurant.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {restaurant.website}
                  </a>
                </div>
              )}
            </div>
          </Card>

          {restaurant.images && (
            <div className="grid gap-4 sm:grid-cols-2">
              {restaurant.images.map((image, index) => (
                <div key={index} className="aspect-[4/3] relative overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={`${restaurant.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Card className="sticky top-8 p-6">
          <h2 className="text-xl font-semibold">{dict.reservation}</h2>
          <Separator className="my-4" />
          <Button className="w-full">{dict.bookTable}</Button>
        </Card>
      </div>
    </div>
  );
}