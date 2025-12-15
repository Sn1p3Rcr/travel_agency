import React from 'react'
import { useParams } from 'react-router-dom'
import tours from '../data/tours.json'
import RequestForm from '../components/RequestForm'

const TourDetail = (): JSX.Element => {
  const { id } = useParams()
  const tour = tours.find((t) => String(t.id) === id)

  if (!tour) return <div>Тур не найден</div>

  return (
    <div>
      <h2>{tour.title}</h2>
      <p><strong>Страна:</strong> {tour.country}</p>
      <p><strong>Максимум людей:</strong> {tour.maxPeople}</p>
      <p><strong>Длительность:</strong> {tour.durationMin}-{tour.durationMax} дней</p>
      <p><strong>Доступен:</strong> {tour.startDate} - {tour.endDate}</p>
      <p>{tour.full}</p>
      <div>
        <h4>Фотогалерея</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {tour.photos.map((p) => (
            <img key={p} src={p} alt="photo" style={{ width: 260, height: 180, objectFit: 'cover', borderRadius: 8 }} />
          ))}
        </div>
      </div>
      <RequestForm mode="tour" itemTitle={tour.title} />
    </div>
  )
}

export default TourDetail
