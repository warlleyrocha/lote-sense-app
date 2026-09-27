import { reference } from './constants'
import type { Bag, Lot, LotStatus, Metric } from './types'

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

// Rótulos de eixo com casas decimais fixas para a escala ficar alinhada: "10,8%", "11,0%".
export const formatAxisValue = (metric: Metric, value: number, decimals: number) =>
  `${value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${unit[metric]}`

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

const statusRank: Record<LotStatus, number> = { healthy: 0, warning: 1, critical: 2 }

// O lote só agrupa: seu status é o da saca em pior situação.
export const worstStatus = (statuses: LotStatus[]) =>
  statuses.reduce<LotStatus>((worst, status) => (statusRank[status] > statusRank[worst] ? status : worst), 'healthy')

export const bagLabel = (number: number) => `Saca ${number}`

// "Saca 2", "Sacas 1 e 3", "Sacas 1, 2 e 4".
export function formatBagList(numbers: number[]) {
  if (numbers.length === 1) return bagLabel(numbers[0])
  return `Sacas ${numbers.slice(0, -1).join(', ')} e ${numbers[numbers.length - 1]}`
}

// Sacas fora do esperado, da pior para a melhor; empate pela numeração.
export const affectedBags = (lot: Lot) =>
  lot.bags
    .filter((bag) => bag.status !== 'healthy')
    .sort((a, b) => statusRank[b.status] - statusRank[a.status] || a.number - b.number)

export const deviatingMetrics = (bag: Bag): Metric[] =>
  (['temperature', 'humidity'] as const).filter((metric) =>
    isDeviation(getReferenceState(metric, bag[metric])),
  )

export function describeLot(lot: Lot) {
  const affected = affectedBags(lot)
  if (affected.length === 0) return 'Todas as sacas dentro do esperado'
  if (affected.length === lot.bags.length) return `Todas as ${lot.bags.length} sacas fora da referência`
  return `${formatBagList(affected.map((bag) => bag.number))} fora da referência`
}

// Horário da leitura mais recente entre os sensores do lote.
export function formatLastUpdate(lot: Lot) {
  const minutes = Math.min(...lot.bags.map((bag) => bag.minutesAgo))
  return minutes === 0 ? 'Atualizado agora' : `Atualizado há ${minutes} min`
}

export const countOnlineSensors = (lot: Lot) => lot.bags.filter((bag) => bag.sensor.online).length

export const bagPath = (lotId: string, number: number) => `/lotes/${lotId}/sacas/${number}`

// Onde o desvio aparece diz de onde ele vem: todas as sacas juntas apontam para o ambiente;
// uma parte delas, para as próprias sacas.
export function describeSpread(lot: Lot) {
  const affected = affectedBags(lot)
  if (affected.length === 0) return 'Temperatura e umidade dentro das condições de referência em todas as sacas.'
  if (affected.length === lot.bags.length && lot.bags.length > 1)
    return 'O desvio aparece em todas as sacas ao mesmo tempo, o que indica uma condição do ambiente de armazenamento.'
  const tags = affected.map((bag) => bag.tag).join(', ')
  const plural = affected.length > 1
  return `O desvio está concentrado ${plural ? 'nas' : 'na'} ${formatBagList(affected.map((bag) => bag.number))}; as demais seguem dentro da referência. Localize ${plural ? 'pelas etiquetas' : 'pela etiqueta'} ${tags}.`
}
