import * as THREE from 'three'
import { useMemo } from 'react'
import { Bed, Cabinet, Floor, Wall, GlassPanel } from '../primitives'
import DoorLeaf from '../DoorLeaf'
import { avgWidth, mainRoomCenterZ, mainRoomWidth, roomCenterX } from '../roomUtils'
import { corridorWidth } from '../../data/housePlan'

export default function BedroomModule({ row, titleSide = 'left', hasDoor = true, empty = false, bedWidth = 1.28, bedDepth = 1.95, hasCorridorWindow = false, noDividerWall = false, windowW = 0.8, windowH = 1.0, sillY = 0.9 }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const mainWidth = mainRoomWidth(row)
  const mainCenterZ = mainRoomCenterZ(row)
  const corridorDividerZ = width / 2 - corridorWidth
  const wallT = 0.08
  const wallH = 3.05
  const bedZ = titleSide === 'left' ? mainCenterZ + 0.05 : mainCenterZ - 0.05
  const doorWidth = 0.78
  const doorHeight = 2.2
  const openingStart = 0.18
  const leftWallWidth = openingStart
  const rightWallWidth = depth - openingStart - doorWidth
  const openingCenterX = centerX - depth / 2 + openingStart + doorWidth / 2
  
  // Thông số 2 cửa sổ lật trên cao
  const wStart = centerX - depth / 2 + openingStart + doorWidth
  const w1Center = wStart + rightWallWidth * 0.28
  const w2Center = wStart + rightWallWidth * 0.72
  const smallW = 0.4
  const smallH = 0.4
  const smallSill = 2.5 // Cao độ bậu cửa, trần 3.05m -> cửa từ 2.5m đến 2.9m

  const leftPillarW = w1Center - smallW / 2 - wStart
  const midPillarW = w2Center - smallW / 2 - (w1Center + smallW / 2)
  const rightPillarW = (wStart + rightWallWidth) - (w2Center + smallW / 2)

  return (
    <group>
      <Floor size={[depth, 0.06, width]} position={[centerX, 0.03, 0]} color="#efe2cf" />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, -width / 2]} />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} />
      <Wall size={[wallT, wallH, mainWidth]} position={[centerX - depth / 2, wallH / 2, mainCenterZ]} />
      <Wall size={[wallT, wallH, mainWidth]} position={[centerX + depth / 2, wallH / 2, mainCenterZ]} />
      {!noDividerWall && (
        <group>
          {leftWallWidth > 0 ? (
            <Wall
              size={[leftWallWidth, wallH, wallT]}
              position={[centerX - depth / 2 + leftWallWidth / 2, wallH / 2, corridorDividerZ]}
              color="#fbfaf6"
            />
          ) : null}
          
          {rightWallWidth > 0 ? (
            hasCorridorWindow ? (
              <group>
                {/* Tường mảng dưới 2 cửa sổ */}
                <Wall size={[rightWallWidth, smallSill, wallT]} position={[wStart + rightWallWidth / 2, smallSill / 2, corridorDividerZ]} color="#fbfaf6" />
                {/* Tường mảng trên 2 cửa sổ */}
                <Wall size={[rightWallWidth, wallH - smallSill - smallH, wallT]} position={[wStart + rightWallWidth / 2, smallSill + smallH + (wallH - smallSill - smallH) / 2, corridorDividerZ]} color="#fbfaf6" />
                
                {/* 3 trụ tường giữa và hai bên cửa sổ */}
                <Wall size={[leftPillarW, smallH, wallT]} position={[wStart + leftPillarW / 2, smallSill + smallH / 2, corridorDividerZ]} color="#fbfaf6" />
                <Wall size={[midPillarW, smallH, wallT]} position={[w1Center + smallW / 2 + midPillarW / 2, smallSill + smallH / 2, corridorDividerZ]} color="#fbfaf6" />
                <Wall size={[rightPillarW, smallH, wallT]} position={[w2Center + smallW / 2 + rightPillarW / 2, smallSill + smallH / 2, corridorDividerZ]} color="#fbfaf6" />
                
                {[w1Center, w2Center].map((cx, idx) => (
                  <group key={idx}>
                    {/* Khung viền cửa sổ */}
                    <Wall size={[smallW, 0.04, wallT + 0.02]} position={[cx, smallSill + 0.02, corridorDividerZ]} color="#3a3a3a" />
                    <Wall size={[smallW, 0.04, wallT + 0.02]} position={[cx, smallSill + smallH - 0.02, corridorDividerZ]} color="#3a3a3a" />
                    <Wall size={[0.04, smallH, wallT + 0.02]} position={[cx - smallW / 2 + 0.02, smallSill + smallH / 2, corridorDividerZ]} color="#3a3a3a" />
                    <Wall size={[0.04, smallH, wallT + 0.02]} position={[cx + smallW / 2 - 0.02, smallSill + smallH / 2, corridorDividerZ]} color="#3a3a3a" />
                    
                    {/* Cửa hất (Awning window) - Xoay mở ra ngoài hành lang một góc nhỏ */}
                    <group position={[cx, smallSill + smallH - 0.04, corridorDividerZ + 0.02]} rotation={[-0.4, 0, 0]}>
                      <GlassPanel size={[smallW - 0.08, smallH - 0.08, 0.02]} position={[0, -(smallH - 0.08) / 2, 0]} color="#dfe5e6" />
                      {/* Khung cánh cửa */}
                      <Wall size={[smallW - 0.04, 0.03, 0.03]} position={[0, 0, 0]} color="#2a2a2a" />
                      <Wall size={[smallW - 0.04, 0.03, 0.03]} position={[0, -(smallH - 0.08), 0]} color="#2a2a2a" />
                      <Wall size={[0.03, smallH - 0.08, 0.03]} position={[-(smallW - 0.04) / 2 + 0.015, -(smallH - 0.08) / 2, 0]} color="#2a2a2a" />
                      <Wall size={[0.03, smallH - 0.08, 0.03]} position={[(smallW - 0.04) / 2 - 0.015, -(smallH - 0.08) / 2, 0]} color="#2a2a2a" />
                    </group>
                  </group>
                ))}
              </group>
            ) : (
              <Wall
                size={[rightWallWidth, wallH, wallT]}
                position={[centerX - depth / 2 + openingStart + doorWidth + rightWallWidth / 2, wallH / 2, corridorDividerZ]}
                color="#fbfaf6"
              />
            )
          ) : null}
          
          <Wall size={[doorWidth, wallH - doorHeight, wallT]} position={[openingCenterX, doorHeight + (wallH - doorHeight) / 2, corridorDividerZ]} color="#fbfaf6" />
        </group>
      )}

      {empty ? null : titleSide === 'right' ? (
        <Bed
          position={[centerX + depth / 2 - 0.04 - bedWidth / 2, 0.04, -width / 2 + bedDepth / 2 + 0.04]}
          width={bedWidth}
          depth={bedDepth}
          rotation={[0, -Math.PI / 2, 0]}
          color="#d7e1da"
          pillowColor="#fcfbf8"
          noHeadboard
        />
      ) : (
        <Bed position={[centerX - 0.05, 0.04, bedZ]} width={bedWidth} depth={bedDepth} color="#d7e1da" pillowColor="#fcfbf8" />
      )}
      {empty || titleSide === 'right' ? null : (
        <Cabinet position={[centerX + 0.72, 0, -width / 2 + 0.24]} size={[0.36, 1.75, 0.44]} color="#c89a68" />
      )}
      {hasDoor && !noDividerWall && (
        <DoorLeaf position={[openingCenterX - doorWidth / 2, 0, corridorDividerZ - 0.02]} width={doorWidth} inward />
      )}
    </group>
  )
}
