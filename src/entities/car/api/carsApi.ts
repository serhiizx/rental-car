import { request } from '@/shared/api'
import { buildCarsSearchParams } from '../lib/buildCarsSearchParams'
import type {
  Car,
  CarFiltersResponse,
  CarsQuery,
  CarsResponse,
} from '../model/types'

export function getCars(query: CarsQuery, page: number): Promise<CarsResponse> {
  const params = buildCarsSearchParams(query, page)
  return request<CarsResponse>(`/cars?${params.toString()}`)
}

export function getCarById(id: string): Promise<Car> {
  return request<Car>(`/cars/${id}`, { next: { revalidate: 60 } })
}

export function getCarFilters(): Promise<CarFiltersResponse> {
  return request<CarFiltersResponse>('/cars/filters', {
    next: { revalidate: 3600 },
  })
}
