import { BasePage } from './BasePage'

export class HomePage extends BasePage {
  readonly heroSection = this.getByTestId('hero-section')
  readonly heroVideo = this.getByTestId('hero-video')
  readonly nav = this.getByTestId('main-nav')

  async goto() {
    await this.navigate('/')
  }
}
