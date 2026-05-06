import { Link } from 'react-router-dom'
import { groups } from '../data/groups'
import { schedulePreview } from '../data/schedule'
import { autogioPrices, terminPrices } from '../data/prices'
import { events } from '../data/groups'
import { whatsappUrl } from '../data/whatsapp'

import heroVideo from '../assets/videos/yoguibjj_super_hero_video_001.mp4'
import mainBannerImage from '../assets/images/yoguibjj_hero_banner_001.jpg'
import professorMarceloPhoto from '../assets/images/yoguibjj_professor_marcelo.jpg'

const galleryPhotoPreview = [
  { id: 'galleryPhoto01', label: 'Barnträning' },
  { id: 'galleryPhoto02', label: 'Ungdomar' },
  { id: 'galleryPhoto03', label: 'Gemenskap' },
]

export default function Home() {
  return (
    <div>
      {/* 1. Hero — video only, no image here */}
      <section
        data-testid="hero-section"
        style={{ position: 'relative', overflow: 'hidden', minHeight: '70vh' }}
        className="md:min-h-[85vh] bg-gray-900 flex items-center justify-center"
      >
        <video
          data-testid="hero-video"
          src={heroVideo}
          autoPlay
          muted={true}
          loop
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          aria-hidden="true"
        />
        {/* Dark overlay for text readability */}
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }}
          aria-hidden="true"
        />
        {/* Hero content — centered over video */}
        <div
          style={{ position: 'relative', zIndex: 2 }}
          className="w-full max-w-3xl mx-auto px-4 sm:px-6 text-center py-20"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Brazilian Jiu-Jitsu för barn och ungdomar i Torslanda
          </h1>
          <p className="mt-5 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Trygg, rolig och strukturerad träning från 3 år till tonår — med fokus på
            självförtroende, disciplin och gemenskap.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/intresseanmalan"
              data-testid="hero-primary-cta"
              className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
            >
              Gör en intresseanmälan
            </Link>
            <Link
              to="/schema"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white font-medium rounded border border-white/30 hover:bg-white/20 transition-colors text-sm"
            >
              Se schema
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Banner image — separate section, starts after hero */}
      <section
        aria-label="Yogi BJJ – träningsbild"
        style={{ width: '100%', overflow: 'hidden', lineHeight: 0 }}
        className="h-[280px] sm:h-[360px] lg:h-[520px]"
      >
        <img
          src={mainBannerImage}
          alt="Yogi Brazilian Jiu-Jitsu – träning i Torslanda"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loading="eager"
        />
      </section>

      {/* 3. Kids focus */}
      <section
        data-testid="kids-section"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug">
            Träning som bygger trygghet, fokus och självförtroende
          </h2>
          <p className="mt-5 text-gray-600 leading-relaxed">
            Genom Brazilian Jiu-Jitsu lär sig barn och ungdomar rörelse, disciplin och respekt —
            i ett tryggt och strukturerat sammanhang. Varje träning stärker självkänslan, tränar
            koncentrationsförmågan och skapar en känsla av gemenskap och tillhörighet.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.name} className="border border-gray-100 rounded-lg p-6 bg-gray-50">
              <div className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-2">
                {group.ageRange}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{group.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{group.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/barn-ungdomar"
            className="inline-flex items-center text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-orange-600 transition-colors"
          >
            Läs mer om träningen
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* 3. Schedule preview */}
      <section
        data-testid="schedule-section"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Schema
          </h2>
          <Link
            to="/schema"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Se hela schemat
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {schedulePreview.map((day) => (
            <div key={day.days} className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="bg-gray-900 text-white px-5 py-3">
                <p className="text-sm font-semibold">{day.days}</p>
              </div>
              <div className="divide-y divide-gray-50">
                {day.sessions.map((s) => (
                  <div key={s.group} className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{s.group}</p>
                        <p className="text-xs text-gray-500">{s.age}</p>
                      </div>
                      <p className="text-xs font-mono text-orange-600 font-medium">{s.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            to="/schema"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Se hela schemat
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* 4. Pricing preview */}
      <section
        data-testid="pricing-section"
        className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Priser och terminsbetalning
          </h2>
          <Link
            to="/priser"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Se alla priser
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Autogiro */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Autogiro — månadsbetalning
              </p>
            </div>
            <ul>
              {autogioPrices.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0"
                >
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900 tabular-nums">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Termin */}
          <div className="border border-gray-100 rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Terminsbetalning
              </p>
            </div>
            <ul>
              {terminPrices.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between px-6 py-4 border-b border-gray-50 last:border-0"
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

        <div className="mt-8">
          <Link
            to="/priser"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Se priser
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* 5. Professor */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text — left on desktop, top on mobile */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
              Huvudtränare
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug">
              Professor Marcelo Yogi Santiago
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              Marcelo Yogi Santiago är huvudtränare och en erfaren brasiliansk jiu-jitsu-professor
              med stark förankring i Göteborg och Skandinavien. Hans undervisning bygger på teknik,
              respekt, disciplin och gemenskap.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Med många år av erfarenhet på hög nivå skapar han en miljö där varje utövare —
              oavsett ålder eller bakgrund — kan växa och trivas.
            </p>
          </div>
          {/* Photo — right on desktop, bottom on mobile */}
          <div
            data-testid="professor-photo"
            className="aspect-[4/5] rounded-3xl overflow-hidden border border-stone-200"
          >
            <img
              src={professorMarceloPhoto}
              alt="Professor Marcelo Yogi Santiago"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* 6. Events preview */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Seminarier och evenemang
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl">
              Marcelo Yogi organiserar regelbundet seminarier, graderingar och träningsläger för
              utövare i hela Skandinavien.
            </p>
          </div>
          <Link
            to="/evenemang"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0"
          >
            Se evenemang
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.type} className="border border-gray-100 rounded-lg p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{event.type}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* 7. Gallery preview */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Galleri
          </h2>
          <Link
            to="/galleri"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Öppna galleri
          </Link>
        </div>

        {/* 3 photo thumbnails + 1 featured video */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {galleryPhotoPreview.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-400 text-xs font-medium"
            >
              {/* Replace with <img src={...} className="w-full h-full object-cover" /> */}
              {item.label}
            </div>
          ))}
          {/* Featured video card */}
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
            {/* Replace with <video src={...} muted playsInline className="w-full h-full object-cover" /> */}
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.75" />
                <path d="M16 13l14 7-14 7V13z" fill="#6b7280" />
              </svg>
            </div>
            <span className="absolute bottom-2 left-3 text-xs font-medium text-gray-500">Video</span>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/galleri"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Öppna galleri
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* 8. Contact CTA */}
      <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Vill du prova Brazilian Jiu-Jitsu?
          </h2>
          <p className="mt-4 text-gray-600">
            Fyll i en intresseanmälan så återkommer vi så snart som möjligt. Inga förkunskaper
            krävs — välkommen som du är.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/intresseanmalan"
              className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition-colors text-sm"
            >
              Gör en intresseanmälan
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Öppna WhatsApp för intresseanmälan"
              data-testid="whatsapp-contact-cta"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] text-white font-medium rounded hover:bg-[#1ebe57] transition-colors text-sm"
            >
              Kontakta oss via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
