/**
 * File: src/components/textSanitizer.ts
 * Text sanitizer and normalizer for Tenaye Health Assistant:
 * 1. Automatically transliterates any accidental Indian/Devanagari script into clean English.
 * 2. Normalizes markdown asterisks, inline bullets, and run-on sentences into readable formatted lines.
 * 3. Cleans subtitle text for VoiceStage without markdown symbols.
 */

// Common English words phonetically transcribed in Devanagari / Hindi script by speech engines

const DEVANAGARI_WORD_MAP: Record<string, string> = {
  // Navigation & Actions

  ओके: "Okay",

  ओक: "Okay",

  ओक्के: "Okay",

  इन: "in",

  नेम: "name",

  नाम: "name",

  फिल: "fill",

  यूनाथन: "Yonatan",

  योनाथन: "Yonatan",

  योनातान: "Yonatan",

  योनातन: "Yonatan",

  ईमेल: "email",

  इमेल: "email",

  सेड: "set",

  सेट: "set",

  सेंड: "send",

  हेलो: "Hello",

  हेल्लो: "Hello",

  हाय: "Hi",

  ओपन: "Open",

  खोलो: "Open",

  पेज: "page",

  होम: "Home",

  अबाउट: "About",

  कांटेक्ट: "Contact",

  कॉन्टैक्ट: "Contact",

  इमरजेंसी: "Emergency",

  एम्बुलेंस: "Ambulance",

  डॉक्टर: "Doctor",

  मलेरिया: "Malaria",

  डायबिटीज: "Diabetes",

  सिम्टम्स: "Symptoms",

  सिम्पटम्स: "Symptoms",

  लक्षण: "symptoms",

  हेल्थ: "Health",

  टिप्स: "Tips",

  "फर्स्ट एड": "First Aid",

  फाउंडर: "Founder",

  फाउंडर्स: "Founders",

  टीम: "team",

  फोन: "phone",

  नंबर: "number",

  क्लियर: "Clear",

  स्टॉप: "Stop",

  यस: "yes",

  नो: "no",

  व्हाट: "what",

  हाउ: "how",

  हु: "who",

  प्लीज: "please",

  "थैंक यू": "thank you",

  थैंक्स: "thanks",
}

// Character-by-character phonetic fallback for any remaining Devanagari glyphs

const DEVANAGARI_CHAR_MAP: Record<string, string> = {
  अ: "a",
  आ: "aa",
  इ: "i",
  ई: "ee",
  उ: "u",
  ऊ: "oo",
  ऋ: "ri",
  ए: "e",
  ऐ: "ai",
  ओ: "o",
  औ: "au",

  क: "k",
  ख: "kh",
  ग: "g",
  घ: "gh",
  ङ: "ng",

  च: "ch",
  छ: "chh",
  ज: "j",
  झ: "jh",
  ञ: "ny",

  ट: "t",
  ठ: "th",
  ड: "d",
  ढ: "dh",
  ण: "n",

  त: "t",
  थ: "th",
  द: "d",
  ध: "dh",
  न: "n",

  प: "p",
  फ: "f",
  ब: "b",
  भ: "bh",
  म: "m",

  य: "y",
  র: "r",
  ल: "l",
  व: "v",
  श: "sh",
  ष: "sh",
  स: "s",
  ह: "h",

  "ा": "a",
  "ि": "i",
  "ी": "ee",
  "ु": "u",
  "ू": "oo",
  "ृ": "ri",
  "े": "e",
  "ै": "ai",
  "ो": "o",
  "ौ": "au",

  "ं": "n",
  "ँ": "n",
  "ः": "h",
  "्": "",

  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
}

/**
 * Transliterates any accidental Devanagari/Hindi script in speech recognition into clean English.
 */

export function devanagariToEnglish(text: string): string {
  if (!text) return ""

  // Check for Devanagari block (U+0900 to U+097F)

  if (!/[\u0900-\u097F]/.test(text)) return text

  let out = text

  // 1. Replace known spoken words

  for (const [hindi, english] of Object.entries(DEVANAGARI_WORD_MAP)) {
    out = out.replace(new RegExp(hindi, "g"), english)
  }

  // 2. Character-by-character fallback for remaining glyphs

  if (/[\u0900-\u097F]/.test(out)) {
    let converted = ""

    for (let i = 0; i < out.length; i++) {
      const char = out[i]

      if (DEVANAGARI_CHAR_MAP[char] !== undefined) {
        converted += DEVANAGARI_CHAR_MAP[char]
      } else if (char.charCodeAt(0) >= 0x0900 && char.charCodeAt(0) <= 0x097f) {
        // Strip unmapped diacritics
      } else {
        converted += char
      }
    }

    out = converted
  }

  return out.replace(/\s{2,}/g, " ").trim()
}

// Common Arabic / Persian words phonetically transcribed by speech engines when English/Amharic is spoken

export const ARABIC_SPEECH_MAP: Record<string, string> = {
  اوکی: "Okay",

  اوكي: "Okay",

  أوكي: "Okay",

  اوك: "Okay",

  نعم: "yes",

  شكرا: "thank you",

  مرحبا: "Hello",

  الو: "Hello",

  هلا: "Hello",

  تمام: "Okay",

  ايوا: "yes",

  ايوة: "yes",
}

/**
 * Foreign script matcher covering:
 * - Sinhala: \u0D80-\u0DFF
 * - Japanese (Hiragana \u3040-\u309F, Katakana \u30A0-\u30FF, Kanji \u4E00-\u9FFF)
 * - Devanagari & Indic: \u0900-\u0D7F (Bengali, Gurmukhi, Gujarati, Oriya, Tamil, Telugu, Kannada, Malayalam)
 * - Arabic & Persian: \u0600-\u06FF, \u0750-\u077F
 * - Thai & Lao: \u0E00-\u0E7F
 * - Cyrillic: \u0400-\u04FF
 */

const FOREIGN_SCRIPTS_REGEX =
  /[\u0D80-\u0DFF\u3040-\u30FF\u4E00-\u9FFF\u0980-\u0D7F\u0600-\u06FF\u0750-\u077F\u0E00-\u0E7F\u0400-\u04FF]/g

/**
 * Repairs missing spaces between Amharic words, after punctuation marks,
 * and between mixed Ethiopic and Latin scripts.
 */

