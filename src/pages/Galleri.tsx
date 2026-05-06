import { useState } from 'react'
import { cn } from '../lib/cn'

// ─── Real gallery videos ───────────────────────────────────────────────────
// Glob picks up every WhatsApp clip — hero video is excluded by pattern.
// When you add more videos just drop them in src/assets/videos/ and they
// appear here automatically (as long as the filename starts with "WhatsApp").
const videoImports = import.meta.glob<{ default: string }>(
  '../assets/videos/WhatsApp*.mp4',
  { eager: true },
)

const videoLabels = ['Träning', 'Barnpass', 'Teknik', 'Seminarium']

// galleryVideo01 … galleryVideo13 — ids match the spec naming convention
const galleryVideos = Object.values(videoImports).map((mod, i) => ({
  id: `galleryVideo${String(i + 1).padStart(2, '0')}`,
  src: mod.default,
  label: videoLabels[i % videoLabels.length],
}))

// ─── Photo placeholders ────────────────────────────────────────────────────
// Replace each entry with a real import once photo assets are available:
// import galleryPhoto01 from '../assets/images/galleryPhoto01.jpg'
const photos = [
  { id: 'galleryPhoto01', label: 'Barnträning' },
  { id: 'galleryPhoto02', label: 'Little Bears' },
  { id: 'galleryPhoto03', label: 'Ungdomar på mattan' },
  { id: 'galleryPhoto04', label: 'Vuxna Gi' },
  { id: 'galleryPhoto05', label: 'Gemenskap' },
  { id: 'galleryPhoto06', label: 'No-Gi' },
]

// ─── Event placeholders ────────────────────────────────────────────────────
const eventItems = [
  {
    id: 'event01',
    title: 'Gradering – vår 2025',
    date: 'Datum meddelas',
    description: 'Formell bältesgradering för aktiva utövare i alla åldrar.',
  },
  {
    id: 'event02',
    title: 'BJJ-seminarium med Marcelo Yogi',
    date: 'Datum meddelas',
    description: 'Öppet seminarium för alla nivåer. Teknikfokus på mark och ståteknik.',
  },
  {
    id: 'event03',
    title: 'Sommarläger 2025',
    date: 'Datum meddelas',
    description: 'Intensivt träningsläger med deltagare från hela Skandinavien.',
  },
]

type Tab = 'alla' | 'foton' | 'videor' | 'evenemang'

const tabs: { id: Tab; label: string }[] = [
  { id: 'alla', label: 'Alla' },
  { id: 'foton', label: 'Foton' },
  { id: 'videor', label: `Videor (${galleryVideos.length})` },
  { id: 'evenemang', label: 'Evenemang' },
]

export default function Galleri() {
  // Default to "Videor" since real video content is available now
  const [activeTab, setActiveTab] = useState<Tab>('videor')

  const showPhotos = activeTab === 'alla' || activeTab === 'foton'
  const showVideos = activeTab === 'alla' || activeTab === 'videor'
  const showEvents = activeTab === 'alla' || activeTab === 'evenemang'

  return (
    <div data-testid="video-gallery-page">
      <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-4">
            Bilder &amp; video
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Videogalleri
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Se utvalda träningsklipp från Yogi Brazilian Jiu-Jitsu i Torslanda.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 border-b border-gray-200 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Videos ──────────────────────────────────────────────────────── */}
        {showVideos && (
          <div className="mb-16">
            {activeTab === 'alla' && (
              <h2 className="text-xs font-semibold text-gray-500 mb-8 uppercase tracking-widest">
                Videor
              </h2>
            )}

            <div
              data-testid="video-gallery-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {galleryVideos.map((video) => (
                <div
                  key={video.id}
                  data-testid="video-card"
                  className="rounded-2xl overflow-hidden border border-stone-200 bg-white hover:border-stone-300 transition-colors"
                >
                  <video
                    src={video.src}
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    className="w-full aspect-video object-cover block"
                    aria-label={`Träningsklipp – ${video.label}`}
                  />
                  <div className="px-4 py-3 flex items-center gap-2">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      {video.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Photos ──────────────────────────────────────────────────────── */}
        {showPhotos && (
          <div className="mb-16">
            {activeTab === 'alla' && (
              <h2 className="text-xs font-semibold text-gray-500 mb-8 uppercase tracking-widest">
                Foton
              </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center text-gray-400 text-xs font-medium"
                >
                  {/* Replace with: <img src={galleryPhoto01} alt={photo.label} className="w-full h-full object-cover" /> */}
                  {photo.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Events ──────────────────────────────────────────────────────── */}
        {showEvents && (
          <div>
            {activeTab === 'alla' && (
              <h2 className="text-xs font-semibold text-gray-500 mb-8 uppercase tracking-widest">
                Evenemang
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {eventItems.map((ev) => (
                <div
                  key={ev.id}
                  className="border border-stone-200 rounded-xl overflow-hidden"
                >
                  {/* Replace with: <img src={eventPhoto01} alt={ev.title} className="w-full aspect-[4/3] object-cover" /> */}
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                    Foto tillkommer
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-1">{ev.date}</p>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{ev.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-16 text-sm text-gray-400">
          Fler bilder och videos tillkommer. Följ oss på sociala medier för uppdateringar.
        </p>
      </section>
    </div>
  )
}
