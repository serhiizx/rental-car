import Link from 'next/link'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog" className={styles.cta}>
          View Catalog
        </Link>
      </div>
    </section>
  )
}
