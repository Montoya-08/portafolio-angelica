import { useEffect, useState } from 'react'
import { Github, ExternalLink, X, FolderGit2 } from 'lucide-react'
import Section from './Section.jsx'
import { projects, projectFilters } from '../data/projects.js'

function Links({ p }) {
  const btn = (href, icon, label, cls) => href
    ? <a className={'btn sm ' + cls} href={href} target="_blank" rel="noopener noreferrer">{icon}{label}</a>
    : <button className="btn sm" disabled title="Disponible cuando se agregue la evidencia real del proyecto">{icon}{label}</button>
  return <div className="btns">{btn(p.github, <Github size={16} />, 'GitHub', '')}</div>
}

export default function Projects() {
  const [filter, setFilter] = useState('Todos')
  const [sel, setSel] = useState(null)
  const list = projects.filter(p => filter === 'Todos' || p.categories.includes(filter))
  useEffect(() => {
    if (!sel) return
    const onKey = e => e.key === 'Escape' && setSel(null)
    document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [sel])
  const badge = p => <span className={'status ' + p.status}>{p.status === 'idea' ? 'Idea / ejemplo' : 'Desarrollado'}</span>
  return (
    <Section id="proyectos" eyebrow="Proyectos" title="Galería de proyectos">
      <div className="chips" aria-label="Filtros de proyectos">
        {projectFilters.map(f => <button key={f} className={'chip' + (filter === f ? ' on' : '')} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>)}
      </div>
      {list.length === 0 && <p className="muted">Aún no hay proyectos en esta categoría.</p>}
      <div className="grid projects">
        {list.map(p => (
          <article className="card proj" key={p.id}>
            <div className="thumb">{p.image ? <img src={p.image} alt={`Captura de ${p.title}`} loading="lazy" /> : <FolderGit2 size={44} aria-hidden="true" />}</div>
            <div className="proj-body">
              <div className="row"><span className="cat">{p.categories[0]}</span>{badge(p)}</div>
              <h3>{p.title}</h3><p>{p.description}</p>
              <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
              <button className="btn sm primary" onClick={() => setSel(p)}>Ver detalles</button>
            </div>
          </article>
        ))}
      </div>
      {sel && (
        <div className="modal" onClick={() => setSel(null)}>
          <div className="modal-box" role="dialog" aria-modal="true" aria-label={sel.title} onClick={e => e.stopPropagation()}>
            <button className="close" aria-label="Cerrar" onClick={() => setSel(null)}><X /></button>
            <div className="row"><span className="cat">{sel.categories.join(' · ')}</span>{badge(sel)}</div>
            <h3>{sel.title}</h3>
            {[['Descripción', sel.description], ['Problema que resuelve', sel.problem], ['Metodología', sel.methodology], ['Resultados', sel.results]].map(([k, v]) => <div key={k}><h4>{k}</h4><p>{v}</p></div>)}
            <h4>Tecnologías</h4><div className="tags">{sel.tech.map(t => <span key={t}>{t}</span>)}</div>
            <Links p={sel} />
          </div>
        </div>
      )}
    </Section>
  )
}
