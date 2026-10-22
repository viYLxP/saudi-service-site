import { useEffect, useId, useImperativeHandle, useRef, useState, type ChangeEvent, type FormEvent, type Ref } from 'react'
import { cityIds, propertyTypeIds, serviceIds, site, type ServiceId } from '../config/site'
import { useI18n } from '../i18n/useI18n'
import { mailtoUrl, whatsappUrl } from '../lib/links'
import { buildQuoteMessage, buildQuoteSummary } from '../lib/quoteMessage'
import {
  DETAILS_MAX,
  DETAILS_MIN,
  emptyQuote,
  fieldOrder,
  todayIso,
  validateField,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteFormValues,
} from '../lib/validation'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'
import { useToast } from './useToast'

export interface QuoteFormHandle {
  /** Pre-selects a service (used by the "Request this service" links). */
  selectService: (service: ServiceId) => void
}

/**
 * Request-a-quote form. There is no backend: after validation the request is shown
 * for review and handed off to WhatsApp, the email app, or the clipboard.
 *
 * Values and errors live in component state (errors as codes, not strings), so
 * switching language re-renders the labels without touching what the user typed.
 */
export function QuoteForm({ ref }: { ref?: Ref<QuoteFormHandle> }) {
  const i18n = useI18n()
  const { t, interpolate, formatNumber } = i18n
  const { notify } = useToast()
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const reviewRef = useRef<HTMLHeadingElement>(null)

  const [values, setValues] = useState<QuoteFormValues>(emptyQuote)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const today = todayIso()

  useImperativeHandle(
    ref,
    () => ({
      selectService: (service) => {
        setValues((v) => ({ ...v, service }))
        setErrors((e) => ({ ...e, service: undefined }))
        setReviewing(false)
        notify('serviceSelected', 'info')
      },
    }),
    [notify],
  )

  useEffect(() => {
    if (reviewing) reviewRef.current?.focus()
  }, [reviewing])

  const fieldId = (field: QuoteField) => `${uid}-${field}`
  const errorId = (field: QuoteField) => `${uid}-${field}-error`
  const hintId = (field: QuoteField) => `${uid}-${field}-hint`

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as QuoteField
    const next = { ...values, [field]: event.target.value } as QuoteFormValues
    setValues(next)
    // Once a field has been visited, re-validate as the user types so errors clear promptly.
    if (touched[field] || submitAttempted) {
      setErrors((e) => ({ ...e, [field]: validateField(field, next, today) }))
    }
  }

  const handleBlur = (field: QuoteField) => {
    setTouched((s) => ({ ...s, [field]: true }))
    setErrors((e) => ({ ...e, [field]: validateField(field, values, today) }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const found = validateQuote(values, today)
    setErrors(found)
    setSubmitAttempted(true)
    const firstInvalid = fieldOrder.find((field) => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus()
      return
    }
    setReviewing(true)
  }

  const reset = () => {
    setValues(emptyQuote)
    setErrors({})
    setTouched({})
    setSubmitAttempted(false)
    setReviewing(false)
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const message = buildQuoteMessage(values, i18n)

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(message.body)
      notify('copied')
    } catch {
      notify('copyFailed', 'error')
    }
  }

  const errorText = (field: QuoteField): string | undefined => {
    const code = errors[field]
    if (!code) return undefined
    return interpolate(t.form.errors[code], { min: formatNumber(DETAILS_MIN), max: formatNumber(DETAILS_MAX) })
  }

  /** Shared accessibility props for every control. */
  const controlProps = (field: QuoteField, hasHint = false) => {
    const error = errorText(field)
    const describedBy = [hasHint ? hintId(field) : '', error ? errorId(field) : ''].filter(Boolean).join(' ')
    return {
      id: fieldId(field),
      name: field,
      value: values[field],
      onChange: handleChange,
      onBlur: () => handleBlur(field),
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy || undefined,
    }
  }

  const fieldError = (field: QuoteField) => {
    const error = errorText(field)
    return error ? (
      <p id={errorId(field)} className="field-error">
        <Icon name="alert" size={16} />
        {error}
      </p>
    ) : null
  }

  const label = (field: QuoteField, required = false) => (
    <label htmlFor={fieldId(field)}>
      {t.form.fields[field]}
      {required ? (
        <span className="required" aria-hidden="true">
          {' '}
          *
        </span>
      ) : (
        <span className="optional"> ({t.form.optional})</span>
      )}
    </label>
  )

  return (
    <section id="quote" className="section quote-section" aria-labelledby="quote-title">
      <div className="container container-narrow">
        <SectionHeading id="quote-title" eyebrow={t.form.eyebrow} title={t.form.title} subtitle={t.form.subtitle} />

        <div className="notice notice-info" data-testid="prototype-notice">
          <Icon name="info" />
          <p>{t.form.prototypeNotice}</p>
        </div>

        {reviewing ? (
          <div className="card review" data-testid="quote-review">
            <h3 ref={reviewRef} tabIndex={-1}>
              {t.form.review.title}
            </h3>
            <p className="muted">{t.form.review.intro}</p>
            <dl className="review-list">
              {buildQuoteSummary(values, i18n).map((row) => (
                <div key={row.label} className="review-row">
                  <dt>{row.label}</dt>
                  <dd dir={row.ltr ? 'ltr' : row.userText ? 'auto' : undefined} className={row.ltr ? 'ltr-value' : undefined}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="review-actions">
              <a
                className="btn btn-whatsapp"
                href={whatsappUrl(site.whatsappDigits, message.body)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => notify('whatsappOpened', 'info')}
              >
                <Icon name="whatsapp" size={18} />
                {t.form.review.sendWhatsapp}
                <span className="sr-only"> {t.a11y.opensInNewTab}</span>
              </a>
              <a
                className="btn btn-outline"
                href={mailtoUrl(site.email, message.subject, message.body)}
                onClick={() => notify('emailOpened', 'info')}
              >
                <Icon name="mail" size={18} />
                {t.form.review.sendEmail}
              </a>
              <button type="button" className="btn btn-outline" onClick={copyRequest}>
                <Icon name="copy" size={18} />
                {t.form.review.copy}
              </button>
            </div>
            <div className="review-secondary">
              <button type="button" className="btn btn-ghost" onClick={() => setReviewing(false)}>
                <Icon name="edit" size={18} />
                {t.form.review.edit}
              </button>
              <button type="button" className="btn btn-ghost" onClick={reset}>
                {t.form.review.newRequest}
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} className="card quote-form" noValidate onSubmit={handleSubmit} data-testid="quote-form">
            <p className="muted small">{t.form.requiredHint}</p>

            {submitAttempted && errorCount > 0 && (
              <div className="notice notice-error" role="alert">
                <Icon name="alert" />
                <p>{interpolate(t.form.errors.summary, { count: formatNumber(errorCount) })}</p>
              </div>
            )}

            <div className="form-grid">
              <div className="field">
                {label('name', true)}
                <input type="text" autoComplete="name" dir="auto" placeholder={t.form.placeholders.name} {...controlProps('name')} />
                {fieldError('name')}
              </div>

              <div className="field">
                {label('phone', true)}
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  dir="ltr"
                  className="ltr-input"
                  placeholder={t.form.placeholders.phone}
                  {...controlProps('phone', true)}
                />
                <p id={hintId('phone')} className="field-hint">
                  {t.form.hints.phone}
                </p>
                {fieldError('phone')}
              </div>

              <div className="field">
                {label('email')}
                <input
                  type="email"
                  autoComplete="email"
                  dir="ltr"
                  className="ltr-input"
                  placeholder={t.form.placeholders.email}
                  {...controlProps('email')}
                />
                {fieldError('email')}
              </div>

              <div className="field">
                {label('city', true)}
                <div className="select-wrap">
                  <select {...controlProps('city')}>
                    <option value="">{t.form.selectPlaceholder}</option>
                    {cityIds.map((id) => (
                      <option key={id} value={id}>
                        {t.cities[id]}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" className="select-chevron" />
                </div>
                {fieldError('city')}
              </div>

              <div className="field">
                {label('service', true)}
                <div className="select-wrap">
                  <select {...controlProps('service')}>
                    <option value="">{t.form.selectPlaceholder}</option>
                    {serviceIds.map((id) => (
                      <option key={id} value={id}>
                        {t.services.items[id].title}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" className="select-chevron" />
                </div>
                {fieldError('service')}
              </div>

              <div className="field">
                {label('propertyType')}
                <div className="select-wrap">
                  <select {...controlProps('propertyType')}>
                    <option value="">{t.form.selectPlaceholder}</option>
                    {propertyTypeIds.map((id) => (
                      <option key={id} value={id}>
                        {t.propertyTypes[id]}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" className="select-chevron" />
                </div>
                {fieldError('propertyType')}
              </div>

              <div className="field">
                {label('date', true)}
                <input type="date" min={today} {...controlProps('date')} />
                {fieldError('date')}
              </div>

              <div className="field field-full">
                {label('details', true)}
                <textarea
                  rows={5}
                  dir="auto"
                  maxLength={DETAILS_MAX + 50}
                  placeholder={t.form.placeholders.details}
                  {...controlProps('details', true)}
                />
                <p id={hintId('details')} className="field-hint counter">
                  {interpolate(t.form.hints.details, {
                    count: formatNumber(values.details.trim().length),
                    max: formatNumber(DETAILS_MAX),
                  })}
                </p>
                {fieldError('details')}
              </div>
            </div>

            {/*
              Prevent the mousedown from blurring the focused field: blur validation would
              insert an error message, shift this button, and swallow the click.
            */}
            <button type="submit" className="btn btn-primary btn-block" onMouseDown={(e) => e.preventDefault()}>
              {t.form.submit}
              <Icon name="arrow" flip size={18} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
