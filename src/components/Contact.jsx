import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VITRE_TYPES = [
  'Pare-brise avant',
  'Vitre latérale gauche',
  'Vitre latérale droite',
  'Lunette arrière',
  'Toit panoramique',
  'Autre',
]

const INFO_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Téléphone',
    value: '+212 6 53 63 32 80',
    href: 'tel:+212653633280',
    color: '#0EA5E9',
    bg: '#E0F2FE',
    border: '#BAE6FD',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.93 7.93 0 01-3.794-.964L4.1 19.02l1.137-4.052A7.93 7.93 0 0112.03 4.12 7.93 7.93 0 0120 12.029c0 4.372-3.558 7.851-7.971 7.851z" />
      </svg>
    ),
    label: 'WhatsApp',
    value: 'Message direct',
    href: 'https://wa.me/212653633280?text=Bonjour%2C%20j%27ai%20besoin%20d%27un%20devis%20pour%20mon%20pare-brise.',
    color: '#16A34A',
    bg: '#DCFCE7',
    border: '#BBF7D0',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Adresse',
    value: 'Casablanca, Maroc',
    href: null,
    color: '#0EA5E9',
    bg: '#E0F2FE',
    border: '#BAE6FD',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Horaires',
    value: 'Lun–Sam · 8h–19h',
    href: null,
    color: '#F97316',
    bg: '#FFEDD5',
    border: '#FED7AA',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.1, 1] },
})

