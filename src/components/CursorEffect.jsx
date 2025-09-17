import React, { useEffect, useRef } from 'react'

// Lightweight neon cursor trail inspired by ThreeJS Toys – Neon Cursor (CodePen)
// Uses 2D canvas for performance; respects prefers-reduced-motion and disables on touch devices
// Features: soft glow, subtle trail, expansion on interactive hover

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}

const CursorEffect = ({
  color = 'rgba(56,189,248,1)', // Tailwind primary-400
  secondaryColor = 'rgba(217,70,239,0.9)', // Tailwind accent-500
  radius = 8,
  trailLength = 16,
}) => {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const stateRef = useRef({
    points: [],
    targetX: 0,
    targetY: 0,
    hovered: false,
    enabled: true,
  })

  useEffect(() => {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouchDevice() || reduceMotion) {
      stateRef.current.enabled = false
      return
    }

    const canvas = document.createElement('canvas')
    canvasRef.current = canvas
    canvas.setAttribute('aria-hidden', 'true')
    canvas.style.position = 'fixed'
    canvas.style.inset = '0'
    canvas.style.zIndex = '40'
    canvas.style.pointerEvents = 'none'
    canvas.style.mixBlendMode = 'screen'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const initPoints = () => {
      const points = []
      for (let i = 0; i < trailLength; i++) {
        points.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
      }
      stateRef.current.points = points
    }
    initPoints()

    let ticking = false
    const onMouseMove = (e) => {
      stateRef.current.targetX = e.clientX
      stateRef.current.targetY = e.clientY
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          ticking = false
        })
      }
    }

    const onMouseOver = (e) => {
      const target = e.target
      if (!target) return
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, .btn-primary, .btn-secondary')
      stateRef.current.hovered = !!interactive
    }

    const render = () => {
      const { points, targetX, targetY, hovered } = stateRef.current
      // physics-like trail
      const spring = hovered ? 0.3 : 0.22
      const friction = hovered ? 0.6 : 0.7
      const head = points[0]
      head.x += (targetX - head.x) * spring
      head.y += (targetY - head.y) * spring
      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * friction
        points[i].y += (points[i - 1].y - points[i].y) * friction
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // trailing glow lines
      for (let i = points.length - 1; i > 0; i--) {
        const p = points[i]
        const prev = points[i - 1]
        const t = i / points.length
        const lineWidth = Math.max(1, (radius * (1 - t)) * (hovered ? 1.2 : 1))
        const alpha = 0.12 * (1 - t)
        ctx.strokeStyle = color.replace(/\)$/, `,${alpha})`).replace('rgb(', 'rgba(')
        ctx.lineWidth = lineWidth
        ctx.shadowBlur = 18 * (1 - t)
        ctx.shadowColor = color
        ctx.beginPath()
        ctx.moveTo(prev.x, prev.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }

      // head glow circle with secondary hue
      ctx.shadowBlur = hovered ? 26 : 20
      ctx.shadowColor = hovered ? secondaryColor : color
      ctx.fillStyle = hovered ? secondaryColor : color
      ctx.beginPath()
      ctx.arc(points[0].x, points[0].y, hovered ? radius * 1.4 : radius, 0, Math.PI * 2)
      ctx.fill()

      rafRef.current = requestAnimationFrame(render)
    }

    const onVisibility = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(render)
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    rafRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [color, secondaryColor, radius, trailLength])

  return null
}

export default CursorEffect


