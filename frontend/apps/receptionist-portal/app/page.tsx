"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { List } from '../../../../libs/ui/src/components/List'
import { Spinner } from '../../../../libs/ui/src/components/Spinner'

export default function Page(){
  const [queue, setQueue] = useState<any[] | null>(null)
  const [loading,setLoading] = useState(true)
  useEffect(()=>{ setLoading(true); fetch('/api/queue').then(r=>r.json()).then(d=>setQueue(d || [])).catch(()=>setQueue([])).finally(()=>setLoading(false)) },[])
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold">Receptionist Dashboard</h1>
      <p className="text-gray-600 mt-2">Manage check-ins and the live queue.</p>

      <section className="mt-6">
        <h2 className="text-lg font-medium mb-2">Live Queue</h2>
        {loading ? <div className="flex items-center gap-2"><Spinner /> Loading queue...</div> :
        <List items={queue || []} renderItem={(q:any)=> (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{q.patientName}</div>
              <div className="text-sm text-gray-500">{q.reason}</div>
            </div>
            <div className="text-sm text-gray-500">{q.waitMinutes} mins</div>
          </div>
        )} emptyMessage="No one in the queue" />}
      </section>
    </div>
  )
}
