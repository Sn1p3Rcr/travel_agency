import React, { useState } from 'react'

type RequestFormProps = {
  mode: 'tour' | 'hotel'
  itemTitle?: string
}

const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/
const phoneRegex = /^(\+7|8)\d{10}$/

const RequestForm: React.FC<RequestFormProps> = ({ mode, itemTitle }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { name?: string; phone?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Введите имя'
    } else if (!nameRegex.test(name.trim())) {
      newErrors.name = 'Только буквы, одно слово'
    }
    if (!phone.trim()) {
      newErrors.phone = 'Введите телефон'
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Номер в формате +7********** или 8**********'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setStatus('idle')
      return
    }

    // Сохранение заявки в localStorage (имитация базы данных на фронтенде)
    const existingRaw = window.localStorage.getItem('requests')
    const existing = existingRaw ? JSON.parse(existingRaw) : []
    const newRequest = {
      id: Date.now(),
      mode,
      itemTitle,
      name,
      phone,
      createdAt: new Date().toISOString()
    }
    window.localStorage.setItem('requests', JSON.stringify([...existing, newRequest]))

    setStatus('success')
    setName('')
    setPhone('')
  }

  const buttonLabel = mode === 'tour' ? 'Оставить заявку' : 'Забронировать'

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, maxWidth: 360 }}>
      {itemTitle && (
        <p style={{ marginBottom: 8, fontWeight: 500 }}>
          {mode === 'tour' ? 'Тур:' : 'Отель:'} {itemTitle}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: errors.name ? '1px solid #dc2626' : '1px solid #d1d5db'
            }}
          />
          {errors.name && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 2 }}>{errors.name}</div>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: 6,
              border: errors.phone ? '1px solid #dc2626' : '1px solid #d1d5db'
            }}
          />
          {errors.phone && <div style={{ color: '#dc2626', fontSize: 12, marginTop: 2 }}>{errors.phone}</div>}
        </div>
        <button
          type="submit"
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: 'none',
            backgroundColor: '#0088ff',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {buttonLabel}
        </button>
        {status === 'success' && (
          <div style={{ color: '#16a34a', fontSize: 13 }}>
            Заявка успешно отправлена!
          </div>
        )}
      </div>
    </form>
  )
}

export default RequestForm


