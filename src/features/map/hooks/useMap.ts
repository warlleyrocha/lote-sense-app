import { useLots } from '@/features/lots/hooks/useLots'
import { areas, placements } from '../data/map'
import type { MapMarker } from '../types'
import { findHotspots } from '../utils'

export function useMap() {
  // Único ponto de acesso ao mapa: trocar por chamada de API aqui.
  const { lots } = useLots()
  const markers: MapMarker[] = []

  for (const placement of placements) {
    const lot = lots.find((item) => item.id === placement.lotId)
    if (lot) markers.push({ ...placement, lot })
  }

  return { markers, areas, hotspots: findHotspots(markers) }
}
