import Image from 'next/image'
import Link from 'next/link'
import type { Car } from '../../model/types'
import {
  formatAddress,
  formatCarTitle,
  formatMileage,
  formatPrice,
} from '../../lib/format'
import styles from './CarCard.module.css'

type CarCardProps = {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const details = [
    formatAddress(car.location),
    car.rentalCompany,
    car.type,
    car.model,
    String(car.year),
    formatMileage(car.mileage),
  ]

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={formatCarTitle(car)}
          width={276}
          height={268}
          className={styles.image}
        />
      </div>

      <div className={styles.head}>
        <h3 className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model}</span>,{' '}
          {car.year}
        </h3>
        <p className={styles.price}>{formatPrice(car.rentalPrice)}</p>
      </div>

      <p className={styles.details}>
        {details.map((item, index) => (
          <span key={`${item}-${index}`} className={styles.detail}>
            {item}
          </span>
        ))}
      </p>

      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Read more
      </Link>
    </article>
  )
}
