import { lots, lotsSummary } from '@/features/lots/data/lots'
import { preferences, producer } from '../data/profile'

export function useProfile() {
  const totalBags = lots.reduce((sum, lot) => sum + lot.bags, 0)
  const activeSensors = lots.filter((lot) => lot.device.online).length
  const stage = lots[0]?.stage ?? '—'

  const operation = [
    { icon: 'map-pin', label: 'Propriedade', value: producer.property },
    { icon: 'layers', label: 'Nano-lotes', value: `${lotsSummary.total} lotes cadastrados` },
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
