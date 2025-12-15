import React from 'react'

export const Footer = (): JSX.Element => (
  <footer style={{ padding: 12, background: '#f8fafc' }}>
    <div>Контакты: +7 (123) 456-78-90</div>
    <div>
      <a href="https://wa.me/71234567890">WhatsApp</a> | 
      <a href="https://t.me/travelagency">Telegram</a>
    </div>
  </footer>
)

export default Footer
