import * as THREE from 'three'
import { useMemo } from 'react'
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
  const corridorDividerZ = width / 2 - corridorWidth
  const wallT = 0.08
  const wallH = 3.05
  const roomTopZ = mainCenterZ - mainWidth / 2
  const roomBottomZ = mainCenterZ + mainWidth / 2
  const doorWidth = 0.72
  const doorHeight = 2.2
  const lavaboZoneW = 0.8
  const lavaboDepth = 0.8
  const rightWallWidth = 0.05
  const leftWallWidth = depth - lavaboZoneW - rightWallWidth - doorWidth

  const corridorCenterZ = width / 2 - corridorWidth / 2
  const roomStartX = centerX - depth / 2
  const roomEndX = centerX + depth / 2
  
  const doorCenterX = roomStartX + leftWallWidth + doorWidth / 2
  const lavaboStartX = roomEndX - lavaboZoneW

  // === Khung cửa hành lang chổ lavabo ===
  const archH = 2.18
  const leftPillarW = 0.1
  const archXLeft = lavaboStartX + leftPillarW
  const archXRight = roomEndX
  const archOpeningW = archXRight - archXLeft

  // Layout X coordinates
  const showerX = roomStartX + 0.45
  const toiletX = roomEndX - 0.45

  // Layout Z coordinates
  const toiletZ = roomTopZ + 0.35
  const showerZ = roomTopZ + 0.45

  // Niche parameters (Back Wall)
  const nicheW = 0.36
  const nicheShower_X = roomStartX + 0.45
  const nicheWC_X = roomEndX - 0.45

  const wallLeft_W = (nicheShower_X - nicheW / 2) - roomStartX
  const wallMid_W = (nicheWC_X - nicheW / 2) - (nicheShower_X + nicheW / 2)
  const wallRight_W = roomEndX - (nicheWC_X + nicheW / 2)

  return (
    <group>
      <Floor size={[depth, 0.06, mainWidth]} position={[centerX, 0.03, mainCenterZ]} color="#b9b0a7" />
      <Floor size={[depth, 0.06, corridorWidth]} position={[centerX, 0.03, corridorCenterZ]} color="#f1e5d5" />

      {/* --- EXTERIOR BACK WALL WITH NICHES --- */}
      {/* 1. Left solid segment */}
      <Wall size={[wallLeft_W, wallH, wallT]} position={[roomStartX + wallLeft_W / 2, wallH / 2, roomTopZ]} color="#fbfaf6" />
      {/* 2. Middle solid segment */}
      <Wall size={[wallMid_W, wallH, wallT]} position={[nicheShower_X + nicheW / 2 + wallMid_W / 2, wallH / 2, roomTopZ]} color="#fbfaf6" />
      {/* 3. Right solid segment */}
      <Wall size={[wallRight_W, wallH, wallT]} position={[roomEndX - wallRight_W / 2, wallH / 2, roomTopZ]} color="#fbfaf6" />

      {/* Niche Columns (Shower & WC) */}
      {[nicheShower_X, nicheWC_X].map((nx, i) => (
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
      {/* Left wall before door */}
      <Wall size={[leftWallWidth, wallH, wallT]} position={[roomStartX + leftWallWidth / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* Door Over-wall */}
      <Wall size={[doorWidth, wallH - doorHeight, wallT]} position={[doorCenterX, doorHeight + (wallH - doorHeight) / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* Right wall after door (separating door from lavabo) */}
      <Wall size={[rightWallWidth, wallH, wallT]} position={[lavaboStartX - rightWallWidth / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* Recess Side Wall */}
      <Wall size={[wallT, wallH, lavaboDepth + wallT]} position={[lavaboStartX, wallH / 2, corridorDividerZ - lavaboDepth / 2]} color="#fbfaf6" />

      {/* Recess Back Wall for Lavabo */}
      <Wall size={[lavaboZoneW, wallH, wallT]} position={[lavaboStartX + lavaboZoneW / 2, wallH / 2, corridorDividerZ - lavaboDepth]} color="#fbfaf6" />

      {/* --- LAVABO AREA (In the recess, facing the corridor) --- */}
      {/* 0. Lối vào hành lang chổ lavabo */}
      <Wall size={[leftPillarW, wallH, wallT]} position={[lavaboStartX + leftPillarW / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />
      <Box size={[archOpeningW, wallH - archH, wallT]} position={[archXLeft + archOpeningW / 2, archH + (wallH - archH) / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* 2. Tủ gắn tường dưới lavabo (Floating vanity cabinet) */}
      <Box size={[0.8, 0.35, 0.45]} position={[lavaboStartX + lavaboZoneW / 2, 0.52, corridorDividerZ - 0.45]} color="#8c6b4a" />
      {/* Mặt đá tủ lavabo (Vanity top) */}
      <Box size={[0.82, 0.02, 0.47]} position={[lavaboStartX + lavaboZoneW / 2, 0.70, corridorDividerZ - 0.45]} color="#f4f1eb" />

      {/* Lavabo (Vessel bowl sink) */}
      <mesh position={[lavaboStartX + lavaboZoneW / 2, 0.78, corridorDividerZ - 0.45]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.14, 0.14, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>

      {/* Vòi nước (Faucet mounted on the back wall) */}
      <Box size={[0.03, 0.03, 0.18]} position={[lavaboStartX + lavaboZoneW / 2, 0.95, corridorDividerZ - 0.58]} color="#a1a5a8" />
      <Box size={[0.03, 0.1, 0.03]} position={[lavaboStartX + lavaboZoneW / 2, 0.90, corridorDividerZ - 0.66]} color="#a1a5a8" />

      {/* 3. Gương decor tròn (Round decorative mirror) trên tường sau */}
      <group position={[lavaboStartX + lavaboZoneW / 2, 1.55, corridorDividerZ - 0.67]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Mirror frame */}
        <mesh castShadow receiveShadow position={[0, -0.01, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Mirror glass */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.022, 32]} />
          <meshStandardMaterial color="#c8dce6" metalness={0.9} roughness={0.05} />
        </mesh>
      </group>

      {/* --- SHOWER AREA (Inner Left Corner) --- */}
      {/* Shower floor area */}
      <Box size={[0.9, 0.05, 0.9]} position={[showerX, 0.04, showerZ]} color="#c6c2ba" />
      {/* Shower Curtain Rod */}
      <mesh position={[roomStartX + 0.9, 2.0, showerZ]} castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.9, 16]} />
        <meshStandardMaterial color="#8d8c89" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Shower Curtain Fabric (partially open) */}
      <mesh position={[roomStartX + 0.9, 1.05, showerZ - 0.05]} castShadow receiveShadow>
        <boxGeometry args={[0.02, 1.9, 0.8]} />
        <meshStandardMaterial color="#e8e4db" roughness={0.9} />
      </mesh>
      {/* Shower fixtures mounted on the left wall (roomStartX) */}
      <Box size={[0.04, 0.08, 0.04]} position={[roomStartX + 0.06, 1.0, showerZ]} color="#7d7d7a" />
      <Box size={[0.02, 0.4, 0.02]} position={[roomStartX + 0.1, 1.25, showerZ]} color="#8d8c89" />
      <Box size={[0.12, 0.02, 0.12]} position={[roomStartX + 0.14, 1.45, showerZ]} color="#b5b5b5" />

      {/* --- WC AREA (Inner Right Corner) --- */}
      <Box size={[0.36, 0.36, 0.18]} position={[toiletX, 0.42, roomTopZ + 0.09]} color="#f3f3f1" />
      <mesh position={[toiletX, 0.20, toiletZ]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.14, 0.4, 24]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <DoorLeaf position={[doorCenterX - 0.32, 0, corridorDividerZ + 0.02]} width={0.64} />
    </group>
  )
}
