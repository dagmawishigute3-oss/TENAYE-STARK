import { useRef, useCallback } from "react"

export function useTilt(maxDeg = 12) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      el.style.transform = `perspective(800px) rotateX(${-dy * maxDeg}deg) rotateY(${dx * maxDeg}deg) translateZ(8px)`
    },
    [maxDeg],
  )

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    el.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
    setTimeout(() => {
      if (el) el.style.transition = ""
    }, 450)
  }, [])

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave }
}
