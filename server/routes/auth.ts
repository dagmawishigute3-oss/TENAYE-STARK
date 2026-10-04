import { Router, type Request, type Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "../db"
import { JWT_SECRET, requireAuth, type AdminUserPayload } from "../middleware/auth"

export const authRouter = Router()

// POST /api/auth/login
authRouter.post("/login", (req: Request, res: Response): void => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" })
    return
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const admin = db.prepare("SELECT * FROM admins WHERE LOWER(email) = ?").get(normalizedEmail) as any

  if (!admin) {
    res.status(401).json({ error: "Invalid email or password" })
    return
  }

  const isMatch = bcrypt.compareSync(String(password), admin.password_hash)
  if (!isMatch) {
    res.status(401).json({ error: "Invalid email or password" })
    return
  }

  const payload: AdminUserPayload = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })

  res.json({
    message: "Login successful",
    token,
    admin: payload,
  })
})

// GET /api/auth/me
authRouter.get("/me", requireAuth, (req: Request, res: Response): void => {
  if (!req.admin) {
    res.status(401).json({ error: "Not authenticated" })
    return
  }

  const admin = db.prepare("SELECT id, name, email, role, created_at FROM admins WHERE id = ?").get(req.admin.id)
  if (!admin) {
    res.status(404).json({ error: "Admin profile not found" })
    return
  }

  res.json({ admin })
})
