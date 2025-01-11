import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { i18n } from '@/config/i18n.config';

// Keep existing style utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type for supported languages
export type Lang = (typeof i18n.locales)[number];

// Validate language parameter
export function isValidLang(lang: string): lang is Lang {
  return i18n.locales.includes(lang as Lang);
}

// Generate canonical URL
export function getCanonicalUrl(
  path: string = '',
  lang: Lang = 'en'
): string {
  const baseUrl = 'https://bestcdmx.com';
  return `${baseUrl}/${lang}${path}`.replace(/\/+/g, '/');
}

// Format URL with language
export function formatURL(path: string, lang: Lang): string {
  return `/${lang}${path}`.replace(/\/+/g, '/');
}

// Generate alternate URLs for all supported languages
export function getLanguageAlternates(path: string = '') {
  const baseUrl = 'https://bestcdmx.com';
  return i18n.locales.reduce((acc, locale) => {
    acc[locale === 'en' ? 'en-US' : 'es-MX'] = `${baseUrl}/${locale}${path}`;
    return acc;
  }, {} as Record<string, string>);
}

// Generate structured data helper
export function generateStructuredData(
  type: 'Restaurant' | 'Attraction' | 'Article',
  data: any,
  lang: Lang
) {
  const baseUrl = 'https://bestcdmx.com';

  const common = {
    '@context': 'https://schema.org',
    '@type': type,
    url: `${baseUrl}/${lang}/${data.slug}`,
    image: data.image,
    inLanguage: lang === 'en' ? 'en-US' : 'es-MX',
  };

  switch (type) {
    case 'Restaurant':
      return {
        ...common,
        name: data.name,
        description: data.description,
        servesCuisine: data.cuisine,
        priceRange: data.priceRange,
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.address,
          addressLocality: 'Mexico City',
          addressRegion: 'CDMX',
          addressCountry: 'MX',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.latitude,
          longitude: data.longitude,
        },
        aggregateRating: data.rating && {
          '@type': 'AggregateRating',
          ratingValue: data.rating.value,
          reviewCount: data.rating.count,
        },
      };

    case 'Attraction':
      return {
        ...common,
        name: data.name,
        description: data.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.address,
          addressLocality: 'Mexico City',
          addressRegion: 'CDMX',
          addressCountry: 'MX',
        },
        isAccessibleForFree: data.isFree,
        openingHours: data.hours,
      };

    case 'Article':
      return {
        ...common,
        headline: data.title,
        description: data.description,
        articleBody: data.content,
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        author: {
          '@type': 'Person',
          name: data.author,
        },
      };
  }
}

// Format date for SEO and display
export function formatDate(date: string, lang: Lang): string {
  return new Date(date).toLocaleDateString(
    lang === 'en' ? 'en-US' : 'es-MX',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
}

// Clean and format text for SEO
export function cleanText(text: string): string {
  return text
    .replace(/[^\w\s-]/g, '')  // Remove special characters
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');     // Replace spaces with hyphens
}
