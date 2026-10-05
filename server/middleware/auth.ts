import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const JWT_SECRET = process.env.JWT_SECRET || "tenaye_super_secure_jwt_secret_2026_stark_hackathon"

export interface AdminUserPayload {
  id: number
  name: string
  email: string
  role: "super_admin" | "admin"
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminUserPayload
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: Missing authentication token" })
    return
  }

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminUserPayload
    req.admin = decoded
    ;(req as any).user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" })
  }
}

export function requireSuperAdmin(req: Request, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.admin?.role !== "super_admin") {
      res.status(403).json({ error: "Forbidden: Super Admin access required" })
      return
    }
    next()
  })
}