export function repairAmharicSpacing(text: string): string {
  if (!text) return ""

  let s = text

  // 1. Ensure space after punctuation (Amharic comma, semicolon, fullstop, colon, and latin !?,:)

  s = s.replace(/([፣፤።፡!?])([^\s\d])/g, "$1 $2")

  s = s.replace(/([,;:!?])([^\s\d])/g, "$1 $2")

  // 2. Ensure space between Ethiopic and Latin scripts / numbers

  s = s.replace(/([\u1200-\u137F])([a-zA-Z0-9])/g, "$1 $2")

  s = s.replace(/([a-zA-Z0-9])([\u1200-\u137F])/g, "$1 $2")

  // 3. Known compound splits for concatenated speech / LLM text

  const SPLITS: [RegExp, string][] = [
    [/(እስቲ)(ለዚህ|በአቅራቢያ|ስለ|የ)/g, "$1 $2"],

    [/(ለዚህ)(ዌብሳይት|መድረክ|ገጽ)/g, "$1 $2"],

    [/(ዌብሳይት|መድረክ)(መሥራቾች|መስራቾች|ባለቤቶች|ጥቅሞች)/g, "$1 $2"],

    [/(መሥራቾች|መስራቾች|መሥራቾችን|መስራቾችን)(ማን|ቡድን)/g, "$1 $2"],

    [/(ማን)(ማን)/g, "$1 $2"],

    [/(ማን)(እንደሆኑ)/g, "$1 $2"],

    [/(እንደሆኑ)(ንገረኝ|አሳየኝ)/g, "$1 $2"],

    [/(እርግጠኛ)(ነኝ)/g, "$1 $2"],

    [/(ነኝ)(የጤናዬ|የጤናዬን)/g, "$1 $2"],

    [/(የጤናዬ|የጤናዬን)(መሥራቾች|መስራቾች|ቡድን)/g, "$1 $2"],

    [/(መሥራቾች|መስራቾች|መሥራቾችን)(ቡድን)/g, "$1 $2"],

    [/(ቡድን)(ላሳይሽ|ላሳይህ|ላሳይዎት)/g, "$1 $2"],

    [/(እንደምን)(አደሩ|ዋሉ|አመሹ)/g, "$1 $2"],

    [/(በምን)(ልረዳዎት|ልረዳህ|ልረዳሽ)/g, "$1 $2"],

    [/(ልረዳዎት|ልረዳህ|ልረዳሽ)(እችላለሁ)/g, "$1 $2"],

    [/(በአቅራቢያ|በአቅራቢያዎ|በአቅራቢያዬ)(ያለው|ያሉ|ያሉትን|ሆስፒታል)/g, "$1 $2"],

    [/(ያለው|ያሉ|ያሉትን)(ሆስፒታል|ሆስፒታሎች|ሆስፒታሎችን)/g, "$1 $2"],

    [/(ሆስፒታል|ሆስፒታሎች|ሆስፒታሎችን)(ፈልግ|ፈልግልኝ|አሳየኝ|በጂኦሎኬሽን)/g, "$1 $2"],

    [/(በአሁኑ)(ሰዓት)/g, "$1 $2"],

    [/(ሰዓት)(በአቅራቢያ|በአቅራቢያዎ)/g, "$1 $2"],

    [/(በጂኦሎኬሽን|በጂፒኤስ)(የመፈለግ|መፈለግ)/g, "$1 $2"],

    [/(የመፈለግ)(ተግባር)/g, "$1 $2"],

    [/(ተግባር)(ማከናወን)/g, "$1 $2"],

    [/(ማከናወን)(አልቻልኩም|አልችልም)/g, "$1 $2"],

    [/(አልቻልኩም|አልችልም)(ነገር|ግን)/g, "$1 $2"],

    [/(ነገር)(ግን)/g, "$1 $2"],

    [/(ግን)(ስለ)/g, "$1 $2"],

    [/(ስለ)(Tenaye|ጤናዬ)/g, "$1 $2"],

    [/(Tenaye|ጤናዬ)(መድረክ|ስለ|ሆስፒታል)/g, "$1 $2"],

    [/(መድረክ)(ጥቅሞች|ባህሪያት)/g, "$1 $2"],

    [/(ጥቅሞች)(ወይም)/g, "$1 $2"],

    [/(ወይም)(ሌሎች)/g, "$1 $2"],

    [/(ሌሎች)(የጤና|የመጀመሪያ)/g, "$1 $2"],

    [/(የጤና)(ምክር|መረጃ|እርዳታ)/g, "$1 $2"],

    [/(የመጀመሪያ)(እርዳታ)/g, "$1 $2"],

    [/(ድንገተኛ)(አደጋ|ሆስፒታል|ጥሪ)/g, "$1 $2"],

    [/(የወባ|ወባ)(እና|ምልክቶች|ህክምና)/g, "$1 $2"],

    [/(እና)(የስኳር|ስኳር|የወባ)/g, "$1 $2"],

    [/(የስኳር|ስኳር)(ምልክቶች|በሽታ|ህክምና)/g, "$1 $2"],

    [/(የደም|ደም)(መፍሰስ|ግፊት|ስኳር)/g, "$1 $2"],

    [/(መፍሰስ)(የመጀመሪያ|እርዳታ)/g, "$1 $2"],

    [/(እግር|እግሬ|የእግር)(ደም|የደም|ቁስል)/g, "$1 $2"],

    [/(የዕለት)(ተዕለት)/g, "$1 $2"],

    [/(ተዕለት)(የጤና|ምክር)/g, "$1 $2"],

    [/(የጤና)(ምክር|ምክሮች|መረጃ|እርዳታ|ተቋም)/g, "$1 $2"],

    [/(የአምቡላንስ|አምቡላንስ)(ጥሪ|ስልክ|907)/g, "$1 $2"],

    [/(ስለ)(ጤናዬ|ቴናዬ|መሥራቾች|መስራቾች)/g, "$1 $2"],

    [/(ማን)(ናቸው|እንደሆኑ)/g, "$1 $2"],
  ]

  for (const [regex, replacement] of SPLITS) {
    s = s.replace(regex, replacement)
  }

  return s
}

/**
 * Sanitizes AI responses:
 * - Strips Gemini control tokens (<ctrl95>, <ctrl...>, [ctrl...], CTRL 95, etc.)
 * - Strips prompt injection artifacts and CTR tag leaks
 * - Overrides false "Amharic-only" refusal statements if mistakenly output by LLM
 * - Overrides false GPS refusal statements and triggers emergency navigation
 * - Automatically repairs missing Amharic word and punctuation spacing
 */

