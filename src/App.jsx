import { useState } from 'react'
import HouseScene from './HouseScene'
import DetailedFloorPlan from './DetailedFloorPlan'
import SceneErrorBoundary from './SceneErrorBoundary'
import { descriptionBlocks, estimatedSiteLength, keyNotes } from './data/housePlan'

function App() {
  const [showRoof, setShowRoof] = useState(false)
  const [showLowerLevel, setShowLowerLevel] = useState(true)

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
        <article className="wide">
          <div className="section-head light">
            <p className="eyebrow">Mô phỏng 3D</p>
            <h2>Khối 3D có thể xoay và đã chia phần để dễ chỉnh sửa</h2>
          </div>
          <div className="scene-toolbar">
            <button
              type="button"
              className={`roof-toggle ${showRoof ? 'is-active' : ''}`}
              onClick={() => setShowRoof((value) => !value)}
            >
              {showRoof ? 'Ẩn mái nhà' : 'Hiện mái nhà'}
            </button>
            <button
              type="button"
              className={`roof-toggle ${showLowerLevel ? 'is-active' : ''}`}
              onClick={() => setShowLowerLevel((value) => !value)}
            >
              {showLowerLevel ? 'Ẩn nền dưới' : 'Hiện nền dưới'}
            </button>
            <span className="scene-hint">Mái tôn phủ từ phòng khách đến phòng ngủ 1. Khu WC và master là đổ mê, có bồn nước trên mái.</span>
          </div>
          <div className="canvas-wrap">
            <SceneErrorBoundary>
              <HouseScene showRoof={showRoof} showLowerLevel={showLowerLevel} />
            </SceneErrorBoundary>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
