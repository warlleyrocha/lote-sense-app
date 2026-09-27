import { Link } from 'react-router'

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-canvas px-page text-center">
      <h1 className="max-w-2xl text-xl font-semibold tracking-tight text-balance text-ink sm:text-3xl lg:text-4xl">
        Pelo visto
        <br />
        você gostou da nossa ideia!
      </h1>
      <Link
        className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-surface hover:bg-primary-hover"
        to="/inicio"
      >
        Acesse o app
      </Link>
    </div>
  )
}
