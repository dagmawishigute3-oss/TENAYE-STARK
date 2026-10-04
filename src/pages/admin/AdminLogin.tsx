import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import logoImg from "../../imports/image-removebg-preview.png"
import { IconLock, IconMail, IconArrowRight, IconShieldCheck, IconCheck } from "../../components/Icons"

export function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("admin@tenaye.health")
  const [password, setPassword] = useState("TenayeAdmin2026!")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("tenaye_admin_token")
    if (token) {
      navigate("/admin")
    }
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || "Login failed. Please check your email and password.")
      }

      localStorage.setItem("tenaye_admin_token", data.token)
      localStorage.setItem("tenaye_admin_user", JSON.stringify(data.admin))

      navigate("/admin")
    } catch (err: any) {
      setError(err?.message || "Server connection error. Please verify the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const fillSuperAdmin = () => {
    setEmail("admin@tenaye.health")
    setPassword("TenayeAdmin2026!")
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-[#0c6e73]/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#119197]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#119197_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-5xl bg-slate-900/90 border border-slate-800/80 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden grid lg:grid-cols-[1.1fr_1fr] z-10">
        
        {/* Left Side: Brand Visual & Operations Brief */}
        <div className="relative p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-[#0c6e73]/90 via-[#0a5a5e] to-slate-900 border-b lg:border-b-0 lg:border-r border-slate-800 text-white overflow-hidden">
          <div className="absolute -right-16 -top-16 w-60 h-60 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:scale-105 transition-transform shadow-inner">
                <img src={logoImg} alt="Tenaye Logo" className="h-9 w-auto brightness-0 invert" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white block leading-none">
                  Tenaye
                </span>
                <span className="text-[11px] font-bold tracking-widest uppercase text-teal-200">
                  Operations Console
                </span>
              </div>
            </Link>

            <div className="mt-12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/15 border border-teal-300/30 text-teal-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Authorized Personnel Only</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Digital Health & Triage Administration
              </h2>
              <p className="text-teal-100 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
                Manage live patient contact inquiries, monitor crowdsourced community outbreak surveillance, and direct emergency dispatch hotlines.
              </p>
            </div>
          </div>

          {/* Quick Feature Badges */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-teal-200 shrink-0">
                <IconMail size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Gmail Direct Relay</p>
                <p className="text-[10px] text-teal-200/80">1-Click Dispatch</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-teal-200 shrink-0">
                <IconShieldCheck size={16} />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">RBAC Security</p>
                <p className="text-[10px] text-teal-200/80">Super Admin Seeded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="p-8 sm:p-12 flex flex-col justify-center bg-slate-900/60">
          <div className="mb-8">
            <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">
              Sign In to Dashboard
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter your official administrative credentials to access operations.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-800/80 text-rose-300 text-xs flex items-start gap-3 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
              <span className="leading-relaxed font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <IconMail size={16} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tenaye.health"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#119197] focus:ring-1 focus:ring-[#119197] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-teal-400 hover:text-teal-300 transition-colors font-medium cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <IconLock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#119197] focus:ring-1 focus:ring-[#119197] transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:from-[#09575b] hover:to-[#0c6e73] text-white font-bold text-sm shadow-lg shadow-teal-950/60 hover:shadow-teal-900/80 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating Officer...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Administration Dashboard</span>
                    <IconArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <IconShieldCheck size={14} className="text-teal-400" />
              <span>Hackathon Evaluation Super Admin:</span>
            </div>
            <button
              type="button"
              onClick={fillSuperAdmin}
              className="text-xs font-mono font-bold text-teal-300 hover:text-teal-100 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800 hover:border-teal-500/50 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>admin@tenaye.health</span>
              <span className="text-slate-500">•</span>
              <span>TenayeAdmin2026!</span>
            </button>
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-slate-300 mt-2 transition-colors"
            >
              &larr; Return to Public Landing Page
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
export default AdminLogin
