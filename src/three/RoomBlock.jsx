import { Edges } from '@react-three/drei'
import { corridorWidth } from '../data/housePlan'
import { roomColors, roomHeight } from './roomStyles'

export default function RoomBlock({ row }) {
  const centerX = row.start + row.length / 2
  const width = (row.startWidth + row.endWidth) / 2
  const depth = row.length
  const mainWidth = row.corridor ? width - corridorWidth : width
  const roomCenterZ = row.corridor ? -corridorWidth / 2 : 0
  const height = roomHeight(row.type)

  return (
    <group>
      <mesh position={[centerX, height / 2, roomCenterZ]}>
        <boxGeometry args={[depth, height, mainWidth]} />
        <meshStandardMaterial color={roomColors[row.type]} transparent opacity={row.type === 'yard' ? 0.75 : 0.92} />
        <Edges color="#8a7056" />
      </mesh>
      {row.corridor && (
        <mesh position={[centerX, 1.4, (width - corridorWidth) / 2]}>
          <boxGeometry args={[depth, 2.8, corridorWidth]} />
          <meshStandardMaterial color={roomColors.corridor} transparent opacity={0.95} />
          <Edges color="#8a7056" />
        </mesh>
      )}
    </group>
  )
}
