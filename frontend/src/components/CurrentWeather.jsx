import React from 'react'

function weatherLabel(code){
  const labels = {
    0: 'Clear',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    61: 'Rain',
    63: 'Rain',
    65: 'Heavy Rain',
    80: 'Rain Showers',
    95: 'Thunderstorm',
  }
  return labels[code] || 'Partly Cloudy'
}

function getHourlyValue(hourly, key, time){
  const times = hourly?.time || []
  const values = hourly?.[key] || []
  const index = times.indexOf(time)
  return index >= 0 ? values[index] : values[0]
}

export default function CurrentWeather({weatherResult, selectedCity}){
  const current = weatherResult?.live?.raw?.current_weather
  const hourly = weatherResult?.live?.raw?.hourly
  const temp = current?.temperature ?? 22
  const wind = current?.windspeed ?? 5
  const code = current?.weathercode
  const time = current?.time
  const humidity = getHourlyValue(hourly, 'relativehumidity_2m', time) ?? 56
  const pressure = getHourlyValue(hourly, 'pressure_msl', time) ?? 1012
  const cloudcover = getHourlyValue(hourly, 'cloudcover', time) ?? 40

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Current Weather</h3>
        {selectedCity && <div className="text-sm text-slate-300">{selectedCity}</div>}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <div className="text-6xl">{Math.round(temp)}°C</div>
          <div className="text-sm text-slate-400">{weatherLabel(code)}</div>
        </div>
        <div className="text-sm text-slate-300">
          <div>Humidity: {Math.round(humidity)}%</div>
          <div>Pressure: {Math.round(pressure)} hPa</div>
          <div>Wind: {Math.round(wind)} m/s</div>
          <div>Cloud: {Math.round(cloudcover)}%</div>
        </div>
      </div>
    </div>
  )
}
