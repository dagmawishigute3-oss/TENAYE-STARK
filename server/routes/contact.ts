import { Router, type Request, type Response } from "express"
import { db, logAuditEvent } from "../db"
import { requireAuth } from "../middleware/auth"

export const contactRouter = Router()

// Public endpoint: POST /api/contact
contactRouter.post("/", (req: Request, res: Response): void => {
  const { name, email, phone, category, subject, priority, message } = req.body

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required" })
    return
  }

  const cleanName = String(name).trim()
  const cleanEmail = String(email).trim().toLowerCase()
  const cleanPhone = phone ? String(phone).trim() : null
  const cleanCategory = category ? String(category).trim() : "General Question"
  const cleanSubject = String(subject || "General Healthcare Inquiry").trim()
  // If category is Feedback, priority is not needed / stored as 'Feedback' or 'Normal'
  const cleanPriority =
    cleanCategory === "Feedback"
      ? "Feedback"
      : priority
        ? String(priority).trim()
        : "Normal - Standard support"
  const cleanMessage = String(message).trim()

  try {
    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, email, phone, category, subject, priority, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'unread')
    `)
    const result = stmt.run(cleanName, cleanEmail, cleanPhone, cleanCategory, cleanSubject, cleanPriority, cleanMessage)
    const newMsgId = Number(result.lastInsertRowid)

    // Log to audit table
    logAuditEvent({
      actionType: "MESSAGE_RECEIVED",
      entityType: "contact_message",
      entityId: newMsgId,
      actorName: cleanName,
      actorEmail: cleanEmail,
      details: `Received inbound message #${newMsgId}: "${cleanSubject}" [Category: ${cleanCategory}, Priority: ${cleanPriority}]`,
      ipAddress: req.ip,
    })

    console.log(`[Contact] New inquiry #${newMsgId} from ${cleanName} (${cleanEmail}) [${cleanCategory} / ${cleanPriority}]`)

    res.status(201).json({
      success: true,
      message: "Your message has been received securely. The Tenaye medical team will respond via email shortly.",
      inquiryId: newMsgId,
    })
  } catch (err: any) {
    console.error("[Contact] Failed to store contact message:", err)
    res.status(500).json({ error: "Failed to store message", details: err?.message })
  }
})

// Protected endpoint: GET /api/admin/contacts
contactRouter.get("/admin/contacts", requireAuth, (req: Request, res: Response): void => {
  const { status, search } = req.query

  let query = "SELECT * FROM contact_messages WHERE 1=1"
  const params: any[] = []

  if (status && typeof status === "string" && status !== "all") {
    query += " AND status = ?"
    params.push(status)
  }

  if (search && typeof search === "string" && search.trim()) {
    query += " AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR category LIKE ? OR subject LIKE ? OR message LIKE ?)"
    const pattern = `%${search.trim()}%`
    params.push(pattern, pattern, pattern, pattern, pattern, pattern)
  }

  query += " ORDER BY id ASC"

  try {
    const messages = db.prepare(query).all(...params)
    res.json({ messages })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to retrieve contact messages", details: err?.message })
  }
})

// Protected endpoint: POST /api/admin/contacts/:id/reply
contactRouter.post("/admin/contacts/:id/reply", requireAuth, (req: Request, res: Response): void => {
  const { id } = req.params
  const { replyContent } = req.body

  if (!replyContent || !String(replyContent).trim()) {
    res.status(400).json({ error: "Reply content cannot be empty" })
    return
  }

  const existing = db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id) as any
  if (!existing) {
    res.status(404).json({ error: "Message not found" })
    return
  }

  const repliedBy = req.admin?.name || "Tenaye Health Officer"

  try {
    db.prepare(`
      UPDATE contact_messages
      SET status = 'replied',
          reply_content = ?,
          replied_at = CURRENT_TIMESTAMP,
          replied_by = ?
      WHERE id = ?
    `).run(String(replyContent).trim(), repliedBy, id)

    // Log to audit table
    logAuditEvent({
      actionType: "MESSAGE_REPLIED",
      entityType: "contact_message",
      entityId: Number(id),
      actorName: repliedBy,
      actorEmail: req.admin?.email,
      details: `Officer replied to message #${id} (User: ${existing.name} <${existing.email}>)`,
      ipAddress: req.ip,
    })

    // Simulate / log automated email dispatch to user's address
    console.log(`[Email Dispatch] Sent medical reply to ${existing.email} from ${repliedBy}: "${replyContent.slice(0, 50)}..."`)

    res.json({
      success: true,
      message: `Reply sent successfully to ${existing.email}`,
      repliedAt: new Date().toISOString(),
      repliedBy,
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to record reply", details: err?.message })
  }
})

// Protected endpoint: PATCH /api/admin/contacts/:id/status
contactRouter.patch("/admin/contacts/:id/status", requireAuth, (req: Request, res: Response): void => {
  const { id } = req.params
  const { status } = req.body

  if (!status || !["unread", "read", "replied", "archived"].includes(status)) {
    res.status(400).json({ error: "Invalid status value" })
    return
  }

  try {
    db.prepare("UPDATE contact_messages SET status = ? WHERE id = ?").run(status, id)
    logAuditEvent({
      actionType: "STATUS_CHANGED",
      entityType: "contact_message",
      entityId: Number(id),
      actorName: req.admin?.name || "Officer",
      actorEmail: req.admin?.email,
      details: `Status of message #${id} changed to '${status}'`,
      ipAddress: req.ip,
    })
    res.json({ success: true, status })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update status", details: err?.message })
  }
})

// Protected endpoint: DELETE /api/admin/contacts/:id
contactRouter.delete("/admin/contacts/:id", requireAuth, (req: Request, res: Response): void => {
  const { id } = req.params

  try {
    const existing = db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id) as any
    db.prepare("DELETE FROM contact_messages WHERE id = ?").run(id)

    logAuditEvent({
      actionType: "MESSAGE_DELETED",
      entityType: "contact_message",
      entityId: Number(id),
      actorName: req.admin?.name || "Officer",
      actorEmail: req.admin?.email,
      details: `Deleted contact message #${id} (originally from ${existing?.name || "Unknown"})`,
      ipAddress: req.ip,
    })

    res.json({ success: true, message: "Message deleted" })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete message", details: err?.message })
  }
})
