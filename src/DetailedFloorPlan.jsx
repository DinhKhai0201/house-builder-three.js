import { corridorWidth, planRows, scaleMetersToPixels, totalModeledLength } from './data/housePlan'

const SCALE = scaleMetersToPixels * 2.8
const OUTER_STROKE = '#000000'
const WALL = '#000000'
const ROOM_FILL = {
  yard: '#ffffff',
  public: '#ffffff',
  service: '#ffffff',
  bedroom: '#ffffff',
  bath: '#ffffff',
  master: '#ffffff',
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
  const viewW = totalModeledLength * SCALE + 280
  const viewH = totalWidth + 200

  return (
    <div className="detailed-plan-card">
      <svg className="detailed-plan-svg" viewBox={`-70 -40 ${viewW} ${viewH}`} role="img" aria-label="Ban ve 2D nha cap 4 no hau">
        <rect x="-70" y="-40" width={viewW} height={viewH} rx="34" className="paper-bg" />

        <g transform="translate(32 44)">
          {/* Trục lưới (Grid Lines) */}
          {planRows.map((row, index) => {
            const x = row.start * SCALE;
            return (
              <g key={`grid-v-${index}`}>
                <line x1={x} y1={-80} x2={x} y2={totalWidth + 120} stroke="#999" strokeWidth="1" strokeDasharray="15, 10" />
                <circle cx={x} cy={-100} r="18" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x={x} y={-94} textAnchor="middle" fontSize="16" fontWeight="bold">{index + 1}</text>

                <circle cx={x} cy={totalWidth + 140} r="18" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x={x} y={totalWidth + 146} textAnchor="middle" fontSize="16" fontWeight="bold">{index + 1}</text>
              </g>
            )
          })}
          {/* Trục ngang */}
          <g>
            <line x1={-80} y1={0} x2={totalModeledLength * SCALE + 80} y2={0} stroke="#999" strokeWidth="1" strokeDasharray="15, 10" />
            <circle cx={-100} cy={0} r="18" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x={-100} y={6} textAnchor="middle" fontSize="16" fontWeight="bold">A</text>
            <circle cx={totalModeledLength * SCALE + 100} cy={0} r="18" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x={totalModeledLength * SCALE + 100} y={6} textAnchor="middle" fontSize="16" fontWeight="bold">A</text>

            <line x1={-80} y1={totalWidth} x2={totalModeledLength * SCALE + 80} y2={totalWidth} stroke="#999" strokeWidth="1" strokeDasharray="15, 10" />
            <circle cx={-100} cy={totalWidth} r="18" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x={-100} y={totalWidth + 6} textAnchor="middle" fontSize="16" fontWeight="bold">B</text>
            <circle cx={totalModeledLength * SCALE + 100} cy={totalWidth} r="18" fill="#fff" stroke="#000" strokeWidth="2" />
            <text x={totalModeledLength * SCALE + 100} y={totalWidth + 6} textAnchor="middle" fontSize="16" fontWeight="bold">B</text>
          </g>

          <path d={roomShape(front, 'full')} fill={ROOM_FILL.yard} stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(living, 'full')} fill={ROOM_FILL.public} stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(kitchen, 'full')} fill={ROOM_FILL.service} stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(bed1, 'full')} fill={ROOM_FILL.bedroom} stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(bed1, 'corridor')} fill="#ffffff" stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(bed2, 'main')} fill={ROOM_FILL.bedroom} stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(bed2, 'corridor')} fill="#ffffff" stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={`M ${wc.start * SCALE} 0 L ${wc.end * SCALE} 0 L ${wc.end * SCALE} ${(wc.endWidth - corridorWidth - 0.72) * SCALE} L ${(wc.end - 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * ((wc.length - 1.0) / wc.length)) - corridorWidth - 0.72) * SCALE} L ${(wc.end - 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * ((wc.length - 1.0) / wc.length)) - corridorWidth) * SCALE} L ${wc.start * SCALE} ${(wc.startWidth - corridorWidth) * SCALE} Z`} fill={ROOM_FILL.bath} stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={`M ${wc.start * SCALE} ${(wc.startWidth - corridorWidth) * SCALE} L ${(wc.end - 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * ((wc.length - 1.0) / wc.length)) - corridorWidth) * SCALE} L ${(wc.end - 1.0) * SCALE} ${((wc.startWidth + (wc.endWidth - wc.startWidth) * ((wc.length - 1.0) / wc.length)) - corridorWidth - 0.72) * SCALE} L ${wc.end * SCALE} ${(wc.endWidth - corridorWidth - 0.72) * SCALE} L ${wc.end * SCALE} ${wc.endWidth * SCALE} L ${wc.start * SCALE} ${wc.startWidth * SCALE} Z`} fill="#ffffff" stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(master, 'full')} fill={ROOM_FILL.master} stroke={OUTER_STROKE} strokeWidth="6" />
          <path d={roomShape(back, 'full')} fill={ROOM_FILL.yard} stroke={OUTER_STROKE} strokeWidth="6" />

          {planRows.map(row => {
            const w = row.corridor ? (row.startWidth + row.endWidth) / 2 - corridorWidth : (row.startWidth + row.endWidth) / 2;
            return (
              <g key={`text-${row.key}`}>
                <text x={midX(row)} y={usableHeight(row) / 2 - 4} textAnchor="middle" className="room-name" fill="#000" fontWeight="bold">
                  {row.label.toUpperCase()}
                </text>
                <text x={midX(row)} y={usableHeight(row) / 2 + 16} textAnchor="middle" className="fixture-label" fill="#000">
                  ({row.length}m x {w.toFixed(2)}m)
                </text>
              </g>
            )
          })}

          <DoorSwing x={front.end * SCALE - 10} y={fullHeight(front) - 6} radius={58} direction={-1} flip={1} />
          <DoorSwing x={bed2.start * SCALE + 20} y={fullHeight(bed2) - 6} radius={32} />
          <DoorSwing x={wc.start * SCALE + 8} y={corridorStartY(wc) + 4} radius={30} direction={1} flip={0} upward={false} />
          <DoorSwing x={master.start * SCALE + 22} y={fullHeight(master) - 6} radius={34} />

          <DoorOpening x={kitchen.end * SCALE - 4} y={corridorStartY(kitchen)} width={56} vertical />
          <WindowMark x={master.end * SCALE - 4} y={24} width={92} horizontal={false} />
        </g>
      </svg>
    </div>
  )
}
