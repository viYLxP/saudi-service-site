import { describe, expect, it } from 'vitest'
import { emptyQuote, normalizeSaudiMobile, validateQuote, type QuoteFormValues } from '../validation'

describe('normalizeSaudiMobile', () => {
  it.each([
    ['0512345678', '+966512345678'],
    ['512345678', '+966512345678'],
    ['+966 51 234 5678', '+966512345678'],
    ['00966512345678', '+966512345678'],
    ['966-51-234-5678', '+966512345678'],
    ['٠٥١٢٣٤٥٦٧٨', '+966512345678'],
  ])('accepts %s', (input, expected) => {
    expect(normalizeSaudiMobile(input)).toBe(expected)
  })

  it.each(['', '0112345678', '05123', '+971512345678', 'abc', '05123456789'])('rejects %s', (input) => {
    expect(normalizeSaudiMobile(input)).toBeNull()
  })
})

describe('validateQuote', () => {
  const valid: QuoteFormValues = {
    ...emptyQuote,
    name: 'Sara',
    phone: '0512345678',
    city: 'riyadh',
    service: 'ac',
    date: '2030-01-01',
    details: 'The AC is leaking water.',
  }

  it('passes a complete request', () => {
    expect(validateQuote(valid, '2029-12-31')).toEqual({})
  })

  it('reports error codes, not messages', () => {
    expect(validateQuote(emptyQuote, '2030-01-01')).toEqual({
      name: 'required',
      phone: 'required',
      city: 'required',
      service: 'required',
      date: 'required',
      details: 'required',
    })
  })

  it('rejects past dates, bad email and short details', () => {
    const errors = validateQuote({ ...valid, date: '2020-01-01', email: 'nope', details: 'short' }, '2030-01-01')
    expect(errors).toEqual({ date: 'pastDate', email: 'invalidEmail', details: 'detailsTooShort' })
  })
})
