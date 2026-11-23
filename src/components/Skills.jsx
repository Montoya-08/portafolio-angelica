import { useState } from 'react'
import Section from './Section.jsx'
import { Icon } from '../data/icons.jsx'
import { skillCategories, softSkills } from '../data/skills.js'

export default function Skills() {
  const [cat, setCat] = useState('all')
  const shown = skillCategories.filter(c => cat === 'all' || c.id === cat)
  return (
    <Section id="habilidades" eyebrow="Habilidades" title="Matriz de habilidades técnicas">
      <div className="chips" role="tablist" aria-label="Categorías">
        {[{ id: 'all', title: 'Todas' }, ...skillCategories].map(c => (
          <button key={c.id} role="tab" aria-selected={cat === c.id} className={'chip' + (cat === c.id ? ' on' : '')} onClick={() => setCat(c.id)}>{c.title}</button>
        ))}
      </div>
      {shown.map(c => (
        <div key={c.id} className="skill-group">
          <h3>{c.title}</h3>
          <div className="grid skills">
            {c.skills.map(s => (
              <article className="card skill" key={s.name}>
                <div className="skill-top"><span className="ico sm"><Icon name={s.icon} size={20} /></span><strong>{s.name}</strong></div>
                <p>{s.desc}</p>
                <div className="meter" role="progressbar" aria-label={`Nivel de ${s.name}`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={s.level ?? undefined}>
                  <i style={{ width: (s.level ?? 0) + '%' }} className={s.level == null ? 'empty' : ''} />
                </div>
                <small>{s.level == null ? 'Nivel por definir' : s.level + '%'}</small>
              </article>
            ))}
          </div>
        </div>
      ))}
      <div className="skill-group"><h3>Habilidades blandas</h3>
        <ul className="soft">{softSkills.map(s => <li key={s}>{s}</li>)}</ul></div>
    </Section>
  )
}
