import { useState } from 'react'
import { ChevronDown, Award } from 'lucide-react'
import Section from './Section.jsx'
import { education } from '../data/education.js'

export default function Education() {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <Section id="formacion" eyebrow="Formación" title="Formación y trayectoria" alt>
      <ol className="timeline">
        {education.map((e, i) => (
          <li key={i} className={openIdx === i ? 'open' : ''}>
            <button className="tl-head" aria-expanded={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
              <span><small>{e.type}{e.demo && <b className="demo"></b>}</small><strong>{e.name}</strong>
                <em>{e.institution} · {e.start} – {e.end}</em></span>
              <ChevronDown size={20} />
            </button>
            {openIdx === i && (
              <div className="tl-body">
                <p>{e.description}</p>
                {e.tech?.length > 0 && <div className="tags">{e.tech.map(t => <span key={t}>{t}</span>)}</div>}
                {e.certificate && <a className="btn sm" href={e.certificate} target="_blank" rel="noopener noreferrer"><Award size={16} />Ver certificado</a>}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
