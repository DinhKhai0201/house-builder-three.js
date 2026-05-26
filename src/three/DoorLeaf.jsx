import { Box } from './primitives'

export default function DoorLeaf({
  position,
  rotation = [0, 0, 0],
  width = 0.68,
  openAngle = -0.8,
  vertical = false,
  inward = false,
}) {
  const leafRotation = vertical ? [0, rotation[1] + openAngle, 0] : rotation
  const zOffset = inward ? -width / 2 : width / 2
  return (
    <group position={position} rotation={leafRotation}>
      <Box size={[0.04, 2.1, width]} position={[0, 1.05, zOffset]} color="#9f734b" />
    </group>
  )
}
