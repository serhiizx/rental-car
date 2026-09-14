import { API_BASE_URL } from '../config/env.ts'
import { HttpError } from './HttpError.ts'

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    throw new HttpError(
      response.status,
      `Request to ${path} failed with status ${response.status}`,
    )
  }

  return (await response.json()) as T
}
