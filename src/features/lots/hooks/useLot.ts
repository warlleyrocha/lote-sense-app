import { lots } from '../data/lots'

export function useLot(id: string | undefined) {
  return lots.find((lot) => lot.id === id)
}
