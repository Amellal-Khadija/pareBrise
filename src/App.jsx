import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import JobImages from './components/JobImages'
import Services from './components/Services'
import HowWeWork from './components/HowWeWork'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

const CarShowcase3D = lazy(() => import('./components/CarShowcase3D'))

function LazyCarShowcase() {
  const [visible, setVisible] = useState(false)
  const [isMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches
  )
  const ref = useRef()

  useEffect(() => {
    // On mobile, show immediately (no 3D canvas to lazy-load)
    if (isMobile) { setVisible(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '400px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [isMobile])

  const fallback = <div style={{ height: isMobile ? '0' : '600px', background: '#F8F7F4' }} />

  return (
    <div ref={ref}>
      {visible
        ? <Suspense fallback={fallback}><CarShowcase3D /></Suspense>
        : fallback
      }
    </div>
  )
}

function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)
  const [tip, setTip] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 2000)
    const t2 = setTimeout(() => setTip(false), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
        >
          <AnimatePresence>
            {tip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="relative text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap shadow-lg"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  background: '#ffffff',
                  color: '#0F172A',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                Besoin d&apos;aide ?
                <div
                  className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent"
                  style={{ borderLeftColor: '#ffffff' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="https://wa.me/212653633280?text=Bonjour%2C%20j%27ai%20besoin%20d%27un%20devis%20pour%20mon%20pare-brise."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter via WhatsApp"
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            style={{ background: '#25D366', boxShadow: '0 4px 24px rgba(37,211,102,0.45)' }}
          >
            <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: '#25D366' }} />
            <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.93 7.93 0 01-3.794-.964L4.1 19.02l1.137-4.052A7.93 7.93 0 0112.03 4.12 7.93 7.93 0 0120 12.029c0 4.372-3.558 7.851-7.971 7.851z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <HowWeWork />
      <LazyCarShowcase />
      <JobImages />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
