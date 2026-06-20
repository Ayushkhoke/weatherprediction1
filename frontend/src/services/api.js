import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
})

export async function searchWeather({lat, lon, city}){
  const payload = { city, lat, lon }
  const res = await api.post('/api/weather/search', payload)
  return res.data
}
