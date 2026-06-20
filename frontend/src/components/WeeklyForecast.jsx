import React from 'react'

export default function WeeklyForecast({selectedCity}){
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="text-lg font-semibold">Weekly Forecast</h3>
        {selectedCity && <div className="text-sm text-slate-300">{selectedCity}</div>}
      </div>
      <div className="space-y-2">
        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i)=>(
          <div key={i} className="flex justify-between text-sm">
            <div>{d}</div>
            <div>High {25+i%3}° • Low {15+i%2}°</div>
          </div>
        ))}
      </div>
    </div>
  )
}
