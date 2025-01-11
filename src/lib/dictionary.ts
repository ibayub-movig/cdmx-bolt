import type { Lang } from '@/src/lib/utils'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Lang) => {
  return dictionaries[locale]();
};
