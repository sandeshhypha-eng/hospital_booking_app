import React, { useEffect, useState } from 'react'
import { useQueueStore } from '../../lib/store'
import { useSocket } from '../../lib/socket'

export default function QueuePage(){
  const { queue, setQueue } = useQueueStore()
  useSocket(setQueue)

  return (
    <div className="flex gap-4">
      <div className="w-1/3">
        <h2 className="text-lg font-semibold">Actions</h2>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">Live Queue</h2>
        <div className="grid grid-cols-4 gap-2 mt-4">
          {queue.map(q=> (
            <div key={q.id} className="p-4 border rounded text-center">
              <div className="text-2xl font-bold">{q.tokenNumber}</div>
              <div className="text-sm">{q.patientName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
