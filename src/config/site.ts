/**
 * Business details shown across the site.
 *
 * Everything here is a PLACEHOLDER for a fictional demo company.
 * Replace these values with the real business details before publishing.
 */
export const site = {
  /** International format, digits only, no "+" (used for wa.me and tel: links). */
  phoneE164Digits: '966500000000',
  /** How the phone number is displayed. Kept LTR in both languages. */
  phoneDisplay: '+966 50 000 0000',
  whatsappDigits: '966500000000',
  email: 'hello@example.com',
  /** Set to a real Google Maps link once the office address is known. */
  mapUrl: '',
  /** Optional social links. Empty strings are hidden. */
  social: {
    x: '',
    instagram: '',
    linkedin: '',
  },
  /** Year the (fictional) company was founded; used for the "years of experience" stat. */
  foundedYear: 2014,
  /** Set to false once real contact details are configured to hide the demo notice. */
  isDemo: true,
} as const

/** In-page sections linked from the header and footer navigation. */
export const navSections = ['services', 'about', 'process', 'faq', 'contact'] as const

export const serviceIds = ['ac', 'cleaning', 'plumbing', 'electrical', 'pest', 'moving'] as const
export type ServiceId = (typeof serviceIds)[number]

export const cityIds = ['riyadh', 'jeddah', 'dammam', 'khobar', 'makkah', 'madinah'] as const
export type CityId = (typeof cityIds)[number]

export const propertyTypeIds = ['apartment', 'villa', 'office', 'retail'] as const
export type PropertyTypeId = (typeof propertyTypeIds)[number]
