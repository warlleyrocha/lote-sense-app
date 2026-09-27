import { useState } from 'react'
import { Link } from 'react-router'
import IconButton from '@/components/IconButton'
import NotificationDrawer from '@/features/alerts/components/NotificationDrawer'
import { useAlerts } from '@/features/alerts/hooks/useAlerts'
import useGreeting from '@/hooks/useGreeting'
import LotCard from '../components/LotCard'
import OverviewCard from '../components/OverviewCard'
import { useLots } from '../hooks/useLots'

export default function HomePage() {
  const greeting = useGreeting()
  const { priorityLots, summary } = useLots()
  const { timeline, counts } = useAlerts()
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <>
      <header className="px-page pb-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img alt="" aria-hidden="true" className="size-10 rounded-logo object-cover" src="/logo.png" />
            <img alt="LoteSense" className="h-6 w-auto" src="/lote-sense-title.png" />
          </div>
          <div className="flex gap-2">
            <IconButton
              badge={counts.all > 0}
              icon="bell"
              label="Abrir notificações"
              onClick={() => setNotificationsOpen(true)}
            />
            <IconButton icon="user" label="Abrir perfil" to="/perfil" />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{greeting}, João</h1>
          <p className="mt-1.5 text-base leading-relaxed text-ink-muted">
            Confira a integridade dos seus nano-lotes.
          </p>
        </div>
      </header>

      <NotificationDrawer
        notifications={timeline}
        onClose={() => setNotificationsOpen(false)}
        open={notificationsOpen}
      />

      <section className="px-page">
        <OverviewCard summary={summary} />
      </section>

      <section className="mt-7 px-page">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink">Nano-lotes</h2>
            <p className="mt-0.5 text-sm text-ink-muted">Prioridade de atenção</p>
          </div>
          <Link className="text-xs font-semibold text-primary" to="/lotes">
            Ver todos ({summary.total})
          </Link>
        </div>
        <div className="space-y-3">
          {priorityLots.map((lot) => (
            <LotCard key={lot.id} lot={lot} />
          ))}
        </div>
      </section>
    </>
  )
}
