/**
 * File: src/components/VoiceStage.tsx
 * Cute Concentric Ripple Interactive Voice Stage for Tenaye Assistance
 * - Soft teal concentric animated ripples reacting to live speech audio
 * - Center circular avatar with dynamic 7-bar equalizer waveform during speech
 * - Live transcript card with user speech and AI spoken response
 * - Cute "Stop Voice Dialogue" & "View Chat History" controls
 */

import React, { useRef, useEffect } from 'react';
import { IconBot, IconMicOff, IconVolumeX } from './Icons';
import { cleanSpokenTranscript, cleanVoiceSubtitle } from './textSanitizer';

interface VoiceStageProps {
  state: 'connecting' | 'listening' | 'thinking' | 'speaking' | 'idle' | 'error';
  userTranscript?: string;
  aiResponse?: string;
  audioLevel?: number;
  onStop: () => void;
  onViewChat?: () => void;
}

function cleanUtterance(text: string): string {
  if (!text) return '';
  const trimmed = text.trim();
  const len = trimmed.length;
  const half = Math.floor(len / 2);

  // Collapse exact duplicate halves
  for (let i = half - 5; i <= half + 5; i++) {
    if (i <= 3 || i >= len - 3) continue;
    const first = trimmed.slice(0, i).trim().replace(/[?.!,።]+$/, '');
    const second = trimmed.slice(i).trim().replace(/^[?.!,።]+/, '');
    if (first && first.toLowerCase() === second.toLowerCase()) {
      return trimmed.slice(0, i).trim();
    }
  }
  return trimmed;
}

