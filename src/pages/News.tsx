import { useState, useEffect } from "react"
import {
  IconSearch,
  IconAlertTriangle,
  IconAlertCircle,
  IconHeart,
  IconShield,
  IconClock,
  IconCheck,
  IconX,
  IconUsers,
  IconShare,
  IconPhone,
  IconMapPin,
  IconActivity,
  IconStethoscope,
} from "../components/Icons"

export interface NewsPost {
  id: number
  title: string
  slug?: string
  excerpt?: string
  content: string
  category: "outbreak" | "announcement" | "health_tip" | "relief" | string
  author_name: string
  status: "published" | "draft" | "rejected"
  published: number
  views_count: number
  has_relief: number
  relief_goal: number
  relief_raised: number
  relief_beneficiary?: string
  relief_description?: string
  cluster_symptoms?: string
  cluster_region?: string
  cluster_count?: number
  ai_generated?: number
  created_at: string
}

export interface ReliefPledge {
  id: number
  donor_name: string
  amount_etb: number
  message?: string
  payment_method: string
  created_at: string
}

const ETHIOPIAN_ZONES = [
  "Addis Ababa - Bole Sub-City",
  "Addis Ababa - Kirkos Sub-City",
  "Addis Ababa - Yeka Sub-City",
  "Addis Ababa - Arada Sub-City",
  "Addis Ababa - Gulele Sub-City",
  "Addis Ababa - Kolfe Keranio Sub-City",
  "Addis Ababa - Nifas Silk Lafto Sub-City",
  "Addis Ababa - Akaky Kaliti Sub-City",
  "Addis Ababa - Lemi Kura Sub-City",
  "Addis Ababa - Lideta Sub-City",
  "Oromia - Adama / Nazret",
  "Oromia - Bishoftu / Debre Zeit",
  "Sidama - Hawassa",
  "Amhara - Bahir Dar",
  "Amhara - Gondar",
  "Dire Dawa",
  "Tigray - Mekelle",
  "Harar",
  "Other Regional City / Zone",
]

const EPIDEMIC_DISEASES = [
  "Cholera & Acute Watery Diarrhea Outbreak (ኮሌራ / ተቅማጥ)",
  "Measles Epidemic (ኩፍኝ በሽታ)",
  "Suspected Malaria Surge (ወባ ወረርሽኝ)",
  "Typhoid Fever & Waterborne Illness (ታይፎይድ ትኩሳት)",
  "Yellow Fever / Dengue Viral Fever (ቢጫ ወባ / ዴንጊ)",
  "Meningitis / Bacterial Infection (ማጅራት ገትር)",
  "Severe Acute Respiratory Infection / Influenza (አጣዳፊ የሳንባ ምች)",
  "Suspected Scabies / Parasitic Rash (እከክ ወረርሽኝ)",
  "Other Epidemic Disease / Unknown Outbreak",
]

