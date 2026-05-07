export function barnLead(seed = Date.now()) {
  return {
    barnFornamn: 'Elias',
    barnEfternamn: 'Testsson',
    barnAlder: '8',
    grupp: 'Barn BJJ 6–9 år',
    malsmansFornamn: 'Maria',
    malsmansEfternamn: 'Testsson',
    malsmansEpost: `marcus.test+barn${seed}@example.com`,
    malsmansTelenummer: '+46 70 000 00 01',
    meddelande: '',
  }
}

export function vuxenLead(seed = Date.now()) {
  return {
    fornamn: 'Anders',
    efternamn: 'Testvuxen',
    epost: `marcus.test+vuxen${seed}@example.com`,
    telefonnummer: '+46 70 000 00 02',
    grupp: 'Vuxen Gi',
    meddelande: '',
  }
}

export function contactQuestion(seed = Date.now()) {
  return {
    fornamn: 'Sara',
    efternamn: 'Frågaren',
    epost: `marcus.test+kontakt${seed}@example.com`,
    meddelande: 'Hej! Jag undrar om provträning.',
  }
}
