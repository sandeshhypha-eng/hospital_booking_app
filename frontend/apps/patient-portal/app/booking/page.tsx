"use client"
import React, { useState } from 'react'
import { useSlots } from '../../lib/hooks/useSlots'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const { data: slots, loading } = useSlots(doctorId, date)
  const router = useRouter()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Book a Doctor</h1>
      <div className="space-y-3">
        <input placeholder="Doctor ID" value={doctorId} onChange={e=>setDoctorId(e.target.value)} className="p-2 border rounded" />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="p-2 border rounded" />
        {loading ? <div className="skeleton h-12 rounded" /> : (
          <ul className="space-y-2">
            {slots?.map(s=> (
              <li key={s.id} className="p-3 border rounded flex justify-between">
                <div>{s.time}</div>
                <button onClick={()=> router.push(`/booking/confirm?doctor=${doctorId}&slot=${s.id}&date=${date}`)} className="bg-blue-600 text-white px-3 py-1 rounded">Select</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
