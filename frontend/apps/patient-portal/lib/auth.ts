// Simple auth helper: in-memory token + helpers. httpOnly refresh is expected via cookie from server.
let token: string | null = null

export function setToken(t: string) { token = t }
export function clearToken() { token = null }
export function getToken() { return token }

export async function logout() {
  token = null
  await fetch((process.env.NEXT_PUBLIC_API_URL || '') + '/api/auth/logout', { method: 'POST', credentials: 'include' })
}
