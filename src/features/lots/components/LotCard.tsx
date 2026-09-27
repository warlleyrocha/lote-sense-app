import { Link } from 'react-router'
import Icon from '@/components/Icon'
import { statusLabel, statusStyles } from '../constants'
import type { Lot } from '../types'
import { affectedBags, countOnlineSensors, describeLot, formatLastUpdate } from '../utils'
import BagRow from './BagRow'
import BagStrip from './BagStrip'

export default function LotCard({ lot }: { lot: Lot }) {
  const styles = statusStyles[lot.status]
  const affected = affectedBags(lot)
  const offline = lot.bags.length - countOnlineSensors(lot)

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
          <p className="mt-1 text-sm text-ink-muted">{lot.bags.length} sacas</p>
        </div>
        <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-ink-muted transition-colors group-hover:text-primary">
          <Icon className="size-4" name="chevron" />
        </div>
      </div>

      <div className="mt-4">
        <BagStrip bags={lot.bags} />
      </div>

      {affected.length > 0 && (
        <>
          <p className={`mt-3 text-sm font-medium ${styles.text}`}>{describeLot(lot)}</p>
          <div className={`mt-1 divide-y border-t ${styles.divider} divide-inherit`}>
            {affected.map((bag) => (
              <BagRow bag={bag} key={bag.number} />
            ))}
          </div>
        </>
      )}

      {offline > 0 && (
        <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-ink-muted">
          <Icon className="size-3.5" name="signal" />
          {offline === 1 ? '1 sensor sem comunicação' : `${offline} sensores sem comunicação`}
        </p>
      )}
      <p className="mt-3 text-xs text-ink-faint">{formatLastUpdate(lot)}</p>
    </Link>
  )
}
