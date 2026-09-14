import type { ChangeEvent, FocusEvent } from 'react'
import { cn } from '@/shared/lib'
import styles from './TextField.module.css'

type TextFieldProps = {
  name: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  label?: string
  placeholder?: string
  type?: string
  error?: string
  as?: 'input' | 'textarea'
}

export function TextField({
  name,
  value,
  onChange,
  onBlur,
  label,
  placeholder,
  type = 'text',
  error,
  as = 'input',
}: TextFieldProps) {
  const controlClasses = cn(styles.control, error ? styles.invalid : null)
  const errorId = `${name}-error`

  return (
    <div className={styles.field}>
      {label ? (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      ) : null}

      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn(controlClasses, styles.textarea)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={controlClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}

      {error ? (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      ) : null}
    </div>
  )
}
