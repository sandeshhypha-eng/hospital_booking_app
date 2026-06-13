import React, { useEffect, useState } from 'react'
import { fetchJson } from '../../../../../lib/api'
import { uploadFile } from '../../../../../lib/uploader'

export default function FilesPage({ params }: { params: { id: string } }){
  const [files,setFiles]=useState<any[]>([])
  useEffect(()=>{ fetchJson(`/api/users/${params.id}/files`).then(r=>setFiles(r)).catch(()=>{}) },[params.id])
  async function onFile(e: React.ChangeEvent<HTMLInputElement>){
    if (!e.target.files?.[0]) return
    await uploadFile(e.target.files[0], params.id)
    alert('Uploaded')
  }
  return (
    <div>
      <h1 className="text-2xl mb-4">Files</h1>
      <input type="file" onChange={onFile} />
      <ul className="mt-3 space-y-2">{files.map(f=> <li key={f.fileId} className="p-2 border rounded">{f.url}</li>)}</ul>
    </div>
  )
}
