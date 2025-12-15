import React from 'react'
import { Link } from 'react-router-dom'
import styles from './TourCard.module.css'

export type Tour = {
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

export interface TourCardProps extends Tour {
  layout?: 'left' | 'bottom'
}

const TourCard: React.FC<TourCardProps> = ({
  id,
  title,
  short,
  price,
  rating,
  popularity,
  photos,
  tags,
  layout = 'left'
}) => {
  const image = photos && photos.length > 0 ? photos[0] : "https://via.placeholder.com/300"
  const hasFamilyDiscount = tags.includes("семейный")
  const discountedPrice = hasFamilyDiscount ? Math.round(price * 0.9) : price

  return (
    <div className={`${styles['tour-card']} ${styles[`tour-card--${layout}`]}`}>
      
      {image && (
        <div className={styles['tour-card__image-wrapper']}>
          <img src={image} alt={title} className={styles['tour-card__image']} />
        </div>
      )}

      <div className={styles['tour-card__content']}>
        <h3 className={styles['tour-card__title']}>{title}</h3>
        <p className={styles['tour-card__description']}>{short}</p>
        <p>Стоимость: {hasFamilyDiscount ? <><s>{price}₽</s> {discountedPrice}₽</> : `${price}₽`}</p>
        <p>Рейтинг: {rating}/5</p>
        <p>Популярность: {popularity}</p>
        {tags.length > 0 && <p>Теги: {tags.join(', ')}</p>}

        <Link to={`/tour/${id}`} className={styles['tour-card__button']}>Узнать подробнее</Link>
      </div>
    </div>
  )
}

export default TourCard
