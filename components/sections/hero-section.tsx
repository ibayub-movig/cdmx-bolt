'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  dict: {
    title: string;
    subtitle: string;
    cta: string;
  };
}

export function HeroSection({ dict }: HeroSectionProps) {
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&q=80"
        alt="Mexico City Skyline"
        fill
        priority
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/60" />
      <div className="container relative flex h-full items-center">
        <div className="max-w-2xl space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            {dict.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/90 sm:text-xl"
          >
            {dict.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="text-lg">
              {dict.cta}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}