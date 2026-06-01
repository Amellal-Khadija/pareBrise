import { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const CARS = [
  { file: '/car.glb',  label: 'Berline'  },
  { file: '/car1.glb', label: 'SUV'      },
  { file: '/car2.glb', label: 'Citadine' },
  { file: '/car3.glb', label: 'Break'    },
]

const COLORS = [
  { hex: '#D4E8F5', name: 'Incolore'  },
  { hex: '#93C5FD', name: 'Bleu pâle' },
  { hex: '#6B7280', name: 'Fumé'      },
  { hex: '#92400E', name: 'Bronze'    },
  { hex: '#6EE7B7', name: 'Vert'      },
]

useGLTF.setDecoderPath('/draco/')

function CarModel({ file, color }) {
  const group = useRef()
  const { scene } = useGLTF(file)

  const { cloned, scale, offset } = useMemo(() => {
    const cl = scene.clone(true)
    cl.traverse(child => {
      if (!child.isMesh) return
      child.material = Array.isArray(child.material)
        ? child.material.map(m => m.clone())
        : child.material.clone()
    })
    const box    = new THREE.Box3().setFromObject(cl)
    const size   = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    return { cloned: cl, scale: 5 / Math.max(size.x, size.y, size.z), offset: center.negate() }
  }, [scene])

  useEffect(() => {
    const glassKeys = ['glass','wind','window','windshield','vitre','pare','crystal','screen','transparent','glaz']
    const target = new THREE.Color(color)
    cloned.traverse(child => {
      if (!child.isMesh) return
      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach(m => {
        const n = ((m.name ?? '') + ' ' + (child.name ?? '')).toLowerCase()
        const isGlass = glassKeys.some(k => n.includes(k))
          || (m.transparent && m.opacity < 0.95) || m.transmission > 0
        if (!isGlass) return
        m.color.set(target)
        m.needsUpdate = true
      })
    })
  }, [color, cloned])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.22
  })

  return (
    <group ref={group} scale={scale}>
      <primitive object={cloned} position={[offset.x, offset.y, offset.z]} />
    </group>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.1, 1] },
})

