import { Link } from 'react-router'
import Icon, { type IconName } from './Icon'

type IconButtonProps = {
  icon: IconName
  label: string
  badge?: boolean
} & ({ to: string; onClick?: never } | { onClick: () => void; to?: never })

const className =
  'relative flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-muted'

export default function IconButton({ icon, label, badge, to, onClick }: IconButtonProps) {
  const content = (
    <>
      <Icon name={icon} />
      {badge && (
        <span className="absolute right-2 top-2 size-2 rounded-full bg-critical ring-2 ring-surface" />
      )}
    </>
  )

  if (to) {
    return (
      <Link aria-label={label} className={className} to={to}>
        {content}
      </Link>
    )
  }

  return (
    <button aria-label={label} className={className} onClick={onClick} type="button">
      {content}
    </button>
  )
}
