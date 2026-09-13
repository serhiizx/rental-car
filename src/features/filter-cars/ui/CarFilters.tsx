'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Button, SelectField } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import { buildPriceOptions } from '../lib/priceOptions'
import { carsQueryToSearchParams } from '../lib/searchParams'
import styles from './CarFilters.module.css'

type CarFiltersProps = {
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
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

  // useState вище лише ІНІЦІАЛІЗУЄ поля з URL при першому рендері. Якщо
  // користувач переходить на /catalog іншим способом у межах того самого
  // роуту (напр. клік по "Catalog" у хедері), CarFilters не розмонтовується —
  // useState не перезапускається, і форма показує застарілі значення, хоч
  // useSearchParams() вже інша. Рядок нижче — той самий query, з якого
  // побудовано поточні поля; коли він розходиться з фактичним URL, стан
  // підганяється прямо під час рендеру (react.dev: "Adjusting state when a
  // prop changes"), без зайвого проходу через useEffect і без порушення
  // правила "фільтри застосовуються лише на Search".
  const searchParamsKey = searchParams.toString()
  const [syncedKey, setSyncedKey] = useState(searchParamsKey)
  if (searchParamsKey !== syncedKey) {
    setSyncedKey(searchParamsKey)
    setBrand(searchParams.get('brand') ?? '')
    setPrice(searchParams.get('price') ?? '')
    setMinMileage(formatMileageInput(searchParams.get('minMileage') ?? ''))
    setMaxMileage(formatMileageInput(searchParams.get('maxMileage') ?? ''))
  }

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

      <fieldset className={styles.mileage}>
        <legend className={styles.mileageLabel}>Car mileage / km</legend>
        <div className={styles.mileageInputs}>
          <label className={styles.visuallyHidden} htmlFor="minMileage">
            Mileage from
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
            Mileage to
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
      </fieldset>

      <Button type="submit" className={styles.submit}>
        Search
      </Button>

      <button type="button" className={styles.reset} onClick={handleReset}>
        Clear filters
      </button>
    </form>
  )
}
