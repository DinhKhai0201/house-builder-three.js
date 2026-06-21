import * as THREE from 'three'
import { useMemo } from 'react'
import { corridorWidth } from '../../data/housePlan'
import { Bed, Box, Cabinet, Floor, GlassPanel, Table, Wall } from '../primitives'
import { avgWidth, roomCenterX } from '../roomUtils'

export default function MasterModule({ row }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const wallT = 0.08
  const wallH = 3.1
  const rearDoorWidth = 0.76
  const rearWindowWidth = 1.18
  const masterEntryWallWidth = width - corridorWidth
  const masterEntryCenterZ = -corridorWidth / 2
  const rearFaceX = centerX + depth / 2 - 0.02
  const rearWindowCenterZ = -width / 2 + 0.89
  const rearDoorCenterZ = width / 2 - 0.56
  const rearDoorHeight = 2.34
  const rearWindowHeight = 1.44
  const windowSillY = 0.9
  const doorHeight = 2.2

  const rearOpenings = [
    { center: rearWindowCenterZ, width: rearWindowWidth },
    { center: rearDoorCenterZ, width: rearDoorWidth },
  ].sort((a, b) => a.center - b.center)

  const rearLeftSolid = rearOpenings[0].center - rearOpenings[0].width / 2 - (-width / 2)
  const rearMidSolid =
    rearOpenings[1].center -
    rearOpenings[1].width / 2 -
    (rearOpenings[0].center + rearOpenings[0].width / 2)
  const rearRightSolid = width / 2 - (rearOpenings[1].center + rearOpenings[1].width / 2)

  return (
    <group>
      <Floor size={[depth, 0.06, width]} position={[centerX, 0.03, 0]} color="#f1e5d5" />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, -width / 2]} />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} />
      <Wall size={[wallT, wallH, masterEntryWallWidth]} position={[centerX - depth / 2, wallH / 2, masterEntryCenterZ]} />
      {/* Cửa gỗ phòng Master ở cuối hành lang (mở vào trong, chiều cao bằng cửa sau 2.34m) */}
      <Wall
        size={[wallT, wallH - doorHeight, 0.8]}
        position={[centerX - depth / 2, doorHeight + (wallH - doorHeight) / 2, width / 2 - 0.4]}
        color="#fbfaf6"
      />

      <group position={[centerX - depth / 2 - 0.02, 0, width / 2]} rotation={[0, 1.2, 0]}>
        <Box
          size={[0.04, doorHeight, 0.72]}
          position={[0, doorHeight / 2, -0.36]}
          color="#9f734b"
        />
      </group>
      {rearLeftSolid > 0 ? (
        <Wall
          size={[wallT, wallH, rearLeftSolid]}
          position={[centerX + depth / 2, wallH / 2, -width / 2 + rearLeftSolid / 2]}
        />
      ) : null}
      {rearMidSolid > 0 ? (
        <Wall
          size={[wallT, wallH, rearMidSolid]}
          position={[
            centerX + depth / 2,
            wallH / 2,
            rearOpenings[0].center + rearOpenings[0].width / 2 + rearMidSolid / 2,
          ]}
        />
      ) : null}
      {rearRightSolid > 0 ? (
        <Wall
          size={[wallT, wallH, rearRightSolid]}
          position={[centerX + depth / 2, wallH / 2, width / 2 - rearRightSolid / 2]}
        />
      ) : null}

      <Wall
        size={[wallT, wallH - rearDoorHeight, rearDoorWidth]}
        position={[centerX + depth / 2, rearDoorHeight + (wallH - rearDoorHeight) / 2, rearDoorCenterZ]}
      />

      {windowSillY > 0 ? (
        <Wall
          size={[wallT, windowSillY, rearWindowWidth]}
          position={[centerX + depth / 2, windowSillY / 2, rearWindowCenterZ]}
          color="#fbfaf6"
        />
      ) : null}
      <Wall
        size={[wallT, wallH - rearWindowHeight - windowSillY, rearWindowWidth]}
        position={[
          centerX + depth / 2,
          windowSillY + rearWindowHeight + (wallH - rearWindowHeight - windowSillY) / 2,
          rearWindowCenterZ,
        ]}
        color="#fbfaf6"
      />

      <Box size={[0.05, rearDoorHeight, 0.06]} position={[rearFaceX, rearDoorHeight / 2, rearDoorCenterZ - rearDoorWidth / 2]} color="#ece5d8" />
      <Box size={[0.05, rearDoorHeight, 0.06]} position={[rearFaceX, rearDoorHeight / 2, rearDoorCenterZ + rearDoorWidth / 2]} color="#ece5d8" />
      <Box size={[0.05, 0.06, rearDoorWidth + 0.04]} position={[rearFaceX, rearDoorHeight - 0.03, rearDoorCenterZ]} color="#ece5d8" />
      <Box size={[0.05, rearWindowHeight, 0.06]} position={[rearFaceX, windowSillY + rearWindowHeight / 2, rearWindowCenterZ - rearWindowWidth / 2]} color="#ece5d8" />
      <Box size={[0.05, rearWindowHeight, 0.06]} position={[rearFaceX, windowSillY + rearWindowHeight / 2, rearWindowCenterZ + rearWindowWidth / 2]} color="#ece5d8" />
      <Box size={[0.05, 0.06, rearWindowWidth + 0.04]} position={[rearFaceX, windowSillY + rearWindowHeight - 0.03, rearWindowCenterZ]} color="#ece5d8" />
      <Box size={[0.05, 0.06, rearWindowWidth + 0.04]} position={[rearFaceX, windowSillY + 0.03, rearWindowCenterZ]} color="#ece5d8" />
      <GlassPanel size={[0.03, rearWindowHeight - 0.08, rearWindowWidth - 0.08]} position={[rearFaceX - 0.01, windowSillY + rearWindowHeight / 2, rearWindowCenterZ]} color="#dfe5e6" />

      {/* Gờ bê tông che mưa (ô văng) nhô ra 10cm phía trên cửa chính sân sau và cửa sổ */}
      <Box size={[0.18, 0.05, rearDoorWidth + 0.12]} position={[rearFaceX + 0.05, 2.37, rearDoorCenterZ]} color="#fbfaf6" />
      <Box size={[0.18, 0.05, rearWindowWidth + 0.12]} position={[rearFaceX + 0.05, 2.37, rearWindowCenterZ]} color="#fbfaf6" />

      {/* Máy lạnh (điều hòa) nằm trên cửa sổ phòng master */}
      <group position={[centerX + depth / 2 - 0.12, 2.65, rearWindowCenterZ]}>
        <Box size={[0.2, 0.3, 0.9]} position={[0, 0, 0]} color="#f2f5f6" />
        <Box size={[0.04, 0.04, 0.86]} position={[-0.1, -0.1, 0]} color="#2d2d2d" /> {/* Khe gió */}
      </group>

      <Bed
        position={[centerX - depth / 2 + 2.18, 0.04, -width / 2 + 1.02]}
        width={1.75}
        depth={2}
        rotation={[0, -Math.PI / 2, 0]}
        color="#d28f6b"
        pillowColor="#f7f4ee"
      />
      <Cabinet position={[centerX - depth / 2 + 3.22, 0, -width / 2 + 0.42]} size={[0.34, 0.42, 0.34]} color="#d2b08a" />
      <Cabinet position={[centerX - depth / 2 + 0.73, 0, -width / 2 + 0.38]} size={[1.1, 1.9, 0.42]} color="#c49461" />
      <Table position={[centerX - depth / 2 + 1.98, 0.02, width / 2 - 0.34]} size={[0.72, 0.08, 0.38]} color="#c79767" />
    </group>
  )
}
