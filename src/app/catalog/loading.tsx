import { Suspense } from 'react'
import { CarFilters } from '@/features/filter-cars'
import { Container } from '@/shared/ui'
import { CarListLoadingOverlay } from '@/widgets/car-list'
import styles from './loading.module.css'

// Поки page.tsx (async Server Component) чекає getCarFilters()/prefetchInfiniteQuery,
// Next показує цей фолбек замість усього сегмента /catalog. Реальні бренди/ціни
// ще не завантажені, тож панель фільтрів рендериться з порожніми опціями —
// вона зникає разом з цим файлом, щойно page.tsx резолвиться. CarFilters читає
// useSearchParams(), тож для статичної генерації цього фолбека Next вимагає
// Suspense-межу навколо нього (інакше build падає з missing-suspense-with-csr-bailout).
export default function Loading() {
  return (
    <Container className={styles.page}>
      <Suspense fallback={null}>
        <CarFilters brands={[]} priceRange={{ min: 0, max: 0 }} />
      </Suspense>
      <CarListLoadingOverlay />
    </Container>
  )
}
