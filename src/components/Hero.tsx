import { site } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { whatsappUrl } from '../lib/links'
import { Icon } from './Icon'

const points = ['licensed', 'sameDay', 'warranty'] as const

export function Hero() {
  const { t, interpolate, formatNumber } = useI18n()
  const waText = interpolate(t.contact.whatsappGreeting, { company: t.brand.name })

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title">{t.hero.title}</h1>
          <p className="hero-subtitle">{t.hero.subtitle}</p>
          <div className="hero-ctas">
            <a href="#quote" className="btn btn-primary">
              {t.hero.primaryCta}
              <Icon name="arrow" flip size={18} />
            </a>
            <a
              href={whatsappUrl(site.whatsappDigits, waText)}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={18} />
              {t.hero.secondaryCta}
              <span className="sr-only"> {t.a11y.opensInNewTab}</span>
            </a>
          </div>
          <ul className="hero-points">
            {points.map((key) => (
              <li key={key}>
                <Icon name="check" size={18} />
                {t.hero.points[key]}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-art">
            <Icon name="ac" size={56} />
            <Icon name="plumbing" size={56} />
            <Icon name="electrical" size={56} />
            <Icon name="cleaning" size={56} />
          </div>
          <div className="hero-card">
            <Icon name="clock" size={28} />
            <div>
              <p className="hero-card-title">{t.hero.cardTitle}</p>
              <p className="hero-card-value">{interpolate(t.hero.cardValue, { count: formatNumber(45) })}</p>
              <p className="hero-card-note">{t.hero.cardNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
