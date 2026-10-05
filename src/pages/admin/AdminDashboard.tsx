import { useState, useEffect, useCallback, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import logoImg from "../../imports/image-removebg-preview.png"
import {
  IconMail,
  IconShieldCheck,
  IconClock,
  IconSend,
  IconX,
  IconSearch,
  IconCheck,
  IconMenu,
  IconBell,
  IconSun,
  IconMoon,
  IconSettings,
  IconSparkles,
  IconTrash,
  IconEdit,
  IconEye,
  IconDownload,
  IconFileText,
  IconAlertTriangle,
  IconHeart,
  IconActivity,
  IconGlobe,
  IconUsers,
  IconPhone,
  IconMapPin,
  IconStethoscope,
  IconAlertCircle,
} from "../../components/Icons"

interface AdminUser {
  id: number
  name: string
  email: string
  role: "super_admin" | "admin"
  created_at?: string
}

interface ContactMessage {
  id: number
  name: string
  email: string
  phone?: string | null
  category?: string | null
  subject: string
  priority?: string | null
  message: string
  status: "unread" | "read" | "replied" | "archived"
  reply_content?: string | null
  replied_at?: string | null
  replied_by?: string | null
  created_at: string
}

interface StatsData {
  totalMessages: number
  unreadMessages: number
  repliedMessages: number
  totalAdmins: number
  pendingOutbreaks: number
  pendingDrafts?: number
  publishedNews: number
  resolutionRate?: number
}

interface SystemNotification {
  id: number | string
  title: string
  subtitle: string
  detail: string
  category: "message" | "security" | "system" | "outbreak"
  created_at: string
}

type DashboardTab = "dashboard" | "admin" | "messages" | "news" | "funds" | "settings"
type ThemeMode = "dark" | "light"

export function AdminDashboard() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [token, setToken] = useState<string>("")
  const [activeTab, setActiveTab] = useState<DashboardTab>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Light / Dark mode state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem("tenaye_admin_theme") as ThemeMode) || "dark"
  })

  const isDark = theme === "dark"

  const toggleTheme = () => {
    const nextTheme: ThemeMode = isDark ? "light" : "dark"
    setTheme(nextTheme)
    localStorage.setItem("tenaye_admin_theme", nextTheme)
  }

  // Data states
  const [stats, setStats] = useState<StatsData>({
    totalMessages: 0,
    unreadMessages: 0,
    repliedMessages: 0,
    totalAdmins: 0,
    pendingOutbreaks: 0,
    publishedNews: 0,
    resolutionRate: 100,
  })
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [adminsList, setAdminsList] = useState<AdminUser[]>([])
  const [notificationsList, setNotificationsList] = useState<SystemNotification[]>([])
  const [loading, setLoading] = useState(true)

  // Real Notification Dropdown state
  const [notificationOpen, setNotificationOpen] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Inbox filters & modal
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "replied">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [replyBody, setReplyBody] = useState("")
  const [markingReplied, setMarkingReplied] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [actionNotice, setActionNotice] = useState<string | null>(null)
  const [detectedIntent, setDetectedIntent] = useState<string | null>(null)

  // Admin creation / edit / view modals
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [newAdminName, setNewAdminName] = useState("")
  const [newAdminEmail, setNewAdminEmail] = useState("")
  const [newAdminPassword, setNewAdminPassword] = useState("")
  const [newAdminRole, setNewAdminRole] = useState<"admin" | "super_admin">("admin")
  const [addAdminLoading, setAddAdminLoading] = useState(false)
  const [addAdminError, setAddAdminError] = useState<string | null>(null)
  const [addAdminSuccess, setAddAdminSuccess] = useState<string | null>(null)

  // Edit Admin Modal
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null)
  const [editAdminName, setEditAdminName] = useState("")
  const [editAdminEmail, setEditAdminEmail] = useState("")
  const [editAdminRole, setEditAdminRole] = useState<"admin" | "super_admin">("admin")
  const [editAdminPassword, setEditAdminPassword] = useState("")
  const [editAdminLoading, setEditAdminLoading] = useState(false)
  const [editAdminError, setEditAdminError] = useState<string | null>(null)

  // View Admin Modal
  const [viewingAdmin, setViewingAdmin] = useState<AdminUser | null>(null)

  // In-Dashboard Article Reader Modal (Not redirecting away to public page)
  const [viewingArticle, setViewingArticle] = useState<any | null>(null)

  // View Community / Citizen Report Detail Modal
  const [selectedCommunityReport, setSelectedCommunityReport] = useState<any | null>(null)

  // Community Funds & Donations states
  const [fundPledges, setFundPledges] = useState<any[]>([])
  const [fundCampaigns, setFundCampaigns] = useState<any[]>([])
  const [fundStats, setFundStats] = useState<any>({
    totalPledges: 0,
    verifiedTotal: 0,
    pendingTotal: 0,
    pendingCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
  })
  const [viewingReceiptModal, setViewingReceiptModal] = useState<any | null>(null)
  const [selectedFundDetail, setSelectedFundDetail] = useState<any | null>(null)
  const [fundStatusFilter, setFundStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [fundActionLoading, setFundActionLoading] = useState<number | null>(null)

  // Settings: Profile Form states
  const [profileName, setProfileName] = useState("")
  const [profileEmail, setProfileEmail] = useState("")
  const [profileCurrentPassword, setProfileCurrentPassword] = useState("")
  const [profileNewPassword, setProfileNewPassword] = useState("")
  const [profileConfirmPassword, setProfileConfirmPassword] = useState("")
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  // Settings: Preferences states (persisted in localStorage)
  const [autoAiDraftEnabled, setAutoAiDraftEnabled] = useState(() => {
    return localStorage.getItem("tenaye_auto_ai_draft") !== "false"
  })
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(() => {
    return localStorage.getItem("tenaye_sound_alerts") !== "false"
  })
  const prevUnreadCountRef = useRef<number | null>(null)
  const prevDraftsCountRef = useRef<number | null>(null)

  // Web Audio synthesizer for alert notifications & toggle confirmations
  const playAudioAlert = useCallback((type: "urgent" | "success" | "toggle" = "toggle") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === "urgent") {
        // High-priority urgent dual-tone chime
        osc.type = "sine"
        osc.frequency.setValueAtTime(880, ctx.currentTime) // A5
        osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15) // D6
        gain.gain.setValueAtTime(0.35, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.45)
      } else if (type === "success") {
        // Crisp success chime
        osc.type = "triangle"
        osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12) // G5
        gain.gain.setValueAtTime(0.3, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.35)
      } else {
        // Confirmation beep
        osc.type = "sine"
        osc.frequency.setValueAtTime(659.25, ctx.currentTime) // E5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08) // A5
        gain.gain.setValueAtTime(0.2, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.25)
      }
    } catch (err) {
      console.warn("[SoundAlert] Audio playback error:", err)
    }
  }, [])

  const handleToggleAutoAiDraft = () => {
    const nextVal = !autoAiDraftEnabled
    setAutoAiDraftEnabled(nextVal)
    localStorage.setItem("tenaye_auto_ai_draft", String(nextVal))
    if (soundAlertsEnabled) {
      playAudioAlert(nextVal ? "success" : "toggle")
    }
    setActionNotice(
      nextVal
        ? "Clinical AI Intent Detection & Auto-Drafting Enabled (Messages will automatically generate context-aware AI replies)"
        : "Clinical AI Auto-Drafting Disabled (Manual officer response template active)"
    )
  }

  const handleToggleSoundAlerts = () => {
    const nextVal = !soundAlertsEnabled
    setSoundAlertsEnabled(nextVal)
    localStorage.setItem("tenaye_sound_alerts", String(nextVal))
    if (nextVal) {
      playAudioAlert("urgent")
    }
    setActionNotice(
      nextVal
        ? "Live Sound Alerts Enabled (Testing audio chime... Audio alerts active for urgent inquiries & outbreak alerts)"
        : "Live Sound Alerts Disabled"
    )
  }

  // News, Outbreak Surveillance & Relief Management
  const [outbreakDrafts, setOutbreakDrafts] = useState<any[]>([])
  const [communityReports, setCommunityReports] = useState<any[]>([])
  const [adminNewsList, setAdminNewsList] = useState<any[]>([])
  const [newsSubTab, setNewsSubTab] = useState<"drafts" | "create" | "articles" | "reports">("drafts")

  // Outbreak Draft approval options state (keyed by draft.id)
  const [draftReliefSettings, setDraftReliefSettings] = useState<
    Record<number, { has_relief: boolean; relief_goal: string; relief_beneficiary: string; relief_description: string }>
  >({})
  const [approvingDraftId, setApprovingDraftId] = useState<number | null>(null)

  // Article creation form state
  const [newArticleTitle, setNewArticleTitle] = useState("")
  const [newArticleCategory, setNewArticleCategory] = useState("announcement")
  const [newArticleExcerpt, setNewArticleExcerpt] = useState("")
  const [newArticleContent, setNewArticleContent] = useState("")
  const [newArticleHasRelief, setNewArticleHasRelief] = useState(false)
  const [newArticleReliefGoal, setNewArticleReliefGoal] = useState("50000")
  const [newArticleReliefBeneficiary, setNewArticleReliefBeneficiary] = useState("")
  const [newArticleReliefDesc, setNewArticleReliefDesc] = useState("")
  const [creatingArticle, setCreatingArticle] = useState(false)
  const [createArticleNotice, setCreateArticleNotice] = useState<string | null>(null)

  // 1. Session verification
  useEffect(() => {
    const savedToken = localStorage.getItem("tenaye_admin_token")
    const savedUserStr = localStorage.getItem("tenaye_admin_user")

    if (!savedToken) {
      navigate("/admin/login")
      return
    }

    setToken(savedToken)
    if (savedUserStr) {
      try {
        const parsed = JSON.parse(savedUserStr)
        setCurrentUser(parsed)
        setProfileName(parsed.name || "")
        setProfileEmail(parsed.email || "")
      } catch {}
    }
  }, [navigate])

  const handleLogout = useCallback(() => {
    localStorage.removeItem("tenaye_admin_token")
    localStorage.removeItem("tenaye_admin_user")
    navigate("/admin/login")
  }, [navigate])

  // Click outside to close notifications
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setNotificationOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  // 2. Data Fetching
  const fetchStats = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats)
      } else if (res.status === 401) {
        handleLogout()
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching stats:", err)
    }
  }, [token])

  const fetchMessages = useCallback(async () => {
    if (!token) return
    try {
      let url = "/api/admin/contacts?status=" + statusFilter
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`
      }
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        const msgs = data.messages || []
        setMessages(msgs)
        const unreadCount = msgs.filter((m: any) => m.status === "unread").length
        if (
          soundAlertsEnabled &&
          prevUnreadCountRef.current !== null &&
          unreadCount > prevUnreadCountRef.current
        ) {
          playAudioAlert("urgent")
        }
        prevUnreadCountRef.current = unreadCount
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching messages:", err)
    }
  }, [token, statusFilter, searchQuery, soundAlertsEnabled, playAudioAlert])

  const fetchAdmins = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch("/api/admin/admins", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setAdminsList(data.admins || [])
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching admins:", err)
    }
  }, [token])

  const fetchNotifications = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch("/api/admin/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setNotificationsList(data.notifications || [])
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching notifications:", err)
    }
  }, [token])

  const fetchOutbreakDrafts = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch("/api/admin/outbreak/drafts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        const drafts = data.drafts || []
        setOutbreakDrafts(drafts)
        if (
          soundAlertsEnabled &&
          prevDraftsCountRef.current !== null &&
          drafts.length > prevDraftsCountRef.current
        ) {
          playAudioAlert("urgent")
        }
        prevDraftsCountRef.current = drafts.length
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching outbreak drafts:", err)
    }
  }, [token, soundAlertsEnabled, playAudioAlert])

  const fetchCommunityReports = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch("/api/admin/outbreak/reports", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setCommunityReports(data.reports || [])
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching outbreak reports:", err)
    }
  }, [token])

  const fetchAdminNews = useCallback(async () => {
    try {
      const res = await fetch("/api/news?include_drafts=true")
      if (res.ok) {
        const data = await res.json()
        setAdminNewsList(data.posts || [])
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching admin news:", err)
    }
  }, [])

  const handleApproveDraft = async (draft: any) => {
    if (!token) return
    const customSettings = draftReliefSettings[draft.id]
    const hasRelief = customSettings ? customSettings.has_relief : Boolean(draft.has_relief)
    const reliefGoal = customSettings ? parseFloat(customSettings.relief_goal) || 0 : draft.relief_goal || 0
    const reliefBeneficiary = customSettings
      ? customSettings.relief_beneficiary
      : draft.relief_beneficiary || `${draft.cluster_region} Emergency Relief`
    const reliefDesc = customSettings
      ? customSettings.relief_description
      : draft.relief_description || `Community medical relief for families in ${draft.cluster_region}.`

    setApprovingDraftId(draft.id)
    try {
      const res = await fetch(`/api/admin/outbreak/drafts/${draft.id}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: draft.title,
          content: draft.content,
          has_relief: hasRelief ? 1 : 0,
          relief_goal: hasRelief ? reliefGoal : 0,
          relief_beneficiary: hasRelief ? reliefBeneficiary : null,
          relief_description: hasRelief ? reliefDesc : null,
        }),
      })
      if (res.ok) {
        setActionNotice(`Approved & published outbreak advisory: "${draft.title}" ${hasRelief ? "(With Relief Campaign)" : "(Standard News Notice)"}`)
        fetchOutbreakDrafts()
        fetchAdminNews()
        fetchStats()
        fetchNotifications()
      } else {
        let errData: any = {}
        try { errData = await res.json() } catch {}
        alert(errData?.error || `Failed to approve draft (${res.status})`)
      }
    } catch (err: any) {
      alert(err.message || "Error approving draft")
    } finally {
      setApprovingDraftId(null)
    }
  }

  const handleRejectDraft = async (draftId: number) => {
    if (!token) return
    const reason = window.prompt("Reason for rejecting this AI outbreak draft:", "Not clinically verified")
    if (reason === null) return

    try {
      const res = await fetch(`/api/admin/outbreak/drafts/${draftId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      })
      if (res.ok) {
        setActionNotice("Draft rejected and removed from publishing queue")
        fetchOutbreakDrafts()
        fetchStats()
        fetchNotifications()
      }
    } catch (err: any) {
      alert(err.message || "Error rejecting draft")
    }
  }

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setCreatingArticle(true)
    setCreateArticleNotice(null)

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newArticleTitle,
          category: newArticleCategory,
          excerpt: newArticleExcerpt || undefined,
          content: newArticleContent,
          has_relief: newArticleHasRelief,
          relief_goal: parseFloat(newArticleReliefGoal) || 0,
          relief_beneficiary: newArticleReliefBeneficiary || undefined,
          relief_description: newArticleReliefDesc || undefined,
        }),
      })

      let data: any = {}
      try {
        data = await res.json()
      } catch {}

      if (!res.ok) throw new Error(data?.error || `Failed to create article (${res.status})`)

      setCreateArticleNotice("Article published successfully to the public News & Health Bulletins page!")
      setNewArticleTitle("")
      setNewArticleExcerpt("")
      setNewArticleContent("")
      setNewArticleHasRelief(false)
      fetchAdminNews()
      fetchStats()
      setTimeout(() => {
        setNewsSubTab("articles")
        setCreateArticleNotice(null)
      }, 1200)
    } catch (err: any) {
      alert(err.message || "Error publishing article")
    } finally {
      setCreatingArticle(false)
    }
  }

  const handleDeleteArticle = async (id: number) => {
    if (!token) return
    if (!window.confirm("Are you sure you want to delete this article? This will also remove any associated relief campaign records.")) return

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        fetchAdminNews()
        fetchStats()
      }
    } catch (err: any) {
      alert(err.message || "Error deleting article")
    }
  }

  const fetchFunds = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch("/api/news/admin/funds", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setFundPledges(data.pledges || [])
        setFundCampaigns(data.campaigns || [])
        if (data.stats) setFundStats(data.stats)
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching funds data:", err)
    }
  }, [token])

  const handleApproveFund = async (pledgeId: number) => {
    if (!token) return
    setFundActionLoading(pledgeId)
    try {
      const res = await fetch(`/api/news/admin/funds/${pledgeId}/approve`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to approve donation")
      setActionNotice(data.message || "Donation approved and added to campaign balance!")
      fetchFunds()
      fetchAdminNews()
      fetchStats()
    } catch (err: any) {
      alert(err.message || "Error approving donation")
    } finally {
      setFundActionLoading(null)
    }
  }

  const handleRejectFund = async (pledgeId: number) => {
    if (!token) return
    const reason = window.prompt("Reason for rejecting donation / receipt:", "Invalid or unverified receipt")
    if (reason === null) return
    setFundActionLoading(pledgeId)
    try {
      const res = await fetch(`/api/news/admin/funds/${pledgeId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to reject donation")
      setActionNotice("Donation record marked as rejected.")
      fetchFunds()
      fetchAdminNews()
      fetchStats()
    } catch (err: any) {
      alert(err.message || "Error rejecting donation")
    } finally {
      setFundActionLoading(null)
    }
  }

  const refreshAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([
      fetchStats(),
      fetchMessages(),
      fetchAdmins(),
      fetchNotifications(),
      fetchOutbreakDrafts(),
      fetchCommunityReports(),
      fetchAdminNews(),
      fetchFunds(),
    ])
    setLoading(false)
  }, [
    fetchStats,
    fetchMessages,
    fetchAdmins,
    fetchNotifications,
    fetchOutbreakDrafts,
    fetchCommunityReports,
    fetchAdminNews,
    fetchFunds,
  ])

  useEffect(() => {
    if (token) {
      refreshAll()
    }
  }, [token, refreshAll])

  // Periodic polling for real-time notification alert, drafts, reports, and funds (every 25 seconds)
  useEffect(() => {
    if (!token) return
    const interval = setInterval(() => {
      fetchStats()
      fetchMessages()
      fetchNotifications()
      fetchOutbreakDrafts()
      fetchCommunityReports()
      fetchFunds()
    }, 25000)
    return () => clearInterval(interval)
  }, [token, fetchStats, fetchMessages, fetchNotifications, fetchOutbreakDrafts, fetchCommunityReports, fetchFunds])

  // 3. AI Smart Reply Generator with Intent Detection
  const generateAiReply = async (msg: ContactMessage) => {
    setAiGenerating(true)
    setDetectedIntent(null)
    try {
      const res = await fetch("/api/admin/ai-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderName: msg.name,
          email: msg.email,
          category: msg.category,
          subject: msg.subject,
          message: msg.message,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.draftReply) {
          setReplyBody(data.draftReply)
          const readableIntent = data.intentCategory
            ? data.intentCategory.replace("_", " ").toUpperCase()
            : "INQUIRY"
          setDetectedIntent(readableIntent)
          setActionNotice(`AI analyzed message intent as [${readableIntent}] and drafted a response!`)
        }
      }
    } catch (err) {
      console.warn("[Dashboard] AI draft request error:", err)
    } finally {
      setAiGenerating(false)
    }
  }

  // Select message & open modal
  const openMessageModal = (msg: ContactMessage) => {
    setSelectedMessage(msg)
    setActionNotice(null)
    setNotificationOpen(false)

    if (autoAiDraftEnabled) {
      generateAiReply(msg)
    } else {
      const firstName = msg.name.split(" ")[0] || "Friend"
      setReplyBody(
        `Dear ${firstName},\n\nThank you for reaching out to the Tenaye (ጤናዬ) Operations Center regarding "${msg.subject || "your inquiry"}".\n\n[Write your response here]\n\nWarm regards,\n${currentUser?.name || "Tenaye Health Officer"}\nTenaye Digital Health Platform\nAddis Ababa, Ethiopia`,
      )
    }
  }

  // 4. Delete Contact Message
  const handleDeleteMessage = async (msgId: number) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry?")) return
    try {
      const res = await fetch(`/api/admin/contacts/${msgId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        if (selectedMessage?.id === msgId) {
          setSelectedMessage(null)
        }
        fetchMessages()
        fetchStats()
        fetchNotifications()
      }
    } catch (err) {
      alert("Failed to delete message")
    }
  }

  // 5. Toggle Single Message Read / Unread Status
  const handleToggleMessageRead = async (msgId: number, currentStatus: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    const nextStatus = currentStatus === "unread" ? "read" : "unread"
    try {
      const res = await fetch(`/api/admin/contacts/${msgId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (res.ok) {
        if (selectedMessage?.id === msgId) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: nextStatus as any } : null))
        }
        fetchMessages()
        fetchStats()
        fetchNotifications()
      }
    } catch (err) {
      console.error("[Dashboard] Error toggling status:", err)
    }
  }

  // 6. Mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      const res = await fetch("/api/admin/contacts/mark-all-read", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        fetchStats()
        fetchMessages()
        fetchNotifications()
      }
    } catch (err) {
      console.error("[Dashboard] Error marking all read:", err)
    }
  }

  // 6. 1-Click Redirect to Google Gmail
  const handleRedirectToGmail = async () => {
    if (!selectedMessage) return
    setMarkingReplied(true)

    const subject = selectedMessage.subject ? `Re: ${selectedMessage.subject}` : "Re: Tenaye Health Inquiry"
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedMessage.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(replyBody)}`

    window.open(gmailUrl, "_blank")

    try {
      const res = await fetch(`/api/admin/contacts/${selectedMessage.id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ replyContent: replyBody }),
      })

      if (res.ok) {
        setActionNotice(`Redirected to Gmail! Message marked as Replied by ${currentUser?.name || "Officer"}.`)
        setSelectedMessage((prev) =>
          prev
            ? {
                ...prev,
                status: "replied",
                reply_content: replyBody,
                replied_at: new Date().toISOString(),
                replied_by: currentUser?.name || "Officer",
              }
            : null,
        )
        fetchMessages()
        fetchStats()
        fetchNotifications()
      }
    } catch (err) {
      console.error("[Dashboard] Error marking replied:", err)
    } finally {
      setMarkingReplied(false)
    }
  }

  // 7. Create New Admin (Super Admin only)
  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddAdminLoading(true)
    setAddAdminError(null)
    setAddAdminSuccess(null)

    try {
      const res = await fetch("/api/admin/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newAdminName,
          email: newAdminEmail,
          password: newAdminPassword,
          role: newAdminRole,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to create admin")
      }

      setAddAdminSuccess(`Admin account created for ${newAdminName}!`)
      setNewAdminName("")
      setNewAdminEmail("")
      setNewAdminPassword("")
      fetchAdmins()
      fetchStats()
      fetchNotifications()

      setTimeout(() => {
        setShowAddAdminModal(false)
        setAddAdminSuccess(null)
      }, 1500)
    } catch (err: any) {
      setAddAdminError(err?.message || "Error creating admin account")
    } finally {
      setAddAdminLoading(false)
    }
  }

  // 8. Edit Admin Account (Super Admin only)
  const handleOpenEditAdmin = (admin: AdminUser) => {
    setEditingAdmin(admin)
    setEditAdminName(admin.name)
    setEditAdminEmail(admin.email)
    setEditAdminRole(admin.role)
    setEditAdminPassword("")
    setEditAdminError(null)
  }

  const handleSaveEditAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAdmin) return
    setEditAdminLoading(true)
    setEditAdminError(null)

    try {
      const res = await fetch(`/api/admin/admins/${editingAdmin.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editAdminName,
          email: editAdminEmail,
          role: editAdminRole,
          password: editAdminPassword || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to update admin account")
      }

      setEditingAdmin(null)
      fetchAdmins()
      fetchStats()
      fetchNotifications()
    } catch (err: any) {
      setEditAdminError(err?.message || "Error updating admin account")
    } finally {
      setEditAdminLoading(false)
    }
  }

  // 9. Delete Admin Account (Super Admin only)
  const handleDeleteAdmin = async (adminId: number) => {
    if (!confirm(`Are you sure you want to remove admin #${adminId}?`)) return
    try {
      const res = await fetch(`/api/admin/admins/${adminId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data?.error || "Cannot delete admin account")
        return
      }
      fetchAdmins()
      fetchStats()
      fetchNotifications()
    } catch (err) {
      alert("Error deleting admin")
    }
  }

  // 10. Update Own Profile (Settings)
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileMessage(null)
    setProfileError(null)

    if (profileNewPassword && profileNewPassword !== profileConfirmPassword) {
      setProfileError("New password and confirm password do not match")
      setProfileLoading(false)
      return
    }

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profileName,
          email: profileEmail,
          currentPassword: profileCurrentPassword || undefined,
          newPassword: profileNewPassword || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || "Failed to update profile")
      }

      setProfileMessage("Profile updated successfully!")
      setCurrentUser(data.admin)
      localStorage.setItem("tenaye_admin_user", JSON.stringify(data.admin))
      if (data.token) {
        setToken(data.token)
        localStorage.setItem("tenaye_admin_token", data.token)
      }
      setProfileCurrentPassword("")
      setProfileNewPassword("")
      setProfileConfirmPassword("")
      fetchAdmins()
    } catch (err: any) {
      setProfileError(err?.message || "Error updating profile")
    } finally {
      setProfileLoading(false)
    }
  }

  // Admin ID formatter: T001, T002, T003...
  const formatAdminId = (id: number) => `T${String(id).padStart(3, "0")}`

  // Export Inquiries Data (JSON download)
  const handleExportInquiriesJSON = () => {
    const sorted = messages.slice().sort((a, b) => a.id - b.id)
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sorted, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `tenaye_inquiries_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Export Inquiries Data (Printable PDF Report)
  const handleExportInquiriesPDF = () => {
    const sorted = messages.slice().sort((a, b) => a.id - b.id)
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      alert("Please allow pop-ups to generate PDF report")
      return
    }
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tenaye Health - Contact Inquiries Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 28px; color: #1e293b; }
            h1 { color: #0c6e73; margin-bottom: 4px; font-size: 22px; }
            p.meta { color: #64748b; font-size: 12px; margin-top: 0; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
            th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 2px solid #cbd5e1; color: #475569; }
            td { padding: 9px 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
            tr:nth-child(even) { background: #f8fafc; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
            .badge-unread { background: #fef3c7; color: #92400e; }
            .badge-replied { background: #d1fae5; color: #065f46; }
          </style>
        </head>
        <body>
          <h1>Tenaye Operations - Inbound Contact Inquiries Report</h1>
          <p class="meta">Exported on ${new Date().toLocaleString()} | Total Messages: ${sorted.length}</p>
          <table>
            <thead>
              <tr>
                <th style="width: 80px;">Message #</th>
                <th style="width: 70px;">Status</th>
                <th>Sender & Contact</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Subject & Content</th>
                <th>Date Received</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map((m, idx) => `
                <tr>
                  <td style="font-weight: bold; color: #119197;">Message ${idx + 1}</td>
                  <td><span class="badge ${m.status === 'replied' ? 'badge-replied' : 'badge-unread'}">${m.status}</span></td>
                  <td>
                    <strong>${m.name}</strong><br/>
                    <small style="color: #64748b;">${m.email}</small>
                    ${m.phone ? `<br/><small style="color: #0c6e73;">Tel: ${m.phone}</small>` : ''}
                  </td>
                  <td><span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 600;">${m.category || 'General'}</span></td>
                  <td><span style="font-size: 11px; font-weight: bold; color: ${m.priority?.includes('High') ? '#dc2626' : '#2563eb'};">${m.priority || 'Normal'}</span></td>
                  <td>
                    <strong>${m.subject || "No Subject"}</strong>
                    <div style="color: #64748b; font-size: 11px; margin-top: 4px;">${m.message}</div>
                  </td>
                  <td>${new Date(m.created_at).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 300)
  }

  // Export Admins Data (JSON download)
  const handleExportAdminsJSON = () => {
    const sorted = adminsList.slice().sort((a, b) => a.id - b.id)
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sorted, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `tenaye_admins_roster_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Export Admins Data (Printable PDF Report)
  const handleExportAdminsPDF = () => {
    const sorted = adminsList.slice().sort((a, b) => a.id - b.id)
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      alert("Please allow pop-ups to generate PDF report")
      return
    }
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tenaye Health - Administrative Team Roster</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 28px; color: #1e293b; }
            h1 { color: #0c6e73; margin-bottom: 4px; font-size: 22px; }
            p.meta { color: #64748b; font-size: 12px; margin-top: 0; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
            th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 2px solid #cbd5e1; color: #475569; }
            td { padding: 9px 10px; border-bottom: 1px solid #e2e8f0; }
            tr:nth-child(even) { background: #f8fafc; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
            .badge-super { background: #f3e8ff; color: #6b21a8; }
            .badge-officer { background: #ccfbf1; color: #115e59; }
          </style>
        </head>
        <body>
          <h1>Tenaye Operations - Administrative Governance Roster</h1>
          <p class="meta">Exported on ${new Date().toLocaleString()} | Total Active Administrators: ${sorted.length}</p>
          <table>
            <thead>
              <tr>
                <th style="width: 40px;">#</th>
                <th style="width: 80px;">Admin ID</th>
                <th>Officer Name</th>
                <th>Official Email</th>
                <th>Role Access</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map((a, idx) => `
                <tr>
                  <td style="font-weight: bold; text-align: center;">${idx + 1}</td>
                  <td style="font-weight: bold; color: #119197; font-family: monospace;">${formatAdminId(a.id)}</td>
                  <td><strong>${a.name}</strong></td>
                  <td style="font-family: monospace;">${a.email}</td>
                  <td><span class="badge ${a.role === 'super_admin' ? 'badge-super' : 'badge-officer'}">${a.role === 'super_admin' ? 'Super Admin' : 'Operations Officer'}</span></td>
                  <td>${a.created_at ? new Date(a.created_at).toLocaleDateString() : 'System Seed'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 300)
  }

  // Export Relief Funds Data (JSON download)
  const handleExportFundsJSON = () => {
    const sorted = fundPledges.slice().sort((a, b) => a.id - b.id)
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sorted, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `tenaye_relief_funds_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Export Relief Funds Data (Printable PDF Report)
  const handleExportFundsPDF = () => {
    const sorted = fundPledges.slice().sort((a, b) => a.id - b.id)
    const printWindow = window.open("", "_blank")
    if (!printWindow) {
      alert("Please allow pop-ups to generate PDF report")
      return
    }
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Tenaye Health - Community Relief Funds Report</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 28px; color: #1e293b; }
            h1 { color: #0c6e73; margin-bottom: 4px; font-size: 22px; }
            p.meta { color: #64748b; font-size: 12px; margin-top: 0; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 10px; }
            th { background: #f1f5f9; text-align: left; padding: 10px; border-bottom: 2px solid #cbd5e1; color: #475569; }
            td { padding: 9px 10px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
            tr:nth-child(even) { background: #f8fafc; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold; text-transform: uppercase; }
            .badge-approved { background: #d1fae5; color: #065f46; }
            .badge-pending { background: #fef3c7; color: #92400e; }
            .badge-rejected { background: #fee2e2; color: #991b1b; }
          </style>
        </head>
        <body>
          <h1>Tenaye Operations - Emergency Relief Funds & Donations Audit</h1>
          <p class="meta">Exported on ${new Date().toLocaleString()} | Total Verified: ${fundStats.verifiedTotal?.toLocaleString()} ETB | Total Donor Records: ${sorted.length}</p>
          <table>
            <thead>
              <tr>
                <th style="width: 40px;">#</th>
                <th>Donor Name & Contact</th>
                <th>Amount (ETB)</th>
                <th>Channel</th>
                <th>Associated Campaign</th>
                <th>Status</th>
                <th>Submission Date</th>
              </tr>
            </thead>
            <tbody>
              ${sorted.map((p, idx) => `
                <tr>
                  <td style="font-weight: bold; text-align: center;">${idx + 1}</td>
                  <td>
                    <strong>${p.donor_name}</strong>
                    ${p.donor_phone ? `<br/><small style="color: #64748b;">Tel: ${p.donor_phone}</small>` : ''}
                    ${p.message ? `<div style="color: #0c6e73; font-size: 11px; margin-top: 2px; font-style: italic;">"${p.message}"</div>` : ''}
                  </td>
                  <td style="font-family: monospace; font-weight: bold; color: #059669;">+${p.amount_etb?.toLocaleString()} ETB</td>
                  <td><span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 600;">${p.payment_method === 'BOA' ? 'Bank of Abyssinia' : p.payment_method}</span></td>
                  <td><strong>${p.relief_beneficiary || p.post_title || 'General Relief'}</strong></td>
                  <td><span class="badge ${p.status === 'approved' ? 'badge-approved' : p.status === 'rejected' ? 'badge-rejected' : 'badge-pending'}">${p.status || 'pending'}</span></td>
                  <td>${new Date(p.created_at).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `
    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 300)
  }

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row font-sans transition-colors duration-200 ${
      isDark ? "bg-slate-950 text-slate-100" : "bg-[#fbf9f4] text-stone-800"
    }`}>

      {/* ── SIDEBAR ── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 flex flex-col justify-between z-40 transition-transform duration-300 lg:translate-x-0 ${
          isDark
            ? "bg-slate-900 border-r border-slate-800/80"
            : "bg-[#fffefb] border-r border-[#ebdcc9] shadow-xs"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          {/* Logo & Console Title */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 rounded-xl bg-[#119197]/15 border border-teal-500/30">
                <img
                  src={logoImg}
                  alt="Tenaye Logo"
                  className={`h-7 w-auto ${isDark ? "brightness-0 invert" : ""}`}
                />
              </div>
              <div>
                <span className={`font-display font-black text-xl tracking-tight block leading-none ${
                  isDark ? "text-white" : "text-slate-900"
                }`}>
                  Tenaye
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-teal-500">
                  Operations Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden p-1 ${isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
            >
              <IconX size={20} />
            </button>
          </div>

          {/* System status indicator (badge removed per request) */}
          <div className={`mt-6 px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs ${
            isDark ? "bg-slate-950 border border-slate-800" : "bg-slate-100 border border-slate-200"
          }`}>
            <div className="flex items-center gap-2 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className={isDark ? "text-slate-300" : "text-slate-700"}>Live Server Active</span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-8 space-y-1.5">
            {/* 1. Dashboard */}
            <button
              onClick={() => {
                setActiveTab("dashboard")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white shadow-md shadow-teal-950/40"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
              }`}
            >
              <IconShieldCheck size={16} />
              <span>Dashboard</span>
            </button>

            {/* 2. Admin (Admins Team Management) */}
            <button
              onClick={() => {
                setActiveTab("admin")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "admin"
                  ? "bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white shadow-md shadow-teal-950/40"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconShieldCheck size={16} />
                <span>Admin</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded ${
                isDark ? "bg-slate-950 text-slate-400" : "bg-[#ebdcc9] text-stone-700"
              }`}>
                {stats.totalAdmins}
              </span>
            </button>

            {/* 3. Contact Message (Inbox) */}
            <button
              onClick={() => {
                setActiveTab("messages")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "messages"
                  ? "bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white shadow-md shadow-teal-950/40"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconMail size={16} />
                <span>Contact Message</span>
              </div>
              {stats.unreadMessages > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black animate-pulse">
                  {stats.unreadMessages}
                </span>
              )}
            </button>

            {/* 4. News & Outbreak Surveillance */}
            <button
              onClick={() => {
                setActiveTab("news")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "news"
                  ? "bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white shadow-md shadow-teal-950/40"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconAlertTriangle size={16} />
                <span>News & Outbreaks</span>
              </div>
              {outbreakDrafts.length > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                  {outbreakDrafts.length} to review
                </span>
              ) : (
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  isDark ? "bg-slate-950 text-slate-400" : "bg-[#ebdcc9] text-stone-700"
                }`}>
                  {stats.publishedNews || 0}
                </span>
              )}
            </button>

            {/* 5. Emergency Relief Funds & Donations Management */}
            <button
              onClick={() => {
                setActiveTab("funds")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "funds"
                  ? "bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white shadow-md shadow-teal-950/40"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconHeart size={16} className={activeTab === "funds" ? "text-rose-300" : "text-rose-400"} />
                <span>Relief Funds</span>
              </div>
              {fundStats.pendingCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black animate-pulse">
                  {fundStats.pendingCount} pending
                </span>
              ) : (
                <span className={`text-[10px] px-2 py-0.5 rounded ${
                  isDark ? "bg-slate-950 text-slate-400" : "bg-[#ebdcc9] text-stone-700"
                }`}>
                  {fundStats.totalPledges || 0}
                </span>
              )}
            </button>

            {/* 6. Setting */}
            <button
              onClick={() => {
                setActiveTab("settings")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "settings"
                  ? "bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white shadow-md shadow-teal-950/40"
                  : isDark
                    ? "text-slate-400 hover:text-white hover:bg-slate-800"
                    : "text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
              }`}
            >
              <IconSettings size={16} />
              <span>Setting</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className={`p-5 border-t ${
          isDark ? "border-slate-800 bg-slate-950/80" : "border-[#ebdcc9] bg-[#fbf9f4]"
        }`}>
          {/* Theme switcher */}
          <div className="flex items-center justify-between mb-4 px-1">
            <span className={`text-[11px] font-semibold ${isDark ? "text-slate-400" : "text-stone-600"}`}>
              Theme
            </span>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-teal-300 hover:bg-slate-800"
                  : "bg-white border-[#dfcdb7] text-teal-700 hover:bg-[#f5ecdf]"
              }`}
            >
              {isDark ? <IconSun size={13} /> : <IconMoon size={13} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 min-w-0 mb-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0 border border-teal-500/30">
              {currentUser?.name ? currentUser.name.charAt(0) : "A"}
            </div>
            <div className="truncate">
              <p className={`text-xs font-bold truncate leading-tight ${isDark ? "text-white" : "text-stone-900"}`}>
                {currentUser?.name || "Officer"}
              </p>
              <p className="text-[10px] font-semibold text-teal-500 uppercase tracking-wider">
                {currentUser?.role === "super_admin" ? "Super Admin" : "Officer"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              className={`py-2 text-center rounded-xl text-xs font-semibold border transition-colors ${
                isDark
                  ? "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
                  : "bg-white hover:bg-[#f5ecdf] text-stone-700 border-[#ebdcc9]"
              }`}
            >
              Public Site
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 text-center rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-semibold border border-rose-500/20 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className={`h-16 px-6 border-b flex items-center justify-between sticky top-0 z-30 backdrop-blur-md transition-colors ${
          isDark
            ? "bg-slate-900/80 border-slate-800"
            : "bg-[#fffefb]/95 border-[#ebdcc9]"
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${isDark ? "text-slate-400 hover:text-white" : "text-stone-600 hover:text-stone-900"}`}
            >
              <IconMenu size={20} />
            </button>
            <h1 className={`font-display font-extrabold text-lg sm:text-xl tracking-tight ${
              isDark ? "text-white" : "text-stone-900"
            }`}>
              {activeTab === "dashboard" && "Dashboard Overview & Analytics"}
              {activeTab === "admin" && "Administrative Team Roster"}
              {activeTab === "messages" && "Contact Messages & Inbound Triage"}
              {activeTab === "settings" && "Admin Profile & System Settings"}
            </h1>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-amber-400 hover:bg-slate-800"
                  : "bg-white border-[#ebdcc9] text-stone-700 hover:bg-[#f5ecdf]"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <IconSun size={17} /> : <IconMoon size={17} />}
            </button>

            {/* Notification Bell with Full Notifications Feed */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className={`p-2 rounded-xl border relative transition-colors cursor-pointer ${
                  isDark
                    ? "bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
                    : "bg-white border-[#ebdcc9] text-stone-700 hover:text-stone-900 hover:bg-[#f5ecdf]"
                }`}
                title="Notifications"
              >
                <IconBell size={17} />
                {stats.unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center animate-pulse">
                    {stats.unreadMessages}
                  </span>
                )}
              </button>

              {/* Real Notification Panel Dropdown */}
              {notificationOpen && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
                  isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900 shadow-xl"
                }`}>
                  <div className={`p-4 border-b flex items-center justify-between ${
                    isDark ? "border-slate-800 bg-slate-950/60" : "border-[#ebdcc9] bg-[#fbf9f4]"
                  }`}>
                    <div className="flex items-center gap-2">
                      <IconBell size={16} className="text-[#119197]" />
                      <span className="font-bold text-xs uppercase tracking-wider">
                        System Notifications
                      </span>
                      {stats.unreadMessages > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                          {stats.unreadMessages} unread
                        </span>
                      )}
                    </div>
                    {stats.unreadMessages > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] font-bold text-teal-600 hover:underline cursor-pointer"
                      >
                        Mark read
                      </button>
                    )}
                  </div>

                  <div className={`max-h-80 overflow-y-auto divide-y ${isDark ? "divide-slate-800/40" : "divide-[#ebdcc9]/60"}`}>
                    {notificationsList.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-400">
                        <IconCheck size={24} className="mx-auto text-emerald-500 mb-2" />
                        <p className="font-bold">No active alerts</p>
                        <p className={`text-[11px] mt-1 ${isDark ? "text-slate-500" : "text-stone-500"}`}>All systems functioning normally.</p>
                      </div>
                    ) : (
                      notificationsList.map((n, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            if (n.category === "message") {
                              const targetMsg = messages.find((m) => m.id === n.id)
                              if (targetMsg) openMessageModal(targetMsg)
                            }
                          }}
                          className={`p-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                            isDark ? "hover:bg-slate-800/60" : "hover:bg-[#f5ecdf]"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            n.category === "security"
                              ? "bg-purple-500/20 text-purple-400"
                              : n.category === "system"
                                ? "bg-teal-500/20 text-teal-400"
                                : "bg-amber-400/20 text-amber-500"
                          }`}>
                            {n.category === "security" ? "🛡️" : n.category === "system" ? "⚙️" : "✉️"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className={`text-xs font-bold truncate ${isDark ? "text-white" : "text-stone-900"}`}>{n.title}</p>
                              <span className={`text-[10px] ${isDark ? "text-slate-500" : "text-stone-500"}`}>
                                {new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-[#119197] truncate mt-0.5">
                              {n.subtitle}
                            </p>
                            <p className={`text-[11px] truncate mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                              {n.detail}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className={`p-2.5 text-center border-t text-[11px] ${
                    isDark ? "border-slate-800 bg-slate-950/60" : "border-[#ebdcc9] bg-[#fbf9f4]"
                  }`}>
                    <button
                      onClick={() => {
                        setActiveTab("messages")
                        setNotificationOpen(false)
                      }}
                      className="font-bold text-teal-600 hover:underline cursor-pointer"
                    >
                      View All Messages &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshAll}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isDark
                  ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                  : "bg-white border-[#ebdcc9] hover:bg-[#f5ecdf] text-stone-700 hover:text-stone-900"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>Refresh</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto space-y-6">

          {/* ==================================================== */}
          {/* TAB 1: DASHBOARD (KPIS, CIRCLE GAUGES & ANALYTICS)  */}
          {/* ==================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Row 1: KPI Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`border rounded-2xl p-5 shadow-2xs ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Total Inquiries
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
                      <IconMail size={16} />
                    </div>
                  </div>
                  <p className={`text-3xl font-black mt-2 ${isDark ? "text-white" : "text-stone-900"}`}>
                    {stats.totalMessages}
                  </p>
                  <p className="text-xs text-teal-600 font-semibold mt-2">Active Contact Flow</p>
                </div>

                <div className={`border rounded-2xl p-5 shadow-2xs ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                      Pending Inquiries
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <IconClock size={16} />
                    </div>
                  </div>
                  <p className={`text-3xl font-black mt-2 text-amber-500`}>
                    {stats.unreadMessages}
                  </p>
                  <p className="text-xs text-stone-400 mt-2">Requires Officer Review</p>
                </div>

                <div className={`border rounded-2xl p-5 shadow-2xs ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      Replied via Gmail
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <IconCheck size={16} />
                    </div>
                  </div>
                  <p className={`text-3xl font-black mt-2 text-emerald-500`}>
                    {stats.repliedMessages}
                  </p>
                  <p className="text-xs text-stone-400 mt-2">Direct Resolved Thread</p>
                </div>

                <div className={`border rounded-2xl p-5 shadow-2xs ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      System Admins
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                      <IconShieldCheck size={16} />
                    </div>
                  </div>
                  <p className={`text-3xl font-black mt-2 ${isDark ? "text-white" : "text-stone-900"}`}>
                    {stats.totalAdmins}
                  </p>
                  <p className="text-xs text-stone-400 mt-2">Active Governance Team</p>
                </div>
              </div>

              {/* Row 2: Analytics & Intelligence Dashboards (News Analysis & Funds Report Analysis) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* News & Outbreak Surveillance Analysis */}
                <div className={`border rounded-3xl p-5 sm:p-6 flex flex-col justify-between ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"
                }`}>
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-[#119197] flex items-center justify-center font-bold">
                          <IconGlobe size={16} />
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                            News & Community Surveillance Analysis
                          </h4>
                          <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                            Broadcast performance, community read velocity, and active outbreak alerts
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-[#119197] border border-teal-500/20">
                        {adminNewsList.length} Articles
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-4">
                      <div className={`p-3 rounded-2xl border text-center ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
                      }`}>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block">
                          Published News
                        </span>
                        <span className="text-xl font-black text-[#119197] mt-0.5 block font-mono">
                          {adminNewsList.length}
                        </span>
                      </div>

                      <div className={`p-3 rounded-2xl border text-center ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
                      }`}>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block">
                          Total Reader Views
                        </span>
                        <span className="text-xl font-black text-amber-500 mt-0.5 block font-mono">
                          {adminNewsList.reduce((acc, curr) => acc + (curr.views_count || 0), 0).toLocaleString()}
                        </span>
                      </div>

                      <div className={`p-3 rounded-2xl border text-center ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
                      }`}>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block">
                          Citizen Reports
                        </span>
                        <span className="text-xl font-black text-purple-400 mt-0.5 block font-mono">
                          {communityReports.length}
                        </span>
                      </div>
                    </div>

                    {/* Category Distribution Breakdown */}
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-400 font-semibold">Content Category Distribution</span>
                        <span className="text-[10px] text-[#119197] font-mono font-bold">Health Advisory Network</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
                        <div
                          className="bg-[#119197] h-full"
                          style={{
                            width: `${
                              adminNewsList.length > 0
                                ? (adminNewsList.filter((a) => a.category === "announcement").length / adminNewsList.length) * 100
                                : 50
                            }%`,
                          }}
                          title="Announcements"
                        />
                        <div
                          className="bg-rose-500 h-full"
                          style={{
                            width: `${
                              adminNewsList.length > 0
                                ? (adminNewsList.filter((a) => a.category === "outbreak").length / adminNewsList.length) * 100
                                : 25
                            }%`,
                          }}
                          title="Outbreaks"
                        />
                        <div
                          className="bg-amber-400 h-full"
                          style={{
                            width: `${
                              adminNewsList.length > 0
                                ? (adminNewsList.filter((a) => a.category === "advisory").length / adminNewsList.length) * 100
                                : 25
                            }%`,
                          }}
                          title="Advisories"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#119197]" />
                          Bulletins ({adminNewsList.filter((a) => a.category === "announcement").length})
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          Outbreak Alerts ({adminNewsList.filter((a) => a.category === "outbreak").length})
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          Preventive ({adminNewsList.filter((a) => a.category === "advisory").length})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      Pending outbreak drafts to approve: <strong>{outbreakDrafts.length}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("news")}
                      className="text-xs font-bold text-[#119197] hover:underline cursor-pointer"
                    >
                      Manage News &rarr;
                    </button>
                  </div>
                </div>

                {/* Funds Report Analysis */}
                <div className={`border rounded-3xl p-5 sm:p-6 flex flex-col justify-between ${
                  isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"
                }`}>
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                          <IconHeart size={16} className="text-rose-500" />
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                            Emergency Relief Funds Report Analysis
                          </h4>
                          <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                            Real-time disbursement metrics, verification progress, and channel distribution
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {fundStats.approvedCount || 0} Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 my-4">
                      <div className={`p-3 rounded-2xl border text-center ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
                      }`}>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block">
                          Verified Funds
                        </span>
                        <span className="text-xl font-black text-emerald-400 mt-0.5 block font-mono">
                          {(fundStats.verifiedTotal || 0).toLocaleString()} <span className="text-[10px] text-stone-400 font-sans">ETB</span>
                        </span>
                      </div>

                      <div className={`p-3 rounded-2xl border text-center ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
                      }`}>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block">
                          Pending Verification
                        </span>
                        <span className="text-xl font-black text-amber-500 mt-0.5 block font-mono">
                          {(fundStats.pendingTotal || 0).toLocaleString()} <span className="text-[10px] text-stone-400 font-sans">ETB</span>
                        </span>
                      </div>

                      <div className={`p-3 rounded-2xl border text-center ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
                      }`}>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold block">
                          Total Donors
                        </span>
                        <span className="text-xl font-black text-cyan-400 mt-0.5 block font-mono">
                          {fundPledges.length}
                        </span>
                      </div>
                    </div>

                    {/* Channels Distribution: Telebirr vs CBE vs BOA */}
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-400 font-semibold">Payment Channel Distribution</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold">
                          {Math.round(((fundStats.verifiedTotal || 0) / Math.max(1, (fundStats.verifiedTotal || 0) + (fundStats.pendingTotal || 0))) * 100)}% Verified
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden flex">
                        <div
                          className="bg-[#119197] h-full"
                          style={{
                            width: `${
                              fundPledges.length > 0
                                ? (fundPledges.filter((p) => p.payment_method === "Telebirr").length / fundPledges.length) * 100
                                : 40
                            }%`,
                          }}
                          title="Telebirr"
                        />
                        <div
                          className="bg-purple-600 h-full"
                          style={{
                            width: `${
                              fundPledges.length > 0
                                ? (fundPledges.filter((p) => p.payment_method === "CBE").length / fundPledges.length) * 100
                                : 35
                            }%`,
                          }}
                          title="CBE"
                        />
                        <div
                          className="bg-amber-500 h-full"
                          style={{
                            width: `${
                              fundPledges.length > 0
                                ? (fundPledges.filter((p) => p.payment_method === "BOA").length / fundPledges.length) * 100
                                : 25
                            }%`,
                          }}
                          title="Bank of Abyssinia"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#119197]" />
                          Telebirr ({fundPledges.filter((p) => p.payment_method === "Telebirr").length})
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-600" />
                          CBE ({fundPledges.filter((p) => p.payment_method === "CBE").length})
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          BOA ({fundPledges.filter((p) => p.payment_method === "BOA").length})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      Awaiting verification: <strong>{fundStats.pendingCount || 0} receipts</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("funds")}
                      className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
                    >
                      Audit Relief Vault &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 3: Quick Administrative Tools & Export Bar */}
              <div className={`border rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fdfbf7] border-amber-200/60 shadow-xs"
              }`}>
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-white" : "text-amber-950"}`}>
                    Administrative Quick Actions & Backups
                  </h4>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-amber-800/80"}`}>
                    Download contact submissions and registry logs in PDF or JSON format.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportInquiriesJSON}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-teal-400"
                        : "bg-white border-amber-200 hover:bg-amber-50 text-teal-700 shadow-2xs"
                    }`}
                  >
                    <IconDownload size={14} />
                    <span>Inquiries (JSON)</span>
                  </button>

                  <button
                    onClick={handleExportInquiriesPDF}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-purple-400"
                        : "bg-white border-amber-200 hover:bg-amber-50 text-purple-700 shadow-2xs"
                    }`}
                  >
                    <IconFileText size={14} />
                    <span>Inquiries (PDF)</span>
                  </button>

                  <button
                    onClick={handleExportFundsPDF}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-emerald-400"
                        : "bg-white border-amber-200 hover:bg-amber-50 text-emerald-700 shadow-2xs"
                    }`}
                  >
                    <IconFileText size={14} />
                    <span>Relief Report (PDF)</span>
                  </button>

                  {currentUser?.role === "super_admin" && (
                    <button
                      onClick={() => setShowAddAdminModal(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:from-[#09575b] hover:to-[#0c6e73] text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      + Add New Admin
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: ADMIN (ADMINS ROSTER TABLE + VIEW/EDIT/DELETE) */}
          {/* ==================================================== */}
          {activeTab === "admin" && (
            <div className="space-y-6">
              <div className={`flex flex-wrap items-center justify-between gap-4 border rounded-2xl p-5 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"
              }`}>
                <div>
                  <h3 className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-stone-900"}`}>
                    Administrative Team Roster
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                    Active administrators, credentials status, and role-based permissions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportAdminsJSON}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-teal-400"
                        : "bg-white border-[#ebdcc9] hover:bg-[#f5ecdf] text-teal-700 shadow-2xs"
                    }`}
                    title="Export Admins Roster as JSON"
                  >
                    <IconDownload size={13} />
                    <span>JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportAdminsPDF}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-purple-400"
                        : "bg-white border-[#ebdcc9] hover:bg-[#f5ecdf] text-purple-700 shadow-2xs"
                    }`}
                    title="Print or Save Admins Roster as PDF"
                  >
                    <IconFileText size={13} />
                    <span>PDF</span>
                  </button>

                  {currentUser?.role === "super_admin" && (
                    <button
                      type="button"
                      onClick={() => setShowAddAdminModal(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:from-[#09575b] hover:to-[#0c6e73] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      + Add New Admin
                    </button>
                  )}
                </div>
              </div>

              {/* Enhanced Admin Roster Table with #, ID, Name, Email, Role, Date Created, Actions */}
              <div className={`border rounded-2xl overflow-hidden shadow-xs ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`border-b text-slate-400 uppercase tracking-wider font-semibold ${
                      isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-500"
                    }`}>
                      <tr>
                        <th className="py-3.5 px-4 w-12 text-center">#</th>
                        <th className="py-3.5 px-4 w-24">Admin ID</th>
                        <th className="py-3.5 px-4">Officer Name</th>
                        <th className="py-3.5 px-4">Email / Username</th>
                        <th className="py-3.5 px-4">Role Access</th>
                        <th className="py-3.5 px-4">Created Date</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-[#f2e7da]"}`}>
                      {adminsList.slice().sort((a, b) => a.id - b.id).map((admin, idx) => (
                        <tr key={admin.id} className={isDark ? "hover:bg-slate-800/40" : "hover:bg-[#fcfaf6]"}>
                          {/* Order Number (1, 2, 3...) */}
                          <td className="py-3.5 px-4 font-bold text-center text-stone-400">
                            {idx + 1}
                          </td>

                          {/* Formatted Admin ID (T001, T002...) */}
                          <td className="py-3.5 px-4 font-mono font-bold text-[#119197]">
                            {formatAdminId(admin.id)}
                          </td>

                          {/* Officer Name */}
                          <td className={`py-3.5 px-4 font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                            {admin.name}
                          </td>

                          {/* Email / Username */}
                          <td className="py-3.5 px-4 text-stone-500 font-mono">
                            {admin.email}
                          </td>

                          {/* Role */}
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                admin.role === "super_admin"
                                  ? "bg-purple-500/15 text-purple-600 border border-purple-400/30"
                                  : "bg-teal-500/15 text-teal-700 border border-teal-500/30"
                              }`}
                            >
                              {admin.role === "super_admin" ? "Super Admin" : "Officer"}
                            </span>
                          </td>

                          {/* Created Date */}
                          <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                            {admin.created_at
                              ? new Date(admin.created_at).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "System Seed"}
                          </td>

                          {/* Actions: View, Edit, Delete Icons */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View Icon */}
                              <button
                                type="button"
                                onClick={() => setViewingAdmin(admin)}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                  isDark
                                    ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                                    : "bg-white border-[#dfcdb7] text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
                                }`}
                                title="View Admin Profile"
                              >
                                <IconEye size={14} />
                              </button>

                              {/* Edit Icon (Super Admin only) */}
                              {currentUser?.role === "super_admin" && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditAdmin(admin)}
                                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                    isDark
                                      ? "bg-slate-950 border-slate-800 text-teal-400 hover:text-teal-300 hover:bg-slate-800"
                                      : "bg-white border-[#dfcdb7] text-teal-700 hover:text-teal-900 hover:bg-[#f5ecdf]"
                                  }`}
                                  title="Edit Admin Account"
                                >
                                  <IconEdit size={14} />
                                </button>
                              )}

                              {/* Delete Icon (Super Admin only, not self or main superadmin) */}
                              {currentUser?.role === "super_admin" &&
                                admin.id !== currentUser.id &&
                                admin.email !== "admin@tenaye.health" && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteAdmin(admin.id)}
                                    className="p-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                                    title="Delete Admin Account"
                                  >
                                    <IconTrash size={14} />
                                  </button>
                                )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: CONTACT MESSAGE (INBOX + GMAIL & DELETE)      */}
          {/* ==================================================== */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              {/* Filter Tabs & Search Bar & Export Toolbar */}
              <div className={`border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"
              }`}>
                <div className="flex items-center gap-1.5">
                  {(["all", "unread", "replied"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        statusFilter === filter
                          ? "bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white shadow-sm"
                          : isDark
                            ? "text-slate-400 hover:text-white hover:bg-slate-800"
                            : "text-stone-600 hover:text-stone-900 hover:bg-[#f5ecdf]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 flex-1 justify-end max-w-lg">
                  <div className="relative flex-1 max-w-xs">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <IconSearch size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none focus:border-[#119197] transition-all border ${
                        isDark
                          ? "bg-slate-950 border-slate-800 text-white placeholder-slate-500"
                          : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 placeholder-stone-400 focus:bg-[#fffefb]"
                      }`}
                    />
                  </div>

                  {/* Export Options for Messages */}
                  <button
                    type="button"
                    onClick={handleExportInquiriesJSON}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-teal-400"
                        : "bg-white border-[#ebdcc9] hover:bg-[#f5ecdf] text-teal-700 shadow-2xs"
                    }`}
                    title="Export Inquiries as JSON"
                  >
                    <IconDownload size={13} />
                    <span>JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportInquiriesPDF}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-purple-400"
                        : "bg-white border-[#ebdcc9] hover:bg-[#f5ecdf] text-purple-700 shadow-2xs"
                    }`}
                    title="Print or Save Inquiries as PDF"
                  >
                    <IconFileText size={13} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>

              {/* Messages Table with Delete Button */}
              <div className={`border rounded-2xl overflow-hidden shadow-xs ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"
              }`}>
                {loading ? (
                  <div className="py-16 text-center text-stone-400 text-xs">
                    Loading contact inquiries from SQLite database...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="py-16 text-center px-4">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-3 text-stone-400 ${
                      isDark ? "bg-slate-950 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
                    }`}>
                      <IconMail size={22} />
                    </div>
                    <h3 className={`font-bold text-sm ${isDark ? "text-white" : "text-stone-900"}`}>
                      No Messages Found
                    </h3>
                    <p className="text-stone-400 text-xs mt-1 max-w-md mx-auto">
                      Submissions from the public{" "}
                      <Link to="/contact" className="text-teal-600 underline font-semibold">
                        Contact Page
                      </Link>{" "}
                      will display here.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-slate-400 uppercase tracking-wider font-semibold ${
                        isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-500"
                      }`}>
                        <tr>
                          <th className="py-3.5 px-4 w-28 text-center">Number</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Category</th>
                          <th className="py-3.5 px-4">Priority</th>
                          <th className="py-3.5 px-4">Sender & Contact</th>
                          <th className="py-3.5 px-4">Subject & Excerpt</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-[#f2e7da]"}`}>
                        {messages.slice().sort((a, b) => a.id - b.id).map((msg, idx) => (
                          <tr
                            key={msg.id}
                            className={`transition-colors cursor-pointer group ${
                              isDark ? "hover:bg-slate-800/40" : "hover:bg-[#fcfaf6]"
                            }`}
                          >
                            {/* Order Number Counter (1, 2, 3...) */}
                            <td
                              onClick={() => openMessageModal(msg)}
                              className="py-3.5 px-4 text-center whitespace-nowrap"
                            >
                              <span className="font-mono font-bold text-sm text-[#119197] bg-[#119197]/10 w-7 h-7 rounded-lg inline-flex items-center justify-center">
                                {idx + 1}
                              </span>
                            </td>
                            <td
                              onClick={() => openMessageModal(msg)}
                              className="py-3.5 px-4 whitespace-nowrap"
                            >
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  msg.status === "unread"
                                    ? "bg-amber-400/15 text-amber-600 border border-amber-500/30"
                                    : "bg-emerald-400/15 text-emerald-600 border border-emerald-500/30"
                                }`}
                              >
                                {msg.status}
                              </span>
                            </td>
                            {/* Category Badge */}
                            <td
                              onClick={() => openMessageModal(msg)}
                              className="py-3.5 px-4 whitespace-nowrap"
                            >
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                                  isDark
                                    ? "bg-slate-800 text-teal-300 border border-slate-700"
                                    : "bg-teal-50 text-teal-800 border border-teal-200"
                                }`}
                              >
                                {msg.category || "General Question"}
                              </span>
                            </td>
                            {/* Priority Level Badge */}
                            <td
                              onClick={() => openMessageModal(msg)}
                              className="py-3.5 px-4 whitespace-nowrap"
                            >
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  msg.priority?.includes("High")
                                    ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                                    : msg.priority?.includes("Low")
                                      ? "bg-stone-500/15 text-stone-500 border border-stone-500/30"
                                      : "bg-blue-500/15 text-blue-500 border border-blue-500/30"
                                }`}
                              >
                                {msg.priority || "Normal"}
                              </span>
                            </td>
                            {/* Sender Name, Email & Phone */}
                            <td
                              onClick={() => openMessageModal(msg)}
                              className="py-3.5 px-4 whitespace-nowrap"
                            >
                              <div
                                className={`font-bold group-hover:text-teal-600 ${
                                  isDark ? "text-white" : "text-stone-900"
                                }`}
                              >
                                {msg.name}
                              </div>
                              <div className="text-stone-500 font-mono text-[11px]">{msg.email}</div>
                              {msg.phone && (
                                <div className="text-[#0c6e73] font-medium text-[10px]">{msg.phone}</div>
                              )}
                            </td>
                            <td
                              onClick={() => openMessageModal(msg)}
                              className="py-3.5 px-4 max-w-xs sm:max-w-md"
                            >
                              <p className={`font-semibold truncate ${isDark ? "text-slate-200" : "text-stone-800"}`}>
                                {msg.subject || "No Subject"}
                              </p>
                              <p className="text-stone-400 truncate mt-0.5">{msg.message}</p>
                            </td>
                            <td
                              onClick={() => openMessageModal(msg)}
                              className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-[11px]"
                            >
                              {new Date(msg.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Mark Read / Unread toggle icon */}
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleMessageRead(msg.id, msg.status, e)}
                                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                    msg.status === "unread"
                                      ? "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 bg-emerald-500/10"
                                      : "border-slate-700 text-stone-400 hover:text-white hover:bg-slate-800"
                                  }`}
                                  title={msg.status === "unread" ? "Mark as Read" : "Mark as Unread"}
                                >
                                  <IconCheck size={14} className={msg.status === "read" ? "opacity-50" : "font-bold"} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openMessageModal(msg)}
                                  className="px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-[#119197] text-teal-400 hover:text-white border border-teal-500/30 font-bold text-xs transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                                >
                                  <IconSend size={12} />
                                  <span>{msg.status === "replied" ? "View / Reply" : "Reply in Gmail"}</span>
                                </button>

                                {/* Delete Message Button */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                                  title="Delete message"
                                >
                                  <IconTrash size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: NEWS, OUTBREAK SURVEILLANCE & RELIEF          */}
          {/* ==================================================== */}
          {activeTab === "news" && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className={`p-6 rounded-3xl border ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-500 border border-rose-500/30">
                        AI Outbreak Detection & Public News
                      </span>
                      {outbreakDrafts.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                          {outbreakDrafts.length} Action Required
                        </span>
                      )}
                    </div>
                    <h2 className={`font-display font-black text-xl sm:text-2xl mt-2 ${isDark ? "text-white" : "text-stone-900"}`}>
                      Epidemiological Outbreak Triage & Editorial Hub
                    </h2>
                    <p className={`text-xs mt-1 max-w-2xl leading-relaxed ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                      Review AI-drafted outbreak advisories generated from 3+ clustered citizen reports. Publish verified health news, platform features, and launch GoFundMe-style emergency relief campaigns.
                    </p>
                  </div>

                  <button
                    onClick={() => setNewsSubTab("create")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:from-[#09575b] hover:to-[#0c6e73] text-white text-xs font-bold shadow-lg shadow-teal-950/30 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <IconFileText size={14} />
                    <span>Write Article / Announcement</span>
                  </button>
                </div>

                {/* Sub Navigation Tabs */}
                <div className={`flex flex-wrap items-center gap-2 mt-6 pt-5 border-t ${isDark ? "border-slate-800/80" : "border-[#ebdcc9]"}`}>
                  {[
                    { id: "drafts", label: `AI Outbreak Review Queue (${outbreakDrafts.length})`, count: outbreakDrafts.length, alert: outbreakDrafts.length > 0 },
                    { id: "create", label: "Write Announcement" },
                    { id: "articles", label: `Published Articles (${adminNewsList.length})` },
                    { id: "reports", label: `Citizen Reports Feed (${communityReports.length})` },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => setNewsSubTab(st.id as any)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                        newsSubTab === st.id
                          ? "bg-[#119197] text-white shadow-sm"
                          : isDark
                            ? "bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800"
                            : "bg-[#f5ecdf] text-stone-700 hover:bg-[#ebdcc9]"
                      }`}
                    >
                      <span>{st.label}</span>
                      {st.alert && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action notice */}
              {actionNotice && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between">
                  <span>{actionNotice}</span>
                  <button onClick={() => setActionNotice(null)} className="text-emerald-400 hover:text-white">
                    <IconX size={14} />
                  </button>
                </div>
              )}

              {/* SUBTAB 1: AI OUTBREAK DRAFTS REVIEW QUEUE */}
              {newsSubTab === "drafts" && (
                <div className="space-y-4">
                  {outbreakDrafts.length === 0 ? (
                    <div className={`p-12 text-center rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"}`}>
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                        <IconCheck size={28} />
                      </div>
                      <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                        No Pending Outbreak Drafts
                      </h3>
                      <p className={`text-xs mt-1 max-w-md mx-auto ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                        All community health reports are currently within normal variance. When 3 or more citizens report identical symptoms in the same zone, Tenaye AI will synthesize an advisory draft and alert you here.
                      </p>
                    </div>
                  ) : (
                    outbreakDrafts.map((draft) => {
                      const reliefConfig = draftReliefSettings[draft.id] || {
                        has_relief: Boolean(draft.has_relief),
                        relief_goal: String(draft.relief_goal || 50000),
                        relief_beneficiary: draft.relief_beneficiary || `${draft.cluster_region} Community Emergency Relief`,
                        relief_description: draft.relief_description || `Providing clean water sanitization, oral hydration salts, and primary medical supplies for vulnerable households in ${draft.cluster_region}.`,
                      }

                      return (
                        <div
                          key={draft.id}
                          className={`p-6 sm:p-7 rounded-3xl border transition-all space-y-5 ${
                            isDark ? "bg-slate-900 border-rose-900/50 shadow-lg" : "bg-[#fffefb] border-rose-200 shadow-md"
                          }`}
                        >
                          {/* Header Bar */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rose-200/40">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white shadow-xs">
                                🚨 Urgent Outbreak Cluster
                              </span>
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-teal-500/15 text-[#119197] border border-teal-500/30">
                                📍 {draft.cluster_region}
                              </span>
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/15 text-amber-600 border border-amber-500/30">
                                🔬 {draft.cluster_symptoms || "Reported Symptoms"}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono">
                              Triggered {new Date(draft.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {new Date(draft.created_at).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Headline & Abstract */}
                          <div>
                            <h3 className={`text-xl font-black leading-tight ${isDark ? "text-white" : "text-stone-900"}`}>
                              {draft.title}
                            </h3>
                            <p className={`text-xs mt-2 leading-relaxed ${isDark ? "text-slate-300" : "text-stone-600"}`}>
                              {draft.excerpt}
                            </p>
                          </div>

                          {/* ── CARD 1: CITIZEN INTAKE & EPIDEMIOLOGICAL ANALYSIS CARD ── */}
                          <div className={`p-5 rounded-2xl border ${
                            isDark ? "bg-slate-950/70 border-slate-800" : "bg-gradient-to-br from-teal-50/70 to-emerald-50/40 border-teal-200/80"
                          }`}>
                            <div className="flex items-center gap-2.5 mb-3 text-[#0c6e73]">
                              <div className="w-7 h-7 rounded-xl bg-teal-500/15 flex items-center justify-center font-bold">
                                <IconActivity size={16} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                  Citizen Intake & Epidemiological Analysis
                                </h4>
                                <p className="text-[11px] text-teal-700 font-medium">
                                  {draft.cluster_count || 3} independent citizen reports clustered in {draft.cluster_region}
                                </p>
                              </div>
                            </div>

                            {/* Underlying citizen reports feed table */}
                            {draft.citizen_reports && draft.citizen_reports.length > 0 ? (
                              <div className="mt-3 overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                   <thead>
                                    <tr className={`border-b text-[10px] uppercase font-bold tracking-wider ${
                                      isDark ? "border-slate-800 text-slate-400" : "border-teal-200 text-teal-900"
                                    }`}>
                                      <th className="py-2 px-2.5 w-8 text-center">#</th>
                                      <th className="py-2 px-2.5">Reporter Identity</th>
                                      <th className="py-2 px-2.5">Verified Contact</th>
                                      <th className="py-2 px-2.5">Disease / Symptoms</th>
                                      <th className="py-2 px-2.5">Severity</th>
                                      <th className="py-2 px-2.5">Citizen Notes</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-800/20 text-[11px]">
                                    {(draft.citizen_reports || [])
                                      .slice()
                                      .sort((a: any, b: any) => a.id - b.id)
                                      .map((rep: any, idx: number) => (
                                      <tr key={rep.id} className="hover:bg-black/5">
                                        <td className="py-2 px-2.5 font-bold text-center text-teal-600">
                                          {idx + 1}
                                        </td>
                                        <td className="py-2 px-2.5 font-bold text-slate-800 dark:text-slate-200">
                                          {rep.reporter_name || "Anonymous Citizen"}
                                        </td>
                                        <td className="py-2 px-2.5 font-mono text-slate-500 dark:text-slate-400">
                                          {rep.reporter_contact || "Registered"}
                                        </td>
                                        <td className="py-2 px-2.5 font-medium text-slate-700 dark:text-slate-300">
                                          {rep.disease_or_symptoms}
                                        </td>
                                        <td className="py-2 px-2.5">
                                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                            rep.severity === "urgent" || rep.severity === "high"
                                              ? "bg-rose-500/15 text-rose-500"
                                              : "bg-amber-500/15 text-amber-500"
                                          }`}>
                                            {rep.severity || "medium"}
                                          </span>
                                        </td>
                                        <td className="py-2 px-2.5 italic text-slate-500 max-w-xs truncate">
                                          {rep.notes ? `"${rep.notes}"` : "None provided"}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500 italic">
                                Algorithmic analysis confirmed cross-verification of {draft.cluster_count || 3} local reports matching "{draft.cluster_symptoms}" in this jurisdiction.
                              </p>
                            )}
                          </div>

                          {/* ── CARD 2: PREVIEW OF AI GENERATED BULLETIN ── */}
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              Synthesized Public Advisory Text Preview:
                            </span>
                            <div className={`p-4 rounded-2xl border text-xs leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-sans ${
                              isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-700"
                            }`}>
                              {draft.content}
                            </div>
                          </div>

                          {/* ── CARD 3: OPTIONAL GOFUNDME / RELIEF CAMPAIGN TOGGLE ── */}
                          <div className={`p-4 rounded-2xl border transition-all ${
                            isDark
                              ? reliefConfig.has_relief ? "bg-teal-950/40 border-teal-700/60" : "bg-slate-950/40 border-slate-800"
                              : reliefConfig.has_relief ? "bg-teal-50 border-teal-300" : "bg-stone-50 border-stone-200"
                          }`}>
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={reliefConfig.has_relief}
                                  onChange={(e) => {
                                    setDraftReliefSettings((prev) => ({
                                      ...prev,
                                      [draft.id]: {
                                        ...reliefConfig,
                                        has_relief: e.target.checked,
                                      },
                                    }))
                                  }}
                                  className="w-4 h-4 rounded text-[#119197] focus:ring-[#119197] cursor-pointer"
                                />
                                <div>
                                  <span className={`text-xs font-bold block ${isDark ? "text-white" : "text-stone-900"}`}>
                                    Attach Community Emergency Relief / "GoFundMe" Campaign
                                  </span>
                                  <span className="text-[11px] text-slate-400 block">
                                    {reliefConfig.has_relief
                                      ? "Active: Community members can pledge financial support via Telebirr, CBE, or BOA."
                                      : "Optional: Leave unchecked to publish as a pure informational health advisory without funding."}
                                  </span>
                                </div>
                              </label>
                              <IconHeart size={18} className={reliefConfig.has_relief ? "text-rose-500 animate-pulse" : "text-slate-400"} />
                            </div>

                            {reliefConfig.has_relief && (
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-teal-200/60 dark:border-teal-800/60">
                                <div>
                                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                                    Fundraising Target (ETB)
                                  </label>
                                  <input
                                    type="number"
                                    min="1000"
                                    value={reliefConfig.relief_goal}
                                    onChange={(e) => {
                                      setDraftReliefSettings((prev) => ({
                                        ...prev,
                                        [draft.id]: {
                                          ...reliefConfig,
                                          relief_goal: e.target.value,
                                        },
                                      }))
                                    }}
                                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                                      isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-teal-300 text-stone-900"
                                    }`}
                                  />
                                </div>

                                <div>
                                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                                    Beneficiary Fund Name
                                  </label>
                                  <input
                                    type="text"
                                    value={reliefConfig.relief_beneficiary}
                                    onChange={(e) => {
                                      setDraftReliefSettings((prev) => ({
                                        ...prev,
                                        [draft.id]: {
                                          ...reliefConfig,
                                          relief_beneficiary: e.target.value,
                                        },
                                      }))
                                    }}
                                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                                      isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-teal-300 text-stone-900"
                                    }`}
                                  />
                                </div>

                                <div>
                                  <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                                    Campaign Mission Note
                                  </label>
                                  <input
                                    type="text"
                                    value={reliefConfig.relief_description}
                                    onChange={(e) => {
                                      setDraftReliefSettings((prev) => ({
                                        ...prev,
                                        [draft.id]: {
                                          ...reliefConfig,
                                          relief_description: e.target.value,
                                        },
                                      }))
                                    }}
                                    className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                                      isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-teal-300 text-stone-900"
                                    }`}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* ── CARD ACTIONS: ACCEPT / REJECT ── */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/40">
                            <span className="text-[11px] text-slate-400">
                              Status: <strong className="text-amber-500 uppercase">Pending Triage Clearance</strong>
                            </span>

                            <div className="flex items-center gap-3 self-end sm:self-auto">
                              <button
                                type="button"
                                onClick={() => handleRejectDraft(draft.id)}
                                className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/20 text-xs font-bold transition-all cursor-pointer"
                              >
                                Reject & Discard
                              </button>
                              <button
                                type="button"
                                disabled={approvingDraftId === draft.id}
                                onClick={() => handleApproveDraft(draft)}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                              >
                                <IconCheck size={14} />
                                <span>{approvingDraftId === draft.id ? "Publishing..." : "Accept & Publish Alert"}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              )}

              {/* SUBTAB 2: WRITE NEW ANNOUNCEMENT */}
              {newsSubTab === "create" && (
                <div className={`p-6 sm:p-8 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"}`}>
                  <h3 className={`font-display font-bold text-lg mb-1 ${isDark ? "text-white" : "text-stone-900"}`}>
                    Publish Official News or Medical Announcement
                  </h3>
                  <p className={`text-xs mb-6 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                    Draft articles will instantly be broadcasted to the public /news portal.
                  </p>

                  {createArticleNotice && (
                    <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                      {createArticleNotice}
                    </div>
                  )}

                  <form onSubmit={handleCreateArticle} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className={`block text-xs font-bold mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                          Article Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Expansion of Emergency 907 Ambulance Routing in Sidama Region"
                          value={newArticleTitle}
                          onChange={(e) => setNewArticleTitle(e.target.value)}
                          className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                            isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-bold mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                          Category *
                        </label>
                        <select
                          value={newArticleCategory}
                          onChange={(e) => setNewArticleCategory(e.target.value)}
                          className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                            isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900"
                          }`}
                        >
                          <option value="announcement">Platform Announcement</option>
                          <option value="health_tip">Clinical Advisory & Tips</option>
                          <option value="outbreak">Epidemic Alert</option>
                          <option value="relief">Relief & Support Campaign</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                        Brief Summary / Excerpt
                      </label>
                      <input
                        type="text"
                        placeholder="1-2 sentences summarizing the key announcement..."
                        value={newArticleExcerpt}
                        onChange={(e) => setNewArticleExcerpt(e.target.value)}
                        className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                          isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900"
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                        Full Article Content *
                      </label>
                      <textarea
                        rows={7}
                        required
                        placeholder="Detailed clinical instructions, quotes, or guidelines..."
                        value={newArticleContent}
                        onChange={(e) => setNewArticleContent(e.target.value)}
                        className={`w-full border rounded-2xl p-4 text-xs focus:outline-none focus:border-[#119197] resize-none ${
                          isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900"
                        }`}
                      />
                    </div>

                    {/* Relief Campaign Option */}
                    <div className={`p-4 rounded-2xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-teal-50/50 border-teal-200"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newArticleHasRelief}
                            onChange={(e) => setNewArticleHasRelief(e.target.checked)}
                            className="rounded text-[#119197] focus:ring-[#119197]"
                          />
                          <span className={`text-xs font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                            Attach Community Emergency Relief / "GoFundMe" Campaign
                          </span>
                        </label>
                        <IconHeart size={16} className="text-rose-500" />
                      </div>

                      {newArticleHasRelief && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-800/40">
                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                              Fundraising Target (ETB)
                            </label>
                            <input
                              type="number"
                              min="1000"
                              value={newArticleReliefGoal}
                              onChange={(e) => setNewArticleReliefGoal(e.target.value)}
                              className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                                isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-[#ebdcc9] text-stone-900"
                              }`}
                            />
                          </div>
                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                              Beneficiary Fund Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Clean Water & ORS Support"
                              value={newArticleReliefBeneficiary}
                              onChange={(e) => setNewArticleReliefBeneficiary(e.target.value)}
                              className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                                isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-[#ebdcc9] text-stone-900"
                              }`}
                            />
                          </div>
                          <div>
                            <label className={`block text-[11px] font-bold mb-1 ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                              Campaign Description
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Procuring rehydration kits..."
                              value={newArticleReliefDesc}
                              onChange={(e) => setNewArticleReliefDesc(e.target.value)}
                              className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                                isDark ? "bg-slate-900 border-slate-700 text-white" : "bg-white border-[#ebdcc9] text-stone-900"
                              }`}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={creatingArticle}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md"
                      >
                        {creatingArticle ? "Publishing..." : "Publish Article Now"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* SUBTAB 3: PUBLISHED ARTICLES CATALOG */}
              {newsSubTab === "articles" && (
                <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"}`}>
                  <div className="p-4 sm:p-5 border-b border-slate-800/40 flex items-center justify-between">
                    <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                      All Platform News & Bulletins ({adminNewsList.filter((art) => art.published === 1 && art.status === "published").length})
                    </h3>
                    <Link
                      to="/news"
                      target="_blank"
                      className="text-xs font-bold text-[#119197] hover:underline flex items-center gap-1"
                    >
                      <IconGlobe size={13} />
                      <span>View Public /news Page &rarr;</span>
                    </Link>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className={`border-b ${isDark ? "border-slate-800 text-slate-400 bg-slate-950/40" : "border-[#ebdcc9] text-stone-600 bg-[#fbf9f4]"}`}>
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Title & Excerpt</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">Author</th>
                          <th className="py-3 px-4">Views</th>
                          <th className="py-3 px-4">Relief Campaign</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {adminNewsList
                          .filter((art) => art.published === 1 && art.status === "published")
                          .slice()
                          .sort((a, b) => a.id - b.id)
                          .map((art, idx) => (
                          <tr key={art.id} className={isDark ? "hover:bg-slate-800/40" : "hover:bg-stone-50"}>
                            <td className="py-3 px-4 font-bold text-stone-400">{idx + 1}</td>
                            <td className="py-3 px-4 max-w-sm">
                              <p className={`font-bold line-clamp-1 ${isDark ? "text-white" : "text-stone-900"}`}>
                                {art.title}
                              </p>
                              <p className="text-[11px] text-stone-400 line-clamp-1">{art.excerpt}</p>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-[#119197]">
                                {art.category}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-stone-400 whitespace-nowrap">{art.author_name}</td>
                            <td className="py-3 px-4 whitespace-nowrap font-mono">{art.views_count}</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {art.has_relief ? (
                                <span className="text-[10px] font-bold text-emerald-400">
                                  {art.relief_raised?.toLocaleString()} / {art.relief_goal?.toLocaleString()} ETB
                                </span>
                              ) : (
                                <span className="text-stone-500 text-[10px]">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setViewingArticle(art)}
                                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                    isDark
                                      ? "border-slate-700 text-stone-300 hover:text-white hover:bg-slate-800"
                                      : "border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                                  }`}
                                  title="Read article inside dashboard"
                                >
                                  <IconEye size={13} />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteArticle(art.id)}
                                  className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                                  title="Delete article"
                                >
                                  <IconTrash size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUBTAB 4: CITIZEN OUTBREAK SURVEILLANCE FEED */}
              {newsSubTab === "reports" && (
                <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"}`}>
                  <div className="p-4 sm:p-5 border-b border-slate-800/40 flex items-center justify-between">
                    <div>
                      <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                        Citizen Disease & Outbreak Reports ({communityReports.length})
                      </h3>
                      <p className={`text-[11px] ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                        Live intake from the public reporting modal. Clustered automatically when 3+ reports match.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className={`border-b ${isDark ? "border-slate-800 text-slate-400 bg-slate-950/40" : "border-[#ebdcc9] text-stone-600 bg-[#fbf9f4]"}`}>
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Reporter</th>
                          <th className="py-3 px-4">Zone / Sub-City</th>
                          <th className="py-3 px-4">Symptoms / Condition</th>
                          <th className="py-3 px-4">Count</th>
                          <th className="py-3 px-4">Severity</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {communityReports
                          .slice()
                          .sort((a, b) => a.id - b.id)
                          .map((cr, idx) => (
                          <tr key={cr.id} className={isDark ? "hover:bg-slate-800/40" : "hover:bg-stone-50"}>
                            <td className="py-3 px-4 font-bold text-stone-400">{idx + 1}</td>
                            <td className="py-3 px-4 font-semibold text-stone-300">
                              {cr.reporter_name}
                              {cr.reporter_contact && (
                                <span className="block text-[10px] text-stone-500 font-mono">{cr.reporter_contact}</span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-bold text-[#119197]">{cr.region_subcity}</td>
                            <td className="py-3 px-4 max-w-xs truncate" title={cr.disease_or_symptoms}>
                              {cr.disease_or_symptoms}
                              {cr.notes && <span className="block text-[10px] text-stone-400 truncate">"{cr.notes}"</span>}
                            </td>
                            <td className="py-3 px-4 font-bold">{cr.affected_count || 1}</td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                cr.severity === "urgent" || cr.severity === "high"
                                  ? "bg-rose-500/15 text-rose-400"
                                  : "bg-amber-500/15 text-amber-400"
                              }`}>
                                {cr.severity}
                              </span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                cr.status === "clustered"
                                  ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                  : "bg-teal-500/15 text-[#119197] border border-teal-500/30"
                              }`}>
                                {cr.status === "clustered" ? "Clustered (AI)" : "Pending Review"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-stone-400 whitespace-nowrap text-[11px]">
                              {new Date(cr.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setSelectedCommunityReport(cr)}
                                className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ml-auto cursor-pointer transition-colors ${
                                  isDark
                                    ? "border-slate-700 text-teal-400 hover:text-teal-300 hover:bg-slate-800"
                                    : "border-[#ebdcc9] text-[#0c6e73] hover:text-[#119197] hover:bg-teal-50"
                                }`}
                                title="View complete report intake details"
                              >
                                <IconEye size={13} />
                                <span>View</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: RELIEF FUNDS & DONOR VERIFICATION MANAGEMENT  */}
          {/* ==================================================== */}
          {activeTab === "funds" && (
            <div className="space-y-6">
              {/* Top Highlights Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-5 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                    Total Verified Relief
                  </p>
                  <p className="text-2xl font-black text-emerald-500 mt-1 font-mono">
                    {fundStats.verifiedTotal?.toLocaleString()} <span className="text-xs font-bold text-slate-400">ETB</span>
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {fundStats.approvedCount || 0} approved contributions
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                    Pending Verification
                  </p>
                  <p className="text-2xl font-black text-amber-500 mt-1 font-mono">
                    {fundStats.pendingTotal?.toLocaleString()} <span className="text-xs font-bold text-slate-400">ETB</span>
                  </p>
                  <p className="text-[11px] text-amber-400/90 mt-1 font-semibold">
                    {fundStats.pendingCount || 0} awaiting receipt check
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                    Active Campaigns
                  </p>
                  <p className="text-2xl font-black text-[#119197] mt-1 font-mono">
                    {fundCampaigns.length}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    Emergency response funds
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"}`}>
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                    Total Donor Submissions
                  </p>
                  <p className="text-2xl font-black text-slate-300 mt-1 font-mono">
                    {fundStats.totalPledges || 0}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {fundStats.rejectedCount || 0} rejected receipts
                  </p>
                </div>
              </div>

              {/* Active Campaigns Progress Overview */}
              <div className={`rounded-3xl border overflow-hidden p-6 ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                      Active Relief Vaults & Progress
                    </h3>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                      Live community relief campaigns connected to public advisories.
                    </p>
                  </div>
                  <button
                    onClick={fetchFunds}
                    className="text-xs px-3 py-1.5 rounded-xl border border-teal-500/30 text-[#119197] hover:bg-teal-500/10 cursor-pointer font-bold"
                  >
                    Refresh Balances
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fundCampaigns.map((camp) => {
                    const percent = camp.relief_goal > 0
                      ? Math.min(100, Math.round((camp.relief_raised / camp.relief_goal) * 100))
                      : 0
                    return (
                      <div
                        key={camp.id}
                        className={`p-4 rounded-2xl border ${isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-[10px] text-teal-400 font-bold">
                            Vault #{camp.id}
                          </span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                            {percent}%
                          </span>
                        </div>
                        <h4 className={`text-xs font-bold line-clamp-1 ${isDark ? "text-white" : "text-stone-900"}`}>
                          {camp.relief_beneficiary || camp.title}
                        </h4>
                        <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5 mb-3">
                          {camp.title}
                        </p>

                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
                          <div
                            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-400">
                            Raised: <strong className="text-emerald-400">{camp.relief_raised?.toLocaleString()} ETB</strong>
                          </span>
                          <span className="text-stone-400">
                            Goal: <strong className="text-slate-300">{camp.relief_goal?.toLocaleString()} ETB</strong>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Donors & Receipts Table */}
              <div className={`rounded-3xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9]"}`}>
                <div className="p-4 sm:p-5 border-b border-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                      Donor Requests & Payment Receipt Verification Table
                    </h3>
                    <p className={`text-xs ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                      Review uploaded Telebirr and Bank of Abyssinia (BOA) transfer receipts to approve or reject.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Export Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleExportFundsJSON}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isDark
                            ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-teal-400"
                            : "bg-white border-[#ebdcc9] hover:bg-[#f5ecdf] text-teal-700 shadow-2xs"
                        }`}
                        title="Export Relief Funds Data as JSON"
                      >
                        <IconDownload size={13} />
                        <span>JSON</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleExportFundsPDF}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isDark
                            ? "bg-slate-950 border-slate-800 hover:border-slate-700 text-purple-400"
                            : "bg-white border-[#ebdcc9] hover:bg-[#f5ecdf] text-purple-700 shadow-2xs"
                        }`}
                        title="Print or Save Relief Funds Report as PDF"
                      >
                        <IconFileText size={13} />
                        <span>PDF</span>
                      </button>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/40 border border-slate-800 text-xs">
                      {(["all", "pending", "approved", "rejected"] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => setFundStatusFilter(st)}
                          className={`px-3 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                            fundStatusFilter === st
                              ? "bg-[#119197] text-white shadow-xs"
                              : isDark ? "text-slate-400 hover:text-white" : "text-stone-600 hover:text-stone-900"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className={`border-b ${isDark ? "border-slate-800 text-slate-400 bg-slate-950/40" : "border-[#ebdcc9] text-stone-600 bg-[#fbf9f4]"}`}>
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">Donor Name & Contact</th>
                        <th className="py-3 px-4">Amount (ETB)</th>
                        <th className="py-3 px-4">Channel</th>
                        <th className="py-3 px-4">Associated Campaign</th>
                        <th className="py-3 px-4">Receipt Screenshot</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Verification Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {fundPledges
                        .filter((p) => fundStatusFilter === "all" || p.status === fundStatusFilter)
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((p, idx) => (
                          <tr key={p.id} className={isDark ? "hover:bg-slate-800/40" : "hover:bg-stone-50"}>
                            <td className="py-3 px-4 font-bold text-stone-400">{idx + 1}</td>
                            <td className="py-3 px-4">
                              <span className={`font-bold block ${isDark ? "text-white" : "text-stone-900"}`}>
                                {p.donor_name}
                              </span>
                              {p.donor_phone && (
                                <span className="font-mono text-[10px] text-stone-400 block">{p.donor_phone}</span>
                              )}
                              {p.message && (
                                <span className="italic text-[10px] text-teal-400/90 line-clamp-1 max-w-xs">
                                  "{p.message}"
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-mono font-black text-emerald-400 text-sm whitespace-nowrap">
                              +{p.amount_etb?.toLocaleString()} ETB
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.payment_method === "BOA"
                                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                  : p.payment_method === "CBE"
                                  ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                  : "bg-teal-500/15 text-teal-400 border border-teal-500/30"
                              }`}>
                                {p.payment_method === "BOA" ? "Bank of Abyssinia" : p.payment_method === "CBE" ? "Commercial Bank (CBE)" : p.payment_method}
                              </span>
                            </td>
                            <td className="py-3 px-4 max-w-xs truncate" title={p.post_title}>
                              <span className="font-semibold text-stone-300 block truncate">{p.relief_beneficiary || p.post_title}</span>
                              <span className="text-[10px] text-stone-500 truncate block">Article #{p.post_id}</span>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {p.receipt_image ? (
                                <button
                                  type="button"
                                  onClick={() => setViewingReceiptModal(p)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-teal-500/10 border border-teal-500/30 text-[#119197] hover:bg-teal-500/20 font-bold text-[10px] cursor-pointer"
                                >
                                  <IconEye size={12} />
                                  <span>View Receipt</span>
                                </button>
                              ) : (
                                <span className="text-stone-500 text-[10px] italic">No receipt file</span>
                              )}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                p.status === "approved"
                                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                  : p.status === "rejected"
                                  ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                                  : "bg-amber-500/15 text-amber-400 border border-amber-500/30 animate-pulse"
                              }`}>
                                {p.status || "pending"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-stone-400 whitespace-nowrap text-[11px]">
                              {new Date(p.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedFundDetail(p)}
                                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                    isDark
                                      ? "border-slate-700 text-stone-300 hover:text-white hover:bg-slate-800"
                                      : "border-stone-300 text-stone-700 hover:text-stone-900 hover:bg-stone-100"
                                  }`}
                                  title="View Full Pledge & Donor Details"
                                >
                                  <IconEye size={13} />
                                </button>

                                {p.status !== "approved" && (
                                  <button
                                    type="button"
                                    disabled={fundActionLoading === p.id}
                                    onClick={() => handleApproveFund(p.id)}
                                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-colors cursor-pointer disabled:opacity-50"
                                    title="Verify and Approve Donation"
                                  >
                                    {fundActionLoading === p.id ? "Saving..." : "Approve"}
                                  </button>
                                )}
                                {p.status !== "rejected" && (
                                  <button
                                    type="button"
                                    disabled={fundActionLoading === p.id}
                                    onClick={() => handleRejectFund(p.id)}
                                    className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 font-bold text-[10px] transition-colors cursor-pointer disabled:opacity-50"
                                    title="Reject Invalid Payment"
                                  >
                                    Reject
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 6: SETTING (PROFILE SETTINGS & APP PREFERENCES)  */}
          {/* ==================================================== */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-4xl">
              {/* Profile Card: Edit Own Name, Email, Password */}
              <div className={`border rounded-2xl p-6 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"
              }`}>
                <div className="mb-4">
                  <h3 className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-stone-900"}`}>
                    Admin Profile & Account Settings
                  </h3>
                  <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                    Update your official officer name, login email, and secure credentials.
                  </p>
                </div>

                {profileMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <IconCheck size={14} />
                    <span>{profileMessage}</span>
                  </div>
                )}

                {profileError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                    {profileError}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                        Display Name / Username
                      </label>
                      <input
                        type="text"
                        required
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                          isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                        Admin Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                          isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Password Change Sub-section */}
                  <div className={`pt-4 border-t ${isDark ? "border-slate-800/60" : "border-[#ebdcc9]"}`}>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-3">
                      Change Account Password (Optional)
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div>
                        <label className={`block text-[11px] font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={profileCurrentPassword}
                          onChange={(e) => setProfileCurrentPassword(e.target.value)}
                          className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                            isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[11px] font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="min 6 chars"
                          value={profileNewPassword}
                          onChange={(e) => setProfileNewPassword(e.target.value)}
                          className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                            isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-[11px] font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="repeat password"
                          value={profileConfirmPassword}
                          onChange={(e) => setProfileConfirmPassword(e.target.value)}
                          className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#119197] ${
                            isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-md"
                    >
                      {profileLoading ? "Saving..." : "Save Profile Changes"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Preferences Card */}
              <div className={`border rounded-2xl p-6 ${
                isDark ? "bg-slate-900 border-slate-800" : "bg-[#fffefb] border-[#ebdcc9] shadow-xs"
              }`}>
                <h3 className={`font-display font-bold text-lg mb-4 ${isDark ? "text-white" : "text-stone-900"}`}>
                  Clinical AI & Triage Automation
                </h3>

                <div className="space-y-4">
                  <div className={`flex items-center justify-between pb-4 border-b ${isDark ? "border-slate-800/50" : "border-[#ebdcc9]"}`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-xs font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                          Automatic AI Intent Detection & Drafting
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          autoAiDraftEnabled
                            ? "bg-teal-500/15 text-[#119197] border border-teal-500/30"
                            : "bg-stone-500/15 text-stone-400 border border-stone-500/30"
                        }`}>
                          {autoAiDraftEnabled ? "Active" : "Disabled"}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                        Analyzes whether user is reporting a bug, proposing partnership, or asking for health triage.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleAutoAiDraft}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        autoAiDraftEnabled ? "bg-[#119197]" : "bg-slate-700"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        autoAiDraftEnabled ? "right-1" : "left-1"
                      }`} />
                    </button>
                  </div>

                  <div className={`flex items-center justify-between pb-4 border-b ${isDark ? "border-slate-800/50" : "border-[#ebdcc9]"}`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-xs font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                          Live Sound Alerts
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          soundAlertsEnabled
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-stone-500/15 text-stone-400 border border-stone-500/30"
                        }`}>
                          {soundAlertsEnabled ? "Audio On" : "Muted"}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                        Receive live audio notifications when an urgent message arrives.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleToggleSoundAlerts}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        soundAlertsEnabled ? "bg-[#119197]" : "bg-slate-700"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        soundAlertsEnabled ? "right-1" : "left-1"
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: MESSAGE DETAIL + SMART AI DRAFT + GMAIL DISPATCH */}
      {/* ======================================================== */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl shadow-2xl border max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            {/* Header */}
            <div className={`flex items-start justify-between gap-4 pb-4 border-b ${
              isDark ? "border-slate-800" : "border-[#ebdcc9]"
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedMessage.status === "unread"
                        ? "bg-amber-400/15 text-amber-500 border border-amber-500/30"
                        : "bg-emerald-400/15 text-emerald-500 border border-emerald-500/30"
                    }`}
                  >
                    {selectedMessage.status}
                  </span>
                  {selectedMessage.category && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-teal-500/15 text-[#119197] border border-teal-500/30">
                      {selectedMessage.category}
                    </span>
                  )}
                  {selectedMessage.priority &&
                    selectedMessage.category !== "Feedback" &&
                    selectedMessage.priority !== "Feedback" && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          selectedMessage.priority.includes("High")
                            ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                            : "bg-blue-500/15 text-blue-500 border border-blue-500/30"
                        }`}
                      >
                        {selectedMessage.priority}
                      </span>
                    )}
                </div>
                <h3 className={`font-display font-bold text-xl mt-2 ${isDark ? "text-white" : "text-stone-900"}`}>
                  {selectedMessage.subject || "No Subject"}
                </h3>
                <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                  From: <span className="font-bold text-[#119197]">{selectedMessage.name}</span> (
                  <span className="font-mono text-stone-500">{selectedMessage.email}</span>)
                  {selectedMessage.phone && (
                    <span className="ml-2 font-medium text-teal-600">
                      • Phone: {selectedMessage.phone}
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-stone-500 hover:text-stone-900 hover:bg-[#f5ecdf]"
                }`}
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Original message quote */}
            <div className={`my-5 p-4 rounded-2xl border ${
              isDark ? "bg-slate-950 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
            }`}>
              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                Original Inquiry Message:
              </span>
              <p className={`text-xs leading-relaxed whitespace-pre-line font-medium ${
                isDark ? "text-slate-200" : "text-stone-800"
              }`}>
                {selectedMessage.message}
              </p>
            </div>

            {/* AI Generation action banner */}
            <div className="flex items-center justify-between mb-3">
              <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                <IconSparkles size={14} className="text-[#119197]" />
                <span>
                  {autoAiDraftEnabled ? "Clinical AI Intent & Reply Draft:" : "Officer Manual Reply Draft:"}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  autoAiDraftEnabled
                    ? "bg-teal-500/15 text-[#119197] border border-teal-500/30"
                    : "bg-stone-500/15 text-stone-400 border border-stone-500/30"
                }`}>
                  {autoAiDraftEnabled ? "Auto-AI On" : "Manual Mode"}
                </span>
              </label>
              <button
                type="button"
                onClick={() => generateAiReply(selectedMessage)}
                disabled={aiGenerating}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-[#119197] border border-teal-500/30 text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <IconSparkles size={12} />
                <span>{aiGenerating ? "Analyzing..." : autoAiDraftEnabled ? "Re-generate with AI" : "Generate with Clinical AI"}</span>
              </button>
            </div>

            {/* Reply textarea */}
            <textarea
              rows={6}
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Edit draft response..."
              className={`w-full border rounded-2xl p-4 text-xs focus:outline-none focus:border-[#119197] transition-all resize-none leading-relaxed ${
                isDark
                  ? "bg-slate-950 border-slate-800 text-white"
                  : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
              }`}
            />

            {/* Action Notice if taken */}
            {actionNotice && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <IconCheck size={14} />
                <span>{actionNotice}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className={`flex items-center justify-between pt-5 mt-2 border-t ${isDark ? "border-slate-800/50" : "border-[#ebdcc9]"}`}>
              <button
                type="button"
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-500/30 text-rose-500 hover:bg-rose-500/20 text-xs font-bold transition-colors cursor-pointer"
              >
                <IconTrash size={14} />
                <span>Delete Inquiry</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                    isDark
                      ? "border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800"
                      : "border-[#ebdcc9] text-stone-700 hover:bg-[#f5ecdf]"
                  }`}
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleRedirectToGmail}
                  disabled={markingReplied}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] hover:from-[#09575b] hover:to-[#0c6e73] text-white text-xs font-bold shadow-lg shadow-teal-950/40 transition-all cursor-pointer disabled:opacity-50"
                >
                  <IconSend size={14} />
                  <span>{markingReplied ? "Opening..." : "Open in Google Gmail & Send"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: REGISTER NEW ADMIN (SUPER ADMIN ONLY)           */}
      {/* ======================================================== */}
      {showAddAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl shadow-2xl border max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isDark ? "border-slate-800" : "border-[#ebdcc9]"
            }`}>
              <h3 className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-stone-900"}`}>
                Register New System Admin
              </h3>
              <button
                type="button"
                onClick={() => setShowAddAdminModal(false)}
                className={`p-1.5 rounded-lg cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-stone-500 hover:text-stone-900"}`}
              >
                <IconX size={18} />
              </button>
            </div>

            {addAdminError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium">
                {addAdminError}
              </div>
            )}

            {addAdminSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-medium">
                {addAdminSuccess}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4 mt-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Full Name / Officer Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nahom Tibebu"
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Official Email / Username
                </label>
                <input
                  type="email"
                  required
                  placeholder="nahom@tenaye.health"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Role Assignment
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as any)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                >
                  <option value="admin">Operations Officer (Admin)</option>
                  <option value="super_admin">Super Administrator</option>
                </select>
              </div>

              <div className={`flex items-center justify-end gap-3 pt-4 border-t ${isDark ? "border-slate-800" : "border-[#ebdcc9]"}`}>
                <button
                  type="button"
                  onClick={() => setShowAddAdminModal(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold ${
                    isDark ? "border-slate-800 text-slate-400 hover:text-white" : "border-[#ebdcc9] text-stone-700 hover:bg-[#f5ecdf]"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addAdminLoading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {addAdminLoading ? "Creating..." : "Save Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: EDIT ADMIN (SUPER ADMIN ONLY)                   */}
      {/* ======================================================== */}
      {editingAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl shadow-2xl border max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isDark ? "border-slate-800" : "border-[#ebdcc9]"
            }`}>
              <h3 className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-stone-900"}`}>
                Edit Admin Account {formatAdminId(editingAdmin.id)}
              </h3>
              <button
                type="button"
                onClick={() => setEditingAdmin(null)}
                className={`p-1.5 rounded-lg cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-stone-500 hover:text-stone-900"}`}
              >
                <IconX size={18} />
              </button>
            </div>

            {editAdminError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-medium">
                {editAdminError}
              </div>
            )}

            <form onSubmit={handleSaveEditAdmin} className="space-y-4 mt-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Full Name / Username
                </label>
                <input
                  type="text"
                  required
                  value={editAdminName}
                  onChange={(e) => setEditAdminName(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Official Email
                </label>
                <input
                  type="email"
                  required
                  value={editAdminEmail}
                  onChange={(e) => setEditAdminEmail(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Reset Password (Leave blank to keep current)
                </label>
                <input
                  type="password"
                  placeholder="New password (min 6 chars)"
                  value={editAdminPassword}
                  onChange={(e) => setEditAdminPassword(e.target.value)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-slate-400" : "text-stone-600"}`}>
                  Role Assignment
                </label>
                <select
                  value={editAdminRole}
                  onChange={(e) => setEditAdminRole(e.target.value as any)}
                  className={`w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#119197] ${
                    isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-[#fbf9f4] border-[#ebdcc9] text-stone-900 focus:bg-[#fffefb]"
                  }`}
                >
                  <option value="admin">Operations Officer (Admin)</option>
                  <option value="super_admin">Super Administrator</option>
                </select>
              </div>

              <div className={`flex items-center justify-end gap-3 pt-4 border-t ${isDark ? "border-slate-800" : "border-[#ebdcc9]"}`}>
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className={`px-4 py-2 rounded-xl border text-xs font-semibold ${
                    isDark ? "border-slate-800 text-slate-400 hover:text-white" : "border-[#ebdcc9] text-stone-700 hover:bg-[#f5ecdf]"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editAdminLoading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0c6e73] to-[#119197] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {editAdminLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: VIEW ADMIN PROFILE                              */}
      {/* ======================================================== */}
      {viewingAdmin && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl shadow-2xl border max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isDark ? "border-slate-800" : "border-[#ebdcc9]"
            }`}>
              <h3 className={`font-display font-bold text-lg ${isDark ? "text-white" : "text-stone-900"}`}>
                Admin Profile {formatAdminId(viewingAdmin.id)}
              </h3>
              <button
                type="button"
                onClick={() => setViewingAdmin(null)}
                className={`p-1.5 rounded-lg cursor-pointer ${isDark ? "text-slate-400 hover:text-white" : "text-stone-500 hover:text-stone-900"}`}
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="my-5 space-y-3 text-xs">
              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"}`}>
                <span className={`text-[10px] uppercase font-bold block mb-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>Officer Name</span>
                <p className="font-bold text-sm">{viewingAdmin.name}</p>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"}`}>
                <span className={`text-[10px] uppercase font-bold block mb-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>Email Address</span>
                <p className="font-mono">{viewingAdmin.email}</p>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"}`}>
                <span className={`text-[10px] uppercase font-bold block mb-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>System Privilege</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  viewingAdmin.role === "super_admin"
                    ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                    : "bg-teal-500/15 text-teal-600 border border-teal-500/30"
                }`}>
                  {viewingAdmin.role === "super_admin" ? "Super Administrator" : "Operations Officer"}
                </span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? "bg-slate-950 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"}`}>
                <span className={`text-[10px] uppercase font-bold block mb-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>Registration Date</span>
                <p className={isDark ? "text-slate-300" : "text-stone-700"}>
                  {viewingAdmin.created_at
                    ? new Date(viewingAdmin.created_at).toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Primary System Initial Seed"}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setViewingAdmin(null)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-[#ebdcc9] text-stone-800 hover:bg-[#dfcdb7]"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: IN-DASHBOARD ARTICLE READER PREVIEW MODAL       */}
      {/* ======================================================== */}
      {viewingArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`rounded-3xl shadow-2xl border max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-500/15 text-[#119197] border border-teal-500/30">
                  {viewingArticle.category}
                </span>
                <span className="text-xs text-stone-400 font-mono">Article #{viewingArticle.id}</span>
              </div>
              <button
                type="button"
                onClick={() => setViewingArticle(null)}
                className={`p-1.5 rounded-xl cursor-pointer ${
                  isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-stone-500 hover:text-stone-900 hover:bg-stone-200"
                }`}
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="my-5 space-y-4">
              <h2 className="text-lg font-bold leading-snug">{viewingArticle.title}</h2>
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <span>By <strong>{viewingArticle.author_name}</strong></span>
                <span>•</span>
                <span>{new Date(viewingArticle.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <span>{viewingArticle.views_count} views</span>
              </div>

              {viewingArticle.excerpt && (
                <p className={`p-3.5 rounded-xl text-xs italic ${
                  isDark ? "bg-slate-950 text-slate-300 border border-slate-800" : "bg-stone-50 text-stone-700 border border-stone-200"
                }`}>
                  "{viewingArticle.excerpt}"
                </p>
              )}

              <div className="pt-2">
                {/* Visual rich card renderer for article content */}
                {(() => {
                  const content = viewingArticle.content
                  if (!content) return null
                  const hasHeadings = /^##\s+/m.test(content)
                  // Helper: auto-detect and style bullet points, key:value pairs, and paragraphs
                  const renderSmartBlocks = (text: string) => {
                    const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
                    return (
                      <div className="space-y-3.5">
                        {paragraphs.map((para: string, pIdx: number) => {
                          const lines = para.split("\n").map(l => l.trim()).filter(Boolean)

                          // Intro header ending with colon
                          if (lines.length === 1 && lines[0].endsWith(":") && lines[0].length < 80) {
                            return (
                              <div key={pIdx} className="pt-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#119197]" />
                                <h4 className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-slate-200" : "text-stone-800"}`}>
                                  {lines[0].replace(/:$/, "")}
                                </h4>
                              </div>
                            )
                          }

                          // List of bullet points or numbered items or key:value pairs
                          const isListBlock = lines.length > 1 && lines.every(l =>
                            /^[-*•]|\d+[.)]/.test(l) || /^[A-Z][\w\s/&-]{2,35}:\s*/.test(l)
                          )

                          if (isListBlock) {
                            return (
                              <div key={pIdx} className="space-y-2">
                                {lines.map((item: string, iIdx: number) => {
                                  const cleanItem = item.replace(/^[-*•]\s*|\d+[.)]\s*/, "")
                                  const matchKV = cleanItem.match(/^(\*\*)?([A-Za-z0-9\s/&-]{2,40})(\*\*)?:\s*(.*)$/)

                                  if (matchKV) {
                                    const keyLabel = matchKV[2].trim()
                                    const valText = matchKV[4].trim()
                                    return (
                                      <div
                                        key={iIdx}
                                        className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                                          isDark
                                            ? "bg-slate-950/70 border-slate-800"
                                            : "bg-teal-50/50 border-teal-200/80"
                                        }`}
                                      >
                                        <div className="w-5 h-5 rounded-md bg-teal-500/15 text-[#119197] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                                          {iIdx + 1}
                                        </div>
                                        <div className="text-xs leading-relaxed">
                                          <strong className={`block font-bold mb-0.5 ${isDark ? "text-white" : "text-stone-900"}`}>
                                            {keyLabel}
                                          </strong>
                                          <span className={isDark ? "text-slate-300" : "text-stone-600"}>
                                            {valText}
                                          </span>
                                        </div>
                                      </div>
                                    )
                                  }

                                  return (
                                    <div
                                      key={iIdx}
                                      className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                                        isDark ? "bg-slate-950/40 border-slate-800 text-slate-300" : "bg-white border-stone-200 text-stone-700"
                                      }`}
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#119197] shrink-0 mt-2" />
                                      <span>{cleanItem.replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            )
                          }

                          // Single Key: Value item
                          const singleKvMatch = para.match(/^(\*\*)?([A-Z][A-Za-z0-9\s/&-]{2,35})(\*\*)?:\s*(.*)$/)
                          if (singleKvMatch && lines.length === 1) {
                            return (
                              <div
                                key={pIdx}
                                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                                  isDark ? "bg-slate-950/70 border-slate-800" : "bg-teal-50/50 border-teal-200/80"
                                }`}
                              >
                                <div className="p-1.5 rounded-lg bg-teal-500/15 text-[#119197] shrink-0 mt-0.5">
                                  <IconActivity size={14} />
                                </div>
                                <div className="text-xs leading-relaxed">
                                  <strong className={`block font-bold mb-0.5 ${isDark ? "text-white" : "text-stone-900"}`}>
                                    {singleKvMatch[2].trim()}
                                  </strong>
                                  <span className={isDark ? "text-slate-300" : "text-stone-600"}>
                                    {singleKvMatch[4].trim()}
                                  </span>
                                </div>
                              </div>
                            )
                          }

                          // First paragraph (Executive overview)
                          if (pIdx === 0) {
                            return (
                              <div
                                key={pIdx}
                                className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                                  isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-stone-50 border-stone-200 text-stone-800 font-medium"
                                }`}
                              >
                                <div className="flex items-center gap-1.5 mb-1.5 text-[#119197]">
                                  <IconAlertCircle size={14} />
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Official Briefing Overview
                                  </span>
                                </div>
                                <p>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
                              </div>
                            )
                          }

                          // Closing / Contact notice
                          if (/for inquiries|contact|hotline|support desk|further details/i.test(para)) {
                            return (
                              <div
                                key={pIdx}
                                className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 ${
                                  isDark ? "bg-teal-950/30 border-teal-800/50 text-teal-300" : "bg-teal-50 border-teal-200 text-[#0c6e73]"
                                }`}
                              >
                                <IconPhone size={15} className="shrink-0 text-[#119197]" />
                                <p>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
                              </div>
                            )
                          }

                          return (
                            <div
                              key={pIdx}
                              className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                                isDark ? "bg-slate-950/40 border-slate-800 text-slate-300" : "bg-white border-stone-200 text-stone-700"
                              }`}
                            >
                              <p>{para.replace(/\*\*(.*?)\*\*/g, "$1")}</p>
                            </div>
                          )
                        })}
                      </div>
                    )
                  }

                  if (!hasHeadings) {
                    return renderSmartBlocks(content)
                  }

                  const rawSections = content.split(/^##\s+/m).filter(Boolean)
                  return (
                    <div className="space-y-4">
                      {rawSections.map((sec: string, idx: number) => {
                        const lines = sec.trim().split("\n")
                        const heading = lines[0].trim()
                        const bodyLines = lines.slice(1).join("\n").trim()

                        if (/investigation summary|surveillance/i.test(heading)) {
                          const items = bodyLines.split("\n").filter((l: string) => l.trim().startsWith("-") || l.trim().startsWith("*"))
                          return (
                            <div key={idx} className={`p-4 rounded-2xl border ${
                              isDark ? "bg-teal-950/40 border-teal-800/60" : "bg-teal-50/80 border-teal-200"
                            }`}>
                              <h4 className="font-bold text-xs text-teal-400 mb-2.5 flex items-center gap-2">
                                <IconActivity size={15} />
                                <span>Epidemiological Investigation Summary</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {items.map((it: string, i: number) => {
                                  const clean = it.replace(/^[-*]\s*/, "").replace(/\*\*/g, "")
                                  const [k, ...vParts] = clean.split(":")
                                  return (
                                    <div key={i} className={`p-2 rounded-xl border ${
                                      isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-teal-100 text-slate-800"
                                    }`}>
                                      <span className="text-[10px] uppercase font-bold text-slate-400 block">{k.trim()}</span>
                                      <span className="font-semibold">{vParts.join(":").trim() || k.trim()}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }

                        if (/what happened|clinical context|pathology|vector/i.test(heading)) {
                          return (
                            <div key={idx} className={`p-4 rounded-2xl border ${
                              isDark ? "bg-slate-950 border-slate-800" : "bg-white border-stone-200"
                            }`}>
                              <h4 className="font-bold text-xs text-indigo-400 mb-1.5 flex items-center gap-2">
                                <IconAlertCircle size={15} />
                                <span>Clinical Definition & Transmission Vector</span>
                              </h4>
                              <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                                {bodyLines.replace(/\*\*(.*?)\*\*/g, "$1")}
                              </p>
                            </div>
                          )
                        }

                        if (/environmental|guidance|protective|directives|prevention/i.test(heading)) {
                          const dirs = bodyLines.split(/\n(?=\d+\.|\-)/).map((d: string) => d.trim()).filter(Boolean)
                          return (
                            <div key={idx} className={`p-4 rounded-2xl border ${
                              isDark ? "bg-amber-950/30 border-amber-800/50" : "bg-amber-50/80 border-amber-200"
                            }`}>
                              <h4 className="font-bold text-xs text-amber-500 mb-2.5 flex items-center gap-2">
                                <IconShieldCheck size={15} />
                                <span>Immediate Environmental Guidance & Directives</span>
                              </h4>
                              <div className="space-y-2">
                                {dirs.map((dir: string, i: number) => {
                                  const clean = dir.replace(/^\d+\.\s*/, "").replace(/^[-*]\s*/, "")
                                  const m = clean.match(/^\*\*(.*?)\*\*:\s*(.*)$/)
                                  return (
                                    <div key={i} className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                                      isDark ? "bg-slate-900 border-slate-800" : "bg-white border-amber-100"
                                    }`}>
                                      <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                        {i + 1}
                                      </span>
                                      <div>
                                        <strong className={isDark ? "text-white" : "text-slate-900"}>{m ? m[1] : `Step ${i + 1}`}: </strong>
                                        <span className={isDark ? "text-slate-300" : "text-slate-600"}>{m ? m[2].replace(/\*\*/g, "") : clean.replace(/\*\*/g, "")}</span>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }

                        if (/treatment|triage|emergency protocol|ambulance/i.test(heading)) {
                          const triageBlocks = bodyLines.split(/\n(?=###|(?:\d+\.|\-)\s*\*\*)/).map((b: string) => b.trim()).filter(Boolean)
                          return (
                            <div key={idx} className={`p-4 rounded-2xl border ${
                              isDark ? "bg-rose-950/30 border-rose-800/50" : "bg-rose-50/80 border-rose-200"
                            }`}>
                              <h4 className="font-bold text-xs text-rose-500 mb-2 flex items-center gap-2">
                                <IconStethoscope size={15} />
                                <span>Treatment Guide & Triage Directives (Home vs. Hospital)</span>
                              </h4>
                              <div className="space-y-2 text-xs">
                                {triageBlocks.map((block: string, i: number) => {
                                  const clean = block.replace(/^###\s*/, "")
                                  if (clean.includes("Can This Be Treated") || clean.includes("Treatability Assessment")) {
                                    return <div key={i} className="font-bold uppercase text-[10px] text-slate-400">{clean.replace(/\*\*/g, "")}</div>
                                  }
                                  const isHome = /home supportive|home care|mild cases|home observation|safe at home/i.test(clean)
                                  const isHospital = /hospital|untreatable|immediate transfer|emergency clinical|escalation|evacuat/i.test(clean)
                                  const [titlePart, ...descParts] = clean.split(":")
                                  return (
                                    <div key={i} className={`p-2.5 rounded-xl border ${
                                      isHome
                                        ? isDark ? "bg-emerald-950/30 border-emerald-800/60 text-emerald-200" : "bg-emerald-50 border-emerald-200 text-emerald-950"
                                        : isHospital
                                        ? isDark ? "bg-rose-900/30 border-rose-700/60 text-rose-200" : "bg-rose-100/70 border-rose-300 text-rose-950"
                                        : isDark ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-stone-200 text-slate-700"
                                    }`}>
                                      <strong className="block mb-0.5">{titlePart.replace(/^[-*]\s*/, "").replace(/\*\*/g, "")}</strong>
                                      <span className="text-[11px] opacity-90">{descParts.join(":").replace(/\*\*/g, "").trim() || clean.replace(/\*\*/g, "")}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }

                        if (/notice|disclaimer/i.test(heading)) {
                          return null
                        }

                        return (
                          <div key={idx} className={`p-3.5 rounded-2xl border text-xs ${
                            isDark ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-stone-50 border-stone-200 text-slate-700"
                          }`}>
                            <h5 className="font-bold uppercase tracking-wider text-[11px] mb-1">{heading.replace(/^[#\s]+/, "")}</h5>
                            <p>{bodyLines.replace(/^[#-*\s]+/gm, "").replace(/\*\*/g, "")}</p>
                          </div>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>

              {viewingArticle.has_relief ? (
                <div className={`p-4 rounded-2xl border ${
                  isDark ? "bg-teal-950/40 border-teal-800/50" : "bg-teal-50 border-teal-200"
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold text-teal-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <IconHeart size={14} className="text-rose-400" />
                      Attached Relief Fund
                    </span>
                    <span>
                      {viewingArticle.relief_raised?.toLocaleString()} / {viewingArticle.relief_goal?.toLocaleString()} ETB
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    Beneficiary: <strong>{viewingArticle.relief_beneficiary || "Community Fund"}</strong>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setViewingArticle(null)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-[#ebdcc9] text-stone-800 hover:bg-[#dfcdb7]"
                }`}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 6: DONATION PAYMENT RECEIPT VERIFICATION MODAL     */}
      {/* ======================================================== */}
      {viewingReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`rounded-3xl shadow-2xl border max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/40">
              <div>
                <h3 className="text-sm font-bold">Payment Receipt Verification</h3>
                <p className="text-[11px] text-stone-400 font-mono">
                  Donation #{viewingReceiptModal.id} • {viewingReceiptModal.donor_name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewingReceiptModal(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="my-4 space-y-3">
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-black/40 flex items-center justify-center max-h-[380px]">
                <img
                  src={viewingReceiptModal.receipt_image}
                  alt="Payment Receipt"
                  className="w-full h-auto object-contain max-h-[380px]"
                />
              </div>

              <div className={`p-3 rounded-xl text-xs space-y-1.5 ${
                isDark ? "bg-slate-950 border border-slate-800" : "bg-[#fbf9f4] border border-[#ebdcc9]"
              }`}>
                <div className="flex justify-between">
                  <span className="text-stone-400">Pledged Amount:</span>
                  <strong className="text-emerald-400 font-mono">+{viewingReceiptModal.amount_etb?.toLocaleString()} ETB</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Payment Channel:</span>
                  <strong className="text-[#119197]">{viewingReceiptModal.payment_method === "BOA" ? "Bank of Abyssinia (BOA)" : viewingReceiptModal.payment_method}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Current Status:</span>
                  <span className="font-bold uppercase tracking-wider text-[10px] text-amber-400">{viewingReceiptModal.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setViewingReceiptModal(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-stone-200 text-stone-800 hover:bg-stone-300"
                }`}
              >
                Close
              </button>
              {viewingReceiptModal.status !== "approved" && (
                <button
                  type="button"
                  disabled={fundActionLoading === viewingReceiptModal.id}
                  onClick={() => {
                    handleApproveFund(viewingReceiptModal.id)
                    setViewingReceiptModal(null)
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                >
                  Approve & Add to Balance
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 7: FULL DONOR PLEDGE & CAMPAIGN DETAIL MODAL       */}
      {/* ======================================================== */}
      {selectedFundDetail && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`rounded-3xl shadow-2xl border max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-500/10 text-[#119197] border border-teal-500/20">
                  <IconHeart size={18} className="text-rose-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Relief Contribution Record</h3>
                  <p className="text-[11px] text-stone-400 font-mono">
                    Pledge #{selectedFundDetail.id} • {selectedFundDetail.donor_name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedFundDetail(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <IconX size={18} />
              </button>
            </div>

            <div className="my-5 space-y-4">
              {/* Financial Highlight */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-teal-50/60 border-teal-200"
              }`}>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                    Pledged Donation Amount
                  </span>
                  <span className="text-2xl font-black font-mono text-emerald-500">
                    +{selectedFundDetail.amount_etb?.toLocaleString()} ETB
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                    Current Status
                  </span>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mt-1 ${
                    selectedFundDetail.status === "approved"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : selectedFundDetail.status === "rejected"
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  }`}>
                    {selectedFundDetail.status || "pending"}
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className={`rounded-2xl border divide-y text-xs ${
                isDark ? "bg-slate-950/40 border-slate-800 divide-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9] divide-[#ebdcc9]"
              }`}>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Donor Name:</span>
                  <strong className={isDark ? "text-white" : "text-stone-900"}>{selectedFundDetail.donor_name}</strong>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Phone Contact:</span>
                  <span className="font-mono text-stone-300">{selectedFundDetail.donor_phone || "Not provided (Anonymous/Online)"}</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Payment Channel:</span>
                  <strong className="text-[#119197]">
                    {selectedFundDetail.payment_method === "BOA"
                      ? "Bank of Abyssinia (BOA)"
                      : selectedFundDetail.payment_method === "CBE"
                      ? "Commercial Bank of Ethiopia (CBE)"
                      : "Telebirr (Mobile Wallet)"}
                  </strong>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Associated Campaign:</span>
                  <span className="font-semibold text-right max-w-xs truncate text-stone-200">
                    {selectedFundDetail.relief_beneficiary || selectedFundDetail.post_title || "General Emergency Relief"}
                  </span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Submission Timestamp:</span>
                  <span className="text-stone-400 font-mono text-[11px]">{new Date(selectedFundDetail.created_at).toLocaleString()}</span>
                </div>
              </div>

              {/* Message from Donor */}
              {selectedFundDetail.message && (
                <div className={`p-3.5 rounded-2xl border ${
                  isDark ? "bg-slate-950 border-slate-800" : "bg-white border-[#ebdcc9]"
                }`}>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 block mb-1">
                    Donor Solidarity Note
                  </span>
                  <p className="text-xs italic text-stone-300">
                    "{selectedFundDetail.message}"
                  </p>
                </div>
              )}

              {/* Receipt Preview if available */}
              {selectedFundDetail.receipt_image && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                    Proof of Transfer / Receipt Attachment
                  </span>
                  <div className="rounded-2xl border border-slate-700 bg-black/40 overflow-hidden flex items-center justify-center max-h-56">
                    <img
                      src={selectedFundDetail.receipt_image}
                      alt="Transfer Receipt"
                      className="w-full h-auto object-contain max-h-56 cursor-pointer"
                      onClick={() => setViewingReceiptModal(selectedFundDetail)}
                      title="Click to enlarge"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3.5 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setSelectedFundDetail(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-stone-200 text-stone-800 hover:bg-stone-300"
                }`}
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {selectedFundDetail.status !== "approved" && (
                  <button
                    type="button"
                    disabled={fundActionLoading === selectedFundDetail.id}
                    onClick={() => {
                      handleApproveFund(selectedFundDetail.id)
                      setSelectedFundDetail(null)
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Approve & Credit Campaign
                  </button>
                )}
                {selectedFundDetail.status !== "rejected" && (
                  <button
                    type="button"
                    disabled={fundActionLoading === selectedFundDetail.id}
                    onClick={() => {
                      handleRejectFund(selectedFundDetail.id)
                      setSelectedFundDetail(null)
                    }}
                    className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Reject Record
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 7: VIEW CITIZEN COMMUNITY REPORT DETAIL            */}
      {/* ======================================================== */}
      {selectedCommunityReport && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className={`rounded-3xl shadow-2xl border max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-[#fffefb] border-[#ebdcc9] text-stone-900"
          }`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedCommunityReport.status === "clustered"
                    ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                    : "bg-teal-500/15 text-[#119197] border border-teal-500/30"
                }`}>
                  {selectedCommunityReport.status === "clustered" ? "Clustered by AI" : "Pending Surveillance Clearance"}
                </span>
                <span className="text-xs text-stone-400 font-mono">Report #{selectedCommunityReport.id}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCommunityReport(null)}
                className={`p-1.5 rounded-xl cursor-pointer ${
                  isDark ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-stone-500 hover:text-stone-900 hover:bg-stone-200"
                }`}
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="my-5 space-y-4">
              <div className={`p-4 rounded-2xl border ${
                isDark ? "bg-slate-950/60 border-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9]"
              }`}>
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-600 block mb-1">
                  Reported Illness & Condition
                </span>
                <h3 className="text-base font-bold text-[#119197]">
                  {selectedCommunityReport.disease_or_symptoms}
                </h3>
              </div>

              {/* Attributes Grid */}
              <div className={`rounded-2xl border divide-y text-xs ${
                isDark ? "bg-slate-950/40 border-slate-800 divide-slate-800" : "bg-[#fbf9f4] border-[#ebdcc9] divide-[#ebdcc9]"
              }`}>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Reporter Identity:</span>
                  <strong className={isDark ? "text-white" : "text-stone-900"}>
                    {selectedCommunityReport.reporter_name || "Anonymous Citizen"}
                  </strong>
                </div>

                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Contact Email / Phone:</span>
                  <span className="font-mono text-stone-300">
                    {selectedCommunityReport.reporter_contact || "Mandatory intake not specified"}
                  </span>
                </div>

                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Zone / Sub-City:</span>
                  <strong className="text-[#119197]">{selectedCommunityReport.region_subcity}</strong>
                </div>

                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Affected Individuals:</span>
                  <strong className="text-amber-500 font-bold">{selectedCommunityReport.affected_count || 1} Person(s)</strong>
                </div>

                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Clinical Severity Level:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    selectedCommunityReport.severity === "urgent" || selectedCommunityReport.severity === "high"
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  }`}>
                    {selectedCommunityReport.severity || "medium"}
                  </span>
                </div>

                <div className="p-3 flex justify-between items-center">
                  <span className="text-stone-400">Logged Timestamp:</span>
                  <span className="text-stone-400 font-mono text-[11px]">
                    {new Date(selectedCommunityReport.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Additional Citizen Observation Notes */}
              <div className={`p-4 rounded-2xl border ${
                isDark ? "bg-slate-950 border-slate-800" : "bg-white border-[#ebdcc9]"
              }`}>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Citizen Field Notes & Context
                </span>
                <p className={`text-xs leading-relaxed italic ${isDark ? "text-slate-300" : "text-stone-700"}`}>
                  {selectedCommunityReport.notes ? `"${selectedCommunityReport.notes}"` : "No additional contextual notes provided by reporter."}
                </p>
              </div>

              {/* Epidemiological Surveillance Notice */}
              <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 ${
                isDark ? "bg-teal-950/30 border-teal-800/40 text-teal-300" : "bg-teal-50 border-teal-200 text-[#0c6e73]"
              }`}>
                <IconActivity size={16} className="shrink-0 text-[#119197]" />
                <p className="text-[11px] leading-relaxed">
                  When 3 or more citizen reports share matching symptoms in <strong>{selectedCommunityReport.region_subcity}</strong>, the automated surveillance engine clusters them into an epidemiological draft advisory for triage review.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end pt-3.5 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => setSelectedCommunityReport(null)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                  isDark ? "bg-slate-800 text-white hover:bg-slate-700" : "bg-stone-200 text-stone-800 hover:bg-stone-300"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
export default AdminDashboard
