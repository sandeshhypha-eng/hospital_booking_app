"use client"
import { useEffect, useState } from 'react'
import { getNotifications } from '../api'
import type { NotificationRecord } from '../types'

export function useNotifications(){
  const [data, setData] = useState<NotificationRecord[] | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted = true
    getNotifications().then(r=> { if (mounted) setData(r) }).catch(()=>{}).finally(()=> mounted && setLoading(false))
    return ()=>{ mounted=false }
  },[])
  return { data, loading }
}
