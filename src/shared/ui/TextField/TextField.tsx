import type { ChangeEvent, FocusEvent } from 'react'
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
  const controlClasses = [styles.control, error ? styles.invalid : null]
    .filter(Boolean)
    .join(' ')

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
          className={`${controlClasses} ${styles.textarea}`}
          aria-invalid={Boolean(error)}
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
        />
      )}

      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  )
}
