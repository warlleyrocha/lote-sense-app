import { statusLabel } from '../constants'
import type { Bag, LotStatus } from '../types'
import { bagLabel } from '../utils'

// Classes completas (não montadas por interpolação) para o Tailwind detectá-las.
const pillClass: Record<LotStatus, string> = {
  healthy: 'bg-success-soft text-success',
  warning: 'bg-warning-badge text-warning',
  critical: 'bg-critical text-surface',
}

// Uma marca por saca, na ordem da numeração, colorida pelo status de cada uma.
export default function BagStrip({ bags }: { bags: Bag[] }) {
  return (
    <ul aria-label="Status das sacas" className="flex gap-1.5">
      {bags.map((bag) => {
        const offline = !bag.sensor.online
        return (
          <li
            aria-label={`${bagLabel(bag.number)}: ${offline ? 'sensor sem comunicação' : statusLabel[bag.status]}`}
            className={`flex h-7 min-w-9 items-center justify-center rounded-segment px-2 text-xs font-semibold tabular-nums ${
              offline ? 'bg-muted text-ink-faint ring-1 ring-line-strong ring-inset' : pillClass[bag.status]
            }`}
            key={bag.number}
          >
            S{bag.number}
          </li>
        )
      })}
    </ul>
  )
}