export function VoiceStage({
  state,
  userTranscript = '',
  aiResponse = '',
  audioLevel = 0,
  onStop,
  onViewChat,
}: VoiceStageProps) {
  const isConnecting = state === 'connecting';
  const isListening = state === 'listening';
  const isThinking = state === 'thinking';
  const isSpeaking = state === 'speaking';

  const userClean = cleanSpokenTranscript(cleanUtterance(userTranscript));
  const aiClean = cleanVoiceSubtitle(cleanUtterance(aiResponse));

  const transcriptCardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript card as new lines stream in
  useEffect(() => {
    if (transcriptCardRef.current) {
      transcriptCardRef.current.scrollTop = transcriptCardRef.current.scrollHeight;
    }
  }, [userClean, aiClean]);

  // Scale multiplier from live audio volume (0 to 1)
  const pulseScale = 1 + Math.min(audioLevel * 0.45, 0.45);

  return (
    <div
      role="region"
      aria-label="Tenaye Voice Interaction"
      className="w-full h-full flex flex-col items-center justify-between py-4 px-4 select-none animate-fade-in bg-gradient-to-b from-teal-50/40 via-white to-gray-50/30 overflow-hidden"
    >
      {/* ── Status Heading ── */}
      <div className="text-center shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 mb-1 shadow-xs">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnecting
                ? 'bg-amber-400 animate-ping'
                : isListening
                ? 'bg-emerald-500 animate-pulse'
                : isThinking
                ? 'bg-amber-500 animate-bounce'
                : isSpeaking
                ? 'bg-[#119197] animate-ping'
                : state === 'error'
                ? 'bg-red-500'
                : 'bg-teal-500'
            }`}
          />
          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
            {isConnecting
              ? 'Connecting…'
              : isListening
              ? 'Listening…'
              : isThinking
              ? 'Thinking…'
              : isSpeaking
              ? 'Speaking…'
              : state === 'error'
              ? 'Microphone Error'
              : 'Voice Live'}
          </span>
        </div>

        <p className="text-xs text-gray-500 max-w-xs mx-auto">
          {isConnecting
            ? 'Establishing secure voice connection…'
            : isListening
            ? 'Speak naturally in English or አማርኛ'
            : isThinking
            ? 'Tenaye Assistance is thinking…'
            : isSpeaking
            ? 'Tenaye Assistance is speaking…'
            : state === 'error'
            ? 'Microphone access denied or unavailable. Please check your mic settings.'
            : 'Voice dialogue active'}
        </p>
      </div>

      {/* ── Concentric Ripple Visualiser Stage ── */}
      <div className="relative flex items-center justify-center flex-1 w-full my-2 min-h-[130px]">
        {/* Outer concentric ripple */}
        {(isListening || isSpeaking || isThinking || isConnecting) && (
          <div
            className="absolute w-48 h-48 rounded-full border-2 border-teal-200/60 transition-transform duration-100 ease-out pointer-events-none"
            style={{ transform: `scale(${pulseScale * 1.05})` }}
          />
        )}
        {/* Middle concentric ripple */}
        {(isListening || isSpeaking || isThinking || isConnecting) && (
          <div
            className="absolute w-36 h-36 rounded-full border border-teal-300/80 transition-transform duration-100 ease-out pointer-events-none"
            style={{ transform: `scale(${pulseScale})` }}
          />
        )}
        {/* Soft ambient glow */}
        <div className="absolute w-28 h-28 rounded-full bg-teal-400/20 blur-xl pointer-events-none" />

        {/* Centre circular avatar */}
        <div
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-xl ${
            isSpeaking
              ? 'bg-gradient-to-br from-[#0c6e73] via-[#119197] to-[#1cd3db] shadow-teal-600/30'
              : isThinking || isConnecting
              ? 'bg-gradient-to-br from-amber-600 to-amber-500 shadow-amber-500/25'
              : 'bg-gradient-to-br from-[#0c6e73] to-[#119197] shadow-teal-700/25'
          }`}
          style={{ transform: `scale(${1 + Math.min(audioLevel * 0.15, 0.15)})` }}
        >
          {/* Inner ring */}
          <div className="absolute inset-1.5 rounded-full border border-white/30 pointer-events-none" />

          {/* Speaking: Dancing Equaliser Bars */}
          {isSpeaking && (
            <div className="relative z-10 flex items-center gap-1 h-9">
              {[0.6, 1.1, 0.7, 1.4, 0.9, 1.2, 0.6].map((scale, i) => {
                const dynamicHeight = Math.max(10, scale * 22 * (0.6 + audioLevel * 1.2));
                return (
                  <span
                    key={i}
                    className="w-1 bg-white rounded-full transition-all duration-75 shadow-xs"
                    style={{ height: `${Math.min(dynamicHeight, 32)}px` }}
                  />
                );
              })}
            </div>
          )}

          {/* Listening: Bot Icon with green indicator */}
          {isListening && (
            <div className="relative flex items-center justify-center">
              <IconBot size={34} className="text-white" />
              <span
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white transition-all ${
                  audioLevel > 0.05 ? 'bg-emerald-400 scale-125' : 'bg-emerald-500'
                }`}
              />
            </div>
          )}

          {/* Thinking / Connecting: Bouncing dots */}
          {(isThinking || isConnecting) && (
            <div className="relative z-10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>
      </div>

      {/* ── Live Transcript Card ── */}
      <div className="w-full max-w-sm mx-auto shrink-0 mb-3">
        <div
          ref={transcriptCardRef}
          className="bg-white border border-gray-200/90 shadow-sm rounded-2xl p-3 text-left transition-all min-h-[70px] max-h-48 overflow-y-auto flex flex-col justify-start"
        >
          {aiClean ? (
            <div className="w-full space-y-1">
              {userClean && (
                <div className="text-[11px] text-gray-500 bg-gray-50 rounded-lg px-2.5 py-1">
                  <span className="font-semibold text-gray-700">You: </span>
                  <span className="italic">"{userClean}"</span>
                </div>
              )}
              <div className="text-xs text-gray-800 bg-teal-50/60 rounded-lg px-2.5 py-1.5 border border-teal-100/80">
                <span className="font-bold text-[#119197] block mb-0.5">Tenaye Assistance:</span>
                <p className="font-medium leading-relaxed whitespace-pre-line">{aiClean}</p>
              </div>
            </div>
          ) : userClean ? (
            <div className="w-full">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                You said
              </span>
              <p className="text-xs text-gray-800 italic leading-relaxed font-medium whitespace-pre-line">
                "{userClean}"
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-400 leading-relaxed py-1 text-center w-full">
              Listening for your health question… Speak in English or አማርኛ.
            </p>
          )}
        </div>
      </div>

      {/* ── Bottom Controls ── */}
      <div className="shrink-0 flex items-center gap-2 pb-1">
        <button
          onClick={onStop}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 border border-red-200 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          title="Stop voice dialogue"
        >
          {isSpeaking ? (
            <>
              <IconVolumeX size={14} />
              <span>Stop Speaking</span>
            </>
          ) : (
            <>
              <IconMicOff size={14} />
              <span>Stop Voice Dialogue</span>
            </>
          )}
        </button>

        {onViewChat && (
          <button
            onClick={onViewChat}
            className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-semibold transition-all cursor-pointer"
            title="View chat history"
          >
            View Chat
          </button>
        )}
      </div>
    </div>
  );
}

export default VoiceStage;
