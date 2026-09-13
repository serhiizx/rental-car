import Link from 'next/link'
import { Container, StatusMessage } from '@/shared/ui'

export default function NotFound() {
  return (
    <Container>
      <StatusMessage
        title="Сторінку не знайдено"
        description="Можливо, посилання застаріле або сторінки не існує."
        action={<Link href="/">На головну</Link>}
      />
    </Container>
  )
}
