import { useState } from 'react'
import { cn } from '../lib/cn'

type Tab = 'barn' | 'vuxen'

interface BarnForm {
  barnFornamn: string
  barnEfternamn: string
  barnAlder: string
  malsmansFornamn: string
  malsmansEfternamn: string
  malsmansEpost: string
  malsmansTelenummer: string
  grupp: string
  meddelande: string
  gdpr: boolean
}

interface VuxenForm {
  fornamn: string
  efternamn: string
  epost: string
  telefonnummer: string
  grupp: string
  meddelande: string
  gdpr: boolean
}

const barnGrupper = ['Little Bears 3–5 år', 'Barn BJJ 6–9 år', 'Ungdomar 10–17 år']
const vuxenGrupper = ['Vuxen Gi', 'No-Gi', 'Nybörjare']

const initialBarn: BarnForm = {
  barnFornamn: '',
  barnEfternamn: '',
  barnAlder: '',
  malsmansFornamn: '',
  malsmansEfternamn: '',
  malsmansEpost: '',
  malsmansTelenummer: '',
  grupp: '',
  meddelande: '',
  gdpr: false,
}

const initialVuxen: VuxenForm = {
  fornamn: '',
  efternamn: '',
  epost: '',
  telefonnummer: '',
  grupp: '',
  meddelande: '',
  gdpr: false,
}

const inputClass =
  'w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition'

const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

