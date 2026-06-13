"use client"
import React, {useEffect, useState} from 'react'

export default function ProfilePage(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch('http://localhost:3000/api/users/me')
        if(res.ok){
          const d = await res.json()
          setName(d.name || '')
          setEmail(d.email || '')
        }
      }catch(e){}
    }
    load()
  },[])

  async function save(e:React.FormEvent){
    e.preventDefault()
    try{
      await fetch('http://localhost:3000/api/users/me',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({name,email})})
      alert('Saved')
    }catch(e){alert('Save failed')}
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Profile</h2>
      <form onSubmit={save} className="space-y-3" aria-label="Profile form">
        <div>
          <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700">Name</label>
          <input id="profile-name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 border rounded mt-1" />
        </div>
        <div>
          <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700">Email</label>
          <input id="profile-email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 border rounded mt-1" />
        </div>
        <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded focus-visible:ring-2 focus-visible:ring-emerald-300">Save</button>
      </form>
    </div>
  )
}
