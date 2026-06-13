"use client"
import React from 'react'

export default function NotificationsList({items}:{items:any[]}){
  return (
    <div className="rounded-[12px] bg-white p-4 shadow-sm">
      <h3 className="font-medium">Recent Notifications</h3>
      <ul className="mt-3 space-y-2">
        {items.map(n=> (
          <li key={n.id} className="flex items-start justify-between">
            <div>
              <div className="font-medium">{n.title}</div>
              <div className="text-sm text-gray-500">{n.time}</div>
            </div>
            <div className="text-sm text-gray-500">{n.subtitle}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
