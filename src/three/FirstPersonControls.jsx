import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function FirstPersonControls() {
  const { camera, gl } = useThree()
  
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    arrowup: false,
    arrowdown: false,
    arrowleft: false,
    arrowright: false,
  })

  const yaw = useRef(0)
  const pitch = useRef(0)
  const isDragging = useRef(false)
  const previousMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Đặt camera vào phòng khách lúc đầu (nhà lùi nhóm -13.35, phòng khách từ X=0.8 đến 5.8)
    camera.position.set(-11.0, 1.4, 0)
    
    // Hướng nhìn mặc định dọc theo chiều dài ngôi nhà (trục X dương)
    yaw.current = -Math.PI / 2
    pitch.current = 0
    camera.rotation.set(0, yaw.current, 0, 'YXZ')

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) {
        keys.current[key] = true
      }
    }

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) {
        keys.current[key] = false
      }
    }

    const domElement = gl.domElement

    const handlePointerDown = (e) => {
      isDragging.current = true
      previousMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handlePointerMove = (e) => {
      if (!isDragging.current) return
      const deltaX = e.clientX - previousMousePosition.current.x
      const deltaY = e.clientY - previousMousePosition.current.y

      previousMousePosition.current = { x: e.clientX, y: e.clientY }

      // Độ nhạy xoay camera
      yaw.current -= deltaX * 0.003
      pitch.current -= deltaY * 0.003

      // Giới hạn góc ngẩng đầu lên/xuống tránh lộn ngược camera
      pitch.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, pitch.current))

      camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ')
    }

    const handlePointerUp = () => {
      isDragging.current = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    domElement.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      domElement.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [camera, gl])

  const speed = 0.07
  const moveDirection = new THREE.Vector3()

  useFrame(() => {
    const moveForward = keys.current.w || keys.current.arrowup
    const moveBackward = keys.current.s || keys.current.arrowdown
    const moveLeft = keys.current.a || keys.current.arrowleft
    const moveRight = keys.current.d || keys.current.arrowright

    // Tính vector tiến/lùi và sang ngang theo hướng nhìn camera chiếu lên mặt phẳng ngang
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
    forward.y = 0
    forward.normalize()

    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
    right.y = 0
    right.normalize()

    moveDirection.set(0, 0, 0)
    if (moveForward) moveDirection.add(forward)
    if (moveBackward) moveDirection.sub(forward)
    if (moveLeft) moveDirection.sub(right)
    if (moveRight) moveDirection.add(right)

    if (moveDirection.lengthSq() > 0) {
      moveDirection.normalize().multiplyScalar(speed)
      camera.position.add(moveDirection)
    }

    // Giữ chiều cao mắt nhìn cố định ở 1.4m so với sàn nhà
    camera.position.y = 1.4
  })

  return null
}
