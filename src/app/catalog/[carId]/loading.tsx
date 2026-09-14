import { Container, Loader } from '@/shared/ui'
import styles from './loading.module.css'

export default function Loading() {
  return (
    <Container>
      <div className={styles.wrapper}>
        <Loader />
      </div>
    </Container>
  )
}
