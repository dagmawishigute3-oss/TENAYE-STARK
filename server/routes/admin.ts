import { Router, type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db, logAuditEvent } from "../db"
import { requireAuth, requireSuperAdmin, JWT_SECRET, type AdminUserPayload } from "../middleware/auth"

export const adminRouter = Router()

// GET /api/admin/stats - KPI stats for dashboard
adminRouter.get("/stats", requireAuth, (_req: Request, res: Response): void => {
  try {
    const totalMessages = (db.prepare("SELECT COUNT(*) as c FROM contact_messages").get() as any).c
    const unreadMessages = (db.prepare("SELECT COUNT(*) as c FROM contact_messages WHERE status = 'unread'").get() as any).c
    const repliedMessages = (db.prepare("SELECT COUNT(*) as c FROM contact_messages WHERE status = 'replied'").get() as any).c
    const totalAdmins = (db.prepare("SELECT COUNT(*) as c FROM admins").get() as any).c
    const pendingOutbreaks = (db.prepare("SELECT COUNT(*) as c FROM outbreak_reports WHERE status = 'pending'").get() as any).c
    const pendingDrafts = (db.prepare("SELECT COUNT(*) as c FROM news_posts WHERE status = 'draft' AND ai_generated = 1").get() as any).c
    const publishedNews = (db.prepare("SELECT COUNT(*) as c FROM news_posts WHERE published = 1 AND status = 'published'").get() as any).c

    // Resolution rate percentage
    const resolutionRate = totalMessages > 0 ? Math.round((repliedMessages / totalMessages) * 100) : 100

    res.json({
      stats: {
        totalMessages,
        unreadMessages,
        repliedMessages,
        totalAdmins,
        pendingOutbreaks,
        pendingDrafts,
        publishedNews,
        resolutionRate,
      },
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch stats", details: err?.message })
  }
})

// GET /api/admin/notifications - System & messages unified notification feed
adminRouter.get("/notifications", requireAuth, (_req: Request, res: Response): void => {
  try {
    // 1. Pending AI Outbreak Drafts (Top Priority)
    const outbreakDrafts = db
      .prepare(`
        SELECT id, title, cluster_region as subtitle, 'AI Outbreak Draft: Requires Admin Approval' as detail, 'outbreak' as category, created_at
        FROM news_posts
        WHERE status = 'draft' AND ai_generated = 1
        ORDER BY created_at DESC
        LIMIT 5
      `)
      .all() as any[]

    // 2. Unread contact messages
    const unreadMessages = db
      .prepare(`
        SELECT id, name as title, subject as subtitle, message as detail, 'message' as category, created_at
        FROM contact_messages
        WHERE status = 'unread'
        ORDER BY created_at DESC
        LIMIT 10
      `)
      .all() as any[]

    // 3. Recent admin roster changes
    const recentAdmins = db
      .prepare(`
        SELECT id, name as title, role as subtitle, 'Registered system officer' as detail, 'security' as category, created_at
        FROM admins
        ORDER BY created_at DESC
        LIMIT 5
      `)
      .all() as any[]

    // Combine notifications
    const notifications = [...outbreakDrafts, ...unreadMessages, ...recentAdmins].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )

    res.json({ notifications })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch notifications", details: err?.message })
  }
})

// GET /api/admin/audit-logs - Real-time activity audit trail stored in SQLite
adminRouter.get("/audit-logs", requireAuth, (_req: Request, res: Response): void => {
  try {
    const logs = db
      .prepare(`
        SELECT id, action_type, entity_type, entity_id, actor_name, actor_email, details, ip_address, created_at
        FROM audit_logs
        ORDER BY id DESC
        LIMIT 100
      `)
      .all()
    res.json({ logs })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch audit logs", details: err?.message })
  }
})

// GET /api/admin/admins - list all admins (Visible to all authenticated admins)
adminRouter.get("/admins", requireAuth, (_req: Request, res: Response): void => {
  try {
    const admins = db
      .prepare("SELECT id, name, email, role, created_at FROM admins ORDER BY id ASC")
      .all()
    res.json({ admins })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch admins", details: err?.message })
  }
})

// POST /api/admin/admins - create a new admin (Super Admin only)
adminRouter.post("/admins", requireSuperAdmin, (req: Request, res: Response): void => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ error: "Name, email, and password are required" })
    return
  }

  const cleanName = String(name).trim()
  const cleanEmail = String(email).trim().toLowerCase()
  const cleanRole = role === "super_admin" ? "super_admin" : "admin"

  if (String(password).length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters long" })
    return
  }

  const existing = db.prepare("SELECT id FROM admins WHERE LOWER(email) = ?").get(cleanEmail)
  if (existing) {
    res.status(409).json({ error: "An admin with this email already exists" })
    return
  }

  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(String(password), salt)

    const stmt = db.prepare(`
      INSERT INTO admins (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `)
    const result = stmt.run(cleanName, cleanEmail, hash, cleanRole)
    const newAdminId = Number(result.lastInsertRowid)

    logAuditEvent({
      actionType: "ADMIN_CREATED",
      entityType: "admin",
      entityId: newAdminId,
      actorName: req.admin?.name || "Super Admin",
      actorEmail: req.admin?.email,
      details: `Created new admin account #${newAdminId} (${cleanName} <${cleanEmail}>) with role '${cleanRole}'`,
      ipAddress: req.ip,
    })

    res.status(201).json({
      success: true,
      message: `Admin ${cleanName} created successfully`,
      admin: {
        id: newAdminId,
        name: cleanName,
        email: cleanEmail,
        role: cleanRole,
        created_at: new Date().toISOString(),
      },
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to create admin", details: err?.message })
  }
})

