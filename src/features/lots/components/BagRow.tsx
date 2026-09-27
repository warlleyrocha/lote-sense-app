import { Link } from 'react-router'
import Icon from '@/components/Icon'
import { statusStyles } from '../constants'
import type { Bag, Metric } from '../types'
import { bagLabel, deviatingMetrics, formatMetric } from '../utils'

const metrics: { metric: Metric; icon: 'thermometer' | 'droplet' }[] = [
  { metric: 'temperature', icon: 'thermometer' },
  { metric: 'humidity', icon: 'droplet' },
]

// Leitura de uma saca em uma linha. Com `to`, vira link para a saca (não usar dentro de outro link).
export default function BagRow({ bag, to }: { bag: Bag; to?: string }) {
  const styles = statusStyles[bag.status]
  const deviating = deviatingMetrics(bag)
  const offline = !bag.sensor.online

  const content = (
    <>
      <span className={`size-2 shrink-0 rounded-full ${offline ? 'bg-line-strong' : styles.dot}`} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">{bagLabel(bag.number)}</p>
        <p className={`text-xs ${offline ? 'font-medium text-ink-muted' : 'text-ink-faint'}`}>
          {offline ? 'Sensor sem comunicação' : bag.tag}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-sm font-semibold tabular-nums">
        {metrics.map(({ metric, icon }) => {
          const deviated = deviating.includes(metric)
          return (
            <span className={`flex items-center gap-1 ${deviated ? styles.text : 'text-ink'}`} key={metric}>
              <Icon className={`size-4 ${deviated ? '' : 'text-primary'}`} name={icon} />
              {formatMetric(metric, bag[metric])}
            </span>
          )
        })}
      </div>
    </>
  )

  if (!to) return <div className="flex items-center gap-3 py-3">{content}</div>

  return (
    <Link
      aria-label={`Abrir ${bagLabel(bag.number)} (etiqueta ${bag.tag})`}
      className="group flex items-center gap-3 py-3.5"
      to={to}
    >
      {content}
      <Icon className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-primary" name="chevron" />
    </Link>
  )
}
