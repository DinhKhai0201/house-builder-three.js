export const segments = [
  { key: 'front-yard', label: 'Sân trước', length: 0.8, type: 'yard', corridor: false },
  { key: 'living', label: 'Phòng khách + bàn thờ', length: 5, type: 'public', corridor: false },
  { key: 'kitchen', label: 'Bếp + ăn', length: 5.7, type: 'service', corridor: false },
  { key: 'bed-1', label: 'Phòng ngủ 1', length: 2.7, type: 'bedroom', corridor: true },
  { key: 'bed-2', label: 'Phòng ngủ 2', length: 2.7, type: 'bedroom', corridor: true },
  { key: 'wc', label: 'WC + tắm', length: 1.8, type: 'bath', corridor: true },
  { key: 'master', label: 'Phòng ngủ master', length: 6, type: 'master', corridor: false },
  { key: 'back-yard', label: 'Sân sau', length: 2, type: 'yard', corridor: false },
]

export const widthAt = (distance) => {
  const frontWidth = 2.5
  const rearWidth = 3
  const modeledLength = totalModeledLength
  return frontWidth + ((rearWidth - frontWidth) * distance) / modeledLength
}

export const corridorWidth = 0.8
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
  'Hành lang bên phải rộng 0.8m chỉ bắt đầu từ đoạn phòng ngủ 1, phòng ngủ 2 và WC, sau đó dẫn tới cửa phòng master.',
  'Phòng ngủ 1 và 2 được giữ nhỏ đúng tính chất nhà ống hẹp, ưu tiên vừa đủ giường 1.4m và tủ sâu 450mm.',
  'Không thêm giếng trời riêng; ánh sáng chính đến từ cửa trước, cửa sau, cửa sổ phòng và sân sau.',
  'Tổng chiều dài công năng đang mô phỏng là 26.7m; phần chênh đến 32m được xem là bố trí ngoài nhà, bậc cấp hoặc khoảng tiếp cận không nằm trong mặt bằng chính.',
]

export const descriptionBlocks = [
  {
    title: 'Định hướng không gian',
    text: 'Nhà cấp 4 rất hẹp nên cần giữ trục nhìn thẳng từ cửa chính qua phòng khách tới bếp ăn, dùng phong cách Japandi tối giản để không gian sáng, thoáng và dễ thi công.',
  },
  {
    title: 'Điểm nhấn cần giữ',
    text: 'Bàn thờ đặt ở vách chuyển tiếp giữa phòng khách và bếp, hành lang chỉ xuất hiện ở cụm phòng ngủ 1, phòng ngủ 2, WC, còn phòng master mở cửa từ cuối hành lang và có cửa kính lớn nhìn ra sân sau.',
  },
  {
    title: 'Nguyên tắc thực tế',
    text: 'Không tự ý thêm giếng trời, không làm phòng ngủ rộng giả; luôn giữ đúng tỷ lệ dài và ngang của nhà để thợ nhìn bản vẽ không hiểu sai thành nhà rộng.',
  },
]
