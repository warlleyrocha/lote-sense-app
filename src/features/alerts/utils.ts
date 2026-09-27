import type { Alert } from './types'

export function formatElapsed(minutes: number) {
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours}h`
  return `há ${Math.floor(hours / 24)}d`
}

export const formatAlertTime = (alert: Alert) =>
  `${alert.state === 'active' ? 'Detectado' : 'Resolvido'} ${formatElapsed(alert.minutesAgo)}`
