export function whatsappUrl(phoneDigits: string, text?: string): string {
  const base = `https://wa.me/${phoneDigits}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export function mailtoUrl(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  const query = params.toString().replace(/\+/g, '%20')
  return query ? `mailto:${email}?${query}` : `mailto:${email}`
}

export function telUrl(phoneDigits: string): string {
  return `tel:+${phoneDigits}`
}
