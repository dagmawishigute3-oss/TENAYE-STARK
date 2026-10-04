/**
 * Tenaye Health Tips Dataset
 * 40 Evidence-Based Health & Wellness Categories with 160 Comprehensive Health Tips
 * Backed by peer-reviewed research, WHO, CDC, AHA, NIH, FDA, and global clinical guidelines.
 * Each tip features a direct, real authoritative resource URL for the 'View Source' feature.
 */

export interface HealthTipItem {
  id: string
  title: string
  desc: string
  actions: string[]
  evidence: {
    source: string
    year: string
    url: string
  }
  category: string
  categoryNumber: number
}

export interface HealthTipCategory {
  id: string
  number: number
  name: string
  description: string
  tips: HealthTipItem[]
}

export const HEALTH_TIP_CATEGORIES: HealthTipCategory[] = [
  {
    id: "general-health",
    number: 1,
    name: "General Health",
    description:
      "Fundamental evidence-based health practices for overall wellness, routine monitoring, and chronic disease prevention.",
    tips: [
      {
        id: "tip-gen-1",
        title: "Regular Health Check-ups",
        desc: "Annual medical exams detect health issues early and establish baseline health metrics for proactive long-term wellness.",
        actions: [
          "Schedule yearly physical examination with primary doctor.",
          "Get routine blood work to monitor key health indicators.",
          "Discuss any health concerns or changes with your doctor.",
          "Update your doctor on family medical history changes.",
          "Keep a personal health log of symptoms and conditions.",
        ],
        evidence: {
          source:
            "American Academy of Family Physicians - Clinical Preventive Services Guidelines",
          year: "2023",
          url: "https://www.aafp.org/family-physician/patient-care/clinical-recommendations/cps-clinical-preventive-services.html",
        },
        category: "General Health",
        categoryNumber: 1,
      },
      {
        id: "tip-gen-2",
        title: "Maintaining Healthy Weight",
        desc: "Maintaining a healthy body weight reduces risk of chronic metabolic and cardiovascular diseases while improving quality of life.",
        actions: [
          "Calculate and monitor your BMI regularly.",
          "Set realistic weight goals based on your body type.",
          "Combine balanced nutrition with regular physical activity.",
          "Track your food intake and daily physical activity.",
          "Seek professional guidance if struggling with weight management.",
        ],
        evidence: {
          source:
            "National Institutes of Health - Healthy Weight and Physical Activity Guidelines",
          year: "2023",
          url: "https://www.nhlbi.nih.gov/health/educational/lose_wt/index.htm",
        },
        category: "General Health",
        categoryNumber: 1,
      },
      {
        id: "tip-gen-3",
        title: "Safe Medication Use",
        desc: "Proper medication management ensures clinical effectiveness, prevents harmful drug interactions, and avoids toxicity.",
        actions: [
          "Keep an updated list of all medications and supplements.",
          "Take medications exactly as prescribed by clinicians.",
          "Never share prescription medications with others.",
          "Store medications properly and check expiration dates.",
          "Inform all healthcare providers of your complete medication list.",
        ],
        evidence: {
          source:
            "U.S. Food and Drug Administration (FDA) - Buying and Using Medicine Safely",
          year: "2024",
          url: "https://www.fda.gov/drugs/resources-drugs/buying-using-medicine-safely",
        },
        category: "General Health",
        categoryNumber: 1,
      },
      {
        id: "tip-gen-4",
        title: "Managing Chronic Conditions",
        desc: "Proactive management of chronic diseases prevents severe secondary complications, hospitalizations, and improves functional longevity.",
        actions: [
          "Follow your clinical treatment plan consistently.",
          "Monitor symptoms and track changes over time.",
          "Attend all scheduled medical appointments.",
          "Communicate openly with your healthcare team.",
          "Join peer support groups for your specific condition.",
        ],
        evidence: {
          source: "CDC - Chronic Disease Prevention and Health Promotion",
          year: "2024",
          url: "https://www.cdc.gov/chronicdisease/about/index.htm",
        },
        category: "General Health",
        categoryNumber: 1,
      },
    ],
  },
  {
    id: "nutrition-diet",
    number: 2,
    name: "Nutrition & Diet",
    description:
      "Evidence-based dietary habits for balanced macronutrients, whole foods, and metabolic vitality.",
    tips: [
      {
        id: "tip-1-1",
        title: "Balanced Macronutrients",
        desc: "Achieving an optimal distribution of carbohydrates, proteins, and essential fats stabilizes cellular energy and supports physiological homeostasis.",
        actions: [
          "Include a mix of complex carbohydrates, lean proteins, and healthy fats in every meal.",
          "Monitor portion sizes using visual guides like plates and palms.",
          "Limit highly processed foods and added sugars.",
          "Stay consistent with regular meal timings to stabilize blood sugar.",
        ],
        evidence: {
          source:
            "Harvard T.H. Chan School of Public Health - The Healthy Eating Plate",
          year: "2023",
          url: "https://www.hsph.harvard.edu/nutritionsource/healthy-eating-plate/",
        },
        category: "Nutrition & Diet",
        categoryNumber: 2,
      },
      {
        id: "tip-1-2",
        title: "Whole Food Integration",
        desc: "Unrefined, nutrient-dense whole foods provide essential micronutrients, polyphenols, and dietary fiber vital for optimal metabolic resilience.",
        actions: [
          "Prioritize fresh fruits and colorful vegetables daily.",
          "Choose whole-grain alternatives over refined flours.",
          "Incorporate healthy fats from nuts, seeds, and avocados.",
          "Minimize artificial additives and preservatives.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Healthy Diet Fact Sheet No. 394",
          year: "2024",
          url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
        },
        category: "Nutrition & Diet",
        categoryNumber: 2,
      },
      {
        id: "tip-1-3",
        title: "Smart Snacking",
        desc: "Mindful snack selection between major meals sustains physical stamina, stabilizes cognitive focus, and curbs sudden blood glucose drops.",
        actions: [
          "Choose nutrient-dense options like Greek yogurt or fresh fruit.",
          "Portion snacks beforehand instead of eating from the package.",
          "Pair carbohydrates with protein for sustained energy.",
          "Avoid sugary or sodium-heavy processed snacks.",
        ],
        evidence: {
          source:
            "Academy of Nutrition and Dietetics - Smart Snacking for Adults",
          year: "2023",
          url: "https://www.eatright.org/food/planning/smart-snacking/smart-snacking-tips-for-adults",
        },
        category: "Nutrition & Diet",
        categoryNumber: 2,
      },
      {
        id: "tip-1-4",
        title: "Mindful Eating Habits",
        desc: "Cultivating awareness while eating optimizes cephalic-phase digestion, supports natural satiety signaling, and prevents chronic gastrointestinal distress.",
        actions: [
          "Eat slowly and chew thoroughly to aid digestion.",
          "Eliminate screens and distractions during meal times.",
          "Listen to physical hunger and fullness cues.",
          "Enjoy food without guilt or strict restriction mindsets.",
        ],
        evidence: {
          source: "Harvard Health Publishing - Mindful Eating and Digestion",
          year: "2023",
          url: "https://www.health.harvard.edu/staying-healthy/mindful-eating",
        },
        category: "Nutrition & Diet",
        categoryNumber: 2,
      },
    ],
  },
  {
    id: "exercise-fitness",
    number: 3,
    name: "Exercise & Fitness",
    description:
      "Physiological guidelines for cardiovascular health, muscle conditioning, and joint resilience.",
    tips: [
      {
        id: "tip-2-1",
        title: "Cardiovascular Endurance",
        desc: "Consistent aerobic conditioning enhances left-ventricular cardiac efficiency, reduces arterial stiffness, and bolsters maximal oxygen uptake.",
        actions: [
          "Engage in moderate aerobic activity like brisk walking or cycling.",
          "Incorporate high-intensity intervals safely based on fitness levels.",
          "Track weekly aerobic minutes to meet health guidelines.",
          "Gradually increase workout duration and intensity.",
        ],
        evidence: {
          source:
            "American Heart Association - Guidelines for Physical Activity in Adults",
          year: "2024",
          url: "https://www.heart.org/en/healthy-living/fitness/fitness-basics/aha-recs-for-physical-activity-in-adults",
        },
        category: "Exercise & Fitness",
        categoryNumber: 3,
      },
      {
        id: "tip-2-2",
        title: "Strength Training",
        desc: "Resistance stimulus triggers muscular hypertrophy, safeguards bone mineral density, and prevents age-related sarcopenia.",
        actions: [
          "Perform resistance exercises targeting major muscle groups.",
          "Use bodyweight, resistance bands, or free weights.",
          "Allow adequate rest days between intense strength sessions.",
          "Focus on proper form over heavy lifting.",
        ],
        evidence: {
          source:
            "American College of Sports Medicine (ACSM) - Physical Activity & Resistance Guidelines",
          year: "2023",
          url: "https://www.acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines",
        },
        category: "Exercise & Fitness",
        categoryNumber: 3,
      },
      {
        id: "tip-2-3",
        title: "Flexibility & Mobility",
        desc: "Sustaining joint range of motion reduces mechanical strain on spinal vertebrae and significantly lowers soft-tissue injury risk.",
        actions: [
          "Include daily dynamic stretching before physical activities.",
          "Perform static stretches after workouts to lengthen muscles.",
          "Practice yoga or Pilates to enhance joint mobility.",
          "Avoid pushing stretches into sharp pain.",
        ],
        evidence: {
          source: "Mayo Clinic - Stretching and Flexibility Guide",
          year: "2023",
          url: "https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/stretching/art-20047931",
        },
        category: "Exercise & Fitness",
        categoryNumber: 3,
      },
      {
        id: "tip-2-4",
        title: "Active Recovery",
        desc: "Low-intensity recovery activities accelerate blood clearance of metabolic byproducts and facilitate restorative myofibrillar repair.",
        actions: [
          "Take light walks on rest days to promote blood flow.",
          "Practice foam rolling to release tight muscle tissue.",
          "Prioritize gentle movement over complete physical inactivity.",
          "Listen to signs of physical fatigue and overtraining.",
        ],
        evidence: {
          source:
            "American Council on Exercise (ACE) - Active Recovery Protocols",
          year: "2023",
          url: "https://www.acefitness.org/resources/everyone/blog/6575/active-recovery-days-what-they-are-and-how-to-use-them/",
        },
        category: "Exercise & Fitness",
        categoryNumber: 3,
      },
    ],
  },
  {
    id: "sleep-rest",
    number: 4,
    name: "Sleep & Rest",
    description:
      "Circadian entrainment and restorative sleep architectures that foster cellular healing and cognitive restoration.",
    tips: [
      {
        id: "tip-3-1",
        title: "Circadian Rhythm Optimization",
        desc: "Aligning behavioral patterns with natural solar cycles regulates melatonin secretion, cortisol curves, and neuroendocrine equilibrium.",
        actions: [
          "Maintain a consistent sleep and wake schedule daily.",
          "Expose yourself to natural sunlight early in the morning.",
          "Dim indoor lighting an hour before bedtime.",
          "Avoid erratic sleep schedules on weekends.",
        ],
        evidence: {
          source:
            "National Sleep Foundation - Circadian Entrainment Guidelines",
          year: "2023",
          url: "https://www.sleepfoundation.org/circadian-rhythm",
        },
        category: "Sleep & Rest",
        categoryNumber: 4,
      },
      {
        id: "tip-3-2",
        title: "Bedtime Environment",
        desc: "Optimizing bedroom acoustic, thermal, and ambient lighting properties minimizes sleep fragmentation and promotes deep slow-wave sleep.",
        actions: [
          "Keep the bedroom cool, dark, and quiet.",
          "Invest in a supportive mattress and comfortable pillows.",
          "Remove phones, laptops, and televisions from the sleeping area.",
          "Use white noise machines if external sounds disrupt rest.",
        ],
        evidence: {
          source: "Sleep Foundation - Bedroom Environment for Restful Sleep",
          year: "2024",
          url: "https://www.sleepfoundation.org/bedroom-environment",
        },
        category: "Sleep & Rest",
        categoryNumber: 4,
      },
      {
        id: "tip-3-3",
        title: "Pre-Sleep Routine",
        desc: "A calming wind-down ritual triggers parasympathetic nervous tone, lowering sympathetic overdrive and easing transition into restful sleep.",
        actions: [
          "Engage in calming activities like reading or journaling.",
          "Avoid heavy meals, caffeine, and alcohol close to bedtime.",
          "Practice relaxation breathing exercises to unwind.",
          "Take a warm bath or shower before bed.",
        ],
        evidence: {
          source: "Sleep Foundation - Developing a Healthy Bedtime Routine",
          year: "2023",
          url: "https://www.sleepfoundation.org/bedtime-routine",
        },
        category: "Sleep & Rest",
        categoryNumber: 4,
      },
      {
        id: "tip-3-4",
        title: "Sleep Quality Tracking",
        desc: "Self-monitoring sleep latency and subjective restoration helps detect early symptoms of sleep apnea and chronic insomnia.",
        actions: [
          "Monitor sleep duration and nightly wakefulness patterns.",
          "Evaluate daytime alertness and energy levels.",
          "Consult a specialist if chronic snoring or insomnia occurs.",
          "Avoid relying on sleep medication without professional guidance.",
        ],
        evidence: {
          source:
            "American Academy of Sleep Medicine - Adult Sleep Diagnostic Standards",
          year: "2023",
          url: "https://aasm.org/clinical-resources/practice-standards/practice-guidelines/",
        },
        category: "Sleep & Rest",
        categoryNumber: 4,
      },
    ],
  },
  {
    id: "hydration-water-safety",
    number: 5,
    name: "Hydration & Water Safety",
    description:
      "Systemic fluid balance, safe drinking water filtration, and electrolyte homeostasis.",
    tips: [
      {
        id: "tip-4-1",
        title: "Daily Fluid Intake",
        desc: "Adequate hydration maintains blood volume, lubricates articular cartilage, and enables renal elimination of metabolic waste products.",
        actions: [
          "Drink water consistently throughout the day.",
          "Carry a reusable water bottle as a visual reminder.",
          "Monitor hydration status by observing urine color.",
          "Increase intake during hot weather or heavy exercise.",
        ],
        evidence: {
          source: "CDC - Water and Healthier Drinks Dietary Guidelines",
          year: "2023",
          url: "https://www.cdc.gov/healthyweight/healthy_eating/water-and-healthier-drinks.html",
        },
        category: "Hydration & Water Safety",
        categoryNumber: 5,
      },
      {
        id: "tip-4-2",
        title: "Water Quality & Filtration",
        desc: "Purifying household drinking water eliminates heavy metal particulates, microbial cysts, and enteric waterborne pathogens.",
        actions: [
          "Use certified filtration systems to remove contaminants.",
          "Boil water if local safety advisories are in effect.",
          "Clean reusable water bottles and containers daily.",
          "Avoid storing water in unverified or degraded plastics.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Guidelines for Drinking-water Quality",
          year: "2024",
          url: "https://www.who.int/water_sanitation_health/publications/drinking-water-quality-guidelines-4-including-1st-addendum/en/",
        },
        category: "Hydration & Water Safety",
        categoryNumber: 5,
      },
      {
        id: "tip-4-3",
        title: "Electrolyte Balance",
        desc: "Replenishing cellular ions (sodium, potassium, magnesium) maintains neuromuscular conduction and avoids hypoosmolar conditions during exertion.",
        actions: [
          "Replenish lost electrolytes after prolonged sweating.",
          "Choose natural electrolyte sources like coconut water.",
          "Limit sugary sports drinks for casual daily activities.",
          "Salt meals appropriately based on individual health needs.",
        ],
        evidence: {
          source:
            "National Institutes of Health (NIH) - Physiology of Fluid and Electrolyte Balance",
          year: "2023",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK541123/",
        },
        category: "Hydration & Water Safety",
        categoryNumber: 5,
      },
      {
        id: "tip-4-4",
        title: "Hydration Alternatives",
        desc: "Integrating botanical infusions and water-dense whole produce diversifies hydration sources while providing bioavailable protective flavonoids.",
        actions: [
          "Infuse water with fresh fruit or herbs for flavor.",
          "Drink herbal, caffeine-free teas to vary fluid sources.",
          "Consume water-rich foods like cucumbers and watermelon.",
          "Limit sugary beverages and excessive caffeine.",
        ],
        evidence: {
          source:
            "American Heart Association - Healthy Drink Choices for Optimal Hydration",
          year: "2023",
          url: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/healthy-drinks",
        },
        category: "Hydration & Water Safety",
        categoryNumber: 5,
      },
    ],
  },
  {
    id: "healthy-cooking-meal-planning",
    number: 6,
    name: "Healthy Cooking & Meal Planning",
    description:
      "Culinary medicine methods to preserve vital nutrients, minimize foodborne hazards, and establish stress-free meal prep.",
    tips: [
      {
        id: "tip-5-1",
        title: "Weekly Meal Prep",
        desc: "Strategic advance cooking stabilizes dietary quality throughout demanding workweeks and protects against impulsive reliance on fast food.",
        actions: [
          "Plan weekly menus ahead of time to reduce food waste.",
          "Prep ingredients or batch cook meals on weekends.",
          "Stock the pantry with shelf-stable healthy staples.",
          "Keep healthy leftovers safely stored for busy days.",
        ],
        evidence: {
          source:
            "Harvard T.H. Chan School of Public Health - Meal Prep Guide for Health",
          year: "2023",
          url: "https://www.hsph.harvard.edu/nutritionsource/meal-prep/",
        },
        category: "Healthy Cooking & Meal Planning",
        categoryNumber: 6,
      },
      {
        id: "tip-5-2",
        title: "Nutrient-Preserving Cooking Methods",
        desc: "Employing gentle thermal preparation techniques retains heat-labile vitamins and prevents harmful lipid peroxidation.",
        actions: [
          "Steam or roast vegetables instead of boiling them.",
          "Use healthy oils like olive or avocado with high smoke points.",
          "Avoid overcooking foods to retain essential vitamins.",
          "Minimize deep frying and excessive processing.",
        ],
        evidence: {
          source:
            "Academy of Nutrition and Dietetics - Cooking Methods for Nutrient Preservation",
          year: "2023",
          url: "https://www.eatright.org/food/planning/meal-prep/methods-for-healthy-cooking",
        },
        category: "Healthy Cooking & Meal Planning",
        categoryNumber: 6,
      },
      {
        id: "tip-5-3",
        title: "Smart Grocery Shopping",
        desc: "Organized navigation of food markets directs purchasing toward unprocessed, nutrient-dense ingredients while filtering out deceptive packaging claims.",
        actions: [
          "Shop the perimeter of the grocery store for fresh items.",
          "Read nutrition labels and ingredient lists carefully.",
          "Avoid shopping while hungry to prevent impulse buys.",
          "Prioritize seasonal and locally grown produce.",
        ],
        evidence: {
          source:
            "U.S. Food and Drug Administration (FDA) - How to Understand Nutrition Labels",
          year: "2024",
          url: "https://www.fda.gov/food/nutrition-education-resources-materials/how-understand-and-use-nutrition-facts-label",
        },
        category: "Healthy Cooking & Meal Planning",
        categoryNumber: 6,
      },
      {
        id: "tip-5-4",
        title: "Kitchen Hygiene & Safety",
        desc: "Rigorous domestic kitchen sanitation prevents bacterial cross-contamination from Campylobacter, Salmonella, and other pathogens.",
        actions: [
          "Wash hands thoroughly before and after handling food.",
          "Use separate cutting boards for raw meats and vegetables.",
          "Store perishable foods promptly at proper refrigerator temperatures.",
          "Check expiration dates on all pantry and dairy items.",
        ],
        evidence: {
          source:
            "USDA Food Safety and Inspection Service - Four Steps to Food Safety",
          year: "2024",
          url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/cleanliness-helps-prevent-foodborne",
        },
        category: "Healthy Cooking & Meal Planning",
        categoryNumber: 6,
      },
    ],
  },
  {
    id: "active-lifestyle-mobility",
    number: 7,
    name: "Active Lifestyle & Mobility",
    description:
      "Strategies to disrupt sedentary habits, increase non-exercise physical activity, and preserve joint mobility.",
    tips: [
      {
        id: "tip-6-1",
        title: "Combating Sedentary Behavior",
        desc: "Breaking up prolonged sitting improves postprandial glucose uptake and restores healthy endothelial shear stress in vascular beds.",
        actions: [
          "Stand up and stretch every hour during desk work.",
          "Take short walking breaks throughout the workday.",
          "Use a standing desk converter if available.",
          "Opt for stairs instead of elevators when possible.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Guidelines on Physical Activity and Sedentary Behaviour",
          year: "2023",
          url: "https://www.who.int/publications/i/item/9789240015128",
        },
        category: "Active Lifestyle & Mobility",
        categoryNumber: 7,
      },
      {
        id: "tip-6-2",
        title: "Daily Step Goals",
        desc: "Accumulating regular steps throughout the day correlates with reduced all-cause mortality, enhanced cardiovascular tone, and steady weight control.",
        actions: [
          "Aim for consistent daily step counts using a tracker.",
          "Take evening family walks to increase daily activity.",
          "Walk or bike for short neighborhood errands.",
          "Park farther away from destinations to add steps.",
        ],
        evidence: {
          source:
            "National Institutes of Health (NIH) - How Many Steps a Day for Better Health",
          year: "2023",
          url: "https://www.nih.gov/news-events/nih-research-matters/how-many-steps-day-more-better",
        },
        category: "Active Lifestyle & Mobility",
        categoryNumber: 7,
      },
      {
        id: "tip-6-3",
        title: "Joint Health & Care",
        desc: "Regular low-impact kinetic loading stimulates synovial fluid circulation, nourishing articular cartilage without joint wear and tear.",
        actions: [
          "Maintain movements that lubricate and protect joints.",
          "Avoid high-impact stress on vulnerable joints without conditioning.",
          "Wear supportive footwear suited to your activities.",
          "Incorporate low-impact options like swimming or elliptical training.",
        ],
        evidence: {
          source:
            "Arthritis Foundation - Physical Activity Guidelines for Joint Preservation",
          year: "2023",
          url: "https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/exercise-and-joint-health",
        },
        category: "Active Lifestyle & Mobility",
        categoryNumber: 7,
      },
      {
        id: "tip-6-4",
        title: "Posture Awareness",
        desc: "Maintaining balanced cervical, thoracic, and lumbar alignment distributes gravitational force evenly across the skeletal framework.",
        actions: [
          "Keep screens at eye level to prevent neck strain.",
          "Sit with feet flat and back supported while working.",
          "Engage core muscles to support upright posture.",
          "Check and adjust posture periodically throughout the day.",
        ],
        evidence: {
          source: "Mayo Clinic - Back and Spinal Health Posture Guide",
          year: "2024",
          url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/multimedia/back-pain/sls-20076817",
        },
        category: "Active Lifestyle & Mobility",
        categoryNumber: 7,
      },
    ],
  },
  {
    id: "stress-management-mindfulness",
    number: 8,
    name: "Stress Management & Mindfulness",
    description:
      "Evidence-based cognitive and somatic techniques to downregulate sympathetic hyperarousal and foster inner calm.",
    tips: [
      {
        id: "tip-7-1",
        title: "Mindfulness & Meditation",
        desc: "Systematic mindfulness down-regulates amygdala reactivity and strengthens prefrontal cortical executive oversight.",
        actions: [
          "Practice deep breathing exercises for a few minutes daily.",
          "Use guided meditation apps to build a routine.",
          "Focus on the present moment during routine activities.",
          "Observe thoughts without judgment or immediate reaction.",
        ],
        evidence: {
          source:
            "National Center for Complementary and Integrative Health (NIH) - Meditation and Mindfulness Overview",
          year: "2023",
          url: "https://www.nccih.nih.gov/health/meditation-and-mindfulness-what-you-need-to-know",
        },
        category: "Stress Management & Mindfulness",
        categoryNumber: 8,
      },
      {
        id: "tip-7-2",
        title: "Time Management",
        desc: "Structured task scheduling and realistic boundary-setting prevent psychological overwhelm and chronic cognitive fatigue.",
        actions: [
          "Prioritize daily tasks to avoid overwhelming workloads.",
          "Break large projects down into smaller, manageable steps.",
          "Set healthy boundaries regarding work and personal time.",
          "Schedule regular downtime and leisure breaks.",
        ],
        evidence: {
          source:
            "American Psychological Association (APA) - Stress Reduction Techniques",
          year: "2023",
          url: "https://www.apa.org/topics/stress/tips",
        },
        category: "Stress Management & Mindfulness",
        categoryNumber: 8,
      },
      {
        id: "tip-7-3",
        title: "Emotional Expression",
        desc: "Constructively externalizing internal affect through expressive writing or open dialogue dampens autonomic nervous system reactivity.",
        actions: [
          "Journal thoughts and feelings to process daily stressors.",
          "Talk openly with trusted friends, family, or counselors.",
          "Express gratitude daily by noting positive experiences.",
          "Allow yourself to feel and accept emotions safely.",
        ],
        evidence: {
          source: "Mental Health Foundation - Talking About Your Mental Health",
          year: "2024",
          url: "https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/talking-about-your-mental-health",
        },
        category: "Stress Management & Mindfulness",
        categoryNumber: 8,
      },
      {
        id: "tip-7-4",
        title: "Physical Stress Relief",
        desc: "Somatically releasing muscular tension mitigates cortisol secretion and promotes the release of natural endorphins.",
        actions: [
          "Engage in physical exercise to release built-up tension.",
          "Listen to relaxing music or nature sounds.",
          "Spend time in green spaces and natural environments.",
          "Practice progressive muscle relaxation techniques.",
        ],
        evidence: {
          source:
            "Harvard Health Publishing - Exercising to Relax and Lower Stress",
          year: "2023",
          url: "https://www.health.harvard.edu/staying-healthy/exercising-to-relax",
        },
        category: "Stress Management & Mindfulness",
        categoryNumber: 8,
      },
    ],
  },
  {
    id: "hygiene-sanitation",
    number: 9,
    name: "Hygiene & Sanitation",
    description:
      "Essential public health measures, pathogen disruption, personal grooming, and clean living environments.",
    tips: [
      {
        id: "tip-8-1",
        title: "Handwashing Protocols",
        desc: "Mechanical hand friction with soap emulsifies lipid envelopes of viruses and flushes bacterial colonies away from skin surfaces.",
        actions: [
          "Wash hands with soap and water for at least 20 seconds.",
          "Clean hands before eating and after using the restroom.",
          "Use alcohol-based hand sanitizer when soap is unavailable.",
          "Avoid touching your face with unwashed hands.",
        ],
        evidence: {
          source: "CDC - Hand Hygiene in Community Settings Guidelines",
          year: "2024",
          url: "https://www.cdc.gov/clean-hands/about/index.html",
        },
        category: "Hygiene & Sanitation",
        categoryNumber: 9,
      },
      {
        id: "tip-8-2",
        title: "Personal Grooming",
        desc: "Consistent skin, hair, and subungual nail cleansing reduces dermatological infections and eliminates parasitic vectors.",
        actions: [
          "Maintain clean nails and trim them regularly.",
          "Practice proper oral hygiene routines twice daily.",
          "Shower regularly, especially after sweating or outdoor activity.",
          "Keep personal items like towels and razors separate.",
        ],
        evidence: {
          source:
            "American Academy of Dermatology - Skin and Personal Hygiene Protocols",
          year: "2023",
          url: "https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-tips-dermatologists-use",
        },
        category: "Hygiene & Sanitation",
        categoryNumber: 9,
      },
      {
        id: "tip-8-3",
        title: "Home Sanitation",
        desc: "Regular decontamination of shared domestic contact points interrupts fomite transmission of respiratory and gastrointestinal viruses.",
        actions: [
          "Disinfect high-touch surfaces like doorknobs and phones.",
          "Wash bedding and linens in hot water weekly.",
          "Empty trash bins regularly to prevent pest attraction.",
          "Ensure proper indoor ventilation to reduce airborne germs.",
        ],
        evidence: {
          source: "CDC - Everyday Cleaning and Disinfecting Your Home",
          year: "2023",
          url: "https://www.cdc.gov/hygiene/cleaning/cleaning-your-home.html",
        },
        category: "Hygiene & Sanitation",
        categoryNumber: 9,
      },
      {
        id: "tip-8-4",
        title: "Food & Water Sanitation",
        desc: "Strict food prep hygiene and prompt cold storage inhibit microbiological spoilage and neutralize dangerous foodborne enterotoxins.",
        actions: [
          "Wash all fresh produce thoroughly before preparation.",
          "Cook meats and poultry to safe internal temperatures.",
          "Refrigerate leftover foods within two hours of cooking.",
          "Discard spoiled or questionable food items immediately.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Five Keys to Safer Food Manual",
          year: "2024",
          url: "https://www.who.int/initiatives/five-keys-to-safer-food",
        },
        category: "Hygiene & Sanitation",
        categoryNumber: 9,
      },
    ],
  },
  {
    id: "first-aid-emergency-care",
    number: 10,
    name: "First Aid & Emergency Care",
    description:
      "Critical life-saving protocols, trauma response kits, and timely triage in acute medical situations.",
    tips: [
      {
        id: "tip-9-1",
        title: "Home First Aid Kit",
        desc: "Maintaining a ready, well-organized trauma and dressing supply enables rapid intervention during acute domestic injuries.",
        actions: [
          "Stock a kit with bandages, antiseptic wipes, and gauze.",
          "Include tweezers, scissors, and medical tape.",
          "Store over-the-counter pain relievers and personal medications.",
          "Check and replenish expired supplies annually.",
        ],
        evidence: {
          source:
            "American Red Cross - Anatomy of a Comprehensive First Aid Kit",
          year: "2024",
          url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/anatomy-of-a-first-aid-kit.html",
        },
        category: "First Aid & Emergency Care",
        categoryNumber: 10,
      },
      {
        id: "tip-9-2",
        title: "Emergency Preparedness",
        desc: "Rapid recognition of life threats and memorization of rescue algorithms dramatically improves survival in cardiovascular and airway crises.",
        actions: [
          "Keep emergency contact numbers clearly posted or saved.",
          "Learn basic CPR and choking rescue techniques.",
          "Know the fastest route to the nearest emergency room.",
          "Keep a digital or physical copy of vital medical history.",
        ],
        evidence: {
          source: "American Heart Association - CPR & First Aid Guidelines",
          year: "2024",
          url: "https://www.cpr.heart.org/en/resources/what-is-cpr",
        },
        category: "First Aid & Emergency Care",
        categoryNumber: 10,
      },
      {
        id: "tip-9-3",
        title: "Minor Injury Management",
        desc: "Correct localized irrigation, hemostasis, and sterile occlusive covering prevent secondary soft tissue infections.",
        actions: [
          "Clean minor cuts and scrapes with soap and clean water.",
          "Apply gentle pressure to stop minor bleeding.",
          "Cover wounds with sterile bandages to prevent infection.",
          "Rest and ice minor sprains or strains promptly.",
        ],
        evidence: {
          source: "Mayo Clinic - First Aid for Minor Cuts and Scrapes",
          year: "2023",
          url: "https://www.mayoclinic.org/first-aid/first-aid-cuts/basics/art-20056711",
        },
        category: "First Aid & Emergency Care",
        categoryNumber: 10,
      },
      {
        id: "tip-9-4",
        title: "Seeking Urgent Help",
        desc: "Recognizing critical danger signs like sudden chest tightness, neurological deficits, or severe hemorrhage mandates immediate dispatch of emergency services.",
        actions: [
          "Recognize signs requiring emergency medical attention.",
          "Call local emergency services immediately for severe trauma.",
          "Stay calm and provide clear details to dispatchers.",
          "Do not move individuals with suspected spinal injuries.",
        ],
        evidence: {
          source: "American Red Cross - Critical First Aid Steps",
          year: "2024",
          url: "https://www.redcross.org/take-a-class/first-aid/performing-first-aid/first-aid-steps",
        },
        category: "First Aid & Emergency Care",
        categoryNumber: 10,
      },
    ],
  },
  {
    id: "child-maternal-health",
    number: 11,
    name: "Child & Maternal Health",
    description:
      "Comprehensive guidelines for perinatal nutrition, infant development milestones, and pediatric care.",
    tips: [
      {
        id: "tip-10-1",
        title: "Prenatal Care",
        desc: "Regular obstetric monitoring and essential micronutrient supplementation safeguard fetal organogenesis and prevent maternal complications.",
        actions: [
          "Attend scheduled regular prenatal checkups and screenings.",
          "Take recommended prenatal vitamins like folic acid.",
          "Avoid harmful substances, alcohol, and tobacco during pregnancy.",
          "Maintain balanced nutrition tailored for pregnancy needs.",
        ],
        evidence: {
          source:
            "American College of Obstetricians and Gynecologists (ACOG) - Routine Tests in Pregnancy",
          year: "2023",
          url: "https://www.acog.org/womens-health/faqs/routine-tests-during-pregnancy",
        },
        category: "Child & Maternal Health",
        categoryNumber: 11,
      },
      {
        id: "tip-10-2",
        title: "Infant Nutrition & Feeding",
        desc: "Optimal feeding practices during the first months deliver critical maternal antibodies and establish a resilient infant microbiome.",
        actions: [
          "Prioritize exclusive breastfeeding or recommended formula feeding.",
          "Introduce safe, age-appropriate solid foods progressively.",
          "Monitor infant growth charts with pediatricians.",
          "Ensure proper sterilization of feeding bottles and utensils.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Infant and Young Child Feeding",
          year: "2024",
          url: "https://www.who.int/health-topics/infant-nutrition",
        },
        category: "Child & Maternal Health",
        categoryNumber: 11,
      },
      {
        id: "tip-10-3",
        title: "Childhood Immunizations",
        desc: "Timely childhood vaccination confers robust acquired immunity against potentially fatal communicable diseases.",
        actions: [
          "Follow the recommended childhood vaccination schedule.",
          "Keep an updated record of all administered vaccines.",
          "Discuss potential mild side effects with your pediatrician.",
          "Protect community immunity by keeping vaccinations current.",
        ],
        evidence: {
          source: "CDC - Recommended Vaccines for Children and Adolescents",
          year: "2024",
          url: "https://www.cdc.gov/vaccines/parents/schedules/index.html",
        },
        category: "Child & Maternal Health",
        categoryNumber: 11,
      },
      {
        id: "tip-10-4",
        title: "Child Development & Safety",
        desc: "Providing secure physical spaces and interactive stimulation nurtures neurocognitive milestones and shields infants from preventable trauma.",
        actions: [
          "Provide safe, age-appropriate play environments.",
          "Childproof the home to prevent accidental poisonings or falls.",
          "Monitor cognitive, social, and motor development milestones.",
          "Engage children in active, creative play daily.",
        ],
        evidence: {
          source: "CDC - Developmental Milestones and Safety Indicators",
          year: "2023",
          url: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html",
        },
        category: "Child & Maternal Health",
        categoryNumber: 11,
      },
    ],
  },
  {
    id: "preventive-care-vaccination",
    number: 12,
    name: "Preventive Care & Vaccination",
    description:
      "Proactive health screenings, adult immunization schedules, and early disease detection paradigms.",
    tips: [
      {
        id: "tip-11-1",
        title: "Routine Health Screenings",
        desc: "Periodic clinical evaluations uncover asymptomatic cardiovascular and oncological abnormalities at their most treatable stages.",
        actions: [
          "Schedule regular blood pressure and cholesterol checks.",
          "Undergo recommended cancer screenings based on age guidelines.",
          "Monitor blood glucose levels during routine checkups.",
          "Track personal health metrics over time.",
        ],
        evidence: {
          source:
            "U.S. Preventive Services Task Force (USPSTF) - A and B Recommendations",
          year: "2024",
          url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation-topics/uspstf-a-and-b-recommendations",
        },
        category: "Preventive Care & Vaccination",
        categoryNumber: 12,
      },
      {
        id: "tip-11-2",
        title: "Adult Immunization Schedules",
        desc: "Maintaining adult vaccine boosters preserves antibody titers against emerging infectious variants and opportunistic pathogens.",
        actions: [
          "Receive annual seasonal influenza vaccinations.",
          "Keep booster shots like tetanus and diphtheria up to date.",
          "Discuss specialized vaccines with your primary doctor.",
          "Review travel vaccine requirements before international trips.",
        ],
        evidence: {
          source: "CDC - Recommended Adult Immunization Schedule",
          year: "2024",
          url: "https://www.cdc.gov/vaccines/schedules/hcp/imz/adult.html",
        },
        category: "Preventive Care & Vaccination",
        categoryNumber: 12,
      },
      {
        id: "tip-11-3",
        title: "Lifestyle Disease Prevention",
        desc: "Addressing modifiable behavioral risk factors eliminates up to 80% of premature coronary disease, stroke, and type 2 diabetes.",
        actions: [
          "Avoid tobacco use and limit alcohol consumption.",
          "Maintain a healthy weight and active routine.",
          "Manage chronic stress and prioritize healthy sleep.",
          "Eat a balanced diet rich in whole plant foods.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Noncommunicable Diseases Fact Sheet",
          year: "2023",
          url: "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
        },
        category: "Preventive Care & Vaccination",
        categoryNumber: 12,
      },
      {
        id: "tip-11-4",
        title: "Patient-Doctor Partnerships",
        desc: "Shared decision-making between patients and primary clinicians promotes adherence to long-term health regimens and treatment outcomes.",
        actions: [
          "Prepare a list of questions before medical appointments.",
          "Share complete medical and family history transparently.",
          "Follow preventive advice provided by healthcare professionals.",
          "Seek second opinions when facing major medical decisions.",
        ],
        evidence: {
          source:
            "National Institute on Aging (NIH) - How to Talk to Your Doctor",
          year: "2023",
          url: "https://www.nia.nih.gov/health/medical-care-and-appointments/talking-your-doctor",
        },
        category: "Preventive Care & Vaccination",
        categoryNumber: 12,
      },
    ],
  },
  {
    id: "eye-vision-health",
    number: 13,
    name: "Eye & Vision Health",
    description:
      "Visual ergonomics, protection against ultraviolet radiation, and ophthalmic preventive maintenance.",
    tips: [
      {
        id: "tip-12-1",
        title: "Screen Time Ergonomics",
        desc: "Preventing computer vision syndrome reduces ciliary muscle spasm, surface tear film evaporation, and asthenopia.",
        actions: [
          "Follow the 20-20-20 rule to reduce eye strain.",
          "Adjust screen brightness and contrast to match surroundings.",
          "Keep electronic screens at a comfortable arm's length.",
          "Use anti-glare screen protectors if necessary.",
        ],
        evidence: {
          source:
            "American Academy of Ophthalmology - Computers, Digital Devices and Eye Strain",
          year: "2023",
          url: "https://www.aao.org/eye-health/tips-prevention/computer-usage",
        },
        category: "Eye & Vision Health",
        categoryNumber: 13,
      },
      {
        id: "tip-12-2",
        title: "UV Protection",
        desc: "Blocking ocular solar radiation shields corneal epithelium and lens proteins from photo-oxidative cataractogenesis and macular damage.",
        actions: [
          "Wear sunglasses that block 100% of UVA and UVB rays.",
          "Wear wide-brimmed hats outdoors in bright sunlight.",
          "Protect children's eyes with certified UV-blocking glasses.",
          "Avoid looking directly at the sun during eclipses or bright days.",
        ],
        evidence: {
          source:
            "American Academy of Ophthalmology - The Sun, UV Light and Your Eyes",
          year: "2023",
          url: "https://www.aao.org/eye-health/tips-prevention/sun",
        },
        category: "Eye & Vision Health",
        categoryNumber: 13,
      },
      {
        id: "tip-12-3",
        title: "Routine Eye Exams",
        desc: "Comprehensive dilated eye exams detect early asymptomatic intraocular pressure spikes and retinal vascular microaneurysms.",
        actions: [
          "Schedule comprehensive eye exams every one to two years.",
          "Report sudden changes in vision or persistent blurriness.",
          "Check for conditions like glaucoma and macular degeneration early.",
          "Update prescription lenses regularly to prevent strain.",
        ],
        evidence: {
          source: "American Optometric Association - Comprehensive Eye Exams",
          year: "2024",
          url: "https://www.aoa.org/healthy-eyes/caring-for-your-vision/comprehensive-eye-exams",
        },
        category: "Eye & Vision Health",
        categoryNumber: 13,
      },
      {
        id: "tip-12-4",
        title: "Eye Hygiene & Safety",
        desc: "Strict contact lens disinfection and industrial eyewear usage prevent severe microbial keratitis and traumatic ocular perforations.",
        actions: [
          "Wash hands before handling contact lenses.",
          "Clean and store contact lenses according to guidelines.",
          "Wear protective safety eyewear during hazardous chores or sports.",
          "Avoid rubbing eyes with dirty hands or objects.",
        ],
        evidence: {
          source: "CDC - Contact Lens Wear and Care",
          year: "2023",
          url: "https://www.cdc.gov/contact-lenses/protect-your-eyes/index.html",
        },
        category: "Eye & Vision Health",
        categoryNumber: 13,
      },
    ],
  },
  {
    id: "dental-oral-care",
    number: 14,
    name: "Dental & Oral Care",
    description:
      "Interdental plaque management, enamel remineralization, and periodontal disease prevention.",
    tips: [
      {
        id: "tip-13-1",
        title: "Daily Brushing Habits",
        desc: "Mechanical brushing with fluoridated paste disrupts cariogenic oral biofilm and accelerates enamel surface remineralization.",
        actions: [
          "Brush teeth twice a day with fluoride toothpaste.",
          "Use a soft-bristled toothbrush to protect gum tissue.",
          "Brush for a full two minutes covering all surfaces.",
          "Replace your toothbrush or electric head every three months.",
        ],
        evidence: {
          source:
            "American Dental Association (ADA) - Brushing Your Teeth Guidelines",
          year: "2024",
          url: "https://www.mouthhealthy.org/all-topics-a-z/brushing-your-teeth",
        },
        category: "Dental & Oral Care",
        categoryNumber: 14,
      },
      {
        id: "tip-13-2",
        title: "Interdental Cleaning",
        desc: "Flossing reaches interproximal crevices where up to 35% of periodontal pathogenic plaque thrives beyond brush bristles.",
        actions: [
          "Floss daily to remove plaque between teeth.",
          "Use interdental brushes if recommended by your dentist.",
          "Rinse with an antiseptic mouthwash to reduce bacteria.",
          "Be gentle to avoid injuring delicate gum tissues.",
        ],
        evidence: {
          source:
            "American Dental Association (ADA) - Interdental Flossing Cleanliness",
          year: "2023",
          url: "https://www.mouthhealthy.org/all-topics-a-z/flossing",
        },
        category: "Dental & Oral Care",
        categoryNumber: 14,
      },
      {
        id: "tip-13-3",
        title: "Dental Checkups",
        desc: "Professional scaling clears subgingival calculus deposits, halting the progression of gingivitis into irreversible periodontitis.",
        actions: [
          "Visit the dentist for professional cleanings twice a year.",
          "Address tooth sensitivity or pain promptly.",
          "Discuss teeth-grinding or jaw discomfort with your dentist.",
          "Keep track of dental restorations and fillings.",
        ],
        evidence: {
          source: "American Dental Association (ADA) - Regular Dental Visits",
          year: "2023",
          url: "https://www.mouthhealthy.org/all-topics-a-z/dental-visit",
        },
        category: "Dental & Oral Care",
        categoryNumber: 14,
      },
      {
        id: "tip-13-4",
        title: "Oral-Friendly Diet",
        desc: "Restricting simple sucrose and dietary acids preserves saliva buffering capacity and prevents acid demineralization of hydroxyapatite.",
        actions: [
          "Limit sugary snacks, candies, and acidic beverages.",
          "Drink water after meals to rinse away food particles.",
          "Consume calcium-rich foods to strengthen tooth enamel.",
          "Avoid chewing on hard objects like ice or pens.",
        ],
        evidence: {
          source: "American Dental Association (ADA) - Diet and Dental Health",
          year: "2023",
          url: "https://www.mouthhealthy.org/all-topics-a-z/diet-and-dental-health",
        },
        category: "Dental & Oral Care",
        categoryNumber: 14,
      },
    ],
  },
  {
    id: "skin-care-protection",
    number: 15,
    name: "Skin Care & Protection",
    description:
      "Dermatological barrier maintenance, photoprotection, and early melanoma screening protocols.",
    tips: [
      {
        id: "tip-14-1",
        title: "Sun Protection Essentials",
        desc: "Broad-spectrum photoprotection filters out ionizing UVB/UVA photons, safeguarding cellular DNA against photoaging and cutaneous carcinoma.",
        actions: [
          "Apply broad-spectrum sunscreen with SPF 30 or higher daily.",
          "Reapply sunscreen every two hours when outdoors.",
          "Wear protective clothing and seek shade during peak hours.",
          "Avoid using tanning beds and artificial UV sources.",
        ],
        evidence: {
          source:
            "American Academy of Dermatology - Sunscreen FAQs and Protection",
          year: "2024",
          url: "https://www.aad.org/media/stats-sunscreen",
        },
        category: "Skin Care & Protection",
        categoryNumber: 15,
      },
      {
        id: "tip-14-2",
        title: "Daily Cleansing & Hydration",
        desc: "Gentle, pH-balanced cleansing preserves the cutaneous stratum corneum acid mantle and prevents transepidermal water loss.",
        actions: [
          "Wash your face gently with a mild cleanser twice a day.",
          "Apply a suitable moisturizer while skin is slightly damp.",
          "Choose skincare products suited for your skin type.",
          "Avoid harsh scrubbing that damages the skin barrier.",
        ],
        evidence: {
          source: "American Academy of Dermatology - Face Washing 101 Guide",
          year: "2023",
          url: "https://www.aad.org/public/everyday-care/skin-care-basics/care/face-washing-101",
        },
        category: "Skin Care & Protection",
        categoryNumber: 15,
      },
      {
        id: "tip-14-3",
        title: "Skin Monitoring",
        desc: "Systematic monthly skin auto-inspections identify atypical melanocytic lesions at an early, highly curable phase.",
        actions: [
          "Inspect your skin monthly for changing moles or spots.",
          "Use the ABCDE guide to check for abnormal moles.",
          "Consult a dermatologist for suspicious skin lesions.",
          "Keep a record of chronic skin conditions like eczema or acne.",
        ],
        evidence: {
          source: "American Cancer Society - How to Do a Skin Self-Exam",
          year: "2024",
          url: "https://www.cancer.org/cancer/types/skin-cancer/skin-exams.html",
        },
        category: "Skin Care & Protection",
        categoryNumber: 15,
      },
      {
        id: "tip-14-4",
        title: "Skin Healing & Recovery",
        desc: "Moist wound healing environments stimulate keratinocyte migration and minimize hypertrophic scarring.",
        actions: [
          "Keep minor cuts clean, moist, and protected.",
          "Avoid picking at blemishes, scabs, or healing skin.",
          "Stay hydrated to support overall skin elasticity.",
          "Wear breathable fabrics to prevent skin irritation.",
        ],
        evidence: {
          source: "American Academy of Dermatology - Proper Wound Healing Care",
          year: "2023",
          url: "https://www.aad.org/public/everyday-care/injured-skin/burns/treat-minor-cuts",
        },
        category: "Skin Care & Protection",
        categoryNumber: 15,
      },
    ],
  },
  {
    id: "heart-circulatory-health",
    number: 16,
    name: "Heart & Circulatory Health",
    description:
      "Arterial blood pressure control, lipid balance, and early detection of myocardial ischemia.",
    tips: [
      {
        id: "tip-15-1",
        title: "Blood Pressure Management",
        desc: "Maintaining arterial pressures below 120/80 mmHg protects delicate cerebral and renal microvasculature from hypertensive vascular remodeling.",
        actions: [
          "Check blood pressure readings regularly at home or clinics.",
          "Reduce dietary sodium and processed salt intake.",
          "Maintain a healthy weight to reduce strain on the heart.",
          "Manage chronic stress through relaxation techniques.",
        ],
        evidence: {
          source:
            "American Heart Association - Understanding Blood Pressure Readings",
          year: "2023",
          url: "https://www.heart.org/en/health-topics/high-blood-pressure",
        },
        category: "Heart & Circulatory Health",
        categoryNumber: 16,
      },
      {
        id: "tip-15-2",
        title: "Cholesterol Balance",
        desc: "Lowering apolipoprotein B-containing lipoproteins reduces the initiation and destabilization of atherosclerotic plaque.",
        actions: [
          "Consume foods rich in soluble fiber like oats and beans.",
          "Choose healthy fats while minimizing trans fats.",
          "Engage in regular aerobic exercise to support good cholesterol.",
          "Monitor lipid profiles through routine blood tests.",
        ],
        evidence: {
          source:
            "American Heart Association - What is Cholesterol and How to Control It",
          year: "2023",
          url: "https://www.heart.org/en/health-topics/cholesterol",
        },
        category: "Heart & Circulatory Health",
        categoryNumber: 16,
      },
      {
        id: "tip-15-3",
        title: "Heart-Healthy Eating",
        desc: "Adopting Mediterranean dietary patterns enriched in polyphenol-rich oils and omega-3 fatty acids supports healthy vascular endothelium.",
        actions: [
          "Incorporate omega-3 fatty acids from fish or plant sources.",
          "Eat plenty of antioxidant-rich fruits and vegetables.",
          "Limit sugary drinks and refined carbohydrate products.",
          "Cook with heart-healthy oils like extra virgin olive oil.",
        ],
        evidence: {
          source:
            "American Heart Association - Diet and Lifestyle Recommendations",
          year: "2024",
          url: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/aha-diet-and-lifestyle-recommendations",
        },
        category: "Heart & Circulatory Health",
        categoryNumber: 16,
      },
      {
        id: "tip-15-4",
        title: "Recognizing Cardiovascular Warning Signs",
        desc: "Prompt recognition of acute coronary syndromes saves viable myocardium through rapid reperfusion therapy.",
        actions: [
          "Learn symptoms of heart stress like chest discomfort or shortness of breath.",
          "Seek emergency care immediately for sudden chest pain.",
          "Know your family history of cardiovascular disease.",
          "Avoid smoking and exposure to secondhand smoke completely.",
        ],
        evidence: {
          source:
            "American Heart Association - Warning Signs of a Heart Attack",
          year: "2024",
          url: "https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack",
        },
        category: "Heart & Circulatory Health",
        categoryNumber: 16,
      },
    ],
  },
  {
    id: "respiratory-health-air-quality",
    number: 17,
    name: "Respiratory Health & Air Quality",
    description:
      "Pulmonary function enhancement, airborne particulate filtration, and lung defense mechanisms.",
    tips: [
      {
        id: "tip-16-1",
        title: "Indoor Air Quality Control",
        desc: "Eliminating volatile organic compounds and PM2.5 particulates prevents chronic bronchial inflammatory hyperresponsiveness.",
        actions: [
          "Clean or replace air conditioning and furnace filters regularly.",
          "Use air purifiers equipped with HEPA filters.",
          "Keep indoor spaces free of mold and excessive moisture.",
          "Avoid indoor smoking and harsh chemical cleaners.",
        ],
        evidence: {
          source:
            "U.S. Environmental Protection Agency (EPA) - Indoor Air Quality Guidelines",
          year: "2023",
          url: "https://www.epa.gov/indoor-air-quality-iaq",
        },
        category: "Respiratory Health & Air Quality",
        categoryNumber: 17,
      },
      {
        id: "tip-16-2",
        title: "Outdoor Air Monitoring",
        desc: "Tracking ambient particulate indexes shields sensitive pulmonary alveoli on days with elevated ground-level ozone and toxic haze.",
        actions: [
          "Check local Air Quality Index (AQI) reports daily.",
          "Limit outdoor exercise on days with high smog or wildfire smoke.",
          "Wear well-fitting masks in dusty or polluted environments.",
          "Stay indoors during high pollen seasons if allergic.",
        ],
        evidence: {
          source: "AirNow.gov / EPA - Understanding Air Quality Index Reports",
          year: "2024",
          url: "https://www.airnow.gov/aqi/aqi-basics/",
        },
        category: "Respiratory Health & Air Quality",
        categoryNumber: 17,
      },
      {
        id: "tip-16-3",
        title: "Breathing Exercises",
        desc: "Deep diaphragmatic ventilatory mechanics expand lower pulmonary lobes, optimizing ventilation-perfusion ratios and gas exchange.",
        actions: [
          "Practice diaphragmatic breathing to enhance lung capacity.",
          "Perform controlled breathing exercises to reduce anxiety.",
          "Maintain good posture to allow full lung expansion.",
          "Engage in aerobic activities that challenge respiratory fitness.",
        ],
        evidence: {
          source:
            "American Lung Association - Breathing Exercises for Healthy Lungs",
          year: "2023",
          url: "https://www.lung.org/lung-health-diseases/wellness/breathing-exercises",
        },
        category: "Respiratory Health & Air Quality",
        categoryNumber: 17,
      },
      {
        id: "tip-16-4",
        title: "Respiratory Protection & Care",
        desc: "Proactive respiratory vaccination and early treatment of persistent coughs halt irreversible structural airway remodeling.",
        actions: [
          "Stay up to date on respiratory vaccines like flu and pneumonia.",
          "Avoid close contact with individuals showing acute respiratory illness.",
          "Wash hands frequently to prevent germ transmission.",
          "Seek medical evaluation for persistent coughs or wheezing.",
        ],
        evidence: {
          source: "American Lung Association - Protecting Your Lungs Every Day",
          year: "2023",
          url: "https://www.lung.org/lung-health-diseases/wellness/protecting-your-lungs",
        },
        category: "Respiratory Health & Air Quality",
        categoryNumber: 17,
      },
    ],
  },
  {
    id: "mental-stimulation-cognitive-health",
    number: 18,
    name: "Mental Stimulation & Cognitive Health",
    description:
      "Neuroplasticity stimulation, cognitive reserve fortification, and brain-supportive nutrition.",
    tips: [
      {
        id: "tip-17-1",
        title: "Lifelong Learning",
        desc: "Novel cognitive demands stimulate synaptic neurogenesis, building resilient cognitive reserve against neurodegenerative decline.",
        actions: [
          "Read books, articles, or learn a new language.",
          "Take up a challenging hobby like playing an instrument.",
          "Solve puzzles, crosswords, or logic games regularly.",
          "Attend workshops or educational classes.",
        ],
        evidence: {
          source:
            "Harvard Health Publishing - 12 Ways to Keep Your Brain Young",
          year: "2024",
          url: "https://www.health.harvard.edu/mind-and-mood/12-ways-to-keep-your-brain-young",
        },
        category: "Mental Stimulation & Cognitive Health",
        categoryNumber: 18,
      },
      {
        id: "tip-17-2",
        title: "Brain-Healthy Nutrition",
        desc: "Dietary patterns high in omega-3 fats, carotenoids, and flavonoids protect neuronal membranes from neuroinflammatory oxidation.",
        actions: [
          "Eat foods rich in antioxidants, vitamins, and healthy fats.",
          "Include berries, leafy greens, and nuts in your diet.",
          "Stay well-hydrated to support cognitive concentration.",
          "Limit excessive sugar and processed food intake.",
        ],
        evidence: {
          source:
            "Harvard Health Publishing - Foods Linked to Better Brainpower",
          year: "2023",
          url: "https://www.health.harvard.edu/healthbeat/foods-linked-to-better-brainpower",
        },
        category: "Mental Stimulation & Cognitive Health",
        categoryNumber: 18,
      },
      {
        id: "tip-17-3",
        title: "Social Engagement",
        desc: "Regular intellectual and emotional interchange protects grey matter volume and mitigates the severe cognitive risks of social isolation.",
        actions: [
          "Maintain strong connections with friends and family members.",
          "Participate in community groups or club activities.",
          "Engage in meaningful conversations and collaborative projects.",
          "Volunteer time to support local community causes.",
        ],
        evidence: {
          source:
            "National Institute on Aging (NIH) - Cognitive Health and Older Adults",
          year: "2023",
          url: "https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults",
        },
        category: "Mental Stimulation & Cognitive Health",
        categoryNumber: 18,
      },
      {
        id: "tip-17-4",
        title: "Cognitive Rest & Breaks",
        desc: "Structured mental pauses restore depleted attentional networks and allow hippocampal memory consolidation.",
        actions: [
          "Take short mental breaks during intense work sessions.",
          "Get sufficient restorative sleep each night.",
          "Practice relaxation techniques to clear mental clutter.",
          "Avoid multitasking constantly to protect focus.",
        ],
        evidence: {
          source:
            "American Psychological Association (APA) - Giving Your Brain a Break",
          year: "2023",
          url: "https://www.apa.org/monitor/2019/01/break",
        },
        category: "Mental Stimulation & Cognitive Health",
        categoryNumber: 18,
      },
    ],
  },
  {
    id: "environmental-community-health",
    number: 19,
    name: "Environmental & Community Health",
    description:
      "Eco-responsible living, local environmental sanitation, and vector-borne pathogen prevention.",
    tips: [
      {
        id: "tip-18-1",
        title: "Eco-Friendly Living",
        desc: "Minimizing toxic plastics and conserving municipal resources directly reduces endocrine-disrupting chemicals in community ecosystems.",
        actions: [
          "Reduce single-use plastics and embrace reusable items.",
          "Conserve water and electricity at home daily.",
          "Practice proper waste sorting and recycling methods.",
          "Support sustainable local products and businesses.",
        ],
        evidence: {
          source:
            "United Nations Environment Programme (UNEP) - Sustainable Lifestyles and Ecosystems",
          year: "2023",
          url: "https://www.unep.org/explore-topics/resource-efficiency/what-we-do/sustainable-lifestyles",
        },
        category: "Environmental & Community Health",
        categoryNumber: 19,
      },
      {
        id: "tip-18-2",
        title: "Community Cleanliness",
        desc: "Cooperative local sanitation eliminates stagnant breeding waters and prevents hazardous environmental toxic exposure.",
        actions: [
          "Participate in local neighborhood cleanup events.",
          "Properly dispose of hazardous waste and electronics.",
          "Avoid littering in public spaces, parks, and waterways.",
          "Report environmental hazards to local authorities.",
        ],
        evidence: {
          source:
            "U.S. Environmental Protection Agency (EPA) - Environmental Topics in Communities",
          year: "2024",
          url: "https://www.epa.gov/environmental-topics",
        },
        category: "Environmental & Community Health",
        categoryNumber: 19,
      },
      {
        id: "tip-18-3",
        title: "Safe Outdoor Spaces",
        desc: "Barrier protection and tick/mosquito repellency suppress outbreaks of vector-borne illnesses.",
        actions: [
          "Use insect repellent to prevent mosquito and tick bites.",
          "Protect against vector-borne diseases in high-risk areas.",
          "Wear appropriate clothing when walking through wooded trails.",
          "Check body and clothing for ticks after outdoor activities.",
        ],
        evidence: {
          source: "CDC - Preventing Tick and Mosquito Bites Outdoors",
          year: "2024",
          url: "https://www.cdc.gov/ticks/avoid/on_people.html",
        },
        category: "Environmental & Community Health",
        categoryNumber: 19,
      },
      {
        id: "tip-18-4",
        title: "Public Health Awareness",
        desc: "Sharing scientifically vetted health information within social networks elevates herd awareness and disease prevention.",
        actions: [
          "Share verified health information within your community.",
          "Follow local public health safety guidelines and advisories.",
          "Support community health drives and wellness programs.",
          "Encourage neighbors to adopt healthy lifestyle habits.",
        ],
        evidence: {
          source:
            "American Public Health Association (APHA) - What is Public Health Overview",
          year: "2023",
          url: "https://www.apha.org/what-is-public-health",
        },
        category: "Environmental & Community Health",
        categoryNumber: 19,
      },
    ],
  },
  {
    id: "mental-health-wellness",
    number: 20,
    name: "Mental Health & Wellness",
    description:
      "Psychological resiliency, emotional regulation strategies, and destigmatizing professional mental healthcare.",
    tips: [
      {
        id: "tip-19-1",
        title: "Emotional Self-Care",
        desc: "Validating psychological emotions without self-criticism preserves self-efficacy and prevents affective burn-out.",
        actions: [
          "Acknowledge and validate your feelings without self-judgment.",
          "Set realistic personal expectations and achievable goals.",
          "Engage in creative outlets like art, writing, or music.",
          "Allow yourself guilt-free personal rest time.",
        ],
        evidence: {
          source:
            "National Institute of Mental Health (NIMH) - Caring for Your Mental Health",
          year: "2023",
          url: "https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",
        },
        category: "Mental Health & Wellness",
        categoryNumber: 20,
      },
      {
        id: "tip-19-2",
        title: "Building a Support Network",
        desc: "Reciprocal social safety nets foster oxytocin release, buffering individuals against loneliness and acute depressive episodes.",
        actions: [
          "Cultivate relationships with supportive, positive people.",
          "Reach out to trusted friends when feeling overwhelmed.",
          "Join peer support groups sharing similar experiences.",
          "Offer a listening ear to others in need.",
        ],
        evidence: {
          source:
            "Mental Health America - Staying Connected for Resilient Health",
          year: "2023",
          url: "https://www.mhanational.org/staying-connected",
        },
        category: "Mental Health & Wellness",
        categoryNumber: 20,
      },
      {
        id: "tip-19-3",
        title: "Professional Support Utilization",
        desc: "Early therapeutic intervention with clinical specialists disrupts maladaptive neural thought pathways before chronic depression hardens.",
        actions: [
          "Consult licensed therapists or counselors for mental health guidance.",
          "Utilize confidential employee assistance or student programs.",
          "Follow treatment plans if receiving therapeutic care.",
          "Break the stigma by talking openly about mental health.",
        ],
        evidence: {
          source:
            "American Psychological Association (APA) - Understanding Psychotherapy",
          year: "2024",
          url: "https://www.apa.org/topics/psychotherapy",
        },
        category: "Mental Health & Wellness",
        categoryNumber: 20,
      },
      {
        id: "tip-19-4",
        title: "Daily Coping Strategies",
        desc: "Grounding techniques and cognitive reframing interrupt acute anxiety loops by reactivating parasympathetic vagal control.",
        actions: [
          "Use grounding techniques when feeling anxious or stressed.",
          "Focus on things within your direct personal control.",
          "Practice positive self-talk and self-compassion.",
          "Maintain a routine that brings structure and comfort.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Strengthening Mental Health Interventions",
          year: "2023",
          url: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
        },
        category: "Mental Health & Wellness",
        categoryNumber: 20,
      },
    ],
  },
  {
    id: "posture-ergonomics",
    number: 21,
    name: "Posture & Ergonomics",
    description:
      "Biomechanical workstation geometry, spinal disc preservation, and muscular load balance.",
    tips: [
      {
        id: "tip-20-1",
        title: "Workspace Setup",
        desc: "Positioning display screens and seating at anthropometric angles alleviates continuous cervical strain and trapezius spasm.",
        actions: [
          "Position computer monitors at eye level to prevent neck strain.",
          "Adjust chair height so feet rest flat on the floor or a footrest.",
          "Keep elbows bent at a 90-degree angle while typing.",
          "Use an ergonomic chair that supports the lower back.",
        ],
        evidence: {
          source: "OSHA - Computer Workstations Ergonomic Components",
          year: "2024",
          url: "https://www.osha.gov/etools/computer-workstations/components",
        },
        category: "Posture & Ergonomics",
        categoryNumber: 21,
      },
      {
        id: "tip-20-2",
        title: "Lifting Mechanics",
        desc: "Utilizing lower-extremity quadricep torque rather than flexion of the lumbar spine safeguards intervertebral discs from herniation.",
        actions: [
          "Bend at your knees and hips rather than your waist when lifting heavy objects.",
          "Keep heavy items close to your body while carrying them.",
          "Avoid twisting your spine while lifting or carrying loads.",
          "Ask for assistance when lifting objects that exceed your capacity.",
        ],
        evidence: {
          source: "Mayo Clinic - Back Pain and Safe Lifting Techniques",
          year: "2023",
          url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/multimedia/back-pain/sls-20076817?s=3",
        },
        category: "Posture & Ergonomics",
        categoryNumber: 21,
      },
      {
        id: "tip-20-3",
        title: "Mobile Device Ergonomics",
        desc: "Mitigating forward neck flexion during mobile device browsing drastically diminishes compressive gravitational loads on the cervical spine.",
        actions: [
          "Raise smartphones up to eye level instead of bending your neck down.",
          "Take frequent breaks from looking at small screens.",
          "Use voice-to-text features to minimize prolonged typing stress.",
          "Stretch your neck and shoulders regularly throughout the day.",
        ],
        evidence: {
          source: "Spine-Health - Text Neck Symptoms, Prevention and Treatment",
          year: "2023",
          url: "https://www.spine-health.com/conditions/neck-pain/text-neck-treatment-and-prevention",
        },
        category: "Posture & Ergonomics",
        categoryNumber: 21,
      },
      {
        id: "tip-20-4",
        title: "Resting Postures",
        desc: "Neutral spinal posture during sleep and recumbent rest prevents chronic myofascial trigger points and nocturnal disc compression.",
        actions: [
          "Choose a supportive mattress that maintains spinal alignment.",
          "Use pillows between your knees or under your neck for extra support.",
          "Avoid sleeping on your stomach, which strains the neck and back.",
          "Change positions regularly if sitting or standing for long periods.",
        ],
        evidence: {
          source: "Mayo Clinic - Sleeping Positions that Reduce Back Pain",
          year: "2023",
          url: "https://www.mayoclinic.org/diseases-conditions/back-pain/multimedia/sleeping-positions/sls-20076452",
        },
        category: "Posture & Ergonomics",
        categoryNumber: 21,
      },
    ],
  },
  {
    id: "bone-joint-strength",
    number: 22,
    name: "Bone & Joint Strength",
    description:
      "Skeletal mineral density preservation, osteoblast stimulation, and fall prevention in daily life.",
    tips: [
      {
        id: "tip-21-1",
        title: "Calcium-Rich Nutrition",
        desc: "Sufficient dietary calcium provides the indispensable mineral scaffold required for bone remodeling and skeletal integrity.",
        actions: [
          "Consume dairy products or fortified plant-based milk alternatives.",
          "Include dark leafy greens like kale and broccoli in meals.",
          "Eat calcium-set tofu and small edible fish like sardines.",
          "Monitor dietary intake to meet recommended daily targets.",
        ],
        evidence: {
          source:
            "Bone Health & Osteoporosis Foundation - Calcium and Vitamin D Essentials",
          year: "2023",
          url: "https://www.bonehealthandosteoporosis.org/patients/treatment/calciumvitamin-d/",
        },
        category: "Bone & Joint Strength",
        categoryNumber: 22,
      },
      {
        id: "tip-21-2",
        title: "Vitamin D Optimization",
        desc: "Vitamin D acts as the vital hormonal catalyst for intestinal calcium absorption, preventing rickets and osteomalacia.",
        actions: [
          "Get safe, moderate sun exposure to synthesize natural Vitamin D.",
          "Eat Vitamin D-fortified foods and fatty fish like salmon.",
          "Consult a doctor about supplements if deficiency is suspected.",
          "Test blood levels periodically during routine checkups.",
        ],
        evidence: {
          source:
            "National Institutes of Health (NIH) - Vitamin D Consumer Fact Sheet",
          year: "2024",
          url: "https://ods.od.nih.gov/factsheets/VitaminD-Consumer/",
        },
        category: "Bone & Joint Strength",
        categoryNumber: 22,
      },
      {
        id: "tip-21-3",
        title: "Weight-Bearing Exercise",
        desc: "Mechanical impact loads trigger the piezoelectric effect in bone cells, driving osteoblastic deposition of new cortical bone.",
        actions: [
          "Perform resistance training to stimulate bone density growth.",
          "Engage in weight-bearing cardio like walking, jogging, or dancing.",
          "Include balance exercises to prevent accidental falls.",
          "Avoid high-impact routines if joint pain or osteoporosis is present.",
        ],
        evidence: {
          source:
            "Bone Health & Osteoporosis Foundation - Exercise for Bone Strength",
          year: "2023",
          url: "https://www.bonehealthandosteoporosis.org/patients/treatment/exercisesafe-movement/",
        },
        category: "Bone & Joint Strength",
        categoryNumber: 22,
      },
      {
        id: "tip-21-4",
        title: "Skeletal Safety",
        desc: "Proactive environmental fall mitigation prevents catastrophic hip fractures and long-term immobility in vulnerable adults.",
        actions: [
          "Remove household tripping hazards like loose rugs and cords.",
          "Install grab bars in bathrooms if stability is a concern.",
          "Wear supportive, non-slip footwear both indoors and outdoors.",
          "Use assistive devices if recommended by a healthcare provider.",
        ],
        evidence: {
          source: "CDC - STEADI Older Adult Fall Prevention Guidelines",
          year: "2024",
          url: "https://www.cdc.gov/steadi/index.html",
        },
        category: "Bone & Joint Strength",
        categoryNumber: 22,
      },
    ],
  },
  {
    id: "allergy-sinus-care",
    number: 23,
    name: "Allergy & Sinus Care",
    description:
      "Managing environmental allergens, sinus irrigation safety, and immune mast cell stabilization.",
    tips: [
      {
        id: "tip-22-1",
        title: "Trigger Avoidance",
        desc: "Identifying and eliminating specific airborne allergens minimizes IgE cross-linking and prevents severe histamine degranulation.",
        actions: [
          "Identify specific environmental triggers like pollen, dust, or mold.",
          "Keep windows closed during high pollen count days.",
          "Use hypoallergenic pillowcases and mattress covers.",
          "Wash bedding weekly in hot water to eliminate dust mites.",
        ],
        evidence: {
          source:
            "American Academy of Allergy, Asthma & Immunology (AAAAI) - Indoor Allergen Management",
          year: "2023",
          url: "https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/indoor-allergens",
        },
        category: "Allergy & Sinus Care",
        categoryNumber: 23,
      },
      {
        id: "tip-22-2",
        title: "Indoor Air Filtration",
        desc: "Trapping microscopic pollen grains and dander in fine HEPA filters significantly relieves nocturnal allergic rhinitis.",
        actions: [
          "Use HEPA air purifiers in bedrooms and living areas.",
          "Vacuum carpets and floors frequently using a HEPA-filter vacuum.",
          "Control indoor humidity to prevent mold and mildew growth.",
          "Avoid strong chemical fumes and artificial room fragrances.",
        ],
        evidence: {
          source: "U.S. EPA - Guide to Air Cleaners in the Home",
          year: "2024",
          url: "https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-home",
        },
        category: "Allergy & Sinus Care",
        categoryNumber: 23,
      },
      {
        id: "tip-22-3",
        title: "Nasal Hygiene",
        desc: "Buffered hypertonic or isotonic nasal lavages physically remove inflammatory mediators and restore mucociliary clearance.",
        actions: [
          "Use saline nasal rinses to clear allergens from nasal passages.",
          "Ensure wash solutions use distilled or boiled water.",
          "Keep nasal irrigation devices clean and dry between uses.",
          "Consult an allergist for personalized management plans.",
        ],
        evidence: {
          source:
            "American Academy of Otolaryngology - Safe Sinus Rinsing Protocol",
          year: "2023",
          url: "https://www.enthealth.org/be_ent_smart/sinus-rinses/",
        },
        category: "Allergy & Sinus Care",
        categoryNumber: 23,
      },
      {
        id: "tip-22-4",
        title: "Allergy Medication Safety",
        desc: "Judicious use of second-generation antihistamines and intranasal corticosteroids controls symptoms without central sedation.",
        actions: [
          "Follow package instructions or physician orders for antihistamines.",
          "Be aware of medications that cause drowsiness before driving.",
          "Keep emergency medication like epinephrine auto-injectors accessible if prescribed.",
          "Review all allergy treatments with a healthcare professional.",
        ],
        evidence: {
          source: "FDA - Allergy Relief for Children and Adults",
          year: "2024",
          url: "https://www.fda.gov/consumers/consumer-updates/allergy-relief-your-child-and-you",
        },
        category: "Allergy & Sinus Care",
        categoryNumber: 23,
      },
    ],
  },
  {
    id: "metabolic-blood-sugar-health",
    number: 24,
    name: "Metabolic & Blood Sugar Health",
    description:
      "Glycemic stabilization, insulin sensitivity restoration, and long-term metabolic syndrome prevention.",
    tips: [
      {
        id: "tip-23-1",
        title: "Balanced Carbohydrate Choices",
        desc: "Consuming high-fiber, slowly digested carbohydrates attenuates postprandial glucose surges and protects pancreatic beta cells.",
        actions: [
          "Prioritize high-fiber, low-glycemic index foods.",
          "Pair carbohydrates with proteins or healthy fats to slow digestion.",
          "Avoid refined sugars and sugary beverages.",
          "Read food labels for hidden sugars and syrups.",
        ],
        evidence: {
          source:
            "American Diabetes Association (ADA) - Understanding Carbohydrates",
          year: "2024",
          url: "https://diabetes.org/food-nutrition/understanding-carbs",
        },
        category: "Metabolic & Blood Sugar Health",
        categoryNumber: 24,
      },
      {
        id: "tip-23-2",
        title: "Regular Physical Activity",
        desc: "Skeletal muscle contraction stimulates GLUT4 glucose transporter translocation independently of insulin, rapidly lowering glycemia.",
        actions: [
          "Use post-meal walks to help lower blood glucose spikes.",
          "Incorporate daily movement to improve insulin sensitivity.",
          "Combine cardio and resistance training for optimal metabolic health.",
          "Avoid prolonged periods of uninterrupted sitting.",
        ],
        evidence: {
          source:
            "American Diabetes Association (ADA) - Physical Activity and Fitness",
          year: "2023",
          url: "https://diabetes.org/healthy-living/fitness",
        },
        category: "Metabolic & Blood Sugar Health",
        categoryNumber: 24,
      },
      {
        id: "tip-23-3",
        title: "Blood Sugar Monitoring",
        desc: "Systematic tracking of fasting and postprandial capillary glucose provides immediate feedback for behavioral and nutritional adjustments.",
        actions: [
          "Check blood glucose levels as advised by your healthcare provider.",
          "Keep a log of readings, meals, and physical activity.",
          "Recognize early signs of low or high blood sugar.",
          "Share blood sugar logs with your medical team during visits.",
        ],
        evidence: {
          source: "CDC - Monitoring Your Blood Glucose Levels",
          year: "2024",
          url: "https://www.cdc.gov/diabetes/managing/managing-blood-sugar/bloodglucosemonitoring.html",
        },
        category: "Metabolic & Blood Sugar Health",
        categoryNumber: 24,
      },
      {
        id: "tip-23-4",
        title: "Metabolic Lifestyle Support",
        desc: "Consistent circadian sleep cycles and emotional stress mitigation prevent cortisol-induced gluconeogenesis and visceral adiposity.",
        actions: [
          "Maintain a healthy body weight to support metabolic function.",
          "Get adequate nightly sleep to regulate metabolic hormones.",
          "Manage daily stress to prevent cortisol-driven blood sugar spikes.",
          "Stay well-hydrated with water throughout the day.",
        ],
        evidence: {
          source:
            "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) - Keeping Healthy with Diabetes",
          year: "2023",
          url: "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/keep-healthy",
        },
        category: "Metabolic & Blood Sugar Health",
        categoryNumber: 24,
      },
    ],
  },
  {
    id: "liver-detoxification-support",
    number: 25,
    name: "Liver & Detoxification Support",
    description:
      "Hepatocyte preservation, Cytochrome P450 pathway optimization, and fatty liver disease prevention.",
    tips: [
      {
        id: "tip-24-1",
        title: "Alcohol Moderation or Avoidance",
        desc: "Minimizing ethanol intake stops oxidative acetaldehyde generation, halting hepatic steatosis and irreversible fibrotic scarring.",
        actions: [
          "Limit alcohol consumption strictly to recommended guidelines.",
          "Take alcohol-free days each week to protect liver tissue.",
          "Avoid mixing alcohol with medications or supplements.",
          "Seek support if you struggle to control alcohol intake.",
        ],
        evidence: {
          source:
            "National Institute on Alcohol Abuse and Alcoholism (NIAAA) - Alcohol and Your Health",
          year: "2024",
          url: "https://www.niaaa.nih.gov/alcohol-health/overview-alcohol-consumption/moderate-binge-drinking",
        },
        category: "Liver & Detoxification Support",
        categoryNumber: 25,
      },
      {
        id: "tip-24-2",
        title: "Liver-Healthy Nutrition",
        desc: "Cruciferous vegetables rich in glucosinolates induce Phase II hepatic detoxifying enzymes, enhancing safe biotransformation of metabolites.",
        actions: [
          "Eat cruciferous vegetables like broccoli, cabbage, and Brussels sprouts.",
          "Include garlic, onions, and citrus fruits in your diet.",
          "Minimize intake of heavily processed foods and excess fructose.",
          "Drink adequate amounts of water to support natural filtration.",
        ],
        evidence: {
          source: "American Liver Foundation - Healthy Eating for Liver Care",
          year: "2023",
          url: "https://liverfoundation.org/health-and-wellness/healthy-lifestyle/liver-disease-diets/",
        },
        category: "Liver & Detoxification Support",
        categoryNumber: 25,
      },
      {
        id: "tip-24-3",
        title: "Medication & Supplement Safety",
        desc: "Carefully cross-referencing over-the-counter xenobiotics prevents drug-induced liver injury from acetaminophen overload or botanical toxins.",
        actions: [
          "Check with a pharmacist before combining multiple medications or supplements.",
          "Avoid unnecessary over-the-counter pain relievers that strain the liver.",
          "Store chemicals and cleaning products safely away from food.",
          "Review herbal supplements carefully for liver toxicity risks.",
        ],
        evidence: {
          source: "FDA - Acetaminophen and Liver Injury Safety Warnings",
          year: "2023",
          url: "https://www.fda.gov/drugs/resources-drugs/acetaminophen-and-liver-injury-q-and",
        },
        category: "Liver & Detoxification Support",
        categoryNumber: 25,
      },
      {
        id: "tip-24-4",
        title: "Routine Liver Checkups",
        desc: "Serum transaminase screening detects silent chronic hepatic inflammation before symptoms of cirrhosis manifest.",
        actions: [
          "Undergo routine blood tests to check liver enzyme levels.",
          "Discuss risk factors for fatty liver disease with your doctor.",
          "Maintain a healthy weight to prevent fat accumulation in the liver.",
          "Get vaccinated against viral hepatitis if recommended.",
        ],
        evidence: {
          source:
            "CDC - Viral Hepatitis Screening & Prevention Recommendations",
          year: "2024",
          url: "https://www.cdc.gov/hepatitis/index.htm",
        },
        category: "Liver & Detoxification Support",
        categoryNumber: 25,
      },
    ],
  },
  {
    id: "kidney-urinary-health",
    number: 26,
    name: "Kidney & Urinary Health",
    description:
      "Renal filtration support, nephrolithiasis prevention, and urinary tract pathogen defense.",
    tips: [
      {
        id: "tip-25-1",
        title: "Optimal Hydration",
        desc: "Diluting urine with consistent daily fluid intake lowers solute saturation, effectively preventing painful renal calculi formation.",
        actions: [
          "Drink sufficient water daily to help kidneys filter waste effectively.",
          "Adjust fluid intake based on climate, activity, and medical advice.",
          "Limit excessive intake of sugary, caffeinated, or carbonated drinks.",
          "Recognize early signs of dehydration like dark urine.",
        ],
        evidence: {
          source:
            "National Kidney Foundation (NKF) - Water: How Much Do You Need",
          year: "2024",
          url: "https://www.kidney.org/atoz/content/water-how-much-do-you-need",
        },
        category: "Kidney & Urinary Health",
        categoryNumber: 26,
      },
      {
        id: "tip-25-2",
        title: "Sodium & Mineral Balance",
        desc: "Restricting excessive sodium reduces intraglomerular capillary hypertension and prevents renal hyperfiltration damage.",
        actions: [
          "Reduce dietary salt intake to help protect kidney function.",
          "Avoid excessive use of protein powders or extreme high-protein diets.",
          "Balance intake of calcium-rich foods and oxalates to prevent stones.",
          "Limit processed foods packed with hidden sodium additives.",
        ],
        evidence: {
          source:
            "National Kidney Foundation (NKF) - Sodium and Chronic Kidney Disease",
          year: "2023",
          url: "https://www.kidney.org/atoz/content/sodiumckd",
        },
        category: "Kidney & Urinary Health",
        categoryNumber: 26,
      },
      {
        id: "tip-25-3",
        title: "Urinary Habits",
        desc: "Regular, complete bladder emptying washes out retrograde uropathogenic Escherichia coli, protecting lower urinary tracts.",
        actions: [
          "Empty your bladder completely and regularly throughout the day.",
          "Practice good personal hygiene to prevent urinary tract infections.",
          "Wear breathable cotton underwear and loose-fitting clothing.",
          "Avoid holding urine for extended periods.",
        ],
        evidence: {
          source:
            "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) - UTI Prevention in Adults",
          year: "2023",
          url: "https://www.niddk.nih.gov/health-information/urologic-diseases/urinary-tract-infections-adults/prevention",
        },
        category: "Kidney & Urinary Health",
        categoryNumber: 26,
      },
      {
        id: "tip-25-4",
        title: "Kidney Health Screenings",
        desc: "Evaluating estimated glomerular filtration rate and urinary albumin-to-creatinine ratio uncovers early microvascular damage.",
        actions: [
          "Monitor blood pressure regularly as hypertension impacts kidneys.",
          "Check kidney function through routine blood and urine tests.",
          "Manage underlying conditions like diabetes carefully.",
          "Consult a doctor if you notice swelling in ankles or changes in urination.",
        ],
        evidence: {
          source:
            "National Kidney Foundation (NKF) - Kidney Tests and Early Detection",
          year: "2024",
          url: "https://www.kidney.org/atoz/content/kidneytests",
        },
        category: "Kidney & Urinary Health",
        categoryNumber: 26,
      },
    ],
  },
  {
    id: "gut-digestive-wellness",
    number: 27,
    name: "Gut & Digestive Wellness",
    description:
      "Microbiome diversity, mucosal barrier integrity, and functional gastrointestinal motility.",
    tips: [
      {
        id: "tip-26-1",
        title: "Fiber-Rich Diet",
        desc: "Fermentable dietary fibers nourish beneficial colonic bacteria, producing protective short-chain fatty acids like butyrate.",
        actions: [
          "Eat a variety of vegetables, fruits, beans, and whole grains.",
          "Increase fiber intake gradually to prevent bloating and discomfort.",
          "Drink extra water when increasing fiber in your meals.",
          "Consume prebiotic foods like garlic, onions, and bananas.",
        ],
        evidence: {
          source: "Mayo Clinic - Dietary Fiber: Essential for a Healthy Diet",
          year: "2023",
          url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/fiber/art-20043983",
        },
        category: "Gut & Digestive Wellness",
        categoryNumber: 27,
      },
      {
        id: "tip-26-2",
        title: "Probiotic Integration",
        desc: "Live fermented cultures reinforce intestinal tight junctions and outcompete dysbiotic bacterial strains in the gut lumen.",
        actions: [
          "Include fermented foods like yogurt, kefir, kimchi, or sauerkraut.",
          "Consider high-quality probiotic supplements after consulting a doctor.",
          "Choose products with live, active bacterial cultures.",
          "Maintain a diverse diet to support a healthy gut microbiome.",
        ],
        evidence: {
          source:
            "National Institutes of Health (NIH) - Probiotics Consumer Fact Sheet",
          year: "2023",
          url: "https://ods.od.nih.gov/factsheets/Probiotics-Consumer/",
        },
        category: "Gut & Digestive Wellness",
        categoryNumber: 27,
      },
      {
        id: "tip-26-3",
        title: "Mindful Eating & Digestion",
        desc: "Thorough mastication stimulates gastric acid and digestive enzyme secretion, avoiding postprandial fermentation and acid reflux.",
        actions: [
          "Chew food thoroughly to start the digestive process properly.",
          "Eat meals in a calm, relaxed environment without rushing.",
          "Avoid lying down immediately after eating a heavy meal.",
          "Identify and limit personal food intolerances or triggers.",
        ],
        evidence: {
          source: "NIDDK / NIH - Your Digestive System & How It Works",
          year: "2023",
          url: "https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works",
        },
        category: "Gut & Digestive Wellness",
        categoryNumber: 27,
      },
      {
        id: "tip-26-4",
        title: "Digestive Hydration & Movement",
        desc: "Gentle physical activity and adequate luminal hydration accelerate colonic transit, preventing chronic functional constipation.",
        actions: [
          "Drink warm water or herbal tea in the morning to stimulate digestion.",
          "Engage in regular physical activity to promote regular bowel movements.",
          "Manage chronic stress, which directly affects gut motility.",
          "Avoid excessive use of laxatives without medical guidance.",
        ],
        evidence: {
          source: "Mayo Clinic - Constipation Prevention and Management",
          year: "2024",
          url: "https://www.mayoclinic.org/diseases-conditions/constipation/diagnosis-treatment/drc-20354259",
        },
        category: "Gut & Digestive Wellness",
        categoryNumber: 27,
      },
    ],
  },
  {
    id: "immune-system-support",
    number: 28,
    name: "Immune System Support",
    description:
      "Innate and adaptive immunological optimization through targeted micronutrition, rest, and pathogen barriers.",
    tips: [
      {
        id: "tip-27-1",
        title: "Nutrient-Dense Foods",
        desc: "Zinc, Vitamin C, and polyphenols serve as essential cofactors in leukocyte proliferation and phagocytic respiratory bursts.",
        actions: [
          "Eat colorful fruits and vegetables rich in vitamins C and A.",
          "Include zinc-rich foods like nuts, seeds, and lean meats.",
          "Consume garlic and ginger for their natural antimicrobial properties.",
          "Maintain a balanced diet to prevent micronutrient deficiencies.",
        ],
        evidence: {
          source:
            "Harvard T.H. Chan School of Public Health - Nutrition and Immunity",
          year: "2023",
          url: "https://www.hsph.harvard.edu/nutritionsource/nutrition-and-immunity/",
        },
        category: "Immune System Support",
        categoryNumber: 28,
      },
      {
        id: "tip-27-2",
        title: "Rest & Recovery",
        desc: "Restorative sleep enhances T-cell adhesion molecule expression, amplifying systemic cell-mediated immune defense against viruses.",
        actions: [
          "Prioritize 7 to 9 hours of quality sleep every night.",
          "Allow your body to rest when you feel fatigued or unwell.",
          "Manage stress levels to prevent immune system suppression.",
          "Take downtime to recover fully from physical strain.",
        ],
        evidence: {
          source: "Sleep Foundation - How Sleep Affects Immunity",
          year: "2023",
          url: "https://www.sleepfoundation.org/physical-health/how-sleep-affects-immunity",
        },
        category: "Immune System Support",
        categoryNumber: 28,
      },
      {
        id: "tip-27-3",
        title: "Infection Prevention",
        desc: "Rigorous hygiene barriers and up-to-date immunizations eliminate infectious inocula before microbial dissemination occurs.",
        actions: [
          "Practice thorough handwashing routines throughout the day.",
          "Disinfect shared household surfaces and personal gadgets regularly.",
          "Avoid close contact with individuals showing signs of contagious illness.",
          "Keep vaccinations current according to public health guidelines.",
        ],
        evidence: {
          source: "CDC - Core Infection Prevention and Control Practices",
          year: "2024",
          url: "https://www.cdc.gov/infection-control/hcp/core-practices/index.html",
        },
        category: "Immune System Support",
        categoryNumber: 28,
      },
      {
        id: "tip-27-4",
        title: "Outdoor & Lifestyle Habits",
        desc: "Moderate physical conditioning and sunshine exposure enhance endogenous antimicrobial peptide production in respiratory tissues.",
        actions: [
          "Get moderate outdoor sun exposure to support immune health.",
          "Engage in regular, moderate exercise without overtraining.",
          "Avoid smoking and limit exposure to environmental pollutants.",
          "Stay hydrated to keep mucous membranes healthy against germs.",
        ],
        evidence: {
          source: "Harvard Health Publishing - How to Boost Your Immune System",
          year: "2023",
          url: "https://www.health.harvard.edu/staying-healthy/how-to-boost-your-immune-system",
        },
        category: "Immune System Support",
        categoryNumber: 28,
      },
    ],
  },
  {
    id: "thyroid-hormonal-balance",
    number: 29,
    name: "Thyroid & Hormonal Balance",
    description:
      "Endocrine axis homeostasis, thyroid micronutrient cofactors, and environmental endocrine disruptor mitigation.",
    tips: [
      {
        id: "tip-28-1",
        title: "Nutrient Support for Thyroid",
        desc: "Dietary iodine and selenium provide the essential atoms required for thyroxine synthesis and iodothyronine deiodinase activation.",
        actions: [
          "Consume adequate iodine through iodized salt or seafood if appropriate.",
          "Ensure sufficient intake of selenium-rich foods like Brazil nuts.",
          "Include zinc and iron in your balanced diet plan.",
          "Avoid extreme restrictive diets that disrupt hormonal balance.",
        ],
        evidence: {
          source:
            "American Thyroid Association - Iodine Deficiency and Thyroid Function",
          year: "2023",
          url: "https://www.thyroid.org/iodine-deficiency/",
        },
        category: "Thyroid & Hormonal Balance",
        categoryNumber: 29,
      },
      {
        id: "tip-28-2",
        title: "Stress & Cortisol Regulation",
        desc: "Excessive hypothalamic-pituitary-adrenal activation suppresses pituitary thyroid-stimulating hormone release.",
        actions: [
          "Practice daily stress-reduction techniques like meditation or deep breathing.",
          "Maintain consistent sleep schedules to support hormonal rhythms.",
          "Limit excessive consumption of caffeine and stimulants.",
          "Schedule leisure time to balance busy work schedules.",
        ],
        evidence: {
          source: "Endocrine Society - Adrenal Hormones and Stress Response",
          year: "2023",
          url: "https://www.endocrine.org/patient-engagement/endocrine-library/hormones-and-endocrine-function/adrenal-hormones",
        },
        category: "Thyroid & Hormonal Balance",
        categoryNumber: 29,
      },
      {
        id: "tip-28-3",
        title: "Hormonal Symptom Tracking",
        desc: "Logging basal temperatures, menstrual irregularities, and weight fluctuations helps clinicians pinpoint subtle endocrine pathology.",
        actions: [
          "Note changes in energy levels, weight, and body temperature.",
          "Track menstrual cycles or mood shifts to identify patterns.",
          "Report persistent fatigue or hair loss to a healthcare provider.",
          "Undergo routine blood tests if hormonal imbalance is suspected.",
        ],
        evidence: {
          source:
            "American Thyroid Association - Hypothyroidism Evaluation Guidelines",
          year: "2024",
          url: "https://www.thyroid.org/hypothyroidism/",
        },
        category: "Thyroid & Hormonal Balance",
        categoryNumber: 29,
      },
      {
        id: "tip-28-4",
        title: "Endocrine Disruptor Avoidance",
        desc: "Minimizing contact with bisphenols, phthalates, and PFAS chemicals prevents competitive binding to cellular hormone receptors.",
        actions: [
          "Limit exposure to certain plastics and chemical containers when heating food.",
          "Use natural cleaning and personal care products when possible.",
          "Filter drinking water to reduce chemical contaminants.",
          "Avoid handling thermal paper receipts unnecessarily.",
        ],
        evidence: {
          source:
            "National Institute of Environmental Health Sciences (NIH) - Endocrine Disruptors",
          year: "2023",
          url: "https://www.niehs.nih.gov/health/topics/agents/endocrine",
        },
        category: "Thyroid & Hormonal Balance",
        categoryNumber: 29,
      },
    ],
  },
  {
    id: "blood-circulation-care",
    number: 30,
    name: "Blood & Circulation Care",
    description:
      "Hemoglobin synthesis, peripheral venous return, and cardiovascular blood volume dynamics.",
    tips: [
      {
        id: "tip-29-1",
        title: "Iron-Rich Nutrition",
        desc: "Sufficient bioavailable iron sustains erythrocyte hemoglobin concentration, preventing hypochromic microcytic anemia.",
        actions: [
          "Include lean meats, beans, lentils, and spinach in your meals.",
          "Combine plant-based iron sources with Vitamin C to improve absorption.",
          "Avoid drinking tea or coffee immediately with iron-rich meals.",
          "Monitor iron levels if you experience persistent fatigue or dizziness.",
        ],
        evidence: {
          source:
            "National Institutes of Health (NIH) - Iron Consumer Fact Sheet",
          year: "2023",
          url: "https://ods.od.nih.gov/factsheets/Iron-Consumer/",
        },
        category: "Blood & Circulation Care",
        categoryNumber: 30,
      },
      {
        id: "tip-29-2",
        title: "Circulatory Movement",
        desc: "Contracting calf muscles activates the venous muscle pump, preventing blood stasis and venous thrombosis in deep veins.",
        actions: [
          "Avoid crossing your legs for long periods while sitting.",
          "Take frequent walking breaks during long flights or car rides.",
          "Wear compression stockings if recommended for travel or work.",
          "Perform calf stretches and ankle rolls while sitting.",
        ],
        evidence: {
          source: "CDC - Deep Vein Thrombosis and Travel Health",
          year: "2024",
          url: "https://www.cdc.gov/ncbddd/dvt/travel.html",
        },
        category: "Blood & Circulation Care",
        categoryNumber: 30,
      },
      {
        id: "tip-29-3",
        title: "Blood Donation Safety",
        desc: "Following clinical protocols before and after allogeneic blood donation guarantees donor safety and rapid volume restoration.",
        actions: [
          "Eat a iron-rich meal and stay hydrated before donating blood.",
          "Rest adequately and follow post-donation care instructions.",
          "Check eligibility requirements before scheduling a donation.",
          "Space out donations according to blood center guidelines.",
        ],
        evidence: {
          source:
            "American Red Cross - Blood Donation Guidelines and Donor Health",
          year: "2024",
          url: "https://www.redcrossblood.org/donate-blood/how-to-donate/common-concerns/first-time-donors.html",
        },
        category: "Blood & Circulation Care",
        categoryNumber: 30,
      },
      {
        id: "tip-29-4",
        title: "Cardiovascular Support",
        desc: "Aerobic activity stimulates endothelial nitric oxide synthase, inducing vasodilation and smooth laminar peripheral blood flow.",
        actions: [
          "Engage in regular aerobic exercises like swimming or brisk walking.",
          "Maintain a healthy blood pressure and cholesterol level.",
          "Avoid smoking, which severely damages blood vessels.",
          "Stay hydrated to support optimal blood volume and flow.",
        ],
        evidence: {
          source:
            "National Heart, Lung, and Blood Institute (NIH) - Blood Vessels and Vascular Health",
          year: "2023",
          url: "https://www.nhlbi.nih.gov/health/blood-vessels",
        },
        category: "Blood & Circulation Care",
        categoryNumber: 30,
      },
    ],
  },
  {
    id: "foot-lower-limb-care",
    number: 31,
    name: "Foot & Lower Limb Care",
    description:
      "Podiatric biomechanics, plantar fascia preservation, and diabetic lower extremity surveillance.",
    tips: [
      {
        id: "tip-30-1",
        title: "Proper Footwear Selection",
        desc: "Wearing anatomically contoured shoes with adequate arch support prevents plantar fasciitis, metatarsalgia, and Achilles tendonopathy.",
        actions: [
          "Choose shoes with adequate arch support and cushioning.",
          "Ensure shoes fit well with room for your toes to move.",
          "Replace worn-out athletic shoes after recommended mileage or time.",
          "Wear specialized shoes tailored to specific sports activities.",
        ],
        evidence: {
          source:
            "American Podiatric Medical Association (APMA) - Proper Footwear Guidelines",
          year: "2023",
          url: "https://www.apma.org/learn/foothealth.cfm?itemnumber=988",
        },
        category: "Foot & Lower Limb Care",
        categoryNumber: 31,
      },
      {
        id: "tip-30-2",
        title: "Daily Foot Hygiene",
        desc: "Daily cleansing and thorough interdigital drying eliminate tinea pedis dermatophytes and protect against skin maceration.",
        actions: [
          "Wash your feet daily with soap and warm water.",
          "Dry feet thoroughly, especially between the toes to prevent fungus.",
          "Apply moisturizing lotion to heels to prevent painful cracking.",
          "Inspect feet daily for cuts, blisters, or signs of infection.",
        ],
        evidence: {
          source:
            "American Podiatric Medical Association (APMA) - Foot Hygiene Standards",
          year: "2024",
          url: "https://www.apma.org/learn/foothealth.cfm?itemnumber=986",
        },
        category: "Foot & Lower Limb Care",
        categoryNumber: 31,
      },
      {
        id: "tip-30-3",
        title: "Nail & Skin Maintenance",
        desc: "Trimming nail plates horizontally preserves lateral nail folds, preventing onychocryptosis and secondary paronychia.",
        actions: [
          "Trim toenails straight across to prevent ingrown toenails.",
          "Avoid cutting toenails too short or rounding the corners sharply.",
          "Treat athlete's foot or fungal issues promptly with appropriate remedies.",
          "Visit a podiatrist for chronic foot pain or diabetic foot care.",
        ],
        evidence: {
          source:
            "American Podiatric Medical Association (APMA) - Toenail and Skin Health",
          year: "2023",
          url: "https://www.apma.org/learn/foothealth.cfm?itemnumber=985",
        },
        category: "Foot & Lower Limb Care",
        categoryNumber: 31,
      },
      {
        id: "tip-30-4",
        title: "Lower Limb Stretches",
        desc: "Stretching the gastrocnemius-soleus complex and plantar aponeurosis reduces mechanical strain across the ankle joint.",
        actions: [
          "Stretch calf muscles and Achilles tendons daily.",
          "Roll feet over a tennis ball or water bottle to relieve tight arches.",
          "Elevate legs at the end of the day to reduce swelling and fatigue.",
          "Perform ankle rotations to improve lower leg flexibility.",
        ],
        evidence: {
          source:
            "American Academy of Orthopaedic Surgeons (AAOS) - Foot and Ankle Conditioning",
          year: "2023",
          url: "https://orthoinfo.aaos.org/en/recovery/foot-and-ankle-conditioning-program/",
        },
        category: "Foot & Lower Limb Care",
        categoryNumber: 31,
      },
    ],
  },
  {
    id: "hair-scalp-nail-care",
    number: 32,
    name: "Hair, Scalp & Nail Care",
    description:
      "Follicular nutrition, keratin integrity preservation, and scalp microbiome balance.",
    tips: [
      {
        id: "tip-31-1",
        title: "Scalp Hygiene & Washing",
        desc: "Gentle cleansing regulates Malassezia yeast colonization, eliminating inflammatory dandruff and follicular plugging.",
        actions: [
          "Wash your hair and scalp using a gentle shampoo suited to your hair type.",
          "Avoid washing hair with excessively hot water, which strips natural oils.",
          "Massage your scalp gently during washing to stimulate blood circulation.",
          "Address dandruff or persistent scalp irritation with appropriate treatments.",
        ],
        evidence: {
          source:
            "American Academy of Dermatology - Tips for Healthy Hair and Scalp",
          year: "2023",
          url: "https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips",
        },
        category: "Hair, Scalp & Nail Care",
        categoryNumber: 32,
      },
      {
        id: "tip-31-2",
        title: "Heat Styling Protection",
        desc: "Thermal barrier sprays reduce heat denaturation of the keratin alpha-helix, preserving tensile elasticity of hair fibers.",
        actions: [
          "Apply a thermal protectant spray before using hair dryers or straighteners.",
          "Use the lowest effective heat setting on styling tools.",
          "Limit the frequency of heat styling to prevent hair breakage.",
          "Let hair air-dry naturally whenever possible.",
        ],
        evidence: {
          source:
            "American Academy of Dermatology - How to Stop Damaging Your Hair",
          year: "2023",
          url: "https://www.aad.org/public/everyday-care/hair-scalp-care/hair/reduce-hair-damage",
        },
        category: "Hair, Scalp & Nail Care",
        categoryNumber: 32,
      },
      {
        id: "tip-31-3",
        title: "Nutritional Support for Hair & Nails",
        desc: "Adequate essential amino acids, iron, and zinc are required for ribosomal protein synthesis in the actively dividing germinative nail matrix and hair follicle.",
        actions: [
          "Consume adequate protein, biotin, and vitamins for keratin production.",
          "Include healthy fats and iron-rich foods in your daily meals.",
          "Stay well-hydrated to keep hair shafts and nail beds healthy.",
          "Avoid crash diets that can trigger sudden hair thinning.",
        ],
        evidence: {
          source: "Harvard Health Publishing - Can What You Eat Help Your Hair",
          year: "2023",
          url: "https://www.health.harvard.edu/staying-healthy/can-what-you-eat-help-your-hair",
        },
        category: "Hair, Scalp & Nail Care",
        categoryNumber: 32,
      },
      {
        id: "tip-31-4",
        title: "Nail Protection Habits",
        desc: "Shielding unguis plates from repetitive chemical solvents prevents brittle onychoschizia and nail plate delamination.",
        actions: [
          "Wear gloves when cleaning with harsh chemicals or washing dishes.",
          "Avoid using your fingernails as tools to pry open packages.",
          "Keep nails clean and trim them regularly to prevent splitting.",
          "Avoid harsh nail polish removers containing acetone frequently.",
        ],
        evidence: {
          source: "American Academy of Dermatology - Healthy Nail Tips",
          year: "2024",
          url: "https://www.aad.org/public/everyday-care/nail-care-secrets/basics/healthy-nails/tips",
        },
        category: "Hair, Scalp & Nail Care",
        categoryNumber: 32,
      },
    ],
  },
  {
    id: "hearing-ear-health",
    number: 33,
    name: "Hearing & Ear Health",
    description:
      "Cochlear hair cell protection, safe cerumen hygiene, and environmental decibel awareness.",
    tips: [
      {
        id: "tip-32-1",
        title: "Noise Protection",
        desc: "Mitigating sound exposure above 85 dBA shields stereocilia hair cells in the organ of Corti from irreversible acoustic trauma.",
        actions: [
          "Wear earplugs or protective earmuffs in loud environments.",
          "Keep personal headphone volume below recommended safe limits (60%).",
          "Take regular listening breaks when using earbuds or headphones.",
          "Step away from sources of excessive, sudden loud noise.",
        ],
        evidence: {
          source:
            "National Institute on Deafness and Other Communication Disorders (NIDCD) - Noise-Induced Hearing Loss",
          year: "2024",
          url: "https://www.nidcd.nih.gov/health/noise-induced-hearing-loss",
        },
        category: "Hearing & Ear Health",
        categoryNumber: 33,
      },
      {
        id: "tip-32-2",
        title: "Ear Hygiene Safety",
        desc: "Refraining from canal instrumentation prevents cerumen impaction against the tympanic membrane and eliminates traumatic perforations.",
        actions: [
          "Never insert cotton swabs or sharp objects inside your ear canals.",
          "Clean only the outer ear gently with a damp cloth.",
          "Visit a healthcare professional for safe earwax removal if needed.",
          "Avoid using unverified ear-candling or home remedy tools.",
        ],
        evidence: {
          source:
            "American Academy of Otolaryngology - Earwax Care and Prevention of Impaction",
          year: "2023",
          url: "https://www.enthealth.org/be_ent_smart/earwax-and-what-to-do-about-it/",
        },
        category: "Hearing & Ear Health",
        categoryNumber: 33,
      },
      {
        id: "tip-32-3",
        title: "Hearing Screening",
        desc: "Audiological evaluations identify early presbycusis and middle ear effusions, enabling timely hearing conservation interventions.",
        actions: [
          "Schedule routine hearing evaluations, especially as you age.",
          "Report sudden hearing loss, ringing (tinnitus), or pain immediately.",
          "Protect ears from water trapped during swimming using earplugs.",
          "Manage chronic ear infections promptly with medical care.",
        ],
        evidence: {
          source: "CDC - Hearing Loss Treatment and Intervention Guidelines",
          year: "2023",
          url: "https://www.cdc.gov/hearing-loss/treatment/index.html",
        },
        category: "Hearing & Ear Health",
        categoryNumber: 33,
      },
      {
        id: "tip-32-4",
        title: "Acoustic Awareness",
        desc: "Cultivating mindfulness regarding chronic low-level acoustic pollution mitigates neurogenic stress and autonomic hypertension.",
        actions: [
          "Be mindful of background noise levels in your daily workspace.",
          "Choose quieter venues for social gatherings when possible.",
          "Educate children on safe listening habits and volume limits.",
          "Support community policies regulating excessive environmental noise.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Make Listening Safe Campaign",
          year: "2024",
          url: "https://www.who.int/activities/making-listening-safe",
        },
        category: "Hearing & Ear Health",
        categoryNumber: 33,
      },
    ],
  },
  {
    id: "longevity-healthy-aging",
    number: 34,
    name: "Longevity & Healthy Aging",
    description:
      "Cellular senescence prevention, sarcopenia mitigation, and active functional independence.",
    tips: [
      {
        id: "tip-33-1",
        title: "Cellular Health & Nutrition",
        desc: "Caloric moderation, mitochondrial support, and polyphenol-dense nutrition delay the accumulation of toxic cellular senescence products.",
        actions: [
          "Consume antioxidant-rich foods to combat oxidative stress.",
          "Eat a colorful variety of plant-based whole foods daily.",
          "Limit ultra-processed foods, artificial additives, and excess sugar.",
          "Stay hydrated to support cellular function and waste removal.",
        ],
        evidence: {
          source:
            "National Institute on Aging (NIH) - Healthy Eating as You Age",
          year: "2023",
          url: "https://www.nia.nih.gov/health/healthy-eating/healthy-eating-you-age-know-your-food-groups",
        },
        category: "Longevity & Healthy Aging",
        categoryNumber: 34,
      },
      {
        id: "tip-33-2",
        title: "Active Physical Aging",
        desc: "Sustained resistance stimulus and neuromuscular agility drills preserve functional motor units, warding off severe frailty syndrome.",
        actions: [
          "Maintain muscle mass through regular strength and resistance training.",
          "Practice balance and agility drills to prevent falls.",
          "Stay physically active with daily low-impact movements.",
          "Listen to your body and modify exercises as needed.",
        ],
        evidence: {
          source:
            "National Institute on Aging (NIH) - Exercise and Physical Activity for Older Adults",
          year: "2024",
          url: "https://www.nia.nih.gov/health/exercise-and-physical-activity",
        },
        category: "Longevity & Healthy Aging",
        categoryNumber: 34,
      },
      {
        id: "tip-33-3",
        title: "Mental & Social Engagement",
        desc: "Enriched interpersonal engagement and lifelong learning stimulate cognitive synaptic density throughout later life.",
        actions: [
          "Keep your brain active through continuous learning and puzzles.",
          "Maintain strong social connections with friends, family, and community.",
          "Participate in group activities, clubs, or volunteer work.",
          "Pursue creative hobbies and new personal interests.",
        ],
        evidence: {
          source:
            "National Institute on Aging (NIH) - Cognitive Health and Social Participation",
          year: "2023",
          url: "https://www.nia.nih.gov/health/brain-health/cognitive-health-and-older-adults",
        },
        category: "Longevity & Healthy Aging",
        categoryNumber: 34,
      },
      {
        id: "tip-33-4",
        title: "Proactive Healthcare Tracking",
        desc: "Coordinated geriatric checkups and comprehensive polypharmacy audits minimize harmful drug-drug interactions and adverse outcomes.",
        actions: [
          "Attend regular geriatric or routine adult health checkups.",
          "Keep track of immunizations, screenings, and medication lists.",
          "Discuss cognitive and physical changes openly with your doctor.",
          "Create a long-term wellness plan focused on quality of life.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Ageing and Health Global Framework",
          year: "2024",
          url: "https://www.who.int/teams/maternal-newborn-child-adolescent-health-and-ageing/ageing-and-health",
        },
        category: "Longevity & Healthy Aging",
        categoryNumber: 34,
      },
    ],
  },
  {
    id: "travel-mobility-health",
    number: 35,
    name: "Travel & Mobility Health",
    description:
      "Pre-travel prophylaxis, deep vein thrombosis mitigation in transit, and geographic pathogen avoidance.",
    tips: [
      {
        id: "tip-34-1",
        title: "Pre-Travel Preparation",
        desc: "Consulting geographic health advisories and updating destination vaccines confers protective antibodies before endemic exposure.",
        actions: [
          "Research destination health advisories and vaccine requirements.",
          "Pack a medical kit with prescription medications and first aid supplies.",
          "Purchase travel health insurance covering emergency medical care.",
          "Keep digital copies of vital medical documents and insurance cards.",
        ],
        evidence: {
          source: "CDC - Travelers' Health Clinical Guidance",
          year: "2024",
          url: "https://wwwnc.cdc.gov/travel",
        },
        category: "Travel & Mobility Health",
        categoryNumber: 35,
      },
      {
        id: "tip-34-2",
        title: "In-Transit Health",
        desc: "Hydration and periodic ambulation during long-haul transit combat cabin hypobaric hypoxia and prevent traveler's venous stasis.",
        actions: [
          "Stay hydrated by drinking plenty of water during flights or road trips.",
          "Walk and stretch your legs frequently during long-distance travel.",
          "Wear comfortable, loose-fitting clothing while traveling.",
          "Practice good hand hygiene in airports, stations, and public transport.",
        ],
        evidence: {
          source: "CDC - Blood Clots and Travel Risks",
          year: "2023",
          url: "https://wwwnc.cdc.gov/travel/page/dvt",
        },
        category: "Travel & Mobility Health",
        categoryNumber: 35,
      },
      {
        id: "tip-34-3",
        title: "Food & Water Safety Abroad",
        desc: "Strict adherence to thermal food standards and commercial seal verification stops debilitating enteric bacterial gastroenteritis.",
        actions: [
          "Drink bottled or treated water in regions with unverified supplies.",
          "Eat hot, freshly cooked foods and avoid raw street food if unsure.",
          "Wash or peel raw fruits and vegetables before consumption.",
          "Avoid ice cubes made from untreated tap water.",
        ],
        evidence: {
          source: "CDC - Food and Water Safety for International Travelers",
          year: "2024",
          url: "https://wwwnc.cdc.gov/travel/page/food-water-safety",
        },
        category: "Travel & Mobility Health",
        categoryNumber: 35,
      },
      {
        id: "tip-34-4",
        title: "Post-Travel Recovery",
        desc: "Monitoring for incubation of tropical pathogens and realigning circadian rhythms ensures a safe transition back to baseline health.",
        actions: [
          "Allow time to adjust to time zone shifts and sleep schedules.",
          "Monitor your health for any unusual symptoms after returning home.",
          "Seek medical evaluation promptly if you develop a fever or illness.",
          "Re-establish regular diet and exercise routines quickly.",
        ],
        evidence: {
          source: "CDC - What to Do If You Get Sick After Traveling",
          year: "2023",
          url: "https://wwwnc.cdc.gov/travel/page/post-travel-illness",
        },
        category: "Travel & Mobility Health",
        categoryNumber: 35,
      },
    ],
  },
  {
    id: "workplace-occupational-health",
    number: 36,
    name: "Workplace & Occupational Health",
    description:
      "Industrial safety hygiene, burnout prevention, and occupational ergonomic harmony.",
    tips: [
      {
        id: "tip-35-1",
        title: "Desk Ergonomics",
        desc: "Adapting workstation equipment to human biomechanical proportions significantly lowers chronic musculoskeletal strain injuries.",
        actions: [
          "Adjust your chair, desk, and keyboard for a neutral posture.",
          "Take a short stretch or standing break every 45 to 60 minutes.",
          "Position your monitor at eye level to prevent neck strain.",
          "Ensure adequate lighting to avoid eye fatigue and headaches.",
        ],
        evidence: {
          source: "OSHA - Computer Workstations Ergonomics and Positioning",
          year: "2023",
          url: "https://www.osha.gov/etools/computer-workstations/components",
        },
        category: "Workplace & Occupational Health",
        categoryNumber: 36,
      },
      {
        id: "tip-35-2",
        title: "Workplace Stress Management",
        desc: "Structured cognitive boundaries and scheduled micro-breaks downregulate autonomic burnout and maintain productive focus.",
        actions: [
          "Prioritize tasks and set realistic daily accomplishment goals.",
          "Communicate openly with supervisors or teammates about workloads.",
          "Take your designated lunch and rest breaks away from work stations.",
          "Practice deep breathing exercises when feeling overwhelmed at work.",
        ],
        evidence: {
          source: "CDC / NIOSH - Stress at Work Prevention and Management",
          year: "2024",
          url: "https://www.cdc.gov/niosh/topics/stress/",
        },
        category: "Workplace & Occupational Health",
        categoryNumber: 36,
      },
      {
        id: "tip-35-3",
        title: "Chemical & Material Safety",
        desc: "Consistent deployment of certified personal protective gear prevents chronic toxic exposures and occupational respiratory hazards.",
        actions: [
          "Follow safety data sheets when handling workplace chemicals.",
          "Wear required personal protective equipment (PPE) consistently.",
          "Ensure proper ventilation in workshops, labs, or art studios.",
          "Wash hands thoroughly after handling industrial or office supplies.",
        ],
        evidence: {
          source: "OSHA - Chemical Hazards and Toxic Substances Guidelines",
          year: "2024",
          url: "https://www.osha.gov/chemical-hazards",
        },
        category: "Workplace & Occupational Health",
        categoryNumber: 36,
      },
      {
        id: "tip-35-4",
        title: "Work-Life Boundary Setting",
        desc: "Defending digital disconnection periods during evenings and weekends prevents chronic adrenal burnout and preserves psychological recovery.",
        actions: [
          "Disconnect from work emails and messages outside of working hours.",
          "Dedicate evenings and weekends to personal rest and hobbies.",
          "Use paid time off to recharge mentally and physically.",
          "Seek support through employee wellness programs if needed.",
        ],
        evidence: {
          source:
            "American Psychological Association (APA) - Mental Health in the Workplace",
          year: "2023",
          url: "https://www.apa.org/topics/workplace",
        },
        category: "Workplace & Occupational Health",
        categoryNumber: 36,
      },
    ],
  },
  {
    id: "digital-wellness-screen-balance",
    number: 37,
    name: "Digital Wellness & Screen Balance",
    description:
      "Digital boundary setting, blue-light mitigation, and mindful technology integration.",
    tips: [
      {
        id: "tip-36-1",
        title: "Screen Time Management",
        desc: "Setting deliberate boundaries around screen time curbs dopamine fatigue and improves real-world cognitive presence.",
        actions: [
          "Set daily time limits on social media and entertainment apps.",
          "Use built-in digital wellbeing trackers to monitor usage habits.",
          "Designate specific screen-free zones, such as the dining table.",
          "Turn off non-essential smartphone notifications to reduce distractions.",
        ],
        evidence: {
          source:
            "Mayo Clinic - Screen Time and Your Mental and Physical Health",
          year: "2023",
          url: "https://www.mayoclinichealthsystem.org/hometown-health/speaking-of-health/screen-time-and-your-health",
        },
        category: "Digital Wellness & Screen Balance",
        categoryNumber: 37,
      },
      {
        id: "tip-36-2",
        title: "Bedtime Digital Boundaries",
        desc: "Cutting off short-wavelength blue light before sleep preserves nocturnal melatonin secretion and enhances sleep continuity.",
        actions: [
          "Stop using phones, tablets, and computers an hour before bed.",
          "Use physical alarm clocks instead of keeping phones by the bed.",
          "Enable night-shift or warm-light display settings on devices.",
          "Keep bedrooms free of glowing screens to improve sleep quality.",
        ],
        evidence: {
          source:
            "Sleep Foundation - How Electronics Affect Sleep and Melatonin",
          year: "2023",
          url: "https://www.sleepfoundation.org/how-sleep-works/how-electronics-affect-sleep",
        },
        category: "Digital Wellness & Screen Balance",
        categoryNumber: 37,
      },
      {
        id: "tip-36-3",
        title: "Digital Posture Care",
        desc: "Mindful positioning while interacting with smart devices protects carpal nerve tunnels and prevents persistent tech-neck cervical spasms.",
        actions: [
          'Hold devices at eye level to prevent "text neck" and strain.',
          "Take frequent eye-rest breaks using the 20-20-20 rule.",
          "Stretch your wrists and hands regularly to prevent repetitive strain.",
          "Sit back in your chair with proper lumbar support while browsing.",
        ],
        evidence: {
          source:
            "Spine-Health - Text Neck Causes, Symptoms and Relief Stretches",
          year: "2023",
          url: "https://www.spine-health.com/conditions/neck-pain/text-neck-treatment-and-prevention",
        },
        category: "Digital Wellness & Screen Balance",
        categoryNumber: 37,
      },
      {
        id: "tip-36-4",
        title: "Mindful Online Engagement",
        desc: "Curating healthy digital information streams guards against cyber-stress and the harmful impacts of comparative anxiety.",
        actions: [
          "Curate your social media feeds to follow inspiring, positive accounts.",
          "Take regular multi-day digital detox breaks over weekends.",
          "Avoid engaging in negative online arguments or toxic spaces.",
          "Prioritize face-to-face social interactions over digital messaging.",
        ],
        evidence: {
          source:
            "American Psychological Association (APA) - Social Media Use and Mental Health",
          year: "2024",
          url: "https://www.apa.org/topics/social-media-internet/mental-health",
        },
        category: "Digital Wellness & Screen Balance",
        categoryNumber: 37,
      },
    ],
  },
  {
    id: "respiratory-air-quality-protection",
    number: 38,
    name: "Respiratory & Air Quality Protection",
    description:
      "Comprehensive indoor and outdoor air quality management, lung function protection, and mold mitigation.",
    tips: [
      {
        id: "tip-37-1",
        title: "Indoor Air Quality Management",
        desc: "Optimal domestic airflow and mechanical filtration remove airborne allergens, bioaerosols, and volatile indoor cooking byproducts.",
        actions: [
          "Keep indoor spaces well-ventilated by opening windows when outdoor air is clean.",
          "Use high-efficiency particulate air (HEPA) filters in living areas.",
          "Clean or replace air conditioning and heating filters regularly.",
          "Avoid burning incense, heavy candles, or indoor biomass fuels.",
        ],
        evidence: {
          source:
            "U.S. EPA - Improving Indoor Air Quality in Residential Spaces",
          year: "2024",
          url: "https://www.epa.gov/indoor-air-quality-iaq/improving-indoor-air-quality",
        },
        category: "Respiratory & Air Quality Protection",
        categoryNumber: 38,
      },
      {
        id: "tip-37-2",
        title: "Outdoor Pollution Safety",
        desc: "Adapting exertion routines during ozone and wildfire smoke spikes protects respiratory mucosal barriers from severe oxidative inflammation.",
        actions: [
          "Check daily air quality index (AQI) reports before outdoor workouts.",
          "Wear N95 or protective masks on days with heavy smog or smoke.",
          "Avoid exercising near heavy traffic corridors during rush hours.",
          "Stay indoors during extreme pollen or pollution advisories.",
        ],
        evidence: {
          source:
            "American Lung Association - Outdoor Air Pollution Health Impacts",
          year: "2024",
          url: "https://www.lung.org/clean-air/outdoors/what-makes-air-unhealthy",
        },
        category: "Respiratory & Air Quality Protection",
        categoryNumber: 38,
      },
      {
        id: "tip-37-3",
        title: "Lung Health Habits",
        desc: "Complete smoking avoidance and targeted deep breathing practices maintain vital lung volume and protect surfactant production.",
        actions: [
          "Practice deep breathing exercises to maintain full lung capacity.",
          "Avoid smoking and secondhand smoke exposure completely.",
          "Stay hydrated to keep respiratory mucous membranes thin and clear.",
          "Get vaccinated against respiratory infections like flu and pneumonia.",
        ],
        evidence: {
          source: "American Lung Association - Protecting Your Lungs Overview",
          year: "2024",
          url: "https://www.lung.org/lung-health-diseases/wellness/protecting-your-lungs",
        },
        category: "Respiratory & Air Quality Protection",
        categoryNumber: 38,
      },
      {
        id: "tip-37-4",
        title: "Allergen & Mold Control",
        desc: "Controlling indoor humidity below 50% halts toxic black mold sporulation and minimizes dust mite reproduction in bedding.",
        actions: [
          "Use dehumidifiers in damp areas like basements and bathrooms.",
          "Clean shower curtains and bathroom tiles to prevent mold growth.",
          "Wash bedding weekly in hot water to remove dust mites.",
          "Vacuum carpets frequently using vacuums with HEPA filtration.",
        ],
        evidence: {
          source: "CDC - Mold Prevention Strategies and Health Implications",
          year: "2023",
          url: "https://www.cdc.gov/mold-health/prevention/index.html",
        },
        category: "Respiratory & Air Quality Protection",
        categoryNumber: 38,
      },
    ],
  },
  {
    id: "holistic-energy-vitality",
    number: 39,
    name: "Holistic Energy & Vitality",
    description:
      "Metabolic mitochondrial pacing, energy stability, and circadian alignment for daily vitality.",
    tips: [
      {
        id: "tip-38-1",
        title: "Circadian Rhythm Alignment",
        desc: "Early morning photon exposure triggers healthy cortisol awakening spikes and sets optimal nighttime melatonin timing.",
        actions: [
          "Get natural sunlight exposure within an hour of waking up.",
          "Maintain a consistent sleep schedule even on weekends.",
          "Dim lights in the evening to signal your body for rest.",
          "Limit exposure to bright screens late at night.",
        ],
        evidence: {
          source:
            "National Institute of General Medical Sciences (NIH) - Circadian Rhythms Fact Sheet",
          year: "2023",
          url: "https://www.nigms.nih.gov/education/fact-sheets/Pages/circadian-rhythms.aspx",
        },
        category: "Holistic Energy & Vitality",
        categoryNumber: 39,
      },
      {
        id: "tip-38-2",
        title: "Energy-Boosting Nutrition",
        desc: "Balanced meals pairing low-glycemic carbs with healthy fats stabilize adenosine triphosphate production and avoid insulin crashes.",
        actions: [
          "Eat balanced meals combining complex carbs, protein, and healthy fats.",
          "Avoid sugar crashes by limiting refined sweets and pastries.",
          "Snack on nutrient-dense options like nuts, seeds, or fruit.",
          "Stay hydrated with water throughout the day to prevent fatigue.",
        ],
        evidence: {
          source:
            "Harvard Health Publishing - Eating to Boost Energy and Fight Fatigue",
          year: "2023",
          url: "https://www.health.harvard.edu/energy-and-fatigue/eating-to-boost-energy",
        },
        category: "Holistic Energy & Vitality",
        categoryNumber: 39,
      },
      {
        id: "tip-38-3",
        title: "Physical Movement for Vitality",
        desc: "Brief bouts of brisk physical activity stimulate catecholamine release and restore cerebral blood flow during midday fatigue slumps.",
        actions: [
          "Engage in brisk walking or light exercise to boost morning alertness.",
          "Take short walking breaks during the afternoon energy slump.",
          "Stretch tight muscles to release physical stiffness and tension.",
          "Avoid strenuous workouts right before bedtime.",
        ],
        evidence: {
          source:
            "American Heart Association - Why Physical Activity is Essential for Vitality",
          year: "2023",
          url: "https://www.heart.org/en/healthy-living/fitness/fitness-basics/why-is-physical-activity-so-important-for-health-and-wellbeing",
        },
        category: "Holistic Energy & Vitality",
        categoryNumber: 39,
      },
      {
        id: "tip-38-4",
        title: "Mental Rest & Pacing",
        desc: "Systematic mental micro-breaks prevent cognitive exhaustion and protect emotional equilibrium throughout demanding schedules.",
        actions: [
          "Pace your daily tasks to avoid burnout and extreme exhaustion.",
          "Take short mindfulness or quiet meditation breaks.",
          "Express gratitude to maintain a positive mental outlook.",
          "Disconnect from stressful news cycles periodically.",
        ],
        evidence: {
          source:
            "American Psychological Association (APA) - Burnout Prevention and Pacing",
          year: "2024",
          url: "https://www.apa.org/topics/stress/burnout",
        },
        category: "Holistic Energy & Vitality",
        categoryNumber: 39,
      },
    ],
  },
  {
    id: "family-community-health-connection",
    number: 40,
    name: "Family & Community Health Connection",
    description:
      "Shared familial wellness habits, community peer support, and collective health resilience.",
    tips: [
      {
        id: "tip-39-1",
        title: "Family Health Sharing",
        desc: "Documenting multi-generational family medical pedigrees empowers early targeted screenings and promotes healthy home cooking.",
        actions: [
          "Discuss family medical histories openly to identify shared risks.",
          "Cook and eat nutritious home-cooked meals together as a family.",
          "Encourage physical activities and outdoor games with family members.",
          "Coordinate family health checkups and vaccination schedules.",
        ],
        evidence: {
          source: "CDC - Family Health History and Genomics",
          year: "2023",
          url: "https://www.cdc.gov/genomics/famhistory/index.htm",
        },
        category: "Family & Community Health Connection",
        categoryNumber: 40,
      },
      {
        id: "tip-39-2",
        title: "Supportive Social Networks",
        desc: "Fostering empathetic community relationships builds psychological security and decreases cardiovascular morbidity across neighborhoods.",
        actions: [
          "Cultivate meaningful relationships with reliable friends and neighbors.",
          "Check in on elderly or vulnerable community members regularly.",
          "Participate in community wellness events and local health drives.",
          "Share reliable health and wellness tips with your social circle.",
        ],
        evidence: {
          source: "CDC - Social Connectedness and Emotional Well-being",
          year: "2024",
          url: "https://www.cdc.gov/emotional-wellbeing/social-connectedness/index.html",
        },
        category: "Family & Community Health Connection",
        categoryNumber: 40,
      },
      {
        id: "tip-39-3",
        title: "Safe Community Environments",
        desc: "Collaborative advocacy for hygienic municipal spaces and safe recreational trails encourages active outdoor lifestyles for all ages.",
        actions: [
          "Support local initiatives maintaining clean parks and walking paths.",
          "Promote safe driving, biking, and pedestrian habits in your area.",
          "Dispose of household waste safely to protect local environments.",
          "Report public health hazards to appropriate local authorities.",
        ],
        evidence: {
          source:
            "World Health Organization (WHO) - Healthy Environments for Children and Communities",
          year: "2023",
          url: "https://www.who.int/teams/environment-climate-change-and-health/healthy-environments-for-children",
        },
        category: "Family & Community Health Connection",
        categoryNumber: 40,
      },
      {
        id: "tip-39-4",
        title: "Collaborative Wellness Culture",
        desc: "Grassroots health sharing de-stigmatizes mental health challenges and reinforces collective preventative medicine standards.",
        actions: [
          "Join or create wellness groups focusing on fitness or nutrition.",
          "Share educational health resources within community channels.",
          "Foster a supportive, stigma-free environment for mental health.",
          "Celebrate community health milestones and positive achievements.",
        ],
        evidence: {
          source:
            "American Public Health Association (APHA) - Community Health Action",
          year: "2024",
          url: "https://www.apha.org/topics-and-issues/health-equity",
        },
        category: "Family & Community Health Connection",
        categoryNumber: 40,
      },
    ],
  },
]

/** Flattened array of all 160 health tips for real-time multi-attribute search */
export const ALL_HEALTH_TIPS: HealthTipItem[] = HEALTH_TIP_CATEGORIES.flatMap(
  (category) => category.tips,
)
