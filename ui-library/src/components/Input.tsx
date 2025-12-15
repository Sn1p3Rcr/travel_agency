import React from 'react'

export type InputProps = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export const Input = ({ value, onChange, placeholder }: InputProps): JSX.Element => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ padding: '8px', borderRadius: 4, border: '1px solid #cbd5e1' }}
      data-testid="ui-input"
    />
  )
}
