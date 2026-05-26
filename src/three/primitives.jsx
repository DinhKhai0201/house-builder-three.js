function defaultShadowProps() {
  return { castShadow: true, receiveShadow: true }
}

export function Box({ size, position, color, opacity = 1, rotation, children }) {
  return (
    <mesh position={position} rotation={rotation} {...defaultShadowProps()}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} transparent={opacity < 1} opacity={opacity} />
      {children}
    </mesh>
  )
}

export function Floor({ size, position, color = '#efe4d2' }) {
  return <Box size={size} position={position} color={color} />
}

export function Wall({ size, position, color = '#fbfaf6' }) {
  return <Box size={size} position={position} color={color} />
}


export function GlassPanel({ size, position, color = '#dce9ee' }) {
  return <Box size={size} position={position} color={color} opacity={0.45} />
}

export function Bed({ position, width = 1.4, depth = 2, color = '#d5a37f', pillowColor = '#f2eee8', rotation, noHeadboard = false }) {
  return (
    <group position={position} rotation={rotation}>
      <Box size={[depth, 0.28, width]} position={[0, 0.14, 0]} color="#c99a68" />
      <Box size={[depth - (noHeadboard ? 0.08 : 0.22), 0.14, width - 0.08]} position={[noHeadboard ? 0 : 0.11, 0.35, 0]} color={color} />
      {!noHeadboard && <Box size={[0.22, 0.8, width]} position={[-depth / 2 + 0.11, 0.54, 0]} color="#d6b07f" />}
      <Box size={[0.42, 0.08, 0.34]} position={[-depth / 2 + (noHeadboard ? 0.28 : 0.5), 0.47, -width / 4]} color={pillowColor} />
      <Box size={[0.42, 0.08, 0.34]} position={[-depth / 2 + (noHeadboard ? 0.28 : 0.5), 0.47, width / 4]} color={pillowColor} />
    </group>
  )
}

export function Sofa({ position }) {
  return (
    <group position={position}>
      <Box size={[1.8, 0.34, 0.78]} position={[0, 0.17, 0]} color="#d8d0c3" />
      <Box size={[1.8, 0.56, 0.18]} position={[-0.08, 0.44, -0.3]} color="#d2c7b7" />
      <Box size={[0.16, 0.5, 0.78]} position={[-0.82, 0.36, 0]} color="#d2c7b7" />
      <Box size={[0.16, 0.5, 0.78]} position={[0.82, 0.36, 0]} color="#d2c7b7" />
    </group>
  )
}

export function Table({ position, size = [1.4, 0.1, 0.78], color = '#b88757', legColor = '#8a603d' }) {
  const [width, height, depth] = size
  return (
    <group position={position}>
      <Box size={[width, height, depth]} position={[0, 0.75, 0]} color={color} />
      <Box size={[0.08, 0.75, 0.08]} position={[-width / 2 + 0.08, 0.37, -depth / 2 + 0.08]} color={legColor} />
      <Box size={[0.08, 0.75, 0.08]} position={[width / 2 - 0.08, 0.37, -depth / 2 + 0.08]} color={legColor} />
      <Box size={[0.08, 0.75, 0.08]} position={[-width / 2 + 0.08, 0.37, depth / 2 - 0.08]} color={legColor} />
      <Box size={[0.08, 0.75, 0.08]} position={[width / 2 - 0.08, 0.37, depth / 2 - 0.08]} color={legColor} />
    </group>
  )
}

export function Chair({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <Box size={[0.44, 0.06, 0.42]} position={[0, 0.48, 0]} color="#a66c43" />
      <Box size={[0.44, 0.5, 0.06]} position={[-0.16, 0.72, -0.18]} color="#8c5b39" />
      <Box size={[0.05, 0.5, 0.05]} position={[-0.17, 0.22, -0.15]} color="#855636" />
      <Box size={[0.05, 0.5, 0.05]} position={[0.17, 0.22, -0.15]} color="#855636" />
      <Box size={[0.05, 0.5, 0.05]} position={[-0.17, 0.22, 0.15]} color="#855636" />
      <Box size={[0.05, 0.5, 0.05]} position={[0.17, 0.22, 0.15]} color="#855636" />
    </group>
  )
}

export function Cabinet({ position, size = [0.6, 0.9, 0.45], color = '#c69b6f' }) {
  return <Box size={size} position={[position[0], position[1] + size[1] / 2, position[2]]} color={color} />
}

export function PlantBed({ position, size = [1.4, 0.28, 0.55] }) {
  return (
    <group position={position}>
      <Box size={size} position={[0, size[1] / 2, 0]} color="#d0b391" />
      <Box size={[size[0] - 0.08, 0.12, size[2] - 0.08]} position={[0, size[1] + 0.06, 0]} color="#6b523d" />
      <Box size={[0.18, 0.34, 0.18]} position={[-0.38, size[1] + 0.23, 0]} color="#6fa06c" />
      <Box size={[0.18, 0.42, 0.18]} position={[0, size[1] + 0.27, 0.08]} color="#84b57d" />
      <Box size={[0.18, 0.28, 0.18]} position={[0.38, size[1] + 0.2, -0.06]} color="#5f8f59" />
    </group>
  )
}

export function Cylinder({ position, radiusTop, radiusBottom, height, color, rotation }) {
  return (
    <mesh position={position} rotation={rotation} {...defaultShadowProps()}>
      <cylinderGeometry args={[radiusTop, radiusBottom, height, 28]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
