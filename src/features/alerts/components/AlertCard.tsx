import { Link } from 'react-router'
import Icon from '@/components/Icon'
import { metricLabel, statusLabel, statusStyles } from '@/features/lots/constants'
import type { Metric } from '@/features/lots/types'
import { formatMetric, getReferenceState, referenceStateLabel } from '@/features/lots/utils'
import type { ActiveAlert } from '../types'

const metrics: { metric: Metric; icon: 'thermometer' | 'droplet' }[] = [
  { metric: 'temperature', icon: 'thermometer' },
  { metric: 'humidity', icon: 'droplet' },
]

export default function AlertCard({ alert }: { alert: ActiveAlert }) {
  const { lot, severity } = alert
  const styles = statusStyles[severity]
  const critical = severity === 'critical'

  return (
    <article
      className={`relative overflow-hidden rounded-card border p-4 ${critical ? 'pl-5' : ''} ${styles.card}`}
    >
      {critical && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-critical" />}

      <div className="flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-section ${
            critical ? 'bg-critical text-surface' : styles.badge
          }`}
        >
          <Icon className="size-3.5" name="alert" />
          {statusLabel[severity]}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-ink-muted">
          <Icon className="size-3.5" name="history" />
          {alert.time}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{lot.name}</h3>
        <p className="mt-0.5 text-sm text-ink-muted">{lot.crop}</p>
      </div>

      <dl className={`mt-4 grid grid-cols-2 gap-3 border-y py-3 ${styles.divider}`}>
        {metrics.map(({ metric, icon }, index) => {
          const value = lot[metric]
          const deviated = alert.metrics.includes(metric)
          return (
            <div className={index > 0 ? `border-l pl-3 ${styles.divider}` : ''} key={metric}>
              <dt className="flex items-center gap-1.5 text-xs text-ink-muted">
                <Icon className={`size-4 ${deviated ? styles.text : 'text-ink-faint'}`} name={icon} />
                {metricLabel[metric]}
              </dt>
              <dd className={`mt-1 text-xl font-semibold ${deviated ? styles.text : 'text-ink'}`}>
                {formatMetric(metric, value)}
              </dd>
              {deviated && (
                <dd className={`mt-0.5 text-xs font-medium ${styles.text}`}>
                  {referenceStateLabel[getReferenceState(metric, value)]}
                </dd>
              )}
            </div>
          )
        })}
      </dl>

      <p className={`mt-3 text-sm font-medium ${styles.text}`}>“{alert.message}”</p>

      <Link
        className={`mt-4 flex items-center justify-center gap-1.5 rounded-inner px-4 py-3 text-sm font-semibold transition-colors ${
          critical
            ? 'bg-critical text-surface hover:opacity-90'
            : 'border border-warning-border bg-surface text-warning hover:bg-warning-soft'
        }`}
        to={`/lotes/${lot.id}`}
      >
        Ver lote
        <Icon className="size-4" name="chevron" />
      </Link>
    </article>
  )
}
