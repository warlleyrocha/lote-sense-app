import { Link, useParams } from 'react-router'
import Icon from '@/components/Icon'
import ScreenHeader from '@/components/ScreenHeader'
import BagRow from '../components/BagRow'
import LotNotFound from '../components/LotNotFound'
import { statusLabel, statusStyles } from '../constants'
import { useLot } from '../hooks/useLot'
import {
  affectedBags,
  bagLabel,
  bagPath,
  countOnlineSensors,
  describeLot,
  describeSpread,
} from '../utils'

export default function LotDetailPage() {
  const { id } = useParams()
  const lot = useLot(id)

  if (!lot) return <LotNotFound />

  const styles = statusStyles[lot.status]
  const healthy = lot.status === 'healthy'
  const online = countOnlineSensors(lot)
  const allOnline = online === lot.bags.length
  // Sacas que pedem atenção primeiro; as demais pela numeração da etiqueta.
  const affected = affectedBags(lot)
  const bags = [...affected, ...lot.bags.filter((bag) => !affected.includes(bag))]

  return (
    <>
      <ScreenHeader
        backLabel="Voltar para a Home"
        backTo="/inicio"
        subtitle="Detalhes do lote"
        title={lot.name}
      />

      <div className="space-y-6 px-page py-5">
        <section>
          <p className="text-sm font-semibold text-ink">{lot.crop}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {lot.bags.length} sacas • aproximadamente {lot.kg} kg
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary">
              {lot.stage}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted ring-1 ring-line">
              <span className={`size-1.5 rounded-full ${allOnline ? 'bg-online' : 'bg-line-strong'}`} />
              {allOnline ? `${online} sensores online` : `${online} de ${lot.bags.length} sensores online`}
            </span>
          </div>
        </section>

        <section className={`rounded-card border p-5 ${styles.card}`}>
          <div className="flex items-center gap-3">
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${styles.badge}`}>
              <Icon name={healthy ? 'check' : 'alert'} />
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-section ${styles.text}`}>
                {statusLabel[lot.status]}
              </p>
              <p className="mt-0.5 text-base font-semibold text-ink">{describeLot(lot)}</p>
            </div>
          </div>
          <p className={`mt-4 border-t pt-4 text-sm leading-relaxed ${styles.divider} ${styles.text}`}>
            {describeSpread(lot)}
          </p>
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-ink">Sacas</h2>
            <p className="mt-1 text-sm text-ink-muted">Cada saca tem o próprio sensor</p>
          </div>
          <div className="divide-y divide-line rounded-card border border-line bg-surface px-4">
            {bags.map((bag) => (
              <BagRow bag={bag} key={bag.number} to={bagPath(lot.id, bag.number)} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">Histórico recente</h2>
            <Icon className="size-5 text-ink-faint" name="history" />
          </div>
          <div className="rounded-card border border-line bg-surface px-4">
            {lot.events.slice(0, 3).map((event, index, list) => (
              <div
                className={`flex gap-4 py-4 ${index < list.length - 1 ? 'border-b border-line' : ''}`}
                key={`${event.time}-${event.bag ?? 'lote'}`}
              >
                <span className="w-event-time shrink-0 text-sm font-semibold text-ink">{event.time}</span>
                <div className="flex gap-3">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      event.tone === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`}
                  />
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {event.bag !== undefined && (
                      <span className="font-semibold text-ink">{bagLabel(event.bag)}: </span>
                    )}
                    {event.lines.join(' / ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3 pb-2">
          <Link
            className="flex items-center justify-center gap-2 rounded-inner bg-primary px-4 py-4 text-sm font-semibold text-surface transition-colors hover:bg-primary-hover"
            to={`/lotes/${lot.id}/historico`}
          >
            <Icon className="size-5" name="history" />
            Ver histórico completo
          </Link>
        </section>
      </div>
    </>
  )
}
