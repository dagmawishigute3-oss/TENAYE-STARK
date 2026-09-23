"use client";

import { VoxideClient, VoxideWidget } from "@voxide/react";
import { devanagariToEnglish } from "./textSanitizer";

// Official publishable key for Tenaye project
const PUBLIC_KEY = "vox_pub_aedf303988896de856aa0ae4ce1b0867d4cf96bc3206586d";

export const ai = new VoxideClient({
  publicKey: PUBLIC_KEY,
  language: "en-US",
});

let currentActiveLanguage: "en" | "am" = "en";

export function setCurrentLanguage(lang: "en" | "am") {
  currentActiveLanguage = lang;
  try {
    (ai as any).setLanguage?.(lang === "am" ? "am" : "en-US");
  } catch {}
  try {
    const ws = (ai as any)._voiceWs;
    if (ws && ws.readyState === WebSocket.OPEN) {
      const currentState = (ai as any)._getCurrentStateSnapshot?.();
      if (currentState) {
        ws.send(JSON.stringify({ type: "state", state: currentState }));
      }
    }
  } catch {}
}

export function getCurrentLanguage(): "en" | "am" {
  return currentActiveLanguage;
}

try {
  (ai as any).setLanguage?.("en-US");
} catch {}

// Guard microphone, audio playback, status, and turn management
if (typeof window !== "undefined") {
  (window as any).__tenayeVoiceActive = false;
  (window as any).__tenayeIsAiTurnActive = false;
  (window as any).__tenayeLastAudioChunkTime = 0;

  // 1. Guard _voicePlayAudioChunk: track incoming chunks and mark turn active
  const origVoicePlayAudioChunk = (ai as any)._voicePlayAudioChunk?.bind(ai);
  if (origVoicePlayAudioChunk) {
    (ai as any)._voicePlayAudioChunk = function (base64Data: string) {
      (window as any).__tenayeLastAudioChunkTime = Date.now();
      (window as any).__tenayeIsAiTurnActive = true;
      const res = origVoicePlayAudioChunk(base64Data);

      // Hook the newly scheduled buffer source to guarantee listening is restored on ended
      const sources = (ai as any)._voiceActiveSources || [];
      const newSource = sources[sources.length - 1];
      if (newSource && !newSource.__tenayeAttached) {
        newSource.__tenayeAttached = true;
        const origOnEnded = newSource.onended;
        newSource.onended = function () {
          try {
            if (origOnEnded) origOnEnded.call(newSource);
          } catch {}
          const active = (ai as any)._voiceActiveSources || [];
          const outCtx = (ai as any)._voiceAudioOut;
          const nextPlay = (ai as any)._voiceNextPlay || 0;
          if (active.length === 0 && (!outCtx || outCtx.currentTime >= nextPlay - 0.05)) {
            (window as any).__tenayeIsAiTurnActive = false;
            if ((window as any).__tenayeVoiceActive) {
              (ai as any)._setVoiceStatus?.("listening");
            }
          }
        };
      }
      return res;
    };
  }

  // 2. SetVoiceStatus: immediately mark turn inactive when returning to listening
  const origSetVoiceStatus = (ai as any)._setVoiceStatus?.bind(ai);
  if (origSetVoiceStatus) {
    (ai as any)._setVoiceStatus = function (next: string) {
      if (next === "listening" || next === "idle") {
        (window as any).__tenayeIsAiTurnActive = false;
      } else if (next === "speaking" || next === "thinking" || next === "processing") {
        (window as any).__tenayeIsAiTurnActive = true;
      }
      return origSetVoiceStatus(next);
    };
  }

  // 3. Guard _voiceStopPlayback: cleanly stop playback and reset turn status
  const origVoiceStopPlayback = (ai as any)._voiceStopPlayback?.bind(ai);
  if (origVoiceStopPlayback) {
    (ai as any)._voiceStopPlayback = function () {
      const sources = (ai as any)._voiceActiveSources || [];
      for (const src of sources) {
        try { src.stop(); } catch {}
      }
      (ai as any)._voiceActiveSources = [];
      (ai as any)._voiceNextPlay = 0;
      (window as any).__tenayeIsAiTurnActive = false;
      if ((window as any).__tenayeVoiceActive) {
        (ai as any)._setVoiceStatus?.("listening");
      }
    };
  }

  // 4. Guard _voiceStartMic: Never start microphone during text mode, pre-warm audio context, and enforce half-duplex turn taking
  const origVoiceStartMic = (ai as any)._voiceStartMic?.bind(ai);
  if (origVoiceStartMic) {
    (ai as any)._voiceStartMic = async function () {
      if (!(window as any).__tenayeVoiceActive) {
        console.log("[Tenaye Voxide] Mic suppressed: text mode active");
        return;
      }
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx && !(ai as any)._voiceAudioOut) {
          (ai as any)._voiceAudioOut = new AudioCtx({ sampleRate: 24000 });
        }
        if ((ai as any)._voiceAudioOut && (ai as any)._voiceAudioOut.state === "suspended") {
          (ai as any)._voiceAudioOut.resume().catch(() => {});
        }
      } catch {}

      const res = await origVoiceStartMic();

      // Half-Duplex Acoustic Gate: strictly drop mic audio frames whenever AI is thinking, speaking, or playing audio
      try {
        const proc = (ai as any)._voiceProcessor;
        if (proc && proc.onaudioprocess) {
          const origProcess = proc.onaudioprocess;
          proc.onaudioprocess = function (e: any) {
            // Drop mic if voice mode is inactive
            if (!(window as any).__tenayeVoiceActive) {
              return;
            }

            // Drop mic if AI turn is in progress (thinking, processing, speaking)
            if ((window as any).__tenayeIsAiTurnActive) {
              return;
            }

            // Drop mic if speakers are still playing audio buffer
            const outCtx = (ai as any)._voiceAudioOut;
            const nextPlay = (ai as any)._voiceNextPlay || 0;
            if (outCtx && outCtx.currentTime < nextPlay) {
              return;
            }

            // Drop mic if active sound sources are still playing
            const activeSources = (ai as any)._voiceActiveSources;
            if (activeSources && activeSources.length > 0) {
              return;
            }

            // Mic is completely clear to stream user speech cleanly!
            return origProcess.call(proc, e);
          };
        }
      } catch {}

      return res;
    };
  }

  // 5. Track turn completion to gracefully re-enable listening once ALL audio playback completes
  ai.on("message", ({ role }: { role: string }) => {
    if (role === "ai") {
      let checks = 0;
      const interval = setInterval(() => {
        checks++;
        const activeSources = (ai as any)._voiceActiveSources || [];
        const outCtx = (ai as any)._voiceAudioOut;
        const nextPlay = (ai as any)._voiceNextPlay || 0;
        const finished = activeSources.length === 0 && (!outCtx || outCtx.currentTime >= nextPlay - 0.05);
        if (finished || checks > 80 || !(window as any).__tenayeVoiceActive) {
          clearInterval(interval);
          if ((window as any).__tenayeVoiceActive) {
            (window as any).__tenayeIsAiTurnActive = false;
            (ai as any)._setVoiceStatus?.("listening");
          }
        }
      }, 100);
    }
  });

  // 6. Track status transitions to mark AI turn active on thinking/speaking and inactive on listening
  ai.on("status", (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "listening" || s === "idle") {
      (window as any).__tenayeIsAiTurnActive = false;
    } else if (s === "thinking" || s === "processing" || s === "speaking") {
      (window as any).__tenayeIsAiTurnActive = true;
    }
  });
}

