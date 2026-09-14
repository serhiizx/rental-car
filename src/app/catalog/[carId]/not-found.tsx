import Link from 'next/link'
import { Container, StatusMessage } from '@/shared/ui'

export default function NotFound() {
  return (
    <Container>
      <StatusMessage
        title="Car not found"
        description="This car may no longer be available for rental."
        action={<Link href="/catalog">Back to catalog</Link>}
      />
    </Container>
  )
}
