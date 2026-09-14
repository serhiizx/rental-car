'use client'

import { useFormik } from 'formik'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button, SelectField } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'
import { buildPriceOptions } from '../lib/priceOptions'
import { carsQueryToSearchParams } from '../lib/searchParams'
import {
  carFiltersInitialValues,
  carFiltersSchema,
  mileageToNumber,
  type CarFiltersValues,
} from '../model/filtersSchema'
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

  const formik = useFormik<CarFiltersValues>({
    enableReinitialize: true,
    initialValues: {
      brand: searchParams.get('brand') ?? '',
      price: searchParams.get('price') ?? '',
      minMileage: formatMileageInput(searchParams.get('minMileage') ?? ''),
      maxMileage: formatMileageInput(searchParams.get('maxMileage') ?? ''),
    },
    validationSchema: carFiltersSchema,
    onSubmit: (values) => {
      const params = carsQueryToSearchParams({
        brand: values.brand || undefined,
        price: values.price ? Number(values.price) : undefined,
        minMileage: mileageToNumber(values.minMileage),
        maxMileage: mileageToNumber(values.maxMileage),
      })

      const queryString = params.toString()
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      })
    },
  })

  const brandOptions: SelectOption[] = brands.map((item) => ({
    value: item,
    label: item,
  }))

  const priceOptions = buildPriceOptions(priceRange.min, priceRange.max)

  const mileageError = formik.touched.maxMileage
    ? formik.errors.maxMileage
    : undefined

  function handleReset() {
    formik.resetForm({ values: carFiltersInitialValues })
    router.replace(pathname, { scroll: false })
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
        <div className={styles.brandField}>
          <SelectField
            name="brand"
            label="Car brand"
            placeholder="Choose a brand"
            value={formik.values.brand}
            onChange={(value) => formik.setFieldValue('brand', value)}
            options={brandOptions}
          />
        </div>

        <div className={styles.priceField}>
          <SelectField
            name="price"
            label="Price / 1 hour"
            placeholder="Choose a price"
            value={formik.values.price}
            onChange={(value) => formik.setFieldValue('price', value)}
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
              value={
                formik.values.minMileage
                  ? `From ${formik.values.minMileage}`
                  : ''
              }
              placeholder="From"
              onBlur={formik.handleBlur}
              onChange={(event) =>
                formik.setFieldValue(
                  'minMileage',
                  formatMileageInput(event.target.value),
                )
              }
            />
            <label className={styles.visuallyHidden} htmlFor="maxMileage">
              Mileage to
            </label>
            <input
              id="maxMileage"
              className={`${styles.mileageInput} ${styles.mileageTo}`}
              name="maxMileage"
              value={
                formik.values.maxMileage ? `To ${formik.values.maxMileage}` : ''
              }
              placeholder="To"
              aria-invalid={Boolean(mileageError)}
              aria-describedby={mileageError ? 'mileage-error' : undefined}
              onBlur={formik.handleBlur}
              onChange={(event) =>
                formik.setFieldValue(
                  'maxMileage',
                  formatMileageInput(event.target.value),
                )
              }
            />
          </div>
          {mileageError ? (
            <p id="mileage-error" className={styles.error}>
              {mileageError}
            </p>
          ) : null}
        </fieldset>

        <div className={styles.submitContainer}>
          <Button type="submit" className={styles.submit}>
            Search
          </Button>
          <button type="button" className={styles.reset} onClick={handleReset}>
            Clear filters
          </button>
        </div>
      </form>
    </div>
  )
}
