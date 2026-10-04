import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useScrollReveal } from "../hooks/useScrollReveal"
import {
  IconShield,
  IconAward,
  IconUsers,
  IconCheck,
  IconActivity,
  IconHeart,
  IconBrain,
  IconSearch,
  IconPhone,
} from "../components/Icons"
import { ScholarXivSearchBar } from "../components/ScholarXivSearchBar"
import { HomeIntroLoader } from "../components/HomeIntroLoader"

const STATS = [
  { icon: IconShield, value: "2,500+", label: "Health Articles" },
  { icon: IconAward, value: "500+", label: "Expert Reviews" },
  { icon: IconUsers, value: "10K+", label: "Daily Users" },
]

const WHY = [
  {
    icon: IconShield,
    title: "Expert-Verified Information",
    desc: "All content reviewed by certified medical professionals.",
  },
  {
    icon: IconCheck,
    title: "24/7 Health Support",
    desc: "Round-the-clock access to health guidance and resources.",
  },
  {
    icon: IconUsers,
    title: "Community Support",
    desc: "Connect with others on similar health journeys.",
  },
  {
    icon: IconCheck,
    title: "Personalized Care",
    desc: "Tailored health recommendations based on your needs.",
  },
]

const FEATURED = [
  {
    icon: IconActivity,
    tag: "Endocrine",
    title: "Diabetes",
    desc: "A group of metabolic disorders characterized by high blood sugar levels.",
    href: "/diseases/diabetes",
  },
  {
    icon: IconHeart,
    tag: "Cardiovascular",
    title: "Hypertension",
    desc: "High blood pressure that can lead to serious health complications.",
    href: "/diseases/hypertension",
  },
  {
    icon: IconBrain,
    tag: "Mental Health",
    title: "Depression",
    desc: "A mental health disorder causing persistent sadness and loss of interest.",
    href: "/diseases/depression",
  },
]

export function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const statsRef = useScrollReveal()
  const whyRef = useScrollReveal()
  const featuredRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/diseases?search=${encodeURIComponent(query.trim())}`)
    } else {
      navigate("/diseases")
    }
  }

  return (
    <>
      <HomeIntroLoader />
      <main className="pt-16">
        {/* ── HERO ── */}
        <section className="relative z-30 bg-gradient-to-br from-[#0c6e73] via-[#119197] to-[#0e9fa6] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="relative z-30 animate-fade-up">
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl text-white mb-4 leading-[1.1]">
                Your Trusted Health Companion
              </h1>
              <p className="text-teal-100 text-lg mb-8 leading-relaxed max-w-lg">
                Access reliable medical information, connect with healthcare
                professionals, and take control of your health journey with
                confidence and care.
              </p>

              {/* Search bar with ScholarXiv Academic Literature Dropdown */}
              <div className="mb-3 max-w-lg">
                <ScholarXivSearchBar
                  value={query}
                  onChange={setQuery}
                  onSubmit={(submittedVal) => {
                    const targetQuery = submittedVal?.trim() || query.trim()
                    if (targetQuery) {
                      navigate(
                        `/diseases?search=${encodeURIComponent(targetQuery)}`,
                      )
                    } else {
                      navigate("/diseases")
                    }
                  }}
                  variant="hero"
                  placeholder="Search diseases, symptoms, or conditions…"
                />
              </div>
              <p className="text-teal-100/80 text-xs mb-8">
                Popular searches:{" "}
                <Link
                  to="/diseases?search=Diabetes"
                  className="underline hover:text-white"
                >
                  Diabetes symptoms
                </Link>{" "}
                <Link
                  to="/diseases?search=Heart"
                  className="underline hover:text-white"
                >
                  Heart disease prevention
                </Link>{" "}
                <Link
                  to="/diseases?search=Anxiety"
                  className="underline hover:text-white"
                >
                  Anxiety treatment
                </Link>
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/symptoms"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0c6e73] font-bold text-sm hover:bg-teal-50 transition-colors shadow-sm"
                >
                  <IconActivity size={16} className="text-[#119197]" /> Check
                  Symptoms
                </Link>
                <Link
                  to="/diseases"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/80 text-white font-semibold text-sm hover:bg-white hover:text-[#119197] transition-colors"
                >
                  <IconSearch size={16} /> Disease Library
                </Link>
                <a
                  href="tel:907"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <IconPhone size={16} /> Emergency Help
                </a>
              </div>
            </div>

            {/* Right — doctor photo */}
            <div className="hidden lg:block animate-fade-up delay-200">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-[#119197]/30 translate-x-4 translate-y-4" />
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=480&fit=crop&auto=format"
                  alt="Healthcare professional"
                  className="relative rounded-2xl w-full h-[380px] object-cover border-4 border-[#119197]/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-white border-b border-gray-100">
          <div
            ref={statsRef}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-3 gap-6"
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
              >
                <Icon size={28} className="text-[#119197] mb-2" />
                <p className="font-display font-extrabold text-2xl sm:text-3xl text-gray-900">
                  {value}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY CHOOSE ── */}
        <section className="py-16 bg-gray-50">
          <div ref={whyRef} className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display font-extrabold text-3xl text-center text-gray-900 mb-2">
              Why Choose Tenaye?
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10">
              We provide comprehensive, reliable, and accessible healthcare
              information to empower your health decisions
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200"
                >
                  <Icon size={28} className="text-[#119197] mb-4" />
                  <h3 className="font-display font-bold text-gray-900 text-sm mb-2">
                    {title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED CONDITIONS ── */}
        <section className="py-16 bg-white">
          <div ref={featuredRef} className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display font-extrabold text-3xl text-center text-gray-900 mb-2">
              Featured Health Conditions
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10">
              Learn about common health conditions with expert-reviewed
              information
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {FEATURED.map(({ icon: Icon, tag, title, desc, href }) => (
                <div
                  key={title}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon size={28} className="text-[#119197]" />
                    <span className="badge badge-gray">{tag}</span>
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    {desc}
                  </p>
                  <Link
                    to={href}
                    className="text-sm font-semibold text-[#119197] hover:text-[#0c6e73] transition-colors flex items-center gap-1 group-hover:gap-2"
                  >
                    Learn More <span className="transition-all">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTAS ── */}
        <section
          ref={ctaRef}
          className="py-8 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-5"
        >
          {/* Emergency CTA — teal primary, red accent on call button only */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white p-10 text-center">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-teal-100 text-sm mb-6">
              Get instant access to healthcare professionals and emergency
              services
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:907"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-sm transition-colors"
              >
                <IconPhone size={16} /> Emergency Services
              </a>
              <Link
                to="/first-aid"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                First Aid Guides
              </Link>
            </div>
          </div>

          {/* Health Tips CTA — teal primary */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white p-10 text-center">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl mb-2">
              Daily Health Tips
            </h3>
            <p className="text-teal-100 text-sm mb-6">
              Get personalized health tips and wellness advice to improve your
              daily life
            </p>
            <Link
              to="/health-tips"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#119197] font-semibold text-sm hover:bg-[#e6f7f7] transition-colors"
            >
              Explore Health Tips
            </Link>
          </div>
        </section>

        <div className="py-8" />
      </main>
    </>
  )
}
