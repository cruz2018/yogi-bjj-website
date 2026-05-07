import { BasePage } from './BasePage'

export class ContactPage extends BasePage {
  readonly fornamn = this.getByTestId('kontakt-fornamn')
  readonly efternamn = this.getByTestId('kontakt-efternamn')
  readonly epost = this.getByTestId('kontakt-epost')
  readonly meddelande = this.getByTestId('kontakt-meddelande')
  readonly submit = this.getByTestId('kontakt-submit')
  readonly success = this.getByTestId('kontakt-success')
  readonly error = this.getByTestId('kontakt-error')

  async goto() {
    await this.navigate('/kontakt')
  }

  async fillForm(data: {
    fornamn: string
    efternamn: string
    epost: string
    meddelande: string
  }) {
    await this.fornamn.fill(data.fornamn)
    await this.efternamn.fill(data.efternamn)
    await this.epost.fill(data.epost)
    await this.meddelande.fill(data.meddelande)
  }
}
