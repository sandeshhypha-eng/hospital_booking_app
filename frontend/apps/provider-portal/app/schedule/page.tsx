"use client"
import React from 'react'
import { fetchJson } from '../../lib/api'
import { useEffect, useState } from 'react'

export default function Schedule(){
  const [slots,setSlots]=useState<any[]>([])
  useEffect(()=>{ fetchJson('/api/bookings?providerId=me').then(r=>setSlots(r)).catch(()=>{}) },[])
  return (
    <div>
      <h1 className="text-2xl mb-4">Schedule</h1>
      <ul className="space-y-2">{slots.map(s=> <li key={s.id} className="p-2 border rounded">{s.date} {s.slot} — {s.patientName}</li>)}</ul>
    </div>
  )
}
