import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { MAP_SIZE } from '../data/map'
import type { Hotspot, MapArea, MapFilter, MapMarker } from '../types'
import { matchesFilter } from '../utils'
import LotMarker from './LotMarker'
import MapControls from './MapControls'

const ZOOM_LEVELS = [1, 1.6, 2.4]
// Deslocamento (em px) a partir do qual o toque vira arraste e não seleção.
const DRAG_THRESHOLD = 4

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const percent = (value: number, total: number) => `${(value / total) * 100}%`

// Mantém o centro da vista dentro do mapa para nunca aparecer área vazia.
const clampCenter = (value: number, zoom: number) => clamp(value, 0.5 / zoom, 1 - 0.5 / zoom)

type View = { level: number; cx: number; cy: number }

const initialView: View = { level: 0, cx: 0.5, cy: 0.5 }

type MapCanvasProps = {
  areas: MapArea[]
  markers: MapMarker[]
  hotspots: Hotspot[]
  filter: MapFilter
  selectedId: string | null
  onSelect: (lotId: string | null) => void
  children?: ReactNode
}

export default function MapCanvas({
  areas,
  markers,
  hotspots,
  filter,
  selectedId,
  onSelect,
  children,
}: MapCanvasProps) {
  const [view, setView] = useState<View>(initialView)
  const [dragging, setDragging] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; cx: number; cy: number; moved: boolean } | null>(null)
  const justDragged = useRef(false)

  const zoom = ZOOM_LEVELS[view.level]
  const { width, height } = MAP_SIZE
  const offsetX = clamp(0.5 - view.cx * zoom, 1 - zoom, 0)
  const offsetY = clamp(0.5 - view.cy * zoom, 1 - zoom, 0)

  const selectedMarker = markers.find((marker) => marker.lotId === selectedId)

  // Ao aproximar, o foco vai para o lote selecionado; ao afastar, mantém o centro atual.
  const changeZoom = (step: number) =>
    setView((current) => {
      const level = clamp(current.level + step, 0, ZOOM_LEVELS.length - 1)
      const next = ZOOM_LEVELS[level]
      const focus = step > 0 && selectedMarker ? { cx: selectedMarker.x / width, cy: selectedMarker.y / height } : current
      return { level, cx: clampCenter(focus.cx, next), cy: clampCenter(focus.cy, next) }
    })

  const handleSelect = (marker: MapMarker) => {
    if (justDragged.current) return
    onSelect(marker.lotId)
    if (zoom > 1) {
      setView((current) => ({
        ...current,
        cx: clampCenter(marker.x / width, zoom),
        cy: clampCenter(marker.y / height, zoom),
      }))
    }
  }

  const handlePointerDown = (event: PointerEvent) => {
    justDragged.current = false
    if (zoom === 1) return
    drag.current = { x: event.clientX, y: event.clientY, cx: view.cx, cy: view.cy, moved: false }
  }

  const handlePointerMove = (event: PointerEvent) => {
    const start = drag.current
    const rect = viewportRef.current?.getBoundingClientRect()
    if (!start || !rect) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (!start.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
    start.moved = true
    justDragged.current = true
    setDragging(true)
    setView((current) => ({
      ...current,
      cx: clampCenter(start.cx - dx / rect.width / zoom, zoom),
      cy: clampCenter(start.cy - dy / rect.height / zoom, zoom),
    }))
  }

  const endDrag = () => {
    drag.current = null
    setDragging(false)
  }

  return (
    <div className="relative aspect-[39/56] w-full overflow-hidden bg-muted">
      <div
        className={`absolute inset-0 ${zoom > 1 ? 'cursor-grab touch-none' : 'touch-pan-y'} ${
          dragging ? 'cursor-grabbing' : ''
        }`}
        onClick={() => {
          if (!justDragged.current) onSelect(null)
        }}
        onPointerCancel={endDrag}
        onPointerDown={handlePointerDown}
        onPointerLeave={endDrag}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        ref={viewportRef}
      >
        <div
          className={`absolute inset-0 origin-top-left ${dragging ? '' : 'transition-transform duration-300 ease-out'}`}
          style={{ transform: `translate(${offsetX * 100}%, ${offsetY * 100}%) scale(${zoom})` }}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full"
            viewBox={`0 0 ${width} ${height}`}
          >
            <path
              className="fill-surface stroke-line-strong"
              d="M14 46 L250 30 L376 52 L378 520 L200 542 L12 526 Z"
              strokeDasharray="6 5"
              strokeLinejoin="round"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="stroke-muted"
              d="M14 240 H378 M14 410 H378 M206 40 V240 M45 240 V410"
              fill="none"
              strokeLinecap="round"
              strokeWidth={8}
            />
            {areas.map((area) => (
              <g key={area.id}>
                <rect
                  className="fill-primary-soft stroke-primary-pale"
                  height={area.height}
                  rx={14}
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                  width={area.width}
                  x={area.x}
                  y={area.y}
                />
                <text
                  className="fill-ink-faint font-semibold uppercase"
                  fontSize={9}
                  letterSpacing="0.08em"
                  x={area.x + 12}
                  y={area.y + 18}
                >
                  {area.name}
                </text>
              </g>
            ))}
            {filter !== 'healthy' &&
              hotspots.map((hotspot) => (
                <circle
                  className="fill-warning-light/25 stroke-warning"
                  cx={hotspot.x}
                  cy={hotspot.y}
                  key={hotspot.members.map((member) => member.lotId).join('-')}
                  r={hotspot.radius}
                  strokeDasharray="5 4"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
          </svg>

          {markers.map((marker) => (
            <span
              className="absolute"
              key={marker.lotId}
              style={{
                left: percent(marker.x, width),
                top: percent(marker.y, height),
                // Contrabalança o zoom para os marcadores manterem o tamanho.
                transform: `scale(${1 / zoom})`,
              }}
            >
              <LotMarker
                dimmed={!matchesFilter(marker, filter)}
                marker={marker}
                onSelect={() => handleSelect(marker)}
                selected={marker.lotId === selectedId}
              />
            </span>
          ))}
        </div>
      </div>

      <MapControls
        canZoomIn={view.level < ZOOM_LEVELS.length - 1}
        canZoomOut={view.level > 0}
        onLocate={() => setView(initialView)}
        onZoomIn={() => changeZoom(1)}
        onZoomOut={() => changeZoom(-1)}
      />
      {children}
    </div>
  )
}
