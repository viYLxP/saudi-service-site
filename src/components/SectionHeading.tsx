interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'start' | 'center'
}

export function SectionHeading({ id, eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={`section-heading align-${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
