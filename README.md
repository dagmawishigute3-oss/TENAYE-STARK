# Tenaye (ጤናዬ) - Multilingual AI Health & Emergency Assistant

**Tagline:** Bridging the gap between a health crisis and immediate care with Voxide-powered voice intelligence, real-time hospital routing, and rapid emergency triage.

---

📋 **1. Project Overview**

Tenaye (ጤናዬ) is a bilingual (Amharic and English) health and emergency web application developed for the Stark Official Hackathon. Designed to eliminate critical delays during medical emergencies, Tenaye integrates voice-first symptom reporting via the Voxide processing engine, rapid emergency dialing, hospital geolocation, a comprehensive medical reference library, a globally persistent AI assistant widget accessible across all pages with a full-screen display mode, an integrated **Scholarship/ScholarXiv search feature** directly accessible via the search bar for instant verified research, a **community-driven Health & Outbreak News portal with an integrated Emergency Relief / GoFundMe donation engine**, automated **crowdsourced epidemic surveillance with clinical AI synthesis**, and a full-fledged **Admin Management Dashboard & Operations Hub** for healthcare administrators.

---

🎯 **2. Problem Statement**

During medical emergencies or health crises in regions like Ethiopia:

* **Language & Literacy Barriers:** Complex medical terms and language gaps prevent users from quickly understanding symptoms or accessing instructions.
* **Panic & Information Overload:** During acute trauma or sudden illness, searching through lengthy text manuals causes fatal delays.
* **Hospital Location Friction:** Finding the nearest operational hospital or ambulance service often requires frantic, unorganized searching.
* **Connectivity & Real-Time Constraints:** Accessing accurate, structured health information swiftly under pressure is vital for saving lives.
* **Triage & Operational Gaps:** Healthcare systems often lack a centralized, real-time feedback and inquiry triage hub to prioritize urgent patient inquiries and community reports.
* **Emergency Resource Mobilization Deficits:** When local outbreaks or medical crises strike a community, there is rarely an immediate, localized crowdfunding channel to transparently channel domestic relief through trusted Ethiopian financial services (Telebirr, CBE, Bank of Abyssinia).

---

💡 **3. Core Features & Architecture**

### 🧭 Navigation & Global AI Assistant
* **Clean Multi-Page Navbar:** Structured navigation including Home, Emergency, Diseases, First Aid Help, Health Tips, News, About, Contact, and direct secure gateway to the Admin Dashboard.
* **Global Floating AI Chatbot Widget:** Available on every page via a persistent chat icon. Users can toggle a popup or expand it to full-screen mode for deep symptom analysis, hospital searching, and triage.

### 📚 Integrated ScholarXiv Search Bar
* **Direct Search Bar Integration:** Seamlessly queries the ScholarXiv API directly from the frontend interface without redirect drift.
* **Verified Research Bridge:** Instantly connects general symptom and medical queries to verified scholarly literature and research papers without requiring a complex backend setup.

### 📱 Detailed Page Breakdown
* **Home / Landing Page:** Primary landing dashboard featuring high-impact hero sections, quick-access emergency pathways, and streamlined navigation.
* **Emergency and Ambulance Hub:** Geolocation-based hospital locator paired with an emergency quick-dial dashboard (Red Cross 907, EPHI Hotline 8335).
* **Disease Library Page:** Comprehensive repository detailing medical causes, symptoms, risk factors, and treatments.
* **First Aid Help Page:** Visual, step-by-step emergency care instructions.
* **Health Tip Page:** Daily wellness guidance, nutritional insights, and preventative care practices.
* **News & Epidemic Alerts Portal:** Real-time health bulletins, official announcements, epidemic alerts, and active community emergency campaigns (see detailed breakdown below).
* **About Page:** Project mission, problem statement, and team overview.
* **Contact & Community Inquiry Page:** Advanced intake portal for user feedback, medical inquiries, bug reports, and partnership proposals.
* **Admin Management Dashboard:** Secure operations and triage control center.

---

