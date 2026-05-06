// Confirm times with Marcelo Yogi before going live — these are plausible defaults

export interface ScheduleItem {
  group: string
  ageRange: string
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
}

export const scheduleItems: ScheduleItem[] = [
  {
    group: 'Little Bears',
    ageRange: '3–5 år',
    monday: '17:00–17:45',
    wednesday: '17:00–17:45',
  },
  {
    group: 'Barn BJJ',
    ageRange: '6–9 år',
    monday: '18:00–19:00',
    wednesday: '18:00–19:00',
    tuesday: '18:00–19:00',
    thursday: '18:00–19:00',
  },
  {
    group: 'Ungdomar BJJ',
    ageRange: '10–17 år',
    tuesday: '19:00–20:15',
    thursday: '19:00–20:15',
  },
  {
    group: 'Vuxna Gi',
    ageRange: '18+',
    monday: '20:00–21:30',
    wednesday: '20:00–21:30',
  },
  {
    group: 'No-Gi',
    ageRange: '16+',
    friday: '18:00–19:30',
  },
]

export const schedulePreview = [
  {
    days: 'Måndag & onsdag',
    sessions: [
      { time: '17:00–17:45', group: 'Little Bears', age: '3–5 år' },
      { time: '18:00–19:00', group: 'Barn BJJ', age: '6–9 år' },
      { time: '20:00–21:30', group: 'Vuxna Gi', age: '18+' },
    ],
  },
  {
    days: 'Tisdag & torsdag',
    sessions: [
      { time: '18:00–19:00', group: 'Barn BJJ', age: '6–9 år' },
      { time: '19:00–20:15', group: 'Ungdomar BJJ & No-Gi', age: '10–17 år' },
    ],
  },
  {
    days: 'Fredag',
    sessions: [
      { time: '18:00–19:30', group: 'No-Gi', age: '16+' },
    ],
  },
]