/**
 * Disconnect and cleanly reconnect Voxide to start with a fresh state.
 */
export async function reconnectVoxide(): Promise<void> {
  try {
    (ai as any)._voiceStopPlayback?.();
    ai.disconnect();
  } catch {}
  await new Promise(r => setTimeout(r, 120));
  try {
    await ai.connect();
  } catch (err) {
    console.warn("[Tenaye Voxide] Reconnect error:", err);
  }
}

// Configure branding, localized greeting, and design
ai.configureUI({
  title: "Tenaye Health Assistant",
  subtitle: "English & አማርኛ Voice AI",
  greeting:
    "Hello! I am Tenaye Health Assistant. How can I help you today? / ሰላም! የጤናዬ ረዳት ነኝ። ዛሬ በምን ልርዳዎ?",
  placeholder: "Speak in English or አማርኛ, or say 'open about page'...",
  accentColor: "#0D9488",
  theme: "light",
  position: "bottom-right",
  showBranding: false,
});

// Enable adaptive bilingual speech recognition for English and Amharic
ai.enableMultilingual({
  mode: "adaptive",
  supported: ["en", "am"],
});

// App valid routes mapping with concise descriptions
export const APP_ROUTES = [
  {
    path: "/about",
    description: "About Tenaye platform page (/about). Open ONLY when the user explicitly commands to open or go to the about page. DO NOT recite founders when opening this page.",
  },
  {
    path: "/contact",
    description: "Contact inquiry page (/contact). ONLY open when the user explicitly commands to open or go to the contact page.",
  },
  {
    path: "/emergency",
    description: "Emergency ambulance 907 hotline page (/emergency). ONLY open when the user explicitly commands to open or go to the emergency page.",
  },
  {
    path: "/diseases",
    description: "Disease Library page (/diseases). ONLY open when the user explicitly commands to open or go to the disease library page. NEVER open or navigate when the user is asking questions about malaria, diabetes, symptoms, causes, or treatments.",
  },
  {
    path: "/first-aid",
    description: "First aid procedures page (/first-aid). ONLY open when the user explicitly commands to open or go to the first aid page.",
  },
  {
    path: "/health-tips",
    description: "Daily health tips page (/health-tips). ONLY open when the user explicitly commands to open or go to the health tips page.",
  },
  {
    path: "/",
    description: "Home page (/). ONLY open when the user explicitly commands to go to the home page.",
  },
];

/**
 * Strict, regex-grounded multilingual page resolver.
 * Accurately detects explicit navigation commands while completely ignoring
 * conversational and informational questions (e.g. malaria, fever, founders).
 */
export function resolveSpokenPage(rawText: string): string | null {
  if (!rawText) return null;
  const s = rawText.toLowerCase().trim();

  // 1. Direct path matches
  if (s === "/about" || s === "/contact" || s === "/emergency" || s === "/diseases" || s === "/first-aid" || s === "/health-tips" || s === "/") {
    return s;
  }

  // 2. Emergency Page (/emergency)
  if (
    /\b(open\s+emergency|emergency\s+page|open\s+ambulance|call\s+907|hotline\s+907)\b/i.test(s) ||
    /(ድንገተኛ(\s*አደጋ)?\s*ገጽ\s*(ክፈት|ሂድ)|አምቡላንስ\s*ገጽ)/i.test(s)
  ) {
    return "/emergency";
  }

  // 3. First Aid Page (/first-aid)
  if (
    /\b(open\s+first\s*aid|first\s*aid\s+page|cpr\s+guide\s+page)\b/i.test(s) ||
    /(የመጀመሪያ\s*እርዳታ\s*ገጽ\s*(ክፈት|ሂድ))/i.test(s)
  ) {
    return "/first-aid";
  }

  // 4. Health Tips Page (/health-tips)
  if (
    /\b(open\s+health\s*tips?|health\s*tips?\s+page|wellness\s*page)\b/i.test(s) ||
    /(የጤና\s*ምክሮች?\s*ገጽ\s*(ክፈት|ሂድ))/i.test(s)
  ) {
    return "/health-tips";
  }

  // 5. Disease Library Page (/diseases)
  if (
    /\b(open\s+disease\s+library|open\s+diseases?(\s+page)?|go\s+to\s+diseases?(\s+page)?)\b/i.test(s) ||
    /(የበሽታዎች\s*ማውጫ\s*ክፈት|የበሽታዎች\s*ገጽ\s*(ክፈት|ሂድ))/i.test(s)
  ) {
    return "/diseases";
  }

  // 6. Contact Page (/contact)
  if (
    /\b(open\s+contact(\s+page)?|contact\s+us\s+page|go\s+to\s+contact(\s+page)?)\b/i.test(s) ||
    /(አግኙን\s*ገጽ\s*(ክፈት|ሂድ)|የአግኙን\s*ገጽ\s*ክፈት)/i.test(s)
  ) {
    return "/contact";
  }

  // 7. About Page (/about)
  // ONLY explicit page opening commands! NEVER trigger on "who is the founder" or questions!
  if (
    /\b(open(\s+the)?\s+about(\s+page|\s+us)?|about\s+page|about\s+us\s+page|go\s+to\s+about(\s+page)?)\b/i.test(s) ||
    /(ስለ\s*እኛ\s*ገጽ\s*(ክፈት|ሂድ)|ስለእኛ\s*ገጽ\s*ክፈት)/i.test(s)
  ) {
    return "/about";
  }

  // 8. Home Page (/)
  if (
    /\b(open\s+home(\s+page)?|go\s+home|back\s+to\s+home|home\s+page)\b/i.test(s) ||
    /(መነሻ\s*ገጽ\s*(ክፈት|ሂድ)|ወደ\s*መነሻ\s*ገጽ)/i.test(s)
  ) {
    return "/";
  }

  return null;
}

