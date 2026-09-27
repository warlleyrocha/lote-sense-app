import { useId, useState, type ReactNode } from 'react'
import Icon from './Icon'

type InfoTooltipProps = {
  label: string
  children: ReactNode
  // Lado em que o balão se ancora; use `end` perto da borda direita da tela.
  align?: 'start' | 'center' | 'end'
}

const alignClass = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
}

// Abre no hover/foco (desktop) e no toque (mobile); Esc ou perder o foco fecha.
export default function InfoTooltip({ label, children, align = 'center' }: InfoTooltipProps) {
  const id = useId()
  const [open, setOpen] = useState(false)

  return (
    <span
      className="relative inline-flex align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        aria-label={label}
        className="flex size-5 cursor-pointer items-center justify-center rounded-full text-ink-faint transition-colors hover:text-primary"
        onBlur={() => setOpen(false)}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setOpen((value) => !value)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false)
        }}
        type="button"
      >
        <Icon className="size-4" name="info" />
      </button>
      {open && (
        <span
          className={`absolute bottom-full z-20 mb-2 w-56 rounded-inner bg-ink px-3 py-2 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-surface shadow-card ${alignClass[align]}`}
          id={id}
          role="tooltip"
        >
          {children}
        </span>
      )}
    </span>
  )
}
