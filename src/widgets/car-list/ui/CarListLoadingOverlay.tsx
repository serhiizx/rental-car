import { Loader } from '@/shared/ui'
import { CarListSkeleton } from './CarListSkeleton'
import styles from './CarListLoadingOverlay.module.css'

export function CarListLoadingOverlay() {
  return (
    <>
      <CarListSkeleton />
      <div className={styles.modal}>
        <Loader size="lg" />
        <p className={styles.title}>Loading cars...</p>
        <p className={styles.description}>
          Please wait while we fetch the best cars for you
        </p>
      </div>
    </>
  )
}
