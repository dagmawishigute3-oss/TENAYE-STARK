import { DiseaseItem, DISEASES_DATA_1 } from "./diseasesData1"
import { DISEASES_DATA_2 } from "./diseasesData2"
import { DISEASES_DATA_3 } from "./diseasesData3"
import { DISEASES_DATA_4 } from "./diseasesData4"
import { DISEASES_DATA_5 } from "./diseasesData5"

export type { DiseaseItem }

export const ALL_DISEASES: DiseaseItem[] = [
  ...DISEASES_DATA_1,
  ...DISEASES_DATA_2,
  ...DISEASES_DATA_3,
  ...DISEASES_DATA_4,
  ...DISEASES_DATA_5,
]

export const CATEGORIES = [
  "All Categories",
  "Cardiovascular",
  "Respiratory",
  "Infectious",
  "Metabolic",
  "Mental Health",
  "Neurological",
  "Musculoskeletal",
  "Oncology",
  "Renal",
  "Gastrointestinal",
]

export const SEVERITY_LABEL: Record<string, string> = {
  High: "High",
  Medium: "Moderate",
  Low: "Low",
}

export const DISEASES_BY_ID: Record<string, DiseaseItem> = {}
export const DISEASE_DB = DISEASES_BY_ID

ALL_DISEASES.forEach((d) => {
  DISEASES_BY_ID[d.id] = d
  const simpleKey = d.name.toLowerCase().replace(/[^a-z0-9]/g, "")
  if (!DISEASES_BY_ID[simpleKey]) {
    DISEASES_BY_ID[simpleKey] = d
  }
})

// Common route aliases
if (DISEASES_BY_ID["hypertension-htn"])
  DISEASES_BY_ID["hypertension"] = DISEASES_BY_ID["hypertension-htn"]
if (DISEASES_BY_ID["coronary-artery-disease-cad"])
  DISEASES_BY_ID["cad"] = DISEASES_BY_ID["coronary-artery-disease-cad"]
if (DISEASES_BY_ID["congestive-heart-failure-chf"])
  DISEASES_BY_ID["chf"] = DISEASES_BY_ID["congestive-heart-failure-chf"]
if (DISEASES_BY_ID["atrial-fibrillation-afib"])
  DISEASES_BY_ID["afib"] = DISEASES_BY_ID["atrial-fibrillation-afib"]
if (DISEASES_BY_ID["plasmodium-falciparum-malaria"])
  DISEASES_BY_ID["malaria"] = DISEASES_BY_ID["plasmodium-falciparum-malaria"]
if (DISEASES_BY_ID["symptomatic-hiv-infection"])
  DISEASES_BY_ID["hiv"] = DISEASES_BY_ID["symptomatic-hiv-infection"]
if (DISEASES_BY_ID["tuberculosis-tb"])
  DISEASES_BY_ID["tb"] = DISEASES_BY_ID["tuberculosis-tb"]
if (DISEASES_BY_ID["allergic-asthma"])
  DISEASES_BY_ID["asthma"] = DISEASES_BY_ID["allergic-asthma"]
if (DISEASES_BY_ID["major-depressive-disorder"])
  DISEASES_BY_ID["depression"] = DISEASES_BY_ID["major-depressive-disorder"]
if (DISEASES_BY_ID["type-2-diabetes-mellitus"])
  DISEASES_BY_ID["diabetes"] = DISEASES_BY_ID["type-2-diabetes-mellitus"]
if (DISEASES_BY_ID["novel-coronavirus-2019-ncov-covid-19"])
  DISEASES_BY_ID["covid"] =
    DISEASES_BY_ID["novel-coronavirus-2019-ncov-covid-19"]
if (DISEASES_BY_ID["infective-endocarditis"])
  DISEASES_BY_ID["endocarditis"] = DISEASES_BY_ID["infective-endocarditis"]
if (DISEASES_BY_ID["constrictive-pericarditis"])
  DISEASES_BY_ID["pericarditis"] = DISEASES_BY_ID["constrictive-pericarditis"]
if (DISEASES_BY_ID["mitral-valve-stenosis"])
  DISEASES_BY_ID["mitral-stenosis"] = DISEASES_BY_ID["mitral-valve-stenosis"]

