import { motion } from 'framer-motion'

const SERVICES = [
  {
    n: '01',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1.5 1M13 16l1.5 1M13 16V9l5 2.5V16" />
      </svg>
    ),
    title: 'Remplacement pare-brise',
    desc: 'Toutes marques, garantie pose à vie. Verre AGC ou Saint-Gobain — conformité constructeur garantie.',
    featured: true,
  },
  {
    n: '02',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6M12 9v6" />
      </svg>
    ),
    title: "Réparation d'impact",
    desc: "Impact inférieur à 2 cm réparé en 30 min sans remplacement. Résultat invisible, solidité garantie.",
  },
  {
    n: '03',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M8 6V4M16 6V4" />
      </svg>
    ),
    title: 'Vitres latérales & lunette',
    desc: 'Glaces avant, arrière, custodes — toutes configurations. Remplacement à domicile inclus.',
  },
  {
    n: '04',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Intervention mobile',
    desc: 'On vient chez vous, au bureau ou au parking — sans frais de déplacement, 7j/7, partout au Maroc.',
  },
  {
    n: '05',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: 'Calibrage ADAS',
    desc: 'Recalibrage caméra obligatoire après remplacement. Certifié constructeur, validé par nos techniciens.',
  },
  {
    n: '06',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Traitement anti-pluie',
    desc: 'Nano-coating hydrofuge pour une visibilité optimale en toutes conditions. Durée garantie 12 mois.',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.1, 1] },
})

