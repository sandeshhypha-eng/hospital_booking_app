import React from 'react'
import { fetchJson } from '../../lib/api'
import { useEffect, useState } from 'react'

export default function Profile(){
  const [p,setP]=useState<any>(null)
  useEffect(()=>{ fetchJson('/api/users/me').then(r=>setP).catch(()=>{}) },[])
  return (
    <div>
      <h1 className="text-2xl mb-4">My Profile</h1>
      <div className="p-3 border rounded">{p?.name}</div>
    </div>
  )
}
