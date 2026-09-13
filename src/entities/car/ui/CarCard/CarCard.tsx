import Image from 'next/image'
import Link from 'next/link'
import type { Car } from '../../model/types'
import { formatCarTitle, formatMileage, formatPrice } from '../../lib/format'
import styles from './CarCard.module.css'

type CarCardProps = {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const detailsRow1 = [car.location.city, car.location.country, car.rentalCompany]
  const detailsRow2 = [car.type, formatMileage(car.mileage)]

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={formatCarTitle(car)}
          width={244}
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

      <div className={styles.details}>
        <div className={styles.detailsRow}>
          {detailsRow1.map((item, index) => (
            <span key={`${item}-${index}`} className={styles.detail}>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.detailsRow}>
          {detailsRow2.map((item, index) => (
            <span key={`${item}-${index}`} className={styles.detail}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more about ${formatCarTitle(car)}`}
        className={styles.link}
      >
        Read more
      </Link>
    </article>
  )
}
