import React, { useState } from 'react'
import { fetchJson } from '../../../lib/api'

export default function NewPatient(){
  const [form,setForm]=useState({ name:'', phone:'', dob:'', gender:'', address:'' })
  const submit=async ()=>{ await fetchJson('/api/users', { method:'POST', body: JSON.stringify(form) }); alert('Patient created') }
  return (
    <div className="max-w-lg">
      <h1 className="text-2xl mb-4">New Patient</h1>
      <div className="space-y-2">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone" className="w-full p-2 border rounded" />
        <input value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} type="date" className="w-full p-2 border rounded" />
        <input value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} placeholder="Gender" className="w-full p-2 border rounded" />
        <textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Address" className="w-full p-2 border rounded" />
        <button onClick={submit} className="bg-green-600 text-white p-2 rounded">Create</button>
      </div>
    </div>
  )
}
