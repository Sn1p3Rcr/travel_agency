import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Tours from './pages/Tours'
import Hotels from './pages/Hotels'
import TourInfo from './pages/TourInfo'
import HotelInfo from './pages/HotelInfo'
import Team from './pages/Team'

export const Router = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/tours" element={<Tours />} />
    <Route path="/tour/:id" element={<TourInfo />} />
    <Route path="/hotels" element={<Hotels />} />
    <Route path="/hotel/:id" element={<HotelInfo />} />
    <Route path="/team" element={<Team />} />
  </Routes>
)

export default Router
