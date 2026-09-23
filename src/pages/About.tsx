import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconHeart, IconShield, IconUsers, IconGlobe, IconTrendingUp, IconClock, IconCheck, IconEye, IconTarget } from '../components/Icons';

const STATS = [
  { value: '2M+', label: 'Patients Served', color: 'text-[#119197]' },
  { value: '500+', label: 'Healthcare Professionals', color: 'text-[#119197]' },
  { value: '50+', label: 'Countries Reached', color: 'text-[#119197]' },
  { value: '98%', label: 'Patient Satisfaction', color: 'text-[#119197]' },
];

const VALUES = [
  { icon: IconHeart, title: 'Compassionate Care', desc: 'We believe healthcare should be delivered with empathy, understanding, and genuine concern for every individual.' },
  { icon: IconShield, title: 'Trust & Reliability', desc: 'We maintain the highest standards of medical accuracy and data security to earn and keep your trust.' },
  { icon: IconUsers, title: 'Accessibility for All', desc: 'Quality healthcare information should be available to everyone, regardless of background or location.' },
  { icon: IconGlobe, title: 'Global Reach', desc: 'Our solutions are designed to serve a diverse global audience, ensuring healthcare access worldwide.' },
  { icon: IconTrendingUp, title: 'Continuous Improvement', desc: 'We are committed to ongoing innovation and improvement to meet the evolving needs of our patients.' },
  { icon: IconClock, title: 'Efficiency', desc: 'Our systems are optimized for speed and efficiency, providing quick access to healthcare information.' },
  { icon: IconCheck, title: 'Quality Assurance', desc: 'We implement rigorous quality control measures to ensure the accuracy and reliability of our content.' },
  { icon: IconShield, title: 'Evidence-Based', desc: 'All our recommendations and content are based on the latest medical research and best practices.' },
];

const TEAM = [
  { name: 'Yonatan Muluken', role: 'Founder & Lead Architect', initials: 'Y', color: 'bg-[#119197]', desc: 'Designed the complete website architecture, developed the full platform, and led the technical engineering of the project.' },
  { name: 'Nahom Tibebu', role: 'Founder & Medical Data Lead', initials: 'N', color: 'bg-[#119197]', desc: 'Manages medical data acquisition and verification. Compiled comprehensive disease information for the medical reference library.' },
  { name: 'Dagmawi Shigute', role: 'Founder & Clinical Research Lead', initials: 'D', color: 'bg-[#119197]', desc: 'Conducts medical research and content organization. Ensures accuracy and accessibility of patient education materials.' },
  { name: 'Ayub Ebrahim', role: 'Founder & Quality Assurance Lead', initials: 'A', color: 'bg-[#119197]', desc: 'Oversees data quality assurance and medical content validation. Maintains information integrity across the platform.' },
];

export function About() {
  const ref1 = useScrollReveal();
  const ref2 = useScrollReveal();
  const ref3 = useScrollReveal();
  const ref4 = useScrollReveal();
  const ref5 = useScrollReveal();

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            Transforming Healthcare<br />Through Innovation
          </h1>
          <p className="text-teal-100 max-w-2xl mx-auto leading-relaxed">
            At Tenaye, we're dedicated to making quality healthcare accessible, understandable, and actionable for everyone. Our mission is to empower individuals with the knowledge and tools they need to make informed health decisions.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Stats */}
        <div ref={ref1} className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-12">
          {STATS.map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <p className={`font-display font-extrabold text-3xl ${s.color} mb-1`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div ref={ref2} className="grid sm:grid-cols-2 gap-5 mb-12">
          <div className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#e6f7f7] flex items-center justify-center">
                <IconTarget size={16} className="text-[#119197]" />
              </div>
              <h2 className="font-display font-bold text-[#119197] text-base">Our Mission</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              To democratize healthcare by providing accurate, accessible, and actionable health information. We bridge the gap between complex medical knowledge and everyday health decisions, empowering individuals to take control of their health journey with confidence.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-7 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#e6f7f7] flex items-center justify-center">
                <IconEye size={16} className="text-[#119197]" />
              </div>
              <h2 className="font-display font-bold text-[#119197] text-base">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              A world where everyone has access to personalized, high-quality healthcare guidance. We envision a future where technology and human expertise work together to create healthier communities and improve quality of life for all.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div ref={ref3} className="mb-12">
          <h2 className="font-display font-extrabold text-3xl text-center text-gray-900 mb-2">Our Core Values</h2>
          <p className="text-center text-gray-500 text-sm mb-10">These principles guide everything we do and shape how we serve our community</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all">
                <Icon size={24} className="text-[#119197] mb-3" />
                <h3 className="font-display font-bold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div ref={ref4} className="mb-12">
          <h2 className="font-display font-extrabold text-3xl text-center text-gray-900 mb-2">Meet Our Founding Team</h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            The passionate team behind Tenaye — bringing together expertise in technology, data collection, and healthcare innovation
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(m => (
              <div key={m.name} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full ${m.color} flex items-center justify-center text-white font-display font-extrabold text-2xl mb-4`}>
                  {m.initials}
                </div>
                <h3 className="font-display font-bold text-gray-900 text-sm mb-1">{m.name}</h3>
                <p className="text-[11px] text-[#119197] font-semibold mb-4">{m.role}</p>
                <div className="flex justify-center gap-2">
                  {/* Twitter/X */}
                  <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-500 flex items-center justify-center transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
                  </button>
                  {/* LinkedIn */}
                  <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-500 flex items-center justify-center transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </button>
                  {/* GitHub */}
                  <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-800 hover:text-white text-gray-500 flex items-center justify-center transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  </button>
                  {/* Email */}
                  <button className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-[#119197] hover:text-white text-gray-500 flex items-center justify-center transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div ref={ref5} className="rounded-2xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white p-10 text-center">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-2">Join Our Health Community</h3>
          <p className="text-teal-100 text-sm mb-6">Be part of a community that's committed to better health outcomes for everyone</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#119197] font-bold text-sm hover:bg-[#e6f7f7] transition-colors">
              <IconHeart size={16} /> Join Now
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 border-white text-white font-bold text-sm hover:bg-white/10 transition-colors">
              Explore Services
            </button>
          </div>
        </div>
      </div>
      <div className="py-8" />
    </main>
  );
}
