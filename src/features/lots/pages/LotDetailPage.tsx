import { Link, useParams } from 'react-router'
import Icon from '@/components/Icon'
import ScreenHeader from '@/components/ScreenHeader'
import LotNotFound from '../components/LotNotFound'
import ReferenceHint from '../components/ReferenceHint'
import TrendChart from '../components/TrendChart'
import { metricLabel, statusLabel, statusStyles } from '../constants'
import { useLot } from '../hooks/useLot'
import type { Metric } from '../types'
import {
  formatMetric,
  formatReference,
  getReferenceState,
  isDeviation
} from '../utils'

const metrics: { metric: Metric; icon: 'thermometer' | 'droplet' }[] = [
  { metric: 'temperature', icon: 'thermometer' },
  { metric: 'humidity', icon: 'droplet' },
]

export default function LotDetailPage() {
  const { id } = useParams()
  const lot = useLot(id)

  if (!lot) return <LotNotFound />

  const styles = statusStyles[lot.status]
  const healthy = lot.status === 'healthy'
  const readings = metrics.map(({ metric, icon }) => {
    const value = lot[metric]
    return { metric, icon, value, state: getReferenceState(metric, value) }
  })
  const deviating = readings.filter((reading) => isDeviation(reading.state))
  const deviationText = deviating
    .map((reading, index) => {
      const label = metricLabel[reading.metric]
      return index === 0 ? label : label.toLowerCase()
    })
    .join(' e ')

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
            {lot.bags} sacas • aproximadamente {lot.kg} kg
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary">
              {lot.stage}
            </span>
            <Link
              aria-label={`Ver detalhes do sensor ${lot.device.code}`}
              className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted ring-1 ring-line"
              to={`/lotes/${lot.id}/sensor`}
            >
              <span className={`size-1.5 rounded-full ${lot.device.online ? 'bg-online' : 'bg-line-strong'}`} />
              {lot.device.code} • {lot.device.online ? 'Online' : 'Offline'}
              <Icon className="size-3.5 text-ink-faint" name="chevron" />
            </Link>
          </div>
        </section>

        <section className={`rounded-card border p-5 ${styles.card}`}>
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-full ${styles.badge}`}>
              <Icon name={healthy ? 'check' : 'alert'} />
            </div>
            <div>
              <p className={`text-xs font-bold uppercase tracking-section ${styles.text}`}>
                {statusLabel[lot.status]}
              </p>
              <p className="mt-0.5 text-base font-semibold text-ink">
                {healthy ? 'Condições dentro da faixa esperada' : 'Condições fora da faixa esperada'}
              </p>
            </div>
          </div>

          <div className={`mt-5 grid grid-cols-2 gap-3 border-y py-4 ${styles.divider}`}>
            {readings.map((reading, index) => (
              <div className={index > 0 ? `border-l pl-4 ${styles.divider}` : ''} key={reading.metric}>
                <p className="text-xs text-ink-muted">{metricLabel[reading.metric]}</p>
                <p className="mt-1 text-xl font-semibold text-ink">
                  {formatMetric(reading.metric, reading.value)}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-ink-faint">
                  Referência: {formatReference(reading.metric)}
                  <ReferenceHint align={index > 0 ? 'end' : 'start'} metric={reading.metric} />
                </p>
              </div>
            ))}
          </div>
          <p className={`mt-4 text-sm leading-relaxed ${styles.text}`}>
            {deviating.length === 0
              ? 'Temperatura e umidade dentro das condições de referência.'
              : `${deviationText} ${
                  deviating.every((reading) => reading.state === 'above') ? 'acima das' : 'fora das'
                } condições de referência.`}
          </p>
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-lg font-semibold text-ink">Últimas 24 horas</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {healthy ? 'Condições estáveis nas últimas horas' : 'Tendência de elevação nas últimas horas'}
            </p>
          </div>
          <div className="space-y-3">
            {readings.map((reading) => (
              <TrendChart key={reading.metric} metric={reading.metric} status={lot.status} value={reading.value} />
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
                key={event.time}
              >
                <span className="w-event-time shrink-0 text-sm font-semibold text-ink">{event.time}</span>
                <div className="flex gap-3">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      event.tone === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`}
                  />
                  <p className="text-sm leading-relaxed text-ink-muted">{event.lines.join(' / ')}</p>
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
