import fs from 'fs/promises'
import path from 'path'

export interface StoredMessage {
  id: string
  from: string
  name: string
  type: string
  body: string
  timestamp: string
  receivedAt: string
}

const DATA_DIR = process.env.VERCEL
  ? '/tmp/yogi-data'
  : path.join(process.cwd(), 'server', 'data')

const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json')

async function ensureDataDir(): Promise<void> {
  if (process.env.VERCEL) await fs.mkdir(DATA_DIR, { recursive: true })
}

async function readMessages(): Promise<StoredMessage[]> {
  try {
    const raw = await fs.readFile(MESSAGES_FILE, 'utf-8')
    return JSON.parse(raw) as StoredMessage[]
  } catch {
    return []
  }
}

async function writeMessages(messages: StoredMessage[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8')
}

/** Appends the message only if its id has not been seen before. Returns true if stored. */
export async function storeMessage(msg: StoredMessage): Promise<boolean> {
  const messages = await readMessages()
  if (messages.some(m => m.id === msg.id)) return false
  messages.push(msg)
  await writeMessages(messages)
  return true
}

export async function getAllMessages(): Promise<StoredMessage[]> {
  return readMessages()
}
