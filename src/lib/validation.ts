import { cityIds, propertyTypeIds, serviceIds, type CityId, type PropertyTypeId, type ServiceId } from '../config/site'
import { toLatinDigits } from './digits'

export interface QuoteFormValues {
  name: string
  phone: string
  email: string
  city: CityId | ''
  service: ServiceId | ''
  propertyType: PropertyTypeId | ''
  date: string
  details: string
}

export type QuoteField = keyof QuoteFormValues

/** Error codes, not messages, so errors re-translate when the language changes. */
export type ErrorCode =
  | 'required'
  | 'nameTooShort'
  | 'invalidPhone'
  | 'invalidEmail'
  | 'pastDate'
  | 'detailsTooShort'
  | 'detailsTooLong'

export type QuoteErrors = Partial<Record<QuoteField, ErrorCode>>

export const DETAILS_MIN = 10
export const DETAILS_MAX = 500

export const emptyQuote: QuoteFormValues = {
  name: '',
  phone: '',
  email: '',
  city: '',
  service: '',
  propertyType: '',
  date: '',
  details: '',
}

/** Field order used for focusing the first invalid field. */
export const fieldOrder: QuoteField[] = ['name', 'phone', 'email', 'city', 'service', 'propertyType', 'date', 'details']

/**
 * Normalises a Saudi mobile number to +9665XXXXXXXX.
 * Accepts 05XXXXXXXX, 5XXXXXXXX, 9665XXXXXXXX, +9665XXXXXXXX and 009665XXXXXXXX,
 * with spaces/dashes/brackets and Arabic-Indic digits. Returns null if invalid.
 */
export function normalizeSaudiMobile(input: string): string | null {
  let digits = toLatinDigits(input).replace(/[\s\-().]/g, '')
  if (digits.startsWith('+')) digits = digits.slice(1)
  else if (digits.startsWith('00')) digits = digits.slice(2)
  if (!/^\d+$/.test(digits)) return null
  if (digits.startsWith('966')) digits = digits.slice(3)
  else if (digits.startsWith('0')) digits = digits.slice(1)
  return /^5\d{8}$/.test(digits) ? `+966${digits}` : null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Today's date as yyyy-mm-dd in the user's local timezone. */
export function todayIso(now: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function validateField(field: QuoteField, values: QuoteFormValues, today = todayIso()): ErrorCode | undefined {
  const value = values[field].trim()
  switch (field) {
    case 'name':
      if (!value) return 'required'
      if (value.length < 2) return 'nameTooShort'
      return undefined
    case 'phone':
      if (!value) return 'required'
      return normalizeSaudiMobile(value) ? undefined : 'invalidPhone'
    case 'email':
      if (!value) return undefined
      return EMAIL_RE.test(value) ? undefined : 'invalidEmail'
    case 'city':
      return (cityIds as readonly string[]).includes(value) ? undefined : 'required'
    case 'service':
      return (serviceIds as readonly string[]).includes(value) ? undefined : 'required'
    case 'propertyType':
      if (!value) return undefined
      return (propertyTypeIds as readonly string[]).includes(value) ? undefined : 'required'
    case 'date':
      if (!value) return 'required'
      // yyyy-mm-dd strings compare correctly as text.
      return value < today ? 'pastDate' : undefined
    case 'details':
      if (!value) return 'required'
      if (value.length < DETAILS_MIN) return 'detailsTooShort'
      if (value.length > DETAILS_MAX) return 'detailsTooLong'
      return undefined
  }
}

export function validateQuote(values: QuoteFormValues, today = todayIso()): QuoteErrors {
  const errors: QuoteErrors = {}
  for (const field of fieldOrder) {
    const code = validateField(field, values, today)
    if (code) errors[field] = code
  }
  return errors
}
