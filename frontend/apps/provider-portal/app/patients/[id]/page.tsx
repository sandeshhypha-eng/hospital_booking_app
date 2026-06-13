import React, { useEffect, useState } from 'react'
import { fetchJson } from '../../../../lib/api'

export default function PatientPage({ params }: { params: { id: string } }){
  const [profile,setProfile] = useState<any>(null)
  useEffect(()=>{ fetchJson(`/api/users/${params.id}`).then(r=>setProfile(r)).catch(()=>{}) },[params.id])
  return (
    <div>
      <h1 className="text-2xl mb-4">{profile?.name || 'Patient'}</h1>
      <div className="p-3 border rounded">{profile?.phone}</div>
    </div>
  )
}
