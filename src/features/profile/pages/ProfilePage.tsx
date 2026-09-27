import Icon from '@/components/Icon'
import AccountSection from '../components/AccountSection'
import MenuSection from '../components/MenuSection'
import ProfileCard from '../components/ProfileCard'
import { useProfile } from '../hooks/useProfile'

export default function ProfilePage() {
  const { producer, totalLots, totalBags, operation, preferences } = useProfile()

  return (
    <>
      <header className="px-page pb-5 pt-5">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Perfil</h1>
      </header>

      <div className="space-y-7 px-page pb-4">
        <ProfileCard producer={producer} totalBags={totalBags} totalLots={totalLots} />

        <MenuSection rows={operation} title="Minha operação" />

        <MenuSection rows={preferences} title="Preferências" />

        <AccountSection />

        <div className="flex items-center justify-center gap-2 py-2 text-xs text-ink-faint">
          <Icon className="size-3.5" name="info" />
          Sobre o LoteSense • Versão 1.0.0
        </div>
      </div>
    </>
  )
}
