"use client"
import React from 'react'

export default function MarketingCard(){
  return (
    <div className="rounded-[12px] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">Go Digital & Save Time</h3>
          <p className="text-sm text-gray-600 mt-2">Use online bookings and digital documents to reduce wait times and speed up service.</p>
          <div className="mt-4">
            <button className="bg-emerald-600 text-white px-4 py-2 rounded">Get Started</button>
          </div>
        </div>
        <div className="w-40 h-28 bg-emerald-50 rounded flex items-center justify-center text-emerald-600">Illustration</div>
      </div>
    </div>
  )
}
