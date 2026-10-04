import { useState, useEffect } from "react"

export function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    const saved = localStorage.getItem("tenaye-theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    const html = document.documentElement
    dark ? html.classList.add("dark") : html.classList.remove("dark")
    localStorage.setItem("tenaye-theme", dark ? "dark" : "light")
  }, [dark])

  return [dark, setDark] as const
}
