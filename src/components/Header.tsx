import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'

const navLinks = [
  { to: '/', label: 'Hem', exact: true },
  { to: '/barn-ungdomar', label: 'Barn & ungdomar' },
  { to: '/schema', label: 'Schema' },
  { to: '/priser', label: 'Priser' },
  { to: '/galleri', label: 'Galleri' },
  { to: '/evenemang', label: 'Evenemang' },
  { to: '/hitta-till-oss', label: 'Hitta till oss' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex flex-col leading-none"
            aria-label="Yogui BJJ – startsida"
          >
            <span className="text-base font-semibold tracking-tight text-gray-900">
              Yogi BJJ
            </span>
            <span className="text-xs text-gray-500 tracking-widest uppercase">
              Torslanda · Göteborg
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Huvudnavigation">
            {navLinks.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors',
                    isActive
                      ? 'text-gray-900 underline underline-offset-4 decoration-orange-600'
                      : 'text-gray-500 hover:text-gray-900',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              to="/intresseanmalan"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded hover:bg-orange-700 transition-colors"
            >
              Intresseanmälan
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Stäng meny' : 'Öppna meny'}
              aria-expanded={open}
              className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              <span className="sr-only">{open ? 'Stäng' : 'Meny'}</span>
              {open ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobilnavigation">
            {navLinks.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2.5 text-sm font-medium rounded transition-colors',
                    isActive
                      ? 'bg-gray-50 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/intresseanmalan"
              onClick={() => setOpen(false)}
              className="mt-2 px-3 py-2.5 bg-orange-600 text-white text-sm font-medium rounded text-center hover:bg-orange-700 transition-colors"
            >
              Intresseanmälan
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
