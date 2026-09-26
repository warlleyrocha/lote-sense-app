import type { Alert } from '../types'

// Leituras atuais vêm do próprio lote; o alerta guarda só o desvio e o momento.
export const alerts: Alert[] = [
  {
    id: 'a-08',
    lotId: '08',
    state: 'active',
    severity: 'critical',
    metrics: ['temperature', 'humidity'],
    message: 'Condição fora da faixa esperada.',
    time: 'Detectado há 18 min',
  },
  {
    id: 'a-03',
    lotId: '03',
    state: 'active',
    severity: 'warning',
    metrics: ['temperature', 'humidity'],
    message: 'Temperatura e umidade em elevação.',
    time: 'Detectado há 42 min',
  },
  {
    id: 'a-11',
    lotId: '11',
    state: 'active',
    severity: 'warning',
    metrics: ['humidity'],
    message: 'Umidade acima da referência.',
    time: 'Detectado há 1h',
  },
  {
    id: 'a-02',
    lotId: '02',
    state: 'resolved',
    metrics: ['temperature'],
    message: 'Temperatura retornou à faixa esperada.',
    time: 'Resolvido há 2h',
  },
]
