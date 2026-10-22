import { describe, expect, it } from 'vitest'
import { dictionaries } from '../config'
import { interpolate } from '../format'

/** Collects "a.b.c" paths for every leaf string so both dictionaries can be compared. */
function leafPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) return value.flatMap((item, i) => leafPaths(item, `${prefix}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => leafPaths(child, prefix ? `${prefix}.${key}` : key))
  }
  return [prefix]
}

function leafValues(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(leafValues)
  if (value && typeof value === 'object') return Object.values(value).flatMap(leafValues)
  return [String(value)]
}

describe('dictionaries', () => {
  it('Arabic and English have exactly the same keys (including FAQ items)', () => {
    expect(leafPaths(dictionaries.ar).sort()).toEqual(leafPaths(dictionaries.en).sort())
  })

  it('has no empty strings', () => {
    for (const lang of ['ar', 'en'] as const) {
      expect(leafValues(dictionaries[lang]).filter((v) => v.trim() === '')).toEqual([])
    }
  })

  it('uses the same placeholders in both languages', () => {
    const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(',')
    const en = leafPaths(dictionaries.en)
    const enValues = leafValues(dictionaries.en)
    const arValues = leafValues(dictionaries.ar)
    en.forEach((path, i) => {
      expect(`${path}: ${placeholders(arValues[i])}`).toBe(`${path}: ${placeholders(enValues[i])}`)
    })
  })
})

describe('interpolate', () => {
  it('fills known placeholders and leaves unknown ones', () => {
    expect(interpolate('{a} and {b}', { a: 1 })).toBe('1 and {b}')
  })
})
