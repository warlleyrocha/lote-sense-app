import Icon from '@/components/Icon'
import type { MenuRow } from '../types'

function RowContent({ row }: { row: MenuRow }) {
  return (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon className="size-4.5" name={row.icon} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{row.label}</p>
        <p className="truncate text-sm text-ink-muted">{row.value}</p>
      </div>
      <Icon className="size-4 shrink-0 text-ink-faint" name="chevron" />
    </>
  )
}

export default function MenuSection({ title, rows }: { title: string; rows: readonly MenuRow[] }) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-section text-ink-faint">{title}</h2>
      <div className="divide-y divide-line rounded-card border border-line bg-surface px-4">
        {rows.map((row) =>
          row.onSelect ? (
            <button
              className="flex w-full cursor-pointer items-center gap-3 py-3.5 text-left"
              key={row.label}
              onClick={row.onSelect}
              type="button"
            >
              <RowContent row={row} />
            </button>
          ) : (
            <div className="flex items-center gap-3 py-3.5" key={row.label}>
              <RowContent row={row} />
            </div>
          ),
        )}
      </div>
    </section>
  )
}
