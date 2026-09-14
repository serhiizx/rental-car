'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { CarCard, carsInfiniteQueryOptions } from '@/entities/car'
import type { CarsQuery } from '@/entities/car'
import { Button, StatusMessage } from '@/shared/ui'
import { CarListLoadingOverlay } from './CarListLoadingOverlay'
import styles from './CarList.module.css'

type CarListProps = {
  query: CarsQuery
}

export function CarList({ query }: CarListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isLoadingError,
    refetch,
  } = useInfiniteQuery(carsInfiniteQueryOptions(query))

  if (isPending) {
    return <CarListLoadingOverlay />
  }

  // isLoadingError (error + no cached data) — не плутати з помилкою довантаження
  // наступної сторінки: там `data` уже є, і повний список ламати не можна,
  // за це відповідає toast у Load more нижче.
  if (isLoadingError) {
    return (
      <StatusMessage
        title="Failed to load cars"
        description="Check your network connection and try again."
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    )
  }

  const cars = data.pages.flatMap((page) => page.cars)

  if (cars.length === 0) {
    return (
      <div className={styles.empty}>
        <Image
          src="/no-cars-found.png"
          alt="No cars found"
          width={414}
          height={388}
          className={styles.emptyImage}
        />
        <StatusMessage
          title="No cars found"
          description="We couldn't find any cars that match your current filters. Try changing your search criteria or reset the filters."
          action={
            <Link href="/catalog" className={styles.resetLink}>
              Reset filters
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.grid}>
        {cars.map((car, index) => (
          <li key={car.id}>
            <CarCard car={car} priority={index === 0} />
          </li>
        ))}
      </ul>

      {hasNextPage ? (
        <Button
          variant="secondary"
          className={styles.loadMore}
          onClick={() =>
            fetchNextPage({ throwOnError: true }).catch(() =>
              toast.error('Failed to load more cars. Please try again.'),
            )
          }
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading…' : 'Load more'}
        </Button>
      ) : null}
    </div>
  )
}
