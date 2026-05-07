import { useState } from 'react'
import { whatsappUrl } from '../data/whatsapp'

const googleMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Hangarvagen+3B+Torslanda'

interface ContactForm {
  fornamn: string
  efternamn: string
  epost: string
  meddelande: string
}

const initial: ContactForm = { fornamn: '', efternamn: '', epost: '', meddelande: '' }

const inputClass =
  'w-full border border-gray-200 rounded px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

type Status = 'idle' | 'loading' | 'success' | 'error'
interface FormState { status: Status; error: string | null }
const idleState: FormState = { status: 'idle', error: null }

export default function Kontakt() {
  const [form, setForm] = useState<ContactForm>(initial)
  const [state, setState] = useState<FormState>(idleState)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState({ status: 'loading', error: null })
    fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `${form.fornamn} ${form.efternamn}`.trim(),
        email: form.epost,
        question: form.meddelande,
      }),
    })
      .then(res => res.json().then(json => ({ res, json })))
      .then(({ res, json }: { res: Response; json: { success: boolean; error?: string } }) => {
        if (res.ok && json.success) {
          setState({ status: 'success', error: null })
          setForm(initial)
        } else {
          setState({ status: 'error', error: json.error ?? 'Något gick fel.' })
        }
      })
      .catch(() => {
        setState({ status: 'error', error: 'Något gick fel. Försök igen eller kontakta oss via WhatsApp.' })
      })
  }

  return (
    <div>
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Ta kontakt
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Kontakt
          </h1>
          <p className="mt-4 text-gray-600">
            Har du frågor om träning, priser eller intresseanmälan? Vi svarar snabbt via
            WhatsApp eller e-post.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Contact info */}
          <div className="space-y-8">
            {/* WhatsApp */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">WhatsApp</h2>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Öppna WhatsApp för intresseanmälan"
                data-testid="whatsapp-contact-cta"
                className="inline-flex items-center gap-3 px-5 py-3 bg-[#25D366] text-white text-sm font-medium rounded hover:bg-[#1ebe57] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Skriv till oss på WhatsApp
              </a>
              <p className="mt-2 text-sm text-gray-500">+46 72 513 13 83</p>
            </div>

            {/* Email */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-2">E-post</h2>
              <p className="text-sm text-gray-600">
                {/* Replace with actual email */}
                info@yogibjj.se
              </p>
            </div>

            {/* Address + map link */}
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-2">Adress</h2>
              <address className="not-italic text-sm text-gray-600">
                <p>Hangarvägen 3B</p>
                <p>423 37 Torslanda</p>
              </address>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-orange-600 underline underline-offset-4 hover:text-orange-700"
              >
                Visa på karta
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {state.status === 'success' ? (
              <div data-testid="kontakt-success" className="rounded-lg bg-gray-50 border border-gray-100 p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Meddelandet skickat!</h2>
                <p className="text-gray-600 text-sm">Vi återkommer så snart som möjligt.</p>
                <button
                  type="button"
                  onClick={() => setState(idleState)}
                  className="mt-5 text-sm text-orange-600 underline underline-offset-4 hover:text-orange-700"
                >
                  Skicka nytt meddelande
                </button>
              </div>
            ) : (
              <form data-testid="kontakt-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                {state.error && (
                  <div data-testid="kontakt-error" className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    {state.error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="kontaktFornamn" className={labelClass}>Förnamn</label>
                    <input id="kontaktFornamn" data-testid="kontakt-fornamn" type="text" required autoComplete="given-name" className={inputClass} placeholder="Ditt förnamn" value={form.fornamn} onChange={(e) => setForm({ ...form, fornamn: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="kontaktEfternamn" className={labelClass}>Efternamn</label>
                    <input id="kontaktEfternamn" data-testid="kontakt-efternamn" type="text" required autoComplete="family-name" className={inputClass} placeholder="Ditt efternamn" value={form.efternamn} onChange={(e) => setForm({ ...form, efternamn: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label htmlFor="kontaktEpost" className={labelClass}>E-post</label>
                  <input id="kontaktEpost" data-testid="kontakt-epost" type="email" required autoComplete="email" className={inputClass} placeholder="din@epost.se" value={form.epost} onChange={(e) => setForm({ ...form, epost: e.target.value })} />
                </div>

                <div>
                  <label htmlFor="kontaktMeddelande" className={labelClass}>Meddelande</label>
                  <textarea id="kontaktMeddelande" data-testid="kontakt-meddelande" rows={5} required className={inputClass} placeholder="Skriv ditt meddelande här..." value={form.meddelande} onChange={(e) => setForm({ ...form, meddelande: e.target.value })} />
                </div>

                <button
                  type="submit"
                  data-testid="kontakt-submit"
                  disabled={state.status === 'loading'}
                  className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  {state.status === 'loading' ? 'Skickar...' : 'Skicka meddelande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
