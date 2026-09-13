import type { CarsQuery } from '../model/types'

export const CARS_PER_PAGE = 12

export function buildCarsSearchParams(
  query: CarsQuery,
  page: number,
): URLSearchParams {
  const params = new URLSearchParams()

  params.set('page', String(page))
  params.set('perPage', String(CARS_PER_PAGE))

  if (query.brand) {
    params.set('brand', query.brand)
  }
  if (query.price) {
    params.set('price', String(query.price))
  }
  if (query.minMileage) {
    params.set('minMileage', String(query.minMileage))
  }
  if (query.maxMileage) {
    params.set('maxMileage', String(query.maxMileage))
  }

  return params
}