### 📰 Public Health News, Outbreak Alerts & Community "GoFundMe" Relief Engine
* **Dynamic News & Bulletin Catalog:**
  * Chronologically numbered news stories (`#1`, `#2`, `#3`...) displaying verified public health bulletins, clinical advisories, and administrative releases.
  * Multi-category filtering (**All**, **Platform Announcements**, **Clinical Advisories**, **Epidemic Alerts**, and **Relief Campaigns**).
  * In-depth modal reader rendering content with intelligent executive overview badges, automated key-point extractions, and hotline guidance.
* **Crowdsourced Epidemic Surveillance Intake:**
  * Accessible directly from the News portal via a dedicated **"Report Local Outbreak"** action.
  * Citizens report emerging local symptoms across Ethiopian administrative zones (e.g., *Addis Ababa - Kirkos*, *Bole*, *Gulele*, *Arada*, *Sidama*, etc.) or custom regional jurisdictions.
  * Mandatory contact capture (Phone/Email) for health officer clinical verification.
  * Severity triage ranking (`low`, `medium`, `high`, `urgent`) and affected count indicators.
* **Automated Clinical AI Outbreak Synthesis & Clustering:**
  * When 3 or more independent citizen reports exhibit matching symptoms in a single jurisdiction, Tenaye's epidemiological backend automatically clusters the reports into an **AI Outbreak Advisory Draft**.
  * Auto-synthesizes an epidemiological bulletin complete with:
    1. Incident Analysis & Transmission Vector pathology.
    2. Immediate Environmental Guidance & Resident Directives (water boiling, chlorine dosing, ITN mosquito nets).
    3. Treatability Assessment (Home supportive care with Oral Rehydration Salts vs. Immediate Emergency Hospital Escalation via Red Cross 907).
* **Community Emergency Relief / "GoFundMe" Engine:**
  * Admins can attach an emergency fundraising campaign to any official news or epidemic bulletin with customizable fundraising targets (ETB), beneficiary names, and mission descriptions.
  * **Interactive Public Pledge Interface:**
    * Quick-pledge amounts (100, 250, 500, 1,000, 2,500, 5,000 ETB) or custom amounts.
    * **Privacy Guard:** Toggle to donate completely anonymously or provide full donor identity.
    * **Ethiopian Multi-Gateway Destination Vaults:**
      * **Telebirr (ቴሌብር):** Displays merchant name and phone number with instant digital copy.
      * **Commercial Bank of Ethiopia (CBE / የኢትዮጵያ ንግድ ባንክ):** Displays official account holder and verified CBE account number.
      * **Bank of Abyssinia (BOA):** Displays official account holder and verified BOA account number.
    * **Proof-of-Transfer Receipt Image Upload:** Donors upload screenshots of their mobile banking or bank deposit slips (auto-compressed via HTML5 Canvas).
    * Submissions enter a secure `pending` queue awaiting administrative financial verification before being credited to public campaign totals.
    * **Live Transparency Feed:** Displays real-time progress bars (% funded) and recent solidarity donor messages.

---

### 📩 Contact & Triage Intake Portal
* **Structured Multi-Attribute Form:**
  * **Full Name, Email Address, and Phone Number:** Accurate sender identity and contact tracing.
  * **Inquiry Categories:** Structured taxonomy (General Inquiry, Emergency Report, Partnership, Feedback, Technical Support, Bug Report, etc.).
  * **Smart Priority Levels:** Adaptive triage ranking (`Low`, `Medium`, `High`, `Urgent`). Intelligently auto-hides priority when standard "Feedback" is selected to streamline user experience.
  * **Subject & Detailed Message Body:** Granular intake capture.
* **Resilient Dual-Persistence Storage:** Submissions are dispatched to the backend SQLite database with synchronized client-side state, ensuring no inquiry is lost during intermittent connectivity.
* **Instant Admin Notification Pipeline:** Contact messages instantly trigger system notifications and audible chimes on the Admin Dashboard for rapid response.

---

### 🛡️ Admin Management Dashboard & Operations Hub
* **Role-Based Authentication & Security:**
  * Tiered access hierarchy (**Super Admin** and standard **Admin**).
  * High-security credential authentication with formatted sequential Admin IDs (`T001`, `T002`, `T003`...).
  * Account credential self-management (Username, Email, and Password updates).
