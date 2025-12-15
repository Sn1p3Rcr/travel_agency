import React from 'react'

import styles from './ProductCard.module.css'

export interface ProductCardProps {
  id: number
  name: string
  desc: string
  rating: number
  popularity: number
  country?: string
  price?: number
  maxPeople: number
  durationMin: number
  durationMax: number
  startDate: string
  endDate: string
  image?: string
  buttonText?: string
  layout?: 'left' | 'bottom'
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  desc,
  rating,
  popularity,
  country,
  price,
  image = "https://via.placeholder.com/300",
  buttonText,
  layout = 'bottom'
}) => {
  return (
    <div className={`${styles['product-card']} ${styles[`product-card--${layout}`]}`}>
      
      {image && image !== "" && (
        <div className={styles['product-card__image-wrapper']}>
          <img src={image} alt={name} className={styles['product-card__image']} />
        </div>
      )}

      <div className={styles['product-card__content']}>
        <h3 className={styles['product-card__title']}>{name}</h3>
        <p className={styles['product-card__description']}>{desc}</p>
        <p>Рейтинг: {rating}/5</p>
        <p>Популярность: {popularity}</p>
        {country && <p>Страна: {country}</p>}
        {typeof price === 'number' && <p>Цена от: {price}₽</p>}

        {buttonText && (
          <button className={styles['product-card__button']}>{buttonText}</button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
