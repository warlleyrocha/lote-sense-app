import type { Lot, LotEvent, LotsSummary } from '../types'
import {
  formatHumidity,
  formatTemperature,
  getReferenceState,
  isDeviation,
  referenceStateLabel,
} from '../utils'

const CROP = 'Café Arábica — Catuaí Vermelho'
const VARIETY = 'Catuaí Vermelho'
const STAGE = 'Armazenamento'

// Evento de leitura com status derivado da referência (temperatura até 25 °C;
// umidade ideal 10,8–11,2%, tolerância até 12,5%).
const reading = (time: string, temperature: number, humidity: number): LotEvent => {
  const states = [
    getReferenceState('temperature', temperature),
    getReferenceState('humidity', humidity),
  ]
  const deviating = states.some(isDeviation)
  return {
    time,
    lines: [`Temperatura: ${formatTemperature(temperature)}`, `Umidade: ${formatHumidity(humidity)}`],
    status: deviating
      ? referenceStateLabel.above
      : referenceStateLabel[states.includes('tolerance') ? 'tolerance' : 'within'],
    tone: deviating ? 'warning' : 'healthy',
  }
}

// Lotes dentro da referência: só variam sacas, leituras e o horário da última atualização.
const healthyLot = (
  id: string,
  bags: number,
  temperature: number,
  humidity: number,
  minutesAgo: number,
): Lot => ({
  id,
  name: `Nano Lote ${id}`,
  bags,
  kg: bags * 60,
  crop: CROP,
  variety: VARIETY,
  stage: STAGE,
  device: { code: `LoteSense-${id.padStart(3, '0')}`, online: true },
  temperature,
  humidity,
  status: 'healthy',
  message: 'Dentro do esperado',
  updated: `Atualizado há ${minutesAgo} min`,
  peak: {
    temperature: Math.round((temperature + 0.3) * 10) / 10,
    humidity: Math.round((humidity + 0.1) * 10) / 10,
  },
  // Detalhes ainda sem histórico real: um único evento com a leitura atual.
  events: [reading('13:20', temperature, humidity)],
})

export const lots: Lot[] = [
  {
    id: '08',
    name: 'Nano Lote 08',
    bags: 4,
    kg: 240,
    crop: CROP,
    variety: VARIETY,
    stage: STAGE,
    device: { code: 'LoteSense-008', online: true },
    temperature: 27.1,
    humidity: 16.0,
    status: 'critical',
    message: 'Condição fora do padrão',
    updated: 'Atualizado há 1 min',
    peak: { temperature: 27.1, humidity: 16.0 },
    events: [
      reading('13:04', 27.1, 16.0),
      {
        time: '11:42',
        lines: ['Umidade atingiu 12,8%'],
        status: 'Início do desvio',
        tone: 'warning',
      },
      reading('08:15', 24.6, 11.1),
      {
        time: '25/09 — 17:30',
        lines: ['Lote transferido para armazenamento'],
        tone: 'neutral',
      },
    ],
  },
  {
    id: '03',
    name: 'Nano Lote 03',
    bags: 3,
    kg: 180,
    crop: CROP,
    variety: VARIETY,
    stage: STAGE,
    device: { code: 'LoteSense-003', online: true },
    temperature: 25.8,
    humidity: 13.1,
    status: 'warning',
    message: 'Temperatura e umidade em elevação',
    updated: 'Atualizado há 2 min',
    peak: { temperature: 25.8, humidity: 13.1 },
    events: [reading('13:20', 25.8, 13.1)],
  },
  {
    id: '11',
    name: 'Nano Lote 11',
    bags: 5,
    kg: 300,
    crop: CROP,
    variety: VARIETY,
    stage: STAGE,
    device: { code: 'LoteSense-011', online: true },
    temperature: 24.3,
    humidity: 12.9,
    status: 'warning',
    message: 'Umidade acima da referência',
    updated: 'Atualizado há 3 min',
    peak: { temperature: 24.3, humidity: 12.9 },
    events: [reading('13:19', 24.3, 12.9)],
  },
  {
    id: '01',
    name: 'Nano Lote 01',
    bags: 4,
    kg: 240,
    crop: CROP,
    variety: VARIETY,
    stage: STAGE,
    device: { code: 'LoteSense-001', online: true },
    temperature: 24.2,
    humidity: 11.0,
    status: 'healthy',
    message: 'Dentro do esperado',
    updated: 'Atualizado agora',
    peak: { temperature: 24.6, humidity: 11.1 },
    events: [reading('13:22', 24.2, 11.0)],
  },
  {
    id: '02',
    name: 'Nano Lote 02',
    bags: 3,
    kg: 180,
    crop: CROP,
    variety: VARIETY,
    stage: STAGE,
    device: { code: 'LoteSense-002', online: true },
    // Na tolerância: acima do ideal (11,2%), mas abaixo do limite (12,5%).
    temperature: 24.5,
    humidity: 11.9,
    status: 'healthy',
    message: 'Dentro do esperado',
    updated: 'Atualizado há 4 min',
    peak: { temperature: 24.9, humidity: 12.1 },
    events: [reading('13:18', 24.5, 11.9)],
  },
  healthyLot('04', 4, 24.0, 11.1, 2),
  healthyLot('05', 5, 24.4, 10.9, 3),
  healthyLot('06', 3, 23.6, 11.0, 1),
  healthyLot('07', 4, 24.7, 12.2, 5),
  healthyLot('09', 5, 23.9, 10.8, 2),
  healthyLot('10', 3, 24.1, 11.2, 4),
  healthyLot('12', 4, 23.8, 11.0, 1),
]

// A lista segue a ordem de prioridade (críticos, atenção, dentro do esperado); o resumo cobre todos.
const countByStatus = (status: Lot['status']) => lots.filter((lot) => lot.status === status).length

export const lotsSummary: LotsSummary = {
  total: lots.length,
  healthy: countByStatus('healthy'),
  warning: countByStatus('warning'),
  critical: countByStatus('critical'),
}
