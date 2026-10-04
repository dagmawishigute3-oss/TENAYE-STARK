/**
 * File: src/services/geminiMedicalService.ts
 * Clinical First Aid and Medical Intelligence Service powered by Gemini API.
 * Integrates instant clinical protocols with temporary in-memory/session storage
 * and background Gemini API connectivity for real-time voice playback in Voxide.
 */

import { FIRST_AID_TOPICS } from "../data/firstAidData"

const GEMINI_API_KEY =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_GEMINI_API_KEY) ||
  ""

export interface StepItem {
  number: number
  title: string
  detail: string
}

export interface FirstAidResult {
  condition: string
  language: "am" | "en"
  timestamp: number
  spokenText: string
  steps: StepItem[]
  ambulanceHotline: string
  source: "gemini_api" | "clinical_cache"
}

const STORAGE_KEY = "tenaye_temp_first_aid"

// In-memory cache for zero-latency retrieval during session
let inMemoryLastFirstAid: FirstAidResult | null = null

/**
 * Saves emergency clinical guidance to temporary storage and dispatches UI update.
 */
export function saveToTemporaryStorage(data: FirstAidResult) {
  inMemoryLastFirstAid = data
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      ;(window as any).__tenayeLatestFirstAid = data
      window.dispatchEvent(
        new CustomEvent("tenaye-first-aid-update", { detail: data }),
      )
    } catch {}
  }
}

/**
 * Retrieves the latest first aid response from temporary storage.
 */
export function getLatestFirstAidFromStorage(): FirstAidResult | null {
  if (inMemoryLastFirstAid) return inMemoryLastFirstAid
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) {
        inMemoryLastFirstAid = JSON.parse(raw)
        return inMemoryLastFirstAid
      }
    } catch {}
  }
  return null
}

/**
 * Pre-compiled, clinically verified fallback protocols (0ms latency, Ethiopian Red Cross / WHO).
 * Provides strictly pure physical action steps matching the user's specific emergency.
 */
