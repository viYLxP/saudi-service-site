import { cityIds, site } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

const values = ['punctual', 'transparent', 'clean', 'support'] as const

const YEARS_IN_BUSINESS = new Date().getFullYear() - site.foundedYear

export function About() {
  const { t, formatNumber } = useI18n()

  // Illustrative figures for the demo company.
  const stats = [
    { key: 'years', value: `${formatNumber(YEARS_IN_BUSINESS)}+` },
    { key: 'jobs', value: `${formatNumber(12000)}+` },
    { key: 'cities', value: formatNumber(cityIds.length) },
    { key: 'rating', value: `${formatNumber(4.8, { minimumFractionDigits: 1 })}/${formatNumber(5)}` },
  ] as const

  return (
    <section id="about" className="section section-alt" aria-labelledby="about-title">
      <div className="container about-grid">
        <div>
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} align="start" />
          <p>{t.about.body}</p>
          <p>{t.about.body2}</p>

          <h3 className="sub-heading">{t.about.values.title}</h3>
          <ul className="check-list">
            {values.map((key) => (
              <li key={key}>
                <Icon name="check" size={18} />
                {t.about.values[key]}
              </li>
            ))}
          </ul>
        </div>

        <div className="about-side">
          <dl className="stats">
            {stats.map((stat) => (
              <div key={stat.key} className="stat">
                <dt>{t.about.stats[stat.key]}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="card coverage">
            <h3 className="sub-heading">
              <Icon name="pin" size={20} />
              {t.about.coverageTitle}
            </h3>
            <ul className="chips">
              {cityIds.map((id) => (
                <li key={id} className="chip">
                  {t.cities[id]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
