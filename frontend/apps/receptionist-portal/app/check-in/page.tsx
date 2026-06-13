import React, { useState } from 'react'
import { fetchJson } from '../../lib/api'

export default function CheckIn(){
  const [q,setQ] = useState('')
  const [patient,setPatient] = useState<any>(null)
  const search = async ()=>{
    const res = await fetchJson(`/api/users/search?q=${encodeURIComponent(q)}`)
    setPatient(res[0] || null)
  }
  const checkin = async ()=>{
    if (!patient) return
    const r = await fetchJson(`/api/bookings/${patient.bookingId}/checkin`, { method: 'PATCH' })
    alert('Checked in. Token: ' + r.tokenNumber)
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Quick Check-in</h1>
      <div className="flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="name/phone/booking" className="p-2 border rounded" />
        <button onClick={search} className="bg-blue-600 text-white p-2 rounded">Search</button>
      </div>
      {patient && <div className="mt-3 p-3 border rounded">
        <div className="font-medium">{patient.name}</div>
        <div className="text-sm">{patient.phone}</div>
        <button onClick={checkin} className="mt-2 bg-green-600 text-white p-2 rounded">Check in</button>
      </div>}
    </div>
  )
}
