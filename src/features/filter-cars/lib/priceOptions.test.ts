import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildPriceOptions } from './priceOptions.ts'

test('buildPriceOptions будує опції з кроком $10', () => {
  const options = buildPriceOptions(30, 80)
  assert.deepEqual(
    options.map((option) => option.value),
    ['30', '40', '50', '60', '70', '80'],
  )
  assert.equal(options.at(-1)?.label, 'To $80')
})

test('buildPriceOptions додає некратну верхню межу окремою опцією', () => {
  const options = buildPriceOptions(30, 85)
  assert.deepEqual(
    options.map((option) => option.value),
    ['30', '40', '50', '60', '70', '80', '85'],
  )
  assert.equal(options.at(-1)?.label, 'To $85')
})
