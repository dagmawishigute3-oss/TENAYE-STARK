import React from 'react';

/* ══════════════════════════════════════════════════════════════════════
   26 TOPIC ICONS (Line Art SVGs)
   ══════════════════════════════════════════════════════════════════════ */
export function TopicIcon({ id, className = 'w-10 h-10' }: { id: string; className?: string }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (id) {
    case 'cpr':
      return (
        <svg {...common}>
          <circle cx="24" cy="10" r="5" />
          <rect x="16" y="20" width="16" height="22" rx="3" />
          <path d="M20 20v-4a4 4 0 0 1 8 0v4" />
          <path d="M21 31h6M24 28v6" />
        </svg>
      );
    case 'bleeding':
      return (
        <svg {...common}>
          <path d="M24 6C18 14 12 20 12 28a12 12 0 0 0 24 0C36 20 30 14 24 6z" />
          <path d="M20 32a4 4 0 0 0 8 0" />
        </svg>
      );
    case 'choking':
      return (
        <svg {...common}>
          <circle cx="24" cy="10" r="6" />
          <path d="M16 22c0-4.4 3.6-8 8-8s8 3.6 8 8v6" />
          <path d="M12 36l4-8h16l4 8" />
          <path d="M18 30c4 4 8 4 12 0" />
        </svg>
      );
    case 'fracture':
      return (
        <svg {...common}>
          <path d="M16 6l2 9-4 3 6 4-3 8 3 12" />
          <path d="M32 6l-2 9 4 3-6 4 3 8-3 12" />
        </svg>
      );
    case 'burns':
      return (
        <svg {...common}>
          <path d="M24 4c0 8-10 12-10 22a10 10 0 0 0 20 0C34 16 24 12 24 4z" />
          <path d="M20 32a4 4 0 0 0 8 0" />
          <path d="M24 28v-6" />
        </svg>
      );
    case 'sprains':
      return (
        <svg {...common}>
          <path d="M10 38l10-16 8 8 10-18" />
          <circle cx="20" cy="26" r="4" />
          <path d="M16 36c2-2 8-2 10 0" />
        </svg>
      );
    case 'recovery-position':
      return (
        <svg {...common}>
          <circle cx="12" cy="18" r="4" />
          <path d="M16 20l10 4 14-2" />
          <path d="M26 24l-4 12 12 4" />
          <path d="M20 22l-6 10" />
          <path d="M8 38h32" strokeDasharray="3 3" />
        </svg>
      );
    case 'heart-attack':
      return (
        <svg {...common}>
          <path d="M24 40S8 30 8 18a9 9 0 0 1 15-6.7A9 9 0 0 1 38 18c0 12-14 22-14 22z" />
          <path d="M22 17l-3 6h6l-3 7" stroke="#dc2626" />
        </svg>
      );
    case 'stroke':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <path d="M18 20h.01M30 20h.01" strokeWidth="4" />
          <path d="M18 30q6 4 12-4" />
          <path d="M24 8v32" strokeDasharray="2 2" />
        </svg>
      );
    case 'seizures':
      return (
        <svg {...common}>
          <circle cx="24" cy="18" r="8" />
          <path d="M6 34l6-4 6 4 6-4 6 4 6-4 6 4" />
          <path d="M14 14l-4-4M34 14l4-4M24 6V2" />
        </svg>
      );
    case 'poisoning':
      return (
        <svg {...common}>
          <rect x="18" y="6" width="12" height="6" rx="1" />
          <path d="M21 12l-7 14a6 6 0 0 0 5 10h10a6 6 0 0 0 5-10l-7-14" />
          <circle cx="24" cy="27" r="2" fill="currentColor" />
          <path d="M20 31h8" />
        </svg>
      );
    case 'heat-stroke':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="6" />
          <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" />
          <rect x="32" y="16" width="6" height="20" rx="3" />
          <circle cx="35" cy="36" r="5" fill="#dc2626" />
          <path d="M35 32V22" stroke="#dc2626" strokeWidth="2.5" />
        </svg>
      );
    case 'hypothermia':
      return (
        <svg {...common}>
          <path d="M24 4v40M4 24h40M10 10l28 28M10 38L38 10" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
          <path d="M20 8l4-4 4 4M40 20l4 4-4 4M28 40l-4 4-4-4M8 28l-4-4 4-4" />
        </svg>
      );
    case 'snakebite':
      return (
        <svg {...common}>
          <path d="M38 12c-4-4-10-2-12 2l-6 12c-2 4-6 6-10 6" />
          <path d="M40 18c0 4-4 8-8 8" />
          <circle cx="36" cy="10" r="1.5" fill="currentColor" />
          <path d="M20 36h.01M26 36h.01" strokeWidth="4" stroke="#dc2626" />
        </svg>
      );
    case 'asthma':
      return (
        <svg {...common}>
          <rect x="18" y="8" width="12" height="18" rx="2" />
          <path d="M18 20h-8v10h8" />
          <path d="M30 14h6" />
          <path d="M8 25c-4 0-6 4-6 7s2 7 6 7h8" strokeDasharray="2 2" />
        </svg>
      );
    case 'nosebleed':
      return (
        <svg {...common}>
          <path d="M18 8c8 0 14 6 14 14v4l6 6-4 4h-8l-2 4" />
          <circle cx="28" cy="18" r="2" fill="currentColor" />
          <path d="M32 34v6" stroke="#dc2626" strokeWidth="3" />
        </svg>
      );
    case 'eye-splash':
      return (
        <svg {...common}>
          <path d="M4 24s8-12 20-12 20 12 20 12-8 12-20 12S4 24 4 24z" />
          <circle cx="24" cy="24" r="6" />
          <path d="M36 6l-6 8M42 12l-6 6" stroke="#0284c7" strokeWidth="2.5" />
        </svg>
      );
    case 'shock':
      return (
        <svg {...common}>
          <path d="M6 34l12-16 10 12 14-20" />
          <path d="M32 10h10v10" />
          <circle cx="12" cy="38" r="4" />
        </svg>
      );
    case 'spinal-injury':
      return (
        <svg {...common}>
          <ellipse cx="24" cy="10" rx="8" ry="5" />
          <rect x="20" y="16" width="8" height="6" rx="2" />
          <rect x="20" y="23" width="8" height="6" rx="2" />
          <rect x="20" y="30" width="8" height="6" rx="2" />
          <rect x="20" y="37" width="8" height="6" rx="2" />
          <path d="M12 16h4M32 16h4M12 30h4M32 30h4" stroke="#dc2626" />
        </svg>
      );
    case 'drowning':
      return (
        <svg {...common}>
          <circle cx="24" cy="16" r="6" />
          <path d="M18 24h12" />
          <path d="M4 32c4-3 8-3 12 0s8 3 12 0 8-3 12 0" />
          <path d="M4 40c4-3 8-3 12 0s8 3 12 0 8-3 12 0" />
        </svg>
      );
    case 'anaphylaxis':
      return (
        <svg {...common}>
          <rect x="14" y="10" width="8" height="24" rx="2" transform="rotate(-30 18 22)" />
          <path d="M26 12l4-4M30 8l6 6M8 32l-4 8 8-4" />
          <circle cx="34" cy="34" r="5" stroke="#dc2626" />
        </svg>
      );
    case 'chest-wound':
      return (
        <svg {...common}>
          <rect x="12" y="12" width="24" height="24" rx="4" />
          <circle cx="24" cy="24" r="4" fill="#dc2626" />
          <path d="M10 12h28M10 12v28M38 12v28" strokeWidth="3" />
          <path d="M14 38h20" strokeDasharray="3 3" />
        </svg>
      );
    case 'evisceration':
      return (
        <svg {...common}>
          <path d="M12 14c0 16 6 24 12 24s12-8 12-24" />
          <ellipse cx="24" cy="26" rx="7" ry="5" fill="#fecaca" stroke="#dc2626" />
          <path d="M16 26h16" strokeDasharray="2 2" stroke="#0284c7" />
        </svg>
      );
    case 'diabetic-emergency':
      return (
        <svg {...common}>
          <rect x="16" y="8" width="16" height="26" rx="4" />
          <rect x="20" y="12" width="8" height="6" rx="1" fill="currentColor" opacity="0.3" />
          <circle cx="24" cy="26" r="3" />
          <path d="M24 34v6M21 40h6" />
        </svg>
      );
    case 'tooth-avulsion':
      return (
        <svg {...common}>
          <path d="M16 10c0-4 16-4 16 0 0 6 2 10 2 16 0 8-4 14-7 14s-3-6-3-6-0 6-3 6-7-6-7-14c0-6 2-10 2-16z" />
          <path d="M20 18q4 2 8 0" stroke="#0284c7" />
        </svg>
      );
    case 'electrical-shock':
      return (
        <svg {...common}>
          <polygon points="26,4 12,24 24,24 22,44 36,22 24,22" fill="#f59e0b" stroke="#b45309" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="18" />
          <path d="M24 14v12M24 32h.01" strokeWidth="3" />
        </svg>
      );
  }
}