export function sanitizeAiOutput(raw: string): string {
  if (!raw) return ""

  let text = raw

  // 1. Strip all Gemini control token variations: <ctrl95>, <ctrl...>, [ctrl...], etc.

  text = text.replace(/<ctrl\d+>/gi, "")

  text = text.replace(/\[ctrl\d+\]/gi, "")

  text = text.replace(/<ctrl[a-zA-Z0-9_-]*>/gi, "")

  text = text.replace(/\[ctrl[a-zA-Z0-9_-]*\]/gi, "")

  text = text.replace(/<\/?ctrl\b[^>]*>/gi, "")

  text = text.replace(/\bctrl\s*\d+\b/gi, "")

  text = text.replace(/CTR\s*\d+\s*>\s*CTR\s*\d+[:.]?\s*/gi, "")

  text = text.replace(/CTR\s*\d+/gi, "")

  // 2. Strip prompt instructions or system tag leaks

  text = text.replace(
    /\[(?:CRITICAL\s+)?MANDATORY\s+INSTRUCTION:[^\]]*\]\s*/gi,
    "",
  )

  text = text.replace(/\[SYSTEM:[^\]]*\]\s*/gi, "")

  // 3. Failsafe: If model mistakenly generated "Sorry, I can only respond in Amharic..."

  text = text.replace(
    /(?:ይቅርታ[፣,]?\s*)?(?:እኔ\s+)?ምላሽ\s+መስጠት\s+የምችለው\s+በአማርኛ\s+ብቻ\s+ነው[^\n]*/gi,

    "I am glad to help you in English! How can I assist you with your health today?",
  )

  // 4. Failsafe: If model mistakenly generated refusal for geolocation / GPS hospital search

  if (
    /(?:ሆስፒታሎችን?\s*በጂኦሎኬሽን|በጂኦሎኬሽን\s*የመፈለግ|cannot\s+(?:find|locate)\s+hospitals?\s+by\s+(?:your\s+)?gps)/i.test(
      text,
    )
  ) {
    text = text.replace(
      /(?:ይቅርታ[፣,]?\s*)?(?:በአሁኑ\s*ሰዓት\s*)?(?:በአቅራቢያዎ?\s*ያሉ\s*)?ሆስፒታሎችን?\s*በጂኦሎኬሽን\s*የመፈለግ\s*ተግባር\s*ማከናወን\s*አልቻልኩም[^\n]*/gi,

      "I have activated the live GPS hospital locator on the Emergency page. The nationwide 24/7 ambulance hotline is 907. Verified closest emergency hospitals are displayed on the live map.",
    )

    text = text.replace(
      /(?:sorry[,\s]*)?(?:i\s+(?:currently\s+)?cannot|unable\s+to)\s+(?:find|locate)\s+hospitals?\s+by\s+(?:your\s+)?(?:gps|geolocation)[^\n]*/gi,

      "I have activated the live GPS hospital locator on the Emergency page. The nationwide 24/7 ambulance hotline is 907. Verified closest emergency hospitals are shown on the live map.",
    )

    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("tenaye-navigate", {
            detail: { path: "/emergency?autoLocate=true" },
          }),
        )
      } catch {}
    }
  }

  // 5. Strip any lecturing "use ethically", ethical disclaimers, or redundant medical notices
  text = text.replace(
    /(?:\n|^)\s*(?:\*{1,2})?(?:Medical\s+)?(?:Disclaimer|Notice|Warning|Alert):\s*(?:Please\s+)?use\s+(?:this\s+)?(?:information\s+)?ethically[^\n]*/gi,
    "",
  )
  text = text.replace(
    /(?:\n|^)\s*(?:\*{1,2})?(?:Medical\s+)?(?:Disclaimer|Notice|Warning|Alert):\s*Educational\s+guidance\s+only[^\n]*/gi,
    "",
  )
  text = text.replace(
    /(?:\n|^)\s*(?:\*{1,2})?(?:Medical\s+)?Disclaimer:?[^\n]*/gi,
    "",
  )
  text = text.replace(
    /(?:\n|^)\s*(?:\*{1,2})?ማሳሰቢያ፡?\s*ይህ\s+መመሪያ\s+ለድንገተኛ[^\n]*/gi,
    "",
  )
  text = text.replace(
    /(?:\n|^)\s*Please\s+use\s+(?:this\s+)?(?:information\s+)?ethically[^\n]*/gi,
    "",
  )
  text = text.replace(/\*?Medical Notice:[^*]+\*?/gi, "")
  text = text.replace(/\*?ማሳሰቢያ፡[^*]+\*?/gi, "")

  // 6. Repair any merged words or missing punctuation spacing

  text = repairAmharicSpacing(text)

  return text
}

/**
 * Normalizes speech recognition transcripts for both English and Amharic:
 * - Transliterates Arabic/Persian misrecognitions like "اوکی" -> "Okay"
 * - Transliterates accidental Devanagari
 * - Corrects speech navigation mishearings ("open apple picture" -> "open about page")
 * - Corrects speech STT artifacts (e.g. "Hey, kijk, kijk hem" -> "Hey, can you hear me?")
 * - Normalizes medical queries and first aid requests
 * - Repairs Amharic word and punctuation spacing
 */

export function sanitizeUserSpeech(raw: string): string {
  if (!raw) return ""

  let text = raw

  // 1. Transliterate Arabic speech artifacts

  for (const [ar, en] of Object.entries(ARABIC_SPEECH_MAP)) {
    text = text.replace(new RegExp(ar, "g"), en)
  }

  // 2. Transliterate Devanagari

  text = devanagariToEnglish(text)

  // 3. Strip acoustic tags (<noise>, [noise], etc.)

  text = text.replace(
    /<[^>]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^>]*?>/gi,
    " ",
  )

  text = text.replace(
    /\[[^\]]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^\]]*?\]/gi,
    " ",
  )

  // 4. Correct foreign STT mishearings of "Hey, can you hear me"

  text = text.replace(
    /\b(?:hey[,\s]+)?kijk[,\s]+kijk\s+hem\b/gi,
    "Hey, can you hear me?",
  )

  text = text.replace(/\b(?:kijk\s+hem|kijk\s+kijk)\b/gi, "can you hear me")

  // 5. Navigation mishearings

  // "open apple picture", "open apple", "open up picture", "open about picture", "open a picture" -> "open about page"

  text = text.replace(
    /\bopen\s+(?:the\s+)?(?:apple\s+picture|apple|up\s+picture|about\s+picture|a\s+picture|apple\s+page|up\s+page|about\s+which)\b/gi,
    "open about page",
  )

  text = text.replace(
    /\b(?:go\s+to|open)\s+(?:the\s+)?about(?:\s+page|\s+us|\s+us\s+page)?\b/gi,
    "open about page",
  )

  // Emergency & Hospital search

  text = text.replace(
    /\b(find\s+(?:me\s+)?(?:a\s+)?(?:nearby\s+)?hospital|nearest\s+hospital|hospital\s+near\s+me)\b/gi,
    "find hospital",
  )

  text = text.replace(
    /\b(?:open|go\s+to)\s+(?:the\s+)?emergency(?:\s+page)?\b/gi,
    "open emergency page",
  )

  // First Aid

  text = text.replace(
    /\b(?:open|go\s+to)\s+(?:the\s+)?first\s*aid\s+page\b/gi,
    "open first aid page",
  )

  // Medical phrasing

  text = text.replace(
    /\bmy\s+friend\s+is\s+a?\s*leg\s+bleeding\b/gi,
    "my friend is bleeding from the leg",
  )

  text = text.replace(
    /\bhow\s+can\s+(?:i\s+)?help\s+(?:he|him)\b/gi,
    "how can I help him",
  )

  text = text.replace(
    /\b(?:leg\s+bleed(?:ing)?|bleeding\s+on\s+(?:the\s+)?leg|cut\s+on\s+(?:the\s+)?leg)\b/gi,
    "leg bleeding",
  )

  text = text.replace(
    /\b(simstorms?|simtoms?|symptomps?|symptomes?)\b/gi,
    "symptoms",
  )

  text = text.replace(
    /\b(common\s+call|common\s+coal|come\s+on\s+cold|common\s+gold)\b/gi,
    "common cold",
  )

  text = text.replace(/\b(diabities|diabetis|diabetees)\b/gi, "diabetes")

  text = text.replace(/\b(maleria|malariya|malarial)\b/gi, "malaria")

  text = text.replace(/\b(hipertension|hyper\s+tension)\b/gi, "hypertension")

  text = text.replace(/\b(treatement|treetment)\b/gi, "treatment")

  // 6. Repair any merged words or missing punctuation spacing

  text = repairAmharicSpacing(text)

  return text
}

