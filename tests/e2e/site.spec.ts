import { expect, test, type Page } from '@playwright/test'

const STORAGE_KEY = 'masar-services.lang'

async function setSavedLang(page: Page, lang: 'ar' | 'en') {
  await page.addInitScript(
    ([key, value]) => {
      // Only seed once so later switches in the same test survive reloads.
      if (!sessionStorage.getItem('seeded')) {
        localStorage.setItem(key, value)
        sessionStorage.setItem('seeded', '1')
      }
    },
    [STORAGE_KEY, lang],
  )
}

async function switchLanguage(page: Page, isMobile: boolean) {
  if (isMobile) await page.getByRole('button', { name: /open menu|فتح القائمة/i }).click()
  await page.getByTestId('lang-switch').click()
  if (isMobile) await page.keyboard.press('Escape')
}

async function expectDocument(page: Page, lang: 'ar' | 'en') {
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
  await expect(page.locator('html')).toHaveAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr')
}

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(0)
}

test.describe('language detection and persistence', () => {
  test('uses Arabic for an Arabic browser with no saved choice', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'ar-SA' })
    const page = await context.newPage()
    await page.goto('/')
    await expectDocument(page, 'ar')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('خدمات منزلية')
    await context.close()
  })

  test('uses English for an English browser with no saved choice', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' })
    const page = await context.newPage()
    await page.goto('/')
    await expectDocument(page, 'en')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Reliable home')
    await context.close()
  })

  test('switching updates lang/dir/title and persists after reload', async ({ page, isMobile }) => {
    await setSavedLang(page, 'en')
    await page.goto('/')
    await expectDocument(page, 'en')
    await expect(page).toHaveTitle(/Masar Services/)

    await switchLanguage(page, isMobile)
    await expectDocument(page, 'ar')
    await expect(page).toHaveTitle(/مسار للخدمات/)
    expect(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)).toBe('ar')

    await page.reload()
    await expectDocument(page, 'ar')
    await expect(page.getByRole('heading', { level: 2, name: 'خدماتنا' })).toBeVisible()

    await switchLanguage(page, isMobile)
    await page.reload()
    await expectDocument(page, 'en')
  })

  test('language switcher is keyboard accessible and has an accessible name', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Keyboard check runs on desktop')
    await setSavedLang(page, 'en')
    await page.goto('/')
    const button = page.getByRole('button', { name: /Switch language to Arabic/ })
    await expect(button).toBeVisible()
    await expect(button.locator('[lang="ar"]')).toHaveText('العربية')
    await button.focus()
    await page.keyboard.press('Enter')
    await expectDocument(page, 'ar')
    await expect(page.getByRole('button', { name: /تغيير اللغة إلى الإنجليزية/ })).toBeFocused()
  })
})

test.describe('layout in both directions', () => {
  for (const lang of ['ar', 'en'] as const) {
    test(`no horizontal overflow and all sections render (${lang})`, async ({ page }) => {
      await setSavedLang(page, lang)
      await page.goto('/')
      for (const id of ['services', 'about', 'process', 'quote', 'faq', 'contact']) {
        await expect(page.locator(`#${id}`)).toBeVisible()
      }
      await expectNoHorizontalOverflow(page)
    })
  }

  test('floating WhatsApp button sits on the inline-end side', async ({ page }) => {
    await setSavedLang(page, 'en')
    await page.goto('/')
    const width = page.viewportSize()!.width
    let box = await page.locator('.wa-fab').boundingBox()
    expect(box!.x).toBeGreaterThan(width / 2)

    await page.evaluate((key) => localStorage.setItem(key, 'ar'), STORAGE_KEY)
    await page.reload()
    box = await page.locator('.wa-fab').boundingBox()
    expect(box!.x).toBeLessThan(width / 2)
  })

  test('Arabic page has no stray English UI text', async ({ page }) => {
    await setSavedLang(page, 'ar')
    await page.goto('/')
    // Open every FAQ answer so their text is checked too.
    const faqButtons = page.locator('.faq-item button')
    for (let i = 0; i < (await faqButtons.count()); i++) {
      if ((await faqButtons.nth(i).getAttribute('aria-expanded')) === 'false') await faqButtons.nth(i).click()
    }
    const text = await page.locator('body').evaluate((body) => {
      const clone = body.cloneNode(true) as HTMLElement
      // Inherently LTR values and the English label on the switcher are allowed.
      clone.querySelectorAll('.ltr-value, [lang="en"], .sr-only, noscript').forEach((el) => el.remove())
      return clone.innerText
    })
    const latinWords = (text.match(/[A-Za-z]{2,}/g) ?? []).filter((w) => !['XXXXXXXX'].includes(w))
    expect(latinWords).toEqual([])
  })
})

