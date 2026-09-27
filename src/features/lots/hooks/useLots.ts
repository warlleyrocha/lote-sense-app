import { lots, lotsSummary } from '../data/lots'

// A Home destaca só os primeiros da fila de prioridade; o resumo usa todos.
const HOME_LOTS_LIMIT = 5

export function useLots() {
  // Único ponto de acesso à lista: trocar por chamada de API aqui.
  return { lots, priorityLots: lots.slice(0, HOME_LOTS_LIMIT), summary: lotsSummary }
}
