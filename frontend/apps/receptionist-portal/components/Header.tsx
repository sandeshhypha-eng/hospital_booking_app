"use client"
import React from 'react'
import { HomeIcon } from '../../../../libs/ui/src/icons'

export default function Header(){
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded bg-brand text-white flex items-center justify-center">RP</div>
        <div>
          <div className="font-semibold">Receptionist Portal</div>
          <div className="text-sm text-gray-500">Manage check-ins and queue</div>
        </div>
      </div>
      <nav>
        <a href="/" className="text-sm text-brand hover:underline flex items-center gap-2"><HomeIcon className="h-4 w-4" /> Home</a>
      </nav>
    </header>
  )
}
