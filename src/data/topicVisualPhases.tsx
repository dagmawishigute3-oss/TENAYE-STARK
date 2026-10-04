export interface VisualPhase {
  phaseNumber: number
  title: string
  amharicTitle: string
  bullets: string[]
  imageSrc: string
  caption: string
}

export const TOPIC_VISUAL_PHASES: Record<string, VisualPhase[]> = {
  // ── 1. CPR & AED (2 Clinical Avatar Stages in Tenaye Teal) ──
  cpr: [
    {
      phaseNumber: 1,
      title: "Effective Chest Compressions (100–120 BPM)",
      amharicTitle: "ጥሩ ደረት አጨማመቅ የሚባለው",
      bullets: [
        "Position the heel of one hand on the center of the chest (lower half of breastbone).",
        "Keep arms and shoulders straight; move from the waist only with elbows locked at 90°.",
        "Push down forcefully 5 to 6 cm into the chest at a tempo of 100 to 120 per minute.",
        "Allow 100% full chest recoil between compressions — do not lean on the chest.",
      ],
      imageSrc: "/firstaid/cpr_compressions.jpg",
      caption:
        "Locked elbows at 90°, interlocked hands on lower sternum, 5–6 cm depth.",
    },
    {
      phaseNumber: 2,
      title: "Airway Opening & Rescue Breathing (30:2)",
      amharicTitle: "የአየር ቱቦ መክፈትና ትንፋሽ አሰጣጥ",
      bullets: [
        "Open the airway by placing one hand on forehead and fingers under chin (head-tilt, chin-lift).",
        "Pinch victim's soft nostrils firmly shut with thumb and index finger.",
        "Take a normal breath and seal your lips tightly over victim's mouth to prevent air leak.",
        "Deliver 2 gentle rescue breaths (1 second each) and confirm chest rises visibly.",
      ],
      imageSrc: "/firstaid/rescue_breathing.jpg",
      caption:
        "Head-tilt chin-lift maneuver, seal mouth completely, deliver 2 gentle breaths.",
    },
  ],

  // ── 2. SEVERE BLEEDING (2 Clinical Avatar Stages) ──
  bleeding: [
    {
      phaseNumber: 1,
      title: "Firm Direct Uninterrupted Pressure & Elevation",
      amharicTitle: "ቀጥተኛና ጽኑ ጫና ማሳደር",
      bullets: [
        "Place sterile gauze pad or clean cloth directly onto the bleeding wound.",
        "Press hard with both hands and locked elbows directly over the bleeding site.",
        "Maintain continuous uninterrupted pressure for at least 15 minutes by the clock.",
        "Do NOT peek or lift the dressing — if blood soaks through, add more layers on top.",
        "Elevate the injured limb above heart level while maintaining firm direct pressure.",
      ],
      imageSrc: "/firstaid/bleeding.jpg",
      caption:
        "Two-handed continuous direct pressure with sterile pad; elevate limb above heart.",
    },
    {
      phaseNumber: 2,
      title: "Windlass Tourniquet Application (Extremity Bleeding)",
      amharicTitle: "የደም መቆጣጠሪያ ቶርኒኬት (Tourniquet) ማሰር",
      bullets: [
        "Apply commercial windlass tourniquet 5–7 cm (2–3 inches) proximal to wound (never over a joint).",
        "Pull strap completely tight to eliminate all slack before turning the windlass rod.",
        "Twist windlass rod until bright pulsatile bleeding stops completely and distal pulses vanish.",
        "Lock windlass rod firmly into the clip and record exact application time on forehead or strap.",
      ],
      imageSrc: "/firstaid/bleeding_tourniquet.jpg",
      caption:
        "Windlass tourniquet placed 5–7 cm above wound, tightened until arterial flow stops completely.",
    },
  ],

  // ── 3. CHOKING (2 Clinical Avatar Stages) ──
  choking: [
    {
      phaseNumber: 1,
      title: "5 Sharp Back Blows (Interscapular)",
      amharicTitle: "5 ጠንካራ የጀርባ ምቶች (Back Blows)",
      bullets: [
        "Lean victim forward so gravity helps dislodge the foreign airway obstruction.",
        "Support victim's chest firmly with one hand while they are bent over at waist.",
        "Deliver 5 sharp, forceful blows between the shoulder blades with heel of other hand.",
        "Check victim's mouth after each blow to verify if foreign object has been expelled.",
      ],
      imageSrc: "/firstaid/choking_back_blows.jpg",
      caption:
        "Victim bent forward, delivering 5 distinct sharp heel-of-hand blows between shoulder blades.",
    },
    {
      phaseNumber: 2,
      title: "5 Abdominal Thrusts (Heimlich Maneuver)",
      amharicTitle: "የሆድ ውስጥና ወደ ላይ ግፊቶች (Heimlich)",
      bullets: [
        "Stand behind victim; wrap both arms around their waist at level of navel.",
        "Make a clenched fist with thumb placed flat against abdomen just above navel.",
        "Grasp your fist with your other hand; press hard into abdomen with quick upward thrust.",
        "Alternate 5 back blows and 5 abdominal thrusts until object clears or victim loses consciousness.",
      ],
      imageSrc: "/firstaid/choking.jpg",
      caption:
        "Clenched fist positioned just above navel, pulling sharply inward and upward.",
    },
  ],

  // ── 4. BONE FRACTURES (2 Clinical Avatar Stages) ──
  fracture: [
    {
      phaseNumber: 1,
      title: "Limb Support & Triangular Arm Sling",
      amharicTitle: "የስብራት አካልን መደገፍና በወንጭፍ ማሰር",
      bullets: [
        "Support fractured limb in the exact position found without attempting to straighten.",
        "Do NOT manipulate, pull, or force broken bone ends back under skin.",
        "Immobilize forearm in a broad triangular sling tied securely behind neck.",
        "Keep victim still and calm while preparing rigid splinting materials.",
      ],
      imageSrc: "/firstaid/fracture_sling.jpg",
      caption:
        "Gentle support of deformed limb in natural position with broad triangular arm sling.",
    },
    {
      phaseNumber: 2,
      title: "Rigid Splint Application & Immobilization",
      amharicTitle: "ስፕሊንት ማዘጋጀትና ማሰር",
      bullets: [
        "Position rigid splints on both sides of limb (wood boards, cardboard, rolled magazines).",
        "Splint must extend past one joint ABOVE and one joint BELOW the fracture site.",
        "Secure firmly with soft cloth ties above and below break; pad hollow contours.",
        "Check distal fingers or toes for pulse, warmth, and capillary refill before and after tying.",
      ],
      imageSrc: "/firstaid/fracture.jpg",
      caption:
        "Rigid splint immobilizing joints above and below fracture, secured with soft ties.",
    },
  ],

  // ── 5. BURNS (2 Clinical Avatar Stages) ──
  burns: [
    {
      phaseNumber: 1,
      title: "Continuous Cool Tap Water Irrigation (10–20 Min)",
      amharicTitle: "በቀዝቃዛ ውኃ ለ10-20 ደቂቃ ማቀዝቀዝ",
      bullets: [
        "Immediately flood burned skin under clean, cool running tap water (15–25°C).",
        "Continue gentle cooling for 10 to 20 continuous minutes by the clock.",
        "NEVER apply ice, ice water, butter, cooking oil, toothpaste, or traditional powders.",
        "Carefully remove rings, watches, and non-adherent clothing before edema develops.",
      ],
      imageSrc: "/firstaid/burns.jpg",
      caption:
        "Irrigate burn under clean, cool running water for 10–20 minutes (never use ice).",
    },
    {
      phaseNumber: 2,
      title: "Loose Sterile Non-Adherent Covering (Cling Film)",
      amharicTitle: "ንጹህ የፕላስቲክ ሽፋን በላላ መልኩ ማልበስ",
      bullets: [
        "Drape sterile non-adherent dressing or clean plastic food wrap loosely over burned area.",
        "Do NOT wrap tightly; burns swell rapidly and require loose protection.",
        "Never pop or debride intact blisters (they form a sterile barrier against infection).",
        "Keep victim warm with a dry blanket over uninjured parts to prevent hypothermia.",
      ],
      imageSrc: "/firstaid/burns_dressing.jpg",
      caption:
        "Drape clear cling film loosely over burn without tension; preserve blisters.",
    },
  ],

  // ── 6. RECOVERY POSITION (2 Clinical Avatar Stages) ──
  "recovery-position": [
    {
      phaseNumber: 1,
      title: "Airway Verification & Limb Preparation",
      amharicTitle: "የአየር ቱቦ ማረጋገጫና የእጅ-እግር አቀማመጥ",
      bullets: [
        "Confirm victim is unresponsive but breathing normally for at least 10 seconds.",
        "Place near arm out at a right angle (90°) to victim's body, palm facing upward.",
        "Bring far arm across chest, pressing back of their hand firmly against near cheek.",
        "Bend far leg up at knee with foot remaining flat on the floor.",
      ],
      imageSrc: "/firstaid/recovery_prep.jpg",
      caption:
        "Near arm at 90°, opposite hand to cheek, far knee bent up forming pivot lever.",
    },
    {
      phaseNumber: 2,
      title: "Lateral Recumbent Roll & Airway Drainage",
      amharicTitle: "በጎን የማስተኛት ዘዴ (Recovery Position)",
      bullets: [
        "Pull on bent knee and far shoulder to gently roll victim onto their side toward you.",
        "Adjust top leg so knee forms a stable 90° angle resting securely on the ground.",
        "Gently tilt head back and angle face downward so saliva or vomit drains freely.",
        "Re-check normal breathing continuously every 2 minutes while awaiting ambulance.",
      ],
      imageSrc: "/firstaid/recovery-position.jpg",
      caption:
        "Patient rolled onto side with bent knee stabilization and head tilted back for airway drainage.",
    },
  ],

  // ── 7. SPRAINS & STRAINS (2 Clinical Avatar Stages) ──
  sprains: [
    {
      phaseNumber: 1,
      title: "R.I.C.E. Stage 1: Rest & Ice Application",
      amharicTitle: "ማረፍ እና በበረዶ ማቀዝቀዝ",
      bullets: [
        "Rest: Stop all weight-bearing activity immediately on the affected joint.",
        "Ice: Wrap cold pack in a thin towel and apply for 15–20 minutes every 2 hours.",
        "Elevation: Prop injured joint up on pillows above heart level to limit swelling.",
        "Never apply bare ice directly onto skin; avoid heat packs during acute 48 hours.",
      ],
      imageSrc: "/firstaid/sprains_ice.jpg",
      caption:
        "Elevate joint above heart on pillows; apply cloth-wrapped cold pack for 20 minutes.",
    },
    {
      phaseNumber: 2,
      title: "R.I.C.E. Stage 2: Compression Bandage Wrap",
      amharicTitle: "በላስቲክ ፋሻ ማሰር (Compression)",
      bullets: [
        "Apply elastic crepe bandage starting from toes or fingers inward toward the heart.",
        "Use an overlapping figure-8 technique around ankle joint to provide firm support.",
        "Ensure wrap is snug enough to limit edema without cutting off capillary circulation.",
        "Verify toes remain warm and pink; loosen wrap immediately if tingling occurs.",
      ],
      imageSrc: "/firstaid/sprains.jpg",
      caption:
        "Figure-8 elastic wrap from distal to proximal; snug support without restricting blood flow.",
    },
  ],

  // ── 8. HEART ATTACK (2 Clinical Avatar Stages) ──
  "heart-attack": [
    {
      phaseNumber: 1,
      title: 'Semi-Recumbent "W" Position (45° Recline)',
      amharicTitle: "የልብ ድካም አቀማመጥ (W-Position)",
      bullets: [
        "Assist patient to sit on floor supported by wall or pillows in 45° semi-recumbent posture.",
        'Bend patient\'s knees upward with cushion underneath, forming the "W" position.',
        "This posture reduces venous return workload and eases respiratory chest expansion.",
        "Call 907 immediately; keep patient completely quiet and reassure them.",
      ],
      imageSrc: "/firstaid/heart-attack.jpg",
      caption:
        'Patient propped up at 45° with bent knees in "W" position to minimize cardiac burden.',
    },
    {
      phaseNumber: 2,
      title: "300mg Chewable Aspirin & Clothing Loosening",
      amharicTitle: "አስፕሪን ማኘክና ልብሶችን ማላላት",
      bullets: [
        "Loosen tight collar, tie, buttons, and belt around patient's neck and waist.",
        "If patient is not allergic, give a single 300mg adult aspirin to chew slowly.",
        "Chewing speeds gastric absorption into bloodstream to inhibit platelet aggregation.",
        "Do NOT give water gulps or food; keep AED nearby in case patient collapses.",
      ],
      imageSrc: "/firstaid/heart_attack_aspirin.jpg",
      caption:
        "Loosen tight neck collar; patient chews 300mg adult aspirin to slow clot formation.",
    },
  ],

  // ── 9. STROKE (2 Clinical Avatar Stages) ──
  stroke: [
    {
      phaseNumber: 1,
      title: "F.A.S.T. Assessment (Face, Arms, Speech)",
      amharicTitle: "የስትሮክ (FAST) ምርመራ",
      bullets: [
        "Face: Ask person to smile. Check if one side of face or mouth droops.",
        "Arms: Ask person to raise both arms straight forward. Check for downward drift on one side.",
        "Speech: Ask person to repeat a simple phrase. Listen for slurred or jumbled speech.",
        "Time: If any one test fails, call 907 emergency medical dispatch immediately.",
      ],
      imageSrc: "/firstaid/stroke.jpg",
      caption:
        "Evaluate facial droop, unilateral arm downward drift, and speech slurring.",
    },
    {
      phaseNumber: 2,
      title: "Immediate 907 Dispatch & Timing Onset",
      amharicTitle: "ወዲያውኑ ወደ 907 መደወልና ሰዓት መመዝገብ",
      bullets: [
        "Call 907 immediately; emphasize suspected acute stroke to dispatch team.",
        "Record exact minute symptoms started (critical window for clot-dissolving tPA therapy).",
        "Rest patient with head and shoulders slightly elevated on pillows (15–30°).",
        "Never give food, water, or aspirin (may cause aspiration or worsen hemorrhagic stroke).",
      ],
      imageSrc: "/firstaid/stroke_dispatch.jpg",
      caption:
        "Call 907 emergency dispatch; record exact onset time; do not give food, water or aspirin.",
    },
  ],

  // ── 10. SEIZURES (2 Clinical Avatar Stages) ──
  seizures: [
    {
      phaseNumber: 1,
      title: "Cushion Head & Clear Surrounding Hazards",
      amharicTitle: "ጭንቅላትን መጠበቅና አደጋዎችን ማራቅ",
      bullets: [
        "Place a soft folded jacket, towel, or pillow gently under the victim's head.",
        "Push away hard furniture, sharp objects, and electrical cords to prevent injury.",
        "Do NOT hold down, physically restrain, or force victim's limbs to stop shaking.",
        "NEVER insert fingers, spoons, or any objects between convulsing teeth.",
      ],
      imageSrc: "/firstaid/seizures.jpg",
      caption:
        "Cushion head with soft folded cloth; clear away sharp hazards; do not physically restrain.",
    },
    {
      phaseNumber: 2,
      title: "Post-Seizure Recovery Position (Airway Drainage)",
      amharicTitle: "ከመንቀጥቀጥ በኋላ በጎን የማስተኛት ዘዴ",
      bullets: [
        "As soon as active convulsions cease, roll victim onto their side into recovery position.",
        "Tilt head gently backward to keep airway open and allow saliva or vomit to drain out.",
        "Time the seizure duration; if convulsion lasts >5 minutes, call 907 immediately.",
        "Stay with victim and offer gentle reassurance as they gradually regain consciousness.",
      ],
      imageSrc: "/firstaid/seizures_recovery.jpg",
      caption:
        "Roll onto side immediately after convulsions stop; tilt head back to drain secretions.",
    },
  ],

  // ── 11. SNAKEBITE (2 Clinical Avatar Stages) ──
  snakebite: [
    {
      phaseNumber: 1,
      title: "Calm Rest & Keep Limb Below Heart Level",
      amharicTitle: "እርጋታና የተነደፈውን አካል ከልብ ዝቅ አድርጎ ማረፍ",
      bullets: [
        "Keep victim completely calm, still, and lying down (movement accelerates venom spread).",
        "Keep bitten extremity positioned lower than the level of the heart.",
        "Quickly remove rings, bracelets, and restrictive footwear before swelling starts.",
        "Do NOT cut fang punctures, suck venom with mouth, or apply ice or tourniquets.",
      ],
      imageSrc: "/firstaid/snakebite_immobilize.jpg",
      caption:
        "Keep victim motionless with bitten limb lower than heart; do not cut or suck venom.",
    },
    {
      phaseNumber: 2,
      title: "Broad Pressure Immobilization Bandage & Splint",
      amharicTitle: "በላስቲክ ፋሻ ማሰርና ስፕሊንት ማድረግ",
      bullets: [
        "Apply broad elastic bandage firmly starting at fingers/toes up the entire bitten limb.",
        "Bandage should be snug as for a sprained ankle, but distal pulse must remain palpable.",
        "Splint the limb with rigid boards to prevent joint bending and muscle pumping of venom.",
        "Transport victim immediately by stretcher/vehicle to hospital with antivenom capability.",
      ],
      imageSrc: "/firstaid/snakebite.jpg",
      caption:
        "Apply broad pressure bandage up entire limb; immobilize with splint to halt venom flow.",
    },
  ],

  // ── 12. ASTHMA (2 Clinical Avatar Stages) ──
  asthma: [
    {
      phaseNumber: 1,
      title: "Inhaler & Spacer Chamber Assistance",
      amharicTitle: "የአስም ማስታገሻ ኢንሄለር አጠቃቀም",
      bullets: [
        "Keep patient seated upright leaning forward slightly to optimize chest expansion.",
        "Shake reliever inhaler (blue puffer) vigorously and insert firmly into spacer chamber.",
        "Deliver 1 puff into spacer; guide patient to take 4 steady, deep breaths.",
        "Repeat every 60 seconds up to 4 separate puffs if wheezing and breathlessness persist.",
      ],
      imageSrc: "/firstaid/asthma.jpg",
      caption:
        "Keep patient seated upright; assist with 4 separate puffs of reliever inhaler via spacer.",
    },
    {
      phaseNumber: 2,
      title: "Pursed-Lip Breathing & Loosen Tight Clothing",
      amharicTitle: "የትንፋሽ መረጋጋት እና ልብስ ማላላት",
      bullets: [
        "Loosen tight neck collar, tie, belt, and restrictive chest clothing immediately.",
        "Coach patient to breathe slowly: inhale through nose for 2 counts, exhale through pursed lips for 4.",
        "Stay calm and maintain a quiet, supportive environment to reduce panic and bronchial spasm.",
        "If no improvement after 4 minutes or speaking is impossible, call 907 emergency dispatch.",
      ],
      imageSrc: "/firstaid/asthma_calm.jpg",
      caption:
        "Loosen restrictive neck clothing; guide slow calm breaths through pursed lips.",
    },
  ],

  // ── 13. ANAPHYLAXIS (2 Clinical Avatar Stages) ──
  anaphylaxis: [
    {
      phaseNumber: 1,
      title: "90° Epinephrine Auto-Injector (EpiPen) Administration",
      amharicTitle: "የኤፒፔን (EpiPen) መርፌ በአፋጣኝ መውጋት",
      bullets: [
        "Form a fist around epinephrine auto-injector and pull off blue safety release cap.",
        "Hold orange needle tip perpendicular (90° angle) to patient's outer mid-thigh.",
        "Push firmly until click is heard, then hold locked in place for 3 full seconds.",
        "Remove injector and massage injection site for 10 seconds; note exact injection time.",
      ],
      imageSrc: "/firstaid/anaphylaxis.jpg",
      caption:
        "Firmly grasp EpiPen and inject into outer mid-thigh at 90°; hold for 3 full seconds.",
    },
    {
      phaseNumber: 2,
      title: "Shock Position & Dispatch 907 Dispatch",
      amharicTitle: "እግሮችን ከፍ ማድረግ እና አምቡላንስ መጥራት",
      bullets: [
        "Lay patient flat on back and elevate legs on cushions unless breathing is difficult.",
        "If patient struggles to breathe, allow them to sit upright with back supported.",
        'Direct bystander to call 907 immediately and state "severe anaphylactic allergic reaction".',
        "Prepare second dose if symptoms do not improve within 5 to 15 minutes.",
      ],
      imageSrc: "/firstaid/anaphylaxis_position.jpg",
      caption:
        "Lay patient flat with legs elevated on cushions; call 907 immediately; monitor airway.",
    },
  ],

  // ── 14. NOSEBLEED (2 Clinical Avatar Stages) ──
  nosebleed: [
    {
      phaseNumber: 1,
      title: "Sit Upright, Lean Forward & Pinch Soft Nostrils",
      amharicTitle: "ወደ ፊት ማዘንበል እና አፍንጫን አጥብቆ መያዝ",
      bullets: [
        "Sit patient upright and tilt head slightly forward so blood drains out nares, not down throat.",
        "Firmly pinch entire soft fleshy lower part of nose shut using thumb and index finger.",
        "Instruct patient to breathe calmly through mouth; maintain constant pressure for 10–15 minutes.",
        "Do NOT tilt head backward (prevents swallowing blood, vomiting, and airway occlusion).",
      ],
      imageSrc: "/firstaid/nosebleed.svg",
      caption:
        "Sit upright, lean forward slightly, and pinch the soft lower nose shut for 10–15 minutes.",
    },
    {
      phaseNumber: 2,
      title: "Cold Ice Pack Compress to Nasal Bridge",
      amharicTitle: "በረዶ በአፍንጫ አጥንት ላይ ማድረግ",
      bullets: [
        "Place cloth-wrapped ice pack or cold damp compress across bridge of nose and forehead.",
        "Cold induces local vasoconstriction, reducing blood supply and accelerating clot formation.",
        "Avoid picking, blowing, or rubbing nose for several hours after bleeding stops.",
        "If bleeding continues beyond 20 minutes of firm pressure, seek urgent medical care.",
      ],
      imageSrc: "/firstaid/nosebleed_ice.svg",
      caption:
        "Apply cloth-wrapped ice pack to the bridge of the nose to constrict bleeding vessels.",
    },
  ],

  // ── 15. POISONING (2 Clinical Avatar Stages) ──
  poisoning: [
    {
      phaseNumber: 1,
      title: "Secure Toxic Container & Call 907 Poison Control",
      amharicTitle: "የመርዙን ዕቃ መያዝና 907 መደወል",
      bullets: [
        "Identify substance, brand label, chemical concentration, and estimated quantity ingested.",
        "Retain original bottle, packaging, or vomit sample for hospital physician identification.",
        "Call 907 / Poison Control immediately and follow specialist instructions precisely.",
        "Do NOT give raw milk, raw eggs, vinegar, or activated charcoal without medical authorization.",
      ],
      imageSrc: "/firstaid/poisoning.svg",
      caption:
        "Keep chemical container for identification; call 907 immediately; do not induce vomiting.",
    },
    {
      phaseNumber: 2,
      title: "Lateral Recovery Position (Prevent Aspiration)",
      amharicTitle: "አየር ቱቦ እንዳይዘጋ በጎን ማስተኛት",
      bullets: [
        "Place unresponsive or nauseous victim in lateral recovery position with head tilted back.",
        "This allows gastric secretions and vomit to drain naturally without obstructing trachea.",
        "Do NOT induce vomiting (corrosive acids and alkalis cause secondary chemical burns to esophagus).",
        "Monitor consciousness and breathing rate continuously until medical emergency crew arrives.",
      ],
      imageSrc: "/firstaid/poisoning_recovery.svg",
      caption:
        "If unconscious or nauseous, roll onto side to ensure airway drainage and avoid choking.",
    },
  ],

  // ── 16. HEAT STROKE (2 Clinical Avatar Stages) ──
  "heat-stroke": [
    {
      phaseNumber: 1,
      title: "Relocate to Shade & Aggressive Cold Pack Cooling",
      amharicTitle: "ጥላ ስር ማረፍ እና የሰውነት ሙቀትን በበረዶ ማቀዝቀዝ",
      bullets: [
        "Move patient immediately out of sunlight into air-conditioned room or deep shade.",
        "Strip off outer layers of heavy, tight, and synthetic clothing to expose skin.",
        "Place ice packs or cold wet towels on carotid neck, armpits, and groin where major vessels lie.",
        "Sponge torso continuously with cool water to maximize evaporative and conductive cooling.",
      ],
      imageSrc: "/firstaid/heat_stroke.svg",
      caption:
        "Move to shade, strip excess clothes, place cold wet cloths/ice on neck, armpits, and groin.",
    },
    {
      phaseNumber: 2,
      title: "Continuous Air Fanning & Conscious Hydration",
      amharicTitle: "ንፋስ ማራገብ እና ቀዝቃዛ ውሃ በትንሹ ማጠጣት",
      bullets: [
        "Fan patient vigorously with fan, towel, or electric blower while skin remains damp.",
        "If patient is fully conscious and oriented, offer small sips of cool water or electrolyte drink.",
        "Never give fluids if patient is drowsy, confused, or vomiting (prevents pulmonary aspiration).",
        "Continue aggressive active cooling until body temperature drops below 38.9°C (102°F).",
      ],
      imageSrc: "/firstaid/heat_stroke_hydration.svg",
      caption:
        "Fan body continuously; if fully alert and conscious, provide small sips of cool water.",
    },
  ],

  // ── 17. HYPOTHERMIA (2 Clinical Avatar Stages) ──
  hypothermia: [
    {
      phaseNumber: 1,
      title: "Remove Wet Clothing & Thermal Cocoon Wrapping",
      amharicTitle: "እርጥብ ልብስ ማውለቅ እና በብርድልብስ መሸፈን",
      bullets: [
        "Gently move patient into warm, windproof shelter; handle very gently (rough movement triggers VF).",
        "Cut away cold wet clothing rather than violently undressing patient.",
        "Wrap patient completely in multiple warm wool blankets, sleeping bag, and space foil sheet.",
        "Cover head, neck, and chest warmly while leaving face and nostrils open for breathing.",
      ],
      imageSrc: "/firstaid/hypothermia.svg",
      caption:
        "Strip away damp garments; wrap core and head in multiple dry blankets and foil sheets.",
    },
    {
      phaseNumber: 2,
      title: "Ground Thermal Insulation & Warm Sweet Liquids",
      amharicTitle: "ከቀዘቀዘ መሬት ማራቅ እና የሞቀ መጠጥ መስጠት",
      bullets: [
        "Place closed-cell foam pad or thick blankets beneath patient to stop ground conductive heat loss.",
        "Offer warm, non-caffeinated sweet beverages (hot tea, honey water) ONLY if fully alert.",
        "Never give alcohol or rub frostbitten limbs with snow (causes tissue necrosis).",
        "Call 907 and monitor pulse carefully; hypothermic patients may have extremely slow heart rates.",
      ],
      imageSrc: "/firstaid/hypothermia_shelter.svg",
      caption:
        "Place insulating sleeping pad beneath body; offer warm sweetened drink if alert.",
    },
  ],

  // ── 18. CIRCULATORY SHOCK (2 Clinical Avatar Stages) ──
  shock: [
    {
      phaseNumber: 1,
      title: "Supine Position with Lower Extremities Elevated 20–30 cm",
      amharicTitle: "ጀርባን አስተኝቶ እግሮችን 20-30 ሳ.ሜ ከፍ ማድረግ",
      bullets: [
        "Lay patient flat on back on flat ground (Shock/Trendelenburg position).",
        "Elevate lower extremities 20–30 cm (8–12 inches) on cushions, folded blankets, or packs.",
        "Gravity drains peripheral venous blood back to heart, brain, and essential kidneys.",
        "Do NOT elevate legs if pelvic fracture, head injury, or spine trauma is suspected.",
      ],
      imageSrc: "/firstaid/shock.svg",
      caption:
        "Lay flat on back and prop legs 20–30 cm on pillows to redirect blood to core vital organs.",
    },
    {
      phaseNumber: 2,
      title: "Maintain Core Warmth & Continuous Vital Signs Check",
      amharicTitle: "የሰውነት ሙቀት መጠበቅ እና የልብ ምት መከታተል",
      bullets: [
        "Cover patient with clean warm blanket to prevent hypothermia-induced coagulopathy.",
        "Loosen restrictive collar, belt, waistline, and shoes to assist venous return.",
        "Do NOT give anything by mouth (no water, food, or stimulants in case surgery is required).",
        "Recheck breathing and radial pulse every 5 minutes until emergency medical team takes over.",
      ],
      imageSrc: "/firstaid/shock_warmth.svg",
      caption:
        "Cover with thermal blanket to stop heat loss; loosen tight collar; do NOT give food or drink.",
    },
  ],

  // ── 19. SPINAL INJURY (2 Clinical Avatar Stages) ──
  "spinal-injury": [
    {
      phaseNumber: 1,
      title: "Manual In-Line Cervical Spine Stabilization",
      amharicTitle: "አንገትን ቀጥ አድርጎ በእጅ መያዝና አለማንቀሳቀስ",
      bullets: [
        "Kneel directly above patient's head on level ground.",
        "Place hands firmly and evenly on both sides of head over ears.",
        "Hold cervical spine in neutral in-line alignment with eyes facing straight upward.",
        "Do NOT release grip until a rigid cervical collar or medical team relieves you.",
      ],
      imageSrc: "/firstaid/spinal_injury.svg",
      caption:
        "Kneel at head, place hands firmly on both sides of head/neck; keep spine completely motionless.",
    },
    {
      phaseNumber: 2,
      title: "Synchronized Multi-Rescuer Log Roll",
      amharicTitle: "በቡድን በመሆን አካልን ሳይጣመም በአንድነት ማዞር",
      bullets: [
        "Only roll patient if airway is compromised by vomit, blood, or secretions.",
        'Lead rescuer maintains head hold and commands: "Ready, 1, 2, 3, roll".',
        "Assistant rescuers roll shoulders, hips, and legs simultaneously as a single rigid cylinder.",
        "Zero twisting, bending, or flexion of spinal column allowed during movement.",
      ],
      imageSrc: "/firstaid/spinal_log_roll.svg",
      caption:
        "If vomiting occurs, roll entire body as one rigid unit with head kept aligned with spine.",
    },
  ],

  // ── 20. DROWNING (2 Clinical Avatar Stages) ──
  drowning: [
    {
      phaseNumber: 1,
      title: "5 Immediate Initial Rescue Breaths",
      amharicTitle: "አምስት የመጀመሪያ አርቲፊሻል ትንፋሽ መስጠት",
      bullets: [
        "Extract victim to dry land safely; place supine on firm ground.",
        "Open airway with head-tilt chin-lift maneuver; check mouth for visible weeds or debris.",
        "Drowning cardiac arrests are hypoxic — deliver 5 full, gentle rescue breaths first (1 sec each).",
        "Verify chest rises visibly with each ventilation before beginning compressions.",
      ],
      imageSrc: "/firstaid/drowning.svg",
      caption:
        "Open airway with head-tilt chin-lift and deliver 5 rescue breaths first to reverse hypoxia.",
    },
    {
      phaseNumber: 2,
      title: "Standard 30:2 CPR Compression-Ventilation Cycles",
      amharicTitle: "30 አጨማመቅ እና 2 ትንፋሽ በድጋሚ መስጠት",
      bullets: [
        "Perform 30 high-quality chest compressions at 100–120 BPM at depth of 5–6 cm.",
        "Deliver 2 rescue breaths, then immediately resume 30 compressions (30:2 ratio).",
        "Do NOT attempt abdominal thrusts or drainage maneuvers to expel swallowed water.",
        "Dry patient's chest before attaching AED electrode pads as soon as AED arrives.",
      ],
      imageSrc: "/firstaid/drowning_cpr.svg",
      caption:
        "Perform 30 chest compressions at 100–120 BPM followed by 2 breaths on firm dry ground.",
    },
  ],

  // ── 21. SUCKING CHEST WOUND (2 Clinical Avatar Stages) ──
  "chest-wound": [
    {
      phaseNumber: 1,
      title: "Immediate Non-Porous Plastic Seal Application",
      amharicTitle: "ክፍት ቁስሉን በላስቲክ መሸፈን",
      bullets: [
        "Quickly cover penetrating thoracic wound with clean plastic wrap, medical foil, or gloved hand.",
        "Sealing halts outside atmospheric air from sucking into pleural cavity during inhalation.",
        "Position patient seated propped up or tilted toward injured side to assist healthy lung expansion.",
        "Never pack gauze deep into thoracic puncture (may cause lung laceration).",
      ],
      imageSrc: "/firstaid/chest_wound.svg",
      caption:
        "Cover sucking thoracic wound immediately with sterile non-porous plastic or clean foil.",
    },
    {
      phaseNumber: 2,
      title: "Three-Sided Taped Flutter Valve Dressing",
      amharicTitle: "በሶስት አቅጣጫ በፕላስተር ማሰር (አንድ አቅጣጫ ክፍት)",
      bullets: [
        "Tape down top, left, and right sides of square plastic dressing securely with adhesive tape.",
        "Leave bottom (4th edge) completely untaped to create a one-way flutter valve.",
        "Valve allows trapped pleural air and blood to vent out during exhalation.",
        "If tension pneumothorax develops (cyanosis, tracheal deviation), lift dressing to release trapped air.",
      ],
      imageSrc: "/firstaid/chest_wound_flutter.svg",
      caption:
        "Tape top and two sides, leaving bottom edge untaped so trapped air escapes during exhalation.",
    },
  ],

  // ── 22. ABDOMINAL EVISCERATION (2 Clinical Avatar Stages) ──
  evisceration: [
    {
      phaseNumber: 1,
      title: "Supine Position with Flexed Knees",
      amharicTitle: "ጀርባን አስተኝቶ ጉልበትን በማጠፍ ማረፍ",
      bullets: [
        "Lay patient flat on back and gently bend both knees upward toward chest.",
        "Knee flexion slackens anterior abdominal wall muscles and stops further organ extrusion.",
        "Support bent knees with folded blankets or pillows to maintain comfortable rest.",
        "Instruct patient to avoid coughing, bearing down, or lifting head.",
      ],
      imageSrc: "/firstaid/evisceration.svg",
      caption:
        "Lay patient flat on back and bend knees upward to relieve abdominal muscle wall tension.",
    },
    {
      phaseNumber: 2,
      title: "Moist Sterile Saline Dressing (Never Push Organs In)",
      amharicTitle: "የረጠበ የጸዳ ፋሻ ማልበስ (ዕቃውን ወደ ውስጥ አለመግፋት)",
      bullets: [
        "Saturate clean sterile gauze pads or clean towels with sterile water or normal saline.",
        "Drape moist dressing loosely over exposed bowel to keep tissues moist and viable.",
        "Cover moist dressing loosely with clean plastic wrap to prevent evaporation and cooling.",
        "NEVER attempt to push exposed intestines or organs back inside abdominal cavity.",
      ],
      imageSrc: "/firstaid/evisceration_dressing.svg",
      caption:
        "Drape sterile saline-soaked gauze loosely over protruding organs; NEVER force organs back.",
    },
  ],

  // ── 23. DIABETIC EMERGENCY (2 Clinical Avatar Stages) ──
  "diabetic-emergency": [
    {
      phaseNumber: 1,
      title: "Administer 15g Fast-Acting Simple Carbohydrates",
      amharicTitle: "15 ግራም ስኳር ወይም የፍራፍሬ ጭማቂ መስጠት",
      bullets: [
        "If patient is awake, alert, and able to swallow safely, administer 15g fast-acting sugar.",
        "Acceptable items: 1/2 glass fruit juice, regular non-diet soda, or 3–4 glucose chewables.",
        "Do NOT give chocolate, candy with nuts, or milk (fats significantly delay glucose absorption).",
        "Do NOT administer anything by mouth if patient is unconscious, seizing, or choking.",
      ],
      imageSrc: "/firstaid/diabetic_emergency.svg",
      caption:
        "If patient is conscious and can swallow, give half glass of fruit juice or 3–4 glucose tablets.",
    },
    {
      phaseNumber: 2,
      title: "The 15-Minute Re-Evaluation & Rest Protocol",
      amharicTitle: "ከ15 ደቂቃ በኋላ መልሶ መገምገም",
      bullets: [
        "Keep patient seated resting calmly and wait 15 minutes by the clock.",
        "Recheck blood glucose with glucometer or assess orientation, speech, and tremors.",
        "If glucose remains <70 mg/dL or symptoms persist, administer a second 15g dose of carbohydrates.",
        "Once symptoms resolve, provide a complex carbohydrate snack (bread, crackers) to prevent relapse.",
      ],
      imageSrc: "/firstaid/diabetic_recovery.svg",
      caption:
        "Wait 15 minutes; re-evaluate symptoms; if still confused or hypoglycemic, repeat 15g or call 907.",
    },
  ],

  // ── 24. EYE CHEMICAL SPLASH (2 Clinical Avatar Stages) ──
  "eye-splash": [
    {
      phaseNumber: 1,
      title: "Immediate Continuous 15-Minute Water Irrigation",
      amharicTitle: "ዓይንን ለ15 ደቂቃ ያለማቋረጥ በውሃ ማጠብ",
      bullets: [
        "Flush exposed eye immediately with steady stream of clean lukewarm tap water or saline.",
        "Tilt head toward injured eye so contaminated runoff fluid does not enter unaffected eye.",
        "Gently hold upper and lower eyelids open; direct patient to roll eye during flushing.",
        "Irrigate continuously for minimum 15 to 20 minutes before attempting transport.",
      ],
      imageSrc: "/firstaid/eye_splash.svg",
      caption:
        "Tilt head toward injured side; hold lids open and flush gently with clean water inner to outer.",
    },
    {
      phaseNumber: 2,
      title: "Loose Sterile Eye Pad (Do NOT Rub)",
      amharicTitle: "የጸዳ ፋሻ በለሆሳስ ማልበስ (አለማሸት)",
      bullets: [
        "After thorough irrigation, place clean sterile eye pad loosely over affected eye.",
        "Secure pad lightly with paper tape; do NOT apply firm pressure.",
        "Firmly instruct patient NOT to rub eye (prevents corneal abrasion and chemical embedding).",
        "Bring chemical container or safety data sheet along to emergency ophthalmic clinic.",
      ],
      imageSrc: "/firstaid/eye_splash_patch.svg",
      caption:
        "Place clean sterile gauze loosely over eye without pressure; transport for immediate eye exam.",
    },
  ],

  // ── 25. TOOTH AVULSION (2 Clinical Avatar Stages) ──
  "tooth-avulsion": [
    {
      phaseNumber: 1,
      title: "Handle Knocked-Out Tooth by Enamel Crown Only",
      amharicTitle: "ጥርስን በነጩ ክፍል ብቻ መያዝ",
      bullets: [
        "Locate tooth immediately; pick it up holding ONLY the smooth white enamel crown.",
        "NEVER touch, pinch, or scrape delicate root fibers or periodontal ligament cells.",
        "If dirty, rinse briefly for max 10 seconds under cold running water; do NOT scrub.",
        "If patient is calm adult, gently reinsert tooth into socket and bite on clean gauze.",
      ],
      imageSrc: "/firstaid/tooth_avulsion.svg",
      caption:
        "Touch only the white chewing crown; NEVER touch, scrape, or scrub the delicate root cells.",
    },
    {
      phaseNumber: 2,
      title: "Submerge Tooth in Cold Fresh Milk for Transport",
      amharicTitle: "ጥርስን በቀዝቃዛ ወተት ውስጥ ማቆየት",
      bullets: [
        "If reinsertion is not possible, place tooth inside small container of cold whole milk.",
        "Milk maintains ideal physiological osmolarity and pH, preserving ligament vitality.",
        "Alternative transport media: Hank's Balanced Salt Solution or patient's saliva cup.",
        "Never store in tap water or dry paper towel; visit dentist within 60 minutes for reimplantation.",
      ],
      imageSrc: "/firstaid/tooth_avulsion_milk.svg",
      caption:
        "Place tooth immediately into cup of cold milk or saliva; see dentist within 60 minutes.",
    },
  ],

  // ── 26. ELECTRICAL SHOCK (2 Clinical Avatar Stages) ──
  "electrical-shock": [
    {
      phaseNumber: 1,
      title: "Isolate Live Current with Dry Wooden Pole",
      amharicTitle: "የኤሌክትሪክ ገመዱን በደረቅ እንጨት ማራቅ",
      bullets: [
        "Do NOT touch victim directly while still in contact with electrical source.",
        "Shut off power at main fuse box / circuit breaker immediately if accessible.",
        "If switch is out of reach, use long dry wooden broom, PVC pipe, or dry folded sheet to push wire away.",
        "Ensure your own footing is completely dry before attempting isolation.",
      ],
      imageSrc: "/firstaid/electrical_shock.svg",
      caption:
        "Do not touch victim directly; push wire away with dry wood or shut off main circuit breaker.",
    },
    {
      phaseNumber: 2,
      title: "Check Airway & Breathing; Prepare Immediate CPR",
      amharicTitle: "የትንፋሽና የልብ ምት መገምገም እና CPR ማዘጋጀት",
      bullets: [
        "Once electrical source is fully severed, check victim's responsiveness and breathing.",
        "Electrical shock often induces ventricular fibrillation; prepare AED and initiate CPR if no pulse.",
        "Examine for hidden entrance and exit burn wounds (often palms and soles of feet).",
        "Keep patient lying down; all high-voltage victims require urgent cardiac telemetry monitoring.",
      ],
      imageSrc: "/firstaid/electrical_assessment.svg",
      caption:
        "Once scene is fully de-energized, check airway, breathing, and pulse; start CPR if unresponsive.",
    },
  ],
}