/* ══════════════════════════════════════════════════════════════════════
   26 DETAILED TOPIC VISUAL DIAGRAMS (For Tab 4 & Side Panel)
   ══════════════════════════════════════════════════════════════════════ */
export function TopicVisualDiagram({ id, caption }: { id: string; caption?: string }) {
  let diagramContent: React.ReactNode;
  let subtitle = caption || 'Visual Medical Protocol Reference';

  switch (id) {
    case 'cpr':
      diagramContent = (
        <svg viewBox="0 0 140 160" className="w-40 h-44" fill="none">
          <rect x="10" y="148" width="120" height="4" rx="2" fill="#e5e7eb" />
          <rect x="48" y="110" width="16" height="38" rx="6" fill="#fca5a5" />
          <rect x="74" y="110" width="16" height="38" rx="6" fill="#fca5a5" />
          <rect x="36" y="62" width="68" height="48" rx="8" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" className="animate-compress" style={{ transformOrigin: '70px 86px' }} />
          <circle cx="70" cy="50" r="13" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5" />
          <g className="animate-compress-arm" style={{ transformOrigin: '70px 70px' }}>
            <rect x="59" y="62" width="22" height="18" rx="4" fill="#dc2626" opacity="0.9" />
            <path d="M59 72 Q36 65 24 55" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
            <path d="M81 72 Q104 65 116 55" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
          </g>
          {/* AED Indicator */}
          <rect x="98" y="18" width="34" height="26" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="115" y="34" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#854d0e">AED</text>
        </svg>
      );
      subtitle = '30 Compressions (5–6cm) : 2 Breaths @ 100–120 BPM';
      break;

    case 'bleeding':
      diagramContent = (
        <svg viewBox="0 0 140 160" className="w-40 h-44" fill="none">
          <rect x="52" y="24" width="36" height="106" rx="16" fill="#fca5a5" />
          <ellipse cx="70" cy="78" rx="14" ry="7" fill="#dc2626" opacity="0.8" className="animate-breath" />
          <rect x="40" y="65" width="60" height="14" rx="4" fill="white" stroke="#d1d5db" strokeWidth="1.5" />
          <rect x="40" y="81" width="60" height="14" rx="4" fill="white" stroke="#d1d5db" strokeWidth="1.5" />
          <path d="M70 30 L70 56" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M60 48 L70 59 L80 48" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Tourniquet label */}
          <rect x="36" y="32" width="68" height="10" rx="2" fill="#ef4444" opacity="0.8" />
          <text x="70" y="40" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">TOURNIQUET 5-7CM ABOVE</text>
        </svg>
      );
      subtitle = 'Direct Uninterrupted Pressure ≥15 min · Elevate & Pack';
      break;

    case 'choking':
      diagramContent = (
        <svg viewBox="0 0 140 160" className="w-40 h-44" fill="none">
          <circle cx="82" cy="28" r="11" fill="#fca5a5" />
          <rect x="66" y="42" width="32" height="48" rx="8" fill="#fecaca" />
          <rect x="68" y="90" width="12" height="42" rx="4" fill="#fca5a5" />
          <rect x="84" y="90" width="12" height="42" rx="4" fill="#fca5a5" />
          <g className="animate-compress-arm" style={{ transformOrigin: '82px 76px' }}>
            <path d="M24 96 Q52 82 68 76" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
            <circle cx="68" cy="76" r="9" fill="#dc2626" />
          </g>
          <path d="M82 96 L82 66" stroke="#dc2626" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
          <path d="M74 72 L82 63 L90 72" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
      subtitle = '5 Back Blows ↔ 5 Inward & Upward Abdominal Thrusts';
      break;

    case 'fracture':
      diagramContent = (
        <svg viewBox="0 0 140 160" className="w-40 h-44" fill="none">
          <path d="M48 20 Q64 36 64 76 Q64 116 48 136" stroke="#d1d5db" strokeWidth="15" strokeLinecap="round" />
          <path d="M54 70 L66 59 L56 53 L68 42" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="34" y="18" width="9" height="120" rx="3" fill="#92400e" opacity="0.8" />
          <rect x="67" y="18" width="9" height="120" rx="3" fill="#92400e" opacity="0.8" />
          {[32, 54, 76, 98, 120].map((y) => (
            <rect key={y} x="30" y={y} width="50" height="9" rx="2" fill="white" stroke="#9ca3af" strokeWidth="1" />
          ))}
          <text x="105" y="78" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#047857">SPLINT JOINTS</text>
          <text x="105" y="88" textAnchor="middle" fontSize="7" fill="#6b7280">ABOVE & BELOW</text>
        </svg>
      );
      subtitle = 'Rigid Splint Above & Below · Check CSM Before & After';
      break;

    case 'burns':
      diagramContent = (
        <svg viewBox="0 0 140 160" className="w-40 h-44" fill="none">
          <rect x="52" y="16" width="36" height="104" rx="16" fill="#fca5a5" />
          <ellipse cx="70" cy="62" rx="16" ry="20" fill="#fb923c" opacity="0.8" className="animate-breath" />
          <rect x="96" y="14" width="22" height="9" rx="2" fill="#60a5fa" />
          <path d="M107 23 v8" stroke="#3b82f6" strokeWidth="2.5" />
          <path d="M96 32 Q108 55 98 84" stroke="#93c5fd" strokeWidth="5" strokeLinecap="round" opacity="0.7" strokeDasharray="6 4" />
          <text x="70" y="140" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2563eb">COOL WATER 20 MIN</text>
        </svg>
      );
      subtitle = 'Cool Running Water 10–20 min · Cling Film · No Ice';
      break;

    case 'sprains':
      diagramContent = (
        <svg viewBox="0 0 140 160" className="w-40 h-44" fill="none">
          <rect x="52" y="14" width="36" height="82" rx="12" fill="#fca5a5" />
          <ellipse cx="70" cy="106" rx="26" ry="18" fill="#fecaca" stroke="#dc2626" strokeWidth="1.5" />
          <rect x="42" y="90" width="56" height="26" rx="6" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />
          <text x="70" y="108" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">ICE PACK</text>
          <path d="M116 116 L116 70" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <path d="M109 77 L116 68 L123 77" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="116" y="132" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#059669">ELEVATE</text>
        </svg>
      );
      subtitle = 'R.I.C.E: Rest · Ice (20m) · Compression · Elevation';
      break;

    case 'recovery-position':
      diagramContent = (
        <svg viewBox="0 0 160 140" className="w-44 h-36" fill="none">
          <ellipse cx="28" cy="50" rx="12" ry="10" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5" />
          <path d="M40 54 Q75 60 110 52" stroke="#dc2626" strokeWidth="18" strokeLinecap="round" />
          {/* Top hand under cheek */}
          <path d="M42 58 L32 60" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
          {/* Bent top knee 90 degrees */}
          <path d="M96 56 L108 90 L130 94" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          {/* Straight bottom leg */}
          <path d="M110 52 L144 48" stroke="#fca5a5" strokeWidth="10" strokeLinecap="round" />
          {/* Head tilt arrow for airway */}
          <path d="M24 38 Q28 28 36 32" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#arrow)" />
          <text x="80" y="126" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1">HEAD TILTED · KNEE PROP AT 90°</text>
        </svg>
      );
      subtitle = 'Lateral Recumbent: Chin Tilted Up · Top Knee Bent 90°';
      break;

    case 'heart-attack':
      diagramContent = (
        <svg viewBox="0 0 150 150" className="w-40 h-40" fill="none">
          {/* Wall / Backrest */}
          <rect x="20" y="18" width="6" height="110" rx="2" fill="#9ca3af" />
          <rect x="20" y="122" width="110" height="6" rx="2" fill="#9ca3af" />
          {/* Person in W position */}
          <circle cx="50" cy="40" r="11" fill="#fca5a5" />
          {/* Torso reclined 45 deg */}
          <path d="M48 51 L40 92" stroke="#dc2626" strokeWidth="16" strokeLinecap="round" />
          {/* Thighs up */}
          <path d="M40 92 L68 90" stroke="#fca5a5" strokeWidth="14" strokeLinecap="round" />
          {/* Knees bent up */}
          <path d="M68 90 L85 70 L98 116" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          {/* Aspirin badge */}
          <circle cx="112" cy="40" r="14" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="112" y="43" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#b45309">300mg ASP</text>
          <text x="75" y="142" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b91c1c">"W" SEMI-RECUMBENT POSITION</text>
        </svg>
      );
      subtitle = 'Semi-Recumbent "W" Position · Chew 300mg Aspirin';
      break;

    case 'stroke':
      diagramContent = (
        <svg viewBox="0 0 160 150" className="w-44 h-40" fill="none">
          {/* 4 Quadrants for FAST */}
          <rect x="10" y="10" width="66" height="58" rx="8" fill="#fef2f2" stroke="#fca5a5" />
          <rect x="84" y="10" width="66" height="58" rx="8" fill="#fef2f2" stroke="#fca5a5" />
          <rect x="10" y="74" width="66" height="58" rx="8" fill="#fef2f2" stroke="#fca5a5" />
          <rect x="84" y="74" width="66" height="58" rx="8" fill="#fef2f2" stroke="#fca5a5" />
          {/* F */}
          <text x="43" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">F - Face</text>
          <text x="43" y="44" textAnchor="middle" fontSize="7" fill="#4b5563">Drooping Smile</text>
          {/* A */}
          <text x="117" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">A - Arms</text>
          <text x="117" y="44" textAnchor="middle" fontSize="7" fill="#4b5563">One Arm Drifts</text>
          {/* S */}
          <text x="43" y="94" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">S - Speech</text>
          <text x="43" y="108" textAnchor="middle" fontSize="7" fill="#4b5563">Slurred / Muddled</text>
          {/* T */}
          <text x="117" y="94" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">T - Time</text>
          <text x="117" y="108" textAnchor="middle" fontSize="7" fill="#4b5563">Call 907 Instantly</text>
          <text x="80" y="145" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b91c1c">F.A.S.T. ASSESSMENT CRITERIA</text>
        </svg>
      );
      subtitle = 'F.A.S.T: Face Droop · Arm Drift · Slurred Speech · Time (907)';
      break;

    case 'seizures':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          <ellipse cx="36" cy="74" rx="18" ry="10" fill="#fed7aa" stroke="#f97316" strokeWidth="1.5" />
          <path d="M48 64 Q90 62 126 70" stroke="#fca5a5" strokeWidth="14" strokeLinecap="round" />
          <circle cx="36" cy="54" r="10" fill="#fca5a5" />
          {/* Soft cushion under head */}
          <rect x="22" y="68" width="28" height="12" rx="4" fill="#93c5fd" />
          <text x="36" y="77" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#1e40af">PILLOW</text>
          {/* Clear hazard zone circle */}
          <circle cx="75" cy="70" r="54" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="75" y="132" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#dc2626">CLEAR 2m AREA · DO NOT RESTRAIN</text>
        </svg>
      );
      subtitle = 'Cushion Head · Clear Hard Objects · Time Duration · No Restraint';
      break;

    case 'poisoning':
      diagramContent = (
        <svg viewBox="0 0 140 140" className="w-36 h-36" fill="none">
          <rect x="42" y="24" width="56" height="74" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
          <path d="M56 16h28v8H56z" fill="#dc2626" />
          {/* Skull icon */}
          <circle cx="70" cy="50" r="12" fill="#ef4444" />
          <circle cx="66" cy="48" r="2.5" fill="white" />
          <circle cx="74" cy="48" r="2.5" fill="white" />
          <path d="M66 57h8" stroke="white" strokeWidth="2" />
          {/* 907 call badge */}
          <rect x="25" y="104" width="90" height="20" rx="6" fill="#dc2626" />
          <text x="70" y="118" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">CALL 907 IMMEDIATELY</text>
        </svg>
      );
      subtitle = 'Save Substance Container · Call 907 · Do NOT Induce Vomiting';
      break;

    case 'heat-stroke':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          {/* Ice tub / Cold immersion */}
          <rect x="20" y="60" width="110" height="48" rx="14" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <path d="M24 72c10-2 20 2 30 0s20-2 30 0 20 2 30 0" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="45" cy="50" r="11" fill="#fca5a5" />
          <path d="M54 58 Q85 64 115 62" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
          {/* Ice packs at neck & armpits */}
          <circle cx="58" cy="62" r="5" fill="#38bdf8" />
          <circle cx="78" cy="66" r="5" fill="#38bdf8" />
          <text x="75" y="130" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1d4ed8">COLD WATER IMMERSION / ICE WRAP</text>
        </svg>
      );
      subtitle = 'Rapid Active Cooling to <39°C · Cold Water / Ice to Armpits & Groin';
      break;

    case 'hypothermia':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          {/* Blanket cocoon */}
          <ellipse cx="75" cy="70" rx="55" ry="30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <ellipse cx="75" cy="70" rx="46" ry="24" fill="#fed7aa" />
          <circle cx="45" cy="66" r="11" fill="#fca5a5" />
          {/* Heat pack at chest */}
          <rect x="68" y="58" width="24" height="16" rx="4" fill="#ef4444" />
          <text x="80" y="69" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">HEAT</text>
          <text x="75" y="128" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b45309">DRY CLOTHING · TRIPLE LAYER WRAP</text>
        </svg>
      );
      subtitle = 'Warm Torso First · Remove Wet Clothes · Gentle Handling';
      break;

    case 'snakebite':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          {/* Lower leg */}
          <rect x="25" y="55" width="100" height="24" rx="8" fill="#fca5a5" />
          {/* Fang puncture marks */}
          <circle cx="45" cy="63" r="2.5" fill="#dc2626" />
          <circle cx="45" cy="71" r="2.5" fill="#dc2626" />
          {/* Broad elastic bandage overlap */}
          {[55, 70, 85, 100].map((x) => (
            <rect key={x} x={x} y="51" width="12" height="32" rx="2" fill="white" stroke="#9ca3af" strokeWidth="1.5" />
          ))}
          {/* Heart level marker */}
          <path d="M25 96h100" stroke="#dc2626" strokeDasharray="3 3" />
          <text x="75" y="112" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b91c1c">IMMOBILIZE BELOW HEART LEVEL</text>
        </svg>
      );
      subtitle = 'Broad Pressure Bandage · Immobilize Limb · Keep Still Below Heart';
      break;

    case 'asthma':
      diagramContent = (
        <svg viewBox="0 0 140 150" className="w-36 h-40" fill="none">
          {/* Upright sitting person leaning forward */}
          <circle cx="60" cy="35" r="12" fill="#fca5a5" />
          <path d="M58 48 L68 95 L95 125" stroke="#fca5a5" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
          {/* Inhaler & Spacer */}
          <rect x="85" y="40" width="30" height="12" rx="3" fill="#60a5fa" />
          <rect x="110" y="32" width="10" height="24" rx="2" fill="#2563eb" />
          <text x="70" y="142" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">4 PUFFS ↔ 4 MIN (4×4 RULE)</text>
        </svg>
      );
      subtitle = 'Upright Tripod Stance · Spacer with 4 Puffs · Repeat in 4 Min';
      break;

    case 'nosebleed':
      diagramContent = (
        <svg viewBox="0 0 140 140" className="w-36 h-36" fill="none">
          <circle cx="65" cy="45" r="22" fill="#fca5a5" />
          {/* Forward tilt angle line */}
          <path d="M40 75 Q65 60 90 75" stroke="#d1d5db" strokeWidth="3" />
          {/* Nose pinch clip */}
          <ellipse cx="84" cy="48" rx="8" ry="6" fill="#dc2626" />
          <path d="M84 42v12" stroke="white" strokeWidth="2" />
          <path d="M84 54 Q86 64 84 72" stroke="#dc2626" strokeWidth="2.5" />
          <text x="70" y="125" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b91c1c">TILT FORWARD · PINCH 10-15 MIN</text>
        </svg>
      );
      subtitle = 'Lean Head FORWARD · Firmly Pinch Soft Nostrils 10–15 Min';
      break;

    case 'eye-splash':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          {/* Head tilted sideways */}
          <circle cx="75" cy="50" r="26" fill="#fca5a5" />
          <ellipse cx="88" cy="50" rx="9" ry="6" fill="white" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="88" cy="50" r="3.5" fill="#0284c7" />
          {/* Irrigation stream pouring inner to outer */}
          <path d="M65 14 Q78 30 84 46" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
          <path d="M88 56 Q94 72 104 90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          <text x="75" y="128" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1">FLUSH INNER TO OUTER CANTHUS 20m</text>
        </svg>
      );
      subtitle = 'Tilt Affected Eye Downward · Flush Inner to Outer for 15–20 Min';
      break;

    case 'shock':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          {/* Person supine */}
          <circle cx="35" cy="75" r="10" fill="#fca5a5" />
          <path d="M42 80 L75 80" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" />
          {/* Legs elevated on wedge 30cm */}
          <polygon points="75,85 125,85 125,55" fill="#cbd5e1" />
          <path d="M75 80 L120 58" stroke="#dc2626" strokeWidth="12" strokeLinecap="round" />
          <text x="75" y="124" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#dc2626">ELEVATE FEET 30CM (12 INCHES)</text>
        </svg>
      );
      subtitle = 'Supine with Legs Raised 30cm · Insulate with Blanket · No Fluids';
      break;

    case 'spinal-injury':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          {/* Neutral alignment */}
          <circle cx="40" cy="70" r="12" fill="#fca5a5" />
          <path d="M52 70 L125 70" stroke="#dc2626" strokeWidth="14" strokeLinecap="round" />
          {/* Two rescuer hands stabilizing head */}
          <path d="M30 52 Q40 46 50 52" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
          <path d="M30 88 Q40 94 50 88" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
          <text x="75" y="125" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#047857">MANUAL IN-LINE STABILIZATION</text>
        </svg>
      );
      subtitle = 'Hold Head & Neck Rigid In-Line · Zero Movement · Jaw-Thrust Only';
      break;

    case 'drowning':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          <circle cx="45" cy="50" r="12" fill="#fca5a5" />
          <path d="M55 60 L110 65" stroke="#fca5a5" strokeWidth="14" strokeLinecap="round" />
          {/* 5 Rescue breaths indicator */}
          <rect x="25" y="85" width="100" height="24" rx="6" fill="#0284c7" />
          <text x="75" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">5 INITIAL RESCUE BREATHS</text>
          <text x="75" y="130" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1">FOLLOWED BY 30:2 CPR CYCLES</text>
        </svg>
      );
      subtitle = 'Begin with 5 Initial Rescue Breaths · Then Standard 30:2 CPR';
      break;

    case 'anaphylaxis':
      diagramContent = (
        <svg viewBox="0 0 140 150" className="w-36 h-40" fill="none">
          {/* Outer Thigh */}
          <rect x="35" y="25" width="35" height="95" rx="14" fill="#fca5a5" />
          {/* Auto-Injector at 90 degrees */}
          <rect x="75" y="55" width="46" height="14" rx="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
          <polygon points="75,57 65,62 75,67" fill="#dc2626" />
          <path d="M121 58v8" stroke="#b45309" strokeWidth="3" />
          <text x="70" y="135" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b45309">90° OUTER THIGH · HOLD 3–10 SEC</text>
        </svg>
      );
      subtitle = 'EpiPen 90° into Anterolateral Thigh · Hold Firmly 3–10 Seconds';
      break;

    case 'chest-wound':
      diagramContent = (
        <svg viewBox="0 0 140 140" className="w-36 h-36" fill="none">
          <rect x="25" y="25" width="90" height="90" rx="10" fill="#fef2f2" stroke="#fca5a5" />
          <circle cx="70" cy="70" r="10" fill="#dc2626" />
          {/* 3 Taped Sides */}
          <rect x="35" y="32" width="70" height="8" rx="2" fill="#0284c7" />
          <rect x="32" y="35" width="8" height="70" rx="2" fill="#0284c7" />
          <rect x="100" y="35" width="8" height="70" rx="2" fill="#0284c7" />
          {/* Bottom Open Flutter Valve */}
          <path d="M40 108h60" stroke="#10b981" strokeWidth="3" strokeDasharray="4 3" />
          <text x="70" y="128" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#047857">BOTTOM EDGE UNTAPED (FLUTTER VALVE)</text>
        </svg>
      );
      subtitle = '3-Sided Occlusive Dressing: Bottom Open for Air to Escape';
      break;

    case 'evisceration':
      diagramContent = (
        <svg viewBox="0 0 150 140" className="w-40 h-36" fill="none">
          <circle cx="40" cy="50" r="11" fill="#fca5a5" />
          {/* Knees drawn up (flexed) */}
          <path d="M48 60 L78 68 L92 48 L114 85" stroke="#fca5a5" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          {/* Moist saline dressing over abdomen */}
          <ellipse cx="74" cy="68" rx="14" ry="8" fill="#93c5fd" opacity="0.8" stroke="#2563eb" strokeWidth="1.5" />
          <text x="75" y="125" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">MOIST SALINE DRESSING · KNEES FLEXED</text>
        </svg>
      );
      subtitle = 'Do NOT Push Organs Back · Sterile Moist Dressing · Flex Knees';
      break;

    case 'diabetic-emergency':
      diagramContent = (
        <svg viewBox="0 0 140 140" className="w-36 h-36" fill="none">
          <rect x="30" y="25" width="80" height="90" rx="12" fill="#fef9c3" stroke="#eab308" strokeWidth="2" />
          <text x="70" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#a16207">15g</text>
          <text x="70" y="72" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#854d0e">FAST SUGAR</text>
          <path d="M45 88h50" stroke="#ca8a04" strokeWidth="2" />
          <text x="70" y="102" textAnchor="middle" fontSize="8" fill="#713f12">WAIT 15 MINUTES</text>
        </svg>
      );
      subtitle = 'Rule of 15: Give 15–20g Fast Sugar · Recheck in 15 Minutes';
      break;

    case 'tooth-avulsion':
      diagramContent = (
        <svg viewBox="0 0 140 140" className="w-36 h-36" fill="none">
          {/* Glass of milk */}
          <path d="M45 45 L50 110 L90 110 L95 45 Z" fill="#eff6ff" stroke="#60a5fa" strokeWidth="2" />
          <text x="70" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#2563eb">COLD MILK</text>
          {/* Tooth floating inside, held by crown */}
          <path d="M64 82c0-3 12-3 12 0 0 4 2 8 2 12-2 4-5 8-8 8s-6-4-8-8c0-4 2-8 2-12z" fill="white" stroke="#3b82f6" strokeWidth="1" />
          <text x="70" y="130" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">HANDLE CROWN ONLY · SUBMERGE</text>
        </svg>
      );
      subtitle = 'Hold Crown Only (Never Root) · Submerge in Milk · Replant ≤60m';
      break;

    case 'electrical-shock':
      diagramContent = (
        <svg viewBox="0 0 140 140" className="w-36 h-36" fill="none">
          {/* Breaker switch OFF */}
          <rect x="30" y="25" width="80" height="45" rx="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" />
          <rect x="52" y="35" width="36" height="25" rx="3" fill="#dc2626" />
          <text x="70" y="51" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">POWER OFF</text>
          {/* Wooden broom isolation stick */}
          <path d="M25 110 L115 85" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
          <text x="70" y="128" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b45309">NON-CONDUCTIVE WOODEN STICK</text>
        </svg>
      );
      subtitle = 'Cut Power at Breaker First · Push with Dry Wood · Never Touch Victim';
      break;

    default:
      diagramContent = (
        <svg viewBox="0 0 140 140" className="w-36 h-36" fill="none">
          <circle cx="70" cy="70" r="50" stroke="#119197" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M70 45v30M70 90h.01" stroke="#119197" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
      break;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {diagramContent}
      <div className="text-center px-2">
        <p className="text-[11px] font-bold text-[#119197] tracking-wide leading-tight">{subtitle}</p>
        <p className="text-[10px] text-gray-400 mt-1">Standard Emergency Guideline Protocol</p>
      </div>
    </div>
  );
}
