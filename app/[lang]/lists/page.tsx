import { Suspense } from 'react';
import { Metadata } from 'next';
import { getServerDictionary } from '@/src/lib/get-dictionary';
import { ListsGrid } from './components/lists-grid';
import type { PageProps } from '@/types/shared';
import type { List } from '@/types/list';

const lists: List[] = [
  {
    id: 'best-tacos',
    title: 'Best Tacos in CDMX',
    description: 'From street stands to upscale restaurants, discover the best tacos in Mexico City.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80',
    count: 10,
  },
  {
    id: 'fine-dining',
    title: 'Top Fine Dining',
    description: 'Experience the finest restaurants Mexico City has to offer.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80',
    count: 10,
  },
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const dict = await getServerDictionary(params.lang);
  
  return {
    title: dict.lists.title,
    description: dict.lists.description,
  };
}

export default async function ListsPage({ params: { lang } }: PageProps) {
  const dict = await getServerDictionary(lang);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold">{dict.lists.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {dict.lists.description}
        </p>
      </div>

      <Suspense fallback={<div>Loading lists...</div>}>
        <ListsGrid
          lists={lists}
          dict={{
            ...dict.lists,
            places: 'Places'
          }}
          lang={lang}
        />
      </Suspense>
    </div>
  );
}