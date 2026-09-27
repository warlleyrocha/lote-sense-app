import type { Sensor } from '@/features/sensor/types'

export type LotStatus = 'healthy' | 'warning' | 'critical'

export type Metric = 'temperature' | 'humidity'

export type EventTone = 'healthy' | 'warning' | 'neutral'

export type LotEvent = {
  time: string
  // Número da saca a que o evento se refere; ausente em eventos do lote inteiro.
  bag?: number
  lines: string[]
  status?: string
  tone: EventTone
}

// Cada saca tem o próprio sensor: é ela que é medida.
export type Bag = {
  number: number
  // Código impresso na etiqueta física da saca: é por ele que se acha a saca no armazém.
  tag: string
  sensor: Sensor
  temperature: number
  humidity: number
  status: LotStatus
  // Minutos desde a última leitura recebida; a API deve enviar o horário.
  minutesAgo: number
  peak: { temperature: number; humidity: number }
}

// O lote só agrupa as sacas: não tem leitura própria. O status é o da pior saca.
export type Lot = {
  id: string
  name: string
  kg: number
  crop: string
  variety: string
  stage: string
  bags: Bag[]
  status: LotStatus
  events: LotEvent[]
}

export type LotsSummary = {
  total: number
  healthy: number
  warning: number
  critical: number
}
