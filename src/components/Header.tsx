import { useEffect, useState } from 'react'
import { profile } from '../data/content'

const links = [
  { href: '#about', label: 'About' },
  { href: '#interests', label: 'Interests' },
  { href: '#research', label: 'Research' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [active, setActive] = useState('#about')

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((s): s is HTMLElement => s !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header" id="top">
      <div className="wrap header-inner">
        <a href="#about" className="wordmark">
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="nav-list">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={active === l.href ? 'location' : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
