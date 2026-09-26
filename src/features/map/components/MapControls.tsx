import Icon, { type IconName } from '@/components/Icon'

type ControlButtonProps = {
  icon: IconName
  label: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

function ControlButton({ icon, label, onClick, disabled, className = '' }: ControlButtonProps) {
  return (
    <button
      aria-label={label}
      className={`flex size-11 cursor-pointer items-center justify-center text-ink transition-colors hover:bg-muted disabled:cursor-default disabled:text-ink-faint disabled:hover:bg-transparent ${className}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <Icon name={icon} />
    </button>
  )
}

type MapControlsProps = {
  canZoomIn: boolean
  canZoomOut: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  onLocate: () => void
}

export default function MapControls({ canZoomIn, canZoomOut, onZoomIn, onZoomOut, onLocate }: MapControlsProps) {
  return (
    <div className="absolute right-3 top-[4.75rem] z-40 flex flex-col gap-2">
      <div className="overflow-hidden rounded-inner border border-line bg-surface shadow-segment">
        <ControlButton disabled={!canZoomIn} icon="plus" label="Aproximar mapa" onClick={onZoomIn} />
        <ControlButton
          className="border-t border-line"
          disabled={!canZoomOut}
          icon="minus"
          label="Afastar mapa"
          onClick={onZoomOut}
        />
      </div>
      <div className="overflow-hidden rounded-inner border border-line bg-surface shadow-segment">
        <ControlButton icon="location" label="Centralizar propriedade" onClick={onLocate} />
      </div>
    </div>
  )
}
