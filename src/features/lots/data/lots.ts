import { sensor } from '@/features/sensor/data/sensors'
import type { Sensor } from '@/features/sensor/types'
import type { Bag, Lot, LotEvent, LotsSummary, LotStatus } from '../types'
import {
  formatHumidity,
  formatTemperature,
  getReferenceState,
  isDeviation,
  referenceStateLabel,
  worstStatus,
} from '../utils'

const CROP = 'Café Arábica — Catuaí Vermelho'
const VARIETY = 'Catuaí Vermelho'
const STAGE = 'Armazenamento'
const KG_PER_BAG = 60

type BagInput = {
  temperature: number
  humidity: number
  status?: LotStatus
  minutesAgo?: number
  peak?: Bag['peak']
  sensor?: Partial<Sensor>
}

const round = (value: number) => Math.round(value * 10) / 10

const bag = (lotId: string, number: number, input: BagInput): Bag => ({
  number,
  tag: `L${lotId}-S${number}`,
  sensor: sensor(lotId, number, input.sensor),
  temperature: input.temperature,
  humidity: input.humidity,
  status: input.status ?? 'healthy',
  minutesAgo: input.minutesAgo ?? 2,
  peak: input.peak ?? {
    temperature: round(input.temperature + 0.3),
    humidity: round(input.humidity + 0.1),
  },
})

// Leitura de uma saca com status derivado da referência (temperatura ideal 18–22 °C,
// tolerância até 25 °C; umidade ideal 10,8–11,2%, tolerância até 12,5%).
const bagReading = (time: string, item: Bag): LotEvent => {
  const states = [
    getReferenceState('temperature', item.temperature),
    getReferenceState('humidity', item.humidity),
  ]
  const deviating = states.some(isDeviation)
  return {
    time,
    bag: item.number,
    lines: [`Temperatura: ${formatTemperature(item.temperature)}`, `Umidade: ${formatHumidity(item.humidity)}`],
    status: deviating
      ? referenceStateLabel.above
      : referenceStateLabel[states.includes('tolerance') ? 'tolerance' : 'within'],
    tone: deviating ? 'warning' : 'healthy',
  }
}

// Leitura do lote inteiro quando nenhuma saca desvia.
const lotReading = (time: string, bags: Bag[]): LotEvent => {
  const inTolerance = bags.some((item) =>
    (['temperature', 'humidity'] as const).some((metric) => getReferenceState(metric, item[metric]) === 'tolerance'),
  )
  return {
    time,
    lines: [`Leitura das ${bags.length} sacas`],
    status: referenceStateLabel[inTolerance ? 'tolerance' : 'within'],
    tone: 'healthy',
  }
}

// Sem histórico real: um evento por saca fora do esperado ou, se todas estão bem, um do lote.
const currentEvents = (time: string, bags: Bag[]) => {
  const affected = bags.filter((item) => item.status !== 'healthy')
  return affected.length > 0 ? affected.map((item) => bagReading(time, item)) : [lotReading(time, bags)]
}

const lot = (id: string, inputs: BagInput[], events?: (bags: Bag[]) => LotEvent[]): Lot => {
  const bags = inputs.map((input, index) => bag(id, index + 1, input))
  return {
    id,
    name: `Lote ${id}`,
    kg: bags.length * KG_PER_BAG,
    crop: CROP,
    variety: VARIETY,
    stage: STAGE,
    bags,
    status: worstStatus(bags.map((item) => item.status)),
    events: events?.(bags) ?? currentEvents('13:20', bags),
  }
}

// Lotes dentro da referência: pequenas variações entre sacas em torno de uma leitura base.
const temperatureOffsets = [0, 0.3, -0.2, 0.4, 0.1]
const humidityOffsets = [0, 0.1, 0, 0.2, 0.1]

const healthyLot = (id: string, count: number, temperature: number, humidity: number, minutesAgo: number) =>
  lot(
    id,
    Array.from({ length: count }, (_, index) => ({
      temperature: round(temperature + temperatureOffsets[index]),
      humidity: round(humidity + humidityOffsets[index]),
      minutesAgo: minutesAgo + index,
    })),
  )

