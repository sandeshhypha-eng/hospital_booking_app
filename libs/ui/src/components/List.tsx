"use client"
import React from 'react'

export function List<T>({items, renderItem, emptyMessage='No items'}:{items:T[], renderItem:(item:T, idx:number)=>React.ReactNode, emptyMessage?:string}){
  if (!items || items.length === 0) return <div className="text-gray-500">{emptyMessage}</div>
  return (
    <ul className="space-y-2">
      {items.map((it, idx) => (
        <li key={idx} className="p-3 border rounded bg-white">{renderItem(it, idx)}</li>
      ))}
    </ul>
  )
}

export default List
