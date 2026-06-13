"use client"
import React from 'react'

export default function AppointmentCard({appointment}:{appointment:any}){
  return (
    <div className="rounded-[12px] bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-center bg-emerald-50 p-3 rounded">
          <div className="text-sm font-semibold">{appointment.day}</div>
          <div className="text-lg">{appointment.date}</div>
        </div>
        <div>
          <div className="font-medium">{appointment.service}</div>
          <div className="text-sm text-gray-500">{appointment.branch}</div>
          <div className="text-sm text-gray-600 mt-2">{appointment.time}</div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">Status: <span className="font-medium text-emerald-700">{appointment.status}</span></div>
        <button className="bg-white border border-emerald-600 text-emerald-600 px-3 py-1 rounded">View Booking</button>
      </div>
    </div>
  )
}
