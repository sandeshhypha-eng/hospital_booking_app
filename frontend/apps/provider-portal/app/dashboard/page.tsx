"use client"
import React from 'react'
import { fetchJson } from '../../lib/api'
import { useEffect, useState } from 'react'
import { Schedule } from '../../../../../libs/ui/src/components/Schedule'
import { List } from '../../../../../libs/ui/src/components/List'
import { Spinner } from '../../../../../libs/ui/src/components/Spinner'

export default function Dashboard(){
  const [bookings,setBookings] = useState<any[] | null>(null)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{ setLoading(true); fetchJson('/api/bookings?providerId=me').then(r=>setBookings(r || [])).catch(()=>setBookings([])).finally(()=>setLoading(false)) },[])

  const slots = Array.from({length:8}).map((_,i)=>({ time: `${9+i}:00`, patient: bookings?.[i]?.patientName, status: bookings?.[i]?.status }))

  return (
    <div>
      <h1 className="text-2xl mb-4">Provider Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <section className="p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-medium mb-2">Today's Schedule</h2>
            {loading ? <div className="flex items-center gap-2"><Spinner /> Loading schedule...</div> : <Schedule slots={slots} />}
          </section>
        </div>
        <div>
          <section className="p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-medium mb-2">Upcoming Bookings</h2>
            {loading ? <div className="flex items-center gap-2"><Spinner /> Loading...</div> :
            <List items={bookings || []} renderItem={(b:any)=> (
              <div>
                <div className="font-medium">{b.service}</div>
                <div className="text-sm text-gray-500">{b.date} — {b.patientName}</div>
              </div>
            )} emptyMessage="No upcoming bookings" />}
          </section>
        </div>
      </div>
    </div>
  )
}
