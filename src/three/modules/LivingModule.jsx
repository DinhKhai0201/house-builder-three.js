import { Box, Cabinet, Floor, Sofa, Table, Wall } from '../primitives'
import { avgWidth, roomCenterX } from '../roomUtils'

export default function LivingModule({ row }) {
  const width = avgWidth(row)
  const depth = row.length
  const centerX = roomCenterX(row)
  const wallT = 0.08
  const wallH = 3.15
  const frontFaceX = centerX - depth / 2
  const frontCanopyDepth = 0.8
  const frontCanopyCenterX = frontFaceX - frontCanopyDepth / 2 + 0.02

  return (
    <group>
      <Floor size={[depth, 0.06, width]} position={[centerX, 0.03, 0]} color="#f1e5d3" />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, -width / 2]} />
      <Wall size={[depth, wallH, wallT]} position={[centerX, wallH / 2, width / 2]} />
      <Wall size={[wallT, wallH, 0.34]} position={[frontFaceX, wallH / 2, -width / 2 + 0.17]} />
      <Wall size={[wallT, wallH, 0.34]} position={[frontFaceX, wallH / 2, width / 2 - 0.17]} />
      <Wall size={[wallT, 0.82, width - 0.52]} position={[frontFaceX, 2.74, 0]} />
      <Box size={[0.18, 0.22, width - 0.24]} position={[frontFaceX + 0.02, 3.04, 0]} color="#f6f1e8" />
      <Box size={[frontCanopyDepth + 0.14, 0.18, width]} position={[frontCanopyCenterX, 3.18, 0]} color="#f5f0e7" />

      {/* Xoay sofa 180 độ để tựa lưng vào tường dưới, hướng mặt ra phòng */}
      <group position={[centerX - 0.82, 0.03, width / 2 - 0.56]} rotation={[0, Math.PI, 0]}>
        <Sofa position={[0, 0, 0]} />
      </group>
      
      {/* Bàn trà Nhật thấp màu trắng nhỏ gọn (chiều cao ~0.3m, bề ngang hẹp 0.4m để rộng lối đi) */}
      <group>
        {/* Mặt bàn */}
        <Box size={[0.6, 0.04, 0.4]} position={[centerX - 0.82, 0.03 + 0.28 + 0.02, width / 2 - 1.35]} color="#ffffff" />
        {/* 4 chân bàn */}
        <Box size={[0.05, 0.28, 0.05]} position={[centerX - 0.82 - 0.25, 0.03 + 0.14, width / 2 - 1.35 - 0.15]} color="#e5e5e5" />
        <Box size={[0.05, 0.28, 0.05]} position={[centerX - 0.82 + 0.25, 0.03 + 0.14, width / 2 - 1.35 - 0.15]} color="#e5e5e5" />
        <Box size={[0.05, 0.28, 0.05]} position={[centerX - 0.82 - 0.25, 0.03 + 0.14, width / 2 - 1.35 + 0.15]} color="#e5e5e5" />
        <Box size={[0.05, 0.28, 0.05]} position={[centerX - 0.82 + 0.25, 0.03 + 0.14, width / 2 - 1.35 + 0.15]} color="#e5e5e5" />
      </group>
      <Cabinet position={[centerX - 0.6, 0, -width / 2 + 0.25]} size={[1.2, 0.32, 0.3]} color="#c09467" />
      {/* Bức tường chia phòng khách và bếp sơn trắng, dịch lùi về sau sát tủ lạnh */}
      <Wall size={[0.08, wallH, 1.1]} position={[centerX + 2.46, wallH / 2, -width / 2 + 0.55]} color="#fbfaf6" />

      {/* Tủ thờ Japandi đứng bằng gỗ cao cấp đặt lưng vào tường */}
      <group position={[centerX + 2.18, 0.03, -width / 2 + 0.55]}>
        {/* Vách ốp lưng gỗ sát tường */}
        <Box size={[0.02, 2.6, 0.8]} position={[0.26, 1.3, 0]} color="#7a5535" />
        
        {/* Tủ thờ gỗ bên dưới */}
        <Box size={[0.45, 0.82, 0.76]} position={[0.02, 0.41, 0]} color="#7a5535" />
        
        {/* Mặt bàn thờ trên */}
        <Box size={[0.48, 0.08, 0.8]} position={[0.02, 0.86, 0]} color="#634225" />
        
        {/* Vách ngăn trang trí hai bên hông có họa tiết thoáng */}
        <Box size={[0.5, 2.6, 0.02]} position={[0.02, 1.3, -0.39]} color="#7a5535" />
        <Box size={[0.5, 2.6, 0.02]} position={[0.02, 1.3, 0.39]} color="#7a5535" />
        
        {/* Mái trần tủ thờ phía trên */}
        <Box size={[0.5, 0.08, 0.8]} position={[0.02, 2.56, 0]} color="#634225" />
      </group>
    </group>
  )
}
