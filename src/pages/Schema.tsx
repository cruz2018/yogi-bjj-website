import { Link } from 'react-router-dom'
import { scheduleItems } from '../data/schedule'

const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'] as const
type Day = typeof days[number]

const dayKeys: Record<Day, keyof typeof scheduleItems[0]> = {
  Måndag: 'monday',
  Tisdag: 'tuesday',
  Onsdag: 'wednesday',
  Torsdag: 'thursday',
  Fredag: 'friday',
}

export default function Schema() {
  return (
    <div>
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Träningsdagar
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Schema
          </h1>
          <p className="mt-4 text-gray-600">
            Tiderna nedan är bekräftade med tränaren. Kontakta oss om du är osäker på vilken
            grupp som passar bäst.
          </p>
        </div>

        {/* Schedule table — desktop */}
        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left px-5 py-4 font-semibold">Grupp</th>
                <th className="text-left px-5 py-4 font-semibold text-gray-400">Ålder</th>
                {days.map((d) => (
                  <th key={d} className="text-left px-5 py-4 font-semibold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleItems.map((item, i) => (
                <tr key={item.group} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-5 py-4 font-medium text-gray-900">{item.group}</td>
                  <td className="px-5 py-4 text-gray-500">{item.ageRange}</td>
                  {days.map((d) => {
                    const key = dayKeys[d]
                    const val = item[key] as string | undefined
                    return (
                      <td key={d} className="px-5 py-4">
                        {val ? (
                          <span className="font-mono text-orange-600 font-medium">{val}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Schedule cards — mobile */}
        <div className="md:hidden space-y-4">
          {scheduleItems.map((item) => (
            <div key={item.group} className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
                <span className="font-semibold">{item.group}</span>
                <span className="text-xs text-gray-400">{item.ageRange}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {days.map((d) => {
                  const key = dayKeys[d]
                  const val = item[key] as string | undefined
                  if (!val) return null
                  return (
                    <div key={d} className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm text-gray-700">{d}</span>
                      <span className="text-sm font-mono text-orange-600 font-medium">{val}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Tiderna kan justeras inför ny termin. Bekräfta alltid med tränaren.
        </p>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900">Redo att börja?</h2>
          <p className="mt-2 text-gray-600 text-sm">Fyll i en intresseanmälan — vi återkommer snabbt.</p>
          <div className="mt-5">
            <Link
              to="/intresseanmalan"
              className="inline-flex items-center px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
            >
              Gör en intresseanmälan
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
