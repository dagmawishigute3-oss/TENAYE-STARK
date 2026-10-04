/**
 * File: src/components/VoiceStage.tsx
 * Interactive Voice Stage for Tenaye Assistance
 * - Telegram-style user-controlled speech: Tap/hold to speak, tap again to send
 * - NEVER responds automatically before the user explicitly clicks/sends
 * - Animated concentric ripples reacting to live speech audio
 * - Center circular interactive orb with dynamic equalizer waveform during speech
 * - Live real-time transcript card
 * - Explicit Send, Cancel, and View Chat actions
 */

import React, { useRef, useEffect } from "react"
import {
  IconBot,
  IconMic,
  IconMicOff,
  IconTrash,
  IconVolumeX,
  IconX,
} from "./Icons"
import { cleanSpokenTranscript, cleanVoiceSubtitle } from "./textSanitizer"

export interface VoiceStageProps {
  state: "connecting" | "listening" | "thinking" | "speaking" | "idle" | "error"
  userTranscript?: string
  aiResponse?: string
  audioLevel?: number
  isRecording?: boolean
  isAmharic?: boolean
  onStartRecord?: () => void
  onStopRecordAndSend?: () => void
  onCancelRecord?: () => void
  onStop: () => void
  onViewChat?: () => void
}

function cleanUtterance(text: string): string {
  if (!text) return ""
  let trimmed = text.trim()

  // Deduplicate exact or near-exact duplicate halves
  const len = trimmed.length
  const half = Math.floor(len / 2)
  for (let i = half - 15; i <= half + 15; i++) {
    if (i <= 5 || i >= len - 5) continue
    const first = trimmed
      .slice(0, i)
      .trim()
      .replace(/[?.!,።]+$/, "")
    const second = trimmed
      .slice(i)
      .trim()
      .replace(/^[?.!,።]+/, "")
    if (first && first.toLowerCase() === second.toLowerCase()) {
      trimmed = trimmed.slice(0, i).trim()
      break
    }
  }

  // Deduplicate consecutive repeated sentences
  const sentences = trimmed.split(/(?<=[.?!።\n])\s+/)
  const deduped: string[] = []
  for (const s of sentences) {
    const sClean = s.trim()
    if (!sClean) continue
    const prev = deduped[deduped.length - 1]
    if (
      prev &&
      (prev.toLowerCase() === sClean.toLowerCase() ||
        prev.includes(sClean) ||
        sClean.includes(prev))
    ) {
      continue
    }
    deduped.push(sClean)
  }

  return deduped.join(" ")
}

