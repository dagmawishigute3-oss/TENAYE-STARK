import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import {
  IconShield,
  IconCheck,
  IconPhone,
  IconActivity,
  IconArrowLeft,
  IconUsers,
} from "../components/Icons"

export type LegalTab = "privacy" | "terms" | "disclaimer" | "accessibility"

const TABS: { id: LegalTab; label: string; icon: any; summary: string }[] = [
  {
    id: "privacy",
    label: "Privacy Policy",
    icon: IconShield,
    summary:
      "How we collect, store, and fiercely protect your personal health data.",
  },
  {
    id: "terms",
    label: "Terms of Service",
    icon: IconCheck,
    summary:
      "The rules, acceptable uses, and agreements for utilizing the Tenaye platform.",
  },
  {
    id: "disclaimer",
    label: "Medical Disclaimer",
    icon: IconActivity,
    summary:
      "Vital medical boundaries: educational guidelines vs emergency care.",
  },
  {
    id: "accessibility",
    label: "Accessibility",
    icon: IconUsers,
    summary:
      "Our commitment to multilingual inclusivity, screen readers, and low-bandwidth access.",
  },
]

export function Legal() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<LegalTab>("privacy")

  // Sync tab with URL path or hash (e.g. /privacy or /legal#terms)
  useEffect(() => {
    const pathName = location.pathname.replace("/", "") as LegalTab
    const hash = location.hash.replace("#", "") as LegalTab
    if (
      ["privacy", "terms", "disclaimer", "accessibility"].includes(pathName)
    ) {
      setActiveTab(pathName)
    } else if (
      ["privacy", "terms", "disclaimer", "accessibility"].includes(hash)
    ) {
      setActiveTab(hash)
    }
  }, [location.pathname, location.hash])

  return (
    <div className="pt-20 pb-16 bg-slate-50 min-h-screen">
      {/* ── Hero Banner ── */}
      <section className="bg-gradient-to-r from-[#0c6e73] via-[#119197] to-[#0e9fa6] text-white py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-100 hover:text-white mb-4 transition-colors"
          >
            <IconArrowLeft size={14} /> Back to Home
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider text-teal-50 mb-2">
                Legal & Compliance
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Tenaye Policies & Guidelines
              </h1>
              <p className="text-teal-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                Transparency, clinical safety, user privacy, and accessibility
                are at the very foundation of Tenaye (ጤናዬ).
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs text-teal-100 block">Last Updated</span>
              <span className="text-sm font-bold text-white">October 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Interactive Layout ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
          {/* Navigation Bar / Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    window.history.replaceState(null, "", `/legal#${tab.id}`)
                  }}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white text-[#0c6e73] shadow-sm border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? "text-[#119197]" : "text-slate-400"}
                  />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content Box */}
          <div className="p-6 sm:p-10">
            {/* ──────────────── PRIVACY POLICY ──────────────── */}
            {activeTab === "privacy" && (
              <div className="space-y-8 animate-fade-in text-slate-700 text-sm sm:text-base leading-relaxed">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                    Privacy Policy
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Effective Date: October 1, 2026 &bull; Tenaye Health Systems
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                  <IconShield
                    size={20}
                    className="text-[#119197] shrink-0 mt-0.5"
                  />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-[#0c6e73]">
                      Our Core Privacy Pledge:
                    </strong>{" "}
                    We do not sell your personal or sensitive health queries to
                    data brokers, advertisers, or third parties. What you search
                    on Tenaye stays strictly private.
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    1. Information We Collect
                  </h3>
                  <p>
                    Tenaye is built with privacy-by-design. We gather minimal
                    data necessary to deliver life-saving guidance and localize
                    medical facilities:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                    <li>
                      <strong>Voluntary Health & Search Queries:</strong> Terms
                      you input into our disease search, triage prompts, or AI
                      Assistant to retrieve pertinent medical information.
                    </li>
                    <li>
                      <strong>Real-Time Geolocation (Optional):</strong> When
                      you consent, we use your device’s GPS coordinates solely
                      to list operational hospitals and emergency clinics in
                      your immediate vicinity. Location data is never tied to
                      your permanent identity.
                    </li>
                    <li>
                      <strong>Language Preferences:</strong> Local storage
                      configuration to remember your selected language (Amharic,
                      Afan Oromo, Tigrinya, Somali, English, etc.) without
                      requiring an account.
                    </li>
                    <li>
                      <strong>Anonymous Telemetry:</strong> Device type, browser
                      environment, and basic performance errors to keep the
                      application stable across low-connectivity mobile
                      networks.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    2. How Your Data Is Utilized
                  </h3>
                  <p>
                    All collected information serves solely to power healthcare
                    delivery:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                    <li>
                      Routing your symptoms to relevant disease entries and
                      first aid modules.
                    </li>
                    <li>
                      Displaying nearest emergency facilities sorted by driving
                      distance and availability.
                    </li>
                    <li>
                      Synthesizing audio responses via native text-to-speech
                      engines in regional languages.
                    </li>
                    <li>
                      Preventing malicious misuse, DDoS attacks, or service
                      disruption.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    3. Data Retention & On-Device Processing
                  </h3>
                  <p>
                    Symptom searches and consultation sessions are stored in
                    local transient memory. When you reset or end your session,
                    consultation conversations are cleared from your device
                    browser cache. We retain zero centralized tracking profiles
                    on our users.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    4. Security Safeguards
                  </h3>
                  <p>
                    We deploy end-to-end TLS 1.3 encryption across all
                    communication pathways. Client-side state is sandboxed
                    against unauthorized cross-origin access.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    5. Contact Us Regarding Your Privacy
                  </h3>
                  <p className="text-sm">
                    If you have questions regarding our privacy protections or
                    wish to request local data purge assistance, reach out at{" "}
                    <a
                      href="mailto:privacy@tenaye.org"
                      className="text-[#119197] font-semibold underline"
                    >
                      privacy@tenaye.org
                    </a>{" "}
                    or call our support center at{" "}
                    <a
                      href="tel:+251900000000"
                      className="text-[#119197] font-semibold underline"
                    >
                      +251 900 000 000
                    </a>
                    .
                  </p>
                </section>
              </div>
            )}

            {/* ──────────────── TERMS OF SERVICE ──────────────── */}
            {activeTab === "terms" && (
              <div className="space-y-8 animate-fade-in text-slate-700 text-sm sm:text-base leading-relaxed">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                    Terms of Service
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Last Modified: October 2026 &bull; Agreement between User
                    and Tenaye
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200">
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>Notice:</strong> By accessing, browsing, or
                    utilizing any feature of Tenaye (ጤናዬ), you acknowledge that
                    you have read, understood, and agreed to be bound by these
                    Terms of Service.
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    1. Platform Purpose & Scope of Use
                  </h3>
                  <p>
                    Tenaye is an educational health repository and emergency
                    contact index designed to assist residents and travelers
                    across Ethiopia and the Horn of Africa. The platform is
                    offered free of charge for non-commercial personal usage.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    2. User Conduct & Prohibited Practices
                  </h3>
                  <p>
                    When interacting with the platform or our AI health
                    assistant, you agree not to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                    <li>
                      Submit automated spam, bot inquiries, or scrape our
                      database without permission.
                    </li>
                    <li>
                      Attempt to breach security boundaries, injection testing,
                      or disrupt hospital location routing.
                    </li>
                    <li>
                      Rely on Tenaye as a sole legal or life-support medical
                      device during life-or-death emergencies where immediate
                      paramedic dispatch is required.
                    </li>
                    <li>
                      Misrepresent medical credentials or submit deceptive
                      clinical reports.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    3. Intellectual Property Rights
                  </h3>
                  <p>
                    All original articles, graphics, bilingual translations,
                    branding insignia, and software architecture are protected
                    intellectual property of Tenaye Health and its contributors.
                    Open-source clinical references maintain their respective
                    public licenses.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    4. Limitation of Liability
                  </h3>
                  <p>
                    To the maximum extent permitted under applicable law,
                    Tenaye, its founding developers, medical reviewers, and
                    operational partners will not be liable for any direct,
                    indirect, incidental, or consequential damages resulting
                    from the use or inability to use this platform.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    5. Modifications to Terms
                  </h3>
                  <p>
                    We reserve the right to revise these Terms to reflect
                    legislative changes, new platform modules, or clinical
                    protocol updates. Continued use signifies your acceptance of
                    updated terms.
                  </p>
                </section>
              </div>
            )}

            {/* ──────────────── MEDICAL DISCLAIMER ──────────────── */}
            {activeTab === "disclaimer" && (
              <div className="space-y-8 animate-fade-in text-slate-700 text-sm sm:text-base leading-relaxed">
                <div>
                  <h2 className="font-display text-2xl font-bold text-red-600 mb-2 flex items-center gap-2">
                    <IconActivity className="text-red-600" size={26} />
                    Medical Disclaimer
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Important Clinical Notice & Emergency Safety Boundaries
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-red-50 border-2 border-red-200">
                  <h3 className="text-red-700 font-extrabold text-base mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    EMERGENCY CALL NOTICE (907 / 911 / 939)
                  </h3>
                  <p className="text-red-800 text-sm leading-relaxed">
                    If you or someone around you is experiencing severe chest
                    pain, loss of consciousness, uncontrolled bleeding,
                    difficulty breathing, or symptoms of stroke,{" "}
                    <strong>DO NOT WAIT FOR AN ONLINE APP</strong>. Immediately
                    call your local ambulance or dial <strong>907</strong>{" "}
                    (Ethiopian Red Cross) or proceed to the nearest emergency
                    room.
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    1. Educational Purpose Exclusively
                  </h3>
                  <p>
                    The medical descriptions, disease symptoms, treatment
                    possibilities, and first aid tips displayed across Tenaye
                    (ጤናዬ) are curated for{" "}
                    <strong>
                      general health literacy and educational purposes only
                    </strong>
                    .
                  </p>
                  <p>
                    Content on Tenaye does <strong>NOT</strong> constitute
                    medical advice, professional diagnosis, prescription, or
                    clinical treatment plans.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    2. No Doctor-Patient Relationship
                  </h3>
                  <p>
                    Interacting with the Tenaye website, reading health tips,
                    utilizing voice assistance, or speaking with our AI triage
                    assistant does not create a doctor-patient, nurse-patient,
                    or confidential clinical relationship between you and Tenaye
                    or any of its team members.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    3. Verification with Qualified Providers
                  </h3>
                  <p>
                    Never disregard professional medical advice or delay seeking
                    care because of something you have read on this website.
                    Always consult a licensed physician, clinical officer, or
                    registered nurse regarding any personal symptoms,
                    pre-existing conditions, or medication adjustments.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    4. Accuracy of Hospital and Facility Information
                  </h3>
                  <p>
                    While we continuously verify hospital contact numbers,
                    specialty listings, and operational hours across Addis
                    Ababa, Bahir Dar, Hawassa, Dire Dawa, and regional zones,
                    operational facility details can fluctuate due to power,
                    staffing, or emergency surges. Please verify directly via
                    phone call before travel.
                  </p>
                </section>
              </div>
            )}

            {/* ──────────────── ACCESSIBILITY ──────────────── */}
            {activeTab === "accessibility" && (
              <div className="space-y-8 animate-fade-in text-slate-700 text-sm sm:text-base leading-relaxed">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
                    Accessibility Statement
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Committed to Universal Health Access & Digital Inclusivity
                    (WCAG 2.1 AA)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                  <IconUsers
                    size={20}
                    className="text-[#119197] shrink-0 mt-0.5"
                  />
                  <p className="text-xs sm:text-sm text-slate-700">
                    At Tenaye, we believe health information is a fundamental
                    human right. Our platform is continuously tuned to support
                    people of diverse abilities, varying literacy levels, and
                    low-connectivity environments.
                  </p>
                </div>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    1. Multilingual & Script Support
                  </h3>
                  <p>Ethiopia is richly multilingual. Tenaye supports:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                    <li>
                      <strong>Ge'ez Script Optimization:</strong>{" "}
                      High-legibility typography rendering for Amharic and
                      Tigrinya (ግዕዝ).
                    </li>
                    <li>
                      <strong>Regional Languages:</strong> Native translations
                      for Afan Oromo, Somali, and English, with expansion
                      planned for Sidama, Wolaytta, and Afar.
                    </li>
                    <li>
                      <strong>Read-Aloud Voice Synthesis:</strong> Integrated
                      disease read-aloud functionality with native pronunciation
                      voices so users who cannot read can listen to medical
                      advice.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    2. Assistive Technology & Visual Design
                  </h3>
                  <p>Key technical provisions implemented in our interface:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
                    <li>
                      <strong>Screen Reader Friendly:</strong> Semantic HTML
                      landmarks (<code>&lt;main&gt;</code>,{" "}
                      <code>&lt;nav&gt;</code>, <code>&lt;header&gt;</code>,{" "}
                      <code>&lt;footer&gt;</code>), explicit ARIA attributes,
                      and image alt descriptions.
                    </li>
                    <li>
                      <strong>High Contrast Ratios:</strong> Colors curated to
                      exceed WCAG 2.1 AA standards (minimum 4.5:1 contrast
                      against light backgrounds).
                    </li>
                    <li>
                      <strong>Keyboard Navigation:</strong> Fully operable
                      through standard tab order, visible focus rings, and
                      esc-to-close modals.
                    </li>
                    <li>
                      <strong>Touch Targets:</strong> Interactive buttons
                      maintain a minimum 44x44px touch area on mobile screens to
                      ensure easy tapping.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    3. Low-Bandwidth & Offline Optimization
                  </h3>
                  <p>
                    Designed to function reliably even over slow 2G/3G
                    connections and high-latency regional mobile data networks
                    through modern caching and optimized asset delivery.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    4. Feedback & Accessibility Remediation
                  </h3>
                  <p className="text-sm">
                    We welcome feedback from users with disabilities. If you
                    encounter any barriers or have recommendations for improving
                    accessibility, please contact us at{" "}
                    <a
                      href="mailto:accessibility@tenaye.org"
                      className="text-[#119197] font-semibold underline"
                    >
                      accessibility@tenaye.org
                    </a>
                    .
                  </p>
                </section>
              </div>
            )}
          </div>
        </div>

        {/* ── Emergency Quick Banner ── */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <IconPhone size={18} className="text-red-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                Need Urgent Medical Assistance?
              </p>
              <p className="text-xs text-slate-400">
                View live hospital contacts and dispatch hotlines across
                Ethiopia.
              </p>
            </div>
          </div>
          <Link
            to="/emergency"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-sm"
          >
            Emergency Hub
          </Link>
        </div>
      </div>
    </div>
  )
}
