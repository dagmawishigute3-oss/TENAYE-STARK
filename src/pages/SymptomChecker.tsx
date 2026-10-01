import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ALL_DISEASES, DiseaseItem } from '../data/diseasesIndex';
import {
  IconActivity,
  IconSearch,
  IconCheck,
  IconAlertTriangle,
  IconChevronRight,
  IconPhone,
  IconX,
  IconStethoscope,
  IconFilter,
  IconBrain,
  IconHeart,
  IconThermometer,
  IconLungs,
  IconStomach,
  IconBone,
  IconSparkles,
  IconDroplet,
} from '../components/Icons';

// Group common symptoms into anatomical / clinical categories with professional SVG icons
const SYMPTOM_CATEGORIES = [
  {
    category: 'General & Whole Body',
    Icon: IconThermometer,
    symptoms: [
      'Fever',
      'Fatigue',
      'Chills',
      'Night sweats',
      'Unexplained weight loss',
      'Body aches',
      'Weakness',
      'Sweating',
    ],
  },
  {
    category: 'Head, Brain & Mental',
    Icon: IconBrain,
    symptoms: [
      'Headache',
      'Dizziness',
      'Confusion',
      'Blurred vision',
      'Lightheadedness',
      'Anxiety',
      'Depressed mood',
      'Loss of consciousness',
      'Memory loss',
    ],
  },
  {
    category: 'Respiratory & Chest',
    Icon: IconLungs,
    symptoms: [
      'Cough',
      'Shortness of breath',
      'Chest pain',
      'Wheezing',
      'Sore throat',
      'Nasal congestion',
      'Runny nose',
      'Rapid breathing',
      'Chest tightness',
    ],
  },
  {
    category: 'Digestive & Stomach',
    Icon: IconStomach,
    symptoms: [
      'Nausea',
      'Vomiting',
      'Abdominal pain',
      'Diarrhea',
      'Loss of appetite',
      'Constipation',
      'Heartburn',
      'Bloating',
      'Blood in stool',
    ],
  },
  {
    category: 'Cardiovascular & Blood',
    Icon: IconHeart,
    symptoms: [
      'Palpitations',
      'Rapid heart rate',
      'Swelling in legs or ankles',
      'Pale skin',
      'Flushing',
      'Easy bruising',
      'Cold hands or feet',
    ],
  },
  {
    category: 'Musculoskeletal & Joints',
    Icon: IconBone,
    symptoms: [
      'Joint pain',
      'Joint stiffness',
      'Muscle pain',
      'Back pain',
      'Neck stiffness',
      'Swollen joints',
      'Muscle weakness',
    ],
  },
  {
    category: 'Skin & Sensory',
    Icon: IconSparkles,
    symptoms: [
      'Skin rash',
      'Itching',
      'Hives',
      'Dry skin',
      'Jaundice (yellow skin/eyes)',
      'Loss of smell',
      'Loss of taste',
      'Ear pain',
    ],
  },
  {
    category: 'Urinary & Renal',
    Icon: IconDroplet,
    symptoms: [
      'Frequent urination',
      'Painful urination',
      'Excessive thirst',
      'Dark urine',
      'Blood in urine',
    ],
  },
];

interface MatchedDisease {
  disease: DiseaseItem;
  matchCount: number;
  matchedSymptoms: string[];
  totalSymptoms: number;
  matchScore: number;
}

