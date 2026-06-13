"use client"
import React from 'react'

export default function TokenCard({token}:{token:any}){
  return (
    <div className="rounded-[12px] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Current Token (Live)</div>
          <div className="text-3xl font-bold mt-2">{token.code}</div>
          <div className="text-sm text-gray-500 mt-1">{token.service}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Branch</div>
          <div className="font-medium">{token.branch}</div>
          <div className="mt-4">
            <div className="text-sm">Position</div>
            <div className="font-semibold">{token.position}</div>
            <div className="text-sm text-gray-500">Est. {token.wait}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Status: <span className="text-emerald-700 font-medium">{token.status}</span></div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded">View Live Queue</button>
      </div>
    </div>
  )
}
