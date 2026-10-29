import { skills } from '../data/content'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" index="03" label="Skills" title="Technical foundation">
      <div className="skills-grid">
        {skills.map((s) => (
          <div key={s.group} className="skill-group">
            <h3>{s.group}</h3>
            <ul>
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
