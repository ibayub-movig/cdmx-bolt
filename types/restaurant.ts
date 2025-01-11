export interface Restaurant {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  cuisine: string;
  priceRange: string;
  hours?: string;
  phone?: string;
  website?: string;
  images?: string[];
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