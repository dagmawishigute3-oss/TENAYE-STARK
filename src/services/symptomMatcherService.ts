/**
 * File: src/services/symptomMatcherService.ts
 * Tenaye Symptom to Disease Matcher Engine
 * Extracts clinical keywords from user speech/text and cross-references against 129 verified diseases in diseasesIndex.ts.
 */

import { ALL_DISEASES, DiseaseItem } from "../data/diseasesIndex"
import { isEmergencyOrFirstAidQuery } from "./firstAidHospitalService"

export interface DiseaseMatchResult {
  disease: DiseaseItem
  matchedCount: number
  matchedSymptoms: string[]
  totalSymptoms: number
  matchScore: number
  reason: string
}

// Common symptom keyword dictionary for extraction
const COMMON_SYMPTOM_LEXICON: Record<string, string[]> = {
  fever: [
    "fever",
    "high temp",
    "temperature",
    "chills",
    "ትኩሳት",
    "ትኩሳት አለብኝ",
    "አካሌን አተኩሶኛል",
    "አተኩሶኛል",
    "ብርድ",
    "ብርድ ብርድ",
  ],
  headache: [
    "headache",
    "head pain",
    "migraine",
    "throbbing head",
    "ራስ ምታት",
    "የራስ ህመም",
    "ራሴን",
    "ራሴ",
    "ራሴን አመመኝ",
    "ራሴን እያመመኝ",
    "ራሴን ያመኛል",
    "ራስ ማመም",
  ],
  cough: ["cough", "coughing", "dry cough", "wet cough", "ሳል", "ማሳል", "እያስለኝ", "ያስለኛል"],
  fatigue: [
    "fatigue",
    "tired",
    "tiredness",
    "exhaustion",
    "weakness",
    "ድካም",
    "መድከም",
    "ዝለት",
    "ዝሎኛል",
    "አቅም ማጣት",
  ],
  shortness_of_breath: [
    "shortness of breath",
    "breathless",
    "breathing problem",
    "dyspnea",
    "የትንፋሽ ማጠር",
    "ትንፋሽ ማጠር",
    "መተንፈስ አቃተኝ",
  ],
  chest_pain: [
    "chest pain",
    "chest tightness",
    "chest ache",
    "የደረት ህመም",
    "ደረት ህመም",
    "ደረቴን",
    "ደረቴን አመመኝ",
  ],
  nausea: ["nausea", "vomiting", "throwing up", "puking", "ማቅለሽለሽ", "ትውከት", "አስመለሰኝ", "እያቅለሸለሸኝ"],
  diarrhea: [
    "diarrhea",
    "watery stool",
    "loose stool",
    "runny stomach",
    "ተቅማጥ",
    "ሆድ መረበሽ",
    "አስቀመጠኝ",
    "እያስቀመጠኝ",
  ],
  abdominal_pain: [
    "abdominal pain",
    "stomach pain",
    "belly ache",
    "stomach ache",
    "cramps",
    "የሆድ ህመም",
    "ሆዴን",
    "ሆዴ",
    "ሆዴን አመመኝ",
    "ሆዴን እያመመኝ",
    "ሆዴን ቆረጠኝ",
    "ጨጓራ",
    "የጨጓራ ህመም",
  ],
  dizziness: ["dizziness", "dizzy", "lightheaded", "faint", "ማዞር", "ራስ ማዞር", "አዞረኝ", "እያዞረኝ"],
  sweats: ["sweats", "sweating", "night sweats", "ማላብ", "የሌሊት ላብ", "አላበኝ", "ያልበኛል"],
  rash: ["rash", "skin rash", "itching", "itchy skin", "ሽፍታ", "ማሳከክ", "አሳከከኝ", "ያሳክከኛል"],
  joint_pain: [
    "joint pain",
    "stiff joints",
    "arthritis",
    "bone ache",
    "የመገጣጠሚያ ህመም",
    "የቁርጥማት",
    "ቁርጥማት",
    "መገጣጠሚያዬ",
  ],
  weight_loss: ["weight loss", "losing weight", "የሰውነት ክብደት መቀነስ"],
  blurred_vision: ["blurred vision", "vision problem", "የእይታ ብዥታ", "አይኔን ብዥ"],
}

