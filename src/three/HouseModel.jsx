import { getRow } from './roomUtils'
import HouseLabels from './HouseLabels'
import RoofSystem from './RoofSystem'
import BathModule from './modules/BathModule'
import BedroomModule from './modules/BedroomModule'
import KitchenModule from './modules/KitchenModule'
import LivingModule from './modules/LivingModule'
import MasterModule from './modules/MasterModule'
import YardModule from './modules/YardModule'
import { Box } from './primitives'

export default function HouseModel({ showRoof = false, showLowerLevel = true }) {
  const frontYard = getRow('front-yard')
  const living = getRow('living')
  const kitchen = getRow('kitchen')
  const bed1 = getRow('bed-1')
  const bed2 = getRow('bed-2')
  const wc = getRow('wc')
  const master = getRow('master')
  const backYard = getRow('back-yard')

  return (
    <group position={[-13.35, 0, 0]}>
      {showLowerLevel ? (
        <group>
          {/* Phần mở rộng phía trước (đi từ đường/sân xe -> cầu thang -> sân trước và nhà) */}
          {/* 1. Sân xe (sân thấp ở cao độ mặt đường Y = -2.5, dài 3m ở vị trí X = -4.5 đến X = -1.5) */}
          <Box size={[3.0, 0.06, 2.5]} position={[-3.0, -2.47, 0]} color="#b5b0a6" />

          {/* 2. Cầu thang rộng full bề ngang (2.5m), đi từ sân xe lên trực tiếp sân trước/nhà (Y = -2.5 lên Y = 0, dài 1.5m từ X = -1.5 đến X = 0) */}
          {Array.from({ length: 13 }).map((_, i) => {
            const stepX = 0.0 - (i + 0.5) * 0.115
            const stepH = (13 - i) * 0.192
            return (
              <Box
                key={i}
                size={[0.115, stepH, 2.5]}
                position={[stepX, -2.5 + stepH / 2, 0]}
                color="#dbd6cb"
              />
            )
          })}

          {/* Đế móng cao 2.5m dưới nhà */}
          <Box size={[26.7, 2.5, 3.2]} position={[13.35, -1.25, 0]} color="#d0cec8" />
        </group>
      ) : null}

      <YardModule row={frontYard} />
      <LivingModule row={living} />
      <KitchenModule row={kitchen} />
      <BedroomModule row={bed1} empty hasDoor={false} />
      <BedroomModule row={bed2} titleSide="right" bedWidth={1.1} bedDepth={1.75} hasCorridorWindow={true} />
      <BathModule row={wc} />
      <MasterModule row={master} />
      <YardModule row={backYard} back />
      {showRoof ? <RoofSystem /> : null}
      <HouseLabels />
    </group>
  )
}
