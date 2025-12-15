import React from 'react'
import { useParams } from 'react-router-dom'
import tours from '../data/tours.json'
import RequestForm from '../components/RequestForm'

const TourInfo = (): JSX.Element => {
  const { id } = useParams()
  const tour = tours.find((t) => String(t.id) === id)

  if (!tour) return <div>Тур не найден</div>

  const reviews = tour.reviews ?? []
  const flights = tour.flights ?? []

  return (
    <div>
      <h2>{tour.title}</h2>
      <p><strong>Страна:</strong> {tour.country}</p>
      <p><strong>Максимум людей:</strong> {tour.maxPeople}</p>
      <p><strong>Длительность:</strong> {tour.durationMin}-{tour.durationMax} дней</p>
      <p><strong>Доступен:</strong> {tour.startDate} - {tour.endDate}</p>
      <p>{tour.full}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {tour.photos.map((p) => (
          <img key={p} src={p} alt="photo" style={{ width: 260, height: 180, objectFit: 'cover', borderRadius: 8 }} />
        ))}
      </div>
      <section style={{ marginTop: 16 }}>
        <h3>Отзывы</h3>
        {reviews.map((r) => (
          <div key={r.id} style={{ border: '1px solid #e5e7eb', padding: 8, marginBottom: 8 }}>
            <strong>{r.author}</strong>: {r.text} (Рейтинг: {r.rating}/5)
          </div>
        ))}
      </section>
      <section style={{ marginTop: 16 }}>
        <h3>Подходящие рейсы</h3>
        {flights.map((f) => (
          <div key={f.id} style={{ border: '1px solid #e5e7eb', padding: 8, marginBottom: 8 }}>
            {f.from} → {f.to}, {f.date}, Цена: {f.price}₽
          </div>
        ))}
      </section>
      <RequestForm mode="tour" itemTitle={tour.title} />
    </div>
  )
}

export default TourInfo
