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
  
  // Thông số cửa sổ hành lang
  const wStart = centerX - depth / 2 + openingStart + doorWidth
  const windowCenter = wStart + rightWallWidth / 2
  const rightWallLeft_W = (windowCenter - windowW / 2) - wStart
  const rightWallRight_W = (wStart + rightWallWidth) - (windowCenter + windowW / 2)

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
                {/* Tường mảng dưới cửa sổ */}
                <Wall size={[windowW, sillY, wallT]} position={[windowCenter, sillY / 2, corridorDividerZ]} color="#fbfaf6" />
                {/* Tường mảng trên cửa sổ */}
                <Wall size={[windowW, wallH - sillY - windowH, wallT]} position={[windowCenter, sillY + windowH + (wallH - sillY - windowH) / 2, corridorDividerZ]} color="#fbfaf6" />
                {/* Tường mảng trái cửa sổ */}
                <Wall size={[rightWallLeft_W, wallH, wallT]} position={[wStart + rightWallLeft_W / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />
                {/* Tường mảng phải cửa sổ */}
                <Wall size={[rightWallRight_W, wallH, wallT]} position={[windowCenter + windowW / 2 + rightWallRight_W / 2, wallH / 2, corridorDividerZ]} color="#fbfaf6" />
                {/* Khung viền cửa sổ */}
                <Wall size={[windowW, 0.04, wallT + 0.02]} position={[windowCenter, sillY + 0.02, corridorDividerZ]} color="#3a3a3a" />
                <Wall size={[windowW, 0.04, wallT + 0.02]} position={[windowCenter, sillY + windowH - 0.02, corridorDividerZ]} color="#3a3a3a" />
                <Wall size={[0.04, windowH, wallT + 0.02]} position={[windowCenter - windowW / 2 + 0.02, sillY + windowH / 2, corridorDividerZ]} color="#3a3a3a" />
                <Wall size={[0.04, windowH, wallT + 0.02]} position={[windowCenter + windowW / 2 - 0.02, sillY + windowH / 2, corridorDividerZ]} color="#3a3a3a" />
                {/* 2 Cánh cửa lùa (Sliding glass panes) */}
                <GlassPanel size={[windowW / 2, windowH - 0.08, 0.02]} position={[windowCenter - windowW / 4 + 0.01, sillY + windowH / 2, corridorDividerZ - 0.015]} color="#dfe5e6" />
                <GlassPanel size={[windowW / 2, windowH - 0.08, 0.02]} position={[windowCenter + windowW / 4 - 0.01, sillY + windowH / 2, corridorDividerZ + 0.015]} color="#dfe5e6" />
                {/* Khung dọc cánh lùa */}
                <Wall size={[0.03, windowH - 0.08, 0.03]} position={[windowCenter, sillY + windowH / 2, corridorDividerZ - 0.015]} color="#3a3a3a" />
                <Wall size={[0.03, windowH - 0.08, 0.03]} position={[windowCenter, sillY + windowH / 2, corridorDividerZ + 0.015]} color="#3a3a3a" />
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
      {hasDoor && !noDividerWall ? <DoorLeaf position={[centerX - depth / 2 + openingStart, 0, corridorDividerZ - 0.02]} width={0.68} inward /> : null}
    </group>
  )
}
