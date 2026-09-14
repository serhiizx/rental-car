import Link from 'next/link'
import { Container, StatusMessage } from '@/shared/ui'

export default function NotFound() {
  return (
    <Container>
      <StatusMessage
        title="Page not found"
        description="The link may be broken, or the page may no longer exist."
        action={<Link href="/">Back to home</Link>}
      />
    </Container>
  )
}
