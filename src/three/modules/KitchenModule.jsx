import * as THREE from 'three'
import { useMemo } from 'react'
import { Box, Cabinet, Floor, Wall } from '../primitives'
import { avgWidth, roomCenterX } from '../roomUtils'


// Bộ bàn ăn phong cách Japandi với mặt đá trắng và khung chân gỗ sồi sáng màu
function DiningTable({ position, size }) {
  const [w, h, d] = size // w: rộng (X), h: cao, d: dài (Z)
  const oakColor = "#d6ae7b"
  const legSize = 0.05
  return (
    <group position={position}>
      {/* Mặt bàn đá trắng sang trọng */}
      <Box size={[w, 0.03, d]} position={[0, 0.735, 0]} color="#ffffff" />
      {/* Khung đỡ bằng gỗ sồi chạy dưới mặt bàn */}
      <Box size={[w - 0.08, 0.05, d - 0.08]} position={[0, 0.695, 0]} color={oakColor} />
      {/* 4 Chân bàn gỗ sồi vuông vắn vững chãi */}
      <Box size={[legSize, 0.72, legSize]} position={[-w / 2 + legSize / 2 + 0.02, 0.36, -d / 2 + legSize / 2 + 0.02]} color={oakColor} />
      <Box size={[legSize, 0.72, legSize]} position={[w / 2 - legSize / 2 - 0.02, 0.36, -d / 2 + legSize / 2 + 0.02]} color={oakColor} />
      <Box size={[legSize, 0.72, legSize]} position={[-w / 2 + legSize / 2 + 0.02, 0.36, d / 2 - legSize / 2 - 0.02]} color={oakColor} />
      <Box size={[legSize, 0.72, legSize]} position={[w / 2 - legSize / 2 - 0.02, 0.36, d / 2 - legSize / 2 - 0.02]} color={oakColor} />
    </group>
  )
}

// Ghế ăn Japandi phối nệm vải kem-beige tựa lưng bo nhẹ và khung chân gỗ sồi
function DiningChair({ position, rotation }) {
  const oakColor = "#d6ae7b"
  const fabricColor = "#f5f2eb"
  return (
    <group position={position} rotation={rotation}>
      {/* Đệm ngồi vải màu kem dầy dặn */}
      <Box size={[0.42, 0.05, 0.42]} position={[0, 0.45, 0]} color={fabricColor} />
      {/* Khung gỗ nâng đỡ dưới đệm */}
      <Box size={[0.40, 0.04, 0.40]} position={[0, 0.415, 0]} color={oakColor} />

      {/* 4 Chân ghế gỗ sồi (2 chân sau hơi lùi góc) */}
      <Box size={[0.03, 0.41, 0.03]} position={[0.17, 0.205, -0.17]} color={oakColor} />
      <Box size={[0.03, 0.41, 0.03]} position={[0.17, 0.205, 0.17]} color={oakColor} />
      <Box size={[0.03, 0.41, 0.03]} position={[-0.17, 0.205, -0.17]} color={oakColor} />
      <Box size={[0.03, 0.41, 0.03]} position={[-0.17, 0.205, 0.17]} color={oakColor} />

      {/* Thanh tựa lưng gỗ sồi đứng hai bên */}
      <Box size={[0.03, 0.38, 0.03]} position={[-0.17, 0.62, -0.17]} color={oakColor} />
      <Box size={[0.03, 0.38, 0.03]} position={[-0.17, 0.62, 0.17]} color={oakColor} />

      {/* Thanh giằng gỗ sồi ngang phía sau tựa lưng */}
      <Box size={[0.02, 0.06, 0.34]} position={[-0.17, 0.51, 0]} color={oakColor} />

      {/* Đệm tựa lưng bọc vải kem êm ái */}
      <Box size={[0.04, 0.24, 0.35]} position={[-0.16, 0.70, 0]} color={fabricColor} />
    </group>
  )
}

