import { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// 3D model with auto-scale and damage simulation
function CarModel({ showDamage }) {
  const group = useRef()
  const { scene } = useGLTF('/car.glb')

  const { normalizedScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    return {
      normalizedScale: 3 / maxDim,
      centerOffset: center.negate(),
    }
  }, [scene])

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={group} scale={normalizedScale}>
      <primitive object={scene} position={[centerOffset.x, centerOffset.y, centerOffset.z]} />
    </group>
  )
}

useGLTF.preload('/car.glb')

function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-2xl">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Chargement du modèle 3D…</p>
      </div>
    </div>
  )
}

function Fallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 0.8, 4]} />
      <meshStandardMaterial color="#1e40af" wireframe />
    </mesh>
  )
}

export default function CarViewer() {
  const [showDamage, setShowDamage] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />

    </section>
  )
}
