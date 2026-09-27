import { useState } from 'react'
import ScreenHeader from '@/components/ScreenHeader'
import SegmentedControl from '@/components/SegmentedControl'
import LotCard from '../components/LotCard'
import { useLots } from '../hooks/useLots'
import type { LotStatus } from '../types'

type LotFilter = 'all' | LotStatus

const filters: { id: LotFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'critical', label: 'Críticos' },
  { id: 'warning', label: 'Atenção' },
  { id: 'healthy', label: 'Normais' },
]

export default function LotsPage() {
  const { lots, summary } = useLots()
  const [filter, setFilter] = useState<LotFilter>('all')

  // A lista já vem na ordem de prioridade; o filtro só recorta por status.
  const visibleLots = filter === 'all' ? lots : lots.filter((lot) => lot.status === filter)

  return (
    <>
      <ScreenHeader
        backLabel="Voltar para a Home"
        backTo="/inicio"
        subtitle={`${summary.total} nano-lotes monitorados`}
        title="Nano-lotes"
      />

      <section className="px-page pt-5">
        <SegmentedControl label="Filtrar nano-lotes" onChange={setFilter} options={filters} value={filter} />
      </section>

      <section className="mt-6 px-page">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-section text-ink-faint">
          {filters.find((option) => option.id === filter)?.label} ({visibleLots.length})
        </h2>
        {visibleLots.length > 0 ? (
          <div className="space-y-3">
            {visibleLots.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        ) : (
          <p className="rounded-card border border-line bg-surface p-4 text-sm text-ink-muted">
            Nenhum nano-lote nesta categoria.
          </p>
        )}
      </section>
    </>
  )
}
