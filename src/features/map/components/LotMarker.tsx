import { statusLabel } from '@/features/lots/constants'
import { markerStyles } from '../constants'
import type { MapMarker } from '../types'

type LotMarkerProps = {
  marker: MapMarker
  selected: boolean
  dimmed: boolean
  onSelect: () => void
}

export default function LotMarker({ marker, selected, dimmed, onSelect }: LotMarkerProps) {
  const { lot } = marker
  const critical = lot.status === 'critical'

  return (
    <span
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-opacity ${
        selected ? 'z-30' : critical ? 'z-20' : 'z-10'
      } ${dimmed ? 'opacity-25' : ''}`}
    >
      {critical && (
        <span
          aria-hidden="true"
          className="absolute size-11 rounded-full bg-critical/40 motion-safe:animate-ping"
        />
      )}
      <button
        aria-label={`${lot.name}, ${statusLabel[lot.status]}`}
        aria-pressed={selected}
        className={`relative flex cursor-pointer items-center justify-center rounded-full border-2 border-surface font-bold tabular-nums shadow-segment transition-transform disabled:cursor-default ${
          critical ? 'text-sm' : 'text-xs'
        } ${markerStyles[lot.status]} ${selected ? 'scale-125 ring-4 ring-ink/25' : ''}`}
        disabled={dimmed}
        onClick={(event) => {
          event.stopPropagation()
          onSelect()
        }}
        type="button"
      >
        {lot.id}
      </button>
    </span>
  )
}
