export type LoginResponse = { token: string; refreshToken?: string; user: any }

const BASE = process.env.NEXT_PUBLIC_API_URL || ''

let inMemoryToken: string | null = null

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string,string> = { 'Content-Type': 'application/json', ...(opts.headers as Record<string,string>||{}) }
  if (inMemoryToken) headers['Authorization'] = `Bearer ${inMemoryToken}`
  const res = await fetch(`${BASE}${path}`, { ...opts, headers, credentials: 'include' })
  if (res.status === 401) {
    // Attempt refresh
    const refreshed = await refreshToken()
    if (refreshed) {
      headers['Authorization'] = `Bearer ${inMemoryToken}`
      return fetch(`${BASE}${path}`, { ...opts, headers, credentials: 'include' })
    }
  }
  return res
}

export async function login(payload: { identifier: string }) {
  const res = await request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) })
  if (!res.ok) throw new Error('Login failed')
  const data: LoginResponse = await res.json()
  inMemoryToken = data.token
  return data
}

export async function register(payload: { name: string; email: string; phone: string }) {
  const res = await request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) })
  if (!res.ok) throw new Error('Register failed')
  return res.json()
}

export async function refreshToken(): Promise<boolean> {
  const res = await fetch(`${BASE}/api/auth/refresh`, { method: 'POST', credentials: 'include' })
  if (!res.ok) return false
  const data = await res.json()
  inMemoryToken = data.token
  return true
}

export async function getBookings(patientId?: string, status?: string) {
  const q = new URLSearchParams()
  if (patientId) q.set('patientId', patientId)
  if (status) q.set('status', status)
  const res = await request(`/api/bookings?${q.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch bookings')
  return res.json()
}

export async function createBooking(body: { doctorId: string; slotId: string; notes?: string }) {
  const res = await request('/api/bookings', { method: 'POST', body: JSON.stringify(body) })
  if (!res.ok) throw new Error('Booking failed')
  return res.json()
}

export async function getSlots(doctorId: string, date: string) {
  const q = new URLSearchParams()
  if (doctorId) q.set('doctorId', doctorId)
  if (date) q.set('date', date)
  const res = await request(`/api/slots?${q.toString()}`)
  if (!res.ok) throw new Error('Failed to fetch slots')
  return res.json()
}

export async function getProfile() {
  const res = await request('/api/users/me')
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}

export async function updateProfile(payload: any) {
  const res = await request('/api/users/me', { method: 'PATCH', body: JSON.stringify(payload) })
  if (!res.ok) throw new Error('Failed to update')
  return res.json()
}

export async function getNotifications() {
  const res = await request('/api/notifications')
  if (!res.ok) throw new Error('Failed to fetch notifications')
  return res.json()
}
