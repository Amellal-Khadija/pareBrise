import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIDEOS = [
  '/video-promo.mp4',
  '/video-remplacement1.mp4',
  '/video-technicien.mp4',
]

const SLIDES = [
  { eyebrow: 'Expertise & Précision',    title: ['Votre pare-brise,', 'remplacé en 60 min.'] },
  { eyebrow: 'À domicile ou en atelier', title: ['Un service pensé', 'pour votre confort.'] },
  { eyebrow: 'Garantie à vie',           title: ['Toutes marques,', 'toutes assurances.'] },
]

export default function Hero() {
  const [vidIdx, setVidIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setVidIdx(i => (i + 1) % VIDEOS.length), 6000)
    return () => clearInterval(t)
  }, [paused])

  const slide = SLIDES[vidIdx]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        /* Desktop: strip(36) + bar(84) = 120px */
        /* Mobile:  strip(36) + bar(70) = 106px */
        .hero-root { padding-top: 120px; }
        @media (max-width: 1023px) { .hero-root { padding-top: 106px; } }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 11px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }
        .hero-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(40px, 5.5vw, 74px);
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: #ffffff;
        }
        .hero-title-accent { color: #F97316; }

        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 17px;
          color: rgba(255,255,255,0.58);
          line-height: 1.7;
          max-width: 420px;
        }

        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 32px; border-radius: 100px;
          background: #F97316; color: #ffffff;
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 15px;
          text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hero-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(249,115,22,0.4); }

        .hero-cta-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 28px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(8px);
          color: rgba(255,255,255,0.85);
          font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 15px;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .hero-cta-secondary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.4); }

        .hero-stat-num {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 26px;
          color: #ffffff; line-height: 1;
        }
        .hero-stat-lbl {
          font-family: 'DM Sans', sans-serif; font-weight: 300; font-size: 11px;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.42); text-transform: uppercase;
        }
        .hero-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.12); align-self: center; }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        @media (max-width: 480px) {
          .hero-content-block { max-width: 100% !important; }
        }

        @media (max-width: 480px) {
          .hero-title  { font-size: 26px !important; line-height: 1.15 !important; letter-spacing: -0.02em !important; }
          .hero-sub    { font-size: 13px !important; margin-bottom: 24px !important; max-width: 100% !important; }
          .hero-eyebrow { font-size: 9px !important; letter-spacing: 0.18em !important; }
          .hero-ctas   { flex-direction: column; align-items: flex-start; gap: 8px; }
          .hero-cta-primary  { padding: 12px 22px; font-size: 13px; gap: 7px; }
          .hero-cta-secondary { padding: 11px 20px; font-size: 13px; }
          .hero-live-badge { font-size: 10px; padding: 5px 10px; margin-bottom: 14px; gap: 6px; }
          .hero-stat-num  { font-size: 18px; }
          .hero-divider   { display: none; }
        }

        .hero-live-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 14px; border-radius: 100px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
          font-family: 'DM Sans', sans-serif; font-size: 12px; color: rgba(255,255,255,0.72);
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
        }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .hero-cta-primary {
          position: relative;
          overflow: hidden;
        }
        .hero-cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%);
          background-size: 200% 100%;
          animation: shimmer 3s ease infinite;
          border-radius: 100px;
          pointer-events: none;
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-screen flex items-end overflow-hidden hero-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.video
              key={vidIdx}
              src={VIDEOS[vidIdx]}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(15,23,42,0.80) 0%, rgba(15,23,42,0.42) 60%, rgba(15,23,42,0.22) 100%)'
          }} />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, transparent 55%)'
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(108deg, transparent 0px, transparent 52px, rgba(255,255,255,0.028) 52px, rgba(255,255,255,0.028) 54px)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-10 lg:px-20 pb-32 sm:pb-24 lg:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={vidIdx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="max-w-3xl hero-content-block"
            >
              {/* Live badge */}
              <div className="hero-live-badge">
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22C55E', animation: 'pulse-dot 1.8s ease-in-out infinite', flexShrink: 0 }} />
                Disponible 7j/7 — Casablanca & alentours
              </div>

              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <div style={{ width: '28px', height: '2px', background: '#F97316', borderRadius: '2px' }} />
                <span className="hero-eyebrow">{slide.eyebrow}</span>
              </div>

              {/* Title */}
              <h1 className="hero-title" style={{ marginBottom: '22px' }}>
                {slide.title[0]}<br />
                <span className="hero-title-accent">{slide.title[1]}</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-sub" style={{ marginBottom: '40px' }}>
                À domicile ou en atelier — toutes marques, prise en charge assurance, garantie à vie.
              </p>

              {/* CTAs */}
              <div className="hero-ctas">
                <a href="#contact" className="hero-cta-primary">
                  Devis gratuit — 30 min
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#services" className="hero-cta-secondary">Voir nos services</a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '40px' }}
          >
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                style={{ border: 'none', background: 'none', padding: '6px 2px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={() => setVidIdx(i)}
                aria-label={`Vidéo ${i + 1}`}
              >
                <div style={{
                  height: '4px',
                  width: i === vidIdx ? '32px' : '8px',
                  borderRadius: '100px',
                  background: i === vidIdx ? '#F97316' : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  boxShadow: i === vidIdx ? '0 0 10px rgba(249,115,22,0.5)' : 'none',
                }} />
              </button>
            ))}
          </motion.div>
        </div>

        {/* Diagonal SVG — transition Hero dark → About light */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          lineHeight: 0, zIndex: 10, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '64px' }}>
            <path d="M0,64 L1440,8 L1440,64 Z" fill="#F8F7F4" />
          </svg>
        </div>

      </section>
    </>
  )
}
