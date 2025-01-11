import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/lib/get-dictionary';
import { RestaurantGrid } from './components/restaurant-grid';
import { RestaurantFilters } from './components/restaurant-filters';
import type { Restaurant } from '@/types/restaurant';
import type { PageProps } from '@/types/shared';
import dynamic from 'next/dynamic';

// Define image sizes for optimization
export const restaurantImageSizes = {
  thumbnail: {
    width: 384,
    height: 256,
  },
  hero: {
    width: 1200,
    height: 800,
  }
} as const;

// TODO: Move to Supabase
const restaurants: Restaurant[] = [
  {
    id: 1,
    slug: 'pujol',
    name: 'Pujol',
    description: "Renowned chef Enrique Olvera's elegant Mexico City restaurant.",
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    location: 'Polanco',
    rating: 4.9,
    reviews: 1250,
    cuisine: 'Contemporary Mexican',
    priceRange: '$$$$',
  },
];

// This will be replaced with Supabase query
async function getRestaurants() {
  return restaurants;
}

// Cache revalidation configuration
export const revalidate = 3600; // Revalidate every hour

// Dynamic imports for performance
const RestaurantGridLazy = dynamic(() => import('./components/restaurant-grid').then(mod => mod.RestaurantGrid), {
  loading: () => <div>Loading restaurants...</div>,
  ssr: true
});

const RestaurantFiltersLazy = dynamic(() => import('./components/restaurant-filters').then(mod => mod.RestaurantFilters), {
  loading: () => <div>Loading filters...</div>,
  ssr: true
});

export async function generateMetadata({ 
  params: { lang } 
}: PageProps): Promise<Metadata> {
  const dict = await getServerDictionary(lang);
  const baseUrl = 'https://bestcdmx.com';
  const ogImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836';
  
  return {
    title: {
      template: '%s | BestCDMX',
      default: 'Best Restaurants in Mexico City',
    },
    description: 'Discover the finest restaurants in CDMX',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/restaurants`,
      languages: {
        'en': `${baseUrl}/en/restaurants`,
        'es': `${baseUrl}/es/restaurants`,
      },
    },
    openGraph: {
      title: 'Best Restaurants in Mexico City',
      description: 'Discover the finest restaurants in CDMX',
      type: 'website',
      locale: lang,
      url: `${baseUrl}/${lang}/restaurants`,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Best Restaurants in Mexico City'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Best Restaurants in Mexico City',
      description: 'Discover the finest restaurants in CDMX',
      creator: '@bestcdmx',
      images: [ogImage]
    },
  };
}

export default async function RestaurantsPage({ 
  params: { lang } 
}: PageProps) {
  const dict = await getServerDictionary(lang);
  const restaurants = await getRestaurants();
  
  // Default restaurant dictionary values
  const restaurantDict = {
    title: 'Best Restaurants in Mexico City',
    filters: {
      searchPlaceholder: 'Search restaurants...',
      filter: 'Filter'
    },
    grid: {
      reviews: 'Reviews',
      location: 'Location',
      priceRange: 'Price Range',
      viewDetails: 'View Details'
    }
  };

  // Generate JSON-LD structured data for restaurants
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: restaurants.map((restaurant, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Restaurant',
        '@id': `https://bestcdmx.com/${lang}/restaurants/${restaurant.slug}`,
        name: restaurant.name,
        description: restaurant.description,
        image: restaurant.image,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mexico City',
          addressRegion: 'CDMX',
          addressCountry: 'MX',
          streetAddress: restaurant.location
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: restaurant.rating,
          reviewCount: restaurant.reviews
        },
        servesCuisine: restaurant.cuisine,
        priceRange: restaurant.priceRange
      }
    }))
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">{restaurantDict.title}</h1>
        
        <RestaurantFiltersLazy 
          dict={restaurantDict.filters}
          restaurants={restaurants}
        />
        
        <RestaurantGridLazy 
          restaurants={restaurants} 
          dict={restaurantDict.grid} 
          lang={lang} 
        />
      </div>
    </>
  );
}