export default function CarShowcase3D() {
  const [carIdx,     setCarIdx]     = useState(0)
  const [carColor,   setCarColor]   = useState('#D4E8F5')
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile,   setIsMobile]   = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 639px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!isMobile) CARS.forEach(c => useGLTF.preload(c.file))
  }, [isMobile])

  const prev = () => setCarIdx(i => (i - 1 + CARS.length) % CARS.length)
  const next = () => setCarIdx(i => (i + 1) % CARS.length)

  useEffect(() => {
    const t = setInterval(() => {
      if (!isHovering) setCarIdx(i => (i + 1) % CARS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [isHovering])

  const activeColor = COLORS.find(c => c.hex === carColor)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        #showcase-3d {
          background: #F8F7F4;
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        #showcase-3d::before {
          content: '';
          position: absolute; top: -100px; right: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .sc-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 11px;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: #0EA5E9;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .sc-eyebrow::before {
          content: ''; display: block;
          width: 24px; height: 2px;
          background: #0EA5E9; border-radius: 2px;
        }

        .sc-title {
          font-family: 'Inter', sans-serif; font-weight: 800;
          font-size: clamp(28px, 3.2vw, 44px);
          line-height: 1.08; color: #0F172A; letter-spacing: -0.03em;
        }
        .sc-title em { font-style: italic; color: #F97316; font-weight: 700; }

        .sc-desc {
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          font-size: 15px; line-height: 1.78;
          color: #64748B; max-width: 560px;
        }

        .sc-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .sc-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 100px;
          background: #EFF9FF;
          border: 1px solid #BAE6FD;
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400;
          color: #0369A1;
        }

        /* Two-column layout */
        .sc-grid {
          display: grid;
          grid-template-columns: 56% 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (max-width: 1023px) { .sc-grid { grid-template-columns: 1fr; gap: 32px; } }
        .sc-right { display: flex; flex-direction: column; gap: 28px; }
        .sc-controls { display: flex; flex-direction: column; gap: 16px; }
        .sc-ctrl-label {
          font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase; color: #94A3B8;
          margin-bottom: 8px;
        }

        /* Canvas */
        .sc-canvas-wrap {
          position: relative; border-radius: 20px; overflow: hidden;
          background: transparent;
        }

        .sc-canvas-h { height: 440px; }
        @media (max-width: 1023px) { .sc-canvas-h { height: 320px; } }
        @media (max-width: 639px)  { .sc-canvas-h { height: 260px; } }

        .sc-canvas-foot {
          position: absolute; bottom: 14px; left: 0; right: 0; z-index: 5;
          padding: 0 16px;
          display: flex; align-items: center; justify-content: space-between;
        }

        .sc-live {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 10px; border-radius: 100px;
          background: rgba(14,165,233,0.15);
          border: 1px solid rgba(14,165,233,0.3);
          font-family: 'DM Sans', sans-serif; font-size: 10px;
          font-weight: 500; color: #7DD3FC;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .sc-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #38BDF8;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.25);
          animation: sc-pulse 1.8s ease-in-out infinite;
        }
        @keyframes sc-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(56,189,248,0.25); }
          50%       { box-shadow: 0 0 0 5px rgba(56,189,248,0.1);  }
        }

        .sc-hint {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 100px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          font-family: 'DM Sans', sans-serif; font-size: 10.5px;
          color: rgba(255,255,255,0.55);
          pointer-events: none;
        }

        /* Arrows */
        .sc-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.7);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; backdrop-filter: blur(10px);
          transition: all 0.2s ease; z-index: 10;
          font-size: 18px; line-height: 1;
        }
        .sc-arrow:hover {
          background: rgba(14,165,233,0.3);
          border-color: rgba(14,165,233,0.6);
          color: #fff;
          box-shadow: 0 0 12px rgba(14,165,233,0.3);
        }

        /* Car tabs */
        .sc-tabs {
          display: flex; gap: 4px;
          background: #F1F5F9;
          border-radius: 10px; padding: 4px;
        }
        .sc-tab {
          padding: 7px 14px; border-radius: 7px;
          border: none; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 400;
          color: #64748B; cursor: pointer;
          transition: all 0.18s ease;
        }
        .sc-tab:hover { color: #0EA5E9; }
        .sc-tab.active {
          background: #ffffff;
          color: #0F172A; font-weight: 500;
          box-shadow: 0 1px 4px rgba(15,23,42,0.1);
        }

        /* Color swatches */
        .sc-swatches { display: flex; gap: 7px; align-items: center; }
        .sc-swatch {
          width: 26px; height: 26px; border-radius: 50%;
          cursor: pointer; flex-shrink: 0;
          transition: transform 0.18s, box-shadow 0.18s;
          border: 2px solid transparent;
          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
        }
        .sc-swatch:hover { transform: scale(1.12); }
        .sc-swatch.active {
          box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0EA5E9;
          transform: scale(1.1);
        }

        /* CTA */
        .sc-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 100px;
          background: #F97316; color: #fff; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; text-decoration: none; white-space: nowrap;
          box-shadow: 0 4px 14px rgba(249,115,22,0.3);
          transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .sc-cta:hover {
          background: #EA6C00; transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(249,115,22,0.4);
        }

        /* Color label */
        .sc-color-label {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          color: #64748B; white-space: nowrap;
        }
        .sc-color-label strong {
          color: #0F172A; font-weight: 500; margin-left: 4px;
        }

        @media (max-width: 639px) {
          #showcase-3d { padding: 48px 0; }
          .sc-grid { gap: 0; }
          .sc-title { font-size: 22px !important; }
          .sc-desc { font-size: 13px; line-height: 1.65; }
          .sc-eyebrow { font-size: 9px; letter-spacing: 0.16em; }
          .sc-pills { gap: 6px; flex-wrap: wrap; }
          .sc-pill { font-size: 11px; padding: 4px 10px; }
          .sc-ctrl-label { font-size: 9px; }
          .sc-tabs { flex-wrap: wrap; gap: 3px; }
          .sc-tab { padding: 6px 10px; font-size: 11.5px; }
          .sc-swatches { gap: 5px; }
          .sc-swatch { width: 22px; height: 22px; }
          .sc-cta { padding: 11px 20px; font-size: 13px; align-self: stretch; justify-content: center; }
          .sc-controls { gap: 14px; }
        }
      `}</style>

      <section id="showcase-3d">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div className="sc-grid">

            {/* LEFT: Texte + Contrôles */}
            <motion.div {...fadeUp(0)} className="sc-right">

              {/* Header */}
              <div>
                <p className="sc-eyebrow" style={{ marginBottom: '14px' }}>Visualiseur 3D</p>
                <h2 className="sc-title" style={{ marginBottom: '16px' }}>
                  Votre véhicule,<br /><em>chaque détail compte.</em>
                </h2>
                <p className="sc-desc" style={{ marginBottom: '20px' }}>
                  Explorez nos 4 modèles en temps réel, changez la teinte du vitrage et visualisez le rendu avant toute intervention.
                </p>
                <div className="sc-pills">
                  <span className="sc-pill">
                    <svg width="10" height="10" fill="none" stroke="#0EA5E9" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/></svg>
                    4 modèles de véhicule
                  </span>
                  <span className="sc-pill">
                    <svg width="10" height="10" fill="none" stroke="#0EA5E9" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/></svg>
                    5 teintes de vitrage
                  </span>
                  <span className="sc-pill">
                    <svg width="10" height="10" fill="none" stroke="#0EA5E9" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4"/></svg>
                    Vue 360° interactive
                  </span>
                </div>
              </div>

              {/* Contrôles */}
              <div className="sc-controls">

                {/* Sélecteur modèle */}
                <div>
                  <p className="sc-ctrl-label">Modèle</p>
                  <div className="sc-tabs">
                    {CARS.map(({ label }, i) => (
                      <button
                        key={i}
                        onClick={() => setCarIdx(i)}
                        className={`sc-tab${carIdx === i ? ' active' : ''}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Teinte */}
                <div>
                  <p className="sc-ctrl-label">Teinte du vitrage</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="sc-swatches">
                      {COLORS.map(({ hex, name }) => (
                        <button
                          key={hex}
                          onClick={() => setCarColor(hex)}
                          className={`sc-swatch${carColor === hex ? ' active' : ''}`}
                          style={{ background: hex }}
                          aria-label={name}
                          title={name}
                        />
                      ))}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={carColor}
                        className="sc-color-label"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <strong>{activeColor?.name}</strong>
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="sc-cta"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Demander un devis
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>

            </motion.div>

            {/* RIGHT: 3D Canvas — desktop only */}
            {!isMobile && (
              <motion.div {...fadeUp(0.1)}>
                <div
                  className="sc-canvas-wrap"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div className="sc-canvas-h" style={{ position: 'relative' }}>
                    <Canvas
                      gl={{ antialias: true, alpha: true }}
                      camera={{ position: [3.5, 1.8, 4], fov: 45 }}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <ambientLight intensity={1.8} />
                      <directionalLight position={[8, 10, 5]} intensity={2.5} castShadow />
                      <directionalLight position={[-5, 5, -5]} intensity={0.8} />
                      <pointLight position={[0, 3, -2]} intensity={0.4} color="#60A5FA" />
                      <Suspense fallback={
                        <mesh>
                          <boxGeometry args={[1, 1, 1]} />
                          <meshStandardMaterial color="#334155" />
                        </mesh>
                      }>
                        <Environment preset="city" background={false} />
                        <CarModel key={carIdx} file={CARS[carIdx].file} color={carColor} />
                        <ContactShadows position={[0, -1.8, 0]} opacity={0.3} scale={14} blur={3} far={5} color="#000000" />
                      </Suspense>
                      <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 1.8}
                        minPolarAngle={Math.PI / 6}
                        rotateSpeed={1.4}
                        autoRotate={!isHovering}
                        autoRotateSpeed={0.5}
                      />
                    </Canvas>

                    <button className="sc-arrow" style={{ left: '14px' }} onClick={prev} aria-label="Précédent">‹</button>
                    <button className="sc-arrow" style={{ right: '14px' }} onClick={next} aria-label="Suivant">›</button>

                    <div className="sc-canvas-foot">
                      <div className="sc-live">
                        <div className="sc-live-dot" />
                        3D Live
                      </div>
                      <div className="sc-hint">
                        <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4M16 15l-4 4-4-4"/>
                        </svg>
                        Glissez pour pivoter
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}