export default function Services() {
  const [featured, ...rest] = SERVICES

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        #services {
          background: #ffffff;
          padding: 96px 0;
          position: relative;
          overflow: hidden;
        }
        #services::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #dde4ee 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.55;
          pointer-events: none;
        }

        /* Speed lines on left half — automotive accent */
        #services::after {
          content: '';
          position: absolute;
          top: 0; left: -40px; bottom: 0;
          width: 45%;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px, transparent 52px,
            rgba(14,165,233,0.018) 52px, rgba(14,165,233,0.018) 54px
          );
          pointer-events: none;
          z-index: 0;
        }

        .svc-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 48px;
        }
        @media (max-width: 767px) {
          .svc-header { flex-direction: column; align-items: flex-start; }
          .svc-header-right { display: none; }
        }

        .svc-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 11px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #0EA5E9;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .svc-eyebrow::before {
          content: ''; display: block;
          width: 24px; height: 2px;
          background: #0EA5E9; border-radius: 2px;
        }

        .svc-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.1; color: #0F172A; letter-spacing: -0.02em;
        }
        .svc-title em { font-style: italic; color: #0EA5E9; font-weight: 700; }

        .svc-header-right {
          max-width: 280px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300; font-size: 14px;
          color: #94A3B8; line-height: 1.65;
          flex-shrink: 0;
          padding-bottom: 4px;
        }

        /* ── FEATURED CARD ── */
        .svc-featured {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: center;
          padding: 36px 40px;
          border-radius: 20px;
          background: #080F1E;
          position: relative;
          overflow: hidden;
          margin-bottom: 14px;
          box-shadow: 0 12px 48px rgba(8,15,30,0.35);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          cursor: default;
        }
        /* Speed lines inside featured card */
        .svc-featured-lines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px, transparent 44px,
            rgba(255,255,255,0.015) 44px, rgba(255,255,255,0.015) 46px
          );
          pointer-events: none;
          border-radius: 20px;
        }
        .svc-featured:hover {
          transform: translateY(-3px);
          box-shadow: 0 24px 64px rgba(15,23,42,0.3);
        }
        .svc-featured::before {
          content: '01';
          position: absolute;
          right: -8px; top: -22px;
          font-family: 'Inter', sans-serif;
          font-weight: 900; font-size: 130px;
          color: rgba(255,255,255,0.03);
          line-height: 1; letter-spacing: -0.04em;
          pointer-events: none; user-select: none;
        }
        .svc-featured-accent {
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #F97316, #FB923C 50%, #F97316);
          border-radius: 20px 20px 0 0;
        }
        .svc-featured-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 100px;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.25);
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 500; color: #FB923C;
          margin-bottom: 16px;
        }
        .svc-featured-icon {
          width: 56px; height: 56px; border-radius: 16px;
          background: rgba(249,115,22,0.1);
          border: 1.5px solid rgba(249,115,22,0.22);
          display: flex; align-items: center; justify-content: center;
          color: #FB923C; margin-bottom: 20px;
        }
        .svc-featured-title {
          font-family: 'Inter', sans-serif;
          font-weight: 700; font-size: 22px;
          color: #ffffff; line-height: 1.2; margin-bottom: 10px;
        }
        .svc-featured-desc {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300; font-size: 14px;
          color: rgba(255,255,255,0.52); line-height: 1.72;
          max-width: 420px;
        }
        .svc-featured-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 26px; border-radius: 100px;
          background: #F97316; color: #ffffff;
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 14px;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .svc-featured-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(249,115,22,0.38); }

        @media (max-width: 639px) {
          .svc-featured { grid-template-columns: 1fr; padding: 22px 18px; gap: 18px; }
          .svc-featured-cta { align-self: flex-start; padding: 11px 20px; font-size: 13px; }
          .svc-featured-title { font-size: 18px; }
          .svc-featured-desc  { font-size: 13px; }
          .svc-featured-icon  { width: 44px; height: 44px; margin-bottom: 14px; }
          .svc-featured-badge { font-size: 10px; margin-bottom: 12px; }
        }

        /* ── GRID CARDS ── */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 14px;
        }
        @media (max-width: 639px) {
          .svc-grid { grid-template-columns: 1fr; gap: 10px; }
        }

        .svc-card {
          padding: 28px;
          border-radius: 16px;
          border: 1.5px solid #F1F5F9;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          transition: border-color 0.28s ease, box-shadow 0.28s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .svc-card::before {
          content: attr(data-n);
          position: absolute;
          top: -10px; right: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 900; font-size: 72px;
          color: #F1F5F9; line-height: 1;
          letter-spacing: -0.04em;
          pointer-events: none; user-select: none;
          transition: color 0.28s ease;
        }
        .svc-card:hover {
          border-color: #0EA5E9;
          box-shadow: 0 16px 48px rgba(14,165,233,0.12), 0 4px 12px rgba(0,0,0,0.05);
          transform: translateY(-4px);
        }
        .svc-card:hover::before { color: rgba(14,165,233,0.07); }

        .svc-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.04) 100%);
          border: 1.5px solid rgba(14,165,233,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #0EA5E9; margin-bottom: 20px;
          transition: background 0.28s, border-color 0.28s, transform 0.28s ease;
        }
        .svc-card:hover .svc-icon-wrap {
          background: linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(14,165,233,0.07) 100%);
          border-color: rgba(14,165,233,0.3);
          transform: scale(1.08) rotate(-4deg);
        }

        .svc-card-title {
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 15px;
          color: #0F172A; margin-bottom: 8px; line-height: 1.3;
          transition: color 0.25s;
        }
        .svc-card:hover .svc-card-title { color: #0284C7; }

        .svc-card-desc {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300; font-size: 13.5px;
          color: #64748B; line-height: 1.72;
        }

        /* ── STRIP ── */
        .svc-strip {
          display: flex; align-items: center; justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
          padding: 32px 40px; border-radius: 20px;
          background: #080F1E;
          margin-top: 14px;
          position: relative; overflow: hidden;
        }
        .svc-strip-lines {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px, transparent 44px,
            rgba(255,255,255,0.012) 44px, rgba(255,255,255,0.012) 46px
          );
          pointer-events: none; border-radius: 20px;
        }
        .svc-strip::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #0EA5E9, transparent 60%);
        }
        .svc-strip-title {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 16px; color: #ffffff; margin-bottom: 4px;
        }
        .svc-strip-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300; font-size: 14px; color: rgba(255,255,255,0.4);
        }

        .btn-call {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.14); background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.65); font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 400; text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-call:hover { border-color: rgba(255,255,255,0.35); color: #ffffff; background: rgba(255,255,255,0.1); }

        .btn-devis {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 28px; border-radius: 100px;
          background: #F97316; color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .btn-devis:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(249,115,22,0.42); }

        @media (max-width: 639px) {
          #services { padding: 48px 0; }

          /* Header */
          .svc-header { margin-bottom: 28px; gap: 12px; }
          .svc-title  { font-size: 24px !important; }

          /* Cards */
          .svc-card { padding: 18px; border-radius: 12px; }
          .svc-card::before { font-size: 56px; }
          .svc-icon-wrap  { width: 42px; height: 42px; border-radius: 11px; margin-bottom: 14px; }
          .svc-card-title { font-size: 14px; margin-bottom: 6px; }
          .svc-card-desc  { font-size: 13px; line-height: 1.6; }

          /* Strip */
          .svc-strip {
            padding: 20px 18px;
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .svc-strip-title { font-size: 15px; }
          .svc-strip-sub   { font-size: 13px; }
          .btn-call, .btn-devis {
            justify-content: center;
            width: 100%;
          }
        }
      `}</style>

      <section id="services">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <motion.div {...fadeUp(0)} className="svc-header">
            <div>
              <p className="svc-eyebrow" style={{ marginBottom: '14px' }}>Nos prestations</p>
              <h2 className="svc-title">
                Ce que nous faisons<br />
                <em>pour vos vitres.</em>
              </h2>
            </div>
            <p className="svc-header-right">
              Six prestations spécialisées, du diagnostic à la finition — réalisées par des techniciens certifiés constructeur.
            </p>
          </motion.div>

          {/* Featured card */}
          <motion.div {...fadeUp(0.05)}>
            <div className="svc-featured">
              <div className="svc-featured-lines" />
              <div className="svc-featured-accent" />
              <div>
                <div className="svc-featured-badge">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="#FB923C">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Le plus demandé
                </div>
                <div className="svc-featured-icon">{featured.icon}</div>
                <h3 className="svc-featured-title">{featured.title}</h3>
                <p className="svc-featured-desc">{featured.desc}</p>
              </div>
              <a
                href="#contact"
                className="svc-featured-cta"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Devis gratuit
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Grid cards */}
          <div className="svc-grid">
            {rest.map((s, i) => (
              <motion.div
                key={s.title}
                className="svc-card"
                data-n={s.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.1, 0.1, 1] }}
              >
                <div className="svc-icon-wrap">{s.icon}</div>
                <p className="svc-card-title">{s.title}</p>
                <p className="svc-card-desc">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Strip */}
          <motion.div {...fadeUp(0.3)} className="svc-strip">
            <div className="svc-strip-lines" />
            <div>
              <p className="svc-strip-title">Pas sûr de ce dont vous avez besoin ?</p>
              <p className="svc-strip-sub">Diagnostic gratuit en 5 minutes.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+212653633280" className="btn-call">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Appeler
              </a>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-devis"
              >
                Devis gratuit
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  )
}
