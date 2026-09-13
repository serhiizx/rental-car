import type { CarsQuery } from '@/entities/car'
import { Container } from '@/shared/ui'
import { CarList } from '@/widgets/car-list'
import styles from './CatalogPage.module.css'

type CatalogPageProps = {
  query: CarsQuery
}

export function CatalogPage({ query }: CatalogPageProps) {
  return (
    <Container className={styles.page}>
      <h1 className={styles.visuallyHidden}>Каталог автомобілів</h1>
      <CarList query={query} />
    </Container>
  )
}
