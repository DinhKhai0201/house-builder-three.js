import { corridorWidth, planRows, scaleMetersToPixels, totalModeledLength } from './data/housePlan'

const SCALE = scaleMetersToPixels * 2.8
const OUTER_STROKE = '#16120f'
const WALL = '#fffaf2'
const ROOM_FILL = {
  yard: '#d8ccba',
  public: '#f6efe4',
  service: '#efe1cb',
  bedroom: '#e8d8bf',
  bath: '#d8d5cf',
  master: '#e6d5bc',
}

function roomShape(row, mode = 'full') {
  const x1 = row.start * SCALE
  const x2 = row.end * SCALE
  const top = 0
  const bottom1 = row.startWidth * SCALE
  const bottom2 = row.endWidth * SCALE
  const roomBottom1 = row.corridor && mode === 'main' ? (row.startWidth - corridorWidth) * SCALE : bottom1
  const roomBottom2 = row.corridor && mode === 'main' ? (row.endWidth - corridorWidth) * SCALE : bottom2
  const corridorTop1 = (row.startWidth - corridorWidth) * SCALE
  const corridorTop2 = (row.endWidth - corridorWidth) * SCALE

  if (mode === 'corridor') {
    return `M ${x1} ${corridorTop1} L ${x2} ${corridorTop2} L ${x2} ${bottom2} L ${x1} ${bottom1} Z`
  }

  return `M ${x1} ${top} L ${x2} ${top} L ${x2} ${roomBottom2} L ${x1} ${roomBottom1} Z`
}

function fullHeight(row) {
  return ((row.startWidth + row.endWidth) / 2) * SCALE
}

function usableHeight(row) {
  return row.corridor ? ((row.startWidth + row.endWidth) / 2 - corridorWidth) * SCALE : fullHeight(row)
}

function midX(row) {
  return (row.start + row.length / 2) * SCALE
}

function getRow(key) {
  return planRows.find((row) => row.key === key)
}

function DoorSwing({ x, y, radius, direction = 1, flip = 0 }) {
  const endX = x + direction * radius
  const sweep = flip ? 0 : 1
  return (
    <g className="door-swing">
      <line x1={x} y1={y} x2={endX} y2={y} />
      <path d={`M ${x} ${y} A ${radius} ${radius} 0 0 ${sweep} ${x} ${y + radius}`} />
    </g>
  )
}

function SideDoorSwing({ x, y, radius, upward = true }) {
  const endY = y + (upward ? -radius : radius)
  const sweep = upward ? 0 : 1
  return (
    <g className="door-swing">
      <line x1={x} y1={y} x2={x} y2={endY} />
      <path d={`M ${x} ${y} A ${radius} ${radius} 0 0 ${sweep} ${x + radius} ${y}`} />
    </g>
  )
}

function DoorOpening({ x, y, width = 26, vertical = false }) {
  return vertical ? (
    <g className="door-opening">
      <line x1={x} y1={y} x2={x} y2={y + width} />
      <line x1={x + 4} y1={y} x2={x + 4} y2={y + width} />
    </g>
  ) : (
    <g className="door-opening">
      <line x1={x} y1={y} x2={x + width} y2={y} />
      <line x1={x} y1={y - 4} x2={x + width} y2={y - 4} />
    </g>
  )
}

function WindowMark({ x, y, width, horizontal = true }) {
  return horizontal ? (
    <g className="window-mark">
      <line x1={x} y1={y} x2={x + width} y2={y} />
      <line x1={x} y1={y - 4} x2={x + width} y2={y - 4} />
    </g>
  ) : (
    <g className="window-mark">
      <line x1={x} y1={y} x2={x} y2={y + width} />
      <line x1={x + 4} y1={y} x2={x + 4} y2={y + width} />
    </g>
  )
}

