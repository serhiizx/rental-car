import type { ReactNode } from 'react'
import { cn } from '@/shared/lib'
import styles from './Container.module.css'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn(styles.container, className)}>{children}</div>
}
