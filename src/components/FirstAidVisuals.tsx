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

export const TOPIC_IMAGES: Record<string, string> = {
  cpr: '/firstaid/cpr_compressions.jpg',
  bleeding: '/firstaid/bleeding.jpg',
  choking: '/firstaid/choking.jpg',
  fracture: '/firstaid/fracture.jpg',
  burns: '/firstaid/burns.jpg',
  sprains: '/firstaid/sprains.jpg',
  'recovery-position': '/firstaid/recovery-position.jpg',
  'heart-attack': '/firstaid/heart-attack.jpg',
  stroke: '/firstaid/stroke.jpg',
  seizures: '/firstaid/seizures.jpg',
  snakebite: '/firstaid/snakebite.jpg',
  asthma: '/firstaid/asthma.jpg',
  anaphylaxis: '/firstaid/anaphylaxis.jpg',
  nosebleed: '/firstaid/nosebleed.svg',
  poisoning: '/firstaid/poisoning.svg',
  'heat-stroke': '/firstaid/heat_stroke.svg',
  hypothermia: '/firstaid/hypothermia.svg',
  shock: '/firstaid/shock.svg',
  'spinal-injury': '/firstaid/spinal_injury.svg',
  drowning: '/firstaid/drowning.svg',
  'chest-wound': '/firstaid/chest_wound.svg',
  evisceration: '/firstaid/evisceration.svg',
  'diabetic-emergency': '/firstaid/diabetic_emergency.svg',
  'eye-splash': '/firstaid/eye_splash.svg',
  'tooth-avulsion': '/firstaid/tooth_avulsion.svg',
  'electrical-shock': '/firstaid/electrical_shock.svg',
};

export interface TopicStageInfo {
  stage1: string;
  stage2: string;
  stage1Title: string;
  stage2Title: string;
  stage1Subtitle: string;
  stage2Subtitle: string;
}

