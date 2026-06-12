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

function corridorStartY(row) {
  return ((row.startWidth + row.endWidth) / 2 - corridorWidth) * SCALE
}

function midX(row) {
  return (row.start + row.length / 2) * SCALE
}

function getRow(key) {
  return planRows.find((row) => row.key === key)
}

function DoorSwing({ x, y, radius, direction = 1, flip = 0, upward = false }) {
  const endX = x + direction * radius
  const sweep = flip ? 0 : 1
  const endY = upward ? y - radius : y + radius
  return (
    <g className="door-swing">
      <line x1={x} y1={y} x2={endX} y2={y} />
      <path d={`M ${x} ${y} A ${radius} ${radius} 0 0 ${sweep} ${x} ${endY}`} />
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
        d={`M ${(kitchen.start + 0.18) * SCALE} 18 H ${(kitchen.start + 3.55) * SCALE} V 40 H ${(kitchen.end - 0.28) * SCALE} V 98 H ${(kitchen.end - 0.80) * SCALE} V 82 H ${(kitchen.start + 1.78) * SCALE} V 82 H ${(kitchen.start + 0.18) * SCALE} Z`}
        className="countertop"
      />
      <rect x={(kitchen.start + 0.02) * SCALE} y={20} width={18} height={80} rx={3} className="fridge-block" />
      <rect x={(kitchen.start + 0.66) * SCALE} y={28} width={12} height={54} rx={3} className="water-filter" />
      <rect x={(kitchen.end - 0.76) * SCALE} y={32} width={18} height={52} rx={8} className="sink-bowl" />
      <rect
        x={(kitchen.start + 3.05) * SCALE}
        y={kitchenHeight - 84}
        width={124}
        height={56}
        rx={6}
        className="furniture table"
      />
      <rect x={(kitchen.start + 3.22) * SCALE} y={kitchenHeight - 98} width={18} height={10} rx={4} className="chair" />
      <rect x={(kitchen.start + 4.08) * SCALE} y={kitchenHeight - 98} width={18} height={10} rx={4} className="chair" />
      <rect x={(kitchen.start + 3.22) * SCALE} y={kitchenHeight - 20} width={18} height={10} rx={4} className="chair" />
      <rect x={(kitchen.start + 4.08) * SCALE} y={kitchenHeight - 20} width={18} height={10} rx={4} className="chair" />

      <rect x={(bed1.start + 0.44) * SCALE} y={18} width={94} height={bed1Height - 44} rx={10} className="furniture table" opacity="0.22" />
      <text x={midX(bed1)} y={bed1Height / 2 + 6} textAnchor="middle" className="fixture-label">
        Không xây vách
      </text>

      <rect x={midX(bed2) - 46} y={18} width={92} height={74} rx={8} className="furniture bed" />
      <rect x={(bed2.end - 0.42) * SCALE} y={14} width={18} height={84} rx={3} className="wardrobe" />

      <rect x={(wc.start + 0.05) * SCALE} y={usableHeight(wc) - 0.69 * SCALE} width={14} height={0.5 * SCALE} rx={2} className="furniture console" opacity="0.8" />
      <circle cx={(wc.start + 0.22) * SCALE} cy={usableHeight(wc) - 0.35 * SCALE} r="12" className="bath-fixture" />
      <text x={(wc.start + 0.35) * SCALE} y={usableHeight(wc) - 0.35 * SCALE + 4} className="fixture-label">
        Lavabo
      </text>
      <circle cx={(wc.start + 1.1) * SCALE} cy={wcHeight / 2 + 10} r="12" className="bath-fixture" />
      <text x={(wc.start + 1.1) * SCALE} y={wcHeight / 2 - 12} textAnchor="middle" className="fixture-label">
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
          <path d={roomShape(bed1, 'corridor')} fill={WALL} opacity="0.65" />
          <path d={roomShape(bed2, 'main')} fill={ROOM_FILL.bedroom} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(bed2, 'corridor')} fill={WALL} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={`M ${wc.start * SCALE} 0 L ${wc.end * SCALE} 0 L ${wc.end * SCALE} ${(wc.endWidth - corridorWidth) * SCALE} L ${(wc.start + 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * (1.0 / wc.length)) - corridorWidth) * SCALE} L ${(wc.start + 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * (1.0 / wc.length)) - corridorWidth - 0.72) * SCALE} L ${wc.start * SCALE} ${(wc.startWidth - corridorWidth - 0.72) * SCALE} Z`} fill={ROOM_FILL.bath} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={`M ${wc.start * SCALE} ${(wc.startWidth - corridorWidth - 0.72) * SCALE} L ${(wc.start + 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * (1.0 / wc.length)) - corridorWidth - 0.72) * SCALE} L ${(wc.start + 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * (1.0 / wc.length)) - corridorWidth) * SCALE} L ${wc.end * SCALE} ${(wc.endWidth - corridorWidth) * SCALE} L ${wc.end * SCALE} ${wc.endWidth * SCALE} L ${wc.start * SCALE} ${wc.startWidth * SCALE} Z`} fill={WALL} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(master, 'full')} fill={ROOM_FILL.master} stroke={OUTER_STROKE} strokeWidth="5" />
          <path d={roomShape(back, 'full')} fill={ROOM_FILL.yard} stroke={OUTER_STROKE} strokeWidth="5" />

          <Furniture />

          <text x={midX(living)} y={usableHeight(living) / 2 - 12} textAnchor="middle" className="room-name">
            PHÒNG KHÁCH + BÀN THỜ
          </text>
          <text x={midX(kitchen) - 14} y={usableHeight(kitchen) / 2 - 54} textAnchor="middle" className="room-name">
            BẾP + ĂN
          </text>
          <text x={midX(bed1) - 18} y={usableHeight(bed1) / 2 - 10} textAnchor="middle" className="room-name small">
            PHÒNG ĐA NĂNG
          </text>
          <text x={midX(bed1) - 18} y={usableHeight(bed1) / 2 + 18} textAnchor="middle" className="fixture-label">
            MỞ RA HÀNH LANG
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

          <text x={(bed1.start + 3.7) * SCALE} y={corridorStartY(bed1) + 44} textAnchor="middle" className="corridor-note">
            HÀNH LANG {corridorWidth}m
          </text>

          <DoorSwing x={front.end * SCALE - 10} y={fullHeight(front) - 6} radius={58} direction={-1} flip={1} />
          <DoorSwing x={bed2.start * SCALE + 20} y={fullHeight(bed2) - 6} radius={32} />
          <DoorSwing x={wc.start * SCALE + 20 + 1.0 * SCALE} y={corridorStartY(wc) - 2} radius={30} direction={-1} flip={0} upward />
          <DoorSwing x={master.start * SCALE + 22} y={fullHeight(master) - 6} radius={34} />

          <DoorOpening x={kitchen.end * SCALE - 4} y={corridorStartY(kitchen)} width={56} vertical />

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
            Chuỗi công năng mô phỏng: {totalModeledLength}m
          </text>
        </g>
      </svg>
    </div>
  )
}
