import { Link } from 'react-router'
import Icon from '@/components/Icon'

export default function AccountSection() {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-section text-ink-faint">Conta</h2>
      <div className="divide-y divide-line rounded-card border border-line bg-surface px-4">
        <div className="flex items-center gap-3 py-3.5">
          <Icon className="size-4.5 shrink-0 text-ink-muted" name="user" />
          <p className="flex-1 text-sm font-medium text-ink">Dados da conta</p>
          <Icon className="size-4 shrink-0 text-ink-faint" name="chevron" />
        </div>
        <div className="flex items-center gap-3 py-3.5">
          <Icon className="size-4.5 shrink-0 text-ink-muted" name="lock" />
          <p className="flex-1 text-sm font-medium text-ink">Segurança</p>
          <Icon className="size-4 shrink-0 text-ink-faint" name="chevron" />
        </div>
        <Link className="flex items-center gap-3 py-3.5" to="/">
          <Icon className="size-4.5 shrink-0 text-critical" name="log-out" />
          <p className="flex-1 text-sm font-medium text-critical">Sair</p>
        </Link>
      </div>
    </section>
  )
}
