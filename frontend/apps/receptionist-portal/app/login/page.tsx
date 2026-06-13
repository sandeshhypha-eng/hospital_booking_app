import React, { useState } from 'react'
import { login } from '../../lib/api'

export default function LoginPage(){
  const [form,setForm] = useState({ username: '', password: '' })
  const [err,setErr] = useState<string | null>(null)
  const submit = async (e: React.FormEvent)=>{
    e.preventDefault()
    try{
      const res = await login(form)
      if (!['receptionist','admin'].includes(res.user?.role)) throw new Error('Unauthorized role')
      window.location.href = '/dashboard'
    } catch (e: any){ setErr(e.message || 'Login failed') }
  }
  return (
    <div className="max-w-md mx-auto mt-12">
      <h1 className="text-2xl font-semibold mb-4">Staff Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="username" className="w-full p-2 border rounded" />
        <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="password" type="password" className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Sign in</button>
        {err && <div className="text-red-600">{err}</div>}
      </form>
    </div>
  )
}
