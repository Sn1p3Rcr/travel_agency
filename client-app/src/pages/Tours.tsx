import React, { useState, useMemo } from 'react'
import tours from '../data/tours.json'
import TourCard from '../components/TourCard'

type SortBy = 'rating' | 'price' | 'popularity'

interface FiltersState {
  type: string
  country: string
}

type FilterKey = keyof FiltersState

const isSortBy = (value: string): value is SortBy =>
  value === 'price' || value === 'rating' || value === 'popularity'

const Tours = (): JSX.Element => {
  const [filters, setFilters] = useState<FiltersState>({
    type: '',
    country: ''
  })

  const [sortBy, setSortBy] = useState<SortBy>('price')
  const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false)
  const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false)

  const tagOptions = useMemo<string[]>(
    () => Array.from(new Set(tours.flatMap(t => t.tags))).sort(),
    []
  )

  const countryOptions = useMemo<string[]>(
    () => Array.from(new Set(tours.map(t => t.country))).sort(),
    []
  )

  const filteredAndSortedTours = useMemo(() => {
    const filtered = tours.filter(t => {
      if (filters.type && !t.tags.includes(filters.type)) return false
      if (filters.country && t.country !== filters.country) return false
      return true
    })

    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0)
      return 0
    })

    return filtered
  }, [filters, sortBy])

  const handleFilterChange = (key: FilterKey, value: string): void => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (key === 'type') setIsTypeOpen(false)
    if (key === 'country') setIsCountryOpen(false)
  }

  return (
    <div>
      <h2>Каталог туров</h2>

      <div style={{ marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', minWidth: 180, background: '#fff', textAlign: 'left' }}
            onClick={() => { setIsTypeOpen(prev => !prev); setIsCountryOpen(false) }}
          >
            {filters.type || 'Тип тура'}
          </button>

          {isTypeOpen && (
            <div style={{ position: 'absolute', zIndex: 2, marginTop: 4, background: '#fff', border: '1px solid #ddd', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', maxHeight: 150, overflowY: 'auto', minWidth: 180 }}>
              <div
                onClick={() => handleFilterChange('type', '')}
                style={{ padding: '8px 12px', cursor: 'pointer', color: '#555', borderBottom: '1px solid #f0f0f0' }}
              >
                Все типы
              </div>

              {tagOptions.map(tag => (
                <div
                  key={tag}
                  onClick={() => handleFilterChange('type', tag)}
                  style={{ padding: '8px 12px', cursor: 'pointer' }}
                >
                  {tag}
                </div>
              ))}

              {tagOptions.length === 0 && <div style={{ padding: '8px 12px', color: '#777' }}>Нет тегов</div>}
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <button
            type="button"
            style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', minWidth: 180, background: '#fff', textAlign: 'left' }}
            onClick={() => { setIsCountryOpen(prev => !prev); setIsTypeOpen(false) }}
          >
            {filters.country || 'Страна'}
          </button>

          {isCountryOpen && (
            <div style={{ position: 'absolute', zIndex: 2, marginTop: 4, background: '#fff', border: '1px solid #ddd', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', maxHeight: 150, overflowY: 'auto', minWidth: 180 }}>
              <div
                onClick={() => handleFilterChange('country', '')}
                style={{ padding: '8px 12px', cursor: 'pointer', color: '#555', borderBottom: '1px solid #f0f0f0' }}
              >
                Все страны
              </div>

              {countryOptions.map(country => (
                <div
                  key={country}
                  onClick={() => handleFilterChange('country', country)}
                  style={{ padding: '8px 12px', cursor: 'pointer' }}
                >
                  {country}
                </div>
              ))}

              {countryOptions.length === 0 && <div style={{ padding: '8px 12px', color: '#777' }}>Нет стран</div>}
            </div>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => {
            const value = e.target.value
            if (isSortBy(value)) setSortBy(value)
          }}
        >
          <option value="price">По цене</option>
          <option value="rating">По рейтингу</option>
          <option value="popularity">По популярности</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {filteredAndSortedTours.map((t) => (
          <TourCard
            key={t.id}
            id={t.id}
            title={t.title}
            short={t.short}
            price={t.price}
            rating={t.rating}
            popularity={t.popularity}
            country={t.country}
            maxPeople={t.maxPeople}
            durationMin={t.durationMin}
            durationMax={t.durationMax}
            startDate={t.startDate}
            endDate={t.endDate}
            photos={t.photos}
            tags={t.tags}
          />
        ))}
      </div>
    </div>
  )
}

export default Tours
