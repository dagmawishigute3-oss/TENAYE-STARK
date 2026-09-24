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
  "ओके": "Okay",
  "ओक": "Okay",
  "ओक्के": "Okay",
  "इन": "in",
  "नेम": "name",
  "नाम": "name",
  "फिल": "fill",
  "यूनाथन": "Yonatan",
  "योनाथन": "Yonatan",
  "योनातान": "Yonatan",
  "योनातन": "Yonatan",
  "ईमेल": "email",
  "इमेल": "email",
  "सेड": "set",
  "सेट": "set",
  "सेंड": "send",
  "हेलो": "Hello",
  "हेल्लो": "Hello",
  "हाय": "Hi",
  "ओपन": "Open",
  "खोलो": "Open",
  "पेज": "page",
  "होम": "Home",
  "अबाउट": "About",
  "कांटेक्ट": "Contact",
  "कॉन्टैक्ट": "Contact",
  "इमरजेंसी": "Emergency",
  "एम्बुलेंस": "Ambulance",
  "डॉक्टर": "Doctor",
  "मलेरिया": "Malaria",
  "डायबिटीज": "Diabetes",
  "सिम्टम्स": "Symptoms",
  "सिम्पटम्स": "Symptoms",
  "लक्षण": "symptoms",
  "हेल्थ": "Health",
  "टिप्स": "Tips",
  "फर्स्ट एड": "First Aid",
  "फाउंडर": "Founder",
  "फाउंडर्स": "Founders",
  "टीम": "team",
  "फोन": "phone",
  "नंबर": "number",
  "क्लियर": "Clear",
  "स्टॉप": "Stop",
  "यस": "yes",
  "नो": "no",
  "व्हाट": "what",
  "हाउ": "how",
  "हु": "who",
  "प्लीज": "please",
  "थैंक यू": "thank you",
  "थैंक्स": "thanks",
};

// Character-by-character phonetic fallback for any remaining Devanagari glyphs
const DEVANAGARI_CHAR_MAP: Record<string, string> = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'f', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'র': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  'ं': 'n', 'ँ': 'n', 'ः': 'h', '्': '',
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
};

/**
 * Transliterates any accidental Devanagari/Hindi script in speech recognition into clean English.
 */
