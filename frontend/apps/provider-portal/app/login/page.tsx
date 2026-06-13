"use client"
import React, { useState } from 'react'
import { login } from '../../lib/api'
import { Input } from '../../../../../libs/ui/src/components/Input'
import { Button } from '../../../../../libs/ui/src/components/Button'

export default function Login(){
  const [form,setForm] = useState({ username: '', password: '' })
  const [err,setErr] = useState<string | null>(null)
  const [loading,setLoading] = useState(false)
  const submit = async (e: React.FormEvent)=>{
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try{
      const res = await login(form)
      if (!['doctor','provider','admin'].includes(res.user?.role)) throw new Error('Unauthorized')
      window.location.href = '/dashboard'
    } catch(e:any){ setErr(e.message || 'Login failed') } finally { setLoading(false) }
  }
  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl mb-4">Provider Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <Input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="username" label="Username" />
        <Input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="password" type="password" label="Password" />
        <Button type="submit" loading={loading} className="w-full">Sign in</Button>
        {err && <div className="text-red-600" role="alert">{err}</div>}
      </form>
    </div>
  )
}
