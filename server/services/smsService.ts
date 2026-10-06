import { db } from "../db"
import dotenv from "dotenv"

dotenv.config()

export interface SendSmsParams {
  to: string
  message: string
  zone?: string
  senderName?: string
  triggeredBy?: string
}

export interface SmsResult {
  success: boolean
  provider: "smsethiopia" | "afromessage" | "simulator"
  messageId?: string
  status: "delivered" | "sent" | "simulated" | "failed"
  detail?: string
}

/**
 * Standardize phone number for Ethiopian telecom gateways.
 * Accepts:
 *   - "0911639555" -> "251911639555"
 *   - "+251911639555" -> "251911639555"
 *   - "251911639555" -> "251911639555"
 *   - "911639555" -> "251911639555"
 *   - "0711..." (Safaricom) -> "251711..."
 */
export function formatMsisdn(raw: string): string {
  let cleaned = raw.trim().replace(/[^\d+]/g, "")
  if (cleaned.startsWith("+")) cleaned = cleaned.slice(1)
  if (cleaned.startsWith("0")) cleaned = "251" + cleaned.slice(1)
  else if (cleaned.length === 9 && (cleaned.startsWith("9") || cleaned.startsWith("7"))) {
    cleaned = "251" + cleaned
  }
  return cleaned
}

/**
 * SMSEthiopia & AfroMessage SMS Gateway Dispatcher
 * Priority 1: SMSEthiopia API (Free 100 test SMS included on signup with https://smsethiopia.com)
 * Priority 2: AfroMessage API (fallback if token configured)
 * Priority 3: Built-in local simulator with audit ledger for demo & testing
 */
export async function sendOutbreakSms(params: SendSmsParams): Promise<SmsResult> {
  const { to, message, zone, senderName, triggeredBy } = params

  // Read API key from environment only — set SMS_ETHIOPIA_API_KEY in your .env or Render dashboard
  const smsEthKey =
    process.env.SMS_ETHIOPIA_API_KEY?.trim() ||
    process.env.SMSETHIOPIA_API_KEY?.trim() ||
    ""
  const afroToken = process.env.AFROMESSAGE_API_TOKEN?.trim()
  const customSender = senderName || process.env.SMS_SENDER_NAME?.trim() || process.env.AFROMESSAGE_SENDER_NAME?.trim() || "Tenaye Alert"

  const msisdn = formatMsisdn(to)
  const displayPhone = "+" + msisdn

  let result: SmsResult = {
    success: false,
    provider: "simulator",
    status: "simulated",
  }

  // ==========================================
  // 1. SMSEthiopia API (PRIMARY FREE CARRIER GATEWAY)
  // Endpoint: https://smsethiopia.com/api/sms/send
  // Headers: { 'KEY': 'YOUR_API_KEY' }
  // Body: { msisdn: '251911639555', text: 'Hello World' }
  // ==========================================
  if (smsEthKey) {
    try {
      const response = await fetch("https://smsethiopia.com/api/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "KEY": smsEthKey,
          "API_KEY": smsEthKey,
        },
        body: JSON.stringify({
          msisdn: msisdn,
          text: message,
        }),
      })

      const data = await response.json().catch(() => null)

      if (response.ok && (data?.status === "success" || data?.success === true || response.status === 200)) {
        result = {
          success: true,
          provider: "smsethiopia",
          messageId: String(data?.message_id || data?.id || data?.data?.id || Date.now()),
          status: "delivered",
          detail: `Delivered via SMSEthiopia (Carrier Gateway: ${customSender})`,
        }
      } else {
        const errorDetail = data?.message || data?.error || (typeof data === "string" ? data : JSON.stringify(data)) || `HTTP ${response.status}`
        result = {
          success: false,
          provider: "smsethiopia",
          status: "failed",
          detail: `SMSEthiopia error: ${errorDetail}`,
        }
      }
    } catch (err: any) {
      console.error("[SMSEthiopia] Network error:", err)
      result = {
        success: false,
        provider: "smsethiopia",
        status: "failed",
        detail: err.message || "Network error connecting to smsethiopia.com",
      }
    }
  }
  // ==========================================
  // 2. AfroMessage Fallback (If configured)
  // ==========================================
  else if (afroToken) {
    try {
      const identifierId = process.env.AFROMESSAGE_IDENTIFIER_ID?.trim()
      const url = new URL("https://api.afromessage.com/api/send")
      if (identifierId) url.searchParams.append("from", identifierId)
      if (customSender) url.searchParams.append("sender", customSender)
      url.searchParams.append("to", displayPhone)
      url.searchParams.append("message", message)

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${afroToken}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json().catch(() => null)

      if (response.ok && data?.acknowledge === "success") {
        result = {
          success: true,
          provider: "afromessage",
          messageId: data?.response?.message_id || String(Date.now()),
          status: "delivered",
          detail: "Delivered via AfroMessage Ethio Telecom Gateway",
        }
      } else {
        result = {
          success: false,
          provider: "afromessage",
          status: "failed",
          detail: data?.response?.errors?.[0] || data?.message || "AfroMessage API rejected message",
        }
      }
    } catch (err: any) {
      console.error("[AfroMessage] Network error:", err)
      result = {
        success: false,
        provider: "afromessage",
        status: "failed",
        detail: err.message || "Network error connecting to AfroMessage",
      }
    }
  }
  // ==========================================
  // 3. Zero-Config Simulator Fallback
  // ==========================================
  else {
    result = {
      success: true,
      provider: "simulator",
      messageId: `SIM-${Date.now().toString(36).toUpperCase()}`,
      status: "simulated",
      detail: "Demo Mode: Pre-configured for SMSEthiopia (Add SMS_ETHIOPIA_API_KEY in .env for live carrier SMS with 100 free test messages)",
    }
  }

  // Record dispatch in database for full audit trail
  try {
    db.prepare(`
      INSERT INTO sms_broadcast_logs (
        recipient_phone, zone, message, status, provider, detail, triggered_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      displayPhone,
      zone || "All Jurisdictions",
      message,
      result.status,
      result.provider,
      result.detail || null,
      triggeredBy || "System Admin"
    )
  } catch (dbErr) {
    console.warn("[SMSService] Failed to log SMS record in DB:", dbErr)
  }

  return result
}
