import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { carsInfiniteQueryOptions } from '@/entities/car'
import { CatalogPage } from '@/views/catalog'

export const metadata: Metadata = {
  title: 'Каталог автомобілів',
  description:
    'Перегляньте доступні для оренди автомобілі та відфільтруйте їх за брендом, ціною і пробігом.',
}

export default async function Page() {
  const query = {}
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery(carsInfiniteQueryOptions(query))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPage query={query} />
    </HydrationBoundary>
  )
}
