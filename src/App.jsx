import { useState, useRef, useEffect } from 'react'
import HouseScene from './HouseScene'
import DetailedFloorPlan from './DetailedFloorPlan'
import SceneErrorBoundary from './SceneErrorBoundary'

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
  const [topDownView, setTopDownView] = useState(false)
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
      <section className="panel">
        <article className="wide">
          <div className="section-head">
            <p className="eyebrow">Bản vẽ thiết kế</p>
            <h2>Mặt bằng 2D chuẩn AutoCAD</h2>
            <p className="scene-hint" style={{ marginTop: '8px' }}>Bản vẽ mặt bằng kiến trúc đen trắng chuẩn kỹ thuật, hiển thị lưới trục tọa độ và diện tích từng phòng. Dễ dàng in ấn và giao cho thầu thi công.</p>
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
            <PremiumSwitch label="Từ trên xuống" checked={topDownView} onChange={(val) => {
              setTopDownView(val);
              if(val) { setShowRoof(false); setFirstPerson(false); }
            }} />
            <PremiumSwitch label="Tham quan" checked={firstPerson} onChange={(val) => {
              setFirstPerson(val);
              if(val) setTopDownView(false);
            }} />
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
                  <option value="bed1">Phòng đa năng</option>
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
              <HouseScene showRoof={showRoof} showLowerLevel={showLowerLevel} firstPerson={firstPerson} focusRoom={focusRoom} showLeftWall={showLeftWall} showRightWall={showRightWall} topDownView={topDownView} />
            </SceneErrorBoundary>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
