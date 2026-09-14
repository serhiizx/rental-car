'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { cn } from '@/shared/lib'
import styles from './SelectField.module.css'

export type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = {
  name: string
  value: string
  onChange: (value: string) => void
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
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  // Чи змінили активну опцію з клавіатури. Автопрокрутка потрібна тільки тоді:
  // при наведенні мишею вона прокручувала б список прямо під курсором, ціль
  // тікала б з-під нього і клік потрапляв би не в ту опцію.
  const scrollOnActiveChange = useRef(false)

  const listboxId = useId()
  const labelId = useId()

  const selectedIndex = options.findIndex((option) => option.value === value)
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : ''

  // Клік поза компонентом закриває список. Слухач вішаємо лише поки він
  // відкритий, інакше кожен селект на сторінці тримав би зайвий обробник.
  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isOpen])

  // Тримаємо активну опцію в полі зору при навігації з клавіатури.
  useEffect(() => {
    if (!isOpen || activeIndex < 0 || !scrollOnActiveChange.current) {
      return
    }

    scrollOnActiveChange.current = false
    const activeOption = listRef.current?.children[activeIndex]
    activeOption?.scrollIntoView({ block: 'nearest' })
  }, [isOpen, activeIndex])

  function open(startIndex: number) {
    // При відкритті прокрутка доречна завжди: раніше вибрана опція може бути
    // поза видимою частиною списку.
    scrollOnActiveChange.current = true
    setActiveIndex(startIndex)
    setIsOpen(true)
    // Safari не дає кнопці фокус при кліку, тож без цього виклику клавіатурна
    // навігація після відкриття мишею була б мертвою.
    triggerRef.current?.focus()
  }

  function close() {
    setIsOpen(false)
    setActiveIndex(-1)
  }

  function select(index: number) {
    onChange(options[index].value)
    close()
    triggerRef.current?.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    scrollOnActiveChange.current = true

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          open(selectedIndex >= 0 ? selectedIndex : 0)
        } else {
          setActiveIndex((index) => Math.min(index + 1, options.length - 1))
        }
        break

      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen) {
          open(selectedIndex >= 0 ? selectedIndex : options.length - 1)
        } else {
          setActiveIndex((index) => Math.max(index - 1, 0))
        }
        break

      case 'Home':
        if (isOpen) {
          event.preventDefault()
          setActiveIndex(0)
        }
        break

      case 'End':
        if (isOpen) {
          event.preventDefault()
          setActiveIndex(options.length - 1)
        }
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        if (isOpen && activeIndex >= 0) {
          select(activeIndex)
        } else if (!isOpen) {
          open(selectedIndex >= 0 ? selectedIndex : 0)
        }
        break

      case 'Escape':
        if (isOpen) {
          event.preventDefault()
          close()
        }
        break

      case 'Tab':
        close()
        break
    }
  }

  return (
    <div className={styles.field} ref={rootRef} onKeyDown={handleKeyDown}>
      {label ? (
        <span className={styles.label} id={labelId}>
          {label}
        </span>
      ) : null}

      <div className={styles.control}>
        <button
          type="button"
          id={name}
          ref={triggerRef}
          className={styles.trigger}
          role="combobox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={label ? `${labelId} ${name}` : undefined}
          onClick={() =>
            isOpen ? close() : open(selectedIndex >= 0 ? selectedIndex : 0)
          }
        >
          <span className={styles.value}>{selectedLabel || placeholder}</span>
          <LuChevronDown
            aria-hidden="true"
            className={cn(styles.chevron, isOpen && styles.chevronOpen)}
          />
        </button>

        {isOpen ? (
          <ul
            id={listboxId}
            ref={listRef}
            className={styles.list}
            role="listbox"
            aria-labelledby={label ? labelId : undefined}
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                className={cn(
                  styles.option,
                  index === selectedIndex && styles.selected,
                  index === activeIndex && styles.active,
                )}
                role="option"
                aria-selected={index === selectedIndex}
                onMouseEnter={() => {
                  scrollOnActiveChange.current = false
                  setActiveIndex(index)
                }}
                onClick={() => select(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
