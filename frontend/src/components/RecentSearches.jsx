import React from 'react'

export default function RecentSearches(){
  const items = ['New York','London','Tokyo']
  return (
    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md">
      <h4 className="font-semibold mb-2">Recent Searches</h4>
      <ul className="text-sm space-y-1">
        {items.map((i)=> <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}
