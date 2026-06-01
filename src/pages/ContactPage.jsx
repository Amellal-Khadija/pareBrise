import { motion } from 'framer-motion'
import Contact from '../components/Contact'

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            Support client
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Notre équipe est disponible 7j/7 pour répondre à toutes vos questions sur le vitrage automobile.
          </p>
        </motion.div>
      </div>

      <Contact />

      {/* Map placeholder */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden h-64 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 text-slate-700 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-slate-600 text-sm">Carte interactive — Casablanca, Maroc</p>
            <p className="text-slate-700 text-xs mt-1">123 Bd Mohammed V, Casablanca 20000</p>
          </div>
        </div>
      </div>
    </div>
  )
}