test.describe('mobile navigation', () => {
  test('menu opens from the inline-end side and closes with Escape', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile only')
    for (const lang of ['en', 'ar'] as const) {
      await page.goto('/')
      await page.evaluate((args) => localStorage.setItem(args.key, args.lang), { key: STORAGE_KEY, lang })
      await page.reload()
      const toggle = page.locator('.menu-toggle')
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
      await expect(page.locator('#site-nav')).toBeHidden()

      await toggle.click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')
      const panel = page.locator('#site-nav')
      await expect(panel).toBeVisible()
      await page.waitForTimeout(350) // slide-in transition
      const box = await panel.boundingBox()
      const width = page.viewportSize()!.width
      if (lang === 'en') expect(box!.x + box!.width).toBeCloseTo(width, 0)
      else expect(box!.x).toBeCloseTo(0, 0)

      await page.keyboard.press('Escape')
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')

      await toggle.click()
      await panel.getByRole('link').first().click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    }
  })
})

test.describe('quote form', () => {
  async function fillValid(page: Page) {
    const form = page.getByTestId('quote-form')
    await form.locator('[name="name"]').fill('Sara Al-Harbi')
    await form.locator('[name="phone"]').fill('0512345678')
    await form.locator('[name="email"]').fill('sara@example.com')
    await form.locator('[name="city"]').selectOption('jeddah')
    await form.locator('[name="service"]').selectOption('plumbing')
    await form.locator('[name="propertyType"]').selectOption('villa')
    await form.locator('[name="date"]').fill('2099-05-10')
    await form.locator('[name="details"]').fill('Water heater is leaking in the main bathroom.')
  }

  test('typed values survive a language switch', async ({ page, isMobile }) => {
    await setSavedLang(page, 'en')
    await page.goto('/')
    await fillValid(page)
    await switchLanguage(page, isMobile)
    await expectDocument(page, 'ar')

    const form = page.getByTestId('quote-form')
    await expect(form.locator('[name="name"]')).toHaveValue('Sara Al-Harbi')
    await expect(form.locator('[name="phone"]')).toHaveValue('0512345678')
    await expect(form.locator('[name="city"]')).toHaveValue('jeddah')
    await expect(form.locator('[name="city"] option:checked')).toHaveText('جدة')
    await expect(form.locator('[name="date"]')).toHaveValue('2099-05-10')
    await expect(form.locator('[name="details"]')).toHaveValue('Water heater is leaking in the main bathroom.')
  })

  test('validation errors appear and re-translate on language switch', async ({ page, isMobile }) => {
    await setSavedLang(page, 'en')
    await page.goto('/')
    const form = page.getByTestId('quote-form')
    await form.locator('[name="phone"]').fill('12345')
    await form.getByRole('button', { name: 'Review request' }).click()

    await expect(form.getByRole('alert')).toContainText('Please fix 6 field(s)')
    await expect(form.locator('[name="name"]')).toBeFocused()
    await expect(form.locator('[name="phone"]')).toHaveAttribute('aria-invalid', 'true')
    await expect(form).toContainText('Enter a valid Saudi mobile number')

    await switchLanguage(page, isMobile)
    await expect(form.getByRole('alert')).toContainText('يرجى تصحيح')
    await expect(form).toContainText('أدخل رقم جوال سعودي صحيح')
    await expect(form.locator('[name="phone"]')).toHaveValue('12345')

    // Fixing a field clears its error as the user types.
    await form.locator('[name="phone"]').fill('٠٥١٢٣٤٥٦٧٨')
    await expect(form.locator('[name="phone"]')).not.toHaveAttribute('aria-invalid', 'true')
  })

  test('review shows a translated summary and builds WhatsApp/email links', async ({ page, isMobile }) => {
    await setSavedLang(page, 'en')
    await page.goto('/')
    await fillValid(page)
    await page.getByRole('button', { name: 'Review request' }).click()

    const review = page.getByTestId('quote-review')
    await expect(review.getByRole('heading', { name: 'Review your request' })).toBeFocused()
    await expect(review).toContainText('+966512345678')
    await expect(review).toContainText('Plumbing')
    await expect(review).toContainText('Jeddah')

    const wa = review.getByRole('link', { name: /Send via WhatsApp/ })
    const waHref = decodeURIComponent((await wa.getAttribute('href'))!)
    expect(waHref).toMatch(/^https:\/\/wa\.me\/966500000000\?text=/)
    expect(waHref).toContain('Service: Plumbing')
    await expect(wa).toHaveAttribute('target', '_blank')

    const mail = review.getByRole('link', { name: /Send via email/ })
    expect(decodeURIComponent((await mail.getAttribute('href'))!)).toContain('subject=Quote request: Plumbing')

    await switchLanguage(page, isMobile)
    await expect(review.getByRole('heading', { name: 'راجع طلبك' })).toBeVisible()
    await expect(review).toContainText('السباكة')
    await expect(review).toContainText('جدة')
    const waAr = decodeURIComponent((await review.getByRole('link', { name: /إرسال عبر واتساب/ }).getAttribute('href'))!)
    expect(waAr).toContain('الخدمة: السباكة')

    // Editing returns to the form with everything intact.
    await review.getByRole('button', { name: 'تعديل الطلب' }).click()
    await expect(page.getByTestId('quote-form').locator('[name="name"]')).toHaveValue('Sara Al-Harbi')
  })

  test('copy request shows a translated notification', async ({ page, context, isMobile, browserName }) => {
    test.skip(isMobile || browserName !== 'chromium', 'Clipboard permission check on desktop Chromium')
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await setSavedLang(page, 'ar')
    await page.goto('/')
    await fillValid(page)
    await page.getByRole('button', { name: 'مراجعة الطلب' }).click()
    await page.getByRole('button', { name: 'نسخ الطلب' }).click()
    await expect(page.locator('.toast-region')).toContainText('تم نسخ الطلب')
    const clip = await page.evaluate(() => navigator.clipboard.readText())
    expect(clip).toContain('الاسم الكامل: Sara Al-Harbi')
  })

  test('"Request this service" pre-selects the service', async ({ page }) => {
    await setSavedLang(page, 'en')
    await page.goto('/')
    await page.getByRole('link', { name: 'Request this service: Pest control' }).click()
    await expect(page.getByTestId('quote-form').locator('[name="service"]')).toHaveValue('pest')
    await expect(page.locator('.toast-region')).toContainText('Service selected')
  })
})

test.describe('FAQ', () => {
  test('accordion toggles with aria-expanded and keeps state across languages', async ({ page, isMobile }) => {
    await setSavedLang(page, 'en')
    await page.goto('/')
    const second = page.locator('.faq-item button').nth(1)
    await expect(second).toHaveAttribute('aria-expanded', 'false')
    await second.click()
    await expect(second).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('.faq-answer').nth(1)).toBeVisible()
    await switchLanguage(page, isMobile)
    await expect(page.locator('.faq-item button').nth(1)).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('.faq-answer').nth(1)).toContainText('بعد مراجعة طلبك')
  })
})
