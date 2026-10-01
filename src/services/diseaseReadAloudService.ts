/**
 * Universal Multilingual Speech Synthesis Engine
 * Native Web Speech API + High-Fidelity Audio Streaming Proxy for Ethiopian & Global Languages.
 * Reads highlighted text or full disease guide in Amharic, Afan Oromo, Tigrinya, Somali, Korean, French, etc.
 */
import { getSavedLanguage, ALL_LANGUAGES, LanguageOption } from '../services/translatorService';

export interface TtsState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  isHighlightMode: boolean;
  targetLangName: string;
  targetLangCode: string;
  progressPercent?: number;
}

/** Detect language directly from text characters or the active app environment */
export function detectLanguage(sampleText?: string): { code: string; name: string } {
  const text = (sampleText || '').trim();

  // 1. Detect distinctive scripts directly from the text
  if (/[\u1200-\u137F]/.test(text)) {
    // Ethiopic Script (Ge'ez): Amharic or Tigrinya
    const saved = getSavedLanguage();
    if (saved.code === 'ti') {
      return { code: 'ti', name: 'Tigrinya (ትግርኛ)' };
    }
    return { code: 'am', name: 'Amharic (አማርኛ)' };
  }

  if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(text)) {
    return { code: 'ko', name: 'Korean (한국어)' };
  }

  if (/[\u0600-\u06FF]/.test(text)) {
    return { code: 'ar', name: 'Arabic (العربية)' };
  }

  if (/[\u4E00-\u9FFF]/.test(text)) {
    return { code: 'zh-CN', name: 'Chinese (中文)' };
  }

  if (/[\u3040-\u30FF]/.test(text)) {
    return { code: 'ja', name: 'Japanese (日本語)' };
  }

  if (/[\u0400-\u04FF]/.test(text)) {
    return { code: 'ru', name: 'Russian (Русский)' };
  }

  // 1b. Detect Afan Oromo & Somali characteristic vocabulary
  if (/\b(dhukkuba|mallattoolee|fayyaa|wal'aansa|qaama|ittisa|dhibee|akkasumas|of-eeggannoo)\b/i.test(text)) {
    return { code: 'om', name: 'Afan Oromo (Afaan Oromoo)' };
  }

  if (/\b(cudurka|cudur|calaamadaha|astaamaha|caafimaadka|daaweynta|daawaynta|jirka|tallaalka|ka-hortagga|kahortagga|sababaha|dadka|daryeelka|duumo|duumada|kaneeco|kaneecada|qandho|xumad|xanuunka|xanuun|dhakhtar|baadhitaanka|darnaanta|guudmar|somali|soomaali|wadnaha|dhiigga|neefsashada)\b/i.test(text)) {
    return { code: 'so', name: 'Somali (Soomaali)' };
  }

  // 2. Query saved site language / Google Translate selection
  const saved = getSavedLanguage();
  if (saved && saved.code) {
    return { code: saved.code, name: `${saved.label} (${saved.native})` };
  }

  return { code: 'en', name: 'English' };
}

class UniversalReadAloudEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioPlayer: HTMLAudioElement | null = null;
  private stateListeners: Array<(state: TtsState) => void> = [];
  private currentText = '';
  private isPlaying = false;
  private isPaused = false;
  private isHighlightMode = false;
  private audioQueue: string[] = [];
  private currentQueueIndex = 0;
  private isTransitioningChunk = false;
  private consecutiveErrors = 0;
  private currentLangCode = 'en';
  private currentLangName = 'English';

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
      this.audioPlayer = new Audio();
      this.audioPlayer.preload = 'auto';

      this.audioPlayer.onended = () => {
        this.onChunkFinished(false);
      };

      this.audioPlayer.onerror = (e) => {
        console.warn('Tenaye TTS Audio element error:', e);
        this.onChunkFinished(true);
      };

      // Listen for language changes across the platform in real time
      window.addEventListener('tenaye-lang-change', (e: any) => {
        const newCode = e?.detail?.lang;
        if (newCode) {
          const found = ALL_LANGUAGES.find(l => l.code.toLowerCase() === newCode.toLowerCase());
          if (found) {
            this.currentLangCode = found.code;
            this.currentLangName = `${found.label} (${found.native})`;
          } else {
            this.currentLangCode = newCode;
            this.currentLangName = newCode;
          }
          this.notify();
        }
      });

      // Initialize language state
      const initial = getSavedLanguage();
      this.currentLangCode = initial.code;
      this.currentLangName = `${initial.label} (${initial.native})`;
    }
  }

  public subscribe(listener: (state: TtsState) => void): () => void {
    this.stateListeners.push(listener);
    listener(this.getState());
    return () => {
      this.stateListeners = this.stateListeners.filter(l => l !== listener);
    };
  }

  private notify() {
    const s = this.getState();
    this.stateListeners.forEach(l => {
      try {
        l(s);
      } catch (err) {
        console.error('TTS subscriber error:', err);
      }
    });
  }

  public getState(): TtsState {
    const total = this.audioQueue.length;
    const progress = total > 0 ? Math.round(((this.currentQueueIndex) / total) * 100) : 0;

    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentText: this.currentText,
      isHighlightMode: this.isHighlightMode,
      targetLangName: this.currentLangName,
      targetLangCode: this.currentLangCode,
      progressPercent: progress,
    };
  }

  /**
   * Split long text into natural sentences or short ~100-character segments.
   */
  private chunkText(text: string, maxLength = 110): string[] {
    // Split on Ethiopian punctuation (።, ፤) and standard sentence enders (. ! ? \n)
    const sentences = text.match(/[^.!?።\n]+[.!?።\n]+|[^.!?።\n]+$/g) || [text];
    const chunks: string[] = [];

    for (const raw of sentences) {
      const s = raw.trim();
      if (!s) continue;
      if (s.length <= maxLength) {
        chunks.push(s);
      } else {
        const words = s.split(' ');
        let cur = '';
        for (const w of words) {
          if ((cur + ' ' + w).trim().length <= maxLength) {
            cur = (cur + ' ' + w).trim();
          } else {
            if (cur) chunks.push(cur);
            cur = w;
          }
        }
        if (cur) chunks.push(cur);
      }
    }

    return chunks.length > 0 ? chunks : [text];
  }

  private sanitize(raw: string): string {
    return raw
      .replace(/\s+/g, ' ')
      .replace(/[#*_`~<>{}[\]]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();
  }

  private hasNativeVoice(code: string): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    const lower = code.toLowerCase().trim();
    return (
      voices.find(v => v.lang.toLowerCase() === lower || v.lang.toLowerCase().startsWith(lower + '-')) || null
    );
  }

  private speakViaSpeechSynthesis(text: string) {
    if (!this.synth) {
      this.onChunkFinished(true);
      return;
    }

    try {
      // Ensure audio player is completely silent before synth starts
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlayer.removeAttribute('src');
      }

      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      const voices = this.synth.getVoices();
      // Try finding regional language voice or natural phonetic match
      const voice =
        voices.find(v => v.lang.toLowerCase().startsWith('so') || v.lang.toLowerCase().startsWith('sw')) ||
        voices.find(v => v.lang.toLowerCase().startsWith('it')) ||
        voices.find(v => v.lang.toLowerCase().startsWith('en')) ||
        null;

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isPaused = false;
        this.consecutiveErrors = 0;
        this.notify();
      };
      utterance.onend = () => {
        this.onChunkFinished(false);
      };
      utterance.onerror = () => {
        this.onChunkFinished(true);
      };

      this.synth.speak(utterance);
    } catch {
      this.onChunkFinished(true);
    }
  }

  private onChunkFinished(isError: boolean) {
    if (this.isTransitioningChunk) return;
    this.isTransitioningChunk = true;

    if (isError) {
      this.consecutiveErrors++;
      if (this.consecutiveErrors >= 3) {
        console.warn('Multiple audio playback errors encountered. Stopping TTS stream gracefully.');
        this.stop();
        this.isTransitioningChunk = false;
        return;
      }
    } else {
      this.consecutiveErrors = 0;
    }

    // Move to next chunk with small delay to allow UI to breathe
    setTimeout(() => {
      this.isTransitioningChunk = false;
      this.playNextAudioChunk();
    }, 40);
  }

  private playNextAudioChunk() {
    if (!this.isPlaying) return;

    if (this.currentQueueIndex >= this.audioQueue.length) {
      this.stop();
      return;
    }

    const chunk = this.audioQueue[this.currentQueueIndex];
    this.currentQueueIndex++;
    this.notify();

    let voiceCode = this.currentLangCode.toLowerCase();
    if (voiceCode === 'ti') {
      voiceCode = 'am'; // Ethiopic Ge'ez script voice
    } else if (voiceCode === 'so' || voiceCode === 'som' || voiceCode === 'om') {
      // East African Cushitic phonetic neural voice (pure 5-vowel Latin pronunciation)
      voiceCode = 'sw';
    }

    // Ensure synth is cancelled before starting audio stream to prevent voice mixing
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }

    // Primary: High-speed local Vite proxy (/api/tts)
    const proxyUrl = `/api/tts?tl=${encodeURIComponent(voiceCode)}&q=${encodeURIComponent(chunk)}`;

    if (this.audioPlayer) {
      this.audioPlayer.src = proxyUrl;
      this.audioPlayer
        .play()
        .then(() => {
          this.isPaused = false;
          this.consecutiveErrors = 0;
          this.notify();
        })
        .catch((playErr) => {
          // Ignore AbortError when chunk transitions or stops
          if (playErr?.name === 'AbortError') return;

          console.warn('Audio stream error, falling back to Web Speech Synthesis:', playErr);
          if (!this.isPlaying) return;
          this.speakViaSpeechSynthesis(chunk);
        });
    } else {
      this.speakViaSpeechSynthesis(chunk);
    }
  }

  /**
   * Speak arbitrary text with automatic language detection & fallback.
   */
  public speak(text: string, isFromSelection = false) {
    // Stop any existing playback cleanly
    this.stopPlaybackInternal();

    const clean = this.sanitize(text);
    if (!clean) return;

    // Detect language from text content and user preference
    const detected = detectLanguage(clean);
    this.currentLangCode = detected.code;
    this.currentLangName = detected.name;
    this.currentText = clean;
    this.isHighlightMode = isFromSelection;
    this.isPlaying = true;
    this.isPaused = false;
    this.consecutiveErrors = 0;
    this.notify();

    const langCode = this.currentLangCode.toLowerCase();
    const isHornLanguage = ['am', 'om', 'ti', 'so', 'som'].includes(langCode);
    const nativeVoice = this.hasNativeVoice(langCode);

    // If native voice exists and is NOT a missing African voice, use Web Speech API
    // (e.g. English, French, Korean, Spanish, etc.)
    if (this.synth && nativeVoice && !isHornLanguage) {
      const utterance = new SpeechSynthesisUtterance(clean);
      this.currentUtterance = utterance;
      utterance.voice = nativeVoice;
      utterance.lang = nativeVoice.lang;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isPlaying = true;
        this.isPaused = false;
        this.notify();
      };
      utterance.onpause = () => {
        this.isPaused = true;
        this.notify();
      };
      utterance.onresume = () => {
        this.isPaused = false;
        this.notify();
      };
      utterance.onend = () => {
        this.stop();
      };
      utterance.onerror = () => {
        this.stop();
      };

      this.synth.speak(utterance);
      return;
    }

    // For Amharic, Oromo, Tigrinya, Somali, or languages needing the high-fidelity neural audio stream:
    this.audioQueue = this.chunkText(clean, 110);
    this.currentQueueIndex = 0;
    this.playNextAudioChunk();
  }

  public pause() {
    if (!this.isPlaying) return;

    if (this.audioPlayer && !this.audioPlayer.paused) {
      this.audioPlayer.pause();
      this.isPaused = true;
      this.notify();
      return;
    }

    if (this.synth && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (!this.isPlaying) return;

    if (this.audioPlayer && this.audioPlayer.paused && this.audioQueue.length > 0) {
      this.audioPlayer
        .play()
        .then(() => {
          this.isPaused = false;
          this.notify();
        })
        .catch(() => {});
      return;
    }

    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  private stopPlaybackInternal() {
    if (this.audioPlayer) {
      try {
        this.audioPlayer.pause();
        this.audioPlayer.removeAttribute('src');
        this.audioPlayer.load();
      } catch {}
    }
    this.audioQueue = [];
    this.currentQueueIndex = 0;
    this.isTransitioningChunk = false;

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {}
      this.currentUtterance = null;
    }
  }

  public stop() {
    this.stopPlaybackInternal();
    this.isPlaying = false;
    this.isPaused = false;
    this.currentText = '';
    this.isHighlightMode = false;
    this.notify();
  }
}

export const diseaseTtsEngine = new UniversalReadAloudEngine();
