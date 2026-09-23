import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconBook, IconSearch, IconGlobe, IconChevronDown, IconHeart, IconActivity, IconTarget, IconShield } from '../components/Icons';

const LANGUAGES = ['English', 'አማርኛ', 'Afan Oromo', 'Tigrinya', 'Somali', 'Spanish', 'French', 'German'];

interface Tip {
  icon: typeof IconHeart;
  title: string;
  desc: string;
  actions: string[];
  evidence: { source: string; year: string };
}

const GENERAL_TIPS: Tip[] = [
  {
    icon: IconActivity,
    title: 'Regular Health Check-ups',
    desc: 'Annual medical exams detect health issues early and establish baseline health metrics.',
    actions: [
      'Schedule yearly physical examination with primary doctor',
      'Get routine blood work to monitor key health indicators',
      'Discuss any health concerns or changes with your doctor',
      'Update your doctor on family medical history changes',
      'Keep a personal health log of symptoms and conditions',
    ],
    evidence: { source: 'American Academy of Family Physicians - Preventive Care Guidelines', year: '2023' },
  },
  {
    icon: IconHeart,
    title: 'Maintaining Healthy Weight',
    desc: 'Maintaining a healthy weight reduces risk of chronic diseases and improves quality of life.',
    actions: [
      'Calculate and monitor your BMI regularly',
      'Set realistic weight goals based on your body type',
      'Combine balanced nutrition with regular physical activity',
      'Track your food intake and physical activity',
      'Seek professional guidance if struggling with weight management',
    ],
    evidence: { source: 'National Institutes of Health - Healthy Weight Guidelines', year: '2023' },
  },
  {
    icon: IconBook,
    title: 'Safe Medication Use',
    desc: 'Proper medication management ensures effectiveness and prevents harmful interactions.',
    actions: [
      'Keep an updated list of all medications and supplements',
      'Take medications exactly as prescribed',
      'Never share prescription medications with others',
      'Store medications properly and check expiration dates',
      'Inform all healthcare providers of your medication list',
    ],
    evidence: { source: 'FDA - Safe Use of Medicines', year: '2023' },
  },
  {
    icon: IconShield,
    title: 'Managing Chronic Conditions',
    desc: 'Proactive management of chronic diseases prevents complications and improves outcomes.',
    actions: [
      'Follow your treatment plan consistently',
      'Monitor symptoms and track changes over time',
      'Attend all scheduled medical appointments',
      'Communicate openly with your healthcare team',
      'Join support groups for your specific condition',
    ],
    evidence: { source: 'CDC - Chronic Disease Prevention and Management', year: '2023' },
  },
];

