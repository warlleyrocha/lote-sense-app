import type { LotStatus } from '@/features/lots/types'

export const mapStatusLabel: Record<LotStatus, string> = {
  healthy: 'Dentro do esperado',
  warning: 'Em atenção',
  critical: 'Condição crítica',
}

// Classes completas (não montadas por interpolação) para o Tailwind detectá-las.
export const markerStyles: Record<LotStatus, string> = {
  healthy: 'size-8 bg-primary text-surface',
  warning: 'size-8 bg-warning-light text-warning',
  critical: 'size-11 bg-critical text-surface ring-4 ring-critical/25',
}