// PUT /api/admin/admins/:id - update an admin account (Super Admin only)
adminRouter.put("/admins/:id", requireSuperAdmin, (req: Request, res: Response): void => {
  const { id } = req.params
  const { name, email, password, role } = req.body

  const targetAdmin = db.prepare("SELECT * FROM admins WHERE id = ?").get(id) as any
  if (!targetAdmin) {
    res.status(404).json({ error: "Admin account not found" })
    return
  }

  const cleanName = name ? String(name).trim() : targetAdmin.name
  const cleanEmail = email ? String(email).trim().toLowerCase() : targetAdmin.email
  const cleanRole = role === "super_admin" ? "super_admin" : role === "admin" ? "admin" : targetAdmin.role

  // Check email uniqueness if email changed
  if (cleanEmail !== targetAdmin.email) {
    const exists = db.prepare("SELECT id FROM admins WHERE LOWER(email) = ? AND id != ?").get(cleanEmail, id)
    if (exists) {
      res.status(409).json({ error: "Email is already taken by another admin" })
      return
    }
  }

  try {
    if (password && String(password).trim().length >= 6) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(String(password).trim(), salt)
      db.prepare(`
        UPDATE admins
        SET name = ?, email = ?, password_hash = ?, role = ?
        WHERE id = ?
      `).run(cleanName, cleanEmail, hash, cleanRole, id)
    } else {
      db.prepare(`
        UPDATE admins
        SET name = ?, email = ?, role = ?
        WHERE id = ?
      `).run(cleanName, cleanEmail, cleanRole, id)
    }

    logAuditEvent({
      actionType: "ADMIN_UPDATED",
      entityType: "admin",
      entityId: Number(id),
      actorName: req.admin?.name || "Super Admin",
      actorEmail: req.admin?.email,
      details: `Updated admin account #${id} (${cleanName} <${cleanEmail}>, role: '${cleanRole}', passwordChanged: ${Boolean(password)})`,
      ipAddress: req.ip,
    })

    res.json({
      success: true,
      message: `Admin account #${id} updated successfully`,
      admin: {
        id: Number(id),
        name: cleanName,
        email: cleanEmail,
        role: cleanRole,
      },
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update admin account", details: err?.message })
  }
})

// PUT /api/admin/profile - update logged-in admin's own profile (Name, Email, Password)
adminRouter.put("/profile", requireAuth, (req: Request, res: Response): void => {
  const adminId = req.admin?.id
  const { name, email, currentPassword, newPassword } = req.body

  if (!adminId) {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  const currentAdmin = db.prepare("SELECT * FROM admins WHERE id = ?").get(adminId) as any
  if (!currentAdmin) {
    res.status(404).json({ error: "Admin account not found" })
    return
  }

  const cleanName = name ? String(name).trim() : currentAdmin.name
  const cleanEmail = email ? String(email).trim().toLowerCase() : currentAdmin.email

  // If email changed, ensure unique
  if (cleanEmail !== currentAdmin.email) {
    const exists = db.prepare("SELECT id FROM admins WHERE LOWER(email) = ? AND id != ?").get(cleanEmail, adminId)
    if (exists) {
      res.status(409).json({ error: "Email is already taken by another admin account" })
      return
    }
  }

  try {
    let passwordHash = currentAdmin.password_hash
    let passwordChanged = false

    // If updating password
    if (newPassword && String(newPassword).trim().length > 0) {
      if (!currentPassword) {
        res.status(400).json({ error: "Current password is required to set a new password" })
        return
      }
      const isMatch = bcrypt.compareSync(String(currentPassword), currentAdmin.password_hash)
      if (!isMatch) {
        res.status(400).json({ error: "Current password does not match" })
        return
      }
      if (String(newPassword).trim().length < 6) {
        res.status(400).json({ error: "New password must be at least 6 characters long" })
        return
      }
      const salt = bcrypt.genSaltSync(10)
      passwordHash = bcrypt.hashSync(String(newPassword).trim(), salt)
      passwordChanged = true
    }

    db.prepare(`
      UPDATE admins
      SET name = ?, email = ?, password_hash = ?
      WHERE id = ?
    `).run(cleanName, cleanEmail, passwordHash, adminId)

    logAuditEvent({
      actionType: "PROFILE_UPDATED",
      entityType: "admin",
      entityId: adminId,
      actorName: cleanName,
      actorEmail: cleanEmail,
      details: `Admin #${adminId} updated personal profile (Name: ${cleanName}, Email: ${cleanEmail}, PasswordChanged: ${passwordChanged})`,
      ipAddress: req.ip,
    })

    const updatedPayload: AdminUserPayload = {
      id: adminId,
      name: cleanName,
      email: cleanEmail,
      role: currentAdmin.role,
    }

    const newToken = jwt.sign(updatedPayload, JWT_SECRET, { expiresIn: "7d" })

    res.json({
      success: true,
      message: "Profile updated successfully",
      token: newToken,
      admin: updatedPayload,
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update profile", details: err?.message })
  }
})

// DELETE /api/admin/admins/:id - delete an admin (Super Admin only)
adminRouter.delete("/admins/:id", requireSuperAdmin, (req: Request, res: Response): void => {
  const { id } = req.params

  if (Number(id) === req.admin?.id) {
    res.status(400).json({ error: "You cannot delete your own admin account" })
    return
  }

  const targetAdmin = db.prepare("SELECT * FROM admins WHERE id = ?").get(id) as any
  if (!targetAdmin) {
    res.status(404).json({ error: "Admin account not found" })
    return
  }

  if (targetAdmin.role === "super_admin" && targetAdmin.email === "admin@tenaye.health") {
    res.status(403).json({ error: "The primary Super Admin cannot be deleted" })
    return
  }

  try {
    db.prepare("DELETE FROM admins WHERE id = ?").run(id)

    logAuditEvent({
      actionType: "ADMIN_DELETED",
      entityType: "admin",
      entityId: Number(id),
      actorName: req.admin?.name || "Super Admin",
      actorEmail: req.admin?.email,
      details: `Deleted admin account #${id} (${targetAdmin.name} <${targetAdmin.email}>)`,
      ipAddress: req.ip,
    })

    res.json({ success: true, message: `Admin account #${id} deleted` })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete admin", details: err?.message })
  }
})

// POST /api/admin/contacts/mark-all-read - Mark all unread messages as read
adminRouter.post("/contacts/mark-all-read", requireAuth, (_req: Request, res: Response): void => {
  try {
    const result = db.prepare("UPDATE contact_messages SET status = 'read' WHERE status = 'unread'").run()
    res.json({ success: true, updatedCount: result.changes })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update messages", details: err?.message })
  }
})

// POST /api/admin/ai-reply - Context-aware Smart AI reply drafter
adminRouter.post("/ai-reply", requireAuth, async (req: Request, res: Response): Promise<void> => {
  const { senderName, email, category, subject, message } = req.body

  if (!message || !senderName) {
    res.status(400).json({ error: "Sender name and message are required" })
    return
  }

  const isAmharic = /[\u1200-\u137F]/.test(String(message)) || /[\u1200-\u137F]/.test(String(subject))
  const cleanName = String(senderName).trim()
  const firstName = cleanName.split(" ")[0] || "Friend"
  const responder = req.admin?.name || "Tenaye Health Officer"

  // Intent classification: prioritize explicit user category
  const fullText = `${category || ""} ${subject || ""} ${message}`.toLowerCase()
  let intentCategory: "feedback" | "bug_report" | "partnership" | "medical_emergency" | "general_inquiry" = "general_inquiry"

  if (category === "Feedback" || /feedback|review|opinion|comment|great work|impressive|well done|good job|tested|congrats|አስተያየት/i.test(fullText)) {
    intentCategory = "feedback"
  } else if (category === "Technical Support" || /bug|error|crash|broken|glitch|failed|issue|not working|doesn't work|problem|stack trace|button|audio failed/i.test(fullText)) {
    intentCategory = "bug_report"
  } else if (category === "Business Inquiry" || category === "Partnership" || /partner|integrate|hospital partnership|ministry|organization|ngo|collab|doctor association/i.test(fullText)) {
    intentCategory = "partnership"
  } else if (/emergency|bleeding|pain|burn|cpr|choking|accident|unconscious|fever|symptom|attack/i.test(fullText)) {
    intentCategory = "medical_emergency"
  }

  const apiKey =
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    ""

  let aiDraft = ""

  try {
    const prompt = `You are ${responder}, Lead Operations Officer at Tenaye (ጤናዬ) Digital Health in Addis Ababa, Ethiopia.
Analyze this user inquiry and generate an exact, highly personalized email response:
- Sender Name: ${cleanName}
- Sender Email: ${email || "N/A"}
- Category: "${category || "General"}"
- Subject: "${subject || "No Subject"}"
- Message Content: "${message}"
- Classified Intent: ${intentCategory.toUpperCase()}

STRICT GUIDELINES:
1. ${isAmharic ? "Write in natural, courteous Amharic." : "Write in fluent, professional English."}
2. MATCH THE SENDER'S ACTUAL MESSAGE DIRECTLY:
   - If FEEDBACK: Thank them warmly for testing or using the platform. Directly reference the specific features they mentioned (e.g., Amharic AI symptom checker, emergency navigation, hospital finder). Express how valuable their input is for digital healthcare in Ethiopia.
   - If BUG REPORT / TECHNICAL SUPPORT: Acknowledge the specific technical issue reported. State that our engineering team in Addis Ababa has logged the issue and is investigating. DO NOT GIVE MEDICAL ADVICE.
   - If PARTNERSHIP / BUSINESS INQUIRY: Discuss collaboration, thank them for their interest in expanding digital healthcare access, and propose coordinating next steps.
   - If MEDICAL EMERGENCY / FIRST AID: Provide concise guidance, and emphasize National Toll-Free Dispatch 907 or Tebita 8035.
   - If GENERAL INQUIRY: Answer their exact question warmly and directly.
3. Sign off exactly as:
${responder}
Tenaye (ጤናዬ) Digital Health Operations
Addis Ababa, Ethiopia
Website: https://tenaye.health

Return ONLY the final email body text without backticks or markdown headers.`

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`
    const geminiRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 600, temperature: 0.3 },
      }),
    })

    if (geminiRes.ok) {
      const data = await geminiRes.json()
      const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (candidate && candidate.trim()) {
        aiDraft = candidate.trim()
      }
    }
  } catch (err) {
    console.warn("[AI Reply] Gemini API call failed, falling back to smart categorized template:", err)
  }

  // Dynamic Rule-Based Fallback tailored by intentCategory
  if (!aiDraft) {
    if (intentCategory === "feedback") {
      aiDraft = isAmharic
        ? `ሰላም ${firstName}፣

የጤናዬ (Tenaye) የዲጂታል ጤና መድረክን ስለተጠቀሙ እና ገንቢ አስተያየትዎን ስላጋሩን ከልብ እናመሰግናለን። 

በመልእክትዎ ላይ የጠቀሱትን ("${subject || "አስተያየት"}") በተለይም የቋንቋ ድጋፉንና የድንገተኛ አደጋ አገልግሎቱን በሚመለከት የሰጡን ማረጋገጫ ቡድናችንን በእጅጉ ያበረታታል። መድረካችንን ይበልጥ ተደራሽ እና ጠቃሚ ለማድረግ የምናደርገውን ጥረት አጠናክረን እንቀጥላለን።

ከሰላምታ ጋር፣
${responder}
የጤናዬ (Tenaye) ኦፕሬሽን ቡድን
አዲስ አበባ፣ ኢትዮጵያ
https://tenaye.health`
        : `Dear ${firstName},

Thank you very much for taking the time to share your feedback with us regarding "${subject || "Tenaye Health Platform"}".

We are delighted to receive your thoughts on our digital health services. Positive and constructive validation from citizens like you helps our engineering and medical teams in Addis Ababa continuously refine our AI symptom triage, local language support, and emergency navigation.

We truly appreciate your support and engagement with Tenaye.

Warm regards,
${responder}
Tenaye (ጤናዬ) Digital Health Operations
Addis Ababa, Ethiopia
https://tenaye.health`
    } else if (intentCategory === "bug_report") {
      aiDraft = isAmharic
        ? `ሰላም ${firstName}፣

የጤናዬ (Tenaye) የቴክኒክ ድጋፍ ቡድንን ስላነጋገሩ እናመሰግናለን። በድረ-ገጻችን ወይም መተግበሪያችን ላይ ያጋጠመዎትን የቴክኒክ ክፍተት ("${subject || "የቴክኒክ ችግር"}") በሚመለከት የላኩልንን ማስታወሻ ተመልክተነዋል።

የኢንጂነሪንግ ቡድናችን ጉዳዩን እየመረመረው ሲሆን በአጭር ጊዜ ውስጥ ተስተካክሎ ተግባራዊ ይደረጋል። መድረካችንን ለማሻሻል ስላደረጉት እገዛ ከልብ እናመሰግናለን።

ከሰላምታ ጋር፣
${responder}
የጤናዬ (Tenaye) የቴክኒክና ኦፕሬሽን ቡድን
አዲስ አበባ፣ ኢትዮጵያ
https://tenaye.health`
        : `Dear ${firstName},

Thank you for contacting the Tenaye Technical Support Team. We have received your bug report regarding "${subject || "platform functionality"}".

Our engineering team in Addis Ababa has logged this report and is actively testing the issue to deploy a resolution. User feedback like yours is vital to keeping our health triage platform dependable for citizens across Ethiopia.

Warm regards,
${responder}
Tenaye Operations & Technical Support Team
Addis Ababa, Ethiopia
https://tenaye.health`
    } else if (intentCategory === "partnership") {
      aiDraft = isAmharic
        ? `ሰላም ${firstName}፣

የጤናዬ (Tenaye) የዲጂታል ጤና አስተዳደር ቡድንን ስላነጋገሩ እናመሰግናለን። በጤና ተቋማትና በድንገተኛ ህክምና ዙሪያ ስላቀረቡት የትብብር ጥያቄ ("${subject || "የትብብር ጥያቄ"}") ከልብ እናደንቃለን።

የሆስፒታልና የአምቡላንስ አገልግሎቶችን በዲጂታል ቴክኖሎጂ ለማቀናጀት ከድርጅትዎ ጋር በቅርበት ለመስራት ዝግጁ ነን። ዝርዝር የውይይት ቀጠሮ ለማመቻቸት በቅርቡ እንደውላለን።

ከሰላምታ ጋር፣
${responder}
የጤናዬ (Tenaye) የዲጂታል ጤና ኦፕሬሽን ቡድን
አዲስ አበባ፣ ኢትዮጵያ
https://tenaye.health`
        : `Dear ${firstName},

Thank you for reaching out to Tenaye regarding potential partnership and facility collaboration ("${subject || "partnership inquiry"}").

We are dedicated to expanding digital triage access and connecting medical facilities across Ethiopia. Our leadership team would be delighted to schedule a briefing to explore integration possibilities with your organization.

Best regards,
${responder}
Tenaye Digital Health Partnerships
Addis Ababa, Ethiopia
https://tenaye.health`
    } else if (intentCategory === "medical_emergency") {
      aiDraft = isAmharic
        ? `ሰላም ${firstName}፣

የጤናዬ (Tenaye) የድንገተኛ ህክምና ድጋፍ ቡድንን ስላነጋገሩ እናመሰግናለን። የላኩትን ጥያቄ ተመልክተናል።

አስቸኳይ ወይም ከባድ የህክምና ድጋፍ የሚያስፈልግዎት ከሆነ፣ እባክዎ ጊዜ ሳያጠፉ ወደ ብሄራዊ 907 የኢትዮጵያ ቀይ መስቀል አምቡላንስ ወይም ወደ 8035 ተቢታ አምቡላንስ ይደውሉ። በተጨማሪም በድረ-ገጻችን https://tenaye.health/emergency የሚገኘውን የሆስፒታል መፈለጊያ ካርታ መጠቀም ይችላሉ።

ከሰላምታ ጋር፣
${responder}
የጤናዬ (Tenaye) ክሊኒካል ኦፕሬሽን ቡድን
አዲስ አበባ፣ ኢትዮጵያ
https://tenaye.health`
        : `Dear ${firstName},

Thank you for contacting the Tenaye Clinical Operations Center. We have reviewed your health inquiry regarding "${subject || "medical details"}".

If this situation involves an acute trauma or life-threatening emergency, please immediately contact the National Red Cross Ambulance Dispatch at 907 or dial 8035. You can also view closest operating emergency rooms on our live portal at https://tenaye.health/emergency.

Warm regards,
${responder}
Tenaye Clinical Triage Team
Addis Ababa, Ethiopia
https://tenaye.health`
    } else {
      aiDraft = isAmharic
        ? `ሰላም ${firstName}፣

የጤናዬ (Tenaye) የኦፕሬሽን ቡድንን ስላነጋገሩ እናመሰግናለን። የላኩልንን መልእክት ("${subject || "አጠቃላይ ጥያቄ"}") ተቀብለን ተመልክተነዋል።

ጥያቄዎን በሚገባ መርምረን ምላሽ የምንሰጥዎ ሲሆን፣ ተጨማሪ መረጃ ካስፈለገዎት በዚሁ አድራሻ ሊጽፉልን ይችላሉ።

ከሰላምታ ጋር፣
${responder}
የጤናዬ (Tenaye) አስተዳደር ቡድን
አዲስ አበባ፣ ኢትዮጵያ
https://tenaye.health`
        : `Dear ${firstName},

Thank you for reaching out to the Tenaye Operations Center regarding "${subject || "your inquiry"}". We have securely received your message.

Our administrative team is reviewing your question and will follow up with full details shortly. If you require further assistance in the meantime, feel free to reply directly to this email.

Best regards,
${responder}
Tenaye Health Operations Team
Addis Ababa, Ethiopia
https://tenaye.health`
    }
  }

  res.json({
    success: true,
    draftReply: aiDraft,
    intentCategory,
    language: isAmharic ? "am" : "en",
  })
})
