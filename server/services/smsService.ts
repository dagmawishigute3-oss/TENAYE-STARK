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
  provider: "smsethiopia"
  messageId?: string
  status: "delivered" | "sent" | "failed"
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
 * SMSEthiopia Real Gateway Dispatcher
 * Dispatches real SMS directly through the SMSEthiopia telecom API.
 */
export async function sendOutbreakSms(params: SendSmsParams): Promise<SmsResult> {
  const { to, message, zone, senderName, triggeredBy } = params

  try {
    dotenv.config({ override: true })
  } catch {}

  const smsEthKey =
    process.env.SMS_ETHIOPIA_API_KEY?.trim() ||
    process.env.SMSETHIOPIA_API_KEY?.trim() ||
    ""
  const customSender = senderName || process.env.SMS_SENDER_NAME?.trim() || "Tenaye Alert"

  const msisdn = formatMsisdn(to)
  const displayPhone = "+" + msisdn

  let result: SmsResult = {
    success: false,
    provider: "smsethiopia",
    status: "failed",
  }

  if (!smsEthKey) {
    result = {
      success: false,
      provider: "smsethiopia",
      status: "failed",
      detail: "Missing SMS_ETHIOPIA_API_KEY in environment configuration",
    }
  } else {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000)

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
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const data = await response.json().catch(() => null)

      const isSuccess =
        response.ok &&
        !data?.error_message &&
        !data?.error &&
        (data?.sent === true || data?.status === "success" || data?.success === true || (response.status === 200 && data?.id !== undefined))

      if (isSuccess) {
        result = {
          success: true,
          provider: "smsethiopia",
          messageId: String(data?.message_id || data?.id || Date.now()),
          status: "delivered",
          detail: data?.description ? `${data.description} (Carrier Gateway: ${customSender})` : `Delivered via SMSEthiopia (Carrier Gateway: ${customSender})`,
        }
      } else {
        const rawError = data?.error_message || data?.description || data?.message || data?.error || (typeof data === "string" ? data : JSON.stringify(data)) || `HTTP ${response.status}`
        result = {
          success: false,
          provider: "smsethiopia",
          status: "failed",
          detail: `SMSEthiopia error: ${rawError}`,
        }
      }
    } catch (err: any) {
      console.error("[SMSEthiopia] Network error:", err)
      result = {
        success: false,
        provider: "smsethiopia",
        status: "failed",
        detail: `SMSEthiopia connection error: ${err.message}`,
      }
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
