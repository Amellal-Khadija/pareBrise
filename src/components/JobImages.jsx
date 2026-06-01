import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IMAGES = [
  {
    id: 1,
    src: '/images/photo-7.jpeg',
    alt: 'Atelier professionnel ClearAuto Casablanca',
    category: 'Atelier',
    label: 'Atelier Casablanca',
  },
  {
    id: 2,
    src: '/images/photo-2.jpeg',
    alt: 'Pose pare-brise en atelier',
    category: 'Atelier',
    label: 'Pose professionnelle',
  },
  {
    id: 3,
    src: '/images/photo-3.jpeg',
    alt: 'Technicien certifié au travail',
    category: 'Atelier',
    label: 'Technicien certifié',
  },
  {
    id: 4,
    src: '/images/photo-6.jpeg',
    alt: 'Application joint pare-brise',
    category: 'Atelier',
    label: 'Application du joint',
  },
  {
    id: 5,
    src: '/images/photo-8.jpeg',
    alt: 'Camionnette équipée ClearAuto',
    category: 'Intervention mobile',
    label: 'Camionnette équipée',
  },
  {
    id: 6,
    src: '/images/photo-1.jpeg',
    alt: 'Équipe de techniciens ClearAuto',
    category: 'Équipe',
    label: 'Notre équipe',
  },
  {
    id: 7,
    src: '/images/photo-5.jpeg',
    alt: 'Pare-brise fissuré avant réparation',
    category: 'Avant / Après',
    label: 'Avant réparation',
  },
  {
    id: 8,
    src: '/images/photo-4.jpeg',
    alt: 'Pare-brise après réparation',
    category: 'Avant / Après',
    label: 'Après réparation',
  },
]

const CATEGORIES = ['Tous', 'Atelier', 'Intervention mobile', 'Équipe', 'Avant / Après']

const CAT_ICONS = {
  'Tous':                '◈',
  'Atelier':             '🔧',
  'Intervention mobile': '🚐',
  'Équipe':              '👥',
  'Avant / Après':       '✦',
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.1, 1] },
})

