import { Locale } from '@/config/i18n.config';

export interface PageProps {
  params: {
    lang: Locale;
    slug?: string;
    cuisine?: string;
  };
}

export interface Dictionary {
  navigation: {
    home: string;
    restaurants: string;
    guides: string;
    about: string;
    search: string;
    language: string;
  };
  restaurants: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filter: string;
    reviews: string;
    information: string;
    reservation: string;
    bookTable: string;
  };
  lists: {
    title: string;
    subtitle: string;
    places: string;
    reviews: string;
    specialty: string;
  };
  cuisine: {
    title: string;
    subtitle: string;
    restaurants: string;
    description: string;
  };
}