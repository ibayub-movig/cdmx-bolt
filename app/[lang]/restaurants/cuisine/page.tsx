import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/lib/get-dictionary';
import { CuisineGrid } from './components/cuisine-grid';
import type { PageProps } from '@/types/shared';

const cuisines = [
  {
    id: 'mexican',
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    count: 125,
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80',
    count: 45,
  },
  {
    id: 'seafood',
    name: 'Seafood',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80',
    count: 32,
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getServerDictionary(params.lang);
  
  return {
    title: dict.cuisine.title,
    description: dict.cuisine.subtitle,
  };
}

export default async function CuisinePage({ params: { lang } }: PageProps) {
  const dict = await getServerDictionary(lang);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold">{dict.cuisine.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {dict.cuisine.subtitle}
        </p>
      </div>

      <Suspense fallback={<div>Loading cuisines...</div>}>
        <CuisineGrid
          cuisines={cuisines}
          dict={dict.cuisine}
          lang={lang}
        />
      </Suspense>
    </div>
  );
}