import { Link } from 'react-router'
import Icon from '@/components/Icon'
import BagRow from '@/features/lots/components/BagRow'
import { statusLabel, statusStyles } from '@/features/lots/constants'
import { bagPath } from '@/features/lots/utils'
import type { ActiveAlert } from '../types'
import { formatAlertTime } from '../utils'

export default function AlertCard({ alert }: { alert: ActiveAlert }) {
  const { lot, severity } = alert
  const styles = statusStyles[severity]
  const critical = severity === 'critical'
  const bags = lot.bags.filter((bag) => alert.bags.includes(bag.number))

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
          {formatAlertTime(alert)}
        </span>
      </div>

      <div className="mt-3">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{lot.name}</h3>
        <p className="mt-0.5 text-sm text-ink-muted">{lot.crop}</p>
      </div>

      <div className={`mt-3 divide-y border-y divide-inherit ${styles.divider}`}>
        {bags.map((bag) => (
          <BagRow bag={bag} key={bag.number} to={bagPath(lot.id, bag.number)} />
        ))}
      </div>

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
