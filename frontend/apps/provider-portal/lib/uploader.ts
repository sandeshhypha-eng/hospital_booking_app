export async function uploadFile(file: File, patientId: string, onProgress?: (p:number)=>void) {
  const url = (process.env.NEXT_PUBLIC_API_URL || '') + '/api/files/upload'
  const form = new FormData()
  form.append('file', file)
  form.append('patientId', patientId)
  const res = await fetch(url, { method: 'POST', body: form, credentials: 'include' })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}
