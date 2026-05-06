import { Link } from 'react-router-dom'

const links = [
  { to: '/schema', label: 'Schema' },
  { to: '/priser', label: 'Priser' },
  { to: '/intresseanmalan', label: 'Intresseanmälan' },
  { to: '/hitta-till-oss', label: 'Hitta till oss' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="text-white font-semibold tracking-tight">Yogi Brazilian Jiu-Jitsu</p>
            <p className="mt-1 text-sm text-gray-500">Torslanda / Göteborg</p>
            <p className="mt-3 text-sm">
              Hangarvägen 3B<br />
              423 37 Torslanda
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Navigation
            </p>
            <ul className="space-y-2">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
              Kontakt
            </p>
            <a
              href="https://wa.me/46725131383?text=Hej%2C%20jag%20vill%20g%C3%A4rna%20g%C3%B6ra%20en%20intresseanm%C3%A4lan%20f%C3%B6r%20Brazilian%20Jiu-Jitsu%20i%20Torslanda."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              WhatsApp: +46 72 513 13 83
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Yogi Brazilian Jiu-Jitsu. Alla rättigheter förbehållna.</p>
          <p>Sida skapad av Cruz Tech</p>
        </div>
      </div>
    </footer>
  )
}