export function devanagariToEnglish(text: string): string {
  if (!text) return '';
  // Check for Devanagari block (U+0900 to U+097F)
  if (!/[\u0900-\u097F]/.test(text)) return text;

  let out = text;
  // 1. Replace known spoken words
  for (const [hindi, english] of Object.entries(DEVANAGARI_WORD_MAP)) {
    out = out.replace(new RegExp(hindi, 'g'), english);
  }

  // 2. Character-by-character fallback for remaining glyphs
  if (/[\u0900-\u097F]/.test(out)) {
    let converted = '';
    for (let i = 0; i < out.length; i++) {
      const char = out[i];
      if (DEVANAGARI_CHAR_MAP[char] !== undefined) {
        converted += DEVANAGARI_CHAR_MAP[char];
      } else if (char.charCodeAt(0) >= 0x0900 && char.charCodeAt(0) <= 0x097F) {
        // Strip unmapped diacritics
      } else {
        converted += char;
      }
    }
    out = converted;
  }

  return out.replace(/\s{2,}/g, ' ').trim();
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
const FOREIGN_SCRIPTS_REGEX = /[\u0D80-\u0DFF\u3040-\u30FF\u4E00-\u9FFF\u0980-\u0D7F\u0600-\u06FF\u0750-\u077F\u0E00-\u0E7F\u0400-\u04FF]/g;

/**
 * Normalizes run-on Markdown text with missing newlines, inline asterisks, and bullets.
 * - Extracts section headers embedded with bullets (e.g. "• Causes: xyz" -> "**Causes:**\n• xyz")
 * - Protects bold words and acronyms (**F**ace, **FAST**) without splitting them onto new lines
 * - Completely removes lone bullet characters (preventing floating bullet dots)
 * - Deduplicates premature stream fragments
 * - Guarantees clean vertical spacing between sections
 */
export function normalizeMarkdownText(raw: string): string {
  if (!raw) return '';
  let text = raw.trim();

  // 1. Convert headers attached to bullets e.g. "• Symptoms: runny nose" or "• Causes: virus"
  const headerWordsEn = '(?:Symptoms|Causes|Home Care & Treatment|Home Care|Treatment|Prevention|Care|Diagnosis|Overview|Risk Factors|Warning Signs|Emergency Warning Signs|FAST Warning Signs|Emergency Warning Signs \\(FAST\\)|Immediate Actions|First Aid)';
  const headerWordsAm = '(?:(?:ዋና ዋና )?ምልክቶች|(?:ዋና ዋና )?መንስኤዎች|ህክምና እና እንክብካቤ|መፍትሔ እና እንክብካቤ|ህክምና እና የቤት ውስጥ እንክብካቤ|ህክምና እና የቤት ውስጥ|የቤት ውስጥ እንክብካቤ|ህክምና|መከላከያ|ምርመራ|አጠቃላይ መግለጫ|የመጀመሪያ እርዳታ|የአደጋ ጊዜ ጥሪ)';
  const headerPattern = new RegExp(
    `(?:^|\\n)\\s*[•*-]\\s*(\\*\\*)?(${headerWordsEn}|${headerWordsAm})\\s*[:፡]?\\s*(\\*\\*)?\\s*(.*)$`,
    'gmi'
  );
  text = text.replace(headerPattern, (_, _b1, headerName, _b2, rest) => {
    const colon = /[\u1200-\u137F]/.test(headerName) ? '፡' : ':';
    const cleanHeader = headerName.trim().replace(/[:፡]+$/, '');
    const formattedHeader = `\n\n**${cleanHeader}${colon}**`;
    const cleanRest = (rest || '').trim();
    return cleanRest ? `${formattedHeader}\n• ${cleanRest}` : `${formattedHeader}\n`;
  });

  // 2. Ensure clear line break before recognized standalone section headers (NOT arbitrary bold words!)
  const knownHeadersPattern = new RegExp(
    `([^\\n])\\s*(\\n?\\*\\*(?:${headerWordsEn}|${headerWordsAm})[:፡]?\\*\\*)`,
    'gmi'
  );
  text = text.replace(knownHeadersPattern, '$1\n\n$2\n');

  // 3. Merge single bold initial letters with their word title e.g. "**F**ace Drooping (F):" -> "**Face Drooping (F):**"
  text = text.replace(/\*\*([A-Za-z])\*\*([A-Za-z]+(?:\s+[A-Za-z]+|\s*\([A-Za-z0-9]+\))?[:፡]?)/g, '**$1$2**');

  // 4. Strip any rogue triple or quadruple asterisks (e.g. '****' -> '')
  text = text.replace(/\*{3,}/g, '');

  // 5. Safely auto-balance any line with an odd number of ** (never append if already even!)
  const preLines = text.split('\n');
  text = preLines
    .map((line) => {
      const starMatches = line.match(/\*\*/g);
      if (starMatches && starMatches.length % 2 === 1) {
        return line.trimEnd() + '**';
      }
      return line;
    })
    .join('\n');

  // 6. Temporarily protect valid bold blocks **...** so internal letters/asterisks are never corrupted
  const boldTokens: string[] = [];
  text = text.replace(/\*\*[^*]+\*\*/g, (match) => {
    boldTokens.push(match);
    return `___BOLD_${boldTokens.length - 1}___`;
  });

  // 5. In the remaining non-bold text:
  // Convert punctuation followed by bullet: '፡•' or ':•'
  text = text.replace(/([:፡።])\s*[*•-]\s*/g, '$1\n• ');
  // Amharic-only run-on asterisks: 'ትኩሳት*ብርድ' (never run on English words!)
  text = text.replace(/([\u1200-\u137F])\s*\*\s*([\u1200-\u137F])/g, '$1\n• $2');
  // Normalize whitespace around bullets: ' * ' or ' • '
  text = text.replace(/\s+[*•-]\s+/g, '\n• ');
  // Standardize start-of-line bullets: '* ' or '- ' -> '• '
  text = text.replace(/(^|\n)\s*[-*]\s+/g, '$1• ');

  // 6. Restore protected bold blocks intact
  text = text.replace(/___BOLD_(\d+)___/g, (_, idx) => boldTokens[Number(idx)] || '');

  // 7. Strip solitary rogue asterisks (do not touch **bold**)
  text = text.replace(/(^|[^\*])\*(?!\*)/g, '$1');

  // 8. Completely remove solitary bullet dots on their own line (e.g. "\n•\n" or "\n•  \n")
  text = text.replace(/(?:^|\n)\s*[•*-]\s*(?=\n|$)/g, '\n');

  // 9. Normalize duplicate or premature partial lines (e.g. "ime to" when followed by "ime to call emergency")
  const lines = text.split('\n');
  const deduplicatedLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const cur = lines[i].trim();
    const next = lines[i + 1]?.trim() || '';
    // If current line is an incomplete prefix of the next line, omit the premature fragment
    if (cur && next && next.startsWith(cur) && cur.length >= 4 && cur.length < next.length) {
      continue;
    }
    // If current line is exact duplicate of previous line
    if (cur && deduplicatedLines.length > 0 && deduplicatedLines[deduplicatedLines.length - 1].trim() === cur) {
      continue;
    }
    deduplicatedLines.push(lines[i]);
  }
  text = deduplicatedLines.join('\n');

  // 10. Normalize excess newlines (max 2 consecutive)
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

/**
 * Cleans AI speech responses for VoiceStage live captions by removing markdown artifacts
 * while keeping clean bullet points and section line breaks.
 */
export function cleanVoiceSubtitle(raw: string): string {
  if (!raw) return '';
  let text = normalizeMarkdownText(raw);

  // Strip markdown header syntax: ### Heading -> Heading
  text = text.replace(/^#+\s*/gm, '');

  // Strip bold/italic markdown stars: **word** -> word, *word* -> word
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/\*{1,3}/g, '');

  return text.trim();
}

/**
 * Normalizes speech recognition acoustic artifacts and foreign misrecognitions into English/Amharic.
 * - Strips acoustic descriptive tags: <noise>, [noise], <laughter>, <music>, (cough), etc.
 * - Fixes phonetic misrecognitions of "Hey, can you hear me?" ("hey in healing", "can you healing", Dutch "kijk een huis", Sinhala).
 * - Fixes navigation mishearings ("open about which" -> "Open the about page").
 * - Normalizes medical query misrecognitions ("common coal" -> "common cold", "simtoms" -> "symptoms").
 */
export function cleanSpokenTranscript(raw: string): string {
  if (!raw) return '';
  let text = devanagariToEnglish(raw).trim();

  // 1. Strip all non-speech acoustic event tags:
  // e.g. <noise>, <laughter>, <music>, <sigh>, <cough>, <throat-clearing>, <snicker>, <groan>, <applause>, <whisper>, <inaudible>, <unintelligible>
  text = text.replace(/<[^>]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^>]*?>/gi, ' ');
  text = text.replace(/\[[^\]]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^\]]*?\]/gi, ' ');
  text = text.replace(/\([^)]*?(?:noise|sound|music|laughter|chuckle|gasp|sigh|cough|throat|applause|cheering|whisper|inaudible|unintelligible|breath)[^)]*?\)/gi, ' ');
  // Strip any remaining standalone angle-bracket or bracket tags like <noise> or <sound>
  text = text.replace(/<[a-zA-Z0-9_\s-]+>/g, ' ');
  // Strip words "less than ... greater than noise" or "noise" acoustic descriptions if literalized
  text = text.replace(/\b(?:less\s+than\s+)?noise(?:\s+greater\s+than)?\b/gi, ' ');

  // 2. Clean up phonetic misrecognitions of "Hey, can you hear me?" / hearing checks:
  // Patterns like "hey in healing", "in healing", "can you healing", "can you hearing", "hey in hearing", "are you hearing", "kijk een huis", "kun je me horen"
  const hearingCheckRegex = /\b(?:hey\s*,?\s*)?(?:in\s+healing|in\s+hearing|can\s+you\s+(?:hear|hearing|healing)|are\s+you\s+(?:hear|hearing|healing)|you\s+hear\s+me|you\s+hearing\s+me|hear\s+me\s+now|can\s+you\s+hear)\b/i;
  const dutchHearingRegex = /\b(?:hey\s*,?\s*)?(?:kijk\s+een\s+huis|kijk\s+huis|hoor\s+je\s+m[ie]j?|kun\s+je\s+me\s+horen|kan\s+je\s+me\s+horen|hallo\s+hoor\s+je|versta\s+je\s+me)\b/i;

  if (hearingCheckRegex.test(text) || dutchHearingRegex.test(text)) {
    // If the remaining words are short or mostly filler/acoustic artifacts (e.g. "have like in middle to less than and greater than noise than hey in healing")
    const coreWords = text.replace(/\b(hey|have|like|in|middle|to|than|noise|healing|hearing|can|you|hear|me|now|the|a|so|well|good|yes)\b/gi, '').trim();
    if (coreWords.length <= 15) {
      return 'Hey, can you hear me?';
    }
    text = text.replace(hearingCheckRegex, 'can you hear me');
    text = text.replace(dutchHearingRegex, 'can you hear me');
  }

  // 3. Detect Sinhala / Japanese acoustic misrecognitions of "can you hear me"
  if (/[\u0D80-\u0DFF]/.test(text) || /[\u3040-\u30FF]/.test(text) || /[\u4E00-\u9FFF]/.test(text)) {
    if (
      text.includes('ඒ') ||
      text.includes('ෆිልም') ||
      text.includes('あと') ||
      text.length <= 40
    ) {
      return 'Hey, can you hear me?';
    }
    text = text.replace(FOREIGN_SCRIPTS_REGEX, '').trim();
    if (!text || text.length < 3) {
      return 'Hey, can you hear me?';
    }
  }

  // 4. Strip any other non-Latin, non-Ethiopic script characters (Arabic, Thai, Cyrillic, etc.)
  if (FOREIGN_SCRIPTS_REGEX.test(text)) {
    text = text.replace(FOREIGN_SCRIPTS_REGEX, '').trim();
    if (!text || text.length < 3) {
      return 'Hey, can you hear me?';
    }
  }

  // 5. Clean up spoken navigation commands:
  // "open about which" -> "Open the about page"
  text = text.replace(/\bopen\s+(?:the\s+)?about(?:\s+us)?\s+(?:which|each|teach|beach|reach|bridge|page)?\b/gi, 'Open the about page');
  text = text.replace(/\bgo\s+to\s+(?:the\s+)?about(?:\s+us)?(?:\s+(?:which|each|teach|beach|page))?\b/gi, 'Go to the about page');
  text = text.replace(/\bopen\s+about\s*$/gi, 'Open the about page');

  // Contact page
  text = text.replace(/\bopen\s+(?:the\s+)?contact(?:\s+us)?\s+(?:which|each|teach|beach|page)?\b/gi, 'Open the contact page');
  text = text.replace(/\bgo\s+to\s+(?:the\s+)?contact(?:\s+us)?(?:\s+(?:which|each|teach|beach|page))?\b/gi, 'Go to the contact page');

  // Emergency page
  text = text.replace(/\bopen\s+(?:the\s+)?emergency\s+(?:which|each|teach|beach|page)?\b/gi, 'Open the emergency page');
  text = text.replace(/\bgo\s+to\s+(?:the\s+)?emergency(?:\s+(?:which|each|teach|beach|page))?\b/gi, 'Go to the emergency page');

  // Disease library page
  text = text.replace(/\bopen\s+(?:the\s+)?disease(?:s)?(?:\s+library)?\s+(?:which|each|teach|beach|page)?\b/gi, 'Open the disease library page');
  text = text.replace(/\bgo\s+to\s+(?:the\s+)?disease(?:s)?(?:\s+library)?(?:\s+(?:which|each|teach|beach|page))?\b/gi, 'Go to the disease library page');

  // First Aid page
  text = text.replace(/\bopen\s+(?:the\s+)?first\s*aid\s+(?:which|each|teach|beach|page)?\b/gi, 'Open the first aid page');
  text = text.replace(/\bgo\s+to\s+(?:the\s+)?first\s*aid(?:\s+(?:which|each|teach|beach|page))?\b/gi, 'Go to the first aid page');

  // Health Tips page
  text = text.replace(/\bopen\s+(?:the\s+)?health\s*tips?\s+(?:which|each|teach|beach|page)?\b/gi, 'Open the health tips page');
  text = text.replace(/\bgo\s+to\s+(?:the\s+)?health\s*tips?(?:\s+(?:which|each|teach|beach|page))?\b/gi, 'Go to the health tips page');

  // 6. Medical terminology & phonetic corrections
  text = text.replace(/\b(simstorms?|simtoms?|symptomps?|symptomes?)\b/gi, 'symptoms');
  text = text.replace(/\b(common\s+call|common\s+coal|come\s+on\s+cold|common\s+gold)\b/gi, 'common cold');
  text = text.replace(/\b(diabities|diabetis|diabetees)\b/gi, 'diabetes');
  text = text.replace(/\b(diaria|diarhea|diarea)\b/gi, 'diarrhea');
  text = text.replace(/\b(symptoms|causes|treatment|care)\s+of\s+the\s+area\b/gi, '$1 of malaria');

  // 7. Collapse extra whitespace and trim
  return text.replace(/\s{2,}/g, ' ').trim();
}