export function VoiceStage({
  state,
  userTranscript = "",
  aiResponse = "",
  audioLevel = 0,
  isRecording = false,
  isAmharic = false,
  onStartRecord,
  onStopRecordAndSend,
  onCancelRecord,
  onStop,
  onViewChat,
}: VoiceStageProps) {
  const isConnecting = state === "connecting"
  const isListening = state === "listening" || isRecording
  const isThinking = state === "thinking"
  const isSpeaking = state === "speaking"
  const isIdle = !isListening && !isThinking && !isSpeaking && !isConnecting

  const userClean = cleanSpokenTranscript(cleanUtterance(userTranscript))
  const aiClean = cleanVoiceSubtitle(cleanUtterance(aiResponse))

  const transcriptCardRef = useRef<HTMLDivElement>(null)
  const orbHoldStartRef = useRef<number>(0)

  // Auto-scroll transcript card as new words stream in
  useEffect(() => {
    if (transcriptCardRef.current) {
      transcriptCardRef.current.scrollTop =
        transcriptCardRef.current.scrollHeight
    }
  }, [userClean, aiClean])

  // Scale multiplier from live audio volume (0 to 1)
  const pulseScale = 1 + Math.min(audioLevel * 0.45, 0.45)

  const handleOrbClick = () => {
    if (isListening || isSpeaking) {
      onStop?.()
    } else if (isIdle) {
      onStartRecord?.()
    }
  }

  const handleOrbPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    orbHoldStartRef.current = Date.now()
    if (isIdle) {
      onStartRecord?.()
    }
  }

  const handleOrbPointerUp = () => {
    if (!orbHoldStartRef.current) return
    const duration = Date.now() - orbHoldStartRef.current
    orbHoldStartRef.current = 0
    if (duration > 550 && isListening) {
      // Telegram-style hold-to-talk release
      onStopRecordAndSend?.()
    }
  }

  return (
    <div
      role="region"
      aria-label="Tenaye Voice Interaction"
      className="w-full h-full flex flex-col items-center justify-between py-3 px-4 select-none animate-fade-in bg-gradient-to-b from-teal-50/40 via-white to-gray-50/30 overflow-hidden"
    >
      {/* ── Status Heading (Matching authentic Tenaye Voice UI) ── */}
      <div className="text-center shrink-0">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 mb-1 shadow-2xs">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnecting
                ? "bg-amber-400 animate-ping"
                : isListening
                  ? "bg-emerald-500 animate-pulse"
                  : isThinking
                    ? "bg-amber-500 animate-bounce"
                    : isSpeaking
                      ? "bg-[#119197] animate-ping"
                      : state === "error"
                        ? "bg-red-500"
                        : "bg-emerald-500"
            }`}
          />
          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider">
            {isConnecting
              ? "CONNECTING..."
              : isListening
                ? "LISTENING..."
                : isThinking
                  ? "THINKING..."
                  : isSpeaking
                    ? "SPEAKING..."
                    : state === "error"
                      ? "MICROPHONE ERROR"
                      : "READY"}
          </span>
        </div>

        <p className="text-xs text-gray-500 max-w-xs mx-auto">
          Speak naturally in English or አማርኛ
        </p>
      </div>

      {/* ── Concentric Ripple Visualiser Stage (Teal Rings) ── */}
      <div className="relative flex items-center justify-center flex-1 w-full my-2 min-h-[140px]">
        {/* Outer concentric ripple */}
        <div
          className={`absolute w-52 h-52 rounded-full border transition-all duration-150 ease-out pointer-events-none border-teal-200/50 ${
            isListening || isSpeaking || isThinking || isConnecting
              ? "opacity-100"
              : "opacity-40"
          }`}
          style={{ transform: `scale(${pulseScale * 1.05})` }}
        />
        {/* Middle concentric ripple */}
        <div
          className={`absolute w-40 h-40 rounded-full border transition-all duration-150 ease-out pointer-events-none border-teal-300/70 ${
            isListening || isSpeaking || isThinking || isConnecting
              ? "opacity-100"
              : "opacity-50"
          }`}
          style={{ transform: `scale(${pulseScale})` }}
        />
        {/* Soft ambient glow */}
        <div className="absolute w-28 h-28 rounded-full blur-xl pointer-events-none bg-teal-400/20" />

        {/* Centre circular interactive avatar / button */}
        <button
          type="button"
          onClick={handleOrbClick}
          onPointerDown={handleOrbPointerDown}
          onPointerUp={handleOrbPointerUp}
          title={
            isListening
              ? "Tap to stop dialogue"
              : isSpeaking
                ? "Tap to stop speaking"
                : "Tap to speak"
          }
          className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-xl cursor-pointer active:scale-95 bg-gradient-to-br from-[#0c6e73] via-[#0f7d83] to-[#119197] ring-4 ring-teal-100 shadow-teal-800/25 hover:shadow-teal-800/40 hover:scale-105"
          style={{
            transform: `scale(${1 + Math.min(audioLevel * 0.12, 0.12)})`,
          }}
        >
          {/* Inner ring */}
          <div className="absolute inset-1.5 rounded-full border border-white/25 pointer-events-none" />

          {/* Bot Logo Icon in center (Matching previous style in user screenshots) */}
          <div className="relative flex items-center justify-center">
            <IconBot size={36} className="text-white drop-shadow-xs" />
          </div>

          {/* Green Status Indicator Dot with white border on bottom right */}
          <span
            className={`absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full border-2 border-white ring-1 ring-emerald-600/30 ${
              isListening
                ? "bg-emerald-400 animate-pulse"
                : isSpeaking
                  ? "bg-teal-300 animate-ping"
                  : isThinking
                    ? "bg-amber-400 animate-bounce"
                    : "bg-emerald-500"
            }`}
          />
        </button>
      </div>

      {/* ── Live Transcript Card (Matching Screenshot) ── */}
      <div className="w-full max-w-sm mx-auto shrink-0 mb-3">
        <div
          ref={transcriptCardRef}
          className="bg-white border border-gray-200/90 shadow-2xs rounded-2xl p-3 text-left transition-all min-h-[75px] max-h-44 overflow-y-auto flex flex-col justify-start"
        >
          {aiClean ? (
            <div className="w-full space-y-1.5">
              {userClean && (
                <div className="text-[11px] text-gray-700 bg-gray-100/90 rounded-xl px-3 py-1.5 mb-1.5">
                  <span className="font-semibold text-gray-900">You: </span>
                  <span className="italic">"{userClean}"</span>
                </div>
              )}
              <div className="text-xs text-gray-800 bg-[#eefafb] rounded-xl px-3 py-2 border border-teal-100">
                <span className="font-bold text-[#0c6e73] block mb-0.5">
                  Tenaye Assistance:
                </span>
                <p className="font-normal leading-relaxed whitespace-pre-line">
                  {aiClean}
                </p>
              </div>
            </div>
          ) : isListening ? (
            <div className="w-full">
              {userClean ? (
                <div className="text-[11px] text-gray-700 bg-gray-100/90 rounded-xl px-3 py-1.5 mb-1.5">
                  <span className="font-semibold text-gray-900">You: </span>
                  <span className="italic font-medium text-gray-900">
                    "{userClean}"
                  </span>
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic py-2.5 text-center leading-relaxed">
                  Listening for your health question... Speak in English or
                  አማርኛ.
                </p>
              )}
            </div>
          ) : isThinking ? (
            <div className="w-full space-y-1.5">
              {userClean && (
                <div className="text-[11px] text-gray-700 bg-gray-100/90 rounded-xl px-3 py-1.5">
                  <span className="font-semibold text-gray-900">You: </span>
                  <span className="italic">"{userClean}"</span>
                </div>
              )}
              <div className="text-xs text-[#0c6e73] font-medium py-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#119197] animate-ping" />
                <span>Preparing clinical guidance…</span>
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
            <p className="text-xs text-gray-400 leading-relaxed py-2.5 text-center w-full">
              Speak naturally in English or አማርኛ. 
            </p>
          )}
        </div>
      </div>

      {/* ── Bottom Controls: Authentic Tenaye Dialogue Buttons ── */}
      <div className="shrink-0 flex items-center gap-2 pb-1">
        {isListening ? (
          <>

            {/* Stop Voice Dialogue Button (Matching media screenshot) */}
            <button
              type="button"
              onClick={onStop}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Stop voice dialogue"
            >
              <IconMicOff size={14} className="text-red-500" />
              <span>Stop Voice Dialogue</span>
            </button>

            {/* View Chat */}
            {onViewChat && (
              <button
                type="button"
                onClick={onViewChat}
                className="px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="View chat history"
              >
                View Chat
              </button>
            )}
          </>
        ) : isSpeaking ? (
          <>
            {/* Stop Speaking Button */}
            <button
              type="button"
              onClick={onStop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 border border-red-200 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
              title="Stop speaking"
            >
              <IconVolumeX size={14} />
              <span>Stop Speaking</span>
            </button>

            

            {/* View Chat */}
            {onViewChat && (
              <button
                type="button"
                onClick={onViewChat}
                className="px-3.5 py-2.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="View chat history"
              >
                View Chat
              </button>
            )}
          </>
        ) : (
          <>
            

            {/* View Chat History */}
            {onViewChat && (
              <button
                type="button"
                onClick={onViewChat}
                className="px-4 py-2.5 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="View chat history"
              >
                View Chat
              </button>
            )}

            {/* Exit Voice Mode */}
            <button
              type="button"
              onClick={onStop}
              className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
              title="Exit voice mode"
            >
              <IconX size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default VoiceStage
