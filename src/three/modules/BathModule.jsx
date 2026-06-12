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
  const lavaboZoneW = 1.0
  const lavaboDepth = 0.72
  const leftWallWidth = 0.05
  const rightWallWidth = depth - lavaboZoneW - leftWallWidth - doorWidth

  const corridorCenterZ = width / 2 - corridorWidth / 2
  const roomStartX = centerX - depth / 2
  const roomEndX = centerX + depth / 2
  const doorCenterX = roomStartX + lavaboZoneW + leftWallWidth + doorWidth / 2

  // === Khung cửa vòm hành lang chổ lavabo ===
  const archH = 2.18
  const archR = 0.18
  const rightPillarW = 0.1
  const archXLeft = roomStartX
  const archXRight = roomStartX + lavaboZoneW - rightPillarW
  const archOpeningW = archXRight - archXLeft

  const leftFilletShape = useMemo(() => {
    const shape = new THREE.Shape()
    const yLimit = archH - archR
    shape.moveTo(archXLeft, yLimit)
    shape.lineTo(archXLeft, archH)
    shape.lineTo(archXLeft + archR, archH)
    shape.absarc(archXLeft + archR, yLimit, archR, Math.PI / 2, Math.PI, false)
    return shape
  }, [archXLeft])

  const rightFilletShape = useMemo(() => {
    const shape = new THREE.Shape()
    const yLimit = archH - archR
    shape.moveTo(archXRight, yLimit)
    shape.lineTo(archXRight, archH)
    shape.lineTo(archXRight - archR, archH)
    shape.absarc(archXRight - archR, yLimit, archR, Math.PI / 2, 0, true)
    return shape
  }, [archXRight])

  // Layout X coordinates
  const toiletX = roomStartX + 0.45
  const showerX = roomEndX - 0.45

  // Layout Z coordinates
  const toiletZ = roomTopZ + 0.35
  const showerZ = roomTopZ + 0.45

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
      {/* Recess Back Wall for Lavabo */}
      <Wall size={[lavaboZoneW, wallH, wallT]} position={[roomStartX + lavaboZoneW / 2, wallH / 2, corridorDividerZ - lavaboDepth]} color="#fbfaf6" />

      {/* Recess Side Wall */}
      <Wall size={[wallT, wallH, lavaboDepth + wallT]} position={[roomStartX + lavaboZoneW, wallH / 2, corridorDividerZ - lavaboDepth / 2]} color="#fbfaf6" />

      {/* Small wall before door */}
      <Wall size={[leftWallWidth, wallH, wallT]} position={[roomStartX + lavaboZoneW + leftWallWidth / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* Door Over-wall */}
      <Wall size={[doorWidth, wallH - doorHeight, wallT]} position={[doorCenterX, doorHeight + (wallH - doorHeight) / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* Right wall after door */}
      <Wall size={[rightWallWidth, wallH, wallT]} position={[roomEndX - rightWallWidth / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />

      {/* --- LAVABO AREA (In the recess, backing against Bedroom 2 wall) --- */}
      {/* 0. Cửa vòm hành lang chổ lavabo */}
      <Wall size={[rightPillarW, wallH, wallT]} position={[roomStartX + lavaboZoneW - rightPillarW / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />
      <Box size={[archOpeningW, wallH - archH, wallT]} position={[archXLeft + archOpeningW / 2, archH + (wallH - archH) / 2, corridorDividerZ]} color="#fbfaf6" />
      <mesh position={[0, 0, corridorDividerZ - wallT / 2]} castShadow receiveShadow>
        <extrudeGeometry args={[leftFilletShape, { depth: wallT, bevelEnabled: false, curveSegments: 32 }]} />
        <meshStandardMaterial color="#fbfaf6" />
      </mesh>
      <mesh position={[0, 0, corridorDividerZ - wallT / 2]} castShadow receiveShadow>
        <extrudeGeometry args={[rightFilletShape, { depth: wallT, bevelEnabled: false, curveSegments: 32 }]} />
        <meshStandardMaterial color="#fbfaf6" />
      </mesh>

      {/* 1. Bờ tường decor sát hành lang (Pony wall separating vanity from corridor) */}
      <Box size={[0.45, 1.1, 0.08]} position={[roomStartX + 0.225, 0.55, corridorDividerZ - 0.04]} color="#e3ddd5" />
      {/* Mặt đá của bờ tường (Ledge top) */}
      <Box size={[0.47, 0.02, 0.1]} position={[roomStartX + 0.225, 1.11, corridorDividerZ - 0.04]} color="#c4bbaa" />

      {/* 2. Tủ gắn tường dưới lavabo (Floating vanity cabinet) */}
      <Box size={[0.4, 0.35, 0.6]} position={[roomStartX + 0.2, 0.52, corridorDividerZ - 0.38]} color="#8c6b4a" />
      {/* Mặt đá tủ lavabo (Vanity top) */}
      <Box size={[0.42, 0.02, 0.62]} position={[roomStartX + 0.21, 0.70, corridorDividerZ - 0.38]} color="#f4f1eb" />

      {/* Lavabo (Vessel bowl sink) */}
      <mesh position={[roomStartX + 0.2, 0.78, corridorDividerZ - 0.38]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.14, 0.14, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>

      {/* Vòi nước (Faucet mounted on the bedroom wall) */}
      <Box size={[0.1, 0.03, 0.03]} position={[roomStartX + 0.05, 0.95, corridorDividerZ - 0.38]} color="#a1a5a8" />
      <Box size={[0.03, 0.1, 0.03]} position={[roomStartX + 0.08, 0.90, corridorDividerZ - 0.38]} color="#a1a5a8" />

      {/* 3. Gương decor tròn (Round decorative mirror) trên tường phòng ngủ */}
      <group position={[roomStartX + 0.02, 1.55, corridorDividerZ - 0.38]} rotation={[0, 0, Math.PI / 2]}>
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
      {/* Shower fixtures mounted on the right wall (roomEndX) */}
      <Box size={[0.04, 0.08, 0.04]} position={[roomEndX - 0.06, 1.0, showerZ]} color="#7d7d7a" />
      <Box size={[0.02, 0.4, 0.02]} position={[roomEndX - 0.1, 1.25, showerZ]} color="#8d8c89" />
      <Box size={[0.12, 0.02, 0.12]} position={[roomEndX - 0.14, 1.45, showerZ]} color="#b5b5b5" />

      <DoorLeaf position={[doorCenterX - 0.32, 0, corridorDividerZ - 0.02]} width={0.64} inward />
    </group>
  )
}
