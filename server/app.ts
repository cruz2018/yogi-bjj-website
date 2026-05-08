import express from 'express'
import cors from 'cors'
import leadsRouter from './routes/leads.js'
import questionsRouter from './routes/questions.js'
import whatsappRouter from './routes/whatsapp.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS applies to browser-initiated requests (frontend → API).
// Meta webhook calls are server-to-server and don't send Origin headers,
// so CORS config does not affect /webhook.
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:5180',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
]
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)

app.use('/api/leads', leadsRouter)
app.use('/api/questions', questionsRouter)

// Meta WhatsApp webhook — mounted at /webhook (no /api prefix) because Meta
// calls this URL directly and the path is registered in the Meta Developer Portal.
app.use('/webhook', whatsappRouter)

const healthBody = () => ({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() }, error: null })
app.get('/api/health', (_req, res) => { res.json(healthBody()) })
app.get('/health',     (_req, res) => { res.json(healthBody()) })

app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, data: null, error: 'Endpoint hittades inte.' })
})

export default app
