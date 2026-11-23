import Section from './Section.jsx'
import { Icon } from '../data/icons.jsx'
import { personal } from '../data/personal.js'

export default function Interests() {
  return (
    <Section id="intereses" eyebrow="Intereses" title="Áreas en las que quiero crear soluciones" alt>
      <div className="grid interests">
        {personal.interests.map(i => (
          <article className="card hover-lift" key={i.title}><span className="ico"><Icon name={i.icon} /></span><h3>{i.title}</h3><p>{i.text}</p></article>
        ))}
      </div>
    </Section>
  )
}
