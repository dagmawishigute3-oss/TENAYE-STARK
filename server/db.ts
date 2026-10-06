import Database from "better-sqlite3"
import path from "node:path"
import fs from "node:fs"
import bcrypt from "bcryptjs"

// On Render the persistent disk is mounted at /data (set via DATA_DIR env var).
// Locally it falls back to <project-root>/data so nothing changes for dev.
const dataDir = process.env.DATA_DIR ?? path.resolve(process.cwd(), "data")
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, "tenaye.db")
export const db = new Database(dbPath)

// Enable Write-Ahead Logging for high performance
db.pragma("journal_mode = WAL")

export function initDatabase() {
  // 1. Admins table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 2. Contact messages table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      category TEXT,
      priority TEXT DEFAULT 'Normal - Standard support',
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread',
      reply_content TEXT,
      replied_at DATETIME,
      replied_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // Safe idempotent migrations for existing databases
  // Safe idempotent migrations for existing databases
  try { db.exec("ALTER TABLE contact_messages ADD COLUMN phone TEXT;") } catch {}
  try { db.exec("ALTER TABLE contact_messages ADD COLUMN category TEXT;") } catch {}
  try { db.exec("ALTER TABLE contact_messages ADD COLUMN priority TEXT DEFAULT 'Normal - Standard support';") } catch {}

  // 3. Outbreak community reports table
  db.exec(`
    CREATE TABLE IF NOT EXISTS outbreak_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reporter_name TEXT DEFAULT 'Anonymous Citizen',
      reporter_contact TEXT,
      region_subcity TEXT NOT NULL,
      disease_or_symptoms TEXT NOT NULL,
      affected_count INTEGER DEFAULT 1,
      severity TEXT NOT NULL DEFAULT 'medium',
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN reporter_name TEXT DEFAULT 'Anonymous Citizen';") } catch {}
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN reporter_contact TEXT;") } catch {}
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN region_subcity TEXT;") } catch {}
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN disease_or_symptoms TEXT;") } catch {}
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN affected_count INTEGER DEFAULT 1;") } catch {}
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN severity TEXT DEFAULT 'medium';") } catch {}
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN notes TEXT;") } catch {}
  try { db.exec("ALTER TABLE outbreak_reports ADD COLUMN status TEXT DEFAULT 'pending';") } catch {}

  // 4. News, Announcements & Outbreak Bulletins table
  db.exec(`
    CREATE TABLE IF NOT EXISTS news_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT,
      excerpt TEXT,
      content TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'announcement',
      author_name TEXT NOT NULL DEFAULT 'Tenaye Medical Editorial',
      status TEXT NOT NULL DEFAULT 'published',
      published INTEGER NOT NULL DEFAULT 1,
      views_count INTEGER NOT NULL DEFAULT 0,
      has_relief INTEGER NOT NULL DEFAULT 0,
      relief_goal REAL NOT NULL DEFAULT 0,
      relief_raised REAL NOT NULL DEFAULT 0,
      relief_beneficiary TEXT,
      relief_description TEXT,
      cluster_symptoms TEXT,
      cluster_region TEXT,
      cluster_count INTEGER DEFAULT 0,
      ai_generated INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)
  try { db.exec("ALTER TABLE news_posts ADD COLUMN slug TEXT;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN excerpt TEXT;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN status TEXT DEFAULT 'published';") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN views_count INTEGER DEFAULT 0;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN has_relief INTEGER DEFAULT 0;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN relief_goal REAL DEFAULT 0;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN relief_raised REAL DEFAULT 0;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN relief_beneficiary TEXT;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN relief_description TEXT;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN cluster_symptoms TEXT;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN cluster_region TEXT;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN cluster_count INTEGER DEFAULT 0;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN ai_generated INTEGER DEFAULT 0;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN emergency_sms_text TEXT;") } catch {}
  try { db.exec("ALTER TABLE news_posts ADD COLUMN report_ids TEXT;") } catch {}

  // 5. Emergency Relief / GoFundMe-style Community Support Pledges
  db.exec(`
    CREATE TABLE IF NOT EXISTS relief_pledges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      donor_name TEXT NOT NULL,
      donor_phone TEXT,
      amount_etb REAL NOT NULL,
      message TEXT,
      payment_method TEXT DEFAULT 'Telebirr',
      status TEXT NOT NULL DEFAULT 'pending',
      receipt_image TEXT,
      receipt_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES news_posts(id) ON DELETE CASCADE
    );
  `)
  try { db.exec("ALTER TABLE relief_pledges ADD COLUMN status TEXT DEFAULT 'pending';") } catch {}
  try { db.exec("ALTER TABLE relief_pledges ADD COLUMN receipt_image TEXT;") } catch {}
  try { db.exec("ALTER TABLE relief_pledges ADD COLUMN receipt_name TEXT;") } catch {}

  // 6. Comprehensive Audit & Activity Logs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action_type TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id INTEGER,
      actor_name TEXT NOT NULL,
      actor_email TEXT,
      details TEXT NOT NULL,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 7. AfroMessage SMS Alert Broadcasts Audit Ledger
  db.exec(`
    CREATE TABLE IF NOT EXISTS sms_broadcast_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient_phone TEXT NOT NULL,
      zone TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'sent',
      provider TEXT NOT NULL DEFAULT 'afromessage',
      detail TEXT,
      triggered_by TEXT DEFAULT 'Admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 8. Regional & Sub-City Emergency Responder Contact Registry
  db.exec(`
    CREATE TABLE IF NOT EXISTS emergency_contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      zone_subcity TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      officer_name TEXT DEFAULT 'Sub-City Health Emergency Desk',
      role TEXT DEFAULT 'Health Officer',
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // Seed default emergency contact for Bole Sub-City if none exists
  try {
    const existingBole = db.prepare("SELECT COUNT(*) as c FROM emergency_contacts WHERE zone_subcity LIKE '%Bole%'").get() as any
    if (existingBole.c === 0) {
      db.prepare(`
        INSERT INTO emergency_contacts (zone_subcity, phone_number, officer_name, role, is_active)
        VALUES ('Addis Ababa - Bole Sub-City', '+251967453624', 'Bole Sub-City Health Operations Lead', 'Rapid Response Lead', 1)
      `).run()
    }
  } catch (seedErr) {
    console.warn("[DB] Emergency contact seed error:", seedErr)
  }

  // News table initialized clean with 0 records - real posts created via Admin


  // Seed initial Super Admin ONLY if the database has 0 admins
  const totalAdminsCount = (db.prepare("SELECT COUNT(*) as c FROM admins").get() as any).c

  if (totalAdminsCount === 0) {
    const superAdminEmail = process.env.SUPERADMIN_EMAIL || "admin@tenaye.health"
    const superAdminPassword = process.env.SUPERADMIN_PASSWORD || "TenayeAdmin2026!"
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(superAdminPassword, salt)
    db.prepare(`
      INSERT INTO admins (name, email, password_hash, role)
      VALUES (?, ?, ?, 'super_admin')
    `).run("Yonatan Muluken (Super Admin)", superAdminEmail, hash)
    console.log(`[Database] Initial Super Admin created: ${superAdminEmail}`)
  }
}

/**
 * Universal Audit Logging Helper
 * Records all critical events by ID, action, and timestamp into tenaye.db
 */
export function logAuditEvent(params: {
  actionType:
    | "ADMIN_CREATED"
    | "ADMIN_UPDATED"
    | "ADMIN_DELETED"
    | "PROFILE_UPDATED"
    | "MESSAGE_RECEIVED"
    | "MESSAGE_REPLIED"
    | "MESSAGE_DELETED"
    | "STATUS_CHANGED"
    | "NEWS_PUBLISHED"
    | "NEWS_UPDATED"
    | "NEWS_DELETED"
    | "OUTBREAK_REPORTED"
    | "OUTBREAK_CLUSTERED"
    | "OUTBREAK_APPROVED"
    | "OUTBREAK_REJECTED"
    | "PLEDGE_RECEIVED"
    | string
  entityType: "admin" | "contact_message" | "system" | "news" | "outbreak" | "relief" | string
  entityId?: number | null
  actorName: string
  actorEmail?: string | null
  details: string
  ipAddress?: string | null
}) {
  try {
    db.prepare(`
      INSERT INTO audit_logs (action_type, entity_type, entity_id, actor_name, actor_email, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      params.actionType,
      params.entityType,
      params.entityId || null,
      params.actorName,
      params.actorEmail || null,
      params.details,
      params.ipAddress || null,
    )
  } catch (err) {
    console.error("[AuditLog Error]", err)
  }
}
