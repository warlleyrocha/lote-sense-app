import { Link } from 'react-router'

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-canvas px-page text-center">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Pelo visto você ficou interessado</h1>
      <Link
        className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-surface hover:bg-primary-hover"
        to="/inicio"
      >
        Acesse o app
      </Link>
    </div>
  )
}
