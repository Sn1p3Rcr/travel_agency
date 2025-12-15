import React, { useState, useMemo } from 'react'
import { Card, Button } from 'ui-library'
import tours from '../data/tours.json'
import TourCard from '../components/TourCard'

interface Tour {
  id: number
  title: string
  short: string
  price: number
  rating: number
  popularity: number
  country: string
  maxPeople: number
  durationMin: number
  durationMax: number
  startDate: string
  endDate: string
  photos: string[]
  tags: string[]
}

interface SearchFormState {
  country: string
  departure: string
  durationFrom: string
  durationTo: string
  peopleCount: string
}

type SearchFormKey = keyof SearchFormState

const Home = (): JSX.Element => {
  const [searchForm, setSearchForm] = useState<SearchFormState>({
    country: '',
    departure: '',
    durationFrom: '',
    durationTo: '',
    peopleCount: ''
  })

  const [searchResults, setSearchResults] = useState<Tour[]>([])

  const handleChange = (key: SearchFormKey, value: string): void => {
    let newValue = value

    if (key === 'durationFrom' || key === 'durationTo') {
      const numValue = Number.parseInt(value, 10) || 1

      if (key === 'durationFrom' && numValue > Number.parseInt(searchForm.durationTo || '999', 10)) {
        newValue = searchForm.durationTo || '1'
      } else if (key === 'durationTo' && numValue < Number.parseInt(searchForm.durationFrom || '1', 10)) {
        newValue = searchForm.durationFrom || '1'
      } else {
        newValue = numValue.toString()
      }
    }

    setSearchForm((prev) => ({ ...prev, [key]: newValue }))
  }

  const handleSearch = (): void => {
    const typedTours = tours as Tour[]

    const filtered: Tour[] = typedTours.filter((t) => {
      if (searchForm.country && t.country !== searchForm.country) return false
      if (searchForm.peopleCount && Number.parseInt(searchForm.peopleCount, 10) > t.maxPeople) return false

      const searchFrom = searchForm.durationFrom ? Number.parseInt(searchForm.durationFrom, 10) : null
      const searchTo = searchForm.durationTo ? Number.parseInt(searchForm.durationTo, 10) : null

      if (searchFrom !== null && searchTo !== null) {
        if (!(t.durationMin <= searchFrom && t.durationMax >= searchTo)) return false
      } else if (searchFrom !== null) {
        if (t.durationMin > searchFrom) return false
      } else if (searchTo !== null) {
        if (t.durationMax < searchTo) return false
      }

      return true
    })

    setSearchResults(filtered)
  }

  const displayedTours = useMemo<Tour[]>(() => {
    const typedTours = tours as Tour[]
    return searchResults.length > 0 ? searchResults : typedTours.slice(0, 2)
  }, [searchResults])

  return (
    <div>
      <section className="banner">
        <h1>Лучшие туры по России!</h1>
        <p>Выберите тур вашей мечты</p>

        <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <select
            value={searchForm.country}
            onChange={(e) => handleChange('country', e.target.value)}
            style={{ padding: '8px', borderRadius: 6 }}
          >
            <option value="">Выберите страну</option>
            <option value="Россия">Россия</option>
            <option value="Египет">Египет</option>
          </select>

          <input
            type="date"
            value={searchForm.departure}
            onChange={(e) => handleChange('departure', e.target.value)}
            placeholder="Период вылета"
            style={{ padding: '8px', borderRadius: 6 }}
          />

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              value={searchForm.durationFrom}
              onChange={(e) => handleChange('durationFrom', e.target.value)}
              placeholder="От (дни)"
              style={{ padding: '8px', borderRadius: 6, width: 80 }}
            />

            <input
              type="number"
              min="1"
              value={searchForm.durationTo}
              onChange={(e) => handleChange('durationTo', e.target.value)}
              placeholder="До (дни)"
              style={{ padding: '8px', borderRadius: 6, width: 80 }}
            />
          </div>

          <input
            type="number"
            min="1"
            value={searchForm.peopleCount}
            onChange={(e) => handleChange('peopleCount', e.target.value)}
            placeholder="Количество людей"
            style={{ padding: '8px', borderRadius: 6 }}
          />

          <Button onClick={handleSearch}>Поиск</Button>
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>{searchResults.length > 0 ? 'Результаты поиска' : 'Лучшие туры по России'}</h2>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {displayedTours.map((t) => (
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
              layout="bottom"
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Акции</h2>
        <Card title="Летняя распродажа">Скидки на семейные туры</Card>
      </section>
    </div>
  )
}

export default Home
