import type { IconName } from '@/components/Icon'

export type Producer = {
  name: string
  role: string
  property: string
}

export type MenuRow = {
  icon: IconName
  label: string
  value: string
  // Linhas com ação viram botão; as demais são só informativas.
  onSelect?: () => void
}
