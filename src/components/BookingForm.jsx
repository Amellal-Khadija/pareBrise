import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = ['Véhicule', 'Service', 'Coordonnées', 'Confirmation']

const marques = ['Dacia', 'Renault', 'Peugeot', 'Citroën', 'Toyota', 'Hyundai', 'Volkswagen', 'BMW', 'Mercedes', 'Autre']
const services = ['Réparation impact parebrise', 'Remplacement parebrise', 'Remplacement lunette arrière', 'Remplacement vitre latérale', 'Calibration ADAS', 'Autre']
const villes = ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Autre']

export default function BookingForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    marque: '', modele: '', annee: '', immat: '',
    service: '', assurance: false,
    nom: '', prenom: '', tel: '', email: '', ville: '', adresse: '', date: '', creneau: '',
    message: '',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Demande envoyée !</h3>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Merci {form.prenom} ! Notre équipe vous contactera dans les prochaines 30 minutes pour confirmer votre rendez-vous.
        </p>
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-6 py-3 rounded-xl">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Un conseiller vous appellera bientôt
        </div>
      </motion.div>
    )
  }

  const inputCls = 'w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors duration-200'
  const labelCls = 'block text-slate-300 text-sm font-medium mb-1.5'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
              i < step ? 'bg-blue-600 border-blue-600 text-white'
                : i === step ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                  : 'border-slate-700 text-slate-500 bg-transparent'
            }`}>
              {i < step ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : i + 1}
            </div>
            <span className={`text-xs hidden sm:block ${i === step ? 'text-blue-400 font-medium' : 'text-slate-500'}`}>{s}</span>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-blue-600' : 'bg-slate-700'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6"
        >
          {/* Step 0: Véhicule */}
          {step === 0 && (
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xl mb-6">Votre véhicule</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Marque *</label>
                  <select className={inputCls} value={form.marque} onChange={e => set('marque', e.target.value)} required>
                    <option value="">Sélectionner</option>
                    {marques.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Modèle *</label>
                  <input className={inputCls} placeholder="ex: Clio, Duster…" value={form.modele} onChange={e => set('modele', e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Année *</label>
                  <input className={inputCls} placeholder="ex: 2019" value={form.annee} onChange={e => set('annee', e.target.value)} required />
                </div>
                <div>
                  <label className={labelCls}>Immatriculation</label>
                  <input className={inputCls} placeholder="ex: 12345-A-1" value={form.immat} onChange={e => set('immat', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Service */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xl mb-6">Type d'intervention</h3>
              <div>
                <label className={labelCls}>Service souhaité *</label>
                <div className="space-y-2">
                  {services.map(s => (
                    <label key={s} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name="service"
                        value={s}
                        checked={form.service === s}
                        onChange={e => set('service', e.target.value)}
                        className="accent-blue-500"
                        required
                      />
                      <span className="text-slate-300 text-sm">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.assurance}
                  onChange={e => set('assurance', e.target.checked)}
                  className="accent-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 text-sm">Prise en charge par mon assurance</span>
              </label>
            </div>
          )}

          {/* Step 2: Coordonnées */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xl mb-6">Vos coordonnées</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Prénom *</label>
                  <input className={inputCls} placeholder="Prénom" value={form.prenom} onChange={e => set('prenom', e.target.value)} required />
                </div>
                <div>
                  <label className={labelCls}>Nom *</label>
                  <input className={inputCls} placeholder="Nom" value={form.nom} onChange={e => set('nom', e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Téléphone *</label>
                  <input className={inputCls} placeholder="06 XX XX XX XX" type="tel" value={form.tel} onChange={e => set('tel', e.target.value)} required />
                </div>
                <div>
                  <label className={labelCls}>Email</label>
                  <input className={inputCls} placeholder="votre@email.com" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Ville *</label>
                  <select className={inputCls} value={form.ville} onChange={e => set('ville', e.target.value)} required>
                    <option value="">Sélectionner</option>
                    {villes.map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Date souhaitée *</label>
                  <input className={inputCls} type="date" value={form.date} onChange={e => set('date', e.target.value)} min={new Date().toISOString().split('T')[0]} required />
                </div>
              </div>
              <div>
                <label className={labelCls}>Adresse d'intervention</label>
                <input className={inputCls} placeholder="Adresse complète" value={form.adresse} onChange={e => set('adresse', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-white font-bold text-xl mb-6">Récapitulatif</h3>
              <div className="space-y-3">
                {[
                  ['Véhicule', `${form.marque} ${form.modele} ${form.annee}`],
                  ['Service', form.service],
                  ['Assurance', form.assurance ? 'Oui, prise en charge demandée' : 'Non'],
                  ['Contact', `${form.prenom} ${form.nom} — ${form.tel}`],
                  ['Ville', form.ville],
                  ['Date', form.date],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-slate-800 text-sm">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-white font-medium">{value || '—'}</span>
                  </div>
                ))}
              </div>
              <div>
                <label className={labelCls}>Message complémentaire</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={3}
                  placeholder="Décrivez votre problème en détail…"
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3.5 border border-slate-700 text-slate-300 font-semibold rounded-xl hover:border-slate-600 hover:text-white transition-all duration-200"
            >
              Retour
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-colors duration-200"
            >
              Continuer
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Confirmer le rendez-vous
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
