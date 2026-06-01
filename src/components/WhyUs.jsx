import { motion } from 'framer-motion'

const PILLARS = [
  {
    stat: '< 2h',
    label: 'Intervention express',
    desc: 'Nos techniciens mobiles se déplacent chez vous en moins de 2 heures, sans frais de déplacement.',
    color: 'emerald',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    checks: ['Disponible 7j/7 et 24h/24', 'Déplacement 100% gratuit', 'Toutes villes du Maroc'],
  },
  {
    stat: 'Certifiés',
    label: 'Techniciens qualifiés',
    desc: 'Chaque technicien est formé aux normes OEM et calibration ADAS, agréé par tous les assureurs marocains.',
    color: 'teal',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    checks: ['Verre AGC / Saint-Gobain / Pilkington', 'Calibration ADAS incluse', 'Agrément toutes assurances'],
  },
  {
    stat: '2 ans',
    label: 'Garantie totale',
    desc: 'Pièces et main-d\'œuvre garanties 2 ans. En cas de bris de glace assuré, zéro avance de frais.',
    color: 'cyan',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
      </svg>
    ),
    checks: ['Garantie 2 ans pièces & pose', 'Zéro avance de frais assurance', 'Dossier géré de A à Z'],
  },
  {
    stat: '4.9 ★',
    label: 'Qualité reconnue',
    desc: 'Plus de 1 400 avis clients vérifiés sur Google. Notre note reflète notre engagement pour l\'excellence.',
    color: 'orange',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    checks: ['1 400+ avis Google vérifiés', '8 000+ véhicules traités', '12 ans d\'expérience'],
  },
]

const CLR = {
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600 border-emerald-200', stat: 'text-emerald-600', check: 'bg-emerald-100 text-emerald-700', card: 'hover:border-emerald-200' },
  teal:    { bg: 'bg-teal-50',    icon: 'text-teal-600 border-teal-200',       stat: 'text-teal-600',    check: 'bg-teal-100 text-teal-700',    card: 'hover:border-teal-200'    },
  cyan:    { bg: 'bg-cyan-50',    icon: 'text-cyan-700 border-cyan-200',       stat: 'text-cyan-700',    check: 'bg-cyan-100 text-cyan-800',    card: 'hover:border-cyan-200'    },
  orange:  { bg: 'bg-orange-50',  icon: 'text-orange-600 border-orange-200',   stat: 'text-orange-600',  check: 'bg-orange-100 text-orange-700', card: 'hover:border-orange-200'  },
}

export default function WhyUs() {
  return (
    <section id="why-us" className="section-py relative overflow-hidden">
      <div className="section-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Pourquoi ClearAuto</span>
          <h2 className="h-section mb-4">
            Ce qui nous distingue<br />de la concurrence.
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            Rapidité, certifications et garantie totale — les trois piliers qui font de nous le choix n°1 au Maroc.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => {
            const c = CLR[p.color]
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22,1,0.36,1] }}
                className={`group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col shadow-sm hover:-translate-y-2 hover:shadow-md transition-all duration-300 ${c.card}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.icon} border flex items-center justify-center mb-5`}>
                  {p.icon}
                </div>
                <div className={`text-3xl lg:text-4xl font-extrabold tracking-tight mb-1 ${c.stat}`}>
                  {p.stat}
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-3">{p.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
                <ul className="space-y-1.5">
                  {p.checks.map(ch => (
                    <li key={ch} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[9px] font-black ${c.check}`}>✓</span>
                      {ch}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 grid sm:grid-cols-3 gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-5"
        >
          {[
            { icon: '🔒', text: 'Données & dossier 100% sécurisés' },
            { icon: '📋', text: 'Devis gratuit sans engagement' },
            { icon: '🇲🇦', text: 'Startup marocaine, service local' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-xl">{icon}</span>
              <span className="text-slate-700 text-sm font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
