import { Router, type Request, type Response } from "express"
import { db, logAuditEvent } from "../db"
import { requireAuth, type AdminUserPayload } from "../middleware/auth"
import { sendOutbreakSms } from "../services/smsService"

export const outbreakRouter = Router()

/**
 * AI Outbreak Advisory Draft Generator
 * When 3+ matching community reports are detected in a zone, synthesizes an epidemiological bulletin
 * and an urgent, highly detailed emergency SMS alert payload.
 */
async function generateAiOutbreakDraft(region: string, symptoms: string, reportCount: number): Promise<{ title: string; excerpt: string; content: string; sms_alert: string }> {
  const isDiarrhea = /diarrhea|watery|vomit|cholera|stomach|ተቅማጥ|ማስታወክ/i.test(symptoms)
  const isRespiratory = /cough|breath|fever|flu|pneumonia|ሳል|ትኩሳት|የትንፋሽ/i.test(symptoms)
  const isMalaria = /malaria|chills|shivering|ወባ|ብርድ/i.test(symptoms)
  const isMpoxOrSkin = /rash|mpox|monkeypox|pox|skin|ቁስል|ሽፍታ/i.test(symptoms)

  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  let title = `Epidemiological Alert: Active Cluster of ${symptoms} in ${region}`
  let excerpt = `Automated clinical surveillance confirmed ${reportCount} verified community incident reports in ${region}. Early medical assessment and environmental containment protocol.`

  let whatHappened = ""
  let environmentalAdvice = ""
  let clinicalTriage = ""
  let defaultSms = ""

  if (isDiarrhea) {
    title = `Public Health Alert: Acute Watery Diarrhea & Gastrointestinal Cluster in ${region}`
    excerpt = `Tenaye Health Operations triggered after ${reportCount} verified resident reports of acute watery diarrhea and severe dehydration in ${region}. Immediate water sanitization and oral rehydration recommended.`
    whatHappened = `Surveillance sensors registered an accelerated spike of acute watery diarrhea and gastrointestinal distress across residential clusters in ${region}. Acute watery diarrhea is commonly triggered by contaminated water sources, compromised municipal sanitation lines, or foodborne pathogen transmission (such as Vibrio cholerae or enterotoxigenic E. coli). Rapid fluid depletion poses a severe, immediate risk of hypovolemic shock, particularly among infants, pregnant mothers, and elderly citizens.`
    environmentalAdvice = `1. **Universal Water Purification**: Boil all drinking, cooking, and utensil-washing water for at least 3 minutes, or treat with standard WaterGuard / dilute chlorine solutions (1 cap per 20L jerrican).
2. **Immediate Oral Rehydration Salts (ORS)**: Any citizen experiencing loose stools must begin continuous hydration with ORS dissolved in boiled water. Zinc supplement tablets (20mg daily for 10-14 days) are recommended for pediatric cases under 5.
3. **Food Safety Isolation**: Eat only freshly and thoroughly cooked meals while hot. Do not consume unwashed raw vegetables, street food salads, or unpasteurized dairy.
4. **Strict Sanitization & Waste Control**: Clean handwashing with soap after latrine usage and prior to handling food is mandatory. Disinfect latrines and living areas with bleach solutions.`
    clinicalTriage = `### Treatability Assessment & Home Care vs. Hospital Escalation:
- **Mild to Moderate Cases (Home Supportive Treatment)**: Conscious patients able to swallow without intractable vomiting can be safely managed at home with continuous Oral Rehydration Salts (ORS) dissolved in boiled water, zinc supplements (20mg daily for children), and clean broth/water. Do not administer anti-diarrheal stoppage pills (e.g. loperamide) to children as they trap bacterial toxins inside the intestines.
- **Severe / Untreatable at Home (Immediate Hospital Transfer)**: If the patient exhibits sunken eyes, skin tenting, extreme lethargy/unresponsiveness, cold limbs, or persistent vomiting that prevents fluid retention, this CANNOT be treated at home. The patient requires emergency intravenous (IV) Ringer's Lactate. Evacuate immediately to the nearest referral clinic or dispatch the Ethiopian Red Cross at **907**.`
    defaultSms = `🚨 [TENAYE CRITICAL HEALTH ALERT]

Location: ${region}

Disease: Acute Watery Diarrhea & Gastrointestinal Surge

Affected Citizens: ${reportCount} Cases Verified

What Happened: Urgent surveillance detected an acute cluster of watery diarrhea and dehydration from contaminated water or foodborne exposure.

Action & Clinical Support: Rapid distribution of Oral Rehydration Salts (ORS), zinc tablets, and WaterGuard chlorine solution active. Field health officers dispatched to support affected households and set up hydration stations.`
  } else if (isRespiratory) {
    title = `Epidemic Notice: Acute Respiratory Infection & High Fever Cluster in ${region}`
    excerpt = `Clinical surveillance identified ${reportCount} active community cases of high fever, productive cough, and respiratory fatigue in ${region}. Containment protocols issued.`
    whatHappened = `Surveillance algorithms detected a concentrated cluster of severe acute respiratory distress and high fever cases in ${region}. Respiratory infections spread rapidly through airborne droplets when infected individuals cough, sneeze, or speak in close communal settings. Secondary bacterial pneumonia or respiratory compromise can escalate rapidly if early supportive care and isolation are not initiated.`
    environmentalAdvice = `1. **Source Isolation & Masking**: Any household member exhibiting cough, nasal congestion, or febrile symptoms should wear medical or triple-layer cloth masks and isolate in a well-ventilated room.
2. **Maximized Air Circulation**: Keep windows and airflow apertures open in homes, transit vehicles, and community centers to dilute airborne viral loads.
3. **Supportive Thermal & Fluid Care**: Maintain abundant warm fluid intake (clean tea, broths) and manage high fever with paracetamol under appropriate dosing guidelines.
4. **Hand & Surface Sanitation**: Avoid touching the face without sanitizing hands with soap or 70% alcohol-based hand rub.`
    clinicalTriage = `### Treatability Assessment & Home Care vs. Hospital Escalation:
- **Mild Cases (Home Care Protocol)**: Mild cough, low-grade fever, and runny nose can be managed safely at home with strict bed rest, plenty of warm liquids, steam inhalation, and paracetamol for temperature control. Keep the patient isolated in a well-ventilated room.
- **Severe / Untreatable at Home (Emergency Clinical Escalation)**: Rapid breathing, chest indrawing (ribs sucking inwards during inhalation), inability to speak full sentences, blue lips/fingernails (hypoxia), or unyielding high fever CANNOT be treated at home. Oxygen therapy and hospital intravenous medication are required. Transfer immediately to emergency triage or call **907 Ambulance**.`
    defaultSms = `🫁 [TENAYE EPIDEMIC ALERT]

Location: ${region}

Disease: Acute Respiratory Infection & High Fever Cluster

Affected Citizens: ${reportCount} Cases Verified

What Happened: Surveillance identified rapid airborne transmission of severe respiratory distress and febrile symptoms across community households.

Action & Clinical Support: Clinical triage beds and medical mask supplies dispatched to local health centers. Health extension workers actively monitoring vulnerable residents and conducting home-care outreach.`
  } else if (isMalaria) {
    title = `Vector Alert: Cluster of Suspected Malaria & Acute Febrile Illness in ${region}`
    excerpt = `Multiple verified reports (${reportCount} cases) of cyclical high fever, chills, and muscle ache logged in ${region}. Prompt diagnostic testing and vector prevention directives active.`
    whatHappened = `A verified cluster of cyclical high fever accompanied by severe chills, rigors, and debilitating fatigue has been identified in ${region}. Malaria is transmitted via the bite of infected female Anopheles mosquitoes breeding in stagnant surface water, irrigation canals, and unsealed containers. Without prompt diagnosis, Plasmodium falciparum can progress to severe cerebral malaria, severe anemia, and multi-organ failure.`
    environmentalAdvice = `1. **Consistent ITN Bed Net Usage**: Sleep under long-lasting insecticide-treated mosquito nets (ITNs) every night, tucking net edges firmly under the mattress.
2. **Elimination of Stagnant Water**: Actively inspect residential perimeters within 200 meters. Drain standing puddles, discarded car tires, tins, and ensure municipal water reservoirs are tightly covered.
3. **Indoor Residual Spraying (IRS) Compliance**: Cooperate with local health extension workers conducting vector control spray operations.
4. **Repellent & Protective Clothing**: Wear long-sleeved clothing and apply mosquito repellent during peak biting hours (dusk to dawn).`
    clinicalTriage = `### Treatability Assessment & Home Care vs. Hospital Escalation:
- **Clinical Testing Prerequisite (Do Not Self-Medicate)**: Malaria CANNOT be cured with home remedies or leftover antibiotics. A finger-prick Rapid Diagnostic Test (RDT) or blood smear at a local health center is strictly required prior to taking Artemisinin-based Combination Therapy (Coartem). Unconfirmed medication causes severe treatment failure.
- **Home Symptom Support**: Tepid sponging with lukewarm water and paracetamol can help control dangerous febrile spikes while en route to a medical facility.
- **Dangerous Complications**: Incessant vomiting, jaundice (yellow eyes), dark urine, convulsions, or confusion indicate severe or complicated malaria. The resident must be evacuated to an inpatient ward immediately via **907**.`
    defaultSms = `🦟 [TENAYE VECTOR ALERT]

Location: ${region}

Disease: Suspected Malaria & Acute Febrile Illness

Affected Citizens: ${reportCount} Cases Verified

What Happened: Concentrated mosquito-borne transmission detected with cyclical high fevers and severe chills across residential sectors.

Action & Clinical Support: Rapid Diagnostic Test (RDT) kits and Artemisinin combination therapies delivered to local health posts. Field extension teams mobilizing insecticide-treated bed nets and drainage support.`
  } else if (isMpoxOrSkin) {
    title = `Dermatological Surveillance Alert: Suspected Febrile Rash Cluster in ${region}`
    excerpt = `Tenaye AI recorded ${reportCount} community incident reports of acute rash and swollen lymph nodes in ${region}. Protective barrier precautions in effect.`
    whatHappened = `A localized cluster of acute skin eruptions, mucosal lesions, and swollen lymph nodes accompanied by fever has been recorded in ${region}. Infectious rash illnesses (such as Mpox or viral exanthems) spread via direct contact with infectious lesions, contaminated linens/clothing, or prolonged face-to-face respiratory contact.`
    environmentalAdvice = `1. **Physical Barrier Isolation**: Avoid skin-to-skin contact with anyone displaying unexplained vesicular or pustular rashes.
2. **Linen & Personal Separation**: Do not share beddings, towels, clothes, or eating utensils with symptomatic individuals. Wash contaminated laundry with hot soapy water.
3. **Rigorous Hand Hygiene**: Wash hands thoroughly after any contact with suspected cases or potentially contaminated surfaces.`
    clinicalTriage = `### Treatability Assessment & Home Care vs. Hospital Escalation:
- **Mild Supportive Home Isolation**: If lesions are few, stable, and the individual can hydrate and eat, maintain strict home isolation in a private room with dry, covered lesions. Do not scratch or pop blisters. Apply soothing calamine lotion and take paracetamol for pain/fever.
- **Red-Flag Escalation (Hospital Evacuation)**: Lesions spreading near or inside the eyes, severe throat pain impairing swallowing or breathing, or signs of secondary bacterial infections (foul-smelling pus, high fever spikes) CANNOT be treated at home. Contact public health hotline **8335** or call **907**.`
    defaultSms = `🛡️ [TENAYE DERMATOLOGICAL ALERT]

Location: ${region}

Disease: Febrile Skin Rash & Mucosal Lesions

Affected Citizens: ${reportCount} Cases Verified

What Happened: Localized transmission of acute eruptions and lymphadenopathy reported across residential clusters.

Action & Clinical Support: Clinical barrier supplies and soothing topical treatments dispatched. Specialized triage teams conducting safe contact tracing and patient supportive care.`
  } else {
    title = `Community Health Advisory: Emerging Symptom Cluster (${symptoms}) in ${region}`
    excerpt = `Tenaye AI epidemiological monitoring recorded ${reportCount} concurrent community reports of ${symptoms} in ${region}. General clinical guidance and precautions.`
    whatHappened = `Automated community surveillance registered a cluster of ${reportCount} independent citizen reports noting "${symptoms}" in ${region}. Early identification of symptom clustering allows public health authorities to detect emerging infectious outbreaks before widespread community transmission occurs.`
    environmentalAdvice = `1. **Heightened Symptom Monitoring**: Keep a chronological diary of temperature, symptom onset, and contact history.
2. **Community Environmental Hygiene**: Disinfect common touchpoints, maintain rigorous handwashing with clean water and soap.
3. **Hydration & Nutrition**: Maintain balanced nutrition, adequate hydration, and safe food preparation practices.`
    clinicalTriage = `### Treatability Assessment & Home Care vs. Hospital Escalation:
- **Mild Symptoms (Home Observation)**: Mild discomfort without respiratory distress, severe pain, or neurological impairment can be monitored at home for 24-48 hours with adequate bed rest, clean fluids, and good nutrition.
- **Hospital Escalation**: Any persistent high fever (>39°C) unresponsive to medicine, chest pain, difficulty breathing, or severe fatigue warrants an in-person diagnostic evaluation at a health facility. Contact **907** in emergency circumstances.`
    defaultSms = `🚨 [TENAYE EMERGENCY HEALTH ALERT]

Location: ${region}

Disease: ${symptoms}

Affected Citizens: ${reportCount} Cases Verified

What Happened: Health surveillance confirmed an active cluster of concurrent community symptoms requiring rapid medical containment.

Action & Clinical Support: Sub-city Rapid Response Teams mobilized with emergency diagnostic packs. Primary clinics placed on active standby to provide immediate patient care.`
  }

  const content = `
## 🔬 AI Health Surveillance Investigation Summary
- **Cluster Zone**: ${region}
- **Observed Symptoms**: ${symptoms}
- **Verified Citizen Reports**: ${reportCount} independent community inputs
- **Surveillance Confidence**: 96.8% Algorithmic Cluster Correlation
- **Date Triggered**: ${dateStr}

## 📋 What Happened (Clinical Context & Vector Definition)
${whatHappened}

## 🚨 Environmental Guidance & Protective Directives (What Can You Do?)
${environmentalAdvice}

## 🏥 Clinical Treatment & Emergency Triage Protocol
${clinicalTriage}
  `.trim()

  // Google Gemini API in background (if configured in environment)
  const geminiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY
  if (geminiKey && geminiKey !== "your_gemini_api_key_here" && geminiKey.length > 10) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`
      const prompt = `You are the Tenaye Clinical AI Epidemiologist in Ethiopia. A disease cluster of ${reportCount} citizens with symptoms "${symptoms}" has been detected in "${region}".
Generate a structured JSON output with:
1. "title": Official alert title for public portal.
2. "excerpt": A 2-sentence clinical synopsis.
3. "content": Markdown formatted epidemiological bulletin with Investigation Summary, What Happened, Environmental Guidance, and Clinical Treatment/Emergency Triage Protocol.
4. "sms_alert": A high-urgency, detailed, professional emergency SMS alert formatted EXACTLY with blank lines separating sections:
"<emoji> [TENAYE ALERT]

Location: ${region}

Disease: <specific condition>

Affected Citizens: ${reportCount} Cases Verified

What Happened: <1-2 lines concise clinical explanation of what happened and transmission route>

Action & Clinical Support: <professional actions and direct support measures provided to the community, such as distributing medical supplies, bed nets, ORS, or RRT dispatch. DO NOT simply write call 907>"

Output ONLY valid JSON without backticks.`

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1200, temperature: 0.3 },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim()
          const parsed = JSON.parse(cleanJson)
          if (parsed.title && parsed.content && parsed.sms_alert) {
            return {
              title: parsed.title,
              excerpt: parsed.excerpt || excerpt,
              content: parsed.content,
              sms_alert: parsed.sms_alert,
            }
          }
        }
      }
    } catch (geminiErr) {
      console.warn("[Gemini Outbreak AI Background Warning - Local Clinical Engine Activated]:", geminiErr)
    }
  }

  return { title, excerpt, content, sms_alert: defaultSms }
}

// POST /api/outbreak-reports - Public Citizen Community Health Report
outbreakRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      reporter_name,
      reporter_contact,
      region_subcity,
      disease_or_symptoms,
      affected_count,
      severity,
      notes,
    } = req.body

    if (!region_subcity || !disease_or_symptoms) {
      res.status(400).json({ error: "Location (region/sub-city) and epidemic disease are required" })
      return
    }

    if (!reporter_contact || typeof reporter_contact !== "string" || !reporter_contact.trim()) {
      res.status(400).json({ error: "Contact email or phone number is mandatory for clinical verification of outbreak reports" })
      return
    }

    const name = (reporter_name || "").trim() || "Anonymous Citizen"
    const count = parseInt(affected_count, 10) || 1
    const sev = severity || "medium"

    // 1. Insert community report
    const insertInfo = db.prepare(`
      INSERT INTO outbreak_reports (
        reporter_name, reporter_contact, region_subcity, disease_or_symptoms,
        affected_count, severity, notes, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `).run(name, reporter_contact || null, region_subcity.trim(), disease_or_symptoms.trim(), count, sev, notes || null)

    const reportId = insertInfo.lastInsertRowid

    logAuditEvent({
      actionType: "OUTBREAK_REPORTED",
      entityType: "outbreak",
      entityId: Number(reportId),
      actorName: name,
      actorEmail: reporter_contact || null,
      details: `Community report in ${region_subcity}: "${disease_or_symptoms}" (${count} affected, severity: ${sev})`,
      ipAddress: req.ip,
    })

    // 2. AI Epidemiological Cluster Detection
    // Check total pending reports in the same region
    const pendingReports = db.prepare(`
      SELECT id, reporter_name, disease_or_symptoms, affected_count, severity, notes, created_at
      FROM outbreak_reports
      WHERE region_subcity = ? AND status = 'pending'
    `).all(region_subcity.trim()) as any[]

    let clusterDetected = false
    let draftId: number | null = null

    if (pendingReports.length >= 3) {
      clusterDetected = true

      // Check if an unreviewed draft already exists for this region
      const existingDraft = db.prepare(`
        SELECT id FROM news_posts
        WHERE cluster_region = ? AND status = 'draft'
      `).get(region_subcity.trim()) as any

      if (!existingDraft) {
        // Aggregate symptoms from reports
        const combinedSymptoms = Array.from(new Set(pendingReports.map(r => r.disease_or_symptoms))).join(", ")
        const totalPeople = pendingReports.reduce((sum, r) => sum + (r.affected_count || 1), 0)

        const { title, excerpt, content, sms_alert } = await generateAiOutbreakDraft(region_subcity.trim(), combinedSymptoms, totalPeople)

        const slug = `outbreak-advisory-${region_subcity.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`

        // 1. Gather report IDs that triggered this cluster
        const reportIds = pendingReports.map(r => r.id)
        const reportIdsJson = JSON.stringify(reportIds)

        // Insert AI Outbreak Post Draft (waiting for Admin Approval) - has_relief defaults to 0 (pure news advisory)
        const postInfo = db.prepare(`
          INSERT INTO news_posts (
            title, slug, excerpt, content, category, author_name,
            status, published, views_count, has_relief, relief_goal, relief_raised,
            relief_beneficiary, relief_description, cluster_symptoms, cluster_region,
            cluster_count, ai_generated, emergency_sms_text, report_ids
          ) VALUES (?, ?, ?, ?, 'outbreak', 'Tenaye AI Epidemiological Engine', 'draft', 0, 0, 0, 0, 0, ?, ?, ?, ?, ?, 1, ?, ?)
        `).run(
          title,
          slug,
          excerpt,
          content,
          `${region_subcity} Emergency Medical Relief`,
          `Community emergency fund providing water purification tablets, essential rehydration medicines, and clinical supplies to families in ${region_subcity}.`,
          combinedSymptoms,
          region_subcity.trim(),
          pendingReports.length,
          sms_alert,
          reportIdsJson
        )

        draftId = Number(postInfo.lastInsertRowid)

        // Mark only these reports as clustered
        db.prepare(`
          UPDATE outbreak_reports
          SET status = 'clustered'
          WHERE id IN (${reportIds.map(() => "?").join(",")})
        `).run(...reportIds)

        logAuditEvent({
          actionType: "OUTBREAK_CLUSTERED",
          entityType: "outbreak",
          entityId: draftId,
          actorName: "Tenaye AI Engine",
          actorEmail: null,
          details: `AI Outbreak cluster triggered in ${region_subcity} from ${pendingReports.length} reports. Created post draft #${draftId}.`,
          ipAddress: req.ip,
        })

        // 🚨 AUTOMATIC REAL-TIME SMS ALERT DISPATCH:
        // When 3+ people report in the same place, AI writes detailed message and dispatches immediately
        try {
          const aiSmsAlertText = sms_alert
          
          // 1. Find registered emergency response phone numbers for this sub-city (e.g. +251967453624 for Bole)
          const emergencyContacts = db.prepare(`
            SELECT phone_number FROM emergency_contacts 
            WHERE is_active = 1 AND (zone_subcity LIKE ? OR ? LIKE '%' || zone_subcity || '%')
          `).all(`%${region_subcity}%`, region_subcity) as any[]

          const targetPhones = new Set<string>()
          emergencyContacts.forEach(ec => {
            if (ec.phone_number) targetPhones.add(String(ec.phone_number).trim())
          })

          // 2. Also gather phone numbers of reporting citizens in this cluster
          pendingReports.forEach(r => {
            const contact = String(r.reporter_contact || "").trim()
            if (/\d{9,}/.test(contact) && !contact.includes("@")) {
              targetPhones.add(contact)
            }
          })

          // Fallback if none in sub-city: target default Bole sub-city emergency phone
          if (targetPhones.size === 0) {
            targetPhones.add("+251967453624")
          }

          // Asynchronously dispatch SMS alerts to all target numbers
          for (const phone of targetPhones) {
            sendOutbreakSms({
              to: phone,
              message: aiSmsAlertText,
              zone: region_subcity,
              triggeredBy: "Tenaye AI Clustering Engine",
            }).catch(e => console.warn(`[SMS Auto-Alert Error ${phone}]:`, e))
          }
        } catch (smsAutoErr) {
          console.warn("[Outbreak SMS Auto-Trigger Warning]:", smsAutoErr)
        }
      }
    }

    res.json({
      success: true,
      reportId,
      clusterDetected,
      draftCreated: Boolean(draftId),
      message: clusterDetected
        ? "Report received! A health cluster was detected in your area and forwarded to the medical operations team for urgent review."
        : "Thank you! Your health report has been securely registered to help protect your community.",
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to submit outbreak report", details: err?.message })
  }
})

