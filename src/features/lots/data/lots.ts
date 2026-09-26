import type { Lot, LotEvent, LotsSummary } from '../types'

const CROP = 'Café Arábica — Catuaí Vermelho'
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

export const lots: Lot[] = [
  {
    id: '08',
    name: 'Nano Lote 08',
    bags: 4,
    kg: 240,
    crop: CROP,
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
]

// A lista acima traz só os lotes de maior prioridade; o resumo cobre todos.
export const lotsSummary: LotsSummary = {
  total: 12,
  healthy: 9,
  warning: 2,
  critical: 1,
}
