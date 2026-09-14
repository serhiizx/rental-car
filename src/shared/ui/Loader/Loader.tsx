import { cn } from '@/shared/lib'
import styles from './Loader.module.css'

type LoaderSize = 'md' | 'lg'

type LoaderProps = {
  size?: LoaderSize
}

const sizeClassNames: Record<LoaderSize, string> = {
  md: styles.md,
  lg: styles.lg,
}

export function Loader({ size = 'md' }: LoaderProps) {
  return (
    <span
      className={cn(styles.loader, sizeClassNames[size])}
      role="status"
      aria-label="Loading"
    />
  )
}
