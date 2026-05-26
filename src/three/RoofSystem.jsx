import { Box, Cylinder, GlassPanel } from './primitives'
import { avgWidth, corridorCenterZ, getRow } from './roomUtils'

export default function RoofSystem() {
  const living = getRow('living')
  const kitchen = getRow('kitchen')
  const bed1 = getRow('bed-1')
  const bed2 = getRow('bed-2')
  const wc = getRow('wc')
  const master = getRow('master')

  const overlapToSlab = 0.45
  const roofStart = living.start
  const roofEnd = bed2.end + overlapToSlab
  const puRoofLength = roofEnd - roofStart
  const puRoofCenter = roofStart + puRoofLength / 2
  const puRoofWidth = Math.max(avgWidth(living), avgWidth(kitchen), avgWidth(bed1), avgWidth(bed2)) + 0.06
  const halfRoofLength = puRoofLength / 2
  const roofPanelLength = halfRoofLength + 0.06
  const roofTopY = 3.75
  const roofEdgeDrop = 0.08
  const roofSlope = 0.05

  const slabStart = wc.start
  const slabRearOverhang = 0.6
  const slabEnd = master.end + slabRearOverhang
  const slabLength = slabEnd - slabStart
  const slabCenter = slabStart + slabLength / 2
  const slabWidth = Math.max(avgWidth(wc), avgWidth(master), avgWidth(bed2)) + 0.04
  const skylightLength = 1.15
  const skylightWidth = 0.72
  const skylightCenterX = wc.start + wc.length / 2
  const skylightCenterZ = corridorCenterZ(wc)
  const skylightCurbHeight = 0.25
  const skylightCurbThickness = 0.08
  const frontSlabLength = skylightCenterX - skylightLength / 2 - slabStart
  const rearSlabLength = slabEnd - (skylightCenterX + skylightLength / 2)
  const leftSlabWidth = skylightCenterZ - skylightWidth / 2 - (-slabWidth / 2)
  const rightSlabWidth = slabWidth / 2 - (skylightCenterZ + skylightWidth / 2)
  const tankX = skylightCenterX + 0.15
  const tankZ = -slabWidth / 2 + 0.85
  const curbY = 3.40
  const glassY = curbY + skylightCurbHeight / 2 + 0.03

  return (
    <group>
      <Box
        size={[roofPanelLength, 0.08, puRoofWidth]}
        position={[roofStart + roofPanelLength / 2, roofTopY - roofEdgeDrop / 2, 0]}
        rotation={[0, 0, 0.05]}
        color="#2f6e6c"
      />
      <Box
        size={[roofPanelLength, 0.08, puRoofWidth]}
        position={[roofEnd - roofPanelLength / 2, roofTopY - roofEdgeDrop / 2, 0]}
        rotation={[0, 0, -roofSlope]}
        color="#2f6e6c"
      />
      <Box size={[0.08, 0.1, puRoofWidth]} position={[puRoofCenter, roofTopY + 0.01, 0]} color="#214b49" />

      {frontSlabLength > 0 ? <Box size={[frontSlabLength, 0.2, slabWidth]} position={[slabStart + frontSlabLength / 2, 3.15, 0]} color="#f2f2f0" /> : null}
      {rearSlabLength > 0 ? <Box size={[rearSlabLength, 0.2, slabWidth]} position={[skylightCenterX + skylightLength / 2 + rearSlabLength / 2, 3.15, 0]} color="#f2f2f0" /> : null}
      {leftSlabWidth > 0 ? <Box size={[skylightLength, 0.2, leftSlabWidth]} position={[skylightCenterX, 3.15, -slabWidth / 2 + leftSlabWidth / 2]} color="#f2f2f0" /> : null}
      {rightSlabWidth > 0 ? <Box size={[skylightLength, 0.2, rightSlabWidth]} position={[skylightCenterX, 3.15, skylightCenterZ + skylightWidth / 2 + rightSlabWidth / 2]} color="#f2f2f0" /> : null}

      {frontSlabLength > 0 ? <Box size={[frontSlabLength, 0.05, slabWidth + 0.02]} position={[slabStart + frontSlabLength / 2, 3.27, 0]} color="#ffffff" /> : null}
      {rearSlabLength > 0 ? <Box size={[rearSlabLength, 0.05, slabWidth + 0.02]} position={[skylightCenterX + skylightLength / 2 + rearSlabLength / 2, 3.27, 0]} color="#ffffff" /> : null}
      {leftSlabWidth > 0 ? <Box size={[skylightLength, 0.05, leftSlabWidth + 0.02]} position={[skylightCenterX, 3.27, -slabWidth / 2 + leftSlabWidth / 2]} color="#ffffff" /> : null}
      {rightSlabWidth > 0 ? <Box size={[skylightLength, 0.05, rightSlabWidth + 0.02]} position={[skylightCenterX, 3.27, skylightCenterZ + skylightWidth / 2 + rightSlabWidth / 2]} color="#ffffff" /> : null}

      <Box size={[skylightLength + skylightCurbThickness * 2, skylightCurbHeight, skylightCurbThickness]} position={[skylightCenterX, curbY, skylightCenterZ - skylightWidth / 2 - skylightCurbThickness / 2]} color="#e4ddd1" />
      <Box size={[skylightLength + skylightCurbThickness * 2, skylightCurbHeight, skylightCurbThickness]} position={[skylightCenterX, curbY, skylightCenterZ + skylightWidth / 2 + skylightCurbThickness / 2]} color="#e4ddd1" />
      <Box size={[skylightCurbThickness, skylightCurbHeight, skylightWidth]} position={[skylightCenterX - skylightLength / 2 - skylightCurbThickness / 2, curbY, skylightCenterZ]} color="#e4ddd1" />
      <Box size={[skylightCurbThickness, skylightCurbHeight, skylightWidth]} position={[skylightCenterX + skylightLength / 2 + skylightCurbThickness / 2, curbY, skylightCenterZ]} color="#e4ddd1" />
      <GlassPanel size={[skylightLength, 0.04, skylightWidth]} position={[skylightCenterX, glassY, skylightCenterZ]} color="#d7edf3" />
      <Box size={[skylightLength + 0.06, 0.03, 0.06]} position={[skylightCenterX, glassY + 0.005, skylightCenterZ - skylightWidth / 2]} color="#c9d4d7" />
      <Box size={[skylightLength + 0.06, 0.03, 0.06]} position={[skylightCenterX, glassY + 0.005, skylightCenterZ + skylightWidth / 2]} color="#c9d4d7" />
      <Box size={[0.06, 0.03, skylightWidth]} position={[skylightCenterX - skylightLength / 2, glassY + 0.005, skylightCenterZ]} color="#c9d4d7" />
      <Box size={[0.06, 0.03, skylightWidth]} position={[skylightCenterX + skylightLength / 2, glassY + 0.005, skylightCenterZ]} color="#c9d4d7" />

      {/* Bồn nước inox ngang loại to (1000L - 1500L, dài 1.35m, đường kính 0.96m) quay ngang đặt trực tiếp lên sàn bê tông */}
      <Cylinder position={[tankX, 3.27 + 0.025 + 0.04 + 0.48, tankZ]} radiusTop={0.48} radiusBottom={0.48} height={1.35} rotation={[Math.PI / 2, 0, 0]} color="#b5b5b2" />
      
      {/* Khung nôi đỡ bồn nằm trực tiếp trên mái bê tông (xóa 4 chân đứng) */}
      <Box size={[0.04, 0.04, 1.1]} position={[tankX - 0.3, 3.27 + 0.025 + 0.02, tankZ]} color="#8f8f8c" />
      <Box size={[0.04, 0.04, 1.1]} position={[tankX + 0.3, 3.27 + 0.025 + 0.02, tankZ]} color="#8f8f8c" />
      <Box size={[0.66, 0.04, 0.04]} position={[tankX, 3.27 + 0.025 + 0.02, tankZ - 0.4]} color="#8f8f8c" />
      <Box size={[0.66, 0.04, 0.04]} position={[tankX, 3.27 + 0.025 + 0.02, tankZ + 0.4]} color="#8f8f8c" />

      {/* Tấm thái dương năng đặt nghiêng trên mái bê tông bên cạnh bồn nước */}
      <Box size={[1.1, 0.08, 0.85]} position={[tankX + 1.0, 3.27 + 0.025 + 0.16, tankZ]} rotation={[0, 0, -0.22]} color="#647880" />
      {/* Khung đỡ thái dương năng */}
      <Box size={[0.04, 0.32, 0.85]} position={[tankX + 1.5, 3.27 + 0.025 + 0.16, tankZ]} color="#8f8f8c" />

      {/* Bợ gạch viền xung quanh mái bê tông cao 15cm sơn màu xanh #2f6e6c */}
      <Box size={[slabLength, 0.15, 0.06]} position={[slabCenter, 3.295 + 0.075, -slabWidth / 2 + 0.03]} color="#2f6e6c" />
      <Box size={[slabLength, 0.15, 0.06]} position={[slabCenter, 3.295 + 0.075, slabWidth / 2 - 0.03]} color="#2f6e6c" />
      <Box size={[0.06, 0.15, slabWidth]} position={[slabEnd - 0.03, 3.295 + 0.075, 0]} color="#2f6e6c" />

      {/* Hệ thống thoát nước mưa cho mái bê tông (chạy ra sau nhà ở khu vực sân sau) */}
      {/* Phễu thu nước mưa trên mái */}
      <Box size={[0.16, 0.02, 0.16]} position={[slabEnd - 0.52, 3.295 + 0.01, slabWidth / 2 - 0.15]} color="#7a7a7a" />
      {/* Ống nước đứng dẫn thẳng xuống sân sau (ôm sát mảng tường Master ngoài sân sau) */}
      <Cylinder position={[slabEnd - 0.52, 3.295 / 2, slabWidth / 2 - 0.15]} radiusTop={0.035} radiusBottom={0.035} height={3.295} rotation={[0, 0, 0]} color="#8d8d8a" />
      {/* Đai ôm cơ khí định vị ống vào tường sau */}
      <Box size={[0.04, 0.02, 0.06]} position={[slabEnd - 0.55, 1.0, slabWidth / 2 - 0.15]} color="#6b6b68" />
      <Box size={[0.04, 0.02, 0.06]} position={[slabEnd - 0.55, 2.5, slabWidth / 2 - 0.15]} color="#6b6b68" />



      {/* Tường tam giác bịt đầu hồi 2 bên hông dưới mái tôn (từ phòng khách đến phòng ngủ 2) */}
      {[
        { start: 0.8, end: 5.8, width: avgWidth(living), slope: 0.05 },
        { start: 5.8, end: 9.075, width: avgWidth(kitchen), slope: 0.05 },
        { start: 9.075, end: 11.5, width: avgWidth(kitchen), slope: -0.05 },
        { start: 11.5, end: 14.2, width: avgWidth(bed1), slope: -0.05 },
        { start: 14.2, end: 17.35, width: avgWidth(bed2), slope: -0.05 },
      ].map((seg, idx) => {
        const L = seg.end - seg.start
        const cx = seg.start + L / 2
        const Y_roof = roofTopY - 0.05 * Math.abs(cx - 9.075)
        const H_box = 0.9
        const cy = Y_roof - H_box / 2 - 0.02
        return (
          <group key={idx}>
            {/* Tường bên trái (z = -width / 2) */}
            <Box
              size={[L + 0.02, H_box, 0.08]}
              position={[cx, cy, -seg.width / 2]}
              rotation={[0, 0, seg.slope]}
              color="#fbfaf6"
            />
            {/* Tường bên phải (z = width / 2) */}
            <Box
              size={[L + 0.02, H_box, 0.08]}
              position={[cx, cy, seg.width / 2]}
              rotation={[0, 0, seg.slope]}
              color="#fbfaf6"
            />
          </group>
        )
      })}
    </group>
  )
}