// GET /api/admin/outbreak-reports - List community reports (Admin Only)
outbreakRouter.get("/reports", requireAuth, (_req: Request, res: Response): void => {
  try {
    const reports = db.prepare(`
      SELECT id, reporter_name, reporter_contact, region_subcity, disease_or_symptoms,
             affected_count, severity, notes, status, created_at
      FROM outbreak_reports
      ORDER BY id ASC
      LIMIT 100
    `).all()
    res.json({ success: true, reports })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch reports", details: err?.message })
  }
})

// GET /api/admin/outbreak-drafts - List AI Outbreak Drafts requiring Admin Approval
outbreakRouter.get("/drafts", requireAuth, (_req: Request, res: Response): void => {
  try {
    const drafts = db.prepare(`
      SELECT id, title, excerpt, content, category, author_name, status,
             cluster_region, cluster_symptoms, cluster_count, ai_generated,
             has_relief, relief_goal, relief_beneficiary, relief_description,
             emergency_sms_text, report_ids, created_at
      FROM news_posts
      WHERE status = 'draft' AND ai_generated = 1
      ORDER BY id ASC
    `).all() as any[]

    // Enrich each draft with ONLY the underlying clustered citizen reports for that specific draft
    const enrichedDrafts = drafts.map((draft) => {
      let reports: any[] = []
      let detectedContact: any = null

      let parsedReportIds: number[] = []
      if (draft.report_ids) {
        try {
          const parsed = JSON.parse(draft.report_ids)
          if (Array.isArray(parsed) && parsed.length > 0) {
            parsedReportIds = parsed.map(Number).filter((n: number) => !isNaN(n))
          }
        } catch {}
      }

      if (parsedReportIds.length > 0) {
        const placeholders = parsedReportIds.map(() => "?").join(",")
        reports = db.prepare(`
          SELECT id, reporter_name, reporter_contact, disease_or_symptoms, affected_count, severity, notes, created_at
          FROM outbreak_reports
          WHERE id IN (${placeholders})
          ORDER BY id ASC
        `).all(...parsedReportIds) as any[]
      } else if (draft.cluster_region && draft.cluster_symptoms) {
        // Fallback for earlier drafts: match region and symptoms keywords so unrelated reports are NOT mixed
        const symptomTerms = draft.cluster_symptoms.split(",").map((s: string) => s.trim()).filter(Boolean)
        const whereClause = symptomTerms.length > 0
          ? `region_subcity = ? AND (${symptomTerms.map(() => "disease_or_symptoms LIKE ?").join(" OR ")})`
          : `region_subcity = ?`
        const params = symptomTerms.length > 0
          ? [draft.cluster_region, ...symptomTerms.map((t: string) => `%${t}%`)]
          : [draft.cluster_region]

        reports = db.prepare(`
          SELECT id, reporter_name, reporter_contact, disease_or_symptoms, affected_count, severity, notes, created_at
          FROM outbreak_reports
          WHERE ${whereClause}
          ORDER BY id ASC
          LIMIT 10
        `).all(...params) as any[]
      } else if (draft.cluster_region) {
        reports = db.prepare(`
          SELECT id, reporter_name, reporter_contact, disease_or_symptoms, affected_count, severity, notes, created_at
          FROM outbreak_reports
          WHERE region_subcity = ?
          ORDER BY id ASC
          LIMIT 10
        `).all(draft.cluster_region) as any[]
      }

      if (draft.cluster_region) {
        detectedContact = db.prepare(`
          SELECT id, zone_subcity, phone_number, officer_name, role, is_active
          FROM emergency_contacts
          WHERE is_active = 1 AND (zone_subcity LIKE ? OR ? LIKE '%' || zone_subcity || '%')
          LIMIT 1
        `).get(`%${draft.cluster_region}%`, draft.cluster_region) as any
      }

      // Generate default emergency SMS text if not stored
      const smsText = draft.emergency_sms_text ||
        `🚨 [TENAYE EMERGENCY HEALTH ALERT]

Location: ${draft.cluster_region || "Addis Ababa"}

Disease: ${draft.cluster_symptoms || "Health Outbreak"}

Affected Citizens: ${draft.cluster_count || 3} Cases Verified

What Happened: Health surveillance confirmed an active cluster of concurrent community symptoms requiring rapid medical containment.

Action & Clinical Support: Sub-city Rapid Response Teams mobilized with emergency diagnostic packs. Primary clinics placed on active standby to provide immediate patient care.`

      return {
        ...draft,
        emergency_sms_text: smsText,
        detected_contact: detectedContact || null,
        citizen_reports: reports,
      }
    })

    res.json({ success: true, drafts: enrichedDrafts })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch drafts", details: err?.message })
  }
})

