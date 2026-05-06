import { Link } from 'react-router-dom'
import { autogioPrices, terminPrices } from '../data/prices'

export default function Priser() {
  return (
    <div>
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Avgifter
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Priser
          </h1>
          <p className="mt-4 text-gray-600">
            Du kan välja att betala via autogiro varje månad eller betala en hel termin i förväg.
            Tillkommer gör årsmedlemsavgift och försäkring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Autogiro */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
              Autogiro — månadsbetalning
            </h2>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-50">
                {autogioPrices.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900 tabular-nums">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terminsbetalning */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
              Terminsbetalning
            </h2>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-50">
                {terminPrices.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center justify-between px-6 py-4"
                  >
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900 tabular-nums">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Swish */}
        <div className="mt-12 border border-gray-100 rounded-lg p-6 bg-gray-50">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Swish</h2>
          <p className="text-sm text-gray-600">
            Swish-betalning är möjlig. Kontakta oss för swishnummer och ange ditt namn och
            vilken grupp du anmäler dig till som meddelande.
          </p>
        </div>

        {/* Viktiga dokument */}
        <div className="mt-6 border border-gray-100 rounded-lg p-6 bg-gray-50">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Viktiga dokument</h2>
          <p className="text-sm text-gray-600">
            Ansökningsformulär, försäkringsinformation och föreningens regler delas ut vid
            första träningsbesöket eller kan begäras via e-post.
          </p>
        </div>

        {/* Membership note */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Årsmedlemsavgift / försäkring: <strong className="text-gray-900">200 kr</strong> — betalas en gång per säsong.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Har du frågor om betalning? Kontakta oss via WhatsApp eller e-post.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900">Redo att komma igång?</h2>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/intresseanmalan"
              className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
            >
              Gör en intresseanmälan
            </Link>
            <Link
              to="/kontakt"
              className="w-full sm:w-auto px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded hover:bg-white transition-colors text-sm"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
