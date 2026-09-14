import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClassNames: Record<ButtonVariant, string | undefined> = {
  primary: undefined,
  secondary: styles.secondary,
}

const sizeClassNames: Record<ButtonSize, string> = {
  md: styles.md,
  lg: styles.lg,
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = cn(
    styles.button,
    variantClassNames[variant],
    sizeClassNames[size],
    className,
  )

  return <button type={type} className={classes} {...rest} />
}
