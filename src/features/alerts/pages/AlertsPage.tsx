import { useState } from 'react'
import SegmentedControl from '@/components/SegmentedControl'
import AlertCard from '../components/AlertCard'
import ResolvedAlertCard from '../components/ResolvedAlertCard'
import { useAlerts } from '../hooks/useAlerts'
import type { AlertFilter } from '../types'

const filters: { id: AlertFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'critical', label: 'Críticos' },
  { id: 'warning', label: 'Atenção' },
  { id: 'resolved', label: 'Resolvidos' },
]

const plural = (count: number, singular: string, pluralForm: string) =>
  `${count} ${count === 1 ? singular : pluralForm}`

function EmptyState() {
  return (
    <p className="rounded-card border border-line bg-surface p-4 text-sm text-ink-muted">
      Nenhum alerta nesta categoria.
    </p>
  )
}

export default function AlertsPage() {
  const { active, resolved, counts } = useAlerts()
  const [filter, setFilter] = useState<AlertFilter>('all')

  const visibleActive =
    filter === 'all' ? active : active.filter((alert) => alert.severity === filter)
  const showActive = filter !== 'resolved'
  const showResolved = filter === 'all' || filter === 'resolved'

  return (
    <>
      <header className="px-page pb-5 pt-5">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Alertas</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          {counts.all > 0 ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-critical-badge px-3 py-1.5 text-sm font-semibold text-critical">
              <span className="size-2 rounded-full bg-critical" />
              {plural(counts.all, 'alerta ativo', 'alertas ativos')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-sm font-semibold text-success">
              <span className="size-2 rounded-full bg-success" />
              Nenhum alerta ativo
            </span>
          )}
          {counts.all > 0 && (
            <span className="text-sm text-ink-muted">
              {plural(counts.critical, 'crítico', 'críticos')} • {counts.warning} em atenção
            </span>
          )}
        </div>
      </header>

      <section className="px-page">
        <SegmentedControl label="Filtrar alertas" onChange={setFilter} options={filters} value={filter} />
      </section>

      {showActive && (
        <section className="mt-6 px-page">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-section text-ink-faint">
            Ativos ({visibleActive.length})
          </h2>
          {visibleActive.length > 0 ? (
            <div className="space-y-3">
              {visibleActive.map((alert) => (
                <AlertCard alert={alert} key={alert.id} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      )}

      {showResolved && (
        <section className="mt-6 px-page">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-section text-ink-faint">
            Resolvidos ({resolved.length})
          </h2>
          {resolved.length > 0 ? (
            <div className="space-y-2">
              {resolved.map((alert) => (
                <ResolvedAlertCard alert={alert} key={alert.id} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </section>
      )}
    </>
  )
}
