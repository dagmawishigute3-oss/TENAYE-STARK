/**
 * File: src/components/AIAssistant.tsx
 * Tenaye Assistance — Clean, Beautiful Chatbot UI
 * Powered by official Voxide SDK:
 *   • Single-turn authoritative messaging (ZERO duplications)
 *   • Interactive Voice UI (VoiceStage.tsx) opens on mic click with concentric animated ripples
 *   • Clean shortcut questions without emojis
 *   • Safe React Router navigation
 *   • Compact widget & Fullscreen workspace modes
 */

import { useState, useRef, useEffect, useCallback } from "react"

import {
  IconBot,
  IconX,
  IconTrash,
  IconMaximize,
  IconMinimize,
  IconMic,
  IconMicOff,
  IconArrowLeft,
  IconVolume2,
  IconVolumeX,
  IconAlertTriangle,
  IconPhone,
  IconMapPin,
  IconCheck,
  IconArrowRight,
  IconStethoscope,
  IconSend,
} from "./Icons"

import { VoiceStage } from "./VoiceStage"

import {
  ai,
  resolveSpokenPage,
  setCurrentLanguage,
  getCurrentLanguage,
  getSharedAudioContext,
  resetVoxideSession,
  setVoiceMuted,
  getClinicalResponse,
  filterClinicalSections,
  navigateTo,
} from "./Assistant"

import {
  devanagariToEnglish,
  normalizeMarkdownText,
  cleanSpokenTranscript,
  cleanBilingualOutput,
  cleanVoiceSubtitle,
  speakText,
} from "./textSanitizer"

import {
  matchSymptomsToDiseases,
  isEducationalOrDiseaseInquiry,
  generateDetailedSymptomDifferentialReport,
  DiseaseMatchResult,
} from "../services/symptomMatcherService"

import {
  resolveEmergencyAction,
  isEmergencyOrFirstAidQuery,
  EmergencyActionPayload,
} from "../services/firstAidHospitalService"

import { queryGeminiClinical } from "../services/geminiService"

import { ALL_DISEASES } from "../data/diseasesIndex"

/* ── Types ── */

interface Msg {
  id: number

  role: "ai" | "user"

  text: string

  time: string

  diseaseMatches?: DiseaseMatchResult[]

  shortcutDiseases?: { id: string; name: string; amharicName?: string }[]

  emergencyAction?: EmergencyActionPayload
}

type ChatVoiceState = "idle" | "connecting" | "listening" | "thinking" | "speaking" | "error"

/* ── Helpers ── */

const now12 = () => {
  const d = new Date()

  let h = d.getHours()

  const m = d.getMinutes().toString().padStart(2, "0")

  const p = h >= 12 ? "PM" : "AM"

  h = h % 12 || 12

  return `${h}:${m} ${p}`
}

let idCounter = 0

const ts = () => Date.now() * 1000 + (++idCounter % 1000)

/* ── Initial Welcome Messages ── */

const WELCOME_EN: Msg = {
  id: 0,

  role: "ai",

  time: now12(),

  text: "Hello! I'm Tenaye Assistance (ጤናዬ). I can help with:\n\n• Evidence-based disease information & research\n• Clinical symptom analysis & differential diagnosis\n• Step-by-step first aid procedures & emergency triage (907)\n• Prevention, healthy living & wellness tips\n\nType your question below, or tap the microphone to speak naturally in English or አማርኛ!",
}

const WELCOME_AM: Msg = {
  id: 0,

  role: "ai",

  time: now12(),

  text: "ሰላም! የጤናዬ ረዳት (Tenaye Assistance) ነኝ። በሚከተሉት የጤና ጉዳዮች ልረዳዎ እችላለሁ፡\n\n• በማስረጃ የተደገፈ የበሽታዎች መረጃና ህክምና\n• የበሽታ ምልክቶች ትንተና እና ምክር\n• የድንገተኛ አደጋ 907 እና ደረጃ በደረጃ የመጀመሪያ እርዳታ\n• ጤናማ የአኗኗር ዘይቤ እና የመከላከያ መንገዶች\n\nጥያቄዎን ከታች ይጻፉ ወይም ማይክሮፎኑን ተጭነው በአማርኛ ወይም በእንግሊዝኛ ያናግሩኝ!",
}

const WELCOME = WELCOME_EN

// Clean shortcut questions with NO emojis (English & Amharic)

const QUICK_QUESTIONS_EN = [
  {
    label: "Bleeding first aid & hospital",
    q: "One person is bleeding on their leg, tell me the first aid and find me a nearby hospital",
  },

  {
    label: "Headache and fever symptoms",
    q: "I feel headache, high fever and fatigue — what could it be?",
  },

  {
    label: "Diabetes symptoms",
    q: "Tell me about diabetes symptoms, causes and treatments",
  },

  {
    label: "Diarrhea care & treatment",
    q: "What are the symptoms, causes and home care for diarrhea?",
  },

  {
    label: "Warning signs of stroke",
    q: "What are the emergency warning signs of a stroke?",
  },

  {
    label: "COVID-19 symptoms",
    q: "What are the symptoms, causes and prevention for COVID-19?",
  },

  { label: "Malaria prevention", q: "How can I prevent malaria in Ethiopia?" },

  {
    label: "Who made this website?",
    q: "Who is the founder and team behind Tenaye?",
  },
]

const QUICK_QUESTIONS_AM = [
  {
    label: "የደም መፍሰስ እርዳታና ሆስፒታል",
    q: "አንድ ሰው እግሩ ላይ ደም እየፈሰሰ ነው፤ የመጀመሪያ እርዳታ እና በአቅራቢያዬ ያለ ሆስፒታል ንገረኝ",
  },

  {
    label: "ራስ ምታት እና ትኩሳት ምልክቶች",
    q: "ራስ ምታት፣ ከፍተኛ ትኩሳት እና ድካም ይሰማኛል፤ ምን ሊሆን ይችላል?",
  },

  { label: "የስኳር በሽታ ምልክቶች", q: "ስለ ስኳር በሽታ ምልክቶች፣ መንስኤዎች እና ህክምና ንገረኝ" },

  { label: "የተቅማጥ ህክምና", q: "የተቅማጥ ምልክቶች፣ መንስኤዎች እና የቤት ውስጥ ህክምና ምንድን ናቸው?" },

  { label: "የስትሮክ ምልክቶች", q: "አስቸኳይ የስትሮክ ምልክቶች እና የመጀመሪያ እርዳታ ምንድን ናቸው?" },

  { label: "የወባ መከላከያ", q: "በኢትዮጵያ ወባን እንዴት መከላከል ይቻላል?" },

  { label: "የጤናዬ መስራቾች ማን ናቸው?", q: "የጤናዬ (Tenaye) መስራቾች እና ቡድን ማን ናቸው?" },
]

const QUICK_QUESTIONS = QUICK_QUESTIONS_EN

/* ── Confirm-clear dialog ── */

function ClearConfirmDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-[inherit] animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-3">
        <IconBot size={22} className="text-amber-500" />
      </div>
      <h3 className="font-display font-bold text-gray-900 text-base mb-1 text-center">
        Clear Chat History?
      </h3>
      <p className="text-sm text-gray-400 text-center leading-relaxed mb-6 max-w-[240px]">
        All messages will be permanently deleted. This action cannot be undone.
      </p>
      <div className="flex gap-2 w-full">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold transition-colors cursor-pointer shadow-xs"
        >
          Clear History
        </button>
      </div>
    </div>
  )
}

/* ── AI typing indicator ── */

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0c6e73] to-[#119197] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
        <IconBot size={13} />
      </div>
      <div className="flex flex-col gap-1 max-w-[85%]">
        <span className="text-[10px] font-bold text-[#119197]">
          Tenaye Assistance
        </span>
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-xs w-fit">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#119197] animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#119197] animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#119197] animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Merges streaming AI text fragments safely with strict deduplication.
 * Eliminates infinite repetition by checking line-by-line containment and
 * removing blind continuation concatenation.
 */

function mergeAiStreamingText(existing: string, incoming: string): string {
  if (!existing) return incoming

  if (!incoming) return existing

  const ex = existing.trim()

  const inc = incoming.trim()

  if (ex === inc) return ex

  // 1. If incoming starts with a major clinical section header, it represents a structured response

  const isMajorHeader = (s: string) =>
    /^(\*\*|#+\s*)?(overview|አጠቃላይ መግለጫ|tenaye|የጤናዬ|clinical|emergency|የአደጋ ጊዜ|key symptoms|ዋና ዋና ምልክቶች)/i.test(
      s,
    )

  if (isMajorHeader(inc) && isMajorHeader(ex)) {
    return inc.length >= ex.length ? inc : ex
  }

  // 2. Prefix checks (cumulative streaming)

  if (inc.startsWith(ex)) return inc

  if (ex.startsWith(inc)) return ex

  // 3. Substring inclusion checks

  if (inc.includes(ex)) return inc

  if (ex.includes(inc)) return ex

  // 4. Suffix-prefix overlap (stitch streaming chunks together)

  const maxOverlap = Math.min(ex.length, inc.length, 120)

  for (let len = maxOverlap; len >= 6; len--) {
    const exSuffix = ex.slice(-len)

    if (inc.startsWith(exSuffix)) {
      return ex + inc.slice(len)
    }
  }

  // 5. Line-by-line deduplication:

  // If all non-empty lines in incoming already exist in existing, do NOT append!

  const incLines = inc
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 2)

  const exLines = ex
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 2)

  const existingContainsAll =
    incLines.length > 0 && incLines.every((l) => ex.includes(l))

  if (existingContainsAll) {
    return ex
  }

  // 6. If incoming contains substantial portion of existing, choose the longer

  const commonLines = incLines.filter((l) => ex.includes(l))

  if (
    commonLines.length > 0 &&
    commonLines.length >= Math.min(incLines.length, exLines.length) * 0.4
  ) {
    return inc.length >= ex.length ? inc : ex
  }

  // 7. Suffix append for genuine continuation chunks

  const genuinelyNewLines = incLines.filter((l) => !ex.includes(l))

  if (
    genuinelyNewLines.length > 0 &&
    genuinelyNewLines.length < incLines.length
  ) {
    const joiner = ex.endsWith("\n") ? "" : "\n"

    return ex + joiner + genuinelyNewLines.join("\n")
  }

  // 8. Default to the longer/more complete text

  return inc.length >= ex.length ? inc : ex
}

/* ── Clean Rich Text Formatter ── */

