import { useState, useMemo, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useScrollReveal } from "../hooks/useScrollReveal"
import {
  IconBook,
  IconSearch,
  IconChevronDown,
  IconHeart,
  IconActivity,
  IconTarget,
  IconShield,
  IconFilter,
  IconCheck,
  IconBrain,
  IconClock,
  IconGlobe,
  IconEye,
  IconStar,
  IconNavigation,
  IconLightbulb,
  IconUsers,
  IconVolume2,
  IconArrowLeft,
  IconArrowRight,
} from "../components/Icons"
import {
  HEALTH_TIP_CATEGORIES,
  ALL_HEALTH_TIPS,
  HealthTipItem,
  HealthTipCategory,
} from "../data/healthTipsData"

const CATEGORIES_PER_PAGE = 5

function getCategoryIcon(num: number) {
  switch (num) {
    case 1:
      return IconHeart
    case 2:
      return IconActivity
    case 3:
      return IconActivity
    case 4:
      return IconClock
    case 5:
      return IconTarget
    case 6:
      return IconBook
    case 7:
      return IconActivity
    case 8:
      return IconBrain
    case 9:
      return IconShield
    case 10:
      return IconShield
    case 11:
      return IconHeart
    case 12:
      return IconShield
    case 13:
      return IconEye
    case 14:
      return IconStar
    case 15:
      return IconShield
    case 16:
      return IconHeart
    case 17:
      return IconActivity
    case 18:
      return IconBrain
    case 19:
      return IconGlobe
    case 20:
      return IconBrain
    case 21:
      return IconTarget
    case 22:
      return IconShield
    case 23:
      return IconShield
    case 24:
      return IconActivity
    case 25:
      return IconShield
    case 26:
      return IconTarget
    case 27:
      return IconActivity
    case 28:
      return IconShield
    case 29:
      return IconActivity
    case 30:
      return IconHeart
    case 31:
      return IconTarget
    case 32:
      return IconStar
    case 33:
      return IconVolume2
    case 34:
      return IconClock
    case 35:
      return IconNavigation
    case 36:
      return IconTarget
    case 37:
      return IconEye
    case 38:
      return IconShield
    case 39:
      return IconLightbulb
    case 40:
      return IconUsers
    default:
      return IconHeart
  }
}

/**
 * Card UI style strictly preserved as requested.
 * Teal background, dark teal heading, bulleted action items, and scientific evidence footer.
 * Features real direct authoritative resource link for 'View Source'.
 */
