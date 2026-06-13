"use client"
import React from 'react'
import { useNotifications } from '../../lib/hooks/useNotifications'

export default function NotificationsPage(){
  const {data, loading} = useNotifications()
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      {loading ? <div className="skeleton h-32 rounded" /> : (
        <ul className="space-y-2">
          {data?.map(n=> (
            <li key={n.id} className="p-3 border rounded">
              <div className="text-sm text-gray-600">{n.channel} • {n.date}</div>
              <div>{n.body}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
