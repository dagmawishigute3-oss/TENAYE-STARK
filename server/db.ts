import Database from "better-sqlite3"
import path from "node:path"
import fs from "node:fs"
import bcrypt from "bcryptjs"

const dataDir = path.resolve(process.cwd(), "data")
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
  try {
    db.exec("ALTER TABLE contact_messages ADD COLUMN phone TEXT;")
  } catch {}
  try {
    db.exec("ALTER TABLE contact_messages ADD COLUMN category TEXT;")
  } catch {}
  try {
    db.exec("ALTER TABLE contact_messages ADD COLUMN priority TEXT DEFAULT 'Normal - Standard support';")
  } catch {}

  // 3. Outbreak community reports table (for Phase 2 ready)
  db.exec(`
    CREATE TABLE IF NOT EXISTS outbreak_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      disease_or_symptoms TEXT NOT NULL,
      location_zone TEXT NOT NULL,
      severity TEXT NOT NULL DEFAULT 'medium',
      reporter_contact TEXT,
      details TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 4. News and announcements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS news_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'announcement',
      author_name TEXT NOT NULL,
      published INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 5. Emergency Relief / GoFundMe-style Campaigns
  db.exec(`
    CREATE TABLE IF NOT EXISTS relief_campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      target_amount REAL NOT NULL DEFAULT 0,
      raised_amount REAL NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // 6. Comprehensive Audit & Activity Logs table
  // Tracks every action: admin password/name changes, admin added/deleted, messages received/replied/deleted
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

  // Seed default Super Admin ONLY if the database has 0 admins
  // This ensures that when you change your name, email, or password in Settings, it is NEVER overwritten!
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
  actionType: "ADMIN_CREATED" | "ADMIN_UPDATED" | "ADMIN_DELETED" | "PROFILE_UPDATED" | "MESSAGE_RECEIVED" | "MESSAGE_REPLIED" | "MESSAGE_DELETED" | "STATUS_CHANGED"
  entityType: "admin" | "contact_message" | "system"
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
