'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface FeaturedRestaurantsProps {
  dict: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
}

const restaurants = [
  {
    id: 1,
    name: 'Pujol',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    location: 'Polanco',
    rating: 4.9,
    reviews: 1250,
    cuisine: 'Contemporary Mexican',
  },
  {
    id: 2,
    name: 'Quintonil',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80',
    location: 'Polanco',
    rating: 4.8,
    reviews: 980,
    cuisine: 'Modern Mexican',
  },
  {
    id: 3,
    name: 'Sud 777',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80',
    location: 'Pedregal',
    rating: 4.7,
    reviews: 856,
    cuisine: 'Contemporary',
  },
];

export function FeaturedRestaurants({ dict }: FeaturedRestaurantsProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {dict.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {dict.subtitle}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mt-16 grid max-w-7xl gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] relative">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {restaurant.location}
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({restaurant.reviews} reviews)
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        <div className="mt-16 text-center pt-8">
          <Button asChild size="lg">
            <Link href="/restaurants">{dict.viewAll}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}