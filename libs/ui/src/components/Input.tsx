"use client"
import React from 'react'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string }){
  const { label, className = '', error, ...rest } = props
  return (
    <label className="block">
      {label && <span className="text-sm text-gray-700 mb-1 block">{label}</span>}
      <input {...rest} className={`w-full px-3 py-2 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${error ? 'border-red-300' : ''} ${className}`} aria-invalid={!!error} />
      {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
    </label>
  )
}

export default Input
