import React, {useState} from 'react'
import { searchWeather } from '../services/api'

export default function AIPredictionCard({large=false, onResult, onCityChange}){
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSearch(e){
    e && e.preventDefault()
    setError(null)
    setLoading(true)
    try{
      // if user provided city but no geolocation, use Nominatim to geocode
      let lat=null, lon=null
      if (city){
        const nom = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`)
        const j = await nom.json()
        if (j && j.length>0){ lat = parseFloat(j[0].lat); lon = parseFloat(j[0].lon) }
      }
      if (lat==null || lon==null){
        setError('Provide a city name that can be geocoded or use Locate')
        setLoading(false)
        return
      }

      const resp = await searchWeather({city, lat, lon})
      setResult(resp)
      onResult?.(resp)
      onCityChange?.(city)
    }catch(err){
      console.error(err)
      setError(err.message || 'Request failed')
    }finally{ setLoading(false) }
  }

  async function handleLocate(){
    setError(null)
    if (!navigator.geolocation){ setError('Geolocation not available'); return }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(async(pos)=>{
      try{
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        const resp = await searchWeather({city: '', lat, lon})
        setResult(resp)
          onResult?.(resp)
          onCityChange?.('Current Location')
      }catch(err){ setError(err.message || 'Failed') }
      setLoading(false)
    },(err)=>{ setError(err.message||'Permission denied'); setLoading(false) })
  }

  return (
    <div className={"p-6 rounded-2xl bg-white/6 backdrop-blur-md "+(large? 'w-full':'') }>
      <h3 className="text-lg font-semibold">AI Prediction</h3>
      <form onSubmit={handleSearch} className="mt-3 flex gap-2">
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City name" className="flex-1 p-2 rounded bg-white/6" />
        <button className="px-3 py-1 bg-sky-500 rounded" disabled={loading}>{loading? '...' : 'Search'}</button>
        <button type="button" onClick={handleLocate} className="px-3 py-1 bg-slate-600 rounded">Locate</button>
      </form>

      {error && <div className="mt-3 text-red-400">{error}</div>}

      {result && (
        <div className="mt-4">
          <div className="text-3xl">Temp next hour: {result.predictions?.temp_next_hour ?? 'N/A'}°</div>
          <div className="text-sm text-slate-400">Confidence: {result.predictions?.confidence ?? 'N/A'}</div>
          <div className="mt-2 text-sm text-slate-300">Insight: {result.predictions?.explanation ?? ''}</div>
        </div>
      )}
    </div>
  )
}
