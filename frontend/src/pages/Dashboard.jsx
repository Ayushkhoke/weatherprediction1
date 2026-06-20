import React, { useState } from 'react'
import CurrentWeather from '../components/CurrentWeather'
import HourlyForecast from '../components/HourlyForecast'
import WeeklyForecast from '../components/WeeklyForecast'
import AIPredictionCard from '../components/AIPredictionCard'
import WeatherTrendsChart from '../components/WeatherTrendsChart'

export default function Dashboard(){
  const [weatherResult, setWeatherResult] = useState(null)
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2 space-y-6">
        <CurrentWeather weatherResult={weatherResult} selectedCity={selectedCity} />
        <HourlyForecast weatherResult={weatherResult} />
        <WeatherTrendsChart weatherResult={weatherResult} />
      </div>
      <aside className="space-y-6 text-black">
        <AIPredictionCard
          onResult={setWeatherResult}
          onCityChange={setSelectedCity}
        />
        <WeeklyForecast selectedCity={selectedCity} />
      </aside>
    </div>
  )
}
