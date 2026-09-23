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
  IconMic, IconMicOff, IconArrowLeft,
} from './Icons';
import { VoiceStage } from './VoiceStage';
import { ai, resolveSpokenPage, reconnectVoxide, setCurrentLanguage, getCurrentLanguage } from './Assistant';
import { devanagariToEnglish, normalizeMarkdownText, cleanSpokenTranscript, cleanBilingualOutput } from './textSanitizer';

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

/* ── Initial Welcome Message ── */
const WELCOME: Msg = {
  id: 0,
  role: 'ai',
  time: now12(),
  text: "Hello! I'm Tenaye Assistance (ጤናዬ). I can help with:\n\n• Evidence-based disease information & research\n• Clinical symptom analysis & differential diagnosis\n• Step-by-step first aid procedures & emergency triage (907)\n• Prevention, healthy living & wellness tips\n\nType your question below, or tap the microphone to speak naturally in English or አማርኛ!",
};

// Clean shortcut questions with NO emojis
const QUICK_QUESTIONS = [
  { label: 'Diabetes symptoms',       q: 'Tell me about diabetes symptoms, causes and treatments' },
  { label: 'Diarrhea symptoms',       q: 'What are the symptoms, causes and home care for diarrhea?' },
  { label: 'Warning signs of stroke', q: 'What are the emergency warning signs of a stroke?' },
  { label: 'Headache and fever',      q: 'I feel headache and a fever — what could it be?' },
  { label: 'COVID-19 symptoms',       q: 'What are the symptoms, causes and prevention for COVID-19?' },
  { label: 'Malaria prevention',      q: 'How can I prevent malaria in Ethiopia?' },
  { label: 'Who made this website?',  q: 'Who is the founder and team behind Tenaye?' },
];

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
 * Merges streaming AI text fragments safely without discarding continuation chunks
 * or re-duplicating cumulative prefixes.
 */
