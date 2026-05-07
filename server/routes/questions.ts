import { Router } from 'express'
import type { Request, Response } from 'express'
import { createQuestion } from '../services/leadService'
import { fail } from '../types/lead'

const router = Router()

// POST /api/questions
// Accepts a contact/question form submission from the website.
router.post('/', async (req: Request, res: Response) => {
  try {
    // req.body is `any` — validation happens inside createQuestion
    const result = await createQuestion(req.body)
    const status = result.success ? 201 : 400
    res.status(status).json(result)
  } catch (err) {
    console.error('[questions] Unexpected error:', err)
    res.status(500).json(fail('Serverfel. Försök igen eller kontakta oss via WhatsApp.'))
  }
})

export default router
