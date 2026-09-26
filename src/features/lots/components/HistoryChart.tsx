import { metricLabel, statusStyles } from '../constants'
import type { LotStatus, Metric } from '../types'

// Curvas estáticas do design; trocar por dados reais quando houver API.
const series: Record<Metric, { d: string; lastY: number; markerY: number }> = {
  temperature: {
    d: 'M12 120 C42 116, 62 113, 89 110 S132 106, 156 101 S194 92, 216 80 S248 62, 267 48 S297 30, 318 18',
    lastY: 18,
    markerY: 80,
  },
  humidity: {
    d: 'M12 124 C39 121, 65 117, 91 114 S133 109, 157 103 S194 96, 216 84 S246 68, 267 52 S296 33, 318 20',
    lastY: 20,
    markerY: 84,
  },
}

type HistoryChartProps = {
  metric: Metric
  status: LotStatus
}

export default function HistoryChart({ metric, status }: HistoryChartProps) {
  const styles = statusStyles[status]
  const { d, lastY, markerY } = series[metric]

  return (
    <div className="mt-4">
      <svg
        aria-label={`Evolução da ${metricLabel[metric].toLowerCase()} nas últimas 24 horas`}
        className="h-history-chart w-full overflow-visible"
        role="img"
        viewBox="0 0 330 180"
      >
        <path className="stroke-line" d="M12 22H318M12 67H318M12 112H318M12 157H318" strokeWidth="1" />
        <rect className="fill-primary-soft" height="51" rx="4" width="306" x="12" y="78" />
        <path
          className="stroke-primary-line"
          d="M12 78H318M12 129H318"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <path
          className={`fill-none ${styles.stroke}`}
          d={d}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5"
        />
        <circle className={`fill-surface ${styles.stroke}`} cx="318" cy={lastY} r="5" strokeWidth="3" />
        <circle className={styles.fill} cx="216" cy={markerY} r="4" />
      </svg>
      <div className="mt-2 flex items-center justify-between text-xs text-ink-faint">
        <span>14:00</span>
        <span>20:00</span>
        <span>02:00</span>
        <span>08:00</span>
        <span>Agora</span>
      </div>
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
