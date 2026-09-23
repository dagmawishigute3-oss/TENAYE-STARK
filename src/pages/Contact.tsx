import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { IconMail, IconMapPin, IconPhone, IconGithub, IconClock, IconSend } from '../components/Icons';

const CONTACT_INFO = [
  { icon: IconMapPin, label: 'Location', value: 'Addis Ababa, Ethiopia', sub: 'Healthcare Innovation District' },
  { icon: IconMail, label: 'Email', value: 'team@tenaye.health', sub: 'We respond within 24 hours' },
  { icon: IconGithub, label: 'GitHub', value: 'github.com/tenaye-health', sub: 'Open source contributions welcome' },
  { icon: IconPhone, label: 'Emergency', value: '+251 900 000 000', sub: '24/7 emergency line' },
  { icon: IconClock, label: 'Office Hours', value: 'Mon – Fri, 8AM – 6PM', sub: 'East Africa Time (EAT)' },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const ref = useScrollReveal();

  useEffect(() => {
    const pending = (window as any).__pendingContactFill;
    if (pending) {
      setForm(f => ({
        name: pending.name ?? f.name,
        email: pending.email ?? f.email,
        subject: pending.subject ?? f.subject,
        message: pending.message ?? f.message,
      }));
      delete (window as any).__pendingContactFill;
    }

    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ name?: string; email?: string; subject?: string; message?: string }>;
      if (ce.detail) {
        setForm(f => ({
          name: ce.detail.name ?? f.name,
          email: ce.detail.email ?? f.email,
          subject: ce.detail.subject ?? f.subject,
          message: ce.detail.message ?? f.message,
        }));
      }
    };
    window.addEventListener('tenaye-fill-contact', handler);
    return () => window.removeEventListener('tenaye-fill-contact', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0c6e73] to-[#119197] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h1 className="font-display font-extrabold text-4xl text-white mb-2">Get in Touch</h1>
          <p className="text-teal-100">Questions, feedback, or partnership inquiries — we'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div ref={ref} className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Contact info */}
          <div className="flex flex-col gap-4">
            {CONTACT_INFO.map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#e6f7f7] flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#119197]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                  <p className="font-display font-semibold text-gray-900 text-sm">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}

            {/* GitHub CTA */}
            <div className="bg-gray-900 rounded-xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3">
                <IconGithub size={20} className="text-white" />
                <h3 className="font-display font-bold text-sm">Open Source</h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Tenaye is open source. Contribute to the codebase, report issues, or star the repository on GitHub.
              </p>
              <a
                href="https://github.com/tenaye-health"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 text-xs font-bold hover:bg-gray-100 transition-colors"
              >
                <IconGithub size={14} /> View on GitHub
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-gray-900 text-xl">Message sent!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="text-[#119197] text-sm font-medium hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display font-bold text-gray-900 text-xl mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                      <input
                        required type="text"
                        placeholder="Abebe Girma"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#119197] focus:ring-2 focus:ring-[#e6f7f7] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                      <input
                        required type="email"
                        placeholder="abebe@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#119197] focus:ring-2 focus:ring-[#e6f7f7] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subject</label>
                    <input
                      required type="text"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#119197] focus:ring-2 focus:ring-[#e6f7f7] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message</label>
                    <textarea
                      required rows={5}
                      placeholder="Tell us about your inquiry…"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#119197] focus:ring-2 focus:ring-[#e6f7f7] transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#119197] hover:bg-[#0c6e73] text-white font-display font-bold text-sm transition-colors"
                  >
                    <IconSend size={16} /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="py-8" />
    </main>
  );
}
