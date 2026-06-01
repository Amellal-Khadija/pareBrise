import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Ahmed R.',
    city: 'Casablanca',
    stars: 5,
    avatar: 'AR',
    text: "Intervention rapide, technicien professionnel. Mon pare-brise a été remplacé en moins d'une heure à domicile ! Service impeccable, je recommande sans hésitation.",
  },
  {
    name: 'Fatima L.',
    city: 'Rabat',
    stars: 5,
    avatar: 'FL',
    text: "Prix honnête et travail impeccable. L'assurance a tout pris en charge, zéro avance de frais. La démarche administrative a été entièrement gérée par l'équipe.",
  },
  {
    name: 'Karim B.',
    city: 'Marrakech',
    stars: 4,
    avatar: 'KB',
    text: "Service client très réactif. Rendez-vous obtenu le lendemain, résultat parfait. Le technicien était ponctuel et très soigneux dans son travail.",
  },
  {
    name: 'Sara M.',
    city: 'Casablanca',
    stars: 5,
    avatar: 'SM',
    text: "J'avais un impact sur le pare-brise, réparé en 20 minutes devant mon bureau. Invisible ! Excellent rapport qualité/prix, je n'aurais pas pu espérer mieux.",
  },
  {
    name: 'Youssef A.',
    city: 'Agadir',
    stars: 5,
    avatar: 'YA',
    text: "Excellent rapport qualité/prix. Je recommande à toute ma famille. Le technicien a pris le temps d'expliquer chaque étape et le résultat est parfait.",
  },
  {
    name: 'Nadia K.',
    city: 'Tanger',
    stars: 5,
    avatar: 'NK',
    text: "Technicien ponctuel, soigneux, et très sympa. La calibration ADAS a été faite correctement, toutes les caméras fonctionnent parfaitement. Très satisfaite !",
  },
]

const BOTTOM_STATS = [
  { n: '2 400+', l: 'Avis vérifiés' },
  { n: '4.9/5',  l: 'Note Google'   },
  { n: '98%',    l: 'Recommandations' },
  { n: '0',      l: 'Avis négatifs ignorés' },
]

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill={i <= n ? '#F97316' : '#e2e8f0'}>
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => { setDir(1); setCurrent(c => (c + 1) % REVIEWS.length) }, [])
  const prev = useCallback(() => { setDir(-1); setCurrent(c => (c - 1 + REVIEWS.length) % REVIEWS.length) }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [paused, next])

  const r = REVIEWS[current]

  return (
    <section
      id="testimonials"
      style={{ background: '#ffffff', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="section-wrap relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="mb-4 uppercase tracking-[4px] text-[10px] font-bold"
            style={{ fontFamily: 'DM Sans, sans-serif', color: '#0EA5E9' }}
          >
            Avis clients
          </p>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              color: '#0c1a3a',
              marginBottom: '1rem',
            }}
          >
            Ils nous font confiance
          </h2>
          <div className="flex items-center justify-center gap-2">
            <Stars n={5} />
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#64748b' }}>
              <strong style={{ color: '#0c1a3a' }}>4.9/5</strong> · 2 400+ avis vérifiés
            </span>
          </div>
        </motion.div>

        {/* Slider */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-2xl text-center bg-white"
              style={{
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
              }}
            >
              {/* Quote icon */}
              <svg className="w-8 h-8 mx-auto mb-5" viewBox="0 0 24 24" fill="rgba(14,165,233,0.15)">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <Stars n={r.stars} />
              <div className="mt-1 mb-6" />

              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '16px',
                  color: '#475569',
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              <div
                className="mt-8 pt-6 flex items-center justify-center gap-4"
                style={{ borderTop: '1px solid #f1f5f9' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: '#EFF8FF', color: '#0EA5E9', border: '1px solid rgba(14,165,233,0.25)' }}
                >
                  {r.avatar}
                </div>
                <div className="text-left">
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#0c1a3a' }}>
                    {r.name}
                  </div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#94a3b8' }}>
                    {r.city}
                  </div>
                </div>
                {/* Google badge */}
                <div
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg flex-shrink-0"
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
                    Google
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            aria-label="Avis précédent"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full items-center justify-center transition-all hidden md:flex bg-white"
            style={{ border: '1px solid #e2e8f0', color: '#94a3b8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; e.currentTarget.style.color = '#0EA5E9' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#94a3b8' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Avis suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full items-center justify-center transition-all hidden md:flex bg-white"
            style={{ border: '1px solid #e2e8f0', color: '#94a3b8', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'; e.currentTarget.style.color = '#0EA5E9' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#94a3b8' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((rev, i) => (
            <button
              key={rev.name}
              onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
              aria-label={`Témoignage ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: current === i ? '2rem' : '0.5rem',
                height: '0.5rem',
                background: current === i ? '#0EA5E9' : '#e2e8f0',
              }}
            />
          ))}
        </div>

        {/* Bottom trust row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {BOTTOM_STATS.map(({ n, l }) => (
            <div
              key={l}
              className="text-center p-4 rounded-xl"
              style={{ background: '#F8F7F4', border: '1px solid #e2e8f0' }}
            >
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#0EA5E9', lineHeight: 1 }}>
                {n}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#64748b', marginTop: '0.25rem' }}>
                {l}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
