import { useState, useEffect } from 'react'

const STORAGE_KEY = 'yogi-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setVisible(false)
  }

  function manage() {
    localStorage.setItem(STORAGE_KEY, 'managed')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookiemeddelande"
      data-testid="cookie-banner"
      className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-gray-700 flex-1">
            Vi använder cookies och liknande tekniker för att förbättra din upplevelse, säkerhet,
            analys och anpassning.
          </p>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={manage}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Hantera cookies
            </button>
            <button
              type="button"
              onClick={reject}
              className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Avvisa
            </button>
            <button
              type="button"
              data-testid="accept-cookies-button"
              onClick={accept}
              className="px-4 py-1.5 text-sm font-medium bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Acceptera alla
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