function Field({ label, error, children }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '12px', fontWeight: 500,
        color: '#475569',
        marginBottom: '6px',
        letterSpacing: '0.02em',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#EF4444', marginTop: '5px' }}>
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({
    prenom: '', nom: '', telephone: '', marque: '', modele: '', vitre: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.prenom.trim())    e.prenom    = 'Champ requis'
    if (!form.nom.trim())       e.nom       = 'Champ requis'
    if (!form.telephone.trim()) e.telephone = 'Champ requis'
    if (!form.marque.trim())    e.marque    = 'Champ requis'
    if (!form.modele.trim())    e.modele    = 'Champ requis'
    if (!form.vitre)            e.vitre     = 'Champ requis'
    return e
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  const inputStyle = (hasError) => ({
    width: '100%', boxSizing: 'border-box',
    padding: '12px 16px', borderRadius: '10px',
    background: '#ffffff',
    border: `1.5px solid ${hasError ? '#FCA5A5' : '#E2E8F0'}`,
    color: '#0F172A',
    fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  })

  const handleFocus = e => {
    e.target.style.borderColor = '#7DD3FC'
    e.target.style.boxShadow = '0 0 0 3px rgba(14,165,233,0.1)'
  }
  const handleBlur = e => {
    e.target.style.borderColor = '#E2E8F0'
    e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        #contact {
          background: #ffffff;
          padding: 96px 0;
          position: relative;
          overflow: hidden;
        }
        #contact::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 50%;
          background: linear-gradient(180deg, #F8F7F4 0%, #ffffff 100%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── LEFT DARK PANEL ── */
        .ct-left-panel {
          background: #080F1E;
          border-radius: 20px;
          padding: 40px 36px;
          position: relative;
          overflow: hidden;
        }
        .ct-left-panel::before {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            108deg,
            transparent 0px, transparent 44px,
            rgba(255,255,255,0.014) 44px, rgba(255,255,255,0.014) 46px
          );
          pointer-events: none;
        }
        .ct-left-panel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #0EA5E9, #38BDF8 40%, transparent 80%);
          border-radius: 20px 20px 0 0;
        }

        .ct-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 11px;
          letter-spacing: 0.26em; text-transform: uppercase; color: rgba(255,255,255,0.38);
          display: inline-flex; align-items: center; gap: 12px;
        }
        .ct-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: #0EA5E9;
        }

        .ct-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          font-size: clamp(28px, 3vw, 42px);
          line-height: 1.08; color: #ffffff; letter-spacing: -0.03em;
        }
        .ct-title em { font-style: italic; color: #0EA5E9; font-weight: 700; }

        .ct-info-card {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 16px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(6px);
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .ct-info-card:hover {
          border-color: rgba(14,165,233,0.3);
          background: rgba(14,165,233,0.06);
          transform: translateX(4px);
        }

        .ct-select option { background: #ffffff; color: #0F172A; }

        .ct-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 56px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .ct-grid { gap: 28px; }
        }

        .ct-name-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .ct-name-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 639px) {
          #contact { padding: 48px 0; }
          .ct-wa-btn, .ct-call-btn { padding: 10px 12px; font-size: 12px; }
          .ct-left-panel { padding: 22px 18px; }
          .ct-form-box { padding: 20px 16px !important; }
          .ct-submit { padding: 12px; font-size: 13px; }
          .ct-title { font-size: 24px !important; }
        }

        .ct-submit {
          width: 100%; padding: 14px; border-radius: 100px; border: none;
          background: #F97316; color: #ffffff;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ct-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(249,115,22,0.3);
        }

        .ct-wa-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 18px; border-radius: 100px;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2);
          color: #4ADE80; font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500; text-decoration: none;
          transition: all 0.2s ease;
        }
        .ct-wa-btn:hover { background: rgba(34,197,94,0.18); border-color: rgba(34,197,94,0.35); }

        .ct-call-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 12px 18px; border-radius: 100px;
          background: rgba(14,165,233,0.1); border: 1px solid rgba(14,165,233,0.2);
          color: #38BDF8; font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 400; text-decoration: none;
          transition: all 0.2s ease;
        }
        .ct-call-btn:hover { background: rgba(14,165,233,0.18); border-color: rgba(14,165,233,0.35); }
      `}</style>

      <section id="contact">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="ct-grid">

            {/* LEFT — Dark panel */}
            <motion.div {...fadeUp(0)} className="ct-left-panel">

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p className="ct-eyebrow" style={{ marginBottom: '20px' }}>Contact</p>
                <h2 className="ct-title" style={{ marginBottom: '16px' }}>
                  Obtenez votre<br />
                  <em>devis gratuit.</em>
                </h2>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 300,
                  color: 'rgba(255,255,255,0.45)', lineHeight: 1.72, marginBottom: '32px',
                }}>
                  Réponse garantie en moins de 30 minutes.<br />
                  Disponibles du lundi au samedi, 8h–19h.
                </p>

                {/* Info cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
                  {INFO_ITEMS.map(({ icon, label, value, href, color }) => (
                    <div key={label} className="ct-info-card">
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {icon}
                      </div>
                      <div>
                        <div style={{
                          fontFamily: 'DM Sans, sans-serif', fontSize: '10px', fontWeight: 500,
                          color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em',
                          textTransform: 'uppercase', marginBottom: '2px',
                        }}>
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            style={{
                              fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
                              fontWeight: 500, color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
                              transition: 'color 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = color }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
                          >
                            {value}
                          </a>
                        ) : (
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href="https://wa.me/212653633280?text=Bonjour%2C%20j%27ai%20besoin%20d%27un%20devis%20pour%20mon%20pare-brise."
                    target="_blank" rel="noopener noreferrer"
                    className="ct-wa-btn"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a7.93 7.93 0 01-3.794-.964L4.1 19.02l1.137-4.052A7.93 7.93 0 0112.03 4.12 7.93 7.93 0 0120 12.029c0 4.372-3.558 7.851-7.971 7.851z" />
                    </svg>
                    WhatsApp
                  </a>
                  <a href="tel:+212653633280" className="ct-call-btn">
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Appeler
                  </a>
                </div>
              </div>

            </motion.div>

            {/* RIGHT — form */}
            <motion.div {...fadeUp(0.1)}>
              <div className="ct-form-box" style={{
                padding: '36px', borderRadius: '20px',
                border: '1.5px solid #F1F5F9', background: '#ffffff',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, #0EA5E9, #38BDF8 50%, #F97316)',
                  borderRadius: '20px 20px 0 0',
                }} />
                <p style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 600,
                  color: '#0F172A', marginBottom: '24px', marginTop: '4px',
                }}>
                  Demande de devis
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', textAlign: 'center' }}
                    >
                      <div style={{
                        width: '60px', height: '60px', borderRadius: '50%',
                        background: '#E0F2FE', border: '1.5px solid #BAE6FD',
                        color: '#0EA5E9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px',
                      }}>
                        <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '20px', color: '#0F172A', marginBottom: '8px' }}>
                        Demande envoyée !
                      </p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 300, color: '#64748B' }}>
                        Nous vous contactons dans les 30 minutes.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                      noValidate
                    >
                      <div className="ct-name-grid">
                        <Field label="Prénom *" error={errors.prenom}>
                          <input type="text" value={form.prenom} onChange={e => set('prenom', e.target.value)}
                            placeholder="Ahmed" style={inputStyle(errors.prenom)}
                            onFocus={handleFocus} onBlur={handleBlur} aria-label="Prénom" />
                        </Field>
                        <Field label="Nom *" error={errors.nom}>
                          <input type="text" value={form.nom} onChange={e => set('nom', e.target.value)}
                            placeholder="Benali" style={inputStyle(errors.nom)}
                            onFocus={handleFocus} onBlur={handleBlur} aria-label="Nom" />
                        </Field>
                      </div>

                      <Field label="Téléphone *" error={errors.telephone}>
                        <input type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)}
                          placeholder="06 00 00 00 00" style={inputStyle(errors.telephone)}
                          onFocus={handleFocus} onBlur={handleBlur} aria-label="Téléphone" />
                      </Field>

                      <div className="ct-name-grid">
                        <Field label="Marque *" error={errors.marque}>
                          <input type="text" value={form.marque} onChange={e => set('marque', e.target.value)}
                            placeholder="Renault" style={inputStyle(errors.marque)}
                            onFocus={handleFocus} onBlur={handleBlur} aria-label="Marque" />
                        </Field>
                        <Field label="Modèle *" error={errors.modele}>
                          <input type="text" value={form.modele} onChange={e => set('modele', e.target.value)}
                            placeholder="Clio" style={inputStyle(errors.modele)}
                            onFocus={handleFocus} onBlur={handleBlur} aria-label="Modèle" />
                        </Field>
                      </div>

                      <Field label="Type de vitre *" error={errors.vitre}>
                        <select value={form.vitre} onChange={e => set('vitre', e.target.value)}
                          style={{ ...inputStyle(errors.vitre), cursor: 'pointer' }}
                          className="ct-select"
                          onFocus={handleFocus} onBlur={handleBlur} aria-label="Type de vitre">
                          <option value="">Sélectionner…</option>
                          {VITRE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </Field>

                      <Field label="Message (optionnel)">
                        <textarea value={form.message} onChange={e => set('message', e.target.value)}
                          placeholder="Décrivez votre problème…"
                          rows={3} style={{ ...inputStyle(false), resize: 'vertical', minHeight: '80px' }}
                          onFocus={handleFocus} onBlur={handleBlur} aria-label="Message" />
                      </Field>

                      <button type="submit" className="ct-submit" style={{ marginTop: '4px' }}>
                        Envoyer ma demande
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>

                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#CBD5E1', textAlign: 'center' }}>
                        Réponse en moins de 30 min · Aucun engagement
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
