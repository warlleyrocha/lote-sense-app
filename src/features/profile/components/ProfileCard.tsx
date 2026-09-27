import type { Producer } from '../types'

type ProfileCardProps = {
  producer: Producer
  totalLots: number
  totalBags: number
}

export default function ProfileCard({ producer, totalLots, totalBags }: ProfileCardProps) {
  const initials = producer.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="rounded-card bg-primary p-5 text-surface shadow-card">
      <div className="flex items-center gap-3.5">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary-soft text-lg font-semibold text-primary">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold tracking-tight">{producer.name}</p>
          <p className="text-sm text-primary-pale">{producer.role}</p>
          <p className="text-sm text-primary-pale">{producer.property}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 divide-x divide-primary-line">
        <div className="pr-3">
          <p className="text-xl font-semibold">{totalLots}</p>
          <p className="mt-1 text-xs leading-tight text-primary-pale">Lotes monitorados</p>
        </div>
        <div className="pl-3">
          <p className="text-xl font-semibold">{totalBags}</p>
          <p className="mt-1 text-xs leading-tight text-primary-pale">Sacas monitoradas</p>
        </div>
      </div>
    </div>
  )
}
