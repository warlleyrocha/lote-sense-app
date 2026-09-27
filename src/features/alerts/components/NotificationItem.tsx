import { Link } from 'react-router'
import Icon from '@/components/Icon'
import { statusLabel, statusStyles } from '@/features/lots/constants'
import type { LotAlert } from '../types'
import { formatAlertTime } from '../utils'

export default function NotificationItem({ alert }: { alert: LotAlert }) {
  const active = alert.state === 'active'
  // Resolvidos usam o visual de "dentro do esperado".
  const styles = statusStyles[active ? alert.severity : 'healthy']

  return (
    <Link
      className={`group flex gap-3 rounded-card border p-3.5 transition-colors ${styles.card}`}
      to={`/lotes/${alert.lot.id}`}
    >
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-full ${styles.badge}`}
      >
        <Icon className="size-4" name={active ? 'alert' : 'check'} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-ink">{alert.lot.name}</p>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${styles.badge}`}
          >
            {active ? statusLabel[alert.severity] : 'Normalizado'}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-ink-muted">{alert.message}</p>
        <p className="mt-1.5 flex items-center gap-1 text-xs text-ink-faint">
          <Icon className="size-3.5" name="clock" />
          {formatAlertTime(alert)}
        </p>
      </div>
      <Icon
        className="size-4 shrink-0 self-center text-ink-faint transition-colors group-hover:text-primary"
        name="chevron"
      />
    </Link>
  )
}
