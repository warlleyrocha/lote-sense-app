import { NEARBY_RADIUS } from './data/map'
import type { Hotspot, MapFilter, MapMarker, Point } from './types'

// Espaço além da borda do lote mais distante do centro do grupo.
const HOTSPOT_PADDING = 30

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

export const isAltered = (marker: MapMarker) => marker.lot.status !== 'healthy'

export const matchesFilter = (marker: MapMarker, filter: MapFilter) =>
  filter === 'all' || marker.lot.status === filter

// Outros lotes com alteração a até `radius` do lote informado.
export function nearbyAltered(marker: MapMarker, markers: MapMarker[], radius = NEARBY_RADIUS) {
  return markers.filter(
    (other) => other.lotId !== marker.lotId && isAltered(other) && distance(marker, other) <= radius,
  )
}

// Agrupa lotes com alteração encadeando os vizinhos; só interessam grupos de 2 ou mais.
export function findHotspots(markers: MapMarker[], radius = NEARBY_RADIUS): Hotspot[] {
  const pending = markers.filter(isAltered)
  const hotspots: Hotspot[] = []

  while (pending.length > 0) {
    const members = [pending.pop()!]
    for (let i = 0; i < members.length; i++) {
      for (let j = pending.length - 1; j >= 0; j--) {
        if (distance(members[i], pending[j]) <= radius) members.push(...pending.splice(j, 1))
      }
    }
    if (members.length < 2) continue

    const center = {
      x: members.reduce((sum, member) => sum + member.x, 0) / members.length,
      y: members.reduce((sum, member) => sum + member.y, 0) / members.length,
    }
    const reach = Math.max(...members.map((member) => distance(center, member)))
    hotspots.push({ ...center, radius: reach + HOTSPOT_PADDING, members })
  }

  return hotspots
}
