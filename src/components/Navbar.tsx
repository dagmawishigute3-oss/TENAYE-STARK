import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconGlobe, IconChevronDown, IconMenu, IconX } from './Icons';
import logoImg from '../imports/image-removebg-preview.png';

const NAV_LINKS = [
  { label: 'Home',           href: '/' },
  { label: 'About',          href: '/about' },
  { label: 'Contact',        href: '/contact' },
  { label: 'Emergency',      href: '/emergency' },
  { label: 'First Aid',      href: '/first-aid' },
  { label: 'Disease Library',href: '/diseases' },
  { label: 'Health Tips',    href: '/health-tips' },
];

const LANGUAGES = [
  { code: 'en', label: 'English',    flag: 'EN' },
  { code: 'am', label: 'አማርኛ',      flag: 'AM' },
  { code: 'om', label: 'Afan Oromo', flag: 'OM' },
  { code: 'ti', label: 'Tigrinya',   flag: 'TI' },
  { code: 'so', label: 'Somali',     flag: 'SO' },
];

export function Navbar() {
  const [open, setOpen]         = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang]         = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('tenaye_lang') : null;
    return LANGUAGES.find(l => l.code === saved) || LANGUAGES[0];
  });
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setOpen(false); setLangOpen(false); }, [location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-sm shadow-slate-200' : 'border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logoImg} alt="Tenaye logo" className="w-9 h-9 object-contain" />
          <div className="leading-none">
            <p className="font-logo text-[13px] leading-tight tracking-tight">
              <span className="text-white bg-[#119197] px-2 py-[2px] rounded-full">Ten</span>
              <span className="text-[#dc2626] ml-0.5">aye</span>
            </p>
            <p className="text-[9px] text-slate-400 font-medium tracking-wide mt-1">
              ጤናዬ &bull; Health Companion
            </p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                isActive(href)
                  ? 'text-[#119197] bg-[#e6f7f7]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Right: language + hamburger ── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Language picker */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <IconGlobe size={14} className="text-slate-400" />
              <span className="font-medium text-xs">{lang.flag}</span>
              <IconChevronDown size={12} className={`text-slate-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Language</p>
                </div>
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                      if (typeof window !== 'undefined') {
                        localStorage.setItem('tenaye_lang', l.code);
                        window.dispatchEvent(new CustomEvent('tenaye-lang-change', { detail: { lang: l.code } }));
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 ${
                      lang.code === l.code ? 'text-[#119197] bg-[#e6f7f7]' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">{l.flag}</span>
                      <span className={lang.code === l.code ? 'font-semibold' : ''}>{l.label}</span>
                    </div>
                    {lang.code === l.code && (
                      <svg className="w-3.5 h-3.5 text-[#119197]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setOpen(v => !v)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {open ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-0.5 shadow-lg">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? 'text-[#119197] bg-[#e6f7f7]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
