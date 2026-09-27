import { Navigate, Route, Routes } from 'react-router'
import AppShell from '@/components/AppShell'
import AlertsPage from '@/features/alerts/pages/AlertsPage'
import HomePage from '@/features/lots/pages/HomePage'
import LotDetailPage from '@/features/lots/pages/LotDetailPage'
import LotHistoryPage from '@/features/lots/pages/LotHistoryPage'
import SensorPage from '@/features/sensor/pages/SensorPage'
import ProfilePage from '@/features/profile/pages/ProfilePage'
import LandingPage from '@/pages/LandingPage'

export default function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<AppShell withNavigation />}>
        <Route element={<HomePage />} path="/inicio" />
        <Route element={<LotDetailPage />} path="/lotes/:id" />
        <Route element={<SensorPage />} path="/lotes/:id/sensor" />
        <Route element={<AlertsPage />} path="/alertas" />
        <Route element={<ProfilePage />} path="/perfil" />
      </Route>
      <Route element={<AppShell />}>
        <Route element={<LotHistoryPage />} path="/lotes/:id/historico" />
      </Route>
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  )
}