function TipCard({ tip, category }: { tip: Tip; category: string }) {
  const Icon = tip.icon;
  return (
    <div className="bg-[#f0fafa] border border-[#cceef0] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={16} className="text-[#119197]" />
          <span className="text-xs font-semibold text-[#119197] bg-[#e6f7f7] px-2 py-0.5 rounded-full">{category}</span>
        </div>
        <h3 className="font-display font-bold text-[#0c6e73] text-base mb-2">{tip.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{tip.desc}</p>

        <div className="mb-4">
          <p className="font-display font-semibold text-[#0c6e73] text-xs mb-2">Action Steps:</p>
          <ul className="space-y-1.5">
            {tip.actions.map(a => (
              <li key={a} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#119197] shrink-0 mt-1.5" />{a}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[#cceef0] rounded-lg p-3">
          <p className="font-display font-semibold text-[#0c6e73] text-xs mb-1.5">Scientific Evidence:</p>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] text-gray-600"><span className="font-medium text-gray-700">Source:</span> {tip.evidence.source}</p>
              <p className="text-[10px] text-gray-500">Published: {tip.evidence.year}</p>
            </div>
            <button className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-200 bg-white text-[10px] text-gray-600 hover:border-[#119197] hover:text-[#119197] transition-colors shrink-0 whitespace-nowrap">
              ↗ View Source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HealthTips() {
  const [query, setQuery] = useState('');
  const [lang, setLang] = useState('English');
  const [langOpen, setLangOpen] = useState(false);
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      {/* Red hero banner */}
      <div className="bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <div className="inline-flex w-12 h-12 rounded-xl bg-white/20 items-center justify-center mx-auto mb-4">
            <IconBook size={24} className="text-white" />
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white mb-2">Health Tips &amp; Wellness Guide</h1>
          <p className="text-teal-100 text-sm mb-8 max-w-lg mx-auto">
            {GENERAL_TIPS.length} evidence-based health tips in General Health — expert reviewed and backed by scientific research and medical expertise
          </p>

          {/* Search + Language */}
          <div className="flex gap-3 max-w-2xl mx-auto">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3">
              <IconSearch size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search health tips…"
                className="flex-1 text-gray-800 text-sm placeholder-gray-400 outline-none bg-transparent"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setLangOpen(v => !v)}
                className="h-full flex items-center gap-2 bg-white rounded-xl px-4 text-gray-700 text-sm font-medium whitespace-nowrap hover:bg-gray-50 transition-colors"
              >
                <IconGlobe size={15} className="text-gray-400" />
                {lang}
                <IconChevronDown size={13} className={`text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-30">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500">Select Language</p>
                    <button onClick={() => setLangOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                      <span className="text-xs">✕</span>
                    </button>
                  </div>
                  {LANGUAGES.map(l => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${lang === l ? 'text-[#119197] font-semibold' : 'text-gray-700'}`}
                    >
                      {l}
                      {lang === l && <span className="text-[#119197] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* General Health section */}
        <div ref={ref1} className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#e6f7f7] flex items-center justify-center">
              <IconTarget size={18} className="text-[#119197]" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-[#119197]">General Health</h2>
              <p className="text-xs text-gray-500">Fundamental health practices for overall wellness and disease prevention</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {GENERAL_TIPS.map(tip => (
              <TipCard key={tip.title} tip={tip} category="General Health" />
            ))}
          </div>
        </div>

        {/* References */}
        <div ref={ref2} className="bg-[#f0fafa] border border-[#cceef0] rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <IconBook size={15} className="text-[#119197]" />
            <h3 className="font-display font-bold text-[#0c6e73] text-sm">References & Evidence</h3>
          </div>
          <p className="text-xs text-gray-500 mb-5">All {GENERAL_TIPS.length} health tips in General Health are based on peer-reviewed research and medical guidelines from trusted sources</p>
          <div className="grid sm:grid-cols-2 gap-6 mb-4">
            <div>
              <p className="font-display font-semibold text-gray-700 text-xs mb-2">Medical Sources:</p>
              <ul className="space-y-1">
                {['CDC, WHO, FDA, EPA, FEMA', 'American Heart Association', 'American Academy of Pediatrics', 'National Sleep Foundation', 'Mayo Clinic & Red Cross'].map(s => (
                  <li key={s} className="text-xs text-gray-500 flex gap-2"><span className="text-[#119197] shrink-0">•</span>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display font-semibold text-gray-700 text-xs mb-2">Research Journals:</p>
              <ul className="space-y-1">
                {['JAMA Internal Medicine', 'American Journal of Clinical Nutrition', 'Sports Medicine & Neurology', 'Environmental Health Perspectives', 'Circulation & The Lancet'].map(s => (
                  <li key={s} className="text-xs text-gray-500 flex gap-2"><span className="text-[#119197] shrink-0">•</span>{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white border border-amber-100 rounded-lg p-3">
            <p className="text-[10px] text-amber-700 leading-relaxed">
              <span className="font-semibold">Disclaimer:</span> The information provided is for educational purposes only and should not replace professional medical advice. Always consult qualified healthcare providers for personalized medical guidance.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div ref={ref3} className="rounded-2xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white p-10 text-center">
          <h3 className="font-display font-extrabold text-2xl mb-2">Need Personalized Health Advice?</h3>
          <p className="text-teal-100 text-sm mb-6">Connect with our healthcare professionals for personalized guidance and support</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#119197] font-bold text-sm hover:bg-[#e6f7f7] transition-colors cursor-pointer"
            >
              <IconHeart size={16} /> Contact Health Team
            </Link>
            <Link to="/diseases" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors">
              <IconBook size={16} /> Browse Disease Library
            </Link>
          </div>
        </div>
      </div>
      <div className="py-6" />
    </main>
  );
}
