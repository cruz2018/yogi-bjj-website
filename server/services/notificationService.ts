import type { Lead, Question } from '../types/lead'

// ─── Notification service ──────────────────────────────────────────────────
// Current behaviour: log to console.
//
// Future integrations (swap the body of each function):
//   - WhatsApp Cloud API: send a message to Marcelo's number via
//     POST https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages
//   - Email: use Resend / SendGrid / Nodemailer
//   - SMS: Twilio

export async function notifyNewLead(lead: Lead): Promise<void> {
  const emoji = lead.type === 'child' ? '[BARN]' : '[VUXEN]'
  console.log(`\n📋 ${emoji} Ny intresseanmälan`)
  console.log(`   Namn:    ${lead.firstName} ${lead.lastName}`)
  console.log(`   E-post:  ${lead.email}`)
  console.log(`   Telefon: ${lead.phone}`)
  console.log(`   Grupp:   ${lead.groupInterest}`)
  if (lead.studentAge) console.log(`   Ålder:   ${lead.studentAge} år`)
  if (lead.message)    console.log(`   Meddelande: ${lead.message}`)
  console.log(`   Källa:   ${lead.source}`)
  console.log(`   Tid:     ${lead.createdAt}\n`)

  // TODO — WhatsApp notification to Marcelo:
  // await sendWhatsAppMessage(process.env.MARCELO_WHATSAPP_NUMBER, formatLeadMessage(lead))
}

export async function notifyNewQuestion(question: Question): Promise<void> {
  console.log(`\n❓ Ny fråga från hemsidan`)
  console.log(`   Namn:   ${question.name}`)
  console.log(`   E-post: ${question.email}`)
  if (question.phone) console.log(`   Telefon: ${question.phone}`)
  console.log(`   Fråga:  ${question.question}`)
  console.log(`   Tid:    ${question.createdAt}\n`)

  // TODO — forward to Marcelo via WhatsApp or email
}
