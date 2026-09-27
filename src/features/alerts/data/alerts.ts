import type { Alert } from '../types'

// Leituras atuais vêm do próprio lote; o alerta guarda só o desvio e o momento.
export const alerts: Alert[] = [
  {
    id: 'a-08',
    lotId: '08',
    bags: [2],
    state: 'active',
    severity: 'critical',
    metrics: ['temperature', 'humidity'],
    message: 'Condição fora da faixa esperada.',
    minutesAgo: 18,
  },
  {
    id: 'a-03',
    lotId: '03',
    bags: [1, 2, 3],
    state: 'active',
    severity: 'warning',
    metrics: ['temperature', 'humidity'],
    message: 'Temperatura e umidade em elevação em todas as sacas.',
    minutesAgo: 42,
  },
  {
    id: 'a-11',
    lotId: '11',
    bags: [4],
    state: 'active',
    severity: 'warning',
    metrics: ['humidity'],
    message: 'Umidade acima da referência.',
    minutesAgo: 60,
  },
  {
    id: 'a-05',
    lotId: '05',
    bags: [3],
    state: 'resolved',
    metrics: ['humidity'],
    message: 'Umidade retornou à faixa esperada.',
    minutesAgo: 35,
  },
  {
    id: 'a-02',
    lotId: '02',
    bags: [1],
    state: 'resolved',
    metrics: ['temperature'],
    message: 'Temperatura retornou à faixa esperada.',
    minutesAgo: 120,
  },
]
