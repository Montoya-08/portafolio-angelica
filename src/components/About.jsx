import Section from './Section.jsx'
import { Icon } from '../data/icons.jsx'
import { personal as p } from '../data/personal.js'

export default function About() {
  return (
    <Section id="sobre-mi" eyebrow="Sobre mí" title="Perfil personal y profesional" alt>
      <div className="about-grid">
        <div className="about-txt">{p.about.map((t, i) => <p key={i}>{t}</p>)}</div>
        <div className="cards3">
          {p.pillars.map(c => (
            <article className="card pillar" key={c.title}>
              <span className="ico"><Icon name={c.icon} size={26} /></span>
              <h3>{c.title}</h3><p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
