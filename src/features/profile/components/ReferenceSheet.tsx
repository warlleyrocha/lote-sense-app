import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import Icon from '@/components/Icon'
import IconButton from '@/components/IconButton'
import { defaultReference, metricLabel, type References } from '@/features/lots/constants'
import { getReference, setReference } from '@/features/lots/reference'
import type { Metric } from '@/features/lots/types'
import { formatReferenceValue } from '@/features/lots/utils'

type ReferenceSheetProps = {
  open: boolean
  onClose: () => void
}

type Field = 'min' | 'max' | 'limit'
type Draft = Record<Metric, Record<Field, string>>

const metrics: { metric: Metric; icon: 'thermometer' | 'droplet'; unit: string; bounds: [number, number] }[] = [
  { metric: 'temperature', icon: 'thermometer', unit: '°C', bounds: [0, 50] },
  { metric: 'humidity', icon: 'droplet', unit: '%', bounds: [0, 100] },
]

const fields: { field: Field; label: string }[] = [
  { field: 'min', label: 'Mínima ideal' },
  { field: 'max', label: 'Máxima ideal' },
  { field: 'limit', label: 'Tolerância até' },
]

const toText = (value: number | undefined) =>
  value === undefined ? '' : value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })

// Aceita vírgula ou ponto como separador decimal.
const toNumber = (text: string) => {
  const normalized = text.trim().replace(',', '.')
  return normalized === '' ? Number.NaN : Number(normalized)
}

const toDraft = (reference: References): Draft => ({
  temperature: {
    min: toText(reference.temperature.min),
    max: toText(reference.temperature.max),
    limit: toText(reference.temperature.limit),
  },
  humidity: {
    min: toText(reference.humidity.min),
    max: toText(reference.humidity.max),
    limit: toText(reference.humidity.limit),
  },
})

// Faixa ideal precisa vir antes da tolerância: mínima < máxima ≤ tolerância.
function validate(metric: Metric, values: Record<Field, number>, [low, high]: [number, number]) {
  const { min, max, limit } = values
  if ([min, max, limit].some(Number.isNaN)) return 'Preencha os três valores.'
  if ([min, max, limit].some((value) => value < low || value > high))
    return `Use valores entre ${formatReferenceValue(metric, low)} e ${formatReferenceValue(metric, high)}.`
  if (min >= max) return 'A mínima ideal deve ser menor que a máxima.'
  if (limit < max) return 'A tolerância não pode ficar abaixo da máxima ideal.'
  return undefined
}

// <dialog> modal nativo que sobe da base da tela; a key do pai reinicia o rascunho a cada abertura.
export default function ReferenceSheet({ open, onClose }: ReferenceSheetProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleId = useId()
  const fieldId = useId()
  const [draft, setDraft] = useState(() => toDraft(getReference()))
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      titleRef.current?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  const parsed = Object.fromEntries(
    metrics.map(({ metric }) => [
      metric,
      { min: toNumber(draft[metric].min), max: toNumber(draft[metric].max), limit: toNumber(draft[metric].limit) },
    ]),
  ) as Record<Metric, Record<Field, number>>

  const errors = Object.fromEntries(
    metrics.map(({ metric, bounds }) => [metric, validate(metric, parsed[metric], bounds)]),
  ) as Record<Metric, string | undefined>

  const update = (metric: Metric, field: Field, value: string) =>
    setDraft((current) => ({ ...current, [metric]: { ...current[metric], [field]: value } }))

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.values(errors).some(Boolean)) return
    setReference(parsed)
    onClose()
  }

  function handleReset() {
    setDraft(toDraft(defaultReference))
    setSubmitted(false)
  }

  return (
    <dialog
      aria-labelledby={titleId}
      className="fixed inset-x-0 bottom-0 top-auto m-0 mx-auto max-h-11/12 w-full max-w-mobile translate-y-full rounded-sheet border-0 bg-canvas p-0 text-ink shadow-sheet transition-[translate,overlay,display] transition-discrete duration-300 ease-out backdrop:bg-transparent backdrop:transition-[background-color,overlay,display] backdrop:transition-discrete backdrop:duration-300 backdrop:ease-out open:translate-y-0 open:backdrop:bg-overlay starting:open:translate-y-full starting:open:backdrop:bg-transparent motion-reduce:transition-none motion-reduce:backdrop:transition-none"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onClose={onClose}
      ref={ref}
    >
      <form className="flex max-h-full flex-col" noValidate onSubmit={handleSubmit}>
        <header className="flex items-start justify-between gap-3 border-b border-line bg-surface px-page py-4">
          <div>
            <h2 className="text-lg font-semibold text-ink outline-none" id={titleId} ref={titleRef} tabIndex={-1}>
              Condições de referência
            </h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              Faixa ideal usada nos alertas e gráficos de todas as sacas.
            </p>
          </div>
          <IconButton icon="close" label="Fechar condições de referência" onClick={onClose} />
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-page py-4">
          {metrics.map(({ metric, icon, unit }) => {
            const error = submitted ? errors[metric] : undefined
            const errorId = `${fieldId}-${metric}-error`
            return (
              <fieldset className="rounded-card border border-line bg-surface p-4" key={metric}>
                <legend className="sr-only">{metricLabel[metric]}</legend>
                <div aria-hidden="true" className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon className="size-4" name={icon} />
                  </span>
                  <p className="text-sm font-semibold text-ink">{metricLabel[metric]}</p>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {fields.map(({ field, label }) => {
                    const id = `${fieldId}-${metric}-${field}`
                    return (
                      <div key={field}>
                        <label className="mb-1 block text-xs font-medium text-ink-muted" htmlFor={id}>
                          {label}
                        </label>
                        <div className="relative">
                          <input
                            aria-describedby={error ? errorId : undefined}
                            aria-invalid={Boolean(error)}
                            className="w-full rounded-inner border border-line bg-surface py-2.5 pl-3 pr-8 text-base text-ink outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20 aria-invalid:border-critical"
                            id={id}
                            inputMode="decimal"
                            onChange={(event) => update(metric, field, event.target.value)}
                            type="text"
                            value={draft[metric][field]}
                          />
                          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-ink-faint">
                            {unit}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {error ? (
                  <p className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-critical" id={errorId}>
                    <Icon className="size-3.5 shrink-0" name="alert" />
                    {error}
                  </p>
                ) : (
                  <p className="mt-2.5 text-xs text-ink-faint">
                    Entre a máxima ideal e a tolerância, a leitura ainda é aceita, mas já pede atenção.
                  </p>
                )}
              </fieldset>
            )
          })}
        </div>

        <footer className="flex items-center gap-3 border-t border-line bg-surface px-page pb-safe pt-3">
          <button
            className="flex-1 cursor-pointer rounded-inner px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
            onClick={handleReset}
            type="button"
          >
            Restaurar padrão
          </button>
          <button
            className="flex-1 cursor-pointer rounded-inner bg-primary px-4 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-hover"
            type="submit"
          >
            Salvar
          </button>
        </footer>
      </form>
    </dialog>
  )
}
