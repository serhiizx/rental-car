import { Container } from '@/shared/ui'
import { CarListSkeleton } from '@/widgets/car-list'

export default function Loading() {
  return (
    <Container>
      <CarListSkeleton />
    </Container>
  )
}
