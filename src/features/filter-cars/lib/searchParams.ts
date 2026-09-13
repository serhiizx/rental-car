import type { CarsQuery } from '@/entities/car'

type RawSearchParams = Record<string, string | string[] | undefined>

function readString(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value
  const trimmed = raw?.trim()
  return trimmed ? trimmed : undefined
}

function readNumber(value: string | string[] | undefined): number | undefined {
  const raw = readString(value)
  if (!raw) {
    return undefined
  }

  const parsed = Number(raw.replace(/[\s,]/g, ''))
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

export function parseCarsQuery(searchParams: RawSearchParams): CarsQuery {
  const query: CarsQuery = {}

  const brand = readString(searchParams.brand)
  if (brand) query.brand = brand

  const price = readNumber(searchParams.price)
  if (price) query.price = price

  const minMileage = readNumber(searchParams.minMileage)
  if (minMileage) query.minMileage = minMileage

  const maxMileage = readNumber(searchParams.maxMileage)
  if (maxMileage) query.maxMileage = maxMileage

  return query
}

export function carsQueryToSearchParams(query: CarsQuery): URLSearchParams {
  const params = new URLSearchParams()

  if (query.brand) params.set('brand', query.brand)
  if (query.price) params.set('price', String(query.price))
  if (query.minMileage) params.set('minMileage', String(query.minMileage))
  if (query.maxMileage) params.set('maxMileage', String(query.maxMileage))

  return params
}
