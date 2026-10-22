import { site } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { mailtoUrl, telUrl, whatsappUrl } from '../lib/links'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  const { t, interpolate } = useI18n()
  const waText = interpolate(t.contact.whatsappGreeting, { company: t.brand.name })

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
        />

        {site.isDemo && (
          <div className="notice notice-warning container-narrow">
            <Icon name="info" />
            <p>{t.contact.demoNotice}</p>
          </div>
        )}

        <ul className="contact-grid">
          <li className="card contact-card">
            <span className="contact-icon">
              <Icon name="phone" />
            </span>
            <h3>{t.contact.phone}</h3>
            <a href={telUrl(site.phoneE164Digits)} dir="ltr" className="ltr-value">
              {site.phoneDisplay}
            </a>
          </li>
          <li className="card contact-card">
            <span className="contact-icon contact-icon-wa">
              <Icon name="whatsapp" />
            </span>
            <h3>{t.contact.whatsapp}</h3>
            <a href={whatsappUrl(site.whatsappDigits, waText)} target="_blank" rel="noopener noreferrer">
              {t.contact.whatsappAction}
              <span className="sr-only"> {t.a11y.opensInNewTab}</span>
            </a>
          </li>
          <li className="card contact-card">
            <span className="contact-icon">
              <Icon name="mail" />
            </span>
            <h3>{t.contact.email}</h3>
            <a href={mailtoUrl(site.email)} dir="ltr" className="ltr-value">
              {site.email}
            </a>
          </li>
          <li className="card contact-card">
            <span className="contact-icon">
              <Icon name="clock" />
            </span>
            <h3>{t.contact.hours}</h3>
            <p>{t.contact.hoursValue}</p>
          </li>
          <li className="card contact-card">
            <span className="contact-icon">
              <Icon name="pin" />
            </span>
            <h3>{t.contact.address}</h3>
            <p>{t.contact.addressValue}</p>
            {site.mapUrl ? (
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                {t.contact.map}
                <span className="sr-only"> {t.a11y.opensInNewTab}</span>
              </a>
            ) : (
              <p className="muted small">{t.contact.mapUnavailable}</p>
            )}
          </li>
        </ul>
      </div>
    </section>
  )
}
