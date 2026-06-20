import React from 'react'

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeeklyForecast({weatherResult, selectedCity}){
  const daily = weatherResult?.live?.raw?.daily
  const dates = daily?.time || []
  const highs = daily?.temperature_2m_max || []
  const lows = daily?.temperature_2m_min || []
  const codes = daily?.weathercode || []
  const forecast = dates.length
    ? dates.slice(0, 7).map((date, index) => {
        const dayIndex = new Date(`${date}T00:00:00Z`).getUTCDay()
        return {
          day: dayLabels[dayIndex],
          high: highs[index],
          low: lows[index],
          code: codes[index],
        }
      })
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
        day,
        high: 25 + (index % 3),
        low: 15 + (index % 2),
      }))

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold">Weekly Forecast</h3>
        {selectedCity && <div className="text-sm text-slate-300">{selectedCity}</div>}
      </div>
      <div className="space-y-2">
        {forecast.map((item, index)=>(
          <div key={item.day || index} className="flex justify-between text-sm">
            <div>{item.day}</div>
            <div>High {Math.round(item.high ?? 0)}° • Low {Math.round(item.low ?? 0)}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}
