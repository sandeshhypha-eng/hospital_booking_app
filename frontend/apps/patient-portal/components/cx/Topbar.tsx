"use client"
import React from 'react'
import { Bell } from 'lucide-react'

export default function Topbar({userName}:{userName:string}){
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <div />
      <div className="flex items-center gap-4">
        <div className="relative">
          <button aria-label="Notifications" className="p-2 rounded hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" aria-hidden />
            <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full px-1">3</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">P</div>
          <div className="text-sm">
            <div className="font-medium">{userName}</div>
            <div className="text-xs text-gray-500">Priya Sharma</div>
          </div>
        </div>
      </div>
    </header>
  )
}
