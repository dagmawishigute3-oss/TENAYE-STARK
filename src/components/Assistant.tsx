"use client"

// Official publishable key for Tenaye project — safe to ship in the browser

// Configure adaptive multilingual mode for Amharic and English

// Self-healing: if tenaye_lang was polluted with 'am' from previous assistant sessions,
// revert the website to default English so the UI is not auto-translated.
// Isolate assistant language so the main website stays in its default language (English)

/**
 * Automatically adjusts active language mode based on incoming user text / speech.
 */

// ── Bulletproof Message & Transcript Sanitizer Interceptors ──
// 1. Intercept internal snapshot message updates to strip <ctrl95> and STT artifacts

// 2. Intercept client events (message, transcript)
// ── Fast Turn Endpointing & PCM Utilities for Gemini Live ──

// 3. Fast Turn Endpointing Interceptor: Accelerates Gemini Live speech completion without lag

// Pre-compute 4096 zero bytes (2048 samples of 16-bit PCM silence)

// 0.008 catches soft whisper and Amharic consonants without clipping
// Preserve trailing consonant decay (300ms buffer)
// Inject digital silence to immediately trigger Gemini Live's VAD endpointing
// Pre-speech ambient room audio

// Persistent Shared AudioContext for zero-latency audio playback
// fallback

// Safe navigation helper wired cleanly to React Router

// Canonical application routes (Note: /first-aid is intentionally excluded so voice queries execute getFirstAidGuide directly)

// Register official Voxide navigation tool with constrained valid paths

// Register REAL capabilities for Tenaye health platform
// 1. Search Diseases & Conditions

// 2. Get Disease Details (Overview, Symptoms, Causes, Treatment, Prevention)

// 3. Symptom Checker & Urgency Triage (Non-emergency illness symptoms and feelings)

// If no catalog match, query Gemini API clinical intelligence

// Graceful clinical advice fallback

// 4. Emergency First Aid Protocols (Pure Physical Step-by-Step Procedures)

// Query Gemini API / verified clinical emergency intelligence and save to temporary database

// 5. Emergency Services & Closest Hospital Locator (Live GPS Proximity)

// Clinical Consultation & Symptom Inquiries (Gemini AI + Temporary Storage)

// 6. Daily Health Tips & Preventive Advice

// 7. Contact Inquiry Form with Sensitive Data Protection

// 8. Platform Founders & Team

// Bind live UI state dynamically every turn

/**
 * Strict, regex-grounded multilingual page resolver for speech triggers.
 */

// If the user reports an emergency, injury, or first aid question, NEVER navigate away!
// The physical first aid steps must be recited immediately.
// About page triggers (including STT mishearings like "apple picture", "about picture", "up picture")
// Explicit hospital search / ambulance triggers
// Only navigate to /first-aid if user explicitly asks for the catalog page

/**
 * Global Assistant Component — Mounts Tenaye Assistance authentic custom chatbot UI.
 */

import { VoxideClient, VoxideWidget } from "@voxide/react"
import { ALL_DISEASES } from "../data/diseasesIndex"
import { FIRST_AID_TOPICS } from "../data/firstAidData"
import { ALL_HEALTH_TIPS } from "../data/healthTipsData"
import { matchSymptomsToDiseases } from "../services/symptomMatcherService"
import { getInstantDatabaseHospitals } from "../services/hospitalLocatorService"
import {
  devanagariToEnglish,
  sanitizeAiOutput,
  sanitizeUserSpeech,
} from "./textSanitizer"
import {
  getClinicalFirstAidSteps,
  getGeneralMedicalAdvice,
  getLatestFirstAidFromStorage,
} from "../services/geminiMedicalService"
import { isEmergencyOrFirstAidQuery } from "../services/firstAidHospitalService"
import { queryGeminiClinical } from "../services/geminiService"

export {
  getClinicalResponse,
  filterClinicalSections,
} from "./clinicalKnowledge"

export function resetVoxideSession() {
  try {
    ;(ai as any)._voiceStopPlayback?.(true)
    ;(ai as any)._voiceDisconnect?.()
    ;(ai as any).disconnect?.()
    ;(ai as any)._voicePendingAiText = ""
    ;(ai as any)._voicePendingUserText = ""
    ;(ai as any)._setVoiceSnapshot?.({
      messages: [],
      currentAction: null,
      sessionId: null,
    })
    ;(ai as any)._setVoiceStatus?.("idle")
  } catch {}
}
const PUBLIC_KEY = "vox_pub_aedf303988896de856aa0ae4ce1b0867d4cf96bc3206586d"

export const ai = new VoxideClient({
  publicKey: PUBLIC_KEY,
  ui: {
    accentColor: "#059669",
    title: "Tenaye Health Assistant",
    subtitle: "Always available • Emergency 907",
    placeholder:
      "Ask anything in Amharic or English (e.g. 907, first aid, hospitals)...",
  },
})
try {
  ;(ai as any).languageMode = "adaptive"
  ;(ai as any).supportedLanguages = ["am", "en-US"]
  ai.enableMultilingual?.({
    mode: "adaptive",
    supported: ["am", "en-US"],
  })
  // Permanently disable automatic wake-word background listening so the browser microphone
  // is NEVER accessed or requested on page load without explicit user interaction.
  ;(ai as any)._wakeConfig = () => null
  ;(ai as any)._wakeArm = () => {}
  ;(ai as any).armWakeWord = () => {}
  ;(ai as any).isWakeWordAvailable = () => false
  if (typeof (ai as any).disarmWakeWord === "function") {
    ;(ai as any).disarmWakeWord(false)
  }
} catch {}

