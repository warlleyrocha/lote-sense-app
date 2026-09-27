import { useLots } from '@/features/lots/hooks/useLots'
import { alerts } from '../data/alerts'
import type { ActiveAlert, AlertFilter, LotAlert, ResolvedAlert } from '../types'

const byRecency = (a: LotAlert, b: LotAlert) => a.minutesAgo - b.minutesAgo

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

  // Críticos primeiro; dentro da mesma severidade, o mais recente primeiro.
  active.sort(
    (a, b) =>
      Number(b.severity === 'critical') - Number(a.severity === 'critical') || byRecency(a, b),
  )
  resolved.sort(byRecency)

  // Notificações: ativos e resolvidos numa só linha do tempo, do mais recente ao mais antigo.
  const timeline: LotAlert[] = [...active, ...resolved].sort(byRecency)

  const counts: Record<AlertFilter, number> = {
    all: active.length,
    critical: active.filter((alert) => alert.severity === 'critical').length,
    warning: active.filter((alert) => alert.severity === 'warning').length,
    resolved: resolved.length,
  }

  return { active, resolved, timeline, counts }
}
