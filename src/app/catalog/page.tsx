import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { carsInfiniteQueryOptions, getCarFilters } from '@/entities/car'
import { parseCarsQuery } from '@/features/filter-cars'
import { CatalogPage } from '@/views/catalog'

export const metadata: Metadata = {
  title: 'Каталог автомобілів',
  description:
    'Перегляньте доступні для оренди автомобілі та відфільтруйте їх за брендом, ціною і пробігом.',
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page({ searchParams }: PageProps) {
  const query = parseCarsQuery(await searchParams)

  const queryClient = new QueryClient()

  const [filters] = await Promise.all([
    getCarFilters(),
    queryClient.prefetchInfiniteQuery(carsInfiniteQueryOptions(query)),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPage
        query={query}
        brands={filters.brands}
        priceRange={filters.price}
      />
    </HydrationBoundary>
  )
}
