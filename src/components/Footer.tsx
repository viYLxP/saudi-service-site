import { navSections, serviceIds, site } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { mailtoUrl, telUrl } from '../lib/links'
import { Icon } from './Icon'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const { t, interpolate, formatNumber } = useI18n()
  const year = formatNumber(CURRENT_YEAR, { useGrouping: false })

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{t.brand.name}</p>
          <p>{t.footer.about}</p>
        </div>
        <nav aria-label={t.a11y.footerNav}>
          <h2 className="footer-title">{t.footer.quickLinks}</h2>
          <ul>
            {navSections.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
            <li>
              <a href="#quote">{t.nav.quote}</a>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="footer-title">{t.footer.services}</h2>
          <ul>
            {serviceIds.map((id) => (
              <li key={id}>{t.services.items[id].title}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-title">{t.footer.contact}</h2>
          <ul>
            <li>
              <a href={telUrl(site.phoneE164Digits)} dir="ltr" className="ltr-value">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={mailtoUrl(site.email)} dir="ltr" className="ltr-value">
                {site.email}
              </a>
            </li>
            <li>{t.contact.addressValue}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          {interpolate(t.footer.rights, { year, company: t.brand.name })}
          {site.isDemo && <span className="muted"> · {t.footer.demo}</span>}
        </p>
        <a href="#top" className="back-to-top">
          <Icon name="arrowUp" size={16} />
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
