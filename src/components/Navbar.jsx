import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'À propos',     href: '#about'       },
  { label: 'Services',     href: '#services'    },
  { label: 'Méthode',      href: '#how-we-work' },
  { label: 'Visualiseur',  href: '#showcase-3d' },
  { label: 'Réalisations', href: '#realisations'},
  { label: 'Contact',      href: '#contact'     },
]

const ALL_LINKS = [{ label: 'Accueil', href: '#home' }, ...LINKS]

function scrollTo(id) {
  const el = document.querySelector(id)
  if (!el) return
  const strip = document.querySelector('.nb-strip')
  const bar   = document.querySelector('.nb-bar')
  const offset = (strip?.offsetHeight ?? 0) + (bar?.offsetHeight ?? 70) + 8
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeId,      setActiveId]      = useState('#home')
  const [topBarVisible, setTopBarVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setTopBarVisible(window.scrollY < 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = ALL_LINKS.map(({ href }) => {
      const el = document.querySelector(href)
      if (!el) return null
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(href) },
        { rootMargin: '-35% 0px -60% 0px' }
      )
      o.observe(el)
      return o
    })
    return () => obs.forEach(o => o?.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const topBarH = topBarVisible ? 36 : 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

        /* ─────────────────────────────────────────
           TIER 1 – Info strip
        ───────────────────────────────────────── */
        .nb-strip {
          position: fixed; top: 0; left: 0; right: 0; z-index: 61;
          height: calc(36px + env(safe-area-inset-top, 0px));
          padding-top: env(safe-area-inset-top, 0px);
          background: #060D1A;
          overflow: hidden;
          transition: height 0.22s ease, opacity 0.22s ease;
          border-bottom: 1px solid rgba(14,165,233,0.12);
        }
        .nb-strip.gone { height: 0; opacity: 0; pointer-events: none; }

        .nb-strip-in {
          max-width: 1200px; margin: 0 auto; padding: 0 24px;
          height: 100%; display: flex; align-items: center;
          justify-content: space-between;
        }

        .nb-strip-group { display: flex; align-items: center; gap: 0; }

        .nb-strip-item {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif; font-size: 11.5px; font-weight: 400;
          color: rgba(255,255,255,0.55); text-decoration: none;
          padding: 0 2px; white-space: nowrap;
          transition: color 0.18s;
        }
        .nb-strip-item:hover { color: rgba(255,255,255,0.9); }

        .nb-strip-sep {
          width: 1px; height: 12px;
          background: rgba(255,255,255,0.1);
          margin: 0 14px;
        }

        .nb-strip-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Inter', sans-serif; font-size: 11.5px; font-weight: 400;
          color: rgba(255,255,255,0.38); letter-spacing: 0.02em;
        }
        .nb-strip-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 0 2px rgba(34,197,94,0.25);
        }
        @media (max-width: 540px) { .nb-strip-badge { display: none; } }

        /* ─────────────────────────────────────────
           TIER 2 – Main bar
        ───────────────────────────────────────── */
        .nb-bar {
          position: fixed; left: 0; right: 0; z-index: 60;
          height: 84px;
          background: rgba(255,255,255,0.97);
          border-bottom: 1px solid rgba(226,232,240,0.8);
          transition: top 0.22s ease, box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease;
          padding-left: env(safe-area-inset-left, 0px);
          padding-right: env(safe-area-inset-right, 0px);
        }
        @media (max-width: 1023px) {
          .nb-bar { height: 70px; }
          .nb-logo img { height: 56px !important; }
        }
        /* Quand le strip disparaît, la barre monte à top:0 — ajouter padding-top pour notch */
        .nb-bar.at-top {
          padding-top: env(safe-area-inset-top, 0px);
          height: calc(70px + env(safe-area-inset-top, 0px));
        }
        @media (min-width: 1024px) {
          .nb-bar.at-top { height: calc(84px + env(safe-area-inset-top, 0px)); }
        }

        .nb-bar.scrolled {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom-color: rgba(226,232,240,0.5);
          box-shadow: 0 1px 0 rgba(226,232,240,0.5), 0 8px 32px rgba(15,23,42,0.07);
        }

        .nb-bar-in {
          max-width: 1200px; margin: 0 auto; padding: 0 24px;
          height: 100%; display: flex; align-items: center;
          position: relative;
        }

        /* ── Logo ── */
        .nb-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; flex-shrink: 0;
          margin-right: auto;
        }
        @media (min-width: 1024px) { .nb-logo { margin-right: 0; } }

        .nb-logo-mark {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 10px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .nb-logo:hover .nb-logo-mark {
          box-shadow: 0 4px 16px rgba(14,165,233,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
        .nb-logo-text {
          font-family: 'Inter', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #0F172A; letter-spacing: -0.03em;
          line-height: 1;
        }
        .nb-logo-text em {
          font-style: normal; color: #0EA5E9;
        }

        /* ── Centered nav ── */
        .nb-nav {
          display: none;
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          align-items: center; gap: 2px;
        }
        @media (min-width: 1024px) { .nb-nav { display: flex; } }

        .nb-lnk {
          position: relative;
          font-family: 'Inter', sans-serif; font-weight: 450; font-size: 13.5px;
          letter-spacing: -0.01em;
          padding: 7px 13px;
          color: #64748B; text-decoration: none;
          border-radius: 8px;
          transition: color 0.16s, background 0.16s;
          white-space: nowrap;
        }
        .nb-lnk:hover { color: #0F172A; background: rgba(15,23,42,0.05); }
        .nb-lnk.active {
          color: #0EA5E9; font-weight: 500;
          background: rgba(14,165,233,0.07);
        }

        /* ── Right actions ── */
        .nb-actions {
          display: flex; align-items: center; gap: 6px;
          margin-left: auto; flex-shrink: 0;
        }

        /* Separator */
        .nb-sep {
          display: none; width: 1px; height: 20px;
          background: #E2E8F0; margin: 0 4px;
        }
        @media (min-width: 1024px) { .nb-sep { display: block; } }

        /* Phone — minimal, desktop only */
        .nb-phone {
          display: none;
          align-items: center; gap: 6px;
          padding: 8px 14px; border-radius: 8px;
          border: none; background: transparent;
          color: #475569; font-family: 'Inter', sans-serif;
          font-size: 13px; font-weight: 500; text-decoration: none;
          transition: color 0.16s, background 0.16s; white-space: nowrap;
        }
        @media (min-width: 1024px) { .nb-phone { display: inline-flex; } }
        .nb-phone:hover { color: #0EA5E9; background: rgba(14,165,233,0.06); }

        /* CTA — solid pill */
        .nb-cta {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 10px 22px; border-radius: 100px;
          background: #F97316; color: #fff;
          font-family: 'Inter', sans-serif; font-size: 13.5px; font-weight: 600;
          text-decoration: none; white-space: nowrap;
          box-shadow: 0 2px 14px rgba(249,115,22,0.32);
          transition: background 0.16s, transform 0.16s, box-shadow 0.16s;
          letter-spacing: -0.01em;
        }
        .nb-cta:hover {
          background: #EA6C00;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(249,115,22,0.42);
        }
        @media (max-width: 1023px) {
          .nb-cta { padding: 8px 16px; font-size: 12.5px; gap: 5px; }
        }

        /* Burger — mobile only */
        .nb-burger {
          display: none;
          width: 40px; height: 40px; border-radius: 100px;
          background: transparent; border: 1.5px solid #E2E8F0;
          color: #4B5563; cursor: pointer;
          align-items: center; justify-content: center;
          transition: all 0.16s; margin-left: 6px; flex-shrink: 0;
        }
        @media (max-width: 1023px) { .nb-burger { display: flex; } }
        .nb-burger:hover {
          background: rgba(14,165,233,0.06);
          border-color: #0EA5E9; color: #0EA5E9;
        }

        /* ─────────────────────────────────────────
           MOBILE DRAWER
        ───────────────────────────────────────── */
        .dw-overlay {
          position: fixed; inset: 0; z-index: 70;
          background: rgba(15,23,42,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .dw-sheet {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 80;
          width: 300px; max-width: 94vw;
          background: #fff;
          border-left: 1px solid #F1F5F9;
          box-shadow: -12px 0 56px rgba(15,23,42,0.16);
          display: flex; flex-direction: column;
        }

        /* Drawer top */
        .dw-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 20px; height: 62px;
          border-bottom: 1px solid #F1F5F9; flex-shrink: 0;
        }

        /* Quick actions strip */
        .dw-quick {
          display: grid; grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #F1F5F9; flex-shrink: 0;
        }
        .dw-q-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 12px 10px;
          font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 600;
          color: #374151; text-decoration: none; background: #FAFAFA;
          transition: background 0.14s, color 0.14s; border: none; cursor: pointer;
        }
        .dw-q-btn:first-child { border-right: 1px solid #F1F5F9; }
        .dw-q-btn:hover { background: #EFF9FF; color: #0EA5E9; }
        .dw-q-btn.wa:hover { background: #F0FDF4; color: #16A34A; }

        /* Nav list */
        .dw-nav { flex: 1; overflow-y: auto; padding: 6px 10px 10px; }

        .dw-sec {
          font-family: 'Inter', sans-serif; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; color: #CBD5E1;
          padding: 14px 10px 6px; display: block;
        }

        .dw-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 12px; border-radius: 9px; margin-bottom: 2px;
          font-family: 'Inter', sans-serif; font-weight: 500; font-size: 14px;
          color: #374151; text-decoration: none;
          transition: background 0.14s, color 0.14s;
        }
        .dw-item:hover  { background: #F8FAFC; color: #0F172A; }
        .dw-item.active { background: #EFF9FF; color: #0EA5E9; font-weight: 600; }
        .dw-item .dw-chev { color: #CBD5E1; transition: color 0.14s; }
        .dw-item.active .dw-chev { color: #7DD3FC; }

        /* CTA row */
        .dw-foot {
          padding: 14px 16px calc(20px + env(safe-area-inset-bottom, 0px));
          border-top: 1px solid #F1F5F9;
          flex-shrink: 0;
        }
        .dw-cta-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 15px;
          border-radius: 100px; background: #F97316; color: #fff;
          font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700;
          text-decoration: none; letter-spacing: 0.02em;
          box-shadow: 0 4px 16px rgba(249,115,22,0.35);
          transition: background 0.16s, box-shadow 0.16s;
        }
        .dw-cta-btn:hover { background: #EA6C00; box-shadow: 0 6px 22px rgba(249,115,22,0.45); }

        .dw-close-btn {
          width: 34px; height: 34px; border-radius: 100px;
          background: #F8FAFC; border: 1px solid #E2E8F0;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #94A3B8;
          transition: background 0.14s, color 0.14s, border-color 0.14s;
        }
        .dw-close-btn:hover { background: #FEE2E2; color: #EF4444; border-color: #FECACA; }
      `}</style>

      {/* ── TIER 1 : Info strip ── */}
      <div className={`nb-strip${topBarVisible ? '' : ' gone'}`}>
        <div className="nb-strip-in">
          <div className="nb-strip-group">
            <a href="tel:+212653633280" className="nb-strip-item">
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              06 53 63 32 80
            </a>
            <div className="nb-strip-sep" />
            <a href="https://wa.me/212653633280" target="_blank" rel="noopener noreferrer" className="nb-strip-item">
              <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.93 7.93 0 01-3.794-.964L4.1 19.02l1.137-4.052A7.93 7.93 0 0112.03 4.12 7.93 7.93 0 0120 12.029c0 4.372-3.558 7.851-7.971 7.851z"/>
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="nb-strip-badge">
            <div className="nb-strip-dot" />
            Disponible 7j/7 — Casablanca &amp; alentours
          </div>
        </div>
      </div>

      {/* ── TIER 2 : Main bar ── */}
      <header
        className={`nb-bar${scrolled ? ' scrolled' : ''}${!topBarVisible ? ' at-top' : ''}`}
        style={{ top: `${topBarH}px` }}
      >
        <div className="nb-bar-in">

          {/* Logo */}
          <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home') }} className="nb-logo">
            <img src="/images/logo.png" alt="ClearAuto" style={{ height: '92px', width: 'auto', objectFit: 'contain' }} />
          </a>

          {/* Centered nav — desktop only */}
          <nav className="nb-nav" aria-label="Navigation principale">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={e => { e.preventDefault(); scrollTo(href) }}
                className={`nb-lnk${activeId === href ? ' active' : ''}`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="nb-actions">
            {/* Phone — desktop */}
            <a href="tel:+212653633280" className="nb-phone">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              06 53 63 32 80
            </a>

            <div className="nb-sep" />

            {/* CTA — all screens */}
            <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('#contact') }} className="nb-cta">
              Devis gratuit
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>

            {/* Burger — mobile */}
            <button
              className="nb-burger"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Fermer' : 'Menu'}
              aria-expanded={menuOpen}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="dw-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              className="dw-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navigation"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="dw-top">
                <img src="/images/logo.png" alt="ClearAuto" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
                <button className="dw-close-btn" onClick={() => setMenuOpen(false)} aria-label="Fermer">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Quick contact */}
              <div className="dw-quick">
                <a href="tel:+212653633280" className="dw-q-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  Appeler
                </a>
                <a href="https://wa.me/212653633280" target="_blank" rel="noopener noreferrer" className="dw-q-btn wa">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.93 7.93 0 01-3.794-.964L4.1 19.02l1.137-4.052A7.93 7.93 0 0112.03 4.12 7.93 7.93 0 0120 12.029c0 4.372-3.558 7.851-7.971 7.851z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>

              {/* Nav list */}
              <div className="dw-nav">
                <span className="dw-sec">Navigation</span>
                {ALL_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035, duration: 0.2 }}
                    onClick={e => { e.preventDefault(); scrollTo(href); setMenuOpen(false) }}
                    className={`dw-item${activeId === href ? ' active' : ''}`}
                  >
                    {label}
                    <svg className="dw-chev" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <div className="dw-foot">
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); scrollTo('#contact'); setMenuOpen(false) }}
                  className="dw-cta-btn"
                >
                  Devis gratuit
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
