import { Github, Mail } from 'lucide-react'
import { personal as p } from '../data/personal.js'

export default function Footer() {
  const nav = [['inicio','Inicio'],['sobre-mi','Sobre mí'],['habilidades','Habilidades'],['proyectos','Proyectos'],['contacto','Contacto']]
  return (
    <footer className="footer">
      <div className="container foot-in">
        <div><strong>{p.name}</strong><p>{p.subtitle}</p>
          <div className="social">
            <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
            {p.email && <a href={`mailto:${p.email}`} aria-label="Correo"><Mail size={20} /></a>}
          </div></div>
        <nav aria-label="Navegación rápida">{nav.map(([id, t]) => <a key={id} href={'#' + id}>{t}</a>)}</nav>
      </div>
      <p className="copy">© {new Date().getFullYear()} {p.name}. Todos los derechos reservados.</p>
    </footer>
  )
}
