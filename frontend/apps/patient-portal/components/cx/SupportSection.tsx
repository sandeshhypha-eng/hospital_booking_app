"use client"
import React from 'react'

export default function SupportSection(){
  return (
    <div className="rounded-[12px] bg-white p-4 shadow-sm text-center">
      <h4 className="font-medium">Need Help?</h4>
      <p className="text-sm text-gray-500">Chat with our support or request a callback.</p>
      <div className="mt-3 flex gap-3 justify-center">
        <button className="px-3 py-2 bg-emerald-600 text-white rounded">Chat</button>
        <button className="px-3 py-2 border border-emerald-600 text-emerald-600 rounded">Request Call</button>
      </div>
    </div>
  )
}
