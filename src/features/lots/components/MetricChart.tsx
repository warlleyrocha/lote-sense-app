import { reference, statusStyles } from '../constants'
import type { LotStatus, Metric } from '../types'
import { formatAxisValue } from '../utils'

const WIDTH = 330
const PADDING = { top: 8, right: 8, bottom: 24, left: 44 }

// Eixo X: 24h divididas em quatro intervalos de 6h, terminando na leitura atual.
const xTicks = ['-24h', '-18h', '-12h', '-6h', 'Agora']

// Primeiro e último rótulos alinhados às bordas para não vazarem da área do gráfico.
function xTickAnchor(index: number) {
  if (index === 0) return 'start'
  if (index === xTicks.length - 1) return 'end'
  return 'middle'
}

// Escala "redonda" (passos de 1, 2 ou 5 × 10ⁿ) cobrindo o intervalo com cerca de `count` divisões.
function niceTicks(low: number, high: number, count: number) {
  const raw = (high - low) / count || 1
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 5, 10].map((factor) => factor * magnitude).find((candidate) => candidate >= raw)!
  const first = Math.floor(low / step)
  const last = Math.ceil(high / step)
  // Arredonda para evitar ruído de ponto flutuante (ex.: 10.799999).
  return Array.from({ length: last - first + 1 }, (_, index) => Math.round((first + index) * step * 100) / 100)
}

// Catmull-Rom convertido em Bézier cúbica: curva suave passando por todos os pontos.
function smoothPath(points: [number, number][]) {
  return points.reduce((d, [x, y], index) => {
    if (index === 0) return `M${x} ${y}`
    const [x0, y0] = points[index - 2] ?? points[index - 1]
    const [x1, y1] = points[index - 1]
    const [x3, y3] = points[index + 1] ?? [x, y]
    const c1 = `${x1 + (x - x0) / 6} ${y1 + (y - y0) / 6}`
    const c2 = `${x - (x3 - x1) / 6} ${y - (y3 - y1) / 6}`
    return `${d} C${c1}, ${c2}, ${x} ${y}`
  }, '')
}

const linearPath = (points: [number, number][]) =>
  points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')

type MetricChartProps = {
  metric: Metric
  values: number[]
  status: LotStatus
  height: number
  className: string
  ariaLabel: string
  // `band`: faixa de referência preenchida; `lines`: apenas os limites tracejados.
  referenceStyle: 'band' | 'lines'
  smooth?: boolean
  yTickCount?: number
}

export default function MetricChart({
  metric,
  values,
  status,
  height,
  className,
  ariaLabel,
  referenceStyle,
  smooth = false,
  yTickCount = 4,
}: MetricChartProps) {
  const styles = statusStyles[status]
  const { min, max } = reference[metric]

  const yTicks = niceTicks(
    Math.min(...values, min ?? max),
    Math.max(...values, max),
    yTickCount,
  )
  const yMin = yTicks[0]
  const yMax = yTicks[yTicks.length - 1]
  const yDecimals = yTicks.some((tick) => !Number.isInteger(tick)) ? 1 : 0

  const plotLeft = PADDING.left
  const plotRight = WIDTH - PADDING.right
  const plotTop = PADDING.top
  const plotBottom = height - PADDING.bottom

  const x = (fraction: number) => plotLeft + fraction * (plotRight - plotLeft)
  const y = (value: number) => plotBottom - ((value - yMin) / (yMax - yMin)) * (plotBottom - plotTop)

  const points = values.map((value, index): [number, number] => [x(index / (values.length - 1)), y(value)])
  const [lastX, lastY] = points[points.length - 1]
  const referenceTop = y(max)
  const referenceBottom = y(min ?? yMin)
  const referenceLines = [referenceTop, ...(min === undefined ? [] : [referenceBottom])]
    .map((lineY) => `M${plotLeft} ${lineY}H${plotRight}`)
    .join('')

  return (
    <svg
      aria-label={ariaLabel}
      className={`w-full overflow-visible ${className}`}
      role="img"
      viewBox={`0 0 ${WIDTH} ${height}`}
    >
      {yTicks.map((tick) => (
        <g key={tick}>
          <path className="stroke-line" d={`M${plotLeft} ${y(tick)}H${plotRight}`} strokeWidth="1" />
          <text
            className="fill-ink-faint"
            dominantBaseline="middle"
            fontSize="11"
            textAnchor="end"
            x={plotLeft - 6}
            y={y(tick)}
          >
            {formatAxisValue(metric, tick, yDecimals)}
          </text>
        </g>
      ))}

      {referenceStyle === 'band' && (
        <rect
          className="fill-primary-soft"
          height={referenceBottom - referenceTop}
          rx="4"
          width={plotRight - plotLeft}
          x={plotLeft}
          y={referenceTop}
        />
      )}
      <path
        className={referenceStyle === 'band' ? 'stroke-primary-line' : styles.referenceStroke}
        d={referenceLines}
        strokeDasharray="4 4"
        strokeWidth={referenceStyle === 'band' ? 1 : 1.5}
      />

      <path
        className={`fill-none ${styles.stroke}`}
        d={smooth ? smoothPath(points) : linearPath(points)}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={smooth ? 3.5 : 3}
      />
      <circle className={`fill-surface ${styles.stroke}`} cx={lastX} cy={lastY} r="4.5" strokeWidth="3" />

      {xTicks.map((tick, index) => (
        <text
          className="fill-ink-faint"
          fontSize="11"
          key={tick}
          textAnchor={xTickAnchor(index)}
          x={x(index / (xTicks.length - 1))}
          y={height - 7}
        >
          {tick}
        </text>
      ))}
    </svg>
  )
}
