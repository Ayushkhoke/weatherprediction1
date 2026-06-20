import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Nav(){
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-bold text-xl">AI Weather</Link>
        <Link to="/dashboard" className="text-sm text-slate-300">Dashboard</Link>
        <Link to="/predict" className="text-sm text-slate-300">AI Predict</Link>
        <Link to="/analytics" className="text-sm text-slate-300">Analytics</Link>
      </div>
      <div className="flex items-center space-x-3">
        <ThemeToggle />
      </div>
    </nav>
  )
}