export default function Intresseanmalan() {
  const [tab, setTab] = useState<Tab>('barn')
  const [barnForm, setBarnForm] = useState<BarnForm>(initialBarn)
  const [vuxenForm, setVuxenForm] = useState<VuxenForm>(initialVuxen)
  const [submittedBarn, setSubmittedBarn] = useState(false)
  const [submittedVuxen, setSubmittedVuxen] = useState(false)

  function handleBarnSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmittedBarn(true)
    setBarnForm(initialBarn)
  }

  function handleVuxenSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmittedVuxen(true)
    setVuxenForm(initialVuxen)
  }

  return (
    <div>
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Kom igång
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Intresseanmälan
          </h1>
          <p className="mt-4 text-gray-600">
            Välj om anmälan gäller barn/ungdom eller vuxen. Fyll sedan i dina uppgifter så
            återkommer vi så snart som möjligt.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-10 w-fit">
          <button
            type="button"
            onClick={() => setTab('barn')}
            className={cn(
              'px-6 py-2.5 text-sm font-medium transition-colors',
              tab === 'barn'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900',
            )}
          >
            Barn &amp; ungdom
          </button>
          <button
            type="button"
            onClick={() => setTab('vuxen')}
            className={cn(
              'px-6 py-2.5 text-sm font-medium transition-colors border-l border-gray-200',
              tab === 'vuxen'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900',
            )}
          >
            Vuxen
          </button>
        </div>

        {/* Barn form */}
        {tab === 'barn' && (
          <div>
            {submittedBarn ? (
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-8 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Tack för din anmälan!</h2>
                <p className="text-gray-600 text-sm">
                  Vi har tagit emot ditt formulär och återkommer så snart som möjligt.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedBarn(false)}
                  className="mt-5 text-sm text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  Gör en ny anmälan
                </button>
              </div>
            ) : (
              <form
                data-testid="interest-form"
                onSubmit={handleBarnSubmit}
                noValidate
                className="space-y-6"
              >
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                    Barnets uppgifter
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="barnFornamn" className={labelClass}>Förnamn</label>
                      <input
                        id="barnFornamn"
                        type="text"
                        required
                        autoComplete="given-name"
                        className={inputClass}
                        placeholder="Barnets förnamn"
                        value={barnForm.barnFornamn}
                        onChange={(e) => setBarnForm({ ...barnForm, barnFornamn: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="barnEfternamn" className={labelClass}>Efternamn</label>
                      <input
                        id="barnEfternamn"
                        type="text"
                        required
                        autoComplete="family-name"
                        className={inputClass}
                        placeholder="Barnets efternamn"
                        value={barnForm.barnEfternamn}
                        onChange={(e) => setBarnForm({ ...barnForm, barnEfternamn: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="barnAlder" className={labelClass}>Ålder</label>
                      <input
                        id="barnAlder"
                        type="number"
                        required
                        min="3"
                        max="17"
                        className={inputClass}
                        placeholder="t.ex. 7"
                        value={barnForm.barnAlder}
                        onChange={(e) => setBarnForm({ ...barnForm, barnAlder: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="barnGrupp" className={labelClass}>Grupp</label>
                      <select
                        id="barnGrupp"
                        required
                        className={inputClass}
                        value={barnForm.grupp}
                        onChange={(e) => setBarnForm({ ...barnForm, grupp: e.target.value })}
                      >
                        <option value="">Välj grupp</option>
                        {barnGrupper.map((g) => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                    Målsmans uppgifter
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="malsmansFornamn" className={labelClass}>Förnamn</label>
                      <input
                        id="malsmansFornamn"
                        type="text"
                        required
                        autoComplete="given-name"
                        className={inputClass}
                        placeholder="Ditt förnamn"
                        value={barnForm.malsmansFornamn}
                        onChange={(e) => setBarnForm({ ...barnForm, malsmansFornamn: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="malsmansEfternamn" className={labelClass}>Efternamn</label>
                      <input
                        id="malsmansEfternamn"
                        type="text"
                        required
                        autoComplete="family-name"
                        className={inputClass}
                        placeholder="Ditt efternamn"
                        value={barnForm.malsmansEfternamn}
                        onChange={(e) => setBarnForm({ ...barnForm, malsmansEfternamn: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="malsmansEpost" className={labelClass}>E-post</label>
                      <input
                        id="malsmansEpost"
                        type="email"
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder="din@epost.se"
                        value={barnForm.malsmansEpost}
                        onChange={(e) => setBarnForm({ ...barnForm, malsmansEpost: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="malsmansTelenummer" className={labelClass}>Telefonnummer</label>
                      <input
                        id="malsmansTelenummer"
                        type="tel"
                        required
                        autoComplete="tel"
                        className={inputClass}
                        placeholder="+46 7X XXX XX XX"
                        value={barnForm.malsmansTelenummer}
                        onChange={(e) => setBarnForm({ ...barnForm, malsmansTelenummer: e.target.value })}
                      />
                    </div>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="barnMeddelande" className={labelClass}>
                    Meddelande <span className="text-gray-400 font-normal">(valfritt)</span>
                  </label>
                  <textarea
                    id="barnMeddelande"
                    rows={4}
                    className={inputClass}
                    placeholder="Har du frågor eller vill berätta något?"
                    value={barnForm.meddelande}
                    onChange={(e) => setBarnForm({ ...barnForm, meddelande: e.target.value })}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="barnGdpr"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    checked={barnForm.gdpr}
                    onChange={(e) => setBarnForm({ ...barnForm, gdpr: e.target.checked })}
                  />
                  <label htmlFor="barnGdpr" className="text-sm text-gray-600">
                    Jag godkänner att mina uppgifter behandlas för att klubben ska kunna kontakta
                    mig om träning.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
                >
                  Skicka intresseanmälan
                </button>
              </form>
            )}
          </div>
        )}

        {/* Vuxen form */}
        {tab === 'vuxen' && (
          <div>
            {submittedVuxen ? (
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-8 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Tack för din anmälan!</h2>
                <p className="text-gray-600 text-sm">
                  Vi har tagit emot ditt formulär och återkommer så snart som möjligt.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedVuxen(false)}
                  className="mt-5 text-sm text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  Gör en ny anmälan
                </button>
              </div>
            ) : (
              <form
                data-testid="interest-form"
                onSubmit={handleVuxenSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vuxenFornamn" className={labelClass}>Förnamn</label>
                    <input
                      id="vuxenFornamn"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={inputClass}
                      placeholder="Ditt förnamn"
                      value={vuxenForm.fornamn}
                      onChange={(e) => setVuxenForm({ ...vuxenForm, fornamn: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="vuxenEfternamn" className={labelClass}>Efternamn</label>
                    <input
                      id="vuxenEfternamn"
                      type="text"
                      required
                      autoComplete="family-name"
                      className={inputClass}
                      placeholder="Ditt efternamn"
                      value={vuxenForm.efternamn}
                      onChange={(e) => setVuxenForm({ ...vuxenForm, efternamn: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="vuxenEpost" className={labelClass}>E-post</label>
                    <input
                      id="vuxenEpost"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                      placeholder="din@epost.se"
                      value={vuxenForm.epost}
                      onChange={(e) => setVuxenForm({ ...vuxenForm, epost: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="vuxenTelefon" className={labelClass}>Telefonnummer</label>
                    <input
                      id="vuxenTelefon"
                      type="tel"
                      required
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+46 7X XXX XX XX"
                      value={vuxenForm.telefonnummer}
                      onChange={(e) => setVuxenForm({ ...vuxenForm, telefonnummer: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="vuxenGrupp" className={labelClass}>Grupp</label>
                    <select
                      id="vuxenGrupp"
                      required
                      className={inputClass}
                      value={vuxenForm.grupp}
                      onChange={(e) => setVuxenForm({ ...vuxenForm, grupp: e.target.value })}
                    >
                      <option value="">Välj grupp</option>
                      {vuxenGrupper.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="vuxenMeddelande" className={labelClass}>
                    Meddelande <span className="text-gray-400 font-normal">(valfritt)</span>
                  </label>
                  <textarea
                    id="vuxenMeddelande"
                    rows={4}
                    className={inputClass}
                    placeholder="Har du frågor eller vill berätta något?"
                    value={vuxenForm.meddelande}
                    onChange={(e) => setVuxenForm({ ...vuxenForm, meddelande: e.target.value })}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="vuxenGdpr"
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    checked={vuxenForm.gdpr}
                    onChange={(e) => setVuxenForm({ ...vuxenForm, gdpr: e.target.checked })}
                  />
                  <label htmlFor="vuxenGdpr" className="text-sm text-gray-600">
                    Jag godkänner att mina uppgifter behandlas för att klubben ska kunna kontakta
                    mig om träning.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
                >
                  Skicka intresseanmälan
                </button>
              </form>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
