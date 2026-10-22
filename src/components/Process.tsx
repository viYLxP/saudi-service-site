import { useI18n } from '../i18n/useI18n'
import { SectionHeading } from './SectionHeading'

const steps = ['request', 'confirm', 'visit', 'followUp'] as const

export function Process() {
  const { t, formatNumber } = useI18n()
  return (
    <section id="process" className="section" aria-labelledby="process-title">
      <div className="container">
        <SectionHeading id="process-title" eyebrow={t.process.eyebrow} title={t.process.title} />
        <ol className="steps">
          {steps.map((key, index) => (
            <li key={key} className="step">
              <span className="step-number" aria-hidden="true">
                {formatNumber(index + 1)}
              </span>
              <h3>{t.process.steps[key].title}</h3>
              <p>{t.process.steps[key].description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
