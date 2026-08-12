import { Box, Floor, Wall } from '../primitives'
import { avgWidth, roomCenterX } from '../roomUtils'

export default function LavaboModule({ row }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const wallH = 3.05

  return (
    <group>
      <Floor size={[depth, 0.06, width]} position={[centerX, 0.03, 0]} color="#f1e5d5" />
      <Wall size={[depth, wallH, 0.08]} position={[centerX, wallH / 2, -width / 2]} />
      <Wall size={[depth, wallH, 0.08]} position={[centerX, wallH / 2, width / 2]} />
      <Box size={[0.72, 0.35, 0.45]} position={[centerX, 0.52, -width / 2 + 0.28]} color="#8c6b4a" />
      <Box size={[0.76, 0.03, 0.48]} position={[centerX, 0.71, -width / 2 + 0.28]} color="#f4f1eb" />
      <mesh position={[centerX, 0.8, -width / 2 + 0.28]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.14, 0.14, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>
      <Box size={[0.56, 0.72, 0.03]} position={[centerX, 1.48, -width / 2 + 0.05]} color="#c8dce6" />
    </group>
  )
}
