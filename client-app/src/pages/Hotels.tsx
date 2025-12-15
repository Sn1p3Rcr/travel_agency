import React, { useState, useMemo } from 'react'
import hotels from '../data/hotels.json'
import { Input } from 'ui-library'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const Hotels = (): JSX.Element => {
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  const countryOptions = useMemo(
    () => Array.from(new Set(hotels.map(h => h.country).filter(Boolean))).sort(),
    []
  )

  const filteredHotels = useMemo(() => {
    return hotels.filter(h => {
      const matchesText =
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.desc.toLowerCase().includes(search.toLowerCase())
      const matchesCountry = countryFilter ? h.country === countryFilter : true
      return matchesText && matchesCountry
    })
  }, [search, countryFilter])

  return (
    <div>
      <h2>Каталог отелей</h2>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Input value={search} onChange={setSearch} placeholder="Поиск по названию или описанию" />
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', minWidth: 180, background: '#fff', textAlign: 'left' }}
            onClick={() => setIsCountryOpen(prev => !prev)}
          >
            {countryFilter || 'Страна'}
          </button>
          {isCountryOpen && (
            <div style={{ position: 'absolute', zIndex: 2, marginTop: 4, background: '#fff', border: '1px solid #ddd', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', maxHeight: 150, overflowY: 'auto', minWidth: 180 }}>
              <div
                onClick={() => { setCountryFilter(''); setIsCountryOpen(false) }}
                style={{ padding: '8px 12px', cursor: 'pointer', color: '#555', borderBottom: '1px solid #f0f0f0' }}
              >
                Все страны
              </div>
              {countryOptions.map(country => (
                <div
                  key={country}
                  onClick={() => { setCountryFilter(country); setIsCountryOpen(false) }}
                  style={{ padding: '8px 12px', cursor: 'pointer' }}
                >
                  {country}
                </div>
              ))}
              {countryOptions.length === 0 && <div style={{ padding: '8px 12px', color: '#777' }}>Нет стран</div>}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {filteredHotels.map((h) => (
          <Link key={h.id} to={`/hotel/${h.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard
              id={h.id}
              name={h.name}
              desc={h.desc}
              rating={h.rating}
              popularity={h.popularity}
              country={h.country}
              price={h.price}
              maxPeople={h.maxPeople}
              durationMin={h.durationMin}
              durationMax={h.durationMax}
              startDate={h.startDate}
              endDate={h.endDate}
              image={h.photos[0]}
              buttonText="Узнать подробнее"
              layout="left"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
