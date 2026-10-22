import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'

/**
 * Toggles between Arabic and English. The visible label is the target language
 * written in that language (with a matching `lang` attribute so screen readers
 * pronounce it correctly). Hidden text describes the action while keeping the
 * visible label part of the accessible name.
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { t, toggleLang } = useI18n()
  return (
    <button
      type="button"
      className={`lang-switch ${className}`}
      onClick={toggleLang}
      data-testid="lang-switch"
    >
      <Icon name="globe" size={18} />
      <span className="sr-only">{t.a11y.switchLanguage}: </span>
      <span lang={t.language.switchToLang}>{t.language.switchTo}</span>
    </button>
  )
}
