import type { Page } from '@playwright/test'

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path)
    // Dismiss the cookie banner so it doesn't overlap form elements via z-50 fixed positioning
    try {
      const acceptBtn = this.page.getByTestId('accept-cookies-button')
      if (await acceptBtn.isVisible({ timeout: 2_000 })) {
        await acceptBtn.click()
        await acceptBtn.waitFor({ state: 'hidden', timeout: 2_000 })
      }
    } catch {
      // Banner already dismissed or not present — continue
    }
  }

  getByTestId(id: string) {
    return this.page.getByTestId(id)
  }
}
