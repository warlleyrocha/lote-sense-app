import { useLots } from '@/features/lots/hooks/useLots'
import { alerts } from '../data/alerts'
import type { ActiveAlert, AlertFilter, ResolvedAlert } from '../types'

export function useAlerts() {
  // Único ponto de acesso aos alertas: trocar por chamada de API aqui.
  const { lots } = useLots()
  const active: ActiveAlert[] = []
  const resolved: ResolvedAlert[] = []

  for (const alert of alerts) {
    const lot = lots.find((item) => item.id === alert.lotId)
    if (!lot) continue
    if (alert.state === 'active') active.push({ ...alert, lot })
    else resolved.push({ ...alert, lot })
  }

  // Críticos primeiro; dentro da mesma severidade, mantém a ordem de detecção.
  active.sort((a, b) => Number(b.severity === 'critical') - Number(a.severity === 'critical'))

  const counts: Record<AlertFilter, number> = {
    all: active.length,
    critical: active.filter((alert) => alert.severity === 'critical').length,
    warning: active.filter((alert) => alert.severity === 'warning').length,
    resolved: resolved.length,
  }

  return { active, resolved, counts }
}
