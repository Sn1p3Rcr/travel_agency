import toursData from '../data/tours.json'
import hotelsData from '../data/hotels.json'

export type Tour = {
  id: number
  title: string
  short: string
  full?: string
  price?: number
  photos?: string[]
}

export type Hotel = {
  id: number
  name: string
  desc?: string
  photos?: string[]
}

export const fetchTours = async (): Promise<Tour[]> => {
  return Promise.resolve(toursData as Tour[])
}

export const fetchTourById = async (id: number): Promise<Tour | undefined> => {
  const t = (toursData as Tour[]).find((x) => x.id === id)
  return Promise.resolve(t)
}

export const fetchHotels = async (): Promise<Hotel[]> => {
  return Promise.resolve(hotelsData as Hotel[])
}

export const fetchHotelById = async (id: number): Promise<Hotel | undefined> => {
  const h = (hotelsData as Hotel[]).find((x) => x.id === id)
  return Promise.resolve(h)
}

export default { fetchTours, fetchTourById, fetchHotels, fetchHotelById }
