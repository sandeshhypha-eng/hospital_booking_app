import React, { useState } from 'react'
import { fetchJson } from '../../../lib/api'

export default function NewBooking(){
  const [phone,setPhone]=useState('')
  const [doctorId,setDoctorId]=useState('')
  const [slotId,setSlotId]=useState('')
  const submit=async()=>{
    await fetchJson('/api/bookings', { method: 'POST', body: JSON.stringify({ patientPhone: phone, doctorId, slotId }) })
    alert('Walk-in created')
  }
  return (
    <div>
      <h1 className="text-2xl mb-4">New Walk-in</h1>
      <div className="space-y-2 max-w-md">
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full p-2 border rounded" />
        <input value={doctorId} onChange={e=>setDoctorId(e.target.value)} placeholder="Doctor ID" className="w-full p-2 border rounded" />
        <input value={slotId} onChange={e=>setSlotId(e.target.value)} placeholder="Slot ID" className="w-full p-2 border rounded" />
        <button onClick={submit} className="bg-green-600 text-white p-2 rounded">Create</button>
      </div>
    </div>
  )
}
