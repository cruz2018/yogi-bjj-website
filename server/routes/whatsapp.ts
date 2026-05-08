import { Router } from 'express'
import type { Request, Response } from 'express'
import { storeMessage } from '../services/messageService.js'
import type { StoredMessage } from '../services/messageService.js'

const router = Router()

// ─── Types for the Meta webhook payload ─────────────────────────────────────

interface MetaTextMessage {
  id: string
  from: string
  timestamp: string
  type: string
  text?: { body: string }
}

interface MetaPayload {
  object?: string
  entry?: Array<{
    changes?: Array<{
      value?: {
        contacts?: Array<{ profile?: { name?: string } }>
        messages?: MetaTextMessage[]
      }
    }>
  }>
}

// ─── GET /webhook — Meta webhook verification ────────────────────────────────
//
// Meta sends: hub.mode=subscribe, hub.verify_token, hub.challenge
// If the token matches VERIFY_TOKEN, respond with hub.challenge as plain text.
// Register this URL in Meta → WhatsApp → Webhooks.
//
// Manual test:
//   curl "https://YOUR_BACKEND_DOMAIN/webhook?hub.mode=subscribe&hub.verify_token=YOUR_VERIFY_TOKEN&hub.challenge=12345"
//   Expected response: 12345

router.get('/', (req: Request, res: Response) => {
  const mode      = req.query['hub.mode']
  const token     = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('[webhook] Meta verification succeeded')
    res.status(200).send(String(challenge))
  } else {
    console.warn('[webhook] Meta verification failed — token mismatch or wrong mode')
    res.sendStatus(403)
  }
})

// ─── POST /webhook — incoming WhatsApp messages ──────────────────────────────
//
// Meta expects a 200 within 15 seconds. We must await all storage before
// responding — Vercel freezes the function immediately after res.send(), so
// fire-and-forget .then() chains will never run.

router.post('/', async (req: Request, res: Response) => {
  const body = req.body as MetaPayload
  console.log('[webhook] Incoming payload:', JSON.stringify(body))

  try {
    const changes = body.entry?.[0]?.changes ?? []

    for (const change of changes) {
      const messages  = change.value?.messages ?? []
      const contacts  = change.value?.contacts ?? []

      for (const msg of messages) {
        const name: string = contacts[0]?.profile?.name ?? 'Unknown'
        const text: string = msg.text?.body ?? ''

        const stored: StoredMessage = {
          id:          msg.id,
          from:        msg.from,
          name,
          type:        msg.type,
          body:        text,
          timestamp:   new Date(Number(msg.timestamp) * 1000).toISOString(),
          receivedAt:  new Date().toISOString(),
        }

        const saved = await storeMessage(stored)
        if (saved) {
          console.log(`[webhook] Stored message ${msg.id} from ${msg.from}`)
        } else {
          console.log(`[webhook] Duplicate message ${msg.id} — skipped`)
        }
      }
    }
  } catch (err) {
    console.error('[webhook] Error processing payload:', err)
  }

  res.sendStatus(200)
})

export default router
