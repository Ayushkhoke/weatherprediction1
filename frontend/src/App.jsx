import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Prediction from './pages/Prediction'
import Analytics from './pages/Analytics'
import Nav from './components/Nav'

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <Nav />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/predict" element={<Prediction/>} />
            <Route path="/analytics" element={<Analytics/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
