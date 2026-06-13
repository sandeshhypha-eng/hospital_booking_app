"use client"
import React, { useEffect, useState } from 'react'
import { fetchJson } from '../../lib/api'

export default function Patients(){
  const [list,setList]=useState<any[]>([])
  useEffect(()=>{ fetchJson('/api/users?role=patient').then(r=>setList(r)).catch(()=>{}) },[])
  return (
    <div>
      <h1 className="text-2xl mb-4">Patients</h1>
      <ul className="space-y-2">
        {list.map(p=> <li key={p.id} className="p-3 border rounded">{p.name} — {p.phone}</li>)}
      </ul>
    </div>
  )
}