export const lots: Lot[] = [
  // Desvio localizado: só a saca 2 saiu da referência.
  lot(
    '08',
    [
      { temperature: 21.4, humidity: 11.1, minutesAgo: 1 },
      {
        temperature: 27.1,
        humidity: 16.0,
        status: 'critical',
        minutesAgo: 1,
        peak: { temperature: 27.1, humidity: 16.0 },
        sensor: {
          signal: 98,
          battery: 82,
          lastCommunication: 'agora',
          collected: 'há menos de 1 minuto',
          lastSync: '13:08:42',
        },
      },
      { temperature: 21.9, humidity: 11.2, minutesAgo: 2 },
      { temperature: 21.2, humidity: 11.0, minutesAgo: 1 },
    ],
    (bags) => [
      bagReading('13:04', bags[1]),
      { time: '11:42', bag: 2, lines: ['Umidade atingiu 12,8%'], status: 'Início do desvio', tone: 'warning' },
      lotReading('08:15', bags),
      { time: '25/09 — 17:30', lines: ['Lote transferido para armazenamento'], tone: 'neutral' },
    ],
  ),
  // Desvio no ambiente: todas as sacas subiram juntas.
  lot('03', [
    { temperature: 25.8, humidity: 13.1, status: 'warning', minutesAgo: 2, peak: { temperature: 25.8, humidity: 13.1 } },
    { temperature: 25.4, humidity: 12.8, status: 'warning', minutesAgo: 2, peak: { temperature: 25.4, humidity: 12.8 } },
    { temperature: 25.6, humidity: 12.9, status: 'warning', minutesAgo: 3, peak: { temperature: 25.6, humidity: 12.9 } },
  ]),
  lot('11', [
    { temperature: 21.3, humidity: 11.0, minutesAgo: 3 },
    { temperature: 21.1, humidity: 11.1, minutesAgo: 3 },
    { temperature: 21.5, humidity: 11.2, minutesAgo: 4 },
    { temperature: 21.3, humidity: 12.9, status: 'warning', minutesAgo: 3, peak: { temperature: 21.3, humidity: 12.9 } },
    // Bateria baixa: as leituras chegam, mas o sensor pede atenção.
    { temperature: 21.0, humidity: 11.1, minutesAgo: 3, sensor: { battery: 16 } },
  ]),
  lot('01', [
    { temperature: 21.2, humidity: 11.0, minutesAgo: 0, peak: { temperature: 21.6, humidity: 11.1 } },
    { temperature: 21.0, humidity: 10.9, minutesAgo: 0 },
    { temperature: 21.4, humidity: 11.1, minutesAgo: 1 },
    { temperature: 20.9, humidity: 11.0, minutesAgo: 0 },
  ]),
  // Na tolerância: acima do ideal (11,2%), mas abaixo do limite (12,5%).
  lot('02', [
    { temperature: 21.5, humidity: 11.9, minutesAgo: 4, peak: { temperature: 21.9, humidity: 12.1 } },
    { temperature: 21.3, humidity: 11.6, minutesAgo: 4 },
    { temperature: 21.6, humidity: 11.8, minutesAgo: 5 },
  ]),
  healthyLot('04', 4, 21.0, 11.1, 2),
  healthyLot('05', 5, 21.4, 10.9, 3),
  healthyLot('06', 3, 20.6, 11.0, 1),
  // Sensor da saca 2 sem comunicação: as leituras exibidas são as últimas recebidas.
  lot('07', [
    { temperature: 21.7, humidity: 12.2, minutesAgo: 5 },
    {
      temperature: 21.5,
      humidity: 12.0,
      minutesAgo: 184,
      sensor: {
        online: false,
        signal: 0,
        battery: 64,
        lastCommunication: 'há 3 h',
        collected: 'há 3 horas',
        lastSync: '10:16:03',
      },
    },
    { temperature: 21.9, humidity: 12.3, minutesAgo: 6 },
    { temperature: 21.6, humidity: 12.2, minutesAgo: 5 },
  ]),
  healthyLot('09', 5, 20.9, 10.8, 2),
  healthyLot('10', 3, 21.1, 11.2, 4),
  healthyLot('12', 4, 20.8, 11.0, 1),
]

// A lista segue a ordem de prioridade (críticos, atenção, dentro do esperado); o resumo cobre todos.
const countByStatus = (status: Lot['status']) => lots.filter((item) => item.status === status).length

export const lotsSummary: LotsSummary = {
  total: lots.length,
  healthy: countByStatus('healthy'),
  warning: countByStatus('warning'),
  critical: countByStatus('critical'),
}
