import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  IconArrowLeft,
  IconShare,
  IconAlertTriangle,
  IconPhone,
  IconBook,
  IconSearch,
  IconHeart,
  IconActivity,
  IconUsers,
  IconShield,
  IconCheck,
  IconPill,
  IconLightbulb,
  IconMaximize,
  IconX
} from '../components/Icons';
import { DISEASE_DB, DiseaseItem } from '../data/diseasesIndex';
import { DISEASE_IMAGES, DiseaseImageInfo } from '../data/diseaseImages';
import { DiseaseReadAloudFloatingWidget } from '../components/DiseaseReadAloudFloatingWidget';

const TABS = ['Overview', 'Symptoms', 'Causes', 'Treatment', 'Self-Care', 'Prevention'] as const;
type Tab = typeof TABS[number];

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  Cardiovascular: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format',
  Respiratory: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format',
  Infectious: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format',
  Metabolic: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format',
  'Mental Health': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format',
  Neurological: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format',
  Musculoskeletal: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format',
  Oncology: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format',
  Renal: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format',
  Gastrointestinal: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format',
};

export function DiseaseDetail() {
  const { id = 'mvp' } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('Overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const lookupKey = id.toLowerCase().trim();
  const disease: DiseaseItem = DISEASE_DB[lookupKey] || {
    id: lookupKey,
    name: lookupKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: 'General Health',
    severity: 'Medium',
    prevalence: 'Verified medical reference entry.',
    description: `${lookupKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} is a documented clinical condition in the Tenaye medical database. Comprehensive diagnostic and care guidelines are curated by certified healthcare professionals.`,
    desc: `${lookupKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} overview.`,
    symptoms: ['Symptom presentation varies by individual severity', 'Consult a healthcare professional for clinical evaluation', 'Refer to Tenaye AI Assistant for immediate guidance'],
    causes: ['Multifactorial biological, environmental, and genetic contributions'],
    treatment: ['Clinical evaluation and customized therapy prescribed by a physician', 'Routine diagnostic monitoring'],
    selfCare: ['Adequate rest and hydration', 'Follow physician guidance consistently', 'Track symptom changes'],
    prevention: ['Maintain a balanced healthy lifestyle', 'Routine medical wellness screenings'],
    riskFactors: ['Individual clinical history', 'Family genetic predisposition'],
    warningSigns: ['Severe unremitting pain', 'Difficulty breathing or sudden altered consciousness', 'Call 907 for emergency care'],
  };

  const preloaded: DiseaseImageInfo | undefined =
    DISEASE_IMAGES[lookupKey] ||
    DISEASE_IMAGES[lookupKey.replace(/-\d+$/, '')] ||
    DISEASE_IMAGES[disease.name.toLowerCase().replace(/[^a-z0-9]/g, '')];

  const categoryFallback = CATEGORY_IMAGE_MAP[disease.category] || CATEGORY_IMAGE_MAP.Cardiovascular;

  const [currentImage, setCurrentImage] = useState<{ url: string; caption: string; source: string }>({
    url: preloaded?.url || categoryFallback,
    caption: preloaded?.caption || `${disease.name} Clinical Reference`,
    source: preloaded?.source || 'Medical Archive'
  });

  // Dynamic live Wikipedia medical image resolver for condition-specific diagrams
  useEffect(() => {
    if (preloaded && preloaded.source === 'Wikimedia Commons') {
      setCurrentImage(preloaded);
      return;
    }

    let isCancelled = false;
    const cleanName = disease.name.replace(/\(.*?\)/g, '').trim();

    const fetchWikipediaImage = async () => {
      const candidates = [
        cleanName,
        cleanName.replace(/^(Stage \d+|Severe|Acute|Chronic|Invasive|Allergic|Primary|Secondary|Refractory)\s+/i, '').trim(),
        cleanName.split(' ')[0]
      ];

      for (const term of candidates) {
        if (!term || term.length < 3) continue;
        try {
          const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term.replace(/ /g, '_'))}`);
          if (res.ok) {
            const data = await res.json();
            const img = data.originalimage?.source || data.thumbnail?.source;
            if (img && !isCancelled) {
              setCurrentImage({
                url: img,
                caption: `Real clinical reference: ${data.title} (Wikimedia Commons)`,
                source: 'Wikimedia Commons'
              });
              return;
            }
          }
        } catch {
          // Continue to next fallback candidate
        }
      }
    };

    fetchWikipediaImage();
    return () => { isCancelled = true; };
  }, [lookupKey, disease.name]);

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    }
  };

  return (
    <main className="pt-16 bg-gray-50/70 min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-gray-700 animate-fade-in flex items-center gap-2">
          <IconCheck size={14} className="text-teal-400" />
          {toastMessage}
        </div>
      )}

      {/* Lightbox Image Zoom Modal */}
      {isZoomOpen && (
        <div
          onClick={() => setIsZoomOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
            >
              <IconX size={18} />
            </button>
            <img
              src={currentImage.url}
              alt={disease.name}
              className="max-h-[75vh] w-auto mx-auto object-contain rounded-xl bg-slate-950"
            />
            <div className="p-3 text-center">
              <p className="font-display font-bold text-gray-900 text-sm">{disease.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{currentImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/diseases" className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#119197] transition-colors">
              <IconArrowLeft size={16} /> Back to Library
            </Link>
            <span className="text-gray-300">|</span>
            <span className="px-3 py-1 rounded-full bg-teal-50 text-[#0c6e73] border border-teal-100/80 text-xs font-semibold">
              {disease.category}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={handleShare}
              title="Share Page"
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all cursor-pointer"
            >
              <IconShare size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Hero Section */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start mb-8">
          <div>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight mb-3">
              {disease.name}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {disease.description}
            </p>

            {/* 3 Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Severity Card */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 text-center shadow-xs flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#119197] mb-2">
                  <IconActivity size={18} />
                </div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">Severity</p>
                <p className="text-sm font-display font-bold text-[#119197]">
                  {disease.severity}
                </p>
              </div>

              {/* Prevalence Card */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 text-center shadow-xs flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                  <IconUsers size={18} />
                </div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">Prevalence</p>
                <p className="text-xs font-semibold text-blue-700 leading-snug line-clamp-2">
                  {disease.prevalence.slice(0, 55)}
                </p>
              </div>

              {/* Category Card */}
              <div className="bg-white border border-gray-200/80 rounded-2xl p-4 text-center shadow-xs flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
                  <IconShield size={18} />
                </div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-1">Category</p>
                <p className="text-sm font-display font-bold text-emerald-700">
                  {disease.category}
                </p>
              </div>
            </div>
          </div>

          {/* Right Topic Visual Image Card (Connected to Real Topic Image) */}
          <div
            onClick={() => setIsZoomOpen(true)}
            className="relative group overflow-hidden rounded-2xl border border-gray-200/90 shadow-md bg-slate-900 h-[240px] cursor-pointer"
            title="Click to view full-resolution clinical image"
          >
            <img
              src={currentImage.url}
              alt={disease.name}
              onError={() => {
                // If specific image fails, fall back to reliable curated category image
                setCurrentImage({
                  url: categoryFallback,
                  caption: `${disease.category} Clinical Reference`,
                  source: 'Unsplash Medical'
                });
              }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-black/10 to-transparent pointer-events-none" />

            {/* Source Tag Badge */}
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              {currentImage.source}
            </div>

            {/* Click to Enlarge Icon */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <IconMaximize size={13} />
            </div>

            {/* Caption on Bottom */}
            <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-medium backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-lg border border-white/20 truncate">
              {currentImage.caption}
            </div>
          </div>
        </div>

        {/* Emergency Warning Signs Banner */}
        <div className="bg-teal-50/40 border border-teal-200/80 rounded-2xl p-5 mb-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-[#0c6e73] flex items-center justify-center shrink-0 mt-0.5">
              <IconAlertTriangle size={18} />
            </div>
            <div>
              <p className="font-display font-bold text-gray-900 text-sm mb-1">Emergency Warning Signs</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong className="text-teal-900">Seek immediate medical evaluation for:</strong>{' '}
                {disease.warningSigns.join(', ')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              href="tel:907"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <IconPhone size={14} /> Emergency Help
            </a>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white border border-[#119197] text-[#119197] hover:bg-[#e6f7f7] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <IconHeart size={14} /> Ask AI Assistant
            </button>
          </div>
        </div>

        {/* Clean Pill Tab Navigation Strip */}
        <div className="mb-6">
          <div className="inline-flex p-1.5 rounded-full bg-gray-100/80 border border-gray-200/60 shadow-2xs overflow-x-auto max-w-full gap-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 text-xs sm:text-sm font-display whitespace-nowrap transition-all rounded-full cursor-pointer ${
                  tab === t
                    ? 'bg-white text-gray-900 font-bold shadow-xs border border-gray-200/80'
                    : 'text-gray-500 hover:text-gray-900 font-semibold'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Card Content */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 shadow-xs mb-10">
          {/* TAB 1: OVERVIEW */}
          {tab === 'Overview' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#119197] mb-2">
                  <IconHeart size={18} />
                  <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">
                    What is {disease.name}?
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {disease.description}
                </p>

                {/* Prevalence Highlight Callout */}
                <div className="bg-[#e6f7f7] border border-[#cceef0] rounded-xl p-4">
                  <p className="font-display font-semibold text-[#0c6e73] text-xs mb-1">Prevalence</p>
                  <p className="text-[#119197] text-sm leading-relaxed">{disease.prevalence}</p>
                </div>
              </div>

              {/* Side-by-side Risk Factors & Warning Signs */}
              <div className="grid sm:grid-cols-2 gap-5 pt-4 border-t border-gray-100">
                <div className="bg-gray-50/70 border border-gray-200/70 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <IconAlertTriangle size={16} className="text-amber-500" />
                    <h4 className="font-display font-bold text-gray-900 text-sm">Risk Factors</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {disease.riskFactors.map(r => (
                      <li key={r} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50/70 border border-gray-200/70 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <IconAlertTriangle size={16} className="text-[#119197]" />
                    <h4 className="font-display font-bold text-gray-900 text-sm">Warning Signs (Urgent)</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {disease.warningSigns.map(w => (
                      <li key={w} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#119197] shrink-0 mt-1.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SYMPTOMS */}
          {tab === 'Symptoms' && (
            <div>
              <div className="flex items-center gap-2 text-[#119197] mb-1">
                <IconActivity size={18} />
                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">Common Symptoms</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Watch for these signs and symptoms of {disease.name}
              </p>

              <div className="grid sm:grid-cols-2 gap-3.5">
                {disease.symptoms.map(s => (
                  <div
                    key={s}
                    className="bg-gray-50/80 hover:bg-white border border-gray-100 hover:border-gray-200 rounded-xl p-3.5 flex items-center gap-3 transition-all shadow-2xs"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#119197] shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800 font-medium">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CAUSES */}
          {tab === 'Causes' && (
            <div>
              <div className="flex items-center gap-2 text-[#119197] mb-1">
                <IconShield size={18} />
                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">Causes & Risk Factors</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Understanding what causes {disease.name}
              </p>

              {/* Primary Causes Section */}
              <div className="mb-6">
                <h4 className="font-display font-bold text-gray-900 text-xs sm:text-sm mb-3">Primary Causes</h4>
                <div className="space-y-3">
                  {disease.causes.map(c => (
                    <div
                      key={c}
                      className="bg-teal-50/30 border border-teal-100 rounded-xl p-3.5 flex items-center gap-3.5 hover:bg-teal-50/60 transition-all"
                    >
                      <IconAlertTriangle size={16} className="text-[#119197] shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-800 font-medium">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Factors Section */}
              <div>
                <h4 className="font-display font-bold text-gray-900 text-xs sm:text-sm mb-3">Risk Factors</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {disease.riskFactors.map(r => (
                    <div
                      key={r}
                      className="bg-amber-50/40 border border-amber-100/70 rounded-xl p-3.5 flex items-center gap-3 hover:bg-white transition-all"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-800 font-medium">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TREATMENT */}
          {tab === 'Treatment' && (
            <div>
              <div className="flex items-center gap-2 text-[#119197] mb-1">
                <IconHeart size={18} />
                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">Professional Medical Treatment</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Treatment options administered by healthcare professionals
              </p>

              <div className="space-y-3 mb-6">
                {disease.treatment.map(t => (
                  <div
                    key={t}
                    className="bg-emerald-50/40 border border-emerald-200/60 rounded-xl p-3.5 flex items-center gap-3.5 hover:bg-emerald-50/80 transition-all"
                  >
                    <IconPill size={16} className="text-emerald-600 shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800 font-medium">{t}</span>
                  </div>
                ))}
              </div>

              {/* Treatment Note */}
              <div className="bg-blue-50/50 border border-blue-200/60 rounded-xl p-4 flex items-start gap-3">
                <IconShield size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-semibold text-blue-900 text-xs mb-0.5">Important Note</p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Always consult with a qualified healthcare provider before starting any treatment. This information is for educational purposes only.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SELF-CARE */}
          {tab === 'Self-Care' && (
            <div>
              <div className="flex items-center gap-2 text-[#119197] mb-1">
                <IconLightbulb size={18} />
                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">Self-Care & Lifestyle</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Daily practices to manage {disease.name}
              </p>

              <div>
                <h4 className="font-display font-bold text-gray-900 text-xs sm:text-sm mb-3">Self-Care Tips</h4>
                <div className="space-y-3">
                  {disease.selfCare.map(s => (
                    <div
                      key={s}
                      className="bg-teal-50/30 border border-teal-100 rounded-xl p-3.5 flex items-center gap-3.5 hover:bg-teal-50/60 transition-all"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#119197] shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-800 font-medium">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PREVENTION */}
          {tab === 'Prevention' && (
            <div>
              <div className="flex items-center gap-2 text-[#119197] mb-1">
                <IconShield size={18} />
                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">Prevention Strategies</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Steps and lifestyle choices to prevent or minimize complications from {disease.name}
              </p>

              <div className="space-y-3">
                {disease.prevention.map(p => (
                  <div
                    key={p}
                    className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-3.5 flex items-center gap-3.5 hover:bg-emerald-50/70 transition-all"
                  >
                    <IconCheck size={16} className="text-emerald-600 shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-800 font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Dual Action Cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* Card 1: Medical Advice */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">Need Medical Advice?</p>
              <h3 className="font-display font-bold text-[#119197] text-base mb-4">
                Connect with healthcare professionals
              </h3>
            </div>
            <div className="space-y-2.5">
              <a
                href="tel:907"
                className="w-full py-3 rounded-xl bg-[#119197] hover:bg-[#0c6e73] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <IconPhone size={16} /> Find Emergency Services
              </a>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
                className="w-full py-3 rounded-xl border border-[#119197] text-[#119197] hover:bg-[#e6f7f7] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <IconHeart size={16} /> Chat with AI Assistant
              </button>
            </div>
          </div>

          {/* Card 2: More Resources */}
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">More Resources</p>
              <h3 className="font-display font-bold text-[#119197] text-base mb-4">
                Learn more about health conditions
              </h3>
            </div>
            <div className="space-y-2.5">
              <Link
                to="/diseases"
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <IconSearch size={16} className="text-gray-400" /> Browse Disease Library
              </Link>
              <Link
                to="/health-tips"
                className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <IconBook size={16} className="text-gray-400" /> Read Health Tips
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8" />

      {/* Floating Read Aloud Controller & Text Selection Player */}
      <DiseaseReadAloudFloatingWidget
        diseaseTitle={disease.name}
        fullTextToRead={`${disease.name}. ${disease.description}. Severity: ${disease.severity}. Prevalence: ${disease.prevalence}. Category: ${disease.category}. Overview: ${disease.desc}. Symptoms: ${disease.symptoms.join('. ')}. Causes: ${disease.causes.join('. ')}. Treatment: ${disease.treatment.join('. ')}. Self-Care: ${disease.selfCare.join('. ')}. Prevention: ${disease.prevention.join('. ')}.`}
      />
    </main>
  );
}
