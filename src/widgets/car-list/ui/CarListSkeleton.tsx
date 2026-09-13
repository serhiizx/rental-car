import styles from './CarListSkeleton.module.css'

const PLACEHOLDERS = Array.from({ length: 12 }, (_, index) => index)

export function CarListSkeleton() {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {PLACEHOLDERS.map((index) => (
        <li key={index} className={styles.card}>
          <span className={styles.image} />
          <span className={styles.line} />
          <span className={`${styles.line} ${styles.lineShort}`} />
        </li>
      ))}
    </ul>
  )
}