let currentActiveLanguage: "am" | "en" = "en"
if (
  typeof window !==
  "undefined"
) {
  try {
    const rawLang = localStorage.getItem("tenaye_lang")
    if (
      rawLang ===
        "am" &&
      !sessionStorage.getItem("tenaye_user_explicitly_chose_am")
    ) {
      localStorage.removeItem("tenaye_lang")
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  } catch {}
}

export function setCurrentLanguage(lang: "en" | "am") {
  currentActiveLanguage = lang
  try {
    const targetLang =
      lang ===
      "am"
        ? "am"
        : "en-US"
    ;(ai as any).language = targetLang
    ;(ai as any).setLanguage?.(targetLang)
    if (
      typeof localStorage !==
      "undefined"
    ) {
      localStorage.setItem("tenaye_assistant_lang", lang)
    }
  } catch {}
}

export function getCurrentLanguage(): "en" | "am" {
  return currentActiveLanguage
}
function detectAndApplyLanguage(text: string) {
  if (!text) return
  const hasEthiopic = /[\u1200-\u137F]/.test(text)
  const hasLatin = /[a-zA-Z]/.test(text)
  if (hasEthiopic && !hasLatin) {
    if (
      currentActiveLanguage !==
      "am"
    ) {
      setCurrentLanguage("am")
    }
  } else if (hasLatin && !hasEthiopic) {
    if (
      currentActiveLanguage !==
      "en"
    ) {
      setCurrentLanguage("en")
    }
  }
}
const originalSetVoiceSnapshot = (ai as any)._setVoiceSnapshot?.bind(ai)
if (
  typeof originalSetVoiceSnapshot ===
  "function"
) {
  ;(ai as any)._setVoiceSnapshot = function (patch: any) {
    if (patch && patch.messages && Array.isArray(patch.messages)) {
      patch.messages = patch.messages.map((m: any) => ({
        ...m,
        text:
          m.role ===
          "ai"
            ? sanitizeAiOutput(
                m.text ||
                  "",
              )
            : sanitizeUserSpeech(
                m.text ||
                  "",
              ),
      }))
    }
    return originalSetVoiceSnapshot(patch)
  }
}
const originalEmit = (ai as any)._emit?.bind(ai)
if (
  typeof originalEmit ===
  "function"
) {
  ;(ai as any)._emit = function (event: string, payload: any) {
    if (
      payload &&
      typeof payload.text ===
        "string"
    ) {
      if (
        payload.role ===
        "ai"
      ) {
        payload.text = sanitizeAiOutput(payload.text)
      } else if (
        payload.role ===
        "user"
      ) {
        payload.text = sanitizeUserSpeech(payload.text)
        detectAndApplyLanguage(payload.text)
      }
    }
    return originalEmit(event, payload)
  }
}
const originalVoiceStartMic = (ai as any)._voiceStartMic?.bind(ai)
if (typeof originalVoiceStartMic === "function") {
  ;(ai as any)._voiceStartMic = async function () {
    if (
      typeof window !== "undefined" &&
      !(window as any).__tenayeVoiceUserRequested
    ) {
      return
    }
    return originalVoiceStartMic()
  }
}

const originalSendText = (ai as any).sendText?.bind(ai)
if (
  typeof originalSendText ===
  "function"
) {
  ;(ai as any).sendText = function (text: string) {
    const clean = sanitizeUserSpeech(text)
    detectAndApplyLanguage(clean)
    const target = resolveSpokenPage(clean)
    if (
      target &&
      typeof window !==
        "undefined"
    ) {
      const currentPath = window.location.pathname
      const targetBase = target.split("?")[0]
      if (
        currentPath !==
        targetBase
      ) {
        navigateTo(target)
      }
    }
    return originalSendText(clean)
  }
}

const originalVoiceSendText = (ai as any)._voiceSendText?.bind(ai)
if (
  typeof originalVoiceSendText ===
  "function"
) {
  ;(ai as any)._voiceSendText = function (text: string) {
    const clean = sanitizeUserSpeech(text)
    detectAndApplyLanguage(clean)
    const target = resolveSpokenPage(clean)
    if (
      target &&
      typeof window !==
        "undefined"
    ) {
      const currentPath = window.location.pathname
      const targetBase = target.split("?")[0]
      if (
        currentPath !==
        targetBase
      ) {
        navigateTo(target)
      }
    }
    return originalVoiceSendText(clean)
  }
}
let sharedAudioOutCtx: AudioContext | null = null
let masterVoiceGainNode: GainNode | null = null

export function getSharedAudioContext(): AudioContext | null {
  if (
    typeof window ===
    "undefined"
  )
    return null
  const AudioCtx =
    window.AudioContext ||
    (window as any).webkitAudioContext
  if (!AudioCtx) return null
  try {
    if (
      !sharedAudioOutCtx ||
      sharedAudioOutCtx.state ===
        "closed"
    ) {
      sharedAudioOutCtx = new AudioCtx({ sampleRate: 24000 })
      masterVoiceGainNode = null
    }
    if (
      sharedAudioOutCtx.state ===
      "suspended"
    ) {
      sharedAudioOutCtx.resume().catch(() => {})
    }
  } catch {}
  return sharedAudioOutCtx
}

export function getMasterVoiceGain(ctx: AudioContext): GainNode {
  if (
    !masterVoiceGainNode ||
    masterVoiceGainNode.context !==
      ctx
  ) {
    masterVoiceGainNode = ctx.createGain()
    const isMuted =
      (window as any).__tenayeSoundMuted ===
      true
    masterVoiceGainNode.gain.setValueAtTime(isMuted ? 0 : 1, ctx.currentTime)
    masterVoiceGainNode.connect(ctx.destination)
  }
  return masterVoiceGainNode
}

export function setVoiceMuted(muted: boolean) {
  ;(window as any).__tenayeSoundMuted = muted
  const ctx = getSharedAudioContext()
  if (ctx) {
    const gain = getMasterVoiceGain(ctx)
    try {
      gain.gain.setValueAtTime(muted ? 0 : 1, ctx.currentTime)
    } catch {}
  }
}
export function navigateTo(path: string, search?: string) {
  if (
    typeof window ===
      "undefined" ||
    !path
  )
    return
  const targetFull =
    path +
    (search ? `?search=${encodeURIComponent(search)}` : "")
  if (
    typeof (window as any).__tenayeNavigate ===
    "function"
  ) {
    try {
      ;(window as any).__tenayeNavigate(targetFull)
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    } catch {}
  }
  window.dispatchEvent(
    new CustomEvent("tenaye-navigate", { detail: { path, search } }),
  )
  window.scrollTo({ top: 0, behavior: "smooth" })
}
export const APP_ROUTES = [
  { path: "/", description: "Home page with health overview and search" },
  {
    path: "/emergency",
    description: "Emergency ambulance hotline (907) and nearby hospitals",
  },
  {
    path: "/symptoms",
    description: "Interactive symptom checker and condition analysis",
  },
  { path: "/diseases", description: "Comprehensive medical disease library" },
  {
    path: "/health-tips",
    description: "Daily wellness, nutrition, and preventive tips",
  },
  {
    path: "/about",
    description: "About Tenaye platform, founders, and mission",
  },
  { path: "/contact", description: "Contact inquiry and feedback form" },
  {
    path: "/legal",
    description: "Terms of service, privacy policy, and medical disclaimer",
  },
]
ai.enableNavigation(
  {
    push: (route: string) => navigateTo(route),
  },
  APP_ROUTES.map((r) => ({
    path: r.path,
    description: r.description,
  })),
)
ai.register({
  searchDiseases: {
    description:
      "Search the verified medical condition library by disease name, symptom, or keyword (e.g. malaria, diabetes, asthma, hypertension, diarrhea).",
    params: {
      query: {
        type: "string",
        required: true,
        description: "Condition name, symptom, or keyword to search",
      },
      category: {
        type: "string",
        description:
          "Optional category filter like Infectious, Chronic, Respiratory, Cardiovascular",
      },
    },
    handler: async ({ query = "", category }: Record<string, any>) => {
      navigateTo("/diseases", query)
      const q = String(query).toLowerCase().trim()
      const matches = ALL_DISEASES.filter((d) => {
        const matchesQuery =
          d.name.toLowerCase().includes(q) ||
          (d.amharicName && d.amharicName.includes(query)) ||
          d.symptoms.some((s) => s.toLowerCase().includes(q))
        const matchesCat =
          !category ||
          category ===
            "All Categories" ||
          d.category.toLowerCase() ===
            String(category).toLowerCase()
        return (
          matchesQuery &&
          matchesCat
        )
      }).slice(0, 4)

      return {
        status: "ok",
        count: matches.length,
        navigatedTo: `/diseases?search=${encodeURIComponent(query)}`,
        results: matches.map((m) => ({
          name: m.name,
          amharicName: m.amharicName,
          category: m.category,
          overview: m.description || m.desc || m.overview || "",
          keySymptoms: m.symptoms.slice(0, 4),
        })),
        message: `Found ${matches.length} conditions matching "${query}". Showing results in the Disease Library.`,
      }
    },
  },
  getDiseaseDetails: {
    description:
      "Get detailed clinical guidance for a specific condition: overview, key symptoms, causes, medical treatment, home care, and prevention. Can be filtered to specific aspects (e.g. 'symptoms only' or 'symptoms, cause and treatment').",
    params: {
      diseaseName: {
        type: "string",
        required: true,
        description: "Name of the disease (in English or Amharic)",
      },
      requestedAspects: {
        type: "string",
        description:
          "Optional specific sections requested e.g. 'symptoms only' or 'symptoms, cause and treatment'",
      },
    },
    handler: async ({
      diseaseName = "",
      requestedAspects,
    }: Record<string, any>) => {
      const q = String(diseaseName).toLowerCase().trim()
      const found = ALL_DISEASES.find(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          q.includes(d.name.toLowerCase()) ||
          (d.amharicName &&
            (d.amharicName.includes(diseaseName) ||
              diseaseName.includes(d.amharicName))),
      )

      if (found) {
        navigateTo(`/diseases/${found.id}`)
        const aspectQuery = (
          requestedAspects ||
          ""
        ).toLowerCase()
        const wantsOnlySymptoms =
          /symptom|sign|ምልክት/.test(aspectQuery) &&
          !/treatment|cause|care|ህክምና|መንስኤ/.test(aspectQuery)
        const wantsSymptomsCausesTreatment =
          /symptom/.test(aspectQuery) &&
          /cause/.test(aspectQuery) &&
          /treatment/.test(aspectQuery)

        return {
          status: "ok",
          id: found.id,
          name: found.name,
          amharicName: found.amharicName,
          category: found.category,
          overview: found.description || found.desc || found.overview || "",
          symptoms: found.symptoms,
          causes: wantsOnlySymptoms ? undefined : found.causes,
          treatment: wantsOnlySymptoms ? undefined : found.treatment,
          prevention:
            wantsOnlySymptoms ||
            wantsSymptomsCausesTreatment
              ? undefined
              : found.prevention,
          whenToSeeDoctor:
            wantsOnlySymptoms ||
            wantsSymptomsCausesTreatment
              ? undefined
              : found.whenToSeeDoctor,
          message: `Opened detailed medical page for ${found.name}.`,
        }
      }

      navigateTo("/diseases", diseaseName)
      return {
        status: "not_found",
        message: `Condition "${diseaseName}" was not found directly in catalog. Showing search results.`,
      }
    },
  },
  checkSymptoms: {
    description:
      "Analyze symptoms, feelings, or illness complaints (e.g. fever, headache, cough, fatigue, stomach ache, nausea, dizziness). NEVER call this for acute injuries, bleeding, cuts, accidents, breathing problems, choking, burns, or first aid (call getFirstAidGuide for those). Directly explains likely matching diseases and self-care steps without redirecting or saying 'go to dev'.",
    params: {
      symptoms: {
        type: "string",
        required: true,
        description:
          "Reported symptoms or feelings e.g. headache, fever, stomach pain, dizziness",
      },
    },
    handler: async ({ symptoms = "" }: Record<string, any>) => {
      if (isEmergencyOrFirstAidQuery(symptoms)) {
        const firstAid = await getClinicalFirstAidSteps(
          symptoms,
          currentActiveLanguage,
        )
        return {
          status: "emergency_resolved",
          condition: firstAid.condition,
          MANDATORY_SPEECH_INSTRUCTION: `CRITICAL: You MUST speak these exact physical action steps OUT LOUD immediately: ${firstAid.spokenText}`,
          spokenSteps: firstAid.spokenText,
          steps: firstAid.steps.map(
            (s) => `${s.number}. ${s.title}: ${s.detail}`,
          ),
          message: firstAid.spokenText,
        }
      }

      const isAm =
        currentActiveLanguage ===
        "am"
      const matches = matchSymptomsToDiseases(symptoms)
      const top = matches.slice(0, 3)

      if (
        top.length >
        0
      ) {
        const conditionNames = top
          .map((t) =>
            isAm &&
            t.disease.amharicName
              ? `${t.disease.amharicName} (${t.disease.name})`
              : t.disease.name,
          )
          .join("፣ ")
        const spokenText = isAm
          ? `ከተሰማዎት ምልክቶች አንጻር ተቀራራቢ ሊሆኑ የሚችሉ በሽታዎች፡ ${conditionNames} ናቸው። ለእነዚህ በሽታዎች በቂ እረፍት ማድረግ፣ ብዙ ንፁህ ፈሳሽ መጠጣት እና ምልክቶቹ ከጸኑ ወደ ጤና ጣቢያ መሄድ ይመረጣል።`
          : `Based on your symptoms, the most probable conditions from our verified disease catalog are ${top.map((t) => t.disease.name).join(", ")}. Key home care includes resting well, staying hydrated, and consulting a health center if symptoms persist.`

        return {
          status: "ok",
          source: "verified_catalog",
          matchedConditions: top.map((t) => ({
            name: t.disease.name,
            amharicName: t.disease.amharicName,
            overview:
              t.disease.description ||
              t.disease.desc ||
              t.disease.overview ||
              "",
            keySymptoms: t.disease.symptoms.slice(0, 4),
            selfCare:
              t.disease.selfCare ||
              [],
          })),
          MANDATORY_SPEECH_INSTRUCTION: `CRITICAL: You MUST speak these matching conditions and practical self-care steps OUT LOUD directly in ${
            isAm ? "fluent Amharic" : "English"
          }: ${spokenText} FORBIDDEN: NEVER tell the user to 'go to dev' or 'visit developer'. NEVER navigate away or say 'opened symptom checker'. Recite the conditions and relief steps immediately.`,
          message: spokenText,
        }
      }
      try {
        const geminiRes = await queryGeminiClinical(symptoms, isAm)
        if (geminiRes && geminiRes.rawText) {
          const spoken = isAm
            ? `ለተሰማዎት ምልክት ተቀራራቢ ሊሆን የሚችለው ሁኔታ ${geminiRes.possibleCondition} ነው። ${geminiRes.overview} በቂ እረፍት ያድርጉና ንፁህ ፈሳሽ ይጠጡ።`
            : `For your symptoms, a probable condition is ${geminiRes.possibleCondition}. ${geminiRes.overview} Rest well, stay hydrated, and consult a clinic if symptoms persist.`

          return {
            status: "ok",
            source: "gemini_clinical",
            possibleCondition: geminiRes.possibleCondition,
            overview: geminiRes.overview,
            symptoms: geminiRes.symptoms,
            firstAidSteps: geminiRes.firstAidSteps,
            MANDATORY_SPEECH_INSTRUCTION: `CRITICAL: Directly speak the condition name, clinical overview, and care steps to the user out loud in ${
              isAm ? "Amharic" : "English"
            }: ${spoken} FORBIDDEN: NEVER tell the user to 'go to dev' or 'visit developer'.`,
            message: spoken,
          }
        }
      } catch (err) {
        console.warn("[checkSymptoms Gemini Error]", err)
      }
      const advice = await getGeneralMedicalAdvice(
        symptoms,
        currentActiveLanguage,
      )
      return {
        status: "ok",
        source: "clinical_advisor",
        advice: advice.advice,
        MANDATORY_SPEECH_INSTRUCTION: `CRITICAL: Directly speak this clinical guidance OUT LOUD to the user: ${advice.advice} FORBIDDEN: NEVER tell the user to 'go to dev' or 'visit developer'.`,
        message: advice.advice,
      }
    },
  },
  getFirstAidGuide: {
    description:
      "CRITICAL LIFE-SAVING EMERGENCY TOOL (HIGHEST PRIORITY): Call this IMMEDIATELY whenever the caller mentions ANY bleeding, leg bleeding, friend bleeding, injury, cut, wound, collapse, cannot breathe, choking, burns, CPR, or asks how to help someone ('እየደማ ነው', 'እየደማነው', 'እግሩ ደማ', 'እግሩ እየደማነው', 'እግሩ እየደማ ነው', 'ደሙ', 'ደም', 'ቁስል', 'እንዴት ልረዳው እችላለሁ', 'ነገሪኝ', 'እንዴት ልረዳው እችላለሁ ነገሪኝ', 'መተንፈስ አቅቶት', 'ወደቀ', 'ምን ላድርግ', 'የመጀመሪያ እርዳታ', 'bleeding leg', 'friend bleeding', 'how to help my friend'). FORBIDDEN: DO NOT navigate to /first-aid or any page. YOU MUST CALL THIS TOOL TO GET AND SPEAK THE NUMBERED PHYSICAL STEPS IMMEDIATELY OUT LOUD.",
    params: {
      condition: {
        type: "string",
        required: true,
        description:
          "The specific emergency situation (e.g. friend collapsed cannot breathe, bleeding leg, choking, burn, accident)",
      },
      userAlsoAskedForHospital: {
        type: "boolean",
        description:
          "True if caller also asked to find nearby hospital or GPS navigation",
      },
    },
    handler: async ({
      condition = "",
      userAlsoAskedForHospital,
    }: Record<string, any>) => {
      const q = (
        condition ||
        ""
      ).toLowerCase()
      const wantsHospital = Boolean(
        userAlsoAskedForHospital ||
          /hospital|ሆስፒታል|find|ፈልግ|ቅርብ|nearby|gps|emergency page/i.test(q),
      )
      const firstAid = await getClinicalFirstAidSteps(
        condition ||
          "emergency first aid",
        currentActiveLanguage,
      )

      if (wantsHospital) {
        navigateTo("/emergency?autoLocate=true")
      }

      return {
        status: "ok",
        condition: firstAid.condition,
        MANDATORY_SPEECH_INSTRUCTION: `CRITICAL: You MUST speak these exact physical action steps OUT LOUD to the caller IMMEDIATELY in fluent ${currentActiveLanguage === "am" ? "Amharic" : "English"}: ${firstAid.spokenText} FORBIDDEN: DO NOT navigate to /first-aid. DO NOT tell them to visit /first-aid or any page. DO NOT say 'ይህ መረጃ ለትምህርት ብቻ ነው'. DO NOT tell them to call 907 first. DO NOT ask permission ('Shall I start?'). Recite the numbered physical steps directly and purely. ${
          wantsHospital
            ? "After reciting the steps, announce that you have opened the Emergency page in the background to locate nearby hospitals via GPS."
            : ""
        }`,
        spokenSteps: firstAid.spokenText,
        steps: firstAid.steps.map(
          (s) => `${s.number}. ${s.title}: ${s.detail}`,
        ),
        message:
          firstAid.spokenText +
          (wantsHospital
            ? " I have also opened the Emergency page in the background to locate nearby hospitals via GPS."
            : ""),
      }
    },
  },
  findNearestHospitals: {
    description:
      "Locate and find the closest emergency hospitals, nearby clinics, and ambulance dispatch (907) based on the user's live GPS location, proximity, or city in Ethiopia (በአቅራቢያ ያሉ ሆስፒታሎች፣ ቅርብ ሆስፒታል፣ በጂኦሎኬሽን፣ በጂፒኤስ). If the user mentions an injury, bleeding, or an injured friend, this action also provides urgent life-saving first aid steps.",
    params: {
      locationOrCity: {
        type: "string",
        description:
          "Optional location description, area, city, or 'nearby' / 'GPS'",
      },
      injuryOrCondition: {
        type: "string",
        description:
          "Optional injury description like 'bleeding on leg', 'burn', 'friend injured'",
      },
    },
    handler: async ({
      locationOrCity,
      injuryOrCondition,
    }: {
      locationOrCity?: string
      injuryOrCondition?: string
    }) => {
      navigateTo("/emergency?autoLocate=true")
      const all = getInstantDatabaseHospitals()
      const q = (
        locationOrCity ||
        ""
      ).toLowerCase()
      const filtered =
        q &&
        !q.includes("near") &&
        !q.includes("close") &&
        !q.includes("gps") &&
        !q.includes("አቅራቢያ") &&
        !q.includes("location")
          ? all.filter((h) => h.city.toLowerCase().includes(q))
          : all
      const top = (
        filtered.length >
        0
          ? filtered
          : all
      ).slice(0, 4)

      const hasEmergencyOrInjury = Boolean(
        injuryOrCondition ||
          /bleed|blood|wound|cut|injury|leg|friend|breathe|breath|collaps|unconscious|chok|burn|ደሙ|ደም|ቁስል|እግር|ጓደኛ|አደጋ|እርዳታ|መተንፈስ|መታንፈስ|ትንፋሽ|ወደቀ|ወድቋል|ራሱን/i.test(
            q,
          ) ||
          /bleed|blood|wound|cut|injury|leg|friend|breathe|breath|collaps|unconscious|chok|burn|ደሙ|ደም|ቁስል|እግር|ጓደኛ|አደጋ|እርዳታ|መተንፈስ|መታንፈስ|ትንፋሽ|ወደቀ|ወድቋል|ራሱን/i.test(
            injuryOrCondition ||
              "",
          ),
      )

      let firstAidSpoken: string | undefined = undefined
      let firstAidStepsList: string[] | undefined = undefined

      if (hasEmergencyOrInjury) {
        const query =
          injuryOrCondition || locationOrCity || "emergency first aid"
        const firstAid = await getClinicalFirstAidSteps(
          query,
          currentActiveLanguage,
        )
        firstAidSpoken = firstAid.spokenText
        firstAidStepsList = firstAid.steps.map(
          (s) => `${s.number}. ${s.title}: ${s.detail}`,
        )
      }

      return {
        status: "ok",
        action: "locate_nearby_hospitals",
        ambulanceHotline:
          "907 (National Toll-Free Ambulance - አገር አቀፍ ነፃ የአምቡላንስ ጥሪ)",
        policeHotline: "991",
        redCrossHotline: "939",
        hospitals: top.map((h) => ({
          name: h.name,
          city: h.city,
          phone:
            h.phone ||
            h.emergencyPhone,
          address: h.address,
        })),
        MANDATORY_SPEECH_INSTRUCTION:
          hasEmergencyOrInjury &&
          firstAidSpoken
            ? `CRITICAL: The caller has an active emergency or injured friend! You MUST speak these pure physical first aid steps OUT LOUD FIRST before mentioning the hospital list: ${firstAidSpoken} Then state you opened the emergency hospital locator with live GPS search.`
            : "Announce that live GPS hospital search is active on the Emergency page and the closest verified facilities are on screen, with ambulance hotline 907.",
        urgentFirstAidSteps: firstAidSpoken,
        numberedSteps: firstAidStepsList,
        message:
          hasEmergencyOrInjury &&
          firstAidSpoken
            ? `FIRST AID STEPS: ${firstAidSpoken} Emergency Hospital Locator is active with nearby hospitals on screen.`
            : "Live GPS hospital locator activated! Opened Emergency page with automatic location search. Showing closest verified emergency hospitals and 907 national ambulance dispatch.",
      }
    },
  },
  consultMedicalAdvisor: {
    description:
      "Get trusted medical clinical advice and home care recommendations for symptoms or health questions (e.g. 'I feel headache, a fever', 'what to do for stomach pain', 'feeling dizzy', 'ራስ ምታት አለብኝ ምን ላድርግ'). Queries Gemini API and temporary storage to provide spoken clinical guidance.",
    params: {
      question: {
        type: "string",
        required: true,
        description: "The user's medical or health query",
      },
    },
    handler: async ({ question = "" }: Record<string, any>) => {
      const advice = await getGeneralMedicalAdvice(
        question,
        currentActiveLanguage,
      )
      return {
        status: "ok",
        question: advice.query,
        clinicalAdvice: advice.advice,
        source: advice.source,
        message: advice.advice,
      }
    },
  },

  findEmergencyServices: {
    description:
      "Find verified emergency hospitals, dispatch hotlines, and 24/7 ambulance services (907) in Ethiopian cities like Addis Ababa, Adama, Hawassa, Bahir Dar, Gondar, Jimma, or by GPS proximity.",
    params: {
      city: { type: "string", description: "City name or nearby in Ethiopia" },
    },
    handler: async ({ city }: Record<string, any>) => {
      navigateTo("/emergency?autoLocate=true")
      const all = getInstantDatabaseHospitals()
      const filtered = city
        ? all.filter((h) =>
            h.city.toLowerCase().includes(String(city).toLowerCase()),
          )
        : all
      const top = (
        filtered.length >
        0
          ? filtered
          : all
      ).slice(0, 4)

      return {
        status: "ok",
        ambulanceHotline: "907 (National Toll-Free Ambulance)",
        policeHotline: "991",
        redCrossHotline: "939",
        city:
          city ||
          "All Ethiopia",
        hospitals: top.map((h) => ({
          name: h.name,
          city: h.city,
          phone:
            h.phone ||
            h.emergencyPhone,
          address: h.address,
        })),
        message:
          "Opened Emergency Hub with auto-search enabled. National Ambulance Hotline is 907. Verified closest facilities: " +
          top.map((h) => h.name).join(", ") +
          ".",
      }
    },
  },
  getDailyHealthTip: {
    description:
      "Get evidence-based daily wellness, nutrition, hygiene, maternal care, or fitness tips for healthy living in Ethiopia.",
    params: {
      topic: {
        type: "string",
        description:
          "Optional wellness topic (nutrition, hydration, sleep, exercise, heart)",
      },
    },
    handler: async ({ topic = "" }: Record<string, any>) => {
      navigateTo("/health-tips")
      const q = String(topic).toLowerCase()
      const tip = q
        ? ALL_HEALTH_TIPS.find(
            (t) =>
              t.title.toLowerCase().includes(q) ||
              (
                t.desc ||
                ""
              )
                .toLowerCase()
                .includes(q),
          ) ||
          ALL_HEALTH_TIPS[0]
        : ALL_HEALTH_TIPS[
            Math.floor(
              Math.random() *
                ALL_HEALTH_TIPS.length,
            )
          ]

      return {
        status: "ok",
        category: tip.category,
        title: tip.title,
        summary: tip.desc,
        actionableSteps: tip.actions,
        message: `Opened Daily Health Tips: ${tip.title}.`,
      }
    },
  },
  fillContactForm: {
    description:
      "Fill in the contact inquiry and feedback form to send a message to the Tenaye medical platform team.",
    params: {
      name: {
        type: "string",
        sensitive: true,
        description: "Sender full name (protected with redaction)",
      },
      email: { type: "string", description: "Sender email address" },
      subject: { type: "string", description: "Message subject" },
      message: {
        type: "string",
        required: true,
        description: "Inquiry or feedback message",
      },
    },
    handler: async ({
      name,
      email,
      subject,
      message = "",
    }: Record<string, any>) => {
      navigateTo("/contact")
      if (
        typeof window !==
        "undefined"
      ) {
        const payload = { name, email, subject, message }
        ;(window as any).__pendingContactFill = payload
        window.dispatchEvent(
          new CustomEvent("tenaye-fill-contact", { detail: payload }),
        )
      }
      return {
        status: "ok",
        navigatedTo: "/contact",
        message: "Opened Contact page and pre-filled inquiry form.",
      }
    },
  },
  getFounderAndTeam: {
    description:
      "Get the verified founders and core engineering/medical team behind the Tenaye Ethiopian digital health platform.",
    params: {},
    handler: async () => {
      return {
        status: "ok",
        founders:
          "Yonatan Muluken (lead system architect), Nahom Tibebu, Dagmawi Shigute, Ayub Ebrahim",
        mission:
          "Tenaye (ጤናዬ) provides accessible, evidence-based healthcare guidance, emergency dispatch 907, and disease education across Ethiopia.",
        message:
          "The founders and core team behind Tenaye are Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, and Ayub Ebrahim.",
      }
    },
  },
})
ai.bindState(() => {
  const activeLang =
    typeof localStorage !==
    "undefined"
      ? localStorage.getItem("tenaye_assistant_lang") ||
        currentActiveLanguage
      : currentActiveLanguage
  return {
    currentPage:
      typeof location !==
      "undefined"
        ? location.pathname
        : "/",
    platformName: "Tenaye (ጤናዬ) Ethiopian Digital Health Companion",
    emergencyHotline: "907 (National Toll-Free Ambulance 24/7 — ነፃ የአምቡላንስ ጥሪ)",
    bilingualDirective:
      "You are fully bilingual in Amharic and English. If the user speaks or writes in Amharic, provide your full response in natural, fluent Amharic. If the user speaks or writes in English, reply in English. Always give immediate, direct responses without filler.",
    emergencyPureStepsDirective: `ABSOLUTE EMERGENCY FIRST AID DIRECTIVE:
When the user mentions ANY emergency, injury, bleeding, leg bleeding, friend injured, collapse, friend unable to breathe, choking, CPR, or asks how to help someone (e.g. 'እስቲ ጓደኛዬ እግሩ እየደማነውና እንዴት ልረዳው እችላለሁ ነገሪኝ', 'ጓደኛዬ እግሩ እየደማ ነው', 'እግሩ ደም እየፈሰሰ ነው', 'ጓደኛዬ መታንፈስ አቅቶት ወድቋል', 'ምን ላድርግ', 'can't breathe', 'collapsed', 'bleeding'):
1. YOU MUST IMMEDIATELY CALL THE getFirstAidGuide TOOL. NEVER PROVIDE FIRST AID ADVICE YOURSELF DIRECTLY IN TEXT. ALWAYS USE THE TOOL.
2. ABSOLUTELY FORBIDDEN: NEVER navigate to /first-aid. You do NOT have permission to navigate to first-aid.
3. ABSOLUTELY FORBIDDEN: NEVER say 'ጓደኛዎን መርዳት እንዲችሉ፣ የመጀመሪያ እርዳታ ወደሚገኝበት ገጽ ልውሰድዎ' (Let me take you to the first-aid page) or 'ይህ መረጃ ለትምህርት ብቻ ነው፣ ለህክምና ምርመራ ምትክ አይደለም' (This info is for education only).
4. ABSOLUTELY FORBIDDEN: NEVER say 'መጀመሪያ 907 ደውሉ' (First call 907 before I can tell you instructions). The caller already knows about 907 and hospitals.
5. ABSOLUTELY FORBIDDEN: NEVER ask permission like 'Shall I start the instructions?' (መመሪያዎችን ልጀምር?).
6. YOU MUST DIRECTLY RECITE THE NUMBERED ACTION STEPS (ደረጃ 1፦ ... ደረጃ 2፦ ... ደረጃ 3፦ ... ደረጃ 4፦ ... ደረጃ 5፦ ...) IMMEDIATELY AND DIRECTLY OUT LOUD:
   - For bleeding on leg or wound: ደረጃ 1፦ ወዲያውኑ ንፁህ ጨርቅ በቁስሉ ላይ አድርገው በሁለት እጅዎ አጥብቀው ሳይለቁ ይጫኑ። ደረጃ 2፦ በቁስሉ ዙሪያ በንፁህ ውሃ ያፅዱ፤ አልኮል ወደ ጥልቅ ቁስል ውስጥ እንዳያፈሱ። ደረጃ 3፦ የተጎዳውን እግር ከልብ ከፍ አድርገው ያንሱ። ደረጃ 4፦ በፋሻ አጥብቀው ያስሩ፤ ደም ከወጣ ሌላ ጨርቅ ደርበው ይጫኑ። ደረጃ 5፦ ተጎጂውን አስተኝተው ያረጋጉ፣ በብርድ ልብስ ይሸፍኑ።
   - For breathing difficulty / collapse: 1. Open airway 2. Check breathing 3. CPR 100-120/min if not breathing 4. Recovery position on side if breathing 5. Loosen tight clothes.
7. If the user asked to find a hospital or asked for both first aid and hospital, recite the pure first aid steps FIRST, and only AFTER finishing the steps announce that you have opened the Emergency page in the background to locate nearby hospitals via GPS.`,
    gpsHospitalDirective:
      "CRITICAL: The Tenaye platform HAS FULL LIVE GPS GEOLOCATION CAPABILITY. When the visitor asks to find a nearby hospital, closest hospital by location, or hospital by GPS ('find nearby hospital', 'በአቅራቢያ ያለ ሆስፒታል ፈልግልኝ'), you MUST IMMEDIATELY call the `findNearestHospitals` action! NEVER say you cannot use GPS or geolocation. The platform automatically triggers browser GPS navigation and displays nearby facilities on the live map with hotline 907.",
    fastResponseDirective:
      "ULTRA-FAST DIRECT RESPONSE: You are operating in real-time voice mode where every second counts. Give your spoken response IMMEDIATELY without delays, introductory filler, or pauses. When asked about first aid or an emergency, start reciting Step 1 right away. Never repeat the question back to the caller.",
    medicalGuidanceRules:
      "Adhere strictly to the visitor's specific query. If the user asks for symptoms only (e.g. malaria symptoms), provide overview and symptoms only. If they ask for symptoms, cause, and treatment (e.g. diabetes), provide overview, symptoms, causes, and treatment without unsolicited extra sections like prevention or doctor warnings. Never output control tokens like <ctrl95>.",
    symptomsAndFeelingsDirective: `CRITICAL SYMPTOMS & FEELINGS DIRECTIVE:
When the user shares how they feel, describes symptoms (e.g. 'I feel a headache and dizzy', 'ሆዴን እና ራሴን እያመመኝ ነው', 'ትኩሳት አለብኝ', 'I feel pain in my stomach'), or asks what illness they might have:
1. You MUST call checkSymptoms or consultMedicalAdvisor to get the related diseases and care steps.
  2. DO NOT output medical disclaimers or say you cannot diagnose. You are a Symptom Checker platform, so provide 'Possible Conditions' confidently based on the tool results.
2. ABSOLUTELY FORBIDDEN: NEVER say 'go to dev', 'visit developer', or mention developers in any way!
3. ABSOLUTELY FORBIDDEN: NEVER tell the user to go to the symptom checker page or redirect them.
4. Directly tell the user the likely related disease names (from our verified disease library or clinical guidance), explain why, and tell them practical home care and relief steps out loud immediately.`,
    activeLanguage: activeLang,
    diseaseCatalogCount: ALL_DISEASES.length,
    firstAidTopicsCount: FIRST_AID_TOPICS.length,
  }
})
export function resolveSpokenPage(rawText: string): string | null {
  if (!rawText) return null
  const s = rawText.toLowerCase().trim()
  if (isEmergencyOrFirstAidQuery(s)) {
    return null
  }

  if (
    s ===
      "/about" ||
    s ===
      "/contact" ||
    s ===
      "/emergency" ||
    s ===
      "/symptoms" ||
    s ===
      "/diseases" ||
    s ===
      "/first-aid" ||
    s ===
      "/health-tips" ||
    s ===
      "/"
  ) {
    return s
  }
  if (
    /\b(open\s+(?:the\s+)?about(?:\s+page|\s+us)?|about\s+page|about\s+us|apple\s+picture|about\s+picture|apple\s+page|up\s+picture|a\s+picture)\b/i.test(
      s,
    ) ||
    /(ስለ\s*እኛ\s*ገጽ\s*(ክፈት|ሂድ)|ስለእኛ\s*ገጽ\s*ክፈት)/i.test(s)
  ) {
    return "/about"
  }
  if (
    /\b(open\s+emergency|emergency\s+page|open\s+ambulance|call\s+907|hotline\s+907|find(\s+me)?\s+(a\s+)?nearby\s+hospital|nearest\s+hospital|nearby\s+hospitals?|closest\s+hospital|find\s+hospital|hospitals?\s+(?:near\s+me|by\s+location|by\s+gps))\b/i.test(
      s,
    ) ||
    /(ድንገተኛ(\s*አደጋ)?\s*ገጽ\s*(ክፈት|ሂድ)|አምቡላንስ\s*ገጽ|በአቅራቢያ(\s*ያለ|\s*ያሉ|\s*ያለው)?\s*ሆስፒታል|የአቅራቢያ\s*ሆስፒታል|ሆስፒታል\s*(ፈልግልኝ|ፈልግ|አሳየኝ|እፈልጋለሁ)|በጂኦሎኬሽን|በጂፒኤስ|ቅርብ\s*ሆስፒታል|የድንገተኛ\s*ሆስፒታል)/i.test(
      s,
    )
  ) {
    return "/emergency?autoLocate=true"
  }
  if (
    /\b(open\s+symptom\s+checker|symptom\s+checker(\s+page)?|check\s+my\s+symptoms|check\s+symptoms|symptom\s+page)\b/i.test(
      s,
    ) ||
    /(የምልክቶች\s*መመርመሪያ\s*(ክፈት|ሂድ)|ምልክቶች\s*(መርምር|ፈትሽ))/i.test(s)
  ) {
    return "/symptoms"
  }
  if (
    /\b(?:open|go\s+to)\s+(?:the\s+)?first\s*aid\s+page\b/i.test(s) ||
    /(የመጀመሪያ\s*እርዳታ\s*ገጽ\s*(ክፈት|ሂድ))/i.test(s)
  ) {
    return "/first-aid"
  }
  if (
    /\b(open\s+health\s*tips?|health\s*tips?\s+page|wellness\s*page)\b/i.test(
      s,
    ) ||
    /(የጤና\s*ምክሮች?\s*ገጽ\s*(ክፈት|ሂድ))/i.test(s)
  ) {
    return "/health-tips"
  }
  if (
    /\b(open\s+disease\s+library|open\s+diseases?(\s+page)?|go\s+to\s+diseases?(\s+page)?)\b/i.test(
      s,
    ) ||
    /(የበሽታዎች\s*ማውጫ\s*ክፈት|የበሽታዎች\s*ገጽ\s*(ክፈት|ሂድ))/i.test(s)
  ) {
    return "/diseases"
  }
  if (
    /\b(open\s+contact(\s+page)?|contact\s+us\s+page|go\s+to\s+contact(\s+page)?)\b/i.test(
      s,
    ) ||
    /(አግኙን\s*ገጽ\s*(ክፈት|ሂድ)|የአግኙን\s*ገጽ\s*ክፈት)/i.test(s)
  ) {
    return "/contact"
  }
  if (
    /\b(open\s+home(\s+page)?|go\s+home|back\s+to\s+home|home\s+page)\b/i.test(
      s,
    ) ||
    /(መነሻ\s*ገጽ\s*(ክፈት|ሂድ)|ወደ\s*መነሻ\s*ገጽ)/i.test(s)
  ) {
    return "/"
  }
  return null
}

import { AIAssistant } from "./AIAssistant"
export function Assistant() {
  return <AIAssistant />
}

export default Assistant