// Navigation state tracking for seamless, de-duplicated transitions
let lastNavigatedTarget = "";
let lastNavigatedTimestamp = 0;
let pendingUserTarget: string | null = null;
let pendingUserTargetTimestamp = 0;

/**
 * Execute client-side route navigation cleanly via React Router without corrupting browser history.
 */
export function navigateTo(path: string, search?: string) {
  if (typeof window === "undefined" || !path) return;

  const targetFull = path + (search ? `?search=${encodeURIComponent(search)}` : "");
  const now = Date.now();

  // Prevent duplicate rapid calls within 800ms
  if (targetFull === lastNavigatedTarget && now - lastNavigatedTimestamp < 800) {
    return;
  }

  lastNavigatedTarget = targetFull;
  lastNavigatedTimestamp = now;
  pendingUserTarget = null; // fulfilled

  console.log("[Tenaye Navigation] Navigating to:", targetFull);

  // Safe navigation through React Router global handle
  if (typeof (window as any).__tenayeNavigate === "function") {
    try {
      (window as any).__tenayeNavigate(targetFull);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } catch (e) {
      console.warn("[Tenaye Navigation] __tenayeNavigate error:", e);
    }
  }

  // Fallback DOM event for NavigationListener
  window.dispatchEvent(
    new CustomEvent("tenaye-navigate", { detail: { path, search } })
  );
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// 1. Register official Voxide navigation tool with constrained valid paths
ai.enableNavigation(
  {
    push: (route: string) => navigateTo(route),
  },
  APP_ROUTES.map((r) => ({
    path: r.path,
    description: r.description,
  }))
);

// 2. Register clean, high-speed capabilities
ai.register({
  // Founder and team capability
  getFounderAndTeam: {
    description: "Get the founders and core team behind Tenaye. ONLY use when user explicitly asks 'who is the founder', 'who made this website', or 'የጤናዬ መስራቾች ማን ናቸው'. NEVER use when opening or navigating to the about page.",
    params: {},
    handler: async () => {
      return {
        status: "ok",
        founders: "Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, Ayub Ebrahim",
        message: "The founders and core team behind Tenaye are Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, and Ayub Ebrahim.",
      };
    },
  },

  // Contact form quick fill
  fillContactForm: {
    description: "Open contact page and pre-fill the inquiry form.",
    params: {
      name: { type: "string", description: "Sender name" },
      email: { type: "string", description: "Sender email" },
      subject: { type: "string", description: "Subject" },
      message: { type: "string", description: "Message content" },
    },
    handler: async ({
      name,
      email,
      subject,
      message,
    }: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    }) => {
      navigateTo("/contact");
      if (typeof window !== "undefined") {
        const payload = { name, email, subject, message };
        (window as any).__pendingContactFill = payload;
        window.dispatchEvent(
          new CustomEvent("tenaye-fill-contact", { detail: payload })
        );
      }
      return {
        status: "ok",
        navigatedTo: "/contact",
        message: `Opened Contact page.`,
      };
    },
  },
  // Website benefits and overview capability
  getWebsiteBenefits: {
    description: "Get comprehensive information about Tenaye platform, its features, and health benefits in English or Amharic.",
    params: {},
    handler: async () => {
      return {
        status: "ok",
        platform: "Tenaye (ጤናዬ)",
        overview: "Tenaye is Ethiopia's digital health companion providing accessible, trusted medical guidance, emergency resources, and disease education.",
        benefitsAmharic: [
          "የጤና መረጃና ግንዛቤ (Comprehensive disease guidance, symptoms, and prevention)",
          "የመጀመሪያ እርዳታ መመሪያዎች (Life-saving first aid instructions for bleeding, CPR, burns)",
          "የአደጋ ጊዜ ጥቆማ 907 (Emergency ambulance dispatch and nearby hospitals)",
          "ዕለታዊ የጤና እና የአኗኗር ዘይቤ ምክሮች (Daily wellness and nutrition tips)",
          "ባለሁለት ቋንቋ AI ረዳት (Bilingual AI health assistant in Amharic & English)"
        ],
        message: "Tenaye provides disease guidance, first aid instructions, emergency hotline 907, daily tips, and bilingual AI assistance in English and Amharic."
      };
    },
  },
});