export const TOPIC_STAGE_IMAGES: Record<string, TopicStageInfo> = {
  cpr: {
    stage1: '/firstaid/cpr_compressions.jpg',
    stage2: '/firstaid/rescue_breathing.jpg',
    stage1Title: 'Stage 1: Chest Compressions (100–120 BPM)',
    stage2Title: 'Stage 2: Airway & Rescue Breathing (30:2)',
    stage1Subtitle: 'Locked elbows at 90°, interlocked hands on lower sternum, 5–6 cm depth.',
    stage2Subtitle: 'Head-tilt chin-lift maneuver, seal mouth completely, deliver 2 gentle breaths.',
  },
  bleeding: {
    stage1: '/firstaid/bleeding.jpg',
    stage2: '/firstaid/bleeding_tourniquet.jpg',
    stage1Title: 'Stage 1: Direct Continuous Pressure',
    stage2Title: 'Stage 2: Windlass Tourniquet',
    stage1Subtitle: 'Two-handed continuous direct pressure with sterile pad; elevate limb above heart.',
    stage2Subtitle: 'Windlass tourniquet placed 5–7 cm above wound, tightened until arterial flow stops.',
  },
  choking: {
    stage1: '/firstaid/choking_back_blows.jpg',
    stage2: '/firstaid/choking.jpg',
    stage1Title: 'Stage 1: 5 Sharp Back Blows',
    stage2Title: 'Stage 2: 5 Heimlich Abdominal Thrusts',
    stage1Subtitle: 'Victim bent forward, 5 distinct sharp heel-of-hand blows between shoulder blades.',
    stage2Subtitle: 'Clenched fist positioned just above navel, pulling sharply inward and upward.',
  },
  fracture: {
    stage1: '/firstaid/fracture_sling.jpg',
    stage2: '/firstaid/fracture.jpg',
    stage1Title: 'Stage 1: Limb Support & Triangular Arm Sling',
    stage2Title: 'Stage 2: Rigid Splint Immobilization',
    stage1Subtitle: 'Gentle support of deformed limb in natural position with broad triangular sling.',
    stage2Subtitle: 'Rigid splint immobilizing joints above and below fracture, secured with soft ties.',
  },
  burns: {
    stage1: '/firstaid/burns.jpg',
    stage2: '/firstaid/burns_dressing.jpg',
    stage1Title: 'Stage 1: Cool Running Tap Water (20m)',
    stage2Title: 'Stage 2: Loose Sterile Film Covering',
    stage1Subtitle: 'Irrigate burn under clean, cool running water for 10–20 minutes (never use ice).',
    stage2Subtitle: 'Drape clear cling film loosely over burn without tension; preserve blisters.',
  },
  'recovery-position': {
    stage1: '/firstaid/recovery_prep.jpg',
    stage2: '/firstaid/recovery-position.jpg',
    stage1Title: 'Stage 1: Limb 90° Prep & Hand to Cheek',
    stage2Title: 'Stage 2: Lateral Recumbent Roll',
    stage1Subtitle: 'Near arm at 90°, opposite hand to cheek, far knee bent up forming pivot lever.',
    stage2Subtitle: 'Patient rolled onto side with bent knee stabilization and head tilted back.',
  },
  sprains: {
    stage1: '/firstaid/sprains_ice.jpg',
    stage2: '/firstaid/sprains.jpg',
    stage1Title: 'Stage 1: R.I.C.E. Rest & Ice Pack (20m)',
    stage2Title: 'Stage 2: Figure-8 Crepe Compression Wrap',
    stage1Subtitle: 'Elevate joint above heart on pillows; apply cloth-wrapped cold pack for 20 minutes.',
    stage2Subtitle: 'Figure-8 elastic wrap from distal to proximal; snug support without restricting flow.',
  },
  'heart-attack': {
    stage1: '/firstaid/heart-attack.jpg',
    stage2: '/firstaid/heart_attack_aspirin.jpg',
    stage1Title: 'Stage 1: Semi-Recumbent "W" Position',
    stage2Title: 'Stage 2: 300mg Chewable Aspirin & Call 907',
    stage1Subtitle: 'Patient propped up at 45° with bent knees in "W" position to minimize cardiac burden.',
    stage2Subtitle: 'Loosen tight neck collar; patient chews 300mg adult aspirin to slow clot formation.',
  },
  stroke: {
    stage1: '/firstaid/stroke.jpg',
    stage2: '/firstaid/stroke_dispatch.jpg',
    stage1Title: 'Stage 1: F.A.S.T. Assessment',
    stage2Title: 'Stage 2: Immediate 907 Dispatch',
    stage1Subtitle: 'Evaluate facial droop, unilateral arm downward drift, and speech slurring.',
    stage2Subtitle: 'Call 907 emergency dispatch; record exact onset time; no food, water, or aspirin.',
  },
  seizures: {
    stage1: '/firstaid/seizures.jpg',
    stage2: '/firstaid/seizures_recovery.jpg',
    stage1Title: 'Stage 1: Cushion Head & Clear Hazards',
    stage2Title: 'Stage 2: Post-Ictal Recovery Position',
    stage1Subtitle: 'Cushion head with soft folded cloth; clear away sharp hazards; do not restrain.',
    stage2Subtitle: 'Roll onto side immediately after convulsions stop; tilt head back to drain secretions.',
  },
  snakebite: {
    stage1: '/firstaid/snakebite_immobilize.jpg',
    stage2: '/firstaid/snakebite.jpg',
    stage1Title: 'Stage 1: Calm Rest & Keep Limb Low',
    stage2Title: 'Stage 2: Broad Pressure Bandage & Splint',
    stage1Subtitle: 'Keep victim motionless with bitten limb lower than heart; do not cut or suck venom.',
    stage2Subtitle: 'Apply broad pressure bandage up entire limb; immobilize with splint to halt venom flow.',
  },
  asthma: {
    stage1: '/firstaid/asthma.jpg',
    stage2: '/firstaid/asthma_calm.jpg',
    stage1Title: 'Stage 1: Inhaler & Spacer Chamber Assistance',
    stage2Title: 'Stage 2: Pursed-Lip Breathing & Loosen Collar',
    stage1Subtitle: 'Keep patient seated upright; assist with 4 separate puffs of reliever inhaler via spacer.',
    stage2Subtitle: 'Loosen restrictive neck clothing; guide slow calm breaths through pursed lips.',
  },
  anaphylaxis: {
    stage1: '/firstaid/anaphylaxis.jpg',
    stage2: '/firstaid/anaphylaxis_position.jpg',
    stage1Title: 'Stage 1: 90° Epinephrine Auto-Injector (EpiPen)',
    stage2Title: 'Stage 2: Shock Position & Dispatch 907',
    stage1Subtitle: 'Firmly grasp EpiPen and inject into outer mid-thigh at 90°; hold for 3 full seconds.',
    stage2Subtitle: 'Lay patient flat with legs elevated on cushions; call 907 immediately; monitor airway.',
  },
  nosebleed: {
    stage1: '/firstaid/nosebleed.svg',
    stage2: '/firstaid/nosebleed_ice.svg',
    stage1Title: 'Stage 1: Lean Forward & Pinch Soft Nostrils',
    stage2Title: 'Stage 2: Cold Ice Pack on Nasal Bridge',
    stage1Subtitle: 'Sit upright, lean forward slightly, and pinch the soft lower nose shut for 10–15 minutes.',
    stage2Subtitle: 'Apply cloth-wrapped ice pack to the bridge of the nose to constrict bleeding vessels.',
  },
  poisoning: {
    stage1: '/firstaid/poisoning.svg',
    stage2: '/firstaid/poisoning_recovery.svg',
    stage1Title: 'Stage 1: Secure Container & Call 907 Poison Control',
    stage2Title: 'Stage 2: Lateral Recovery Position',
    stage1Subtitle: 'Keep chemical container for identification; call 907 immediately; do not induce vomiting.',
    stage2Subtitle: 'If unconscious or nauseous, roll onto side to ensure airway drainage and avoid choking.',
  },
  'heat-stroke': {
    stage1: '/firstaid/heat_stroke.svg',
    stage2: '/firstaid/heat_stroke_hydration.svg',
    stage1Title: 'Stage 1: Active Cooling & Cold Packs to Pulse Points',
    stage2Title: 'Stage 2: Continuous Fanning & Sips of Cool Water',
    stage1Subtitle: 'Move to shade, strip excess clothes, place cold wet cloths/ice on neck, armpits, and groin.',
    stage2Subtitle: 'Fan body continuously; if fully alert and conscious, provide small sips of cool water.',
  },
  hypothermia: {
    stage1: '/firstaid/hypothermia.svg',
    stage2: '/firstaid/hypothermia_shelter.svg',
    stage1Title: 'Stage 1: Remove Wet Clothes & Cocoon in Blankets',
    stage2Title: 'Stage 2: Insulate Off Cold Ground & Warm Liquids',
    stage1Subtitle: 'Strip away damp garments; wrap core and head in multiple dry blankets and foil sheets.',
    stage2Subtitle: 'Place insulating sleeping pad beneath body; offer warm sweetened drink if alert.',
  },
  shock: {
    stage1: '/firstaid/shock.svg',
    stage2: '/firstaid/shock_warmth.svg',
    stage1Title: 'Stage 1: Supine Position with Legs Elevated 20–30 cm',
    stage2Title: 'Stage 2: Maintain Body Warmth & Monitor Vitals',
    stage1Subtitle: 'Lay flat on back and prop legs 20–30 cm on pillows to redirect blood to core vital organs.',
    stage2Subtitle: 'Cover with thermal blanket to stop heat loss; loosen tight collar; do NOT give food or drink.',
  },
  'spinal-injury': {
    stage1: '/firstaid/spinal_injury.svg',
    stage2: '/firstaid/spinal_log_roll.svg',
    stage1Title: 'Stage 1: Manual In-Line Cervical Stabilization',
    stage2Title: 'Stage 2: Synchronized Single-Unit Log Roll',
    stage1Subtitle: 'Kneel at head, place hands firmly on both sides of head/neck; keep spine completely motionless.',
    stage2Subtitle: 'If vomiting occurs, roll entire body as one rigid unit with head kept aligned with spine.',
  },
  drowning: {
    stage1: '/firstaid/drowning.svg',
    stage2: '/firstaid/drowning_cpr.svg',
    stage1Title: 'Stage 1: 5 Immediate Initial Rescue Breaths',
    stage2Title: 'Stage 2: 30:2 CPR Compression-Ventilation Cycle',
    stage1Subtitle: 'Open airway with head-tilt chin-lift and deliver 5 rescue breaths first to reverse hypoxia.',
    stage2Subtitle: 'Perform 30 chest compressions at 100–120 BPM followed by 2 breaths on firm dry ground.',
  },
  'chest-wound': {
    stage1: '/firstaid/chest_wound.svg',
    stage2: '/firstaid/chest_wound_flutter.svg',
    stage1Title: 'Stage 1: Immediate Occlusive Plastic Barrier',
    stage2Title: 'Stage 2: 3-Sided Taped Flutter Valve Dressing',
    stage1Subtitle: 'Cover sucking thoracic wound immediately with sterile non-porous plastic or clean foil.',
    stage2Subtitle: 'Tape top and two sides, leaving bottom edge untaped so trapped air escapes during exhalation.',
  },
  evisceration: {
    stage1: '/firstaid/evisceration.svg',
    stage2: '/firstaid/evisceration_dressing.svg',
    stage1Title: 'Stage 1: Supine Posture with Flexed Knees',
    stage2Title: 'Stage 2: Moist Sterile Saline Dressing (Do Not Push In)',
    stage1Subtitle: 'Lay patient flat on back and bend knees upward to relieve abdominal muscle wall tension.',
    stage2Subtitle: 'Drape sterile saline-soaked gauze loosely over protruding organs; NEVER force organs back.',
  },
  'diabetic-emergency': {
    stage1: '/firstaid/diabetic_emergency.svg',
    stage2: '/firstaid/diabetic_recovery.svg',
    stage1Title: 'Stage 1: Administer 15g Fast-Acting Sugar (15-15 Rule)',
    stage2Title: 'Stage 2: 15-Minute Re-Evaluation & Rest',
    stage1Subtitle: 'If patient is conscious and can swallow, give half glass of fruit juice or 3–4 glucose tablets.',
    stage2Subtitle: 'Wait 15 minutes; re-evaluate symptoms; if still confused or hypoglycemic, repeat 15g or call 907.',
  },
  'eye-splash': {
    stage1: '/firstaid/eye_splash.svg',
    stage2: '/firstaid/eye_splash_patch.svg',
    stage1Title: 'Stage 1: Continuous 15-Minute Water Irrigation',
    stage2Title: 'Stage 2: Loose Sterile Eye Pad (Do NOT Rub)',
    stage1Subtitle: 'Tilt head toward injured side; hold lids open and flush gently with clean water inner to outer.',
    stage2Subtitle: 'Place clean sterile gauze loosely over eye without pressure; transport for immediate eye exam.',
  },
  'tooth-avulsion': {
    stage1: '/firstaid/tooth_avulsion.svg',
    stage2: '/firstaid/tooth_avulsion_milk.svg',
    stage1Title: 'Stage 1: Handle Knocked-Out Tooth by Crown Only',
    stage2Title: 'Stage 2: Submerge Tooth in Cold Fresh Milk',
    stage1Subtitle: 'Touch only the white chewing crown; NEVER touch, scrape, or scrub the delicate root cells.',
    stage2Subtitle: 'Place tooth immediately into cup of cold milk or saliva; see dentist within 60 minutes.',
  },
  'electrical-shock': {
    stage1: '/firstaid/electrical_shock.svg',
    stage2: '/firstaid/electrical_assessment.svg',
    stage1Title: 'Stage 1: Isolate Live Current with Dry Wooden Pole',
    stage2Title: 'Stage 2: Assess Breathing & Prepare Immediate CPR',
    stage1Subtitle: 'Do not touch victim directly; push wire away with dry wood or shut off main circuit breaker.',
    stage2Subtitle: 'Once scene is fully de-energized, check airway, breathing, and pulse; start CPR if unresponsive.',
  },
};

