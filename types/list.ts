export interface List {
  id: string;
  title: string;
  description: string;
  image: string;
  count: number;
}

export interface RankedPlace {
  id: number;
  rank: number;
  name: string;
  slug: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  specialty: string;
}

export interface DetailedList {
  id: string;
  title: string;
  description: string;
  image: string;
  places: RankedPlace[];
}

export interface ListsGridProps {
  lists: List[];
  dict: {
    places: string;
  };
  lang: string;
}