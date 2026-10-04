import React, { useState, useEffect, useRef } from "react"
import logoImg from "../imports/image-removebg-preview.png"

interface HomeIntroLoaderProps {
  onComplete?: () => void
}

export const HomeIntroLoader: React.FC<HomeIntroLoaderProps> = ({
  onComplete,
}) => {
  // Stages: 'pulse' (center heartbeat) -> 'glide' (flying to navbar) -> 'done' (hidden)
  const [stage, setStage] = useState<"pulse" | "glide" | "done">("pulse")
  const [transformStyle, setTransformStyle] = useState<React.CSSProperties>({})
  const [overlayOpacity, setOverlayOpacity] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Notify Navbar to hide static logo while intro is running
    window.dispatchEvent(
      new CustomEvent("tenaye-intro-loading", { detail: { active: true } }),
    )

    // Phase 1: Logo pulses in center for 1.1s
    const glideTimer = setTimeout(() => {
      // Calculate target destination (Navbar logo position)
      const targetEl = document.getElementById("navbar-logo-img")
      const targetRect = targetEl?.getBoundingClientRect() || {
        left: 24,
        top: 14,
        width: 36,
        height: 36,
      }

      const logoSize = 96 // Center logo dimensions (px)
      const centerLeft = (window.innerWidth - logoSize) / 2
      const centerTop = (window.innerHeight - logoSize) / 2

      const targetCenterLeft =
        targetRect.left + (targetRect.width - logoSize) / 2
      const targetCenterTop =
        targetRect.top + (targetRect.height - logoSize) / 2

      const deltaX = targetCenterLeft - centerLeft
      const deltaY = targetCenterTop - centerTop
      const scale = targetRect.width / logoSize

      // Begin flight to navbar with smooth spring ease
      setTransformStyle({
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`,
        transition:
          "transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease 450ms",
      })

      setOverlayOpacity(0)
      setStage("glide")

      // Reveal Navbar logo right as it lands
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("tenaye-intro-loading", {
            detail: { active: false },
          }),
        )
      }, 550)
    }, 1150)

    // Phase 3: Transition finished (1.8s) -> clean unmount
    const doneTimer = setTimeout(() => {
      setStage("done")
      window.dispatchEvent(
        new CustomEvent("tenaye-intro-loading", { detail: { active: false } }),
      )
      if (onComplete) onComplete()
    }, 1850)

    return () => {
      clearTimeout(glideTimer)
      clearTimeout(doneTimer)
      window.dispatchEvent(
        new CustomEvent("tenaye-intro-loading", { detail: { active: false } }),
      )
    }
  }, [onComplete])

  if (stage === "done") {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none select-none flex items-center justify-center overflow-hidden"
    >
      {/* Background Mask: Glass blur fadeout */}
      <div
        className="absolute inset-0 bg-white/95 backdrop-blur-md transition-opacity duration-500 ease-out pointer-events-auto"
        style={{ opacity: overlayOpacity }}
      />

      {/* Center Vital Rings (fades out as flight starts) */}
      {stage === "pulse" && (
        <div className="absolute flex items-center justify-center pointer-events-none animate-in fade-in duration-300">
          {/* Outer Radar Glow */}
          <div className="absolute w-44 h-44 rounded-full bg-teal-400/15 blur-2xl animate-pulse" />
          {/* Concentric Vital Ripple Ring 1 */}
          <div className="absolute w-32 h-32 rounded-full border border-[#119197]/30 animate-ping opacity-40 duration-1000" />
          {/* Concentric Vital Ripple Ring 2 */}
          <div className="absolute w-28 h-28 rounded-full border border-teal-300/40 animate-pulse duration-700" />
        </div>
      )}

      {/* Flying & Pulsing Location Pin Logo */}
      <div
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
        style={{
          width: "96px",
          height: "96px",
          ...transformStyle,
        }}
      >
        <img
          src={logoImg}
          alt="Tenaye Health Pin"
          className={`w-24 h-24 object-contain filter drop-shadow-lg transition-transform duration-300 ${
            stage === "pulse" ? "animate-heartbeat" : ""
          }`}
        />
      </div>

      {/* Title & Micro Loading Indicator (Centered beneath logo, fades out on glide) */}
      <div
        className="absolute bottom-28 sm:bottom-32 flex flex-col items-center gap-2.5 transition-all duration-400 ease-out"
        style={{
          opacity: overlayOpacity,
          transform: `translateY(${stage === "glide" ? "12px" : "0"})`,
        }}
      >
        {/* Brand Text */}
        <div
          className="flex items-center gap-1.5 leading-none notranslate"
          translate="no"
        >
          <span className="font-logo text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#0c6e73] to-[#119197] px-3 py-1 rounded-full shadow-sm">
            Ten
          </span>
          <span className="font-logo text-base sm:text-lg font-bold text-[#dc2626]">
            aye
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-500 ml-1.5">
            (ጤናዬ)
          </span>
        </div>

        {/* Vital Heartbeat Progress Line */}
        <div className="w-36 h-1 bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
          <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#0c6e73] via-[#119197] to-teal-400 rounded-full animate-loader-bar" />
        </div>

        <p className="text-[11px] font-medium text-slate-400 tracking-wide">
          Health Companion Loading...
        </p>
      </div>
    </div>
  )
}
