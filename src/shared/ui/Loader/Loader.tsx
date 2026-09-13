import { cn } from '@/shared/lib'
import styles from './Loader.module.css'

export function Loader() {
  return <span className={cn(styles.loader)} role="status" aria-label="Завантаження" />
}
