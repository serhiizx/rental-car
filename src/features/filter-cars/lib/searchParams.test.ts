import assert from 'node:assert/strict'
import { test } from 'node:test'
import { carsQueryToSearchParams, parseCarsQuery } from './searchParams.ts'

test('parseCarsQuery читає всі фільтри', () => {
  const query = parseCarsQuery({
    brand: 'Kia',
    price: '50',
    minMileage: '1000',
    maxMileage: '8000',
  })
  assert.deepEqual(query, {
    brand: 'Kia',
    price: 50,
    minMileage: 1000,
    maxMileage: 8000,
  })
})

test('parseCarsQuery ігнорує порожні й нечислові значення', () => {
  const query = parseCarsQuery({
    brand: '',
    price: 'abc',
    minMileage: undefined,
  })
  assert.deepEqual(query, {})
})

test('parseCarsQuery бере перше значення з масиву', () => {
  const query = parseCarsQuery({ brand: ['Kia', 'Audi'] })
  assert.deepEqual(query, { brand: 'Kia' })
})

test('carsQueryToSearchParams пропускає незадані фільтри', () => {
  const params = carsQueryToSearchParams({ brand: 'Kia', price: 50 })
  assert.equal(params.toString(), 'brand=Kia&price=50')
})

test('carsQueryToSearchParams на порожньому фільтрі дає порожній рядок', () => {
  assert.equal(carsQueryToSearchParams({}).toString(), '')
})