export function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');

  // Toggle symptom selection
  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const clearAll = () => setSelectedSymptoms([]);

  // Flattened all distinct symptoms from presets
  const allPresetSymptoms = useMemo(() => {
    const set = new Set<string>();
    SYMPTOM_CATEGORIES.forEach((cat) => cat.symptoms.forEach((s) => set.add(s)));
    return Array.from(set);
  }, []);

  // Filtered symptoms based on search and selected category tab
  const displayedCategories = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    return SYMPTOM_CATEGORIES.map((cat) => {
      const filteredSymptoms = cat.symptoms.filter((sym) => {
        const matchesQuery = !q || sym.toLowerCase().includes(q);
        const matchesCategory =
          activeCategory === 'All' || cat.category === activeCategory;
        return matchesQuery && matchesCategory;
      });
      return {
        ...cat,
        symptoms: filteredSymptoms,
      };
    }).filter((cat) => cat.symptoms.length > 0);
  }, [searchFilter, activeCategory]);

  // Calculate matched diseases based on selected symptoms
  const matchedDiseases: MatchedDisease[] = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];

    const lowerSelected = selectedSymptoms.map((s) => s.toLowerCase());

    const results: MatchedDisease[] = [];

    ALL_DISEASES.forEach((disease) => {
      const diseaseSymptoms = disease.symptoms.map((s) => s.toLowerCase());
      const matched: string[] = [];

      lowerSelected.forEach((selected) => {
        // Match if the disease symptom text contains the symptom keyword or vice versa
        const found = diseaseSymptoms.some(
          (ds) => ds.includes(selected) || selected.includes(ds.replace(/[^a-z]/g, ''))
        );
        if (found) {
          matched.push(selected);
        }
      });

      if (matched.length > 0) {
        // Match score: prioritize higher matched count, weighted by proportion
        const score = (matched.length / selectedSymptoms.length) * 0.7 +
          (matched.length / Math.max(disease.symptoms.length, 1)) * 0.3;

        results.push({
          disease,
          matchCount: matched.length,
          matchedSymptoms: matched,
          totalSymptoms: disease.symptoms.length,
          matchScore: score,
        });
      }
    });

    // Sort by match count descending, then by match score
    return results
      .filter((r) => severityFilter === 'All' || r.disease.severity === severityFilter)
      .sort((a, b) => b.matchCount - a.matchCount || b.matchScore - a.matchScore);
  }, [selectedSymptoms, severityFilter]);

  return (
    <main className="pt-16 min-h-screen bg-slate-50">
      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-br from-[#0c6e73] via-[#119197] to-[#0e9fa6] text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-teal-100 text-xs font-semibold uppercase tracking-wider mb-3">
            <IconStethoscope size={15} /> Intelligent Health Triage
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
            Symptom Checker
          </h1>
          <p className="text-teal-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Select the symptoms or sensations you are currently experiencing. Our engine cross-references
            our verified library of {ALL_DISEASES.length} clinical conditions to guide you to potential matches.
          </p>

          {/* Quick Notice */}
          <div className="mt-4 max-w-xl mx-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-900/40 border border-teal-300/30 text-teal-50 text-xs text-left">
            <IconAlertTriangle size={16} className="text-amber-300 shrink-0" />
            <span>
              For educational guidance only. If experiencing severe chest pain, stroke signs, or severe trauma, call{' '}
              <a href="tel:907" className="underline font-bold text-white hover:text-amber-200">907</a> immediately.
            </span>
          </div>
        </div>
      </section>

      {/* ── Main Interactive Layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── LEFT COLUMN: Symptom Selector (7 cols) ── */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>1. Select Your Symptoms</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-[#119197] font-semibold border border-teal-200">
                    {selectedSymptoms.length} selected
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click on words to select or deselect symptoms.
                </p>
              </div>

              {selectedSymptoms.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 self-start sm:self-auto px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <IconX size={13} /> Clear all
                </button>
              )}
            </div>

            {/* Selected Symptoms Chips Bar */}
            {selectedSymptoms.length > 0 && (
              <div className="p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0c6e73]">
                  Active Selected Symptoms:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSymptoms.map((sym) => (
                    <button
                      key={sym}
                      onClick={() => toggleSymptom(sym)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#119197] text-white text-xs font-medium shadow-xs hover:bg-[#0c6e73] transition-all"
                    >
                      <span>{sym}</span>
                      <IconX size={12} className="opacity-80" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Input Filter */}
            <div className="relative">
              <IconSearch size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search symptom keywords (e.g., headache, fever, cough)..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#119197]/20 focus:border-[#119197] transition-all"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeCategory === 'All'
                    ? 'bg-[#119197] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Categories ({allPresetSymptoms.length})
              </button>
              {SYMPTOM_CATEGORIES.map((cat) => {
                const IconComponent = cat.Icon;
                return (
                  <button
                    key={cat.category}
                    onClick={() => setActiveCategory(cat.category)}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 transition-colors ${
                      activeCategory === cat.category
                        ? 'bg-[#119197] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <IconComponent size={13} className={activeCategory === cat.category ? 'text-white' : 'text-slate-500'} />
                    <span>{cat.category}</span>
                  </button>
                );
              })}
            </div>

            {/* Symptoms Word Cloud Groups */}
            <div className="space-y-4 pt-1">
              {displayedCategories.map((group) => {
                const GroupIcon = group.Icon;
                return (
                  <div key={group.category} className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <GroupIcon size={15} className="text-[#119197]" />
                      <span>{group.category}</span>
                      <span className="text-[10px] font-normal text-slate-400">
                        ({group.symptoms.length})
                      </span>
                    </div>
                  <div className="flex flex-wrap gap-2">
                    {group.symptoms.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <button
                          key={symptom}
                          onClick={() => toggleSymptom(symptom)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all text-left flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#e6f7f7] border-[#119197] text-[#0c6e73] font-semibold ring-1 ring-[#119197]/30 shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border text-[9px] ${
                              isSelected
                                ? 'bg-[#119197] text-white border-transparent'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <IconCheck size={9} />}
                          </span>
                          <span>{symptom}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

              {displayedCategories.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
                  No symptoms matching &ldquo;{searchFilter}&rdquo;. Try another term or clear the search.
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Matched Diseases Results (5 cols) ── */}
          <div className="lg:col-span-5 space-y-4 sticky top-20">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>2. Potential Matches</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      {matchedDiseases.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    From the Tenaye Disease Library
                  </p>
                </div>

                {/* Severity quick toggle */}
                {matchedDiseases.length > 0 && (
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="text-[11px] font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-600 focus:outline-none"
                  >
                    <option value="All">All Severities</option>
                    <option value="High">High Severity</option>
                    <option value="Medium">Moderate</option>
                    <option value="Low">Low</option>
                  </select>
                )}
              </div>

              {/* Empty State: No symptoms selected yet */}
              {selectedSymptoms.length === 0 && (
                <div className="text-center py-10 px-4 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto text-teal-600">
                    <IconActivity size={26} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                    No Symptoms Selected Yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Select one or more symptoms from the word list on the left to analyze matching diseases.
                  </p>
                  <div className="pt-2">
                    <span className="text-[11px] text-teal-700 bg-teal-50 px-3 py-1 rounded-full font-medium">
                      Tip: Choose 2-4 symptoms for more specific results
                    </span>
                  </div>
                </div>
              )}

              {/* Matched Disease Results List */}
              {selectedSymptoms.length > 0 && matchedDiseases.length > 0 && (
                <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                  <p className="text-xs text-slate-500">
                    Found <strong>{matchedDiseases.length}</strong> possible condition{matchedDiseases.length > 1 ? 's' : ''} correlated with your inputs:
                  </p>

                  {matchedDiseases.map(({ disease, matchCount, matchedSymptoms }) => {
                    const matchPercent = Math.round(
                      (matchCount / selectedSymptoms.length) * 100
                    );

                    return (
                      <div
                        key={disease.id}
                        className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-white hover:bg-teal-50/20 transition-all shadow-xs group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {disease.category}
                            </span>
                            <h4 className="font-bold text-slate-900 group-hover:text-[#0c6e73] transition-colors text-sm sm:text-base">
                              {disease.name}
                            </h4>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              disease.severity === 'High'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : disease.severity === 'Medium'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-green-50 text-green-700 border border-green-200'
                            }`}
                          >
                            {disease.severity} Severity
                          </span>
                        </div>

                        {/* Match Progress Bar */}
                        <div className="space-y-1 mb-2.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500 font-medium">
                              Symptom match: <strong className="text-slate-800">{matchCount} of {selectedSymptoms.length}</strong>
                            </span>
                            <span className="font-bold text-[#119197]">{matchPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#119197] to-teal-400 rounded-full"
                              style={{ width: `${Math.min(matchPercent, 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Description snippet */}
                        <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                          {disease.description || disease.desc}
                        </p>

                        {/* Matched tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {matchedSymptoms.map((ms) => (
                            <span
                              key={ms}
                              className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-[#0c6e73] font-medium border border-teal-200"
                            >
                              ✓ {ms}
                            </span>
                          ))}
                        </div>

                        {/* Direct Redirect to Disease Library Detail */}
                        <Link
                          to={`/diseases/${disease.id}`}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-teal-50 hover:bg-[#119197] text-[#0c6e73] hover:text-white text-xs font-bold transition-all border border-teal-200 hover:border-transparent"
                        >
                          <span>View Full Medical Details</span>
                          <IconChevronRight size={13} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* No match found */}
              {selectedSymptoms.length > 0 && matchedDiseases.length === 0 && (
                <div className="text-center py-8 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
                    <IconAlertTriangle size={20} />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    No Direct Condition Found
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    None of the diseases in the library matched all your selected filters. Try deselecting some symptoms or exploring our full library.
                  </p>
                  <Link
                    to="/diseases"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#119197] text-white text-xs font-bold rounded-lg hover:bg-[#0c6e73] transition-colors"
                  >
                    <span>Browse All {ALL_DISEASES.length} Diseases</span>
                    <IconChevronRight size={13} />
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Consultation Callout */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-600/30 flex items-center justify-center text-red-400 shrink-0">
                  <IconPhone size={14} />
                </div>
                <div>
                  <p className="text-xs font-bold">Unsure about your symptoms?</p>
                  <p className="text-[10px] text-slate-400">Speak directly to an emergency health triage center.</p>
                </div>
              </div>
              <Link
                to="/emergency"
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition-colors shrink-0"
              >
                Emergency
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
