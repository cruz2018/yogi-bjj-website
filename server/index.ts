import app from './app'

const PORT = Number(process.env.PORT ?? 4000)

app.listen(PORT, () => {
  console.log(`\n🥋 Yogi BJJ API server running on http://localhost:${PORT}`)
  console.log(`   Health:    GET  http://localhost:${PORT}/health`)
  console.log(`   Leads:     POST http://localhost:${PORT}/api/leads`)
  console.log(`   Questions: POST http://localhost:${PORT}/api/questions`)
  console.log(`   Webhook:   GET/POST http://localhost:${PORT}/webhook\n`)
})
