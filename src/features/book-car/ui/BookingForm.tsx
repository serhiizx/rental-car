// Тимчасова заглушка. Повноцінна форма бронювання з'явиться в наступній задачі.
type BookingFormProps = {
  carId: string
}

export function BookingForm({ carId }: BookingFormProps) {
  return <div data-car-id={carId} />
}
