import { motion } from 'framer-motion'

const NAV_COLS = [
  {
    title: 'Services',
    links: [
      { label: 'Remplacement pare-brise', href: '#services' },
      { label: "Réparation d'impact",     href: '#services' },
      { label: 'Vitres latérales',        href: '#services' },
      { label: 'Calibrage ADAS',          href: '#services' },
      { label: 'Traitement anti-pluie',   href: '#services' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos',         href: '#about'        },
      { label: 'Réalisations',     href: '#realisations' },
      { label: 'Contact',          href: '#contact'      },
      { label: 'Mentions légales', href: '#'             },
    ],
  },
]

const SOCIAL = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/212653633280',
    icon: (
      <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.93 7.93 0 01-3.794-.964L4.1 19.02l1.137-4.052A7.93 7.93 0 0112.03 4.12 7.93 7.93 0 0120 12.029c0 4.372-3.558 7.851-7.971 7.851z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .ft-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.62);
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: inline-block;
        }
        .ft-link:hover { color: rgba(255,255,255,0.92); padding-left: 4px; }

        .ft-social {
          width: 40px; height: 40px; border-radius: 11px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.45);
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease, transform 0.2s ease;
          text-decoration: none;
        }
        .ft-social:hover {
          border-color: rgba(14,165,233,0.5);
          color: #7DD3FC;
          background: rgba(14,165,233,0.1);
          transform: translateY(-2px);
        }

        .ft-col-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.18em; text-transform: uppercase;
          margin-bottom: 18px;
        }
      `}</style>

      <footer style={{ background: '#0c1a3a', position: 'relative', overflow: 'hidden' }}>
        {/* Top accent line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent 0%, #0EA5E9 30%, #38BDF8 50%, #F97316 70%, transparent 100%)' }} />

        {/* Dot grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }} />

        {/* Glow top */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', height: '200px',
          background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(14,165,233,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '52px 24px 28px', position: 'relative', zIndex: 1 }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '40px',
              marginBottom: '44px',
            }}
          >

            {/* Brand */}
            <div>
              <a
                href="#home"
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '14px' }}
                aria-label="ClearAuto"
              >
                <img src="/images/logo.png" alt="ClearAuto" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
              </a>

              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, marginBottom: '5px' }}>
                Vitrage automobile au Maroc.
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.22)', lineHeight: 1.65, marginBottom: '18px', fontStyle: 'italic' }}>
                &ldquo;Votre visibilité, notre priorité.&rdquo;
              </p>

              <div style={{ display: 'flex', gap: '8px' }}>
                {SOCIAL.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="ft-social"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {NAV_COLS.map(({ title, links }) => (
              <div key={title}>
                <p className="ft-col-title">{title}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="ft-link">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact rapide */}
            <div>
              <p className="ft-col-title">Contact rapide</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="tel:+212653633280" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                  <svg width="13" height="13" fill="none" stroke="#0EA5E9" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="ft-link">+212 6 53 63 32 80</span>
                </a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="13" height="13" fill="none" stroke="#0EA5E9" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>
                    Casablanca, Maroc
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="13" height="13" fill="none" stroke="#0EA5E9" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>
                    Lun–Sam · 8h00–19h00
                  </span>
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  padding: '6px 12px', borderRadius: '100px',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  width: 'fit-content', marginTop: '4px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 500, color: '#22C55E' }}>
                    Disponible maintenant
                  </span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Bottom bar */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '22px' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              © {new Date().getFullYear()} ClearAuto Vitrage Maroc. Tous droits réservés.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
              Réalisé avec soin à Casablanca
            </p>
          </div>

        </div>
      </footer>
    </>
  )
}
