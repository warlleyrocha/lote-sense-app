type SegmentedControlProps<T extends string> = {
  options: { id: T; label: string }[]
  value: T
  onChange: (value: T) => void
  label: string
  className?: string
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div
      aria-label={label}
      className={`grid gap-1 rounded-inner bg-muted p-1 ${className}`}
      role="group"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      {options.map((option) => (
        <button
          aria-pressed={value === option.id}
          className={`cursor-pointer rounded-segment py-2.5 text-center text-sm font-semibold transition-colors ${
            value === option.id ? 'bg-surface text-primary shadow-segment' : 'text-ink-muted'
          }`}
          key={option.id}
          onClick={() => onChange(option.id)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