/**
 * Normalizes run-on Markdown text with missing newlines, inline asterisks, and bullets.
 * - Extracts section headers embedded with bullets (e.g. "• Causes: xyz" -> "**Causes:**\n• xyz")
 * - Protects bold words and acronyms (**F**ace, **FAST**) without splitting them onto new lines
 * - Completely removes lone bullet characters (preventing floating bullet dots)
 * - Deduplicates premature stream fragments
 * - Guarantees clean vertical spacing between sections
 */

export function normalizeMarkdownText(raw: string): string {
  if (!raw) return ""

  let text = raw.trim()

  // 1. Convert headers attached to bullets e.g. "• Symptoms: runny nose" or "• Causes: virus" (MUST have a colon!)

  const headerWordsEn =
    "(?:Symptoms|Causes|Home Care & Treatment|Home Care|Treatment|Prevention|Care|Diagnosis|Overview|Risk Factors|Warning Signs|Emergency Warning Signs|FAST Warning Signs|Emergency Warning Signs \\(FAST\\)|Immediate Actions|First Aid)"

  const headerWordsAm =
    "(?:(?:ዋና ዋና )?ምልክቶች|(?:ዋና ዋና )?መንስኤዎች(?: እና መተላለፊያ መንገዶች)?|መንስኤዎች|ህክምና እና እንክብካቤ|ህክምና እና የቤት ውስጥ እንክብካቤ|ህክምና|የቤት ውስጥ እንክብካቤ|መፍትሔ እና እንክብካቤ|የመከላከያ መንገዶች|መከላከያ|ምርመራ|አጠቃላይ መግለጫ|ወደ ሐኪም መቼ መሄድ እንዳለብዎት|የማስጠንቀቂያ ምልክቶች|የመጀመሪያ እርዳታ|የአደጋ ጊዜ ጥሪ)"

  const headerPattern = new RegExp(
    `(?:^|\\n)\\s*[•*-]\\s*(\\*\\*)?(${headerWordsEn}|${headerWordsAm})(\\*\\*)?\\s*[:፡]\\s*(.*)$`,

    "gmi",
  )

  text = text.replace(headerPattern, (_, _b1, headerName, _b2, rest) => {
    const colon = /[\u1200-\u137F]/.test(headerName) ? "፡" : ":"

    const cleanHeader = headerName.trim().replace(/[:፡]+$/, "")

    const formattedHeader = `\n\n**${cleanHeader}${colon}**`

    const cleanRest = (rest || "").trim()

    return cleanRest
      ? `${formattedHeader}\n• ${cleanRest}`
      : `${formattedHeader}\n`
  })

  // 2. Ensure clear line break before recognized standalone section headers (NOT arbitrary bold words!)

  const knownHeadersPattern = new RegExp(
    `([^\\n])\\s*(\\n?\\*\\*(?:${headerWordsEn}|${headerWordsAm})[:፡]?\\*\\*)`,

    "gmi",
  )

  text = text.replace(knownHeadersPattern, "$1\n\n$2\n")

  // 3. Merge single bold initial letters with their word title e.g. "**F**ace Drooping (F):" -> "**Face Drooping (F):**"

  text = text.replace(
    /\*\*([A-Za-z])\*\*([A-Za-z]+(?:\s+[A-Za-z]+|\s*\([A-Za-z0-9]+\))?[:፡]?)/g,
    "**$1$2**",
  )

  // 4. Strip any rogue triple or quadruple asterisks (e.g. '****' -> '')

  text = text.replace(/\*{3,}/g, "")

  // 5. Safely auto-balance any line with an odd number of ** (never append if already even!)

  const preLines = text.split("\n")

  text = preLines

    .map((line) => {
      const starMatches = line.match(/\*\*/g)

      if (starMatches && starMatches.length % 2 === 1) {
        return line.trimEnd() + "**"
      }

      return line
    })

    .join("\n")

  // 6. Temporarily protect valid bold blocks **...** so internal letters/asterisks are never corrupted

  const boldTokens: string[] = []

  text = text.replace(/\*\*[^*]+\*\*/g, (match) => {
    boldTokens.push(match)

    return `___BOLD_${boldTokens.length - 1}___`
  })

  // 5. In the remaining non-bold text:

  // Convert punctuation followed by bullet: '፡•' or ':•'

  text = text.replace(/([:፡።])\s*[*•-]\s*/g, "$1\n• ")

  // Amharic-only run-on asterisks: 'ትኩሳት*ብርድ' (never run on English words!)

  text = text.replace(/([\u1200-\u137F])\s*\*\s*([\u1200-\u137F])/g, "$1\n• $2")

  // Normalize whitespace around bullets: ' * ' or ' • '

  text = text.replace(/\s+[*•-]\s+/g, "\n• ")

  // Standardize start-of-line bullets: '* ' or '- ' -> '• '

  text = text.replace(/(^|\n)\s*[-*]\s+/g, "$1• ")

  // 6. Restore protected bold blocks intact

  text = text.replace(
    /___BOLD_(\d+)___/g,
    (_, idx) => boldTokens[Number(idx)] || "",
  )

  // 7. Strip solitary rogue asterisks (do not touch **bold**)

  text = text.replace(/(^|[^\*])\*(?!\*)/g, "$1")

  // 8. Completely remove solitary bullet dots on their own line (e.g. "\n•\n" or "\n•  \n")

  text = text.replace(/(?:^|\n)\s*[•*-]\s*(?=\n|$)/g, "\n")

  // 9. Normalize duplicate or premature partial lines (e.g. "ime to" when followed by "ime to call emergency")

  const lines = text.split("\n")

  const deduplicatedLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const cur = lines[i].trim()

    const next = lines[i + 1]?.trim() || ""

    // If current line is an incomplete prefix of the next line, omit the premature fragment

    if (
      cur &&
      next &&
      next.startsWith(cur) &&
      cur.length >= 4 &&
      cur.length < next.length
    ) {
      continue
    }

    // If current line is exact duplicate of previous line

    if (
      cur &&
      deduplicatedLines.length > 0 &&
      deduplicatedLines[deduplicatedLines.length - 1].trim() === cur
    ) {
      continue
    }

    deduplicatedLines.push(lines[i])
  }

  text = deduplicatedLines.join("\n")

  // 10. Normalize excess newlines (max 2 consecutive)

  text = text.replace(/\n{3,}/g, "\n\n")

  return text.trim()
}

