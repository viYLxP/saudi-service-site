import { DEFAULT_LANG, STORAGE_KEY, isLang, type Lang } from './config'

/** localStorage can throw (private mode, blocked storage), so every access is guarded. */
export function readSavedLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isLang(value) ? value : null
  } catch {
    return null
  }
}

export function saveLang(lang: Lang): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Storage unavailable: the choice still applies for this visit.
  }
}

/** Saved preference → browser language → default (Arabic, the primary market). */
export function detectInitialLang(): Lang {
  const saved = readSavedLang()
  if (saved) return saved
  const browserLangs = typeof navigator !== 'undefined' ? navigator.languages ?? [navigator.language] : []
  for (const tag of browserLangs) {
    const base = tag?.toLowerCase().split('-')[0]
    if (isLang(base)) return base
  }
  return DEFAULT_LANG
}
