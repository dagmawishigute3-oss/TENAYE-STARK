# Tenaye (ጤናዬ) - Multilingual AI Health & Emergency Assistant

**Tagline:** Bridging the gap between a health crisis and immediate care with Voxide-powered voice intelligence, real-time hospital routing, and rapid emergency triage.

---

📋 **1. Project Overview**

Tenaye (ጤናዬ) is a bilingual (Amharic and English) health and emergency web application developed for the Stark Official Hackathon. Designed to eliminate critical delays during medical emergencies, Tenaye integrates voice-first symptom reporting via the Voxide processing engine, rapid emergency dialing, hospital geolocation, a comprehensive medical reference library, a globally persistent AI assistant widget accessible across all pages with a full-screen display mode, an integrated **Scholarship/ScholarXiv search feature** directly accessible via the search bar for instant verified research, and a full-fledged **Admin Management Dashboard & Contact Triage System** for healthcare operations.

---

🎯 **2. Problem Statement**

During medical emergencies or health crises in regions like Ethiopia:

* **Language & Literacy Barriers:** Complex medical terms and language gaps prevent users from quickly understanding symptoms or accessing instructions.
* **Panic & Information Overload:** During acute trauma or sudden illness, searching through lengthy text manuals causes fatal delays.
* **Hospital Location Friction:** Finding the nearest operational hospital or ambulance service often requires frantic, unorganized searching.
* **Connectivity & Real-Time Constraints:** Accessing accurate, structured health information swiftly under pressure is vital for saving lives.
* **Triage & Operational Gaps:** Healthcare systems often lack a centralized, real-time feedback and inquiry triage hub to prioritize urgent patient inquiries and community reports.

---

💡 **3. Core Features & Architecture**

### 🧭 Navigation & Global AI Assistant
* **Clean Multi-Page Navbar:** Structured navigation including Home, Emergency, Diseases, First Aid Help, Health Tips, About, Contact, and direct secure gateway to the Admin Dashboard.
* **Global Floating AI Chatbot Widget:** Available on every page via a persistent chat icon. Users can toggle a popup or expand it to full-screen mode for deep symptom analysis, hospital searching, and triage.

### 📚 Integrated ScholarXiv Search Bar
* **Direct Search Bar Integration:** Seamlessly queries the ScholarXiv API directly from the frontend interface.
* **Verified Research Bridge:** Instantly connects general symptom and medical queries to verified scholarly literature and research papers without requiring a complex backend setup.

### 📱 Detailed Page Breakdown
* **Home / Landing Page:** Primary landing dashboard featuring high-impact hero sections, quick-access emergency pathways, and streamlined navigation.
* **Emergency and Ambulance Hub:** Geolocation-based hospital locator paired with an emergency quick-dial dashboard.
* **Disease Library Page:** Comprehensive repository detailing medical causes, symptoms, risk factors, and treatments.
* **First Aid Help Page:** Visual, step-by-step emergency care instructions.
* **Health Tip Page:** Daily wellness guidance, nutritional insights, and preventative care practices.
* **About Page:** Project mission, problem statement, and team overview.
* **Contact & Community Inquiry Page:** Advanced intake portal for user feedback, medical inquiries, bug reports, and partnership proposals (see detailed breakdown below).
* **Admin Management Dashboard:** Secure operations and triage control center (see detailed breakdown below).

---

### 📩 Contact & Triage Intake Portal
* **Structured Multi-Attribute Form:**
  * **Full Name, Email Address, and Phone Number:** Accurate sender identity and contact tracing.
  * **Inquiry Categories:** Structured taxonomy (General Inquiry, Emergency Report, Partnership, Feedback, Technical Support, Bug Report, etc.).
  * **Smart Priority Levels:** Adaptive triage ranking (`Low`, `Medium`, `High`, `Urgent`). Intelligently auto-hides priority when standard "Feedback" is selected to streamline user experience.
  * **Subject & Detailed Message Body:** Granular intake capture.
* **Resilient Dual-Persistence Storage:** Submissions are dispatched to the backend SQLite database with synchronized client-side state, ensuring no inquiry is lost during intermittent connectivity.
* **Instant Admin Notification Pipeline:** Contact messages instantly trigger system notifications on the Admin Dashboard for rapid response.

---

### 🛡️ Admin Management Dashboard & Operations Hub
* **Role-Based Authentication & Security:**
  * Tiered access hierarchy (**Super Admin** and standard **Admin**).
  * High-security credential authentication with formatted sequential Admin IDs (`T001`, `T002`, `T003`...).
  * Account credential self-management (Username, Email, and Password updates).
* **Professional Administrative Sidebar Navigation:**
  * **Dashboard Overview:** High-level operational metrics, activity summaries, and real-time status counters.
  * **Contact Messages:** Comprehensive inbox table with sequential message numbering (`1`, `2`, `3`...), category tags, priority indicators, and search/filtering.
  * **Administrative Team Roster:** Manage platform administrators with view, edit, delete, and add new admin capabilities.
  * **Settings & Profile:** Administrative security and profile controls.
* **Context-Aware AI Reply Generator:**
  * Intelligent context detection: Analyzes the sender's subject and message body to generate appropriate responses (e.g., technical troubleshooting for bugs, collaboration notes for partnerships, or empathetic medical guidance for health concerns).
* **One-Click Gmail Reply Integration:**
  * Deep-links directly to Google Gmail with pre-filled recipient email, subject line, and the generated response ready for review and sending.
* **Message Triage & Workflow Management:**
  * Mark as Read / Unread toggle icon for quick status tracking.
  * Safe message deletion and record management.
* **Data Export & Audit Trails:**
  * One-click data export to JSON formats for both contact messages and administrative user rosters.
  * Persistent activity log recording all administrative actions (admin creation, deletions, credential changes, and message responses).
* **Adaptive Theme Engine:**
  * High-contrast Dark Mode and a warm, clear Cream Light Mode (`#FAF7F2`) optimized for long clinical review sessions.
* **Real-Time Notification Center:**
  * Interactive top-bar bell notification dropdown alerting administrators to new incoming messages and system events.

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
* **Database & Persistence:** SQLite (`server/db.ts`) with client-side mirrored state management (`src/services/db.ts`)
* **Voice Processing Engine:** Voxide (Amharic and English Speech-to-Text and Web Audio voice streaming)
* **Search & Research Integration:** ScholarXiv API (direct frontend query integration)
* **Artificial Intelligence:** Google Gemini API and Local Clinical Medical Knowledge Base
* **Deployment Readiness:** Configured for cross-platform deployment (Vite + Express backend compatible with Render, Vercel, and modern container runtimes)

---

👥 **5. Team Information**

* **Project Name:** Tenaye (ጤናዬ)
* **Team Members:** Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, and Ayub Ebrahim
* **Target Competition:** Stark Official Hackathon

---
