import { useState, useMemo, useEffect } from "react"
import { IconSearch, IconX, IconGlobe } from "./Icons"
import {
  ALL_LANGUAGES,
  LanguageOption,
  setWebsiteLanguage,
} from "../services/translatorService"

interface MoreLanguagesModalProps {
  isOpen: boolean
  onClose: () => void
  currentLang: LanguageOption
  onSelectLang: (lang: LanguageOption) => void
}

const REGIONS = [
  "All",
  "Horn of Africa",
  "Middle East & Africa",
  "Europe",
  "Asia",
  "Americas",
] as const

export function MoreLanguagesModal({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
}: MoreLanguagesModalProps) {
  const [search, setSearch] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string>("All")

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setSearch("")
      setSelectedRegion("All")
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const filteredLanguages = useMemo(() => {
    const q = search.trim().toLowerCase()
    return ALL_LANGUAGES.filter((item) => {
      const matchesSearch =
        !q ||
        item.label.toLowerCase().includes(q) ||
        item.native.toLowerCase().includes(q) ||
        item.countryCode.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)

      const matchesRegion =
        selectedRegion === "All" || item.region === selectedRegion

      return matchesSearch && matchesRegion
    })
  }, [search, selectedRegion])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up notranslate"
        translate="no"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-slate-50 via-white to-teal-50/30 notranslate"
          translate="no"
        >
          <div className="flex items-center gap-3 notranslate">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-[#119197]">
              <IconGlobe size={22} />
            </div>
            <div className="notranslate" translate="no">
              <div className="flex items-center gap-2 notranslate">
                <h3
                  className="text-base sm:text-lg font-bold text-slate-900 notranslate"
                  translate="no"
                >
                  Select Language
                </h3>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-[#119197] border border-teal-200 notranslate"
                  translate="no"
                >
                  40+ Languages
                </span>
              </div>
              <p
                className="text-xs text-slate-500 mt-0.5 notranslate"
                translate="no"
              >
                Translate the entire website instantly to any of the 40+
                supported languages.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-2 notranslate"
            aria-label="Close"
            translate="no"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Search bar & Region Pills */}
        <div
          className="p-4 sm:p-5 border-b border-slate-100 space-y-3 bg-slate-50/50 notranslate"
          translate="no"
        >
          <div className="relative notranslate">
            <IconSearch
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 notranslate"
            />
            <input
              type="text"
              translate="no"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search language, country code, or native script..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#119197] focus:ring-2 focus:ring-[#119197]/20 transition-all text-slate-800 placeholder-slate-400 notranslate"
              autoFocus
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 notranslate"
                translate="no"
              >
                <IconX size={15} />
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none notranslate"
            translate="no"
          >
            {REGIONS.map((region) => (
              <button
                key={region}
                translate="no"
                onClick={() => setSelectedRegion(region)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors notranslate ${
                  selectedRegion === region
                    ? "bg-[#119197] text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Language Grid */}
        <div
          className="p-4 sm:p-6 overflow-y-auto lang-dropdown-scroll flex-1 notranslate"
          translate="no"
        >
          {filteredLanguages.length === 0 ? (
            <div className="text-center py-12 notranslate" translate="no">
              <p className="text-sm font-semibold text-slate-700 notranslate">
                No languages found
              </p>
              <p className="text-xs text-slate-400 mt-1 notranslate">
                Try a different search keyword or region.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 notranslate"
              translate="no"
            >
              {filteredLanguages.map((l) => {
                const isActive =
                  currentLang.code.toLowerCase() === l.code.toLowerCase()
                return (
                  <button
                    key={l.code}
                    translate="no"
                    onClick={() => {
                      onSelectLang(l)
                      setWebsiteLanguage(l)
                      onClose()
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all notranslate ${
                      isActive
                        ? "border-[#119197] bg-[#e6f7f7] shadow-xs"
                        : "border-slate-200 hover:border-[#119197]/50 hover:bg-slate-50/80"
                    }`}
                  >
                    <div
                      className="flex items-center gap-2.5 min-w-0 notranslate"
                      translate="no"
                    >
                      <span
                        translate="no"
                        className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded-md notranslate ${
                          isActive
                            ? "bg-[#119197] text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {l.countryCode}
                      </span>
                      <div className="truncate notranslate" translate="no">
                        <p
                          translate="no"
                          className={`text-xs font-semibold truncate notranslate ${
                            isActive ? "text-[#119197]" : "text-slate-800"
                          }`}
                        >
                          {l.label}
                        </p>
                        <p
                          translate="no"
                          className="text-[11px] text-slate-400 truncate notranslate"
                        >
                          {l.native}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <span
                        translate="no"
                        className="text-[#119197] font-bold text-xs ml-2 shrink-0 notranslate"
                      >
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>{filteredLanguages.length} languages available</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
