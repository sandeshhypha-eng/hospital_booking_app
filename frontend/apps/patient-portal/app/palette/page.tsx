import React from 'react'

const colors = [
  { name: 'brand', varName: '--color-brand' },
  { name: 'brand50', varName: '--color-brand-50' },
  { name: 'accent', varName: '--color-accent' },
  { name: 'surface', varName: '--color-surface' },
  { name: 'muted', varName: '--color-muted' },
]

export default function Palette() {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-semibold">Brand Palette</h1>
      <p className="text-gray-600 mt-2">CSS variables and sample swatches used across portals.</p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {colors.map(c => (
          <div key={c.name} className="flex items-center gap-4 p-4 border rounded">
            <div style={{ background: `var(${c.varName})` }} className="w-20 h-12 rounded" />
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-500">var({c.varName})</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
