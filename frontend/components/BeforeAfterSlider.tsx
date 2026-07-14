'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  height?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  height = '500px'
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [containerWidth, setContainerWidth] = useState<number | string>('100%')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let position = (x / rect.width) * 100
    if (position < 2) position = 2
    if (position > 98) position = 98
    setSliderPosition(position)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleMouseUp = () => setIsDragging(false)

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('touchend', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className="slider-container"
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        userSelect: 'none',
        cursor: isDragging ? 'ew-resize' : 'default'
      }}
    >
      <style>{`
        .slider-container {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .slider-label {
          position: absolute;
          bottom: 16px;
          padding: 5px 14px;
          background: rgba(var(--primary-rgb), 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          border-radius: 50px;
          pointer-events: none;
          white-space: nowrap;
        }
        .slider-handle-bar {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent);
          cursor: ew-resize;
          touch-action: none;
          box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.6);
          z-index: 20;
        }
        .slider-handle-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--accent);
          border: 4px solid var(--primary);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          z-index: 30;
          cursor: ew-resize;
          transition: transform 0.1s;
        }
        .slider-handle-circle:hover {
          transform: translate(-50%, -50%) scale(1.1);
          background: var(--white);
        }
        .slider-handle-arrow {
          font-weight: bold;
          font-size: 1rem;
        }
      `}</style>

      {/* ── LAYER 1 (bottom): After image — full width, z-index auto ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* AFTER label: z-index 2 — BELOW the before-image overlay (z-index 5).
            When the before-image overlay expands, it correctly covers this label. */}
        <span
          className="slider-label"
          style={{ right: '16px', zIndex: 2 }}
        >
          {afterLabel}
        </span>
      </div>

      {/* ── LAYER 2 (middle): Before image — clipped overlay, z-index 5 ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: `${sliderPosition}%`,
          overflow: 'hidden',
          zIndex: 5   // Higher than AFTER label (2) — properly covers it
        }}
      >
        {/* Inner div expands to full container width so the image doesn't stretch */}
        <div style={{ position: 'absolute', width: containerWidth, height: height }}>
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        {/* BEFORE label: inside the clipped div → auto-clips with the image ✅ */}
        <span
          className="slider-label"
          style={{ left: '16px', zIndex: 6 }}
        >
          {beforeLabel}
        </span>
      </div>

      {/* ── LAYER 3 (top): Drag bar + handle, z-index 20 ── */}
      <div
        className="slider-handle-bar"
        style={{ left: `${sliderPosition}%`, zIndex: 20 }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="slider-handle-circle">
          <span className="slider-handle-arrow">↔</span>
        </div>
      </div>
    </div>
  )
}
