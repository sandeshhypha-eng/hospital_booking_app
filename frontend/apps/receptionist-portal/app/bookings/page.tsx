import React, { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/api'

export default function Bookings(){
  const [bookings,setBookings] = useState<any[]>([])
  useEffect(()=>{ fetchJson('/api/bookings/today').then(r=>setBookings(r)).catch(()=>{}) },[])
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Today's Bookings</h1>
      <ul className="space-y-2">
        {bookings.map(b=> (
          <li key={b.id} className="p-3 border rounded flex justify-between">
            <div>{b.patientName} — {b.doctorName}</div>
            <div>{b.status}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
