import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from '../components/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByTestId('ui-button')).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByTestId('ui-button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies secondary styles when variant is secondary', () => {
    render(<Button variant="secondary">Secondary</Button>)

    const button = screen.getByTestId('ui-button')
    expect(button).toHaveStyle('background-color: #e2e8f0')
    expect(button).toHaveStyle('color: #111')
  })
})
