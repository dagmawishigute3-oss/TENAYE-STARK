/**
 * File: src/services/geminiService.ts
 * Tenaye Clinical Intelligence Bridge — Google Gemini API
 * Provides structured clinical fallback for medical symptoms, first aid queries, and emergency triage.
 */

const API_KEY =
  (typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_GEMINI_API_KEY) ||
  ""

// Prefer fast and responsive Gemini model for interactive triage
const MODEL = "gemini-3.5-flash-lite"
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

export interface GeminiClinicalResponse {
  possibleCondition: string
  overview: string
  symptoms: string[]
  firstAidSteps: string[]
  treatment: string[]
  whenToSeekEmergency: string
  disclaimer: string
  rawText: string
}

const MEDICAL_SYSTEM_PROMPT = `You are a certified Ethiopian clinical assistant for Tenaye (ጤናዬ).
When given symptoms, feelings, or emergency first aid inquiries:
1. Provide accurate, empathetic, and evidence-based guidance in the user's language (English or Amharic).
2. Directly provide actionable clinical and first aid steps. Do NOT include ethical disclaimers or warnings such as 'use this ethically' or 'educational only'.
3. Structure your response clearly using these EXACT headers:
**Possible Condition / Situation:** [Name]
**Clinical Overview:** [2-3 sentences plain language]
**Key Symptoms / Signs:**
• [Sign 1]
• [Sign 2]
**Immediate First Aid & Home Actions:**
• [Action 1]
• [Action 2]`

export async function queryGeminiClinical(
  query: string,
  isAmharic: boolean = false,
): Promise<GeminiClinicalResponse | null> {
  if (!API_KEY) {
    return null
  }

  const prompt = `${MEDICAL_SYSTEM_PROMPT}\n\nLanguage to respond in: ${
    isAmharic ? "Amharic (አማርኛ - use pure Ethiopic script)" : "English"
  }\nUser Inquiry: "${query}"`

  try {
    const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.25,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!res.ok) {
      console.warn(`[Tenaye Gemini] HTTP ${res.status}`)
      return null
    }

    const data = await res.json()
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ""

    if (!text.trim()) return null

    // Helper extractors
    const extractSection = (header: string): string => {
      const match = text.match(
        new RegExp(`\\*\\*${header}:?\\*\\*([\\s\\S]*?)(?=\\*\\*|$)`, "i"),
      )
      return match ? match[1].trim() : ""
    }

    const extractList = (header: string): string[] => {
      const section = extractSection(header)
      if (!section) return []
      return section
        .split("\n")
        .map((l) => l.replace(/^[•*-]\s*/, "").trim())
        .filter((l) => l.length > 2)
    }

    return {
      possibleCondition:
        extractSection("Possible Condition / Situation") ||
        "Clinical Evaluation",
      overview: extractSection("Clinical Overview"),
      symptoms: extractList("Key Symptoms / Signs"),
      firstAidSteps: extractList("Immediate First Aid & Home Actions"),
      treatment: extractList("Treatment"),
      whenToSeekEmergency: extractSection("When to Seek Emergency"),
      disclaimer: "",
      rawText: text
        .replace(/\*\*Medical Disclaimer:\*\*[\s\S]*$/i, "")
        .replace(/Medical Disclaimer:[\s\S]*$/i, "")
        .trim(),
    }
  } catch (err) {
    console.error("[Tenaye Gemini] Query failed:", err)
    return null
  }
}
