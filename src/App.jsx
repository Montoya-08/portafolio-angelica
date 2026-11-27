import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Intro from './components/Intro.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Projects from './components/Projects.jsx'
import Terminal from './components/Terminal.jsx'
import Interests from './components/Interests.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  return (<>
    <a className="skip" href="#sobre-mi">Saltar al contenido</a>
    {showIntro && <Intro onEnter={() => setShowIntro(false)} />}
    {!showIntro && (
      <>
        <Navbar />
        <main><Hero /><About /><Skills /><Education /><Projects /><Terminal /><Interests /><Contact /></main>
        <Footer />
      </>
    )}
  </>)
}
