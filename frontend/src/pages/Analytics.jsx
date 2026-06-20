import React from 'react'
import WeatherTrendsChart from '../components/WeatherTrendsChart'

export default function Analytics(){
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <WeatherTrendsChart full />
    </div>
  )
}
