import { request } from '@/shared/api'
import type { BookingFormValues } from '../model/bookingSchema'

type BookingRequestResponse = {
  message: string
}

export async function createBookingRequest(
  carId: string,
  values: BookingFormValues,
): Promise<void> {
  const comment = values.comment.trim()

  await request<BookingRequestResponse>(`/cars/${carId}/booking-requests`, {
    method: 'POST',
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      ...(comment ? { comment } : {}),
    }),
  })
}
