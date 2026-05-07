import { Router } from 'express'
import type { Request, Response } from 'express'
import { createLead } from '../services/leadService'
import { fail } from '../types/lead'

const router = Router()

// POST /api/leads
// Accepts an Intresseanmälan submission from the website form.
router.post('/', async (req: Request, res: Response) => {
  try {
    // req.body is `any` — validation happens inside createLead
    const result = await createLead(req.body)
    const status = result.success ? 201 : 400
    res.status(status).json(result)
  } catch (err) {
    console.error('[leads] Unexpected error:', err)
    res.status(500).json(fail('Serverfel. Försök igen eller kontakta oss via WhatsApp.'))
  }
})

// GET /api/leads — for internal inspection / future admin panel
router.get('/', async (_req: Request, res: Response) => {
  try {
    const { getAllLeads } = await import('../services/crmService')
    const leads = await getAllLeads()
    res.json({ success: true, data: leads, error: null })
  } catch (err) {
    console.error('[leads] Read error:', err)
    res.status(500).json(fail('Kunde inte hämta leads.'))
  }
})

export default router
