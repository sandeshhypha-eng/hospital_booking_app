"use client"
import { useEffect, useState } from 'react'
import { getProfile } from '../api'
import type { PatientProfile } from '../types'

export function useProfile(){
  const [data, setData] = useState<PatientProfile | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let mounted = true
    getProfile().then(r=> { if (mounted) setData(r) }).catch(()=>{}).finally(()=> mounted && setLoading(false))
    return ()=>{ mounted=false }
  },[])
  return { data, loading }
}