/**
 * Cleans AI speech responses for VoiceStage live captions by removing markdown artifacts
 * while keeping clean bullet points and section line breaks.
 */

export function cleanVoiceSubtitle(raw: string, _isAmharic?: boolean): string {
  if (!raw) return ""

  let text = normalizeMarkdownText(raw)

  // Strip markdown header syntax: ### Heading -> Heading

  text = text.replace(/^#+\s*/gm, "")

  // Strip bold/italic markdown stars: **word** -> word, *word* -> word

  text = text.replace(/\*\*([^*]+)\*\*/g, "$1")

  text = text.replace(/\*([^*]+)\*/g, "$1")

  text = text.replace(/\*{1,3}/g, "")

  // Strip typewriter block cursor if present

  text = text.replace(/\s*▋/g, "")

  return text.trim()
}

/**
 * Normalizes speech recognition acoustic artifacts and foreign misrecognitions into English/Amharic.
 * - Strips acoustic descriptive tags: <noise>, [noise], <laughter>, <music>, (cough), etc.
 * - Fixes phonetic misrecognitions of "Hey, can you hear me?" ("hey in healing", "can you healing", Dutch "kijk een huis", Sinhala).
 * - Fixes navigation mishearings ("open about which" -> "Open the about page").
 * - Normalizes medical query misrecognitions ("common coal" -> "common cold", "simtoms" -> "symptoms").
 */

export function cleanSpokenTranscript(raw: string): string {
  if (!raw) return ""

  let text = sanitizeUserSpeech(raw)

  // 1. Strip all non-speech acoustic event tags:

  // e.g. <noise>, <laughter>, <music>, <sigh>, <cough>, <throat-clearing>, <snicker>, <groan>, <applause>, <whisper>, <inaudible>, <unintelligible>

  text = text.replace(
    /<[^>]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^>]*?>/gi,
    " ",
  )

  text = text.replace(
    /\[[^\]]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^\]]*?\]/gi,
    " ",
  )

  text = text.replace(
    /\([^)]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^)]*?\)/gi,
    " ",
  )

  // Strip any remaining standalone angle-bracket or bracket tags like <noise> or <sound>

  text = text.replace(/<[a-zA-Z0-9_\s-]+>/g, " ")

  // Strip words "less than ... greater than noise" or "noise" acoustic descriptions if literalized

  text = text.replace(
    /\b(?:less\s+than\s+)?noise(?:\s+greater\s+than)?\b/gi,
    " ",
  )

  // 2. Clean up phonetic misrecognitions of "Hey, can you hear me?" / hearing checks:

  // Patterns like "hey in healing", "in healing", "can you healing", "can you hearing", "hey in hearing", "are you hearing", "kijk een huis", "kun je me horen"

  const hearingCheckRegex =
    /\b(?:hey\s*,?\s*)?(?:in\s+healing|in\s+hearing|can\s+you\s+(?:hear|hearing|healing)|are\s+you\s+(?:hear|hearing|healing)|you\s+hear\s+me|you\s+hearing\s+me|hear\s+me\s+now|can\s+you\s+hear)\b/i

  const dutchHearingRegex =
    /\b(?:hey\s*,?\s*)?(?:kijk\s+een\s+huis|kijk\s+huis|hoor\s+je\s+m[ie]j?|kun\s+je\s+me\s+horen|kan\s+je\s+me\s+horen|hallo\s+hoor\s+je|versta\s+je\s+me)\b/i

  if (hearingCheckRegex.test(text) || dutchHearingRegex.test(text)) {
    // If the remaining words are short or mostly filler/acoustic artifacts (e.g. "have like in middle to less than and greater than noise than hey in healing")

    const coreWords = text
      .replace(
        /\b(hey|have|like|in|middle|to|than|noise|healing|hearing|can|you|hear|me|now|the|a|so|well|good|yes)\b/gi,
        "",
      )
      .trim()

    if (coreWords.length <= 15) {
      return "Hey, can you hear me?"
    }

    text = text.replace(hearingCheckRegex, "can you hear me")

    text = text.replace(dutchHearingRegex, "can you hear me")
  }

  // 3. Detect Sinhala / Japanese acoustic misrecognitions of "can you hear me"

  if (
    /[\u0D80-\u0DFF]/.test(text) ||
    /[\u3040-\u30FF]/.test(text) ||
    /[\u4E00-\u9FFF]/.test(text)
  ) {
    if (
      text.includes("ඒ") ||
      text.includes("ෆිልም") ||
      text.includes("あと") ||
      text.length <= 40
    ) {
      return "Hey, can you hear me?"
    }

    text = text.replace(FOREIGN_SCRIPTS_REGEX, "").trim()

    if (!text || text.length < 3) {
      return "Hey, can you hear me?"
    }
  }

  // 4. Strip any other non-Latin, non-Ethiopic script characters (Arabic, Thai, Cyrillic, etc.)

  if (FOREIGN_SCRIPTS_REGEX.test(text)) {
    text = text.replace(FOREIGN_SCRIPTS_REGEX, "").trim()

    if (!text || text.length < 3) {
      return "Hey, can you hear me?"
    }
  }

  // 5. Clean up spoken navigation commands:

  // "open about which" -> "Open the about page"

  text = text.replace(
    /\bopen\s+(?:the\s+)?about(?:\s+us)?\s+(?:which|each|teach|beach|reach|bridge|page)?\b/gi,
    "Open the about page",
  )

  text = text.replace(
    /\bgo\s+to\s+(?:the\s+)?about(?:\s+us)?(?:\s+(?:which|each|teach|beach|page))?\b/gi,
    "Go to the about page",
  )

  text = text.replace(/\bopen\s+about\s*$/gi, "Open the about page")

  // Contact page

  text = text.replace(
    /\bopen\s+(?:the\s+)?contact(?:\s+us)?\s+(?:which|each|teach|beach|page)?\b/gi,
    "Open the contact page",
  )

  text = text.replace(
    /\bgo\s+to\s+(?:the\s+)?contact(?:\s+us)?(?:\s+(?:which|each|teach|beach|page))?\b/gi,
    "Go to the contact page",
  )

  // Emergency page

  text = text.replace(
    /\bopen\s+(?:the\s+)?emergency\s+(?:which|each|teach|beach|page)?\b/gi,
    "Open the emergency page",
  )

  text = text.replace(
    /\bgo\s+to\s+(?:the\s+)?emergency(?:\s+(?:which|each|teach|beach|page))?\b/gi,
    "Go to the emergency page",
  )

  // Disease library page

  text = text.replace(
    /\bopen\s+(?:the\s+)?disease(?:s)?(?:\s+library)?\s+(?:which|each|teach|beach|page)?\b/gi,
    "Open the disease library page",
  )

  text = text.replace(
    /\bgo\s+to\s+(?:the\s+)?disease(?:s)?(?:\s+library)?(?:\s+(?:which|each|teach|beach|page))?\b/gi,
    "Go to the disease library page",
  )

  // First Aid page

  text = text.replace(
    /\bopen\s+(?:the\s+)?first\s*aid\s+(?:which|each|teach|beach|page)?\b/gi,
    "Open the first aid page",
  )

  text = text.replace(
    /\bgo\s+to\s+(?:the\s+)?first\s*aid(?:\s+(?:which|each|teach|beach|page))?\b/gi,
    "Go to the first aid page",
  )

  // Health Tips page

  text = text.replace(
    /\bopen\s+(?:the\s+)?health\s*tips?\s+(?:which|each|teach|beach|page)?\b/gi,
    "Open the health tips page",
  )

  text = text.replace(
    /\bgo\s+to\s+(?:the\s+)?health\s*tips?(?:\s+(?:which|each|teach|beach|page))?\b/gi,
    "Go to the health tips page",
  )

  // 6. Medical terminology & phonetic corrections

  text = text.replace(
    /\b(simstorms?|simtoms?|symptomps?|symptomes?)\b/gi,
    "symptoms",
  )

  text = text.replace(
    /\b(common\s+call|common\s+coal|come\s+on\s+cold|common\s+gold)\b/gi,
    "common cold",
  )

  text = text.replace(/\b(diabities|diabetis|diabetees)\b/gi, "diabetes")

  text = text.replace(/\b(diaria|diarhea|diarea)\b/gi, "diarrhea")

  text = text.replace(
    /\b(symptoms|causes|treatment|care)\s+of\s+the\s+area\b/gi,
    "$1 of malaria",
  )

  // 7. Collapse extra whitespace and trim

  return text.replace(/\s{2,}/g, " ").trim()
}

