import type { Car, CarLocation } from '../model/types'

export function formatMileage(mileage: number): string {
  return `${String(mileage).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} km`
}

export function formatPrice(rentalPrice: string): string {
  return `$${rentalPrice}`
}

export function formatAddress(location: CarLocation): string {
  return `${location.city}, ${location.country}`
}

export function formatCarTitle(
  car: Pick<Car, 'brand' | 'model' | 'year'>,
): string {
  return `${car.brand} ${car.model}, ${car.year}`
}

export function formatCarId(id: string): string {
  return `Id: ${id.replace(/-/g, '').slice(0, 4)}`
}
