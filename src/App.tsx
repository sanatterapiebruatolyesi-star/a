import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Artist from '@/pages/Artist'
import Portfolio from '@/pages/Portfolio'
import Events from '@/pages/Events'
import Atelier from '@/pages/Atelier'
import Contact from '@/pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sanatci" element={<Artist />} />
          <Route path="/eserler" element={<Portfolio />} />
          <Route path="/etkinlikler" element={<Events />} />
          <Route path="/atolye" element={<Atelier />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
