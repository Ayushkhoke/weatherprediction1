import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing(){
  return (
    <div className="max-w-4xl mx-auto py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">AI Weather Prediction</h1>
      <p className="mb-8 text-slate-300">Futuristic, accurate, and interactive weather forecasts powered by Random Forest models.</p>
      <div className="space-x-4">
        <Link to="/dashboard" className="btn">Open Dashboard</Link>
        <Link to="/predict" className="btn btn-outline">AI Prediction Center</Link>
      </div>
    </div>
  )
}
