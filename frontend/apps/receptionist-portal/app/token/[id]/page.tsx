import React from 'react'
import { useRouter } from 'next/navigation'

export default function TokenPage({ params }: { params: { id: string } }){
  const id = params.id
  return (
    <div className="text-center mt-12">
      <div className="text-6xl font-extrabold">{id}</div>
      <div className="mt-4">Token Number</div>
      <div className="mt-6">
        <button onClick={()=>window.print()} className="bg-blue-600 text-white px-4 py-2 rounded">Print</button>
      </div>
    </div>
  )
}
