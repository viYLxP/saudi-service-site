import ar from './locales/ar'
import en, { type Dictionary } from './locales/en'

export const languages = ['ar', 'en'] as const
export type Lang = (typeof languages)[number]
export type Dir = 'rtl' | 'ltr'

export const dictionaries: Record<Lang, Dictionary> = { ar, en }

export const directions: Record<Lang, Dir> = { ar: 'rtl', en: 'ltr' }

/**
 * BCP 47 tags used with Intl APIs. Arabic forces the Gregorian calendar
 * (ar-SA defaults to the Islamic calendar) while keeping Arabic digits.
 */
export const intlLocales: Record<Lang, string> = {
  ar: 'ar-SA-u-ca-gregory',
  en: 'en-GB',
}

export const STORAGE_KEY = 'masar-services.lang'

/** Used when there is no saved preference and the browser language is not supported. */
export const DEFAULT_LANG: Lang = 'ar'

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (languages as readonly string[]).includes(value)
}
