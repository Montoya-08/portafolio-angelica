import { useEffect, useRef } from 'react'
// Contenedor de sección con animación de entrada al hacer scroll.
export default function Section({ id, eyebrow, title, alt, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { el?.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.08 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return (
    <section id={id} className={'section' + (alt ? ' alt' : '')} aria-labelledby={id + '-t'}>
      <div className="container reveal" ref={ref}>
        {title && <header className="sec-head"><span className="eyebrow">{eyebrow}</span><h2 id={id + '-t'}>{title}</h2><i className="bar" /></header>}
        {children}
      </div>
    </section>
  )
}