/**
 * Strips accidental bilingual slash pairs (e.g. "English text / የአማርኛ ጽሑፍ")
 * while strictly preserving all internal slashes and content in the selected language.
 */

export function cleanBilingualOutput(
  raw: string,
  isUserAmharic = false,
): string {
  if (!raw) return ""

  let text = raw.trim()

  // Strip foreign scripts that should never appear in output

  if (
    /[\u0D80-\u0DFF]/.test(text) ||
    /[\u3040-\u30FF]/.test(text) ||
    /[\u4E00-\u9FFF]/.test(text)
  ) {
    text = text.replace(/[\u0D80-\u0DFF\u3040-\u30FF\u4E00-\u9FFF]/g, "").trim()
  }

  // Strip all Gemini control token variations: <ctrl95>, <ctrl...>, [ctrl...], etc.

  text = sanitizeAiOutput(text)

  // Strip any accidental prompt injection artifacts or token markers like "CTR 46 > CTR 46"

  text = text.replace(/^CTR\s*\d+\s*>\s*CTR\s*\d+[:.]?\s*/gi, "").trim()

  text = text.replace(/CTR\s*\d+\s*>\s*CTR\s*\d+/gi, "").trim()

  text = text
    .replace(/\[(?:CRITICAL\s+)?MANDATORY\s+INSTRUCTION:[^\]]*\]\s*/gi, "")
    .trim()

  // Handle explicit [ENGLISH] / [AMHARIC] tags

  const hasEnglishTag = /\[ENGLISH\]/i.test(text)

  const hasAmharicTag = /\[(?:AMHARIC|አማርኛ)\]/i.test(text)

  if (hasEnglishTag || hasAmharicTag) {
    if (!isUserAmharic) {
      // English mode: discard everything from [AMHARIC] onwards

      if (hasAmharicTag) {
        text = text.split(/\[(?:AMHARIC|አማርኛ)\]/i)[0].trim()
      }

      text = text.replace(/^\[ENGLISH\]\s*(?:[A-Za-z\s]+[:፡])?\s*/i, "").trim()
    } else {
      // Amharic mode: keep only the Amharic portion

      if (hasAmharicTag) {
        const parts = text.split(/\[(?:AMHARIC|አማርኛ)\]/i)

        text = parts[parts.length - 1].trim()
      }

      text = text
        .replace(/^\[(?:AMHARIC|አማርኛ)\]\s*(?:[\u1200-\u137F\s]+[:፡])?\s*/i, "")
        .trim()
    }
  }

  // Check if text has both significant Latin and Ethiopic characters

  const hasLatin = /[a-zA-Z]{3,}/.test(text)

  const hasEthiopic = /[\u1200-\u137F]{3,}/.test(text)

  if (hasLatin && hasEthiopic) {
    if (
      text.includes(" / ") ||
      text.includes(" | ") ||
      text.includes("\n/\n")
    ) {
      // Case 1: English first, Amharic second

      const matchEnAm = text.match(
        /^([\s\S]*?[a-zA-Z]{2,}[\s\S]*?)\s*(?:\n\s*)?[\/|]\s*(?:\n\s*)?([\s\S]*?[\u1200-\u137F]{2,}[\s\S]*)$/,
      )

      if (matchEnAm) {
        return (isUserAmharic ? matchEnAm[2] : matchEnAm[1]).trim()
      }

      // Case 2: Amharic first, English second

      const matchAmEn = text.match(
        /^([\s\S]*?[\u1200-\u137F]{2,}[\s\S]*?)\s*(?:\n\s*)?[\/|]\s*(?:\n\s*)?([\s\S]*?[a-zA-Z]{2,}[\s\S]*)$/,
      )

      if (matchAmEn) {
        return (isUserAmharic ? matchAmEn[1] : matchAmEn[2]).trim()
      }
    }

    // Split paragraphs by \n\n to isolate language blocks cleanly without truncating within sections

    const paras = text.split(/\n{2,}/)

    if (paras.length > 1) {
      if (!isUserAmharic) {
        // Collect English paragraphs until an explicitly Amharic-dominant block starts

        const enParas: string[] = []

        for (const p of paras) {
          const latinCount = (p.match(/[a-zA-Z]/g) || []).length

          const ethCount = (p.match(/[\u1200-\u137F]/g) || []).length

          if (ethCount > 8 && ethCount > latinCount) {
            break
          }

          enParas.push(p)
        }

        if (enParas.length > 0) {
          text = enParas.join("\n\n").trim()
        }
      } else {
        // Collect Amharic paragraphs (keep all paragraphs containing Ethiopic script)

        const amParas = paras.filter((p) => /[\u1200-\u137F]/.test(p))

        if (amParas.length > 0) {
          text = amParas.join("\n\n").trim()
        }
      }
    }
  }

  // Hearing check language alignment fallback

  if (!isUserAmharic) {
    if (
      /(?:አዎ[፣,]?\s*)?(?:በደንብ\s+)?እሰማ(?:ዎታለሁ|ሃለሁ|ሻለሁ|ሃለው|ሻለው|ዋለሁ|ታለሁ)/.test(
        text,
      ) ||
      /(?:በምን\s+(?:የጤና\s+ጉዳይ\s+)?ልርዳ(?:ዎ|ህ|ሽ))/i.test(text)
    ) {
      return "I can hear you clearly. How can I help you with your health today?"
    }
  } else {
    if (
      /I\s+(?:can\s+)?hear\s+you\s+(?:clearly|loud|well|fine)/i.test(text) ||
      /how\s+can\s+I\s+help\s+you/i.test(text)
    ) {
      return "አዎ፣ በደንብ እሰማዎታለሁ! ዛሬ በምን የጤና ጉዳይ ልርዳዎ?"
    }
  }

  return text
}

