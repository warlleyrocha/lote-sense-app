import { Link } from 'react-router'
import Icon from '@/components/Icon'
import { statusLabel, statusStyles } from '../constants'
import type { Lot } from '../types'
import { formatHumidity, formatTemperature } from '../utils'

export default function LotCard({ lot }: { lot: Lot }) {
  const styles = statusStyles[lot.status]

  return (
    <Link
      aria-label={`Abrir detalhes de ${lot.name}`}
      className={`group block rounded-card border p-4 transition-transform active:scale-card ${styles.card}`}
      to={`/lotes/${lot.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold tracking-tight text-ink">{lot.name}</p>
            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
              {lot.status === 'healthy' && <Icon className="mr-1 inline size-3.5" name="check" />}
              {statusLabel[lot.status]}
            </span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">{lot.bags} sacas</p>
        </div>
        <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-ink-muted transition-colors group-hover:text-primary">
          <Icon className="size-4" name="chevron" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-5">
        <div className="flex items-center gap-2 text-ink">
          <Icon className="size-5 text-primary" name="thermometer" />
          <span className="text-base font-semibold">{formatTemperature(lot.temperature)}</span>
        </div>
        <div className="flex items-center gap-2 text-ink">
          <Icon className="size-5 text-primary" name="droplet" />
          <span className="text-base font-semibold">{formatHumidity(lot.humidity)}</span>
        </div>
      </div>

      {lot.status !== 'healthy' && (
        <p className={`mt-3 text-sm font-medium ${styles.text}`}>{lot.message}</p>
      )}
      <p className="mt-3 text-xs text-ink-faint">{lot.updated}</p>
    </Link>
  )
}
