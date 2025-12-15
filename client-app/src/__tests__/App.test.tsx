import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import App from '../App'

describe('App', () => {
  const renderWithRouter = (initialPath: string = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <App />
      </MemoryRouter>
    )
  }

  test('отображает главную страницу с баннером туров', () => {
    renderWithRouter('/')

    // На главной есть и h1, и h2 с похожим текстом, поэтому берём именно заголовок уровня 1 (баннер)
    expect(
      screen.getByRole('heading', { level: 1, name: /Лучшие туры по России/i })
    ).toBeInTheDocument()
  })

  test('отображает каталог туров по маршруту /tours', () => {
    renderWithRouter('/tours')

    expect(
      screen.getByRole('heading', { level: 2, name: /Каталог туров/i })
    ).toBeInTheDocument()
  })

  test('отображает каталог отелей по маршруту /hotels', () => {
    renderWithRouter('/hotels')

    expect(
      screen.getByRole('heading', { level: 2, name: /Каталог отелей/i })
    ).toBeInTheDocument()
  })
})