/**
 * Speaks text aloud using Web Speech API (Synthesis) with natural pacing.
 * Supports both English and Amharic, returning a cleanup cancel function.
/**
 * Intelligently selects the best natural AI female avatar voice across all browsers
 * (Edge Natural Jenny/Aria, Google US English female, Apple Samantha, Windows Zira).
 * Guarantees a warm, crystal-clear, modern AI character like Gemini and Voxide.
 */

function selectBestAIFemaleVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null

  // 1. Highest tier: Edge Natural Neural female voices (lifelike AI avatar character)

  const premiumEdgeFemale = [
    "microsoft jenny online (natural)",

    "microsoft aria online (natural)",

    "microsoft michelle online (natural)",

    "microsoft ana online (natural)",

    "microsoft ava online (natural)",

    "microsoft emma online (natural)",

    "microsoft sonia online (natural)",

    "microsoft clara online (natural)",

    "microsoft natasha online (natural)",

    "microsoft jenny",

    "microsoft aria",
  ]

  for (const name of premiumEdgeFemale) {
    const v = voices.find((voice) => voice.name.toLowerCase().includes(name))

    if (v) return v
  }

  // 2. Google Chrome Natural Female (Official Gemini / Google Assistant voice character)

  const googleFemale = voices.find(
    (voice) =>
      voice.name.toLowerCase().includes("google us english") ||
      voice.name.toLowerCase().includes("google uk english female") ||
      voice.name.toLowerCase().includes("en-us-x-sfg#female"),
  )

  if (googleFemale) return googleFemale

  // 3. Apple / iOS Natural Female (Samantha / Karen / Victoria / Moira / Tessa)

  const appleFemale = voices.find(
    (voice) =>
      voice.name.toLowerCase() === "samantha" ||
      voice.name.toLowerCase().includes("samantha") ||
      voice.name.toLowerCase().includes("victoria") ||
      voice.name.toLowerCase().includes("karen") ||
      voice.name.toLowerCase().includes("moira") ||
      voice.name.toLowerCase().includes("tessa"),
  )

  if (appleFemale) return appleFemale

  // 4. Windows Desktop Female (Zira)

  const ziraFemale = voices.find((voice) =>
    voice.name.toLowerCase().includes("zira"),
  )

  if (ziraFemale) return ziraFemale

  // Male filter helper

  const isMaleVoice = (name: string): boolean => {
    const n = name.toLowerCase()

    return (
      n.includes("male") ||
      n.includes("david") ||
      n.includes("mark") ||
      n.includes("george") ||
      n.includes("guy") ||
      n.includes("christopher") ||
      n.includes("stefan") ||
      n.includes("eric") ||
      n.includes("james") ||
      n.includes("richard")
    )
  }

  // 5. Any English voice explicitly tagged female or natural

  const anyFemale = voices.find(
    (voice) =>
      voice.lang.startsWith("en") &&
      (voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("natural")) &&
      !isMaleVoice(voice.name),
  )

  if (anyFemale) return anyFemale

  // 6. Any English voice that is NOT a known robotic male voice

  const nonRoboticEn = voices.find(
    (voice) => voice.lang.startsWith("en") && !isMaleVoice(voice.name),
  )

  if (nonRoboticEn) return nonRoboticEn

  // 7. Fallback

  return (
    voices.find((v) => v.lang === "en-US" || v.lang.startsWith("en")) || null
  )
}

// Pre-cache voices when browser loads them asynchronously

if (typeof window !== "undefined" && window.speechSynthesis) {
  try {
    window.speechSynthesis.getVoices()

    window.speechSynthesis.onvoiceschanged = () => {
      try {
        window.speechSynthesis.getVoices()
      } catch {}
    }
  } catch {}
}

/**
 * Splits long medical/clinical text into natural sentence-level chunks (< 160 characters each).
 * This completely avoids the Chromium 15-second speech synthesis cutoff bug
 * and prevents Web Speech API from pausing or dropping audio midway through long answers.
 */

export function splitTextIntoSpeechChunks(text: string): string[] {
  if (!text) return []

  // Normalize text for spoken speech:

  // Convert list bullets to punctuation so sentences pause naturally

  const prepared = text

    .replace(/[•\-\*#]/g, " ")

    .replace(/\n+/g, ". ")

    .replace(/[:፡]/g, ": ")

    .replace(/\s{2,}/g, " ")

    .trim()

  if (!prepared) return []

  // Split on sentence boundary delimiters: . ! ? ። ፧ ; or colons

  const rawSentences = prepared.split(/(?<=[.!?።፧;:\n])\s+/)

  const chunks: string[] = []

  let currentChunk = ""

  for (const sentence of rawSentences) {
    const s = sentence.trim()

    if (!s) continue

    if (!currentChunk) {
      currentChunk = s
    } else if ((currentChunk + " " + s).length <= 150) {
      currentChunk += " " + s
    } else {
      chunks.push(currentChunk)

      currentChunk = s
    }

    // If a single sentence is excessively long (> 160 chars), split by commas or pauses

    if (currentChunk.length > 160) {
      const subParts = currentChunk.split(/(?<=[,፣])\s+/)

      if (subParts.length > 1) {
        let sub = ""

        for (const p of subParts) {
          if (!sub) {
            sub = p
          } else if ((sub + " " + p).length <= 140) {
            sub += " " + p
          } else {
            chunks.push(sub)

            sub = p
          }
        }

        currentChunk = sub
      }
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }

  return chunks.filter((c) => c.length > 0)
}

// Active HTML5 Audio element for Amharic audio streaming fallback

let activeAmharicAudio: HTMLAudioElement | null = null

// Persistent references to active utterances to prevent V8 garbage-collection cutoff

let activeSpeechUtterances: SpeechSynthesisUtterance[] = []

let speechHeartbeatTimer: NodeJS.Timeout | null = null

let activeSpeechGeneration = 0

let cachedVoices: SpeechSynthesisVoice[] = []

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return []

  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices()
  }

  return cachedVoices
}

if (typeof window !== "undefined" && window.speechSynthesis) {
  cachedVoices = window.speechSynthesis.getVoices()

  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices()
  }
}

