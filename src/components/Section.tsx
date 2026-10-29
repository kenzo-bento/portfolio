import type { ReactNode } from 'react'
import { useReveal } from './useReveal'

interface SectionProps {
  id: string
  index: string
  label: string
  title?: string
  aside?: ReactNode
  children: ReactNode
}

export default function Section({ id, index, label, title, aside, children }: SectionProps) {
  const ref = useReveal<HTMLElement>()
  return (
    <section id={id} className="section reveal" ref={ref} aria-labelledby={`${id}-label`}>
      <div className="wrap section-grid">
        <header className="section-head">
          <p className="eyebrow" id={`${id}-label`}>
            <span className="eyebrow-index">{index}</span> {label}
          </p>
          {title && <h2 className="section-title">{title}</h2>}
          {aside}
        </header>
        <div className="section-body">{children}</div>
      </div>
    </section>
  )
}
