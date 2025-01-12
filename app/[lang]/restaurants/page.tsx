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
  const { data: restaurants } = await supabase
    .from('restaurants')
    .select(`
      *,
      peak_hours,
      quiet_hours,
      smart_visit,
      latitude,
      longitude,
      local_tips,
      website_url,
      phone_number,
      place_id,
      restaurant_translations (
        name,
        description,
        language
      ),
      neighborhoods (
        neighborhood_translations (
          name,
          language
        )
      ),
      restaurant_categories (
        category (
          category_translations (
            name,
            language
          )
        )
      )
    `);

  if (!restaurants) return [];

  const data = restaurants.map(restaurant => ({
    id: restaurant.id,
    slug: restaurant.slug,
    image_url: restaurant.image_url,
    price_range: restaurant.price_range,
    rating: restaurant.rating,
    review_count: restaurant.review_count,
    opening_hours: restaurant.opening_hours || "",
    custom_score: restaurant.custom_score,
    score_summary: restaurant.score_summary,
    accessibility_score: restaurant.accessibility_score,
    ambience_score: restaurant.ambience_score,
    food_score: restaurant.food_score,
    service_score: restaurant.service_score,
    value_score: restaurant.value_score,
    peak_hours: restaurant.peak_hours || "",
    quiet_hours: restaurant.quiet_hours || "",
    smart_visit: restaurant.smart_visit || "",
    latitude: restaurant.latitude || 0,
    longitude: restaurant.longitude || 0,
    local_tips: restaurant.local_tips || "",
    website_url: restaurant.website_url || "",
    phone_number: restaurant.phone_number || "",
    place_id: restaurant.place_id || "",
    restaurant_translations: restaurant.restaurant_translations,
    neighborhoods: restaurant.neighborhoods,
    restaurant_categories: restaurant.restaurant_categories
  }));

  return data;
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