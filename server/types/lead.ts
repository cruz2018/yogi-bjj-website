export type LeadType = 'child' | 'adult'

export type LeadSource = 'website-form' | 'website-question' | 'whatsapp'

export interface Lead {
  id: string
  type: LeadType
  firstName: string
  lastName: string
  email: string
  phone: string
  studentAge?: string       // child leads only
  groupInterest: string
  message?: string
  source: LeadSource
  createdAt: string
}

export interface Question {
  id: string
  name: string
  email: string
  phone?: string
  question: string
  source: 'website-question'
  createdAt: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data: T | null
  error: string | null
}

export function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data, error: null }
}

// Returning ApiResponse<never> lets callers assign the result to any
// ApiResponse<T> — `never | null` reduces to `null` which is valid for T | null.
export function fail(error: string): ApiResponse<never> {
  return { success: false, data: null as never, error }
}
