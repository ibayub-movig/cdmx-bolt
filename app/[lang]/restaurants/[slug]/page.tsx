import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/src/lib/get-dictionary';
import { RestaurantContent } from './components/restaurant-content';
import { supabase } from '@/src/lib/supabase';
import type { PageProps } from '@/types/shared';
import type { Restaurant } from '@/types/restaurant';

async function getRestaurant(slug: string): Promise<Restaurant> {
  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select(`
      *,
      opening_hours,
      neighborhoods!inner (
        neighborhood_translations!inner (
          name,
          language
        )
      ),
      restaurant_categories!inner (
        category:categories!inner (
          category_translations!inner (
            name,
            language
          )
        )
      ),
      restaurant_translations!inner (
        name,
        description,
        language
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) throw new Error('Failed to fetch restaurant');
  if (!restaurant) throw new Error('Restaurant not found');

  return restaurant;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!params.slug) throw new Error('Slug is required');
  const restaurant = await getRestaurant(params.slug);
  const translation = restaurant.restaurant_translations.find(t => t.language === params.lang) || restaurant.restaurant_translations[0];
  
  return {
    title: `${translation.name} | CDMX Restaurants`,
    description: translation.description,
    openGraph: {
      title: translation.name,
      description: translation.description,
      images: [restaurant.image_url],
      type: 'website',
      locale: params.lang,
    },
    alternates: {
      canonical: `/restaurants/${params.slug}`,
      languages: {
        en: `/en/restaurants/${params.slug}`,
        es: `/es/restaurants/${params.slug}`,
      },
    },
  };
}

export default async function RestaurantPage({ params: { lang, slug } }: PageProps) {
  if (!slug) throw new Error('Slug is required');
  const [dict, restaurant] = await Promise.all([
    getServerDictionary(lang),
    getRestaurant(slug)
  ]);

  if (!dict.restaurant || !dict.navigation) {
    throw new Error('Dictionary data is missing');
  }

  return (
    <article className="container px-4 py-8 mx-auto">
      <Suspense fallback={<div>Loading restaurant details...</div>}>
        <RestaurantContent
          restaurant={restaurant}
          dict={{
            reviews: dict.restaurant.reviews,
            about: dict.restaurant.information,
            tips: "Tips",
            rating: "Rating",
            hours: dict.restaurant.hours,
            location: dict.restaurant.neighborhood,
            contact: dict.restaurant.phone,
            restaurants: dict.navigation.restaurants
          }}
          lang={lang}
        />
      </Suspense>
    </article>
  );
}