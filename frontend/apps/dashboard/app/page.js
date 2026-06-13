import React from 'react'

export default function Page() {
  return (
    <main style={{fontFamily: 'Arial, sans-serif', padding: 24}}>
      <h1>Admin Dashboard</h1>
      <p>Welcome — the dashboard is running locally.</p>
      <p>API URL: <code>{process.env.NEXT_PUBLIC_API_URL || 'not set'}</code></p>
    </main>
  )
}
