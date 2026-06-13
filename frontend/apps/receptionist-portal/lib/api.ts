const BASE = process.env.NEXT_PUBLIC_API_URL || ''

export async function fetchJson(path: string, opts: RequestInit = {}){
  const res = await fetch(`${BASE}${path}`, { ...opts, credentials: 'include', headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) } })
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function login(creds: any){
  const res = await fetchJson('/api/auth/login', { method: 'POST', body: JSON.stringify(creds) })
  return res
}
