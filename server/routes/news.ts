import { Router, type Request, type Response } from "express"
import { db, logAuditEvent } from "../db"
import { requireAuth, type AdminUserPayload } from "../middleware/auth"
import { sendOutbreakSms } from "../services/smsService"

export const newsRouter = Router()

// GET /api/news - List all published articles (Public)
newsRouter.get("/", (req: Request, res: Response): void => {
  try {
    const { category, search, include_drafts } = req.query

    let sql = `
      SELECT 
        id, title, slug, excerpt, content, category, author_name, 
        status, published, views_count, has_relief, relief_goal, relief_raised,
        relief_beneficiary, relief_description, cluster_symptoms, cluster_region, 
        cluster_count, ai_generated, created_at
      FROM news_posts
    `
    const conditions: string[] = []
    const params: any[] = []

    if (include_drafts !== "true") {
      conditions.push("published = 1 AND status = 'published'")
    }

    if (category && category !== "all") {
      conditions.push("category = ?")
      params.push(category)
    }

    if (search && typeof search === "string" && search.trim()) {
      conditions.push("(title LIKE ? OR excerpt LIKE ? OR content LIKE ? OR cluster_region LIKE ?)")
      const s = `%${search.trim()}%`
      params.push(s, s, s, s)
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ")
    }

    sql += " ORDER BY id ASC LIMIT 100"

    const posts = db.prepare(sql).all(...params)
    res.json({ success: true, posts })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch news posts", details: err?.message })
  }
})

// GET /api/news/:id - Fetch single article & track views (Public)
newsRouter.get("/:id", (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid post ID" })
      return
    }

    // Increment views
    try {
      db.prepare("UPDATE news_posts SET views_count = views_count + 1 WHERE id = ?").run(id)
    } catch {}

    const post = db.prepare("SELECT * FROM news_posts WHERE id = ?").get(id) as any
    if (!post) {
      res.status(404).json({ error: "Article not found" })
      return
    }

    // Fetch relief pledges if relief campaign is attached (only approved pledges publicly visible)
    let pledges: any[] = []
    if (post.has_relief) {
      pledges = db
        .prepare(`
          SELECT id, donor_name, amount_etb, message, payment_method, status, created_at
          FROM relief_pledges
          WHERE post_id = ? AND status = 'approved'
          ORDER BY id DESC
          LIMIT 20
        `)
        .all(id)
    }

    res.json({ success: true, post, pledges })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch article", details: err?.message })
  }
})

