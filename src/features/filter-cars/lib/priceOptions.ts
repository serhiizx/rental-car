import type { SelectOption } from '@/shared/ui'

const PRICE_STEP = 10

export function buildPriceOptions(min: number, max: number): SelectOption[] {
  if (max <= 0 || max < min) {
    return []
  }

  const options: SelectOption[] = []
  const start = Math.ceil(min / PRICE_STEP) * PRICE_STEP

  for (let value = start; value <= max; value += PRICE_STEP) {
    options.push({ value: String(value), label: `To $${value}` })
  }

  if (options.at(-1)?.value !== String(max)) {
    options.push({ value: String(max), label: `To $${max}` })
  }

  return options
}
