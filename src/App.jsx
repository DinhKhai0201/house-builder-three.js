import { useState, useRef, useEffect } from 'react'
import HouseScene from './HouseScene'
import DetailedFloorPlan from './DetailedFloorPlan'
import SceneErrorBoundary from './SceneErrorBoundary'
import { descriptionBlocks, estimatedSiteLength, keyNotes } from './data/housePlan'

function PremiumSwitch({ label, checked, onChange }) {
  return (
    <label className="premium-switch">
      <span>{label}</span>
      <div className="switch-wrapper">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="switch-input"
        />
        <span className="switch-slider"></span>
      </div>
    </label>
  )
}

function App() {
  const [showRoof, setShowRoof] = useState(false)
  const [showLowerLevel, setShowLowerLevel] = useState(false)
  const [firstPerson, setFirstPerson] = useState(false)
  const [focusRoom, setFocusRoom] = useState('living')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (panelRef.current?.requestFullscreen) {
        panelRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  return (
    <main className="app-shell">
      <section className="panel intro-panel">
        <p className="eyebrow">Phương án nhà cấp 4 nở hậu</p>
        <h1>Thiết kế tối giản Japandi cho nhà hẹp 2.5m nở hậu 3.0m.</h1>
        <p className="lead">
          Bản này chỉ giữ 3 phần cần thiết: mô tả phương án, bản vẽ 2D tiếng Việt và mô phỏng 3D có thể xoay. Tỷ lệ
          nhà được giữ theo thực tế để tránh cảm giác rộng giả khi xem.
        </p>
        <div className="intro-metrics">
          <span>Mặt tiền 2.5m</span>
          <span>Nở hậu 3.0m</span>
          <span>Công năng mô phỏng 26.7m</span>
          <span>Chiều dài đất dự kiến {estimatedSiteLength}m</span>
        </div>
      </section>

      <section className="panel description-panel">
        <div className="section-head">
          <p className="eyebrow">Mô tả phương án</p>
          <h2>Những ý chính cần giữ khi triển khai</h2>
        </div>
        <div className="description-grid">
          {descriptionBlocks.map((block) => (
            <article className="description-card" key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
        <ul className="note-list compact">
          {keyNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <article className="wide">
          <div className="section-head">
            <p className="eyebrow">Bản vẽ 2D</p>
            <h2>Mặt bằng chi tiết theo tỷ lệ nhà thực tế</h2>
          </div>
          <DetailedFloorPlan />
        </article>
      </section>

      <section className="panel dark-panel">
        <article className="wide" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="scene-toolbar" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <PremiumSwitch label="Mái nhà" checked={showRoof} onChange={setShowRoof} />
            <PremiumSwitch label="Nền dưới" checked={showLowerLevel} onChange={setShowLowerLevel} />
            <PremiumSwitch label="Tham quan" checked={firstPerson} onChange={setFirstPerson} />
            {!isFullscreen && (
              <button className="roof-toggle" onClick={toggleFullscreen}>
                ⛶ Toàn màn hình
              </button>
            )}

            {!firstPerson && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span className="scene-hint" style={{ color: '#fff8ee', fontWeight: '500' }}>Tiêu điểm:</span>
                <select
                  value={focusRoom}
                  onChange={(e) => setFocusRoom(e.target.value)}
                  className="premium-select"
                >
                  <option value="front">Sân trước</option>
                  <option value="living">Phòng khách</option>
                  <option value="kitchen">Bếp & ăn</option>
                  <option value="bed1">Phòng ngủ 1</option>
                  <option value="bed2">Phòng ngủ 2</option>
                  <option value="wc">Nhà vệ sinh</option>
                  <option value="master">Phòng master</option>
                  <option value="back">Sân sau</option>
                </select>
              </div>
            )}

            {firstPerson ? (
              <span className="scene-hint animate-fade-in" style={{ color: '#ffd59a', fontWeight: 'bold', marginLeft: 'auto' }}>
                👉 Nhấn giữ và rê chuột trên màn hình để xoay hướng nhìn. Nhấn các phím W-A-S-D hoặc phím Mũi tên để di chuyển trong nhà.
              </span>
            ) : (
              <span className="scene-hint" style={{ marginLeft: 'auto' }}>
                Dùng chuột kéo để xoay 360 độ, cuộn để zoom. Sử dụng Tiêu điểm để xoay quanh từng phòng dễ dàng.
              </span>
            )}
          </div>
          <div className="canvas-wrap" ref={panelRef} style={{ position: 'relative' }}>
            {isFullscreen && (
              <button
                onClick={toggleFullscreen}
                className="roof-toggle"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  backgroundColor: 'rgba(44, 33, 24, 0.85)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                ⛶
              </button>
            )}
            <SceneErrorBoundary>
              <HouseScene showRoof={showRoof} showLowerLevel={showLowerLevel} firstPerson={firstPerson} focusRoom={focusRoom} />
            </SceneErrorBoundary>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