// POST /api/news/:id/pledge - Public Community Support / GoFundMe Donation Submission (Pending Verification)
newsRouter.post("/:id/pledge", (req: Request, res: Response): void => {
  try {
    const postId = parseInt(req.params.id, 10)
    const { donor_name, donor_phone, amount_etb, message, payment_method, receipt_image, receipt_name } = req.body

    const amount = parseFloat(amount_etb)
    if (isNaN(amount) || amount <= 0) {
      res.status(400).json({ error: "Please enter a valid donation amount in ETB" })
      return
    }

    const post = db.prepare("SELECT id, title, has_relief, relief_raised, relief_goal FROM news_posts WHERE id = ?").get(postId) as any
    if (!post || !post.has_relief) {
      res.status(404).json({ error: "Active relief campaign not found for this article" })
      return
    }

    const donor = (donor_name || "").trim() || "Anonymous Supporter"
    const payMethod = payment_method || "Telebirr"

    const info = db.prepare(`
      INSERT INTO relief_pledges (post_id, donor_name, donor_phone, amount_etb, message, payment_method, status, receipt_image, receipt_name)
      VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `).run(postId, donor, donor_phone || null, amount, message || null, payMethod, receipt_image || null, receipt_name || null)

    logAuditEvent({
      actionType: "PLEDGE_SUBMITTED",
      entityType: "relief",
      entityId: postId,
      actorName: donor,
      actorEmail: donor_phone || null,
      details: `New donation of ${amount} ETB via ${payMethod} submitted for "${post.title}" (Status: Pending Verification)`,
      ipAddress: req.ip,
    })

    res.json({
      success: true,
      pledgeId: info.lastInsertRowid,
      amount,
      status: "pending",
      message: "Donation submitted successfully! Your receipt has been sent to our administration team for verification.",
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to submit donation", details: err?.message })
  }
})

// GET /api/news/admin/funds - Admin View All Funds & Donor Submissions
newsRouter.get("/admin/funds", requireAuth, (_req: Request, res: Response): void => {
  try {
    const pledges = db
      .prepare(`
        SELECT 
          p.id, p.post_id, p.donor_name, p.donor_phone, p.amount_etb, p.message,
          p.payment_method, p.status, p.receipt_image, p.receipt_name, p.created_at,
          n.title as post_title, n.relief_goal, n.relief_raised, n.relief_beneficiary
        FROM relief_pledges p
        JOIN news_posts n ON p.post_id = n.id
        ORDER BY p.id ASC
      `)
      .all()

    const campaigns = db
      .prepare(`
        SELECT 
          id, title, category, relief_goal, relief_raised, relief_beneficiary,
          (SELECT COUNT(*) FROM relief_pledges WHERE post_id = news_posts.id) as total_donors,
          (SELECT COUNT(*) FROM relief_pledges WHERE post_id = news_posts.id AND status = 'pending') as pending_count
        FROM news_posts
        WHERE has_relief = 1
        ORDER BY id ASC
      `)
      .all()

    const stats = db
      .prepare(`
        SELECT 
          COUNT(*) as totalPledges,
          COALESCE(SUM(CASE WHEN status = 'approved' THEN amount_etb ELSE 0 END), 0) as verifiedTotal,
          COALESCE(SUM(CASE WHEN status = 'pending' THEN amount_etb ELSE 0 END), 0) as pendingTotal,
          COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0) as pendingCount,
          COALESCE(SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END), 0) as approvedCount,
          COALESCE(SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END), 0) as rejectedCount
        FROM relief_pledges
      `)
      .get()

    res.json({ success: true, pledges, campaigns, stats })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch funds overview", details: err?.message })
  }
})

// POST /api/news/admin/funds/:id/approve - Approve Donor Payment
newsRouter.post("/admin/funds/:id/approve", requireAuth, (req: Request, res: Response): void => {
  try {
    const user = ((req as any).admin || (req as any).user || { id: 1, name: "Admin" }) as AdminUserPayload
    const pledgeId = parseInt(req.params.id, 10)

    const pledge = db.prepare("SELECT * FROM relief_pledges WHERE id = ?").get(pledgeId) as any
    if (!pledge) {
      res.status(404).json({ error: "Donation record not found" })
      return
    }

    if (pledge.status === "approved") {
      res.status(400).json({ error: "Donation is already verified and approved" })
      return
    }

    // Set status to approved
    db.prepare("UPDATE relief_pledges SET status = 'approved' WHERE id = ?").run(pledgeId)

    // Add amount to post relief_raised
    db.prepare("UPDATE news_posts SET relief_raised = relief_raised + ? WHERE id = ?").run(pledge.amount_etb, pledge.post_id)

    logAuditEvent({
      actionType: "PLEDGE_APPROVED",
      entityType: "relief",
      entityId: pledge.post_id,
      actorName: user.name,
      actorEmail: user.email,
      details: `Admin ${user.name} verified and approved donation ID #${pledgeId} of ${pledge.amount_etb} ETB from ${pledge.donor_name}`,
      ipAddress: req.ip,
    })

    const updatedPost = db.prepare("SELECT relief_raised, relief_goal FROM news_posts WHERE id = ?").get(pledge.post_id) as any

    res.json({
      success: true,
      message: "Donation verified and approved successfully! Campaign raised balance updated.",
      updatedRaised: updatedPost?.relief_raised || 0,
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to approve donation", details: err?.message })
  }
})

// POST /api/news/admin/funds/:id/reject - Reject Fake / Invalid Payment
newsRouter.post("/admin/funds/:id/reject", requireAuth, (req: Request, res: Response): void => {
  try {
    const user = ((req as any).admin || (req as any).user || { id: 1, name: "Admin" }) as AdminUserPayload
    const pledgeId = parseInt(req.params.id, 10)
    const { reason } = req.body

    const pledge = db.prepare("SELECT * FROM relief_pledges WHERE id = ?").get(pledgeId) as any
    if (!pledge) {
      res.status(404).json({ error: "Donation record not found" })
      return
    }

    // If it was previously approved, deduct it back
    if (pledge.status === "approved") {
      db.prepare("UPDATE news_posts SET relief_raised = MAX(0, relief_raised - ?) WHERE id = ?").run(pledge.amount_etb, pledge.post_id)
    }

    db.prepare("UPDATE relief_pledges SET status = 'rejected' WHERE id = ?").run(pledgeId)

    logAuditEvent({
      actionType: "PLEDGE_REJECTED",
      entityType: "relief",
      entityId: pledge.post_id,
      actorName: user.name,
      actorEmail: user.email,
      details: `Admin ${user.name} rejected donation ID #${pledgeId} from ${pledge.donor_name}. Reason: ${reason || "Invalid receipt"}`,
      ipAddress: req.ip,
    })

    res.json({
      success: true,
      message: "Donation marked as rejected.",
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to reject donation", details: err?.message })
  }
})

// POST /api/news - Create News / Platform Announcement (Admin Only)
newsRouter.post("/", requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = ((req as any).admin || (req as any).user || {
      id: 1,
      name: "Admin User",
      email: "admin@tenaye.health",
      role: "admin",
    }) as AdminUserPayload
    const {
      title,
      excerpt,
      content,
      category,
      has_relief,
      relief_goal,
      relief_beneficiary,
      relief_description,
      send_sms,
      custom_sms_text,
      target_phone,
      zone,
    } = req.body

    if (!title || !content) {
      res.status(400).json({ error: "Title and content are required" })
      return
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

    const info = db.prepare(`
      INSERT INTO news_posts (
        title, slug, excerpt, content, category, author_name, status, published, views_count,
        has_relief, relief_goal, relief_raised, relief_beneficiary, relief_description
      ) VALUES (?, ?, ?, ?, ?, ?, 'published', 1, 0, ?, ?, 0, ?, ?)
    `).run(
      title,
      slug,
      excerpt || title,
      content,
      category || "announcement",
      user.name,
      has_relief ? 1 : 0,
      parseFloat(relief_goal) || 0,
      relief_beneficiary || null,
      relief_description || null
    )

    let smsDispatched = false
    let dispatchedPhone = ""

    const isSmsRequested = send_sms === true || send_sms === "true" || send_sms === 1 || send_sms === "1"
    if (isSmsRequested) {
      try {
        const targetPhone = target_phone?.trim() || "+251967453624"
        const smsMessage = (custom_sms_text || `🚨 [TENAYE ALERT] ${title}: ${excerpt || content.slice(0, 140)}`).trim()
        const alertZone = zone || "All Regions"

        const smsRes = await sendOutbreakSms({
          to: targetPhone,
          message: smsMessage,
          zone: alertZone,
          triggeredBy: `Published Announcement: ${user.name}`,
        })
        smsDispatched = smsRes.success
        dispatchedPhone = targetPhone
      } catch (smsErr) {
        console.warn("[News Publish SMS Error]:", smsErr)
      }
    }

    logAuditEvent({
      actionType: "NEWS_PUBLISHED",
      entityType: "news",
      entityId: Number(info.lastInsertRowid),
      actorName: user.name,
      actorEmail: user.email,
      details: `Published news article: "${title}" (Category: ${category || "announcement"})${smsDispatched ? ` (Emergency SMS dispatched to ${dispatchedPhone})` : ""}`,
      ipAddress: req.ip,
    })

    res.json({
      success: true,
      postId: info.lastInsertRowid,
      message: `News article published successfully!${smsDispatched ? ` Emergency SMS dispatched to ${dispatchedPhone}.` : ""}`,
      sms_dispatched: smsDispatched,
      sms_destination: dispatchedPhone,
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to publish news", details: err?.message })
  }
})

// PUT /api/news/:id - Edit Article (Admin Only)
newsRouter.put("/:id", requireAuth, (req: Request, res: Response): void => {
  try {
    const user = ((req as any).admin || (req as any).user || {
      id: 1,
      name: "Admin User",
      email: "admin@tenaye.health",
      role: "admin",
    }) as AdminUserPayload
    const id = parseInt(req.params.id, 10)
    const {
      title,
      excerpt,
      content,
      category,
      has_relief,
      relief_goal,
      relief_beneficiary,
      relief_description,
    } = req.body

    const existing = db.prepare("SELECT * FROM news_posts WHERE id = ?").get(id) as any
    if (!existing) {
      res.status(404).json({ error: "Article not found" })
      return
    }

    db.prepare(`
      UPDATE news_posts
      SET title = ?, excerpt = ?, content = ?, category = ?,
          has_relief = ?, relief_goal = ?, relief_beneficiary = ?, relief_description = ?
      WHERE id = ?
    `).run(
      title || existing.title,
      excerpt ?? existing.excerpt,
      content || existing.content,
      category || existing.category,
      has_relief !== undefined ? (has_relief ? 1 : 0) : existing.has_relief,
      relief_goal !== undefined ? parseFloat(relief_goal) : existing.relief_goal,
      relief_beneficiary ?? existing.relief_beneficiary,
      relief_description ?? existing.relief_description,
      id
    )

    logAuditEvent({
      actionType: "NEWS_UPDATED",
      entityType: "news",
      entityId: id,
      actorName: user.name,
      actorEmail: user.email,
      details: `Updated article ID #${id}: "${title || existing.title}"`,
      ipAddress: req.ip,
    })

    res.json({ success: true, message: "Article updated successfully" })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update article", details: err?.message })
  }
})

// DELETE /api/news/:id - Delete Article (Admin Only)
newsRouter.delete("/:id", requireAuth, (req: Request, res: Response): void => {
  try {
    const user = ((req as any).admin || (req as any).user || {
      id: 1,
      name: "Admin User",
      email: "admin@tenaye.health",
      role: "admin",
    }) as AdminUserPayload
    const id = parseInt(req.params.id, 10)

    const existing = db.prepare("SELECT title FROM news_posts WHERE id = ?").get(id) as any
    if (!existing) {
      res.status(404).json({ error: "Article not found" })
      return
    }

    db.prepare("DELETE FROM news_posts WHERE id = ?").run(id)
    try {
      db.prepare("DELETE FROM relief_pledges WHERE post_id = ?").run(id)
    } catch {}

    logAuditEvent({
      actionType: "NEWS_DELETED",
      entityType: "news",
      entityId: id,
      actorName: user.name,
      actorEmail: user.email,
      details: `Deleted article ID #${id}: "${existing.title}"`,
      ipAddress: req.ip,
    })

    res.json({ success: true, message: "Article deleted successfully" })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete article", details: err?.message })
  }
})
