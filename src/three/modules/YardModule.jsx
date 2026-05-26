import { Box, Cylinder, Floor, Wall } from '../primitives'
import { avgWidth, roomCenterX } from '../roomUtils'

export default function YardModule({ row, back = false }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const borderThickness = 0.08
  const wallHeight = back ? 2.6 : 3.15
  const rearEdgeX = centerX + depth / 2 - 0.04
  const railHeight = 1.02
  const railWidth = width - 0.24
  const balusterCount = 8

  return (
    <group>
      <Floor size={[depth, 0.05, width]} position={[centerX, 0.025, 0]} color={back ? '#bfb6ab' : '#bfb6ab'} />
      <group>
        {/* Tường thẳng đứng cơ sở */}
        <Wall size={[depth, wallHeight, borderThickness]} position={[centerX, wallHeight / 2, -width / 2]} color="#f7f4ed" />
        <Wall size={[depth, wallHeight, borderThickness]} position={[centerX, wallHeight / 2, width / 2]} color="#f7f4ed" />
        
        {/* Tường vát chéo bịt kín khe hở mái (Chỉ có ở sân sau) */}
        {back && (
          <group>
            {/* L = depth / cos(0.15), dịch X đi -0.03 để góc trên cùng không bị hở và không bị lòi */}
            <Box size={[depth / Math.cos(0.15), 0.4, borderThickness]} position={[centerX - 0.03, 2.65, -width / 2]} rotation={[0, 0, -0.15]} color="#f7f4ed" />
            <Box size={[depth / Math.cos(0.15), 0.4, borderThickness]} position={[centerX - 0.03, 2.65, width / 2]} rotation={[0, 0, -0.15]} color="#f7f4ed" />
          </group>
        )}
      </group>
      {back ? (
        <group>
          {/* Ống thoát nước sân sau (30cm, góc dưới bên phải) */}
          <Cylinder position={[rearEdgeX + 0.1, 0.06, -width / 2 + 0.2]} radiusTop={0.03} radiusBottom={0.03} height={0.3} rotation={[0, 0, Math.PI / 2]} color="#6b6b68" />
          
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
