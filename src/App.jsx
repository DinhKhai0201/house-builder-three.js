import { useState, useRef, useEffect } from 'react'
import HouseScene from './HouseScene'
import DetailedFloorPlan from './DetailedFloorPlan'
import SceneErrorBoundary from './SceneErrorBoundary'
import { estimatedSiteLength, planRows, totalModeledLength, corridorWidth } from './data/housePlan'

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
  const [showLeftWall, setShowLeftWall] = useState(true)
  const [showRightWall, setShowRightWall] = useState(true)
  const [firstPerson, setFirstPerson] = useState(false)
  const [focusRoom, setFocusRoom] = useState('living')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isCssFullscreen, setIsCssFullscreen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement || !!document.webkitFullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    if (isCssFullscreen) {
      document.body.classList.add('has-css-fullscreen')
    } else {
      document.body.classList.remove('has-css-fullscreen')
    }
  }, [isCssFullscreen])

  const isCurrentlyFullscreen = isFullscreen || isCssFullscreen

  const toggleFullscreen = () => {
    if (!isCurrentlyFullscreen) {
      const el = panelRef.current
      if (!el) return

      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => setIsCssFullscreen(true))
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
      } else {
        setIsCssFullscreen(true)
      }
    } else {
      if (isCssFullscreen) {
        setIsCssFullscreen(false)
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  return (
    <main className="app-shell">
      <section className="panel intro-panel">
        <p className="eyebrow">Thông số kích thước</p>
        <h1>Chi tiết diện tích từ tổng thể đến từng phòng.</h1>
        <p className="lead">
          Dưới đây là bảng thống kê kích thước chi tiết dựa trên tỷ lệ nở hậu thực tế từ 2.5m đến 3.0m. Diện tích lọt lòng của các phòng đã được tính toán chính xác sau khi trừ đi hành lang giao thông.
        </p>
        <div className="intro-metrics">
          <span>Tổng chiều dài: {totalModeledLength}m</span>
          <span>Mặt tiền: 2.5m</span>
          <span>Nở hậu: 3.0m</span>
          <span>Hành lang: {corridorWidth}m</span>
          <span>Chiều cao cửa phòng: 2.2m</span>
        </div>
      </section>

      <section className="panel description-panel">
        <div className="section-head">
          <p className="eyebrow">Kích thước từng phần</p>
          <h2>Diện tích và bề ngang lọt lòng</h2>
        </div>
        <div className="description-grid">
          {planRows.map((row) => {
            const avgW = (row.startWidth + row.endWidth) / 2
            const roomW = row.corridor ? avgW - corridorWidth : avgW
            const area = (roomW * row.length).toFixed(1)

            return (
              <article className="description-card" key={row.key}>
                <h3 style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px', marginBottom: '12px' }}>{row.label}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8b8476' }}>Chiều dài dọc nhà:</span>
                    <span style={{ fontWeight: 500 }}>{row.length}m</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#8b8476' }}>Bề ngang lọt lòng:</span>
                    <span style={{ fontWeight: 500 }}>{roomW.toFixed(2)}m</span>
                  </div>
                  {row.corridor && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#8b8476' }}>Hành lang:</span>
                      <span style={{ fontWeight: 500 }}>{corridorWidth}m</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', paddingTop: '8px', borderTop: '1px dashed rgba(0,0,0,0.05)' }}>
                    <span style={{ color: '#8b8476' }}>Diện tích khoảng:</span>
                    <span style={{ fontWeight: 'bold', color: '#4a3f35' }}>~{area} m²</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
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
            <PremiumSwitch label="Tường trái" checked={showLeftWall} onChange={setShowLeftWall} />
            <PremiumSwitch label="Tường phải" checked={showRightWall} onChange={setShowRightWall} />
            <PremiumSwitch label="Tham quan" checked={firstPerson} onChange={setFirstPerson} />
            {!isCurrentlyFullscreen && (
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
          <div className={`canvas-wrap ${isCssFullscreen ? 'css-fullscreen' : ''}`} ref={panelRef} style={{ position: 'relative' }}>
            {isCurrentlyFullscreen && (
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
              <HouseScene showRoof={showRoof} showLowerLevel={showLowerLevel} firstPerson={firstPerson} focusRoom={focusRoom} showLeftWall={showLeftWall} showRightWall={showRightWall} />
            </SceneErrorBoundary>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
