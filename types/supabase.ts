import type { Database } from './database.types';

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

export type Restaurant = Tables['restaurants']['Row'];
export type RestaurantInsert = Tables['restaurants']['Insert'];
export type RestaurantUpdate = Tables['restaurants']['Update'];

export type RestaurantTranslation = Tables['restaurant_translations']['Row'];
export type RestaurantTranslationInsert = Tables['restaurant_translations']['Insert'];
export type RestaurantTranslationUpdate = Tables['restaurant_translations']['Update'];

export type Category = Tables['categories']['Row'];
export type CategoryInsert = Tables['categories']['Insert'];
export type CategoryUpdate = Tables['categories']['Update'];

export type CategoryTranslation = Tables['category_translations']['Row'];
export type CategoryTranslationInsert = Tables['category_translations']['Insert'];
export type CategoryTranslationUpdate = Tables['category_translations']['Update'];

export type RestaurantCategory = Tables['restaurant_categories']['Row'];
export type RestaurantCategoryInsert = Tables['restaurant_categories']['Insert'];
export type RestaurantCategoryUpdate = Tables['restaurant_categories']['Update'];

export type Neighborhood = Tables['neighborhoods']['Row'];
export type NeighborhoodInsert = Tables['neighborhoods']['Insert'];
export type NeighborhoodUpdate = Tables['neighborhoods']['Update'];

export type NeighborhoodTranslation = Tables['neighborhood_translations']['Row'];
export type NeighborhoodTranslationInsert = Tables['neighborhood_translations']['Insert'];
export type NeighborhoodTranslationUpdate = Tables['neighborhood_translations']['Update'];
