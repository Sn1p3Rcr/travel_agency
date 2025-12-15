import React from 'react'

export type CardProps = {
  title: string
  children?: React.ReactNode
}

export const Card = ({ title, children }: CardProps): JSX.Element => {
  const style = {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
  }

  return (
    <article style={style} data-testid="ui-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  )
}
