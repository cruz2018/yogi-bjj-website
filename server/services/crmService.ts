import fs from 'fs/promises'
import path from 'path'
import type { Lead, Question } from '../types/lead'

// ─── Supabase client (lazy — only created when env vars are present) ─────────

// Cached after first call so we pay the dynamic import cost only once.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabasePromise: Promise<any> | null = null

async function getSupabase() {
  if (_supabasePromise) return _supabasePromise

  _supabasePromise = (async () => {
    const url = process.env.SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url && !key) {
      console.warn('[crm] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set — using JSON fallback')
      return null
    }
    if (!url) {
      console.error('[crm] SUPABASE_URL is missing — check your .env or Vercel env vars')
      return null
    }
    if (!key) {
      console.error('[crm] SUPABASE_SERVICE_ROLE_KEY is missing — check your .env or Vercel env vars')
      return null
    }
    if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
      console.error('[crm] SUPABASE_URL looks wrong — expected format: https://xxxx.supabase.co')
      return null
    }
    if (!key.startsWith('eyJ')) {
      console.error('[crm] SUPABASE_SERVICE_ROLE_KEY looks wrong — expected a JWT starting with eyJ')
      return null
    }

    const { createClient } = await import('@supabase/supabase-js')
    const client = createClient(url, key)
    console.log('[crm] Supabase client initialized —', url)
    return client
  })()

  return _supabasePromise
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────

function toRow(lead: Lead) {
  return {
    id:             lead.id,
    type:           lead.type,
    first_name:     lead.firstName,
    last_name:      lead.lastName,
    email:          lead.email,
    phone:          lead.phone,
    student_age:    lead.studentAge ?? null,
    group_interest: lead.groupInterest,
    message:        lead.message ?? null,
    source:         lead.source,
    whatsapp_opt_in: false,
    created_at:     lead.createdAt,
  }
}

function fromRow(row: Record<string, unknown>): Lead {
  return {
    id:            row.id as string,
    type:          row.type as Lead['type'],
    firstName:     row.first_name as string,
    lastName:      row.last_name as string,
    email:         row.email as string,
    phone:         row.phone as string,
    studentAge:    (row.student_age as string | null) ?? undefined,
    groupInterest: row.group_interest as string,
    message:       (row.message as string | null) ?? undefined,
    source:        row.source as Lead['source'],
    createdAt:     row.created_at as string,
  }
}

// ─── JSON fallback (used when Supabase env vars are not set) ─────────────────

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

// ─── Debug helpers ───────────────────────────────────────────────────────────

// Logs the full cause chain of a network error without exposing secrets.
function logSupabaseError(label: string, error: unknown): void {
  const e = error as Record<string, unknown>
  console.error(`${label}:`)
  console.error('  message :', e.message)
  console.error('  code    :', e.code)
  console.error('  details :', e.details)
  console.error('  hint    :', e.hint)

  // Walk the cause chain — Node.js 18+ wraps network errors here.
  let cause = e.cause as Record<string, unknown> | undefined
  let depth = 0
  while (cause && depth < 5) {
    console.error(`  cause[${depth}]: message=${cause.message} code=${cause.code} errno=${cause.errno}`)
    cause = cause.cause as Record<string, unknown> | undefined
    depth++
  }
}

// Does a plain fetch to the Supabase REST root before every insert so we can
// distinguish "Supabase is unreachable" from "insert payload is wrong".
async function probeSupabase(): Promise<void> {
  const url = process.env.SUPABASE_URL
  if (!url) return
  try {
    const res = await fetch(`${url}/rest/v1/`, { method: 'HEAD' })
    console.log('[crm] Supabase probe ✓ — HTTP', res.status, res.statusText)
  } catch (err: unknown) {
    const e = err as Error & { cause?: Error & { code?: string; errno?: number } }
    console.error('[crm] Supabase probe FAILED — cannot reach', url)
    console.error('  error  :', e.message)
    console.error('  cause  :', e.cause?.message)
    console.error('  code   :', e.cause?.code)
    console.error('  errno  :', e.cause?.errno)
    console.error('')
    console.error('  Possible causes:')
    console.error('  1. Supabase project is paused (free tier — resume at supabase.com/dashboard)')
    console.error('  2. SUPABASE_URL is wrong — check project ref in Supabase Settings → API')
    console.error('  3. DNS cannot resolve the hostname (try: nslookup ' + url.replace('https://', ''))
    console.error('  4. Outbound HTTPS (443) is blocked by firewall or VPN')
    throw new Error(`Cannot reach Supabase (${e.cause?.code ?? e.message}). See logs above.`)
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function saveLead(lead: Lead): Promise<Lead> {
  const supabase = await getSupabase()

  if (supabase) {
    await probeSupabase()   // logs connectivity result before touching the SDK
    console.log('[crm] Inserting lead into Supabase — id:', lead.id, 'type:', lead.type)
    const { error } = await supabase.from('leads').insert(toRow(lead) as never)
    if (error) {
      logSupabaseError('[crm] Insert failed', error)
      throw new Error(`Supabase insert failed: ${error.message}`)
    }
    console.log('[crm] Lead saved to Supabase ✓', lead.id)
    return lead
  }

  console.warn('[crm] No Supabase client — saving lead to JSON fallback')
  const leads = await readStore()
  leads.push(lead)
  await writeStore(leads)
  return lead
}

export async function getAllLeads(): Promise<Lead[]> {
  const supabase = await getSupabase()

  if (supabase) {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { logSupabaseError('[crm] Select failed', error); throw new Error(`Supabase select failed: ${error.message}`) }
    return (data as Record<string, unknown>[]).map(fromRow)
  }

  return readStore()
}

// Questions are stored in the same leads table with source='website-question'.
// The Question shape is flattened: name → first_name, question → message.
export async function saveQuestion(question: Question): Promise<Question> {
  const supabase = await getSupabase()

  if (supabase) {
    const row = {
      id:             question.id,
      type:           'adult' as const,
      first_name:     question.name,
      last_name:      '',
      email:          question.email,
      phone:          question.phone ?? '',
      student_age:    null,
      group_interest: 'website-question',
      message:        question.question,
      source:         question.source,
      whatsapp_opt_in: false,
      created_at:     question.createdAt,
    }
    console.log('[crm] Inserting question into Supabase — id:', question.id)
    const { error } = await supabase.from('leads').insert(row as never)
    if (error) {
      logSupabaseError('[crm] Insert failed (question)', error)
      throw new Error(`Supabase insert failed: ${error.message}`)
    }
    console.log('[crm] Question saved to Supabase ✓', question.id)
    return question
  }

  console.warn('[crm] No Supabase client — saving question to JSON fallback')
  const existing = await readStore()
  const updated = [...existing, question as unknown as Lead]
  await writeStore(updated)
  return question
}
