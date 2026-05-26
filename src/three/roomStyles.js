export const roomColors = {
  yard: '#d9c8ad',
  public: '#f4ead8',
  service: '#ead9c0',
  bedroom: '#ede1cb',
  bath: '#d4d3cc',
  master: '#e3cfb1',
  corridor: '#faf8f2',
}

export function roomHeight(type) {
  if (type === 'yard') return 0.05
  if (type === 'master') return 3.2
  return 3
}