function Furniture() {
  const living = getRow('living')
  const kitchen = getRow('kitchen')
  const bed1 = getRow('bed-1')
  const bed2 = getRow('bed-2')
  const wc = getRow('wc')
  const master = getRow('master')

  const livingHeight = usableHeight(living)
  const kitchenHeight = usableHeight(kitchen)
  const bed1Height = usableHeight(bed1)
  const bed2Height = usableHeight(bed2)
  const wcHeight = usableHeight(wc)
  const masterHeight = usableHeight(master)

  return (
    <g>
      <rect
        x={(living.start + 0.75) * SCALE}
        y={livingHeight - 58}
        width={120}
        height={42}
        rx={10}
        className="furniture sofa"
      />
      <rect x={(living.start + 1.15) * SCALE} y={18} width={94} height={14} rx={6} className="furniture console" />
      <rect x={(living.end - 0.92) * SCALE} y={16} width={52} height={86} rx={4} className="altar-niche" />
      <rect x={(living.end - 0.96) * SCALE} y={16} width={4} height={86} className="altar-wall" />
      <rect x={(living.end - 0.83) * SCALE} y={36} width={34} height={10} rx={2} className="altar-shelf" />
      <text x={(living.end - 0.32) * SCALE} y={64} textAnchor="middle" className="tiny-label">
        Bàn thờ
      </text>

      <path
        d={`M ${(kitchen.start + 0.15) * SCALE} 18 H ${(kitchen.end - 0.78) * SCALE} V 38 H ${(kitchen.end - 0.28) * SCALE} V 94 H ${(kitchen.end - 0.86) * SCALE} V 84 H ${(kitchen.start + 1.75) * SCALE} V 84 H ${(kitchen.start + 0.15) * SCALE} Z`}
        className="countertop"
      />
      <rect x={(kitchen.start + 0.02) * SCALE} y={20} width={18} height={80} rx={3} className="fridge-block" />
      <rect x={(kitchen.start + 0.66) * SCALE} y={28} width={12} height={54} rx={3} className="water-filter" />
      <circle cx={(kitchen.start + 2.75) * SCALE} cy={28} r="10" className="sink-bowl" />
      <rect
        x={midX(kitchen) - 62}
        y={kitchenHeight / 2 - 28}
        width={124}
        height={56}
        rx={6}
        className="furniture table"
      />
      <rect x={midX(kitchen) - 48} y={kitchenHeight / 2 - 42} width={18} height={10} rx={4} className="chair" />
      <rect x={midX(kitchen) + 30} y={kitchenHeight / 2 - 42} width={18} height={10} rx={4} className="chair" />
      <rect x={midX(kitchen) - 48} y={kitchenHeight / 2 + 32} width={18} height={10} rx={4} className="chair" />
      <rect x={midX(kitchen) + 30} y={kitchenHeight / 2 + 32} width={18} height={10} rx={4} className="chair" />

      <rect x={midX(bed1) - 46} y={18} width={92} height={74} rx={8} className="furniture bed" />
      <rect x={(bed1.end - 0.42) * SCALE} y={14} width={18} height={84} rx={3} className="wardrobe" />

      <rect x={midX(bed2) - 46} y={18} width={92} height={74} rx={8} className="furniture bed" />
      <rect x={(bed2.end - 0.42) * SCALE} y={14} width={18} height={84} rx={3} className="wardrobe" />

      <circle cx={(wc.start + 0.28) * SCALE} cy={wcHeight - 24} r="12" className="bath-fixture" />
      <text x={(wc.start + 0.28) * SCALE} y={wcHeight - 44} textAnchor="middle" className="fixture-label">
        Lavabo
      </text>
      <circle cx={(wc.start + 0.92) * SCALE} cy={wcHeight / 2 + 4} r="12" className="bath-fixture" />
      <text x={(wc.start + 0.92) * SCALE} y={wcHeight / 2 - 18} textAnchor="middle" className="fixture-label">
        Bồn cầu
      </text>
      <rect x={(wc.end - 0.48) * SCALE} y={12} width={4} height={wcHeight - 24} className="glass-partition" />
      <circle cx={(wc.end - 0.18) * SCALE} cy={wcHeight / 2} r="14" className="shower-head" />
      <text x={(wc.end - 0.22) * SCALE} y={wcHeight / 2 - 22} textAnchor="middle" className="fixture-label">
        Tắm
      </text>

      <rect x={(master.start + 1.3) * SCALE} y={22} width={108} height={134} rx={10} className="furniture master-bed" />
      <rect x={(master.start + 0.18) * SCALE} y={14} width={122} height={22} rx={4} className="wardrobe" />
      <rect x={(master.start + 1.62) * SCALE} y={masterHeight - 30} width={54} height={16} rx={4} className="dressing" />
    </g>
  )
}

