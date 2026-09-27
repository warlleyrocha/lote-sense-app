import { metricLabel, statusStyles } from '../constants'
import { mockSeries } from '../data/series'
import type { LotStatus, Metric } from '../types'
import { formatMetric, formatReference } from '../utils'
import MetricChart from './MetricChart'
import ReferenceHint from './ReferenceHint'

type TrendChartProps = {
  metric: Metric
  value: number
  status: LotStatus
}

export default function TrendChart({ metric, value, status }: TrendChartProps) {
  const styles = statusStyles[status]
  const label = metricLabel[metric]

  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{label}</p>
          <p className="mt-1 text-xs text-ink-faint">Evolução ao longo do dia</p>
        </div>
        <div className="text-right">
          <p className={`text-base font-semibold ${styles.text}`}>{formatMetric(metric, value)}</p>
          <p className="text-xs text-ink-faint">agora</p>
        </div>
      </div>
      <div className="mt-4">
        <MetricChart
          ariaLabel={`Gráfico de tendência de ${label.toLowerCase()}`}
          className="h-chart"
          height={112}
          metric={metric}
          referenceStyle="lines"
          status={status}
          values={mockSeries(metric, value, 8)}
          yTickCount={3}
        />
        <div className="mt-2 flex items-center justify-center text-xs text-ink-faint">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 border-t border-dashed border-warning-border" />
            Referência: {formatReference(metric)}
            <ReferenceHint metric={metric} />
          </span>
        </div>
      </div>
    </div>
  )
}
