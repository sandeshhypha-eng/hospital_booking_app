"use client"
import React from 'react'

export default function BookingsTable({bookings}:{bookings:any[]}){
  return (
    <div className="rounded-[12px] bg-white p-4 shadow-sm">
      <h3 className="font-medium mb-3">My Bookings</h3>
      <div className="overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="pb-2">Booking ID</th>
              <th className="pb-2">Service</th>
              <th className="pb-2">Date & Time</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b,i)=> (
              <tr key={i} className="border-t">
                <td className="py-3 text-sm">{b.id}</td>
                <td className="py-3 text-sm">{b.service}</td>
                <td className="py-3 text-sm">{b.date}</td>
                <td className="py-3 text-sm"><span className={`px-2 py-1 rounded-full text-xs ${b.status==='Confirmed' ? 'bg-emerald-100 text-emerald-700' : b.status==='Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
