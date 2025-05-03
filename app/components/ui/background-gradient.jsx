"use client"
import React from "react"
import { cn } from "@/lib/utils"

export const BackgroundGradient = ({ children, className, containerClassName, animate = true }) => {
  const gradientRef = React.useRef(null)

  React.useEffect(() => {
    if (!animate) return

    const handleMouseMove = (e) => {
      if (!gradientRef.current) return

      const rect = gradientRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gradientRef.current.style.setProperty("--x", `${x}px`)
      gradientRef.current.style.setProperty("--y", `${y}px`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [animate])

  return (
    <div
      className={cn(
        "relative h-full w-full rounded-[inherit] p-[1px] [transform-style:preserve-3d] [perspective:800px]",
        containerClassName,
      )}
    >
      <div
        ref={gradientRef}
        className={cn(
          "absolute inset-0 rounded-[inherit] [--x:50%] [--y:50%]",
          "before:absolute before:inset-0 before:h-full before:w-full before:rounded-[inherit] before:bg-[radial-gradient(circle_at_var(--x)_var(--y),theme(colors.purple.500/0.15),transparent_40%)] before:opacity-0 before:transition-opacity before:duration-500",
          "after:absolute after:inset-0 after:h-full after:w-full after:rounded-[inherit] after:bg-[radial-gradient(circle_at_var(--x)_var(--y),theme(colors.purple.400/0.25),transparent_40%)] after:opacity-0 after:transition-opacity after:duration-500",
          "hover:before:opacity-100 hover:after:opacity-100",
        )}
      />
      <div
        className={cn(
          "relative z-10 h-full w-full rounded-[inherit] bg-slate-950/90 p-3 text-slate-50 shadow-xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
