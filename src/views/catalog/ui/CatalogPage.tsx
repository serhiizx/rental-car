import type { CarsQuery } from '@/entities/car'
import { CarFilters } from '@/features/filter-cars'
import { Container } from '@/shared/ui'
import { CarList } from '@/widgets/car-list'
import styles from './CatalogPage.module.css'

type CatalogPageProps = {
  query: CarsQuery
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
}

export function CatalogPage({ query, brands, priceRange }: CatalogPageProps) {
  return (
    <Container className={styles.page}>
      <h1 className={styles.visuallyHidden}>Car catalog</h1>
      <CarFilters brands={brands} priceRange={priceRange} />
      <CarList query={query} />
    </Container>
  )
}