/**
 * Strips accidental bilingual slash pairs (e.g. "English text / የአማርኛ ጽሑፍ")
 * while strictly preserving all internal slashes and content in the selected language.
 */
export function cleanBilingualOutput(raw: string, isUserAmharic = false): string {
  if (!raw) return '';
  let text = raw.trim();

  // Strip foreign scripts that should never appear in output
  if (/[\u0D80-\u0DFF]/.test(text) || /[\u3040-\u30FF]/.test(text) || /[\u4E00-\u9FFF]/.test(text)) {
    text = text.replace(/[\u0D80-\u0DFF\u3040-\u30FF\u4E00-\u9FFF]/g, '').trim();
  }

  // Strip any accidental prompt injection artifacts or token markers like "CTR 46 > CTR 46"
  text = text.replace(/^CTR\s*\d+\s*>\s*CTR\s*\d+[:.]?\s*/gi, '').trim();
  text = text.replace(/CTR\s*\d+\s*>\s*CTR\s*\d+/gi, '').trim();
  text = text.replace(/\[(?:CRITICAL\s+)?MANDATORY\s+INSTRUCTION:[^\]]*\]\s*/gi, '').trim();

  // Handle explicit [ENGLISH] / [AMHARIC] tags
  const hasEnglishTag = /\[ENGLISH\]/i.test(text);
  const hasAmharicTag = /\[(?:AMHARIC|አማርኛ)\]/i.test(text);

  if (hasEnglishTag || hasAmharicTag) {
    if (!isUserAmharic) {
      // English mode: discard everything from [AMHARIC] onwards
      if (hasAmharicTag) {
        text = text.split(/\[(?:AMHARIC|አማርኛ)\]/i)[0].trim();
      }
      text = text.replace(/^\[ENGLISH\]\s*(?:[A-Za-z\s]+[:፡])?\s*/i, '').trim();
    } else {
      // Amharic mode: keep only the Amharic portion
      if (hasAmharicTag) {
        const parts = text.split(/\[(?:AMHARIC|አማርኛ)\]/i);
        text = parts[parts.length - 1].trim();
      }
      text = text.replace(/^\[(?:AMHARIC|አማርኛ)\]\s*(?:[\u1200-\u137F\s]+[:፡])?\s*/i, '').trim();
    }
  }

  // Check if text has both significant Latin and Ethiopic characters
  const hasLatin = /[a-zA-Z]{3,}/.test(text);
  const hasEthiopic = /[\u1200-\u137F]{3,}/.test(text);

  if (hasLatin && hasEthiopic) {
    if (text.includes(' / ') || text.includes(' | ') || text.includes('\n/\n')) {
      // Case 1: English first, Amharic second
      const matchEnAm = text.match(/^([\s\S]*?[a-zA-Z]{2,}[\s\S]*?)\s*(?:\n\s*)?[\/|]\s*(?:\n\s*)?([\s\S]*?[\u1200-\u137F]{2,}[\s\S]*)$/);
      if (matchEnAm) {
        return (isUserAmharic ? matchEnAm[2] : matchEnAm[1]).trim();
      }

      // Case 2: Amharic first, English second
      const matchAmEn = text.match(/^([\s\S]*?[\u1200-\u137F]{2,}[\s\S]*?)\s*(?:\n\s*)?[\/|]\s*(?:\n\s*)?([\s\S]*?[a-zA-Z]{2,}[\s\S]*)$/);
      if (matchAmEn) {
        return (isUserAmharic ? matchAmEn[1] : matchAmEn[2]).trim();
      }
    }

    // Split paragraphs by \n\n to isolate language blocks cleanly without truncating within sections
    const paras = text.split(/\n{2,}/);
    if (paras.length > 1) {
      if (!isUserAmharic) {
        // Collect English paragraphs until an explicitly Amharic-dominant block starts
        const enParas: string[] = [];
        for (const p of paras) {
          const latinCount = (p.match(/[a-zA-Z]/g) || []).length;
          const ethCount = (p.match(/[\u1200-\u137F]/g) || []).length;
          if (ethCount > 8 && ethCount > latinCount) {
            break;
          }
          enParas.push(p);
        }
        if (enParas.length > 0) {
          text = enParas.join('\n\n').trim();
        }
      } else {
        // Collect Amharic paragraphs
        const amParas: string[] = [];
        let amharicStarted = false;
        for (const p of paras) {
          const latinCount = (p.match(/[a-zA-Z]/g) || []).length;
          const ethCount = (p.match(/[\u1200-\u137F]/g) || []).length;
          if (ethCount > 5 && ethCount >= latinCount) {
            amharicStarted = true;
          }
          if (amharicStarted) {
            amParas.push(p);
          }
        }
        if (amParas.length > 0) {
          text = amParas.join('\n\n').trim();
        }
      }
    }
  }

  // Hearing check language alignment fallback
  if (!isUserAmharic) {
    if (
      /(?:አዎ[፣,]?\s*)?(?:በደንብ\s+)?እሰማ(?:ዎታለሁ|ሃለሁ|ሻለሁ|ሃለው|ሻለው|ዋለሁ|ታለሁ)/.test(text) ||
      /(?:በምን\s+(?:የጤና\s+ጉዳይ\s+)?ልርዳ(?:ዎ|ህ|ሽ))/i.test(text)
    ) {
      return "I can hear you clearly. How can I help you with your health today?";
    }
  } else {
    if (/I\s+(?:can\s+)?hear\s+you\s+(?:clearly|loud|well|fine)/i.test(text) || /how\s+can\s+I\s+help\s+you/i.test(text)) {
      return "አዎ፣ በደንብ እሰማዎታለሁ! ዛሬ በምን የጤና ጉዳይ ልርዳዎ?";
    }
  }

  // 100% Language Isolation Guarantee:
  // If user communicated in Amharic but model returned pure English without any Ethiopic Fidel
  if (isUserAmharic && !/[\u1200-\u137F]/.test(text)) {
    for (const item of AMHARIC_CLINICAL_MAP) {
      if (item.regex.test(text)) {
        return item.response;
      }
    }
    return (
      "የጤና መረጃ እና ምክር፡\n" +
      "ለተጠቀሰው የጤና ሁኔታ ተገቢውን የህክምና መመሪያ ለማግኘት እባክዎ ጥያቄዎን በዝርዝር ያብራሩ። " +
      "ድንገተኛ አደጋ ወይም ከባድ ህመም ካጋጠመዎት ወዲያውኑ ወደ 907 ነፃ የአምቡላንስ የስልክ መስመር ይደውሉ ወይም በአቅራቢያዎ ወደሚገኝ የጤና ተቋም በአስቸኳይ ይሂዱ።"
    );
  }

  // If user communicated in English but model returned pure Amharic without any Latin letters
  if (!isUserAmharic && !/[a-zA-Z]/.test(text) && /[\u1200-\u137F]/.test(text)) {
    for (const item of ENGLISH_CLINICAL_MAP) {
      if (item.regex.test(text)) {
        return item.response;
      }
    }
    return (
      "Health Information & Clinical Guidance:\n" +
      "Please describe your symptoms in detail so I can provide accurate guidance. " +
      "For severe emergencies, please call the Ethiopian Ambulance Dispatch at 907 immediately or visit your nearest hospital."
    );
  }

  // Completion Guarantee: Ensure clinical responses never stop at symptoms
  if (isUserAmharic) {
    if (text.includes('ወባ') || /malaria/i.test(text)) {
      if (!text.includes('መንስኤዎች') && !text.includes('ህክምና')) {
        text += '\n\n**መንስኤዎች፡**\n• በፕላስሞዲየም ጥገኛ ተውሳክ የተያዘች አኖፊለስ የወባ ትንኝ ንክሻ\n• ጥገኛ ተውሳኩ ወደ ጉበት በመሄድ በደም ውስጥ ሲባዛ\n• ለትንኝ መራቢያ የሚሆኑ አቆራጭ ውሃዎች መኖር\n\n**ህክምና እና እንክብካቤ፡**\n• ትኩሳት ሲሰማ ወዲያውኑ የደም ምርመራ (RDT) ማድረግ\n• የታዘዘውን የወባ መድኃኒት (ACT) ሳያቋርጡ በሙሉ መውሰድ\n• በየቀኑ በአልጋ አጎበር ውስጥ መተኛት\n• በቤት ዙሪያ ያሉ አቆራጭ ውሃዎችን ማድረቅ እና ማጽዳት';
      }
    } else if (text.includes('ተቅማጥ') || /diarrh/i.test(text)) {
      if (!text.includes('መንስኤዎች') && !text.includes('ህክምና')) {
        text += '\n\n**መንስኤዎች፡**\n• በተበከለ ምግብ ወይም ውሃ የሚተላለፉ ባክቴሪያዎች እና ቫይረሶች\n• ያልተጠበቀ የግልና የአካባቢ ንጽህና\n• የምግብ አለመስማማት ወይም የመድኃኒት የጎንዮሽ ጉዳት\n\n**ህክምና እና እንክብካቤ፡**\n• የኦ.አር.ኤስ (ORS) ፈሳሽ በብዛት በመጠጣት የውሃ እጥረትን መከላከል\n• ዚንክ ታብሌቶችን እንደ መመሪያው መውሰድ\n• ንጹህ የተቀቀለ ውሃ መጠጣት እና እጅን በሳሙና መታጠብ\n• የደም መቀላቀል ወይም ከፍተኛ ድካም ከታየ በአስቸኳይ ወደ ጤና ተቋም መሄድ';
      }
    } else if (text.includes('ስኳር') || /diabet/i.test(text)) {
      if (!text.includes('መንስኤዎች') && !text.includes('ህክምና')) {
        text += '\n\n**መንስኤዎች፡**\n• ዓይነት 1፡ የሰውነት መከላከያ ሥርዓት ኢንሱሊን አምራች ሴሎችን ሲያጠቃ\n• ዓይነት 2፡ የዘር ውርስ፣ የክብደት መጨመር እና የአካል ብቃት እንቅስቃሴ ማነስ\n• ጤናማ ያልሆነ አመጋገብ እና ጣፋጭ ምግቦች መብዛት\n\n**ህክምና እና እንክብካቤ፡**\n• የደም ስኳር መጠንን በየጊዜው መለካት እና መከታተል\n• የተመጣጠነ ምግብ መመገብ እና ጣፋጭ ምግቦችን መቀነስ\n• መደበኛ የአካል ብቃት እንቅስቃሴ (በቀን 30 ደቂቃ) ማድረግ\n• የታዘዙ መድኃኒቶችን ወይም ኢንሱሊን በሰዓቱ መውሰድ';
      }
    }
  } else {
    if (/diarrh/i.test(text) && !text.includes('Causes:') && !text.includes('Home Care')) {
      text += '\n\n**Causes:**\n• Viral infections (such as Norovirus or Rotavirus) or bacterial contamination\n• Contaminated water or improper food hygiene\n• Food intolerances or medication side effects\n\n**Home Care & Treatment:**\n• Drink Oral Rehydration Salts (ORS) solution regularly to prevent dehydration\n• Eat gentle bland foods (rice, bananas, broth, toast)\n• Avoid dairy, caffeine, and high-fat greasy foods\n• Seek urgent clinic care if stools contain blood or high fever occurs';
    } else if (/malaria/i.test(text) && !text.includes('Causes:') && !text.includes('Home Care')) {
      text += '\n\n**Causes:**\n• Bites of infected female Anopheles mosquitoes carrying Plasmodium parasites\n• Parasites multiplying in liver and red blood cells\n• Stagnant water bodies near homes where mosquitoes breed\n\n**Home Care & Treatment:**\n• Seek rapid diagnostic clinic blood testing (RDT) immediately upon fever\n• Complete the entire prescribed course of Artemisinin-based Combination Therapy (ACT)\n• Sleep under insecticide-treated bed nets every night\n• Drain standing water around living quarters';
    } else if (/diabet/i.test(text) && !text.includes('Causes:') && !text.includes('Home Care')) {
      text += '\n\n**Causes:**\n• Type 1 autoimmune response destroying insulin-producing pancreatic cells\n• Type 2 insulin resistance linked to genetics, overweight, and physical inactivity\n• Diet high in refined sugars and processed foods\n\n**Home Care & Treatment:**\n• Regular daily blood glucose monitoring\n• Balanced diet rich in vegetables, lean protein, and fiber with low sugar\n• Regular physical exercise (at least 30 minutes daily)\n• Consistent adherence to prescribed medications or insulin therapy';
    }
  }

  return text;
}

