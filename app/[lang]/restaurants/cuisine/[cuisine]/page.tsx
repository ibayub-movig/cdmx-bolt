import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/lib/get-dictionary';
import { CuisineContent } from './components/cuisine-content';
import type { PageProps } from '@/types/shared';
import type { Restaurant } from '@/types/restaurant';

// Sample data - In production, this would come from your database filtered by cuisine
const restaurants: Restaurant[] = [
  {
    id: 1,
    slug: 'pujol',
    name: 'Pujol',
    description: 'Renowned chef Enrique Olvera elegant Mexico City restaurant.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    location: 'Polanco',
    rating: 4.9,
    reviews: 1250,
    cuisine: 'Contemporary Mexican',
    priceRange: '$$$$',
  },
  // Add more restaurants...
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getServerDictionary(params.lang);
  if (!params.cuisine) {
    return {
      title: dict.metadata.title,
      description: dict.metadata.description,
    };
  }

  const cuisineName = params.cuisine.charAt(0).toUpperCase() + params.cuisine.slice(1);
  
  return {
    title: `${cuisineName} Restaurants`,
    description: dict.metadata.description,
  };
}

export default async function CuisinePage({ params: { lang, cuisine } }: PageProps) {
  const dict = await getServerDictionary(lang);
  if (!cuisine) {
    return null;
  }

  const cuisineName = cuisine.charAt(0).toUpperCase() + cuisine.slice(1);

  return (
    <div className="container px-4 py-8 mx-auto">
      <Suspense fallback={<div>Loading restaurants...</div>}>
        <CuisineContent
          restaurants={restaurants}
          cuisineName={cuisineName}
          dict={dict}
          lang={lang}
        />
      </Suspense>
    </div>
  );
}