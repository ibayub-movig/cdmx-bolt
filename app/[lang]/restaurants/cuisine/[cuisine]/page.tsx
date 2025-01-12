import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/src/lib/get-dictionary';
import { CuisineContent } from './components/cuisine-content';
import type { PageProps } from '@/types/shared';
import type { Restaurant } from '@/types/restaurant';

// Sample data - In production, this would come from your database filtered by cuisine
const restaurants: Restaurant[] = [
  {
    id: "1",
    slug: 'pujol',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    price_range: 4,
    rating: 4.9,
    review_count: 1250,
    opening_hours: "Monday: 1:30 PM - 10:30 PM\nTuesday: 1:30 PM - 10:30 PM\nWednesday: 1:30 PM - 10:30 PM\nThursday: 1:30 PM - 10:30 PM\nFriday: 1:30 PM - 10:30 PM\nSaturday: 1:30 PM - 10:30 PM\nSunday: Closed",
    peak_hours: "7:00 PM - 9:00 PM",
    quiet_hours: "1:30 PM - 3:00 PM",
    smart_visit: "Book well in advance and visit during quiet hours for the best experience",
    custom_score: 9.8,
    score_summary: "One of Mexico City's finest dining experiences",
    accessibility_score: 9.5,
    ambience_score: 9.8,
    food_score: 9.9,
    service_score: 9.7,
    value_score: 9.0,
    latitude: 19.4319,
    longitude: -99.1912,
    local_tips: "Don't miss the signature mole dish that's been aging since 2013",
    website_url: "https://www.pujol.com.mx",
    phone_number: "+52 55 5545 4111",
    place_id: "ChIJB0BpD_b_0YURknH_SJD3ZQs",
    restaurant_translations: [
      {
        name: "Pujol",
        description: "Renowned chef Enrique Olvera's elegant Mexico City restaurant serving refined Mexican cuisine",
        language: "en"
      },
      {
        name: "Pujol",
        description: "Elegante restaurante del reconocido chef Enrique Olvera que sirve refinada cocina mexicana",
        language: "es"
      }
    ],
    neighborhoods: [
      {
        neighborhood_translations: [
          {
            name: "Polanco",
            language: "en"
          },
          {
            name: "Polanco",
            language: "es"
          }
        ]
      }
    ],
    restaurant_categories: [
      {
        category: {
          category_translations: [
            {
              name: "Contemporary Mexican",
              language: "en"
            },
            {
              name: "Mexicana Contemporánea",
              language: "es"
            }
          ]
        }
      }
    ]
  }
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