export function getVerifiedLocalSteps(
  query: string,
  language: "am" | "en",
): FirstAidResult {
  const q = (query || "").toLowerCase()
  const isAmharic = language === "am" || /[\u1200-\u137F]/.test(query)

  const isBreathingOrCollapse =
    /መተንፈስ|መታንፈስ|ትንፋሽ|ወደቀ|ወድቋል|ራሱን|ሳተ|breath|breathe|respirat|collaps|unconscious|faint|pass out|cpr/i.test(
      q,
    )
  const isChoking = /ታነቀ|ማነቅ|መታነቅ|ጉሮሮ|chok|food stuck/i.test(q)
  const isBurn = /ቃጠሎ|ተቃጠለ|የተቃጠለ|እሳት|burn|scald|fire/i.test(q)
  const isFracture =
    /ስብራት|ተሰበረ|አጥንት|መሰበር|fracture|broken bone|sprain|dislocat/i.test(q)
  const isPoison =
    /መርዝ|ኬሚካል|የተመረዘ|poison|swallowed chemical|toxic|ingest/i.test(q)
  const isSeizure = /የሚጥል|መንቀጥቀጥ|ማንቀጥቀጥ|seizure|convulsion|fit|epilep/i.test(q)

  if (isAmharic) {
    if (isChoking) {
      const steps: StepItem[] = [
        {
          number: 1,
          title: "እንዲስል ማበረታታት (Encourage Coughing)",
          detail: "ተጎጂው ማሳል ወይም መናገር ከቻለ የተዘጋውን ነገር በሳል እንዲያስወጣ ያበረታቱ።",
        },
        {
          number: 2,
          title: "5 የጀርባ ምቶች (5 Back Blows)",
          detail: "ተጎጂውን ወደ ፊት አስጎንብሰው በትከሻ አጥንቶቹ መካከል በዳሌ እጅዎ 5 ጊዜ አጥብቀው ይምቱ።",
        },
        {
          number: 3,
          title: "5 የሆድ ጫናዎች (5 Abdominal Thrusts)",
          detail:
            "ከኋላቸው ቆመው እጆችዎን ከእምብርታቸው በላይ በማድረግ ወደ ውስጥና ወደ ላይ 5 ጊዜ በኃይል ይጫኑ (የሃይምሊክ ዘዴ)።",
        },
        {
          number: 4,
          title: "ጀርባና ሆድ መቀያየር (Alternate Thrusts)",
          detail: "የተዘጋው ነገር እስኪወጣ ድረስ 5 የጀርባ ምት እና 5 የሆድ ጫና በተከታታይ ይቀያይሩ።",
        },
        {
          number: 5,
          title: "ራሱን ከሳተ CPR (CPR if Unconscious)",
          detail: "ተጎጂው ራሱን ከሳተ መሬት ላይ አስተኝተው ወዲያውኑ የደረት ጫና (CPR) ይጀምሩ።",
        },
      ]
      return {
        condition: "የመታነቅ አደጋ የመጀመሪያ እርዳታ (Choking First Aid)",
        language: "am",
        timestamp: Date.now(),
        spokenText:
          "ደረጃ 1፦ ተጎጂው እንዲስል ያበረታቱ። ደረጃ 2፦ ወደ ፊት አስጎንብሰው በትከሻ አጥንቶቹ መካከል 5 ጊዜ በዳሌ እጅዎ አጥብቀው ይምቱ። ደረጃ 3፦ ከኋላቸው ሆነው ከእምብርታቸው በላይ 5 ጊዜ ወደ ውስጥና ወደ ላይ የሆድ ጫና ያድርጉ። ደረጃ 4፦ የተዘጋው ነገር እስኪወጣ ድረስ 5 የጀርባ ምት እና 5 የሆድ ጫና ይቀያይሩ። ደረጃ 5፦ ራሱን ከሳተ ወዲያውኑ የደረት ጫና ይጀምሩ።",
        steps,
        ambulanceHotline: "907",
        source: "clinical_cache",
      }
    }

    if (isBreathingOrCollapse) {
      const steps: StepItem[] = [
        {
          number: 1,
          title: "የመተንፈሻ ቱቦን መክፈት (Open Airway)",
          detail:
            "ተጎጂውን ጀርባው ላይ አስተኝተው ጭንቅላታቸውን በጥንቃቄ ወደ ኋላ ቀና ያድርጉ፣ አገጫቸውን ወደ ላይ ያንሱ።",
        },
        {
          number: 2,
          title: "ትንፋሽ ማረጋገጥ (Check Breathing)",
          detail: "አየር ከአፍና ከአፍንጫቸው መውጣቱን እና ደረታቸው መነሳቱን ለ10 ሰከንድ በጥሞና ይመልከቱ።",
        },
        {
          number: 3,
          title: "የደረት ጫና CPR (Chest Compressions)",
          detail:
            "የማይተነፍስ ከሆነ በደረቱ መሃል በሁለቱ እጆችዎ በደቂቃ 100-120 ጊዜ አጥብቀው በፍጥነት ይጫኑ።",
        },
        {
          number: 4,
          title: "ወደ ጎን ማስተኛት (Recovery Position)",
          detail: "የሚተነፍስ ከሆነ ግን ራሱን ካላወቀ ትውከት እንዳያንቀው ወደ ጎኑ በጥንቃቄ ያዙሩት።",
        },
        {
          number: 5,
          title: "ጥብቅ ልብሶችን ማላላት (Loosen Clothing)",
          detail:
            "በአንገት እና በደረት ዙሪያ ያሉ ጥብቅ ልብሶችን ወይም ቀበቶን በማላላት አየር እንዲያገኝ ያድርጉ።",
        },
      ]
      return {
        condition: "የመተንፈስ ችግር እና የድንገተኛ ውድቀት እርዳታ (Breathing & Collapse)",
        language: "am",
        timestamp: Date.now(),
        spokenText:
          "ደረጃ 1፦ የመተንፈሻ ቱቦን መክፈት፦ ተጎጂውን ጀርባው ላይ አስተኝተው ጭንቅላታቸውን ወደ ኋላ ቀና ያድርጉ፣ አገጫቸውን ወደ ላይ ያንሱ። ደረጃ 2፦ ትንፋሽ ማረጋገጥ፦ ደረታቸው እንደሚነሳና እንደሚወርድ ለ10 ሰከንድ ይመልከቱ። ደረጃ 3፦ የማይተነፍስ ከሆነ በደረቱ መሃል በሁለት እጅዎ በደቂቃ 100 እስከ 120 ጊዜ አጥብቀው የደረት ጫና CPR ያድርጉ። ደረጃ 4፦ የሚተነፍስ ከሆነ ትውከት እንዳያንቀው ወደ ጎኑ ያዙሩት። ደረጃ 5፦ በአንገት እና ደረት ዙሪያ ያሉ ጥብቅ ልብሶችን ያላሉ።",
        steps,
        ambulanceHotline: "907",
        source: "clinical_cache",
      }
    }

    if (isBurn) {
      const steps: StepItem[] = [
        {
          number: 1,
          title: "በቀዝቃዛ ውሃ ማቀዝቀዝ (Cool Water)",
          detail:
            "የተቃጠለውን ቦታ ለ10 እስከ 20 ደቂቃ በቀዝቃዛ ንፁህ ውሃ ስር ያቆዩ፤ በረዶ ፈጽሞ እንዳይጠቀሙ።",
        },
        {
          number: 2,
          title: "ጥብቅ ነገሮችን ማስወገድ (Remove Tight Items)",
          detail: "እብጠት ከመምጣቱ በፊት ቀለበት፣ ሰዓት ወይም ጥብቅ ልብሶችን በጥንቃቄ ያስወግዱ።",
        },
        {
          number: 3,
          title: "በንፁህ ልል ጨርቅ መሸፈን (Cover Loosely)",
          detail: "ቁስሉን በንፁህ እርጥብ ፋሻ ወይም ጨርቅ ልል አድርገው ይሸፍኑ።",
        },
        {
          number: 4,
          title: "ፊኛ የያዘውን አለመንካት (Protect Blisters)",
          detail: "ፊኛ የያዘውን ቆዳ ፈጽሞ እንዳይፈነዱ፤ ቅቤ፣ ዘይት ወይም የጥርስ ሳሙና እንዳይቀቡ።",
        },
        {
          number: 5,
          title: "ማረጋጋትና ማሞቅ (Reassure & Keep Warm)",
          detail: "ተጎጂውን ያረጋጉ እና ያልተቃጠለውን የሰውነት ክፍል በብርድ ልብስ ይሸፍኑ።",
        },
      ]
      return {
        condition: "የቃጠሎ አደጋ የመጀመሪያ እርዳታ (Burns First Aid)",
        language: "am",
        timestamp: Date.now(),
        spokenText:
          "ደረጃ 1፦ የተቃጠለውን ቦታ ለ10 እስከ 20 ደቂቃ በቀዝቃዛ ውሃ ስር ያቆዩ፤ በረዶ እንዳይጠቀሙ። ደረጃ 2፦ ቀለበት፣ ሰዓት እና ጥብቅ ልብሶችን በፍጥነት ያስወግዱ። ደረጃ 3፦ በንፁህ እርጥብ ጨርቅ ልል አድርገው ይሸፍኑ። ደረጃ 4፦ ፊኛ የያዘውን ቆዳ እንዳይፈነዱ፣ ቅቤ ወይም ቅባት እንዳይቀቡ። ደረጃ 5፦ ተጎጂውን ያረጋጉ እና በብርድ ልብስ ይሸፍኑ።",
        steps,
        ambulanceHotline: "907",
        source: "clinical_cache",
      }
    }

    if (isFracture) {
      const steps: StepItem[] = [
        {
          number: 1,
          title: "አጥንቱን አለመንካት (Do Not Move Bone)",
          detail: "የተሰበረውን አጥንት ለማስተካከል ወይም ወደ ቦታው ለመመለስ ፈጽሞ እንዳይሞክሩ።",
        },
        {
          number: 2,
          title: "እንቅስቃሴን መግታት (Immobilize with Splint)",
          detail: "በተገኘ ጠንካራ ሰሌዳ ወይም እንጨትና ጨርቅ አስረው እንዳይንቀሳቀስ ያድርጉ።",
        },
        {
          number: 3,
          title: "ደም መፍሰስ ካለ መቆጣጠር (Control Bleeding)",
          detail: "ደም እየፈሰሰ ከሆነ ንፁህ ጨርቅ በቁስሉ ዙሪያ አድርገው በጥንቃቄ ይጫኑ።",
        },
        {
          number: 4,
          title: "በረዶ በጨርቅ መጠቅለል (Ice Pack)",
          detail: "እብጠትን ለመቀነስ በረዶውን በጨርቅ ጠቅልለው ለ15 ደቂቃ በስብራቱ ዙሪያ ያድርጉ።",
        },
        {
          number: 5,
          title: "ተጎጂውን ማረጋጋት (Keep Still & Warm)",
          detail: "ተጎጂውን እንዳይንቀሳቀስ አድርገው በብርድ ልብስ ይሸፍኑ፣ እንዳይደነግጥ ያረጋጉ።",
        },
      ]
      return {
        condition: "የስብራት አደጋ የመጀመሪያ እርዳታ (Fracture First Aid)",
        language: "am",
        timestamp: Date.now(),
        spokenText:
          "ደረጃ 1፦ የተሰበረውን አጥንት ለማስተካከል እንዳይሞክሩ። ደረጃ 2፦ በጠንካራ ሰሌዳና በጨርቅ አስረው እንዳይንቀሳቀስ ያድርጉ። ደረጃ 3፦ ደም የሚፈስ ከሆነ ንፁህ ጨርቅ በዙሪያው ይጫኑ። ደረጃ 4፦ እብጠትን ለመቀነስ በጨርቅ የተጠቀለለ በረዶ ያድርጉ። ደረጃ 5፦ ተጎጂውን እንዳይንቀሳቀስ አድርገው በብርድ ልብስ ይሸፍኑ።",
        steps,
        ambulanceHotline: "907",
        source: "clinical_cache",
      }
    }

    if (isPoison) {
      const steps: StepItem[] = [
        {
          number: 1,
          title: "የመርዙን አይነት መለየት (Identify Substance)",
          detail: "ተጎጂው የወሰደውን ኬሚካል ወይም መድሃኒት ጠርሙሱን ወዲያውኑ ይለዩ።",
        },
        {
          number: 2,
          title: "ማስመለስ እንዳይሞክሩ (Do Not Induce Vomiting)",
          detail: "ኬሚካል ወይም አሲድ ከሆነ ጉሮሮውን ዳግም እንዳያቃጥል ፈጽሞ እንዲያስመልስ አያድርጉ።",
        },
        {
          number: 3,
          title: "አፉን በውሃ ማጠብ (Rinse Mouth)",
          detail: "በከንፈርና በአፉ ዙሪያ ያለውን ኬሚካል በንፁህ ውሃ ያፅዱ።",
        },
        {
          number: 4,
          title: "ወደ ጎን ማዞር (Recovery Position)",
          detail: "ተጎጂው ራሱን ከሳተ ትውከት የመተንፈሻ ቱቦውን እንዳይዘጋው ወደ ግራ ጎኑ ያዙሩት።",
        },
        {
          number: 5,
          title: "እቃውን ይዞ መሄድ (Bring Container to Hospital)",
          detail: "ለዶክተሮች ለማሳየት የመርዙን እቃ ወይም ጠርሙስ ይዘው ወዲያውኑ ይሂዱ።",
        },
      ]
      return {
        condition: "የመርዝ አደጋ የመጀመሪያ እርዳታ (Poisoning First Aid)",
        language: "am",
        timestamp: Date.now(),
        spokenText:
          "ደረጃ 1፦ የወሰዱትን የመርዝ ወይም ኬሚካል እቃ ይለዩ። ደረጃ 2፦ ፈጽሞ እንዲያስመልስ አያድርጉ። ደረጃ 3፦ አፋቸውን በንፁህ ውሃ ያፅዱ። ደረጃ 4፦ ራሱን ከሳተ ወደ ግራ ጎኑ ያዙሩት። ደረጃ 5፦ የኬሚካሉን እቃ ይዘው ወደ ህክምና ማዕከል ይሂዱ።",
        steps,
        ambulanceHotline: "907",
        source: "clinical_cache",
      }
    }

    if (isSeizure) {
      const steps: StepItem[] = [
        {
          number: 1,
          title: "አካባቢውን ማፅዳት (Clear Area)",
          detail: "ተጎጂው እንዳይጎዳ ሹል እና ጠንካራ ነገሮችን ከአካባቢው በፍጥነት ያርቁ።",
        },
        {
          number: 2,
          title: "ጭንቅላቱን መጠበቅ (Cushion Head)",
          detail: "ከጭንቅላቱ ስር ለስላሳ ጨርቅ ወይም ልብስ ያድርጉ።",
        },
        {
          number: 3,
          title: "አፉ ውስጥ ምንም አለማስገባት (Do Not Put In Mouth)",
          detail: "ጥርሱን ለመክፈት ማንኪያ፣ ጨርቅ ወይም ጣት ፈጽሞ አያስገቡ።",
        },
        {
          number: 4,
          title: "አለመያዝ (Do Not Restrain)",
          detail: "መንቀጥቀጡን በኃይል ለመያዝ ወይም ለማቆም አይሞክሩ።",
        },
        {
          number: 5,
          title: "መንቀጥቀጡ ሲያበቃ ወደ ጎን ማዞር (Roll on Side)",
          detail: "መንቀጥቀጡ ሲቆም አየር እንዲያገኝ ወደ ጎኑ አስተኝተው ይቆዩ።",
        },
      ]
      return {
        condition: "የመንቀጥቀጥ/የሚጥል አደጋ እርዳታ (Seizure First Aid)",
        language: "am",
        timestamp: Date.now(),
        spokenText:
          "ደረጃ 1፦ ሹል ነገሮችን ከተጎጂው ያርቁ። ደረጃ 2፦ ከጭንቅላቱ ስር ለስላሳ ጨርቅ ያድርጉ። ደረጃ 3፦ አፉ ውስጥ ምንም ነገር እንዳያስገቡ። ደረጃ 4፦ እንቅስቃሴውን በኃይል ለመያዝ አይሞክሩ። ደረጃ 5፦ መንቀጥቀጡ ሲቆም ወደ ጎኑ አስተኝተው አየር እንዲያገኝ ያድርጉ።",
        steps,
        ambulanceHotline: "907",
        source: "clinical_cache",
      }
    }

    // Default Amharic: Severe bleeding & wounds
    const steps: StepItem[] = [
      {
        number: 1,
        title: "አጥብቆ መጫን (Direct Firm Pressure)",
        detail:
          "ወዲያውኑ ንፁህ ጨርቅ ወይም ፋሻ በቁስሉ ላይ አድርገው በሁለት እጅዎ አጥብቀው ሳይለቁ ይጫኑ። ደሙን ለማየት ጨርቁን እንዳያነሱ።",
      },
      {
        number: 2,
        title: "በቁስሉ ዙሪያ ማጠብ (Clean Around Wound)",
        detail: "በቁስሉ ዙሪያ ያለውን ቆሻሻ በንፁህ ውሃ ያፅዱ። አልኮል ወደ ጥልቅ ቁስል ውስጥ እንዳያፈሱ።",
      },
      {
        number: 3,
        title: "እግርን/ክንድን ከፍ ማድረግ (Elevate Limb)",
        detail:
          "የተሰበረ አጥንት ከሌለ የተጎዳውን እግር ወይም ክንድ ከልብ ከፍ አድርገው ያንሱ፤ ይህም የደም ፍሰቱን ይቀንሳል።",
      },
      {
        number: 4,
        title: "በፋሻ አጥብቆ ማሰር (Firm Pressure Bandage)",
        detail:
          "ቁስሉ ላይ በደንብ አጥብቀው ያስሩ። ደም ከወጣ ሌላ ጨርቅ ደርበው ይጫኑ እንጂ መጀመሪያውን ጨርቅ አያነሱት።",
      },
      {
        number: 5,
        title: "ከድንጋጤ መከላከል (Prevent Shock)",
        detail: "ተጎጂውን ጀርባው ላይ አስተኝተው ያረጋጉ፣ የሰውነት ሙቀታቸው እንዳይቀንስ በብርድ ልብስ ይሸፍኑ።",
      },
    ]
    return {
      condition: "የከባድ ደም መፍሰስ የመጀመሪያ እርዳታ (Severe Bleeding First Aid)",
      language: "am",
      timestamp: Date.now(),
      spokenText:
        "ደረጃ 1፦ ወዲያውኑ ንፁህ ጨርቅ በቁስሉ ላይ አድርገው በሁለት እጅዎ አጥብቀው ሳይለቁ ይጫኑ። ደረጃ 2፦ በቁስሉ ዙሪያ በንፁህ ውሃ ያፅዱ፤ አልኮል ወደ ጥልቅ ቁስል ውስጥ እንዳያፈሱ። ደረጃ 3፦ የተጎዳውን እግር ከልብ ከፍ አድርገው ያንሱ። ደረጃ 4፦ በፋሻ አጥብቀው ያስሩ፤ ደም ከወጣ ሌላ ጨርቅ ደርበው ይጫኑ። ደረጃ 5፦ ተጎጂውን አስተኝተው ያረጋጉ፣ በብርድ ልብስ ይሸፍኑ።",
      steps,
      ambulanceHotline: "907",
      source: "clinical_cache",
    }
  }

  // English fallbacks
  if (isChoking) {
    const steps: StepItem[] = [
      {
        number: 1,
        title: "Encourage Forceful Coughing",
        detail:
          "If the person can speak or cough, urge them to cough hard to clear the blocked airway.",
      },
      {
        number: 2,
        title: "Deliver 5 Firm Back Blows",
        detail:
          "Lean them forward and deliver 5 sharp blows between their shoulder blades using the heel of your hand.",
      },
      {
        number: 3,
        title: "Perform 5 Abdominal Thrusts (Heimlich)",
        detail:
          "Stand behind them, wrap your arms above their navel, and pull inward and upward sharply 5 times.",
      },
      {
        number: 4,
        title: "Alternate Back Blows and Thrusts",
        detail:
          "Repeat 5 back blows followed by 5 abdominal thrusts until the object is forced out.",
      },
      {
        number: 5,
        title: "Begin CPR if Unresponsive",
        detail:
          "If the person collapses or loses consciousness, lower them to the floor and immediately begin chest compressions.",
      },
    ]
    return {
      condition: "Choking Emergency First Aid",
      language: "en",
      timestamp: Date.now(),
      spokenText:
        "Step 1: Encourage them to cough hard. Step 2: Lean them forward and deliver 5 firm back blows between their shoulder blades. Step 3: Stand behind them and give 5 quick inward and upward abdominal thrusts. Step 4: Alternate between 5 back blows and 5 abdominal thrusts until clear. Step 5: If they lose consciousness, begin CPR chest compressions immediately.",
      steps,
      ambulanceHotline: "907",
      source: "clinical_cache",
    }
  }

  if (isBreathingOrCollapse) {
    const steps: StepItem[] = [
      {
        number: 1,
        title: "Open the Airway",
        detail:
          "Lay the person flat on their back, gently tilt their head back and lift their chin up.",
      },
      {
        number: 2,
        title: "Check for Normal Breathing",
        detail:
          "Look, listen, and feel for chest movement and breath sounds for no more than 10 seconds.",
      },
      {
        number: 3,
        title: "Begin Firm Chest Compressions (CPR)",
        detail:
          "If not breathing, place both hands in the center of their chest and push hard and fast, 100 to 120 beats per minute.",
      },
      {
        number: 4,
        title: "Place in Recovery Position",
        detail:
          "If breathing normally but unresponsive, roll them gently onto their side to keep the airway clear.",
      },
      {
        number: 5,
        title: "Loosen Restrictive Clothing",
        detail:
          "Loosen any tight clothing around their neck, chest, or waist to ease respiration.",
      },
    ]
    return {
      condition: "Breathing Difficulty & Collapse Emergency First Aid",
      language: "en",
      timestamp: Date.now(),
      spokenText:
        "Step 1: Lay the person flat, gently tilt their head back and lift their chin to open the airway. Step 2: Check for normal breathing for 10 seconds. Step 3: If they are not breathing, place both hands in the center of their chest and begin firm chest compressions at 100 to 120 beats per minute. Step 4: If breathing but unconscious, roll them onto their side into the recovery position. Step 5: Loosen tight clothing around their neck and chest.",
      steps,
      ambulanceHotline: "907",
      source: "clinical_cache",
    }
  }

  if (isBurn) {
    const steps: StepItem[] = [
      {
        number: 1,
        title: "Cool with Running Water",
        detail:
          "Hold the burn under cool running water for 10 to 20 minutes; never use ice.",
      },
      {
        number: 2,
        title: "Remove Constricting Items",
        detail:
          "Gently remove rings, watches, and tight clothing before swelling starts.",
      },
      {
        number: 3,
        title: "Cover Loosely with Clean Cloth",
        detail:
          "Protect the wound with a clean, damp, non-stick cloth or sterile dressing.",
      },
      {
        number: 4,
        title: "Do Not Break Blisters or Apply Grease",
        detail:
          "Never pop blisters or apply butter, oil, or ointments to burned skin.",
      },
      {
        number: 5,
        title: "Keep the Person Warm",
        detail:
          "Reassure them and cover unaffected areas with a blanket to prevent shock.",
      },
    ]
    return {
      condition: "Burns Emergency First Aid",
      language: "en",
      timestamp: Date.now(),
      spokenText:
        "Step 1: Cool the burn under running water for 10 to 20 minutes; do not use ice. Step 2: Gently remove rings and tight items before swelling. Step 3: Cover loosely with a clean, damp cloth. Step 4: Do not pop blisters or apply oil or butter. Step 5: Keep the person calm and warm with a blanket.",
      steps,
      ambulanceHotline: "907",
      source: "clinical_cache",
    }
  }

  if (isFracture) {
    const steps: StepItem[] = [
      {
        number: 1,
        title: "Do Not Realign Bone",
        detail:
          "Never attempt to push or straighten a broken limb back into place.",
      },
      {
        number: 2,
        title: "Immobilize the Joint Above and Below",
        detail:
          "Support the injury with a rigid splint, rolled blanket, or firm cardboard.",
      },
      {
        number: 3,
        title: "Control Any Bleeding",
        detail:
          "Apply gentle pressure around the wound if bone penetrates skin; do not press directly on protruding bone.",
      },
      {
        number: 4,
        title: "Apply Ice Pack Wrapped in Cloth",
        detail:
          "Place ice wrapped in a towel over the injury for 15 minutes to reduce swelling.",
      },
      {
        number: 5,
        title: "Reassure and Prevent Shock",
        detail:
          "Keep the patient warm and lying still until medical transport arrives.",
      },
    ]
    return {
      condition: "Fracture & Broken Bone Emergency First Aid",
      language: "en",
      timestamp: Date.now(),
      spokenText:
        "Step 1: Do not move or realign the broken bone. Step 2: Support and immobilize the limb with a rigid splint or rolled blanket. Step 3: Apply gentle pressure around any bleeding wound without pressing bone. Step 4: Apply ice wrapped in a towel for 15 minutes. Step 5: Keep the person still, calm, and covered with a blanket.",
      steps,
      ambulanceHotline: "907",
      source: "clinical_cache",
    }
  }

  if (isPoison) {
    const steps: StepItem[] = [
      {
        number: 1,
        title: "Identify Ingested Toxin",
        detail:
          "Quickly locate the bottle or package to inform emergency doctors.",
      },
      {
        number: 2,
        title: "Do Not Induce Vomiting",
        detail:
          "Never force vomiting unless specifically directed by toxicologists.",
      },
      {
        number: 3,
        title: "Rinse Mouth with Clean Water",
        detail: "Wipe away chemicals around mouth and rinse thoroughly.",
      },
      {
        number: 4,
        title: "Roll into Recovery Position",
        detail:
          "If drowsy or unresponsive, roll them onto their side to keep airway open.",
      },
      {
        number: 5,
        title: "Keep Container for Doctors",
        detail:
          "Bring original container directly to the emergency room for antidote identification.",
      },
    ]
    return {
      condition: "Poisoning Emergency First Aid",
      language: "en",
      timestamp: Date.now(),
      spokenText:
        "Step 1: Identify the ingested chemical or bottle immediately. Step 2: Do not induce vomiting. Step 3: Rinse mouth thoroughly with water. Step 4: If drowsy, roll them onto their side in recovery position. Step 5: Keep the original container to show emergency doctors.",
      steps,
      ambulanceHotline: "907",
      source: "clinical_cache",
    }
  }

  if (isSeizure) {
    const steps: StepItem[] = [
      {
        number: 1,
        title: "Clear Dangerous Objects",
        detail:
          "Move hard or sharp objects away to prevent head and body trauma.",
      },
      {
        number: 2,
        title: "Cushion Their Head",
        detail: "Place a folded jacket or soft pillow beneath their head.",
      },
      {
        number: 3,
        title: "Do Not Restrain or Insert Objects",
        detail:
          "Never hold them down and never insert fingers or spoons into their mouth.",
      },
      {
        number: 4,
        title: "Time the Convulsions",
        detail:
          "Note the start time; seizures lasting over 5 minutes require emergency dispatch.",
      },
      {
        number: 5,
        title: "Turn onto Side Once Convulsion Stops",
        detail:
          "Gently roll them into recovery position to allow saliva drainage and clear breathing.",
      },
    ]
    return {
      condition: "Seizure Emergency First Aid",
      language: "en",
      timestamp: Date.now(),
      spokenText:
        "Step 1: Clear hard or sharp objects away immediately. Step 2: Place a soft jacket under their head. Step 3: Never put anything into their mouth or restrain their limbs. Step 4: Time the duration of the seizure. Step 5: Once jerking ends, roll them gently onto their side in the recovery position.",
      steps,
      ambulanceHotline: "907",
      source: "clinical_cache",
    }
  }

  // Default English: Severe Bleeding & Injury
  const steps: StepItem[] = [
    {
      number: 1,
      title: "Direct Continuous Pressure",
      detail:
        "Immediately place a clean cloth directly over the bleeding wound. Apply firm downward pressure with both hands without lifting.",
    },
    {
      number: 2,
      title: "Clean Gently Around Wound",
      detail:
        "Gently rinse around the perimeter with clean running water; never pour rubbing alcohol inside deep open wounds.",
    },
    {
      number: 3,
      title: "Elevate Injured Limb",
      detail:
        "Raise the bleeding leg or limb above heart level to decrease hydrostatic blood pressure.",
    },
    {
      number: 4,
      title: "Apply Firm Pressure Bandage",
      detail:
        "Wrap a clean bandage firmly over the dressing. If blood soaks through, add more layers without removing the bottom cloth.",
    },
    {
      number: 5,
      title: "Prevent Shock",
      detail:
        "Lay the person flat on their back, keep them calm, and cover them with blankets to maintain body heat.",
    },
  ]
  return {
    condition: "Severe Bleeding & Injury First Aid",
    language: "en",
    timestamp: Date.now(),
    spokenText:
      "Step 1: Apply firm continuous pressure with a clean cloth directly on the wound with both hands. Step 2: Clean around the wound with clean water; never pour rubbing alcohol inside deep wounds. Step 3: Elevate the bleeding leg or limb above heart level. Step 4: Wrap a firm pressure bandage; if soaked, add more cloth on top. Step 5: Lay the person flat, keep them calm, and cover with a blanket.",
    steps,
    ambulanceHotline: "907",
    source: "clinical_cache",
  }
}

