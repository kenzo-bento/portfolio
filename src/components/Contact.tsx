import { ArrowUpRight, Mail } from 'lucide-react'
import { contact } from '../data/content'
import { GitHubIcon, LinkedInIcon } from './BrandIcons'
import Section from './Section'

export default function Contact() {
  const items = [
    contact.email && {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: <Mail aria-hidden="true" size={18} strokeWidth={1.5} />,
      external: false,
    },
    contact.github && {
      label: 'GitHub',
      value: contact.github.replace(/^https?:\/\/(www\.)?/, ''),
      href: contact.github,
      icon: <GitHubIcon />,
      external: true,
    },
    contact.linkedin && {
      label: 'LinkedIn',
      value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: contact.linkedin,
      icon: <LinkedInIcon />,
      external: true,
    },
  ].filter((x) => !!x)

  return (
    <Section id="contact" index="04" label="Contact" title="Get in touch">
      <p className="contact-lede">
        I'm always glad to talk about research, AI systems, hardware, or early-stage ideas.
      </p>
      <ul className="contact-list">
        {items.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="contact-icon">{c.icon}</span>
              <span className="contact-label">{c.label}</span>
              <span className="contact-value">{c.value}</span>
              <ArrowUpRight className="contact-arrow" aria-hidden="true" size={16} />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
