"use client"
import React from 'react'

export default function Illustration({className='w-full h-48'}:{className?:string}){
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#e6fffa" />
            <stop offset="100%" stopColor="#cffafe" />
          </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#g)" />
        <g transform="translate(80,60)">
          <rect x="0" y="40" width="220" height="140" rx="10" fill="#fff" stroke="#d1fae5" />
          <rect x="260" y="20" width="240" height="180" rx="10" fill="#fff" stroke="#d1fae5" />
          <circle cx="480" cy="300" r="60" fill="#fff" stroke="#d1fae5" />
        </g>
      </svg>
    </div>
  )
}
