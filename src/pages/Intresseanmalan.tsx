import { useState } from 'react'
import { cn } from '../lib/cn'

type Tab = 'barn' | 'vuxen'
type Status = 'idle' | 'loading' | 'success' | 'error'

interface FormState {
  status: Status
  error: string | null
}

const idleState: FormState = { status: 'idle', error: null }

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

async function postLead(payload: Record<string, unknown>): Promise<FormState> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = (await res.json()) as { success: boolean; error?: string }
    if (res.ok && json.success) return { status: 'success', error: null }
    return { status: 'error', error: json.error ?? 'Något gick fel.' }
  } catch {
    return {
      status: 'error',
      error: 'Något gick fel. Försök igen eller kontakta oss via WhatsApp.',
    }
  }
}

export default function Intresseanmalan() {
  const [tab, setTab] = useState<Tab>('barn')
  const [barnForm, setBarnForm] = useState<BarnForm>(initialBarn)
  const [vuxenForm, setVuxenForm] = useState<VuxenForm>(initialVuxen)
  const [barnState, setBarnState] = useState<FormState>(idleState)
  const [vuxenState, setVuxenState] = useState<FormState>(idleState)

  function handleBarnSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBarnState({ status: 'loading', error: null })
    const parentNote = `Målsman: ${barnForm.malsmansFornamn} ${barnForm.malsmansEfternamn}.${barnForm.meddelande ? ` Meddelande: ${barnForm.meddelande}` : ''}`
    postLead({
      type: 'child',
      firstName: barnForm.barnFornamn,
      lastName: barnForm.barnEfternamn,
      email: barnForm.malsmansEpost,
      phone: barnForm.malsmansTelenummer,
      studentAge: barnForm.barnAlder,
      groupInterest: barnForm.grupp,
      message: parentNote,
    }).then(result => {
      setBarnState(result)
      if (result.status === 'success') setBarnForm(initialBarn)
    })
  }

  function handleVuxenSubmit(e: React.FormEvent) {
    e.preventDefault()
    setVuxenState({ status: 'loading', error: null })
    postLead({
      type: 'adult',
      firstName: vuxenForm.fornamn,
      lastName: vuxenForm.efternamn,
      email: vuxenForm.epost,
      phone: vuxenForm.telefonnummer,
      groupInterest: vuxenForm.grupp,
      message: vuxenForm.meddelande,
    }).then(result => {
      setVuxenState(result)
      if (result.status === 'success') setVuxenForm(initialVuxen)
    })
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
            data-testid="tab-barn"
            onClick={() => setTab('barn')}
            className={cn(
              'px-6 py-2.5 text-sm font-medium transition-colors',
              tab === 'barn' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:text-gray-900',
            )}
          >
            Barn &amp; ungdom
          </button>
          <button
            type="button"
            data-testid="tab-vuxen"
            onClick={() => setTab('vuxen')}
            className={cn(
              'px-6 py-2.5 text-sm font-medium transition-colors border-l border-gray-200',
              tab === 'vuxen' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:text-gray-900',
            )}
          >
            Vuxen
          </button>
        </div>

        {/* ── Barn form ── */}
        <div style={{ display: tab === 'barn' ? 'block' : 'none' }}>
            {barnState.status === 'success' ? (
              <div data-testid="barn-success" className="rounded-lg bg-gray-50 border border-gray-100 p-8 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Tack!</h2>
                <p className="text-gray-600 text-sm">Din intresseanmälan har skickats. Vi återkommer så snart som möjligt.</p>
                <button type="button" onClick={() => setBarnState(idleState)} className="mt-5 text-sm text-orange-600 underline underline-offset-4 hover:text-orange-700">
                  Gör en ny anmälan
                </button>
              </div>
            ) : (
              <form
                data-testid="interest-form-barn"
                onSubmit={handleBarnSubmit}
                noValidate
                className="space-y-6"
              >
                {barnState.error && (
                  <div data-testid="barn-error" className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    {barnState.error}
                  </div>
                )}

                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                    Barnets uppgifter
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="barnFornamn" className={labelClass}>Förnamn</label>
                      <input id="barnFornamn" data-testid="barn-fornamn" type="text" required autoComplete="given-name" className={inputClass} placeholder="Barnets förnamn" value={barnForm.barnFornamn} onChange={(e) => setBarnForm({ ...barnForm, barnFornamn: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="barnEfternamn" className={labelClass}>Efternamn</label>
                      <input id="barnEfternamn" data-testid="barn-efternamn" type="text" required autoComplete="family-name" className={inputClass} placeholder="Barnets efternamn" value={barnForm.barnEfternamn} onChange={(e) => setBarnForm({ ...barnForm, barnEfternamn: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="barnAlder" className={labelClass}>Ålder</label>
                      <input id="barnAlder" data-testid="barn-alder" type="number" required min="3" max="17" className={inputClass} placeholder="t.ex. 7" value={barnForm.barnAlder} onChange={(e) => setBarnForm({ ...barnForm, barnAlder: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="barnGrupp" className={labelClass}>Grupp</label>
                      <select id="barnGrupp" data-testid="barn-grupp" required className={inputClass} value={barnForm.grupp} onChange={(e) => setBarnForm({ ...barnForm, grupp: e.target.value })}>
                        <option value="">Välj grupp</option>
                        {barnGrupper.map((g) => <option key={g} value={g}>{g}</option>)}
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
                      <input id="malsmansFornamn" data-testid="malsmans-fornamn" type="text" required className={inputClass} placeholder="Ditt förnamn" value={barnForm.malsmansFornamn} onChange={(e) => setBarnForm({ ...barnForm, malsmansFornamn: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="malsmansEfternamn" className={labelClass}>Efternamn</label>
                      <input id="malsmansEfternamn" data-testid="malsmans-efternamn" type="text" required className={inputClass} placeholder="Ditt efternamn" value={barnForm.malsmansEfternamn} onChange={(e) => setBarnForm({ ...barnForm, malsmansEfternamn: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="malsmansEpost" className={labelClass}>E-post</label>
                      <input id="malsmansEpost" data-testid="malsmans-epost" type="email" required autoComplete="email" className={inputClass} placeholder="din@epost.se" value={barnForm.malsmansEpost} onChange={(e) => setBarnForm({ ...barnForm, malsmansEpost: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="malsmansTelenummer" className={labelClass}>Telefonnummer</label>
                      <input id="malsmansTelenummer" data-testid="malsmans-telenummer" type="tel" required autoComplete="tel" className={inputClass} placeholder="+46 7X XXX XX XX" value={barnForm.malsmansTelenummer} onChange={(e) => setBarnForm({ ...barnForm, malsmansTelenummer: e.target.value })} />
                    </div>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="barnMeddelande" className={labelClass}>
                    Meddelande <span className="text-gray-400 font-normal">(valfritt)</span>
                  </label>
                  <textarea id="barnMeddelande" data-testid="barn-meddelande" rows={4} className={inputClass} placeholder="Har du frågor eller vill berätta något?" value={barnForm.meddelande} onChange={(e) => setBarnForm({ ...barnForm, meddelande: e.target.value })} />
                </div>

                <div className="flex items-start gap-3">
                  <input id="barnGdpr" data-testid="barn-gdpr" type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" checked={barnForm.gdpr} onChange={(e) => setBarnForm({ ...barnForm, gdpr: e.target.checked })} />
                  <label htmlFor="barnGdpr" className="text-sm text-gray-600">
                    Jag godkänner att mina uppgifter behandlas för att klubben ska kunna kontakta mig om träning.
                  </label>
                </div>

                <button
                  type="submit"
                  data-testid="barn-submit"
                  disabled={barnState.status === 'loading'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {barnState.status === 'loading' ? 'Skickar...' : 'Skicka intresseanmälan'}
                </button>
              </form>
            )}
          </div>

        {/* ── Vuxen form ── */}
        <div style={{ display: tab === 'vuxen' ? 'block' : 'none' }}>
            {vuxenState.status === 'success' ? (
              <div data-testid="vuxen-success" className="rounded-lg bg-gray-50 border border-gray-100 p-8 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Tack!</h2>
                <p className="text-gray-600 text-sm">Din intresseanmälan har skickats. Vi återkommer så snart som möjligt.</p>
                <button type="button" onClick={() => setVuxenState(idleState)} className="mt-5 text-sm text-orange-600 underline underline-offset-4 hover:text-orange-700">
                  Gör en ny anmälan
                </button>
              </div>
            ) : (
              <form
                data-testid="interest-form-vuxen"
                onSubmit={handleVuxenSubmit}
                noValidate
                className="space-y-6"
              >
                {vuxenState.error && (
                  <div data-testid="vuxen-error" className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    {vuxenState.error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vuxenFornamn" className={labelClass}>Förnamn</label>
                    <input id="vuxenFornamn" data-testid="vuxen-fornamn" type="text" required autoComplete="given-name" className={inputClass} placeholder="Ditt förnamn" value={vuxenForm.fornamn} onChange={(e) => setVuxenForm({ ...vuxenForm, fornamn: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="vuxenEfternamn" className={labelClass}>Efternamn</label>
                    <input id="vuxenEfternamn" data-testid="vuxen-efternamn" type="text" required autoComplete="family-name" className={inputClass} placeholder="Ditt efternamn" value={vuxenForm.efternamn} onChange={(e) => setVuxenForm({ ...vuxenForm, efternamn: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="vuxenEpost" className={labelClass}>E-post</label>
                    <input id="vuxenEpost" data-testid="vuxen-epost" type="email" required autoComplete="email" className={inputClass} placeholder="din@epost.se" value={vuxenForm.epost} onChange={(e) => setVuxenForm({ ...vuxenForm, epost: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="vuxenTelefon" className={labelClass}>Telefonnummer</label>
                    <input id="vuxenTelefon" data-testid="vuxen-telefon" type="tel" required autoComplete="tel" className={inputClass} placeholder="+46 7X XXX XX XX" value={vuxenForm.telefonnummer} onChange={(e) => setVuxenForm({ ...vuxenForm, telefonnummer: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="vuxenGrupp" className={labelClass}>Grupp</label>
                    <select id="vuxenGrupp" data-testid="vuxen-grupp" required className={inputClass} value={vuxenForm.grupp} onChange={(e) => setVuxenForm({ ...vuxenForm, grupp: e.target.value })}>
                      <option value="">Välj grupp</option>
                      {vuxenGrupper.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="vuxenMeddelande" className={labelClass}>
                    Meddelande <span className="text-gray-400 font-normal">(valfritt)</span>
                  </label>
                  <textarea id="vuxenMeddelande" data-testid="vuxen-meddelande" rows={4} className={inputClass} placeholder="Har du frågor eller vill berätta något?" value={vuxenForm.meddelande} onChange={(e) => setVuxenForm({ ...vuxenForm, meddelande: e.target.value })} />
                </div>

                <div className="flex items-start gap-3">
                  <input id="vuxenGdpr" data-testid="vuxen-gdpr" type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500" checked={vuxenForm.gdpr} onChange={(e) => setVuxenForm({ ...vuxenForm, gdpr: e.target.checked })} />
                  <label htmlFor="vuxenGdpr" className="text-sm text-gray-600">
                    Jag godkänner att mina uppgifter behandlas för att klubben ska kunna kontakta mig om träning.
                  </label>
                </div>

                <button
                  type="submit"
                  data-testid="vuxen-submit"
                  disabled={vuxenState.status === 'loading'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {vuxenState.status === 'loading' ? 'Skickar...' : 'Skicka intresseanmälan'}
                </button>
              </form>
            )}
          </div>
      </section>
    </div>
  )
}