* **Professional Administrative Sidebar Navigation:**
  * **Dashboard Overview:** High-level operational metrics, activity summaries, news analysis, relief funds analysis, and real-time status counters.
  * **Contact Messages:** Comprehensive inbox table with sequential message numbering (`1`, `2`, `3`...), category tags, priority indicators, and search/filtering.
  * **News & Epidemic Triage:**
    * **Surveillance Intake & Reports:** Table listing all citizen community illness reports with full detail viewing (`IconEye` modal).
    * **Automated AI Outbreak Drafts:** Review synthesized cluster drafts, customize attached emergency GoFundMe targets, and approve/reject with one click.
    * **Published Articles Catalog:** Manage existing bulletins with in-dashboard reading previews and safe deletion controls.
  * **Community Relief Funds & Donations Management:**
    * Visual summary cards: Total Verified Relief (ETB), Pending Approvals, Total Donors, and Approval Rate.
    * Filterable donation audit table (`all`, `pending`, `approved`, `rejected`) with sequential numbering.
    * **One-Click Receipt Image Lightbox:** Examine transfer slips and transaction details before approval.
    * **One-Click Approve / Reject Triage:** Approving instantly credits the live public campaign balance.
    * **Export Options:** Single-click export of financial records to JSON and printable summary reports.
  * **Administrative Team Roster:** Manage platform administrators with view, edit, delete, and add new admin capabilities.
  * **Settings & Profile:** Administrative credentials, live sound chime toggles, and AI intent detection preferences.
* **Context-Aware AI Reply Generator:**
  * Analyzes the sender's subject and message body to generate appropriate responses (e.g., technical troubleshooting for bugs, collaboration notes for partnerships, or empathetic medical guidance for health concerns).
* **One-Click Gmail Reply Integration:**
  * Deep-links directly to Google Gmail with pre-filled recipient email, subject line, and the generated response ready for review and sending.
* **Real-Time Web Audio Chime Alerts:**
  * Multi-frequency acoustic chimes play when urgent citizen inquiries arrive or new epidemic clusters are identified.
* **Data Export & Audit Trails:**
  * One-click data export to JSON formats for contact messages, relief funds, and administrative user rosters.
  * Persistent activity log recording all administrative actions (admin creation, deletions, credential changes, approvals, and message responses).
* **Adaptive Theme Engine:**
  * High-contrast Dark Mode and a warm, clear Cream Light Mode (`#FAF7F2`) optimized for clinical review environments.

---

### 🎙️ Smart AI & Voice Engine (Chatbot)
* **Voxide Voice and Text Intake:** Bilingual speech-to-text and voice command processing powered by Voxide, supplemented by traditional text input supporting both Amharic and English languages.
* **Multi-Purpose AI Chatbot:** Functions as an emergency hospital locator, symptom assessor, and first-aid assistant utilizing hybrid knowledge routing:
  * **Local Database Match:** Instantly pulls structured summaries for known conditions and links directly to the Disease Library.
  * **Gemini API Fallback:** Dynamically generates structured medical insights for less common queries.
* **Interactive First-Aid Hub:** Step-by-step visual instructional guides designed for acute accidents and high-stress medical situations.

---

🛠 **4. Technical Stack**

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite
* **Backend & API:** Node.js, Express, RESTful APIs
* **Database & Persistence:** SQLite (`server/db.ts`) with Write-Ahead Logging (WAL) and client-side mirrored state management (`src/services/db.ts`)
* **Voice Processing Engine:** Voxide (Amharic and English Speech-to-Text and Web Audio voice streaming)
* **Search & Research Integration:** ScholarXiv API (direct frontend query integration)
* **Artificial Intelligence:** Google Gemini API and Local Clinical Medical Knowledge Base
* **Financial Payment Channels Supported:** Telebirr, Commercial Bank of Ethiopia (CBE), Bank of Abyssinia (BOA)
* **Deployment Readiness:** Configured for cross-platform deployment (Vite + Express backend compatible with Render, Vercel, and modern container runtimes)

---

👥 **5. Team Information**

* **Project Name:** Tenaye (ጤናዬ)
* **Team Members:** Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, and Ayub Ebrahim
* **Target Competition:** Stark Official Hackathon

---
