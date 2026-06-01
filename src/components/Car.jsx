import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function Car({ rotate = true }) {
  const group = useRef()
  const { scene } = useGLTF('/car.glb')

  // Calcule l'échelle et le centre exact du modèle au chargement
  const { normalizedScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    return {
      normalizedScale: 3 / maxDim,       // Ramène le modèle à 3 unités
      centerOffset: center.negate(),      // Offset pour centrer à l'origine
    }
  }, [scene])

  useFrame((_, delta) => {
    if (rotate && group.current) {
      group.current.rotation.y += delta * 0.35
    }
  })

  return (
    <group ref={group} scale={normalizedScale}>
      <primitive
        object={scene}
        position={[centerOffset.x, centerOffset.y, centerOffset.z]}
      />
    </group>
  )
}

useGLTF.preload('/car.glb')