function mergeAiStreamingText(existing: string, incoming: string): string {
  if (!existing) return incoming;
  if (!incoming) return existing;
  const ex = existing.trim();
  const inc = incoming.trim();
  if (ex === inc) return ex;
  if (inc.startsWith(ex)) return inc;
  if (ex.startsWith(inc)) return ex;

  // Check for suffix-prefix overlap (from 60 down to 6 characters)
  const minOverlap = Math.min(ex.length, inc.length, 60);
  for (let len = minOverlap; len >= 6; len--) {
    const exSuffix = ex.slice(-len);
    if (inc.startsWith(exSuffix)) {
      return ex + inc.slice(len);
    }
  }

  // Check if one contains the other
  if (inc.includes(ex)) return inc;
  if (ex.includes(inc)) return ex;

  // If incoming appears to be an appended continuation chunk (e.g. causes or home care section)
  if (inc.length < ex.length) {
    const joiner = ex.endsWith('\n') || inc.startsWith('\n') ? '' : '\n';
    return ex + joiner + inc;
  }

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
  const [msgs, setMsgs]                 = useState<Msg[]>([WELCOME]);
  const [confirmClear, setConfirmClear] = useState(false);

  // Voice Interaction UI state
  const [showVoiceUI, setShowVoiceUI]   = useState(false);
  const [voiceState, setVoiceState]     = useState<ChatVoiceState>('idle');
  const [userSpeech, setUserSpeech]     = useState('');
  const [aiSpeech, setAiSpeech]         = useState('');
  const [audioLevel, setAudioLevel]     = useState(0);
  const [isTyping, setIsTyping]         = useState(false);

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
    const clean = cleanText.trim();

    // Always dismiss typing indicator watchdog and state as text is actively received
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    setIsTyping(false);
    isTypingRef.current = false;

    setMsgs(prev => {
      // Prioritize active spoken utterance or current language for 100% accurate language matching
      let isAmharic = false;
      if ((window as any).__tenayeVoiceActive) {
        const spoken = (userSpeech || '').trim();
        if (spoken) {
          isAmharic = /[\u1200-\u137F]/.test(spoken) && !/[a-zA-Z]/.test(spoken);
        } else {
          isAmharic = getCurrentLanguage() === 'am';
        }
      } else {
        const lastUserMsg = [...prev].reverse().find(m => m.role === 'user');
        isAmharic = lastUserMsg ? /[\u1200-\u137F]/.test(lastUserMsg.text) : (getCurrentLanguage() === 'am');
      }
      const singleLang = cleanBilingualOutput(clean, isAmharic);

      // In Voice Mode, update live AI transcript subtitle card
      if ((window as any).__tenayeVoiceActive) {
        setAiSpeech(prevSpeech => mergeAiStreamingText(prevSpeech, singleLang));
      }

      const last = prev[prev.length - 1];

      // If the last message is already an AI message: update it with streaming text!
      if (last && last.role === 'ai') {
        if (last.id === 0) {
          // Never overwrite the initial welcome card if user hasn't asked anything
          return prev;
        }
        const mergedText = mergeAiStreamingText(last.text, singleLang);
        lastProcessedAiTextRef.current = mergedText;
        return prev.map((m, idx) => idx === prev.length - 1 ? { ...m, text: mergedText } : m);
      }

      // If the last message was a user message: append a new AI bubble!
      const aiId = ts();
      pendingAiBubbleIdRef.current = aiId;
      lastProcessedAiTextRef.current = singleLang;
      return [...prev, { id: aiId, role: 'ai', text: singleLang, time: now12() }];
    });
  }, []);

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
          if (hasEthiopic && !hasLatin) {
            if (getCurrentLanguage() !== 'am') {
              setCurrentLanguage('am');
            }
          } else if (hasLatin && !hasEthiopic) {
            if (getCurrentLanguage() !== 'en') {
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
      if (!text || !text.trim()) return;
      const clean = text.trim();

      if (role === 'ai') {
        handleIncomingAiText(clean);
        // Only finalize the turn if in text mode. In voice mode, keep pendingAiBubbleIdRef tied to current bubble so subsequent flushes update the same bubble!
        if (!(window as any).__tenayeVoiceActive) {
          activeTurnIdRef.current = 0;
          pendingAiBubbleIdRef.current = null;
        }
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

        const isUserAm = /[\u1200-\u137F]/.test(cleanUser);
        const hasLatin = /[a-zA-Z]/.test(cleanUser);
        if (isUserAm && !hasLatin) {
          setCurrentLanguage('am');
        } else if (hasLatin && !isUserAm) {
          setCurrentLanguage('en');
        }

        setUserSpeech(cleanUser);
        setAiSpeech('');
        (window as any).__tenayeIsAiTurnActive = true;
        setVoiceState('thinking'); // Transition to thinking when user finishes speaking

        const userTurnId = ts();
        activeTurnIdRef.current = userTurnId;
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
      if (ws && ws.readyState !== WebSocket.OPEN) {
        try {
          ws.close();
        } catch {}
        (ai as any)._voiceWs = null;
      }
      await ai.connect();
      // Fast polling to ensure WebSocket is OPEN
      const start = Date.now();
      while (Date.now() - start < 1500) {
        const cur = (ai as any)._voiceWs;
        if (cur && cur.readyState === WebSocket.OPEN) {
          return true;
        }
        await new Promise(r => setTimeout(r, 30));
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

    // Interrupt previous playback or pending buffers
    try {
      (ai as any)._voiceStopPlayback?.(true);
      (ai as any)._voiceInterrupt?.();
      (ai as any)._voicePendingAiText = '';
      (ai as any)._voicePendingUserText = '';
    } catch {}

    // Default active language to English when starting voice session
    setCurrentLanguage('en');

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

    // Detect language and explicitly set on Voxide client & dynamic state
    const isAm = /[\u1200-\u137F]/.test(t);
    setCurrentLanguage(isAm ? 'am' : 'en');

    // In text mode, ensure voice mode is strictly false
    (window as any).__tenayeVoiceActive = false;
    if (showVoiceUI) {
      stopVoiceUI();
    }

    // Resume AudioContext if suspended so browser allows Voxide's voice playback on text chat
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx && !(ai as any)._voiceAudioOut) {
        (ai as any)._voiceAudioOut = new AudioCtx({ sampleRate: 24000 });
      }
      if ((ai as any)._voiceAudioOut && (ai as any)._voiceAudioOut.state === 'suspended') {
        (ai as any)._voiceAudioOut.resume().catch(() => {});
      }
    } catch {}

    // Check for explicit navigation command
    const targetPage = resolveSpokenPage(t);
    if (targetPage && (window as any).__tenayeNavigate) {
      (window as any).__tenayeNavigate(targetPage);
    }

    // 1. Interrupt previous playback and server turn immediately
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
    setMsgs([WELCOME]);
    setConfirmClear(false);
    setUserSpeech('');
    setAiSpeech('');
    activeTurnIdRef.current = 0;
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
    try {
      (ai as any)._voiceStopPlayback?.(true);
      (ai as any)._voicePendingAiText = '';
      (ai as any)._voicePendingUserText = '';
      if ((ai as any)._voiceSnapshot) {
        (ai as any)._voiceSnapshot = { ...(ai as any)._voiceSnapshot, messages: [] };
      }
    } catch {
      // ignore
    }
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
              {QUICK_QUESTIONS.map(item => (
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
                placeholder="Speak in English or አማርኛ, or ask questions…"
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

          <div className="flex items-center gap-1">
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
              {QUICK_QUESTIONS.map(item => (
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
                placeholder="Speak in English or አማርኛ, or ask questions…"
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
