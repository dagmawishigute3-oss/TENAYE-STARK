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
  publishedNews: number
  resolutionRate?: number
}

interface SystemNotification {
  id: number | string
  title: string
  subtitle: string
  detail: string
  category: "message" | "security" | "system"
  created_at: string
}

type DashboardTab = "dashboard" | "admin" | "messages" | "settings"
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

  // Settings: Profile Form states
  const [profileName, setProfileName] = useState("")
  const [profileEmail, setProfileEmail] = useState("")
  const [profileCurrentPassword, setProfileCurrentPassword] = useState("")
  const [profileNewPassword, setProfileNewPassword] = useState("")
  const [profileConfirmPassword, setProfileConfirmPassword] = useState("")
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string | null>(null)
  const [profileError, setProfileError] = useState<string | null>(null)

  // Settings: Preferences states
  const [autoAiDraftEnabled, setAutoAiDraftEnabled] = useState(true)
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(true)

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
        setMessages(data.messages || [])
      }
    } catch (err) {
      console.error("[Dashboard] Error fetching messages:", err)
    }
  }, [token, statusFilter, searchQuery])

  const fetchAdmins = useCallback(async () => {
    if (!token || currentUser?.role !== "super_admin") return
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
  }, [token, currentUser])

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

  const refreshAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([fetchStats(), fetchMessages(), fetchAdmins(), fetchNotifications()])
    setLoading(false)
  }, [fetchStats, fetchMessages, fetchAdmins, fetchNotifications])

  useEffect(() => {
    if (token) {
      refreshAll()
    }
  }, [token, refreshAll])

  // Periodic polling for real-time notification alert (every 25 seconds)
  useEffect(() => {
    if (!token) return
    const interval = setInterval(() => {
      fetchStats()
      fetchMessages()
      fetchNotifications()
    }, 25000)
    return () => clearInterval(interval)
  }, [token, fetchStats, fetchMessages, fetchNotifications])

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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `tenaye_inquiries_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Export Inquiries Data (Printable PDF Report)
  const handleExportInquiriesPDF = () => {
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
          <p class="meta">Exported on ${new Date().toLocaleString()} | Total Messages: ${messages.length}</p>
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
              ${messages.map((m, idx) => `
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(adminsList, null, 2))
    const downloadAnchor = document.createElement("a")
    downloadAnchor.setAttribute("href", dataStr)
    downloadAnchor.setAttribute("download", `tenaye_admins_roster_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  // Export Admins Data (Printable PDF Report)
  const handleExportAdminsPDF = () => {
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
          <p class="meta">Exported on ${new Date().toLocaleString()} | Total Active Administrators: ${adminsList.length}</p>
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
              ${adminsList.map((a, idx) => `
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

            {/* 4. Setting */}
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

              {/* Row 2: Quick Administrative Tools & Export Bar */}
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
                      {adminsList.map((admin, idx) => (
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
                        {messages.map((msg, idx) => (
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
          {/* TAB 4: SETTING (PROFILE SETTINGS & APP PREFERENCES)  */}
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
                      <p className={`text-xs font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                        Automatic AI Intent Detection & Drafting
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                        Analyzes whether user is reporting a bug, proposing partnership, or asking for health triage.
                      </p>
                    </div>
                    <button
                      onClick={() => setAutoAiDraftEnabled(!autoAiDraftEnabled)}
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
                      <p className={`text-xs font-bold ${isDark ? "text-white" : "text-stone-900"}`}>
                        Live Sound Alerts
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-stone-500"}`}>
                        Receive live audio notifications when an urgent message arrives.
                      </p>
                    </div>
                    <button
                      onClick={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
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
                <span>Context-Aware AI Reply Draft:</span>
              </label>
              <button
                type="button"
                onClick={() => generateAiReply(selectedMessage)}
                disabled={aiGenerating}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-[#119197] border border-teal-500/30 text-[11px] font-bold transition-all cursor-pointer disabled:opacity-50"
              >
                <IconSparkles size={12} />
                <span>{aiGenerating ? "Analyzing..." : "Re-generate with AI"}</span>
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

    </div>
  )
}
export default AdminDashboard
