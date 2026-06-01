import { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function CarModel({ paused, color }) {
  const group = useRef()
  const { scene } = useGLTF('/car.glb')

  const { cloned, scale, offset } = useMemo(() => {
    const cl = scene.clone(true)
    const box = new THREE.Box3().setFromObject(cl)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    return { cloned: cl, scale: 4.5 / maxDim, offset: center.negate() }
  }, [scene])

  useMemo(() => {
    const target = new THREE.Color(color)
    cloned.traverse(child => {
      if (!child.isMesh) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach(m => {
        if (m.isMeshStandardMaterial || m.isMeshPhongMaterial) {
          m.color.set(target); m.needsUpdate = true
        }
      })
    })
  }, [color, cloned])

  useFrame((_, delta) => {
    if (!paused && group.current) group.current.rotation.y += delta * 0.25
  })

  return (
    <group ref={group} scale={scale}>
      <primitive object={cloned} position={[offset.x, offset.y, offset.z]} />
    </group>
  )
}

useGLTF.preload('/car.glb')

const ZONES = [
  { id: 'pare-avant', label: 'Parebrise avant',  price: 'Dès 800 MAD', time: '1h – 2h', desc: 'Remplacement complet avec calibration ADAS et caméra incluse.' },
  { id: 'lunette',    label: 'Lunette arrière',   price: 'Sur devis',   time: '1h – 2h', desc: 'Lunette chauffante ou non, toutes marques et modèles.' },
  { id: 'conducteur', label: 'Vitre conducteur',  price: 'Sur devis',   time: '45 min',  desc: 'Remplacement de la vitre latérale gauche, garantie 2 ans.' },
  { id: 'passager',   label: 'Vitre passager',    price: 'Sur devis',   time: '45 min',  desc: 'Remplacement de la vitre latérale droite, garantie 2 ans.' },
  { id: 'toit',       label: 'Toit panoramique',  price: 'Sur devis',   time: '2h – 4h', desc: 'Vitrage panoramique ou ouvrant selon équipement véhicule.' },
]

const COLORS = [
  { hex: '#f1f5f9', name: 'Blanc'  },
  { hex: '#1e293b', name: 'Noir'   },
  { hex: '#94a3b8', name: 'Argent' },
  { hex: '#0369a1', name: 'Bleu'   },
  { hex: '#b91c1c', name: 'Rouge'  },
]

export default function Viewer3D() {
  const [paused,     setPaused]     = useState(false)
  const [activeZone, setActiveZone] = useState(null)
  const [carColor,   setCarColor]   = useState('#f1f5f9')

  const zone = ZONES.find(z => z.id === activeZone)

  return (
    <section id="viewer" className="section-py section-alt relative overflow-hidden">
      <div className="section-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="section-label">Visualisation 3D</span>
          <h2 className="h-section mb-4">Explorez votre véhicule</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">
            Sélectionnez la zone endommagée pour obtenir une estimation de prix et de délai.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="relative h-[340px] sm:h-[400px] lg:h-[440px]">
              <Canvas
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [4, 2, 4], fov: 45, near: 0.01, far: 500 }}
                style={{ width: '100%', height: '100%', background: 'transparent' }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
              >
                <color attach="background" args={['#f8fafc']} />
                <ambientLight intensity={1.5} />
                <directionalLight position={[6, 8, 4]} intensity={2} castShadow />
                <directionalLight position={[-4, 4, -4]} intensity={0.7} />
                <Environment preset="sunset" background={false} />

                <Suspense fallback={null}>
                  <CarModel paused={paused} color={carColor} />
                  <ContactShadows
                    position={[0, -1.7, 0]}
                    opacity={0.18}
                    scale={10}
                    blur={2.5}
                    far={4}
                    color="#94a3b8"
                  />
                </Suspense>

                <OrbitControls
                  enablePan={false} enableZoom={false}
                  maxPolarAngle={Math.PI / 1.85} minPolarAngle={Math.PI / 6}
                />
              </Canvas>

              <button
                onClick={() => setPaused(v => !v)}
                className="absolute top-3 right-3 w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:border-emerald-300 shadow-sm transition-all"
                aria-label={paused ? 'Reprendre' : 'Pause'}
              >
                {paused
                  ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                }
              </button>
            </div>

            {/* Color strip */}
            <div className="border-t border-slate-100 px-5 py-3.5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Couleur</span>
                {COLORS.map(({ hex, name }) => (
                  <button
                    key={hex}
                    onClick={() => setCarColor(hex)}
                    title={name}
                    className={`w-5 h-5 rounded-full border-2 transition-all hover:scale-110 ${
                      carColor === hex ? 'border-emerald-500 scale-110 shadow-sm' : 'border-slate-300'
                    }`}
                    style={{ background: hex }}
                  />
                ))}
              </div>
              <span className="text-slate-400 text-[11px] ml-auto hidden sm:block">Faites glisser pour pivoter</span>
            </div>
          </motion.div>

          {/* Zone panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-2.5"
          >
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Zone à traiter</p>

            {ZONES.map(z => (
              <button
                key={z.id}
                onClick={() => setActiveZone(activeZone === z.id ? null : z.id)}
                className={`w-full flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border transition-all duration-200 text-left ${
                  activeZone === z.id
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/50'
                }`}
              >
                <span className="font-semibold text-sm">{z.label}</span>
                <svg
                  className={`w-4 h-4 flex-shrink-0 transition-transform text-slate-400 ${activeZone === z.id ? 'rotate-90 text-emerald-600' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}

            {zone ? (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-1"
              >
                <h4 className="text-slate-900 font-bold text-sm mb-1">{zone.label}</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">{zone.desc}</p>
                <div className="flex gap-5 text-xs font-semibold mb-4">
                  <div>
                    <div className="text-slate-400 uppercase tracking-widest text-[9px] mb-0.5">Prix</div>
                    <div className="text-emerald-700">{zone.price}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-widest text-[9px] mb-0.5">Durée</div>
                    <div className="text-emerald-700">{zone.time}</div>
                  </div>
                </div>
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="btn-primary w-full justify-center text-xs py-2.5"
                >
                  Devis pour {zone.label.toLowerCase()}
                </a>
              </motion.div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center mt-1">
                <p className="text-slate-400 text-sm">Sélectionnez une zone pour voir prix et délais.</p>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
