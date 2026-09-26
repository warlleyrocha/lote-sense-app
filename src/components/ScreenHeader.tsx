import IconButton from './IconButton'

type ScreenHeaderProps = {
  title: string
  subtitle: string
  backTo: string
  backLabel: string
}

export default function ScreenHeader({ title, subtitle, backTo, backLabel }: ScreenHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-canvas px-page py-4">
      <IconButton icon="arrow-left" label={backLabel} to={backTo} />
      <div>
        <h1 className="text-lg font-semibold text-ink">{title}</h1>
        <p className="text-xs text-ink-muted">{subtitle}</p>
      </div>
    </header>
  )
}
