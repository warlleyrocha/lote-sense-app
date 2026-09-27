import type { LotStatus, Metric } from './types'

export const statusLabel: Record<LotStatus, string> = {
  healthy: 'Dentro do esperado',
  warning: 'Atenção',
  critical: 'Crítico',
}

export const metricLabel: Record<Metric, string> = {
  temperature: 'Temperatura',
  humidity: 'Umidade',
}

// Condições de referência para café em armazenamento. `min`/`max` delimitam a faixa ideal;
// `limit` é a tolerância: ainda aceita, mas já acima do recomendado.
export type Reference = { min?: number; max: number; limit?: number }

export const reference: Record<Metric, Reference> = {
  temperature: { min: 18, max: 22, limit: 25 },
  humidity: { min: 10.8, max: 11.2, limit: 12.5 },
}

// Classes completas (não montadas por interpolação) para o Tailwind detectá-las.
export const statusStyles: Record<
  LotStatus,
  {
    text: string
    badge: string
    card: string
    divider: string
    iconBadge: string
    stroke: string
    fill: string
    dot: string
    referenceStroke: string
  }
> = {
  healthy: {
    text: 'text-primary',
    badge: 'bg-success-soft text-success',
    card: 'border-line bg-surface',
    divider: 'border-line',
    iconBadge: 'bg-primary-soft text-primary',
    stroke: 'stroke-primary',
    fill: 'fill-primary',
    dot: 'bg-primary',
    referenceStroke: 'stroke-primary-line',
  },
  warning: {
    text: 'text-warning',
    badge: 'bg-warning-badge text-warning',
    card: 'border-warning-border bg-warning-soft',
    divider: 'border-warning-border',
    iconBadge: 'bg-warning-soft text-warning',
    stroke: 'stroke-warning',
    fill: 'fill-warning',
    dot: 'bg-warning',
    referenceStroke: 'stroke-warning-border',
  },
  critical: {
    text: 'text-critical',
    badge: 'bg-critical-badge text-critical',
    card: 'border-critical-border bg-critical-soft',
    divider: 'border-critical-border',
    iconBadge: 'bg-critical-soft text-critical',
    stroke: 'stroke-critical',
    fill: 'fill-critical',
    dot: 'bg-critical',
    referenceStroke: 'stroke-critical-border',
  },
}
