import type { IncomingMessage, ServerResponse } from 'node:http'
import app from '../server/app'

export default function handler(req: IncomingMessage, res: ServerResponse) {
  console.log('[api/index] invoked —', req.method, req.url)
  console.log('[api/index] SUPABASE_URL set:', Boolean(process.env.SUPABASE_URL))
  console.log('[api/index] SUPABASE_KEY set:', Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (app as any)(req, res)
}
