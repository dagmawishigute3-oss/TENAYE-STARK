import React, { ReactNode } from "react"
import { useTilt } from "../hooks/useTilt"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxDeg?: number
  style?: React.CSSProperties
}

export function TiltCard({
  children,
  className = "",
  maxDeg = 10,
  style,
}: TiltCardProps) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(maxDeg)
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card ${className}`}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  )
}