export function News() {
  const [posts, setPosts] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Reader Modal
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null)
  const [pledges, setPledges] = useState<ReliefPledge[]>([])

  // Pledge Form Modal
  const [showPledgeForm, setShowPledgeForm] = useState(false)
  const [pledgeDonorName, setPledgeDonorName] = useState("")
  const [pledgeIsAnonymous, setPledgeIsAnonymous] = useState(false)
  const [pledgePhone, setPledgePhone] = useState("")
  const [pledgeAmount, setPledgeAmount] = useState<number>(500)
  const [pledgePaymentMethod, setPledgePaymentMethod] = useState<"Telebirr" | "BOA" | "CBE">("Telebirr")
  const [pledgeReceiptImage, setPledgeReceiptImage] = useState<string | null>(null)
  const [pledgeReceiptName, setPledgeReceiptName] = useState<string | null>(null)
  const [pledgeMessage, setPledgeMessage] = useState("")
  const [pledgeSubmitting, setPledgeSubmitting] = useState(false)
  const [pledgeSuccess, setPledgeSuccess] = useState<string | null>(null)

  // Outbreak Report Modal
  const [showReportModal, setShowReportModal] = useState(false)
  const [reporterName, setReporterName] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [reporterContact, setReporterContact] = useState("")
  const [selectedZone, setSelectedZone] = useState(ETHIOPIAN_ZONES[0])
  const [customZone, setCustomZone] = useState("")
  const [selectedSymptom, setSelectedSymptom] = useState(EPIDEMIC_DISEASES[0])
  const [customSymptom, setCustomSymptom] = useState("")
  const [affectedCount, setAffectedCount] = useState<number>(3)
  const [severityLevel, setSeverityLevel] = useState<"low" | "medium" | "high" | "urgent">("medium")
  const [reportNotes, setReportNotes] = useState("")
  const [reportSubmitting, setReportSubmitting] = useState(false)
  const [reportSuccess, setReportSuccess] = useState<string | null>(null)
  const [clusterAlertNotice, setClusterAlertNotice] = useState<string | null>(null)

  // Clean, visual parser for article and outbreak content that turns raw text and markdown into rich, styled UI cards
  const renderArticleContent = (content: string, post: NewsPost) => {
    if (!content) return null

    // Check if content contains structured markdown sections (## Headers)
    const hasHeadings = /^##\s+/m.test(content)

    // Helper: auto-detect and style bullet/numbered points, key:value pairs, and paragraphs
    const renderSmartBlocks = (text: string) => {
      // Split into logical paragraphs or double-newline blocks
      const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

      return (
        <div className="space-y-4">
          {paragraphs.map((para, pIdx) => {
            const lines = para.split("\n").map(l => l.trim()).filter(Boolean)

            // Case A: Intro or section header ending with colon (e.g. "Key updates include:", "Action items:")
            if (lines.length === 1 && lines[0].endsWith(":") && lines[0].length < 80) {
              return (
                <div key={pIdx} className="pt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#119197]" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    {lines[0].replace(/:$/, "")}
                  </h4>
                </div>
              )
            }

            // Case B: List of bullet points or numbered items or multiple key:value lines
            const isListBlock = lines.length > 1 && lines.every(l =>
              /^[-*•]|\d+[.)]/.test(l) || /^[A-Z][\w\s/&-]{2,35}:\s*/.test(l)
            )

            if (isListBlock) {
              return (
                <div key={pIdx} className="space-y-2.5">
                  {lines.map((item, iIdx) => {
                    const cleanItem = item.replace(/^[-*•]\s*|\d+[.)]\s*/, "")
                    const matchKV = cleanItem.match(/^(\*\*)?([A-Za-z0-9\s/&-]{2,40})(\*\*)?:\s*(.*)$/)

                    if (matchKV) {
                      const keyLabel = matchKV[2].trim()
                      const valText = matchKV[4].trim()
                      return (
                        <div
                          key={iIdx}
                          className="p-4 rounded-2xl bg-gradient-to-r from-teal-50/70 via-white to-cyan-50/40 border border-teal-200/80 shadow-2xs flex items-start gap-3 transition-all hover:border-teal-300"
                        >
                          <div className="w-6 h-6 rounded-lg bg-teal-500/15 text-[#0c6e73] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {iIdx + 1}
                          </div>
                          <div className="text-xs leading-relaxed space-y-0.5">
                            <strong className="text-slate-900 block font-bold text-xs">
                              {keyLabel}
                            </strong>
                            <p className="text-slate-600 font-sans">
                              {valText}
                            </p>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={iIdx}
                        className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-3 shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#119197] shrink-0 mt-2" />
                        <p className="text-xs text-slate-700 leading-relaxed font-sans">
                          {cleanItem.replace(/\*\*(.*?)\*\*/g, "$1")}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )
            }

            // Case C: Single line that is a Key: Value highlight (like in user screenshot)
            const singleKvMatch = para.match(/^(\*\*)?([A-Z][A-Za-z0-9\s/&-]{2,35})(\*\*)?:\s*(.*)$/)
            if (singleKvMatch && lines.length === 1) {
              const label = singleKvMatch[2].trim()
              const desc = singleKvMatch[4].trim()
              return (
                <div
                  key={pIdx}
                  className="p-4 rounded-2xl bg-gradient-to-r from-teal-50/70 via-white to-cyan-50/40 border border-teal-200/80 shadow-2xs flex items-start gap-3.5"
                >
                  <div className="p-2 rounded-xl bg-teal-500/15 text-[#0c6e73] shrink-0 mt-0.5">
                    <IconActivity size={16} />
                  </div>
                  <div className="text-xs leading-relaxed">
                    <strong className="text-slate-900 block font-bold text-xs mb-0.5">
                      {label}
                    </strong>
                    <span className="text-slate-600 font-sans leading-relaxed">
                      {desc}
                    </span>
                  </div>
                </div>
              )
            }

            // Case D: Standard lead paragraph or summary card
            const isFirst = pIdx === 0
            if (isFirst) {
              return (
                <div
                  key={pIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-2xs"
                >
                  <div className="flex items-center gap-2 mb-2 text-[#0c6e73]">
                    <IconAlertCircle size={15} />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Official Overview & Briefing
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans font-medium">
                    {para.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </p>
                </div>
              )
            }

            // Case E: Secondary notice / closing notes
            const isClosing = /for inquiries|contact|hotline|support desk|further details|reference/i.test(para)
            if (isClosing) {
              return (
                <div
                  key={pIdx}
                  className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 flex items-center gap-3 text-xs text-[#0c6e73] font-medium shadow-2xs"
                >
                  <IconPhone size={16} className="shrink-0 text-[#119197]" />
                  <p className="leading-relaxed">
                    {para.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </p>
                </div>
              )
            }

            // Default card paragraph
            return (
              <div
                key={pIdx}
                className="p-4 rounded-2xl bg-white border border-slate-200/70 shadow-2xs"
              >
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  {para.replace(/\*\*(.*?)\*\*/g, "$1")}
                </p>
              </div>
            )
          })}
        </div>
      )
    }

    if (!hasHeadings) {
      return renderSmartBlocks(content)
    }

    // Split content into logical blocks/sections by ## headers
    const rawSections = content.split(/^##\s+/m).filter(Boolean)

    return (
      <div className="space-y-6">
        {rawSections.map((sec, idx) => {
          const lines = sec.trim().split("\n")
          const heading = lines[0].trim()
          const bodyLines = lines.slice(1).join("\n").trim()

          // 1. AI Health Surveillance Investigation Summary
          if (/investigation summary|surveillance/i.test(heading)) {
            const items = bodyLines.split("\n").filter(l => l.trim().startsWith("-") || l.trim().startsWith("*"))
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-teal-50/80 via-[#f0f9fa] to-cyan-50/50 border border-teal-200/80 shadow-xs"
              >
                <div className="flex items-center gap-2.5 mb-4 text-[#0c6e73]">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/15 flex items-center justify-center font-bold">
                    <IconActivity size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Tenaye AI Epidemiological Investigation Summary
                    </h3>
                    <p className="text-[11px] text-teal-700 font-medium">
                      Multi-source community cluster correlation & algorithmic triage
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((it, i) => {
                    const clean = it.replace(/^[-*]\s*/, "").replace(/\*\*/g, "")
                    const [k, ...vParts] = clean.split(":")
                    const val = vParts.join(":").trim()
                    return (
                      <div key={i} className="p-3 rounded-2xl bg-white/90 border border-teal-100 shadow-2xs">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                          {k.trim()}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {val || k.trim()}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }

          // 2. What Happened (Clinical Context & Vector Definition)
          if (/what happened|clinical context|pathology|vector/i.test(heading)) {
            const cleanParagraph = bodyLines.replace(/\*\*(.*?)\*\*/g, "$1")
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-2.5 text-slate-900 border-b border-stone-100 pb-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                    <IconAlertCircle size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Incident Analysis & Pathology Context
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Clinical definition, transmission vector, and observed vulnerability
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans pt-1">
                  {cleanParagraph}
                </p>
              </div>
            )
          }

          // 3. Environmental Guidance & Protective Directives (What Can You Do?)
          if (/environmental|guidance|protective|directives|what can|prevention/i.test(heading)) {
            const directives = bodyLines
              .split(/\n(?=\d+\.|\-)/)
              .map(d => d.trim())
              .filter(Boolean)

            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-200/80 shadow-xs space-y-4"
              >
                <div className="flex items-center gap-2.5 text-amber-900 border-b border-amber-200/60 pb-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center font-bold">
                    <IconShield size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Immediate Environmental Guidance & Resident Directives
                    </h3>
                    <p className="text-[11px] text-amber-800 font-medium">
                      Actionable decontamination, isolation, and domestic protection steps
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {directives.map((dir, i) => {
                    const cleanText = dir.replace(/^\d+\.\s*/, "").replace(/^[-*]\s*/, "")
                    const matchBold = cleanText.match(/^\*\*(.*?)\*\*:\s*(.*)$/)
                    const label = matchBold ? matchBold[1] : `Guideline ${i + 1}`
                    const desc = matchBold ? matchBold[2].replace(/\*\*/g, "") : cleanText.replace(/\*\*/g, "")

                    return (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-white/95 border border-amber-100 flex items-start gap-3 shadow-2xs"
                      >
                        <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div className="text-xs leading-relaxed">
                          <strong className="text-slate-900 block font-bold text-xs mb-0.5">
                            {label}
                          </strong>
                          <span className="text-slate-600">
                            {desc}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }

          // 4. Clinical Treatment & Emergency Triage Protocol (Can treat at home vs must go to hospital)
          if (/treatment|triage|emergency protocol|ambulance/i.test(heading)) {
            // Split into paragraphs or bullet items
            const triageBlocks = bodyLines
              .split(/\n(?=###|(?:\d+\.|\-)\s*\*\*)/)
              .map(b => b.trim())
              .filter(Boolean)

            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-50/70 via-[#fff8f8] to-red-50/50 border border-rose-200/90 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-rose-200/70 pb-3">
                  <div className="flex items-center gap-2.5 text-rose-900">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center font-bold">
                      <IconStethoscope size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">
                        Treatment Guide & Triage Directives
                      </h3>
                      <p className="text-[11px] text-rose-700 font-medium">
                        Can you treat at home or must you evacuate to hospital?
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:907"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md transition-colors"
                  >
                    <IconPhone size={13} />
                    <span>Red Cross 907</span>
                  </a>
                </div>

                <div className="space-y-3">
                  {triageBlocks.map((block, i) => {
                    const cleanText = block.replace(/^###\s*/, "")
                    if (cleanText.includes("Can This Be Treated") || cleanText.includes("Treatability Assessment")) {
                      return (
                        <div key={i} className="text-xs font-bold text-slate-800 uppercase tracking-wider pb-1">
                          {cleanText.replace(/\*\*/g, "")}
                        </div>
                      )
                    }

                    const isHome = /home supportive|home care|mild cases|home observation|safe at home/i.test(cleanText)
                    const isHospital = /hospital|untreatable|immediate transfer|emergency clinical|escalation|evacuat/i.test(cleanText)

                    const [titlePart, ...descParts] = cleanText.split(":")
                    const titleClean = titlePart.replace(/^[-*]\s*/, "").replace(/\*\*/g, "")
                    const descClean = descParts.join(":").replace(/\*\*/g, "").trim()

                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl border leading-relaxed text-xs space-y-1 shadow-2xs ${
                          isHome
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                            : isHospital
                            ? "bg-rose-500/10 border-rose-300 text-rose-950"
                            : "bg-white border-stone-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <span className={`w-2 h-2 rounded-full ${isHome ? "bg-emerald-500" : isHospital ? "bg-rose-600 animate-pulse" : "bg-teal-500"}`} />
                          <span className={isHome ? "text-emerald-800" : isHospital ? "text-rose-900 font-black" : "text-slate-900"}>
                            {titleClean}
                          </span>
                        </div>
                        <p className={`text-xs pl-4 leading-relaxed ${isHome ? "text-emerald-900" : isHospital ? "text-rose-900 font-medium" : "text-slate-600"}`}>
                          {descClean || cleanText.replace(/^[#\-*]+\s*/, "").replace(/\*\*/g, "")}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Emergency Hotline Dispatch Bar */}
                <div className="p-3.5 rounded-2xl bg-white border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-2xs">
                  <div className="flex items-center gap-2 text-rose-900 font-bold">
                    <IconPhone size={15} className="text-rose-600" />
                    <span>Emergency Ambulance & Outbreak Dispatch Line:</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono font-black text-rose-700 text-xs">
                    <a href="tel:907" className="hover:underline">Red Cross 907</a>
                    <span>•</span>
                    <a href="tel:8335" className="hover:underline">EPHI Hotline 8335</a>
                  </div>
                </div>
              </div>
            )
          }

          // Fallback generic section card (Ignore notice sections)
          if (/notice|disclaimer/i.test(heading)) {
            return null
          }

          const cleanBody = bodyLines
            .replace(/^---\s*$/m, "")
            .replace(/\*(.*?)\*/g, "$1")
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .trim()

          return (
            <div key={idx} className="p-5 rounded-3xl bg-stone-50 border border-stone-200 shadow-2xs space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                {heading.replace(/^[#\s]+/, "")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {cleanBody}
              </p>
            </div>
          )
        })}
      </div>
    )
  }

  // Fetch Published News
  const fetchNews = async () => {
    setLoading(true)
    try {
      let url = "/api/news"
      const params = new URLSearchParams()
      if (activeCategory !== "all") {
        params.append("category", activeCategory)
      }
      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim())
      }
      const qs = params.toString()
      if (qs) url += `?${qs}`

      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setPosts(data.posts || [])
      }
    } catch (err) {
      console.error("[News] Fetch failed:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [activeCategory, searchQuery])

  // Open Article Reader
  const handleOpenPost = async (post: NewsPost) => {
    setSelectedPost(post)
    setPledgeSuccess(null)
    setShowPledgeForm(false)
    setPledgeReceiptImage(null)
    setPledgeReceiptName(null)
    try {
      const res = await fetch(`/api/news/${post.id}`)
      if (res.ok) {
        const data = await res.json()
        setSelectedPost(data.post)
        setPledges(data.pledges || [])
      }
    } catch (err) {
      console.error("[News] Detail fetch error:", err)
    }
  }

  // Handle Receipt File Upload (Convert to Base64 data URL)
  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (PNG, JPG, JPEG) for the payment receipt.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Receipt image size must be less than 5 MB.")
      return
    }

    // Client-side image compression using canvas (max 1280px dimension, jpeg quality 0.8)
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height
        const maxDim = 1280
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82)
          setPledgeReceiptImage(compressedDataUrl)
        } else {
          setPledgeReceiptImage(event.target?.result as string)
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  // Submit Relief Pledge
  const handlePledgeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost) return
    setPledgeSubmitting(true)
    setPledgeSuccess(null)

    const finalDonor = pledgeIsAnonymous
      ? "Anonymous Supporter"
      : pledgeDonorName.trim() || "Generous Supporter"

    try {
      const res = await fetch(`/api/news/${selectedPost.id}/pledge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: finalDonor,
          donor_phone: pledgePhone.trim() || undefined,
          amount_etb: pledgeAmount,
          payment_method: pledgePaymentMethod,
          message: pledgeMessage.trim() || undefined,
          receipt_image: pledgeReceiptImage || undefined,
          receipt_name: pledgeReceiptName || undefined,
        }),
      })

      let data: any = {}
      try {
        data = await res.json()
      } catch {
        const text = await res.text()
        throw new Error(text || `Server responded with HTTP ${res.status}`)
      }

      if (!res.ok) {
        throw new Error(data?.error || `Failed to submit donation (${res.status})`)
      }

      setPledgeSuccess(data.message || "Thank you! Your donation was submitted for administrative verification.")
      setPledgeDonorName("")
      setPledgePhone("")
      setPledgeMessage("")
      setPledgeReceiptImage(null)
      setPledgeReceiptName(null)
      setPledgeIsAnonymous(false)

      fetchNews()
    } catch (err: any) {
      alert(err.message || "Error submitting donation")
    } finally {
      setPledgeSubmitting(false)
    }
  }

  // Submit Community Outbreak Report
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reporterContact.trim()) {
      alert("Please provide your email address or phone number so health officers can verify the outbreak details.")
      return
    }

    const finalZone =
      selectedZone === "Other Regional City / Zone"
        ? (customZone.trim() || "Other Regional City / Zone")
        : selectedZone

    if (selectedZone === "Other Regional City / Zone" && !customZone.trim()) {
      alert("Please specify the regional city or zone name.")
      return
    }

    setReportSubmitting(true)
    setReportSuccess(null)
    setClusterAlertNotice(null)

    const finalSymptoms =
      selectedSymptom.startsWith("Other Epidemic") && customSymptom.trim()
        ? customSymptom.trim()
        : selectedSymptom

    try {
      const res = await fetch("/api/outbreak-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reporter_name: isAnonymous ? "Anonymous Citizen" : reporterName.trim() || "Local Resident",
          reporter_contact: reporterContact.trim(),
          region_subcity: finalZone,
          disease_or_symptoms: finalSymptoms,
          affected_count: affectedCount,
          severity: severityLevel,
          notes: reportNotes.trim() || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to submit report")
      }

      setReportSuccess(data.message)
      if (data.clusterDetected) {
        setClusterAlertNotice(
          "🚨 AI Cluster Triggered: 3+ reports have been detected in your zone. An automated public health draft has been escalated to Tenaye Medical Operations for review!"
        )
      }

      // Reset fields
      setReporterName("")
      setReporterContact("")
      setCustomZone("")
      setCustomSymptom("")
      setReportNotes("")
      fetchNews()
    } catch (err: any) {
      alert(err.message || "Error submitting report")
    } finally {
      setReportSubmitting(false)
    }
  }

  const categoryBadges: Record<string, { label: string; bg: string; text: string }> = {
    outbreak: { label: "Epidemic Alert", bg: "bg-red-500/10 border-red-500/30", text: "text-red-700" },
    announcement: { label: "Platform Update", bg: "bg-[#119197]/10 border-[#119197]/30", text: "text-[#119197]" },
    health_tip: { label: "Clinical Advisory", bg: "bg-emerald-500/10 border-emerald-500/30", text: "text-emerald-700" },
    relief: { label: "Relief Campaign", bg: "bg-purple-500/10 border-purple-500/30", text: "text-purple-700" },
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-[#0c4e54] to-[#0c6e73] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-teal-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/20 border border-teal-300/30 text-teal-200 text-xs font-bold tracking-wide uppercase mb-4 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </span>
              Tenaye Public Health & Outbreak Intelligence
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Health Bulletins, Outbreak Advisories & Community Relief
            </h1>
            <p className="mt-4 text-sm sm:text-base text-teal-100/90 leading-relaxed font-normal">
              Real-time epidemiological surveillance for Ethiopian communities. Stay informed on regional disease clusters, verified preventive guidelines, and transparent emergency support funds.
            </p>
          </div>

          {/* Action button: Report Disease */}
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setShowReportModal(true)
                setReportSuccess(null)
                setClusterAlertNotice(null)
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-red-950/30 hover:shadow-red-900/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <IconAlertTriangle size={18} className="animate-bounce" />
              <span>Report Local Disease Outbreak</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── FILTER & SEARCH BAR ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/80 border border-slate-200 p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Bulletins" },
              { id: "outbreak", label: "Outbreak Alerts" },
              { id: "announcement", label: "Platform News" },
              { id: "health_tip", label: "Health Education" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-[#119197] text-white shadow-md shadow-teal-900/20"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <IconSearch
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by topic, zone, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#119197] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <IconX size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── ARTICLES GRID ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-10 h-10 border-4 border-[#119197] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs font-medium">Loading verified medical bulletins...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <IconSearch size={28} />
            </div>
            <h3 className="text-base font-bold text-slate-800">No Bulletins Found</h3>
            <p className="text-xs text-slate-500 mt-1.5">
              No articles matched your active filters. Try resetting the category or search keywords.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all")
                setSearchQuery("")
              }}
              className="mt-5 px-4 py-2 rounded-xl bg-[#119197] text-white text-xs font-bold hover:bg-[#0c6e73] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => {
              const badge = categoryBadges[post.category] || categoryBadges.announcement
              const isOutbreak = post.category === "outbreak"
              const percentRaised = post.relief_goal > 0
                ? Math.min(100, Math.round((post.relief_raised / post.relief_goal) * 100))
                : 0
              const storyNumber = idx + 1

              return (
                <article
                  key={post.id}
                  onClick={() => handleOpenPost(post)}
                  className={`group relative bg-white rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden ${
                    isOutbreak
                      ? "border-red-200/80 hover:border-red-400 shadow-xs ring-1 ring-red-100"
                      : "border-slate-200/90 hover:border-[#119197]/60 shadow-xs"
                  }`}
                >
                  {/* Top Ambient Highlight */}
                  <div
                    className={`h-1.5 w-full ${
                      isOutbreak
                        ? "bg-gradient-to-r from-red-500 via-rose-500 to-amber-500"
                        : "bg-gradient-to-r from-[#0c6e73] via-[#119197] to-teal-400"
                    }`}
                  />

                  <div className="p-6">
                    {/* Top Row: Sequential Order Badge + Category + Date */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-2">
                        {/* Order Number Badge */}
                        <span className="h-6 px-2.5 rounded-full bg-slate-900 text-white font-mono text-[11px] font-black flex items-center justify-center shadow-xs">
                          #{storyNumber}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${badge.bg} ${badge.text}`}
                        >
                          {isOutbreak && (
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse" />
                          )}
                          {badge.label}
                        </span>
                      </div>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <IconClock size={12} />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Cluster Zone Indicator if Outbreak */}
                    {isOutbreak && post.cluster_region && (
                      <div className="mb-3.5 px-3 py-2 rounded-2xl bg-red-50/90 border border-red-200/80 flex items-center justify-between text-[11px] text-red-900 font-semibold shadow-xs">
                        <span className="flex items-center gap-1.5 truncate">
                          <span className="text-red-600 font-bold">📍</span>
                          <span className="truncate">{post.cluster_region}</span>
                        </span>
                        <span className="text-[10px] bg-red-200/90 text-red-950 px-2 py-0.5 rounded-full font-black shrink-0">
                          {post.cluster_count || 3}+ Reports
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-base font-extrabold text-slate-900 group-hover:text-[#0c6e73] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {post.excerpt || post.content.slice(0, 140) + "..."}
                    </p>
                  </div>

                  {/* Bottom: Relief Campaign Box or Author */}
                  <div className="p-6 pt-0">
                    {post.has_relief ? (
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 via-emerald-50/50 to-teal-50/30 border border-teal-200/70 shadow-xs">
                        <div className="flex items-center justify-between text-[11px] mb-2">
                          <span className="font-bold text-teal-950 flex items-center gap-1.5">
                            <span className="p-1 rounded-md bg-rose-100 text-rose-600">
                              <IconHeart size={12} />
                            </span>
                            Emergency Relief Vault
                          </span>
                          <span className="font-black text-[#0c6e73] bg-teal-100/80 px-2 py-0.5 rounded-md text-[10px]">
                            {percentRaised}% Funded
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-teal-200/50 rounded-full h-2 overflow-hidden mb-2.5 p-0.5">
                          <div
                            className="bg-gradient-to-r from-[#119197] to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${percentRaised}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-600 font-medium">
                          <span>
                            Raised: <strong className="text-slate-900 font-bold">{post.relief_raised.toLocaleString()} ETB</strong>
                          </span>
                          <span>
                            Target: <strong className="text-slate-900 font-bold">{post.relief_goal.toLocaleString()} ETB</strong>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3.5">
                        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                          <span className="h-5 w-5 rounded-full bg-teal-50 flex items-center justify-center text-[#119197]">
                            <IconShield size={11} />
                          </span>
                          {post.author_name}
                        </span>
                        <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          {post.views_count} views
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      {/* ── MODAL 1: ARTICLE READER & RELIEF PLEDGE ── */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col my-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                    categoryBadges[selectedPost.category]?.bg || "bg-teal-50"
                  } ${categoryBadges[selectedPost.category]?.text || "text-teal-700"}`}
                >
                  {categoryBadges[selectedPost.category]?.label || "Bulletin"}
                </span>
                {selectedPost.ai_generated ? (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                    Verified AI Synthesis
                  </span>
                ) : null}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span>By <strong>{selectedPost.author_name}</strong></span>
                  <span>•</span>
                  <span>{new Date(selectedPost.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span>•</span>
                  <span>{selectedPost.views_count} views</span>
                </div>
              </div>

              {/* Cluster Zone Alert if Outbreak */}
              {selectedPost.category === "outbreak" && selectedPost.cluster_region && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <IconAlertTriangle size={16} className="text-red-600" />
                    <span>Active Community Health Cluster Detected in {selectedPost.cluster_region}</span>
                  </div>
                  <p className="text-red-800 leading-relaxed">
                    Triggered after {selectedPost.cluster_count || 3} independent resident reports. Review standard emergency instructions below.
                  </p>
                </div>
              )}

              {/* Main Content Body (Rich Structured Cards) */}
              <div className="pt-2">
                {renderArticleContent(selectedPost.content, selectedPost)}
              </div>

              {/* ── RELIEF / GOFUNDME CAMPAIGN MODULE ── */}
              {selectedPost.has_relief ? (
                <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-teal-900 via-[#0c6e73] to-cyan-900 text-white shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-400/20 text-teal-200 text-[11px] font-bold mb-2">
                        <IconHeart size={12} className="text-rose-400" />
                        Community Emergency Relief Initiative
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {selectedPost.relief_beneficiary || "Emergency Patient Support"}
                      </h3>
                      <p className="text-xs text-teal-100/90 mt-1 max-w-xl">
                        {selectedPost.relief_description ||
                          "Help provide clean water purification, essential hydration salts, and antibiotics for families in affected zones."}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowPledgeForm(true)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs shadow-lg hover:shadow-emerald-400/20 hover:scale-105 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                      Pledge Support (ETB)
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{selectedPost.relief_raised.toLocaleString()} ETB Raised</span>
                      <span className="text-teal-300">
                        {Math.min(100, Math.round((selectedPost.relief_raised / selectedPost.relief_goal) * 100))}% of {selectedPost.relief_goal.toLocaleString()} ETB Goal
                      </span>
                    </div>
                    <div className="w-full bg-teal-950/60 rounded-full h-3 overflow-hidden p-0.5 border border-teal-500/30">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round((selectedPost.relief_raised / selectedPost.relief_goal) * 100)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Recent Supporters Carousel/List */}
                  {pledges.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-teal-800/80">
                      <h4 className="text-xs font-bold text-teal-200 mb-3 flex items-center gap-1.5">
                        <IconUsers size={14} />
                        Recent Solidarity Supporters ({pledges.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-40 overflow-y-auto pr-1">
                        {pledges.map((pl) => (
                          <div
                            key={pl.id}
                            className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-700/50 text-[11px] flex items-center justify-between"
                          >
                            <div>
                              <strong className="text-white block">{pl.donor_name}</strong>
                              {pl.message && (
                                <span className="text-teal-200/80 italic text-[10px] block truncate max-w-[180px]">
                                  "{pl.message}"
                                </span>
                              )}
                            </div>
                            <span className="font-black text-emerald-400 shrink-0">
                              +{pl.amount_etb.toLocaleString()} ETB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* ── PLEDGE FORM OVERLAY IF ACTIVE ── */}
              {showPledgeForm && (
                <div className="p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200 shadow-md animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <IconHeart size={16} className="text-rose-600" />
                      Make a Community Relief Support Donation
                    </h3>
                    <button
                      onClick={() => setShowPledgeForm(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                    >
                      <IconX size={16} />
                    </button>
                  </div>

                  {pledgeSuccess ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-3">
                      <IconCheck size={20} className="text-emerald-600 shrink-0" />
                      <span>{pledgeSuccess}</span>
                    </div>
                  ) : (
                    <form onSubmit={handlePledgeSubmit} className="space-y-4">
                      {/* Anonymous Option */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                          <input
                            type="checkbox"
                            checked={pledgeIsAnonymous}
                            onChange={(e) => {
                              setPledgeIsAnonymous(e.target.checked)
                              if (e.target.checked) setPledgeDonorName("")
                            }}
                            className="rounded text-[#119197] focus:ring-[#119197] h-4 w-4"
                          />
                          <span>Donate as Anonymous (Hide my name publicly)</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Privacy Guard
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Donor Name {pledgeIsAnonymous ? "(Anonymous Selected)" : "*"}
                          </label>
                          <input
                            type="text"
                            disabled={pledgeIsAnonymous}
                            placeholder={pledgeIsAnonymous ? "Anonymous Supporter" : "e.g., Almaz Kebede"}
                            value={pledgeIsAnonymous ? "" : pledgeDonorName}
                            onChange={(e) => setPledgeDonorName(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197] disabled:bg-slate-100 disabled:text-slate-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Phone / Contact (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="+251 9..."
                            value={pledgePhone}
                            onChange={(e) => setPledgePhone(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                          />
                        </div>
                      </div>

                      {/* Quick Amount Selectors */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                          Donation Amount (ETB) *
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {[100, 250, 500, 1000, 2500, 5000].map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => setPledgeAmount(amt)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                pledgeAmount === amt
                                    ? "bg-[#119197] text-white shadow-sm"
                                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              {amt} ETB
                            </button>
                          ))}
                        </div>
                        <input
                          type="number"
                          min="10"
                          required
                          value={pledgeAmount}
                          onChange={(e) => setPledgeAmount(parseFloat(e.target.value) || 0)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                        />
                      </div>

                      {/* Payment Method Selector */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Payment Method Channel *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setPledgePaymentMethod("Telebirr")}
                            className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                              pledgePaymentMethod === "Telebirr"
                                ? "bg-teal-50 border-[#119197] ring-2 ring-[#119197]/30"
                                : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#0c6e73]">Telebirr (ቴሌብር)</span>
                              <span className="text-[10px] bg-teal-100 text-[#0c6e73] font-bold px-1.5 py-0.5 rounded">Mobile</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">Instant digital payment</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPledgePaymentMethod("CBE")}
                            className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                              pledgePaymentMethod === "CBE"
                                ? "bg-purple-50/70 border-purple-600 ring-2 ring-purple-600/30"
                                : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-purple-900">CBE (ንግድ ባንክ)</span>
                              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">Bank</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">Commercial Bank of Ethiopia</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPledgePaymentMethod("BOA")}
                            className={`p-3 rounded-2xl text-left transition-all cursor-pointer border ${
                              pledgePaymentMethod === "BOA"
                                ? "bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/30"
                                : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-amber-900">Abyssinia (BOA)</span>
                              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded">Bank</span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1">Bank of Abyssinia</p>
                          </button>
                        </div>
                      </div>

                      {/* Dynamic Account Details Box */}
                      <div className="p-4 rounded-2xl bg-white border border-teal-200/80 shadow-xs">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800 mb-2 flex items-center justify-between">
                          <span>Verified Payment Destination Details</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                            Official Relief Vault
                          </span>
                        </div>

                        {pledgePaymentMethod === "Telebirr" ? (
                          <div className="space-y-1.5 text-xs text-slate-700">
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                              <span className="text-slate-500">Account Type:</span>
                              <strong className="text-slate-900">Telebirr Merchant / Phone</strong>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                              <span className="text-slate-500">Account Holder Name:</span>
                              <strong className="text-[#0c6e73]">Tenaye Emergency Healthcare Relief Fund</strong>
                            </div>
                            <div className="flex justify-between items-center py-1">
                              <span className="text-slate-500">Telebirr Number:</span>
                              <span className="font-mono font-black text-sm text-[#119197] bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-200">
                                0911 22 33 44
                              </span>
                            </div>
                          </div>
                        ) : pledgePaymentMethod === "CBE" ? (
                          <div className="space-y-1.5 text-xs text-slate-700">
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                              <span className="text-slate-500">Bank:</span>
                              <strong className="text-purple-900">Commercial Bank of Ethiopia (CBE / የኢትዮጵያ ንግድ ባንክ)</strong>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                              <span className="text-slate-500">Account Holder Name:</span>
                              <strong className="text-purple-950">Tenaye Emergency Healthcare Relief Fund</strong>
                            </div>
                            <div className="flex justify-between items-center py-1">
                              <span className="text-slate-500">CBE Account Number:</span>
                              <span className="font-mono font-black text-sm text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                                1000293847291
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1.5 text-xs text-slate-700">
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                              <span className="text-slate-500">Bank:</span>
                              <strong className="text-amber-900">Bank of Abyssinia (BOA)</strong>
                            </div>
                            <div className="flex justify-between items-center py-1 border-b border-slate-100">
                              <span className="text-slate-500">Account Holder Name:</span>
                              <strong className="text-amber-950">Tenaye Community Emergency Support Initiative</strong>
                            </div>
                            <div className="flex justify-between items-center py-1">
                              <span className="text-slate-500">BOA Account Number:</span>
                              <span className="font-mono font-black text-sm text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-200">
                                1845920194821
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Receipt Upload Option */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Upload Payment Receipt / Screenshot * (Image for verification)
                        </label>
                        <div className="border-2 border-dashed border-slate-300 hover:border-[#119197] rounded-2xl p-4 text-center bg-white transition-colors cursor-pointer relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleReceiptUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {pledgeReceiptImage ? (
                            <div className="flex items-center justify-center gap-3">
                              <img
                                src={pledgeReceiptImage}
                                alt="Receipt Preview"
                                className="h-12 w-12 object-cover rounded-lg border border-slate-300"
                              />
                              <div className="text-left text-xs">
                                <p className="font-bold text-emerald-700 flex items-center gap-1">
                                  <IconCheck size={14} /> Receipt Attached
                                </p>
                                <p className="text-[10px] text-slate-500 truncate max-w-[200px]">
                                  {pledgeReceiptName || "receipt.png"}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1 text-xs text-slate-500">
                              <p className="font-bold text-slate-700">Click or drag & drop receipt screenshot</p>
                              <p className="text-[10px] text-slate-400">Supports PNG, JPG, or screenshot image (Max 5MB)</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Encouraging Message */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Encouraging Message (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Wishing speedy recovery for all families."
                          value={pledgeMessage}
                          onChange={(e) => setPledgeMessage(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={pledgeSubmitting || pledgeAmount <= 0}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-black text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
                      >
                        {pledgeSubmitting ? "Submitting Donation..." : `Submit ${pledgeAmount} ETB Donation for Verification`}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedPost.title,
                      text: selectedPost.excerpt,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert("Article link copied to clipboard!")
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <IconShare size={15} />
                <span>Share Bulletin</span>
              </button>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: COMMUNITY OUTBREAK REPORT FORM ── */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col my-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-black">
                  <IconAlertTriangle size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Community Health & Outbreak Report
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Alert Tenaye AI surveillance of unusual health symptoms in your area
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6">
              {reportSuccess ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    <strong className="block text-emerald-900 mb-1">
                      ✅ Report Registered Successfully
                    </strong>
                    {reportSuccess}
                  </div>

                  {clusterAlertNotice && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-900 text-xs font-bold leading-relaxed">
                      {clusterAlertNotice}
                    </div>
                  )}

                  <button
                    onClick={() => setShowReportModal(false)}
                    className="w-full py-2.5 rounded-xl bg-[#119197] text-white font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  {/* Reporter Name & Anonymous toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-bold text-slate-700">
                        Reporter Name
                      </label>
                      <label className="flex items-center gap-1.5 text-[11px] text-slate-500 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="rounded text-[#119197] focus:ring-[#119197]"
                        />
                        <span>Report Anonymously</span>
                      </label>
                    </div>
                    {!isAnonymous && (
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                      />
                    )}
                  </div>

                  {/* Contact Info (Mandatory) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Phone Number or Email Address * <span className="text-red-500 font-semibold">(Mandatory for Clinical Verification)</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., +251 911 234567 or reporter@domain.com"
                      value={reporterContact}
                      onChange={(e) => setReporterContact(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Required by health officers to confirm location specifics and verify local outbreak alerts.
                    </p>
                  </div>

                  {/* Location Zone */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Location / Sub-City or Regional Zone *
                    </label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                    >
                      {ETHIOPIAN_ZONES.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>

                    {/* New Input Part for Other Regional City / Zone */}
                    {selectedZone === "Other Regional City / Zone" && (
                      <div className="mt-2.5 p-3 rounded-2xl bg-teal-50/70 border border-teal-200 animate-fade-in">
                        <label className="block text-[11px] font-bold text-teal-900 mb-1">
                          Specify Your City, Town, or Regional Zone *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Harar - Jugol, Dessie, Jimma, Jigjiga, Gambela..."
                          value={customZone}
                          onChange={(e) => setCustomZone(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-teal-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Suspected Epidemic Disease */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Suspected Epidemic Disease / Outbreak *
                    </label>
                    <select
                      value={selectedSymptom}
                      onChange={(e) => setSelectedSymptom(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                    >
                      {EPIDEMIC_DISEASES.map((sym) => (
                        <option key={sym} value={sym}>
                          {sym}
                        </option>
                      ))}
                    </select>

                    {selectedSymptom.startsWith("Other Epidemic") && (
                      <input
                        type="text"
                        required
                        placeholder="Please specify the epidemic disease or observed condition..."
                        value={customSymptom}
                        onChange={(e) => setCustomSymptom(e.target.value)}
                        className="mt-2 w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                      />
                    )}
                  </div>

                  {/* Affected Count & Severity */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        People Affected (Approx)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={affectedCount}
                        onChange={(e) => setAffectedCount(parseInt(e.target.value, 10) || 1)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Urgency Level
                      </label>
                      <select
                        value={severityLevel}
                        onChange={(e) => setSeverityLevel(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                      >
                        <option value="low">Low - Mild symptoms</option>
                        <option value="medium">Medium - Spreading in area</option>
                        <option value="high">High - Severe sickness</option>
                        <option value="urgent">Urgent - Emergency / Critical</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Environmental Details & Context
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Several neighbors experiencing sudden diarrhea after drinking from local well, need water testing."
                      value={reportNotes}
                      onChange={(e) => setReportNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#119197]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={reportSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-red-950/20 transition-all cursor-pointer"
                    >
                      {reportSubmitting ? "Transmitting Health Report..." : "Submit Community Report"}
                    </button>
                    <p className="text-[10px] text-slate-400 text-center mt-2">
                      🔒 Reports are analyzed in aggregate by Tenaye AI to protect public health while safeguarding reporter privacy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
