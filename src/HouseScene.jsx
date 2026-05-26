import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import HouseModel from './three/HouseModel'

export default function HouseScene({ showRoof, showLowerLevel }) {
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
      <HouseModel showRoof={showRoof} showLowerLevel={showLowerLevel} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.56, 0]} receiveShadow>
        <planeGeometry args={[64, 24]} />
        <meshStandardMaterial color="#c19563" />
      </mesh>
      <OrbitControls
        enablePan
        enableRotate
        enableDamping
        dampingFactor={0.08}
        target={[0.5, 1.2, 0]}
        minDistance={5}
        maxDistance={45}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}
