import { useState } from 'react'
import { Mail, Github, MessageCircle, MapPin, Send } from 'lucide-react'
import Section from './Section.jsx'
import { personal as p } from '../data/personal.js'

// El envío real usa Formspree. Define VITE_FORMSPREE_ID en .env (ver README).
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' })
  const [err, setErr] = useState({})
  const [status, setStatus] = useState({ type: 'idle', msg: '' })

  const validate = () => {
    const e = {}
    if (f.name.trim().length < 2) e.name = 'Escribe tu nombre (mínimo 2 caracteres).'
    if (!f.email.trim()) e.email = 'El correo es obligatorio.'
    else if (!emailRe.test(f.email.trim())) e.email = 'Ingresa un correo válido.'
    if (f.subject.trim().length < 3) e.subject = 'Escribe un asunto.'
    if (f.message.trim().length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres.'
    return e
  }
  const submit = async ev => {
    ev.preventDefault()
    const e = validate(); setErr(e); if (Object.keys(e).length) return
    if (f._gotcha) return // anti-spam (honeypot)
    if (!FORM_ID) { setStatus({ type: 'error', msg: 'El envío aún no está configurado: falta VITE_FORMSPREE_ID (ver README). Tu mensaje NO fue enviado.' }); return }
    setStatus({ type: 'loading', msg: 'Enviando…' })
    try {
      const r = await fetch(`https://formspree.io/f/${FORM_ID}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(f) })
      if (!r.ok) throw new Error()
      setStatus({ type: 'ok', msg: '¡Mensaje enviado! Te responderé pronto.' }); setF({ name: '', email: '', subject: '', message: '', _gotcha: '' })
    } catch { setStatus({ type: 'error', msg: 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.' }) }
  }
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const field = (k, label, props = {}) => (
    <div className="field"><label htmlFor={k}>{label}</label>
      {props.area ? <textarea id={k} rows="5" value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} /> : <input id={k} type={props.type || 'text'} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} />}
      {err[k] && <small className="err" role="alert">{err[k]}</small>}</div>
  )
  const info = [
    [Mail, 'Correo', p.email, p.email && `mailto:${p.email}`], [Github, 'GitHub', p.github.replace('https://', ''), p.github],
    [MessageCircle, 'WhatsApp', p.whatsapp && '+' + p.whatsapp, p.whatsapp && `https://wa.me/${p.whatsapp}`], [MapPin, 'Ubicación', p.location, ''],
  ]
  return (
    <Section id="contacto" eyebrow="Contacto" title="Hablemos">
      <div className="contact-grid">
        <div className="info">
          {info.map(([I, k, v, href]) => (
            <div className="card info-row" key={k}><span className="ico sm"><I size={20} /></span>
              <div><small>{k}</small>{v ? (href ? <p><a href={href} target="_blank" rel="noopener noreferrer">{v}</a></p> : <p>{v}</p>) : <p className="muted">Sin configurar (src/data/personal.js)</p>}</div></div>
          ))}
        </div>
        <form className="card form" onSubmit={submit} noValidate>
          {field('name', 'Nombre')}{field('email', 'Correo electrónico', { type: 'email' })}{field('subject', 'Asunto')}{field('message', 'Mensaje', { area: true })}
          <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={f._gotcha} onChange={set('_gotcha')} />
          <button className="btn primary" type="submit" disabled={status.type === 'loading'}><Send size={18} />{status.type === 'loading' ? 'Enviando…' : 'Enviar mensaje'}</button>
          {status.msg && <p className={'notice ' + status.type} role="status">{status.msg}</p>}
        </form>
      </div>
    </Section>
  )
}
