import { Link } from 'react-router-dom'
import { groups } from '../data/groups'

const values = [
  { title: 'Självförtroende', desc: 'Barn lär sig att sätta upp mål och uppnå dem, vilket skapar en stark tro på den egna förmågan.' },
  { title: 'Disciplin', desc: 'Regelbunden träning och respekt för tränare och kamrater bygger struktur och ansvarskänsla.' },
  { title: 'Gemenskap', desc: 'På mattan skapas äkta vänskaper och ett samhörighet som sträcker sig utanför träningslokalen.' },
  { title: 'Fokus', desc: 'Träningen kräver närvaro och koncentration, vilket stärker förmågan att fokusera i skolan och vardagen.' },
  { title: 'Respekt', desc: 'Respekt för sig själv och andra är grundstenen i allt vi gör. Det är inte bara en regel — det är en livshållning.' },
  { title: 'Rörelseförmåga', desc: 'BJJ tränar hela kroppen och ger barn en naturlig koppling till sin kropp, balans och koordination.' },
]

export default function BarnUngdomar() {
  return (
    <div>
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Barn & ungdomar
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-snug">
            Trygg träning för alla åldrar
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed text-lg">
            Vi erbjuder anpassad Brazilian Jiu-Jitsu för barn och ungdomar från 3 år och uppåt.
            Varje grupp är utformad efter barnets utvecklingsnivå och läggning.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* Groups */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 tracking-tight">Våra grupper</h2>
        <div className="space-y-6">
          {groups.map((group, i) => (
            <div
              key={group.name}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 border border-gray-100 rounded-lg p-6 lg:p-8"
            >
              <div className="lg:col-span-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-1">
                  {group.ageRange}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
              </div>
              <div className="lg:col-span-2">
                <p className="text-gray-600 leading-relaxed">{group.description}</p>
                {i === 0 && (
                  <p className="mt-3 text-sm text-gray-500">
                    Little Bears-klassen är utformad specifikt för de allra yngsta. Fokus ligger
                    på lek, rörelse och att lyssna — inte tävlan.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* Values */}
      <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Vad barn lär sig på mattan
          </h2>
          <p className="mt-3 text-gray-600">
            Brazilian Jiu-Jitsu är mer än kampsport. Det är ett verktyg för personlig utveckling.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* CTA */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Vill ditt barn prova?
          </h2>
          <p className="mt-3 text-gray-600">
            Fyll i en intresseanmälan — inga förkunskaper krävs.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/intresseanmalan"
              className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
            >
              Gör en intresseanmälan
            </Link>
            <Link
              to="/schema"
              className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded hover:bg-white transition-colors text-sm"
            >
              Se schema
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
