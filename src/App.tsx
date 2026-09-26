import { Navigate, Route, Routes } from 'react-router'
import AppShell from '@/components/AppShell'
import AlertsPage from '@/features/alerts/pages/AlertsPage'
import HomePage from '@/features/lots/pages/HomePage'
import LotDetailPage from '@/features/lots/pages/LotDetailPage'
import LotHistoryPage from '@/features/lots/pages/LotHistoryPage'
import PlaceholderPage from '@/pages/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell withNavigation />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<LotDetailPage />} path="/lotes/:id" />
        <Route element={<PlaceholderPage title="Mapa" />} path="/mapa" />
        <Route element={<AlertsPage />} path="/alertas" />
        <Route element={<PlaceholderPage title="Perfil" />} path="/perfil" />
      </Route>
      <Route element={<AppShell />}>
        <Route element={<LotHistoryPage />} path="/lotes/:id/historico" />
      </Route>
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}
