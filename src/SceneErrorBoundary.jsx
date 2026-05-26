import { Component } from 'react'

export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div className="canvas-fallback">Mô hình 3D đang lỗi hiển thị. Mình đã giữ lại bản 2D để tiếp tục chỉnh.</div>
    }

    return this.props.children
  }
}
