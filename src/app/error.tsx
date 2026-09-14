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
        title="Something went wrong"
        description="An error occurred while loading the page."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </Container>
  )
}
