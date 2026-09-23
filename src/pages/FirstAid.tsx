import { useState, useMemo } from 'react';
import { IconHeart, IconPhone, IconAlertTriangle } from '../components/Icons';
import { FIRST_AID_TOPICS, FirstAidTopic, SeverityLevel } from '../data/firstAidData';
import { TopicIcon, TopicVisualDiagram } from '../components/FirstAidVisuals';

const SEVERITY_BADGE: Record<SeverityLevel, { bg: string; text: string; dot: string }> = {
  Critical: { bg: 'bg-red-50 text-red-700 border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
  High: { bg: 'bg-orange-50 text-orange-700 border-orange-200', text: 'text-orange-700', dot: 'bg-orange-500' },
  Moderate: { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
};

export function FirstAid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<'steps' | 'facts' | 'avoid' | 'visual'>('steps');
  const [ageGroup, setAgeGroup] = useState<'adults' | 'children' | 'infants'>('adults');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'All' | SeverityLevel>('All');

  const selectedTopic = useMemo<FirstAidTopic | null>(() => {
    if (!selectedId) return null;
    return FIRST_AID_TOPICS.find((t) => t.id === selectedId) || null;
  }, [selectedId]);

  // Filtered topics based on search & severity
  const filteredTopics = useMemo(() => {
    return FIRST_AID_TOPICS.filter((topic) => {
      const matchesSeverity = selectedSeverity === 'All' || topic.severity === selectedSeverity;
      if (!matchesSeverity) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.shortTitle.toLowerCase().includes(q) ||
        topic.amharic.toLowerCase().includes(q) ||
        topic.overview.toLowerCase().includes(q) ||
        topic.keyFacts.some((f) => f.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, selectedSeverity]);

  // Counts for filters
  const counts = useMemo(() => {
    return {
      all: FIRST_AID_TOPICS.length,
      critical: FIRST_AID_TOPICS.filter((t) => t.severity === 'Critical').length,
      high: FIRST_AID_TOPICS.filter((t) => t.severity === 'High').length,
      moderate: FIRST_AID_TOPICS.filter((t) => t.severity === 'Moderate').length,
    };
  }, []);

  const handleSelectTopic = (id: string) => {
    setSelectedId(id);
    setTab('steps');
    setAgeGroup('adults');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-br from-[#0c6e73] via-[#0f7d82] to-[#119197] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-white/10 items-center justify-center mx-auto mb-3 shadow-inner">
            <IconHeart size={24} className="text-red-200" />
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
            First Aid & Emergency Guides
          </h1>
          <p className="text-teal-100 text-sm sm:text-base max-w-2xl mx-auto">
            Comprehensive, step-by-step protocols segmented by age group (Adults, Children 1–8y, Infants &lt;1y) with visual diagrams for 26 life-threatening conditions.
          </p>
          <p className="text-teal-200/90 text-xs sm:text-sm font-medium mt-1">
            የአስቸኳይ ጊዜ የመጀመሪያ እርዳታ መመሪያዎች (26 አጠቃላይ የህክምና ሁኔታዎች)
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {!selectedTopic ? (
          <>
            {/* Search and Filters Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-xs mb-8">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                {/* Search input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by condition, symptom, Amharic term, or keyword (e.g., CPR, Bleeding, ማነቅ)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#119197] focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Severity Filter Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  <button
                    onClick={() => setSelectedSeverity('All')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      selectedSeverity === 'All'
                        ? 'bg-[#119197] text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All ({counts.all})
                  </button>
                  <button
                    onClick={() => setSelectedSeverity('Critical')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      selectedSeverity === 'Critical'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Critical ({counts.critical})
                  </button>
                  <button
                    onClick={() => setSelectedSeverity('High')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      selectedSeverity === 'High'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    High ({counts.high})
                  </button>
                  <button
                    onClick={() => setSelectedSeverity('Moderate')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      selectedSeverity === 'Moderate'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Moderate ({counts.moderate})
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredTopics.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">No emergency guides found</h3>
                <p className="text-xs text-gray-500 mb-4">Try adjusting your search terms or filter selection.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSeverity('All');
                  }}
                  className="px-4 py-2 bg-[#119197] text-white text-xs font-bold rounded-xl hover:bg-[#0c6e73] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTopics.map((topic) => {
                  const badge = SEVERITY_BADGE[topic.severity];
                  return (
                    <button
                      key={topic.id}
                      onClick={() => handleSelectTopic(topic.id)}
                      className="group bg-white border border-gray-200 hover:border-[#119197] rounded-2xl p-5 text-left transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Top row: Icon + Severity Badge */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#119197] group-hover:bg-[#119197] group-hover:text-white flex items-center justify-center transition-colors shrink-0 p-2">
                            <TopicIcon id={topic.iconType} className="w-7 h-7" />
                          </div>
                          <span
                            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${badge.bg}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            {topic.severity}
                          </span>
                        </div>

                        {/* Title and Amharic */}
                        <h3 className="font-display font-bold text-gray-900 text-base mb-0.5 group-hover:text-[#119197] transition-colors">
                          {topic.shortTitle}
                        </h3>
                        <p className="text-[11px] text-teal-800 font-medium mb-2 line-clamp-1">{topic.amharic}</p>

                        {/* Overview snippet */}
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                          {topic.overview}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-medium text-[11px] flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-[#119197]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          3 Age Protocols
                        </span>
                        <span className="text-[#119197] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          View Protocol
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Emergency Hotline Banner */}
            <div className="mt-10 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <IconAlertTriangle size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base">Always Call Emergency Services First</h4>
                  <p className="text-red-100 text-xs sm:text-sm">
                    In any life-threatening emergency, dispatch emergency personnel immediately before or while administering first aid.
                  </p>
                </div>
              </div>
              <a
                href="tel:907"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-600 font-extrabold text-sm hover:bg-red-50 transition-colors shrink-0 shadow-xs"
              >
                <IconPhone size={16} /> Call 907 (Ethiopia)
              </a>
            </div>
          </>
        ) : (
          /* ════════════════════════════════════════════════════════════════
             DETAIL VIEW FOR SELECTED TOPIC
             ════════════════════════════════════════════════════════════════ */
          <div>
            {/* Back Button */}
            <button
              onClick={() => setSelectedId(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors mb-6 px-3 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to All Guides ({FIRST_AID_TOPICS.length})
            </button>

            <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-[#0c6e73] via-[#0f7d82] to-[#119197] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-white shrink-0 p-3 shadow-inner">
                  <TopicIcon id={selectedTopic.iconType} className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      {selectedTopic.title}
                    </h2>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        selectedTopic.severity === 'Critical'
                          ? 'bg-red-500/20 border-red-300 text-red-100'
                          : selectedTopic.severity === 'High'
                          ? 'bg-orange-500/20 border-orange-300 text-orange-100'
                          : 'bg-amber-500/20 border-amber-300 text-amber-100'
                      }`}
                    >
                      {selectedTopic.severity} Priority
                    </span>
                  </div>
                  <p className="text-teal-200 font-medium text-sm mb-3">{selectedTopic.amharic}</p>
                  <p className="text-white/95 text-xs sm:text-sm leading-relaxed max-w-4xl bg-white/5 p-3.5 rounded-xl border border-white/10">
                    {selectedTopic.overview}
                  </p>
                </div>
              </div>

              {/* 4 Tabs Bar */}
              <div className="flex border-b border-gray-200 bg-gray-50/80 overflow-x-auto">
                <button
                  onClick={() => setTab('steps')}
                  className={`flex-1 min-w-[130px] py-3.5 px-4 text-xs font-bold text-center transition-all cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                    tab === 'steps'
                      ? 'text-[#119197] border-[#119197] bg-white shadow-2xs'
                      : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Step-by-Step
                </button>

                <button
                  onClick={() => setTab('facts')}
                  className={`flex-1 min-w-[120px] py-3.5 px-4 text-xs font-bold text-center transition-all cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                    tab === 'facts'
                      ? 'text-[#119197] border-[#119197] bg-white shadow-2xs'
                      : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Facts ({selectedTopic.keyFacts.length})
                </button>

                <button
                  onClick={() => setTab('avoid')}
                  className={`flex-1 min-w-[120px] py-3.5 px-4 text-xs font-bold text-center transition-all cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                    tab === 'avoid'
                      ? 'text-red-600 border-red-600 bg-white shadow-2xs'
                      : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeLinecap="round" strokeWidth="2.5" d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                  Do NOT Do ({selectedTopic.doNot.length})
                </button>

                <button
                  onClick={() => setTab('visual')}
                  className={`flex-1 min-w-[130px] py-3.5 px-4 text-xs font-bold text-center transition-all cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                    tab === 'visual'
                      ? 'text-[#119197] border-[#119197] bg-white shadow-2xs'
                      : 'text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100/50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Visual Guide
                </button>
              </div>

              {/* Main Content Layout with Responsive Side Diagram */}
              <div className="p-6 sm:p-8 grid lg:grid-cols-[1fr_300px] gap-8 items-start">
                <div>
                  {/* TAB 1: Step-by-Step with Age Group Switcher */}
                  {tab === 'steps' && (
                    <div>
                      {/* Age Group Switcher Bar */}
                      <div className="mb-6 p-1.5 bg-gray-100 rounded-2xl flex items-center gap-1 max-w-xl">
                        <button
                          onClick={() => setAgeGroup('adults')}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            ageGroup === 'adults'
                              ? 'bg-white text-[#119197] shadow-xs'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Adults ({selectedTopic.steps.adults.length} Steps)
                        </button>

                        <button
                          onClick={() => setAgeGroup('children')}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            ageGroup === 'children'
                              ? 'bg-white text-[#119197] shadow-xs'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Children 1–8y ({selectedTopic.steps.children.length} Steps)
                        </button>

                        <button
                          onClick={() => setAgeGroup('infants')}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            ageGroup === 'infants'
                              ? 'bg-white text-[#119197] shadow-xs'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Infants &lt;1y ({selectedTopic.steps.infants.length} Steps)
                        </button>
                      </div>

                      {/* Steps List */}
                      <div className="flex flex-col gap-3.5">
                        {selectedTopic.steps[ageGroup].map((stepItem) => (
                          <div
                            key={stepItem.step}
                            className="flex items-start gap-4 p-4.5 bg-gray-50/70 rounded-2xl border border-gray-200/80 hover:border-[#119197]/40 hover:bg-white transition-all shadow-2xs"
                          >
                            <span className="w-8 h-8 rounded-xl bg-[#119197] text-white font-display font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                              {stepItem.step}
                            </span>
                            <div className="flex-1">
                              <h4 className="font-display font-bold text-gray-900 text-sm mb-1">
                                {stepItem.title}
                              </h4>
                              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                {stepItem.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Key Facts */}
                  {tab === 'facts' && (
                    <div>
                      <div className="mb-4">
                        <h4 className="font-display font-bold text-gray-900 text-base mb-1">
                          Crucial Clinical & Survival Facts
                        </h4>
                        <p className="text-xs text-gray-500">
                          Critical physiological timelines, survival probabilities, and emergency medical facts.
                        </p>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3.5">
                        {selectedTopic.keyFacts.map((fact, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-4 bg-teal-50/40 border border-teal-100 rounded-2xl"
                          >
                            <span className="w-6 h-6 rounded-lg bg-[#119197] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <p className="text-xs sm:text-sm text-teal-950 font-medium leading-relaxed">
                              {fact}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Do NOT Do */}
                  {tab === 'avoid' && (
                    <div>
                      <div className="mb-4">
                        <h4 className="font-display font-bold text-red-900 text-base mb-1">
                          Strict Medical Prohibitions (Never Do)
                        </h4>
                        <p className="text-xs text-red-600/80">
                          Common dangerous mistakes, folklore remedies, or contraindicated actions that cause further harm.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {selectedTopic.doNot.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3.5 p-4 bg-red-50/70 border border-red-200 rounded-2xl"
                          >
                            <span className="text-red-600 shrink-0 mt-0.5">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6" />
                              </svg>
                            </span>
                            <p className="text-xs sm:text-sm text-red-950 font-semibold leading-relaxed">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Visual Guide Specifications */}
                  {tab === 'visual' && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col items-center">
                        <h4 className="font-display font-bold text-gray-900 text-base mb-4">
                          Protocol Illustration & Mechanics
                        </h4>
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-2xs mb-3 w-full flex justify-center">
                          <TopicVisualDiagram id={selectedTopic.iconType} />
                        </div>
                      </div>

                      <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-2 text-blue-900 font-bold text-sm">
                          <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Visual Guide Specifications & Biomechanics
                        </div>
                        <p className="text-xs sm:text-sm text-blue-950 leading-relaxed">
                          {selectedTopic.visualSpecs}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side Visual Reference Card */}
                <div className="flex flex-col items-center lg:sticky lg:top-24">
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-3xl p-5 flex flex-col items-center shadow-2xs">
                    <div className="flex items-center justify-between w-full mb-3 px-1">
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Visual Reference
                      </span>
                      <span className="text-[10px] font-bold text-[#119197] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                        {selectedTopic.shortTitle}
                      </span>
                    </div>

                    <div className="bg-white rounded-2xl p-4 w-full flex justify-center border border-gray-100 shadow-2xs mb-3">
                      <TopicVisualDiagram id={selectedTopic.iconType} />
                    </div>

                    <button
                      onClick={() => setTab('visual')}
                      className="w-full py-2.5 px-4 bg-white border border-[#cceef0] hover:border-[#119197] hover:bg-teal-50/50 text-[#119197] font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                    >
                      Inspect Full Visual Specs →
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 text-center mt-3 max-w-[240px]">
                    Standardized first aid protocol guidelines. Always defer to certified emergency responders.
                  </p>
                </div>
              </div>

              {/* Bottom Emergency Action Bar */}
              <div className="px-6 sm:px-8 py-5 bg-teal-50/40 border-t border-[#cceef0] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <IconAlertTriangle size={16} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-red-800 font-bold">
                      Is the victim unresponsive or in life-threatening condition?
                    </p>
                    <p className="text-[11px] text-red-600">
                      Do not delay calling national emergency medical services.
                    </p>
                  </div>
                </div>
                <a
                  href="tel:907"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-extrabold transition-colors shrink-0 shadow-xs"
                >
                  <IconPhone size={15} /> Call 907 (Ethiopia)
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="py-8" />
    </main>
  );
}
