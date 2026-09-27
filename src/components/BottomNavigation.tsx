import { Link, useLocation } from 'react-router'
import Icon, { type IconName } from './Icon'

const items: { label: string; icon: IconName; to: string; match: (path: string) => boolean }[] = [
  {
    label: 'Início',
    icon: 'home',
    to: '/inicio',
    match: (path) => path === '/inicio' || path.startsWith('/lotes'),
  },
  { label: 'Alertas', icon: 'alert', to: '/alertas', match: (path) => path.startsWith('/alertas') },
  { label: 'Perfil', icon: 'user', to: '/perfil', match: (path) => path.startsWith('/perfil') },
]

export default function BottomNavigation() {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-20 flex w-full items-center justify-around border-t border-line bg-surface px-3 pb-safe pt-2 shadow-nav"
    >
      {items.map((item) => {
        const active = item.match(pathname)
        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={`flex min-w-nav-item flex-col items-center gap-1 rounded-inner py-1.5 ${
              active ? 'text-primary' : 'text-ink-faint'
            }`}
            key={item.label}
            to={item.to}
          >
            <span className={`rounded-full px-4 py-1 ${active ? 'bg-primary-soft' : ''}`}>
              <Icon className="size-5" name={item.icon} />
            </span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
