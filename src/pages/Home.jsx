import Hero from '../components/Hero'
import Services from '../components/Services'
import CarViewer from '../components/CarViewer'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Un parebrise endommagé ? Agissez maintenant.
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Intervention en 2h · Devis gratuit · Prise en charge assurance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-xl"
            >
              Réserver maintenant
            </Link>
            <a
              href="tel:+212600000000"
              className="border-2 border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors duration-200"
            >
              +212 6 00 00 00 00
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services preview />
      <CarViewer />
      <CTABanner />
      <Testimonials />
      <Contact />
    </>
  )
}
