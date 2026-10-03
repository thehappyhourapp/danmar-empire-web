import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.tsx'

// Bodoni Moda and Libre Franklin are embedded in fonts.css, so the brand faces
// render correctly offline and in the single-file bundle. The link below only
// supplies the prototype-only alternates used by the TypeSwitch control.
;(() => {
  const add = (rel: string, href: string, cross?: boolean) => {
    const l = document.createElement('link')
    l.rel = rel; l.href = href
    if (cross) l.crossOrigin = ''
    document.head.appendChild(l)
  }
  add('preconnect', 'https://fonts.googleapis.com')
  add('preconnect', 'https://fonts.gstatic.com', true)
  add('stylesheet', 'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Cinzel:wght@400;500;600&family=Marcellus&family=Prata&family=Cormorant+Garamond:wght@400;500;600&display=swap')
  document.title = 'Danmar Empire — Real Estate Corp., Brokerage'
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
