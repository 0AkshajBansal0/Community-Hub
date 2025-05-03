"use client"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export const SparklesCore = ({
  id,
  className,
  background,
  minSize,
  maxSize,
  speed,
  particleColor,
  particleDensity,
}) => {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const animationRef = useRef(null)
  const resizeTimeoutRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = setTimeout(() => {
        if (canvas) {
          canvas.width = canvas.clientWidth
          canvas.height = canvas.clientHeight
          initParticles()
        }
      }, 200)
    }

    const initParticles = () => {
      particles.current = []
      const particleCount = Math.min(
        Math.max(Math.round((canvas.width * canvas.height) / 8000) * (particleDensity || 1), 80),
        300,
      )

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize || Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * (speed || 0.6),
          speedY: (Math.random() - 0.5) * (speed || 0.6),
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = background || "transparent"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor || "255, 255, 255"}, ${particle.opacity})`
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height
      })

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    initParticles()
    drawParticles()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(resizeTimeoutRef.current)
    }
  }, [background, minSize, maxSize, speed, particleColor, particleDensity])

  return <canvas ref={canvasRef} id={id} className={cn("h-full w-full", className)} />
}
