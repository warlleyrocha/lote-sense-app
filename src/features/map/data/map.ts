import type { MapArea, Placement } from '../types'

// O mapa é um desenho esquemático da propriedade, não uma projeção geográfica.
export const MAP_SIZE = { width: 390, height: 560 }

// Distância máxima (em unidades do mapa) para dois lotes serem considerados vizinhos.
export const NEARBY_RADIUS = 80

export const areas: MapArea[] = [
  { id: 'a', name: 'Talhão A', x: 24, y: 82, width: 176, height: 148 },
  { id: 'b', name: 'Talhão B', x: 212, y: 82, width: 154, height: 148 },
  { id: 'c', name: 'Talhão C', x: 80, y: 250, width: 230, height: 150 },
  { id: 'd', name: 'Talhão D', x: 24, y: 420, width: 342, height: 96 },
]

// A situação de cada lote vem de lots.ts; aqui só a posição.
export const placements: Placement[] = [
  { lotId: '01', x: 60, y: 130 },
  { lotId: '02', x: 140, y: 122 },
  { lotId: '04', x: 75, y: 194 },
  { lotId: '05', x: 155, y: 188 },
  { lotId: '06', x: 255, y: 134 },
  { lotId: '07', x: 300, y: 165 },
  { lotId: '12', x: 275, y: 200 },
  { lotId: '03', x: 150, y: 340 },
  { lotId: '08', x: 200, y: 300 },
  { lotId: '11', x: 255, y: 350 },
  { lotId: '09', x: 95, y: 470 },
  { lotId: '10', x: 290, y: 475 },
]
