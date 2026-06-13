"use client"
import React from 'react'

import { Spinner } from './Spinner'

export function Button({children, className='', loading=false, ...rest}:{children:React.ReactNode,className?:string,loading?:boolean}& React.ButtonHTMLAttributes<HTMLButtonElement>){
  return (
    <button {...rest} disabled={loading || rest.disabled} className={`inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded hover:brightness-95 focus-visible:ring-2 focus-visible:ring-emerald-300 disabled:opacity-60 ${className}`}>
      {loading ? <Spinner className="h-4 w-4" /> : null}
      {children}
    </button>
  )
}

export default Button
