import './globals.css'
import React from 'react'

export const metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Patient Portal'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="max-w-5xl mx-auto p-4">
          <header aria-hidden className="sr-only" />
          <main id="main" role="main">{children}</main>
        </div>
      </body>
    </html>
  )
}
