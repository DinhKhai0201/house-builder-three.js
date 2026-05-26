import { Bed, Cabinet, Floor, Wall } from '../primitives'
import DoorLeaf from '../DoorLeaf'
import { avgWidth, mainRoomCenterZ, mainRoomWidth, roomCenterX } from '../roomUtils'

export default function BedroomModule({ row, titleSide = 'left', hasDoor = true, empty = false, bedWidth = 1.28, bedDepth = 1.95 }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const mainWidth = mainRoomWidth(row)
  const mainCenterZ = mainRoomCenterZ(row)
  const corridorDividerZ = width / 2 - 0.8
  const wallT = 0.08
  const wallH = 3.05
  const bedZ = titleSide === 'left' ? mainCenterZ + 0.05 : mainCenterZ - 0.05
  const doorWidth = 0.78
  const doorHeight = 2.18
  const openingStart = 0.18
  const leftWallWidth = openingStart
  const rightWallWidth = depth - openingStart - doorWidth
  const openingCenterX = centerX - depth / 2 + openingStart + doorWidth / 2

  return (
    <group>
      <Floor size={[depth, 0.06, width]} position={[centerX, 0.03, 0]} color="#efe2cf" />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, -width / 2]} />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} />
      <Wall size={[wallT, wallH, mainWidth]} position={[centerX - depth / 2, wallH / 2, mainCenterZ]} />
      <Wall size={[wallT, wallH, mainWidth]} position={[centerX + depth / 2, wallH / 2, mainCenterZ]} />
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
      {hasDoor ? <DoorLeaf position={[centerX - depth / 2 + openingStart, 0, corridorDividerZ - 0.02]} width={0.68} inward /> : null}
    </group>
  )
}
