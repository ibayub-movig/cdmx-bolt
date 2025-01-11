'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { DetailedList } from '@/types/list';

interface ListContentProps {
  list: DetailedList;
  dict: {
    reviews: string;
    specialty: string;
  };
  lang: string;
}

export function ListContent({ list, dict, lang }: ListContentProps) {
  return (
    <>
      <div className="relative h-[40vh] min-h-[400px] rounded-xl overflow-hidden mb-12">
        <Image
          src={list.image}
          alt={list.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <h1 className="text-4xl font-bold text-white">{list.title}</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl">
            {list.description}
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {list.places.map((place) => (
          <motion.div
            key={place.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:col-span-2">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-muted-foreground">
                      #{place.rank}
                    </span>
                    <div>
                      <Link
                        href={`/${lang}/restaurants/${place.slug}`}
                        className="text-2xl font-semibold hover:underline"
                      >
                        {place.name}
                      </Link>
                      <p className="mt-1 flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {place.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{place.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({place.reviews} {dict.reviews})
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-muted-foreground">{place.description}</p>
                  <p className="mt-4 font-medium">
                    {dict.specialty}: {place.specialty}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}