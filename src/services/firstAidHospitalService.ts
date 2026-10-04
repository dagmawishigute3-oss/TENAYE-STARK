/**
 * File: src/services/firstAidHospitalService.ts
 * Tenaye Emergency & First Aid Bridge
 * Unites local First Aid clinical procedures with verified real-time hospital coordinates and phone numbers.
 */

import { FIRST_AID_TOPICS, FirstAidTopic } from "../data/firstAidData"
import {
  VERIFIED_SEEDED_FACILITIES,
  calculateDistanceKm,
  type Hospital,
} from "./hospitalLocatorService"
import { queryGeminiClinical } from "./geminiService"
import { getClinicalFirstAidSteps } from "./geminiMedicalService"

export interface EmergencyActionPayload {
  isEmergencyQuery: boolean
  topicTitle?: string
  topicId?: string
  firstAidSteps: string[]
  spokenFirstAid: string
  closestHospitals: Hospital[]
  ambulanceNumbers: { name: string; number: string; desc: string }[]
  fullSummaryText: string
}

// Emergency Hotlines across Ethiopia
export const ETHIOPIAN_EMERGENCY_HOTLINES = [
  {
    name: "Red Cross Ambulance",
    number: "907",
    desc: "National Toll-Free Emergency Dispatch",
  },
  {
    name: "Federal Police Emergency",
    number: "991",
    desc: "Accident & Incident Response",
  },
  {
    name: "Tebita Ambulance",
    number: "8035",
    desc: "Advanced Life Support Dispatch",
  },
  {
    name: "Red Cross Support",
    number: "939",
    desc: "Emergency Relief Services",
  },
]

/**
 * Checks if the user inquiry is asking about an acute emergency, injury, first aid, or nearby hospitals.
 */
export function isEmergencyOrFirstAidQuery(query: string): boolean {
  if (!query) return false
  const q = query.toLowerCase()

  const triggers = [
    // English trauma / injury / accident / emergency triggers
    "bleed",
    "bleeding",
    "blood",
    "wound",
    "cut",
    "hemorrhage",
    "hospital",
    "clinic",
    "emergency",
    "ambulance",
    "907",
    "paramedic",
    "cpr",
    "choking",
    "burn",
    "burns",
    "fracture",
    "broken bone",
    "snake bite",
    "poison",
    "faint",
    "unconscious",
    "seizure",
    "first aid",
    "nearby hospital",
    "nearest hospital",
    "find hospital",
    
    "accident",
    "injured",
    "injury",
    
    
    "can't breathe",
    "cannot breathe",
    "unable to breathe",
    "breath",
    "breathe",
    "collapsed",
    "collapse",
    "fell down",
    "passed out",
    "trauma",
    "head injury",
    
    
    "chest pain",
    "heart attack",
    // Amharic trauma / injury / emergency terms
    "ደም",
    "ደማ",
    "እየደማ",
    "መድማት",
    "ቁስል",
    "የተጎዳ",
    "ተጎዳ",
    "ጉዳት",
    "አደጋ",
    "ወደቀ",
    "ወድቋል",
    "መተንፈስ",
    "መታንፈስ",
    "ትንፋሽ",
    "አቅቶት",
    "አልቻለም",
    "ታነቀ",
    "ማነቅ",
    "መታነቅ",
    "ተቃጠለ",
    "ቃጠሎ",
    "ተሰበረ",
    "ስብራት",
    "መሰበር",
    "መርዝ",
    "የሚጥል",
    "መንቀጥቀጥ",
    "ራሱን ሳተ",
    "የመጀመሪያ እርዳታ",
    "እርዳታ",
    "ሆስፒታል",
    "አምቡላንስ",
    "ድንገተኛ",
    "እባብ",
    "ነደፈው",
    "ነደፈችው",
  ]

  return triggers.some((t) => q.includes(t))
}

/**
 * Searches local verified first aid procedures for the best topic match.
 */
