import crypto from 'crypto'
import { fail, ok, type Lead, type LeadType, type Question, type ApiResponse } from '../types/lead.js'
import { saveLead, saveQuestion } from './crmService.js'
import { notifyNewLead, notifyNewQuestion } from './notificationService.js'

// ─── Validation helpers ─────────────────────────────────────────────────────
function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isPhone(v: string): boolean {
  return v.replace(/\s/g, '').length >= 7
}

function required(value: unknown, field: string): string | null {
  if (!value || String(value).trim() === '') return `Fältet "${field}" är obligatoriskt.`
  return null
}

// ─── Lead creation ──────────────────────────────────────────────────────────
interface CreateLeadInput {
  type: string
  firstName: string
  lastName: string
  email: string
  phone: string
  studentAge?: string
  groupInterest: string
  message?: string
}

export async function createLead(
  input: CreateLeadInput,
): Promise<ApiResponse<Lead>> {
  // Validate
  const errors: string[] = []
  const r = (v: unknown, f: string) => { const e = required(v, f); if (e) errors.push(e) }

  r(input.type, 'type')
  r(input.firstName, 'firstName')
  r(input.lastName, 'lastName')
  r(input.email, 'email')
  r(input.phone, 'phone')
  r(input.groupInterest, 'groupInterest')

  if (input.type !== 'child' && input.type !== 'adult') {
    errors.push('Ogiltigt värde för "type". Förväntad: "child" eller "adult".')
  }
  if (input.email && !isEmail(input.email)) {
    errors.push('Ogiltig e-postadress.')
  }
  if (input.phone && !isPhone(input.phone)) {
    errors.push('Ogiltigt telefonnummer.')
  }
  if (input.type === 'child' && !input.studentAge) {
    errors.push('Barnets ålder är obligatorisk för barnintresseanmälan.')
  }

  if (errors.length > 0) return fail(errors.join(' '))

  const lead: Lead = {
    id: crypto.randomUUID(),
    type: input.type as LeadType,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    studentAge: input.studentAge?.trim(),
    groupInterest: input.groupInterest.trim(),
    message: input.message?.trim(),
    source: 'website-form',
    createdAt: new Date().toISOString(),
  }

  const saved = await saveLead(lead)
  await notifyNewLead(saved)
  return ok(saved)
}

// ─── Question creation ──────────────────────────────────────────────────────
interface CreateQuestionInput {
  name: string
  email: string
  phone?: string
  question: string
}

export async function createQuestion(
  input: CreateQuestionInput,
): Promise<ApiResponse<Question>> {
  const errors: string[] = []
  const r = (v: unknown, f: string) => { const e = required(v, f); if (e) errors.push(e) }

  r(input.name, 'name')
  r(input.email, 'email')
  r(input.question, 'question')

  if (input.email && !isEmail(input.email)) {
    errors.push('Ogiltig e-postadress.')
  }

  if (errors.length > 0) return fail(errors.join(' '))

  const q: Question = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone?.trim(),
    question: input.question.trim(),
    source: 'website-question',
    createdAt: new Date().toISOString(),
  }

  const saved = await saveQuestion(q)
  await notifyNewQuestion(saved)
  return ok(saved)
}
