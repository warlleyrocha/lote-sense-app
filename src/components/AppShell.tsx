import { Outlet } from 'react-router'
import BottomNavigation from './BottomNavigation'

export default function AppShell({ withNavigation = false }: { withNavigation?: boolean }) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <main
        className={`mx-auto min-h-dvh w-full max-w-mobile bg-canvas ${
          withNavigation ? 'pb-bottom-nav' : 'pb-8'
        }`}
      >
        <Outlet />
      </main>
      {withNavigation && <BottomNavigation />}
    </div>
  )
}
