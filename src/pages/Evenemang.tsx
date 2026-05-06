import { Link } from 'react-router-dom'
import { events } from '../data/groups'

// eventPhoto01 can be replaced with: import eventPhoto01 from '../assets/images/eventPhoto01.jpg'

const upcomingPlaceholders = [
  {
    type: 'Seminarium',
    title: 'BJJ-seminarium med Marcelo Yogi',
    date: 'Datum meddelas',
    location: 'Torslanda, Göteborg',
    description: 'Öppet seminarium för alla nivåer. Teknikfokus på mark och ståteknik.',
  },
  {
    type: 'Gradering',
    title: 'Terminsgradering',
    date: 'Datum meddelas',
    location: 'Yogi BJJ, Torslanda',
    description: 'Formell gradering för aktiva utövare. Kontakta tränaren för information.',
  },
  {
    type: 'Träningsläger',
    title: 'Sommarläger BJJ',
    date: 'Datum meddelas',
    location: 'Meddelas senare',
    description: 'Intensivt träningsläger med deltagare från Sverige och övriga Skandinavien.',
  },
]

export default function Evenemang() {
  return (
    <div>
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Aktiviteter
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Seminarier och evenemang
          </h1>
          <p className="mt-4 text-gray-600">
            Marcelo Yogi organiserar regelbundet seminarier, graderingar och träningsläger för
            utövare i alla nivåer — i Göteborg och runt om i Skandinavien.
          </p>
        </div>

        {/* Event types */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {events.map((event) => (
            <div key={event.type} className="border border-gray-100 rounded-lg p-6 bg-gray-50">
              <h2 className="text-base font-semibold text-gray-900 mb-2">{event.type}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-14">
          <h2 className="text-xl font-bold text-gray-900 mb-8 tracking-tight">Kommande evenemang</h2>
          <div className="space-y-5">
            {upcomingPlaceholders.map((ev) => (
              <div
                key={ev.title}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-100 rounded-lg p-6"
              >
                <div className="md:col-span-1">
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-1 rounded">
                    {ev.type}
                  </span>
                  <p className="mt-2 text-xs text-gray-400">{ev.date}</p>
                  <p className="text-xs text-gray-400">{ev.location}</p>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{ev.title}</h3>
                  <p className="text-sm text-gray-600">{ev.description}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Datum och detaljer publiceras löpande. Kontakta oss för mer information.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900">Intresserad av ett evenemang?</h2>
          <p className="mt-2 text-gray-600 text-sm">Hör av dig så berättar vi mer.</p>
          <div className="mt-5">
            <Link
              to="/kontakt"
              className="inline-flex items-center px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
            >
              Kontakta oss
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
