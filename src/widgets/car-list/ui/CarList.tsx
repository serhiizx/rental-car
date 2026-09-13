'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { CarCard, carsInfiniteQueryOptions } from '@/entities/car'
import type { CarsQuery } from '@/entities/car'
import { Button, Loader } from '@/shared/ui'
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
    return (
      <div className={styles.state}>
        <Loader />
      </div>
    )
  }

  // isLoadingError (error + no cached data) — не плутати з помилкою довантаження
  // наступної сторінки: там `data` уже є, і повний список ламати не можна,
  // за це відповідає toast у Load more нижче.
  if (isLoadingError) {
    return (
      <div className={styles.state}>
        <p className={styles.stateText}>
          Не вдалося завантажити автомобілі. Спробуйте ще раз.
        </p>
        <Button onClick={() => refetch()}>Спробувати знову</Button>
      </div>
    )
  }

  const cars = data.pages.flatMap((page) => page.cars)

  if (cars.length === 0) {
    return (
      <div className={styles.state}>
        <p className={styles.stateText}>
          За заданими фільтрами автомобілів не знайдено.
        </p>
        <p className={styles.stateHint}>Змініть параметри пошуку й спробуйте ще раз.</p>
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
              toast.error('Не вдалося завантажити ще автомобілі. Спробуйте ще раз.'),
            )
          }
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Завантаження…' : 'Load more'}
        </Button>
      ) : null}
    </div>
  )
}
