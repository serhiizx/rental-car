import { Suspense } from 'react'
import { CarFilters } from '@/features/filter-cars'
import { Container } from '@/shared/ui'
import { CarListLoadingOverlay } from '@/widgets/car-list'
import styles from './loading.module.css'

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
