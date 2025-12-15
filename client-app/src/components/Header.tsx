import React from 'react'
import { Link } from 'react-router-dom'

export const Header = (): JSX.Element => {
  return (
    <header className="nav">
      <div style={{ fontWeight: '700' }}>Travel Agency</div>
      <nav style={{ marginLeft: 16 }}>
        <Link to="/" style={{ color: '#fff', marginRight: 12 }}>Главная</Link>
        <Link to="/tours" style={{ color: '#fff', marginRight: 12 }}>Туры</Link>
        <Link to="/hotels" style={{ color: '#fff', marginRight: 12 }}>Отели</Link>
      </nav>
      <div style={{ marginLeft: 'auto' }}>
        <span>Тел: +7 (123) 456-78-90</span>
        <a href="https://wa.me/71234567890" style={{ color: '#fff', marginLeft: 12 }}>WhatsApp</a>
        <a href="https://t.me/travelagency" style={{ color: '#fff', marginLeft: 12 }}>Telegram</a>
      </div>
    </header>
  )
}

export default Header
