import type { ChangeEvent } from 'react'
import { cn } from '@/shared/lib'
import styles from './SelectField.module.css'

export type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = {
  name: string
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  label?: string
  placeholder?: string
}

export function SelectField({
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
}: SelectFieldProps) {
  return (
    <div className={styles.field}>
      {label ? (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      ) : null}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(styles.control)}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
