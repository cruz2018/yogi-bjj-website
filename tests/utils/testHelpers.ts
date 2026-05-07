export const API_BASE_URL = process.env.API_URL ?? 'http://localhost:4000'

export function uniqueSeed() {
  return Date.now()
}
