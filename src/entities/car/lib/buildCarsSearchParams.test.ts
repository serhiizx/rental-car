import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildCarsSearchParams } from './buildCarsSearchParams.ts'

test('завжди передає page та perPage', () => {
  const params = buildCarsSearchParams({}, 3)
  assert.equal(params.get('page'), '3')
  assert.equal(params.get('perPage'), '12')
})

test('додає всі задані фільтри', () => {
  const params = buildCarsSearchParams(
    { brand: 'Kia', price: 50, minMileage: 1000, maxMileage: 8000 },
    1,
  )
  assert.equal(params.get('brand'), 'Kia')
  assert.equal(params.get('price'), '50')
  assert.equal(params.get('minMileage'), '1000')
  assert.equal(params.get('maxMileage'), '8000')
})

test('пропускає незадані фільтри', () => {
  const params = buildCarsSearchParams({ brand: 'Kia' }, 1)
  assert.equal(params.has('price'), false)
  assert.equal(params.has('minMileage'), false)
  assert.equal(params.has('maxMileage'), false)
})

test('пропускає нуль у пробігу, бо це не фільтр', () => {
  const params = buildCarsSearchParams({ minMileage: 0 }, 1)
  assert.equal(params.has('minMileage'), false)
})
