import React from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps): JSX.Element => {
  const style = {
    padding: '8px 12px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? '#0b74de' : '#e2e8f0',
    color: variant === 'primary' ? '#fff' : '#111'
  }

  return (
    <button style={style} onClick={onClick} data-testid="ui-button">
      {children}
    </button>
  )
}
