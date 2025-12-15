import React from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps): JSX.Element => (
  <button onClick={onClick} style={{ padding: '8px 12px', borderRadius: 6, border: 'none', background: '#0b74de', color: '#fff' }}>
    {children}
  </button>
)

export default Button
