import { test, expect } from '@playwright/test'
import { IntresseanmalanPage } from '../pages/IntresseanmalanPage'
import { barnLead, vuxenLead } from '../fixtures/testData'

test.describe('Intresseanmälan — barn form', () => {
  test('renders barn tab by default with all fields visible', async ({ page }) => {
    const p = new IntresseanmalanPage(page)
    await p.goto()
    await expect(p.tabBarn).toBeVisible()
    await expect(p.tabVuxen).toBeVisible()
    await expect(p.barnFornamn).toBeVisible()
    await expect(p.barnEfternamn).toBeVisible()
    await expect(p.barnAlder).toBeVisible()
    await expect(p.barnGrupp).toBeVisible()
    await expect(p.malsmansFornamn).toBeVisible()
    await expect(p.malsmansEpost).toBeVisible()
    await expect(p.barnSubmit).toBeVisible()
  })

  test('switches to vuxen tab', async ({ page }) => {
    const p = new IntresseanmalanPage(page)
    await p.goto()
    await p.tabVuxen.click()
    await expect(p.vuxenFornamn).toBeVisible()
    await expect(p.barnFornamn).not.toBeVisible()
  })

  test('submits barn lead successfully', async ({ page }) => {
    const p = new IntresseanmalanPage(page)
    await p.goto()
    await p.fillBarnForm(barnLead())
    await p.barnSubmit.click()
    await expect(p.barnSuccess).toBeVisible({ timeout: 10_000 })
  })

  test('shows error on incomplete barn submission', async ({ page }) => {
    const p = new IntresseanmalanPage(page)
    await p.goto()
    // Fill only first name, leave everything else empty, submit via JS (bypass required)
    await p.barnFornamn.fill('Test')
    // Dispatch submit directly to bypass HTML5 validation
    await page.evaluate(() => {
      const form = document.querySelector('[data-testid="interest-form-barn"]') as HTMLFormElement
      form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })
    await expect(p.barnError).toBeVisible({ timeout: 6_000 })
  })
})

test.describe('Intresseanmälan — vuxen form', () => {
  test('submits vuxen lead successfully', async ({ page }) => {
    const p = new IntresseanmalanPage(page)
    await p.goto()
    await p.tabVuxen.click()
    await p.fillVuxenForm(vuxenLead())
    await p.vuxenSubmit.click()
    await expect(p.vuxenSuccess).toBeVisible({ timeout: 10_000 })
  })
})
