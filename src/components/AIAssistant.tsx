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

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  IconBot, IconX, IconSend, IconTrash, IconMaximize, IconMinimize,
  IconMic, IconMicOff, IconArrowLeft, IconVolume2, IconVolumeX,
} from './Icons';
import { VoiceStage } from './VoiceStage';
import { ai, resolveSpokenPage, setCurrentLanguage, getCurrentLanguage, getSharedAudioContext, resetVoxideSession } from './Assistant';
import { devanagariToEnglish, normalizeMarkdownText, cleanSpokenTranscript, cleanBilingualOutput, cleanVoiceSubtitle, speakText } from './textSanitizer';

/* ── Types ── */
interface Msg {
  id: number;
  role: 'ai' | 'user';
  text: string;
  time: string;
}

type ChatVoiceState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'error';

/* ── Helpers ── */
const now12 = () => {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const p = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m} ${p}`;
};
let idCounter = 0;
const ts = () => Date.now() * 1000 + (++idCounter % 1000);

/* ── Initial Welcome Messages ── */
const WELCOME_EN: Msg = {
  id: 0,
  role: 'ai',
  time: now12(),
  text: "Hello! I'm Tenaye Assistance (ጤናዬ). I can help with:\n\n• Evidence-based disease information & research\n• Clinical symptom analysis & differential diagnosis\n• Step-by-step first aid procedures & emergency triage (907)\n• Prevention, healthy living & wellness tips\n\nType your question below, or tap the microphone to speak naturally in English or አማርኛ!",
};

const WELCOME_AM: Msg = {
  id: 0,
  role: 'ai',
  time: now12(),
  text: "ሰላም! የጤናዬ ረዳት (Tenaye Assistance) ነኝ። በሚከተሉት የጤና ጉዳዮች ልረዳዎ እችላለሁ፡\n\n• በማስረጃ የተደገፈ የበሽታዎች መረጃና ህክምና\n• የበሽታ ምልክቶች ትንተና እና ምክር\n• የድንገተኛ አደጋ 907 እና ደረጃ በደረጃ የመጀመሪያ እርዳታ\n• ጤናማ የአኗኗር ዘይቤ እና የመከላከያ መንገዶች\n\nጥያቄዎን ከታች ይጻፉ ወይም ማይክሮፎኑን ተጭነው በአማርኛ ወይም በእንግሊዝኛ ያናግሩኝ!",
};

const WELCOME = WELCOME_EN;

// Clean shortcut questions with NO emojis (English & Amharic)
const QUICK_QUESTIONS_EN = [
  { label: 'Diabetes symptoms',       q: 'Tell me about diabetes symptoms, causes and treatments' },
  { label: 'Diarrhea symptoms',       q: 'What are the symptoms, causes and home care for diarrhea?' },
  { label: 'Warning signs of stroke', q: 'What are the emergency warning signs of a stroke?' },
  { label: 'Headache and fever',      q: 'I feel headache and a fever — what could it be?' },
  { label: 'COVID-19 symptoms',       q: 'What are the symptoms, causes and prevention for COVID-19?' },
  { label: 'Malaria prevention',      q: 'How can I prevent malaria in Ethiopia?' },
  { label: 'Who made this website?',  q: 'Who is the founder and team behind Tenaye?' },
];

const QUICK_QUESTIONS_AM = [
  { label: 'የስኳር በሽታ ምልክቶች',       q: 'ስለ ስኳር በሽታ ምልክቶች፣ መንስኤዎች እና ህክምና ንገረኝ' },
  { label: 'የተቅማጥ ህክምና',             q: 'የተቅማጥ ምልክቶች፣ መንስኤዎች እና የቤት ውስጥ ህክምና ምንድን ናቸው?' },
  { label: 'የስትሮክ ምልክቶች',           q: 'አስቸኳይ የስትሮክ ምልክቶች እና የመጀመሪያ እርዳታ ምንድን ናቸው?' },
  { label: 'ራስ ምታት እና ትኩሳት',        q: 'ራስ ምታት እና ትኩሳት ይሰማኛል፤ ምን ሊሆን ይችላል?' },
  { label: 'የወባ መከላከያ',              q: 'በኢትዮጵያ ወባን እንዴት መከላከል ይቻላል?' },
  { label: 'የጤናዬ መስራቾች ማን ናቸው?',   q: 'የጤናዬ (Tenaye) መስራቾች እና ቡድን ማን ናቸው?' },
];

const QUICK_QUESTIONS = QUICK_QUESTIONS_EN;

/* ── Confirm-clear dialog ── */
function ClearConfirmDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-[inherit] animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-3">
        <IconBot size={22} className="text-amber-500" />
      </div>
      <h3 className="font-display font-bold text-gray-900 text-base mb-1 text-center">Clear Chat History?</h3>
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
  );
}

/* ── AI typing indicator ── */
function TypingIndicator() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0c6e73] to-[#119197] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
        <IconBot size={13} />
      </div>
      <div className="flex flex-col gap-1 max-w-[85%]">
        <span className="text-[10px] font-bold text-[#119197]">Tenaye Assistance</span>
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-xs w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-[#119197] animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#119197] animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-[#119197] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

/**
 * Merges streaming AI text fragments safely with strict deduplication.
 * Eliminates infinite repetition by checking line-by-line containment and
 * removing blind continuation concatenation.
 */
function mergeAiStreamingText(existing: string, incoming: string): string {
  if (!existing) return incoming;
  if (!incoming) return existing;
  const ex = existing.trim();
  const inc = incoming.trim();
  if (ex === inc) return ex;

  // 1. Prefix checks (cumulative streaming)
  if (inc.startsWith(ex)) return inc;
  if (ex.startsWith(inc)) return ex;

  // 2. Substring inclusion checks
  if (inc.includes(ex)) return inc;
  if (ex.includes(inc)) return ex;

  // 3. Suffix-prefix overlap (stitch streaming chunks together)
  const maxOverlap = Math.min(ex.length, inc.length, 120);
  for (let len = maxOverlap; len >= 6; len--) {
    const exSuffix = ex.slice(-len);
    if (inc.startsWith(exSuffix)) {
      return ex + inc.slice(len);
    }
  }

  // 4. Line-by-line deduplication:
  // If all non-empty lines in incoming already exist in existing, do NOT append!
  const incLines = inc.split('\n').map(l => l.trim()).filter(l => l.length > 2);
  const exLines = ex.split('\n').map(l => l.trim()).filter(l => l.length > 2);
  const existingContainsAll = incLines.length > 0 && incLines.every(l => ex.includes(l));
  if (existingContainsAll) {
    return ex;
  }

  // 5. If incoming has new non-duplicate lines, append only the genuinely new lines
  const genuinelyNewLines = incLines.filter(l => !ex.includes(l));
  if (genuinelyNewLines.length > 0 && incLines.length > 0 && genuinelyNewLines.length === incLines.length) {
    const joiner = ex.endsWith('\n') ? '' : '\n';
    return ex + joiner + genuinelyNewLines.join('\n');
  }

  // 6. Default to the longer/more complete text
  return inc.length >= ex.length ? inc : ex;
}

/* ── Clean Rich Text Formatter ── */
function FormattedMessage({ text }: { text: string }) {
  if (!text) return null;

  const normalized = normalizeMarkdownText(text);
  const lines = normalized.split('\n');

  // Known clinical topic headers
  const isSectionHeader = (line: string): boolean => {
    const s = line.trim();
    if (!s || s.length < 3 || s.length > 80) return false;
    // Sentences ending in ? or ! or numbered lists are never section headers
    if (/[?!]$/.test(s) || /^\d+[.)፡]/.test(s)) return false;

    // Acronym letters like **F**, **A**, **S**, **T** are bold prefixes, NOT section headers
    if (/^\*+[A-Z]\*+[:.]?$/.test(s)) return false;

    const stripped = s.replace(/^#+\s*/, '').replace(/^\*+|\*+$/g, '').trim();

    // Known medical section keywords (English & Amharic)
    const headerRegex = /^(?:(?:ዋና\s+ዋና\s+)?(ምልክቶች|መንስኤዎች|ህክምና\s+እና\s+እንክብካቤ|መፍትሔ\s+እና\s+እንክብካቤ|ህክምና\s+እና\s+የቤት\s+ውስጥ(?:\s+እንክብካቤ)?|የቤት\s+ውስጥ\s+እንክብካቤ|ህክምና|መከላከያ|ምርመራ|አጠቃላይ\s+መግለጫ|የመጀመሪያ\s+እርዳታ|የአደጋ\s+ጊዜ\s+ጥሪ|የስትሮክ\s+ምልክቶች)(?:\s*\(.*?\))?(?:\s+የሚከተሉትን?\s+(?:ያካትታሉ|ናቸው))?|(?:Main\s+)?(Symptoms|Causes|Home\s+Care\s*&\s*Treatment|Home\s+Care|Treatment|Prevention|Care|Diagnosis|Overview|Risk\s+Factors|Warning\s+Signs|Emergency\s+Warning\s+Signs|FAST\s+Warning\s+Signs|Emergency\s+Warning\s+Signs\s+\(FAST\)|Immediate\s+Actions|First\s+Aid|Emergency\s+Hotline))(?:\s*\(.*?\))?[:፡]?$/i;

    if (headerRegex.test(stripped)) {
      return true;
    }

    // Markdown headers ###
    if (/^#{1,3}\s+/.test(s)) return true;

    // Explicit markdown bold header with colon: **Header:** (length <= 60)
    if (s.startsWith('**') && s.endsWith('**') && /[:፡]\*\*$/.test(s) && stripped.length <= 60) {
      return true;
    }

    return false;
  };

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Filter out solitary bullets on empty lines (e.g. "•" or "-" or "*")
        if (/^[•*-]\s*$/.test(trimmed)) return null;

        // Recognized bold section headers (e.g. "**Symptoms:**", "**Causes:**", "**ምልክቶች፡**")
        if (isSectionHeader(trimmed)) {
          const cleanHeader = trimmed
            .replace(/^#+\s*/, '')
            .replace(/^\*\*/, '')
            .replace(/\*\*$/, '')
            .trim();
          return (
            <p key={idx} className="font-bold text-[#0c6e73] text-[13px] pt-2.5 pb-0.5 tracking-wide">
              {cleanHeader}
            </p>
          );
        }

        // Bullet point (•, -, or *)
        if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.replace(/^[•*-]\s*/, '').trim();
          if (!bulletContent) return null;

          // If bullet line is accidentally a header: e.g. "• Causes:"
          if (isSectionHeader(bulletContent)) {
            const cleanHeader = bulletContent
              .replace(/^\*\*/, '')
              .replace(/\*\*$/, '')
              .trim();
            return (
              <p key={idx} className="font-bold text-[#0c6e73] text-[13px] pt-2.5 pb-0.5 tracking-wide">
                {cleanHeader}
              </p>
            );
          }

          return (
            <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-gray-700 pl-1 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#119197] shrink-0 mt-1.5" />
              <span className="flex-1">{parseBold(bulletContent)}</span>
            </div>
          );
        }

        // Numbered list item (e.g. "1. ", "2. ")
        const matchNum = trimmed.match(/^(\d+)[.)፡]\s+(.*)$/);
        if (matchNum) {
          return (
            <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-gray-700 pl-1 py-0.5">
              <span className="font-bold text-[#0c6e73] text-[11px] shrink-0 mt-0.5">{matchNum[1]}.</span>
              <span className="flex-1">{parseBold(matchNum[2])}</span>
            </div>
          );
        }

        // Standard text paragraph (e.g. disease 1-2 sentence definition)
        return (
          <p key={idx} className="text-xs leading-relaxed text-gray-800">
            {parseBold(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function parseBold(str: string) {
  if (!str) return null;
  // Strip any rogue triple/quadruple asterisks or solitary asterisks while preserving **bold**
  let cleaned = str.replace(/\*{3,}/g, '').replace(/(^|[^\*])\*(?!\*)/g, '$1');
  // Auto-balance unclosed **
  const starCount = (cleaned.match(/\*\*/g) || []).length;
  if (starCount % 2 !== 0) {
    cleaned += '**';
  }
  const parts = cleaned.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/* ══════════════════════════════════════════
   MAIN AIAssistant COMPONENT
══════════════════════════════════════════ */
export function AIAssistant() {
  const [open, setOpen]                 = useState(false);
  const [fullscreen, setFullscreen]     = useState(false);
  const [input, setInput]               = useState('');
  const [currentLang, setCurrentLang]   = useState<'en' | 'am'>(() => getCurrentLanguage());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [msgs, setMsgs]                 = useState<Msg[]>([WELCOME_EN]);
  const [confirmClear, setConfirmClear] = useState(false);

  // Sync refs for event listeners
  const currentLangRef = useRef(currentLang);
  currentLangRef.current = currentLang;
  const soundEnabledRef = useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  // Language enforcement & message tracking refs
  const userTurnLanguageRef = useRef<'en' | 'am'>(currentLang);
  userTurnLanguageRef.current = currentLang;
  const activeAiMessageIdRef = useRef<number | null>(null);
  const activeUserMessageIdRef = useRef<number | null>(null);

  // Voice Interaction UI state
  const [showVoiceUI, setShowVoiceUI]   = useState(false);
  const [voiceState, setVoiceState]     = useState<ChatVoiceState>('idle');
  const [userSpeech, setUserSpeech]     = useState('');
  const [aiSpeech, setAiSpeech]         = useState('');
  const [audioLevel, setAudioLevel]     = useState(0);
  const [isTyping, setIsTyping]         = useState(false);
  const clearedTurnEpochRef = useRef<number>(0);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Turn isolation and anti-stale cache refs
  const isTypingRef = useRef(false);
  const activeTurnIdRef = useRef<number>(0);
  const pendingAiBubbleIdRef = useRef<number | null>(null);
  const lastProcessedAiTextRef = useRef<string>('');
  const speakingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const voiceSessionActiveRef = useRef(false);
  const voiceSessionStartIdxRef = useRef<number>(0);
  const expectedAiMessageIndexRef = useRef<number>(-1);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const turnStartTimeRef = useRef<number>(0);

  // TTS "listen" button state
  const [speakingMsgId, setSpeakingMsgId] = useState<number | null>(null);
  const cancelSpeechRef = useRef<(() => void) | null>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [msgs, isTyping, showVoiceUI]);

  // Global open trigger
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-ai-assistant', handleOpen);
    return () => window.removeEventListener('open-ai-assistant', handleOpen);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open && !showVoiceUI) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, fullscreen, showVoiceUI]);

  // Sync soundEnabled with native Voxide audio playback
  useEffect(() => {
    (window as any).__tenayeSoundMuted = !soundEnabled;
    if (!soundEnabled) {
      try {
        (ai as any)?._voiceStopPlayback?.();
      } catch {}
    }
  }, [soundEnabled]);

  // Audio level polling for ripple animation & realistic speech state hold
  useEffect(() => {
    let active = true;
    const pollLevels = () => {
      if (!active) return;
      if (showVoiceUI) {
        try {
          const inLevel = ai.getInputLevel ? ai.getInputLevel() : 0;
          const outLevel = ai.getOutputLevel ? ai.getOutputLevel() : 0;
          setAudioLevel(Math.max(inLevel || 0, outLevel || 0));

          // When AI output audio is actively playing, guarantee state is 'speaking'
          const outCtx = (ai as any)._voiceAudioOut;
          const nextPlay = (ai as any)._voiceNextPlay || 0;
          const activeSources = (ai as any)._voiceActiveSources || [];
          const isPlaybackFinished = activeSources.length === 0 && (!outCtx || outCtx.currentTime >= nextPlay - 0.05);

          if (outLevel > 0.03 && (window as any).__tenayeVoiceActive) {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current);
              speakingTimerRef.current = null;
            }
            setVoiceState(prev => (prev !== 'speaking' ? 'speaking' : prev));
          } else if (isPlaybackFinished && outLevel <= 0.015) {
            if (voiceState === 'speaking') {
              if (speakingTimerRef.current) {
                clearTimeout(speakingTimerRef.current);
                speakingTimerRef.current = null;
              }
              (window as any).__tenayeIsAiTurnActive = false;
              (ai as any)._setVoiceStatus?.('listening');
              setVoiceState('listening');
            }
          }
        } catch {
          // ignore
        }
      } else {
        setAudioLevel(0);
      }
      animFrameRef.current = requestAnimationFrame(pollLevels);
    };

    animFrameRef.current = requestAnimationFrame(pollLevels);
    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [showVoiceUI, voiceState]);

  // Unified helper to stream and record AI responses cleanly across snapshot, message, and transcript events
  const handleIncomingAiText = useCallback((cleanText: string) => {
    if (!cleanText || !cleanText.trim()) return;

    // Strict guard: if turn was initiated before the last clear, or clear was requested, or no active turn, completely DROP incoming text!
    if ((window as any).__tenayeIsCleared || activeTurnIdRef.current === 0 || turnStartTimeRef.current < clearedTurnEpochRef.current) {
      return;
    }

    const clean = cleanText.trim();

    // Always dismiss typing indicator watchdog and state as text is actively received
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    setIsTyping(false);
    isTypingRef.current = false;

    // Determine strict language: English to English, Amharic to Amharic
    let isAmharic = userTurnLanguageRef.current === 'am' || currentLangRef.current === 'am';
    if ((window as any).__tenayeVoiceActive) {
      const spoken = (userSpeech || '').trim();
      if (spoken) {
        if (/[\u1200-\u137F]/.test(spoken) || /(ወባ|ስኳር|ተቅማጥ|ስትሮክ|ራስ\s*ምታት|ህመም|ሆስፒታል|ዶክተር|መድኃኒት|ምልክቶች|ምን|እንዴት|ሰላም|ጤና|weba|malaria|selam|tenaye)/i.test(spoken)) {
          isAmharic = true;
          userTurnLanguageRef.current = 'am';
        } else if (/[a-zA-Z]/.test(spoken)) {
          isAmharic = false;
          userTurnLanguageRef.current = 'en';
        }
      }
    }

    const singleLang = cleanBilingualOutput(clean, isAmharic).trim();
    if (!singleLang) return;

    // In Voice Mode, update live AI transcript subtitle card with clean subtitle
    if ((window as any).__tenayeVoiceActive) {
      setAiSpeech(cleanVoiceSubtitle(singleLang));
    }

    const formatted = normalizeMarkdownText(singleLang);
    lastProcessedAiTextRef.current = formatted;

    setMsgs(prev => {
      // Re-verify guard inside functional state update
      if ((window as any).__tenayeIsCleared || activeTurnIdRef.current === 0 || turnStartTimeRef.current < clearedTurnEpochRef.current) {
        return prev;
      }

      // Authoritative single-bubble update: find existing AI bubble for this turn by ID
      const targetAiId = activeAiMessageIdRef.current;
      if (targetAiId !== null && prev.some(m => m.id === targetAiId)) {
        return prev.map(m => m.id === targetAiId ? { ...m, text: formatted } : m);
      }

      // First chunk of AI response for this turn: append one authoritative bubble
      const newAiId = ts();
      activeAiMessageIdRef.current = newAiId;
      pendingAiBubbleIdRef.current = newAiId;
      return [...prev, { id: newAiId, role: 'ai', text: formatted, time: now12() }];
    });
  }, [userSpeech]);

  // Sync with Voxide engine status & authoritative messages
  useEffect(() => {
    // 1. Authoritative status updates
    const unsubStatus = ai.on('status', (st: string) => {
      const s = (st || 'idle').toLowerCase();

      // Guard typing indicator on terminal statuses
      if (s === 'error') {
        setIsTyping(false);
        isTypingRef.current = false;
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
      } else if (s === 'idle') {
        if (pendingAiBubbleIdRef.current !== null || !isTypingRef.current) {
          setIsTyping(false);
          isTypingRef.current = false;
        }
      }

      if (!(window as any).__tenayeVoiceActive) {
        setVoiceState('idle');
        return;
      }

      if (s === 'connecting') {
        if (speakingTimerRef.current) {
          clearTimeout(speakingTimerRef.current);
          speakingTimerRef.current = null;
        }
        setVoiceState('connecting');
      } else if (s === 'thinking' || s === 'processing') {
        if (speakingTimerRef.current) {
          clearTimeout(speakingTimerRef.current);
          speakingTimerRef.current = null;
        }
        setVoiceState('thinking');
      } else if (s === 'speaking') {
        if (speakingTimerRef.current) {
          clearTimeout(speakingTimerRef.current);
          speakingTimerRef.current = null;
        }
        setVoiceState('speaking');
      } else if (s === 'listening') {
        if (!speakingTimerRef.current) {
          setVoiceState('listening');
        }
      } else if (s === 'error') {
        setVoiceState('error');
      } else {
        setVoiceState('idle');
      }
    });

    // 2. Real-time transcript updates
    const unsubTranscript = ai.on('transcript', (payload: { role?: string; text?: string } | string) => {
      if ((window as any).__tenayeIsCleared || activeTurnIdRef.current === 0) return;
      const text = typeof payload === 'string' ? payload : payload?.text;
      const role = typeof payload === 'object' ? payload?.role : undefined;
      if (!text || !text.trim()) return;
      const clean = text.trim();

      if (role === 'ai') {
        handleIncomingAiText(clean);
      } else if (role === 'user') {
        if ((window as any).__tenayeVoiceActive && voiceSessionActiveRef.current) {
          const cleanUser = cleanSpokenTranscript(clean);
          setUserSpeech(cleanUser);

          // Real-time language detection from spoken transcript
          const hasEthiopic = /[\u1200-\u137F]/.test(cleanUser);
          const hasLatin = /[a-zA-Z]/.test(cleanUser);
          const isAmharicSpoken = hasEthiopic || /(ወባ|ስኳር|ተቅማጥ|ስትሮክ|ራስ\s*ምታት|ህመም|ሆስፒታል|ዶክተር|መድኃኒት|ምልክቶች|ምን|እንዴት|ሰላም|ጤና|weba|malaria|selam|tenaye)/i.test(cleanUser);

          if (isAmharicSpoken) {
            userTurnLanguageRef.current = 'am';
            if (currentLangRef.current !== 'am') {
              setCurrentLang('am');
              setCurrentLanguage('am');
            }
          } else if (hasLatin && !hasEthiopic) {
            userTurnLanguageRef.current = 'en';
            if (currentLangRef.current !== 'en') {
              setCurrentLang('en');
              setCurrentLanguage('en');
            }
          }
        }
      } else {
        handleIncomingAiText(clean);
      }
    });

    // 3. Authoritative message completion listener
    const unsubMessage = ai.on('message', ({ role, text }: { role: string; text: string }) => {
      if ((window as any).__tenayeIsCleared || activeTurnIdRef.current === 0) return;
      if (!text || !text.trim()) return;
      const clean = text.trim();

      if (role === 'ai') {
        handleIncomingAiText(clean);
      } else if (role === 'user') {
        // In text mode, user message was already added by handleSend. Ignore to prevent duplicate bubbles!
        if (!(window as any).__tenayeVoiceActive || !voiceSessionActiveRef.current) {
          return;
        }

        const cleanUser = cleanSpokenTranscript(clean);
        // Acoustic echo protection: reject user transcript if it matches the AI's recent utterance
        const recentAi = (lastProcessedAiTextRef.current || '').trim();
        if (recentAi && (recentAi === cleanUser || recentAi.startsWith(cleanUser) || cleanUser.startsWith(recentAi))) {
          console.log('[Tenaye Anti-Echo] Suppressing acoustic echo of AI voice:', cleanUser);
          return;
        }

        const isUserAm = /[\u1200-\u137F]/.test(cleanUser) || /(ወባ|ስኳር|ተቅማጥ|ስትሮክ|ራስ\s*ምታት|ህመም|ሆስፒታል|ዶክተር|መድኃኒት|ምልክቶች|ምን|እንዴት|ሰላም|ጤና|weba|malaria|selam|tenaye)/i.test(cleanUser);
        const hasLatin = /[a-zA-Z]/.test(cleanUser);
        if (isUserAm) {
          userTurnLanguageRef.current = 'am';
          if (currentLangRef.current !== 'am') {
            setCurrentLang('am');
            setCurrentLanguage('am');
          }
        } else if (hasLatin && !isUserAm) {
          userTurnLanguageRef.current = 'en';
          if (currentLangRef.current !== 'en') {
            setCurrentLang('en');
            setCurrentLanguage('en');
          }
        }

        setUserSpeech(cleanUser);
        setAiSpeech('');
        (window as any).__tenayeIsAiTurnActive = true;
        setVoiceState('thinking'); // Transition to thinking when user finishes speaking

        const userTurnId = ts();
        activeTurnIdRef.current = userTurnId;
        activeAiMessageIdRef.current = null; // Reset for this incoming AI response
        pendingAiBubbleIdRef.current = null;
        lastProcessedAiTextRef.current = '';
        turnStartTimeRef.current = Date.now();
        isTypingRef.current = true;
        setIsTyping(true);

        setMsgs(prev => {
          const last = prev[prev.length - 1];
          // Never duplicate consecutive user messages with identical text
          if (last && last.text === cleanUser) return prev;
          // Never add if the previous message was AI with identical or matching text
          if (last && last.role === 'ai' && (last.text === cleanUser || last.text.startsWith(cleanUser) || cleanUser.startsWith(last.text))) {
            return prev;
          }
          return [...prev, { id: userTurnId, role: 'user', text: cleanUser, time: now12() }];
        });
      }
    });

    // 4. Real-time snapshot updates with strict session & turn isolation
    const unsubSubscribe = ai.subscribe(() => {
      const snap = ai.getSnapshot();
      if (!snap) return;

      if (snap.status) {
        const s = snap.status.toLowerCase();
        if (!(window as any).__tenayeVoiceActive) {
          setVoiceState('idle');
        } else {
          if (s === 'connecting') {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current);
              speakingTimerRef.current = null;
            }
            setVoiceState('connecting');
          } else if (s === 'thinking' || s === 'processing') {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current);
              speakingTimerRef.current = null;
            }
            setVoiceState('thinking');
          } else if (s === 'speaking') {
            if (speakingTimerRef.current) {
              clearTimeout(speakingTimerRef.current);
              speakingTimerRef.current = null;
            }
            setVoiceState('speaking');
          } else if (s === 'listening') {
            if (!speakingTimerRef.current) {
              setVoiceState('listening');
            }
          } else if (s === 'error') {
            setVoiceState('error');
          } else {
            setVoiceState('idle');
          }
        }
      }
    });

    return () => {
      if (typeof unsubStatus === 'function') unsubStatus();
      if (typeof unsubTranscript === 'function') unsubTranscript();
      if (typeof unsubMessage === 'function') unsubMessage();
      if (typeof unsubSubscribe === 'function') unsubSubscribe();
    };
  }, [handleIncomingAiText]);

  // Fast, bulletproof WebSocket connection helper
  const ensureConnected = useCallback(async (): Promise<boolean> => {
    try {
      await ai.init();
      const ws = (ai as any)._voiceWs;
      if (ws && ws.readyState === WebSocket.OPEN) {
        return true;
      }
      if (ws && ws.readyState === WebSocket.CONNECTING) {
        const waitStart = Date.now();
        while (Date.now() - waitStart < 3000) {
          const cur = (ai as any)._voiceWs;
          if (cur && cur.readyState === WebSocket.OPEN) return true;
          if (!cur || cur.readyState === WebSocket.CLOSED) break;
          await new Promise(r => setTimeout(r, 40));
        }
      }
      if ((ai as any)._voiceWs?.readyState === WebSocket.OPEN) {
        return true;
      }
      if ((ai as any)._voiceWs && (ai as any)._voiceWs.readyState !== WebSocket.OPEN) {
        try {
          (ai as any)._voiceWs.close();
        } catch {}
        (ai as any)._voiceWs = null;
      }
      await ai.connect();
      // Fast polling to ensure WebSocket is OPEN
      const start = Date.now();
      while (Date.now() - start < 3500) {
        const cur = (ai as any)._voiceWs;
        if (cur && cur.readyState === WebSocket.OPEN) {
          return true;
        }
        await new Promise(r => setTimeout(r, 35));
      }
      return (ai as any)._voiceWs?.readyState === WebSocket.OPEN;
    } catch (err) {
      console.warn('[Tenaye Assistance] ensureConnected error:', err);
      return false;
    }
  }, []);

  // Pre-warm as soon as the assistant widget is opened or hovered
  useEffect(() => {
    if (open) {
      ensureConnected();
    }
  }, [open, ensureConnected]);

  // Keep WebSocket warm via heartbeat while assistant is open to prevent idle drops
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => {
      const ws = (ai as any)._voiceWs;
      if (ws && ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify({ type: 'ping' }));
        } catch {}
      } else if (!ws || ws.readyState === WebSocket.CLOSED) {
        ensureConnected();
      }
    }, 20000);
    return () => clearInterval(interval);
  }, [open, ensureConnected]);

  // Stop voice and return to chat view (keeps WebSocket warm for instant re-opening and fast text)
  const stopVoiceUI = useCallback(() => {
    (window as any).__tenayeVoiceActive = false;
    (window as any).__tenayeIsAiTurnActive = false;
    voiceSessionActiveRef.current = false;
    voiceSessionStartIdxRef.current = 999999;
    setUserSpeech('');
    setAiSpeech('');
    if (speakingTimerRef.current) {
      clearTimeout(speakingTimerRef.current);
      speakingTimerRef.current = null;
    }
    try {
      // Gracefully release mic hardware and playback without destroying the warm WebSocket
      const mic = (ai as any)._voiceMic;
      if (mic) {
        mic.getTracks().forEach((t: MediaStreamTrack) => t.stop());
        (ai as any)._voiceMic = null;
      }
      if ((ai as any)._voiceProcessor) {
        (ai as any)._voiceProcessor.disconnect();
        (ai as any)._voiceProcessor = null;
      }
      if ((ai as any)._voiceAudioIn) {
        (ai as any)._voiceAudioIn.close().catch(() => {});
        (ai as any)._voiceAudioIn = null;
      }
      (ai as any)._voiceStopPlayback?.(true);
      (ai as any)._setVoiceStatus?.('idle');
    } catch {
      try {
        ai.disconnect();
      } catch {}
    }
    setVoiceState('idle');
    setShowVoiceUI(false);
  }, []);

  // Open Interactive Voice UI and connect with zero latency
  const startVoiceUI = useCallback(async () => {
    (window as any).__tenayeVoiceActive = true;
    (window as any).__tenayeIsAiTurnActive = false;
    voiceSessionActiveRef.current = true;
    setShowVoiceUI(true);
    setVoiceState('connecting');
    setUserSpeech('');
    setAiSpeech('');

    // Pre-warm AudioContext on user interaction
    try {
      getSharedAudioContext();
    } catch {}

    // Interrupt previous playback or pending buffers
    try {
      (ai as any)._voiceStopPlayback?.(true);
      (ai as any)._voiceInterrupt?.();
      (ai as any)._voicePendingAiText = '';
      (ai as any)._voicePendingUserText = '';
    } catch {}

    try {
      await ensureConnected();

      if ((window as any).__tenayeVoiceActive) {
        setVoiceState('listening');
        (ai as any)._setVoiceStatus?.('listening');
        // Push state snapshot to warm websocket immediately
        try {
          const ws = (ai as any)._voiceWs;
          if (ws && ws.readyState === WebSocket.OPEN) {
            const currentState = (ai as any)._getCurrentStateSnapshot?.();
            if (currentState) {
              ws.send(JSON.stringify({ type: 'state', state: currentState }));
            }
          }
        } catch {}
        await (ai as any)._voiceStartMic?.();
      }
    } catch (err) {
      console.warn('[Tenaye Assistance] voice connect error:', err);
      setVoiceState('idle');
    }
  }, [ensureConnected]);

  // Send text message with instantaneous transmission over pre-warmed connection
  const handleSend = useCallback(async (textToSend: string) => {
    const t = cleanSpokenTranscript(textToSend).trim();
    if (!t) return;

    // Un-flag cleared status on new user request
    (window as any).__tenayeIsCleared = false;

    // Detect language:
    // If text has Ethiopic script, enforce Amharic
    // If text has Latin and NO Ethiopic, enforce English
    // Otherwise respect currentLang
    let isAm = currentLangRef.current === 'am';
    if (/[\u1200-\u137F]/.test(t) || /(ወባ|ስኳር|ተቅማጥ|ስትሮክ|ራስ\s*ምታት|ህመም|ሆስፒታል|ዶክተር|መድኃኒት|ምልክቶች|ምን|እንዴት|ሰላም|ጤና)/.test(t)) {
      isAm = true;
      userTurnLanguageRef.current = 'am';
      if (currentLangRef.current !== 'am') {
        setCurrentLang('am');
        setCurrentLanguage('am');
      }
    } else if (/[a-zA-Z]/.test(t) && !/[\u1200-\u137F]/.test(t)) {
      isAm = false;
      userTurnLanguageRef.current = 'en';
      if (currentLangRef.current !== 'en') {
        setCurrentLang('en');
        setCurrentLanguage('en');
      }
    } else {
      userTurnLanguageRef.current = isAm ? 'am' : 'en';
    }

    // In text mode, ensure voice mode is strictly false
    (window as any).__tenayeVoiceActive = false;
    if (showVoiceUI) {
      stopVoiceUI();
    }

    // Pre-warm and resume shared AudioContext on user action so browser enables voice reading
    try {
      const outCtx = getSharedAudioContext();
      if (outCtx && outCtx.state === 'suspended') {
        outCtx.resume().catch(() => {});
      }
    } catch {}

    // Check for explicit navigation command
    const targetPage = resolveSpokenPage(t);
    if (targetPage && (window as any).__tenayeNavigate) {
      (window as any).__tenayeNavigate(targetPage);
    }

    // 1. Interrupt previous playback and server turn immediately
    (window as any).__tenayeTurnGeneration = ((window as any).__tenayeTurnGeneration || 0) + 1;
    (window as any).__tenayeSuppressAudioUntil = 0;
    try {
      (ai as any)._voiceStopPlayback?.(true);
      (ai as any)._voiceInterrupt?.();
    } catch {}
    (window as any).__tenayeIsAiTurnActive = true;

    // 2. Wipe pending AI and User text buffers so old answers are never emitted
    try {
      (ai as any)._voicePendingAiText = '';
      (ai as any)._voicePendingUserText = '';
    } catch {}

    const turnId = ts();
    activeTurnIdRef.current = turnId;
    activeAiMessageIdRef.current = null; // Reset for this new turn!
    pendingAiBubbleIdRef.current = null;
    lastProcessedAiTextRef.current = '';
    turnStartTimeRef.current = Date.now();
    isTypingRef.current = true;
    setIsTyping(true);

    // Watchdog timer: never keep typing indicator stuck on network stalls
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        setIsTyping(false);
        isTypingRef.current = false;
      }
    }, 12000);

    // Append user message ONCE
    setMsgs(prev => [...prev, { id: turnId, role: 'user', text: t, time: now12() }]);
    setInput('');

    try {
      await ensureConnected();
      setCurrentLanguage(isAm ? 'am' : 'en');
      const ws = (ai as any)._voiceWs;
      if (ws && ws.readyState === WebSocket.OPEN) {
        const currentState = (ai as any)._getCurrentStateSnapshot?.();
        if (currentState) {
          ws.send(JSON.stringify({ type: 'state', state: currentState }));
        }
      }
      await ai.sendText(t);
    } catch (err) {
      console.warn('[Tenaye Assistance] sendText error:', err);
      setIsTyping(false);
      isTypingRef.current = false;
      activeTurnIdRef.current = 0;
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    }
  }, [showVoiceUI, stopVoiceUI, ensureConnected]);

  // Clear history
  const requestClear   = () => setConfirmClear(true);
  const confirmClearFn = () => {
    const clearedEpoch = Date.now();
    clearedTurnEpochRef.current = clearedEpoch;
    (window as any).__tenayeClearedGeneration = clearedEpoch;
    (window as any).__tenayeIsCleared = true;

    // 1. Reset root Voxide session (terminates WS, clears buffers, rotates anonymous visitor ID)
    resetVoxideSession();

    // 2. Cancel Web Speech API immediately and repeatedly
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        setTimeout(() => { try { window.speechSynthesis.cancel(); } catch {} }, 50);
        setTimeout(() => { try { window.speechSynthesis.cancel(); } catch {} }, 200);
      } catch {}
    }
    if (cancelSpeechRef.current) {
      try {
        cancelSpeechRef.current();
      } catch {}
      cancelSpeechRef.current = null;
    }
    setSpeakingMsgId(null);

    // 3. Clear messages and state
    setMsgs([currentLangRef.current === 'am' ? WELCOME_AM : WELCOME_EN]);
    setConfirmClear(false);
    setUserSpeech('');
    setAiSpeech('');
    activeTurnIdRef.current = 0;
    activeAiMessageIdRef.current = null;
    activeUserMessageIdRef.current = null;
    pendingAiBubbleIdRef.current = null;
    lastProcessedAiTextRef.current = '';
    expectedAiMessageIndexRef.current = -1;
    turnStartTimeRef.current = 0;
    voiceSessionStartIdxRef.current = 0;
    voiceSessionActiveRef.current = false;
    isTypingRef.current = false;
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    (window as any).__tenayeIsAiTurnActive = false;
    (window as any).__tenayeTurnGeneration = ((window as any).__tenayeTurnGeneration || 0) + 1;
    (window as any).__tenayeSuppressAudioUntil = 0;
  };
  const cancelClear    = () => setConfirmClear(false);
  const closeAll       = () => {
    setOpen(false);
    setFullscreen(false);
    setConfirmClear(false);
    if (voiceState !== 'idle' || showVoiceUI) {
      stopVoiceUI();
    }
  };

  // Toggle TTS read-aloud for a specific AI message bubble
  const toggleSpeakBubble = useCallback((text: string, msgId: number) => {
    // If already speaking this bubble → stop
    if (speakingMsgId === msgId) {
      if (cancelSpeechRef.current) {
        cancelSpeechRef.current();
        cancelSpeechRef.current = null;
      }
      setSpeakingMsgId(null);
      return;
    }
    // Cancel any previous speech first
    if (cancelSpeechRef.current) {
      cancelSpeechRef.current();
      cancelSpeechRef.current = null;
    }
    setSpeakingMsgId(msgId);
    const isAm = currentLangRef.current === 'am';
    const cancel = speakText(text, isAm, () => {
      setSpeakingMsgId(prev => (prev === msgId ? null : prev));
    });
    cancelSpeechRef.current = cancel;
  }, [speakingMsgId]);

  /* ══════════════════════════════════════════
     FLOATING ACTION BUTTON (FAB)
  ══════════════════════════════════════════ */
  if (!open) {
    return (
      <button
        onClick={() => {
          ensureConnected();
          setOpen(true);
        }}
        onMouseEnter={() => ensureConnected()}
        onTouchStart={() => ensureConnected()}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#119197] hover:bg-[#0c6e73] text-white shadow-2xl transition-all duration-200 hover:scale-105 pulse-teal flex items-center justify-center cursor-pointer group"
        aria-label="Open Tenaye Assistance"
      >
        <IconBot size={22} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
      </button>
    );
  }

  /* ══════════════════════════════════════════
     FULL-SCREEN WORKSPACE MODE
  ══════════════════════════════════════════ */
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col bg-white">
        {confirmClear && (
          <ClearConfirmDialog onConfirm={confirmClearFn} onCancel={cancelClear} />
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
              <span className="font-display font-bold text-gray-900 text-sm">Tenaye Assistance</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 uppercase">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    !showVoiceUI
                      ? 'bg-green-500'
                      : voiceState === 'connecting'
                      ? 'bg-amber-400 animate-ping'
                      : voiceState === 'listening'
                      ? 'bg-green-500 animate-pulse'
                      : voiceState === 'thinking'
                      ? 'bg-amber-500 animate-bounce'
                      : voiceState === 'speaking'
                      ? 'bg-teal-500 animate-ping'
                      : 'bg-green-500'
                  }`}
                />
                {!showVoiceUI
                  ? 'ONLINE'
                  : voiceState === 'connecting'
                  ? 'CONNECTING...'
                  : voiceState === 'listening'
                  ? 'LISTENING...'
                  : voiceState === 'thinking'
                  ? 'THINKING...'
                  : voiceState === 'speaking'
                  ? 'SPEAKING...'
                  : 'ONLINE'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => {
                  setSoundEnabled(prev => !prev);
                  if (soundEnabled && cancelSpeechRef.current) {
                    cancelSpeechRef.current();
                    setSpeakingMsgId(null);
                  }
                }}
                title={soundEnabled ? "Voice reading is ON (click to mute)" : "Voice reading is OFF (click to enable auto-reading)"}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'text-[#119197] bg-teal-50 border border-teal-200 font-semibold'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {soundEnabled ? <IconVolume2 size={16} /> : <IconVolumeX size={16} />}
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
              onStop={stopVoiceUI}
              onViewChat={stopVoiceUI}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
            <div className="max-w-3xl mx-auto space-y-4">
              {msgs.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0c6e73] to-[#119197] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <IconBot size={15} />
                    </div>
                  )}
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    {msg.role === 'ai' && (
                      <span className="text-[11px] font-bold text-[#119197]">Tenaye Assistance</span>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'ai'
                          ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-xs'
                          : 'bg-[#119197] text-white rounded-tr-sm shadow-xs'
                      }`}
                    >
                      {msg.role === 'ai' ? (
                        <FormattedMessage text={msg.text} />
                      ) : (
                        <p className="whitespace-pre-line text-sm">{msg.text}</p>
                      )}
                    </div>
                    <div className={`flex items-center gap-2 mt-0.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-[10px] text-gray-400">
                        {msg.time}
                      </span>
                      {msg.role === 'ai' && msg.id !== 0 && (
                        <button
                          type="button"
                          onClick={() => toggleSpeakBubble(msg.text, msg.id)}
                          title={speakingMsgId === msg.id ? "Stop voice reading" : "Read response aloud"}
                          className={`p-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 text-[10px] ${
                            speakingMsgId === msg.id
                              ? 'text-[#119197] bg-teal-50 font-semibold'
                              : 'text-gray-400 hover:text-[#119197] hover:bg-teal-50'
                          }`}
                        >
                          {speakingMsgId === msg.id ? <IconVolumeX size={13} /> : <IconVolume2 size={13} />}
                          <span>{speakingMsgId === msg.id ? 'Stop' : 'Listen'}</span>
                        </button>
                      )}
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
              {(currentLang === 'am' ? QUICK_QUESTIONS_AM : QUICK_QUESTIONS_EN).map(item => (
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
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && !isTyping) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder={currentLang === 'am' ? "ጥያቄዎን በአማርኛ ይጠይቁ ወይም ማይክሮፎኑን ይጫኑ..." : "Speak in English or አማርኛ, or ask questions…"}
                className="flex-1 text-[15px] text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={showVoiceUI ? stopVoiceUI : startVoiceUI}
                title={showVoiceUI ? 'Close voice UI' : 'Open voice interaction'}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                  showVoiceUI
                    ? 'bg-red-500 hover:bg-red-600 text-white ring-3 ring-red-100 animate-pulse'
                    : 'bg-teal-50 hover:bg-[#119197] text-[#119197] hover:text-white'
                }`}
              >
                {showVoiceUI ? <IconMicOff size={16} /> : <IconMic size={16} />}
              </button>
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-[#119197] hover:bg-[#0c6e73] disabled:opacity-35 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <IconSend size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     COMPACT WIDGET MODE
  ══════════════════════════════════════════ */
  return (
    <div
      className="fixed bottom-5 right-5 z-50 w-[380px] max-w-[calc(100vw-2.5rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-up"
      style={{ animationDuration: '0.18s', height: '590px', maxHeight: '90vh' }}
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
                    ? 'bg-green-400'
                    : voiceState === 'connecting'
                    ? 'bg-amber-400 animate-ping'
                    : voiceState === 'listening'
                    ? 'bg-green-400 animate-pulse'
                    : voiceState === 'thinking'
                    ? 'bg-amber-400 animate-bounce'
                    : voiceState === 'speaking'
                    ? 'bg-teal-300 animate-ping'
                    : 'bg-green-400'
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
                        ? 'bg-green-400'
                        : voiceState === 'connecting'
                        ? 'bg-amber-400 animate-ping'
                        : voiceState === 'listening'
                        ? 'bg-green-400 animate-pulse'
                        : voiceState === 'thinking'
                        ? 'bg-amber-400 animate-bounce'
                        : voiceState === 'speaking'
                        ? 'bg-teal-300 animate-ping'
                        : 'bg-green-400'
                    }`}
                  />
                  {!showVoiceUI
                    ? 'ONLINE'
                    : voiceState === 'connecting'
                    ? 'CONNECTING...'
                    : voiceState === 'listening'
                    ? 'LISTENING...'
                    : voiceState === 'thinking'
                    ? 'THINKING...'
                    : voiceState === 'speaking'
                    ? 'SPEAKING...'
                    : 'ONLINE'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => {
                setSoundEnabled(prev => !prev);
                if (soundEnabled && cancelSpeechRef.current) {
                  cancelSpeechRef.current();
                  setSpeakingMsgId(null);
                }
              }}
              title={soundEnabled ? "Voice reading ON" : "Voice reading OFF"}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-white/30 text-white font-bold'
                  : 'bg-white/15 hover:bg-white/25 text-white/80 hover:text-white'
              }`}
            >
              {soundEnabled ? <IconVolume2 size={13} /> : <IconVolumeX size={13} />}
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
            onStop={stopVoiceUI}
            onViewChat={stopVoiceUI}
          />
        </div>
      ) : (
        <>
          {/* Scrollable Messages Stream */}
          <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3 bg-white min-h-0">
            {msgs.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0c6e73] to-[#119197] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                    <IconBot size={13} />
                  </div>
                )}
                <div className="flex flex-col gap-0.5 max-w-[85%]">
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'ai'
                        ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-xs'
                        : 'bg-[#119197] text-white rounded-tr-sm shadow-xs'
                    }`}
                  >
                    {msg.role === 'ai' ? (
                      <FormattedMessage text={msg.text} />
                    ) : (
                      <p className="whitespace-pre-line text-xs">{msg.text}</p>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 mt-0.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[9px] text-gray-400">
                      {msg.time}
                    </span>
                    {msg.role === 'ai' && msg.id !== 0 && (
                      <button
                        type="button"
                        onClick={() => toggleSpeakBubble(msg.text, msg.id)}
                        title={speakingMsgId === msg.id ? "Stop voice reading" : "Read response aloud"}
                        className={`p-0.5 rounded transition-colors cursor-pointer flex items-center gap-0.5 text-[9px] ${
                          speakingMsgId === msg.id
                            ? 'text-[#119197] bg-teal-50 font-semibold'
                            : 'text-gray-400 hover:text-[#119197] hover:bg-teal-50'
                        }`}
                      >
                        {speakingMsgId === msg.id ? <IconVolumeX size={12} /> : <IconVolume2 size={12} />}
                        <span>{speakingMsgId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>
                    )}
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
              {(currentLang === 'am' ? QUICK_QUESTIONS_AM : QUICK_QUESTIONS_EN).map(item => (
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

          {/* Input Dock with Mic & Send Buttons */}
          <div className="px-3.5 py-2.5 bg-white border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 border-2 border-[#119197]/30 rounded-xl px-3 py-1.5 focus-within:border-[#119197] focus-within:bg-white transition-all shadow-xs">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && !isTyping) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder={currentLang === 'am' ? "ጥያቄዎን በአማርኛ ይጠይቁ ወይም ማይክሮፎኑን ይጫኑ..." : "Speak in English or አማርኛ, or ask questions…"}
                className="flex-1 text-xs text-gray-800 placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={startVoiceUI}
                title="Open Voice Interaction"
                aria-label="Open Voice Interaction"
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer bg-teal-50 hover:bg-[#119197] text-[#119197] hover:text-white"
              >
                <IconMic size={14} />
              </button>
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="w-7 h-7 rounded-lg bg-[#119197] hover:bg-[#0c6e73] disabled:opacity-35 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <IconSend size={13} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AIAssistant;
