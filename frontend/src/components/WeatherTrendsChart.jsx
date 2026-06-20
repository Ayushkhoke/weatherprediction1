import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'

Chart.register(LineElement, PointElement, LinearScale, CategoryScale)

export default function WeatherTrendsChart({full=false, weatherResult}){
  const hourly = weatherResult?.live?.raw?.hourly
  const labels = hourly?.time?.slice(0, 24)?.map((time) => time.slice(11, 16))
  const temperatures = hourly?.temperature_2m?.slice(0, 24)

  const data = {
    labels: labels || Array.from({length:24},(_,i)=>i+1+'h'),
    datasets: [{
      label: 'Temperature',
      data: temperatures || Array.from({length:24},()=>20+Math.random()*8),
      borderColor: '#60A5FA',
      fill: false,
    }]
  }

  return (
    <div className={"p-6 rounded-2xl bg-white/5 backdrop-blur-md "+(full? 'w-full':'') }>
      <h3 className="text-lg font-semibold mb-3">Weather Trends</h3>
      <Line data={data} />
    </div>
  )
}
