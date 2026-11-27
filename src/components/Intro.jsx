import React from 'react'
import { personal as p } from '../data/personal.js'

const petalColors = ['var(--coral)', 'var(--orange)', '#F4A261', '#E76F51', '#F8B195', '#F67280']
const petalCount = 20

const petals = Array.from({ length: petalCount }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * -30,
  size: 8 + Math.random() * 14,
  color: petalColors[i % petalColors.length],
  delay: Math.random() * 10,
  duration: 5 + Math.random() * 10,
  sway: 6 + Math.random() * 12,
  rot: Math.random() * 360,
}))

export default function Intro({ onEnter }) {
  const [hiding, setHiding] = React.useState(false)
  const [displayedName, setDisplayedName] = React.useState('')
  const [cursorVisible, setCursorVisible] = React.useState(true)

  React.useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedName(p.name.slice(0, i + 1))
      i++
      if (i >= p.name.length) clearInterval(interval)
    }, 110)
    return () => clearInterval(interval)
  }, [p.name])

  React.useEffect(() => {
    const timer = setInterval(() => setCursorVisible((v) => !v), 500)
    return () => clearInterval(timer)
  }, [])

  const handleClick = () => {
    setHiding(true)
    setTimeout(() => onEnter(), 900)
  }

  return (
    <div className="intro" data-hiding={hiding ? 'true' : null} onClick={handleClick}>
      <div className="petals">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              top: `${petal.top}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 0.55}px`,
              backgroundColor: petal.color,
              '--sway': `${petal.sway}px`,
              animationDelay: `-${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              transform: `rotate(${petal.rot}deg)`,
            }}
          />
        ))}
      </div>
      <div className="intro-content">
        <h1>{displayedName}<span className="cursor" style={{ opacity: cursorVisible ? 1 : 0 }}>&nbsp;</span></h1>
      </div>
      <button className="skip-btn" onClick={handleClick}>Omitir</button>
    </div>
  )
}
