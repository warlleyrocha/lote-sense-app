import { lots, lotsSummary } from '@/features/lots/data/lots'
import { countOnlineSensors } from '@/features/lots/utils'
import { preferences, producer } from '../data/profile'

export function useProfile() {
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

  return {
    producer,
    totalLots: lotsSummary.total,
    totalBags,
    operation,
    preferences,
  }
}
