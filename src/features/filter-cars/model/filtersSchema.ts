import * as Yup from 'yup'

export type CarFiltersValues = {
  brand: string
  price: string
  minMileage: string
  maxMileage: string
}

export const carFiltersInitialValues: CarFiltersValues = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
}

export function mileageToNumber(value: string): number | undefined {
  return Number(value.replace(/\D/g, '')) || undefined
}

export const carFiltersSchema = Yup.object({
  maxMileage: Yup.string().test(
    'mileage-range',
    'Mileage “To” must be greater than “From”.',
    function (value) {
      const from = mileageToNumber(String(this.parent.minMileage ?? ''))
      const to = mileageToNumber(value ?? '')
      return !from || !to || to >= from
    },
  ),
})
