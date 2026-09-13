import { API_BASE_URL } from '@/shared/config/env'
import { HttpError } from './HttpError'

export async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new HttpError(
      response.status,
      `Запит ${path} завершився помилкою ${response.status}`,
    )
  }

  return (await response.json()) as T
}
