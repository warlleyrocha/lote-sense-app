import { useState } from 'react'
import Icon from '@/components/Icon'
import SegmentedControl from '@/components/SegmentedControl'
import MapCanvas from '../components/MapCanvas'
import SelectedLotCard from '../components/SelectedLotCard'
import { useMap } from '../hooks/useMap'
import type { MapFilter } from '../types'
import { matchesFilter, nearbyAltered } from '../utils'

const filters: { id: MapFilter; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'healthy', label: 'Normais' },
  { id: 'warning', label: 'Atenção' },
  { id: 'critical', label: 'Críticos' },
]

const listFormat = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' })

export default function MapPage() {
  const { areas, markers, hotspots } = useMap()
  const [filter, setFilter] = useState<MapFilter>('all')
  // Abre com o lote mais crítico selecionado, para o problema aparecer sem cliques.
  const [selectedId, setSelectedId] = useState<string | null>(
    () => markers.find((marker) => marker.lot.status === 'critical')?.lotId ?? null,
  )

  const selected = markers.find((marker) => marker.lotId === selectedId)
  const focus =
    selected ??
    markers.find((marker) => marker.lot.status === 'critical') ??
    markers.find((marker) => marker.lot.status === 'warning')
  const nearby = focus ? nearbyAltered(focus, markers) : []

  const changeFilter = (next: MapFilter) => {
    setFilter(next)
    if (selected && !matchesFilter(selected, next)) setSelectedId(null)
  }

  return (
    <>
      <header className="px-page pb-4 pt-5">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Mapa</h1>
        <p className="mt-1 text-sm text-ink-muted">{markers.length} nano-lotes monitorados</p>
      </header>

      <section className="px-page pb-3">
        <SegmentedControl label="Filtrar nano-lotes no mapa" onChange={changeFilter} options={filters} value={filter} />
      </section>

      <section className="border-y border-line">
        <MapCanvas
          areas={areas}
          filter={filter}
          hotspots={hotspots}
          markers={markers}
          onSelect={setSelectedId}
          selectedId={selected?.lotId ?? null}
        >
          {filter !== 'healthy' && nearby.length > 0 && (
            <div
              className="absolute inset-x-3 top-3 z-40 flex items-start gap-2 rounded-inner border border-warning-border bg-warning-soft px-3 py-2 shadow-segment"
              role="status"
            >
              <Icon className="mt-0.5 size-4 shrink-0 text-warning" name="alert" />
              <div>
                <p className="text-sm font-semibold text-warning">
                  {nearby.length} {nearby.length === 1 ? 'lote próximo apresenta' : 'lotes próximos apresentam'} alterações.
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {nearby.length === 1 ? 'Lote' : 'Lotes'} {listFormat.format(nearby.map((marker) => marker.lot.id))}
                </p>
              </div>
            </div>
          )}
          {selected && <SelectedLotCard marker={selected} onClose={() => setSelectedId(null)} />}
        </MapCanvas>
      </section>
    </>
  )
}