export function matchLocalFirstAidTopic(query: string): FirstAidTopic | null {
  const q = query.toLowerCase()

  // Keyword to topic ID mapping
  if (
    q.includes("bleed") ||
    q.includes("blood") ||
    q.includes("wound") ||
    q.includes("cut") ||
    q.includes("ደም") ||
    q.includes("ቁስል")
  ) {
    return FIRST_AID_TOPICS.find((t) => t.id === "bleeding") || null
  }
  if (
    q.includes("cpr") ||
    q.includes("heart stop") ||
    q.includes("breath") ||
    q.includes("ልብ")
  ) {
    return FIRST_AID_TOPICS.find((t) => t.id === "cpr") || null
  }
  if (q.includes("chok") || q.includes("swallow") || q.includes("መታፈን")) {
    return FIRST_AID_TOPICS.find((t) => t.id === "choking") || null
  }
  if (
    q.includes("burn") ||
    q.includes("fire") ||
    q.includes("scalding") ||
    q.includes("ማቃጠል")
  ) {
    return FIRST_AID_TOPICS.find((t) => t.id === "burns") || null
  }
  if (
    q.includes("fracture") ||
    q.includes("broken") ||
    q.includes("bone") ||
    q.includes("ስብራት")
  ) {
    return FIRST_AID_TOPICS.find((t) => t.id === "fractures") || null
  }
  if (q.includes("snake") || q.includes("bite") || q.includes("እባብ")) {
    return FIRST_AID_TOPICS.find((t) => t.id === "snakebite") || null
  }

  // Fallback search in titles and overview
  return (
    FIRST_AID_TOPICS.find(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.shortTitle.toLowerCase().includes(q) ||
        t.overview.toLowerCase().includes(q),
    ) || null
  )
}

/**
 * Resolves an emergency query into a coordinated response:
 * 1. Immediate First Aid Instructions (Local -> Gemini fallback)
 * 2. Real nearby verified hospitals with phone numbers
 * 3. Short spoken voice summary for Voxide
 */
export async function resolveEmergencyAction(
  query: string,
  isAmharic: boolean = false,
  userCoords?: { lat: number; lng: number } | null,
): Promise<EmergencyActionPayload | null> {
  if (!isEmergencyOrFirstAidQuery(query)) {
    return null
  }

  // 1. Fetch nearby verified hospital facilities
  let hospitals: Hospital[] = []
  try {
    if (userCoords && userCoords.lat && userCoords.lng) {
      hospitals = (VERIFIED_SEEDED_FACILITIES.map((f) => ({
        ...f,
        distanceKm: calculateDistanceKm(
          userCoords.lat,
          userCoords.lng,
          f.lat,
          f.lng,
        ),
      }))
        .sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999))
        .slice(0, 3) as Hospital[])
    } else {
      // Primary tertiary hospitals in Ethiopia
      hospitals = (VERIFIED_SEEDED_FACILITIES.slice(0, 3) as Hospital[])
    }
  } catch {
    hospitals = (VERIFIED_SEEDED_FACILITIES.slice(0, 3) as Hospital[])
  }

  // 2. Fetch First Aid Steps (Instant clinical protocol with pure numbered steps)
  const clinicalSteps = await getClinicalFirstAidSteps(
    query,
    isAmharic ? "am" : "en",
  )
  const localTopic = matchLocalFirstAidTopic(query)
  const topicTitle = clinicalSteps.condition
  const topicId = localTopic?.id || "emergency"
  const firstAidSteps = clinicalSteps.steps.map(
    (s) => `${s.number}. ${s.title}: ${s.detail}`,
  )

  // 3. Spoken voice summary: Speak the pure physical action steps directly
  const spokenFirstAid = clinicalSteps.spokenText

  // 4. Compose full rich-text summary for the chat
  const hospitalListText = hospitals
    .slice(0, 3)
    .map(
      (h) =>
        `• **${h.name}** (${h.city}) — 📞 [${h.phone || h.emergencyPhone || "+251 900 000 000"}](tel:${h.phone || h.emergencyPhone || "+251900000000"})${
          h.distanceKm ? ` &bull; ${h.distanceKm} km` : ""
        }`,
    )
    .join("\n")

  const stepsListText = firstAidSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")

  const fullSummaryText = isAmharic
    ? `**የመጀመሪያ እርዳታ እና ድንገተኛ መመሪያ (${topicTitle}):**\n\n${stepsListText}\n\n**በአቅራቢያዎ የሚገኙ የህክምና ተቋማት እና ሆስፒታሎች፡**\n${hospitalListText}\n\n**አስቸኳይ የአደጋ ጊዜ ጥሪ፡**\n• 🚑 **907** (የቀይ መስቀል እና ሀገር አቀፍ አምቡላንስ)\n• 👮 **991** (የፌዴራል ፖሊስ)`
    : `**Emergency First Aid & Trauma Protocol (${topicTitle}):**\n\n${stepsListText}\n\n**Nearby Verified Hospitals & Medical Centers:**\n${hospitalListText}\n\n**National Emergency Hotlines:**\n• 🚑 **907** — Toll-Free Ambulance Dispatch\n• 👮 **991** — Federal Emergency Police`

  return {
    isEmergencyQuery: true,
    topicTitle,
    topicId,
    firstAidSteps,
    spokenFirstAid,
    closestHospitals: hospitals,
    ambulanceNumbers: ETHIOPIAN_EMERGENCY_HOTLINES,
    fullSummaryText,
  }
}
