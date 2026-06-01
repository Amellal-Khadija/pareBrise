import { motion } from 'framer-motion'
import BookingForm from '../components/BookingForm'

const guarantees = [
  { icon: '⚡', label: 'Réponse en 30 min' },
  { icon: '🛡️', label: 'Prise en charge assurance' },
  { icon: '🔧', label: 'Techniciens certifiés' },
  { icon: '✅', label: 'Garantie 2 ans' },
]

export default function BookingPage() {
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
            Prise de rendez-vous
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Réservez votre intervention
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Remplissez le formulaire en 2 minutes. Nous vous confirmons votre rendez-vous par téléphone sous 30 minutes.
          </p>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {guarantees.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
              <span>{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <BookingForm />
      </div>
    </div>
  )
}
