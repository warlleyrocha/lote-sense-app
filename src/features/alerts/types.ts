import type { Lot, LotStatus, Metric } from '@/features/lots/types'

export type AlertSeverity = Extract<LotStatus, 'critical' | 'warning'>

type AlertBase = {
  id: string
  lotId: string
  // Indicadores que saíram (ou voltaram) da faixa de referência.
  metrics: Metric[]
  message: string
  // Minutos desde a detecção (ativo) ou a normalização (resolvido); a API deve enviar o horário.
  minutesAgo: number
}

export type Alert =
  | (AlertBase & { state: 'active'; severity: AlertSeverity })
  | (AlertBase & { state: 'resolved' })

export type ActiveAlert = Extract<Alert, { state: 'active' }> & { lot: Lot }

export type ResolvedAlert = Extract<Alert, { state: 'resolved' }> & { lot: Lot }

export type LotAlert = ActiveAlert | ResolvedAlert

export type AlertFilter = 'all' | 'critical' | 'warning' | 'resolved'
