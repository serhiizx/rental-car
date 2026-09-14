import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  formatAddress,
  formatCarId,
  formatCarTitle,
  formatMileage,
  formatPrice,
} from './format.ts'

test('formatMileage додає розділювач тисяч і одиницю', () => {
  assert.equal(formatMileage(6234), '6 234 km')
  assert.equal(formatMileage(999), '999 km')
  assert.equal(formatMileage(1000), '1 000 km')
  assert.equal(formatMileage(5), '5 km')
})

test('formatPrice додає знак долара', () => {
  assert.equal(formatPrice('50'), '$50')
})

test('formatAddress бере місто й країну', () => {
  assert.equal(
    formatAddress({
      country: 'Ukraine',
      city: 'Kharkiv',
      address: '321 Example Lane',
    }),
    'Kharkiv, Ukraine',
  )
})

test('formatCarTitle склеює бренд, модель і рік', () => {
  assert.equal(
    formatCarTitle({ brand: 'Kia', model: 'Rio', year: 2020 }),
    'Kia Rio, 2020',
  )
})

test('formatCarId бере перші чотири символи без дефісів', () => {
  assert.equal(formatCarId('e58adcfb-4b16-413d-9380-52a025a66db2'), 'Id: e58a')
})
