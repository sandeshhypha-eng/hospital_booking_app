"use client"
import React from 'react'

export function Schedule({slots}:{slots:{time:string, patient?:string, status?:string}[]}){
  return (
    <div className="space-y-2">
      {slots.map((s, i)=> (
        <div key={i} className="p-3 border rounded flex items-center justify-between bg-white">
          <div>
            <div className="font-medium">{s.time}</div>
            <div className="text-sm text-gray-500">{s.patient || 'Available'}</div>
          </div>
          <div className={`text-sm px-2 py-1 rounded ${s.status === 'checked-in' ? 'bg-emerald-100 text-emerald-700' : s.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
            {s.status || 'open'}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Schedule
