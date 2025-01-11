'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface CuisineGridProps {
  cuisines: Array<{
    id: string;
    name: string;
    image: string;
    count: number;
  }>;
  dict: {
    restaurants: string;
  };
  lang: string;
}

export function CuisineGrid({ cuisines, dict, lang }: CuisineGridProps) {
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cuisines.map((cuisine) => (
        <motion.div
          key={cuisine.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href={`/${lang}/restaurants/cuisine/${cuisine.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] relative">
                <Image
                  src={cuisine.image}
                  alt={cuisine.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white">{cuisine.name}</h3>
                  <p className="mt-2 text-white/90">
                    {cuisine.count} {dict.restaurants}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}