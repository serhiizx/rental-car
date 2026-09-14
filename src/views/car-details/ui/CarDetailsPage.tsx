import Image from 'next/image'
import { BsCheckCircle } from 'react-icons/bs'
import { LuCalendar, LuCar, LuFuel, LuMapPin, LuSettings } from 'react-icons/lu'
import { PiRoadHorizon } from 'react-icons/pi'
import type { Car } from '@/entities/car'
import {
  formatAddress,
  formatCarId,
  formatCarTitle,
  formatMileage,
  formatPrice,
} from '@/entities/car'
import { BookingForm } from '@/features/book-car'
import { Container } from '@/shared/ui'
import styles from './CarDetailsPage.module.css'

type CarDetailsPageProps = {
  car: Car
}

export function CarDetailsPage({ car }: CarDetailsPageProps) {
  // Порядок і набір пунктів звірені з макетом (Frame "Car Specifications"):
  // Year, Type, Fuel Consumption, Engine, Mileage.
  const specifications = [
    { icon: <LuCalendar />, label: `Year: ${car.year}` },
    { icon: <LuCar />, label: `Type: ${car.type}` },
    { icon: <LuFuel />, label: `Fuel Consumption: ${car.fuelConsumption}` },
    { icon: <LuSettings />, label: `Engine: ${car.engine}` },
    {
      icon: <PiRoadHorizon />,
      label: `Mileage: ${formatMileage(car.mileage)}`,
    },
  ]

  return (
    <Container className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.imageWrapper}>
            <Image
              src={car.img}
              alt={formatCarTitle(car)}
              width={640}
              height={512}
              className={styles.image}
              priority
            />
          </div>

          <BookingForm carId={car.id} />
        </div>

        <div className={styles.right}>
          <header className={styles.header}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{formatCarTitle(car)}</h1>
              <span className={styles.id}>{formatCarId(car.id)}</span>
            </div>

            <p className={styles.location}>
              <LuMapPin aria-hidden="true" className={styles.locationIcon} />
              {formatAddress(car.location)}
            </p>

            <p className={styles.price}>{formatPrice(car.rentalPrice)}</p>
          </header>

          <p className={styles.description}>{car.description}</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Rental Conditions:</h2>
            <ul className={styles.list}>
              {car.rentalConditions.map((condition) => (
                <li key={condition} className={styles.listItem}>
                  <BsCheckCircle
                    aria-hidden="true"
                    className={styles.listIcon}
                  />
                  {condition}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Car Specifications:</h2>
            <ul className={styles.list}>
              {specifications.map((item) => (
                <li key={item.label} className={styles.listItem}>
                  <span aria-hidden="true" className={styles.listIcon}>
                    {item.icon}
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Features</h2>
            <ul className={styles.list}>
              {car.features.map((feature) => (
                <li key={feature} className={styles.listItem}>
                  <BsCheckCircle
                    aria-hidden="true"
                    className={styles.listIcon}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Container>
  )
}
