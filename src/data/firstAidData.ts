export type SeverityLevel = 'Critical' | 'High' | 'Moderate';

export interface StepItem {
  step: number;
  title: string;
  detail: string;
}

export interface AgeGroupSteps {
  adults: StepItem[];
  children: StepItem[];
  infants: StepItem[];
}

export interface FirstAidTopic {
  id: string;
  title: string;
  shortTitle: string;
  amharic: string;
  severity: SeverityLevel;
  overview: string;
  steps: AgeGroupSteps;
  keyFacts: string[];
  doNot: string[];
  visualSpecs: string;
  iconType: string;
}

export const FIRST_AID_TOPICS: FirstAidTopic[] = [
  // ── PART 1: THE 6 ENHANCED CORE FIRST AID CONDITIONS ──
  {
    id: 'cpr',
    title: 'Cardiopulmonary Resuscitation (CPR) & Automated External Defibrillator (AED)',
    shortTitle: 'CPR & AED',
    amharic: 'የልብና የመተንፈሻ ህክምና (CPR) እና ኤኢዲ (AED)',
    severity: 'Critical',
    overview:
      'When the heart stops functioning or develops a life-threatening arrhythmia, the flow of oxygenated blood to the brain and vital organs ceases. CPR artificially maintains circulation and oxygenation, while an AED delivers an electric shock to terminate fatal arrhythmias and restore normal cardiac rhythm.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Ensure Scene Safety',
          detail: 'Verify the area is free from hazards (fire, live electrical wires, toxic leaks).',
        },
        {
          step: 2,
          title: 'Check Responsiveness',
          detail: 'Shake the victim\'s shoulders and ask loudly, "Are you okay?" Scan for normal breathing for no more than 10 seconds.',
        },
        {
          step: 3,
          title: 'Call 907 (Emergency Services)',
          detail: 'Direct a specific bystander to call 907 and retrieve an AED immediately. Put the phone on speaker.',
        },
        {
          step: 4,
          title: 'Hand Placement',
          detail: 'Place the heel of one hand on the center of the chest (lower half of the sternum, nipple line). Interlock your other hand on top with fingers laced; keep your elbows fully locked.',
        },
        {
          step: 5,
          title: 'Compress at 100–120 BPM',
          detail: 'Push hard down 5 to 6 cm (2 to 2.4 inches) into the chest. Allow full chest recoil between compressions.',
        },
        {
          step: 6,
          title: '30:2 Compression-to-Ventilation Ratio',
          detail: 'After 30 compressions, perform a head-tilt, chin-lift maneuver, pinch the nostrils shut, and deliver 2 rescue breaths (1 second each). Watch for chest rise.',
        },
        {
          step: 7,
          title: 'Deploy the AED',
          detail: 'Turn on the device as soon as it arrives. Affix pads to the upper right chest and lower left ribcage. Follow voice prompts: ensure no one touches the victim during rhythm analysis or shock delivery, and immediately resume compressions right after the shock.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Check Responsiveness',
          detail: 'Tap the child\'s shoulders or flick the bottom of their feet and call out loudly.',
        },
        {
          step: 2,
          title: 'Hand Technique',
          detail: 'Use a 1-handed or 2-handed technique on the center of the chest depending on the child\'s physical size.',
        },
        {
          step: 3,
          title: 'Compression Depth',
          detail: 'Compress approximately 4–5 cm (about one-third the anterior-posterior diameter of the chest) at 100–120 compressions/min.',
        },
        {
          step: 4,
          title: 'Cycle & Emergency Call',
          detail: 'If alone, administer 2 minutes of CPR (5 cycles of 30:2) before leaving to call 907. If 2 rescuers are present, switch to a 15:2 ratio.',
        },
        {
          step: 5,
          title: 'Pediatric AED Pads',
          detail: 'Use pediatric pads/attenuator if available. If absent, apply standard adult pads (one on center of the chest, one on center of back to prevent pad contact).',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Check Responsiveness',
          detail: 'Tap the soles of the feet and call their name out loud. Never shake an infant.',
        },
        {
          step: 2,
          title: 'Finger Technique',
          detail: 'Position 2 thumbs with hands encircling the chest, or use 2 fingers (index and middle) just below the nipple line on the center of the sternum.',
        },
        {
          step: 3,
          title: 'Compression Depth',
          detail: 'Compress exactly 4 cm (1.5 inches) at a rate of 100–120 compressions per minute.',
        },
        {
          step: 4,
          title: 'Ventilation',
          detail: 'Cover both the infant\'s mouth and nose with your mouth. Deliver gentle puffs from your cheeks rather than full lung exhalations (over 1 second each, 2 breaths total).',
        },
        {
          step: 5,
          title: 'Cycle',
          detail: '30:2 for a single rescuer; 15:2 if two trained rescuers are present.',
        },
      ],
    },
    keyFacts: [
      'Hands-Only CPR is equally effective for untrained bystanders during the initial minutes of an adult out-of-hospital cardiac arrest.',
      'For every minute CPR is delayed, the probability of survival decreases by approximately 10%.',
      'Complete chest recoil between compressions is vital to allow cardiac chambers to refill with blood.',
      'The predominant cause of cardiac arrest in infants is respiratory failure/asphyxiation, not primary cardiac etiology.',
    ],
    doNot: [
      'Do NOT pause chest compressions for longer than 10 seconds under any circumstance.',
      'Do NOT lean on the chest between compressions; full recoil is required.',
      'Do NOT hyperextend an infant’s neck; their delicate airway collapses easily.',
      'Do NOT touch the patient while the AED is analyzing or delivering a shock.',
    ],
    visualSpecs:
      'Diagram 1: Hand/finger positioning across adult (interlocked heel), child (1-hand), and infant (2-finger/2-thumb) CPR.\nDiagram 2: AED pad placement (anterolateral for adults; anteroposterior for pediatric/infants).',
    iconType: 'cpr',
  },
  {
    id: 'bleeding',
    title: 'Severe Bleeding & Hemorrhage Control',
    shortTitle: 'Severe Bleeding',
    amharic: 'ከባድ የደም መፍሰስ መቆጣጠሪያ',
    severity: 'Critical',
    overview:
      'When major blood vessels (arteries or large veins) are lacerated, rapid blood volume loss causes a critical drop in perfusion pressure, depriving tissues of oxygen and triggering hemorrhagic shock and death within minutes.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Direct Pressure',
          detail: 'Place sterile gauze or a clean cloth directly over the wound and apply firm, continuous pressure with both hands.',
        },
        {
          step: 2,
          title: 'Wound Packing',
          detail: 'For junctional zones (groin, axilla, neck base), pack sterile hemostatic or plain gauze deep into the wound cavity, maintaining heavy pressure.',
        },
        {
          step: 3,
          title: 'Tourniquet Application',
          detail: 'If severe extremity bleeding persists, place a commercial windlass tourniquet 5–7 cm (2–3 inches) proximal to the wound (never over a joint). Tighten until bleeding stops completely and distal pulses disappear.',
        },
        {
          step: 4,
          title: 'Document Time',
          detail: 'Write the exact time of application directly on the tourniquet or the patient\'s forehead (e.g., "T 14:35").',
        },
        {
          step: 5,
          title: 'Call 907',
          detail: 'Cover the patient with blankets to prevent hypothermia-induced coagulopathy and call 907 immediately.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Calibrated Pressure',
          detail: 'Apply direct pressure with enough force to halt bleeding without crushing underlying pediatric skeletal structures.',
        },
        {
          step: 2,
          title: 'Pediatric Tourniquet Considerations',
          detail: 'Commercial adult tourniquets may fail on very thin pediatric limbs; if proper circumference closure cannot be achieved, maintain unrelenting direct pressure and wound packing.',
        },
        {
          step: 3,
          title: 'Reassurance',
          detail: 'Extreme fear and agitation drive tachycardia, exacerbating blood loss. Maintain calming physical contact.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Targeted Digital Pressure',
          detail: 'An infant\'s total blood volume is extremely small (roughly equivalent to a single cup of liquid); every drop counts. Apply firm, pinpoint direct pressure using a thumb or two fingers over sterile gauze.',
        },
        {
          step: 2,
          title: 'Avoid Tourniquets',
          detail: 'Commercial tourniquets are contraindicated for infants; rely strictly on focused direct pressure.',
        },
        {
          step: 3,
          title: 'Thermal Protection',
          detail: 'Rapid blood loss causes rapid infant core temperature drops. Wrap the infant in warm blankets.',
        },
      ],
    },
    keyFacts: [
      'Pulsatile, bright red spurting blood indicates arterial compromise; steady, dark red flow indicates venous injury.',
      'An adult losing 1 liter of blood can enter severe shock; an infant can deteriorate into shock with the loss of just a few tens of milliliters.',
      'A correctly placed tourniquet causes severe ischemic pain; this confirms effective arterial occlusion.',
    ],
    doNot: [
      'Do NOT remove blood-soaked dressings; always layer additional dressings directly on top.',
      'Do NOT apply a tourniquet over a joint (elbow, knee) or around the neck.',
      'Do NOT loosen or remove an applied tourniquet; this must only be done in a surgical setting.',
      'Do NOT extract embedded foreign objects (knives, glass shards); stabilize them in place.',
    ],
    visualSpecs:
      'Diagram: Two-handed direct pressure, junctional wound packing, and limb tourniquet tensioning sequence.',
    iconType: 'bleeding',
  },
  {
    id: 'choking',
    title: 'Choking (Foreign Object Airway Obstruction)',
    shortTitle: 'Choking',
    amharic: 'መታፈን (የመተንፈሻ ቱቦ መዘጋት)',
    severity: 'Critical',
    overview:
      'Mechanical blockage of the upper respiratory tract by an ingested object or food bolus, preventing pulmonary gas exchange and rapidly leading to anoxia and cardiac arrest.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Assess Severity',
          detail: 'Ask: "Are you choking?" If the person can cough forcefully, speak, or breathe, encourage continued coughing.',
        },
        {
          step: 2,
          title: '5 Back Blows',
          detail: 'If they cannot speak or breathe, lean them forward and deliver 5 distinct, firm blows between the scapulae with the heel of your hand.',
        },
        {
          step: 3,
          title: '5 Abdominal Thrusts (Heimlich Maneuver)',
          detail: 'Stand behind the victim, wrap your arms around their waist, place a clenched fist thumb-inward just above the navel, grasp your fist with your other hand, and pull inward and upward sharply.',
        },
        {
          step: 4,
          title: 'Alternate',
          detail: 'Continue alternating 5 back blows and 5 abdominal thrusts until the obstruction is relieved.',
        },
        {
          step: 5,
          title: 'Pregnant / Obese Victims',
          detail: 'Substitute abdominal thrusts with chest thrusts over the mid-sternum.',
        },
        {
          step: 6,
          title: 'If Unconscious',
          detail: 'Lower the patient to the floor and begin CPR immediately.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Adjust Stature',
          detail: 'Kneel behind the child to match their height.',
        },
        {
          step: 2,
          title: 'Calibrated Force',
          detail: 'Deliver back blows and abdominal thrusts with force appropriate for the child\'s frame.',
        },
        {
          step: 3,
          title: 'If Unconscious',
          detail: 'Transition directly to pediatric CPR. Inspect the oral cavity prior to rescue breaths; remove foreign objects only if clearly visible.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Positioning',
          detail: 'Lay the infant face down along your forearm, supporting their jaw and head with your hand. Keep the head lower than the trunk (never grip the soft neck tissues).',
        },
        {
          step: 2,
          title: '5 Back Slaps',
          detail: 'Deliver 5 moderate back slaps between the shoulder blades using the heel of your hand.',
        },
        {
          step: 3,
          title: 'Rotate',
          detail: 'Turn the infant onto their back along your opposite forearm, keeping the head tilted downwards.',
        },
        {
          step: 4,
          title: '5 Chest Thrusts',
          detail: 'Place 2 fingers on the lower sternum (just below the nipples) and deliver 5 quick downward compressions.',
        },
        {
          step: 5,
          title: 'Alternate',
          detail: 'Repeat 5 back slaps and 5 chest thrusts until the airway clears.',
        },
      ],
    },
    keyFacts: [
      'Hands clutching the throat is the universal distress signal for acute choking.',
      'In infants, complete airway obstruction is marked by silent struggle, absence of crying, and sudden cyanosis.',
      'As long as active coughing occurs, air passage remains partially functional—do not interrupt forceful coughing.',
    ],
    doNot: [
      'Do NOT perform blind finger sweeps in the oral cavity (this forces objects deeper into the pharynx).',
      'Do NOT perform abdominal thrusts on infants under 1 year of age (risks lacerating the liver or spleen).',
      'Do NOT suspend an infant upside down by the feet.',
    ],
    visualSpecs:
      'Diagram: Adult Heimlich mechanics contrasted with infant forearm placement for back slaps and chest thrusts.',
    iconType: 'choking',
  },
  {
    id: 'fracture',
    title: 'Bone Fractures & Splinting',
    shortTitle: 'Bone Fractures',
    amharic: 'የአጥንት ስብራት እና ማሰሪያ',
    severity: 'High',
    overview:
      'Structural discontinuity of bone tissue resulting from traumatic impact. Classified as closed (intact overlying skin) or open/compound (bone fragments piercing the skin, presenting high infection and hemorrhage risks).',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Hemorrhage Control',
          detail: 'If an open fracture is present, control bleeding with sterile pressure dressings around the exposed bone without pushing on the fragment.',
        },
        {
          step: 2,
          title: 'Immobilization',
          detail: 'Stabilize the limb in the exact position found. Never force an angulated limb straight.',
        },
        {
          step: 3,
          title: 'Apply a Splint',
          detail: 'Secure rigid material (wood, cardboard, SAM splint) immobilizing both the joint above and the joint below the fracture site.',
        },
        {
          step: 4,
          title: 'Apply Cold Packs',
          detail: 'Wrap ice in a barrier cloth and apply for 15–20 minutes to reduce edema and localized pain.',
        },
        {
          step: 5,
          title: 'Assess Neurovascular Status',
          detail: 'Check pulse, capillary refill, sensation, and motor function distal to the splint before and after application.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Suspect Greenstick Fractures',
          detail: 'Pediatric bones often bend and crack partially rather than snapping cleanly; treat all localized limb pain after trauma as an active fracture.',
        },
        {
          step: 2,
          title: 'Soft Splinting',
          detail: 'Use pillows, folded towels, or padded splints to contour gently around smaller limbs.',
        },
        {
          step: 3,
          title: 'Immobilize and Comfort',
          detail: 'Use an arm sling secured to the torso to minimize movement while transporting to emergency care.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Minimal Manipulation',
          detail: 'Suspect a fracture if an infant refuses to move a limb or cries intensely when touched.',
        },
        {
          step: 2,
          title: 'Anatomical Splinting',
          detail: 'Swaddle the injured limb gently against the infant\'s torso, or bind an injured leg to the uninjured leg using soft cloths.',
        },
        {
          step: 3,
          title: 'Urgent Medical Evaluation',
          detail: 'Avoid rigid makeshift splints; transport immediately to clinical care.',
        },
      ],
    },
    keyFacts: [
      'Bony crepitus (a grinding sensation or sound upon movement) indicates unstable fracture fragments.',
      'Unnecessary movement of broken bone ends risks severing adjacent nerves and vascular bundles.',
    ],
    doNot: [
      'Do NOT attempt to push protruding bone fragments back beneath the skin.',
      'Do NOT attempt to straighten, realign, or manipulate an angulated limb.',
      'Do NOT apply splint ties so tightly that distal circulation is compromised.',
    ],
    visualSpecs:
      'Diagram: Cardboard splint stabilization of a forearm fracture supported by a triangular arm sling.',
    iconType: 'fracture',
  },
  {
    id: 'burns',
    title: 'Burns (Thermal, Chemical & Electrical)',
    shortTitle: 'Burns',
    amharic: 'ቃጠሎ (የሙቀት፣ የኬሚካል እና የኤሌክትሪክ)',
    severity: 'High',
    overview:
      'Coagulative destruction of epidermal and deeper cutaneous layers caused by heat, chemicals, radiation, or electrical contact. Categorized into 1st degree (superficial), 2nd degree (partial thickness), and 3rd degree (full thickness).',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Cool with Water',
          detail: 'Immediately irrigate the burn with clean, cool running water (not iced) for 10 to 20 minutes.',
        },
        {
          step: 2,
          title: 'Remove Constrictive Items',
          detail: 'Swiftly take off rings, watches, and tight clothing before inflammatory edema develops.',
        },
        {
          step: 3,
          title: 'Cover the Wound',
          detail: 'Drape sterile, non-adherent dressings or clean plastic cling film loosely over the burned area.',
        },
        {
          step: 4,
          title: 'Maintain Core Temperature',
          detail: 'Cover unaffected body surfaces with clean blankets to preserve core body heat.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Hypothermia Precautions',
          detail: 'Prolonged cooling with cold water over large surface areas rapidly precipitates hypothermia in children; monitor closely and do not exceed 10 minutes of cooling for extensive burns.',
        },
        {
          step: 2,
          title: 'Fluid Depletion Monitoring',
          detail: 'Pediatric burn victims lose plasma fluid through damaged skin rapidly; prioritize urgent hospital transfer.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Brief Irrigation',
          detail: 'Use tepid to mildly cool water for no more than 5 minutes.',
        },
        {
          step: 2,
          title: 'Dry Sterile Dressing',
          detail: 'Loosely enclose the burn in clean, dry coverings.',
        },
        {
          step: 3,
          title: 'Immediate Emergency Transfer',
          detail: 'Any burn on an infant warrants immediate emergency clinical evaluation.',
        },
      ],
    },
    keyFacts: [
      'Third-degree burns (leathery white, brown, or charred) may be entirely painless at the center due to complete nerve receptor destruction.',
      'Intact blisters form a biological barrier against invasive bacterial pathogens.',
    ],
    doNot: [
      'Do NOT apply ice or ice water directly to burns (this accelerates tissue necrosis).',
      'Do NOT apply butter, cooking oils, toothpaste, eggs, or traditional ointments.',
      'Do NOT pop or debride intact blisters.',
      'Do NOT tear away clothing that has melted and adhered to burned flesh.',
    ],
    visualSpecs:
      'Diagram: Proper wound cooling under running tap water alongside loose protective wrapping with medical cling film.',
    iconType: 'burns',
  },
  {
    id: 'sprains',
    title: 'Sprains, Strains & Joint Injuries (R.I.C.E.)',
    shortTitle: 'Sprains & Strains',
    amharic: 'የጅማት መወለም እና መወጠር (R.I.C.E.)',
    severity: 'Moderate',
    overview:
      'A sprain is the stretching or tearing of supportive joint ligaments; a strain is an injury to muscle fibers or tendons. Both present with acute pain, localized inflammation, and functional impairment.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'R – Rest',
          detail: 'Discontinue all physical activity; completely avoid weight-bearing on the affected joint.',
        },
        {
          step: 2,
          title: 'I – Ice',
          detail: 'Apply cloth-wrapped cold packs for 15–20 minutes every 2–3 hours during the initial 48 hours.',
        },
        {
          step: 3,
          title: 'C – Compression',
          detail: 'Wrap an elastic bandage firmly from distal to proximal (fingers/toes inward), ensuring it supports without restricting blood flow.',
        },
        {
          step: 4,
          title: 'E – Elevation',
          detail: 'Prop the injured limb above heart level using pillows to facilitate venous and lymphatic drainage.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Rule Out Growth Plate Injuries',
          detail: 'Pediatric ligaments are often stronger than adjacent growth plates (physeal plates). If a child cannot bear weight, treat as a fracture until X-rayed.',
        },
        {
          step: 2,
          title: 'Modified Cold Therapy',
          detail: 'Apply cold packs buffered by thick towels for a maximum of 10 minutes per session.',
        },
        {
          step: 3,
          title: 'Monitor Bandage Tension',
          detail: 'Periodically check toes and fingers for coldness or cyanosis.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'High Suspicion Index',
          detail: 'Isolated sprains are extremely rare in infants; presentation almost always indicates a joint dislocation or bone fracture.',
        },
        {
          step: 2,
          title: 'Immobilization',
          detail: 'Rest the affected extremity in a natural position and seek medical evaluation promptly.',
        },
      ],
    },
    keyFacts: [
      'Cryotherapy administered during the first 48 hours limits microvascular leakage, reducing hematoma formation.',
      'Inability to bear weight for 4 consecutive steps suggests bone fracture and necessitates radiographic imaging (Ottawa Rules).',
    ],
    doNot: [
      'Do NOT apply heat lamps, hot packs, or deep heating balms during the acute 48-hour inflammatory window.',
      'Do NOT place bare ice directly onto the skin.',
      'Do NOT encourage a patient to "walk off" a swollen, painful joint.',
    ],
    visualSpecs:
      'Diagram: Illustrated breakdown of the four R.I.C.E. phases (Rest, Ice, Compression, Elevation).',
    iconType: 'sprains',
  },

  // ── PART 2: ADDITIONAL 20 FIRST AID CONDITIONS ──
  {
    id: 'recovery-position',
    title: 'Recovery Position',
    shortTitle: 'Recovery Position',
    amharic: 'የማገገሚያ አቀማመጥ (Recovery Position)',
    severity: 'Critical',
    overview:
      'A life-saving postural technique for an unresponsive person with preserved spontaneous breathing, preventing upper airway occlusion by the tongue and protecting the pulmonary tree from passive gastric aspiration.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Confirm Breathing',
          detail: 'Tilt head, lift chin, and observe normal chest excursion for 10 seconds.',
        },
        {
          step: 2,
          title: 'Near Arm',
          detail: 'Place the arm closest to you out at a right angle (90°) to their body, palm facing up.',
        },
        {
          step: 3,
          title: 'Far Arm',
          detail: 'Bring the opposite arm across their chest, placing the back of their hand against their near cheek.',
        },
        {
          step: 4,
          title: 'Far Leg',
          detail: 'Bend the knee of their far leg upward until the foot rests flat on the ground.',
        },
        {
          step: 5,
          title: 'Roll Patient',
          detail: 'Pull gently on the bent knee to roll the patient onto their side toward you.',
        },
        {
          step: 6,
          title: 'Adjust Head',
          detail: 'Tilt the head backward to secure an open, draining airway.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Roll',
          detail: 'Roll into the recovery position as described for adults; place a rolled blanket along their back to prevent them from rolling flat.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Recovery Cradle',
          detail: 'Do NOT place an infant in a ground recovery position. Cradle the infant along your forearm, face downward, supporting their head and jaw with your hand, with the head positioned slightly lower than the body.',
        },
      ],
    },
    keyFacts: [
      'In an unconscious, supine individual, muscular flaccidity causes the base of the tongue to drop against the posterior pharyngeal wall, producing complete airway occlusion.',
      'Lateral positioning allows fluids and vomitus to drain freely by gravity.',
    ],
    doNot: [
      'Do NOT move or roll an unconscious patient with suspected spinal trauma unless the airway is actively compromised.',
      'Do NOT place pillows beneath the head of an unresponsive supine patient.',
    ],
    visualSpecs:
      'Diagram: Sequential 4-step illustration of rolling an adult into the lateral recovery position.',
    iconType: 'recovery-position',
  },
  {
    id: 'heart-attack',
    title: 'Heart Attack (Acute Myocardial Infarction)',
    shortTitle: 'Heart Attack',
    amharic: 'ድንገተኛ የልብ ህመም (Heart Attack)',
    severity: 'Critical',
    overview:
      'Acute occlusion of one or more coronary arteries, precipitating localized ischemic necrosis of myocardial tissue. Typically presents as retrosternal crushing chest pressure while the patient is conscious.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Activate Emergency Services',
          detail: 'Call 907 immediately and inform the dispatcher of suspected heart attack.',
        },
        {
          step: 2,
          title: 'Semi-Seated Position (W-Position)',
          detail: 'Sit the patient on the floor, back supported by a wall, knees bent to reduce venous load on the heart.',
        },
        {
          step: 3,
          title: 'Loosen Garments',
          detail: 'Loosen tight neckwear, collars, belts, and waistbands.',
        },
        {
          step: 4,
          title: 'Administer Aspirin',
          detail: 'If no documented allergy exists, instruct the patient to chew one 325 mg non-enteric aspirin tablet.',
        },
        {
          step: 5,
          title: 'Assist with Prescribed Nitroglycerin',
          detail: 'Help the patient self-administer their prescribed sublingual nitroglycerin tablet or spray.',
        },
        {
          step: 6,
          title: 'Prepare for Cardiac Arrest',
          detail: 'Have an AED ready and initiate CPR immediately if responsiveness and normal breathing cease.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Cardiac Warning',
          detail: 'Primary acute myocardial infarction is exceptionally rare in pediatric demographics; if acute dysrhythmia or collapse occurs, activate 907 and prepare for pediatric CPR.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Protocol',
          detail: 'Cardiac arrest in infants is almost always secondary to respiratory arrest. Prioritize rescue breaths and call 907.',
        },
      ],
    },
    keyFacts: [
      'Anginal pain frequently radiates to the left arm, shoulder, lower jaw, neck, or interscapular region.',
      'Women often experience atypical presentations: isolated dyspnea, nausea, fatigue, and epigastric discomfort rather than crushing chest pain.',
    ],
    doNot: [
      'Do NOT allow the patient to walk, exert themselves, or drive to the hospital.',
      'Do NOT dismiss unexplained chest discomfort as benign indigestion or gastritis.',
    ],
    visualSpecs:
      'Diagram: Patient seated in the W-position (half-sitting against a wall, knees elevated and supported).',
    iconType: 'heart-attack',
  },
  {
    id: 'stroke',
    title: 'Stroke (Cerebrovascular Accident)',
    shortTitle: 'Stroke (FAST)',
    amharic: 'ስትሮክ እና የFAST ምልክቶች',
    severity: 'Critical',
    overview:
      'A focal neurological deficit resulting from sudden vascular occlusion (ischemic stroke) or vascular rupture (hemorrhagic stroke), causing rapid cerebral tissue death.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'F – Face Drooping',
          detail: 'Ask the patient to smile; evaluate for facial asymmetry or unilateral mouth drooping.',
        },
        {
          step: 2,
          title: 'A – Arm Weakness',
          detail: 'Ask them to close their eyes and raise both arms straight ahead; observe for unilateral downward drift.',
        },
        {
          step: 3,
          title: 'S – Speech Difficulty',
          detail: 'Ask them to repeat a simple sentence; listen for slurred, garbled, or absent speech.',
        },
        {
          step: 4,
          title: 'T – Time to Call 907',
          detail: 'If any of these signs are positive, call 907 immediately and document the exact time the patient was "last known normal."',
        },
        {
          step: 5,
          title: 'Positioning',
          detail: 'Keep the patient at rest with their head slightly elevated (approximately 30°).',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Stroke Warning',
          detail: 'Pediatric stroke can manifest as focal seizures, sudden hemiparesis, or profound lethargy; requires immediate emergency activation.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Stroke Protocol',
          detail: 'Check for sudden unilateral weakness, apnea, or seizures; summon emergency transport immediately.',
        },
      ],
    },
    keyFacts: [
      'Thrombolytic therapy must be administered within a strict 3 to 4.5-hour window from symptom onset to reverse ischemic damage.',
      'Roughly 1.9 million brain neurons die every single minute an acute stroke goes untreated.',
    ],
    doNot: [
      'Do NOT administer aspirin (if the stroke is hemorrhagic, aspirin can cause fatal intracranial bleeding).',
      'Do NOT give food, water, or oral medications due to high dysphagia and aspiration risk.',
    ],
    visualSpecs:
      'Diagram: Visual breakdown of the FAST assessment tool (Face, Arms, Speech, Time).',
    iconType: 'stroke',
  },
  {
    id: 'seizures',
    title: 'Seizures & Generalized Convulsions',
    shortTitle: 'Seizures',
    amharic: 'የሚጥል በሽታ እና መንቀጥቀጥ',
    severity: 'Critical',
    overview:
      'Paroxysmal, uncontrolled synchronous electrical discharges within the cerebral cortex, resulting in sudden convulsions, involuntary muscular contractions, and loss of consciousness.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Clear Surrounding Hazards',
          detail: 'Move sharp, hard, or hazardous objects away from the patient.',
        },
        {
          step: 2,
          title: 'Protect Cranial Structures',
          detail: 'Place a folded garment, soft pad, or towel beneath the patient\'s head.',
        },
        {
          step: 3,
          title: 'Time the Seizure',
          detail: 'Note the exact start time of tonic-clonic convulsions.',
        },
        {
          step: 4,
          title: 'Post-Ictal Recovery Position',
          detail: 'As soon as active clonic motor activity stops, roll the patient into the lateral recovery position.',
        },
        {
          step: 5,
          title: 'Call 907',
          detail: 'Activate emergency care if convulsions exceed 5 minutes (status epilepticus), repeat consecutively, or if injury occurs.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Febrile Seizures Protocol',
          detail: 'Remove excess, heavy clothing; sponge the forehead with tepid water (never ice water).',
        },
        {
          step: 2,
          title: 'Protect Head',
          detail: 'Protect the head from impact until the convulsion resolves spontaneously.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Convulsions',
          detail: 'Cradle the infant gently, protecting their head from impact, maintain an open airway, and contact 907 immediately.',
        },
      ],
    },
    keyFacts: [
      'The majority of generalized motor seizures resolve spontaneously within 1 to 2 minutes.',
      'A post-ictal state marked by severe confusion, amnesia, and somnolence naturally follows a convulsive seizure.',
    ],
    doNot: [
      'Do NOT force spoons, cloths, or fingers into the patient\'s mouth (the tongue cannot be swallowed).',
      'Do NOT physically restrain the patient’s jerking extremities.',
      'Do NOT administer oral medications or fluids until consciousness is fully restored.',
    ],
    visualSpecs:
      'Diagram: Safe positioning during active convulsions with a protected head and cleared physical hazards.',
    iconType: 'seizures',
  },
  {
    id: 'poisoning',
    title: 'Acute Poisoning & Toxic Ingestion',
    shortTitle: 'Poisoning',
    amharic: 'መመረዝ እና ኬሚካል መዋጥ',
    severity: 'Critical',
    overview:
      'The ingestion of industrial chemicals, corrosives, pesticides, or toxic pharmacological overdoses, causing severe internal caustic necrosis or acute systemic organ failure.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Call 907 / Poison Control',
          detail: 'Identify the substance and estimated quantity ingested, communicating this to responders immediately.',
        },
        {
          step: 2,
          title: 'Secure the Container',
          detail: 'Retain original bottles, packaging, or labels for medical identification.',
        },
        {
          step: 3,
          title: 'Positioning',
          detail: 'If fully conscious, keep the patient seated upright; if lethargic or unresponsive, place them on their left side to slow gastric emptying into the duodenum.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Ingestion Care',
          detail: 'Sweep any visible residual pills, solids, or plant parts out of the oral cavity using a cloth.',
        },
        {
          step: 2,
          title: 'Hospital Transport',
          detail: 'Do not administer home antidotes; transport immediately to the emergency department.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Toxin Protocol',
          detail: 'Ensure airway is patent, keep on left side, do not induce vomiting, and call 907 instantly.',
        },
      ],
    },
    keyFacts: [
      'Caustic agents (acids, alkalis/bleach) cause secondary chemical burns to the esophagus and airway if brought back up via vomiting.',
      'Left-lateral positioning places the pyloric sphincter superiorly, delaying intestinal absorption of ingested toxins.',
    ],
    doNot: [
      'Do NOT induce vomiting unless specifically instructed to do so by medical toxicologists.',
      'Do NOT administer milk, raw eggs, activated charcoal without orders, or lemon juice.',
    ],
    visualSpecs:
      'Diagram: Chemical containment precautions paired with the universal symbol for prohibition of induced vomiting.',
    iconType: 'poisoning',
  },
  {
    id: 'heat-stroke',
    title: 'Heat Stroke & Hyperthermic Emergencies',
    shortTitle: 'Heat Stroke',
    amharic: 'የሙቀት ምት እና ከባድ የሰውነት ሙቀት',
    severity: 'Critical',
    overview:
      'A catastrophic failure of the hypothalamic thermoregulatory system, causing internal core body temperatures to exceed 40°C (104°F), precipitating multi-organ failure and encephalopathy.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Relocate to Shade',
          detail: 'Move the patient out of direct sunlight into an air-conditioned or well-shaded environment.',
        },
        {
          step: 2,
          title: 'Remove Clothing',
          detail: 'Strip away external layers of heavy, restrictive clothing.',
        },
        {
          step: 3,
          title: 'Aggressive Cooling',
          detail: 'Douse the body with cool water while vigorously fanning to facilitate evaporative heat loss.',
        },
        {
          step: 4,
          title: 'Targeted Cold Packs',
          detail: 'Apply cold packs directly to areas of high blood flow: neck, axillae (armpits), and inguinal (groin) folds.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Hyperthermia',
          detail: 'Pediatric patients left in closed cars deteriorate into fatal heat stroke within minutes. Strip clothing and sponge the torso gently with cool water.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Heat Emergency',
          detail: 'Move to air-conditioned area immediately, sponge body with lukewarm water, and seek emergency care.',
        },
      ],
    },
    keyFacts: [
      'Classic heat stroke is characterized by red, hot, and completely dry skin, reflecting complete anhidrosis (cessation of sweating).',
    ],
    doNot: [
      'Do NOT give fluids by mouth to any patient showing altered mental status.',
      'Do NOT administer antipyretics (acetaminophen, aspirin); they are ineffective against environmental hyperthermia and can exacerbate hepatic injury.',
    ],
    visualSpecs:
      'Diagram: Anatomical diagram highlighting the 3 primary large-vessel cooling zones (cervical, axillary, femoral).',
    iconType: 'heat-stroke',
  },
  {
    id: 'hypothermia',
    title: 'Accidental Systemic Hypothermia',
    shortTitle: 'Hypothermia',
    amharic: 'ከፍተኛ የሰውነት ቅዝቃዜ (Hypothermia)',
    severity: 'High',
    overview:
      'A progressive decline in core body temperature below 35°C (95°F), leading to central nervous system depression, cardiac conduction abnormalities, and ventricular fibrillation.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Shelter from Cold',
          detail: 'Move the patient into a warm, dry room or shielded shelter.',
        },
        {
          step: 2,
          title: 'Remove Wet Clothing',
          detail: 'Strip off wet garments and replace them with dry clothing, sleeping bags, and warm blankets.',
        },
        {
          step: 3,
          title: 'Insulate from Ground',
          detail: 'Place cardboard, foam pads, or thick blankets between the patient and the ground.',
        },
        {
          step: 4,
          title: 'Passive Central Rewarming',
          detail: 'Apply warm packs to the patient\'s chest and neck—never directly to the extremities.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Kangaroo Care',
          detail: 'Place an undressed hypothermic child directly against a parent\'s bare chest, covering both with warm blankets to share radiant heat.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Thermal Management',
          detail: 'Put on a warm hat, skin-to-skin kangaroo care against caregiver chest under thick blankets, call 907.',
        },
      ],
    },
    keyFacts: [
      'In severe hypothermia (<28°C), physiological shivering stops completely; this is an ominous clinical sign indicating metabolic exhaustion.',
    ],
    doNot: [
      'Do NOT vigorously rub, massage, or manipulate cold limbs (this forces cold, acidotic blood into the core, triggering ventricular fibrillation).',
      'Do NOT use direct fires, radiant heaters, or boiling water directly against skin.',
      'Do NOT administer alcoholic beverages.',
    ],
    visualSpecs:
      'Diagram: Patient fully insulated in thermal layers with insulated ground padding and head protection.',
    iconType: 'hypothermia',
  },
  {
    id: 'snakebite',
    title: 'Snake Envenomation',
    shortTitle: 'Snakebite',
    amharic: 'የእባብ ንክሻ የመጀመሪያ እርዳታ',
    severity: 'Critical',
    overview:
      'Subcutaneous or intramuscular venom injection by a venomous snake, causing rapid local tissue necrosis, systemic coagulopathy, hemotoxicity, or descending neuromuscular paralysis.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Enforce Complete Rest',
          detail: 'Keep the patient completely still to minimize lymph flow and systemic absorption of venom.',
        },
        {
          step: 2,
          title: 'Remove Constrictive Items',
          detail: 'Immediately remove rings, bracelets, and footwear from the bitten extremity before severe edema develops.',
        },
        {
          step: 3,
          title: 'Immobilize the Limb',
          detail: 'Splint the limb and maintain it positioned at or slightly below the level of the heart.',
        },
        {
          step: 4,
          title: 'Activate Emergency Services',
          detail: 'Transport immediately to a facility equipped with targeted antivenom.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Rapid Pediatric Envenomation',
          detail: 'Venom spreads much faster relative to a child\'s small body mass; immobilize completely and transport to the nearest hospital immediately.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Snakebite Care',
          detail: 'Keep calm and quiet, splint limb, and transport urgently with 907 ambulance dispatch.',
        },
      ],
    },
    keyFacts: [
      'Snake venom spreads predominantly via the low-pressure lymphatic system, driven by skeletal muscle contraction—not through arterial circulation.',
      'Photographing the snake from a safe distance (without risking a second bite) helps clinicians select the correct species-specific antivenom.',
    ],
    doNot: [
      'Do NOT incise or cut across the fang puncture wounds with razor blades.',
      'Do NOT attempt to suck out venom orally or with mechanical suction extractors.',
      'Do NOT apply arterial tourniquets (this causes localized tissue gangrene).',
      'Do NOT apply ice or cryotherapy.',
    ],
    visualSpecs:
      'Diagram: Immobilized lower extremity supported by a rigid splint, with crossed-out warnings against cutting or oral suction.',
    iconType: 'snakebite',
  },
  {
    id: 'asthma',
    title: 'Acute Bronchospastic Asthma Exacerbation',
    shortTitle: 'Asthma Attack',
    amharic: 'የአስም መነሳት (Asthma Attack)',
    severity: 'High',
    overview:
      'Hyperreactive constriction of bronchial smooth muscle combined with mucosal edema and hypersecretion, resulting in severe expiratory airflow limitation and audible wheezing.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Upright Positioning',
          detail: 'Seat the patient leaning slightly forward with arms supported (tripod position).',
        },
        {
          step: 2,
          title: 'Access Rescue Inhaler',
          detail: 'Obtain their fast-acting bronchodilator (e.g., Albuterol/Salbutamol, typically in a blue canister).',
        },
        {
          step: 3,
          title: 'Administer 4 Puffs',
          detail: 'Deliver 1 puff every 60 seconds (up to 4 puffs total), directing them to hold their breath for 4–10 seconds after each inhalation.',
        },
        {
          step: 4,
          title: 'Call 907',
          detail: 'If symptoms do not resolve after 4 minutes, call emergency services and continue administering 1 puff every minute until assistance arrives.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Inhaler Spacer',
          detail: 'Always deliver the medication through a spacer device fitted with an airtight face mask.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Wheezing Protocol',
          detail: 'Keep seated upright in caregiver arms, apply spacer with mask, call 907 immediately.',
        },
      ],
    },
    keyFacts: [
      'Sudden disappearance of audible wheezing in a severely dyspneic patient (a "silent chest") signals critical respiratory muscle exhaustion and near-total airway occlusion.',
    ],
    doNot: [
      'Do NOT force the patient to lie flat on their back.',
      'Do NOT apply cold wet compresses to the chest.',
    ],
    visualSpecs:
      'Diagram: Patient in the tripod position (seated, leaning forward) inhaling from an albuterol canister fitted with a spacer.',
    iconType: 'asthma',
  },
  {
    id: 'nosebleed',
    title: 'Epistaxis (Nosebleed)',
    shortTitle: 'Nosebleed (Epistaxis)',
    amharic: 'የአፍንጫ ደም መፍሰስ (Epistaxis)',
    severity: 'Moderate',
    overview:
      'Vascular rupture within the nasal mucosa, most frequently originating from the Kiesselbach’s plexus on the anterior nasal septum.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Sit Upright',
          detail: 'Keep the patient seated upright to lower nasal venous pressure.',
        },
        {
          step: 2,
          title: 'Lean Forward',
          detail: 'Tilt the head slightly forward so blood drains out through the nares rather than down the posterior pharynx.',
        },
        {
          step: 3,
          title: 'Pinch the Ala',
          detail: 'Firmly pinch the soft cartilaginous part of the nose below the nasal bones continuously for 10–15 minutes without releasing.',
        },
        {
          step: 4,
          title: 'Mouth Breathing',
          detail: 'Breathe exclusively through the mouth while pressure is maintained.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Child Nosebleed Technique',
          detail: 'Seat the child on an adult’s lap, tilt them forward, and gently compress the soft lower nose for 5–10 minutes.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Nosebleed Care',
          detail: 'Support infant forward-leaning on lap, apply gentle pressure on nostrils for 5 minutes; seek clinical checkup.',
        },
      ],
    },
    keyFacts: [
      'Swallowing drained blood causes acute gastric irritation, inducing severe nausea and vomiting.',
    ],
    doNot: [
      'Do NOT tilt the head backward (this diverts blood into the esophagus and airway).',
      'Do NOT pack tissues, cotton balls, or dry paper into the nasal cavity.',
    ],
    visualSpecs:
      'Diagram: Forward-leaning posture with firm digital compression applied across the anterior soft nose.',
    iconType: 'nosebleed',
  },
  {
    id: 'eye-splash',
    title: 'Ocular Chemical Exposure',
    shortTitle: 'Chemical Eye Splash',
    amharic: 'የዓይን ኬሚካል መርጨት',
    severity: 'High',
    overview:
      'Direct contact of caustic acids or alkalis with the conjunctiva and cornea, causing rapid chemical burns and potential permanent blindness.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Immediate Irrigation',
          detail: 'Flush the exposed eye with a steady stream of clean, lukewarm water or normal saline continuously for 15–20 minutes.',
        },
        {
          step: 2,
          title: 'Head Tilting',
          detail: 'Tilt the head toward the affected side so runoff fluid does not contaminate the uninjured eye.',
        },
        {
          step: 3,
          title: 'Retract Eyelids',
          detail: 'Hold the eyelids wide open with clean fingers to flush the conjunctival fornices thoroughly.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Eye Flushing',
          detail: 'Wrap the child securely in a blanket (swaddle) to control limb movement while steadily flushing the eye with saline.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Eye Irrigation',
          detail: 'Hold infant steady, irrigate eye gently with sterile saline or clean water for 15 minutes, transport to emergency immediately.',
        },
      ],
    },
    keyFacts: [
      'Alkaline chemical exposures (lye, bleach, wet cement) are more dangerous than acidic exposures because they cause liquefactive necrosis, penetrating deeply into ocular tissues.',
    ],
    doNot: [
      'Do NOT allow the patient to rub or press on the injured eye.',
      'Do NOT instill neutralizing chemicals, vinegar, or medicated drops into the eye.',
    ],
    visualSpecs:
      'Diagram: Head tilted sideways under a running water source with fingers holding the upper and lower eyelids open.',
    iconType: 'eye-splash',
  },
  {
    id: 'shock',
    title: 'Systemic Circulatory Shock',
    shortTitle: 'Circulatory Shock',
    amharic: 'የደም ዝውውር መዛባት (Shock)',
    severity: 'Critical',
    overview:
      'Widespread hypoperfusion of tissues where the cardiovascular system fails to deliver sufficient oxygen to meet cellular metabolic demands, leading to irreversible organ failure if uncorrected.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Address Underlying Cause',
          detail: 'Control external bleeding, dress wounds, and maintain scene safety.',
        },
        {
          step: 2,
          title: 'Leg Elevation',
          detail: 'Lay the patient flat on their back and elevate their lower extremities 20–30 cm (8–12 inches), provided there are no pelvic, spinal, or lower extremity fractures.',
        },
        {
          step: 3,
          title: 'Thermal Management',
          detail: 'Cover the patient with blankets to prevent heat loss.',
        },
        {
          step: 4,
          title: 'Call 907',
          detail: 'Summon advanced emergency life support immediately.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Shock Care',
          detail: 'Pediatric shock develops rapidly; swaddle to prevent hypothermia, keep flat, and gently elevate the legs.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Shock Protocol',
          detail: 'Keep infant warm, check capillary refill and pulse, hold flat with legs slightly elevated, call 907.',
        },
      ],
    },
    keyFacts: [
      'Diaphoretic pale skin, delayed capillary refill (>2 seconds), and a weak, rapid pulse are early clinical indicators of uncompensated shock.',
    ],
    doNot: [
      'Do NOT administer oral food or water.',
      'Do NOT elevate the legs if head, neck, spine, or pelvic trauma is suspected.',
    ],
    visualSpecs:
      'Diagram: Supine patient covered by a blanket with legs elevated on a 30 cm support wedge.',
    iconType: 'shock',
  },
  {
    id: 'spinal-injury',
    title: 'Acute Cervical & Spinal Cord Injury',
    shortTitle: 'Spinal & Neck Injury',
    amharic: 'የአንገት እና የጀርባ አጥንት ጉዳት',
    severity: 'Critical',
    overview:
      'Structural fracture or dislocation of vertebral segments caused by blunt force trauma, carrying a high risk of transecting or contusing the spinal cord and causing permanent quadriplegia or death.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Command Immobility',
          detail: 'Instruct the patient to stay completely still; warn them not to shake or nod their head.',
        },
        {
          step: 2,
          title: 'Manual In-Line Stabilization',
          detail: 'Kneel at the patient’s head, placing both hands securely along the lateral sides of their skull to prevent rotation, flexion, or extension.',
        },
        {
          step: 3,
          title: 'Call 907',
          detail: 'Explicitly notify emergency dispatchers of suspected spinal trauma.',
        },
        {
          step: 4,
          title: 'Airway Management (Jaw-Thrust)',
          detail: 'If artificial respiration is required, use the jaw-thrust maneuver without extending the neck.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Car Seat Immobilization',
          detail: 'If an infant or toddler is involved in a vehicular collision while restrained in a car seat, do not remove them from the seat; keep them immobilized within it until paramedics arrive.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Spinal Stabilization',
          detail: 'Maintain head and spine in neutral position on flat firm surface or within car seat; do not tilt neck.',
        },
      ],
    },
    keyFacts: [
      'Any secondary manipulation or twisting of an unstable cervical fracture can sever the spinal cord, causing permanent paralysis or fatal diaphragmatic denervation.',
    ],
    doNot: [
      'Do NOT bend, twist, or tilt the patient\'s head or neck.',
      'Do NOT remove a motorcycle or sports helmet unless the airway is fully obstructed and cannot be managed otherwise.',
    ],
    visualSpecs:
      'Diagram: Rescuer kneeling at the patient’s head, providing steady two-handed manual in-line cervical stabilization.',
    iconType: 'spinal-injury',
  },
  {
    id: 'drowning',
    title: 'Drowning Resuscitation',
    shortTitle: 'Near Drowning',
    amharic: 'በውሃ የመስጠም አደጋ እርዳታ',
    severity: 'Critical',
    overview:
      'Primary respiratory impairment resulting from submersion or immersion in liquid, causing acute asphyxiation, surfactant washout, alveolar collapse, and hypoxic cardiac arrest.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Extract from Water',
          detail: 'Move the victim to dry land safely without placing yourself at risk.',
        },
        {
          step: 2,
          title: 'Deliver 5 Initial Rescue Breaths',
          detail: 'If the patient is apneic, open the airway and give 5 rescue breaths first to reoxygenate hypoxic tissues.',
        },
        {
          step: 3,
          title: 'Initiate Standard CPR',
          detail: 'Proceed with cycles of 30 chest compressions followed by 2 rescue breaths (30:2).',
        },
        {
          step: 4,
          title: 'Call 907',
          detail: 'Call an ambulance immediately and obtain an AED.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Drowning CPR',
          detail: 'Deliver 5 rescue breaths, perform 1 minute of CPR, and then call 907 if alone.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Submersion Protocol',
          detail: 'Clear mouth, deliver 5 gentle puffs covering mouth and nose, perform 1 minute of 30:2 CPR, call 907.',
        },
      ],
    },
    keyFacts: [
      'The primary pathophysiological insult in submersion is severe hypoxemia; therefore, resuscitation protocols prioritize rescue ventilations over compressions at the start.',
    ],
    doNot: [
      'Do NOT waste time attempting to pump water out of the lungs or abdomen using abdominal thrusts.',
      'Do NOT enter the water if you are not trained in open-water rescue.',
    ],
    visualSpecs:
      'Diagram: Supine patient on dry ground receiving 5 initial rescue ventilations prior to chest compressions.',
    iconType: 'drowning',
  },
  {
    id: 'anaphylaxis',
    title: 'Anaphylaxis (Severe Systemic Allergic Reaction)',
    shortTitle: 'Anaphylaxis (Severe Allergy)',
    amharic: 'ከባድ የአለርጂ ድንጋጤ (Anaphylaxis)',
    severity: 'Critical',
    overview:
      'A severe, rapid multi-system Type-I hypersensitivity reaction that triggers sudden laryngeal edema, acute bronchospasm, and profound vasodilatory shock.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Prepare Epinephrine Auto-Injector',
          detail: 'Remove the safety release cap from the auto-injector (e.g., EpiPen).',
        },
        {
          step: 2,
          title: 'Inject into Anterolateral Thigh',
          detail: 'Firmly press the injector into the outer middle thigh muscle (can be administered through clothing) until it clicks; hold firmly in place for 3 to 5 seconds.',
        },
        {
          step: 3,
          title: 'Massage the Area',
          detail: 'Massage the injection site for 10 seconds to enhance systemic uptake.',
        },
        {
          step: 4,
          title: 'Call 907',
          detail: 'Request an emergency ambulance immediately; a second dose may be required after 5–15 minutes if symptoms persist.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Auto-Injector',
          detail: 'Use a pediatric auto-injector (EpiPen Jr, 0.15 mg); hold the child\'s leg firmly during injection to prevent needle laceration.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Allergic Emergency',
          detail: 'Administer pediatric auto-injector if prescribed, hold thigh firmly, call 907 instantly.',
        },
      ],
    },
    keyFacts: [
      'Epinephrine is the only first-line medication proven to halt and reverse airway edema and vascular collapse during anaphylaxis.',
    ],
    doNot: [
      'Do NOT allow the patient to stand or walk (this can trigger sudden pulseless electrical activity and cardiac arrest).',
      'Do NOT inject epinephrine into hands, feet, or buttocks.',
    ],
    visualSpecs:
      'Diagram: Perpendicular 90° injection of an auto-injector into the vastus lateralis (outer mid-thigh).',
    iconType: 'anaphylaxis',
  },
  {
    id: 'chest-wound',
    title: 'Sucking Chest Wound (Open Pneumothorax)',
    shortTitle: 'Open Chest Wound',
    amharic: 'ክፍት የደረት ቁስል (Open Pneumothorax)',
    severity: 'Critical',
    overview:
      'A full-thickness penetrating wound of the thoracic wall that allows air to enter the pleural space with each inspiration, leading to progressive lung collapse and tension pneumothorax.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Seal the Wound',
          detail: 'Cover the defect immediately with a sterile, non-porous plastic barrier (plastic wrap or clean foil).',
        },
        {
          step: 2,
          title: 'Apply a 3-Sided Dressing',
          detail: 'Tape down 3 edges of the plastic dressing while leaving the 4th edge untaped to create a one-way flutter valve (permitting air to escape during expiration while preventing ingress during inspiration).',
        },
        {
          step: 3,
          title: 'Call 907 & Position',
          detail: 'Call 907. Position the patient tilted toward the injured side to keep the uninjured lung fully expanded.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Chest Seal',
          detail: 'Apply the same 3-sided occlusive dressing technique calibrated to the child\'s smaller thoracic surface area.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Chest Defect',
          detail: 'Apply small occlusive flutter-valve seal, keep head and chest slightly elevated, emergency transfer.',
        },
      ],
    },
    keyFacts: [
      'A sucking sound or blood bubbling from the wound during inhalation confirms an open pneumothorax.',
    ],
    doNot: [
      'Do NOT seal all 4 sides of the dressing airtight without a functional one-way valve (this converts an open pneumothorax into a fatal tension pneumothorax).',
    ],
    visualSpecs:
      'Diagram: Occlusive dressing taped along 3 borders over a thoracic wound, with one open border acting as an air flutter valve.',
    iconType: 'chest-wound',
  },
  {
    id: 'evisceration',
    title: 'Abdominal Evisceration',
    shortTitle: 'Abdominal Evisceration',
    amharic: 'የሆድ ዕቃ መውጣት አደጋ (Evisceration)',
    severity: 'Critical',
    overview:
      'Severe traumatic disruption of the abdominal wall musculature resulting in protrusion of internal visceral organs (such as loops of the small intestine) outside the peritoneal cavity.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Flex the Knees',
          detail: 'Lay the patient supine and bend their knees upward to relieve intra-abdominal muscle tension.',
        },
        {
          step: 2,
          title: 'Moist Sterile Dressing',
          detail: 'Saturate clean gauze, towels, or dressings with sterile water or clean saline, and drape them loosely over the exposed viscera.',
        },
        {
          step: 3,
          title: 'Occlusive Moisture Barrier',
          detail: 'Cover the moist dressing loosely with sterile plastic cling wrap to prevent heat loss and desiccation.',
        },
        {
          step: 4,
          title: 'Call 907',
          detail: 'Transport immediately for emergency surgical intervention.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Abdominal Trauma',
          detail: 'Keep the child calm and still in the knees-up supine position, covering exposed bowel with warm, moist sterile dressings.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Evisceration',
          detail: 'Keep supine with knees bent, apply warm saline-moistened sterile pads, cover loosely with cling wrap, call 907.',
        },
      ],
    },
    keyFacts: [
      'Exposed visceral membranes dehydrate rapidly when exposed to air, leading to tissue ischemia and bowel necrosis.',
    ],
    doNot: [
      'Do NOT attempt to push protruding organs or bowel back into the abdominal cavity.',
      'Do NOT apply dry gauze or dry cloth directly onto exposed viscera (fibers will adhere to the serosa).',
    ],
    visualSpecs:
      'Diagram: Supine patient with flexed knees and exposed viscera protected by moist dressings covered with plastic film.',
    iconType: 'evisceration',
  },
  {
    id: 'diabetic-emergency',
    title: 'Diabetic Emergencies (Severe Hypoglycemia)',
    shortTitle: 'Diabetic Emergencies',
    amharic: 'የስኳር ድንገተኛ መቀነስ (Hypoglycemia)',
    severity: 'High',
    overview:
      'A severe drop in systemic blood glucose below 70 mg/dL (3.9 mmol/L), depriving cerebral tissue of essential fuel and leading to neuroglycopenic symptoms, convulsions, and coma.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Apply the 15-15 Rule',
          detail: 'If the patient is alert and able to swallow, administer 15 grams of fast-acting simple carbohydrates (half a glass of fruit juice, non-diet soda, or 3–4 glucose tablets).',
        },
        {
          step: 2,
          title: 'Wait 15 Minutes',
          detail: 'Recheck symptoms or blood glucose after 15 minutes; if still below 70 mg/dL, provide an additional 15 grams of fast-acting sugar.',
        },
        {
          step: 3,
          title: 'Consolidate with Food',
          detail: 'Once symptoms improve, provide a complex carbohydrate snack (bread, crackers) to stabilize glycemic levels.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Hypoglycemia',
          detail: 'If unable to safely swallow, rub concentrated glucose gel or honey directly onto the inner buccal mucosa (inside the cheek).',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Low Blood Sugar',
          detail: 'Rub small amounts of glucose syrup inside cheek; if lethargic or seizing, call 907 immediately.',
        },
      ],
    },
    keyFacts: [
      'Severe hypoglycemia can cause rapid neurocognitive decline, loss of consciousness, and permanent brain injury within minutes if untreated.',
    ],
    doNot: [
      'Do NOT force fluids or solids down the throat of an unconscious or stuporous patient.',
      'Do NOT administer insulin during an acute suspected low blood sugar event (insulin will worsen hypoglycemia and can be fatal).',
    ],
    visualSpecs:
      'Diagram: Conscious patient drinking fruit juice, alongside application of oral glucose gel onto the inner cheek.',
    iconType: 'diabetic-emergency',
  },
  {
    id: 'tooth-avulsion',
    title: 'Tooth Avulsion (Knocked-Out Tooth)',
    shortTitle: 'Knocked-Out Tooth',
    amharic: 'የተነቀለ ጥርስ የመጀመሪያ እርዳታ',
    severity: 'Moderate',
    overview:
      'Complete traumatic displacement of an intact tooth from its alveolar socket. Re-implantation within a 30 to 60-minute window yields the highest rate of periodontal ligament survival and tooth retention.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Handle by Crown Only',
          detail: 'Pick up the tooth solely by the white anatomical crown; do not touch the root surfaces.',
        },
        {
          step: 2,
          title: 'Gentle Rinse',
          detail: 'If contaminated, rinse the tooth briefly (under 10 seconds) in cold milk or saline. Do not scrub.',
        },
        {
          step: 3,
          title: 'Immediate Re-implantation',
          detail: 'Gently re-insert the tooth into its alveolar socket and have the patient bite down softly on a clean cloth to maintain its position.',
        },
        {
          step: 4,
          title: 'Transport Medium',
          detail: 'If re-implantation is not feasible, place the tooth in a cup of cold milk (or Hank\'s Balanced Salt Solution) and see a dentist within 30–60 minutes.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Primary (Baby) Teeth Warning',
          detail: 'Do NOT re-implant an avulsed baby tooth, as this can damage the underlying permanent tooth germ. See a pediatric dentist promptly.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Dental Trauma',
          detail: 'Check for mouth bleeding, comfort infant, do not replace baby tooth, visit pediatric dentist.',
        },
      ],
    },
    keyFacts: [
      'Periodontal ligament cells residing on the root surface remain viable for several hours when preserved in cold milk.',
    ],
    doNot: [
      'Do NOT scrub, scrape, or sterilize the tooth root with soap or alcohol.',
      'Do NOT wrap the tooth in dry tissue or paper towels.',
    ],
    visualSpecs:
      'Diagram: Handling an avulsed tooth by the crown only and storing it submerged in a glass of cold milk.',
    iconType: 'tooth-avulsion',
  },
  {
    id: 'electrical-shock',
    title: 'Electrical Shock & Electrocution Injury',
    shortTitle: 'Electrical Shock',
    amharic: 'የኤሌክትሪክ ንዝረት አደጋ',
    severity: 'Critical',
    overview:
      'The passage of high- or low-voltage electrical current through biological tissue, disrupting cardiac electrical conduction (often triggering ventricular fibrillation) and producing severe internal thermal destruction along the pathway of conduction.',
    steps: {
      adults: [
        {
          step: 1,
          title: 'Isolate Power Source',
          detail: 'Shut off the master circuit breaker or power switch before approaching or touching the victim.',
        },
        {
          step: 2,
          title: 'Separate with Non-Conductive Material',
          detail: 'If the power cannot be disabled, detach the victim using dry, non-conductive materials (dry wooden broom handle, fiberglass rod, plastic pole).',
        },
        {
          step: 3,
          title: 'Assess Vital Signs',
          detail: 'Once isolated and safe, check responsiveness and breathing; begin CPR and use an AED immediately if non-responsive and pulseless.',
        },
        {
          step: 4,
          title: 'Dress Burn Sites',
          detail: 'Cover both the entrance and exit electrical burn wounds with dry, sterile dressings.',
        },
      ],
      children: [
        {
          step: 1,
          title: 'Pediatric Electrical Burns',
          detail: 'For young children who bite electrical cords, disconnect the supply immediately, check the airway and mouth for severe burns, and call 907.',
        },
      ],
      infants: [
        {
          step: 1,
          title: 'Infant Electrical Contact',
          detail: 'Disconnect source, examine breathing and oral cavity, begin infant CPR if breathless, emergency transfer.',
        },
      ],
    },
    keyFacts: [
      'High-voltage utility lines can energize the surrounding earth within a 10-meter radius; keep bystanders outside this perimeter.',
    ],
    doNot: [
      'Do NOT touch an energized patient with your bare hands or conductive items.',
      'Do NOT use damp wood or metallic poles to move live wires.',
    ],
    visualSpecs:
      'Diagram: Rescuer using a dry wooden pole to separate a victim from an electrical source, followed by emergency CPR.',
    iconType: 'electrical-shock',
  },
];
