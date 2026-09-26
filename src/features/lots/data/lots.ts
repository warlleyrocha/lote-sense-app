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
    id: '11',
    name: 'Nano Lote 11',
    bags: 5,
    kg: 300,
    crop: CROP,
    stage: STAGE,
    device: { code: 'LoteSense-011', online: true },
    temperature: 27.1,
    humidity: 16.0,
    status: 'critical',
    message: 'Condição fora do padrão',
    updated: 'Atualizado há 1 min',
    peak: { temperature: 27.1, humidity: 16.0 },
    events: latestReading('13:20', ['Temperatura: 27,1 °C', 'Umidade: 16,0%'], false),
  },
  {
    id: '08',
    name: 'Nano Lote 08',
    bags: 4,
    kg: 240,
    crop: CROP,
    stage: STAGE,
    device: { code: 'LoteSense-008', online: true },
    temperature: 25.8,
    humidity: 15.2,
    status: 'warning',
    message: 'Umidade acima do esperado',
    updated: 'Atualizado há 2 min',
    peak: { temperature: 25.8, humidity: 15.2 },
    events: [
      {
        time: '13:08',
        lines: ['Umidade atingiu 15,2%'],
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
    id: '03',
    name: 'Nano Lote 03',
    bags: 3,
    kg: 180,
    crop: CROP,
    stage: STAGE,
    device: { code: 'LoteSense-003', online: true },
    temperature: 21.2,
    humidity: 12.4,
    status: 'healthy',
    message: 'Dentro do esperado',
    updated: 'Atualizado há 4 min',
    peak: { temperature: 21.6, humidity: 12.6 },
    events: latestReading('13:18', ['Temperatura: 21,2 °C', 'Umidade: 12,4%'], true),
  },
]

// A lista acima traz só os lotes de maior prioridade; o resumo cobre todos.
export const lotsSummary: LotsSummary = {
  total: 12,
  healthy: 9,
  warning: 2,
  critical: 1,
}
