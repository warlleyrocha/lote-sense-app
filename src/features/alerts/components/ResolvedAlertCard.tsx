import { Link } from 'react-router'
import Icon from '@/components/Icon'
import { formatBagList } from '@/features/lots/utils'
import type { ResolvedAlert } from '../types'
import { formatAlertTime } from '../utils'

export default function ResolvedAlertCard({ alert }: { alert: ResolvedAlert }) {
  return (
    <Link
      aria-label={`Abrir detalhes de ${alert.lot.name}`}
      className="group flex items-center gap-3 rounded-card border border-line bg-surface p-3.5"
      to={`/lotes/${alert.lot.id}`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
        <Icon className="size-4" name="check" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">
          {alert.lot.name} • {formatBagList(alert.bags)}
        </p>
        <p className="mt-0.5 text-sm text-ink-muted">{alert.message}</p>
        <p className="mt-1 text-xs text-ink-faint">{formatAlertTime(alert)}</p>
      </div>
      <Icon className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-primary" name="chevron" />
    </Link>
  )
}