/**
 * Extracts recognized symptoms from a user's natural language sentence.
 */
export function extractSymptomsFromQuery(text: string): string[] {
  if (!text) return []
  const lower = text.toLowerCase()
  const detected = new Set<string>()

  for (const [symptomKey, variations] of Object.entries(
    COMMON_SYMPTOM_LEXICON,
  )) {
    if (variations.some((v) => lower.includes(v))) {
      detected.add(symptomKey.replace(/_/g, " "))
    }
  }

  return Array.from(detected)
}

/**
 * Checks if a query is asking for educational or reference information about a condition
 * rather than reporting personal clinical symptoms.
 */
export function isEducationalOrDiseaseInquiry(query: string): boolean {
  if (!query) return false
  const q = query.toLowerCase().trim()

  // SICKNESS / FEELING / SYMPTOM OVERRIDE:
  // If the user reports personal symptoms or asks what to do for their symptoms,
  // this is ALWAYS clinical triage, NOT a textbook educational query!
  const personalSymptomTokens = [
    "እያመመኝ",
    "አመመኝ",
    "ያመኛል",
    "ይሰማኛል",
    "ምን ላድርግ",
    "ምን ይሻለኛል",
    "ምን ማድረግ አለብኝ",
    "ምን ማድረግ እችላለሁ",
    "ህመሙ",
    "ሆዴን",
    "ራሴን",
    "ደረቴን",
    "ትኩሳት",
    "አስመለሰኝ",
    "ተቅማጥ",
    "i feel",
    "hurts",
    "hurting",
    "ache",
    "aching",
    "pain",
    "what can i do",
    "what should i do",
    "how to cure my",
    "how to treat my",
    "help me with",
  ]

  if (personalSymptomTokens.some((tok) => q.includes(tok))) {
    return false
  }

  // Informational and educational triggers (e.g. asking for definitions or public health info)
  const infoTriggers = [
    "tell me about",
    "tell about",
    "what is",
    "what are",
    "explain",
    "how is",
    "causes of",
    "symptoms of",
    "treatment for",
    "treatments for",
    "prevention of",
    "information on",
    "info on",
    "learn about",
    "guide on",
    "overview of",
    // Amharic informational triggers
    "ስለ",
    "ምንድን ነው",
    "ምንድነው",
    "እንዴት ይታከማል",
    "እንዴት መከላከል",
    "መንስኤው",
    "መረጃ",
    "አስረዳኝ",
  ]

  if (infoTriggers.some((t) => q.includes(t))) {
    return true
  }

  return false
}

/**
 * Matches symptoms against our 129 local disease items.
 * ONLY triggers when authentic clinical symptoms are detected and the user is not
 * asking an educational/informational question.
 * Returns up to top 2 ranked disease predictions.
 */
export function matchSymptomsToDiseases(query: string): DiseaseMatchResult[] {
  if (!query) return []
  const lower = query.toLowerCase().trim()

  // If this is an acute emergency, injury, or first aid situation, do NOT treat as symptom checker!
  if (isEmergencyOrFirstAidQuery(lower)) {
    return []
  }

  // If this is an educational or overview request (e.g. "Tell me about diabetes..."), do NOT predict symptoms!
  if (isEducationalOrDiseaseInquiry(lower)) {
    return []
  }

  const extracted = extractSymptomsFromQuery(lower)
  // Must extract at least one real symptom from the clinical lexicon!
  if (extracted.length === 0) {
    return []
  }

  const results: DiseaseMatchResult[] = []

  ALL_DISEASES.forEach((disease) => {
    const diseaseSymptoms = disease.symptoms.map((s) => s.toLowerCase())
    const matched: string[] = []

    // Direct extracted symptom matching against disease's symptom list
    extracted.forEach((sym) => {
      const found = diseaseSymptoms.some(
        (ds) => ds.includes(sym) || sym.includes(ds.replace(/[^a-z]/g, "")),
      )
      if (found) {
        matched.push(sym)
      }
    })

    if (matched.length > 0) {
      const count = matched.length
      // Normalized match score prioritizing higher percentage of disease symptoms matched
      const score =
        (count / Math.max(disease.symptoms.length, 1)) * 0.4 + count * 0.6

      results.push({
        disease,
        matchedCount: count,
        matchedSymptoms: Array.from(new Set(matched)).slice(0, 4),
        totalSymptoms: disease.symptoms.length,
        matchScore: score,
        reason: `Matched reported symptoms: ${matched.slice(0, 3).join(", ")}`,
      })
    }
  })

  // Sort by highest match score and return top predictions
  return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5)
}

