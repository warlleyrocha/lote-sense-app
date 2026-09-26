import Icon from '@/components/Icon'
import type { EventTone, LotEvent } from '../types'

const dotClass: Record<EventTone, string> = {
  warning: 'bg-warning',
  healthy: 'bg-primary',
  neutral: 'bg-line-strong',
}

export default function EventTimeline({ events }: { events: LotEvent[] }) {
  return (
    <div className="relative ml-2 border-l border-line pl-6">
      {events.map((event, index) => (
        <article className={`relative ${index < events.length - 1 ? 'pb-6' : ''}`} key={event.time}>
          <span
            className={`absolute -left-timeline-dot size-3 rounded-full ring-4 ring-canvas ${dotClass[event.tone]}`}
          />
          <p className="text-xs font-semibold text-ink-faint">{event.time}</p>
          <div className="mt-2 rounded-card border border-line bg-surface p-4">
            {event.lines.map((line) => (
              <p className="text-sm font-medium leading-relaxed text-ink" key={line}>
                {line}
              </p>
            ))}
            {event.status && (
              <p
                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                  event.tone === 'warning' ? 'text-warning' : 'text-primary'
                }`}
              >
                <Icon className="size-3.5" name={event.tone === 'warning' ? 'alert' : 'check'} />
                {event.status}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
