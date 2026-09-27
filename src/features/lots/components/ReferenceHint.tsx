import InfoTooltip from '@/components/InfoTooltip'
import { metricLabel, reference } from '../constants'
import type { Metric } from '../types'
import { formatReference, formatReferenceValue } from '../utils'

type ReferenceHintProps = {
  metric: Metric
  align?: 'start' | 'center' | 'end'
}

function hintText(metric: Metric) {
  const { limit } = reference[metric]
  if (metric === 'temperature' && limit !== undefined) {
    return `Faixa estável: ${formatReference(metric)}. Acima de ${formatReferenceValue(metric, limit)} o café respira mais e tende a perder qualidade no armazenamento.`
  }
  const tolerance =
    limit === undefined
      ? ''
      : ` A tolerância vai até ${formatReferenceValue(metric, limit)}, que é o limite aceito — mas esse valor já está acima da faixa recomendada.`
  return `Faixa ideal: ${formatReference(metric)}.${tolerance}`
}

// Explica o porquê da referência de cada métrica.
export default function ReferenceHint({ metric, align }: ReferenceHintProps) {
  return (
    <InfoTooltip align={align} label={`Sobre a referência de ${metricLabel[metric].toLowerCase()}`}>
      {hintText(metric)}
    </InfoTooltip>
  )
}
