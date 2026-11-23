import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/personal.js'

const links = [['inicio','Inicio'],['sobre-mi','Sobre mí'],['habilidades','Habilidades'],['formacion','Formación'],['proyectos','Proyectos'],['terminal','Terminal'],['contacto','Contacto']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  useEffect(() => {
    const onScroll = () => {
      let cur = 'inicio'
      for (const [id] of links) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= 140) cur = id }
      setActive(cur)
    }
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className="nav">
      <div className="container nav-in">
        <a href="#inicio" className="logo" aria-label={personal.name}><span>{personal.initials}</span>MONTOYA TAMAYO</a>
        <button className="burger" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav className={open ? 'open' : ''} aria-label="Principal">
          {links.map(([id, t]) => <a key={id} href={'#' + id} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{t}</a>)}
        </nav>
      </div>
    </header>
  )
}
