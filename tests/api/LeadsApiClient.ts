import type { APIRequestContext } from '@playwright/test'
import { API_BASE_URL } from '../utils/testHelpers'

export class LeadsApiClient {
  constructor(private request: APIRequestContext) {}

  async postLead(payload: Record<string, unknown>) {
    return this.request.post(`${API_BASE_URL}/api/leads`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  async postQuestion(payload: Record<string, unknown>) {
    return this.request.post(`${API_BASE_URL}/api/questions`, {
      data: payload,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  async health() {
    return this.request.get(`${API_BASE_URL}/api/health`)
  }
}