// Legacy cardiac entries
const LEGACY_EXTRAS: DiseaseItem[] = [
  {
    id: "mvp",
    name: "Mitral Valve Prolapse (MVP)",
    category: "Cardiovascular",
    severity: "Low",
    prevalence: "Common: Affects 2–3% of the population. More common in women.",
    description:
      "Mitral Valve Prolapse is a condition where the mitral valve doesn't close properly, allowing blood to flow backward into the left atrium. Most people with MVP have no symptoms and require no treatment.",
    desc: "Mitral Valve Prolapse is a condition where the mitral valve doesn't close properly, allowing blood to flow backward into the left atrium. Most people with MVP have no symptoms and require no treatment.",
    symptoms: [
      "Often asymptomatic",
      "Heart palpitations or irregular heartbeat",
      "Chest pain",
      "Fatigue",
      "Shortness of breath",
      "Dizziness or lightheadedness",
    ],
    causes: [
      "Abnormal mitral valve leaflets",
      "Connective tissue abnormalities",
      "Genetic factors",
      "Marfan syndrome",
    ],
    treatment: [
      "Regular monitoring with echocardiograms",
      "Beta-blockers for palpitations",
      "Blood thinners if blood clots are a risk",
      "Surgery in severe cases",
    ],
    selfCare: [
      "Limit caffeine and alcohol",
      "Stay well hydrated",
      "Practice stress management techniques",
      "Maintain regular exercise",
    ],
    prevention: [
      "Regular cardiac check-ups",
      "Inform all healthcare providers of MVP diagnosis",
    ],
    riskFactors: [
      "Female sex",
      "Family history",
      "Connective tissue disorders",
      "Scoliosis",
    ],
    warningSigns: [
      "Severe shortness of breath",
      "Irregular heartbeat",
      "Chest pain",
      "Fainting",
    ],
  },
  {
    id: "aortic-stenosis",
    name: "Aortic Stenosis",
    category: "Cardiovascular",
    severity: "High",
    prevalence:
      "Affects approximately 2% of people over age 65 and 3% of people over age 75.",
    description:
      "A narrowing of the aortic valve opening, restricting blood flow from the left ventricle to the aorta. Can lead to heart failure if untreated.",
    desc: "A narrowing of the aortic valve opening, restricting blood flow from the left ventricle to the aorta. Can lead to heart failure if untreated.",
    symptoms: [
      "Chest pain",
      "Fainting with exertion",
      "Shortness of breath with activity",
      "Heart palpitations",
      "Fatigue",
    ],
    causes: [
      "Calcium buildup on the valve leaflets with age",
      "Congenital heart defect (bicuspid aortic valve)",
      "Rheumatic fever complications",
    ],
    treatment: [
      "Transcatheter aortic valve replacement (TAVR)",
      "Surgical aortic valve replacement (SAVR)",
      "Medications to manage symptoms and blood pressure",
    ],
    selfCare: [
      "Avoid heavy strenuous isometric lifting",
      "Follow a low-sodium heart-healthy diet",
      "Maintain regular cardiology follow-ups",
    ],
    prevention: [
      "Maintain healthy cardiovascular lifestyle",
      "Control cholesterol and high blood pressure",
    ],
    riskFactors: [
      "Older age",
      "Bicuspid aortic valve",
      "High cholesterol",
      "Hypertension",
      "Chronic kidney disease",
    ],
    warningSigns: [
      "Chest pain radiating to arm or jaw",
      "Sudden fainting or blacking out",
      "Severe shortness of breath at rest",
    ],
  },
  {
    id: "aortic-regurgitation",
    name: "Aortic Regurgitation",
    category: "Cardiovascular",
    severity: "Medium",
    prevalence:
      "Prevalence increases with age; present in up to 13% of elderly individuals.",
    description:
      "Aortic Regurgitation is a condition where the aortic valve doesn't close tightly, causing blood to leak backward into the left ventricle.",
    desc: "Aortic Regurgitation is a condition where the aortic valve doesn't close tightly, causing blood to leak backward into the left ventricle.",
    symptoms: [
      "Fatigue and weakness",
      "Shortness of breath with activity or when lying flat",
      "Heart palpitations",
      "Chest pain during exertion",
    ],
    causes: [
      "Aortic valve degeneration",
      "High blood pressure",
      "Endocarditis",
      "Aortic root dilation",
      "Rheumatic heart disease",
    ],
    treatment: [
      "Surgical or catheter valve repair or replacement",
      "Vasodilators and blood pressure control medications",
      "Close echocardiographic surveillance",
    ],
    selfCare: [
      "Elevate head while sleeping if short of breath",
      "Limit sodium intake",
      "Avoid excessive caffeine",
    ],
    prevention: [
      "Strict blood pressure management",
      "Regular cardiac screenings",
    ],
    riskFactors: [
      "Advanced age",
      "History of rheumatic fever",
      "Hypertension",
      "Marfan syndrome",
    ],
    warningSigns: [
      "Rapidly worsening shortness of breath",
      "Sudden severe chest pain",
      "Inability to breathe lying down",
    ],
  },
  {
    id: "mitral-regurgitation",
    name: "Mitral Regurgitation",
    category: "Cardiovascular",
    severity: "Medium",
    prevalence:
      "The most common type of heart valve disease in high-income and developing countries.",
    description:
      "A condition where the mitral valve leaflets do not close completely, allowing blood to leak backward into the left atrium during ventricular contraction.",
    desc: "A condition where the mitral valve leaflets do not close completely, allowing blood to leak backward into the left atrium during ventricular contraction.",
    symptoms: [
      "Fatigue",
      "Shortness of breath with exertion or when lying down",
      "Heart palpitations",
      "Swollen feet or ankles",
    ],
    causes: [
      "Mitral valve prolapse (MVP)",
      "Damaged tissue cords",
      "Rheumatic fever",
      "Coronary artery disease",
      "Endocarditis",
    ],
    treatment: [
      "Mitral valve repair or replacement",
      "Transcatheter edge-to-edge repair",
      "Diuretics and ACE inhibitors",
    ],
    selfCare: [
      "Eat a balanced heart-healthy diet",
      "Maintain moderate physical activity",
      "Limit sodium and fluid intake",
    ],
    prevention: [
      "Manage blood pressure and coronary artery disease",
      "Maintain healthy dental hygiene",
    ],
    riskFactors: [
      "Mitral valve prolapse",
      "Prior heart attack",
      "Rheumatic heart disease history",
    ],
    warningSigns: [
      "Sudden extreme shortness of breath",
      "Blue lips or fingernails",
      "Loss of consciousness",
    ],
  },
  {
    id: "tricuspid-regurgitation",
    name: "Tricuspid Regurgitation",
    category: "Cardiovascular",
    severity: "Low",
    prevalence:
      "Mild form is common and often benign; moderate to severe forms occur secondary to left heart disease.",
    description:
      "A condition where the tricuspid valve doesn't close properly, allowing blood to flow backward into the right atrium.",
    desc: "A condition where the tricuspid valve doesn't close properly, allowing blood to flow backward into the right atrium.",
    symptoms: [
      "Fatigue and weakness",
      "Swelling in abdomen, legs, and veins in the neck",
      "Pulsing in neck veins",
    ],
    causes: [
      "Enlargement of right ventricle",
      "Left-sided heart failure",
      "Infective endocarditis",
      "Rheumatic heart disease",
    ],
    treatment: [
      "Diuretics to reduce swelling and fluid overload",
      "Treating underlying lung or left-heart disease",
      "Surgical repair in severe cases",
    ],
    selfCare: [
      "Daily weight tracking",
      "Strict low-sodium diet",
      "Elevate legs when seated",
    ],
    prevention: [
      "Manage underlying cardiovascular conditions",
      "Avoid tobacco and illicit drugs",
    ],
    riskFactors: [
      "Pulmonary hypertension",
      "Left heart disease",
      "Pacemaker leads crossing valve",
    ],
    warningSigns: [
      "Rapid swelling of legs and abdomen",
      "Severe exhaustion",
      "Jaundice",
    ],
  },
  {
    id: "myocarditis",
    name: "Myocarditis",
    category: "Cardiovascular",
    severity: "High",
    prevalence:
      "Estimated at 10 to 20 cases per 100,000 persons annually, commonly in young adults.",
    description:
      "Inflammation of the heart muscle (myocardium) that can reduce the heart's ability to pump blood and cause rapid or abnormal heart rhythms.",
    desc: "Inflammation of the heart muscle (myocardium) that can reduce the heart's ability to pump blood and cause rapid or abnormal heart rhythms.",
    symptoms: [
      "Chest pain or pressure",
      "Rapid or abnormal heart rhythms",
      "Shortness of breath at rest or during activity",
      "Fatigue and fever",
    ],
    causes: [
      "Viral infections (adenovirus, enterovirus, SARS-CoV-2)",
      "Bacterial or parasite infections",
      "Autoimmune reactions",
    ],
    treatment: [
      "Heart failure medications (ACE inhibitors, beta-blockers)",
      "Anti-arrhythmic drugs",
      "Rest and avoidance of competitive sports for 3 to 6 months",
    ],
    selfCare: [
      "Complete physical rest during recovery period",
      "Avoid alcohol, tobacco, and high caffeine",
      "Low-sodium diet",
    ],
    prevention: [
      "Stay up to date with vaccinations",
      "Practice good hygiene",
      "Seek prompt care for chest discomfort after viral illness",
    ],
    riskFactors: [
      "Recent viral syndrome",
      "Male sex and young age",
      "Autoimmune disease",
    ],
    warningSigns: [
      "Sudden severe chest pain mimicking heart attack",
      "Fainting or near-fainting episodes",
      "Profound weakness",
    ],
  },
]

LEGACY_EXTRAS.forEach((d) => {
  if (!DISEASES_BY_ID[d.id]) {
    DISEASES_BY_ID[d.id] = d
  }
})