// 3. Bind state dynamically with strict single-language isolation, full token permission, and complete sections
ai.bindState(() => {
  return {
    currentPage: typeof location !== "undefined" ? location.pathname : "/",
    platformName: "Tenaye (ጤናዬ) Ethiopian Digital Health Platform",
    userActiveLanguage: currentActiveLanguage,
    MANDATORY_LANGUAGE_RULE:
      "CRITICAL STRICT 1-TO-1 LANGUAGE MATCHING (ENGLISH FOR ENGLISH, AMHARIC FOR AMHARIC):\n" +
      "1. THIS IS A MANDATORY RULE: English for English, Amharic for Amharic. NEVER cross languages!\n" +
      "2. If the user speaks or writes in English (Latin script, e.g. 'Hey, can you hear me?', 'tell me about symptoms for common cold', 'open about page'):\n" +
      "   - You MUST answer 100% IN ENGLISH ONLY using Latin script.\n" +
      "   - It is STRICTLY FORBIDDEN to answer in Amharic or Ethiopic Fidel script when the user speaks English!\n" +
      "   - Hearing check in English: Reply ONLY: 'I can hear you clearly. How can I help you with your health today?'\n" +
      "3. If the user speaks or writes in Amharic (Ethiopic Fidel script, e.g. 'ትሰማኛለህ?', 'ስለ ጉንፋን ንገረኝ', 'የስኳር በሽታ ምልክቶች'):\n" +
      "   - You MUST answer 100% IN AMHARIC ONLY using Ethiopic Fidel script (ፊደል).\n" +
      "   - It is STRICTLY FORBIDDEN to answer in English when the user speaks Amharic!\n" +
      "   - Hearing check in Amharic: Reply ONLY: 'አዎ፣ በደንብ እሰማዎታለሁ! ዛሬ በምን የጤና ጉዳይ ልርዳዎ?'\n" +
      "4. NEVER mix languages, NEVER translate between languages, and NEVER answer an English question in Amharic!",
    symptomsAndFocusedQuestionsRule:
      "COMPLETE CLINICAL COVERAGE (WHEN ASKED ABOUT SYMPTOMS):\n" +
      "When the user asks about symptoms (e.g. 'tell me about symptoms for common cold' or 'የጉንፋን ምልክቶች'): DO NOT stop after symptoms! Always deliver the complete full clinical guidance in the matching language:\n" +
      "For English: 1. Overview (1-2 sentences), 2. **Symptoms:** (3-5 bullets), 3. **Causes:** (2-3 bullets), 4. **Home Care & Treatment:** (3-4 bullets).\n" +
      "For Amharic: 1. አጭር መግለጫ (1-2 ዓረፍተ ነገር), 2. **ምልክቶች፡** (3-5 ነጥቦች), 3. **መንስኤዎች፡** (2-3 ነጥቦች), 4. **ህክምና እና እንክብካቤ፡** (3-4 ነጥቦች).\n" +
      "You MUST complete all sections 100% from start to finish without stopping midway!",
    STRICT_LANGUAGE_MATCHING_RULE:
      "STRICT SCRIPT & LANGUAGE ISOLATION: When user interacts in English, answer 100% in English with Latin script. When user interacts in Amharic, answer 100% in Amharic with Ethiopic Fidel script. NEVER mix languages or answer English with Amharic!",
    maxTokenPermissionRule:
      "MAX TOKEN PERMISSION & COMPLETE RESPONSES: You have full permission to use all the tokens needed to deliver complete, high-quality, comprehensive clinical responses in both English and Amharic. NEVER stop midway. NEVER stop at causes. You MUST complete all three sections: 1. Definition (short 1-2 sentence description), 2. Symptoms, 3. Causes, and 4. Home Care & Treatment (in Amharic: ምልክቶች፡, መንስኤዎች፡, and ህክምና እና እንክብካቤ፡).",
    speedAndLatencyRule:
      "SPEED & IMMEDIATE AUDIO: Begin speaking your response immediately without hesitation. Do not use conversational filler or intro phrases like 'Sure, I can help with that', 'Okay', 'Well', 'Let me explain', or 'Certainly'. Start directly with the answer.",
    diseaseDefinitionAndStructureRule:
      "CLINICAL STRUCTURE (SHORT DESCRIPTION & COMPLETE SECTIONS):\n" +
      "For ANY medical condition (Common Cold, Diabetes, Malaria, Diarrhea, Stroke, etc.):\n" +
      "1. DEFINITION: Exactly 1 to 2 short sentences giving a clear definition.\n" +
      "2. BOLD HEADERS ON THEIR OWN LINE: English: **Symptoms:**, **Causes:**, **Home Care & Treatment:** | Amharic: **ምልክቶች፡**, **መንስኤዎች፡**, **ህክምና እና እንክብካቤ፡**\n" +
      "3. COMPLETE BULLET POINTS: Use clear bullet points ('• ') on separate lines under each header.\n" +
      "4. ALWAYS COMPLETE: Deliver all three sections 100% from start to finish without stopping midway!",
    commonColdRule:
      "[ENGLISH] Common Cold:\n" +
      "The common cold is a mild, contagious viral infection that primarily affects your upper respiratory tract, nose, and throat.\n\n" +
      "**Symptoms:**\n" +
      "• Runny or stuffy nose and sinus congestion\n" +
      "• Sore throat and persistent cough\n" +
      "• Sneezing, watery eyes, and mild fatigue\n" +
      "• Low-grade fever or general body aches\n\n" +
      "**Causes:**\n" +
      "• Rhinoviruses and other respiratory viruses\n" +
      "• Airborne droplets spread through coughing or sneezing\n" +
      "• Touching contaminated surfaces and transfer to eyes, nose, or mouth\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Ample rest and getting plenty of sleep\n" +
      "• Drinking warm fluids, hot tea with honey, and broths\n" +
      "• Steam inhalation or saline nasal sprays to relieve congestion\n" +
      "• Over-the-counter fever reducers or pain relievers if needed\n\n" +
      "[AMHARIC] ጉንፋን፡\n" +
      "ጉንፋን በአፍንጫ እና በጉሮሮ ላይ የሚከሰት ቀላል ግን በቀላሉ የሚተላለፍ የመተንፈሻ አካላት የቫይረስ ኢንፌክሽን ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• የአፍንጫ መዘጋት ወይም ንፍጥ መፍሰስ\n" +
      "• የጉሮሮ ህመም እና ሳል\n" +
      "• ማስነጠስ እና የዓይን ማልቀስ\n" +
      "• መጠነኛ ትኩሳት እና የሰውነት ድካም\n\n" +
      "**መንስኤዎች፡**\n" +
      "• ራይኖቫይረስ እና ሌሎች የመተንፈሻ አካላት ቫይረሶች\n" +
      "• በሳል ወይም በማስነጠስ የሚረጩ አየር ወለድ ጠብታዎች\n" +
      "• የተበከሉ ቁሳቁሶችን ከነኩ በኋላ አፍ ወይም ዓይንን መንካት\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• በቂ እረፍት ማድረግ እና ሰውነትን ማሳረፍ\n" +
      "• ሞቅ ያሉ ፈሳሾች፣ ሻይ ከማር ጋር እና ሾርባ በብዛት መጠጣት\n" +
      "• የአፍንጫ መዘጋትን ለማስታገስ የእንፋሎት ትንፋሽ መውሰድ\n" +
      "• ህመሙ ከቀጠለ ወይም ከፍተኛ ትኩሳት ከመጣ የህክምና እርዳታ ማግኘት",
    diabetesRule:
      "[ENGLISH] Diabetes:\n" +
      "Diabetes is a chronic metabolic condition where the body cannot properly produce or use insulin, leading to elevated blood sugar levels.\n\n" +
      "**Symptoms:**\n" +
      "• Frequent urination, especially at night\n" +
      "• Excessive thirst and constant dry mouth\n" +
      "• Unexplained weight loss and persistent fatigue\n" +
      "• Blurred vision and slow-healing sores\n\n" +
      "**Causes:**\n" +
      "• Type 1 autoimmune response destroying insulin-producing pancreatic cells\n" +
      "• Type 2 insulin resistance linked to genetics, overweight, and physical inactivity\n" +
      "• Poor diet high in refined carbohydrates and chronic stress\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Regular daily blood glucose monitoring\n" +
      "• Balanced diet rich in vegetables, lean protein, and fiber with low sugar\n" +
      "• Regular physical exercise (at least 30 minutes daily)\n" +
      "• Consistent adherence to prescribed medications or insulin therapy\n\n" +
      "[AMHARIC] ስኳር በሽታ፡\n" +
      "ስኳር በሽታ ሰውነታችን ኢንሱሊንን በአግባቡ ባለመጠቀሙ በደም ውስጥ ያለው የስኳር መጠን ከፍ እንዲል የሚያደርግ ሥር የሰደደ የጤና እክል ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• በተደጋጋሚ በተለይም በሌሊት መሽናት\n" +
      "• ከፍተኛ የውሃ ጥም እና የአፍ መድረቅ\n" +
      "• ያልታወቀ የክብደት መቀነስ እና ድካም\n" +
      "• የእይታ መደብዘዝ ወይም ብዥታ\n" +
      "• ቁስሎች ቶሎ ያለመዳን\n\n" +
      "**መንስኤዎች፡**\n" +
      "• ዓይነት 1፡ የሰውነት መከላከያ ሥርዓት ኢንሱሊን አምራች ሴሎችን ሲያጠቃ\n" +
      "• ዓይነት 2፡ የዘር ውርስ፣ የክብደት መጨመር እና የአካል ብቃት እንቅስቃሴ ማነስ\n" +
      "• ጤናማ ያልሆነ አመጋገብ እና ጣፋጭ ምግቦች መብዛት\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• የደም ስኳር መጠንን በየጊዜው መለካት እና መከታተል\n" +
      "• የተመጣጠነ ምግብ መመገብ እና ጣፋጭ ምግቦችን መቀነስ\n" +
      "• መደበኛ የአካል ብቃት እንቅስቃሴ (በቀን 30 ደቂቃ) ማድረግ\n" +
      "• የታዘዙ መድኃኒቶችን ወይም ኢንሱሊን በሰዓቱ መውሰድ",
    malariaRule:
      "[ENGLISH] Malaria:\n" +
      "Malaria is a life-threatening infectious disease caused by Plasmodium parasites transmitted through mosquito bites.\n\n" +
      "**Symptoms:**\n" +
      "• High recurring fever and profuse sweating\n" +
      "• Violent shaking chills and shivering\n" +
      "• Severe headache and intense muscle fatigue\n" +
      "• Nausea, vomiting, and general body weakness\n\n" +
      "**Causes:**\n" +
      "• Bites of infected female Anopheles mosquitoes carrying Plasmodium parasites\n" +
      "• Parasites traveling to the liver to mature and multiply in red blood cells\n" +
      "• Presence of stagnant water near residential areas where mosquitoes breed\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Get rapid diagnostic clinic blood testing (RDT) immediately upon fever\n" +
      "• Complete the entire prescribed course of Artemisinin-based Combination Therapy (ACT)\n" +
      "• Sleep under insecticide-treated bed nets every night\n" +
      "• Eliminate stagnant standing water around living spaces to stop mosquito breeding\n\n" +
      "[AMHARIC] ወባ፡\n" +
      "ወባ በወባ ትንኝ ንክሻ ወደ ሰው ደም በሚተላለፉ ጥገኛ ተውሳኮች የሚመጣ አደገኛ ግን በህክምና የሚድን በሽታ ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• በየተወሰነ ሰዓት የሚመጣ ከፍተኛ ትኩሳት\n" +
      "• ብርድ ብርድ ማለት እና ከባድ መንቀጥቀጥ\n" +
      "• ትኩሳቱ ሲለቅ ከፍተኛ ላብ ማላብ\n" +
      "• ኃይለኛ ራስ ምታት እና የጡንቻዎች ድካም\n" +
      "• ማቅለሽለሽ እና የምግብ ፍላጎት መቀነስ\n\n" +
      "**መንስኤዎች፡**\n" +
      "• በፕላስሞዲየም ጥገኛ ተውሳክ የተያዘች አኖፊለስ የወባ ትንኝ ንክሻ\n" +
      "• ጥገኛ ተውሳኩ ወደ ጉበት በመሄድ በደም ውስጥ ሲባዛ\n" +
      "• ለትንኝ መራቢያ የሚሆኑ አቆራጭ ውሃዎች መኖር\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• ትኩሳት ሲሰማ ወዲያውኑ የደም ምርመራ (RDT) ማድረግ\n" +
      "• የታዘዘውን የወባ መድኃኒት (ACT) ሳያቋርጡ በሙሉ መውሰድ\n" +
      "• በየቀኑ በአልጋ አጎበር ውስጥ መተኛት\n" +
      "• በቤት ዙሪያ ያሉ አቆራጭ ውሃዎችን ማድረቅ እና ማጽዳት",
    diarrheaRule:
      "[ENGLISH] Diarrhea:\n" +
      "Diarrhea is a common gastrointestinal disorder marked by frequent loose, watery stools that can quickly cause dehydration.\n\n" +
      "**Symptoms:**\n" +
      "• Frequent loose or watery bowel movements multiple times a day\n" +
      "• Abdominal cramps, bloating, and stomach pain\n" +
      "• Dehydration symptoms including dry mouth, dizziness, and intense thirst\n" +
      "• Mild nausea, vomiting, or low fever\n\n" +
      "**Causes:**\n" +
      "• Viral infections (such as Norovirus or Rotavirus)\n" +
      "• Bacterial infections from contaminated food or unsafe water (such as E. coli or Salmonella)\n" +
      "• Intestinal parasites or food intolerances\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Drink Oral Rehydration Salts (ORS) solution and clean fluids regularly\n" +
      "• Eat gentle bland foods like rice, bananas, toast, and clear broth\n" +
      "• Avoid dairy, high-fat, fried, or heavily spiced foods\n" +
      "• Seek urgent medical care if blood appears in stool or fever exceeds 38.5°C\n\n" +
      "[AMHARIC] ተቅማጥ፡\n" +
      "ተቅማጥ በተደጋጋሚ ፈሳሽ ሰገራ መውጣት የሚያስከትል የተለመደ የሆድና አንጀት ችግር ሲሆን ፈሳሽን በፍጥነት በማሟጠጥ ለድርቀት ይዳርጋል።\n\n" +
      "**ምልክቶች፡**\n" +
      "• በቀን ውስጥ በተደጋጋሚ የሚወጣ ፈሳሽ ሰገራ\n" +
      "• የሆድ ቁርጠት፣ መነፋት እና ህመም\n" +
      "• የአፍ መድረቅ፣ ከፍተኛ ጥም እና የሰውነት ድካም\n" +
      "• የማቅለሽለሽ ስሜት ወይም ቀላል ትኩሳት\n\n" +
      "**መንስኤዎች፡**\n" +
      "• በተበከለ ምግብ ወይም ውሃ የሚተላለፉ ባክቴሪያዎች እና ቫይረሶች\n" +
      "• ንፅህናን አለመጠበቅ እና ያልታጠበ እጅ ንክኪ\n" +
      "• ጥገኛ ተውሳኮች እና የምግብ አለመስማማት\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• የሰውነት ድርቀትን ለመከላከል የአፍ ሪሃይድሬሽን ጨው (ORS) እና ንጹህ ፈሳሾችን በብዛት መጠጣት\n" +
      "• ቀላል ምግቦችን (ሩዝ፣ ሾርባ፣ ሙዝ፣ ዳቦ) መመገብ\n" +
      "• ቅባትና ቅመም የበዛባቸውን ምግቦች ማስወገድ\n" +
      "• ደም ከታየ ወይም ከፍተኛ ትኩሳት ከመጣ ወዲያውኑ ወደ ጤና ተቋም መሄድ",
    strokeRule:
      "[ENGLISH] Stroke:\n" +
      "A stroke is a critical medical emergency where blood flow to part of the brain is interrupted, depriving brain tissue of oxygen.\n\n" +
      "**Emergency Warning Signs (FAST):**\n" +
      "• **Face Drooping (F):** One side of the face droops or is numb when trying to smile\n" +
      "• **Arm Weakness (A):** One arm drifts downward when raising both arms\n" +
      "• **Speech Difficulty (S):** Slurred speech or difficulty understanding words\n" +
      "• **Time to Call 907 (T):** Call emergency hotline 907 immediately\n\n" +
      "**Causes:**\n" +
      "• Ischemic stroke caused by a blood clot blocking an artery to the brain\n" +
      "• Hemorrhagic stroke caused by a ruptured or leaking blood vessel in the brain\n" +
      "• High blood pressure, heart disease, diabetes, and smoking\n\n" +
      "**Immediate Actions:**\n" +
      "• Call emergency hotline 907 immediately for ambulance dispatch\n" +
      "• Keep the person lying flat with head and shoulders slightly elevated\n" +
      "• Do NOT give food, water, or aspirin\n" +
      "• Note the exact time when symptoms first started\n\n" +
      "[AMHARIC] ስትሮክ እና የFAST ምልክቶች፡\n" +
      "ስትሮክ ወደ አንጎል የሚሄደው የደም ዝውውር ሲቋረጥ የሚከሰት አስቸኳይ የህክምና አደጋ ነው።\n\n" +
      "**የስትሮክ ምልክቶች (FAST)፡**\n" +
      "• **የፊት መውረድ (F)፡** ሲስቁ አንደኛው የፊት ክፍል መልፈስፈስ ወይም መውረድ\n" +
      "• **የእጅ መድከም (A)፡** እጅን ሲያነሱ አንደኛው እጅ መድከም ወይም መንሳፈፍ\n" +
      "• **የንግግር መለወጥ (S)፡** ቃላትን በግልጽ መናገር ወይም መረዳት አለመቻል\n" +
      "• **የአደጋ ጊዜ ጥሪ (T)፡** ወዲያውኑ ለ907 መደወል\n\n" +
      "**መንስኤዎች፡**\n" +
      "• ወደ አንጎል የሚሄድ የደም ቧንቧ በረጋ ደም መዘጋት (Ischemic)\n" +
      "• በአንጎል ውስጥ የደም ቧንቧ መፈንዳት ወይም ደም መፍሰስ (Hemorrhagic)\n" +
      "• ከፍተኛ የደም ግፊት፣ የስኳር በሽታ እና የልብ ችግሮች\n\n" +
      "**አስቸኳይ እርምጃዎች፡**\n" +
      "• ወዲያውኑ ለ907 ደውለው አምቡላንስ መጥራት\n" +
      "• በጀርባ አስተኝቶ ጭንቅላትን እና ትከሻን ከፍ ማድረግ\n" +
      "• ምንም ዓይነት ምግብ፣ ውሃ ወይም መድኃኒት አለመስጠት\n" +
      "• ምልክቶቹ የጀመሩበትን ትክክለኛ ሰዓት ማስታወስ",
    headacheAndFeverRule:
      "[ENGLISH] Headache & Fever:\n" +
      "Experiencing headache and fever typically indicates your immune system is actively fighting an underlying infection.\n\n" +
      "**Potential Causes:**\n" +
      "• Malaria, Typhoid, Common Cold, Influenza, or Sinus infection\n" +
      "• Dehydration or extreme fatigue\n" +
      "• Bacterial or viral infections\n\n" +
      "**Red Flag Warning Signs:**\n" +
      "• Stiff neck, persistent vomiting, confusion, or high fever over 39°C — seek emergency care immediately\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Rest and drink plenty of clean fluids\n" +
      "• Take paracetamol to reduce fever and relieve headache\n" +
      "• Visit a clinic for rapid malaria and blood testing\n\n" +
      "[AMHARIC] ራስ ምታት እና ትኩሳት፡\n" +
      "ራስ ምታት እና ትኩሳት ሰውነት ኢንፌክሽንን እየተከላከለ መሆኑን የሚያሳዩ ምልክቶች ናቸው።\n\n" +
      "**መንስኤዎች፡**\n" +
      "• ወባ፣ ታይፎይድ፣ ጉንፋን ወይም የሳይነስ ኢንፌክሽን\n" +
      "• የሰውነት ድርቀት ወይም ከፍተኛ ውጥረት\n" +
      "• የባክቴሪያ ወይም የቫይረስ ኢንፌክሽን\n\n" +
      "**አስደንጋጭ ምልክቶች፡**\n" +
      "• የአንገት መወጠር፣ ተደጋጋሚ ማስመለስ ወይም ከ39°C በላይ ከፍተኛ ትኩሳት — ወዲያውኑ ወደ ህክምና ይሂዱ\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• በቂ እረፍት ማድረግ እና ንጹህ ፈሳሽ መጠጣት\n" +
      "• የትኩሳት ማስታገሻ (ፓራሲታሞል) መውሰድ\n" +
      "• የደም ምርመራ ለማድረግ ወደ ጤና ተቋም መሄድ",
    covidRule:
      "[ENGLISH] COVID-19:\n" +
      "COVID-19 is a contagious respiratory illness caused by the SARS-CoV-2 coronavirus that can range from mild to severe.\n\n" +
      "**Symptoms:**\n" +
      "• Fever, chills, and persistent fatigue\n" +
      "• Dry cough and shortness of breath\n" +
      "• Loss of taste or smell\n" +
      "• Sore throat, body aches, and nasal congestion\n\n" +
      "**Causes:**\n" +
      "• SARS-CoV-2 transmission through airborne respiratory droplets\n" +
      "• Close contact with an infected person when they talk, cough, or sneeze\n" +
      "• Touching contaminated surfaces and transferring to eyes, nose, or mouth\n\n" +
      "**Home Care & Treatment:**\n" +
      "• Isolate at home, rest, and stay well hydrated\n" +
      "• Take paracetamol to manage fever and aches\n" +
      "• Wear a mask around others to prevent transmission\n" +
      "• Seek emergency care immediately if breathing difficulty develops\n\n" +
      "[AMHARIC] ኮቪድ-19፡\n" +
      "ኮቪድ-19 በሳርስ-ኮቭ-2 (SARS-CoV-2) ኮሮና ቫይረስ የሚመጣ የመተንፈሻ አካላት በሽታ ነው።\n\n" +
      "**ምልክቶች፡**\n" +
      "• ትኩሳት፣ ብርድ ብርድ እና ከፍተኛ ድካም\n" +
      "• ደረቅ ሳል እና የትንፋሽ ማጠር\n" +
      "• የማሽተት ወይም የመቅመስ ስሜት ማጣት\n" +
      "• የጉሮሮ ህመም እና ራስ ምታት\n\n" +
      "**መንስኤዎች፡**\n" +
      "• በሳርስ-ኮቭ-2 ቫይረስ አየር ወለድ ጠብታዎች መተላለፍ\n" +
      "• በበሽታው ከተያዘ ሰው ጋር በቅርበት መገናኘት\n" +
      "• የተበከሉ ቁሳቁሶችን ከነኩ በኋላ አፍ ወይም ዓይንን መንካት\n\n" +
      "**ህክምና እና እንክብካቤ፡**\n" +
      "• ራስን ማግለል፣ በቂ እረፍት ማድረግ እና ፈሳሽ መውሰድ\n" +
      "• ትኩሳትን ለማስታገስ ፓራሲታሞል መውሰድ\n" +
      "• ሌሎች እንዳይያዙ ጭንብል ማድረግ\n" +
      "• የትንፋሽ ማጠር ወይም የደረት ህመም ከመጣ ወዲያውኑ ወደ ህክምና መሄድ",
    founderRule:
      "FOUNDERS & CORE TEAM:\n" +
      "- In English: 'The founders and core team behind Tenaye are Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, and Ayub Ebrahim.'\n" +
      "- In Amharic: 'የጤናዬ መስራቾች እና ዋና የቡድን አባላት ዮናታን ሙሉቀን፣ ናሆም ጥበቡ፣ ዳግማዊ ሽጉጤ እና አዩብ ኢብራሂም ናቸው።'",
    navigationConfirmationRule:
      "NAVIGATION CONFIRMATION: In English, say ONLY 'Opening the [page name] page.' In Amharic, say ONLY 'የ[ገጽ ስም] ገጽ እየከፈትኩ ነው።'",
    topicIsolationRule:
      "STRICT TOPIC ISOLATION: Treat each user question completely independently. When the user asks about the common cold, answer ONLY about the common cold. Never mix or repeat prior disease topics.",
    websiteBenefitsRule:
      "WEBSITE PURPOSE & BENEFITS:\n" +
      "- In English: Tenaye is Ethiopia's digital health companion providing accessible, trusted medical guidance, emergency hotline 907, first aid procedures, daily health tips, and bilingual AI assistance in English and Amharic.\n" +
      "- In Amharic: ጤናዬ (Tenaye) የኢትዮጵያ ዲጂታል የጤና መድረክ ሲሆን የበሽታዎች መረጃ፣ የመጀመሪያ እርዳታ፣ የነጻ አምቡላንስ ጥሪ 907፣ ዕለታዊ ምክሮች እና ባለሁለት ቋንቋ AI ረዳት ይሰጣል።",
    amharicReadingAndAudioRule:
      "AUDIO & HEADERS: Always read and speak all section headers aloud (**Symptoms:** / **Causes:** / **Home Care & Treatment:** or **ምልክቶች፡** / **መንስኤዎች፡** / **ህክምና እና እንክብካቤ፡**). Read every bullet point completely.",
    completeResponseRule:
      "COMPLETE 100% RESPONSES: Always deliver full, finished answers without stopping midway. Complete all three sections (Symptoms, Causes, Home Care & Treatment) completely without cutting off! Never stop after Causes.",
    fullSequentialReadingRule:
      "COMPLETE SEQUENTIAL READING: Provide and speak all symptoms, causes, and care steps in sequential order completely using clear bullet points ('• '). Never skip or omit any bullet.",
    repeatedQuestionRule:
      "REPEATED QUESTIONS: If the user repeats a question, respond IMMEDIATELY with the full answer again.",
    noHollandicOrForeignLanguageRule:
      "STRICT LANGUAGE RESTRICTION: The user ONLY communicates in English or Amharic (አማርኛ). Never produce or apologize for Dutch, French, Hindi, Sinhala, or Japanese.",
    hearingCheckRule:
      "HEARING CHECK (STRICT 1-TO-1 LANGUAGE MATCHING):\n" +
      "- If user asks in English ('Hey, can you hear me?' or 'Can you hear me?' or 'are you hearing me'): You MUST reply in ENGLISH ONLY: 'I can hear you clearly. How can I help you with your health today?' It is strictly forbidden to answer in Amharic!\n" +
      "- If user asks in Amharic ('ትሰማኛለህ?' or 'ትሰሚኛለሽ?'): You MUST reply in AMHARIC ONLY: 'አዎ፣ በደንብ እሰማዎታለሁ! ዛሬ በምን የጤና ጉዳይ ልርዳዎ?' It is strictly forbidden to answer in English!",
    malariaPhoneticRule:
      "MALARIA PHONETIC MISHEARINGS: If the user asks about 'symptoms, causes, and home care of the area', recognize that speech recognition heard 'malaria' as 'the area'. Immediately provide the full symptoms, causes, and care for Malaria!",
    strictScriptRule:
      "SCRIPT ISOLATION: For English input, respond 100% in Latin alphabet. For Amharic input, respond 100% in Ethiopic Fidel (ግዕዝ/አማርኛ) alphabet. Never mix scripts!",
    formattingRule:
      "FORMATTING & BULLETS: 1-2 sentence definition first, then an empty line, then bold topic headers, and clear bullet points (\\n• ) under each header.",
    directAnswerRule:
      "DIRECT COMPREHENSIVE ANSWERS: Answer IMMEDIATELY and COMPLETELY with definition first, followed by clear bullet points directly in your response.",
    medicalAbbreviationRule:
      "MEDICAL ABBREVIATIONS: MVP = Mitral Valve Prolapse (የሚትራል ቫልቭ ችግር). TB = Tuberculosis (የሳንባ ነቀርሳ), BP = Blood Pressure (የደም ግፊት), CPR = Cardiopulmonary Resuscitation.",
    turnFreshnessRule:
      "STRICT TURN FRESHNESS: Never repeat previous answers or previous topics when the user asks a new question.",
    fullCompletionRule:
      "COMPLETE COMPREHENSIVE DELIVERY: Start with a concise 1-2 sentence description, then complete the full Symptoms (3-5 items), full Causes (2-3 items), and full Home Care & Treatment (3-4 items). Always finish all sections 100% completely without stopping early.",
    disclaimerRule:
      "Never attach repetitive boilerplate disclaimers to every message. Keep answers natural, empathetic, and direct.",
    navigationRule:
      "STRICT NAVIGATION RULE: 1. You must ONLY call the navigate tool when the user EXPLICITLY commands to open or go to a page. 2. NEVER call navigate when the user asks medical or disease questions.",
    founders: "Yonatan Muluken, Nahom Tibebu, Dagmawi Shigute, Ayub Ebrahim.",
    emergencyHotline: "907 (Ethiopian Ambulance Dispatch)",
  };
});

