"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:3000/api/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Register failed')
      const data = await res.json()
      localStorage.setItem('token', data.token || 'mock-token')
      router.push('/dashboard')
    } catch (err: any) { setError(err?.message || 'Register failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-3" aria-label="Registration form">
        <div>
          <label htmlFor="name" className="sr-only">Full name</label>
          <input id="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full p-3 border rounded" aria-required="true" />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input id="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-3 border rounded" aria-required="true" />
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">Phone</label>
          <input id="phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" className="w-full p-3 border rounded" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white p-3 rounded">{loading ? 'Creating...' : 'Create account'}</button>
        {error && <div className="text-red-600" role="alert">{error}</div>}
      </form>
      <p className="mt-4 text-sm">Already have an account? <a className="text-emerald-600" href="/login">Sign in</a></p>
    </div>
  )
}
