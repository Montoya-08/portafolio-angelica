import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import Section from './Section.jsx'
import { personal as p } from '../data/personal.js'
import { skillCategories } from '../data/skills.js'
import { projects } from '../data/projects.js'
import { education } from '../data/education.js'

const fmt = s => `  • ${s.name}${s.level == null ? '' : ` (${s.level}%)`} — ${s.desc}`
const cat = id => ['Conocimientos:', ...skillCategories.find(c => c.id === id).skills.map(fmt)]

// Cada comando devuelve un arreglo de líneas. Agrega nuevos comandos aquí.
const commands = {
  help: () => ['Comandos disponibles:', '  help       mostrar esta ayuda', '  about      información personal', '  skills     todas las habilidades', '  software   desarrollo de software',
    '  data       análisis de datos', '  ai         inteligencia artificial', '  projects   proyectos', '  education  formación', '  contact    datos de contacto', '  clear      limpiar la terminal'],
  about: () => [p.name, p.subtitle, '', p.tagline, '', ...p.about],
  skills: () => skillCategories.flatMap(c => [`[${c.title}]`, ...c.skills.map(fmt), '']),
  software: () => cat('software'), data: () => cat('data'), ai: () => cat('ai'),
  projects: () => projects.map((x, i) => `${i + 1}. ${x.title} [${x.status === 'idea' ? 'idea / ejemplo' : 'desarrollado'}]`),
  education: () => education.map(e => `• ${e.name} — ${e.institution} (${e.start} – ${e.end})${e.demo ? ' [ejemplo]' : ''}`),
  contact: () => [`Correo:   ${p.email || '(sin configurar)'}`, `GitHub:   ${p.github}`, `WhatsApp: ${p.whatsapp ? '+' + p.whatsapp : '(sin configurar)'}`, `Ubicación: ${p.location || '(sin configurar)'}`],
}

export default function Terminal() {
  const [log, setLog] = useState([{ cmd: null, lines: ['Bienvenida a mi terminal interactiva.', 'Escribe "help" para ver los comandos disponibles.'], shown: 0 }])
  const [value, setValue] = useState('')
  const [hist, setHist] = useState([]); const [idx, setIdx] = useState(-1)
  const body = useRef(null)

  const run = raw => {
    const c = raw.trim().toLowerCase(); if (!c) return
    if (c === 'clear') { setLog([]); setValue(''); return }
    const fn = commands[c]
    setLog(l => [...l, { cmd: raw.trim(), lines: fn ? fn() : [`comando no encontrado: ${c}. Escribe "help".`], shown: 0 }])
    setHist(h => [...h, raw.trim()]); setIdx(-1); setValue('')
  }
  // Animación de escritura: revela una línea a la vez.
  useEffect(() => {
    const last = log[log.length - 1]
    if (!last || last.shown >= last.lines.length) return
    const t = setTimeout(() => setLog(l => l.map((e, i) => i === l.length - 1 ? { ...e, shown: e.shown + 1 } : e)), 40)
    return () => clearTimeout(t)
  }, [log])
  useEffect(() => { body.current && (body.current.scrollTop = body.current.scrollHeight) }, [log])

  const onKey = e => {
    if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); const i = idx < 0 ? hist.length - 1 : Math.max(0, idx - 1); setIdx(i); setValue(hist[i]) }
    if (e.key === 'ArrowDown' && idx >= 0) { e.preventDefault(); const i = idx + 1; if (i >= hist.length) { setIdx(-1); setValue('') } else { setIdx(i); setValue(hist[i]) } }
  }
  return (
    <Section id="terminal" eyebrow="Terminal" title="Explora mi perfil desde la consola">
      <div className="term" onClick={() => document.getElementById('term-in')?.focus()}>
        <div className="term-bar"><i /><i /><i /><span>{p.initials.toLowerCase()}@portafolio:~</span></div>
        <div className="term-body" ref={body} aria-live="polite">
          {log.map((e, i) => (
            <div key={i}>
              {e.cmd && <div><span className="ps">$</span> {e.cmd}</div>}
              {e.lines.slice(0, e.shown).map((l, j) => <div key={j} className="out">{l || '\u00A0'}</div>)}
            </div>
          ))}
          <form className="term-form" onSubmit={e => { e.preventDefault(); run(value) }}>
            <span className="ps">$</span>
            <input id="term-in" value={value} onChange={e => setValue(e.target.value)} onKeyDown={onKey} autoComplete="off" spellCheck="false" aria-label="Escribe un comando" placeholder="help" />
            <button type="submit" aria-label="Ejecutar comando"><Play size={16} /></button>
          </form>
        </div>
      </div>
      <div className="chips center">{Object.keys(commands).concat('clear').map(c => <button key={c} className="chip mono" onClick={() => run(c)}>{c}</button>)}</div>
    </Section>
  )
}
