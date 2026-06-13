"use client"
import React from 'react'
import { ProfileIcon } from '../../../../libs/ui/src/icons'

export default function Header(){
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-brand text-white flex items-center justify-center">PV</div>
        <div>
          <div className="font-semibold">Provider Portal</div>
          <div className="text-sm text-gray-500">Clinician schedule and queue</div>
        </div>
      </div>
      <nav>
        <a href="/" className="text-sm text-brand hover:underline flex items-center gap-2"><ProfileIcon className="h-4 w-4" /> Profile</a>
      </nav>
    </header>
  )
}
