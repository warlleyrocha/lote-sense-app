export type LotStatus = 'healthy' | 'warning' | 'critical'

export type Metric = 'temperature' | 'humidity'

export type EventTone = 'healthy' | 'warning' | 'neutral'

export type LotEvent = {
  time: string
  lines: string[]
  status?: string
  tone: EventTone
}

export type Lot = {
  id: string
  name: string
  bags: number
  kg: number
  crop: string
  variety: string
  stage: string
  device: { code: string; online: boolean }
  temperature: number
  humidity: number
  status: LotStatus
  message: string
  updated: string
  peak: { temperature: number; humidity: number }
  events: LotEvent[]
}

export type LotsSummary = {
  total: number
  healthy: number
  warning: number
  critical: number
}
