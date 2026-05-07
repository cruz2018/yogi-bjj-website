import fs from 'fs/promises'
import path from 'path'
import type { Lead, Question } from '../types/lead'

// On Vercel the project root is read-only (/var/task). Use /tmp for writable
// ephemeral storage. Locally (no VERCEL env var) keep the existing data dir.
const DATA_DIR = process.env.VERCEL
  ? '/tmp/yogi-data'
  : path.join(process.cwd(), 'server', 'data')

const LEADS_FILE = path.join(DATA_DIR, 'leads.json')

async function ensureDataDir(): Promise<void> {
  if (process.env.VERCEL) await fs.mkdir(DATA_DIR, { recursive: true })
}

async function readStore(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8')
    return JSON.parse(raw) as Lead[]
  } catch {
    return []
  }
}

async function writeStore(leads: Lead[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8')
}

export async function saveLead(lead: Lead): Promise<Lead> {
  const leads = await readStore()
  leads.push(lead)
  await writeStore(leads)
  return lead
}

export async function getAllLeads(): Promise<Lead[]> {
  return readStore()
}

// Questions are appended to the same store with a discriminated shape.
// For a real CRM, separate tables/sheets would be preferable.
export async function saveQuestion(question: Question): Promise<Question> {
  const existing = await readStore()
  // Spread avoids the ASI ambiguity that would arise from starting the next
  // line with `(` directly after an await expression.
  const updated = [...existing, question as unknown as Lead]
  await writeStore(updated)
  return question
}
