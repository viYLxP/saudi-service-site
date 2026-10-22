import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, directions, intlLocales, type Lang } from './config'
import { formatIsoDate, formatNumber, interpolate } from './format'
import type { Dictionary } from './locales/en'
import { LanguageContext, type I18nValue } from './context'
import { detectInitialLang, saveLang } from './storage'

function applyToDocument(lang: Lang, t: Dictionary) {
  const root = document.documentElement
  root.lang = lang
  root.dir = directions[lang]
  document.title = t.meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
}

export function LanguageProvider({ children, initialLang }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLangState] = useState<Lang>(() => initialLang ?? detectInitialLang())

  useEffect(() => {
    applyToDocument(lang, dictionaries[lang])
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    saveLang(next)
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next: Lang = current === 'ar' ? 'en' : 'ar'
      saveLang(next)
      return next
    })
  }, [])

  const value = useMemo<I18nValue>(() => {
    const locale = intlLocales[lang]
    return {
      lang,
      dir: directions[lang],
      locale,
      t: dictionaries[lang],
      setLang,
      toggleLang,
      interpolate,
      formatNumber: (n, options) => formatNumber(locale, n, options),
      formatDate: (iso) => formatIsoDate(locale, iso),
    }
  }, [lang, setLang, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