// Core real-time text handler for explicit page opening commands only
function handleTextForNavigation(role: "user" | "ai", text: string) {
  if (!text) return;
  const sanitized = devanagariToEnglish(text);
  const lower = sanitized.toLowerCase().trim();
  const now = Date.now();

  if (role === "user") {
    // Only navigate if user explicitly commanded open/go to/view
    const isExplicitCommand =
      lower.startsWith("open ") ||
      lower.startsWith("go to ") ||
      lower.includes(" open ") ||
      lower.includes("page") ||
      lower.includes("ክፈት") ||
      lower.includes("ሂድ");

    if (isExplicitCommand) {
      const target = resolveSpokenPage(lower);
      if (target) {
        pendingUserTarget = target;
        pendingUserTargetTimestamp = now;
        navigateTo(target);
      }
    }
  } else if (role === "ai") {
    // Only navigate if AI explicitly says "opening the [x] page" or "እየከፈትኩ ነው"
    const isExplicitConfirmation =
      lower.includes("opening the") ||
      lower.includes("opened the") ||
      lower.includes("taking you to the") ||
      lower.includes("እየከፈትኩ ነው") ||
      lower.includes("ከፍቼልዎታለሁ");

    if (isExplicitConfirmation) {
      const aiTarget = resolveSpokenPage(lower);
      if (aiTarget) {
        navigateTo(aiTarget);
      } else if (pendingUserTarget && now - pendingUserTargetTimestamp < 10000) {
        navigateTo(pendingUserTarget);
      }
    }
  }
}

