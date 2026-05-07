import { test, expect } from '@playwright/test'
import { ContactPage } from '../pages/ContactPage'
import { contactQuestion } from '../fixtures/testData'

test.describe('Kontakt form', () => {
  test('renders all form fields', async ({ page }) => {
    const p = new ContactPage(page)
    await p.goto()
    await expect(p.fornamn).toBeVisible()
    await expect(p.efternamn).toBeVisible()
    await expect(p.epost).toBeVisible()
    await expect(p.meddelande).toBeVisible()
    await expect(p.submit).toBeVisible()
  })

  test('submits question successfully', async ({ page }) => {
    const p = new ContactPage(page)
    await p.goto()
    await p.fillForm(contactQuestion())
    await p.submit.click()
    await expect(p.success).toBeVisible({ timeout: 10_000 })
  })

  test('shows error on incomplete submission', async ({ page }) => {
    const p = new ContactPage(page)
    await p.goto()
    await p.fornamn.fill('Kalle')
    await page.evaluate(() => {
      const form = document.querySelector('[data-testid="kontakt-form"]') as HTMLFormElement
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })
    await expect(p.error).toBeVisible({ timeout: 6_000 })
  })
})