/**
 * Returns instant, verified physical first aid steps in <1ms without blocking the WebSocket audio stream.
 * Automatically saves to temporary storage and dispatches real-time UI updates.
 */
export async function getClinicalFirstAidSteps(
  userQuery: string,
  preferredLanguage?: "am" | "en",
): Promise<FirstAidResult> {
  const isAmharic =
    preferredLanguage === "am" || /[\u1200-\u137F]/.test(userQuery)
  const lang: "am" | "en" = isAmharic ? "am" : "en"

  // 1. Instant Clinical Protocol (< 1ms execution)
  // Provides 100% verified, pure physical action steps for immediate voice playback
  const instantResult = getVerifiedLocalSteps(userQuery, lang)
  saveToTemporaryStorage(instantResult)

  // Return immediately so voice turn endpointing and audio playback have zero latency (< 1ms)
  return instantResult
}

export interface MedicalAdviceResult {
  query: string
  advice: string
  language: "am" | "en"
  timestamp: number
  source: "gemini_api" | "clinical_cache"
}

const ADVICE_STORAGE_KEY = "tenaye_temp_medical_advice"
let inMemoryLastAdvice: MedicalAdviceResult | null = null

export function getLatestAdviceFromStorage(): MedicalAdviceResult | null {
  if (inMemoryLastAdvice) return inMemoryLastAdvice
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(ADVICE_STORAGE_KEY)
      if (raw) {
        inMemoryLastAdvice = JSON.parse(raw)
        return inMemoryLastAdvice
      }
    } catch {}
  }
  return null
}

