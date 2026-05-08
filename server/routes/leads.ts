import { Router } from 'express'
import type { Request, Response } from 'express'
import { createLead } from '../services/leadService.js'
import { fail } from '../types/lead.js'

const router = Router()

// POST /api/leads
// Accepts an Intresseanmälan submission from the website form.
router.post('/', async (req: Request, res: Response) => {
  console.log('[leads] POST /api/leads received')
  console.log('[leads] body keys:', Object.keys(req.body ?? {}).join(', '))

  try {
    console.log('[leads] calling createLead...')
    const result = await createLead(req.body)
    const status = result.success ? 201 : 400
    console.log(`[leads] responding ${status} — success: ${result.success}`)
    res.status(status).json(result)
  } catch (err) {
    console.error('[leads] Unexpected error:', err)
    res.status(500).json(fail('Serverfel. Försök igen eller kontakta oss via WhatsApp.'))
  }
})

// GET /api/leads — for internal inspection / future admin panel
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { getAllLeads } = await import('../services/crmService.js')
    const leads = await getAllLeads()
    res.json({ success: true, data: leads, error: null })
  } catch (err) {
    console.error('[leads] Read error:', err)
    res.status(500).json(fail('Kunde inte hämta leads.'))
  }
})

export default router
