// ─── AI Agent rules for the future WhatsApp conversational agent ───────────
// This file defines the knowledge base and guard-rails that the agent must
// follow when it is wired up to an LLM (e.g. Claude / GPT-4o).

export const AGENT_LANGUAGE = 'sv' // All replies must be in Swedish

export const AGENT_IDENTITY = `
Du är en hjälpsam assistent för Yogi Brazilian Jiu-Jitsu i Torslanda, Göteborg.
Svara alltid på svenska, kort och professionellt.
Om du inte vet svaret på en fråga, säg det ärligt och hänvisa till Marcelo.
`

export const FALLBACK_MESSAGE =
  'Marcelo bekräftar gärna detta med dig. Du kan nå honom via WhatsApp: +46 72 513 13 83'

export const KNOWLEDGE_BASE = {
  groups: [
    {
      name: 'Little Bears',
      ageRange: '3–5 år',
      description:
        'Lekfull introduktion till rörelse och grundläggande kampsport för de allra yngsta.',
    },
    {
      name: 'Barn BJJ',
      ageRange: '6–9 år',
      description:
        'Strukturerad träning med fokus på teknik, disciplin och gemenskap.',
    },
    {
      name: 'Ungdomar BJJ',
      ageRange: '10–17 år',
      description:
        'Mer avancerad teknik och taktik. Förbereder för tävling om eleven önskar.',
    },
    {
      name: 'Vuxna Gi',
      ageRange: '18+',
      description: 'Brazilian Jiu-Jitsu i gi för vuxna, alla nivåer.',
    },
    {
      name: 'No-Gi',
      ageRange: '16+',
      description: 'Grappling utan gi — fokus på snabb teknik och position.',
    },
  ],

  prices: {
    autogiro: [
      { group: 'Barn & Ungdom 3–9 år', monthly: 430 },
      { group: 'Barn & Ungdom 10–15 år', monthly: 490 },
      { group: 'Ungdomsgrupp 16–17 år', monthly: 599 },
      { group: 'Vuxen 18+', monthly: 599 },
    ],
    termin: [
      { group: 'Little Bears 3–5 år', price: 2580 },
      { group: 'Barn BJJ 6–9 år', price: 2580 },
      { group: 'Ungdomar 10–17 år', price: 2940 },
      { group: 'Vuxna BJJ och No-Gi', price: 3594 },
    ],
    membership: 200, // årsavgift / försäkring
  },

  location: {
    address: 'Hangarvägen 3B, 423 37 Torslanda',
    city: 'Göteborg',
    area: 'Torslanda',
    mapsUrl: 'https://maps.google.com/?q=Hangarvagen+3B+Torslanda',
  },

  contact: {
    whatsapp: '+46 72 513 13 83',
    professor: 'Marcelo Yogi Santiago',
  },
} as const

// Topics the agent is authorised to answer
export const SUPPORTED_INTENTS = [
  'barnklasser',
  'ungdomsklasser',
  'vuxna-klasser',
  'priser',
  'schema',
  'intresseanmalan',
  'provträning',
  'plats',
  'kontakt',
  'gi-vs-no-gi',
  'vad-är-bjj',
] as const

export type SupportedIntent = typeof SUPPORTED_INTENTS[number]

// Guard: if a question falls outside known intents, return the fallback message
export function isKnownIntent(intent: string): intent is SupportedIntent {
  return SUPPORTED_INTENTS.includes(intent as SupportedIntent)
}
