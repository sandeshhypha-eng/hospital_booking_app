"use client"
import React from 'react'

export default function ServicesList({services}:{services:any[]}){
  return (
    <div className="rounded-[12px] bg-white p-4 shadow-sm">
      <h3 className="font-medium">Services You Use</h3>
      <ul className="mt-3 space-y-2">
        {services.map(s=> (
          <li key={s.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-gray-500">{s.count} bookings</div>
            </div>
            <div className="text-sm text-gray-500">{s.next}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
