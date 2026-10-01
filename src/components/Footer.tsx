import { Link } from 'react-router-dom';
import logoImg from '../imports/image-removebg-preview.png';

const QUICK_LINKS = [
  { label: 'Home',            href: '/' },
  { label: 'About',           href: '/about' },
  { label: 'Contact',         href: '/contact' },
  { label: 'Disease Library', href: '/diseases' },
  { label: 'First Aid',       href: '/first-aid' },
  { label: 'Health Tips',     href: '/health-tips' },
  { label: 'Symptom Checker', href: '/symptoms' },
  { label: 'Emergency',       href: '/emergency' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy',     href: '/privacy' },
  { label: 'Terms of Service',   href: '/terms' },
  { label: 'Medical Disclaimer', href: '/disclaimer' },
  { label: 'Accessibility',      href: '/accessibility' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">

      {/* ── Main body ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3 notranslate" translate="no">
              <img src={logoImg} alt="Tenaye" className="w-8 h-8 object-contain notranslate" translate="no" />
              <p className="font-logo text-sm leading-tight notranslate" translate="no">
                <span className="text-white bg-[#119197] px-2 py-[2px] rounded-full notranslate" translate="no">Ten</span>
                <span className="text-[#dc2626] ml-0.5 notranslate" translate="no">aye</span>
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Reliable health information, emergency guidance, and wellness resources for the Ethiopian community.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#119197] animate-pulse shrink-0" />
              <span className="text-xs text-slate-500">
                Support: <a href="tel:+251900000000" className="hover:text-slate-300 transition-colors">+251 900 000 000</a>
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Navigation</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {QUICK_LINKS.map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-xs text-slate-500 hover:text-[#119197] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Legal</p>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(l => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-xs text-slate-500 hover:text-teal-400 transition-colors block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-slate-800 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-slate-600">
            &copy; {new Date().getFullYear()} <span className="notranslate" translate="no">Tenaye</span> Health Platform &middot; Addis Ababa, Ethiopia
          </p>
          <p className="text-[10px] text-slate-700 text-center max-w-md">
            <span className="text-slate-500 font-medium">Disclaimer:</span>{' '}
            For educational purposes only. Not a substitute for professional medical advice. Always consult a qualified healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  );
}
