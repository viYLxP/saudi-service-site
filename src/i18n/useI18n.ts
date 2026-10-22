import { useContext } from 'react'
import { LanguageContext, type I18nValue } from './context'

export function useI18n(): I18nValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}
