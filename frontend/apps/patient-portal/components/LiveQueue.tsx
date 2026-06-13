"use client"
import React from 'react'

export default function LiveQueue({service='Passport Renewal', est='25 mins', ahead=12}:{service?:string,est?:string,ahead?:number}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex-1" role="region" aria-live="polite" aria-label="Live queue status">
      <h4 className="m-0 mb-2">Live Queue</h4>
      <div className="text-2xl font-bold text-emerald-600">{est}</div>
      <div className="text-sm text-gray-500 mt-2">{ahead} people ahead of you</div>
      <div className="mt-3"><a className="text-sm text-emerald-600" href="/queue">View full queue</a></div>
    </div>
  )
}
