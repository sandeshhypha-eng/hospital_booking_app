"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ identifier }) })
      if (!res.ok) throw new Error('Login failed')
      const data = await res.json()
      localStorage.setItem('token', data.token || 'mock-token')
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-3" aria-label="Login form">
        <div>
          <label htmlFor="identifier" className="sr-only">Phone or email</label>
          <input id="identifier" value={identifier} onChange={e=>setIdentifier(e.target.value)} placeholder="Phone or email" className="w-full p-3 border rounded" aria-required="true" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white p-3 rounded">{loading ? 'Signing in...' : 'Sign in'}</button>
        {error && <div className="text-red-600" role="alert">{error}</div>}
      </form>
      <p className="mt-4 text-sm">New here? <a className="text-emerald-600" href="/register">Create an account</a></p>
    </div>
  )
}