export default function JobImages() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [lightboxIdx, setLightboxIdx]       = useState(null)

  const filtered = activeCategory === 'Tous'
    ? IMAGES
    : IMAGES.filter(img => img.category === activeCategory)

  const closeLightbox = useCallback(() => setLightboxIdx(null), [])
  const prevImage     = useCallback(() => setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const nextImage     = useCallback(() => setLightboxIdx(i => (i + 1) % filtered.length), [filtered.length])

  useEffect(() => {
    if (lightboxIdx === null) return
    const onKey = e => {
      if (e.key === 'Escape')      closeLightbox()
      if (e.key === 'ArrowLeft')   prevImage()
      if (e.key === 'ArrowRight')  nextImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, closeLightbox, prevImage, nextImage])

  useEffect(() => { setLightboxIdx(null) }, [activeCategory])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        #realisations {
          background: #ffffff;
          padding: 96px 0;
          position: relative;
        }

        /* ── Header ───────────────────────────────── */
        .real-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 11px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #0EA5E9;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .real-eyebrow::before {
          content: ''; display: block;
          width: 24px; height: 2px;
          background: #0EA5E9; border-radius: 2px;
        }

        .real-title {
          font-family: 'Inter', sans-serif; font-weight: 800;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.1; color: #0F172A; letter-spacing: -0.02em;
        }
        .real-title em { font-style: italic; color: #0EA5E9; font-weight: 700; }

        .real-count-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 100px;
          background: #EFF9FF; border: 1px solid #BAE6FD;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; color: #0EA5E9;
        }

        /* ── Filter tabs ──────────────────────────── */
        .filter-wrap {
          display: flex; align-items: center;
          background: #F8FAFC; border: 1px solid #E2E8F0;
          border-radius: 100px; padding: 4px;
          gap: 2px; flex-wrap: nowrap; overflow-x: auto;
          scrollbar-width: none;
        }
        .filter-wrap::-webkit-scrollbar { display: none; }

        .filter-tab {
          font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 13px;
          padding: 7px 16px; border-radius: 100px;
          border: none; background: transparent;
          color: #64748B; cursor: pointer;
          transition: all 0.2s ease; white-space: nowrap;
          display: flex; align-items: center; gap: 6px;
        }
        .filter-tab:hover { color: #0EA5E9; background: #EFF9FF; }
        .filter-tab.active {
          background: #0EA5E9;
          color: #ffffff; font-weight: 500;
          box-shadow: 0 2px 8px rgba(14,165,233,0.3);
        }

        /* ── Gallery cards ────────────────────────── */
        .gallery-card {
          position: relative; border-radius: 14px;
          overflow: hidden; cursor: pointer;
          aspect-ratio: 4 / 3;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .gallery-card:hover {
          border-color: rgba(14,165,233,0.3);
          box-shadow: 0 8px 28px rgba(14,165,233,0.1);
          transform: translateY(-2px);
        }

        .gallery-card img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s cubic-bezier(0.25,0.1,0.1,1);
        }
        .gallery-card:hover img { transform: scale(1.05); }

        .gallery-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.2) 50%, transparent 100%);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .gallery-card:hover .gallery-overlay { opacity: 1; }

        .gallery-info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 16px 18px;
          transform: translateY(8px); opacity: 0;
          transition: all 0.3s ease;
        }
        .gallery-card:hover .gallery-info { transform: translateY(0); opacity: 1; }

        .gallery-cat {
          font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #7DD3FC; margin-bottom: 4px;
        }
        .gallery-label {
          font-family: 'Inter', sans-serif; font-size: 14px;
          font-weight: 600; color: #ffffff; line-height: 1.3;
        }

        .gallery-zoom {
          position: absolute; top: 12px; right: 12px;
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.5);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .gallery-card:hover .gallery-zoom { opacity: 1; }

        /* ── Bottom CTA strip ─────────────────────── */
        .real-strip {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
          padding: 32px 40px; border-radius: 20px;
          background: #080F1E;
          margin-top: 48px;
          position: relative; overflow: hidden;
        }
        .real-strip::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px, transparent 44px,
            rgba(255,255,255,0.012) 44px, rgba(255,255,255,0.012) 46px
          );
          pointer-events: none; border-radius: 20px;
        }
        .real-strip::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #0EA5E9, transparent 60%);
        }

        .real-strip-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px; border-radius: 100px;
          background: #F97316; color: #ffffff;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          text-decoration: none; position: relative; z-index: 1;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .real-strip-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(249,115,22,0.42); }

        /* ── Lightbox ─────────────────────────────── */
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(15,23,42,0.96);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; backdrop-filter: blur(6px);
        }
        .lb-inner {
          position: relative; width: 100%; max-width: 900px;
          border-radius: 18px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        .lb-img-wrap {
          position: relative; aspect-ratio: 16 / 10; background: #1e293b;
        }
        .lb-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lb-caption {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 22px; background: #0f172a;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .lb-caption-cat {
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 400;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #7DD3FC; margin-bottom: 3px;
        }
        .lb-caption-label {
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 16px; color: #ffffff;
        }
        .lb-counter {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 300;
          color: rgba(255,255,255,0.3); letter-spacing: 0.1em;
        }
        .lb-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.85);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 20px; backdrop-filter: blur(8px);
          transition: all 0.2s ease; z-index: 5;
        }
        .lb-nav:hover { background: rgba(14,165,233,0.3); border-color: rgba(14,165,233,0.5); color: #fff; }
        .lb-close {
          position: absolute; top: 12px; right: 12px;
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.8); display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px; transition: all 0.2s ease; z-index: 5;
        }
        .lb-close:hover { background: rgba(255,86,48,0.3); border-color: #FF5630; color: #fff; }

        @media (max-width: 639px) {
          #realisations { padding: 64px 0; }
          .real-title   { font-size: 28px !important; }
          .real-strip   { padding: 20px; flex-direction: column; align-items: flex-start; }
          .filter-wrap  { gap: 0; }
          .filter-tab   { padding: 6px 12px; font-size: 12px; }
        }
      `}</style>

      <section id="realisations">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

          {/* ── Header ── */}
          <motion.div {...fadeUp(0)} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div>
              <p className="real-eyebrow" style={{ marginBottom: '14px' }}>Nos réalisations</p>
              <h2 className="real-title">
                Notre métier,<br />
                <em>en images.</em>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
              <div className="real-count-badge">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {IMAGES.length} photos
              </div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '13px', color: '#94A3B8' }}>
                Atelier · Mobile · Équipe · Résultats
              </p>
            </div>
          </motion.div>

          {/* ── Filter tabs ── */}
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: '32px' }}>
            <div className="filter-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`filter-tab${activeCategory === cat ? ' active' : ''}`}
                >
                  <span style={{ fontSize: '11px' }}>{CAT_ICONS[cat]}</span>
                  {cat}
                  {cat !== 'Tous' && (
                    <span style={{
                      fontSize: '10px', fontWeight: 600,
                      background: activeCategory === cat ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                      color: activeCategory === cat ? '#fff' : '#94A3B8',
                      padding: '1px 6px', borderRadius: '100px',
                    }}>
                      {IMAGES.filter(img => img.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Gallery grid ── */}
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.1, 1] }}
                  className="gallery-card"
                  onClick={() => setLightboxIdx(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setLightboxIdx(idx)}
                  aria-label={img.alt}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="gallery-overlay" />
                  <div className="gallery-info">
                    <p className="gallery-cat">{img.category}</p>
                    <p className="gallery-label">{img.label}</p>
                  </div>
                  <div className="gallery-zoom">
                    <svg width="14" height="14" fill="none" stroke="#0EA5E9" strokeWidth="2.5" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"/>
                      <path strokeLinecap="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ── Bottom CTA strip ── */}
          <motion.div {...fadeUp(0.3)} className="real-strip">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: '16px', color: '#ffffff', marginBottom: '4px' }}>
                Votre voiture mérite le meilleur.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.42)' }}>
                Intervention rapide, résultat garanti à vie.
              </p>
            </div>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="real-strip-cta"
            >
              Demander un devis
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </motion.div>

        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lb-inner"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="lb-img-wrap">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={filtered[lightboxIdx]?.id}
                    src={filtered[lightboxIdx]?.src}
                    alt={filtered[lightboxIdx]?.alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </AnimatePresence>
                <button className="lb-nav" style={{ left: '14px' }} onClick={prevImage} aria-label="Précédent">‹</button>
                <button className="lb-nav" style={{ right: '14px' }} onClick={nextImage} aria-label="Suivant">›</button>
                <button className="lb-close" onClick={closeLightbox} aria-label="Fermer">✕</button>
              </div>
              <div className="lb-caption">
                <div>
                  <p className="lb-caption-cat">{filtered[lightboxIdx]?.category}</p>
                  <p className="lb-caption-label">{filtered[lightboxIdx]?.label}</p>
                </div>
                <span className="lb-counter">{lightboxIdx + 1} / {filtered.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
