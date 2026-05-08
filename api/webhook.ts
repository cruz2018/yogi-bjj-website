import { parse as parseUrl } from 'node:url'

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Handler ────────────────────────────────────────────────────────────────
//
// Standalone Vercel function for /webhook. Kept separate from api/index.ts
// (the full Express app) so the GET verification path has zero import chain —
// it cannot crash from a module-init failure in any service layer.

export default async function handler(req: any, res: any): Promise<void> {
  try {
    // ── GET — Meta webhook verification ──────────────────────────────────────
    if (req.method === 'GET') {
      const { query } = parseUrl(req.url ?? '', true)
      const mode      = query['hub.mode']
      const challenge = query['hub.challenge']

      const receivedToken = String(query['hub.verify_token'] ?? '').trim()
      const expectedToken = String(process.env.VERIFY_TOKEN ?? '').trim()

      console.log('[webhook] GET verification attempt')
      console.log('[webhook]   mode received:', mode)
      console.log('[webhook]   challenge exists:', challenge !== undefined && challenge !== '')
      console.log('[webhook]   received token length:', receivedToken.length)
      console.log('[webhook]   env VERIFY_TOKEN exists:', expectedToken.length > 0)
      console.log('[webhook]   env VERIFY_TOKEN length:', expectedToken.length)
      console.log('[webhook]   tokens match:', receivedToken === expectedToken)

      if (mode === 'subscribe' && receivedToken === expectedToken && expectedToken.length > 0) {
        console.log('[webhook] Verification succeeded')
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end(String(challenge ?? ''))
        return
      }

      console.warn('[webhook] Verification failed — mode:', mode,
        '| token match:', receivedToken === expectedToken,
        '| env set:', expectedToken.length > 0)
      res.writeHead(403)
      res.end('Forbidden: verify token mismatch or invalid mode')
      return
    }

    // ── POST — incoming WhatsApp messages ────────────────────────────────────
    if (req.method === 'POST') {
      // Vercel auto-parses JSON bodies into req.body.
      const body = (req.body ?? {}) as MetaPayload
      console.log('[webhook] Incoming payload:', JSON.stringify(body))

      // Lazy import so a messageService crash never affects GET verification.
      const { storeMessage } = await import('../server/services/messageService.js')

      try {
        const changes = body.entry?.[0]?.changes ?? []

        for (const change of changes) {
          const messages = change.value?.messages ?? []
          const contacts = change.value?.contacts ?? []

          for (const msg of messages) {
            const name: string = contacts[0]?.profile?.name ?? 'Unknown'
            const text: string = msg.text?.body ?? ''

            const stored = {
              id:         msg.id,
              from:       msg.from,
              name,
              type:       msg.type,
              body:       text,
              timestamp:  new Date(Number(msg.timestamp) * 1000).toISOString(),
              receivedAt: new Date().toISOString(),
            }

            const saved = await storeMessage(stored)
            console.log(saved
              ? `[webhook] Stored message ${msg.id} from ${msg.from}`
              : `[webhook] Duplicate message ${msg.id} — skipped`)
          }
        }
      } catch (err) {
        console.error('[webhook] Error processing payload:', err)
      }

      res.writeHead(200)
      res.end()
      return
    }

    res.writeHead(405)
    res.end('Method Not Allowed')
  } catch (err) {
    console.error('[webhook] Unhandled error:', err)
    if (!res.headersSent) {
      res.writeHead(500)
      res.end('Internal Server Error')
    }
  }
}