const AMHARIC_CLINICAL_MAP: { regex: RegExp; response: string }[] = [
  {
    regex: /\b(malaria|mosquito|plasmodium|chills|bed\s*net)\b/i,
    response:
      "ወባ፡\nወባ በወባ ትንኝ ንክሻ ወደ ሰው ደም በሚተላለፉ ጥገኛ ተውሳኮች የሚመጣ አደገኛ ግን በህክምና የሚድን በሽታ ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• በየተወሰነ ሰዓት የሚመጣ ከፍተኛ ትኩሳት\n" +
      "• ብርድ ብርድ ማለት እና ከባድ መንቀጥቀጥ\n" +
      "• ትኩሳቱ ሲለቅ ከፍተኛ ላብ ማላብ\n" +
      "• ኃይለኛ ራስ ምታት እና የጡንቻዎች ድካም\n" +
      "• ማቅለሽለሽ እና የምግብ ፍላጎት መቀነስ\n\n" +
      "**መንስኤዎች፡**\n" +
      "• በፕላስሞዲየም ጥገኛ ተውሳክ የተያዘች አኖፊለስ የወባ ትንኝ ንክሻ\n" +
      "• ጥገኛ ተውሳኩ ወደ ጉበት በመሄድ በደም ውስጥ ሲባዛ\n" +
      "• ለትንኝ መራቢያ የሚሆኑ አቆራጭ ውሃዎች መኖር\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• ትኩሳት ሲሰማ ወዲያውኑ የደም ምርመራ (RDT) ማድረግ\n" +
      "• የታዘዘውን የወባ መድኃኒት (ACT) ሳያቋርጡ በሙሉ መውሰድ\n" +
      "• በየቀኑ በአልጋ አጎበር ውስጥ መተኛት\n" +
      "• በቤት ዙሪያ ያሉ አቆራጭ ውሃዎችን ማድረቅ እና ማጽዳት",
  },
  {
    regex: /\b(diabet|insulin|blood\s*sugar|glucose|pancreas)\b/i,
    response:
      "ስኳር በሽታ፡\nስኳር በሽታ ሰውነታችን ኢንሱሊንን በአግባቡ ባለመጠቀሙ በደም ውስጥ ያለው የስኳር መጠን ከፍ እንዲል የሚያደርግ ሥር የሰደደ የጤና እክል ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• በተደጋጋሚ በተለይም በሌሊት መሽናት\n" +
      "• ከፍተኛ የውሃ ጥም እና የአፍ መድረቅ\n" +
      "• ያልታወቀ የክብደት መቀነስ እና ድካም\n" +
      "• የእይታ መደብዘዝ ወይም ብዥታ\n" +
      "• ቁስሎች ቶሎ ያለመዳን\n\n" +
      "**መንስኤዎች፡**\n" +
      "• ዓይነት 1፡ የሰውነት መከላከያ ሥርዓት ኢንሱሊን አምራች ሴሎችን ሲያጠቃ\n" +
      "• ዓይነት 2፡ የዘር ውርስ፣ የክብደት መጨመር እና የአካል ብቃት እንቅስቃሴ ማነስ\n" +
      "• ጤናማ ያልሆነ አመጋገብ እና ጣፋጭ ምግቦች መብዛት\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• የደም ስኳር መጠንን በየጊዜው መለካት እና መከታተል\n" +
      "• የተመጣጠነ ምግብ መመገብ እና ጣፋጭ ምግቦችን መቀነስ\n" +
      "• መደበኛ የአካል ብቃት እንቅስቃሴ (በቀን 30 ደቂቃ) ማድረግ\n" +
      "• የታዘዙ መድኃኒቶችን ወይም ኢንሱሊን በሰዓቱ መውሰድ",
  },
  {
    regex: /\b(diarrh|loose\s*stool|dehydration|ors|watery\s*stool)\b/i,
    response:
      "ተቅማጥ፡\nተቅማጥ በቀን ውስጥ ከሶስት ጊዜ በላይ የላላ ወይም ፈሳሽ ሰገራ መውጣት ሲሆን ሰውነትን ለከፍተኛ የውሃና ጨው እጥረት ያጋልጣል።\n\n" +
      "**ምልክቶች፡**\n" +
      "• በተደጋጋሚ የሚወጣ ፈሳሽ ሰገራ\n" +
      "• የሆድ መኮማተር እና ቁርጠት\n" +
      "• ማቅለሽለሽ፣ ማስመለስ እና መጠነኛ ትኩሳት\n" +
      "• የሰውነት ድርቀት (የአፍ መድረቅ፣ ጥም፣ ሽንት መቀነስ)\n\n" +
      "**መንስኤዎች፡**\n" +
      "• በባክቴሪያ ወይም ቫይረስ የተበከለ ምግብ ወይም ውሃ መውሰድ\n" +
      "• ያልተጠበቀ የግልና የአካባቢ ንጽህና\n" +
      "• የምግብ አለመስማማት ወይም የመድኃኒት የጎንዮሽ ጉዳት\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• የኦ.አር.ኤስ (ORS) ፈሳሽ በብዛት በመጠጣት የውሃ እጥረትን መከላከል\n" +
      "• ዚንክ ታብሌቶችን እንደ መመሪያው መውሰድ\n" +
      "• ንጹህ የተቀቀለ ውሃ መጠጣት እና እጅን በሳሙና መታጠብ\n" +
      "• የደም መቀላቀል ወይም ከፍተኛ ድካም ከታየ በአስቸኳይ ወደ ጤና ተቋም መሄድ",
  },
  {
    regex: /\b(stroke|fast|facial\s*droop|arm\s*weakness|slurred\s*speech)\b/i,
    response:
      "ስትሮክ (FAST የአደጋ ጊዜ ምልክቶች)፡\nስትሮክ ወደ አንጎል የሚሄደው የደም ዝውውር ሲቋረጥ ወይም የደም ቧንቧ ሲፈነዳ የሚከሰት አደገኛ ድንገተኛ የጤና እክል ነው።\n\n" +
      "**የስትሮክ ምልክቶች (FAST)፡**\n" +
      "• ፊት (Face)፡ የፊት መጣመም ወይም በአንድ በኩል መንሸዋረር\n" +
      "• እጅ (Arms)፡ አንዱን እጅ ወደ ላይ ማንሳት አለመቻል ወይም መደንዘዝ\n" +
      "• ንግግር (Speech)፡ ንግግር መኮላተፍ ወይም ለመናገር መቸገር\n" +
      "• ጊዜ (Time)፡ እነዚህ ምልክቶች ከታዩ ወዲያውኑ ወደ 907 ይደውሉ!\n\n" +
      "**ህክምና እና የመጀመሪያ እርዳታ፡**\n" +
      "• ወዲያውኑ ወደ 907 የአምቡላንስ የስልክ መስመር መደወል\n" +
      "• በሽተኛውን ምቹ በሆነ ጎን አስኝቶ ማቆየት\n" +
      "• ምንም አይነት ምግብ፣ ውሃ ወይም መድኃኒት በአፍ አለመስጠት\n" +
      "• ጊዜ ወሳኝ በመሆኑ በደቂቃዎች ውስጥ ወደ ሆስፒታል ማድረስ",
  },
  {
    regex: /\b(cold|cough|runny\s*nose|sneez|sore\s*throat|rhinovirus)\b/i,
    response:
      "ጉንፋን፡\nጉንፋን በአፍንጫ እና በጉሮሮ ላይ የሚከሰት ቀላል ግን በቀላሉ የሚተላለፍ የመተንፈሻ አካላት የቫይረስ ኢንፌክሽን ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• የአፍንጫ መዘጋት ወይም ንፍጥ መፍሰስ\n" +
      "• የጉሮሮ ህመም እና ሳል\n" +
      "• ማስነጠስ እና የዓይን ማልቀስ\n" +
      "• መጠነኛ ትኩሳት እና የሰውነት ድካም\n\n" +
      "**መንስኤዎች፡**\n" +
      "• በሪኖቫይረስ እና ሌሎች የመተንፈሻ አካላት ቫይረሶች\n" +
      "• በበሽታው ከተያዘ ሰው በሚወጡ የአየር ጠብታዎች\n" +
      "• የተበከሉ እቃዎችን ነክቶ አፍ ወይም አፍንጫን መንካት\n\n" +
      "**ህክምና እና የቤት ውስጥ እንክብካቤ፡**\n" +
      "• በቂ እረፍት ማድረግ እና እንቅልፍ መተኛት\n" +
      "• ሞቅ ያሉ ፈሳሾችን (ሻይ ከዝንጅብልና ማር ጋር፣ ሾርባ) መጠጣት\n" +
      "• በጨው ውሃ ጉሮሮን መጉመጥመጥ\n" +
      "• እጅን በሳሙና እና ውሃ አዘውትሮ መታጠብ",
  },
  {
    regex: /\b(hypertens|blood\s*pressure|high\s*bp)\b/i,
    response:
      "የደም ግፊት፡\nየደም ግፊት ደም በደም ቧንቧዎች ግድግዳ ላይ የሚያሳድረው ጫና ከተገቢው በላይ ከፍ ሲል የሚከሰት 'ድምጸ-ከል ገዳይ' ተብሎ የሚጠራ በሽታ ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• ብዙ ጊዜ ግልጽ ምልክት አያሳይም\n" +
      "• ከፍተኛ ሲሆን የጭንቅላት ጀርባ ህመም\n" +
      "• የልብ ምት መፍጠን እና የትንፋሽ ማጠር\n" +
      "• ማዞር እና የእይታ መደብዘዝ\n\n" +
      "**መንስኤዎች፡**\n" +
      "• የጨው አጠቃቀም መብዛት እና ቅባት የበዛባቸው ምግቦች\n" +
      "• የአካል ብቃት እንቅስቃሴ ማነስ እና የሰውነት ክብደት መጨመር\n" +
      "• ጭንቀት፣ ሲጋራ ማጨስ እና አልኮል መጠጣት\n" +
      "• የዘር ውርስ እና የዕድሜ መግፋት\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• የምግብ ጨውን በከፍተኛ ሁኔታ መቀነስ\n" +
      "• አትክልትና ፍራፍሬዎችን አዘውትሮ መመገብ\n" +
      "• በየቀኑ 30 ደቂቃ የእግር ጉዞ ማድረግ\n" +
      "• የደም ግፊትን በየጊዜው መለካት እና የታዘዙ መድኃኒቶችን መውሰድ",
  },
  {
    regex: /\b(founder|founders|creator|yonatan|nahom|dagmawi|ayub)\b/i,
    response:
      "የጤናዬ (Tenaye) መስራቾች፡\nየጤናዬ መድረክ መስራቾች እና ዋና የቡድን አባላት ዮናታን ሙሉከን (Yonatan Muluken)፣ ናሆም ጥበቡ (Nahom Tibebu)፣ ዳግማዊ ሽጉጤ (Dagmawi Shigute) እና አዩብ ኢብራሂም (Ayub Ebrahim) ናቸው።",
  },
  {
    regex: /\b(emergency|ambulance|hotline|907)\b/i,
    response:
      "የኢትዮጵያ ድንገተኛ አደጋ አምቡላንስ ጥሪ፡\nለማንኛውም አስቸኳይ ድንገተኛ የጤና እክል ወይም አደጋ ወዲያውኑ ወደ 907 ነፃ የአምቡላንስ መስመር ይደውሉ!",
  },
];

