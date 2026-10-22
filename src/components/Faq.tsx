import { useId, useState } from 'react'
import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Faq() {
  const { t } = useI18n()
  const baseId = useId()
  // Track open items by index so they stay open when the language changes.
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section section-alt" aria-labelledby="faq-title">
      <div className="container container-narrow">
        <SectionHeading id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="faq-list">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index
            const buttonId = `${baseId}-q${index}`
            const panelId = `${baseId}-a${index}`
            return (
              <div key={index} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <Icon name="chevronDown" className="faq-chevron" />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
