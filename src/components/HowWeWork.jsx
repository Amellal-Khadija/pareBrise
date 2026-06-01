import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Diagnostic',
    desc: "Inspection complète du vitrage sur place. Nous évaluons l'étendue des dommages et vous conseillons entre réparation et remplacement.",
    accent: 'cyan',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Dépose soignée',
    desc: 'Retrait minutieux du vitrage endommagé sans abîmer la carrosserie ni les joints. Préparation de la surface avec les produits adaptés.',
    accent: 'orange',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Pose professionnelle',
    desc: "Installation du nouveau vitrage avec colle polyuréthane certifiée constructeur. Respect strict des temps de polymérisation pour votre sécurité.",
    accent: 'cyan',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Contrôle & calibration',
    desc: "Vérification d'étanchéité complète et recalibrage des systèmes ADAS. Voiture rendue prête à rouler avec toutes garanties.",
    accent: 'orange',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

export default function HowWeWork() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

        #how-we-work {
          background: #080F1E;
          padding: 120px 0 100px;
          position: relative;
          overflow: hidden;
        }

        /* Speed lines — diagonal automotive stripes */
        #how-we-work::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px,
            transparent 52px,
            rgba(255,255,255,0.016) 52px,
            rgba(255,255,255,0.016) 54px
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Radial glow centre */
        #how-we-work::after {
          content: '';
          position: absolute;
          top: 0; left: 50%; transform: translateX(-50%);
          width: 900px; height: 500px;
          background: radial-gradient(ellipse 60% 100% at 50% 0%,
            rgba(14,165,233,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hw-eyebrow {
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: 11px; letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          display: inline-flex; align-items: center; gap: 12px;
        }
        .hw-eyebrow::before {
          content: ''; display: block; width: 28px; height: 1px;
          background: #0EA5E9;
        }

        .hw-title {
          font-family: 'Inter', sans-serif; font-weight: 800;
          font-size: clamp(28px, 3.2vw, 46px);
          line-height: 1.08; color: #ffffff; letter-spacing: -0.03em;
        }
        .hw-title em { font-style: italic; color: #0EA5E9; font-weight: 700; }

        /* ── STEPS GRID ── */
        .hw-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        /* Gradient connector line behind circles */
        .hw-steps::before {
          content: '';
          position: absolute;
          top: 26px;
          left: 72px; right: 72px;
          height: 1px;
          background: linear-gradient(90deg,
            rgba(14,165,233,0.6) 0%,
            rgba(14,165,233,0.2) 33%,
            rgba(249,115,22,0.2) 66%,
            rgba(249,115,22,0.6) 100%);
          z-index: 0;
        }

        @media (max-width: 900px) {
          .hw-steps { grid-template-columns: repeat(2, 1fr); }
          .hw-steps::before { display: none; }
        }
        @media (max-width: 520px) {
          .hw-steps { grid-template-columns: 1fr; }
        }

        /* ── STEP CARD ── */
        .hw-step {
          background: rgba(255,255,255,0.04);
          border-radius: 18px;
          padding: 28px 22px;
          border: 1px solid rgba(255,255,255,0.07);
          position: relative;
          overflow: hidden;
          z-index: 1;
          backdrop-filter: blur(8px);
          transition: background 0.3s ease, border-color 0.3s ease,
                      box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
          cursor: default;
        }

        /* Top accent line */
        .hw-step.cyan {
          border-top: 2px solid rgba(14,165,233,0.7);
        }
        .hw-step.orange {
          border-top: 2px solid rgba(249,115,22,0.7);
        }

        .hw-step:hover {
          background: rgba(255,255,255,0.07);
          transform: translateY(-5px);
        }
        .hw-step.cyan:hover {
          border-color: rgba(14,165,233,0.4);
          box-shadow: 0 24px 56px rgba(14,165,233,0.15), 0 0 0 1px rgba(14,165,233,0.15);
        }
        .hw-step.orange:hover {
          border-color: rgba(249,115,22,0.35);
          box-shadow: 0 24px 56px rgba(249,115,22,0.12), 0 0 0 1px rgba(249,115,22,0.15);
        }

        /* Big watermark number */
        .hw-step::before {
          content: attr(data-n);
          position: absolute;
          bottom: -14px; right: 8px;
          font-family: 'Inter', sans-serif;
          font-weight: 900; font-size: 80px;
          line-height: 1; letter-spacing: -0.06em;
          pointer-events: none; user-select: none;
        }
        .hw-step.cyan::before  { color: rgba(14,165,233,0.07); }
        .hw-step.orange::before { color: rgba(249,115,22,0.07); }

        /* Circle number badge */
        .hw-step-circle {
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif; font-weight: 800; font-size: 18px;
          color: #ffffff; margin-bottom: 20px; flex-shrink: 0;
          position: relative; z-index: 1;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
        }
        .hw-step.cyan .hw-step-circle {
          background: linear-gradient(135deg, #0EA5E9, #0284C7);
          box-shadow: 0 6px 24px rgba(14,165,233,0.4);
        }
        .hw-step.orange .hw-step-circle {
          background: linear-gradient(135deg, #F97316, #EA580C);
          box-shadow: 0 6px 24px rgba(249,115,22,0.35);
        }
        .hw-step:hover .hw-step-circle { transform: scale(1.1) rotate(-6deg); }

        /* Icon wrap */
        .hw-step-icon {
          width: 42px; height: 42px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          transition: transform 0.25s ease;
        }
        .hw-step.cyan .hw-step-icon {
          background: rgba(14,165,233,0.08);
          border: 1px solid rgba(14,165,233,0.2);
          color: #38BDF8;
        }
        .hw-step.orange .hw-step-icon {
          background: rgba(249,115,22,0.08);
          border: 1px solid rgba(249,115,22,0.2);
          color: #FB923C;
        }
        .hw-step:hover .hw-step-icon { transform: scale(1.08); }

        .hw-step-label {
          font-family: 'DM Sans', sans-serif; font-weight: 500;
          font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
          margin-bottom: 8px; display: block;
        }
        .hw-step.cyan .hw-step-label  { color: #38BDF8; }
        .hw-step.orange .hw-step-label { color: #FB923C; }

        .hw-step-title {
          font-family: 'Inter', sans-serif; font-weight: 700;
          font-size: 16px; color: #f1f5f9; margin-bottom: 10px;
          line-height: 1.25; letter-spacing: -0.01em;
        }
        .hw-step-desc {
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          font-size: 13.5px; color: rgba(255,255,255,0.46); line-height: 1.75;
        }

        /* Bottom badge */
        .hw-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 100px;
          border: 1px solid rgba(14,165,233,0.2);
          background: rgba(14,165,233,0.06);
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          font-weight: 400; color: #38BDF8;
          margin-top: 52px;
          position: relative; z-index: 1;
        }

        @media (max-width: 639px) { #how-we-work { padding: 90px 0 72px; } }
      `}</style>

      <section id="how-we-work">

        {/* Diagonal SVG — transition white (Services) → dark */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          lineHeight: 0, zIndex: 3, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '72px' }}>
            <path d="M0,0 L1440,0 L0,72 Z" fill="#ffffff" />
          </svg>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.1, 1] }}
            style={{ marginBottom: '56px' }}
          >
            <p className="hw-eyebrow" style={{ marginBottom: '16px' }}>Notre méthode</p>
            <h2 className="hw-title">4 étapes, <em>zéro compromis.</em></h2>
          </motion.div>

          <div className="hw-steps">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                className={`hw-step ${step.accent}`}
                data-n={step.n}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.11, ease: [0.25, 0.1, 0.1, 1] }}
              >
                <div className="hw-step-circle">{i + 1}</div>
                <div className="hw-step-icon">{step.icon}</div>
                <span className="hw-step-label">{step.n}</span>
                <h3 className="hw-step-title">{step.title}</h3>
                <p className="hw-step-desc">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div className="hw-badge">
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Intervention complète en moins de 2h
            </div>
          </motion.div>

        </div>

        {/* Diagonal SVG — transition dark → CarShowcase3D dark */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          lineHeight: 0, zIndex: 3, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: '48px' }}>
            <path d="M0,48 L1440,0 L1440,48 Z" fill="#080F1E" />
          </svg>
        </div>

      </section>
    </>
  )
}
