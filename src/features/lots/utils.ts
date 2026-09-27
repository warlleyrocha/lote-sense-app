import { reference } from './constants'
import type { Metric } from './types'

const number = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

// Referências sem casa decimal fixa: "25 °C", "10,8%".
const referenceNumber = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })

export const formatTemperature = (value: number) => `${number.format(value)} °C`

export const formatHumidity = (value: number) => `${number.format(value)}%`

export const formatMetric = (metric: Metric, value: number) =>
  metric === 'temperature' ? formatTemperature(value) : formatHumidity(value)

const unit: Record<Metric, string> = { temperature: ' °C', humidity: '%' }

export const formatReferenceValue = (metric: Metric, value: number) =>
  `${referenceNumber.format(value)}${unit[metric]}`

export function formatReference(metric: Metric) {
  const { min, max } = reference[metric]
  if (min === undefined) return `até ${formatReferenceValue(metric, max)}`
  return `${referenceNumber.format(min)}–${formatReferenceValue(metric, max)}`
}

export type ReferenceState = 'above' | 'below' | 'tolerance' | 'within'

export function getReferenceState(metric: Metric, value: number): ReferenceState {
  const { min, max, limit } = reference[metric]
  if (value > (limit ?? max)) return 'above'
  if (value > max) return 'tolerance'
  if (min !== undefined && value < min) return 'below'
  return 'within'
}

// Tolerância não é desvio: o valor passou do ideal, mas não do limite.
export const isDeviation = (state: ReferenceState) => state === 'above' || state === 'below'

export const referenceStateLabel: Record<ReferenceState, string> = {
  above: 'Acima da referência',
  below: 'Abaixo da referência',
  tolerance: 'Dentro da tolerância',
  within: 'Dentro da referência',
}