/* ══════════════════════════════════════════════════════════════════════
   DETAILED TOPIC VISUAL DIAGRAM (With Multi-Stage Interactive Switcher)
   ══════════════════════════════════════════════════════════════════════ */
export function TopicVisualDiagram({
  id,
  caption,
  initialStage = 1,
}: {
  id: string;
  caption?: string;
  initialStage?: 1 | 2;
  forceView?: 'image' | 'schematic';
}) {
  const stageInfo = TOPIC_STAGE_IMAGES[id];
  const [activeStage, setActiveStage] = React.useState<1 | 2>(initialStage);

  React.useEffect(() => {
    setActiveStage(1);
  }, [id]);

  if (stageInfo) {
    const isStage1 = activeStage === 1;
    const currentImg = isStage1 ? stageInfo.stage1 : stageInfo.stage2;
    const currentTitle = isStage1 ? stageInfo.stage1Title : stageInfo.stage2Title;
    const currentSubtitle = isStage1 ? stageInfo.stage1Subtitle : stageInfo.stage2Subtitle;

    return (
      <div className="flex flex-col items-center w-full">
        {/* Stage Toggle Bar (Solving: "In step-by-step it shows two image avatars, and on full visualization space, it shows one") */}
        <div className="w-full flex items-center gap-1.5 p-1 bg-gray-100/90 rounded-xl mb-3 border border-gray-200/60">
          <button
            type="button"
            onClick={() => setActiveStage(1)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center ${
              activeStage === 1
                ? 'bg-white text-[#119197] shadow-xs border border-teal-100'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Stage 1
          </button>
          <button
            type="button"
            onClick={() => setActiveStage(2)}
            className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer text-center ${
              activeStage === 2
                ? 'bg-white text-[#119197] shadow-xs border border-teal-100'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Stage 2
          </button>
        </div>

        {/* Clean, High-Impact Avatar Clinical Illustration */}
        <div className="relative group w-full flex justify-center py-2.5 px-2 bg-white rounded-2xl border border-gray-100 shadow-2xs">
          <img
            src={currentImg}
            alt={currentTitle}
            className="w-full max-w-[270px] max-h-[220px] object-contain rounded-xl"
            loading="lazy"
          />
        </div>

        {/* Title & Subtitle */}
        <div className="text-center px-1 mt-2.5">
          <p className="text-xs font-bold text-gray-900 leading-snug">
            {currentTitle}
          </p>
          <p className="text-[11px] text-[#0f766e] font-medium leading-relaxed mt-1">
            {caption || currentSubtitle}
          </p>
          <span className="inline-block mt-1 text-[10px] font-semibold text-gray-400">
            Tenaye Clinical Action Guide · Stage {activeStage} of 2
          </span>
        </div>
      </div>
    );
  }

  // Single image fallback if in TOPIC_IMAGES
  const singleImg = TOPIC_IMAGES[id];
  if (singleImg) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center py-2 bg-white rounded-2xl border border-gray-100 shadow-2xs">
          <img
            src={singleImg}
            alt={caption || id}
            className="w-full max-w-[270px] max-h-[220px] object-contain rounded-xl"
            loading="lazy"
          />
        </div>
        <p className="text-xs font-bold text-[#119197] text-center mt-2.5">
          {caption || 'Certified Clinical Protocol'}
        </p>
      </div>
    );
  }

  // Clear, high-impact clinical card for other conditions
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-teal-50/40 rounded-2xl border border-teal-100/80 text-center max-w-[270px] w-full">
      <div className="w-12 h-12 rounded-2xl bg-teal-100/70 text-[#119197] flex items-center justify-center mb-3">
        <TopicIcon id={id} className="w-6 h-6" />
      </div>
      <p className="text-xs font-bold text-gray-800 mb-1">Standard Protocol Reference</p>
      <p className="text-[11px] text-gray-500 leading-relaxed mb-2">
        {caption || 'Follow the step-by-step checklist above for this emergency condition.'}
      </p>
      <span className="text-[10px] font-semibold text-[#119197] bg-white px-2.5 py-1 rounded-full border border-teal-100 shadow-2xs">
        Certified Clinical Protocol
      </span>
    </div>
  );
}
