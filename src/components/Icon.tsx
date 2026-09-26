import type { ReactNode } from 'react'

export type IconName =
  | 'bell'
  | 'user'
  | 'home'
  | 'alert'
  | 'chevron'
  | 'thermometer'
  | 'droplet'
  | 'check'
  | 'close'
  | 'arrow-left'
  | 'history'
  | 'signal'
  | 'battery'

type IconProps = {
  name: IconName
  className?: string
}

export default function Icon({ name, className = 'size-5' }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    alert: (
      <>
        <path d="M12 3 2.8 19h18.4Z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    thermometer: (
      <>
        <path d="M14 14.8V5a4 4 0 0 0-8 0v9.8a6 6 0 1 0 8 0Z" />
        <path d="M10 7v10" />
      </>
    ),
    droplet: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    "arrow-left": (
      <>
        <path d="m15 18-6-6 6-6" />
        <path d="M9 12h11" />
      </>
    ),
    history: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
        <path d="M3 3v5h5M12 7v5l3 2" />
      </>
    ),
    signal: <path d="M4 20v-4M9 20v-8M14 20V8M19 20V4" />,
    battery: (
      <>
        <rect height="10" rx="2" width="17" x="2" y="7" />
        <path d="M22 11v2M6 10v4" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}
