import { corridorWidth, planRows } from '../data/housePlan'

export function getRow(key) {
  return planRows.find((row) => row.key === key)
}

export function avgWidth(row) {
  return (row.startWidth + row.endWidth) / 2
}

export function roomDepth(row) {
  return row.length
}

export function roomCenterX(row) {
  return row.start + row.length / 2
}

export function mainRoomWidth(row) {
  return row.corridor ? avgWidth(row) - corridorWidth : avgWidth(row)
}

export function mainRoomCenterZ(row) {
  return row.corridor ? -corridorWidth / 2 : 0
}

export function corridorCenterZ(row) {
  return avgWidth(row) / 2 - corridorWidth / 2
}

export function mainRoomMaxZ(row) {
  return mainRoomCenterZ(row) + mainRoomWidth(row) / 2
}

export function mainRoomMinZ(row) {
  return mainRoomCenterZ(row) - mainRoomWidth(row) / 2
}

export function outerMaxZ(row) {
  return avgWidth(row) / 2
}

export function outerMinZ(row) {
  return -avgWidth(row) / 2
}
