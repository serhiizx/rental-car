'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { CarCard, carsInfiniteQueryOptions } from '@/entities/car'
import type { CarsQuery } from '@/entities/car'
import { Button, StatusMessage } from '@/shared/ui'
import { CarListSkeleton } from './CarListSkeleton'
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
    return <CarListSkeleton />
  }

  // isLoadingError (error + no cached data) — не плутати з помилкою довантаження
  // наступної сторінки: там `data` уже є, і повний список ламати не можна,
  // за це відповідає toast у Load more нижче.
  if (isLoadingError) {
    return (
      <StatusMessage
        title="Не вдалося завантажити автомобілі"
        description="Перевірте зʼєднання з мережею та спробуйте ще раз."
        action={<Button onClick={() => refetch()}>Спробувати знову</Button>}
      />
    )
  }

  const cars = data.pages.flatMap((page) => page.cars)

  if (cars.length === 0) {
    return (
      <StatusMessage
        title="Автомобілів не знайдено"
        description="За заданими фільтрами немає жодного авто. Змініть параметри пошуку."
      />
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
