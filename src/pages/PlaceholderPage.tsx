export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="px-page pt-10">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-base leading-relaxed text-ink-muted">Esta seção estará disponível em breve.</p>
    </div>
  )
}
