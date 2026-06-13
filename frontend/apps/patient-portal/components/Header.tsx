"use client"
import React from 'react'
import { Search, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-gray-200 rounded-md" role="banner" aria-label="Main header">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-brand text-white flex items-center justify-center font-bold" aria-hidden>CP</div>
        <div>
          <div className="text-lg font-semibold">CX Portal</div>
          <div className="text-sm text-gray-500">Welcome back</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor="site-search" className="sr-only">Search site</label>
        <input id="site-search" aria-label="Search bookings, payments and tickets" placeholder="Search bookings, payments, tickets..." className="px-3 py-2 rounded-lg border border-gray-200 search-min focus-visible:ring-2 focus-visible:ring-emerald-300" />
        <button aria-label="Search" className="px-3 py-2 rounded-lg bg-brand text-white transition-transform transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200"> 
          <Search className="h-5 w-5" aria-hidden />
        </button>
        <button aria-label="Open profile" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-brand-200"> 
          <User className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </header>
  )
}
