"use client"
import { useEffect, useState } from 'react'
import { getSlots } from '../api'
import type { Slot } from '../types'

export function useSlots(doctorId: string, date: string) {
  const [data, setData] = useState<Slot[] | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    if (!doctorId || !date) { setData([]); setLoading(false); return }
    let mounted = true
    setLoading(true)
    getSlots(doctorId, date).then((res)=> { if (mounted) setData(res) }).catch(()=>{}).finally(()=> mounted && setLoading(false))
    return ()=>{ mounted = false }
  },[doctorId,date])
  return { data, loading }
}
