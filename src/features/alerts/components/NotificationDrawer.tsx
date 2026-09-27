import { useEffect, useId, useRef } from 'react'
import { Link } from 'react-router'
import Icon from '@/components/Icon'
import IconButton from '@/components/IconButton'
import type { LotAlert } from '../types'
import NotificationItem from './NotificationItem'

type NotificationDrawerProps = {
  open: boolean
  onClose: () => void
  // Já ordenadas do mais recente ao mais antigo.
  notifications: LotAlert[]
}

const plural = (count: number, singular: string, pluralForm: string) =>
  `${count} ${count === 1 ? singular : pluralForm}`

// <dialog> modal nativo: foco preso no painel, Esc fecha e o foco volta ao sino.
export default function NotificationDrawer({ open, onClose, notifications }: NotificationDrawerProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const activeCount = notifications.filter((alert) => alert.state === 'active').length

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      aria-labelledby={titleId}
      className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-drawer max-w-11/12 translate-x-full border-0 bg-canvas p-0 text-ink shadow-drawer transition-all transition-discrete duration-300 ease-out backdrop:bg-transparent backdrop:transition-all backdrop:transition-discrete backdrop:duration-300 open:translate-x-0 open:backdrop:bg-overlay starting:open:translate-x-full starting:open:backdrop:bg-transparent motion-reduce:transition-none motion-reduce:backdrop:transition-none"
      // Clique no fundo escurecido chega ao próprio <dialog>; o conteúdo ocupa todo o painel.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onClose={onClose}
      ref={ref}
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-line bg-surface px-page py-4">
          <div>
            <h2 className="text-lg font-semibold text-ink" id={titleId}>
              Notificações
            </h2>
            <p className="text-xs text-ink-muted">
              {activeCount > 0
                ? plural(activeCount, 'alerta ativo', 'alertas ativos')
                : 'Nenhum alerta ativo'}
            </p>
          </div>
          <IconButton icon="close" label="Fechar notificações" onClick={onClose} />
        </header>

        <div className="flex-1 overflow-y-auto px-page py-4">
          {notifications.length > 0 ? (
            <ol className="space-y-2.5">
              {notifications.map((alert) => (
                <li key={alert.id}>
                  <NotificationItem alert={alert} />
                </li>
              ))}
            </ol>
          ) : (
            <p className="rounded-card border border-line bg-surface p-4 text-sm text-ink-muted">
              Nenhuma notificação no momento.
            </p>
          )}
        </div>

        <footer className="border-t border-line bg-surface px-page pb-safe pt-3">
          <Link
            className="flex items-center justify-center gap-1.5 rounded-inner px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
            to="/alertas"
          >
            Ver todos os alertas
            <Icon className="size-4" name="chevron" />
          </Link>
        </footer>
      </div>
    </dialog>
  )
}
