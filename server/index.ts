import 'dotenv/config'
import app from './app'

const PORT = Number(process.env.PORT ?? 4000)

app.listen(PORT, () => {
  console.log(`\n🥋 Yogi BJJ API server running on http://localhost:${PORT}`)
  console.log(`   Health:    GET  http://localhost:${PORT}/health`)
  console.log(`   Leads:     POST http://localhost:${PORT}/api/leads`)
  console.log(`   Questions: POST http://localhost:${PORT}/api/questions`)
  console.log(`   Webhook:   GET/POST http://localhost:${PORT}/webhook`)

  const hasUrl = Boolean(process.env.SUPABASE_URL)
  const hasKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  console.log('\n[env] .env loaded')
  console.log(`[env] SUPABASE_URL              ${hasUrl ? '✓ set' : '✗ NOT SET — check .env'}`)
  console.log(`[env] SUPABASE_SERVICE_ROLE_KEY ${hasKey ? '✓ set' : '✗ NOT SET — check .env'}`)
  if (hasUrl && hasKey) {
    console.log('[env] Storage: Supabase (connection confirmed on first request)')
  } else {
    console.log('[env] Storage: JSON fallback — set Supabase env vars and restart')
  }
  console.log('')
})
