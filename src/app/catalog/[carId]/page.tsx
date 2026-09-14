import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Car } from '@/entities/car'
import { formatCarTitle, getCarById } from '@/entities/car'
import { HttpError } from '@/shared/api'
import { CarDetailsPage } from '@/views/car-details'

type PageProps = {
  params: Promise<{ carId: string }>
}

async function loadCar(carId: string): Promise<Car | null> {
  try {
    return await getCarById(carId)
  } catch (error) {
    if (error instanceof HttpError && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { carId } = await params
  const car = await loadCar(carId)

  if (!car) {
    return { title: 'Car not found' }
  }

  const title = formatCarTitle(car)

  return {
    title,
    description: car.description,
    openGraph: {
      title,
      description: car.description,
      images: [{ url: car.img }],
      type: 'website',
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { carId } = await params
  const car = await loadCar(carId)

  if (!car) {
    notFound()
  }

  return <CarDetailsPage car={car} />
}
