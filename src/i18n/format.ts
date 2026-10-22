type Vars = Record<string, string | number>

/** Replaces {name} placeholders. Unknown placeholders are left untouched. */
export function interpolate(template: string, vars: Vars): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  )
}

export function formatNumber(locale: string, value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale, options).format(value)
}

/** Formats a yyyy-mm-dd value from <input type="date"> without timezone shifts. */
export function formatIsoDate(locale: string, iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(new Date(y, m - 1, d))
}