// 4. Permanent Singleton Watchers attached directly to the global Voxide client
if (typeof window !== "undefined") {
  // Subscribe to live transcripts
  ai.on("transcript", (payload: { role?: "user" | "ai"; text?: string }) => {
    if (payload?.role && payload?.text) {
      handleTextForNavigation(payload.role, payload.text);
    }
  });

  // Subscribe to finalized messages
  ai.on("message", (payload: { role?: "user" | "ai"; text?: string }) => {
    if (payload?.role && payload?.text) {
      handleTextForNavigation(payload.role, payload.text);
    }
  });

  // Watch snapshot updates for continuous resilience (catches typed text in Text mode!)
  ai.subscribe(() => {
    const snapshot = ai.getSnapshot();
    const msgs = snapshot?.messages;
    if (msgs && msgs.length > 0) {
      const latest = msgs[msgs.length - 1];
      if (latest?.text) {
        handleTextForNavigation(latest.role, latest.text);
      }
    }
  });

  // Synchronize state when voice connection opens
  ai.on("status", (status: string) => {
    if (status === "listening") {
      try {
        const ws = (ai as any)._voiceWs;
        if (ws && ws.readyState === WebSocket.OPEN) {
          const currentState = (ai as any)._getCurrentStateSnapshot();
          ws.send(JSON.stringify({ type: "state", state: currentState }));
        }
      } catch {
        // ignore
      }
    }
  });

  // Unlock Web Audio context on first user interaction to prevent browser audio suspension
  const unlockAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const dummy = new AudioCtx();
        if (dummy.state === "suspended") {
          dummy.resume().finally(() => dummy.close());
        } else {
          dummy.close();
        }
      }
    } catch {
      // ignore
    }
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
  };
  window.addEventListener("click", unlockAudio, { once: true });
  window.addEventListener("touchstart", unlockAudio, { once: true });

  // Pre-warm Voxide client configuration on load
  ai.init().catch((err) => {
    console.warn("[Tenaye Voxide] Pre-warm init:", err);
  });
}

import { AIAssistant } from "./AIAssistant";

/**
 * React Assistant Component
 * Renders Tenaye Assistance custom beautiful UI, permanently mounted at true root.
 */
export function Assistant() {
  return <AIAssistant />;
}

export default Assistant;
