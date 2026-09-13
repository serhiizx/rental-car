'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Button, SelectField } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import { carsQueryToSearchParams } from '../lib/searchParams'
import styles from './CarFilters.module.css'

type CarFiltersProps = {
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
}

const PRICE_STEP = 10

function buildPriceOptions(min: number, max: number): SelectOption[] {
  const options: SelectOption[] = []
  const start = Math.ceil(min / PRICE_STEP) * PRICE_STEP

  for (let value = start; value <= max; value += PRICE_STEP) {
    options.push({ value: String(value), label: `To $${value}` })
  }

  return options
}

function formatMileageInput(value: string): string {
  const digits = value.replace(/\D/g, '')
  return digits ? Number(digits).toLocaleString('en-US') : ''
}

export function CarFilters({ brands, priceRange }: CarFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [brand, setBrand] = useState(searchParams.get('brand') ?? '')
  const [price, setPrice] = useState(searchParams.get('price') ?? '')
  const [minMileage, setMinMileage] = useState(
    formatMileageInput(searchParams.get('minMileage') ?? ''),
  )
  const [maxMileage, setMaxMileage] = useState(
    formatMileageInput(searchParams.get('maxMileage') ?? ''),
  )

  const brandOptions: SelectOption[] = brands.map((item) => ({
    value: item,
    label: item,
  }))

  const priceOptions = buildPriceOptions(priceRange.min, priceRange.max)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = carsQueryToSearchParams({
      brand: brand || undefined,
      price: price ? Number(price) : undefined,
      minMileage: Number(minMileage.replace(/\D/g, '')) || undefined,
      maxMileage: Number(maxMileage.replace(/\D/g, '')) || undefined,
    })

    const queryString = params.toString()
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
  }

  function handleReset() {
    setBrand('')
    setPrice('')
    setMinMileage('')
    setMaxMileage('')
    router.replace(pathname, { scroll: false })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.brandField}>
        <SelectField
          name="brand"
          label="Car brand"
          placeholder="Choose a brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
          options={brandOptions}
        />
      </div>

      <div className={styles.priceField}>
        <SelectField
          name="price"
          label="Price / 1 hour"
          placeholder="Choose a price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          options={priceOptions}
        />
      </div>

      <div className={styles.mileage}>
        <span className={styles.mileageLabel}>Car mileage / km</span>
        <div className={styles.mileageInputs}>
          <label className={styles.visuallyHidden} htmlFor="minMileage">
            Пробіг від
          </label>
          <input
            id="minMileage"
            className={`${styles.mileageInput} ${styles.mileageFrom}`}
            name="minMileage"
            value={minMileage ? `From ${minMileage}` : ''}
            placeholder="From"
            onChange={(event) => setMinMileage(formatMileageInput(event.target.value))}
          />
          <label className={styles.visuallyHidden} htmlFor="maxMileage">
            Пробіг до
          </label>
          <input
            id="maxMileage"
            className={`${styles.mileageInput} ${styles.mileageTo}`}
            name="maxMileage"
            value={maxMileage ? `To ${maxMileage}` : ''}
            placeholder="To"
            onChange={(event) => setMaxMileage(formatMileageInput(event.target.value))}
          />
        </div>
      </div>

      <Button type="submit" className={styles.submit}>
        Search
      </Button>

      <button type="button" className={styles.reset} onClick={handleReset}>
        Clear filters
      </button>
    </form>
  )
}
