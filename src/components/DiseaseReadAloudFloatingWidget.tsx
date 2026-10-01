import React, { useState, useEffect } from 'react';
import {
  IconVolume2,
  IconPause,
  IconPlay,
  IconSquare,
  IconX,
  IconGlobe
} from './Icons';
import { diseaseTtsEngine, TtsState } from '../services/diseaseReadAloudService';
import { getSavedLanguage, LanguageOption } from '../services/translatorService';

interface DiseaseReadAloudFloatingWidgetProps {
  fullTextToRead: string;
  diseaseTitle: string;
}

export const DiseaseReadAloudFloatingWidget: React.FC<DiseaseReadAloudFloatingWidgetProps> = ({
  fullTextToRead,
  diseaseTitle,
}) => {
  const [ttsState, setTtsState] = useState<TtsState>(diseaseTtsEngine.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionPopupPos, setSelectionPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [activeLang, setActiveLang] = useState<LanguageOption>(getSavedLanguage());

  // Subscribe to TTS Engine status updates
  useEffect(() => {
    const unsubscribe = diseaseTtsEngine.subscribe((st) => {
      setTtsState(st);
      if (st.isPlaying) {
        setIsExpanded(true);
      }
    });
    return () => {
      unsubscribe();
      diseaseTtsEngine.stop();
    };
  }, []);

  // Sync active language in real time when changed in Navbar or by Google Translate
  useEffect(() => {
    const syncLang = () => {
      const current = getSavedLanguage();
      setActiveLang(current);
    };

    window.addEventListener('tenaye-lang-change', syncLang);
    const interval = setInterval(syncLang, 1500);

    return () => {
      window.removeEventListener('tenaye-lang-change', syncLang);
      clearInterval(interval);
    };
  }, []);

  // Monitor user selection across the page for focused read aloud
  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setSelectedText('');
        setSelectionPopupPos(null);
        return;
      }

      const text = sel.toString().trim();
      if (text.length > 2) {
        setSelectedText(text);
        try {
          const range = sel.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect && rect.top > 0) {
            setSelectionPopupPos({
              x: Math.max(10, rect.left + rect.width / 2 - 80),
              y: Math.max(10, rect.top + window.scrollY - 46),
            });
          }
        } catch {
          setSelectionPopupPos(null);
        }
      } else {
        setSelectedText('');
        setSelectionPopupPos(null);
      }
    };

    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setSelectedText('');
        setSelectionPopupPos(null);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handlePlayFull = () => {
    setIsExpanded(true);
    let textToRead = fullTextToRead;
    try {
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        // Extract live text from headings, paragraphs, and list items
        // Excluding buttons, modals, toasts, and navigation
        const elements = Array.from(mainContainer.querySelectorAll('h1, h2, h3, p, li'))
          .filter(el => {
            return (
              !el.closest('.notranslate') &&
              !el.closest('[role="dialog"]') &&
              !el.closest('button') &&
              !el.closest('header')
            );
          })
          .map(el => (el.textContent || '').trim())
          .filter(t => t.length > 5 && !t.includes('Back to Library') && !t.includes('Share') && !t.includes('Read Full Guide'));

        if (elements.length > 0) {
          textToRead = elements.join('. ');
        }
      }
    } catch {
      textToRead = fullTextToRead;
    }

    diseaseTtsEngine.speak(textToRead, false);
  };

  const handlePlaySelection = () => {
    if (selectedText) {
      diseaseTtsEngine.speak(selectedText, true);
      setIsExpanded(true);
      setSelectedText('');
      setSelectionPopupPos(null);
      if (window.getSelection()) {
        window.getSelection()?.removeAllRanges();
      }
    }
  };

  const handleTogglePause = () => {
    if (ttsState.isPaused) {
      diseaseTtsEngine.resume();
    } else {
      diseaseTtsEngine.pause();
    }
  };

  const handleStop = () => {
    diseaseTtsEngine.stop();
  };

  const currentDisplayLang = ttsState.targetLangName || `${activeLang.label} (${activeLang.native})`;

  return (
    <>
      {/* Floating Mini Tooltip when User Highlights Any Text on Page */}
      {selectedText && selectionPopupPos && (
        <div
          translate="no"
          style={{
            position: 'absolute',
            left: `${selectionPopupPos.x}px`,
            top: `${selectionPopupPos.y}px`,
            zIndex: 9999,
          }}
          className="notranslate animate-in fade-in zoom-in-95 duration-150"
        >
          <button
            onClick={handlePlaySelection}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:brightness-110 text-white text-xs font-bold shadow-lg border border-white/30 cursor-pointer backdrop-blur-md transform transition active:scale-95"
            title={`Read highlighted text aloud in ${activeLang.label}`}
          >
            <IconVolume2 size={14} className="animate-pulse" />
            <span>Read Highlight ({activeLang.label})</span>
          </button>
        </div>
      )}

      {/* Floating Bottom-Left Read Aloud Control Orb */}
      <div translate="no" className="notranslate fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2.5">
        {/* Expanded Controller Panel */}
        {isExpanded && (
          <div className="bg-white/95 backdrop-blur-xl border border-gray-200/90 rounded-2xl p-4 shadow-2xl w-[320px] sm:w-[350px] animate-in slide-in-from-bottom-4 duration-200 text-gray-800">
            {/* Header with Title and Target Language */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 truncate">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#0c6e73] flex items-center justify-center shrink-0">
                  <IconVolume2 size={16} />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-gray-900 truncate">Read Aloud</p>
                  <p className="text-[11px] text-[#0c6e73] font-medium flex items-center gap-1">
                    <IconGlobe size={11} /> Language: {currentDisplayLang}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                title="Minimize player"
              >
                <IconX size={16} />
              </button>
            </div>

            {/* Currently Playing Status or Selection Tip */}
            <div className="my-3">
              {ttsState.isPlaying ? (
                <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-2.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-[#0c6e73] mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#119197] animate-ping" />
                      {ttsState.isPaused ? 'Paused' : ttsState.isHighlightMode ? 'Reading Selection' : 'Reading Disease Guide'}
                    </span>
                    <span className="text-[10px] bg-teal-100/70 text-teal-800 px-1.5 py-0.5 rounded-full font-bold">
                      {ttsState.targetLangCode.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 italic line-clamp-2 leading-relaxed">
                    "{ttsState.currentText}"
                  </p>
                  {/* Subtle Audio Wave Visualizer */}
                  {!ttsState.isPaused && (
                    <div className="flex items-center gap-1 mt-2 justify-center">
                      <div className="w-1 h-3 bg-[#0c6e73] rounded-full animate-pulse" />
                      <div className="w-1 h-5 bg-[#119197] rounded-full animate-bounce" />
                      <div className="w-1 h-2 bg-[#0c6e73] rounded-full animate-pulse" />
                      <div className="w-1 h-4 bg-[#119197] rounded-full animate-bounce" />
                      <div className="w-1 h-3 bg-[#0c6e73] rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 text-center">
                  <p className="text-xs text-gray-600 font-medium">
                    Highlight text anywhere to read specific sections, or click below to listen to the full disease guide.
                  </p>
                </div>
              )}
            </div>

            {/* Selection Quick Action Button */}
            {selectedText && (
              <div className="mb-3">
                <button
                  onClick={handlePlaySelection}
                  className="w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-[#0c6e73] text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <IconVolume2 size={14} />
                  <span>Read Highlight ({selectedText.length} chars)</span>
                </button>
              </div>
            )}

            {/* Playback Control Buttons */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {ttsState.isPlaying ? (
                <>
                  <button
                    onClick={handleTogglePause}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0c6e73] hover:bg-[#119197] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                    title={ttsState.isPaused ? 'Resume speech' : 'Pause speech'}
                  >
                    {ttsState.isPaused ? (
                      <>
                        <IconPlay size={14} /> Resume
                      </>
                    ) : (
                      <>
                        <IconPause size={14} /> Pause
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleStop}
                    className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    title="Stop reading"
                  >
                    <IconSquare size={14} /> Stop
                  </button>
                </>
              ) : (
                <button
                  onClick={handlePlayFull}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:brightness-105 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <IconPlay size={14} /> Read Full Guide ({diseaseTitle})
                </button>
              )}
            </div>
          </div>
        )}

        {/* Circular Trigger Button */}
        <button
          onClick={() => {
            if (!isExpanded) {
              setIsExpanded(true);
            } else {
              if (ttsState.isPlaying) {
                handleTogglePause();
              } else {
                handlePlayFull();
              }
            }
          }}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-white/30 text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-teal-900/20 ${
            ttsState.isPlaying && !ttsState.isPaused
              ? 'bg-gradient-to-tr from-[#0c6e73] to-[#119197] ring-4 ring-teal-400/40 animate-pulse shadow-teal-900/30'
              : 'bg-gradient-to-tr from-[#0c6e73] to-[#119197] hover:brightness-110'
          }`}
          title={ttsState.isPlaying ? (ttsState.isPaused ? 'Resume' : 'Pause Read Aloud') : 'Read Disease Guide Aloud'}
          aria-label="Read Aloud Voice Player"
        >
          {ttsState.isPlaying && !ttsState.isPaused ? (
            <IconPause size={20} />
          ) : (
            <IconVolume2 size={22} />
          )}
        </button>
      </div>
    </>
  );
};
