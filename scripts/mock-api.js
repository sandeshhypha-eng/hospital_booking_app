// Simple mock API for local UI testing
// Run: npm run mock-install && npm run mock-api
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { WebSocketServer } = require('ws')

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000

// In-memory stores
let users = [ { id: 'p1', name: 'Alice', phone: '9991112222', role: 'patient', email: 'alice@example.com' } ]
let bookings = []
let slots = [ { id: 's1', time: '09:00', available: true }, { id: 's2', time: '10:00', available: true } ]
let notifications = []
let nextBookingId = 1
let nextToken = 1

// Helpers
function ok(res, data){ return res.json(data) }

// Auth
app.post('/api/auth/login', (req,res) => {
  // Accept any identifier for mock
  const { identifier, username, password } = req.body || {}
  const user = users[0]
  const token = 'mock-token-' + Date.now()
  const refresh = 'mock-refresh-' + Date.now()
  // set httpOnly refresh cookie
  res.cookie('refreshToken', refresh, { httpOnly: true })
  return ok(res, { token, refreshToken: refresh, user })
})

app.post('/api/auth/register', (req,res) => {
  const { name, email, phone } = req.body || {}
  const id = 'p' + (users.length+1)
  const user = { id, name, email, phone, role: 'patient' }
  users.push(user)
  const token = 'mock-token-' + Date.now()
  res.cookie('refreshToken', 'mock-refresh', { httpOnly: true })
  return ok(res, { token, user })
})

app.post('/api/auth/refresh', (req,res)=>{
  // Always refresh
  const token = 'mock-token-' + Date.now()
  return ok(res, { token })
})

// Bookings
app.get('/api/bookings', (req,res)=>{
  const { patientId, status } = req.query
  let list = bookings
  if (patientId) list = list.filter(b=>b.patientId==patientId)
  if (status) list = list.filter(b=>b.status==status)
  return ok(res, list)
})

app.get('/api/bookings/today', (req,res)=>{
  // return summary and list
  const today = bookings.filter(b=>b.date===new Date().toISOString().slice(0,10))
  const total = today.length
  const checkedIn = today.filter(b=>b.status==='CheckedIn').length
  const waiting = today.filter(b=>b.status==='Pending').length
  return ok(res, { total, checkedIn, waiting, list: today })
})

app.post('/api/bookings', (req,res)=>{
  const { doctorId, slotId, notes, patientPhone, patientName } = req.body || {}
  const id = 'b' + (nextBookingId++)
  const patientId = (patientPhone && users.find(u=>u.phone===patientPhone)) ? users.find(u=>u.phone===patientPhone).id : ('p' + (users.length+1))
  if (!users.find(u=>u.id===patientId)) users.push({ id: patientId, name: patientName || 'Walk-in', phone: patientPhone, role: 'patient' })
  const booking = { id, patientId, patientName: patientName||'Walk-in', doctorId, slotId, notes, date: new Date().toISOString().slice(0,10), slot: slotId, status: 'Pending' }
  bookings.push(booking)
  return ok(res, booking)
})

app.delete('/api/bookings/:id', (req,res)=>{
  const id = req.params.id
  bookings = bookings.filter(b=>b.id!==id)
  return ok(res, { ok: true })
})

app.patch('/api/bookings/:id/checkin', (req,res)=>{
  const id = req.params.id
  const b = bookings.find(x=>x.id===id)
  if (!b) return res.status(404).json({ error: 'not found' })
  b.status = 'CheckedIn'
  b.tokenNumber = String(nextToken++)
  // push to notifications
  notifications.push({ id: 'n'+Date.now(), channel: 'sms', body: `Checked in: ${b.patientName}`, date: new Date().toISOString() })
  // broadcast via ws
  broadcast({ type: 'queue.update', payload: bookings.filter(x=>x.date===new Date().toISOString().slice(0,10)).map(x=>({ id:x.id, tokenNumber: x.tokenNumber||'', patientName: x.patientName||'' })) })
  return ok(res, { tokenNumber: b.tokenNumber })
})

app.patch('/api/bookings/:id/call', (req,res)=>{
  const id = req.params.id
  const b = bookings.find(x=>x.id===id)
  if (!b) return res.status(404).json({ error: 'not found' })
  b.status = 'Called'
  return ok(res, b)
})

// Slots
app.get('/api/slots', (req,res)=>{ const { doctorId, date } = req.query; return ok(res, slots) })

// Users
app.get('/api/users/me', (req,res)=>{ return ok(res, users[0]) })
app.get('/api/users', (req,res)=>{ const { role, q } = req.query; let list = users; if (role) list = list.filter(u=>u.role===role); if (q) list = list.filter(u=>u.name.includes(q)||u.phone.includes(q)); return ok(res,list) })
app.get('/api/users/:id', (req,res)=>{ const u = users.find(x=>x.id===req.params.id); if (!u) return res.status(404).json({}); return ok(res,u) })
app.post('/api/users', (req,res)=>{ const { name, phone } = req.body; const id = 'p'+(users.length+1); const u = { id, name, phone, role: 'patient' }; users.push(u); return ok(res,u) })
app.patch('/api/users/:id', (req,res)=>{ const u = users.find(x=>x.id===req.params.id); if (!u) return res.status(404).json({}); Object.assign(u, req.body); return ok(res,u) })

// Notifications
app.get('/api/notifications', (req,res)=> ok(res, notifications) )

// Files
app.post('/api/files/upload', (req,res)=>{
  // For mock, accept multipart not implemented; return fake file
  return ok(res, { fileId: 'file'+Date.now(), url: 'https://via.placeholder.com/150' })
})

// Start server and ws
const server = app.listen(PORT, ()=> console.log('Mock API listening on', PORT))

const wss = new WebSocketServer({ server, path: '/ws/queue' })
function broadcast(msg){
  const s = JSON.stringify(msg)
  wss.clients.forEach(c=> { if (c.readyState===1) c.send(s) })
}

wss.on('connection', (ws)=>{
  console.log('WS connected')
  // send current queue
  ws.send(JSON.stringify({ type: 'queue.update', payload: bookings.filter(x=>x.date===new Date().toISOString().slice(0,10)).map(x=>({ id:x.id, tokenNumber: x.tokenNumber||'', patientName: x.patientName||'' })) }))
  ws.on('message', ()=>{})
})
