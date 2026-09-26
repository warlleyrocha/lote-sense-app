import type { Lot, LotEvent, LotsSummary } from '../types'
import { formatHumidity, formatTemperature } from '../utils'

const CROP = 'Café Arábica — Catuaí Vermelho'
const VARIETY = 'Catuaí Vermelho'
const STAGE = 'Armazenamento'

// Detalhes ainda sem histórico real: um único evento com a leitura atual.
const latestReading = (time: string, lines: string[], healthy: boolean): LotEvent[] => [
  {
    time,
    lines,
    status: healthy ? 'Dentro da referência' : 'Acima da referência',
    tone: healthy ? 'healthy' : 'warning',
  },
]

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
    temperature: Math.round((temperature + 1.2) * 10) / 10,
    humidity: Math.round((humidity + 0.3) * 10) / 10,
  },
  events: latestReading(
    '13:20',
    [`Temperatura: ${formatTemperature(temperature)}`, `Umidade: ${formatHumidity(humidity)}`],
    true,
  ),
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
      {
        time: '13:04',
        lines: ['Temperatura: 27,1 °C', 'Umidade: 16,0%'],
        status: 'Acima da referência',
        tone: 'warning',
      },
      {
        time: '11:42',
        lines: ['Umidade atingiu 14,1%'],
        status: 'Início do desvio',
        tone: 'warning',
      },
      {
        time: '08:15',
        lines: ['Temperatura: 21,8 °C', 'Umidade: 12,4%'],
        status: 'Dentro da referência',
        tone: 'healthy',
      },
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
    temperature: 24.7,
    humidity: 13.8,
    status: 'warning',
    message: 'Temperatura e umidade em elevação',
    updated: 'Atualizado há 2 min',
    peak: { temperature: 24.7, humidity: 13.8 },
    events: latestReading('13:20', ['Temperatura: 24,7 °C', 'Umidade: 13,8%'], false),
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
    temperature: 23.9,
    humidity: 13.4,
    status: 'warning',
    message: 'Umidade acima da referência',
    updated: 'Atualizado há 3 min',
    peak: { temperature: 23.9, humidity: 13.4 },
    events: latestReading('13:19', ['Temperatura: 23,9 °C', 'Umidade: 13,4%'], false),
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
    temperature: 20.4,
    humidity: 12.1,
    status: 'healthy',
    message: 'Dentro do esperado',
    updated: 'Atualizado agora',
    peak: { temperature: 21.0, humidity: 12.3 },
    events: latestReading('13:22', ['Temperatura: 20,4 °C', 'Umidade: 12,1%'], true),
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
    temperature: 21.4,
    humidity: 12.3,
    status: 'healthy',
    message: 'Dentro do esperado',
    updated: 'Atualizado há 4 min',
    peak: { temperature: 22.9, humidity: 12.5 },
    events: latestReading('13:18', ['Temperatura: 21,4 °C', 'Umidade: 12,3%'], true),
  },
  healthyLot('04', 4, 20.8, 12.0, 2),
  healthyLot('05', 5, 21.1, 12.2, 3),
  healthyLot('06', 3, 20.2, 11.9, 1),
  healthyLot('07', 4, 21.6, 12.4, 5),
  healthyLot('09', 5, 20.5, 12.1, 2),
  healthyLot('10', 3, 21.0, 12.3, 4),
  healthyLot('12', 4, 20.9, 12.2, 1),
]

// A lista segue a ordem de prioridade (críticos, atenção, dentro do esperado); o resumo cobre todos.
const countByStatus = (status: Lot['status']) => lots.filter((lot) => lot.status === status).length

export const lotsSummary: LotsSummary = {
  total: lots.length,
  healthy: countByStatus('healthy'),
  warning: countByStatus('warning'),
  critical: countByStatus('critical'),
}
