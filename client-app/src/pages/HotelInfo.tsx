import React from 'react'
import { useParams } from 'react-router-dom'
import hotels from '../data/hotels.json'
import RequestForm from '../components/RequestForm'

const HotelInfo = (): JSX.Element => {
  const { id } = useParams()
  const hotel = hotels.find((h) => String(h.id) === id)

  if (!hotel) return <div>Отель не найден</div>

  const conditions = 'Удобства: Wi-Fi, бассейн, ресторан. Правила: регистрация с 14:00.'
  const reviews = hotel.reviews ?? []
  const flights = hotel.flights ?? []

  return (
    <div>
      <h2>{hotel.name}</h2>
      <p><strong>Страна:</strong> {hotel.country}</p>
      <p><strong>Цена от:</strong> {hotel.price}₽</p>
      <p>{hotel.desc}</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {hotel.photos.map((p) => (
          <img key={p} src={p} alt="photo" style={{ width: 260, height: 180, objectFit: 'cover', borderRadius: 8 }} />
        ))}
      </div>
      <section style={{ marginTop: 16 }}>
        <h3>Условия проживания</h3>
        <p>{conditions}</p>
      </section>
      <section style={{ marginTop: 16 }}>
        <h3>Отзывы</h3>
        {reviews.map((r) => (
          <div key={r.id} style={{ border: '1px solid #e5e7eb', padding: 8, marginBottom: 8 }}>
            <strong>{r.author}</strong>: {r.text} (Рейтинг: {r.rating}/5)
          </div>
        ))}
      </section>
      <section style={{ marginTop: 16 }}>
        <h3>Доступные рейсы</h3>
        {flights.map((f) => (
          <div key={f.id} style={{ border: '1px solid #e5e7eb', padding: 8, marginBottom: 8 }}>
            {f.from} → {f.to}, {f.date}, Цена: {f.price}₽
          </div>
        ))}
      </section>
      <RequestForm mode="hotel" itemTitle={hotel.name} />
    </div>
  )
}

export default HotelInfo
