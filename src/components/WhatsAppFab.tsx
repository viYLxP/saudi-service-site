import { site } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { whatsappUrl } from '../lib/links'
import { Icon } from './Icon'

/** Floating WhatsApp button, pinned to the inline-end corner (right in LTR, left in RTL). */
export function WhatsAppFab() {
  const { t, interpolate } = useI18n()
  const text = interpolate(t.contact.whatsappGreeting, { company: t.brand.name })
  return (
    <a
      className="wa-fab"
      href={whatsappUrl(site.whatsappDigits, text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.hero.secondaryCta} ${t.a11y.opensInNewTab}`}
    >
      <Icon name="whatsapp" size={28} />
    </a>
  )
}
