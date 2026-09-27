import { metricLabel, statusStyles } from '../constants'
import { mockSeries } from '../data/series'
import type { LotStatus, Metric } from '../types'
import MetricChart from './MetricChart'

type HistoryChartProps = {
  metric: Metric
  value: number
  status: LotStatus
}

export default function HistoryChart({ metric, value, status }: HistoryChartProps) {
  const styles = statusStyles[status]

  return (
    <div className="mt-4">
      <MetricChart
        ariaLabel={`Evolução da ${metricLabel[metric].toLowerCase()} nas últimas 24 horas`}
        className="h-history-chart"
        height={180}
        metric={metric}
        referenceStyle="band"
        smooth
        status={status}
        values={mockSeries(metric, value, 13)}
      />
      <div className="mt-4 flex items-center gap-4 text-xs text-ink-muted">
        <span className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${styles.dot}`} />
          Medição
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-reference bg-primary-soft ring-1 ring-primary-line" />
          Faixa adequada
        </span>
      </div>
    </div>
  )
}
