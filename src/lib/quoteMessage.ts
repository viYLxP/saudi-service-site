import type { I18nValue } from '../i18n/context'
import { normalizeSaudiMobile, type QuoteFormValues } from './validation'

export interface QuoteSummaryRow {
  label: string
  value: string
  /** Values such as phone numbers and emails stay LTR inside Arabic text. */
  ltr?: boolean
  /** Free text typed by the user: direction follows its own content. */
  userText?: boolean
}

/** Builds the labelled rows shown in the review panel, in the active language. */
export function buildQuoteSummary(values: QuoteFormValues, i18n: Pick<I18nValue, 't' | 'formatDate'>): QuoteSummaryRow[] {
  const { t, formatDate } = i18n
  const f = t.form.fields
  const missing = t.form.review.notProvided
  return [
    { label: f.name, value: values.name.trim(), userText: true },
    { label: f.phone, value: normalizeSaudiMobile(values.phone) ?? values.phone.trim(), ltr: true },
    { label: f.email, value: values.email.trim() || missing, ltr: Boolean(values.email.trim()) },
    { label: f.city, value: values.city ? t.cities[values.city] : missing },
    { label: f.service, value: values.service ? t.services.items[values.service].title : missing },
    { label: f.propertyType, value: values.propertyType ? t.propertyTypes[values.propertyType] : missing },
    { label: f.date, value: values.date ? formatDate(values.date) : missing },
    { label: f.details, value: values.details.trim(), userText: true },
  ]
}

/** Left-to-right mark: keeps "+966…" and emails from being reordered inside Arabic text. */
const LRM = '\u200E'

/** Plain-text message for WhatsApp, email and the clipboard. */
export function buildQuoteMessage(
  values: QuoteFormValues,
  i18n: Pick<I18nValue, 't' | 'formatDate' | 'interpolate'>,
): { subject: string; body: string } {
  const { t, interpolate } = i18n
  const rows = buildQuoteSummary(values, i18n)
  const greeting = interpolate(t.form.message.greeting, { company: t.brand.name })
  const body = [greeting, '', ...rows.map((row) => `${row.label}: ${row.ltr ? LRM : ''}${row.value}`)].join('\n')
  const serviceName = values.service ? t.services.items[values.service].title : ''
  const subject = interpolate(t.form.message.subject, { service: serviceName })
  return { subject, body }
}
