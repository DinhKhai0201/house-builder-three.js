import { Box, Floor, Wall } from '../primitives'
import DoorLeaf from '../DoorLeaf'
import { avgWidth, mainRoomCenterZ, mainRoomWidth, roomCenterX } from '../roomUtils'

export default function BathModule({ row }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const mainWidth = mainRoomWidth(row)
  const mainCenterZ = mainRoomCenterZ(row)
  const corridorDividerZ = width / 2 - 0.8
  const wallT = 0.08
  const wallH = 3.05
  const roomTopZ = mainCenterZ - mainWidth / 2
  const roomBottomZ = mainCenterZ + mainWidth / 2
  const doorWidth = 0.72
  const doorHeight = 2.14
  const openingStart = 0.16
  const leftWallWidth = openingStart
  const rightWallWidth = depth - openingStart - doorWidth
  const openingCenterX = centerX - depth / 2 + openingStart + doorWidth / 2
  const corridorWidth = 0.8
  const corridorCenterZ = width / 2 - corridorWidth / 2
  const roomStartX = centerX - depth / 2
  const sinkX = roomStartX + 0.34
  const sinkZ = roomTopZ + 0.18
  const toiletX = centerX - 0.05
  const toiletZ = mainCenterZ + 0.02
  const showerBaseX = centerX + 0.48
  const nicheWallX = centerX + depth / 2 - 0.05
  const nicheY = 1.48

  return (
    <group>
      <Floor size={[depth, 0.06, mainWidth]} position={[centerX, 0.03, mainCenterZ]} color="#b9b0a7" />
      <Floor size={[depth, 0.06, corridorWidth]} position={[centerX, 0.03, corridorCenterZ]} color="#f1e5d5" />
      {/* Tường giáp nhà khác bên trái hộc */}
      <Wall size={[1.22, wallH, wallT]} position={[centerX - 0.29, wallH / 2, -width / 2]} color="#d0cec8" />
      {/* Tường giáp nhà khác bên phải hộc */}
      <Wall size={[0.26, wallH, wallT]} position={[centerX + 0.77, wallH / 2, -width / 2]} color="#d0cec8" />
      {/* Các khối tường giáp nhà khác ở khu vực hộc âm tường */}
      <Wall size={[0.32, 1.025, wallT]} position={[centerX + 0.48, 1.025 / 2, -width / 2]} color="#d0cec8" />
      <Wall size={[0.32, 0.05, wallT]} position={[centerX + 0.48, 1.40, -width / 2]} color="#d0cec8" />
      <Wall size={[0.32, 1.275, wallT]} position={[centerX + 0.48, 1.775 + 1.275 / 2, -width / 2]} color="#d0cec8" />
      {/* Tường mặt lưng mỏng của hộc âm tường */}
      <Wall size={[0.32, wallH, 0.02]} position={[centerX + 0.48, wallH / 2, -width / 2 - 0.03]} color="#d0cec8" />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} color="#fbfaf6" />
      <Wall size={[wallT, wallH, mainWidth]} position={[centerX - depth / 2, wallH / 2, mainCenterZ]} color="#d0cec8" />
      <Wall size={[wallT, wallH, mainWidth]} position={[centerX + depth / 2, wallH / 2, mainCenterZ]} color="#d0cec8" />
      {leftWallWidth > 0 ? (
        <Wall
          size={[leftWallWidth, wallH, wallT]}
          position={[centerX - depth / 2 + leftWallWidth / 2, wallH / 2, corridorDividerZ]}
          color="#fbfaf6"
        />
      ) : null}
      {rightWallWidth > 0 ? (
        <Wall
          size={[rightWallWidth, wallH, wallT]}
          position={[centerX - depth / 2 + openingStart + doorWidth + rightWallWidth / 2, wallH / 2, corridorDividerZ]}
          color="#fbfaf6"
        />
      ) : null}
      <Wall size={[doorWidth, wallH - doorHeight, wallT]} position={[openingCenterX, doorHeight + (wallH - doorHeight) / 2, corridorDividerZ]} color="#fbfaf6" />

      <Box size={[0.38, 0.14, 0.3]} position={[sinkX, 0.16, sinkZ]} color="#ece9e3" />
      <Box size={[0.24, 0.08, 0.18]} position={[sinkX, 0.28, sinkZ]} color="#c6d0d4" />
      <Box size={[0.04, 0.26, 0.04]} position={[sinkX - 0.1, 0.32, sinkZ]} color="#d8d7d3" />

      <mesh position={[toiletX, 0.24, toiletZ]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.34, 24]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Box size={[0.22, 0.16, 0.14]} position={[toiletX - 0.02, 0.42, toiletZ]} color="#f3f3f1" />

      <Box size={[0.44, 0.05, mainWidth - 0.2]} position={[showerBaseX, 0.055, mainCenterZ]} color="#d8d7d3" />
      <Box size={[0.02, 0.08, 0.02]} position={[showerBaseX + 0.08, 0.09, mainCenterZ]} color="#7d7d7a" />
      <Box size={[0.02, 0.3, 0.02]} position={[showerBaseX + 0.08, 0.24, mainCenterZ]} color="#8d8c89" />

      {/* Không dùng tấm nền màu đen, để lộ nền tường tự nhiên bên trong hộc */}




      <DoorLeaf position={[centerX - depth / 2 + openingStart, 0, corridorDividerZ - 0.02]} width={0.64} inward />
    </group>
  )
}
