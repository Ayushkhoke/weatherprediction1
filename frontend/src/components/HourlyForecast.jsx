import React from 'react'

export default function HourlyForecast({weatherResult}){
  const hourly = weatherResult?.live?.raw?.hourly
  const times = hourly?.time || []
  const temperatures = hourly?.temperature_2m || []
  const weather = hourly?.weathercode || []
  const startIndex = Math.max(0, times.findIndex((time) => time === weatherResult?.live?.raw?.current_weather?.time))
  const forecast = times.length
    ? times.slice(startIndex, startIndex + 8).map((time, index) => ({
        time,
        temp: temperatures[startIndex + index],
        code: weather[startIndex + index],
      }))
    : [...Array(12)].map((_, i) => ({ time: `${i + 1}h`, temp: 20 + (i % 3), code: i % 2 ? 'Rain' : 'Clear' }))

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md">
      <h3 className="text-lg font-semibold mb-3">Hourly Forecast</h3>
      <div className="flex gap-4 overflow-x-auto">
        {forecast.map((item, index)=> (
          <div key={item.time || index} className="min-w-[80px] text-center">
            <div className="font-medium">{item.time?.slice(11, 16) || `${index + 1}h`}</div>
            <div className="text-2xl">{Math.round(item.temp ?? 0)}°</div>
            <div className="text-sm text-slate-400">{typeof item.code === 'number' ? 'Forecast' : item.code}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
