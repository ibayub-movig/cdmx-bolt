import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/lib/get-dictionary';
import { ListContent } from './components/list-content';
import type { PageProps } from '@/types/shared';
import type { DetailedList } from '@/types/list';

// Sample data - In production, this would come from your database
const list: DetailedList = {
  id: 'best-tacos',
  title: 'Best Tacos in CDMX',
  description: 'From street stands to upscale restaurants, discover the best tacos in Mexico City.',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
  places: [
    {
      id: 1,
      rank: 1,
      name: 'El Turix',
      slug: 'el-turix',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
      location: 'Polanco',
      rating: 4.8,
      reviews: 850,
      description: 'Famous for their cochinita pibil tacos, this small spot is a local favorite.',
      specialty: 'Cochinita Pibil Tacos',
    },
    // Add more places...
  ],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: list.title,
    description: list.description,
    openGraph: {
      title: list.title,
      description: list.description,
      images: [list.image],
    },
  };
}

export default async function ListPage({ params: { lang } }: PageProps) {
  const dict = await getServerDictionary(lang);

  return (
    <div className="container px-4 py-8 mx-auto">
      <Suspense fallback={<div>Loading list details...</div>}>
        <ListContent
          list={list}
          dict={{
            reviews: 'Reviews',
            specialty: 'Specialty'
          }}
          lang={lang}
        />
      </Suspense>
    </div>
  );
}