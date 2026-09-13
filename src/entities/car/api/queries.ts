import { infiniteQueryOptions } from '@tanstack/react-query'
import { getCars } from './carsApi'
import type { CarsQuery, CarsResponse } from '../model/types'

export const carsQueryKeys = {
  all: ['cars'] as const,
  list: (query: CarsQuery) => [...carsQueryKeys.all, 'list', query] as const,
}

export function carsInfiniteQueryOptions(query: CarsQuery) {
  return infiniteQueryOptions({
    queryKey: carsQueryKeys.list(query),
    queryFn: ({ pageParam }) => getCars(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: CarsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })
}