export default function KitchenModule({ row }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const wallT = 0.08
  const wallH = 3.05
  const roomStartX = centerX - depth / 2
  const roomEndX = centerX + depth / 2
  const counterDepth = 0.52
  const longRunLength = 3.0
  const shortRunLength = 1.8
  const longRunCenterX = roomStartX + 2.95
  const wallFaceZ = -width / 2 + wallT + counterDepth / 2
  const longRunZ = wallFaceZ
  const shortRunCenterX = roomStartX + depth - wallT - counterDepth / 2
  const shortRunCenterZ = -width / 2 + wallT + shortRunLength / 2
  const longRunEndX = longRunCenterX + longRunLength / 2
  const shortRunInnerX = shortRunCenterX - counterDepth / 2
  const cornerLength = shortRunInnerX - longRunEndX
  const cornerCenterX = longRunEndX + cornerLength / 2
  const cornerCenterZ = wallFaceZ
  const fridgeX = roomStartX + 0.55
  const filterX = roomStartX + 1.15
  const diningTableX = centerX + 0.25
  const diningTableDepth = 0.72
  const diningTableZ = width / 2 - diningTableDepth / 2 - 0.1
  const counterTopY = 0.9
  const counterTopThickness = 0.06
  const sinkX = shortRunCenterX
  const sinkZ = -width / 2 + wallT + shortRunLength - 0.58

  // === Khung cửa vòm hành lang (cuối tường bếp, không lắp cánh cửa) ===
  // Hành lang rộng 0.8m, nằm sát tường phải (Z = width/2 - 0.8 đến Z = width/2)
  const corridorW = 0.8
  const archOpeningW = corridorW      // rộng vừa đúng hành lang
  const archH = 2.18                  // chiều cao thông thủy cửa
  const archR = 0.18                  // bán kính bo tròn 2 góc trên
  const archZLeft = width / 2 - corridorW   // mép trái cửa (nhìn theo Z)
  const archZRight = width / 2              // mép phải cửa

  // Shape phần tường bịt trên (trên vòm) - toàn tường cuối, trừ vòm mở
  // Dùng 2 khối tường thẳng: phần bên trái hành lang + phần ngay trên vòm
  // + shape fillet (khối bịt góc trên trái + phải của cửa vòm)

  const leftFilletShape = useMemo(() => {
    const shape = new THREE.Shape()
    const yLimit = archH - archR
    shape.moveTo(archZLeft, yLimit)
    shape.lineTo(archZLeft, archH)
    shape.lineTo(archZLeft + archR, archH)
    shape.absarc(archZLeft + archR, yLimit, archR, Math.PI / 2, Math.PI, false)
    return shape
  }, [archZLeft])

  const rightFilletShape = useMemo(() => {
    const shape = new THREE.Shape()
    const yLimit = archH - archR
    shape.moveTo(archZRight, yLimit)
    shape.lineTo(archZRight, archH)
    shape.lineTo(archZRight - archR, archH)
    shape.absarc(archZRight - archR, yLimit, archR, Math.PI / 2, 0, true)
    return shape
  }, [archZRight])

  const wallColor = '#fbfaf6'

  return (
    <group>
      <Floor size={[depth, 0.06, width]} position={[centerX, 0.03, 0]} color="#f2e7d7" />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, -width / 2]} />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} />

      <Cabinet position={[longRunCenterX, 0, longRunZ]} size={[longRunLength, 0.88, counterDepth]} color="#d3ab7c" />
      <Cabinet position={[shortRunCenterX, 0, shortRunCenterZ]} size={[counterDepth, 0.88, shortRunLength]} color="#d3ab7c" />
      <Cabinet position={[cornerCenterX, 0, cornerCenterZ]} size={[cornerLength, 0.88, counterDepth]} color="#d3ab7c" />
      <Box size={[longRunLength, counterTopThickness, counterDepth]} position={[longRunCenterX, counterTopY, longRunZ]} color="#dcb58a" />
      <Box size={[counterDepth, counterTopThickness, shortRunLength]} position={[shortRunCenterX, counterTopY, shortRunCenterZ]} color="#dcb58a" />
      <Box size={[cornerLength, counterTopThickness, counterDepth]} position={[cornerCenterX, counterTopY, cornerCenterZ]} color="#dcb58a" />
      {/* Bồn rửa bát lớn 75cm (dọc Z), cao/sâu 25cm, hố màu trắng */}
      <Box size={[0.42, 0.02, 0.82]} position={[sinkX, 0.94, sinkZ]} color="#e5e5e5" />
      <Box size={[0.30, 0.25, 0.75]} position={[sinkX, 0.815, sinkZ]} color="#ffffff" />
      <Cabinet position={[roomStartX + 2.2, 1.50, -width / 2 + 0.12]} size={[0.9, 0.10, 0.24]} color="#2a2928" />
      <Cabinet position={[fridgeX, 0, -width / 2 + 0.26]} size={[0.48, 1.85, 0.5]} color="#d5d0c8" />
      <Cabinet position={[filterX, 0, -width / 2 + 0.24]} size={[0.3, 0.98, 0.44]} color="#f2f3f4" />

      {/* Kệ mở trang trí chạy dọc tường bếp sau - Tầng 1 (Y = 1.6m) */}
      <Box size={[3.0, 0.04, 0.24]} position={[roomStartX + depth - 1.5, 1.60, -width / 2 + 0.04 + 0.12]} color="#dcb58a" />
      {/* Kệ mở trang trí chạy dọc tường bếp sau - Tầng 2 (Y = 2.10m) */}
      <Box size={[3.0, 0.04, 0.24]} position={[roomStartX + depth - 1.5, 2.10, -width / 2 + 0.04 + 0.12]} color="#dcb58a" />

      {/* Bộ bàn ăn gỗ sồi mặt đá trắng tinh tế */}
      <DiningTable position={[diningTableX, 0.04, width / 2 - 0.755]} size={[0.72, 0.08, 1.35]} />

      {/* Ghế ăn Japandi phối nệm vải kem-beige hai bên hông bàn */}
      <DiningChair position={[diningTableX - 0.48, 0.04, width / 2 - 0.755 - 0.35]} rotation={[0, 0, 0]} />
      <DiningChair position={[diningTableX - 0.48, 0.04, width / 2 - 0.755 + 0.15]} rotation={[0, 0, 0]} />
      <DiningChair position={[diningTableX + 0.48, 0.04, width / 2 - 0.755 - 0.35]} rotation={[0, Math.PI, 0]} />
      <DiningChair position={[diningTableX + 0.48, 0.04, width / 2 - 0.755 + 0.15]} rotation={[0, Math.PI, 0]} />

      {/* ===== Cửa vòm hành lang tại mặt tường cuối bếp (không lắp cánh) ===== */}
      {/* NOTE: Tường phần main room (trái cửa) đã được BedroomModule tạo sẵn → KHÔNG tạo lại để tránh z-fighting */}
      {/* Phần tường phía trên vòm (từ archH → wallH, rộng toàn bộ cửa hành lang) */}
      <Box
        size={[wallT, wallH - archH, archOpeningW]}
        position={[roomEndX, archH + (wallH - archH) / 2, width / 2 - corridorW / 2]}
        color={wallColor}
      />
      {/* Góc bo trên bên TRÁI vòm — rotation [0, -π/2, 0] để world Z = shape X (không đảo dấu) */}
      <mesh
        position={[roomEndX, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <extrudeGeometry args={[leftFilletShape, { depth: wallT, bevelEnabled: false, curveSegments: 32 }]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
      {/* Góc bo trên bên PHẢI vòm */}
      <mesh
        position={[roomEndX, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <extrudeGeometry args={[rightFilletShape, { depth: wallT, bevelEnabled: false, curveSegments: 32 }]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>
    </group>
  )
}
