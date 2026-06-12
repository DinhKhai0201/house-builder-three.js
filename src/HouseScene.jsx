import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import HouseModel from './three/HouseModel'
import FirstPersonControls from './three/FirstPersonControls'

const roomFocusPoints = {
  front: { target: [-12.0, 1.0, 0], camera: [-15.0, 4.0, 8] },
  living: { target: [-10.0, 1.0, 0], camera: [-10.0, 6.0, 10] },
  kitchen: { target: [-4.7, 1.0, 0], camera: [-4.7, 6.0, 10] },
  bed1: { target: [-0.5, 1.0, 0], camera: [-0.5, 6.0, 10] },
  bed2: { target: [2.2, 1.0, 0], camera: [2.2, 6.0, 10] },
  wc: { target: [4.45, 1.0, 0], camera: [4.45, 6.0, 8] },
  master: { target: [8.35, 1.0, 0], camera: [8.35, 6.0, 10] },
  back: { target: [12.35, 1.0, 0], camera: [12.35, 4.0, 8] },
}

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

function CameraFocusController({ focusRoom, firstPerson }) {
  const { camera } = useThree()
  
  useEffect(() => {
    if (firstPerson) return
    const point = roomFocusPoints[focusRoom] || roomFocusPoints.living
    camera.position.set(point.camera[0], point.camera[1], point.camera[2])
  }, [focusRoom, camera, firstPerson])

  return null
}

export default function HouseScene({ showRoof, showLowerLevel, firstPerson = false, focusRoom = 'living', showLeftWall = true, showRightWall = true }) {
  const activeFocus = roomFocusPoints[focusRoom] || roomFocusPoints.living

  return (
    <Canvas shadows camera={{ position: [5.5, 10.5, 19], fov: 29 }}>
      <color attach="background" args={['#c19563']} />
      <ambientLight intensity={1.15} />
      <directionalLight
        position={[8, 14, 10]}
        intensity={1.55}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-6, 8, -6]} intensity={0.45} />
      <HouseModel showRoof={showRoof} showLowerLevel={showLowerLevel} showLeftWall={showLeftWall} showRightWall={showRightWall} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.56, 0]} receiveShadow>
        <planeGeometry args={[64, 24]} />
        <meshStandardMaterial color="#c19563" />
      </mesh>

      <CameraFocusController focusRoom={focusRoom} firstPerson={firstPerson} />

      {firstPerson ? (
        <FirstPersonControls />
      ) : (
        <OrbitControls
          enablePan
          enableRotate
          enableDamping
          dampingFactor={0.08}
          target={activeFocus.target}
          minDistance={5}
          maxDistance={45}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2.05}
        />
      )}
    </Canvas>
  )
}