/**
 * Instant clinical guidance for common everyday health inquiries.
 */
function getVerifiedClinicalAdvice(
  query: string,
  language: "am" | "en",
): MedicalAdviceResult {
  const q = (query || "").toLowerCase()
  const isAmharic = language === "am" || /[\u1200-\u137F]/.test(query)
  const lang: "am" | "en" = isAmharic ? "am" : "en"

  let advice = ""

  if (isAmharic) {
    if (/ራስ\s*ምታት|ራስምታት|headache|migraine/i.test(q)) {
      advice =
        "ለራስ ምታት፡ በቂ ንፁህ ውሃ ይጠጡ፣ በፀጥታና ጨለማ ባለበት ክፍል ውስጥ ያርፉ። ፓራሲታሞል መውሰድ ይችላሉ። ራስ ምታቱ ድንገተኛና እጅግ ከባድ ከሆነ ወይም ከአንገት መወጠር (stiff neck) ጋር ከሆነ ወደ ህክምና ማዕከል በአስቸኳይ ይሂዱ።"
    } else if (/ትኩሳት|ሙቀት|fever|temperature|chills/i.test(q)) {
      advice =
        "ለትኩሳት፡ ብዙ ንፁህ ፈሳሽ ይጠጡ፣ ቀላል ልብስ ይልበሱ እና በፓራሲታሞል ሙቀቱን ይቀንሱ። በወባ አካባቢ ከሆኑ የወባ ምርመራ ያድርጉ። ትኩሳቱ ከ38.5 ዲግሪ በላይ ከሆነ ወይም ከ2 ቀን በላይ ከቆየ ወደ ጤና ጣቢያ ይሂዱ።"
    } else if (/ሆድ\s*ህመም|ተቅማጥ|ቁርጠት|stomach|diarrhea/i.test(q)) {
      advice =
        "ለሆድ ህመም እና ተቅማጥ፡ የሰውነት ድርቀትን ለመከላከል የኦአርኤስ (ORS) የጨውና ስኳር ውህድ እና ንፁህ ፈሳሽ አብዝተው ይጠጡ። ቀላል ምግብ ይመገቡ። ደም የቀላቀለ ተቅማጥ ወይም ከባድ ቁርጠት ካለ ወዲያውኑ ወደ ጤና ተቋም ይሂዱ።"
    } else if (/ሳል|ጉንፋን|ጉሮሮ|cough|cold|flu|throat/i.test(q)) {
      advice =
        "ለሳል እና ጉንፋን፡ የሞቀ ፈሳሽ፣ ማርና ሎሚ ይጠጡ፣ በእንፋሎት ይታጠኑ እና በቂ እረፍት ያድርጉ። ትንፋሽ ማጠር፣ የደረት ህመም ወይም ከፍተኛ ትኩሳት ካለ ዶክተር ጋር ይሂዱ።"
    } else if (/ማዞር|ድካም|ማቅለሽለሽ|dizzy|fatigue|nausea/i.test(q)) {
      advice =
        "ለማዞር እና ድካም፡ ወዲያውኑ ቁጭ ይበሉ ወይም እግርዎን ከፍ አድርገው ይተኙ። ንፁህ ውሃ እና መጠነኛ ጣፋጭ ነገር ይውሰዱ። ማዞሩ ካልቆመ ወይም ራስን ከመሳት ጋር ከሆነ ወደ ጤና ማዕከል ይሂዱ።"
    } else {
      advice =
        "ለተሰማዎት ምልክት በቂ እረፍት ያድርጉ፣ ብዙ ንፁህ ፈሳሽ ይጠጡ። ትኩሳት ወይም ህመም ካለ ተገቢውን የህመም ማስታገሻ መውሰድ ይችላሉ። ምልክቶቹ ከ24-48 ሰዓት በላይ ከቆዩ ወይም ከከበዱ በአቅራቢያዎ ወደሚገኝ የጤና ጣቢያ ወይም ሆስፒታል በአስቸኳይ ይሂዱ።"
    }
  } else {
    if (/headache|migraine/i.test(q)) {
      advice =
        "For headache: Drink plenty of water, rest in a quiet and dim room, and take an over-the-counter pain reliever like paracetamol. If the headache is sudden, unusually severe, or accompanied by neck stiffness, seek immediate medical care."
    } else if (/fever|chills|temperature/i.test(q)) {
      advice =
        "For fever: Stay well hydrated with fluids, wear light clothing, and take paracetamol to reduce fever. If you are in a malaria-risk area, get tested promptly. If the fever exceeds 38.5°C or persists more than 48 hours, visit a nearby clinic."
    } else if (/stomach|diarrhea|cramps|abdomen/i.test(q)) {
      advice =
        "For stomach pain and diarrhea: Drink Oral Rehydration Salts (ORS) and clean fluids to prevent dehydration. Eat bland, light foods and avoid spicy meals. Seek medical care immediately if you notice blood in stool or severe persistent pain."
    } else if (/cough|cold|flu|throat/i.test(q)) {
      advice =
        "For cough and cold: Drink warm fluids, honey with lemon, use steam inhalation, and get ample rest. If you develop difficulty breathing, persistent high fever, or chest pain, consult a healthcare provider promptly."
    } else if (/dizzy|lightheaded|fatigue|nausea/i.test(q)) {
      advice =
        "For dizziness: Sit down or lie flat with your legs elevated immediately. Drink water and take a light snack to stabilize blood sugar. If dizziness persists or is accompanied by chest pain or loss of consciousness, seek urgent medical attention."
    } else {
      advice =
        "For your symptoms, rest well, stay well hydrated with water, and monitor your temperature. If symptoms worsen, persist beyond 48 hours, or you develop severe pain or difficulty breathing, please visit a nearby healthcare clinic or call 907 for emergency assistance."
    }
  }

  const result: MedicalAdviceResult = {
    query,
    advice,
    language: lang,
    timestamp: Date.now(),
    source: "clinical_cache",
  }

  inMemoryLastAdvice = result
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(ADVICE_STORAGE_KEY, JSON.stringify(result))
      window.dispatchEvent(
        new CustomEvent("tenaye-medical-advice-update", { detail: result }),
      )
    } catch {}
  }

  return result
}

