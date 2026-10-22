import { createContext } from 'react'
import type { Dir, Lang } from './config'
import type { interpolate } from './format'
import type { Dictionary } from './locales/en'

export interface I18nValue {
  lang: Lang
  dir: Dir
  /** BCP 47 tag for Intl formatting. */
  locale: string
  /** The active dictionary. Fully typed, so a missing key is a compile error. */
  t: Dictionary
  setLang: (lang: Lang) => void
  toggleLang: () => void
  interpolate: typeof interpolate
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
  formatDate: (isoDate: string) => string
}

export const LanguageContext = createContext<I18nValue | null>(null)
