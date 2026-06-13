import './globals.css'
import React from 'react'
import Header from '../components/Header'

export const metadata = { title: 'Provider Portal' }

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}