function FormattedMessage({ text }: { text: string }) {
  if (!text) return null

  const hasCursor = text.endsWith(" ▋")

  const rawText = hasCursor ? text.slice(0, -2) : text

  const normalized = normalizeMarkdownText(rawText)

  const lines = normalized.split("\n")

  // Known clinical topic headers

  const isSectionHeader = (line: string): boolean => {
    const s = line.trim()

    if (!s || s.length < 3 || s.length > 80) return false

    // Sentences ending in ? or ! or numbered lists are never section headers

    if (/[?!]$/.test(s) || /^\d+[.)፡]/.test(s)) return false

    // Acronym letters like **F**, **A**, **S**, **T** are bold prefixes, NOT section headers

    if (/^\*+[A-Z]\*+[:.]?$/.test(s)) return false

    const stripped = s
      .replace(/^#+\s*/, "")
      .replace(/^\*+|\*+$/g, "")
      .trim()

    // Known medical section keywords (English & Amharic)

    const headerRegex =
      /^(?:(?:ዋና\s+ዋና\s+)?(ምልክቶች|መንስኤዎች|ህክምና\s+እና\s+እንክብካቤ|መፍትሔ\s+እና\s+እንክብካቤ|ህክምና\s+እና\s+የቤት\s+ውስጥ(?:\s+እንክብካቤ)?|የቤት\s+ውስጥ\s+እንክብካቤ|ህክምና|መከላከያ|ምርመራ|አጠቃላይ\s+መግለጫ|የመጀመሪያ\s+እርዳታ|የአደጋ\s+ጊዜ\s+ጥሪ|የስትሮክ\s+ምልክቶች)(?:\s*\(.*?\))?(?:\s+የሚከተሉትን?\s+(?:ያካትታሉ|ናቸው))?|(?:Main\s+)?(Symptoms|Causes|Home\s+Care\s*&\s*Treatment|Home\s+Care|Treatment|Prevention|Care|Diagnosis|Overview|Risk\s+Factors|Warning\s+Signs|Emergency\s+Warning\s+Signs|FAST\s+Warning\s+Signs|Emergency\s+Warning\s+Signs\s+\(FAST\)|Immediate\s+Actions|First\s+Aid|Emergency\s+Hotline))(?:\s*\(.*?\))?[:፡]?$/i

    if (headerRegex.test(stripped)) {
      return true
    }

    // Markdown headers ###

    if (/^#{1,3}\s+/.test(s)) return true

    // Explicit markdown bold header with colon: **Header:** (length <= 60)

    if (
      s.startsWith("**") &&
      s.endsWith("**") &&
      /[:፡]\*\*$/.test(s) &&
      stripped.length <= 60
    ) {
      return true
    }

    return false
  }

  const cursorSpan = hasCursor ? (
    <span className="inline-block w-1.5 h-3.5 bg-[#119197] ml-1.5 animate-pulse rounded-xs align-middle" />
  ) : null

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const isLast = idx === lines.length - 1

        const trimmed = line.trim()

        if (!trimmed) {
          return (
            <div key={idx} className="h-1">
              {isLast && cursorSpan}
            </div>
          )
        }

        // Filter out solitary bullets on empty lines (e.g. "•" or "-" or "*")

        if (/^[•*-]\s*$/.test(trimmed)) {
          return isLast ? <div key={idx}>{cursorSpan}</div> : null
        }

        // Recognized bold section headers (e.g. "**Symptoms:**", "**Causes:**", "**ምልክቶች፡**")

        if (isSectionHeader(trimmed)) {
          const cleanHeader = trimmed

            .replace(/^#+\s*/, "")

            .replace(/^\*\*/, "")

            .replace(/\*\*$/, "")

            .trim()

          return (
            <p
              key={idx}
              className="font-bold text-[#0c6e73] text-[13px] pt-2.5 pb-0.5 tracking-wide"
            >
              {cleanHeader}
              {isLast && cursorSpan}
            </p>
          )
        }

        // Bullet point (•, -, or *)

        if (
          trimmed.startsWith("•") ||
          trimmed.startsWith("- ") ||
          trimmed.startsWith("* ")
        ) {
          const bulletContent = trimmed.replace(/^[•*-]\s*/, "").trim()

          if (!bulletContent)
            return isLast ? <div key={idx}>{cursorSpan}</div> : null

          // If bullet line is accidentally a header: e.g. "• Causes:"

          if (isSectionHeader(bulletContent)) {
            const cleanHeader = bulletContent

              .replace(/^\*\*/, "")

              .replace(/\*\*$/, "")

              .trim()

            return (
              <p
                key={idx}
                className="font-bold text-[#0c6e73] text-[13px] pt-2.5 pb-0.5 tracking-wide"
              >
                {cleanHeader}
                {isLast && cursorSpan}
              </p>
            )
          }

          return (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs leading-relaxed text-gray-700 pl-1 py-0.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#119197] shrink-0 mt-1.5" />
              <span className="flex-1">
                {parseBold(bulletContent)}
                {isLast && cursorSpan}
              </span>
            </div>
          )
        }

        // Numbered list item (e.g. "1. ", "2. ")

        const matchNum = trimmed.match(/^(\d+)[.)፡]\s+(.*)$/)

        if (matchNum) {
          return (
            <div
              key={idx}
              className="flex items-start gap-2 text-xs leading-relaxed text-gray-700 pl-1 py-0.5"
            >
              <span className="font-bold text-[#0c6e73] text-[11px] shrink-0 mt-0.5">
                {matchNum[1]}.
              </span>
              <span className="flex-1">
                {parseBold(matchNum[2])}
                {isLast && cursorSpan}
              </span>
            </div>
          )
        }

        // Standard text paragraph (e.g. disease 1-2 sentence definition)

        return (
          <p key={idx} className="text-xs leading-relaxed text-gray-800">
            {parseBold(trimmed)}
            {isLast && cursorSpan}
          </p>
        )
      })}
    </div>
  )
}

function parseBold(str: string) {
  if (!str) return null

  // Strip any rogue triple/quadruple asterisks or solitary asterisks while preserving **bold**

  let cleaned = str.replace(/\*{3,}/g, "").replace(/(^|[^\*])\*(?!\*)/g, "$1")

  // Auto-balance unclosed **

  const starCount = (cleaned.match(/\*\*/g) || []).length

  if (starCount % 2 !== 0) {
    cleaned += "**"
  }

  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g)

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      )
    }

    return <span key={i}>{part}</span>
  })
}

/* ── Interactive Disease Prediction Card ── */

