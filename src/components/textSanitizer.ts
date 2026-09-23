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

    // Handle distinct bilingual blocks separated by double newlines without slashes
    if (!isUserAmharic) {
      const enFirstMatch = text.match(/^([\s\S]*?[a-zA-Z]{4,}[\s\S]*?)\n{2,}(?:\*{0,2}[\u1200-\u137F]{2,}[\s\S]*)$/);
      if (enFirstMatch && enFirstMatch[1].length > 40) {
        return enFirstMatch[1].trim();
      }
      const amFirstMatch = text.match(/^[\s\S]*?[\u1200-\u137F]{3,}[\s\S]*?\n{2,}([\s\S]*?[a-zA-Z]{4,}[\s\S]*)$/);
      if (amFirstMatch && amFirstMatch[1].length > 40) {
        return amFirstMatch[1].trim();
      }
    } else {
      const enFirstMatch = text.match(/^[\s\S]*?[a-zA-Z]{4,}[\s\S]*?\n{2,}((?:\*{0,2}[\u1200-\u137F]{2,}[\s\S]*))$/);
      if (enFirstMatch && enFirstMatch[1].length > 40) {
        return enFirstMatch[1].trim();
      }
      const amFirstMatch = text.match(/^([\s\S]*?[\u1200-\u137F]{3,}[\s\S]*?)\n{2,}(?:[a-zA-Z]{4,}[\s\S]*)$/);
      if (amFirstMatch && amFirstMatch[1].length > 40) {
        return amFirstMatch[1].trim();
      }
    }
  }

  // Hearing check language alignment fallback
  if (!isUserAmharic) {
    // User spoke English but model responded with Amharic hearing check
    if (
      /(?:አዎ[፣,]?\s*)?(?:በደንብ\s+)?እሰማ(?:ዎታለሁ|ሃለሁ|ሻለሁ|ሃለው|ሻለው|ዋለሁ|ታለሁ)/.test(text) ||
      /(?:በምን\s+(?:የጤና\s+ጉዳይ\s+)?ልርዳ(?:ዎ|ህ|ሽ))/i.test(text)
    ) {
      return "I can hear you clearly. How can I help you with your health today?";
    }
  } else {
    // User spoke Amharic but model responded with English hearing check
    if (/I\s+(?:can\s+)?hear\s+you\s+(?:clearly|loud|well|fine)/i.test(text) || /how\s+can\s+I\s+help\s+you/i.test(text)) {
      return "አዎ፣ በደንብ እሰማዎታለሁ! ዛሬ በምን የጤና ጉዳይ ልርዳዎ?";
    }
  }

  return text;
}


