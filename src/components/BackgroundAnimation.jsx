import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const BackgroundAnimation = ({
  starCountNear = 3600,
  starCountFar = 5200,
  starColor = new THREE.Color(0xbfdcff),
  twinkleAmplitude = 0.3,
  shootingStarInterval = [5000, 5000],
}) => {
  const containerRef = useRef(null)
  const rendererRef = useRef(null)
  const animationIdRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const interactionEnabledRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0b0e11, 80, 240)

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      300
    )
    camera.position.set(0, 0, 60)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    // Lower DPR cap a bit to offset higher star density for smooth performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.1))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer
    container.appendChild(renderer.domElement)

    // Create a soft circular glow texture for stars
    const starCanvas = document.createElement('canvas')
    starCanvas.width = 64; starCanvas.height = 64
    const sctx = starCanvas.getContext('2d')
    const sgr = sctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    // Brighter core with softer outer halo for shinier stars
    sgr.addColorStop(0.0, 'rgba(255,255,255,1.0)')
    sgr.addColorStop(0.25, 'rgba(210,230,255,0.85)')
    sgr.addColorStop(0.55, 'rgba(170,200,255,0.35)')
    sgr.addColorStop(1.0, 'rgba(255,255,255,0.0)')
    sctx.fillStyle = sgr
    sctx.fillRect(0, 0, 64, 64)
    const starTexture = new THREE.CanvasTexture(starCanvas)
    starTexture.colorSpace = THREE.SRGBColorSpace

    // Star field generator using sprite texture; split into layers for variation
    const createStarField = (count, depthMin, depthMax, size, colorHex, opacity = 0.9) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * 700
        positions[i * 3 + 1] = (Math.random() - 0.5) * 480
        positions[i * 3 + 2] = -depthMin - Math.random() * (depthMax - depthMin)
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const material = new THREE.PointsMaterial({
        color: colorHex,
        size,
        map: starTexture,
        alphaMap: starTexture,
        sizeAttenuation: true,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
      const points = new THREE.Points(geometry, material)
      return { geometry, material, points }
    }

    const mobile = /Mobi|Android/i.test(navigator.userAgent)
    const nearCount = Math.min(starCountNear, mobile ? 1000 : starCountNear)
    const farCount = Math.min(starCountFar, mobile ? 1300 : starCountFar)

    const layers = [
      // very faint tiny stars
      createStarField(Math.floor(farCount * 0.40), 150, 340, 0.6, new THREE.Color(0xa1afbf), 0.4),
      // faint layer
      createStarField(Math.floor(farCount * 0.35), 130, 300, 1.0, new THREE.Color(0x9fb3c8), 0.7),
      // medium layer
      createStarField(Math.floor(nearCount * 0.35), 80, 200, 1.3, starColor, 0.9),
      // bright layer
      createStarField(Math.floor(nearCount * 0.20), 60, 170, 2.2, new THREE.Color(0xd6e4ff), 1.0),
      // occasional bigger glows
      createStarField(Math.floor(nearCount * 0.06), 60, 150, 2.8, new THREE.Color(0xffffff), 0.9),
      // subtle bloom overlay (very low count, larger size, low opacity)
      createStarField(Math.floor(nearCount * 0.025), 60, 150, 3.6, new THREE.Color(0xffffff), 0.25)
    ]
    layers.forEach(l => scene.add(l.points))

    // Shooting stars pool
    const shootingPoolSize = 12
    const shootingStars = []
    const planeGeo = new THREE.PlaneGeometry(10, 0.16)
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false
    })
    for (let i = 0; i < shootingPoolSize; i++) {
      const streak = new THREE.Mesh(planeGeo, planeMat.clone())
      streak.visible = false
      scene.add(streak)
      shootingStars.push({ mesh: streak, velocity: new THREE.Vector3(), life: 0, maxLife: 0 })
    }

    // interaction + motion prefs
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = /Mobi|Android/i.test(navigator.userAgent)
    // Disable mouse-reactive effects
    interactionEnabledRef.current = false

    // Shooting star logic (declare BEFORE animate to avoid TDZ issues)
    let lastSpawn = 0
    let nextSpawnIn = 0
    let burstQueue = []
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }
    function spawnShootingStar() {
      const slot = shootingStars.find(s => !s.mesh.visible)
      if (!slot) return
      const startX = (Math.random() * window.innerWidth - window.innerWidth / 2) * 0.9
      const startY = (Math.random() * window.innerHeight - window.innerHeight / 2) * 0.6
      slot.mesh.position.set(startX, startY, -20)
      const angle = -Math.PI * (0.12 + Math.random() * 0.25)
      const speed = 1.6 + Math.random() * 2.2
      slot.velocity.set(Math.cos(angle) * speed, Math.sin(angle) * speed, 0)
      slot.life = 0
      slot.maxLife = 1800 + Math.random() * 1400
      slot.mesh.material.opacity = 1.0
      slot.mesh.rotation.z = angle
      slot.mesh.visible = true
      slot.mesh.renderOrder = 10
    }
    function queueBurst() {
      const count = 3 + Math.floor(Math.random() * 2)
      const now = performance.now()
      burstQueue = Array.from({ length: count }).map((_, i) => now + i * 150)
    }
    function maybeSpawnShootingStar() {
      const now = performance.now()
      if (burstQueue.length && now >= burstQueue[0]) {
        burstQueue.shift()
        spawnShootingStar()
      }
      if (now - lastSpawn < nextSpawnIn) return
      lastSpawn = now
      nextSpawnIn = randomInRange(shootingStarInterval[0], shootingStarInterval[1])
      queueBurst()
    }
    function updateShootingStars() {
      const dt = 16
      for (const s of shootingStars) {
        if (!s.mesh.visible) continue
        s.life += dt
        s.mesh.position.add(s.velocity)
        // stretch streak slightly with speed for visibility
        const stretch = 1 + Math.min(1.5, s.life / 400)
        s.mesh.scale.set(stretch, 1, 1)
        const remaining = 1 - s.life / s.maxLife
        s.mesh.material.opacity = Math.max(0, Math.min(1, remaining))
        if (s.life >= s.maxLife || Math.abs(s.mesh.position.x) > 500 || Math.abs(s.mesh.position.y) > 380) {
          s.mesh.visible = false
        }
      }
    }

    nextSpawnIn = randomInRange(shootingStarInterval[0], shootingStarInterval[1])

    let time = 0
    // Mouse-reactive cursor glow removed

    const animate = () => {
      // Slow down global background drift and twinkle progression
      time += 0.0015
      // gentle drifting across all layers for subtle parallax
      const driftX = [0.12, 0.1, 0.18, 0.22]
      const driftY = [0.08, 0.07, 0.12, 0.15]
      layers.forEach((layer, i) => {
        layer.points.position.x = Math.sin(time * driftX[i]) * (0.8 + i * 0.3)
        layer.points.position.y = Math.sin(time * driftY[i]) * (0.5 + i * 0.2)
      })

      // independent twinkle per layer; do NOT sync with any UI text animations
      layers[0].material.opacity = 0.5 + Math.cos(time * 1.7) * 0.06
      layers[1].material.opacity = 0.72 + Math.sin(time * 2.1) * 0.07
      layers[2].material.opacity = 0.95 + Math.sin(time * 2.6) * 0.06
      layers[3].material.opacity = 1.0 + Math.cos(time * 2.9) * 0.05
      layers[4].material.opacity = 0.9 + Math.sin(time * 3.1) * 0.05
      layers[5].material.opacity = 0.25 + Math.cos(time * 1.4) * 0.02

      maybeSpawnShootingStar()
      updateShootingStars()

      // Mouse parallax and cursor glow removed
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!container) return
      const { clientWidth, clientHeight } = container
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }

    const handleVisibility = () => {
      const isHidden = document.hidden
      if (isHidden && animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      } else if (!animationIdRef.current) {
        animationIdRef.current = requestAnimationFrame(animate)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', handleResize)
      // no mouse listeners to remove
      document.removeEventListener('visibilitychange', handleVisibility)
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      // Clean up all star layers
      layers.forEach(layer => {
        layer.geometry.dispose()
        layer.material.dispose()
      })
      planeGeo.dispose()
      shootingStars.forEach(s => s.mesh.material.dispose())
      scene.clear()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [starCountNear, starCountFar, starColor, twinkleAmplitude, shootingStarInterval])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}

export default BackgroundAnimation
