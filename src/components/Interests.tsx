import { useState } from 'react'
import { interests, type InterestId } from '../data/content'
import Section from './Section'

// Node positions on a 300×260 canvas, arranged as a pentagon.
const layout: Record<InterestId, { x: number; y: number; short: string }> = {
  research: { x: 150, y: 34, short: 'Research' },
  engineering: { x: 262, y: 112, short: 'Engineering' },
  startups: { x: 222, y: 226, short: 'Startups' },
  hardware: { x: 78, y: 226, short: 'Hardware' },
  neuro: { x: 38, y: 112, short: 'Neuroscience' },
}

// Unique undirected edges derived from each interest's `connects` list.
const edges = (() => {
  const seen = new Set<string>()
  const out: [InterestId, InterestId][] = []
  for (const i of interests) {
    for (const c of i.connects) {
      const key = [i.id, c].sort().join('|')
      if (!seen.has(key)) {
        seen.add(key)
        out.push([i.id, c])
      }
    }
  }
  return out
})()

const titleOf = (id: InterestId) => interests.find((i) => i.id === id)!.title

export default function Interests() {
  const [focus, setFocus] = useState<InterestId | null>(null)
  const linked = (id: InterestId) =>
    focus === null || id === focus || interests.find((i) => i.id === focus)!.connects.includes(id)

  const map = (
    <figure className="interest-map" aria-hidden="true">
      <svg viewBox="0 0 300 260" role="presentation">
        {edges.map(([a, b]) => {
          const on = focus !== null && (a === focus || b === focus)
          return (
            <line
              key={`${a}-${b}`}
              x1={layout[a].x}
              y1={layout[a].y}
              x2={layout[b].x}
              y2={layout[b].y}
              className={on ? 'edge is-on' : focus ? 'edge is-dim' : 'edge'}
            />
          )
        })}
        {interests.map((i) => {
          const p = layout[i.id]
          const cls = focus === i.id ? 'node is-focus' : linked(i.id) ? 'node' : 'node is-dim'
          return (
            <g key={i.id} className={cls} transform={`translate(${p.x} ${p.y})`}>
              <circle r="5" />
              <text y={p.y > 150 ? 22 : -13} textAnchor="middle">
                {p.short}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption>Hover or tap an area to trace its connections.</figcaption>
    </figure>
  )

  return (
    <Section
      id="interests"
      index="01"
      label="Interests"
      title="Areas I'm exploring, and how they connect"
      aside={map}
    >
      <ol className="interest-list">
        {interests.map((i, n) => (
          <li
            key={i.id}
            className={`interest ${focus && !linked(i.id) ? 'is-dim' : ''}`}
            tabIndex={0}
            onMouseEnter={() => setFocus(i.id)}
            onMouseLeave={() => setFocus(null)}
            onFocus={() => setFocus(i.id)}
            onBlur={() => setFocus(null)}
          >
            <span className="interest-index">{String(n + 1).padStart(2, '0')}</span>
            <h3>{i.title}</h3>
            <p>{i.description}</p>
            <ul className="topic-list" aria-label={`${i.title} topics`}>
              {i.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="interest-links">
              <span>Connects to</span> {i.connects.map(titleOf).join(' · ')}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
