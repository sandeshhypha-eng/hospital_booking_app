"use client"
import React from 'react'

const menu = [
  'Dashboard','Services','Book Appointment','My Bookings','Live Queue','Documents','Payments','Records','Notifications','Support Tickets','Profile','Family Members'
]

export default function Sidebar(){
  return (
    <div className="h-full p-6 bg-white border-r">
      <div className="mb-6">
        <div className="text-2xl font-bold">CX PORTAL</div>
        <div className="text-sm text-gray-500">Customer Experience</div>
      </div>
      <nav className="space-y-1">
        {menu.map(item=> (
          <a key={item} className={`block px-3 py-2 rounded-lg ${item==='Dashboard' ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>{item}</a>
        ))}
      </nav>
      <div className="mt-8 p-4 bg-emerald-50 rounded-lg">
        <div className="font-medium">Need Help?</div>
        <p className="text-sm text-gray-600">Customer Support</p>
        <button className="mt-3 w-full bg-emerald-600 text-white py-2 rounded">Contact Support</button>
      </div>
    </div>
  )
}