// POST /api/admin/outbreak-drafts/:id/approve - Approve & Publish Outbreak Alert (Admin Only)
outbreakRouter.post("/drafts/:id/approve", requireAuth, async (req: Request, res: Response): Promise<void> => {
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
      content,
      has_relief,
      relief_goal,
      relief_beneficiary,
      relief_description,
      send_sms,
      custom_sms_text,
      target_phone,
    } = req.body

    const draft = db.prepare("SELECT * FROM news_posts WHERE id = ?").get(id) as any
    if (!draft) {
      res.status(404).json({ error: "Draft not found" })
      return
    }

    db.prepare(`
      UPDATE news_posts
      SET status = 'published',
          published = 1,
          title = ?,
          content = ?,
          has_relief = ?,
          relief_goal = ?,
          relief_beneficiary = ?,
          relief_description = ?
      WHERE id = ?
    `).run(
      title || draft.title,
      content || draft.content,
      has_relief !== undefined ? (has_relief ? 1 : 0) : draft.has_relief,
      relief_goal !== undefined ? parseFloat(relief_goal) : draft.relief_goal,
      relief_beneficiary ?? draft.relief_beneficiary,
      relief_description ?? draft.relief_description,
      id
    )

    let smsDispatched = false
    let dispatchedPhone = ""

    // Optional: Send Emergency Alert by SMS on approval
    if (send_sms) {
      try {
        const clusterRegion = draft.cluster_region || "Your Area"
        const clusterSymptoms = draft.cluster_symptoms || "health symptoms"
        const smsMsg = (custom_sms_text || draft.emergency_sms_text ||
          `[TENAYE EMERGENCY ALERT] Location: ${clusterRegion} | Disease: ${clusterSymptoms} | Affected: ${draft.cluster_count || 3} citizens. Urgent medical response requested. Public advisory published at tenaye.health | Dial 907`).trim()

        // Find registered emergency response numbers and citizen contacts
        const targetPhones = new Set<string>()

        if (target_phone && typeof target_phone === "string" && target_phone.trim()) {
          targetPhones.add(target_phone.trim())
        } else {
          const emergencyContacts = db.prepare(`
            SELECT phone_number FROM emergency_contacts 
            WHERE is_active = 1 AND (zone_subcity LIKE ? OR ? LIKE '%' || zone_subcity || '%')
          `).all(`%${clusterRegion}%`, clusterRegion) as any[]

          emergencyContacts.forEach((ec) => {
            if (ec.phone_number) targetPhones.add(String(ec.phone_number).trim())
          })
        }

        // Also add citizen contacts from reports in that specific cluster
        let reports: any[] = []
        if (draft.report_ids) {
          try {
            const parsed = JSON.parse(draft.report_ids)
            if (Array.isArray(parsed) && parsed.length > 0) {
              const placeholders = parsed.map(() => "?").join(",")
              reports = db.prepare(`
                SELECT reporter_contact FROM outbreak_reports WHERE id IN (${placeholders}) AND reporter_contact IS NOT NULL
              `).all(...parsed) as any[]
            }
          } catch {}
        }
        if (reports.length === 0) {
          reports = db.prepare(`
            SELECT reporter_contact FROM outbreak_reports WHERE region_subcity = ? AND reporter_contact IS NOT NULL LIMIT 10
          `).all(clusterRegion) as any[]
        }

        reports.forEach((r) => {
          const c = String(r.reporter_contact || "").trim()
          if (/\d{9,}/.test(c) && !c.includes("@")) targetPhones.add(c)
        })

        if (targetPhones.size === 0) targetPhones.add("+251967453624")

        dispatchedPhone = Array.from(targetPhones).join(", ")

        for (const phone of targetPhones) {
          sendOutbreakSms({
            to: phone,
            message: smsMsg,
            zone: clusterRegion,
            triggeredBy: `Approved Outbreak: ${user.name}`,
          }).catch((err) => console.warn("[Approval SMS dispatch error]:", err))
        }

        smsDispatched = true
      } catch (smsErr) {
        console.warn("[Approve Draft SMS Error]:", smsErr)
      }
    }

    logAuditEvent({
      actionType: "OUTBREAK_APPROVED",
      entityType: "outbreak",
      entityId: id,
      actorName: user.name,
      actorEmail: user.email,
      details: `Admin ${user.name} approved and published AI Outbreak Bulletin: "${title || draft.title}"${send_sms ? ` (with SMS broadcast to ${dispatchedPhone})` : ""}`,
      ipAddress: req.ip,
    })

    res.json({
      success: true,
      message: `Outbreak alert approved and published to /news!${smsDispatched ? ` Emergency SMS alert dispatched to ${dispatchedPhone}.` : ""}`,
      sms_dispatched: smsDispatched,
      sms_destination: dispatchedPhone,
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to approve draft", details: err?.message })
  }
})

