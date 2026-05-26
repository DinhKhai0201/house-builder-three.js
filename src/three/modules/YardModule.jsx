import { Box, Floor, Wall } from '../primitives'
import { avgWidth, roomCenterX } from '../roomUtils'

export default function YardModule({ row, back = false }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const borderThickness = 0.08
  const wallHeight = back ? 2.45 : 3.15
  const rearEdgeX = centerX + depth / 2 - 0.04
  const railHeight = 1.02
  const railWidth = width - 0.24
  const balusterCount = 8

  return (
    <group>
      <Floor size={[depth, 0.05, width]} position={[centerX, 0.025, 0]} color={back ? '#bfb6ab' : '#bfb6ab'} />
      <Wall size={[depth, wallHeight, borderThickness]} position={[centerX, wallHeight / 2, -width / 2]} color="#f7f4ed" />
      <Wall size={[depth, wallHeight, borderThickness]} position={[centerX, wallHeight / 2, width / 2]} color="#f7f4ed" />
      {back ? (
        <group>
          <Box size={[0.08, 0.08, railWidth]} position={[rearEdgeX, 1.03, 0]} color="#bfc6cb" />
          <Box size={[0.08, 0.06, railWidth]} position={[rearEdgeX, 0.08, 0]} color="#aeb7bc" />
          {Array.from({ length: balusterCount }).map((_, index) => {
            const z = -railWidth / 2 + (index * railWidth) / (balusterCount - 1)
            return (
              <group key={index}>
                <Box size={[0.04, railHeight, 0.04]} position={[rearEdgeX, railHeight / 2, z]} color="#cfd5d8" />
                <Box size={[0.07, 0.06, 0.07]} position={[rearEdgeX, 0.32, z]} color="#aeb7bc" />
                <Box size={[0.07, 0.06, 0.07]} position={[rearEdgeX, 0.72, z]} color="#aeb7bc" />
              </group>
            )
          })}
        </group>
      ) : null}
    </group>
  )
}
