'use client'

import { useEffect } from 'react'
import { Button, Container, StatusMessage } from '@/shared/ui'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Container>
      <StatusMessage
        title="Щось пішло не так"
        description="Сталася помилка під час завантаження сторінки."
        action={<Button onClick={reset}>Спробувати знову</Button>}
      />
    </Container>
  )
}
