import { getServerDictionary as getDictionary } from '@/src/lib/get-dictionary';
import { supabase } from '@/src/lib/supabase';
import dynamic from 'next/dynamic';
import type { PageProps } from '@/types/shared';
import type { Dictionary } from '@/types/dictionary';

const RestaurantGrid = dynamic(() => import('./components/restaurant-grid').then(mod => mod.RestaurantGrid), {
  loading: () => <div>Loading restaurants...</div>,
  ssr: false
});

async function getRestaurants() {
  const { data: restaurants, error } = await supabase
    .from('restaurants')
    .select(`
      id,
      slug,
      image_url,
      price_range,
      rating,
      review_count,
      opening_hours,
      custom_score,
      score_summary,
      accessibility_score,
      ambience_score,
      food_score,
      service_score,
      value_score,
      neighborhoods (
        neighborhood_translations (
          name,
          language
        )
      ),
      restaurant_categories (
        category:categories (
          category_translations (
            name,
            language
          )
        )
      ),
      restaurant_translations (
        name,
        description,
        language
      )
    `);

  if (error) {
    console.error('Supabase error:', error.message, error.details);
    throw new Error(`Failed to fetch restaurants: ${error.message}`);
  }
  if (!restaurants) return [];

  return restaurants;
}

export default async function RestaurantsPage({ params: { lang } }: PageProps) {
  const [dict, restaurants] = await Promise.all([
    getDictionary(lang),
    getRestaurants()
  ]);

  if (!dict?.restaurant) {
    console.error('Dictionary structure:', dict);
    throw new Error('Dictionary data is missing');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <RestaurantGrid 
        restaurants={restaurants} 
        dict={{
          reviews: dict.restaurant.reviews,
          location: dict.restaurant.neighborhood,
          priceRange: dict.restaurant.priceRange,
          viewDetails: dict.restaurant.viewDetails
        }}
        lang={lang} 
      />
    </div>
  );
}