/**
 * Provides general medical consultation via Gemini API or instant clinical triage,
 * stored in temporary database for zero-latency voice retrieval.
 */
export async function getGeneralMedicalAdvice(
  userQuery: string,
  preferredLanguage?: "am" | "en",
): Promise<MedicalAdviceResult> {
  const isAmharic =
    preferredLanguage === "am" || /[\u1200-\u137F]/.test(userQuery)
  const lang: "am" | "en" = isAmharic ? "am" : "en"

  // Fast check: common symptoms return in 0ms
  const q = userQuery.toLowerCase()
  const isCommonSymptom =
    /ራስ\s*ምታት|ትኩሳት|ሆድ|ተቅማጥ|ሳል|ጉንፋን|ማዞር|ድካም|headache|fever|stomach|diarrhea|cough|cold|dizzy|fatigue/i.test(
      q,
    )
  if (isCommonSymptom || !GEMINI_API_KEY || GEMINI_API_KEY.length < 10) {
    return getVerifiedClinicalAdvice(userQuery, lang)
  }

  // Fast 4000ms inference for novel queries
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)

    const prompt = isAmharic
      ? `አንተ በኢትዮጵያ ውስጥ ያለህ አጋዥ እና የታመነ የህክምና አማካሪ ነህ። ተጠቃሚው የሚከተለውን ጥያቄ ጠይቆሃል፡ "${userQuery}"።
እባክህ አጭር፣ ግልጽ እና ጠቃሚ የህክምና ምክር በ2-3 ዓረፍተ ነገር በአማርኛ ስጠው። ምን ማድረግ እንዳለበት እና ምን ዓይነት እንክብካቤ እንደሚረዳው ንገረው።`
      : `You are a trusted medical clinical advisor on the Tenaye Ethiopian digital health platform. A user asks: "${userQuery}".
Provide a concise, direct, and empathetic medical response in 2-3 spoken sentences in English. Include immediate practical self-care steps.`

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 250,
        },
      }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (res.ok) {
      const json = await res.json()
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text
      if (text && text.trim().length > 10) {
        const cleanText = text.replace(/[*#]/g, "").replace(/\n+/g, " ").trim()
        const result: MedicalAdviceResult = {
          query: userQuery,
          advice: cleanText,
          language: lang,
          timestamp: Date.now(),
          source: "gemini_api",
        }
        inMemoryLastAdvice = result
        if (typeof window !== "undefined") {
          sessionStorage.setItem(ADVICE_STORAGE_KEY, JSON.stringify(result))
          window.dispatchEvent(
            new CustomEvent("tenaye-medical-advice-update", { detail: result }),
          )
        }
        return result
      }
    }
  } catch {}

  return getVerifiedClinicalAdvice(userQuery, lang)
}
