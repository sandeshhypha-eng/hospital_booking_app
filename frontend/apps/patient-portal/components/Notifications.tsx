"use client"
import React from 'react'

export default function Notifications({items}:{items:{id:string,title:string,body:string,time:string}[]}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm w-72" aria-live="polite" aria-label="Notifications">
      <h4 className="m-0 mb-3">Notifications</h4>
      <ul className="space-y-2" role="list">
        {items.map(n=> (
          <li key={n.id} className="pt-2 border-t border-gray-100" role="listitem">
            <div className="font-semibold">{n.title}</div>
            <div className="text-sm text-gray-500">{n.body}</div>
            <div className="text-xs text-gray-400 mt-1">{n.time}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
