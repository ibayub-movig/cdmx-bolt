import 'server-only'
import type { Lang } from '@/src/lib/utils'
import type { Dictionary } from '@/types/dictionary'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  es: () => import('@/dictionaries/es.json').then(module => module.default),
}

export const getServerDictionary = async (locale: Lang) => {
  try {
    return await dictionaries[locale]()
  } catch (error) {
    throw new Error(`Failed to load dictionary for locale: ${locale}`)
  }
}

export const getDictionary = getServerDictionary;
