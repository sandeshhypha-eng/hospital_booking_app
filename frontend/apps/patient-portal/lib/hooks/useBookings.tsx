"use client"
import { useEffect, useState } from 'react'
import { getBookings } from '../api'
import type { Booking } from '../types'

export function useBookings(patientId?: string, status?: string) {
  const [data, setData] = useState<Booking[] | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted = true
    setLoading(true)
    getBookings(patientId, status).then((res)=> { if (mounted) setData(res) }).catch(()=>{}).finally(()=> mounted && setLoading(false))
    return ()=>{ mounted = false }
  },[patientId,status])
  return { data, loading }
}
