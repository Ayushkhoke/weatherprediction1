import React from 'react'
import AIPredictionCard from '../components/AIPredictionCard'

export default function Prediction(){
  return (
    <div className="max-w-4xl mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-4">AI Prediction Center</h2>
      <AIPredictionCard large />
    </div>
  )
}