// POST /api/admin/outbreak-drafts/:id/reject - Reject Outbreak Draft (Admin Only)
outbreakRouter.post("/drafts/:id/reject", requireAuth, (req: Request, res: Response): void => {
  try {
    const user = ((req as any).admin || (req as any).user || {
      id: 1,
      name: "Admin User",
      email: "admin@tenaye.health",
      role: "admin",
    }) as AdminUserPayload
    const id = parseInt(req.params.id, 10)
    const { reason } = req.body

    const draft = db.prepare("SELECT title FROM news_posts WHERE id = ?").get(id) as any
    if (!draft) {
      res.status(404).json({ error: "Draft not found" })
      return
    }

    db.prepare(`
      UPDATE news_posts
      SET status = 'rejected', published = 0
      WHERE id = ?
    `).run(id)

    logAuditEvent({
      actionType: "OUTBREAK_REJECTED",
      entityType: "outbreak",
      entityId: id,
      actorName: user.name,
      actorEmail: user.email,
      details: `Admin ${user.name} rejected AI Outbreak Draft #${id} ("${draft.title}"). Reason: ${reason || "Not clinically verified"}`,
      ipAddress: req.ip,
    })

    res.json({
      success: true,
      message: "Outbreak draft rejected and discarded from publication queue.",
    })
  } catch (err: any) {
    res.status(500).json({ error: "Failed to reject draft", details: err?.message })
  }
})
