import { motion } from 'framer-motion'

const ADVANTAGES = [
  'Techniciens certifiés constructeur',
  'Garantie à vie sur toutes les poses',
  'Prise en charge assurance directe',
  'Intervention sous 24h garantie',
  "Pièces d'origine certifiées AGC / Saint-Gobain",
]

const PARTNERS = ['Wafa Assurance', 'AXA Maroc', 'Saham', 'MAMDA', 'RMA', 'Atlanta']

const STATS = [
  { value: '10 ans',  label: "d'expérience"      },
  { value: '15 000+', label: 'pare-brises posés'  },
  { value: '98%',     label: 'clients satisfaits' },
  { value: '24h',     label: "délai d'intervention"},
]

const IMAGES = [
  { src: '/images/photo-1.jpeg', alt: 'Équipe ClearAuto Casablanca' },
  { src: '/images/photo-3.jpeg', alt: 'Technicien certifié' },
  { src: '/images/photo-2.jpeg', alt: 'Pose professionnelle pare-brise' },
]

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.1, 1] },
})

export default function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        #about {
          background: #F8F7F4;
          padding: 96px 0;
          position: relative;
          overflow: hidden;
        }

        /* Speed lines — subtle automotive texture */
        #about::before {
          content: '';
          position: absolute;
          top: 0; right: -60px; bottom: 0;
          width: 55%;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px,
            transparent 44px,
            rgba(14,165,233,0.025) 44px,
            rgba(14,165,233,0.025) 46px
          );
          pointer-events: none;
          z-index: 0;
        }

        .ab-eyebrow {
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: #0EA5E9; display: inline-flex; align-items: center; gap: 10px;
        }
        .ab-eyebrow::before {
          content: ''; display: block; width: 24px; height: 2px;
          background: #0EA5E9; border-radius: 2px;
        }

        .ab-title {
          font-family: 'Inter', sans-serif; font-weight: 800;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.12; color: #0F172A; letter-spacing: -0.02em;
        }
        .ab-title em { font-style: italic; color: #0EA5E9; font-weight: 700; }

        .ab-body {
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          font-size: 15px; line-height: 1.78; color: #64748B;
        }
        .ab-body strong { color: #0F172A; font-weight: 500; }

        .ab-check-item { display: flex; align-items: center; gap: 12px; }
        .ab-check-icon {
          width: 22px; height: 22px; border-radius: 6px;
          background: rgba(14,165,233,0.1);
          border: 1.5px solid rgba(14,165,233,0.2);
          color: #0EA5E9; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 9px; font-weight: 700;
        }
        .ab-check-label {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 14px; color: #475569;
        }

        .ab-partner-tag {
          font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 12px;
          padding: 5px 13px; border-radius: 100px;
          border: 1px solid #E2E8F0; background: #ffffff; color: #64748B;
          transition: border-color 0.2s, color 0.2s;
        }
        .ab-partner-tag:hover { border-color: #0EA5E9; color: #0EA5E9; }

        .ab-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 100px;
          background: #F97316; color: #ffffff;
          font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 14px;
          text-decoration: none; cursor: pointer; border: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ab-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(249,115,22,0.3); }

        /* ── Image mosaic ── */
        .ab-mosaic {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 240px 200px;
          gap: 14px;
        }

        .ab-img-main {
          grid-column: 1; grid-row: 1 / 3;
          border-radius: 16px; overflow: hidden; position: relative;
        }
        .ab-img-sm {
          border-radius: 14px; overflow: hidden; position: relative;
        }

        .ab-mosaic img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .ab-img-main:hover img,
        .ab-img-sm:hover img { transform: scale(1.04); }

        /* Overlay gradient on images */
        .ab-img-main::after,
        .ab-img-sm::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.35) 0%, transparent 60%);
          pointer-events: none;
        }

        /* Floating badges */
        .ab-badge-exp {
          position: absolute; top: 16px; left: 16px; z-index: 2;
          background: #ffffff; border-radius: 12px;
          padding: 10px 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }
        .ab-badge-exp-val {
          font-family: 'Inter', sans-serif; font-weight: 800;
          font-size: 22px; color: #0F172A; line-height: 1;
        }
        .ab-badge-exp-lbl {
          font-family: 'DM Sans', sans-serif; font-weight: 400;
          font-size: 11px; color: #64748B; margin-top: 2px;
        }

        .ab-badge-rating {
          position: absolute; bottom: 14px; left: 14px; z-index: 2;
          background: rgba(15,23,42,0.75); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px; padding: 6px 12px;
          display: flex; align-items: center; gap: 6px;
        }

        .ab-badge-certified {
          position: absolute; bottom: 14px; right: 14px; z-index: 2;
          background: rgba(15,23,42,0.75); backdrop-filter: blur(8px);
          border: 1px solid rgba(14,165,233,0.3);
          border-radius: 100px; padding: 6px 12px;
          display: flex; align-items: center; gap: 6px;
        }

        /* Stats panel — dark automotive spec sheet */
        .ab-stats-panel {
          position: relative;
          background: #080F1E;
          border-radius: 16px;
          padding: 20px;
          margin-top: 14px;
          overflow: hidden;
        }
        .ab-stats-panel::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px, transparent 52px,
            rgba(255,255,255,0.02) 52px, rgba(255,255,255,0.02) 54px
          );
          pointer-events: none;
        }
        .ab-stats-panel::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, #0EA5E9, rgba(14,165,233,0.2) 60%, transparent);
          pointer-events: none;
        }
        .ab-stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 8px; position: relative; z-index: 1;
        }
        .ab-stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-top: 2px solid #0EA5E9;
          border-radius: 10px;
          padding: 14px 12px; text-align: left;
          transition: background 0.25s, box-shadow 0.25s;
          backdrop-filter: blur(6px);
        }
        .ab-stat-card:nth-child(2) { border-top-color: #F97316; }
        .ab-stat-card:nth-child(4) { border-top-color: #F97316; }
        .ab-stat-card:hover {
          background: rgba(255,255,255,0.07);
          box-shadow: 0 6px 20px rgba(14,165,233,0.12);
        }
        .ab-stat-value {
          font-family: 'Inter', sans-serif; font-weight: 800;
          font-size: 20px; color: #ffffff; line-height: 1; margin-bottom: 4px;
          letter-spacing: -0.02em;
        }
        .ab-stat-label {
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          font-size: 10px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.08em;
        }

        @media (max-width: 767px) {
          .ab-mosaic { grid-template-rows: 200px 160px; }
          .ab-stats-row { grid-template-columns: 1fr 1fr; }
          .ab-badge-rating span:last-child { display: none; }
        }
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 1023px) {
          .ab-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 639px) {
          #about { padding: 48px 0; }

          /* Typography compacte */
          .ab-title { font-size: 24px !important; }
          .ab-body  { font-size: 13.5px; line-height: 1.65; }
          .ab-check-label { font-size: 13px; }
          .ab-partner-tag { font-size: 11px; padding: 4px 10px; }

          /* Image : garder seulement la principale */
          .ab-mosaic {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 0;
          }
          .ab-img-main { grid-row: auto; height: 200px; border-radius: 12px; }
          .ab-img-sm   { display: none; }

          /* Badges sur l'image principale */
          .ab-badge-exp    { padding: 6px 10px; }
          .ab-badge-exp-val { font-size: 16px; }
          .ab-badge-exp-lbl { font-size: 10px; }
          .ab-badge-rating { padding: 4px 8px; gap: 4px; }
          .ab-badge-rating svg { width: 9px; height: 9px; }

          /* Stats panel compact */
          .ab-stats-panel { padding: 14px; margin-top: 10px; }
          .ab-stats-row   { grid-template-columns: 1fr 1fr; gap: 6px; }
          .ab-stat-card   { padding: 10px 8px; border-radius: 8px; }
          .ab-stat-value  { font-size: 16px; }
          .ab-stat-label  { font-size: 9px; }

          /* Colonne texte : espacement réduit */
          .ab-text-col { gap: 18px !important; }

          /* Bouton */
          .ab-cta { padding: 11px 22px; font-size: 13px; }
        }
      `}</style>

      <section id="about">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="ab-grid">

            {/* ── LEFT: text ── */}
            <motion.div {...inView(0)} className="ab-text-col" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              <div>
                <p className="ab-eyebrow" style={{ marginBottom: '16px' }}>À propos</p>
                <h2 className="ab-title">
                  10 ans d&apos;expertise,<br />
                  <em>zéro compromis.</em>
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p className="ab-body">
                  Fondée à Casablanca, ClearAuto est née d&apos;une conviction simple :
                  le remplacement de pare-brise mérite d&apos;être rapide, transparent et sans stress.
                  Nos équipes interviennent directement chez vous avec le matériel de pointe
                  et les pièces homologuées.
                </p>
                <p className="ab-body">
                  Agréés par l&apos;ensemble des compagnies d&apos;assurance marocaines, nous gérons
                  votre dossier du premier appel jusqu&apos;à la remise des clés.{' '}
                  <strong>Zéro avance de frais, zéro tracas.</strong>
                </p>
              </div>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                {ADVANTAGES.map((txt, i) => (
                  <motion.li
                    key={txt}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="ab-check-item"
                  >
                    <span className="ab-check-icon">✓</span>
                    <span className="ab-check-label">{txt}</span>
                  </motion.li>
                ))}
              </ul>

              <div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '10px' }}>
                  Assureurs partenaires
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {PARTNERS.map(p => <span key={p} className="ab-partner-tag">{p}</span>)}
                </div>
              </div>

              <div>
                <button className="ab-cta" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Nous contacter
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* ── RIGHT: images ── */}
            <motion.div {...inView(0.2)}>

              {/* Mosaic */}
              <div className="ab-mosaic">

                {/* Main large image */}
                <div className="ab-img-main">
                  <img src={IMAGES[0].src} alt={IMAGES[0].alt} loading="lazy" />

                  {/* Experience badge */}
                  <div className="ab-badge-exp">
                    <p className="ab-badge-exp-val">10 ans</p>
                    <p className="ab-badge-exp-lbl">d'expertise</p>
                  </div>

                  {/* Rating badge */}
                  <div className="ab-badge-rating">
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="11" height="11" viewBox="0 0 20 20" fill="#F97316">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: '#ffffff', fontWeight: 500 }}>4.9</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>· 2 400+ avis</span>
                  </div>
                </div>

                {/* Top-right small image */}
                <div className="ab-img-sm">
                  <img src={IMAGES[1].src} alt={IMAGES[1].alt} loading="lazy" />
                  <div className="ab-badge-certified">
                    <svg width="11" height="11" fill="none" stroke="#7DD3FC" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Certifié OEM</span>
                  </div>
                </div>

                {/* Bottom-right small image */}
                <div className="ab-img-sm">
                  <img src={IMAGES[2].src} alt={IMAGES[2].alt} loading="lazy" />
                  <div className="ab-badge-certified">
                    <svg width="11" height="11" fill="none" stroke="#7DD3FC" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>À domicile</span>
                  </div>
                </div>

              </div>

              {/* Stats panel — dark automotive spec sheet */}
              <div className="ab-stats-panel">
                <div className="ab-stats-row">
                  {STATS.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.07, duration: 0.45 }}
                      className="ab-stat-card"
                    >
                      <p className="ab-stat-value">{s.value}</p>
                      <p className="ab-stat-label">{s.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
