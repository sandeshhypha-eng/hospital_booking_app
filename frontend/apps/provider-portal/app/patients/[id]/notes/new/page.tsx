import React, { useState } from 'react'
import { fetchJson } from '../../../../../lib/api'

export default function NewNote({ params }: { params: { id: string } }){
  const [form,setForm]=useState({ title:'', body:'' })
  const submit=async ()=>{ await fetchJson(`/api/users/${params.id}/notes`, { method:'POST', body: JSON.stringify(form) }); alert('Note added') }
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl mb-4">Add Note</h1>
      <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full p-2 border rounded mb-2" />
      <textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="Body" className="w-full p-2 border rounded mb-2" />
      <button onClick={submit} className="bg-blue-600 text-white p-2 rounded">Save</button>
    </div>
  )
}
