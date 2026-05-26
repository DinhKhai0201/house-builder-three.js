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
  const roomEndX = centerX + depth / 2
  
  // Layout X coordinates
  const toiletX = roomStartX + 0.45
  const showerX = roomEndX - 0.45
  const sinkX = roomEndX - 0.4
  
  // Layout Z coordinates
  const toiletZ = roomTopZ + 0.35
  const showerZ = roomTopZ + 0.45
  const sinkZ = corridorDividerZ - 0.18
  
  // Niche parameters (Back Wall)
  const nicheW = 0.36
  const nicheWC_X = roomStartX + 0.45
  const nicheShower_X = roomEndX - 0.45
  
  const wallLeft_W = (nicheWC_X - nicheW / 2) - roomStartX
  const wallMid_W = (nicheShower_X - nicheW / 2) - (nicheWC_X + nicheW / 2)
  const wallRight_W = roomEndX - (nicheShower_X + nicheW / 2)

  return (
    <group>
      <Floor size={[depth, 0.06, mainWidth]} position={[centerX, 0.03, mainCenterZ]} color="#b9b0a7" />
      <Floor size={[depth, 0.06, corridorWidth]} position={[centerX, 0.03, corridorCenterZ]} color="#f1e5d5" />
      
      {/* --- EXTERIOR BACK WALL WITH NICHES --- */}
      {/* 1. Left solid segment */}
      <Wall size={[wallLeft_W, wallH, wallT]} position={[roomStartX + wallLeft_W / 2, wallH / 2, roomTopZ]} color="#fbfaf6" />
      {/* 2. Middle solid segment */}
      <Wall size={[wallMid_W, wallH, wallT]} position={[nicheWC_X + nicheW / 2 + wallMid_W / 2, wallH / 2, roomTopZ]} color="#fbfaf6" />
      {/* 3. Right solid segment */}
      <Wall size={[wallRight_W, wallH, wallT]} position={[roomEndX - wallRight_W / 2, wallH / 2, roomTopZ]} color="#fbfaf6" />
      
      {/* Niche Columns (WC & Shower) */}
      {[nicheWC_X, nicheShower_X].map((nx, i) => (
        <group key={i}>
          {/* Thin backing wall */}
          <Wall size={[nicheW, wallH, 0.02]} position={[nx, wallH / 2, roomTopZ - wallT / 2 + 0.01]} color="#d0cec8" />
          {/* Bottom solid fill (0 to 0.8) */}
          <Wall size={[nicheW, 0.8, wallT]} position={[nx, 0.4, roomTopZ]} color="#fbfaf6" />
          {/* Shelf 1 */}
          <Box size={[nicheW, 0.04, wallT]} position={[nx, 0.82, roomTopZ]} color="#d0cec8" />
          {/* Shelf 2 */}
          <Box size={[nicheW, 0.04, wallT]} position={[nx, 1.22, roomTopZ]} color="#d0cec8" />
          {/* Shelf 3 */}
          <Box size={[nicheW, 0.04, wallT]} position={[nx, 1.62, roomTopZ]} color="#d0cec8" />
          {/* Top solid fill (1.95 to 3.05) */}
          <Wall size={[nicheW, wallH - 1.95, wallT]} position={[nx, 1.95 + (wallH - 1.95) / 2, roomTopZ]} color="#fbfaf6" />
        </group>
      ))}

      {/* --- EXTERIOR CORRIDOR WALL (Outer shell of the house) --- */}
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} color="#fbfaf6" />

      {/* --- CORRIDOR WALLS & DOOR (Separating WC from corridor) --- */}
      {leftWallWidth > 0 ? (
        <Wall size={[leftWallWidth, wallH, wallT]} position={[roomStartX + leftWallWidth / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />
      ) : null}
      
      {/* Right corridor wall explicitly drawn to fix missing wall issue */}
      <Wall size={[0.92, wallH, wallT]} position={[roomStartX + 1.34, wallH / 2, corridorDividerZ]} color="#fbfaf6" />
      
      <Wall size={[doorWidth, wallH - doorHeight, wallT]} position={[openingCenterX, doorHeight + (wallH - doorHeight) / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* --- LAVABO AREA (Attached to corridor wall, facing inward) --- */}
      <Box size={[0.5, 0.14, 0.35]} position={[sinkX, 0.82, sinkZ]} color="#ece9e3" />
      <Box size={[0.04, 0.04, 0.15]} position={[sinkX, 0.92, sinkZ - 0.08]} color="#c6d0d4" />
      {/* Mirror on corridor wall */}
      <Box size={[0.5, 0.7, 0.02]} position={[sinkX, 1.4, corridorDividerZ + 0.01]} color="#d8d7d3" />

      {/* --- WC AREA (Inner Left Corner) --- */}
      <Box size={[0.36, 0.36, 0.18]} position={[toiletX, 0.42, roomTopZ + 0.09]} color="#f3f3f1" />
      <mesh position={[toiletX, 0.20, toiletZ]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.14, 0.4, 24]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* --- SHOWER AREA (Inner Right Corner) --- */}
      {/* Shower floor area */}
      <Box size={[0.9, 0.05, 0.9]} position={[showerX, 0.04, showerZ]} color="#c6c2ba" />
      {/* Glass partition dividing shower and WC */}
      <mesh position={[roomEndX - 0.9, 1.0, showerZ]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 2.0, 0.9]} />
        <meshStandardMaterial color="#c8dce6" transparent opacity={0.4} roughness={0.1} />
      </mesh>
      {/* Front glass partition (leaving 0.5m entry) */}
      <mesh position={[roomEndX - 0.2, 1.0, roomTopZ + 0.9]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 2.0, 0.02]} />
        <meshStandardMaterial color="#c8dce6" transparent opacity={0.4} roughness={0.1} />
      </mesh>
      {/* Shower fixtures mounted on the right wall (roomEndX) */}
      <Box size={[0.04, 0.08, 0.04]} position={[roomEndX - 0.06, 1.0, showerZ]} color="#7d7d7a" />
      <Box size={[0.02, 0.4, 0.02]} position={[roomEndX - 0.1, 1.25, showerZ]} color="#8d8c89" />
      <Box size={[0.12, 0.02, 0.12]} position={[roomEndX - 0.14, 1.45, showerZ]} color="#b5b5b5" />

      <DoorLeaf position={[roomStartX + openingStart, 0, corridorDividerZ - 0.02]} width={0.64} inward />
    </group>
  )
}
