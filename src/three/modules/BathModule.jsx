import { Box, Floor, Wall } from '../primitives'
import DoorLeaf from '../DoorLeaf'
import { avgWidth, mainRoomCenterZ, mainRoomWidth, roomCenterX } from '../roomUtils'
import { corridorWidth } from '../../data/housePlan'

export default function BathModule({ row }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const mainWidth = mainRoomWidth(row)
  const mainCenterZ = mainRoomCenterZ(row)
  const dividerZ = width / 2 - corridorWidth
  const wallH = 3.05
  const wallT = 0.08
  const doorWidth = 0.72
  const doorHeight = 2.2
  const doorCenterX = centerX
  const sideWallWidth = (depth - doorWidth) / 2
  const roomStartX = centerX - depth / 2
  const roomEndX = centerX + depth / 2
  const roomTopZ = mainCenterZ - mainWidth / 2
  const corridorCenterZ = width / 2 - corridorWidth / 2

  return (
    <group>
      <Floor size={[depth, 0.06, mainWidth]} position={[centerX, 0.03, mainCenterZ]} color="#b9b0a7" />
      <Floor size={[depth, 0.06, corridorWidth]} position={[centerX, 0.03, corridorCenterZ]} color="#f1e5d5" />

      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, roomTopZ]} />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} />
      <Wall size={[wallT, wallH, mainWidth]} position={[roomStartX, wallH / 2, mainCenterZ]} />
      <Wall size={[wallT, wallH, mainWidth]} position={[roomEndX, wallH / 2, mainCenterZ]} />

      <Wall size={[sideWallWidth, wallH, wallT]} position={[roomStartX + sideWallWidth / 2, wallH / 2, dividerZ]} />
      <Wall size={[sideWallWidth, wallH, wallT]} position={[roomEndX - sideWallWidth / 2, wallH / 2, dividerZ]} />
      <Wall size={[doorWidth, wallH - doorHeight, wallT]} position={[doorCenterX, doorHeight + (wallH - doorHeight) / 2, dividerZ]} />

      <Box size={[0.78, 0.05, 0.88]} position={[roomStartX + 0.43, 0.04, roomTopZ + 0.48]} color="#c6c2ba" />
      <Box size={[0.04, 0.5, 0.04]} position={[roomStartX + 0.08, 1.15, roomTopZ + 0.45]} color="#8d8c89" />
      <Box size={[0.15, 0.03, 0.15]} position={[roomStartX + 0.14, 1.42, roomTopZ + 0.45]} color="#b5b5b5" />

      <Box size={[0.36, 0.36, 0.18]} position={[roomEndX - 0.42, 0.42, roomTopZ + 0.09]} color="#f3f3f1" />
      <mesh position={[roomEndX - 0.42, 0.2, roomTopZ + 0.34]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.14, 0.4, 24]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <DoorLeaf position={[doorCenterX - doorWidth / 2, 0, dividerZ + 0.02]} width={doorWidth} />
    </group>
  )
}