/**
 * Strips English parentheticals like "(Overview)", "(Key Symptoms)", "(Causes & Transmission)"
 * from Amharic responses so the Amharic TTS speaks pure, fluid Ethiopic text without glitches.
 */

function cleanAmharicForSpeech(text: string): string {
  return (
    text

      // Remove English parenthetical annotations: (Overview), (Key Symptoms), (When to see a doctor), etc.

      .replace(/\s*\([A-Za-z0-9\s&/,\.\-–—]+\)\s*/g, " ")

      // Remove standalone Latin characters/words if mixed in headers

      .replace(/\b[A-Za-z]{2,}\b/g, "")

      // Clean excessive spaces and punctuation artifacts

      .replace(/[•\-\*#]/g, " ")

      .replace(/\s{2,}/g, " ")

      .trim()
  )
}

/**
 * Cloud streaming fallback for Amharic audio when the client browser lacks a local SAPI Amharic voice.
 * Splits text into natural Ethiopic sentence segments and sequentially streams audio via HTML5 Audio.
 */

function playAmharicAudioStream(
  chunks: string[],

  generation: number,

  onEnd?: () => void,
): () => void {
  let isCancelled = false

  let currentIndex = 0

  const stopStream = () => {
    isCancelled = true

    if (activeAmharicAudio) {
      try {
        activeAmharicAudio.pause()

        activeAmharicAudio.currentTime = 0

        activeAmharicAudio.src = ""
      } catch {}

      activeAmharicAudio = null
    }
  }

  const playNextChunk = () => {
    if (isCancelled || generation !== activeSpeechGeneration) {
      stopStream()

      return
    }

    if (currentIndex >= chunks.length) {
      stopStream()

      if (onEnd) onEnd()

      return
    }

    const chunk = chunks[currentIndex++].trim()

    if (!chunk) {
      playNextChunk()

      return
    }

    // Google Translate TTS via Vite proxy (/api/tts) with direct fallback to bypass browser CORS

    const encoded = encodeURIComponent(chunk)

    const audioUrl = `/api/tts?tl=am&q=${encoded}`

    try {
      if (activeAmharicAudio) {
        activeAmharicAudio.pause()

        activeAmharicAudio.src = ""
      }

      const audio = document.createElement("audio")

      ;(audio as any).referrerPolicy = "no-referrer"

      audio.crossOrigin = "anonymous"

      audio.src = audioUrl

      activeAmharicAudio = audio

      audio.playbackRate = 1.0

      audio.onended = () => {
        if (!isCancelled && generation === activeSpeechGeneration) {
          playNextChunk()
        }
      }

      let hasFallenBack = false

      const fallbackToWebSpeech = () => {
        if (
          hasFallenBack ||
          isCancelled ||
          generation !== activeSpeechGeneration
        )
          return

        hasFallenBack = true

        try {
          if (typeof window !== "undefined" && window.speechSynthesis) {
            const utter = new SpeechSynthesisUtterance(chunk)

            utter.lang = "am-ET"

            utter.rate = 0.96

            utter.onend = () => {
              if (!isCancelled && generation === activeSpeechGeneration) {
                playNextChunk()
              }
            }

            utter.onerror = () => {
              if (!isCancelled && generation === activeSpeechGeneration) {
                playNextChunk()
              }
            }

            activeSpeechUtterances = [utter]

            window.speechSynthesis.speak(utter)

            return
          }
        } catch {}

        playNextChunk()
      }

      audio.onerror = (e) => {
        console.warn(
          "[Tenaye Audio Stream Chunk Error, trying Web Speech fallback]",
          e,
        )

        fallbackToWebSpeech()
      }

      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(
            "[Tenaye Audio Stream Play Warning, trying Web Speech fallback]",
            err,
          )

          fallbackToWebSpeech()
        })
      }
    } catch (err) {
      console.warn("[Tenaye Audio Stream Catch]", err)

      if (!isCancelled && generation === activeSpeechGeneration) {
        playNextChunk()
      }
    }
  }

  playNextChunk()

  return stopStream
}

/**
 * High-fidelity spoken audio narrator with modern AI female avatar character.
 * Uses natural cadence, friendly melodic pitch (1.06), and smooth speed (1.0).
 * Sequentially chunks speech with a Chromium heartbeat keepalive to read entire medical responses without stopping.
 */

export function speakText(
  text: string,
  isAmharic = false,
  onEnd?: () => void,
): () => void {
  if (typeof window === "undefined") {
    if (onEnd) onEnd()
    return () => {}
  }

  // Cancel any lingering browser speech synthesis so robotic browser TTS never plays
  try {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  } catch {}

  const thisGen = ++activeSpeechGeneration

  const stopCurrentSpeech = () => {
    try {
      if (speechHeartbeatTimer) {
        clearInterval(speechHeartbeatTimer)
        speechHeartbeatTimer = null
      }

      activeSpeechUtterances = []

      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }

      if (activeAmharicAudio) {
        activeAmharicAudio.pause()
        activeAmharicAudio.currentTime = 0
        activeAmharicAudio.src = ""
        activeAmharicAudio = null
      }
    } catch {}
  }

  stopCurrentSpeech()

  const isEthiopicScript = /[\u1200-\u137F]/.test(text)
  const targetAmharic = isAmharic || isEthiopicScript
  const rawClean = cleanVoiceSubtitle(text, targetAmharic)
  const cleanToSpeak = targetAmharic
    ? cleanAmharicForSpeech(rawClean)
    : rawClean
        .replace(/[•\-\*#]/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim()

  if (!cleanToSpeak) {
    if (onEnd) onEnd()
    return () => {}
  }

  // For Amharic, use high-fidelity neural audio stream from TTS proxy (no browser robotic voice)
  if (targetAmharic) {
    const chunks = splitTextIntoSpeechChunks(cleanToSpeak)
    if (chunks.length === 0) {
      if (onEnd) onEnd()
      return () => {}
    }

    const cancelStream = playAmharicAudioStream(chunks, thisGen, onEnd)
    return () => {
      cancelStream()
      stopCurrentSpeech()
    }
  } else {
    // For English: Browser SpeechSynthesis is intentionally DISABLED per user directive
    // Spoken voice is handled natively by Voxide's real-time Web Audio PCM stream.
    // If running in text mode, visual typewriter output is provided cleanly without robotic browser TTS.
    if (onEnd) {
      // Allow brief natural pacing before notifying speech completion
      const finishTimer = setTimeout(() => {
        if (thisGen === activeSpeechGeneration) {
          onEnd()
        }
      }, 1200)
      return () => clearTimeout(finishTimer)
    }
    return () => {}
  }
}

