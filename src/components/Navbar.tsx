import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { IconGlobe, IconChevronDown, IconMenu, IconX, IconShieldCheck } from "./Icons"
import logoImg from "../imports/image-removebg-preview.png"
import {
  PRIMARY_LANGUAGES,
  LanguageOption,
  getSavedLanguage,
  setWebsiteLanguage,
} from "../services/translatorService"
import { MoreLanguagesModal } from "./MoreLanguagesModal"

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'News', href: '/news' },
  { label: 'Emergency', href: '/emergency' },
  { label: 'First Aid', href: '/first-aid' },
  { label: 'Disease Library', href: '/diseases' },
  { label: 'Symptom Checker', href: '/symptoms' }
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [moreModalOpen, setMoreModalOpen] = useState(false)
  const [lang, setLang] = useState<LanguageOption>(getSavedLanguage)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const [isIntroLoading, setIsIntroLoading] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.location.pathname === "/" || window.location.pathname === ""),
  )
  const langDropdownRef = useRef<HTMLDivElement>(null)

  // Synchronize logo visibility with Home intro loading animation
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ active: boolean }>
      setIsIntroLoading(Boolean(ce.detail?.active))
    }
    window.addEventListener("tenaye-intro-loading", handler)
    return () => {
      window.removeEventListener("tenaye-intro-loading", handler)
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsIntroLoading(false)
    }
  }, [location.pathname])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 4)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [])

  // Sync saved language on mount
  useEffect(() => {
    const current = getSavedLanguage()
    setLang(current)
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false)
      }
    }
    if (langOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [langOpen])

  useEffect(() => {
    setOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  const isActive = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-sm shadow-slate-200" : "border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* ── Logo ── */}
        <Link
          to="/"
          id="navbar-logo-link"
          className={`flex items-center gap-2.5 shrink-0 notranslate transition-opacity duration-300 ${
            isIntroLoading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          translate="no"
        >
          <img
            id="navbar-logo-img"
            src={logoImg}
            alt="Tenaye logo"
            className="w-9 h-9 object-contain notranslate"
            translate="no"
          />
          <div className="leading-none notranslate" translate="no">
            <p
              className="font-logo text-[13px] leading-tight tracking-tight notranslate"
              translate="no"
            >
              <span
                className="text-white bg-[#119197] px-2 py-[2px] rounded-full notranslate"
                translate="no"
              >
                Ten
              </span>
              <span
                className="text-[#dc2626] ml-0.5 notranslate"
                translate="no"
              >
                aye
              </span>
            </p>
            <p
              className="text-[9px] text-slate-400 font-medium tracking-wide mt-1 notranslate"
              translate="no"
            >
              ጤናዬ &bull; Health Companion
            </p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                isActive(href)
                  ? "text-[#119197] bg-[#e6f7f7]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Right: language + hamburger ── */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language picker */}
          <div
            className="relative notranslate"
            ref={langDropdownRef}
            translate="no"
          >
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition-colors notranslate"
              aria-label="Select Language"
              translate="no"
            >
              <IconGlobe size={15} className="text-slate-500 notranslate" />
              <span
                className="font-bold text-xs uppercase tracking-wider notranslate"
                translate="no"
              >
                {lang.countryCode}
              </span>
              <IconChevronDown
                size={13}
                className={`text-slate-400 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-56 sm:w-60 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50 animate-fade-in notranslate"
                translate="no"
              >
                {/* Header with Title and Close X */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white notranslate"
                  translate="no"
                >
                  <span
                    className="text-sm font-bold text-slate-800 tracking-tight notranslate"
                    translate="no"
                  >
                    Select Language
                  </span>
                  <button
                    onClick={() => setLangOpen(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 notranslate"
                    aria-label="Close"
                    translate="no"
                  >
                    <IconX size={15} />
                  </button>
                </div>

                {/* Primary Languages List (Scrollable) */}
                <div
                  className="max-h-72 overflow-y-auto lang-dropdown-scroll py-1 notranslate"
                  translate="no"
                >
                  {PRIMARY_LANGUAGES.map((l) => {
                    const isActive =
                      lang.code.toLowerCase() === l.code.toLowerCase()
                    return (
                      <button
                        key={l.code}
                        translate="no"
                        onClick={() => {
                          setLang(l)
                          setLangOpen(false)
                          setWebsiteLanguage(l)
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left notranslate ${
                          isActive
                            ? "bg-[#e6f7f7] text-[#119197] font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className="flex items-center gap-3 notranslate"
                          translate="no"
                        >
                          <span
                            translate="no"
                            className={`text-xs font-mono font-bold w-6 notranslate ${
                              isActive ? "text-[#119197]" : "text-slate-700"
                            }`}
                          >
                            {l.countryCode}
                          </span>
                          <span
                            translate="no"
                            className={`notranslate ${
                              isActive ? "font-semibold text-[#119197]" : ""
                            }`}
                          >
                            {l.label}
                          </span>
                        </div>
                        {isActive && (
                          <span
                            translate="no"
                            className="text-[#119197] font-bold text-sm ml-2 notranslate"
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Pinned Bottom Item: More Languages... */}
                <div
                  className="border-t border-slate-100 bg-white notranslate"
                  translate="no"
                >
                  <button
                    translate="no"
                    onClick={() => {
                      setLangOpen(false)
                      setMoreModalOpen(true)
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-[#119197] hover:bg-[#e6f7f7]/70 transition-colors text-left notranslate"
                  >
                    <IconGlobe
                      size={16}
                      className="text-[#119197] shrink-0 notranslate"
                    />
                    <span className="notranslate" translate="no">
                      More Languages...
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Console Quick Link */}
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-teal-200/90 bg-teal-50/80 hover:bg-[#119197] text-[#0c6e73] hover:text-white transition-all shadow-2xs group notranslate"
            title="Tenaye Operations Portal"
            translate="no"
          >
            <IconShieldCheck size={14} className="text-[#119197] group-hover:text-white transition-colors" />
            <span className="font-bold text-xs tracking-tight hidden sm:inline">Admin</span>
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {open ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-0.5 shadow-lg">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? "text-[#119197] bg-[#e6f7f7]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {label}
            </Link>
          ))}
          <div
            className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between px-2 notranslate"
            translate="no"
          >
            <span
              className="text-xs text-slate-500 font-medium notranslate"
              translate="no"
            >
              Active Language:
            </span>
            <button
              translate="no"
              onClick={() => {
                setOpen(false)
                setMoreModalOpen(true)
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 notranslate"
            >
              <span
                className="font-mono text-[#119197] font-bold notranslate"
                translate="no"
              >
                {lang.countryCode}
              </span>
              <span className="notranslate" translate="no">
                {lang.label}
              </span>
              <span className="text-[#119197] ml-1 notranslate" translate="no">
                Change →
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ── More Languages Modal ── */}
      <MoreLanguagesModal
        isOpen={moreModalOpen}
        onClose={() => setMoreModalOpen(false)}
        currentLang={lang}
        onSelectLang={setLang}
      />
    </header>
  )
}
