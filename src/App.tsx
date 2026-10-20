import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import NotFound from './pages/NotFound'

/** Scrolls to the hash target (or top) on navigation, respecting reduced motion. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }
    const t = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    }, 60)
    return () => window.clearTimeout(t)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[100] rounded-lg bg-white px-4 py-2 font-semibold text-midnight focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
