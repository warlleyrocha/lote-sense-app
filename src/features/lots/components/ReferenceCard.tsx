import Icon from '@/components/Icon'
import { formatReference } from '../utils'

export default function ReferenceCard({ crop, stage }: { crop: string; stage: string }) {
  return (
    <div className="rounded-card border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-section text-ink-faint">
            Condições de referência
          </p>
          <p className="mt-1.5 text-sm font-semibold text-ink">{crop}</p>
        </div>
        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
          {stage}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2.5 rounded-inner bg-muted p-3">
          <Icon className="size-5 text-primary" name="thermometer" />
          <div>
            <p className="text-xs text-ink-faint">Temperatura</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{formatReference('temperature')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-inner bg-muted p-3">
          <Icon className="size-5 text-primary" name="droplet" />
          <div>
            <p className="text-xs text-ink-faint">Umidade</p>
            <p className="mt-0.5 text-sm font-semibold text-ink">{formatReference('humidity')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
