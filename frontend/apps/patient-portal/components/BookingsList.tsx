"use client"
import React from 'react'

type Booking = {id:string,service:string,date:string,status:string}

export default function BookingsList({items}:{items:Booking[]}){
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="m-0 mb-3 text-lg font-semibold">My Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto" role="table" aria-label="My bookings">
          <caption className="sr-only">List of your bookings</caption>
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th scope="col" className="p-2">ID</th><th scope="col" className="p-2">Service</th><th scope="col" className="p-2">Date & Time</th><th scope="col" className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map(b=> (
              <tr key={b.id} className="border-t hover:bg-gray-50 focus-within:bg-gray-50" tabIndex={0}>
                <td className="p-3">{b.id}</td>
                <td className="p-3">{b.service}</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3"><span className="inline-block bg-cyan-50 text-cyan-700 px-3 py-1 rounded-md text-sm">{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
