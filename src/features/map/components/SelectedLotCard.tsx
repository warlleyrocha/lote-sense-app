import { Link } from 'react-router'
import Icon from '@/components/Icon'
import { metricLabel, statusStyles } from '@/features/lots/constants'
import type { Metric } from '@/features/lots/types'
import { formatMetric, getReferenceState } from '@/features/lots/utils'
import { mapStatusLabel } from '../constants'
import type { MapMarker } from '../types'

const metrics: { metric: Metric; icon: 'thermometer' | 'droplet' }[] = [
  { metric: 'temperature', icon: 'thermometer' },
  { metric: 'humidity', icon: 'droplet' },
]

type SelectedLotCardProps = {
  marker: MapMarker
  onClose: () => void
}

export default function SelectedLotCard({ marker, onClose }: SelectedLotCardProps) {
  const { lot } = marker
  const styles = statusStyles[lot.status]

  return (
    <article
      className={`absolute inset-x-3 bottom-3 z-40 rounded-card border p-4 shadow-card ${styles.card} ${
        lot.status === 'healthy' ? 'bg-surface' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-ink">{lot.name}</h2>
          <p className="mt-0.5 text-sm text-ink-muted">
            {lot.variety} • {lot.bags} {lot.bags === 1 ? 'saca' : 'sacas'}
          </p>
        </div>
        <button
          aria-label="Fechar detalhes do lote"
          className="-mr-1.5 -mt-1.5 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-muted"
          onClick={onClose}
          type="button"
        >
          <Icon className="size-4" name="close" />
        </button>
      </div>

      <dl className="mt-3 flex gap-6">
        {metrics.map(({ metric, icon }) => {
          const deviated = getReferenceState(metric, lot[metric]) !== 'within'
          return (
            <div className="flex items-center gap-2" key={metric}>
              <dt className="sr-only">{metricLabel[metric]}</dt>
              <Icon className={`size-5 ${deviated ? styles.text : 'text-ink-faint'}`} name={icon} />
              <dd className={`text-xl font-semibold ${deviated ? styles.text : 'text-ink'}`}>
                {formatMetric(metric, lot[metric])}
              </dd>
            </div>
          )
        })}
      </dl>

      <div className={`mt-3 flex items-center justify-between gap-3 border-t pt-3 ${styles.divider}`}>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-bold ${
            lot.status === 'healthy' ? 'bg-success-soft text-success' : styles.badge
          }`}
        >
          <span className={`size-2 rounded-full ${styles.dot}`} />
          {mapStatusLabel[lot.status]}
        </span>
        <Link className="flex items-center gap-1 text-sm font-semibold text-primary" to={`/lotes/${lot.id}`}>
          Ver detalhes
          <Icon className="size-4" name="chevron" />
        </Link>
      </div>
    </article>
  )
}