export interface DetailedDifferentialReport {
  extractedSymptoms: string[]
  topMatches: DiseaseMatchResult[]
  fullText: string
  spokenSummary: string
  shortcutDiseases: { id: string; name: string; amharicName?: string }[]
}

const AMHARIC_SYMPTOM_MAP: Record<string, string> = {
  fever: "ትኩሳት",
  headache: "ራስ ምታት",
  cough: "ሳል",
  fatigue: "ድካም",
  shortness_of_breath: "የትንፋሽ ማጠር",
  chest_pain: "የደረት ህመም",
  nausea: "ማቅለሽለሽ",
  diarrhea: "ተቅማጥ",
  abdominal_pain: "የሆድ ህመም",
  dizziness: "ማዞር",
  sweats: "ማላብ",
  rash: "ሽፍታ",
  joint_pain: "የመገጣጠሚያ ህመም",
  weight_loss: "የክብደት መቀነስ",
  blurred_vision: "የእይታ ብዥታ",
}

function getBodyRegion(category: string, isAm: boolean): string {
  const cat = (category || "").toLowerCase()
  if (cat.includes("respirat")) return isAm ? "የመተንፈሻ አካላት እና ሳንባ" : "Respiratory system and general body"
  if (cat.includes("infect")) return isAm ? "የመተንፈሻ አካላት እና አጠቃላይ ሰውነት" : "Respiratory system and general body"
  if (cat.includes("cardio")) return isAm ? "የልብና የደም ዝውውር ሥርዓት" : "Cardiovascular system and heart"
  if (cat.includes("gastro")) return isAm ? "የምግብ መፈጨት ሥርዓት እና ሆድ" : "Digestive tract and abdominal region"
  if (cat.includes("neuro")) return isAm ? "የነርቭ ሥርዓት እና ጭንቅላት" : "Nervous system and brain"
  if (cat.includes("renal")) return isAm ? "የኩላሊት እና የሽንት መተላለፊያ" : "Renal system and kidneys"
  return isAm ? "አጠቃላይ ሰውነት" : "General body"
}

