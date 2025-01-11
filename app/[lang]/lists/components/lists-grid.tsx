'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import type { ListsGridProps } from '@/types/list';

export function ListsGrid({ lists, dict, lang }: ListsGridProps) {
  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2">
      {lists.map((list) => (
        <motion.div
          key={list.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href={`/${lang}/lists/${list.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/9] relative">
                <Image
                  src={list.image}
                  alt={list.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white">{list.title}</h3>
                  <p className="mt-2 text-white/90">{list.description}</p>
                  <p className="mt-4 text-sm text-white/80">
                    {list.count} {dict.places}
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