export default function DetailedFloorPlan() {
  const front = getRow('front-yard')
  const living = getRow('living')
  const kitchen = getRow('kitchen')
  const bed1 = getRow('bed-1')
  const bed2 = getRow('bed-2')
  const wc = getRow('wc')
  const master = getRow('master')
  const back = getRow('back-yard')

  const totalWidth = Math.max(...planRows.map((row) => row.endWidth)) * SCALE
  const viewW = totalModeledLength * SCALE + 160
  const viewH = totalWidth + 200

  return (
    <div className="detailed-plan-card">
      <svg className="detailed-plan-svg" viewBox={`-70 -40 ${viewW} ${viewH}`} role="img" aria-label="Ban ve 2D nha cap 4 no hau">
        <rect x="-70" y="-40" width={viewW} height={viewH} rx="34" className="paper-bg" />

        <g transform="translate(32 44)">
          <path d={roomShape(front, 'full')} fill={ROOM_FILL.yard} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(living, 'full')} fill={ROOM_FILL.public} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(kitchen, 'full')} fill={ROOM_FILL.service} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(bed1, 'full')} fill={ROOM_FILL.bedroom} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(bed2, 'main')} fill={ROOM_FILL.bedroom} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(bed2, 'corridor')} fill={WALL} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(wc, 'main')} fill={ROOM_FILL.bath} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(wc, 'corridor')} fill={WALL} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(master, 'full')} fill={ROOM_FILL.master} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(back, 'full')} fill={ROOM_FILL.yard} stroke={OUTER_STROKE} strokeWidth="5" />

          <Furniture />

          <text x={midX(living)} y={usableHeight(living) / 2 - 12} textAnchor="middle" className="room-name">
            PHÒNG KHÁCH + BÀN THỜ
          </text>
          <text x={midX(kitchen) - 14} y={usableHeight(kitchen) / 2 - 54} textAnchor="middle" className="room-name">
            BẾP + ĂN
          </text>
          <text x={midX(bed1)} y={fullHeight(bed1) / 2} textAnchor="middle" className="room-name small">
            PHÒNG ĐA NĂNG
          </text>
          <text x={midX(bed2)} y={usableHeight(bed2) / 2 + 6} textAnchor="middle" className="room-name small">
            PHÒNG NGỦ 2
          </text>
          <text x={midX(wc)} y={usableHeight(wc) / 2 + 4} textAnchor="middle" className="room-name small">
            WC + TẮM
          </text>
          <text x={midX(master)} y={usableHeight(master) / 2 + 10} textAnchor="middle" className="room-name">
            PHÒNG NGỦ MASTER
          </text>
          <text x={midX(front)} y={fullHeight(front) / 2} textAnchor="middle" className="room-name small">
            SÂN TRƯỚC
          </text>
          <text x={midX(back)} y={fullHeight(back) / 2} textAnchor="middle" className="room-name small">
            SÂN SAU
          </text>

          <text x={midX(bed2) + 68} y={fullHeight(bed2) - 20} textAnchor="middle" className="corridor-note">
            HÀNH LANG 0.8m
          </text>

          <DoorSwing x={front.end * SCALE - 10} y={fullHeight(front) - 6} radius={58} direction={-1} flip={1} />
          <DoorSwing x={bed2.start * SCALE + 20} y={fullHeight(bed2) - 6} radius={32} />
          <DoorSwing x={wc.start * SCALE + 20} y={fullHeight(wc) - 6} radius={30} />

          <WindowMark x={master.end * SCALE - 4} y={24} width={92} horizontal={false} />

          <text x={(master.end + 0.15) * SCALE} y={78} className="side-callout">
            Cửa ra sân sau
          </text>
          <text x={(master.end - 0.6) * SCALE} y={26} textAnchor="middle" className="fixture-label">
            Cửa sổ master
          </text>
          <text x={(living.end - 0.32) * SCALE} y={118} textAnchor="middle" className="side-callout center">
            Lam gỗ + bàn thờ treo
          </text>
          <text x={(living.start + 0.95) * SCALE} y={fullHeight(front) + 24} className="side-callout">
            Cửa chính 4 cánh mở rộng
          </text>

          <line x1="0" y1={totalWidth + 24} x2={totalModeledLength * SCALE} y2={totalWidth + 24} className="dimension-line" />
          <text x="0" y={totalWidth + 54} className="dimension-label">
            Chuỗi công năng mô phỏng: 26.7m
          </text>
        </g>
      </svg>
    </div>
  )
}
