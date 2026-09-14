import type { ReactNode } from 'react'
import styles from './StatusMessage.module.css'

type StatusMessageProps = {
  title: string
  description?: string
  action?: ReactNode
}

export function StatusMessage({
  title,
  description,
  action,
}: StatusMessageProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  )
}