function DiseasePredictionCard({
  match,

  onNavigate,
}: {
  match: DiseaseMatchResult

  onNavigate: (path: string) => void
}) {
  const { disease, matchedSymptoms } = match

  const isSevere = disease.severity === "High"

  const isModerate = disease.severity === "Medium"

  return (
    <div className="mt-2.5 p-3.5 bg-gradient-to-br from-teal-50/70 via-white to-teal-50/30 border border-teal-200/90 rounded-2xl shadow-xs transition-all hover:border-[#119197]">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <h4 className="font-bold text-[#0c6e73] text-sm leading-tight">
              {disease.name}
            </h4>
            {disease.amharicName && (
              <span className="text-[11px] text-teal-700 font-medium">
                ({disease.amharicName})
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {disease.category}
          </span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
            isSevere
              ? "bg-red-50 text-red-700 border border-red-200"
              : isModerate
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          {disease.severity}
        </span>
      </div>

      <p className="text-xs text-gray-600 line-clamp-2 mb-2.5 leading-relaxed">
        {disease.description || disease.desc || disease.overview || ""}
      </p>

      {/* Matched Symptoms Tags */}
      {matchedSymptoms.length > 0 && (
        <div className="mb-3">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Matched Symptoms:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {matchedSymptoms.map((sym, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-teal-100/70 text-[#0c6e73]"
              >
                <IconCheck size={10} className="stroke-[3]" />
                <span className="capitalize">{sym}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-teal-100/80">
        <button
          onClick={() => onNavigate(`/diseases/${disease.id}`)}
          className="flex-1 py-1.5 px-3 rounded-xl bg-[#119197] hover:bg-[#0c6e73] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <span>Full Guide & Treatments</span>
          <IconArrowRight size={13} />
        </button>
        <button
          onClick={() => onNavigate("/symptoms")}
          title="Open in Symptom Checker"
          className="py-1.5 px-2.5 rounded-xl border border-teal-200 hover:border-[#119197] hover:bg-teal-50 text-[#0c6e73] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <IconStethoscope size={13} />
          <span>Checker</span>
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Emergency & Hospital Card ── */

function EmergencyHospitalCard({
  action,

  onNavigate,
}: {
  action: EmergencyActionPayload

  onNavigate: (path: string) => void
}) {
  return (
    <div className="mt-2.5 space-y-2.5">
      {/* Immediate Steps Checklist */}
      {action.firstAidSteps.length > 0 && (
        <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-2xs">
          <h5 className="font-bold text-gray-900 text-xs mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#119197]" />
            Immediate Action Checklist:
          </h5>
          <div className="space-y-1.5">
            {action.firstAidSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed"
              >
                <span className="w-4 h-4 rounded-full bg-teal-50 border border-teal-200 text-[#0c6e73] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="flex-1">{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verified Nearby Hospitals */}
      {action.closestHospitals && action.closestHospitals.length > 0 && (
        <div className="p-3 bg-white border border-gray-200 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
              <IconMapPin size={13} className="text-[#119197]" />
              Nearby Verified Facilities:
            </h5>
            <span className="text-[10px] text-gray-400 font-medium">
              GPS Grounded
            </span>
          </div>
          <div className="space-y-1.5">
            {action.closestHospitals.slice(0, 3).map((h) => {
              const callNumber = h.phone || h.emergencyPhone || "907"

              return (
                <div
                  key={h.id}
                  className="p-2 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-2 hover:bg-teal-50/50 hover:border-teal-100 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 text-xs truncate">
                      {h.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {h.city}{" "}
                      {h.distanceKm != null ? `• ${h.distanceKm} km away` : ""}
                    </p>
                  </div>
                  <a
                    href={`tel:${callNumber.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0c6e73] hover:bg-[#119197] text-white text-[11px] font-bold shrink-0 transition-colors shadow-2xs cursor-pointer"
                  >
                    <IconPhone size={11} />
                    <span>Call</span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Urgent Dispatch Action Buttons */}
      <div className="flex items-center gap-2">
        <a
          href="tel:907"
          className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <IconPhone size={13} />
          <span>Call 907 Ambulance</span>
        </a>
        <button
          onClick={() => onNavigate("/emergency")}
          className="py-2 px-3 rounded-xl border border-gray-200 hover:border-[#119197] hover:bg-teal-50 text-gray-700 hover:text-[#0c6e73] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Emergency Hub</span>
          <IconArrowRight size={13} />
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   MAIN AIAssistant COMPONENT
══════════════════════════════════════════ */

export function AIAssistant() {
  const [open, setOpen] = useState(false)

  const [fullscreen, setFullscreen] = useState(false)

  const [input, setInput] = useState("")

  const [currentLang, setCurrentLang] = useState<"en" | "am">(() =>
    getCurrentLanguage(),
  )

  const [soundEnabled, setSoundEnabled] = useState(true)

  const [msgs, setMsgs] = useState<Msg[]>([WELCOME_EN])

  const [confirmClear, setConfirmClear] = useState(false)

  // Sync refs for event listeners

  const currentLangRef = useRef(currentLang)

  currentLangRef.current = currentLang

  const soundEnabledRef = useRef(soundEnabled)

  soundEnabledRef.current = soundEnabled

  // Active Speech Narration ref for Web Speech API

  const currentSpeechCancelRef = useRef<(() => void) | null>(null)

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev

      soundEnabledRef.current = next

      setVoiceMuted(!next)

      if (!next) {
        if (currentSpeechCancelRef.current) {
          try {
            currentSpeechCancelRef.current()
          } catch {}

          currentSpeechCancelRef.current = null
        }

        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel()
        }
      }

      return next
    })
  }, [])

  // Language enforcement & message tracking refs

  const userTurnLanguageRef = useRef<"en" | "am">(currentLang)

  const activeAiMessageIdRef = useRef<number | null>(null)

  const activeUserMessageIdRef = useRef<number | null>(null)

  // Progressive Typewriter Engine refs

  const targetAiTextRef = useRef<string>("")

  const displayedAiTextRef = useRef<string>("")

  const typewriterTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isTypewriterActiveRef = useRef<boolean>(false)

  // Stop and finalize typewriter engine

  const stopTypewriter = useCallback(() => {
    if (typewriterTimerRef.current) {
      clearTimeout(typewriterTimerRef.current)

      typewriterTimerRef.current = null
    }

    if (currentSpeechCancelRef.current) {
      try {
        currentSpeechCancelRef.current()
      } catch {}

      currentSpeechCancelRef.current = null
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()
      } catch {}
    }

    isTypewriterActiveRef.current = false

    const targetAiId = activeAiMessageIdRef.current

    const target = targetAiTextRef.current

    if (targetAiId !== null && target) {
      setMsgs((prev) =>
        prev.map((m) => (m.id === targetAiId ? { ...m, text: target } : m)),
      )
    }
  }, [])

  // Precise language detector: English to English, Amharic to Amharic

  const detectSpokenLanguage = useCallback(
    (text: string, fallback: "en" | "am" = "en"): "en" | "am" => {
      if (!text || !text.trim()) return fallback

      const t = text.trim()

      // 1. Any Ethiopic Fidel character -> strictly Amharic

      if (/[\u1200-\u137F]/.test(t)) {
        return "am"
      }

      // 2. English clinical and conversational words

      if (
        /\b(tell|about|what|is|are|symptom|symptoms|cause|causes|treatment|treatments|prevention|first aid|hospital|bleeding|leg|arm|headache|fever|cough|diabetes|malaria|asthma|stroke|diarrhea|doctor|medicine|help|please|who|founder|founders|contact|home|page)\b/i.test(
          t,
        )
      ) {
        return "en"
      }

      // 3. Known Latin-transliterated Amharic keywords

      if (/\b(selam|tenaye|dehna|hmem|chigir|endiet|min)\b/i.test(t)) {
        return "am"
      }

      // 4. Default to English if Latin letters exist

      if (/[a-zA-Z]/.test(t)) {
        return "en"
      }

      return fallback
    },
    [],
  )

  // Automatic language synchronizer (auto-detects based on input / speech)

  const setLanguageAuto = useCallback((newLang: "en" | "am") => {
    if (currentLangRef.current === newLang) return

    setCurrentLang(newLang)

    currentLangRef.current = newLang

    userTurnLanguageRef.current = newLang

    setCurrentLanguage(newLang)

    setMsgs((prev) => {
      if (prev.length === 1 && prev[0].id === 0) {
        return [WELCOME_EN]
      }

      return prev
    })
  }, [])

  // Voice Interaction UI state

  const [showVoiceUI, setShowVoiceUI] = useState(false)

  const [voiceState, setVoiceState] = useState<ChatVoiceState>("idle")

  const [userSpeech, setUserSpeech] = useState("")

  const userSpeechRef = useRef("")

  const [aiSpeech, setAiSpeech] = useState("")

  const [audioLevel, setAudioLevel] = useState(0)

  const [isVoiceRecording, setIsVoiceRecording] = useState(false)

  const isVoiceRecordingRef = useRef(false)

  const voiceRecognitionRef = useRef<any>(null)

  const voiceSilenceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleVoiceStopRecordAndSendRef = useRef<(() => void) | null>(null)

  const voiceAudioStreamRef = useRef<MediaStream | null>(null)

  const voiceAudioContextRef = useRef<AudioContext | null>(null)

  const voiceAnalyserAnimRef = useRef<number | null>(null)

  const [isTyping, setIsTyping] = useState(false)

  const clearedTurnEpochRef = useRef<number>(0)

  const wasSentByVoiceRef = useRef<boolean>(false)

  const bottomRef = useRef<HTMLDivElement>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const animFrameRef = useRef<number | null>(null)

  // Turn isolation and anti-stale cache refs

  const isTypingRef = useRef(false)

  const activeTurnIdRef = useRef<number>(0)

  const pendingAiBubbleIdRef = useRef<number | null>(null)

  const lastProcessedAiTextRef = useRef<string>("")

  const speakingTimerRef = useRef<NodeJS.Timeout | null>(null)

  const voiceSessionActiveRef = useRef(false)

  const voiceSessionStartIdxRef = useRef<number>(0)

  const expectedAiMessageIndexRef = useRef<number>(-1)

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const turnStartTimeRef = useRef<number>(0)

  // Auto scroll

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" })
  }, [msgs, isTyping, showVoiceUI])

  // Global open trigger

  useEffect(() => {
    const handleOpen = () => setOpen(true)

    window.addEventListener("open-ai-assistant", handleOpen)

    return () => window.removeEventListener("open-ai-assistant", handleOpen)
  }, [])

  // Focus input on open

  useEffect(() => {
    if (open && !showVoiceUI) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [open, fullscreen, showVoiceUI])

  // Sync soundEnabled with background mute gain:

  // When muted, audio plays silently in background; when unmuted, continues seamlessly at current position

  useEffect(() => {
    setVoiceMuted(!soundEnabled)
  }, [soundEnabled])

  // Audio level polling for ripple animation & realistic speech state hold

  useEffect(() => {
    let active = true

    const pollLevels = () => {
      if (!active) return

      if (showVoiceUI) {
        try {
          const inLevel = ai.getInputLevel ? ai.getInputLevel() : 0

          const outLevel = ai.getOutputLevel ? ai.getOutputLevel() : 0

          setAudioLevel(Math.max(inLevel || 0, outLevel || 0))

          // When AI output audio is actively playing, guarantee state is 'speaking'

          const outCtx = (ai as any)._voiceAudioOut

          const nextPlay = (ai as any)._voiceNextPlay || 0

          const activeSources = (ai as any)._voiceActiveSources || []

          const isPlaybackFinished =
            activeSources.length === 0 &&
            (!outCtx || outCtx.currentTime >= nextPlay - 0.05)

          if (outLevel > 0.03 && (window as any).__tenayeVoiceActive) {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current)

              speakingTimerRef.current = null
            }

            setVoiceState((prev) => (prev !== "speaking" ? "speaking" : prev))
          } else if (isPlaybackFinished && outLevel <= 0.015) {
            if (voiceState === "speaking") {
              if (speakingTimerRef.current) {
                clearTimeout(speakingTimerRef.current)

                speakingTimerRef.current = null
              }

              ;(window as any).__tenayeIsAiTurnActive = false

              ;(ai as any)._setVoiceStatus?.("listening")

              setVoiceState("listening")
            }
          }
        } catch {
          // ignore
        }
      } else {
        setAudioLevel(0)
      }

      animFrameRef.current = requestAnimationFrame(pollLevels)
    }

    animFrameRef.current = requestAnimationFrame(pollLevels)

    return () => {
      active = false

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [showVoiceUI, voiceState])

  // Progressive Typewriter Engine: reveals AI response progressively sentence-by-sentence in typing style

  const advanceTypewriter = useCallback(() => {
    const target = targetAiTextRef.current

    const current = displayedAiTextRef.current

    if (!target) {
      isTypewriterActiveRef.current = false

      return
    }

    if (current.length >= target.length) {
      isTypewriterActiveRef.current = false

      if (typewriterTimerRef.current) {
        clearTimeout(typewriterTimerRef.current)

        typewriterTimerRef.current = null
      }

      const targetAiId = activeAiMessageIdRef.current

      if (targetAiId !== null) {
        setMsgs((prev) =>
          prev.map((m) => (m.id === targetAiId ? { ...m, text: target } : m)),
        )
      }

      if ((window as any).__tenayeVoiceActive) {
        setAiSpeech(cleanVoiceSubtitle(target))
      }

      return
    }

    const remaining = target.slice(current.length)

    const wordMatch = remaining.match(/^(\s*\S+)/)

    let step = 2

    if (wordMatch && wordMatch[0].length <= 12) {
      step = wordMatch[0].length
    } else {
      step = Math.min(
        remaining.length,
        Math.max(3, Math.ceil(remaining.length / 25)),
      )
    }

    const nextText = target.slice(0, current.length + step)

    displayedAiTextRef.current = nextText

    const lastChar = nextText.trim().slice(-1)

    const isSentenceEnd = [".", "?", "!", "።", "፧", "\n"].includes(lastChar)

    const nextDelay = isSentenceEnd ? 90 : 20

    const targetAiId = activeAiMessageIdRef.current

    if (targetAiId !== null) {
      const textWithCursor = nextText + " ▋"

      setMsgs((prev) => {
        const idx = prev.findIndex((m) => m.id === targetAiId)

        if (idx !== -1) {
          const updated = [...prev]

          updated[idx] = { ...updated[idx], text: textWithCursor }

          return updated
        }

        return [
          ...prev,
          { id: targetAiId, role: "ai", text: textWithCursor, time: now12() },
        ]
      })

      if ((window as any).__tenayeVoiceActive) {
        setAiSpeech(cleanVoiceSubtitle(nextText))
      }
    }

    typewriterTimerRef.current = setTimeout(advanceTypewriter, nextDelay)
  }, [])

  // Starts typewriter animation and reads complete medical output in natural female AI voice

  const startTypewriter = useCallback(
    (
      fullText: string,

      options?: {
        emergencyAction?: EmergencyActionPayload

        diseaseMatches?: DiseaseMatchResult[]

        shortcutDiseases?: { id: string; name: string; amharicName?: string }[]

        spokenText?: string

        isAm?: boolean

        onSpeechEnd?: () => void
      },
    ) => {
      const cleanFull = fullText.trim()

      if (!cleanFull) return

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)

        typingTimeoutRef.current = null
      }

      setIsTyping(false)

      isTypingRef.current = false

      // Interrupt any previous typing or speech

      if (typewriterTimerRef.current) {
        clearTimeout(typewriterTimerRef.current)

        typewriterTimerRef.current = null
      }

      if (currentSpeechCancelRef.current) {
        try {
          currentSpeechCancelRef.current()
        } catch {}

        currentSpeechCancelRef.current = null
      }

      if (typeof window !== "undefined" && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel()
        } catch {}
      }

      const aiMsgId = ts()

      activeAiMessageIdRef.current = aiMsgId

      pendingAiBubbleIdRef.current = aiMsgId

      targetAiTextRef.current = cleanFull

      displayedAiTextRef.current = ""

      isTypewriterActiveRef.current = true

      // Immediately insert AI bubble with typing cursor

      setMsgs((prev) => [
        ...prev,

        {
          id: aiMsgId,

          role: "ai",

          text: " ▋",

          time: now12(),

          emergencyAction: options?.emergencyAction,

          diseaseMatches: options?.diseaseMatches,

          shortcutDiseases: options?.shortcutDiseases,
        },
      ])

      // Read answer aloud in natural female AI voice ONLY during interactive voice mode (mic input)

      // When the user writes text in chat mode, they get clean text with no voice reading!

      const isVoiceModeActive =
        (window as any).__tenayeVoiceActive === true ||
        showVoiceUI ||
        wasSentByVoiceRef.current

      if (isVoiceModeActive) {
        setAiSpeech(options?.spokenText || cleanFull)
      }

      if (soundEnabledRef.current && isVoiceModeActive) {
        setVoiceState("speaking")

        const textToRead = options?.spokenText || cleanFull

        const targetAm =
          options?.isAm ??
          (currentLangRef.current === "am" ||
            /[\u1200-\u137F]/.test(textToRead))

        currentSpeechCancelRef.current = speakText(textToRead, targetAm, () => {
          if (showVoiceUI || (window as any).__tenayeVoiceActive) {
            setVoiceState("listening")
            handleVoiceStartRecord()
          } else {
            setVoiceState("idle")
          }

          if (options?.onSpeechEnd) {
            options.onSpeechEnd()
          }
        })
      } else if (isVoiceModeActive) {
        if (showVoiceUI || (window as any).__tenayeVoiceActive) {
          setVoiceState("listening")
          handleVoiceStartRecord()
        } else {
          setVoiceState("idle")
        }
      }

      wasSentByVoiceRef.current = false

      // Begin progressive typewriter streaming

      advanceTypewriter()
    },
    [advanceTypewriter],
  )

  // Unified helper to stream and record AI responses cleanly across snapshot, message, and transcript events

  const handleIncomingAiText = useCallback(
    (cleanText: string) => {
      if (!cleanText || !cleanText.trim()) return

      // Strict guard: if turn was initiated before the last clear, completely DROP incoming text!

      if (turnStartTimeRef.current < clearedTurnEpochRef.current) {
        return
      }

      const clean = cleanText.trim()

      // Clear fallback timer & typing watchdog as text is actively received

      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current)

        fallbackTimeoutRef.current = null
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)

        typingTimeoutRef.current = null
      }

      setIsTyping(false)

      isTypingRef.current = false

      // Determine strict language: English to English, Amharic to Amharic

      let detected = detectSpokenLanguage(clean, currentLangRef.current)

      if ((window as any).__tenayeVoiceActive) {
        const spoken = (userSpeech || "").trim()

        if (spoken) {
          detected = detectSpokenLanguage(spoken, detected)
        }
      }

      const isAmharic = detected === "am"

      userTurnLanguageRef.current = detected

      setLanguageAuto(detected)

      const singleLang = cleanBilingualOutput(clean, isAmharic).trim()

      if (!singleLang) return

      const formatted = normalizeMarkdownText(singleLang)

      lastProcessedAiTextRef.current = formatted

      // SYNCHRONOUS allocation of bubble ID to guarantee single bubble across all streaming chunks!

      if (activeAiMessageIdRef.current === null) {
        const newAiId = ts()

        activeAiMessageIdRef.current = newAiId

        pendingAiBubbleIdRef.current = newAiId

        displayedAiTextRef.current = ""

        targetAiTextRef.current = "" // CRITICAL FIX: Eliminate carryover of previous messages into new turns!
      }

      targetAiTextRef.current = mergeAiStreamingText(
        targetAiTextRef.current,
        formatted,
      )

      if ((window as any).__tenayeVoiceActive || showVoiceUI) {
        setAiSpeech(formatted)
      }

      if (!isTypewriterActiveRef.current) {
        isTypewriterActiveRef.current = true

        advanceTypewriter()
      }
    },
    [userSpeech, advanceTypewriter, setLanguageAuto],
  )

  // Sync with Voxide engine status & authoritative messages

  useEffect(() => {
    // 1. Authoritative status updates

    const unsubStatus = ai.on("status", (st: string) => {
      const s = (st || "idle").toLowerCase()

      // Guard typing indicator on terminal statuses

      if (s === "error") {
        if (
          activeAiMessageIdRef.current === null &&
          activeTurnIdRef.current !== 0
        ) {
          if (fallbackTimeoutRef.current) {
            clearTimeout(fallbackTimeoutRef.current)

            fallbackTimeoutRef.current = null
          }

          const pendingQuery = (window as any).__tenayeCurrentQuery || ""

          if (pendingQuery) {
            const isAm = currentLangRef.current === "am"

            const fallbackText = getClinicalResponse(pendingQuery, isAm)

            handleIncomingAiText(fallbackText)
          }
        }

        setIsTyping(false)

        isTypingRef.current = false

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)

          typingTimeoutRef.current = null
        }
      } else if (s === "idle") {
        if (pendingAiBubbleIdRef.current !== null || !isTypingRef.current) {
          setIsTyping(false)

          isTypingRef.current = false
        }
      }

      if (!(window as any).__tenayeVoiceActive) {
        setVoiceState("idle")

        return
      }

      if (s === "connecting") {
        if (speakingTimerRef.current) {
          clearTimeout(speakingTimerRef.current)

          speakingTimerRef.current = null
        }

        setVoiceState("connecting")
      } else if (s === "thinking" || s === "processing") {
        if (speakingTimerRef.current) {
          clearTimeout(speakingTimerRef.current)

          speakingTimerRef.current = null
        }

        setVoiceState("thinking")
      } else if (s === "speaking") {
        if (speakingTimerRef.current) {
          clearTimeout(speakingTimerRef.current)

          speakingTimerRef.current = null
        }

        setVoiceState("speaking")
      } else if (s === "listening") {
        if (!speakingTimerRef.current) {
          setVoiceState("listening")
        }
      } else if (s === "error") {
        setVoiceState("error")
      } else {
        setVoiceState("idle")
      }
    })

    // 2. Real-time transcript updates

    const unsubTranscript = ai.on(
      "transcript",
      (payload: { role?: string; text?: string } | string) => {
        if ((window as any).__tenayeIsCleared) return

        const text = typeof payload === "string" ? payload : payload?.text

        const role = typeof payload === "object" ? payload?.role : undefined

        if (!text || !text.trim()) return

        const clean = text.trim()

        if (role === "ai") {
          handleIncomingAiText(clean)
        } else if (role === "user") {
          const cleanUser = cleanSpokenTranscript(clean)

          if (cleanUser) {
            setUserSpeech(cleanUser)

            userSpeechRef.current = cleanUser

            const detected = detectSpokenLanguage(
              cleanUser,
              currentLangRef.current,
            )

            setLanguageAuto(detected)

            if (voiceSilenceTimerRef.current) {
              clearTimeout(voiceSilenceTimerRef.current)
            }
            voiceSilenceTimerRef.current = setTimeout(() => {
              if (
                isVoiceRecordingRef.current &&
                userSpeechRef.current.trim().length > 1
              ) {
                const words = userSpeechRef.current.trim().split(/\s+/)
                // Guard against premature cutoff: don't auto-send trailing connectors or 1-2 word fragments like "Hey can"
                const lastWord = (words[words.length - 1] || "").toLowerCase()
                const incompleteTrailing = /^(can|could|will|would|is|are|am|was|were|the|a|an|to|of|and|or|if|what|how|why|when|where|who|hey|hello|hi|please|i|my|we|you)$/i.test(lastWord)
                if (words.length <= 2 && incompleteTrailing) {
                  // Keep listening, do not cut off the user mid-sentence!
                  return
                }
                handleVoiceStopRecordAndSendRef.current?.()
              }
            }, 3200)
          }
        } else {
          handleIncomingAiText(clean)
        }
      },
    )

    // 3. Authoritative message completion listener

    const unsubMessage = ai.on(
      "message",
      ({ role, text }: { role: string; text: string }) => {
        if ((window as any).__tenayeIsCleared) return

        if (!text || !text.trim()) return

        const clean = text.trim()

        if (role === "user") {
          const cleanUser = cleanSpokenTranscript(clean)

          if (!cleanUser) return

          setUserSpeech(cleanUser)

          userSpeechRef.current = cleanUser

          const detected = detectSpokenLanguage(
            cleanUser,
            currentLangRef.current,
          )

          setLanguageAuto(detected)

          setCurrentLanguage(detected)

          // Record user speech into chat messages history

          setMsgs((prev) => {
            const last = prev[prev.length - 1]

            if (
              last &&
              last.role === "user" &&
              last.text.trim() === cleanUser
            ) {
              return prev
            }

            return [
              ...prev,
              { id: ts(), role: "user", text: cleanUser, time: now12() },
            ]
          })

          // Initialize turn for incoming AI response

          const turnId = ts()

          activeTurnIdRef.current = turnId

          activeAiMessageIdRef.current = null

          pendingAiBubbleIdRef.current = null

          lastProcessedAiTextRef.current = ""

          targetAiTextRef.current = ""

          displayedAiTextRef.current = ""

          turnStartTimeRef.current = Date.now()

          setIsTyping(true)

          isTypingRef.current = true
        } else if (role === "ai") {
          handleIncomingAiText(clean)

          setIsTyping(false)

          isTypingRef.current = false
        }
      },
    )

    // 4. Real-time snapshot updates with strict session & turn isolation

    const unsubSubscribe = ai.subscribe(() => {
      const snap = ai.getSnapshot()

      if (!snap) return

      if (snap.status) {
        const s = snap.status.toLowerCase()

        if (!(window as any).__tenayeVoiceActive) {
          setVoiceState("idle")
        } else {
          if (s === "connecting") {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current)

              speakingTimerRef.current = null
            }

            setVoiceState("connecting")
          } else if (s === "thinking" || s === "processing") {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current)

              speakingTimerRef.current = null
            }

            setVoiceState("thinking")
          } else if (s === "speaking") {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current)

              speakingTimerRef.current = null
            }

            setVoiceState("speaking")
          } else if (s === "listening") {
            if (!speakingTimerRef.current) {
              setVoiceState("listening")
            }
          } else if (s === "error") {
            setVoiceState("error")
          } else {
            setVoiceState("idle")
          }
        }
      }
    })

    return () => {
      if (typeof unsubStatus === "function") unsubStatus()

      if (typeof unsubTranscript === "function") unsubTranscript()

      if (typeof unsubMessage === "function") unsubMessage()

      if (typeof unsubSubscribe === "function") unsubSubscribe()
    }
  }, [handleIncomingAiText, setLanguageAuto])

  // Fast, bulletproof WebSocket connection helper

  // Fast client initialization helper (initializes Voxide without touching the microphone)
  const ensureConnected = useCallback(async (): Promise<boolean> => {
    try {
      await ai.init()
      return true
    } catch (err) {
      console.warn("[Tenaye Assistance] init error:", err)
      return false
    }
  }, [])

  // Initialize client when assistant widget is opened (WITHOUT accessing microphone)
  useEffect(() => {
    if (open) {
      ensureConnected()
    }
  }, [open, ensureConnected])

  // Keep WebSocket warm via heartbeat only if an open connection exists
  useEffect(() => {
    if (!open) return

    const interval = setInterval(() => {
      const ws = (ai as any)._voiceWs
      if (ws && ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify({ type: "ping" }))
        } catch {}
      }
    }, 20000)

    return () => clearInterval(interval)
  }, [open])

  // ── Voice Stage Engine (Telegram-Style Push-to-Talk) ──

  const stopVoiceAudioLevel = useCallback(() => {
    if (voiceAnalyserAnimRef.current) {
      cancelAnimationFrame(voiceAnalyserAnimRef.current)

      voiceAnalyserAnimRef.current = null
    }

    if (voiceAudioStreamRef.current) {
      try {
        voiceAudioStreamRef.current.getTracks().forEach((track) => track.stop())
      } catch {}

      voiceAudioStreamRef.current = null
    }

    setAudioLevel(0)
  }, [])

  const startVoiceAudioLevel = useCallback(async () => {
    try {
      // Reuse existing mic stream from Voxide if available to avoid dual-mic contention
      let stream = (ai as any)._voiceMic
      if (!stream || !stream.active) {
        if (!navigator.mediaDevices?.getUserMedia) return
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      }

      voiceAudioStreamRef.current = stream

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      voiceAudioContextRef.current = ctx

      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64
      source.connect(analyser)

      const buffer = new Uint8Array(analyser.frequencyBinCount)

      const tick = () => {
        if (!isVoiceRecordingRef.current) return

        analyser.getByteFrequencyData(buffer)
        let sum = 0
        for (let i = 0; i < buffer.length; i++) sum += buffer[i]
        const avg = sum / buffer.length / 255
        setAudioLevel(avg)

        voiceAnalyserAnimRef.current = requestAnimationFrame(tick)
      }

      voiceAnalyserAnimRef.current = requestAnimationFrame(tick)
    } catch (e) {
      console.warn("[VoiceAudio] Volume capture error:", e)
    }
  }, [])

  // ── Voice Stage Engine: Official Voxide Real-time Dialogue ──

  const handleVoiceStartRecord = useCallback(async () => {
    // 1. Cancel any active speech reading or typewriter
    if (currentSpeechCancelRef.current) {
      try {
        currentSpeechCancelRef.current()
      } catch {}
      currentSpeechCancelRef.current = null
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()
      } catch {}
    }

    stopTypewriter()

    // Clear any pending silence timer
    if (voiceSilenceTimerRef.current) {
      clearTimeout(voiceSilenceTimerRef.current)
      voiceSilenceTimerRef.current = null
    }

    // Explicitly flag user requested voice mode to grant microphone permission
    ;(window as any).__tenayeVoiceUserRequested = true
    ;(window as any).__tenayeVoiceActive = true
    ;(window as any).__tenayeIsCleared = false
    voiceSessionActiveRef.current = true
    setIsVoiceRecording(true)
    isVoiceRecordingRef.current = true
    setVoiceState("connecting")
    setUserSpeech("")
    userSpeechRef.current = ""
    setAiSpeech("")

    // Start browser native SpeechRecognition in parallel for instant low-latency speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      try {
        if (voiceRecognitionRef.current) {
          try {
            voiceRecognitionRef.current.abort()
          } catch {}
        }
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = currentLangRef.current === "am" ? "am-ET" : "en-US"

        recognition.onresult = (event: any) => {
          let fullTranscript = ""
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript + " "
          }
          const cleanUser = cleanSpokenTranscript(fullTranscript.trim())
          if (cleanUser) {
            setUserSpeech(cleanUser)
            userSpeechRef.current = cleanUser
            const detected = detectSpokenLanguage(cleanUser, currentLangRef.current)
            setLanguageAuto(detected)

            // Auto-send on natural pause (3.2s) with protection against premature speech cutoff
            if (voiceSilenceTimerRef.current) {
              clearTimeout(voiceSilenceTimerRef.current)
            }
            voiceSilenceTimerRef.current = setTimeout(() => {
              if (
                isVoiceRecordingRef.current &&
                userSpeechRef.current.trim().length > 1
              ) {
                const words = userSpeechRef.current.trim().split(/\s+/)
                // Guard against premature cutoff: don't auto-send trailing connectors or 1-2 word fragments like "Hey can"
                const lastWord = (words[words.length - 1] || "").toLowerCase()
                const incompleteTrailing = /^(can|could|will|would|is|are|am|was|were|the|a|an|to|of|and|or|if|what|how|why|when|where|who|hey|hello|hi|please|i|my|we|you)$/i.test(lastWord)
                if (words.length <= 2 && incompleteTrailing) {
                  // Keep listening, do not cut off the user mid-sentence!
                  return
                }
                handleVoiceStopRecordAndSendRef.current?.()
              }
            }, 3200)
          }
        }

        recognition.onerror = (e: any) => {
          console.warn("[VoiceStage] SpeechRecognition warning:", e?.error)
        }

        recognition.onend = () => {
          // Keep listening seamlessly if voice stage is still actively recording
          if (isVoiceRecordingRef.current) {
            try {
              recognition.start()
            } catch {}
          }
        }

        recognition.start()
        voiceRecognitionRef.current = recognition
      } catch (recErr) {
        console.warn("[VoiceStage] Native speech recognition init failed:", recErr)
      }
    }

    try {
      await ensureConnected()
      await ai.connect()
      startVoiceAudioLevel()
      setVoiceState("listening")
    } catch (err) {
      console.warn("[VoiceStage] Failed to start voice session:", err)
      // Even if Voxide cloud WebSocket fails, local SpeechRecognition works!
      if (voiceRecognitionRef.current) {
        setVoiceState("listening")
      } else {
        setVoiceState("error")
      }
    }
  }, [stopTypewriter, ensureConnected, startVoiceAudioLevel, setLanguageAuto])

  const handleVoiceStop = useCallback(() => {
    // Revoke user requested voice permission so mic is immediately released
    ;(window as any).__tenayeVoiceUserRequested = false
    setIsVoiceRecording(false)
    isVoiceRecordingRef.current = false

    if (voiceSilenceTimerRef.current) {
      clearTimeout(voiceSilenceTimerRef.current)
      voiceSilenceTimerRef.current = null
    }

    if (voiceRecognitionRef.current) {
      try {
        voiceRecognitionRef.current.abort()
      } catch {}
      voiceRecognitionRef.current = null
    }

    try {
      ai.disconnect()
    } catch {}

    // Explicitly stop all microphone media stream tracks
    if ((ai as any)._voiceMic) {
      try {
        ;(ai as any)._voiceMic.getTracks().forEach((track: any) => track.stop())
        ;(ai as any)._voiceMic = null
      } catch {}
    }

    stopVoiceAudioLevel()
    stopTypewriter()

    if (currentSpeechCancelRef.current) {
      try {
        currentSpeechCancelRef.current()
      } catch {}
      currentSpeechCancelRef.current = null
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()
      } catch {}
    }

    setVoiceState("idle")
  }, [stopTypewriter, stopVoiceAudioLevel])

  const startVoiceUI = useCallback(() => {
    ;(window as any).__tenayeVoiceActive = true

    ;(window as any).__tenayeIsCleared = false

    voiceSessionActiveRef.current = true

    setShowVoiceUI(true)

    setUserSpeech("")

    setAiSpeech("")

    handleVoiceStartRecord()
  }, [handleVoiceStartRecord])

  const stopVoiceUI = useCallback(() => {
    ;(window as any).__tenayeVoiceActive = false

    ;(window as any).__tenayeIsAiTurnActive = false

    voiceSessionActiveRef.current = false

    handleVoiceStop()

    setShowVoiceUI(false)
  }, [handleVoiceStop])

  // Send text message with instantaneous transmission over pre-warmed connection

  const handleSend = useCallback(
    async (textToSend: string) => {
      const t = cleanSpokenTranscript(textToSend).trim()

      if (!t) return

      // Un-flag cleared status on new user request

      ;(window as any).__tenayeIsCleared = false

      // Detect language:

      const detected = detectSpokenLanguage(t, currentLangRef.current)

      const isAm = detected === "am"

      userTurnLanguageRef.current = detected

      setLanguageAuto(detected)

      setCurrentLanguage(detected)

      // Maintain voice stage open and active if in voice mode
      const isVoiceOrigin = showVoiceUI || wasSentByVoiceRef.current
      if (!isVoiceOrigin) {
        ;(window as any).__tenayeVoiceActive = false
        if (showVoiceUI) {
          stopVoiceUI()
        }
      } else {
        ;(window as any).__tenayeVoiceActive = true
        setVoiceState("thinking")
      }

      // Pre-warm and resume shared AudioContext on user action so browser enables voice reading
      try {
        const outCtx = getSharedAudioContext()

        if (outCtx && outCtx.state === "suspended") {
          outCtx.resume().catch(() => {})
        }
      } catch {}

      // Audio test / hear me check
      const isHearMeQuery =
        /\b(can\s+you\s+hear\s+me|do\s+you\s+hear\s+me|are\s+you\s+listening|hear\s+me|can\s+u\s+hear\s+me|testing\s+mic|can\s+you\s+hear|hey\s+can\s+you\s+hear|can\s+you\s+hear\s+us|can\s+you\s+hear\b)/i.test(
          t,
        ) ||
        /^(hey\s+)?can\s+(you\s+)?(hear)?$/i.test(t) ||
        /(ትሰማኛለህ|ትሰሚያለሽ|ትሰማለህ|እየሰማኸኝ|እየሰማሽኝ|ድምፄ\s*ይሰማል|ይሰማል)/.test(t)

      if (isHearMeQuery) {
        const reply = isAm
          ? "**አዎ፣ በደንብ እሰማዎታለሁ!**\n\nእኔ የጤናዬ (Tenaye) የድምጽና የጽሑፍ የጤና ረዳት ነኝ። ዛሬ በጤና ጉዳይዎ እንዴት ልረዳዎት እችላለሁ?"
          : "**Yes, I can hear you clearly!**\n\nI am your Tenaye Health Assistant. How can I assist you with your health questions, symptoms, or medical guidance today?"

        startTypewriter(reply, {
          spokenText: isAm
            ? "አዎ፣ በደንብ እሰማዎታለሁ! ዛሬ እንዴት ልረዳዎት እችላለሁ?"
            : "Yes, I can hear you clearly! How can I help you today?",
          isAm,
        })
        return
      }

      // Check for explicit navigation command
      const targetPage = resolveSpokenPage(t)

      if (targetPage) {
        if ((window as any).__tenayeNavigate) {
          ;(window as any).__tenayeNavigate(targetPage)
        }
        const pageName = targetPage.includes("about")
          ? isAm
            ? "ስለ እኛ"
            : "About Us"
          : targetPage.includes("contact")
            ? isAm
              ? "የአድራሻ"
              : "Contact"
            : targetPage.includes("emergency")
              ? isAm
                ? "የድንገተኛ አደጋ"
                : "Emergency"
              : targetPage.includes("symptoms")
                ? isAm
                  ? "የምልክቶች መመርመሪያ"
                  : "Symptom Checker"
                : targetPage.includes("first-aid")
                  ? isAm
                    ? "የመጀመሪያ እርዳታ"
                    : "First Aid"
                  : targetPage.includes("diseases")
                    ? isAm
                      ? "የበሽታዎች ማውጫ"
                      : "Disease Library"
                    : targetPage.includes("health-tips")
                      ? isAm
                        ? "የጤና ምክሮች"
                        : "Health Tips"
                      : targetPage.includes("news")
                        ? isAm
                          ? "የህዝብ ጤና ዜናዎችና የወረርሽኝ ማንቂያ"
                          : "Health News & Outbreak Alerts"
                        : targetPage.includes("legal")
                          ? isAm
                            ? "የህግና የግላዊነት ፖሊሲ"
                            : "Terms & Privacy Policy"
                          : isAm
                            ? "የተጠየቀውን"
                            : "requested"

        const reply = isAm
          ? `አዎ! የ${pageName} ገጽን ከፍቼልዎታለሁ።`
          : `Opening the ${pageName} page for you now.`

        startTypewriter(reply, {
          spokenText: reply,
          isAm,
        })
        return
      }

      // 1. Interrupt previous playback and server turn immediately

      ;(window as any).__tenayeTurnGeneration =
        ((window as any).__tenayeTurnGeneration || 0) + 1

      ;(window as any).__tenayeSuppressAudioUntil = 0

      stopTypewriter()

      targetAiTextRef.current = ""

      displayedAiTextRef.current = ""

      isTypewriterActiveRef.current = false

      try {
        ;(ai as any)._voiceStopPlayback?.(true)

        ;(ai as any)._voiceInterrupt?.()
      } catch {}

      ;(window as any).__tenayeIsAiTurnActive = true

      // 2. Wipe pending AI and User text buffers so old answers are never emitted

      try {
        ;(ai as any)._voicePendingAiText = ""

        ;(ai as any)._voicePendingUserText = ""
      } catch {}

      const turnId = ts()

      activeTurnIdRef.current = turnId

      activeAiMessageIdRef.current = null // Reset for this new turn!

      pendingAiBubbleIdRef.current = null

      lastProcessedAiTextRef.current = ""

      turnStartTimeRef.current = Date.now()

      isTypingRef.current = true

      setIsTyping(true)

      // Watchdog timer: never keep typing indicator stuck on network stalls

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

      typingTimeoutRef.current = setTimeout(() => {
        if (isTypingRef.current) {
          setIsTyping(false)

          isTypingRef.current = false
        }
      }, 12000)

      // Append user message ONCE

      setMsgs((prev) => [
        ...prev,
        { id: turnId, role: "user", text: t, time: now12() },
      ])

      setInput("")

      // STEP 1: Emergency & First Aid & Nearby Hospital Protocol

      if (isEmergencyOrFirstAidQuery(t)) {
        try {
          const emergencyData = await resolveEmergencyAction(t, isAm)

          if (emergencyData) {
            if (/hospital|clinic|ሆስፒታል|ፈልግ|ቅርብ|nearby|gps/i.test(t)) {
              navigateTo("/emergency?autoLocate=true")
            }

            startTypewriter(emergencyData.fullSummaryText, {
              emergencyAction: emergencyData,

              spokenText: emergencyData.spokenFirstAid,

              isAm,
            })

            return
          }
        } catch (err) {
          console.warn("[Tenaye Emergency Action Error]", err)
        }
      }

      // STEP 2: Educational & Specific Disease Inquiries (e.g., "Tell me about diabetes...", "What is malaria...")

      // When the user asks about a disease, condition, causes, or treatments, provide the full structured clinical guide!

      const isEducational = isEducationalOrDiseaseInquiry(t)

      const hasDiseaseKeyword =
        /\b(diabetes|sugar|glycemia|malaria|diarrhea|stroke|covid|hypertension|blood pressure|asthma|pneumonia|tuberculosis|heart attack|typhoid|cholera|rabies|measles|hepatitis|gastritis|kidney|sepsis|cancer)\b/i.test(
          t,
        ) ||
        /(ስኳር|ወባ|ተቅማጥ|ስትሮክ|ደም\s*ግፊት|አስም|ሳንባ\s*ነቀርሳ|ታይፎይድ|ኮሌራ|ጨጓራ|ኩላሊት)/.test(t)

      if (isEducational || hasDiseaseKeyword) {
        let clinicalResponse = getClinicalResponse(t, isAm)

        const isGenericGreeting = /^(hello|hi|hey|ሰላም)\b/i.test(t)

        if (
          !isGenericGreeting &&
          (!clinicalResponse || clinicalResponse.length < 50)
        ) {
          const foundDisease = ALL_DISEASES.find((d) => {
            const dName = d.name.toLowerCase()

            const qLower = t.toLowerCase()

            return (
              qLower.includes(dName) ||
              (d.amharicName && t.includes(d.amharicName))
            )
          })

          if (foundDisease) {
            const symList = foundDisease.symptoms
              .map((s) => `• ${s}`)
              .join("\n")

            const causeList = foundDisease.causes
              .map((c) => `• ${c}`)
              .join("\n")

            const treatList = foundDisease.treatment
              .map((tr) => `• ${tr}`)
              .join("\n")

            const prevList = foundDisease.prevention
              .map((p) => `• ${p}`)
              .join("\n")

            const overviewText =
              foundDisease.description ||
              foundDisease.desc ||
              foundDisease.overview ||
              ""

            clinicalResponse = isAm
              ? `**አጠቃላይ መግለጫ (Overview):**\n${overviewText}\n\n**ዋና ዋና ምልክቶች (Key Symptoms):**\n${symList}\n\n**መንስኤዎች (Causes):**\n${causeList}\n\n**ህክምና እና እንክብካቤ (Treatment & Care):**\n${treatList}\n\n**መከላከያ መንገዶች (Prevention):**\n${prevList}`
              : `**Overview:**\n${overviewText}\n\n**Key Symptoms:**\n${symList}\n\n**Causes:**\n${causeList}\n\n**Treatment & Care:**\n${treatList}\n\n**Prevention:**\n${prevList}`
          }
        }

        // If clinical knowledge found for this condition, deliver directly with typewriter streaming and complete reading!

        if (
          clinicalResponse &&
          !isGenericGreeting &&
          clinicalResponse.length > 50
        ) {
          clinicalResponse = filterClinicalSections(clinicalResponse, t)

          startTypewriter(clinicalResponse, { isAm })

          return
        }
      }

      // STEP 3: Local Symptom Matching (129 Verified Diseases)
      // Generates the comprehensive clinical differential diagnosis matching Screenshot 3
      const diffReport = generateDetailedSymptomDifferentialReport(t, isAm)

      if (diffReport) {
        startTypewriter(diffReport.fullText, {
          diseaseMatches: diffReport.topMatches,
          shortcutDiseases: diffReport.shortcutDiseases,
          spokenText: diffReport.spokenSummary,
          isAm,
        })

        return
      }

      // STEP 4: Google Gemini API Clinical Fallback

      try {
        const geminiResult = await queryGeminiClinical(t, isAm)

        if (geminiResult && geminiResult.rawText) {
          const filteredGemini = filterClinicalSections(geminiResult.rawText, t)

          startTypewriter(filteredGemini || geminiResult.rawText, { isAm })

          return
        }
      } catch (err) {
        console.warn("[Tenaye Gemini Fallback Error]", err)
      }

      // Store query for fallback retrieval

      ;(window as any).__tenayeCurrentQuery = t

      // Clear any previous fallback timer

      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current)

        fallbackTimeoutRef.current = null
      }

      try {
        await ensureConnected()

        setCurrentLanguage(isAm ? "am" : "en")

        if (isAm) {
          ;(ai as any).language = "am"

          try {
            ;(ai as any).setLanguage?.("am")
          } catch {}
        }

        await ai.sendText(t)

        // Start fallback timer: if no AI response arrives in 5 seconds, inject local clinical response

        fallbackTimeoutRef.current = setTimeout(() => {
          if (
            activeAiMessageIdRef.current === null &&
            activeTurnIdRef.current !== 0
          ) {
            const fallbackText = getClinicalResponse(t, isAm)

            handleIncomingAiText(fallbackText)
          }
        }, 5000)
      } catch (err) {
        console.warn("[Tenaye Assistance] sendText error:", err)

        // Immediately serve clinical fallback on connection/send failure

        const fallbackText = getClinicalResponse(t, isAm)

        handleIncomingAiText(fallbackText)

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current)

          typingTimeoutRef.current = null
        }
      }
    },
    [
      showVoiceUI,
      stopVoiceUI,
      ensureConnected,
      stopTypewriter,
      setLanguageAuto,
      startTypewriter,
      handleIncomingAiText,
    ],
  )

  const handleVoiceStopRecordAndSend = useCallback(() => {
    if (voiceSilenceTimerRef.current) {
      clearTimeout(voiceSilenceTimerRef.current)
      voiceSilenceTimerRef.current = null
    }

    if (voiceRecognitionRef.current) {
      try {
        voiceRecognitionRef.current.abort()
      } catch {}
      voiceRecognitionRef.current = null
    }

    setIsVoiceRecording(false)
    isVoiceRecordingRef.current = false
    stopVoiceAudioLevel()

    const speech = (userSpeechRef.current || userSpeech || "").trim()

    if (speech) {
      wasSentByVoiceRef.current = true
      setVoiceState("thinking")
      handleSend(speech)
    } else {
      handleVoiceStop()
    }
  }, [userSpeech, handleSend, handleVoiceStop, stopVoiceAudioLevel])

  useEffect(() => {
    handleVoiceStopRecordAndSendRef.current = handleVoiceStopRecordAndSend
  }, [handleVoiceStopRecordAndSend])

  const handleVoiceCancelRecord = useCallback(() => {
    setUserSpeech("")

    userSpeechRef.current = ""

    handleVoiceStop()
  }, [handleVoiceStop])

  // Clear history

  const requestClear = () => setConfirmClear(true)

  const confirmClearFn = () => {
    const clearedEpoch = Date.now()

    clearedTurnEpochRef.current = clearedEpoch

    ;(window as any).__tenayeClearedGeneration = clearedEpoch

    ;(window as any).__tenayeIsCleared = true

    stopTypewriter()

    targetAiTextRef.current = ""

    displayedAiTextRef.current = ""

    isTypewriterActiveRef.current = false

    // 1. Reset root Voxide session (terminates WS, clears buffers, rotates anonymous visitor ID)

    resetVoxideSession()

    // 2. Cancel Web Speech API immediately and repeatedly

    if (typeof window !== "undefined" && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel()

        setTimeout(() => {
          try {
            window.speechSynthesis.cancel()
          } catch {}
        }, 50)

        setTimeout(() => {
          try {
            window.speechSynthesis.cancel()
          } catch {}
        }, 200)
      } catch {}
    }

    // 3. Clear messages and state

    setMsgs([currentLangRef.current === "am" ? WELCOME_AM : WELCOME_EN])

    setConfirmClear(false)

    setUserSpeech("")

    setAiSpeech("")

    activeTurnIdRef.current = 0

    activeAiMessageIdRef.current = null

    activeUserMessageIdRef.current = null

    pendingAiBubbleIdRef.current = null

    lastProcessedAiTextRef.current = ""

    expectedAiMessageIndexRef.current = -1

    turnStartTimeRef.current = 0

    voiceSessionStartIdxRef.current = 0

    voiceSessionActiveRef.current = false

    isTypingRef.current = false

    setIsTyping(false)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)

      typingTimeoutRef.current = null
    }

    ;(window as any).__tenayeIsAiTurnActive = false

    ;(window as any).__tenayeTurnGeneration =
      ((window as any).__tenayeTurnGeneration || 0) + 1

    ;(window as any).__tenayeSuppressAudioUntil = 0
  }

  const cancelClear = () => setConfirmClear(false)

  const closeAll = () => {
    setOpen(false)

    setFullscreen(false)

    setConfirmClear(false)

    stopTypewriter()

    if (voiceState !== "idle" || showVoiceUI) {
      stopVoiceUI()
    }
  }

  /* ══════════════════════════════════════════
     FLOATING ACTION BUTTON (FAB)
  ══════════════════════════════════════════ */

  if (!open) {
    return (
      <button
        onClick={() => {
          setOpen(true)
        }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#119197] hover:bg-[#0c6e73] text-white shadow-2xl transition-all duration-200 hover:scale-105 pulse-teal flex items-center justify-center cursor-pointer group"
        aria-label="Open Tenaye Assistance"
      >
        <IconBot
          size={22}
          className="group-hover:scale-110 transition-transform"
        />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
      </button>
    )
  }

  /* ══════════════════════════════════════════
     FULL-SCREEN WORKSPACE MODE
  ══════════════════════════════════════════ */

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-white">
        {confirmClear && (
          <ClearConfirmDialog
            onConfirm={confirmClearFn}
            onCancel={cancelClear}
          />
        )}

        {/* Top Navbar */}
        <div className="border-b border-gray-100 bg-white shrink-0">
          <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => setFullscreen(false)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#119197] transition-colors cursor-pointer"
            >
              <IconArrowLeft size={16} />
              <span>Back to compact view</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-gray-900 text-sm">
                Tenaye Assistance
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 uppercase">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    !showVoiceUI
                      ? "bg-green-500"
                      : voiceState === "connecting"
                        ? "bg-amber-400 animate-ping"
                        : voiceState === "listening"
                          ? "bg-green-500 animate-pulse"
                          : voiceState === "thinking"
                            ? "bg-amber-500 animate-bounce"
                            : voiceState === "speaking"
                              ? "bg-teal-500 animate-ping"
                              : "bg-green-500"
                  }`}
                />
                {!showVoiceUI
                  ? "ONLINE"
                  : voiceState === "connecting"
                    ? "CONNECTING..."
                    : voiceState === "listening"
                      ? "LISTENING..."
                      : voiceState === "thinking"
                        ? "THINKING..."
                        : voiceState === "speaking"
                          ? "SPEAKING..."
                          : "ONLINE"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound / Voice Audio Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                title={
                  soundEnabled
                    ? "Voice audio is ON (click to mute)"
                    : "Voice audio is MUTED (click to enable voice)"
                }
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  soundEnabled
                    ? "text-[#119197] bg-teal-50 border border-teal-200 font-semibold"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                }`}
                aria-label={soundEnabled ? "Mute voice" : "Unmute voice"}
              >
                {soundEnabled ? (
                  <IconVolume2 size={16} />
                ) : (
                  <IconVolumeX size={16} />
                )}
              </button>

              <button
                onClick={requestClear}
                title="Clear chat history"
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <IconTrash size={16} />
              </button>
              <button
                onClick={closeAll}
                title="Close assistant"
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <IconX size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content: Either Voice Interaction Stage or Message Stream */}
        {showVoiceUI ? (
          <div className="flex-1 max-w-2xl mx-auto w-full flex items-center justify-center p-6">
            <VoiceStage
              state={voiceState}
              userTranscript={userSpeech}
              aiResponse={aiSpeech}
              audioLevel={audioLevel}
              isRecording={isVoiceRecording}
              isAmharic={currentLang === "am"}
              onStartRecord={handleVoiceStartRecord}
              onStopRecordAndSend={handleVoiceStopRecordAndSend}
              onCancelRecord={handleVoiceCancelRecord}
              onStop={() => {
                if (voiceState === "speaking") {
                  stopTypewriter()

                  setVoiceState("idle")
                } else {
                  stopVoiceUI()
                }
              }}
              onViewChat={stopVoiceUI}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
            <div className="max-w-3xl mx-auto space-y-4">
              {msgs.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {msg.role === "ai" && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0c6e73] to-[#119197] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <IconBot size={15} />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    {msg.role === "ai" && (
                      <span className="text-[11px] font-bold text-[#119197]">
                        Tenaye Assistance
                      </span>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "ai"
                          ? "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-xs"
                          : "bg-[#119197] text-white rounded-tr-sm shadow-xs"
                      }`}
                    >
                      {msg.role === "ai" ? (
                        <>
                          <FormattedMessage text={msg.text} />
                          {msg.emergencyAction && (
                            <EmergencyHospitalCard
                              action={msg.emergencyAction}
                              onNavigate={(p) => {
                                navigateTo(p)

                                setOpen(false)
                              }}
                            />
                          )}
                          {msg.shortcutDiseases && msg.shortcutDiseases.length > 0 ? (
                            <div className="mt-3 pt-3 border-t border-red-100/80 space-y-2">
                              {/* Disease shortcuts */}
                              <div className="space-y-1.5">
                                {msg.shortcutDiseases.map((sd) => (
                                  <button
                                    key={sd.id}
                                    type="button"
                                    onClick={() => {
                                      navigateTo(`/diseases/${sd.id}`)
                                      setOpen(false)
                                    }}
                                    className="w-full py-2 px-3 rounded-xl border border-red-200/90 hover:border-red-400 bg-white hover:bg-red-50/50 text-gray-800 text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs cursor-pointer group text-left"
                                  >
                                    <span className="group-hover:text-red-700">
                                      {currentLang === "am" && sd.amharicName ? `${sd.amharicName} (${sd.name})` : sd.name}
                                    </span>
                                    <span className="text-gray-400 group-hover:text-red-600 font-bold text-sm">↗</span>
                                  </button>
                                ))}
                              </div>

                              {/* Find Emergency Services Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  navigateTo("/emergency")
                                  setOpen(false)
                                }}
                                className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                              >
                                <IconAlertTriangle size={14} className="stroke-[2.5]" />
                                <span>{currentLang === "am" ? "የአደጋ ጊዜ አገልግሎት ፈልግ" : "Find Emergency Services"}</span>
                              </button>

                              {/* Red callout */}
                              <div className="p-2.5 rounded-xl bg-red-50/80 border border-red-200/70 flex items-start gap-2 text-[11px] text-red-800 leading-relaxed font-medium">
                                <span className="text-sm">🚨</span>
                                <span>
                                  {currentLang === "am"
                                    ? "አስቸኳይ፦ ለከባድ ድንገተኛ አደጋዎች በ 907 (ቀይ መስቀል አምቡላንስ) ይደውሉ ወይም የድንገተኛ አደጋ ገጽን ይመልከቱ።"
                                    : "URGENT: For immediate emergencies, call 907 (Red Cross Ambulance) or visit the Emergency page."}
                                </span>
                              </div>
                            </div>
                          ) : msg.diseaseMatches && msg.diseaseMatches.length > 0 ? (
                            <div className="space-y-2 mt-2">
                              {msg.diseaseMatches.map((dm) => (
                                <DiseasePredictionCard
                                  key={dm.disease.id}
                                  match={dm}
                                  onNavigate={(p) => {
                                    navigateTo(p)
                                    setOpen(false)
                                  }}
                                />
                              ))}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <p className="whitespace-pre-line text-sm">
                          {msg.text}
                        </p>
                      )}
                    </div>
                    <div
                      className={`flex items-center gap-2 mt-0.5 ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span className="text-[10px] text-gray-400">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>
          </div>
        )}

        {/* Bottom Input Dock */}
        <div className="border-t border-gray-100 bg-white px-6 py-4 shrink-0">
          <div className="max-w-3xl mx-auto">
            {/* Quick Questions Without Emojis */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
              {(currentLang === "am" ? QUICK_QUESTIONS_AM : QUICK_QUESTIONS_EN).map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSend(item.q)}
                  disabled={isTyping}
                  className="px-3.5 py-1.5 rounded-full border border-gray-200 hover:border-[#119197] hover:bg-[#e6f7f7] text-gray-600 hover:text-[#119197] text-xs font-medium whitespace-nowrap transition-colors shrink-0 disabled:opacity-40 cursor-pointer shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#119197] focus-within:ring-2 focus-within:ring-[#e6f7f7] focus-within:bg-white transition-all shadow-xs">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  const val = e.target.value

                  setInput(val)

                  if (/[\u1200-\u137F]/.test(val)) {
                    setLanguageAuto("am")
                  } else if (
                    /[a-zA-Z]/.test(val) &&
                    !/[\u1200-\u137F]/.test(val) &&
                    val.trim().length >= 2
                  ) {
                    setLanguageAuto("en")
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.nativeEvent.isComposing &&
                    !isTyping
                  ) {
                    e.preventDefault()

                    handleSend(input)
                  }
                }}
                placeholder={currentLang === "am" ? "በአማርኛ ወይም በእንግሊዝኛ ይጠይቁ (Enter ይጫኑ)..." : "Ask in English or አማርኛ (Press Enter to send)..."}
                className="flex-1 text-[15px] text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              {input.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    if (input.trim() && !isTyping) {
                      handleSend(input)
                    }
                  }}
                  disabled={isTyping}
                  title="Send message"
                  aria-label="Send message"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer bg-[#119197] hover:bg-[#0c6e73] text-white shadow-xs"
                >
                  <IconSend size={18} />
                </button>
              ) : null}
              <button
                type="button"
                onClick={startVoiceUI}
                title="Open Voice Assistant"
                aria-label="Open Voice Assistant"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer bg-teal-50 hover:bg-[#119197] text-[#119197] hover:text-white"
              >
                <IconMic size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ══════════════════════════════════════════
     COMPACT WIDGET MODE
  ══════════════════════════════════════════ */

  return (
    <div
      className="fixed bottom-5 right-5 z-50 w-[380px] max-w-[calc(100vw-2.5rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-up"
      style={{ animationDuration: "0.18s", height: "590px", maxHeight: "90vh" }}
    >
      <div className="absolute left-0 inset-y-0 w-[3px] bg-gradient-to-b from-[#0c6e73] to-[#119197] pointer-events-none z-10" />
      {confirmClear && (
        <ClearConfirmDialog onConfirm={confirmClearFn} onCancel={cancelClear} />
      )}

      {/* Widget Header — Deep Teal Gradient */}
      <div className="bg-gradient-to-r from-[#0c6e73] to-[#119197] px-4 py-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white">
                <IconBot size={17} />
              </div>
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                  !showVoiceUI
                    ? "bg-green-400"
                    : voiceState === "connecting"
                      ? "bg-amber-400 animate-ping"
                      : voiceState === "listening"
                        ? "bg-green-400 animate-pulse"
                        : voiceState === "thinking"
                          ? "bg-amber-400 animate-bounce"
                          : voiceState === "speaking"
                            ? "bg-teal-300 animate-ping"
                            : "bg-green-400"
                }`}
              />
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-tight tracking-tight">
                Tenaye Assistance
              </p>
              <div className="mt-0.5">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/25 text-teal-100">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      !showVoiceUI
                        ? "bg-green-400"
                        : voiceState === "connecting"
                          ? "bg-amber-400 animate-ping"
                          : voiceState === "listening"
                            ? "bg-green-400 animate-pulse"
                            : voiceState === "thinking"
                              ? "bg-amber-400 animate-bounce"
                              : voiceState === "speaking"
                                ? "bg-teal-300 animate-ping"
                                : "bg-green-400"
                    }`}
                  />
                  {!showVoiceUI
                    ? "ONLINE"
                    : voiceState === "connecting"
                      ? "CONNECTING..."
                      : voiceState === "listening"
                        ? "LISTENING..."
                        : voiceState === "thinking"
                          ? "THINKING..."
                          : voiceState === "speaking"
                            ? "SPEAKING..."
                            : "ONLINE"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sound / Voice Audio Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              title={
                soundEnabled
                  ? "Voice audio is ON (click to mute)"
                  : "Voice audio is MUTED (click to enable voice)"
              }
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                soundEnabled
                  ? "bg-white/30 text-white font-bold"
                  : "bg-white/15 hover:bg-white/25 text-white/80 hover:text-white"
              }`}
              aria-label={soundEnabled ? "Mute voice" : "Unmute voice"}
            >
              {soundEnabled ? (
                <IconVolume2 size={13} />
              ) : (
                <IconVolumeX size={13} />
              )}
            </button>

            <button
              onClick={() => setFullscreen(true)}
              title="Expand to Fullscreen"
              className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <IconMaximize size={12} />
            </button>
            <button
              onClick={requestClear}
              title="Clear chat history"
              className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <IconTrash size={12} />
            </button>
            <button
              onClick={closeAll}
              title="Close"
              className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <IconX size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body: Voice Interaction Stage OR Chat Message Stream */}
      {showVoiceUI ? (
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <VoiceStage
            state={voiceState}
            userTranscript={userSpeech}
            aiResponse={aiSpeech}
            audioLevel={audioLevel}
            isRecording={isVoiceRecording || voiceState === "listening"}
            isAmharic={currentLang === "am"}
            onStartRecord={handleVoiceStartRecord}
            onStopRecordAndSend={handleVoiceStopRecordAndSend}
            onCancelRecord={handleVoiceCancelRecord}
            onStop={() => {
              if (voiceState === "speaking") {
                try {
                  ai.interrupt()
                } catch {}

                stopTypewriter()

                setVoiceState("idle")
              } else {
                stopVoiceUI()
              }
            }}
            onViewChat={() => setShowVoiceUI(false)}
          />
        </div>
      ) : (
        <>
          {/* Scrollable Messages Stream */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3 bg-white min-h-0">
            {msgs.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {msg.role === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0c6e73] to-[#119197] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <IconBot size={13} />
                  </div>
                )}
                <div className="flex flex-col gap-0.5 max-w-[85%]">
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "ai"
                        ? "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-xs"
                        : "bg-[#119197] text-white rounded-tr-sm shadow-xs"
                    }`}
                  >
                    {msg.role === "ai" ? (
                      <>
                        <FormattedMessage text={msg.text} />
                        {msg.emergencyAction && (
                          <EmergencyHospitalCard
                            action={msg.emergencyAction}
                            onNavigate={(p) => {
                              navigateTo(p)

                              setOpen(false)
                            }}
                          />
                        )}
                        {msg.shortcutDiseases && msg.shortcutDiseases.length > 0 ? (
                          <div className="mt-3 pt-3 border-t border-red-100/80 space-y-2">
                            {/* Disease shortcuts */}
                            <div className="space-y-1.5">
                              {msg.shortcutDiseases.map((sd) => (
                                <button
                                  key={sd.id}
                                  type="button"
                                  onClick={() => {
                                    navigateTo(`/diseases/${sd.id}`)
                                    setOpen(false)
                                  }}
                                  className="w-full py-2 px-3 rounded-xl border border-red-200/90 hover:border-red-400 bg-white hover:bg-red-50/50 text-gray-800 text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs cursor-pointer group text-left"
                                >
                                  <span className="group-hover:text-red-700">
                                    {currentLang === "am" && sd.amharicName ? `${sd.amharicName} (${sd.name})` : sd.name}
                                  </span>
                                  <span className="text-gray-400 group-hover:text-red-600 font-bold text-sm">↗</span>
                                </button>
                              ))}
                            </div>

                            {/* Find Emergency Services Button */}
                            <button
                              type="button"
                              onClick={() => {
                                navigateTo("/emergency")
                                setOpen(false)
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                            >
                              <IconAlertTriangle size={14} className="stroke-[2.5]" />
                              <span>{currentLang === "am" ? "የአደጋ ጊዜ አገልግሎት ፈልግ" : "Find Emergency Services"}</span>
                            </button>

                            {/* Red callout */}
                            <div className="p-2.5 rounded-xl bg-red-50/80 border border-red-200/70 flex items-start gap-2 text-[11px] text-red-800 leading-relaxed font-medium">
                              <span className="text-sm">🚨</span>
                              <span>
                                {currentLang === "am"
                                  ? "አስቸኳይ፦ ለከባድ ድንገተኛ አደጋዎች በ 907 (ቀይ መስቀል አምቡላንስ) ይደውሉ ወይም የድንገተኛ አደጋ ገጽን ይመልከቱ።"
                                  : "URGENT: For immediate emergencies, call 907 (Red Cross Ambulance) or visit the Emergency page."}
                              </span>
                            </div>
                          </div>
                        ) : msg.diseaseMatches && msg.diseaseMatches.length > 0 ? (
                          <div className="space-y-2 mt-2">
                            {msg.diseaseMatches.map((dm) => (
                              <DiseasePredictionCard
                                key={dm.disease.id}
                                match={dm}
                                onNavigate={(p) => {
                                  navigateTo(p)
                                  setOpen(false)
                                }}
                              />
                            ))}
                          </div>
                        ) : null}
                      </>
                    ) : (
                      <p className="whitespace-pre-line text-xs">{msg.text}</p>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 mt-0.5 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-[9px] text-gray-400">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick Questions Pills Without Emojis */}
          <div className="px-4 pt-2 pb-1.5 bg-white border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {(currentLang === "am" ? QUICK_QUESTIONS_AM : QUICK_QUESTIONS_EN).map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSend(item.q)}
                  disabled={isTyping}
                  className="px-2.5 py-1 rounded-full border border-gray-200 hover:border-[#119197] hover:bg-[#e6f7f7] text-gray-600 hover:text-[#119197] text-[11px] font-medium whitespace-nowrap transition-colors shrink-0 disabled:opacity-40 cursor-pointer shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Dock with Mic Button (Enter to send) */}
          <div className="px-3.5 py-2.5 bg-white border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 border-2 border-[#119197]/30 rounded-xl px-3 py-1.5 focus-within:border-[#119197] focus-within:bg-white transition-all shadow-xs">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  const val = e.target.value

                  setInput(val)

                  if (/[\u1200-\u137F]/.test(val)) {
                    setLanguageAuto("am")
                  } else if (
                    /[a-zA-Z]/.test(val) &&
                    !/[\u1200-\u137F]/.test(val) &&
                    val.trim().length >= 2
                  ) {
                    setLanguageAuto("en")
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.nativeEvent.isComposing &&
                    !isTyping
                  ) {
                    e.preventDefault()

                    handleSend(input)
                  }
                }}
                placeholder={currentLang === "am" ? "በአማርኛ ወይም በእንግሊዝኛ ይጠይቁ..." : "Ask in English or አማርኛ (Press Enter)..."}
                className="flex-1 text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              {input.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    if (input.trim() && !isTyping) {
                      handleSend(input)
                    }
                  }}
                  disabled={isTyping}
                  title="Send message"
                  aria-label="Send message"
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer bg-[#119197] hover:bg-[#0c6e73] text-white shadow-xs"
                >
                  <IconSend size={13} />
                </button>
              ) : null}
              <button
                type="button"
                onClick={startVoiceUI}
                title="Open Voice Assistant"
                aria-label="Open Voice Assistant"
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer bg-teal-50 hover:bg-[#119197] text-[#119197] hover:text-white"
              >
                <IconMic size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AIAssistant