function TipCard({ tip, category }: { tip: HealthTipItem; category: string }) {
  const Icon = getCategoryIcon(tip.categoryNumber)

  return (
    <div className="bg-[#f0fafa] border border-[#cceef0] rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className="text-[#119197] shrink-0" />
          <span className="text-xs font-semibold text-[#119197] bg-[#e6f7f7] px-2.5 py-0.5 rounded-full">
            {category}
          </span>
        </div>
        <h3 className="font-display font-bold text-[#0c6e73] text-base mb-2">
          {tip.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{tip.desc}</p>

        <div className="mb-4">
          <p className="font-display font-semibold text-[#0c6e73] text-xs mb-2">
            Action Steps:
          </p>
          <ul className="space-y-1.5">
            {tip.actions.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2 text-xs text-gray-600"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#119197] shrink-0 mt-1.5" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0">
        <div className="bg-white border border-[#cceef0] rounded-lg p-3">
          <p className="font-display font-semibold text-[#0c6e73] text-xs mb-1.5">
            Scientific Evidence:
          </p>
          <div className="flex items-start justify-between gap-2">
            <div className="pr-2">
              <p className="text-[10px] text-gray-700 font-medium line-clamp-2">
                <span className="font-semibold text-gray-800">Source:</span>{" "}
                {tip.evidence.source}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Published: {tip.evidence.year}
              </p>
            </div>
            <a
              href={tip.evidence.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 bg-white text-[10px] font-medium text-gray-700 hover:border-[#119197] hover:text-[#119197] hover:bg-[#e6f7f7]/40 transition-colors shrink-0 whitespace-nowrap"
              title={`Read source: ${tip.evidence.source}`}
            >
              ↗ View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HealthTips() {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const tipsContentRef = useRef<HTMLDivElement>(null)

  const ref1 = useScrollReveal()
  const ref2 = useScrollReveal()
  const ref3 = useScrollReveal()

  // Close category dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setCategoryDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Reset to page 1 whenever search query or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [query, selectedCategory])

  // Filter tips based on search query and category
  const filteredTips = useMemo(() => {
    const q = query.trim().toLowerCase()

    return ALL_HEALTH_TIPS.filter((tip) => {
      // Category filter
      if (selectedCategory !== "ALL" && tip.category !== selectedCategory) {
        return false
      }

      // Search query filter
      if (!q) return true

      const titleMatch = tip.title.toLowerCase().includes(q)
      const descMatch = tip.desc.toLowerCase().includes(q)
      const actionMatch = tip.actions.some((a) => a.toLowerCase().includes(q))
      const categoryMatch = tip.category.toLowerCase().includes(q)
      const evidenceMatch = tip.evidence.source.toLowerCase().includes(q)

      return (
        titleMatch || descMatch || actionMatch || categoryMatch || evidenceMatch
      )
    })
  }, [query, selectedCategory])

  // Group filtered tips by category
  const groupedCategories = useMemo(() => {
    const map = new Map<string, {
      category: HealthTipCategory
      tips: HealthTipItem[]
    }>()

    for (const cat of HEALTH_TIP_CATEGORIES) {
      if (selectedCategory === "ALL" || selectedCategory === cat.name) {
        map.set(cat.name, { category: cat, tips: [] })
      }
    }

    for (const tip of filteredTips) {
      const entry = map.get(tip.category)
      if (entry) {
        entry.tips.push(tip)
      }
    }

    // Filter out categories that have 0 tips when searching
    return Array.from(map.values()).filter((g) => g.tips.length > 0)
  }, [filteredTips, selectedCategory])

  // Total pages based on 5 categories per page
  const totalCategoriesCount = groupedCategories.length
  const isSingleCategoryMode = selectedCategory !== "ALL"
  const totalPages = isSingleCategoryMode
    ? 1
    : Math.max(1, Math.ceil(totalCategoriesCount / CATEGORIES_PER_PAGE))

  // Current page's 5 categories
  const paginatedCategories = useMemo(() => {
    if (isSingleCategoryMode) return groupedCategories
    const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE
    return groupedCategories.slice(startIndex, startIndex + CATEGORIES_PER_PAGE)
  }, [groupedCategories, currentPage, isSingleCategoryMode])

  const activeCategoryObject = useMemo(() => {
    if (selectedCategory === "ALL") return null
    return (
      HEALTH_TIP_CATEGORIES.find((c) => c.name === selectedCategory) || null
    )
  }, [selectedCategory])

  const scrollToContentTop = () => {
    if (tipsContentRef.current) {
      tipsContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    scrollToContentTop()
  }

  const resetFilters = () => {
    setQuery("")
    setSelectedCategory("ALL")
    setCurrentPage(1)
    scrollToContentTop()
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Deep Teal Hero Banner */}
      <div className="bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex w-12 h-12 rounded-xl bg-white/20 items-center justify-center mx-auto mb-4">
            <IconBook size={24} className="text-white" />
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
            Health Tips &amp; Wellness Guide
          </h1>
          <p className="text-teal-100 text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
            {ALL_HEALTH_TIPS.length} evidence-based health tips across{" "}
            {HEALTH_TIP_CATEGORIES.length} health categories — expert reviewed
            and backed by scientific research, WHO, CDC, NIH, and global health
            authorities
          </p>

          {/* Search + Category Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            {/* Search Input with working real-time filter */}
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-md border border-white/20">
              <IconSearch size={16} className="text-[#119197] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search health tips, exercises, nutrition..."
                className="flex-1 text-gray-800 text-sm placeholder-gray-400 outline-none bg-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Selector Dropdown matching Image 2 */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen((v) => !v)}
                className="w-full sm:w-auto h-full min-h-[46px] flex items-center justify-between sm:justify-start gap-2.5 bg-white rounded-xl px-4 py-3 text-gray-700 text-sm font-medium whitespace-nowrap hover:bg-gray-50 transition-colors shadow-md border border-white/20 cursor-pointer"
                aria-expanded={categoryDropdownOpen}
              >
                <div className="flex items-center gap-2">
                  <IconFilter size={16} className="text-[#119197] shrink-0" />
                  <span className="font-semibold text-gray-800 truncate max-w-[200px]">
                    {selectedCategory === "ALL"
                      ? `All Categories (${HEALTH_TIP_CATEGORIES.length})`
                      : selectedCategory}
                  </span>
                </div>
                <IconChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform ${
                    categoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu matching Image 2 */}
              {categoryDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-40 animate-fade-in text-left">
                  <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Select Health Topic
                    </p>
                    <span className="text-[11px] font-semibold text-[#119197] bg-[#e6f7f7] px-2 py-0.5 rounded-full">
                      {HEALTH_TIP_CATEGORIES.length} Topics
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 py-1">
                    {/* All Categories Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("ALL")
                        setCategoryDropdownOpen(false)
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left cursor-pointer ${
                        selectedCategory === "ALL"
                          ? "bg-[#e6f7f7] text-[#119197] font-bold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <IconFilter
                          size={14}
                          className={
                            selectedCategory === "ALL"
                              ? "text-[#119197]"
                              : "text-gray-400"
                          }
                        />
                        All Categories ({HEALTH_TIP_CATEGORIES.length})
                      </span>
                      {selectedCategory === "ALL" && (
                        <IconCheck
                          size={16}
                          className="text-[#119197] shrink-0 font-bold"
                        />
                      )}
                    </button>

                    {/* All 40 categories without Topic prefix */}
                    {HEALTH_TIP_CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.name
                      const CatIcon = getCategoryIcon(cat.number)
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.name)
                            setCategoryDropdownOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors text-left cursor-pointer ${
                            isSelected
                              ? "bg-[#e6f7f7] text-[#119197] font-bold"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="flex items-center gap-2.5 truncate pr-2">
                            <CatIcon
                              size={14}
                              className={
                                isSelected ? "text-[#119197]" : "text-gray-400"
                              }
                            />
                            <span className="truncate">{cat.name}</span>
                          </span>
                          {isSelected && (
                            <IconCheck
                              size={16}
                              className="text-[#119197] shrink-0 font-bold"
                            />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(query || selectedCategory !== "ALL") && (
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs">
              <span className="text-teal-200">Active filters:</span>
              {selectedCategory !== "ALL" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-medium">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("ALL")}
                    className="hover:text-amber-200 cursor-pointer ml-0.5"
                    title="Clear category"
                  >
                    ✕
                  </button>
                </span>
              )}
              {query && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-medium">
                  Search: "{query}"
                  <button
                    onClick={() => setQuery("")}
                    className="hover:text-amber-200 cursor-pointer ml-0.5"
                    title="Clear search"
                  >
                    ✕
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-teal-100 hover:text-white underline ml-1 cursor-pointer font-semibold"
              >
                Reset all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="max-w-5xl mx-auto px-4 sm:px-6 py-10"
        ref={tipsContentRef}
      >
        {/* Results Counter & Pagination Info Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-200 gap-3">
          <div>
            <h2 className="font-display font-extrabold text-xl text-gray-900">
              {activeCategoryObject
                ? activeCategoryObject.name
                : "All Health Tips & Guidance"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isSingleCategoryMode ? (
                <>Showing 4 health tips in {selectedCategory}</>
              ) : (
                <>
                  Showing topics {(currentPage - 1) * CATEGORIES_PER_PAGE + 1}–
                  {Math.min(
                    currentPage * CATEGORIES_PER_PAGE,
                    totalCategoriesCount,
                  )}{" "}
                  of {totalCategoriesCount}
                  {query && ` matching "${query}"`}
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {!isSingleCategoryMode && totalPages > 1 && (
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
                Page {currentPage} of {totalPages}
              </span>
            )}
            {(query || selectedCategory !== "ALL") && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-[#119197] hover:text-[#0c6e73] bg-[#e6f7f7] hover:bg-[#cceef0] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                ← View All {HEALTH_TIP_CATEGORIES.length} Topics
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {groupedCategories.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center my-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-[#e6f7f7] text-[#119197] flex items-center justify-center mx-auto mb-4">
              <IconSearch size={28} />
            </div>
            <h3 className="font-display font-bold text-gray-800 text-lg mb-2">
              No health tips found
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any health tips matching "{query}". Try checking
              your spelling or searching for broader terms like "nutrition",
              "exercise", "sleep", or "check-up".
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#119197] text-white font-bold text-sm hover:bg-[#0c6e73] transition-colors shadow-sm cursor-pointer"
            >
              Reset Filters &amp; View All Tips
            </button>
          </div>
        ) : (
          /* Render Categories with 5 categories per page */
          <div className="space-y-12">
            {paginatedCategories.map(({ category, tips }) => {
              const CategoryIcon = getCategoryIcon(category.number)
              return (
                <section key={category.id} className="scroll-mt-20">
                  {/* Clean Category Header — Topic #X badge completely removed */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#e6f7f7] flex items-center justify-center shrink-0">
                      <CategoryIcon size={20} className="text-[#119197]" />
                    </div>
                    <div>
                      <h2 className="font-display font-extrabold text-xl text-[#0c6e73]">
                        {category.name}
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* 2-Column Grid of Tip Cards (Strictly Preserving Original UI Style) */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {tips.map((tip) => (
                      <TipCard
                        key={tip.id}
                        tip={tip}
                        category={category.name}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {/* Pagination Controls — Per Page 5 Topics */}
        {!isSingleCategoryMode && totalPages > 1 && (
          <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-500 order-2 sm:order-1">
              Showing page{" "}
              <span className="font-bold text-gray-800">{currentPage}</span> of{" "}
              <span className="font-bold text-gray-800">{totalPages}</span> (
              {totalCategoriesCount} total health categories)
            </div>

            <div className="flex items-center gap-1.5 order-1 sm:order-2">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-[#e6f7f7] hover:text-[#119197] hover:border-[#119197] cursor-pointer shadow-2xs"
                }`}
              >
                <IconArrowLeft size={14} />
                <span>Previous</span>
              </button>

              {/* Numbered Page Buttons */}
              <div className="flex items-center gap-1 mx-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => goToPage(p)}
                      className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        currentPage === p
                          ? "bg-[#119197] text-white shadow-sm"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-[#e6f7f7] hover:text-[#119197] hover:border-[#119197] cursor-pointer shadow-2xs"
                }`}
              >
                <span>Next</span>
                <IconArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* References & Evidence Section */}
        <div
          ref={ref1}
          className="bg-[#f0fafa] border border-[#cceef0] rounded-xl p-6 my-12"
        >
          <div className="flex items-center gap-2 mb-1">
            <IconBook size={16} className="text-[#119197]" />
            <h3 className="font-display font-bold text-[#0c6e73] text-base">
              References &amp; Evidence Base
            </h3>
          </div>
          <p className="text-xs text-gray-500 mb-5">
            All 160 health tips across all 40 wellness categories are curated
            from peer-reviewed clinical research and health guidelines from
            globally accredited organizations. Click "View Source" on any card
            to access the direct medical publication.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-4">
            <div>
              <p className="font-display font-semibold text-gray-700 text-xs mb-2">
                Medical Guidelines &amp; Health Authorities:
              </p>
              <ul className="space-y-1">
                {[
                  "World Health Organization (WHO)",
                  "Centers for Disease Control and Prevention (CDC)",
                  "National Institutes of Health (NIH)",
                  "U.S. Food and Drug Administration (FDA)",
                  "American Heart Association (AHA) & ACC",
                  "American Academy of Family Physicians (AAFP)",
                  "American Academy of Pediatrics (AAP) & ACOG",
                  "Harvard T.H. Chan School of Public Health",
                ].map((s) => (
                  <li key={s} className="text-xs text-gray-600 flex gap-2">
                    <span className="text-[#119197] shrink-0 font-bold">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display font-semibold text-gray-700 text-xs mb-2">
                Peer-Reviewed Research &amp; Clinical Portals:
              </p>
              <ul className="space-y-1">
                {[
                  "The Lancet & Lancet Respiratory Medicine",
                  "JAMA Internal Medicine & The BMJ",
                  "American Journal of Clinical Nutrition",
                  "Mayo Clinic & National Sleep Foundation",
                  "American Dental Association (ADA)",
                  "American Academy of Dermatology (AAD)",
                  "National Kidney Foundation (NKF)",
                  "American Diabetes Association (ADA)",
                ].map((s) => (
                  <li key={s} className="text-xs text-gray-600 flex gap-2">
                    <span className="text-[#119197] shrink-0 font-bold">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white border border-amber-100 rounded-lg p-3">
            <p className="text-[10px] text-amber-700 leading-relaxed">
              <span className="font-semibold">Medical Disclaimer:</span> The
              information provided in Tenaye is for educational and preventive
              wellness guidance only. It is not intended to replace professional
              medical diagnosis, individualized clinical consultation, or
              emergency care. Always consult qualified healthcare providers for
              personalized medical advice.
            </p>
          </div>
        </div>

        {/* Personalized Health Advice CTA */}
        <div
          ref={ref2}
          className="rounded-2xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white p-10 text-center shadow-lg"
        >
          <h3 className="font-display font-extrabold text-2xl mb-2">
            Need Personalized Health Guidance?
          </h3>
          <p className="text-teal-100 text-sm mb-6 max-w-lg mx-auto">
            Consult our AI Health Assistant for instant symptom triage, or reach
            out to healthcare professionals for personalized support.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#119197] font-bold text-sm hover:bg-[#e6f7f7] transition-colors cursor-pointer shadow-sm"
            >
              <IconHeart size={16} /> Contact Health Team
            </Link>
            <Link
              to="/diseases"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              <IconBook size={16} /> Browse Disease Library
            </Link>
          </div>
        </div>
      </div>
      <div className="py-6" ref={ref3} />
    </main>
  )
}
export default HealthTips
