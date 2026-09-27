import { useState } from 'react'
import { useParams } from 'react-router'
import ScreenHeader from '@/components/ScreenHeader'
import SegmentedControl from '@/components/SegmentedControl'
import EventTimeline from '../components/EventTimeline'
import HistoryChart from '../components/HistoryChart'
import LotNotFound from '../components/LotNotFound'
import ReferenceHint from '../components/ReferenceHint'
import { metricLabel, statusStyles } from '../constants'
import { useLot } from '../hooks/useLot'
import type { Metric } from '../types'
import { formatHumidity, formatMetric, formatReference, formatTemperature } from '../utils'

const periods = [
  { id: '24h', label: '24h' },
  { id: '7d', label: '7 dias' },
  { id: '30d', label: '30 dias' },
]

const metrics: { id: Metric; label: string }[] = [
  { id: 'temperature', label: metricLabel.temperature },
  { id: 'humidity', label: metricLabel.humidity },
]

export default function LotHistoryPage() {
  const { id } = useParams()
  const lot = useLot(id)
  const [period, setPeriod] = useState('24h')
  const [metric, setMetric] = useState<Metric>('temperature')

  if (!lot) return <LotNotFound />

  const styles = statusStyles[lot.status]

  return (
    <>
      <ScreenHeader
        backLabel="Voltar para detalhes"
        backTo={`/lotes/${lot.id}`}
        subtitle={lot.name}
        title="Histórico"
      />

      <div className="space-y-6 px-page py-5">
        <section>
          <p className="text-sm font-semibold text-ink">{lot.crop}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {lot.bags} sacas • {lot.kg} kg
          </p>
          <span className="mt-3 inline-flex rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary">
            Etapa: {lot.stage}
          </span>
        </section>

        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-section text-ink-faint">Período</p>
          <SegmentedControl label="Período" onChange={setPeriod} options={periods} value={period} />
        </section>

        <section className="rounded-card border border-line bg-surface p-4">
          <h2 className="text-lg font-semibold text-ink">Condições nas últimas 24h</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {lot.status === 'healthy'
              ? 'As condições se mantiveram estáveis no período.'
              : 'O desvio começou nas últimas horas do período.'}
          </p>

          <SegmentedControl
            className="mt-4"
            label="Métrica"
            onChange={setMetric}
            options={metrics}
            value={metric}
          />

          <div className="mt-5 flex items-start justify-between">
            <div>
              <p className="text-xs text-ink-faint">Valor atual</p>
              <p className={`mt-1 text-2xl font-semibold ${styles.text}`}>
                {formatMetric(metric, lot[metric])}
              </p>
            </div>
            <div className="rounded-inner bg-primary-soft px-3 py-2 text-right">
              <p className="flex items-center justify-end gap-1 text-xs font-medium text-primary">
                Faixa de referência
                <ReferenceHint align="end" metric={metric} />
              </p>
              <p className="mt-0.5 text-sm font-semibold text-primary">{formatReference(metric)}</p>
            </div>
          </div>

          <HistoryChart metric={metric} status={lot.status} />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Eventos registrados</h2>
          <EventTimeline events={lot.events} />
        </section>

        <section className="rounded-card border border-line bg-surface p-4">
          <p className="text-sm font-semibold text-ink">Resumo do período</p>
          <div className="mt-4 grid grid-cols-3 divide-x divide-line">
            <div className="pr-3">
              <p className="text-xs leading-tight text-ink-faint">Período monitorado</p>
              <p className="mt-2 text-base font-semibold text-ink">24 horas</p>
            </div>
            <div className="px-3">
              <p className="text-xs leading-tight text-ink-faint">Maior temperatura</p>
              <p className={`mt-2 text-base font-semibold ${styles.text}`}>
                {formatTemperature(lot.peak.temperature)}
              </p>
            </div>
            <div className="pl-3">
              <p className="text-xs leading-tight text-ink-faint">Maior umidade</p>
              <p className={`mt-2 text-base font-semibold ${styles.text}`}>
                {formatHumidity(lot.peak.humidity)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
