export interface RestaurantTranslation {
  name: string;
  description: string;
  language: string;
}

export interface NeighborhoodTranslation {
  name: string;
  language: string;
}

export interface CategoryTranslation {
  name: string;
  language: string;
}

export interface Restaurant {
  id: string;
  slug: string;
  image_url: string;
  price_range: number;
  rating: number;
  review_count: number;
  opening_hours: string;
  peak_hours: string;
  quiet_hours: string;
  smart_visit: string;
  custom_score: number;
  score_summary: string;
  accessibility_score: number;
  ambience_score: number;
  food_score: number;
  service_score: number;
  value_score: number;
  latitude: number;
  longitude: number;
  local_tips: string;
  website_url: string;
  phone_number: string;
  place_id: string;
  restaurant_translations: RestaurantTranslation[];
  neighborhoods: {
    neighborhood_translations: {
      name: string;
      language: string;
    }[];
  }[];
  restaurant_categories: {
    category: {
      category_translations: {
        name: string;
        language: string;
      }[];
    };
  }[];
}

export interface RestaurantFilters {
  cuisine?: string;
  priceRange?: string;
  area?: string;
  rating?: number;
}

export interface RestaurantGridProps {
  restaurants: Restaurant[];
  dict: {
    reviews: string;
  };
  lang: string;
}