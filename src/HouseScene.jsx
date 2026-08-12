import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, Html } from '@react-three/drei'
import HouseModel from './three/HouseModel'
import FirstPersonControls from './three/FirstPersonControls'
import { totalModeledLength } from './data/housePlan'
import { getRow, roomCenterX } from './three/roomUtils'

const modelOffset = -totalModeledLength / 2
const focusPoint = (key, height = 6, distance = 10) => {
  const x = roomCenterX(getRow(key)) + modelOffset
  return { target: [x, 1, 0], camera: [x, height, distance] }
}
const roomFocusPoints = {
  front: focusPoint('front-yard', 4, 8),
  living: focusPoint('living'),
  kitchen: focusPoint('kitchen'),
  bed1: focusPoint('bed-1'),
  bed2: focusPoint('bed-2'),
  wc: focusPoint('wc', 6, 8),
  master: focusPoint('master'),
  back: focusPoint('back-yard', 4, 8),
}

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

function CameraFocusController({ focusRoom, firstPerson }) {
  const { camera } = useThree()
  
  useEffect(() => {
    if (firstPerson || window.__topDownView) return
    const point = roomFocusPoints[focusRoom] || roomFocusPoints.living
    camera.position.set(point.camera[0], point.camera[1], point.camera[2])
  }, [focusRoom, camera, firstPerson])

  return null
}

export default function HouseScene({ showRoof, showLowerLevel, firstPerson = false, focusRoom = 'living', showLeftWall = true, showRightWall = true, topDownView = false }) {
  window.__topDownView = topDownView;
  const activeFocus = roomFocusPoints[focusRoom] || roomFocusPoints.living

  return (
    <Canvas shadows camera={{ position: [5.5, 10.5, 19], fov: 29 }}>
      <color attach="background" args={['#c19563']} />
      <ambientLight intensity={1.15} />
      <directionalLight
        position={[8, 14, 10]}
        intensity={1.55}
        castShadow={!topDownView}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-6, 8, -6]} intensity={0.45} />
      <HouseModel showRoof={showRoof} showLowerLevel={showLowerLevel} showLeftWall={showLeftWall} showRightWall={showRightWall} topDownView={topDownView} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.56, 0]} receiveShadow>
        <planeGeometry args={[64, 24]} />
        <meshStandardMaterial color="#c19563" />
      </mesh>

      <CameraFocusController focusRoom={focusRoom} firstPerson={firstPerson} />

      {topDownView && (
        <OrthographicCamera makeDefault position={[0, 20, 0]} zoom={35} near={-50} far={100} />
      )}



      {firstPerson ? (
        <FirstPersonControls />
      ) : (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={!topDownView}
          enableDamping
          dampingFactor={0.08}
          target={topDownView ? [0, 0, 0] : activeFocus.target}
          minDistance={5}
          maxDistance={45}
          minPolarAngle={topDownView ? 0 : 0.1}
          maxPolarAngle={topDownView ? 0 : Math.PI / 2.05}
        />
      )}
    </Canvas>
  )
}
