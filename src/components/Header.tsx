import { useEffect, useRef, useState } from 'react'
import { navSections } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on Escape, lock page scroll while the mobile menu is open, and move focus into it.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [open])

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 961px)')
    const onChange = () => media.matches && setOpen(false)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            <Icon name="shield" size={22} />
          </span>
          <span className="brand-text">
            <strong>{t.brand.name}</strong>
            <small>{t.brand.tagline}</small>
          </span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>

        <div className={`nav-backdrop ${open ? 'is-open' : ''}`} onClick={close} aria-hidden="true" />

        <div id="site-nav" ref={panelRef} className={`nav-panel ${open ? 'is-open' : ''}`}>
          <nav aria-label={t.a11y.mainNav}>
            <ul className="nav-list">
              {navSections.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={close}>
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-actions">
            <LanguageSwitcher />
            <a href="#quote" className="btn btn-primary btn-sm" onClick={close}>
              {t.nav.quote}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
