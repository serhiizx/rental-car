import assert from 'node:assert/strict'
import { test } from 'node:test'
import { carFiltersSchema } from './filtersSchema.ts'

function isValid(minMileage: string, maxMileage: string) {
  return carFiltersSchema.isValidSync({ minMileage, maxMileage })
}

test('carFiltersSchema відхиляє перевернутий діапазон пробігу', () => {
  assert.equal(isValid('5,000', '1,000'), false)
})

test('carFiltersSchema пропускає коректний і неповний діапазон', () => {
  assert.equal(isValid('1,000', '5,000'), true)
  assert.equal(isValid('1,000', '1,000'), true)
  assert.equal(isValid('', '1,000'), true)
  assert.equal(isValid('1,000', ''), true)
})