const ENGLISH_CLINICAL_MAP: { regex: RegExp; response: string }[] = [
  {
    regex: /ወባ|ትንኝ|ፕላስሞዲየም/,
    response:
      "Malaria:\nMalaria is a life-threatening disease caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes.\n\n" +
      "**Symptoms:**\n" +
      "• High recurring fever and severe shaking chills\n" +
      "• Profuse sweating as the fever subsides\n" +
      "• Severe headache and muscle fatigue\n" +
      "• Nausea, vomiting, and loss of appetite\n\n" +
      "**Causes:**\n" +
      "• Bite of an infected female Anopheles mosquito\n" +
      "• Parasites traveling to the liver and multiplying in red blood cells\n" +
      "• Presence of stagnant water near residential areas\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Seek prompt blood testing (RDT/microscopy) at any clinic\n" +
      "• Complete the full course of prescribed antimalarial medications (ACT)\n" +
      "• Sleep under insecticide-treated bed nets every night\n" +
      "• Drain stagnant water bodies around the house",
  },
  {
    regex: /ስኳር|ኢንሱሊን|ግሉኮስ/,
    response:
      "Diabetes:\nDiabetes is a chronic metabolic condition where the body cannot properly produce or use insulin, leading to elevated blood glucose levels.\n\n" +
      "**Symptoms:**\n" +
      "• Frequent urination, especially at night\n" +
      "• Extreme thirst and dry mouth\n" +
      "• Unexplained weight loss and fatigue\n" +
      "• Blurred vision\n" +
      "• Slow-healing sores or cuts\n\n" +
      "**Causes:**\n" +
      "• Type 1: Autoimmune destruction of insulin-producing cells\n" +
      "• Type 2: Genetics, overweight, and physical inactivity\n" +
      "• Diet high in refined sugars and processed foods\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Monitor blood glucose regularly\n" +
      "• Follow a balanced, high-fiber, low-sugar diet\n" +
      "• Engage in regular physical activity (30 minutes daily)\n" +
      "• Take prescribed oral medications or insulin consistently",
  },
  {
    regex: /ተቅማጥ|ኦ\.?አር\.?ኤስ|ፈሳሽ\s*ሰገራ/,
    response:
      "Diarrhea:\nDiarrhea is characterized by passing loose or watery stools three or more times a day, which can cause severe dehydration and electrolyte loss.\n\n" +
      "**Symptoms:**\n" +
      "• Frequent loose or watery bowel movements\n" +
      "• Abdominal cramps and pain\n" +
      "• Nausea, vomiting, and low-grade fever\n" +
      "• Signs of dehydration (dry mouth, extreme thirst, reduced urination)\n\n" +
      "**Causes:**\n" +
      "• Viral or bacterial infections from contaminated food or water\n" +
      "• Poor personal and environmental sanitation\n" +
      "• Food intolerances or medication side effects\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Drink Oral Rehydration Salts (ORS) frequently in small sips\n" +
      "• Take Zinc supplements as advised by healthcare guidelines\n" +
      "• Drink clean, boiled water and practice frequent handwashing\n" +
      "• Seek immediate medical attention if stools contain blood or high fever occurs",
  },
  {
    regex: /ስትሮክ|FAST|የፊት\s*መጣመም/,
    response:
      "Stroke (FAST Emergency Signs):\nA stroke occurs when blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen.\n\n" +
      "**Emergency Warning Signs (FAST):**\n" +
      "• Face Drooping (F): One side of the face droops or is numb\n" +
      "• Arm Weakness (A): One arm drifts downward or is weak\n" +
      "• Speech Difficulty (S): Slurred speech or inability to speak\n" +
      "• Time to Call 907 (T): Call 907 emergency ambulance immediately!\n\n" +
      "**Immediate Actions:**\n" +
      "• Call 907 Ethiopian ambulance dispatch immediately\n" +
      "• Keep the person lying comfortably on their side with airway clear\n" +
      "• Do NOT give any food, water, or aspirin\n" +
      "• Note the exact time symptoms started",
  },
  {
    regex: /ጉንፋን|ሳል|ንፍጥ/,
    response:
      "Common Cold:\nThe common cold is a viral infection of the upper respiratory tract primarily affecting the nose and throat.\n\n" +
      "**Symptoms:**\n" +
      "• Runny or stuffy nose\n" +
      "• Sore throat and cough\n" +
      "• Sneezing and watery eyes\n" +
      "• Mild body aches and low fever\n\n" +
      "**Causes:**\n" +
      "• Rhinoviruses and other respiratory viruses\n" +
      "• Airborne droplets from coughs or sneezes\n" +
      "• Touching contaminated surfaces and then touching face\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Get plenty of rest and sleep\n" +
      "• Stay well-hydrated with warm fluids (herbal teas with ginger and honey)\n" +
      "• Salt water gargle for sore throat relief\n" +
      "• Practice frequent handwashing with soap",
  },
  {
    regex: /መስራች|ዮናታን|ናሆም|ዳግማዊ|አዩብ/,
    response:
      "The founders and core team behind Tenaye are Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, and Ayub Ebrahim.",
  },
  {
    regex: /907|አምቡላንስ|ድንገተኛ/,
    response:
      "Emergency Ambulance Hotline:\nFor any medical emergencies, call the Ethiopian National Ambulance Dispatch at 907 immediately.",
  },
];

/**
 * Speaks text aloud using Web Speech API (Synthesis) with natural pacing.
 * Supports both English and Amharic, returning a cleanup cancel function.
 */
export function speakText(text: string, isAmharic = false, onEnd?: () => void): () => void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return () => {};
  }
  try {
    window.speechSynthesis.cancel();
    const cleanToSpeak = cleanVoiceSubtitle(text)
      .replace(/[•\-\*#]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    if (!cleanToSpeak) {
      if (onEnd) onEnd();
      return () => {};
    }

    const utterance = new SpeechSynthesisUtterance(cleanToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = isAmharic ? 'am-ET' : 'en-US';

    const voices = window.speechSynthesis.getVoices();
    if (isAmharic) {
      const amVoice = voices.find(v => v.lang.startsWith('am') || v.lang.includes('ETH'));
      if (amVoice) utterance.voice = amVoice;
    } else {
      const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.default));
      if (enVoice) utterance.voice = enVoice;
    }

    utterance.onend = () => { if (onEnd) onEnd(); };
    utterance.onerror = () => { if (onEnd) onEnd(); };

    window.speechSynthesis.speak(utterance);
    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    };
  } catch {
    if (onEnd) onEnd();
    return () => {};
  }
}


