import React, { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/api'

export default function Dashboard(){
  const [stats,setStats] = useState<any>(null)
  useEffect(()=>{ fetchJson('/api/bookings/today').then(r=>setStats(r)).catch(()=>{}) },[])
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Receptionist Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded">Total: {stats?.total || '-'}</div>
        <div className="p-4 border rounded">Checked-in: {stats?.checkedIn || '-'}</div>
        <div className="p-4 border rounded">Waiting: {stats?.waiting || '-'}</div>
      </div>
    </div>
  )
}
