"use client"
import React from 'react'

export function Icon({children, className='h-6 w-6'}:{children:React.ReactNode,className?:string}){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {children}
    </svg>
  )
}

export function HomeIcon({className='h-6 w-6'}:{className?:string}){
  return (
    <Icon className={className}>
      <path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21V12h14v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function BookingIcon({className='h-6 w-6'}:{className?:string}){
  return (
    <Icon className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 3v4M8 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function QueueIcon({className='h-6 w-6'}:{className?:string}){
  return (
    <Icon className={className}>
      <path d="M3 7h18M7 12h10M10 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export function PaymentIcon({className='h-6 w-6'}:{className?:string}){
  return (
    <Icon className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  )
}

export function ProfileIcon({className='h-6 w-6'}:{className?:string}){
  return (
    <Icon className={className}>
      <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  )
}

export default { HomeIcon, BookingIcon, QueueIcon, PaymentIcon, ProfileIcon }
