import express from "express"
import cors from "cors"
import path from "node:path"
import fs from "node:fs"
import dotenv from "dotenv"
import { initDatabase } from "./db"
import { authRouter } from "./routes/auth"
import { contactRouter } from "./routes/contact"
import { adminRouter } from "./routes/admin"

dotenv.config()

// Initialize SQLite database and seed initial super admin
initDatabase()

const app = express()
const PORT = parseInt(process.env.PORT || process.env.SERVER_PORT || "5000", 10)

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Tenaye Backend API",
    timestamp: new Date().toISOString(),
  })
})

// API routes
app.use("/api/auth", authRouter)
app.use("/api/contact", contactRouter)
app.use("/api", contactRouter) // Also mount /api/admin/contacts directly
app.use("/api/admin", adminRouter)

// In production on Render / Vercel, serve static frontend from dist
const distPath = path.resolve(process.cwd(), "dist")
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next()
    }
    res.sendFile(path.join(distPath, "index.html"))
  })
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Tenaye Server] Live & listening on http://0.0.0.0:${PORT}`)
})

export default app
