export function createSocket(onMessage: (data: any)=>void){
  const url = (process.env.NEXT_PUBLIC_WS_URL || '').replace(/\/$/, '') + '/ws/queue'
  let ws: WebSocket | null = null
  let reconnect = 1000
  function connect(){
    ws = new WebSocket(url)
    ws.onopen = ()=> { reconnect = 1000 }
    ws.onmessage = e=> { try { onMessage(JSON.parse(e.data)) } catch(_){} }
    ws.onclose = ()=> setTimeout(connect, reconnect)
  }
  connect()
  return () => { if (ws) ws.close() }
}

export function useSocket(setQueue: (q:any[])=>void){
  // client-side only
  if (typeof window === 'undefined') return
  createSocket((msg)=>{ if (msg.type === 'queue.update') setQueue(msg.payload) })
}
