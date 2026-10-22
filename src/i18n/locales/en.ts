/**
 * English dictionary. This file defines the shape of every dictionary:
 * `ar.ts` must match it exactly (enforced by the `Dictionary` type).
 *
 * Placeholders use {curly} braces and are filled by `interpolate()`.
 */
const en = {
  meta: {
    title: 'Masar Services | Home & Facility Maintenance in Saudi Arabia',
    description:
      'AC maintenance, cleaning, plumbing, electrical, pest control and moving services across Saudi Arabia. Request a free quote.',
  },
  brand: {
    name: 'Masar Services',
    tagline: 'Home & facility maintenance',
  },
  a11y: {
    skipToContent: 'Skip to main content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    footerNav: 'Footer navigation',
    switchLanguage: 'Switch language to Arabic',
    opensInNewTab: '(opens in a new tab)',
    toggleAnswer: 'Show or hide answer',
    notifications: 'Notifications',
    dismiss: 'Dismiss notification',
  },
  language: {
    /** Label shown on the switcher: the language you will switch TO. */
    switchTo: 'العربية',
    switchToLang: 'ar',
    current: 'English',
  },
  nav: {
    services: 'Services',
    about: 'About',
    process: 'How it works',
    faq: 'FAQs',
    contact: 'Contact',
    quote: 'Request a quote',
  },
  hero: {
    eyebrow: 'Trusted across the Kingdom',
    title: 'Reliable home and facility services, done right the first time',
    subtitle:
      'From AC maintenance to deep cleaning and moving, our certified technicians serve homes and businesses in major Saudi cities.',
    primaryCta: 'Request a free quote',
    secondaryCta: 'Chat on WhatsApp',
    points: {
      licensed: 'Licensed, insured technicians',
      sameDay: 'Same-day visits in most cities',
      warranty: 'Workmanship warranty on every job',
    },
    cardTitle: 'Average response time',
    cardValue: '{count} minutes',
    cardNote: 'during working hours',
  },
  services: {
    eyebrow: 'What we do',
    title: 'Our services',
    subtitle: 'One trusted team for maintenance, cleaning and relocation needs.',
    cta: 'Request this service',
    items: {
      ac: {
        title: 'AC maintenance',
        description: 'Installation, cleaning, gas refill and repair for split, window and central units.',
      },
      cleaning: {
        title: 'Deep cleaning',
        description: 'Move-in, move-out and periodic cleaning for homes, offices and shops.',
      },
      plumbing: {
        title: 'Plumbing',
        description: 'Leak detection, water heaters, pipe repairs and bathroom fixture installation.',
      },
      electrical: {
        title: 'Electrical works',
        description: 'Wiring, lighting, panels and safe troubleshooting by qualified electricians.',
      },
      pest: {
        title: 'Pest control',
        description: 'Safe, approved treatments for insects and rodents with follow-up visits.',
      },
      moving: {
        title: 'Moving & furniture',
        description: 'Packing, moving, furniture disassembly and assembly within and between cities.',
      },
    },
  },
  about: {
    eyebrow: 'About us',
    title: 'A local team built on trust',
    body: 'Masar Services was founded to make home and facility maintenance simple and dependable. We send vetted technicians on time, quote clearly before work starts, and stand behind every job with a warranty.',
    body2:
      'We work with families, property managers and small businesses, and we adapt our schedule to prayer times and working hours.',
    stats: {
      years: 'Years of experience',
      jobs: 'Completed jobs',
      cities: 'Cities covered',
      rating: 'Average customer rating',
    },
    values: {
      title: 'What you can expect',
      punctual: 'On-time arrival with an advance call',
      transparent: 'Clear pricing before any work begins',
      clean: 'Tidy work areas and respectful technicians',
      support: 'Bilingual support in Arabic and English',
    },
    coverageTitle: 'Cities we serve',
  },
  process: {
    eyebrow: 'How it works',
    title: 'Four simple steps',
    steps: {
      request: { title: 'Send your request', description: 'Fill in the quote form or message us on WhatsApp.' },
      confirm: { title: 'Get a clear quote', description: 'We confirm the scope, price and a time that suits you.' },
      visit: { title: 'Technician visit', description: 'A certified technician arrives equipped and on time.' },
      followUp: { title: 'Follow-up', description: 'We check you are satisfied and honour the warranty.' },
    },
  },
  cities: {
    riyadh: 'Riyadh',
    jeddah: 'Jeddah',
    dammam: 'Dammam',
    khobar: 'Al Khobar',
    makkah: 'Makkah',
    madinah: 'Madinah',
  },
  propertyTypes: {
    apartment: 'Apartment',
    villa: 'Villa',
    office: 'Office',
    retail: 'Shop / retail',
  },
  form: {
    eyebrow: 'Request a quote',
    title: 'Tell us what you need',
    subtitle: 'Fill in the details and we will prepare your request for WhatsApp or email.',
    prototypeNotice:
      'Prototype: this form does not store or send data to a server. After you review your request, it opens in WhatsApp or your email app so you can send it yourself.',
    requiredHint: 'Fields marked * are required.',
    fields: {
      name: 'Full name',
      phone: 'Mobile number',
      email: 'Email',
      city: 'City',
      service: 'Service',
      propertyType: 'Property type',
      date: 'Preferred date',
      details: 'Describe the job',
    },
    placeholders: {
      name: 'e.g. Abdullah Al-Qahtani',
      phone: '05XXXXXXXX',
      email: 'name@example.com',
      details: 'e.g. Split AC in the living room is not cooling and is leaking water.',
    },
    hints: {
      phone: 'Saudi mobile number starting with 05 or +966 5.',
      details: '{count} / {max} characters',
    },
    selectPlaceholder: 'Select…',
    optional: 'optional',
    submit: 'Review request',
    errors: {
      summary: 'Please fix {count} field(s) before continuing.',
      required: 'This field is required.',
      nameTooShort: 'Please enter at least 2 characters.',
      invalidPhone: 'Enter a valid Saudi mobile number, e.g. 0512345678.',
      invalidEmail: 'Enter a valid email address.',
      pastDate: 'Choose today or a future date.',
      detailsTooShort: 'Please add a little more detail (at least {min} characters).',
      detailsTooLong: 'Please keep the description under {max} characters.',
    },
    review: {
      title: 'Review your request',
      intro: 'Check the details below, then choose how to send them. Nothing has been sent yet.',
      sendWhatsapp: 'Send via WhatsApp',
      sendEmail: 'Send via email',
      copy: 'Copy request',
      edit: 'Edit request',
      newRequest: 'Start a new request',
      notProvided: 'Not provided',
    },
    message: {
      greeting: 'Hello {company}, I would like to request a quote.',
      subject: 'Quote request: {service}',
    },
  },
  faq: {
    eyebrow: 'FAQs',
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Which cities do you cover?',
        a: 'We currently serve Riyadh, Jeddah, Dammam, Al Khobar, Makkah and Madinah. Contact us for other locations.',
      },
      {
        q: 'How is the price calculated?',
        a: 'After reviewing your request we confirm a clear price based on the job scope. For complex jobs, a technician may inspect on site first.',
      },
      {
        q: 'Do you offer a warranty?',
        a: 'Yes. Workmanship is covered by a warranty, and spare parts follow the manufacturer warranty.',
      },
      {
        q: 'Can I book for the same day?',
        a: 'Same-day visits are available in most cities depending on technician availability.',
      },
      {
        q: 'Which payment methods do you accept?',
        a: 'Payment is arranged when the quote is confirmed. Contact us to check the options available for your job.',
      },
      {
        q: 'Do you serve businesses?',
        a: 'Yes. We offer one-off visits and periodic maintenance plans for offices, shops and residential buildings.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Get in touch',
    subtitle: 'Reach us by phone, WhatsApp or email. We reply quickly during working hours.',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    whatsappAction: 'Start a chat',
    email: 'Email',
    hours: 'Working hours',
    hoursValue: 'Saturday – Thursday, 8:00 AM – 10:00 PM',
    address: 'Head office',
    addressValue: 'Riyadh, Kingdom of Saudi Arabia',
    map: 'View on map',
    mapUnavailable: 'Map link not configured yet',
    demoNotice:
      'Demo project: the company is fictional and these contact details are placeholders.',
    whatsappGreeting: 'Hello {company}, I have a question about your services.',
  },
  footer: {
    about: 'Home and facility maintenance services for homes and businesses across Saudi Arabia.',
    quickLinks: 'Quick links',
    services: 'Services',
    contact: 'Contact',
    rights: '© {year} {company}. All rights reserved.',
    demo: 'Portfolio demo with placeholder details.',
    backToTop: 'Back to top',
  },
  toast: {
    copied: 'Request copied to the clipboard.',
    copyFailed: 'Could not copy automatically. Please select and copy the text manually.',
    whatsappOpened: 'WhatsApp opened in a new tab. Press send there to submit.',
    emailOpened: 'Your email app should open with the request ready to send.',
    serviceSelected: 'Service selected in the quote form.',
  },
}

export default en
export type Dictionary = typeof en
