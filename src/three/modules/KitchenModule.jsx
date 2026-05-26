import { Box, Cabinet, Chair, Floor, Table, Wall } from '../primitives'
import { avgWidth, roomCenterX } from '../roomUtils'

export default function KitchenModule({ row }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const wallT = 0.08
  const wallH = 3.05
  const roomStartX = centerX - depth / 2
  const counterDepth = 0.52
  const longRunLength = 3.0
  const shortRunLength = 1.8
  const longRunCenterX = roomStartX + 2.95
  const wallFaceZ = -width / 2 + wallT + counterDepth / 2
  const longRunZ = wallFaceZ
  const shortRunCenterX = roomStartX + depth - wallT - counterDepth / 2
  const shortRunCenterZ = -width / 2 + wallT + shortRunLength / 2
  const longRunEndX = longRunCenterX + longRunLength / 2
  const shortRunInnerX = shortRunCenterX - counterDepth / 2
  const cornerLength = shortRunInnerX - longRunEndX
  const cornerCenterX = longRunEndX + cornerLength / 2
  const cornerCenterZ = wallFaceZ
  const fridgeX = roomStartX + 0.55
  const filterX = roomStartX + 1.15
  const diningTableX = centerX + 0.25
  const diningTableDepth = 0.72
  const diningTableZ = width / 2 - diningTableDepth / 2 - 0.1
  const counterTopY = 0.9
  const counterTopThickness = 0.06
  const sinkX = shortRunCenterX
  const sinkZ = -width / 2 + wallT + shortRunLength - 0.38

  return (
    <group>
      <Floor size={[depth, 0.06, width]} position={[centerX, 0.03, 0]} color="#f2e7d7" />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, -width / 2]} />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} />

      <Cabinet position={[longRunCenterX, 0, longRunZ]} size={[longRunLength, 0.88, counterDepth]} color="#d3ab7c" />
      <Cabinet position={[shortRunCenterX, 0, shortRunCenterZ]} size={[counterDepth, 0.88, shortRunLength]} color="#d3ab7c" />
      <Cabinet position={[cornerCenterX, 0, cornerCenterZ]} size={[cornerLength, 0.88, counterDepth]} color="#d3ab7c" />
      <Box size={[longRunLength, counterTopThickness, counterDepth]} position={[longRunCenterX, counterTopY, longRunZ]} color="#dcb58a" />
      <Box size={[counterDepth, counterTopThickness, shortRunLength]} position={[shortRunCenterX, counterTopY, shortRunCenterZ]} color="#dcb58a" />
      <Box size={[cornerLength, counterTopThickness, counterDepth]} position={[cornerCenterX, counterTopY, cornerCenterZ]} color="#dcb58a" />
      <Box size={[0.4, 0.02, 0.5]} position={[sinkX, counterTopY + 0.04, sinkZ]} color="#c7d0d2" />
      <Box size={[0.26, 0.05, 0.34]} position={[sinkX, counterTopY + 0.025, sinkZ]} color="#7f9096" />
      <Cabinet position={[roomStartX + 2.7, 0.9, -width / 2 + 0.16]} size={[1.0, 0.12, 0.18]} color="#2a2928" />
      <Cabinet position={[fridgeX, 0, -width / 2 + 0.26]} size={[0.48, 1.85, 0.5]} color="#d5d0c8" />
      <Cabinet position={[filterX, 0, -width / 2 + 0.24]} size={[0.3, 0.98, 0.44]} color="#f2f3f4" />

      <Table position={[diningTableX, 0.04, width / 2 - 0.755]} size={[0.72, 0.08, 1.35]} />
      {/* Ghế xếp 2 bên hông bàn (bên trái và bên phải) */}
      <Chair position={[diningTableX - 0.52, 0.02, width / 2 - 0.755 - 0.35]} rotation={[0, Math.PI / 2, 0]} />
      <Chair position={[diningTableX - 0.52, 0.02, width / 2 - 0.755 + 0.15]} rotation={[0, Math.PI / 2, 0]} />
      <Chair position={[diningTableX + 0.52, 0.02, width / 2 - 0.755 - 0.35]} rotation={[0, -Math.PI / 2, 0]} />
      <Chair position={[diningTableX + 0.52, 0.02, width / 2 - 0.755 + 0.15]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  )
}
