import { metricLabel, statusStyles } from '../constants'
import type { LotStatus, Metric } from '../types'
import { formatMetric, formatReference } from '../utils'
import ReferenceHint from './ReferenceHint'

// Séries estáticas do design; trocar por dados reais quando houver API.
const series: Record<Metric, { points: string; lastY: number }> = {
  temperature: { points: '14,76 56,73 98,69 140,66 182,58 224,48 266,34 308,19', lastY: 19 },
  humidity: { points: '14,77 56,75 98,72 140,68 182,61 224,51 266,37 308,20', lastY: 20 },
}

type TrendChartProps = {
  metric: Metric
  value: number
  status: LotStatus
}

export default function TrendChart({ metric, value, status }: TrendChartProps) {
  const styles = statusStyles[status]
  const { points, lastY } = series[metric]
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
        <svg
          aria-label={`Gráfico de tendência de ${label.toLowerCase()}`}
          className="h-chart w-full overflow-visible"
          role="img"
          viewBox="0 0 322 96"
        >
          <path className="stroke-line" d="M14 20H308M14 49H308M14 78H308" strokeWidth="1" />
          <path
            className={styles.referenceStroke}
            d="M14 55H308"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <polyline
            className={`fill-none ${styles.stroke}`}
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          <circle className={`fill-surface ${styles.stroke}`} cx="308" cy={lastY} r="4.5" strokeWidth="3" />
        </svg>
        <div className="mt-1 flex items-center justify-between text-xs text-ink-faint">
          <span>13h atrás</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 border-t border-dashed border-warning-border" />
            Referência: {formatReference(metric)}
            <ReferenceHint metric={metric} />
          </span>
          <span>Agora</span>
        </div>
      </div>
    </div>
  )
}
