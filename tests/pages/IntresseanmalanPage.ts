import { BasePage } from './BasePage'

export class IntresseanmalanPage extends BasePage {
  readonly tabBarn = this.getByTestId('tab-barn')
  readonly tabVuxen = this.getByTestId('tab-vuxen')

  // Barn form
  readonly barnFornamn = this.getByTestId('barn-fornamn')
  readonly barnEfternamn = this.getByTestId('barn-efternamn')
  readonly barnAlder = this.getByTestId('barn-alder')
  readonly barnGrupp = this.getByTestId('barn-grupp')
  readonly malsmansFornamn = this.getByTestId('malsmans-fornamn')
  readonly malsmansEfternamn = this.getByTestId('malsmans-efternamn')
  readonly malsmansEpost = this.getByTestId('malsmans-epost')
  readonly malsmansTelenummer = this.getByTestId('malsmans-telenummer')
  readonly barnMeddelande = this.getByTestId('barn-meddelande')
  readonly barnGdpr = this.getByTestId('barn-gdpr')
  readonly barnSubmit = this.getByTestId('barn-submit')
  readonly barnSuccess = this.getByTestId('barn-success')
  readonly barnError = this.getByTestId('barn-error')

  // Vuxen form
  readonly vuxenFornamn = this.getByTestId('vuxen-fornamn')
  readonly vuxenEfternamn = this.getByTestId('vuxen-efternamn')
  readonly vuxenEpost = this.getByTestId('vuxen-epost')
  readonly vuxenTelefon = this.getByTestId('vuxen-telefon')
  readonly vuxenGrupp = this.getByTestId('vuxen-grupp')
  readonly vuxenMeddelande = this.getByTestId('vuxen-meddelande')
  readonly vuxenGdpr = this.getByTestId('vuxen-gdpr')
  readonly vuxenSubmit = this.getByTestId('vuxen-submit')
  readonly vuxenSuccess = this.getByTestId('vuxen-success')
  readonly vuxenError = this.getByTestId('vuxen-error')

  async goto() {
    await this.navigate('/intresseanmalan')
  }

  async fillBarnForm(data: {
    barnFornamn: string
    barnEfternamn: string
    barnAlder: string
    grupp: string
    malsmansFornamn: string
    malsmansEfternamn: string
    malsmansEpost: string
    malsmansTelenummer: string
    meddelande?: string
  }) {
    await this.barnFornamn.fill(data.barnFornamn)
    await this.barnEfternamn.fill(data.barnEfternamn)
    await this.barnAlder.fill(data.barnAlder)
    await this.barnGrupp.selectOption(data.grupp)
    await this.malsmansFornamn.fill(data.malsmansFornamn)
    await this.malsmansEfternamn.fill(data.malsmansEfternamn)
    await this.malsmansEpost.fill(data.malsmansEpost)
    await this.malsmansTelenummer.fill(data.malsmansTelenummer)
    if (data.meddelande) await this.barnMeddelande.fill(data.meddelande)
    await this.barnGdpr.check()
  }

  async fillVuxenForm(data: {
    fornamn: string
    efternamn: string
    epost: string
    telefonnummer: string
    grupp: string
    meddelande?: string
  }) {
    await this.vuxenFornamn.fill(data.fornamn)
    await this.vuxenEfternamn.fill(data.efternamn)
    await this.vuxenEpost.fill(data.epost)
    await this.vuxenTelefon.fill(data.telefonnummer)
    await this.vuxenGrupp.selectOption(data.grupp)
    if (data.meddelande) await this.vuxenMeddelande.fill(data.meddelande)
    await this.vuxenGdpr.check()
  }
}
