import { lots, lotsSummary } from '../data/lots'

export function useLots() {
  // Único ponto de acesso à lista: trocar por chamada de API aqui.
  const attentionLot = lots.find((lot) => lot.status !== 'healthy')
  return { lots, summary: lotsSummary, attentionLot }
}
