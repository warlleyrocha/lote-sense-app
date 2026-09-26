import type { Lot } from '@/features/lots/types'

export type MapFilter = 'all' | 'healthy' | 'warning' | 'critical'

// Coordenadas no espaço do mapa (ver MAP_SIZE em data/map.ts).
export type Point = { x: number; y: number }

export type Placement = Point & { lotId: string }

export type MapArea = {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
}

export type MapMarker = Placement & { lot: Lot }

// Grupo de lotes com alteração próximos entre si.
export type Hotspot = Point & { radius: number; members: MapMarker[] }
