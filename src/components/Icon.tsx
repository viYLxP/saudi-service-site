import type { SVGProps } from 'react'

const paths = {
  ac: 'M3 5h18v8H3zM7 9h10M7 17v2M12 16v4M17 17v2',
  cleaning: 'M12 3v7M8 10h8l1 4H7zM7 14l-1 7h12l-1-7M10 18v3M14 18v3',
  plumbing: 'M4 8h8a4 4 0 0 1 4 4v1h3v6h-6v-4a1 1 0 0 0-1-1H4zM4 5v6',
  electrical: 'M13 2 4 14h7l-1 8 9-12h-7z',
  pest: 'M12 6a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V9a3 3 0 0 1 3-3zM12 6V3M9 10H5M15 10h4M9 14H4M15 14h5M10 18l-3 3M14 18l3 3',
  moving: 'M2 6h11v10H2zM13 9h5l3 4v3h-8zM6 19a2 2 0 1 0 0-.01M17 19a2 2 0 1 0 0-.01',
  whatsapp:
    'M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zM8.5 8.3c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.4l.8 1.8c.1.2.1.4 0 .6l-.5.7c-.1.2-.1.3 0 .5a6 6 0 0 0 2.8 2.5c.2.1.3.1.5-.1l.6-.8c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.5 0 .5-.2 1.4-1.2 1.8-1 .4-2.6.2-4.6-1.2A9 9 0 0 1 8 10.8c-.2-.9 0-1.9.5-2.5z',
  phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  pin: 'M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12zM12 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
  check: 'M5 12l5 5L20 7',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6 6 18',
  /** Points toward the inline end; flipped automatically in RTL via the `flip` prop. */
  arrow: 'M5 12h14M13 6l6 6-6 6',
  chevronDown: 'M6 9l6 6 6-6',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9M12 3C9.5 5.5 8.5 8.5 8.5 12s1 6.5 3.5 9',
  shield: 'M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z M9 12l2 2 4-4',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
  info: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 7.5v.5',
  alert: 'M12 3 2 20h20zM12 10v4M12 17v.5',
  copy: 'M8 8h12v12H8zM4 16V4h12',
  edit: 'M4 20h4L19 9l-4-4L4 16zM14 6l4 4',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
} as const

export type IconName = keyof typeof paths

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
  /** Mirror horizontally in RTL (for directional icons such as arrows). */
  flip?: boolean
}

export function Icon({ name, size = 20, flip = false, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={['icon', flip ? 'icon-flip' : '', className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  )
}
