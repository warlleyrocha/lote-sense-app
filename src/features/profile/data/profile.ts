import type { Producer } from '../types'

export const producer: Producer = {
  name: 'João Silva',
  role: 'Produtor',
  property: 'Fazenda Boa Vista',
}

export const preferences = [
  { icon: 'bell', label: 'Notificações', value: 'Alertas de temperatura e umidade' },
  { icon: 'thermometer', label: 'Unidade de temperatura', value: '°C' },
  { icon: 'clock', label: 'Intervalo de atualização', value: '5 minutos' },
] as const
