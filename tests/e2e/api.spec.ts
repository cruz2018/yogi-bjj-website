import { test, expect } from '@playwright/test'
import { LeadsApiClient } from '../api/LeadsApiClient'
import { barnLead, vuxenLead, contactQuestion } from '../fixtures/testData'

test.describe('API — leads', () => {
  test('POST /api/leads accepts a valid child lead', async ({ request }) => {
    const api = new LeadsApiClient(request)
    const data = barnLead()
    const res = await api.postLead({
      type: 'child',
      firstName: data.barnFornamn,
      lastName: data.barnEfternamn,
      email: data.malsmansEpost,
      phone: data.malsmansTelenummer,
      studentAge: data.barnAlder,
      groupInterest: data.grupp,
    })
    expect(res.status()).toBe(201)
    const json = await res.json() as { success: boolean }
    expect(json.success).toBe(true)
  })

  test('POST /api/leads accepts a valid adult lead', async ({ request }) => {
    const api = new LeadsApiClient(request)
    const data = vuxenLead()
    const res = await api.postLead({
      type: 'adult',
      firstName: data.fornamn,
      lastName: data.efternamn,
      email: data.epost,
      phone: data.telefonnummer,
      groupInterest: data.grupp,
    })
    expect(res.status()).toBe(201)
    const json = await res.json() as { success: boolean }
    expect(json.success).toBe(true)
  })

  test('POST /api/leads rejects missing required fields', async ({ request }) => {
    const api = new LeadsApiClient(request)
    const res = await api.postLead({ type: 'adult' })
    expect(res.status()).toBe(400)
    const json = await res.json() as { success: boolean }
    expect(json.success).toBe(false)
  })
})

test.describe('API — questions', () => {
  test('POST /api/questions accepts a valid question', async ({ request }) => {
    const api = new LeadsApiClient(request)
    const data = contactQuestion()
    const res = await api.postQuestion({
      name: `${data.fornamn} ${data.efternamn}`,
      email: data.epost,
      question: data.meddelande,
    })
    expect(res.status()).toBe(201)
    const json = await res.json() as { success: boolean }
    expect(json.success).toBe(true)
  })

  test('POST /api/questions rejects missing fields', async ({ request }) => {
    const api = new LeadsApiClient(request)
    const res = await api.postQuestion({ name: 'Test' })
    expect(res.status()).toBe(400)
    const json = await res.json() as { success: boolean }
    expect(json.success).toBe(false)
  })
})

test.describe('API — health', () => {
  test('GET /api/health returns ok', async ({ request }) => {
    const api = new LeadsApiClient(request)
    const res = await api.health()
    expect(res.status()).toBe(200)
  })
})
