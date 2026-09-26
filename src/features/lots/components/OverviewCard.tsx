import type { LotsSummary } from '../types'

export default function OverviewCard({ summary }: { summary: LotsSummary }) {
  return (
    <div className="rounded-card bg-primary p-5 text-surface shadow-card">
      <p className="text-sm font-medium text-primary-pale">Visão geral</p>
      <div className="mt-1 flex items-end gap-2">
        <span className="text-4xl font-semibold tracking-tight">{summary.total}</span>
        <span className="pb-1 text-sm text-primary-pale">nano-lotes monitorados</span>
      </div>
      <div className="mt-5 grid grid-cols-3 divide-x divide-primary-line">
        <div className="pr-3">
          <p className="text-xl font-semibold">{summary.healthy}</p>
          <p className="mt-1 text-xs leading-tight text-primary-pale">Dentro do esperado</p>
        </div>
        <div className="px-3">
          <p className="text-xl font-semibold text-warning-light">{summary.warning}</p>
          <p className="mt-1 text-xs text-primary-pale">Atenção</p>
        </div>
        <div className="pl-3">
          <p className="text-xl font-semibold text-critical-light">{summary.critical}</p>
          <p className="mt-1 text-xs text-primary-pale">Crítico</p>
        </div>
      </div>
    </div>
  )
}
