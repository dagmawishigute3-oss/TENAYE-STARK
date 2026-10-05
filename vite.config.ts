import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"
import https from "node:https"

/** High-fidelity proxy plugin for Google Translate TTS (Amharic, Afan Oromo, Tigrinya, Somali, etc.) */
function tenayeTtsPlugin(): Plugin {
  const fetchTts = (
    targetLang: string,
    text: string,
    res: any,
    onFail?: () => void,
  ) => {
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(
      targetLang,
    )}&q=${encodeURIComponent(text)}`

    const client = https.get(
      googleTtsUrl,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Referer: "https://translate.google.com/",
        },
      },
      (upstreamRes) => {
        const contentType = (
          upstreamRes.headers["content-type"] || ""
        ).toLowerCase()
        const isAudio =
          contentType.includes("audio") ||
          contentType.includes("mpeg") ||
          contentType.includes("octet-stream")

        if (upstreamRes.statusCode === 200 && isAudio) {
          res.writeHead(200, {
            "Content-Type": contentType || "audio/mpeg",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Cache-Control": "public, max-age=86400",
          })
          upstreamRes.pipe(res)
        } else {
          upstreamRes.resume() // Drain unneeded response data
          if (onFail) {
            onFail()
          } else {
            res.statusCode = upstreamRes.statusCode || 500
            res.end()
          }
        }
      },
    )

    client.on("error", (err) => {
      if (onFail) {
        onFail()
      } else {
        res.statusCode = 502
        res.setHeader("Content-Type", "application/json")
        res.end(
          JSON.stringify({
            error: "TTS Proxy upstream failure",
            message: err.message,
          }),
        )
      }
    })
  }

  const handler = (req: any, res: any) => {
    try {
      const parsedUrl = new URL(
        req.url || "",
        `http://${req.headers.host || "localhost"}`,
      )
      const text = parsedUrl.searchParams.get("q") || ""
      const tl = parsedUrl.searchParams.get("tl") || "en"

      if (!text) {
        res.statusCode = 400
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({ error: "Missing parameter q" }))
        return
      }

      let targetLang = tl.toLowerCase()
      // Google TTS supports 'am' directly for Ge'ez script (Amharic & Tigrinya)
      if (targetLang === "ti") {
        targetLang = "am"
      }

      // Somali (so) & Afan Oromo (om) are Cushitic Latin-script languages.
      if (targetLang === "so" || targetLang === "om") {
        targetLang = "sw"
      }

      fetchTts(targetLang, text, res, () => {
        // Universal fallback to 'sw' if any voice fails
        fetchTts("sw", text, res)
      })
    } catch (err: any) {
      res.statusCode = 500
      res.setHeader("Content-Type", "application/json")
      res.end(
        JSON.stringify({
          error: "Internal Server Error",
          message: err?.message,
        }),
      )
    }
  }

  return {
    name: "tenaye-tts-plugin",
    configureServer(server) {
      server.middlewares.use("/api/tts", handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use("/api/tts", handler)
    },
  }
}

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const emitSourcemaps = mode === "development"

  return {
    build: {
      sourcemap: emitSourcemaps ? "inline" : false,
      minify: !emitSourcemaps,
    },
    plugins: [react(), tailwindcss(), tenayeTtsPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
      strictPort: true,
      proxy: {
        "/api/scholarxiv": {
          target: "https://www.scholarxiv.com/api/v1/papers",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/scholarxiv/, ""),
          headers: {
            Authorization:
              "Bearer sxv_gZilZwIZrVmrVHAUASgIiCRqYxWbWpRjZWJQqbgSxXDaFcgIQtHWGrxqVIVJCILV",
            "x-api-key":
              "sxv_gZilZwIZrVmrVHAUASgIiCRqYxWbWpRjZWJQqbgSxXDaFcgIQtHWGrxqVIVJCILV",
          },
        },
        "/api/news": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/outbreak-reports": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/auth": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/contact": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/admin": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/health": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
      proxy: {
        "/api/scholarxiv": {
          target: "https://www.scholarxiv.com/api/v1/papers",
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api\/scholarxiv/, ""),
          headers: {
            Authorization:
              "Bearer sxv_gZilZwIZrVmrVHAUASgIiCRqYxWbWpRjZWJQqbgSxXDaFcgIQtHWGrxqVIVJCILV",
            "x-api-key":
              "sxv_gZilZwIZrVmrVHAUASgIiCRqYxWbWpRjZWJQqbgSxXDaFcgIQtHWGrxqVIVJCILV",
          },
        },
        "/api/news": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/outbreak-reports": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/auth": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/contact": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/admin": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
        "/api/health": {
          target: "http://127.0.0.1:5000",
          changeOrigin: true,
        },
      },
    },
  }
})
