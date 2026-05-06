export interface AutogiroPrice {
  label: string
  price: string
  note?: string
}

export interface TerminPrice {
  label: string
  price: string
}

export const autogioPrices: AutogiroPrice[] = [
  { label: 'Barn & Ungdom 3–9 år', price: '430 kr/mån' },
  { label: 'Barn & Ungdom 10–15 år', price: '490 kr/mån' },
  { label: 'Ungdomsgrupp 16–17 år', price: '599 kr/mån' },
  { label: 'Vuxen 18+', price: '599 kr/mån' },
]

export const terminPrices: TerminPrice[] = [
  { label: 'Little Bears 3–5 år', price: '2 580 kr' },
  { label: 'Barn BJJ 6–9 år', price: '2 580 kr' },
  { label: 'Ungdomar BJJ och No-Gi 10–17 år', price: '2 940 kr' },
  { label: 'Vuxna Brazilian Jiu-Jitsu och No-Gi', price: '3 594 kr' },
  { label: 'Årsmedlemsavgift / försäkring', price: '200 kr' },
]
