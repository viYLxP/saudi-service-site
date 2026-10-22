import { serviceIds, type ServiceId } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Services({ onRequest }: { onRequest: (service: ServiceId) => void }) {
  const { t } = useI18n()
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHeading
          id="services-title"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />
        <ul className="services-grid">
          {serviceIds.map((id) => (
            <li key={id} className="card service-card">
              <span className="service-icon">
                <Icon name={id} size={28} />
              </span>
              <h3>{t.services.items[id].title}</h3>
              <p>{t.services.items[id].description}</p>
              <a
                href="#quote"
                className="link-arrow"
                onClick={() => onRequest(id)}
                aria-label={`${t.services.cta}: ${t.services.items[id].title}`}
              >
                {t.services.cta}
                <Icon name="arrow" flip size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
