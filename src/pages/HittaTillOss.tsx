const googleMapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Hangarvagen+3B+Torslanda'

export default function HittaTillOss() {
  return (
    <div>
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Adress
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Hitta till oss
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info */}
          <div>
            <div className="mb-8">
              <h2 className="text-base font-semibold text-gray-900 mb-2">Adress</h2>
              <address className="not-italic text-gray-700">
                <p className="font-medium">Yogi Brazilian Jiu-Jitsu</p>
                <p>Hangarvägen 3B</p>
                <p>423 37 Torslanda</p>
                <p className="mt-1 text-gray-500">Göteborg, Sverige</p>
              </address>
            </div>

            <div className="mb-8">
              <h2 className="text-base font-semibold text-gray-900 mb-2">Parkering</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Det finns fri parkering i anslutning till lokalen. Kör in mot Hangarvägen och
                följ skyltningen. Kontakta oss för exakt vägbeskrivning om du kör dit för
                första gången.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-base font-semibold text-gray-900 mb-2">Kollektivtrafik</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Närmaste busshållplats är inom gångavstånd. Kontrollera Västtrafiks tidtabeller
                för aktuella avgångstider mot Torslanda.
              </p>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
              </svg>
              Öppna i Google Maps
            </a>
          </div>

          {/* Map placeholder — replace with iframe or react-leaflet */}
          <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[400px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm border border-gray-200">
            {/* To embed Google Maps:
                <iframe
                  title="Yogi BJJ karta"
                  src="https://www.google.com/maps/embed?pb=...YOUR_EMBED_URL..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
            */}
            <div className="text-center px-6">
              <p className="font-medium text-gray-500 mb-1">Karta</p>
              <p className="text-xs text-gray-400">
                Hangarvägen 3B, 423 37 Torslanda
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-xs text-orange-600 underline underline-offset-4 hover:text-orange-700"
              >
                Öppna i Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
