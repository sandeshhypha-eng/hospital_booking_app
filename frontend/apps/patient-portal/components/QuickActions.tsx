"use client"
import React from 'react'

export default function QuickActions(){
  const items = [
    {title:'Book a Service', desc:'Make a new booking'},
    {title:'My Bookings', desc:'View your bookings'},
    {title:'Track Queue', desc:'Check live queue'},
    {title:'Make a Payment', desc:'Pay invoices online'},
  ]

  return (
    <div className="flex gap-4 flex-wrap my-4" role="list" aria-label="Quick actions">
      {items.map((it)=> (
        <button key={it.title} role="listitem" aria-label={it.title} className="flex-1 min-w-[180px] p-4 bg-white rounded-lg shadow-sm text-left transition transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 flex items-center gap-3">
          <span className="p-2 bg-brand text-white rounded-md flex items-center justify-center"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 11.5L12 4l9 7.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
          <div>
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm text-gray-500 mt-1">{it.desc}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
