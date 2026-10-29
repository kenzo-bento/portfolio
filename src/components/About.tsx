import { GraduationCap } from 'lucide-react'
import { profile } from '../data/content'
import portrait from '../assets/kenneth-san.jpg'

export default function About() {
  return (
    <section id="about" className="hero" aria-labelledby="about-name">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-text">
            <p className="eyebrow">
              <span className="eyebrow-index">00</span> About
            </p>
            <h1 id="about-name" className="hero-name">
              {profile.name}
            </h1>
            <p className="hero-affil">
              <GraduationCap aria-hidden="true" size={18} strokeWidth={1.5} />
              <span>
                <strong>{profile.school}</strong>
                <span className="hero-degree">
                  {profile.status} · {profile.degree}
                </span>
              </span>
            </p>
          </div>
          <figure className="hero-portrait">
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={720}
              height={720}
              fetchPriority="high"
            />
          </figure>
        </div>

        <ol className="triad">
          {profile.triad.map((t, i) => (
            <li key={t.label}>
              <span className="triad-index">0{i + 1}</span>
              <span className="triad-label">{t.label}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>

        <div className="hero-intro">
          {profile.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
