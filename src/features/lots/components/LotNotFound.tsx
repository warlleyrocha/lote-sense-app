import { Link } from 'react-router'

export default function LotNotFound() {
  return (
    <div className="px-page pt-10">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Lote não encontrado</h1>
      <p className="mt-2 text-base leading-relaxed text-ink-muted">
        Não encontramos o lote solicitado.
      </p>
      <Link
        className="mt-6 inline-flex rounded-inner bg-primary px-4 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-hover"
        to="/inicio"
      >
        Voltar para o início
      </Link>
    </div>
  )
}
