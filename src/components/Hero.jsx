import { Github, Download, FolderOpen, User, Mail } from 'lucide-react'
import { personal as p } from '../data/personal.js'
import profile from '../assets/Angeana.jpeg' 

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-in">
        <div className="hero-img">
          <div className="blob b1" /><div className="blob b2" />
          <div className="avatar">
            {/* object-fit: contain → imagen completa, sin recortes ni filtros */}
            <img src={profile} alt={`Ilustración de perfil de ${p.name}`} width="465" height="283" />
          </div>
          <span className="tag">{p.badge}</span>
        </div>
        <div className="hero-txt">
          <span className={'avail' + (p.availability.available ? '' : ' off')}><i />{p.availability.available ? p.availability.text : 'No disponible por ahora'}</span>
          <h1>Hola, soy <em>{p.name}</em></h1>
          <p className="sub">{p.subtitle}</p>
          <p className="lead">{p.tagline}</p>
          <p className="desc">{p.intro}</p>
          <div className="btns">
            <a className="btn primary" href="#proyectos"><FolderOpen size={18} />Explorar proyectos</a>
            <a className="btn" href="#sobre-mi"><User size={18} />Conocer mi perfil</a>
            <a className="btn" href={import.meta.env.BASE_URL + p.cvFile} download><Download size={18} />Descargar hoja de vida</a>
            <a className="btn coral" href="#contacto"><Mail size={18} />Contactarme</a>
          </div>
          <div className="social">
            <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /> GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}
