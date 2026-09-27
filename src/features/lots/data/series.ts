import type { Metric } from '../types'

// Leitura típica de um lote estável, ponto de partida das séries simuladas.
const baseline: Record<Metric, number> = { temperature: 21.0, humidity: 11.0 }

// Série simulada das últimas 24h terminando na leitura atual; trocar por dados reais quando houver API.
// A curva quadrática reproduz a elevação concentrada nas últimas horas do design.
export function mockSeries(metric: Metric, value: number, count: number) {
  const start = Math.min(value, baseline[metric])
  return Array.from({ length: count }, (_, index) => {
    const progress = (index / (count - 1)) ** 2
    return Math.round((start + (value - start) * progress) * 10) / 10
  })
}
