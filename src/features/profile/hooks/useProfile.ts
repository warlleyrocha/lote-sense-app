import { lots, lotsSummary } from '@/features/lots/data/lots'
import { useReference } from '@/features/lots/reference'
import { countOnlineSensors, formatReference } from '@/features/lots/utils'
import { producer } from '../data/profile'
import type { MenuRow } from '../types'

export function useProfile({ onEditReference }: { onEditReference: () => void }) {
  const reference = useReference()

  // Um sensor por saca.
  const totalBags = lots.reduce((sum, lot) => sum + lot.bags.length, 0)
  const activeSensors = lots.reduce((sum, lot) => sum + countOnlineSensors(lot), 0)
  const stage = lots[0]?.stage ?? '—'

  const operation = [
    { icon: 'map-pin', label: 'Propriedade', value: producer.property },
    { icon: 'layers', label: 'Lotes', value: `${lotsSummary.total} lotes cadastrados` },
    { icon: 'signal', label: 'Sensores', value: `${activeSensors} sensores ativos` },
    { icon: 'history', label: 'Etapas monitoradas', value: stage },
  ] as const

  const preferences: MenuRow[] = [
    { icon: 'bell', label: 'Notificações', value: 'Alertas de temperatura e umidade' },
    { icon: 'thermometer', label: 'Unidade de temperatura', value: '°C' },
    {
      icon: 'sliders',
      label: 'Condições de referência',
      value: `${formatReference('temperature', reference.temperature)} · ${formatReference('humidity', reference.humidity)}`,
      onSelect: onEditReference,
    },
    { icon: 'clock', label: 'Intervalo de atualização', value: '5 minutos' },
  ]

  return {
    producer,
    totalLots: lotsSummary.total,
    totalBags,
    operation,
    preferences,
  }
}
