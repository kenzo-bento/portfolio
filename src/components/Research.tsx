import { ArrowUpRight, Code2, FileText } from 'lucide-react'
import { publications } from '../data/content'
import Section from './Section'

export default function Research() {
  return (
    <Section id="research" index="02" label="Research" title="Publications">
      <ol className="pub-list">
        {publications.map((p) => (
          <li key={p.doi}>
            <article className="pub">
              <div className="pub-meta">
                <span className="pub-year">{p.year}</span>
                <span className="pub-venue-tag">{p.venue}</span>
              </div>
              <div className="pub-main">
                <h3 className="pub-title">{p.title}</h3>
                <p className="pub-authors">
                  {p.authors.map((a, i) => (
                    <span key={a}>
                      {i > 0 && ', '}
                      {a.startsWith('Kenneth San') ? <strong>{a}</strong> : a}
                    </span>
                  ))}
                  {p.authorsEtAl && <>, <em>et al.</em></>}
                </p>
                <p className="pub-venue">
                  <em>{p.venueFull}</em> ({p.venue}), {p.year}.
                  <span className="pub-note">{p.note}</span>
                </p>
                <p className="pub-abstract">{p.abstract}</p>
                <div className="pub-links">
                  <a className="pub-doi" href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener noreferrer">
                    <span className="pub-doi-label">DOI</span>
                    <span>{p.doi}</span>
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </a>
                  {p.pdf && (
                    <a className="pub-link" href={p.pdf} target="_blank" rel="noopener noreferrer">
                      <FileText aria-hidden="true" size={15} /> PDF
                    </a>
                  )}
                  {p.code && (
                    <a className="pub-link" href={p.code} target="_blank" rel="noopener noreferrer">
                      <Code2 aria-hidden="true" size={15} /> Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
