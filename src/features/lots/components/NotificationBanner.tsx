import { Link } from 'react-router'
import Icon from '@/components/Icon'
import type { Lot } from '../types'

export default function NotificationBanner({ lot }: { lot?: Lot }) {
  if (!lot) {
    return (
      <div className="mt-3 rounded-card border border-line bg-surface p-3 text-sm text-ink-muted">
        Nenhuma notificação no momento.
      </div>
    )
  }

  return (
    <Link
      className="mt-3 flex items-center gap-3 rounded-card border border-warning-border bg-warning-soft p-3"
      to={`/lotes/${lot.id}`}
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-warning-badge text-warning">
        <Icon className="size-4" name="alert" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">{lot.name} precisa de atenção</p>
        <p className="mt-0.5 text-xs text-ink-muted">{lot.message}.</p>
      </div>
    </Link>
  )
}
