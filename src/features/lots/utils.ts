import { reference } from './constants'
import type { Metric } from './types'

const number = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export const formatTemperature = (value: number) => `${number.format(value)} °C`

export const formatHumidity = (value: number) => `${number.format(value)}%`

export const formatMetric = (metric: Metric, value: number) =>
  metric === 'temperature' ? formatTemperature(value) : formatHumidity(value)

export function formatReference(metric: Metric) {
  const { min, max } = reference[metric]
  return metric === 'temperature' ? `${min}–${max} °C` : `${min}–${max}%`
}

export type ReferenceState = 'above' | 'below' | 'within'

export function getReferenceState(metric: Metric, value: number): ReferenceState {
  const { min, max } = reference[metric]
  if (value > max) return 'above'
  if (value < min) return 'below'
  return 'within'
}

export const referenceStateLabel: Record<ReferenceState, string> = {
  above: 'Acima da referência',
  below: 'Abaixo da referência',
  within: 'Dentro da referência',
}
