"use client"
import React, { useState } from 'react'
import { createBooking } from '../../../lib/api'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ConfirmPage() {
  const params = useSearchParams()
  const doctor = params.get('doctor') || ''
  const slot = params.get('slot') || ''
  const date = params.get('date') || ''
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function confirm() {
    setLoading(true)
    try {
      await createBooking({ doctorId: doctor, slotId: slot, notes })
      router.push('/dashboard')
    } catch (err) { alert('Booking failed') }
    finally { setLoading(false) }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Confirm Booking</h1>
      <div className="p-4 border rounded space-y-3">
        <div><b>Doctor:</b> {doctor}</div>
        <div><b>Date:</b> {date}</div>
        <div><b>Slot:</b> {slot}</div>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" className="w-full p-2 border rounded" />
        <button disabled={loading} onClick={confirm} className="bg-green-600 text-white px-4 py-2 rounded">{loading? 'Booking...':'Confirm'}</button>
      </div>
    </div>
  )
}
