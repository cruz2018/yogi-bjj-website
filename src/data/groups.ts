export interface Group {
  name: string
  ageRange: string
  description: string
}

export const groups: Group[] = [
  {
    name: 'Little Bears',
    ageRange: '3–5 år',
    description:
      'En lekfull introduktion till rörelse, balans och grundläggande kampsport. Barnen lär sig att lyssna, samarbeta och ha kul i en trygg miljö.',
  },
  {
    name: 'Barn BJJ',
    ageRange: '6–9 år',
    description:
      'Strukturerad träning med fokus på teknik, disciplin och gemenskap. Barnen utvecklar självförtroende och respekt i ett positivt och uppmuntrande klimat.',
  },
  {
    name: 'Ungdomar',
    ageRange: '10–17 år',
    description:
      'Mer avancerad teknik, taktik och tävlingsförberedelse för de som vill ta nästa steg. Träningen stärker mental och fysisk förmåga under tonåren.',
  },
]

export const events = [
  {
    type: 'Seminarier',
    description:
      'Marcelo Yogi bjuder regelbundet in gästtränare och håller egna seminarier för alla nivåer – från nybörjare till erfarna utövare.',
  },
  {
    type: 'Graderingar',
    description:
      'Formella graderingar hålls terminsvis där utövare kan avancera i bältessystemet baserat på teknik, närvaro och attityd.',
  },
  {
    type: 'Träningsläger',
    description:
      'Sommar- och vinterläger erbjuder intensiv träning i en ny miljö, ofta med deltagare från hela Skandinavien.',
  },
]
