import { Outlet, useLocation } from 'react-router'
import BottomNavigation from './BottomNavigation'

export default function AppShell({ withNavigation = false }: { withNavigation?: boolean }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <main
        className={`mx-auto min-h-dvh w-full max-w-mobile bg-canvas ${
          withNavigation ? 'pb-bottom-nav' : 'pb-8'
        }`}
      >
        {/* A key por rota reinicia a animação de entrada a cada troca de tela. */}
        <div className="animate-page-enter motion-reduce:animate-none" key={pathname}>
          <Outlet />
        </div>
      </main>
      {withNavigation && <BottomNavigation />}
    </div>
  )
}
