export const segments = [
  { key: 'front-yard', label: 'Sân trước', length: 1.5, type: 'yard', corridor: false },
  { key: 'living', label: 'Phòng khách + bàn thờ', length: 4.5, type: 'public', corridor: false },
  { key: 'kitchen', label: 'Bếp + ăn', length: 4, type: 'service', corridor: false },
  { key: 'bed-1', label: 'Phòng đa năng', length: 3, type: 'bedroom', corridor: true },
  { key: 'bed-2', label: 'Phòng ngủ 2', length: 3.5, type: 'bedroom', corridor: true },
  { key: 'lavabo', label: 'Hành lang + lavabo', length: 0.9, type: 'corridor', corridor: false },
  { key: 'wc', label: 'WC + tắm', length: 1.8, type: 'bath', corridor: true },
  { key: 'master', label: 'Phòng ngủ master', length: 4, type: 'master', corridor: false },
  { key: 'back-yard', label: 'Sân sau', length: 2, type: 'yard', corridor: false },
]

export const widthAt = (distance) => {
  return 3
}

export const corridorWidth = 0.75
export const totalModeledLength = segments.reduce((sum, segment) => sum + segment.length, 0)
export const estimatedSiteLength = 32
export const scaleMetersToPixels = 28

const palette = {
  yard: '#d6c8b5',
  public: '#f7efe2',
  service: '#eadcc7',
  bedroom: '#f2e7d4',
  bath: '#d7d5cf',
  master: '#e8d8bf',
  corridor: '#f4f0e7',
}

export const planRows = segments.map((segment, index) => {
  const start = segments.slice(0, index).reduce((sum, item) => sum + item.length, 0)
  const end = start + segment.length
  return {
    ...segment,
    start,
    end,
    color: palette[segment.type],
    startWidth: widthAt(start),
    endWidth: widthAt(end),
  }
})

export const keyNotes = [
  'Hành lang bên phải chạy qua phòng đa năng, phòng ngủ 2 và WC, với khoảng lavabo riêng dài 0.9m trước WC.',
  'Phòng đa năng và phòng ngủ 2 được giữ nhỏ đúng tính chất nhà ống hẹp.',
  'Không thêm giếng trời riêng; ánh sáng chính đến từ cửa trước, cửa sau, cửa sổ phòng và sân sau.',
  `Tổng chiều dài công năng đang mô phỏng là ${totalModeledLength}m; phần chênh đến 32m là khoảng tiếp cận ngoài mặt bằng chính.`,
]

export const descriptionBlocks = [
  {
    title: 'Định hướng không gian',
    text: 'Nhà cấp 4 rất hẹp nên cần giữ trục nhìn thẳng từ cửa chính qua phòng khách tới bếp ăn, dùng phong cách Japandi tối giản để không gian sáng, thoáng và dễ thi công.',
  },
  {
    title: 'Điểm nhấn cần giữ',
    text: 'Bàn thờ đặt ở vách chuyển tiếp giữa phòng khách và bếp; lavabo nằm tại khoảng hành lang riêng trước WC hình chữ nhật.',
  },
  {
    title: 'Nguyên tắc thực tế',
    text: 'Không tự ý thêm giếng trời, không làm phòng ngủ rộng giả; luôn giữ đúng tỷ lệ dài và ngang của nhà để thợ nhìn bản vẽ không hiểu sai thành nhà rộng.',
  },
]
