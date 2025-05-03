"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    context.fillStyle = "rgba(0, 0, 0, 0.5)"
    context.fillRect(0, 0, canvas.width, canvas.height)

    const centerX = mousePosition.x || canvas.width / 2
    const centerY = mousePosition.y || canvas.height / 2

    const gradientRadius = Math.min(canvas.width, canvas.height) * 0.5
    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, gradientRadius)

    gradient.addColorStop(0, "rgba(125, 39, 255, 0.2)")
    gradient.addColorStop(0.5, "rgba(0, 136, 255, 0.05)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    const numBeams = 20
    const beamLength = Math.max(canvas.width, canvas.height)
    const beamWidth = 2

    context.save()
    context.translate(centerX, centerY)

    for (let i = 0; i < numBeams; i++) {
      const angle = (i * Math.PI * 2) / numBeams
      const x = Math.cos(angle) * beamLength
      const y = Math.sin(angle) * beamLength

      context.strokeStyle = i % 2 === 0 ? "rgba(125, 39, 255, 0.15)" : "rgba(0, 136, 255, 0.15)"
      context.lineWidth = beamWidth
      context.beginPath()
      context.moveTo(0, 0)
      context.lineTo(x, y)
      context.stroke()
    }

    context.restore()
  }, [mousePosition])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 z-0", className)} />
}
