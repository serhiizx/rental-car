import styles from './Loader.module.css'

export function Loader() {
  return <span className={styles.loader} role="status" aria-label="Завантаження" />
}