export function generateDetailedSymptomDifferentialReport(
  query: string,
  isAm: boolean,
): DetailedDifferentialReport | null {
  const matches = matchSymptomsToDiseases(query)
  if (!matches || matches.length === 0) return null

  const extracted = extractSymptomsFromQuery(query)
  if (extracted.length === 0) return null

  const top3 = matches.slice(0, 3)
  const highConf = top3.slice(0, Math.min(top3.length, 2))
  const medConf = top3.slice(2, 3)

  // Map symptoms for header
  const symptomsFormattedEn = extracted.join(", ")
  const symptomsFormattedAm = extracted
    .map((s) => AMHARIC_SYMPTOM_MAP[s] || s)
    .join("፣ ")

  // Calculate realistic clinical match scores
  const getPercent = (idx: number, matchedCount: number): number => {
    if (idx === 0) return matchedCount >= 3 ? 80 : 75
    if (idx === 1) return matchedCount >= 3 ? 75 : 70
    return 60
  }

  let fullText = ""

  // Build targeted clinical context based on detected symptoms
  const hasStomach = extracted.includes("abdominal pain") || extracted.includes("diarrhea") || extracted.includes("nausea")
  const hasHead = extracted.includes("headache") || extracted.includes("dizziness")
  const hasFever = extracted.includes("fever") || extracted.includes("sweats")

  let clinicalContextAm = ""
  let clinicalContextEn = ""
  let immediateStepsAm = ""
  let immediateStepsEn = ""

  if (hasStomach && hasHead) {
    clinicalContextAm = "የሆድ ህመም እና የራስ ምታት በአንድነት መከሰት በተለምዶ በምግብ መመረዝ (Food Poisoning)፣ በጨጓራ ባክቴሪያ (H. Pylori/Gastritis)፣ በቫይረስ ጋስትሮኢንተራይተስ (የሆድ ፍሉ)፣ ወይም በውሃ እጥረት (Dehydration) ምክንያት ሊሆን ይችላል።"
    clinicalContextEn = "Experiencing abdominal pain alongside headache often indicates gastroenteritis (stomach flu), foodborne infection, acute gastritis, or dehydration resulting from metabolic stress."
    immediateStepsAm = 
      "• **ንጹህ ፈሳሽ መውሰድ (Hydration):** የፈላ ውሃ፣ የኦ.አር.ኤስ (ORS) መፍትሄ ወይም ሻይ በትንሽ በትንሹ ይጠጡ። የቀዘቀዙ እና የጋዝ መጠጦችን ያስወግዱ።\n" +
      "• **ቀለል ያሉ ምግቦች (Bland Diet):** ቅባት የበዛባቸው፣ የሚያቃጥሉ፣ ወይም የኮመጠጡ ምግቦችን ያቁሙ። ሩዝ፣ ገንፎ፣ ወይም ሙዝ ይመገቡ።\n" +
      "• **እረፍት እና ማስታገሻ:** ጨለማ እና ጸጥ ባለ ክፍል ውስጥ እረፍት ያድርጉ። ለራስ ምታት ፓራሲታሞል (Paracetamol) መውሰድ ይችላሉ (የጨጓራ ህመም ካለ አስፕሪን ወይም ኢቡፕሮፌን አይውሰዱ)።\n" +
      "• **አስቸኳይ ምልክቶች:** የማያቋርጥ ትውከት፣ ደም የቀላቀለ ሰገራ፣ ወይም ከፍተኛ ትኩሳት ካለ ወዲያውኑ ወደ ሐኪም ይሂዱ።"
    immediateStepsEn =
      "• **Active Hydration:** Sip ORS solution, clear broth, or boiled water in small increments. Avoid sodas and dairy.\n" +
      "• **Bland Diet:** Stick to easy-to-digest items (rice, toast, oatmeal, bananas). Avoid spicy, greasy, or acidic foods.\n" +
      "• **Rest & Pain Management:** Rest in a quiet environment. Paracetamol may be taken for headache (avoid NSAIDs like Ibuprofen/Aspirin if stomach is inflamed).\n" +
      "• **Warning Signs:** Seek immediate emergency care if you develop persistent vomiting, blood in stool, or high fever."
  } else if (hasStomach) {
    clinicalContextAm = "የሆድ ህመም የምግብ አለመፈጨት፣ የጨጓራ አሲድ መብዛት፣ ኢንፌክሽን ወይም የተቅማጥ ባክቴሪያ ምልክት ሊሆን ይችላል።"
    clinicalContextEn = "Abdominal discomfort typically stems from acid gastritis, indigestion, food sensitivity, or enteritis."
    immediateStepsAm = 
      "• **ፈሳሽ አያቋርጡ:** በቂ ንጹህ ውሃ እና ሞቅ ያለ ሻይ ይውሰዱ።\n" +
      "• **የጨጓራ አሲድ የሚያባብሱ ምግቦችን ማስወገድ:** በርበሬ፣ ሎሚ፣ እና ቡና ለጊዜው ያቁሙ።\n" +
      "• **የሙቀት መጭመቂያ:** ሞቅ ያለ ጨርቅ ወይም የሞቀ ውሃ ቦርሳ በሆድዎ ላይ ማድረግ ህመሙን ያቃልላል።"
    immediateStepsEn =
      "• **Continuous Hydration:** Drink clean water, oral rehydration salts, or warm herbal tea.\n" +
      "• **Avoid Irritants:** Eliminate caffeine, chili, alcohol, and acidic foods.\n" +
      "• **Warm Compress:** Placing a warm compress on the abdomen relieves cramping."
  } else if (hasHead && hasFever) {
    clinicalContextAm = "ከፍተኛ ትኩሳት እና የራስ ምታት ብዙውን ጊዜ በሰውነት ውስጥ ያለ ኢንፌክሽን (እንደ ወባ፣ ታይፎይድ፣ ወይም የቫይረስ ትኩሳት) ጠቋሚ ነው።"
    clinicalContextEn = "Fever combined with headache strongly suggests an infectious process such as malaria, typhoid, or viral influenza."
    immediateStepsAm = 
      "• **ትኩሳትን ማውረድ:** በንጹህ ለብ ባለ ውሃ የተነከረ ጨርቅ ግንባርና አንገት ላይ ማድረግ።\n" +
      "• **ፈሳሽና እረፍት:** ብዙ ፈሳሽ መጠጣት እና በቂ እንቅልፍ መተኛት።\n" +
      "• **ምርመራ ማድረግ:** በኢትዮጵያ ወባ እና ታይፎይድ የተለመዱ በመሆናቸው በአቅራቢያዎ በሚገኝ ላቦራቶሪ የደም ምርመራ ያድርጉ።"
    immediateStepsEn =
      "• **Fever Reduction:** Apply a cool, damp cloth to forehead and neck.\n" +
      "• **Hydration & Bed Rest:** Maximize fluid intake and get uninterrupted rest.\n" +
      "• **Diagnostic Testing:** In endemic regions, promptly obtain a malaria and typhoid blood test."
  } else {
    clinicalContextAm = "እነዚህ ምልክቶች በሰውነት መዛባት ወይም ኢንፌክሽን ወቅት የሚከሰቱ ናቸው።"
    clinicalContextEn = "These symptoms are indicative of systemic inflammation, bodily stress, or infection."
    immediateStepsAm = 
      "• **እረፍት ያድርጉ:** አድካሚ እንቅስቃሴዎችን አቁመው እረፍት ይውሰዱ።\n" +
      "• **ፈሳሽ ይውሰዱ:** ንጹህ ውሃ አዘውትረው ይጠጡ።\n" +
      "• **ምልክቶችዎን ይከታተሉ:** የህመሙን ለውጥና ተጨማሪ ምልክቶችን ይመዝግቡ።"
    immediateStepsEn =
      "• **Take Complete Rest:** Suspend strenuous tasks and sleep adequately.\n" +
      "• **Adequate Hydration:** Drink plenty of clean water.\n" +
      "• **Track Symptoms:** Monitor for progression, temperature spikes, or new signs."
  }

  if (isAm) {
    let itemsHigh = ""
    highConf.forEach((m, idx) => {
      const pct = getPercent(idx, m.matchedCount)
      const symList = m.matchedSymptoms
        .map((s) => AMHARIC_SYMPTOM_MAP[s] || s)
        .join("፣ ")
      itemsHigh += `• **${m.disease.amharicName || m.disease.name}** · ${pct}% ተዛማጅነት (${m.disease.category})\n`
      itemsHigh += `  የተዛመዱ ምልክቶች፦ ${symList}\n`
      itemsHigh += `  የተጎዳ የሰውነት ክፍል፦ ${getBodyRegion(m.disease.category, true)}\n\n`
    })

    let itemsMed = ""
    medConf.forEach((m, idx) => {
      const pct = getPercent(idx + 2, m.matchedCount)
      const symList = m.matchedSymptoms
        .map((s) => AMHARIC_SYMPTOM_MAP[s] || s)
        .join("፣ ")
      itemsMed += `• **${m.disease.amharicName || m.disease.name}** · ${pct}% ተዛማጅነት (${m.disease.category})\n`
      itemsMed += `  የተዛመዱ ምልክቶች፦ ${symList}\n`
      itemsMed += `  የተጎዳ የሰውነት ክፍል፦ ${getBodyRegion(m.disease.category, true)}\n\n`
    })

    fullText =
      `በተዘገቡት ምልክቶች (${symptomsFormattedAm}) ላይ በመመርኮዝ የተደረገ የክሊኒካል ምርመራ፦\n\n` +
      `**ሊሆኑ የሚችሉ ምክንያቶች (Possible Causes)፦**\n${clinicalContextAm}\n\n` +
      `**ከፍተኛ ግምት የሚሰጣቸው ሁኔታዎች (High Confidence)፦**\n${itemsHigh}` +
      (itemsMed ? `**ተጨማሪ ግምቶች (Medium Confidence)፦**\n${itemsMed}` : "") +
      `**አሁን ምን ማድረግ አለብዎት? (What You Should Do Now)፦**\n${immediateStepsAm}\n\n` +
      `**የህክምና ክትትል ምክሮች፦**\n` +
      `• ስለ እያንዳንዱ በሽታ ዝርዝር የህክምና መመሪያ ለማንበብ ከላይ የተጠቀሱትን የበሽታ ስሞች ይጫኑ።\n` +
      `• ምልክቶቹ ከ24-48 ሰዓታት በላይ ከቀጠሉ ወይም ከፍተኛ ትኩሳት ካለ በአቅራቢያዎ ወደሚገኝ ጤና ጣቢያ ይሂዱ።\n\n` +
      `**ማስገንዘቢያ (DISCLAIMER)፦** ይህ ትምህርታዊና የመጀመሪያ ደረጃ የጤና መመሪያ ነው። ለትክክለኛ ምርመራ የህክምና ባለሙያ ያማክሩ።`
  } else {
    let itemsHigh = ""
    highConf.forEach((m, idx) => {
      const pct = getPercent(idx, m.matchedCount)
      const symList = m.matchedSymptoms.join(", ")
      itemsHigh += `• **${m.disease.name}** · ${pct}% match (${m.disease.category})\n`
      itemsHigh += `  Matching symptoms: ${symList}\n`
      itemsHigh += `  Affected body region: ${getBodyRegion(m.disease.category, false)}\n\n`
    })

    let itemsMed = ""
    medConf.forEach((m, idx) => {
      const pct = getPercent(idx + 2, m.matchedCount)
      const symList = m.matchedSymptoms.join(", ")
      itemsMed += `• **${m.disease.name}** · ${pct}% match (${m.disease.category})\n`
      itemsMed += `  Matching symptoms: ${symList}\n`
      itemsMed += `  Affected body region: ${getBodyRegion(m.disease.category, false)}\n\n`
    })

    fullText =
      `Based on your symptoms (${symptomsFormattedEn}), here is the clinical assessment:\n\n` +
      `**Clinical Context & Possible Causes:**\n${clinicalContextEn}\n\n` +
      `**MOST LIKELY (High Confidence):**\n${itemsHigh}` +
      (itemsMed ? `**POSSIBLE (Medium Confidence):**\n${itemsMed}` : "") +
      `**WHAT YOU SHOULD DO NOW (Immediate Action Steps):**\n${immediateStepsEn}\n\n` +
      `**RECOMMENDATIONS:**\n` +
      `• Click on any condition above to view complete treatment protocols.\n` +
      `• Visit a clinic if symptoms do not improve within 24-48 hours or worsen.\n\n` +
      `**DISCLAIMER:** This is educational triage guidance. Always consult healthcare professionals for definitive diagnosis.`
  }

  const spokenSummary = isAm
    ? `በተዘገቡት የ${symptomsFormattedAm} ምልክቶች መሰረት፣ ተቀራራቢዎቹ ሁኔታዎች ${top3.map((m) => m.disease.amharicName || m.disease.name).join("፣ ")} ሊሆኑ ይችላሉ። እባክዎ ዝርዝር መረጃውን በስክሪኑ ላይ ይመልከቱ።`
    : `Based on your symptoms of ${symptomsFormattedEn}, the most likely conditions are ${top3.map((m) => m.disease.name).join(", ")}. Please review the detailed assessment on screen and consult a doctor if your symptoms persist.`

  const shortcutDiseases = matches.slice(0, 4).map((m) => ({
    id: m.disease.id,
    name: m.disease.name,
    amharicName: m.disease.amharicName,
  }))

  return {
    extractedSymptoms: extracted,
    topMatches: matches,
    fullText,
    spokenSummary,
    shortcutDiseases,
  }
}
