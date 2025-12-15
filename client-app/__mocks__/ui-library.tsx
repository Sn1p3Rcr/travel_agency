import React from 'react'

export const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => (
  <button type="button" {...props}>
    {children}
  </button>
)

export const Card = ({ title, children }: { title?: string; children?: React.ReactNode }): JSX.Element => (
  <section>
    {title ? <h3>{title}</h3> : null}
    <div>{children}</div>
  </section>
)

type InputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const Input = ({ value, onChange, placeholder }: InputProps): JSX.Element => (
  <input
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
)
