import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/lib/get-dictionary';
import { RestaurantContent } from './components/restaurant-content';
import type { PageProps } from '@/types/shared';
import type { Restaurant } from '@/types/restaurant';

// Sample data - In production, this would come from your database
const restaurant: Restaurant = {
  id: 1,
  slug: 'pujol',
  name: 'Pujol',
  description: 'Renowned chef Enrique Olvera elegant Mexico City restaurant serving refined Mexican cuisine.',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
  location: 'Tennyson 133, Polanco, Mexico City',
  rating: 4.9,
  reviews: 1250,
  cuisine: 'Contemporary Mexican',
  priceRange: '$$$$',
  hours: '1:30 PM - 10:30 PM',
  phone: '+52 55 5545 4111',
  website: 'https://pujol.com.mx',
  images: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80',
  ],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // In production, fetch restaurant data here
  return {
    title: restaurant.name,
    description: restaurant.description,
    openGraph: {
      title: restaurant.name,
      description: restaurant.description,
      images: [restaurant.image],
    },
  };
}

export default async function RestaurantPage({ params: { lang } }: PageProps) {
  const dict = await getServerDictionary(lang);

  return (
    <div className="container px-4 py-8 mx-auto">
      <Suspense fallback={<div>Loading restaurant details...</div>}>
        <RestaurantContent
          restaurant={restaurant}
          dict={{
            reviews: 'Reviews',
            information: 'Information',
            reservation: 'Reservation',
            bookTable: 'Book a Table'
          }}
        />
      </Suspense>
    </div>
  );
}