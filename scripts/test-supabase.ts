/**
 * Standalone Supabase connectivity + insert test.
 * Run with:  npx tsx --env-file .env scripts/test-supabase.ts
 *
 * Does not use Express or any route handler — diagnoses the connection
 * independently so we can rule out application-layer issues.
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'node:crypto'

const url = process.env.SUPABASE_URL ?? ''
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

console.log('\n=== Supabase connectivity test ===\n')

// ── 1. Env vars ──────────────────────────────────────────────────────────────
console.log('1. Environment variables')
console.log('   SUPABASE_URL              :', url || '✗ NOT SET')
console.log('   SUPABASE_SERVICE_ROLE_KEY :', key ? `✓ set (length ${key.length}, starts with "${key.slice(0, 6)}")` : '✗ NOT SET')

if (!url || !key) {
  console.error('\n✗ Aborting — env vars missing. Make sure .env exists and npx tsx --env-file .env was used.\n')
  process.exit(1)
}

// ── 2. URL format ────────────────────────────────────────────────────────────
console.log('\n2. URL format')
const urlValid = url.startsWith('https://') && url.includes('.supabase.co')
console.log('   starts with https://     :', url.startsWith('https://') ? '✓' : '✗')
console.log('   contains .supabase.co    :', url.includes('.supabase.co') ? '✓' : '✗')
if (!urlValid) {
  console.error('   ✗ URL looks wrong — copy it from Supabase → Settings → API → Project URL')
}

// ── 3. DNS resolution ────────────────────────────────────────────────────────
console.log('\n3. DNS resolution')
const { Resolver } = await import('node:dns/promises')
const hostname = url.replace('https://', '').replace(/\/.*/, '')
try {
  const resolver = new Resolver()
  const addrs = await resolver.resolve4(hostname)
  console.log(`   ${hostname} → ${addrs.join(', ')} ✓`)
} catch (err: unknown) {
  const e = err as NodeJS.ErrnoException
  console.error(`   ✗ DNS failed: ${e.code} — ${e.message}`)
  console.error('   → The hostname cannot be resolved. Check the URL or try toggling VPN/WiFi.')
}

// ── 4. Raw HTTP fetch to REST root ───────────────────────────────────────────
console.log('\n4. Raw fetch to', `${url}/rest/v1/`)
try {
  const t0 = Date.now()
  const res = await fetch(`${url}/rest/v1/`, {
    method:  'GET',
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  const ms = Date.now() - t0
  const body = await res.text()
  console.log('   HTTP status :', res.status, res.statusText, `(${ms}ms)`)
  console.log('   Response    :', body.slice(0, 120))
  if (res.status === 404) console.log('   → 404 is expected here — REST root does not list tables by default')
  if (res.status === 401) console.log('   → 401 means the key is wrong or belongs to a different project')
  if (res.status === 403) console.log('   → 403 means JWT is valid but role/permissions are insufficient')
} catch (err: unknown) {
  const e = err as Error & { cause?: Error & { code?: string; errno?: number } }
  console.error('   ✗ fetch failed:', e.message)
  console.error('   cause         :', e.cause?.message)
  console.error('   cause.code    :', e.cause?.code)
  console.error('   cause.errno   :', e.cause?.errno)
  console.error('')
  if (e.cause?.code === 'ENOTFOUND')    console.error('   → DNS resolution failed. Check the URL.')
  if (e.cause?.code === 'ECONNREFUSED') console.error('   → Connection refused. Project may be paused.')
  if (e.cause?.code === 'ETIMEDOUT')    console.error('   → Timeout. Network or firewall issue.')
  if (e.message.includes('SSL') || e.message.includes('TLS')) console.error('   → TLS/SSL handshake failed.')
}

// ── 5. Supabase client: select from leads ────────────────────────────────────
console.log('\n5. Supabase client — SELECT count from leads')
const supabase = createClient(url, key)
const { count, error: selErr } = await supabase
  .from('leads')
  .select('*', { count: 'exact', head: true })

if (selErr) {
  console.error('   ✗ SELECT error:', selErr.message)
  console.error('     code   :', (selErr as unknown as Record<string, unknown>).code)
  console.error('     hint   :', (selErr as unknown as Record<string, unknown>).hint)
  console.error('     details:', (selErr as unknown as Record<string, unknown>).details)
  if (selErr.message.includes('does not exist')) {
    console.error('   → The "leads" table was not found in the public schema.')
    console.error('     Run supabase/schema.sql in the Supabase SQL Editor.')
  }
} else {
  console.log('   ✓ leads table exists — current row count:', count)
}

// ── 6. Supabase client: INSERT one test row ──────────────────────────────────
console.log('\n6. Supabase client — INSERT test lead')
const testId = randomUUID()
const testRow = {
  id:             testId,
  type:           'adult',
  first_name:     'Test',
  last_name:      'Script',
  email:          'test-script@yogi-bjj.local',
  phone:          '+46700000000',
  group_interest: 'test',
  source:         'website-form',
  whatsapp_opt_in: false,
  created_at:     new Date().toISOString(),
}

const { error: insErr } = await supabase.from('leads').insert(testRow as never)

if (insErr) {
  console.error('   ✗ INSERT error:', insErr.message)
  console.error('     code   :', (insErr as unknown as Record<string, unknown>).code)
  console.error('     hint   :', (insErr as unknown as Record<string, unknown>).hint)
  console.error('     details:', (insErr as unknown as Record<string, unknown>).details)
} else {
  console.log('   ✓ Row inserted — id:', testId)
  console.log('   Check Supabase → Table Editor → leads → filter by email "test-script@yogi-bjj.local"')

  // Clean up the test row
  const { error: delErr } = await supabase.from('leads').delete().eq('id', testId)
  if (delErr) {
    console.warn('   (cleanup delete failed — row left in table, delete manually)')
  } else {
    console.log('   ✓ Test row cleaned up')
  }
}

console.log('\n=== test complete ===\n')
