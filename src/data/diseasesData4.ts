// Part database file for Tenaye Disease Library (55 entries)
export interface DiseaseItem {
  id: string
  name: string
  category: string
  severity: "High" | "Medium" | "Low"
  prevalence: string
  description: string
  desc: string
  symptoms: string[]
  causes: string[]
  treatment: string[]
  selfCare: string[]
  prevention: string[]
  riskFactors: string[]
  warningSigns: string[]
}

export const DISEASES_DATA_4: DiseaseItem[] = [
  {
    id: "kaposis-sarcoma",
    name: "Kaposi's Sarcoma",
    category: "Oncology",
    severity: "High",
    prevalence:
      "Most common in people with HIV/AIDS (before modern antiviral therapy) and organ transplant recipients.",
    description:
      "Kaposi's Sarcoma (KS) is a cancer that causes lesions to grow in the skin, lymph nodes, mucous membranes, and other organs. It is caused by Human Herpesvirus 8 (HHV-8). There are four main types, with the most common in the U.S. being the AIDS-associated form.",
    desc: "Kaposi's Sarcoma (KS) is a cancer that causes lesions to grow in the skin, lymph nodes, mucous membranes, and other organs. It is caused by Human Herpesvirus 8 (HHV-8). There are four main types, with the most common in the U.S. being the AIDS-associated form.",
    symptoms: [
      "Lesions: Can appear as flat or raised patches, nodules, or plaques on the skin. They are typically pink, red, purple, or brown.",
      "Lesions can also occur in the mouth, gastrointestinal tract, or lungs.",
      "Internal Lesions: Can cause problems like gastrointestinal bleeding, coughing, or shortness of breath.",
    ],
    causes: [
      "Infection with HHV-8 is necessary but not sufficient. The virus causes cancer only in individuals with a severely compromised immune system that cannot control the viral infection.",
    ],
    treatment: [
      "Treatment focuses on bolstering the immune system and directly treating the lesions.",
      "For HIV-associated KS: The primary treatment is Highly Active Antiretroviral Therapy (HAART) to restore immune function.",
      "Local Therapy: For a few lesions, radiation therapy, cryotherapy, or topical creams can be used.",
      "Systemic Therapy: For widespread disease, chemotherapy or immunotherapy may be used.",
    ],
    selfCare: [
      "For HIV+ individuals, strict adherence to HAART is critical.",
      "For transplant recipients, work closely with your transplant team to manage immunosuppression.",
      "Monitor for new lesions and report them.",
      "Lifestyle Recommendations",
      "Practice safe sex to reduce the risk of HHV-8 and HIV transmission.",
    ],
    prevention: [
      "Preventing HIV infection is the primary way to prevent the most common form of KS.",
      "For HHV-8 positive transplant patients, careful management of immunosuppression is key.",
    ],
    riskFactors: [
      "Primary: Infection with Human Herpesvirus 8 (HHV-8), a severely weakened immune system (e.g., from HIV/AIDS, immunosuppressive drugs).",
      "Secondary: Men who have sex with men, Mediterranean or African descent.",
    ],
    warningSigns: [
      "The appearance of new, colored lesions on the skin or in the mouth, especially in an immunocompromised person, warrants medical evaluation.",
    ],
  },
  {
    id: "nasopharyngeal-carcinoma",
    name: "Nasopharyngeal Carcinoma",
    category: "Oncology",
    severity: "High",
    prevalence:
      "Geographically variable; rare in the U.S. but common in Southeast Asia.",
    description:
      "Nasopharyngeal Carcinoma (NPC) is a rare cancer that arises in the nasopharynx, which is the upper part of the throat behind the nose. It is distinct from other head and neck cancers in its cause, behavior, and treatment. It is much more common in certain parts of the world, particularly Southern China and Southeast Asia.",
    desc: "Nasopharyngeal Carcinoma (NPC) is a rare cancer that arises in the nasopharynx, which is the upper part of the throat behind the nose. It is distinct from other head and neck cancers in its cause, behavior, and treatment. It is much more common in certain parts of the world, particularly Southern China and Southeast Asia.",
    symptoms: [
      "A lump in the neck (due to metastatic lymph nodes).",
      "Nasal congestion or stuffiness.",
      "Nosebleeds.",
      "Hearing loss, ringing in the ears, or a feeling of fullness in the ear.",
      "Headaches.",
      "Double vision.",
    ],
    causes: [
      "The Epstein-Barr Virus (EBV) plays a major role, interacting with genetic and environmental factors (like diet) to trigger cancerous changes in the cells of the nasopharynx.",
    ],
    treatment: [
      "Radiation Therapy: The primary treatment because NPC is very sensitive to it and the area is difficult to access with surgery.",
      "Chemotherapy: Given concurrently with radiation (chemoradiation) for locally advanced disease, and for metastatic disease.",
      "Immunotherapy is used for recurrent or metastatic disease.",
    ],
    selfCare: [
      "Manage side effects of radiation, which can be severe (mouth sores, dry mouth, difficulty swallowing). Work closely with a dietitian.",
      "Dental evaluation before treatment is crucial.",
      "Perform neck stretching exercises to prevent fibrosis.",
      "Lifestyle Recommendations",
      "In high-risk populations, limiting salt-cured fish and meat may be beneficial.",
    ],
    prevention: [
      "No proven prevention method exists. Screening with EBV blood tests is being studied in high-risk regions.",
    ],
    riskFactors: [
      "Primary: Epstein-Barr Virus (EBV) infection, Chinese or Asian ancestry.",
      "Secondary: Heavy alcohol consumption, smoking, eating salt-cured fish and meats.",
    ],
    warningSigns: [
      "A painless lump in the neck (from lymph node spread) is often the first sign. Other symptoms like nasal obstruction or bloody discharge warrant evaluation.",
    ],
  },
  {
    id: "gallbladder-adenocarcinoma",
    name: "Gallbladder Adenocarcinoma",
    category: "Oncology",
    severity: "High",
    prevalence:
      "A rare but highly aggressive cancer. • More common in women and Native Americans.",
    description:
      "Gallbladder Adenocarcinoma is the most common type of cancer of the gallbladder. It arises from the glandular cells in the inner lining of the gallbladder. It is often discovered at a late stage because it causes few early symptoms and is difficult to detect.",
    desc: "Gallbladder Adenocarcinoma is the most common type of cancer of the gallbladder. It arises from the glandular cells in the inner lining of the gallbladder. It is often discovered at a late stage because it causes few early symptoms and is difficult to detect.",
    symptoms: [
      "Early Stage: Often asymptomatic, or symptoms mimic gallstones (abdominal pain, nausea).",
      "Abdominal pain, particularly in the upper right section.",
      "Jaundice (yellowing of the skin and eyes).",
      "Unexplained weight loss.",
      "Nausea and vomiting.",
      "Abdominal bloating.",
    ],
    causes: [
      "Chronic inflammation of the gallbladder (usually from gallstones) is thought to be the main driver. This long-term irritation leads to DNA damage and, eventually, adenocarcinoma.",
    ],
    treatment: [
      "Surgery: The only potential cure. For early-stage cancer found incidentally after a cholecystectomy for gallstones, no further treatment may be needed. For more advanced cases, a radical cholecystectomy (removing the gallbladder, part of the liver, and nearby lymph nodes) is performed.",
      "Chemotherapy and Radiation: Used after surgery for more advanced cancers or for palliative control.",
    ],
    selfCare: [
      "There are no specific self-care tips for the cancer itself.",
      "Managing pain and nutrition are important aspects of care.",
      "Lifestyle Recommendations",
      "Maintain a healthy weight to reduce the risk of gallstones.",
    ],
    prevention: [
      "There is no sure way to prevent it.",
      "Managing risk factors for gallstones (healthy weight, balanced diet) may theoretically lower risk.",
    ],
    riskFactors: [
      "Primary: Gallstones and chronic cholecystitis (inflammation of the gallbladder) are the strongest risk factors.",
      "Secondary: Porcelain gallbladder (calcification of the gallbladder wall), gallbladder polyps, obesity, female sex.",
    ],
    warningSigns: [
      "Symptoms like abdominal pain (especially in the upper right quadrant), jaundice, and unexplained weight loss require prompt medical evaluation.",
    ],
  },
  {
    id: "endometrioid-endometrial-carcinoma",
    name: "Endometrioid Endometrial Carcinoma",
    category: "Oncology",
    severity: "High",
    prevalence: "The most common gynecologic cancer in the United States.",
    description:
      "Endometrioid Endometrial Carcinoma is the most common type of cancer of the uterus, accounting for about 80% of cases. It develops from the glandular cells of the endometrium (the lining of the uterus). It is often detected at an early stage because it causes abnormal vaginal bleeding.",
    desc: "Endometrioid Endometrial Carcinoma is the most common type of cancer of the uterus, accounting for about 80% of cases. It develops from the glandular cells of the endometrium (the lining of the uterus). It is often detected at an early stage because it causes abnormal vaginal bleeding.",
    symptoms: [
      "Abnormal Vaginal Bleeding: This is the hallmark symptom.",
      "Postmenopausal bleeding.",
      "Bleeding between periods in premenopausal women.",
      "Abnormally heavy or prolonged menstrual bleeding.",
      "Pelvic pain or pressure.",
      "Watery or blood-tinged vaginal discharge.",
    ],
    causes: [
      "An imbalance between estrogen and progesterone leads to overgrowth of the endometrium (endometrial hyperplasia). Over time, this can become atypical and then progress to endometrioid carcinoma.",
    ],
    treatment: [
      "Surgery: The primary treatment. This involves a total hysterectomy (removal of the uterus and cervix), bilateral salpingo-oophorectomy (removal of both fallopian tubes and ovaries), and staging (lymph node removal).",
      "Radiation Therapy: Used for higher-risk or more advanced stages to reduce the risk of recurrence.",
      "Chemotherapy: Used for advanced or recurrent disease.",
      "Hormone Therapy: For women who wish to preserve fertility (in very select, early cases) or for advanced disease.",
    ],
    selfCare: [
      "Report any abnormal bleeding to your doctor immediately.",
      "If you are on hormone therapy, ensure it includes progesterone if you have a uterus.",
      "Manage menopausal symptoms with non-hormonal options if possible.",
      "Lifestyle Recommendations",
      "Achieve and maintain a healthy weight. This is a critical modifiable risk factor.",
    ],
    prevention: [
      "Use progesterone along with estrogen if you are on hormone replacement therapy.",
      "Maintain a healthy weight.",
      "Report abnormal bleeding promptly.",
    ],
    riskFactors: [
      "Primary: Unopposed estrogen exposure (e.g., obesity, hormone replacement therapy without progesterone, nulliparity), tamoxifen use.",
      "Secondary: Late menopause, early menarche, polycystic ovary syndrome (PCOS), diabetes.",
    ],
    warningSigns: [
      "Any postmenopausal bleeding or abnormal premenopausal bleeding (e.g., heavy periods, bleeding between periods) must be evaluated by a gynecologist.",
    ],
  },
  {
    id: "hodgkins-lymphoma",
    name: "Hodgkin's Lymphoma",
    category: "Oncology",
    severity: "High",
    prevalence:
      "Less common than Non-Hodgkin Lymphoma. • Has a bimodal age distribution (peaks in early adulthood [20s] and late adulthood [after 55]).",
    description:
      "Hodgkin's Lymphoma (HL) is a cancer of the lymphatic system, which is part of the immune system. It is characterized by the presence of a specific abnormal cell called the Reed-Sternberg cell. It is one of the most curable forms of cancer, especially when diagnosed early.",
    desc: "Hodgkin's Lymphoma (HL) is a cancer of the lymphatic system, which is part of the immune system. It is characterized by the presence of a specific abnormal cell called the Reed-Sternberg cell. It is one of the most curable forms of cancer, especially when diagnosed early.",
    symptoms: [
      '"B Symptoms": Unexplained fever, drenching night sweats, and unintentional weight loss (10% of body weight over 6 months).',
      "Painless, swollen lymph nodes in the neck, underarms, or groin.",
      "Persistent fatigue.",
      "Itching (pruritus).",
      "Pain in lymph nodes after drinking alcohol (rare but specific).",
    ],
    causes: [
      "The exact cause is unknown. It is thought that a B-cell lymphocyte undergoes a malignant change, becoming a Reed-Sternberg cell. Infection with EBV is found in a significant portion of cases and is believed to be a trigger.",
    ],
    treatment: [
      "Treatment is highly successful and is based on the stage of the disease.",
      "Chemotherapy: The main treatment. The ABVD regimen is most common.",
      "Radiation Therapy: Often used after chemotherapy, especially for early-stage, bulky disease.",
      "Immunotherapy: Checkpoint inhibitors are used for relapsed or refractory disease.",
      "Stem Cell Transplant: For cancer that returns after treatment.",
    ],
    selfCare: [
      "Adherence to the chemotherapy schedule is critical.",
      "Manage side effects like nausea, fatigue, and increased infection risk.",
      "Due to treatment, there is a risk of secondary cancers and heart/lung damage later in life; lifelong follow-up is important.",
      "Lifestyle Recommendations",
      "Maintain a healthy lifestyle to support recovery and long-term health.",
    ],
    prevention: ["There is no known way to prevent Hodgkin Lymphoma."],
    riskFactors: [
      "Primary: Epstein-Barr Virus (EBV) infection.",
      "Secondary: Weakened immune system (e.g., HIV), family history, age.",
    ],
    warningSigns: [
      "See a doctor for painless swelling of lymph nodes in the neck, armpit, or groin, especially if accompanied by fever, night sweats, and weight loss.",
    ],
  },
  {
    id: "stage-3-chronic-kidney-disease",
    name: "Stage 3 Chronic Kidney Disease",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "Extremely common; affects an estimated 1 in 3 adults with diabetes and 1 in 5 adults with high blood pressure.",
    description:
      "Stage 3 Chronic Kidney Disease (CKD) indicates moderate kidney damage and a significant decline in kidney function. The kidneys' primary job is to filter waste and excess fluid from the blood. In Stage 3, the glomerular filtration rate (GFR) is between 30-59 mL/min, meaning the kidneys are functioning at 30-59% of normal capacity.",
    desc: "Stage 3 Chronic Kidney Disease (CKD) indicates moderate kidney damage and a significant decline in kidney function. The kidneys' primary job is to filter waste and excess fluid from the blood. In Stage 3, the glomerular filtration rate (GFR) is between 30-59 mL/min, meaning the kidneys are functioning at 30-59% of normal capacity.",
    symptoms: [
      "Fatigue and weakness.",
      "Swelling in hands, feet, and around the eyes (edema).",
      "Changes in urination (foamy, dark, or less frequent).",
      "Pain in the mid-to-lower back.",
      "Difficulty concentrating.",
      "High blood pressure that becomes harder to control.",
    ],
    causes: [
      "Damage to the nephrons (the kidney's filtering units) from conditions like diabetes (diabetic nephropathy) and hypertension (hypertensive nephrosclerosis). Other causes include glomerulonephritis, polycystic kidney disease, and prolonged urinary tract obstruction.",
    ],
    treatment: [
      "The goal is to slow progression and manage complications.",
      "Treat Underlying Conditions: Aggressive control of blood sugar and blood pressure.",
      "Medications: ACE inhibitors or ARBs (to protect the kidneys), SGLT2 inhibitors (for diabetic kidney disease), statins (for cholesterol).",
      "Dietary Changes: Often involves limiting sodium, potassium, phosphorus, and protein.",
      "Managing Complications: Treating anemia and bone disease.",
    ],
    selfCare: [
      "Monitor blood pressure and blood sugar regularly at home.",
      "Take all medications exactly as prescribed.",
      "Avoid NSAIDs (e.g., ibuprofen, naproxen) as they can harm kidneys.",
      "Lifestyle Recommendations",
      "Adopt a kidney-friendly diet (consult a renal dietitian).",
      "Maintain a healthy weight.",
      "Exercise regularly.",
      "Do not smoke.",
    ],
    prevention: [
      "Manage diabetes and high blood pressure meticulously.",
      "Get regular check-ups that include a urine test for protein (albuminuria) and a blood test for creatinine (to estimate GFR).",
    ],
    riskFactors: [
      "Primary: Diabetes (the leading cause), High Blood Pressure (the second leading cause).",
      "Secondary: Heart disease, obesity, family history of kidney disease, age over 60.",
    ],
    warningSigns: [
      "While often asymptomatic, worsening symptoms like profound fatigue, nausea, vomiting, swelling, or changes in urination warrant immediate medical attention.",
    ],
  },
  {
    id: "acute-kidney-injury-from-sepsis",
    name: "Acute Kidney Injury from Sepsis",
    category: "Renal",
    severity: "High",
    prevalence:
      "A common and serious complication of severe sepsis and septic shock.",
    description:
      "Acute Kidney Injury (AKI) is a sudden episode of kidney failure or damage that happens within a few hours or days. When caused by sepsis, it is known as Sepsis-Associated Acute Kidney Injury (SA-AKI). Sepsis is a life-threatening body-wide response to an infection, which can cause a dramatic drop in blood pressure and direct damage to the kidneys, leading to AKI.",
    desc: "Acute Kidney Injury (AKI) is a sudden episode of kidney failure or damage that happens within a few hours or days. When caused by sepsis, it is known as Sepsis-Associated Acute Kidney Injury (SA-AKI). Sepsis is a life-threatening body-wide response to an infection, which can cause a dramatic drop in blood pressure and direct damage to the kidneys, leading to AKI.",
    symptoms: [
      "Symptoms of Sepsis: Fever, chills, rapid heart rate, rapid breathing, confusion.",
      "Symptoms of AKI: Drastically decreased urine output, fluid retention causing swelling in legs/ankles, nausea, shortness of breath, chest pain or pressure.",
    ],
    causes: [
      "In sepsis, the body's inflammatory response to infection causes systemic vasodilation (low blood pressure), reduced blood flow to the kidneys, and direct inflammatory damage to kidney tissues, resulting in acute failure.",
    ],
    treatment: [
      "Treatment is aggressive and occurs in a hospital, often in the ICU.",
      "Treat the Underlying Infection: Broad-spectrum intravenous antibiotics.",
      "Supportive Care: IV fluids and medications to maintain blood pressure.",
      "Renal Replacement Therapy (Dialysis): Temporarily used to perform the kidneys' functions until they recover.",
    ],
    selfCare: [
      "(Post-Recovery)",
      "Attend all follow-up appointments to monitor kidney function, as SA-AKI increases the risk of developing chronic kidney disease.",
      "Take all prescribed medications.",
      "Stay hydrated.",
      "Lifestyle Recommendations",
      "Prevent infections (get vaccinated, practice good hygiene).",
    ],
    prevention: [
      "Seek immediate medical care for serious infections.",
      "Complete all prescribed courses of antibiotics.",
    ],
    riskFactors: [
      "Primary: Having a severe bacterial, viral, or fungal infection leading to sepsis.",
      "Secondary: Pre-existing chronic kidney disease, older age, diabetes.",
    ],
    warningSigns: [
      "Sepsis is a medical emergency. Call 911 or go to an emergency room for a combination of infection signs (fever, chills) and AKI signs (little to no urine output, confusion, extreme fatigue, swelling).",
    ],
  },
  {
    id: "acute-poststreptococcal-glomerulonephritis",
    name: "Acute Poststreptococcal Glomerulonephritis",
    category: "Renal",
    severity: "Low",
    prevalence:
      "Most common in children aged 5-15, but can occur in adults. • Incidence has decreased in developed countries.",
    description:
      "Acute Poststreptococcal Glomerulonephritis (APSGN) is a kidney disease that occurs as a rare complication of an infection with certain strains of Group A Streptococcus bacteria. It is not a kidney infection, but an immune system response where antibodies created to fight the strep infection mistakenly attack the tiny filters in the kidneys (glomeruli).",
    desc: "Acute Poststreptococcal Glomerulonephritis (APSGN) is a kidney disease that occurs as a rare complication of an infection with certain strains of Group A Streptococcus bacteria. It is not a kidney infection, but an immune system response where antibodies created to fight the strep infection mistakenly attack the tiny filters in the kidneys (glomeruli).",
    symptoms: [
      "Cola-colored or tea-colored urine (hematuria).",
      "Swelling (edema) in the face, around the eyes, and in the legs.",
      "Decreased urine output.",
      "High blood pressure.",
      "Fatigue and lethargy.",
    ],
    causes: [
      "An immune complex-mediated disease. Antigen-antibody complexes get trapped in the glomeruli, causing inflammation and impairing the kidney's ability to filter waste.",
    ],
    treatment: [
      "There is no specific cure for APSGN; treatment focuses on managing symptoms while the kidney heals.",
      "Antibiotics: To eradicate any remaining strep bacteria.",
      "Blood Pressure Control: Using medications like ACE inhibitors.",
      "Diuretics: To reduce fluid retention and swelling.",
      "Dietary Restrictions: Limiting salt and fluid intake.",
    ],
    selfCare: [
      "Ensure complete treatment of any strep infection with the full course of antibiotics.",
      "Monitor blood pressure at home during recovery.",
      "Get plenty of rest.",
      "Lifestyle Recommendations",
      "Practice good hygiene to prevent strep infections.",
    ],
    prevention: [
      "Prompt diagnosis and antibiotic treatment of streptococcal infections is the best way to prevent APSGN.",
    ],
    riskFactors: [
      "Primary: Recent streptococcal infection (e.g., strep throat, impetigo).",
    ],
    warningSigns: [
      "Seek medical care if you or your child develops dark (cola-colored) urine, swelling, and reduced urination 1-2 weeks after a strep infection.",
    ],
  },
  {
    id: "minimal-change-disease-nephrotic-syndrome",
    name: "Minimal Change Disease (Nephrotic Syndrome)",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "The leading cause of nephrotic syndrome in children (about 90% of cases).",
    description:
      'Minimal Change Disease (MCD) is a kidney disorder that causes Nephrotic Syndrome. It is the most common cause of Nephrotic Syndrome in children. Under a microscope, the kidney tissue appears normal or has "minimal change," but on electron microscopy, the podocytes (filtering cells) show foot process effacement.',
    desc: 'Minimal Change Disease (MCD) is a kidney disorder that causes Nephrotic Syndrome. It is the most common cause of Nephrotic Syndrome in children. Under a microscope, the kidney tissue appears normal or has "minimal change," but on electron microscopy, the podocytes (filtering cells) show foot process effacement.',
    symptoms: [
      "Severe Swelling (Edema): Particularly around the eyes (periorbital edema) and in the legs and ankles.",
      "Foamy Urine: Due to high protein levels (proteinuria).",
      "Weight Gain: From fluid retention.",
      "Fatigue.",
      "Loss of Appetite.",
    ],
    causes: [
      "The cause is often unknown. It is thought to be related to a dysfunction of T-cells (a type of immune cell) that releases a substance harmful to the podocytes, disrupting the kidney's filter.",
    ],
    treatment: [
      "Corticosteroids (e.g., Prednisone): The first-line treatment. Most children and adults respond very quickly, with proteinuria disappearing within weeks.",
      "Other Immunosuppressants: For steroid-resistant or frequently relapsing cases.",
      "Diuretics: To reduce edema.",
      "ACE Inhibitors/ARBs: To reduce proteinuria.",
    ],
    selfCare: [
      "Strictly adhere to the medication taper as prescribed by your doctor.",
      "Monitor for signs of relapse (e.g., foamy urine, swelling).",
      "Follow a low-sodium diet to control swelling.",
      "Lifestyle Recommendations",
      "Get the flu shot and recommended vaccines, but avoid live vaccines while on high-dose immunosuppressants.",
    ],
    prevention: ["There is no known way to prevent MCD."],
    riskFactors: [
      "Primary: Often idiopathic (unknown cause). Can be associated with allergic reactions, NSAID use, or certain cancers.",
    ],
    warningSigns: [
      "See a doctor for sudden, severe swelling around the eyes and in the legs, and foamy urine.",
    ],
  },
  {
    id: "autosomal-dominant-polycystic-kidney-disease",
    name: "Autosomal Dominant Polycystic Kidney Disease",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "The most common life-threatening genetic disease, affecting 1 in 400 to 1 in 1000 people.",
    description:
      "Autosomal Dominant Polycystic Kidney Disease (ADPKD) is a common, inherited disorder characterized by the growth of numerous fluid-filled cysts in the kidneys. These cysts enlarge the kidneys, disrupt their structure, and lead to a progressive decline in kidney function, often resulting in kidney failure by middle age.",
    desc: "Autosomal Dominant Polycystic Kidney Disease (ADPKD) is a common, inherited disorder characterized by the growth of numerous fluid-filled cysts in the kidneys. These cysts enlarge the kidneys, disrupt their structure, and lead to a progressive decline in kidney function, often resulting in kidney failure by middle age.",
    symptoms: [
      "High blood pressure.",
      "Back or side pain.",
      "Hematuria (blood in the urine).",
      "Frequent kidney infections.",
      "Headaches.",
      "Kidney stones.",
      "Eventually, symptoms of chronic kidney disease and failure.",
    ],
    causes: [
      "Caused by mutations in the PKD1 or PKD2 genes. These mutations lead to abnormal development of tubules in the kidneys, causing cyst formation and growth.",
    ],
    treatment: [
      "Blood Pressure Control: Crucial to slow disease progression (ACE inhibitors/ARBs are first-line).",
      "Tolvaptan (Jinarc): A medication that can slow the growth of cysts and decline in kidney function in some patients.",
      "Pain Management.",
      "Treatment of Infections and Stones.",
      "Dialysis or Kidney Transplant for end-stage renal disease.",
    ],
    selfCare: [
      "Drink plenty of water throughout the day, which may help slow cyst growth.",
      "Follow a low-sodium, heart-healthy diet.",
      "Avoid caffeine and NSAIDs.",
      "Lifestyle Recommendations",
      "Genetic counseling for family planning.",
      "Regular screening of at-risk family members with ultrasound.",
    ],
    prevention: [
      "The disease cannot be prevented, but its progression can be slowed with aggressive management of blood pressure and the use of tolvaptan in select patients.",
    ],
    riskFactors: [
      "Primary: Having a parent with the disease (autosomal dominant inheritance pattern; 50% chance of passing it on).",
    ],
    warningSigns: [
      "Severe pain in the back or side, blood in the urine, or a sudden change in urine output warrant medical evaluation.",
    ],
  },
  {
    id: "calcium-oxalate-kidney-stones",
    name: "Calcium Oxalate Kidney Stones",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "The most common type of kidney stone, affecting about 80% of stone formers.",
    description:
      "Calcium Oxalate Kidney Stones are the most common type of kidney stone. They are hard deposits made of calcium and oxalate that form inside the kidney. When urine becomes concentrated, minerals can crystallize and stick together, forming stones that can be painful to pass.",
    desc: "Calcium Oxalate Kidney Stones are the most common type of kidney stone. They are hard deposits made of calcium and oxalate that form inside the kidney. When urine becomes concentrated, minerals can crystallize and stick together, forming stones that can be painful to pass.",
    symptoms: [
      "Severe, sharp pain in the back, side, lower abdomen, or groin.",
      "Pain that comes in waves and fluctuates in intensity.",
      "Pain or burning sensation during urination.",
      "Pink, red, or brown urine (hematuria).",
      "Cloudy or foul-smelling urine.",
      "Persistent need to urinate.",
    ],
    causes: [
      "An imbalance in urine composition: too much calcium and oxalate, not enough citrate, and too little urine volume, allowing crystals to form and aggregate into stones.",
    ],
    treatment: [
      "Small Stones: Pain management and drinking large amounts of water to help pass the stone.",
      "Extracorporeal Shock Wave Lithotripsy (ESWL): Uses sound waves to break stones into pieces.",
      "Ureteroscopy: A scope is used to remove or break up the stone.",
      "Percutaneous Nephrolithotomy: Surgical removal for very large stones.",
    ],
    selfCare: [
      "If you have a stone, strain your urine to catch it for analysis.",
      "Drink enough fluid to produce at least 2-2.5 liters of urine per day.",
      "Lifestyle Recommendations",
      "Limit foods high in oxalate (spinach, nuts, rhubarb, beets) if advised.",
      "Reduce sodium intake.",
      "Eat a moderate amount of calcium-rich foods with meals (do not restrict calcium).",
    ],
    prevention: [
      "Stay well-hydrated – this is the most important step.",
      "Follow dietary recommendations based on 24-hour urine testing.",
    ],
    riskFactors: [
      "Primary: Low urine volume (dehydration), diet high in oxalate, sodium, or animal protein.",
      "Secondary: Personal or family history of stones, certain digestive diseases (e.g., Crohn's), obesity.",
    ],
    warningSigns: [
      "Renal colic is a medical emergency. Seek immediate care for severe, cramping pain in the back and side that radiates to the lower abdomen or groin, especially if accompanied by nausea, vomiting, fever, or blood in the urine.",
    ],
  },
  {
    id: "complicated-urinary-tract-infection",
    name: "Complicated Urinary Tract Infection",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "Common in hospitalized patients and those with underlying urological conditions.",
    description:
      "A Complicated Urinary Tract Infection (UTI) is an infection that occurs in a urinary tract with structural or functional abnormalities. This includes UTIs in men, pregnant women, individuals with catheters, kidney stones, urinary obstructions, or compromised immune systems. They are more difficult to treat and have a higher risk of serious complications.",
    desc: "A Complicated Urinary Tract Infection (UTI) is an infection that occurs in a urinary tract with structural or functional abnormalities. This includes UTIs in men, pregnant women, individuals with catheters, kidney stones, urinary obstructions, or compromised immune systems. They are more difficult to treat and have a higher risk of serious complications.",
    symptoms: [
      "Lower UTI Symptoms (Cystitis): Painful urination (dysuria), frequent urination, urgency, pelvic pain.",
      "Upper UTI Symptoms (Pyelonephritis): Fever, chills, flank pain (pain in the back, just below the ribs), nausea, vomiting.",
    ],
    causes: [
      "Bacteria (most commonly E. coli) enter the urethra and multiply in the bladder. In a complicated UTI, an underlying problem prevents the body from clearing the bacteria effectively.",
    ],
    treatment: [
      "Longer Course of Antibiotics: Typically 7-14 days instead of the 3-5 days for uncomplicated UTIs.",
      "Intravenous Antibiotics: May be necessary for severe illness or if oral medications cannot be taken.",
      "Identification and Management of the Underlying Complication (e.g., removing a stone or catheter).",
    ],
    selfCare: [
      "Take the entire course of antibiotics, even if you feel better.",
      "Drink plenty of water to help flush out bacteria.",
      'Urinate frequently and completely; don\'t "hold it in."',
      "Lifestyle Recommendations",
      "For recurrent UTIs, discuss prevention strategies with your doctor (e.g., prophylactic antibiotics).",
    ],
    prevention: [
      "Manage underlying conditions (e.g., control diabetes).",
      "Practice good hygiene.",
      "Remove urinary catheters as soon as medically possible.",
    ],
    riskFactors: [
      "Primary: Urinary catheterization, kidney stones, urinary retention, enlarged prostate, diabetes, pregnancy.",
    ],
    warningSigns: [
      "Symptoms of a kidney infection (pyelonephritis) – fever, chills, flank pain, nausea – or sepsis indicate a serious complication and require emergency care.",
    ],
  },
  {
    id: "acute-pyelonephritis",
    name: "Acute Pyelonephritis",
    category: "Renal",
    severity: "High",
    prevalence: "A common serious kidney infection.",
    description:
      "Acute Pyelonephritis is a sudden and severe bacterial infection of one or both kidneys. It is a type of upper urinary tract infection that can cause permanent kidney damage or spread to the bloodstream (sepsis), making it a serious condition.",
    desc: "Acute Pyelonephritis is a sudden and severe bacterial infection of one or both kidneys. It is a type of upper urinary tract infection that can cause permanent kidney damage or spread to the bloodstream (sepsis), making it a serious condition.",
    symptoms: [
      "Fever (often high).",
      "Chills and rigors (shaking).",
      "Severe, constant pain in the back, side (flank), or groin.",
      "Nausea and vomiting.",
      "General malaise and confusion (especially in the elderly).",
      "May be accompanied by symptoms of a lower UTI.",
    ],
    causes: [
      "Bacteria, usually E. coli, travel from the bladder up the ureters to infect the kidneys. Anything that impedes urine flow increases the risk.",
    ],
    treatment: [
      "For Mild Cases: Oral antibiotics for 10-14 days.",
      "For Severe Cases: Hospitalization for intravenous antibiotics, fluids, and pain management.",
      "Imaging: A CT scan or ultrasound may be done to look for obstructions or abscesses.",
    ],
    selfCare: [
      "(During/After Treatment)",
      "Finish the entire course of antibiotics.",
      "Drink plenty of fluids.",
      "Use a heating pad for flank pain.",
      "Get plenty of rest.",
      "Lifestyle Recommendations",
      "Prevent UTIs through hydration and good hygiene.",
    ],
    prevention: [
      "Promptly and fully treat bladder infections.",
      "Address any underlying urinary tract abnormalities.",
    ],
    riskFactors: [
      "Primary: Untreated or ascending bladder infection (cystitis).",
      "Secondary: Urinary tract obstructions (stones, enlarged prostate), pregnancy, diabetes, weakened immune system.",
    ],
    warningSigns: [
      "This is a medical emergency. Go to the hospital for a high fever (over 102°F), shaking chills, flank pain, nausea, and vomiting.",
    ],
  },
  {
    id: "congenital-hydronephrosis",
    name: "Congenital Hydronephrosis",
    category: "Renal",
    severity: "Low",
    prevalence: "The most common urological abnormality identified prenatally.",
    description:
      "Congenital Hydronephrosis is a condition, present at birth, where the kidney becomes swollen (dilated) because urine is unable to drain properly from the kidney to the bladder. It is the most common anomaly found on prenatal ultrasound. It can range from mild and self-resolving to severe, requiring surgery.",
    desc: "Congenital Hydronephrosis is a condition, present at birth, where the kidney becomes swollen (dilated) because urine is unable to drain properly from the kidney to the bladder. It is the most common anomaly found on prenatal ultrasound. It can range from mild and self-resolving to severe, requiring surgery.",
    symptoms: [
      "Often asymptomatic and discovered on prenatal ultrasound.",
      "In infants, may present with a urinary tract infection, abdominal mass, vomiting, or failure to thrive.",
    ],
    causes: [
      "A blockage in the urinary tract (most commonly at the ureteropelvic junction - UPJ) or vesicoureteral reflux (VUR), where urine flows backward from the bladder to the kidney.",
    ],
    treatment: [
      "Depends on the cause and severity.",
      "Observation: Many mild cases resolve on their own as the child grows.",
      "Prophylactic Antibiotics: To prevent UTIs while under observation.",
      "Surgery (Pyeloplasty): To correct a significant obstruction and allow proper urine drainage.",
    ],
    selfCare: [
      "(For Parents)",
      "Adhere to the monitoring schedule of ultrasounds and doctor visits.",
      "Administer prophylactic antibiotics as prescribed.",
      "Watch for signs of UTI (fever, irritability, strong-smelling urine).",
      "Lifestyle Recommendations",
      "No specific lifestyle changes.",
    ],
    prevention: ["There is no known prevention for congenital hydronephrosis."],
    riskFactors: [
      "Primary: Often idiopathic. Can be associated with urinary tract obstructions (e.g., UPJ obstruction) or vesicoureteral reflux (VUR).",
    ],
    warningSigns: [
      "In an infant, signs of a urinary tract infection (fever, fussiness, poor feeding) or a palpable abdominal mass warrant immediate medical attention.",
    ],
  },
  {
    id: "atherosclerotic-renal-artery-stenosis",
    name: "Atherosclerotic Renal Artery Stenosis",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "A common cause of secondary hypertension and kidney failure in the elderly.",
    description:
      "Atherosclerotic Renal Artery Stenosis (RAS) is the narrowing of one or both arteries that supply blood to the kidneys, due to a buildup of atherosclerotic plaque (cholesterol, fat, calcium). This reduces blood flow to the kidneys, which can lead to poorly controlled high blood pressure and chronic kidney disease.",
    desc: "Atherosclerotic Renal Artery Stenosis (RAS) is the narrowing of one or both arteries that supply blood to the kidneys, due to a buildup of atherosclerotic plaque (cholesterol, fat, calcium). This reduces blood flow to the kidneys, which can lead to poorly controlled high blood pressure and chronic kidney disease.",
    symptoms: [
      "Often asymptomatic until late stages.",
      "Resistant hypertension (high blood pressure that is hard to control with three or more medications).",
      "Worsening kidney function.",
      "A whooshing sound (bruit) over the abdomen heard with a stethoscope.",
    ],
    causes: [
      "Atherosclerosis, the same process that causes coronary artery disease. Plaque builds up in the renal artery lining, narrowing the vessel and restricting blood flow.",
    ],
    treatment: [
      "Medical Management: The cornerstone of treatment.",
      "Aggressive control of blood pressure and cholesterol.",
      "Antiplatelet therapy (e.g., aspirin).",
      "ACE inhibitors or ARBs are used with caution and close monitoring.",
      "Revascularization (Stenting): Considered in specific cases, such as flash pulmonary edema, rapidly declining kidney function, or truly resistant hypertension despite optimal medical therapy.",
    ],
    selfCare: [
      "Meticulously manage blood pressure, cholesterol, and diabetes.",
      "Take all medications as prescribed.",
      "Monitor kidney function with regular blood tests.",
      "Lifestyle Recommendations",
      "Adopt a heart-healthy diet (low salt, low saturated fat).",
      "Exercise regularly.",
      "Do not smoke.",
    ],
    prevention: [
      "Prevent and manage atherosclerosis through lifestyle and medication.",
    ],
    riskFactors: [
      "Primary: Pre-existing atherosclerosis (in heart, legs, or neck), age, diabetes, high cholesterol, smoking.",
    ],
    warningSigns: [
      "A sudden, significant worsening of previously controlled high blood pressure, or sudden kidney failure, can be a sign of severe RAS.",
    ],
  },
  {
    id: "end-stage-renal-disease",
    name: "End-Stage Renal Disease",
    category: "Renal",
    severity: "High",
    prevalence: "Over 750,000 people in the U.S. are being treated for ESRD.",
    description:
      "End-Stage Renal Disease (ESRD), or kidney failure, is the final, permanent stage of chronic kidney disease where the kidneys are no longer able to function at a level needed for day-to-day life. The glomerular filtration rate (GFR) is typically less than 15 mL/min. Life-sustaining treatment with dialysis or a kidney transplant is required.",
    desc: "End-Stage Renal Disease (ESRD), or kidney failure, is the final, permanent stage of chronic kidney disease where the kidneys are no longer able to function at a level needed for day-to-day life. The glomerular filtration rate (GFR) is typically less than 15 mL/min. Life-sustaining treatment with dialysis or a kidney transplant is required.",
    symptoms: [
      "(Uremia)",
      "Fatigue and weakness.",
      "Nausea, vomiting, loss of appetite.",
      "Changes in mental status (difficulty concentrating, confusion).",
      "Persistent itching.",
      "Muscle twitching and cramps.",
      "Swelling in the feet and ankles.",
      "Shortness of breath from fluid in the lungs.",
    ],
    causes: [
      "The culmination of progressive, irreversible damage to the kidneys from conditions like diabetic nephropathy, hypertensive nephrosclerosis, or chronic glomerulonephritis.",
    ],
    treatment: [
      "Hemodialysis: Blood is filtered through a machine, typically at a dialysis center 3 times per week.",
      "Peritoneal Dialysis: The lining of the abdomen is used to filter blood inside the body, usually done at home daily.",
      "Kidney Transplant: The preferred treatment, offering the best quality of life and survival.",
    ],
    selfCare: [
      "Strict adherence to the dialysis schedule and prescription.",
      "Follow a strict renal diet (limit fluid, potassium, phosphorus, sodium).",
      "Take all medications, including phosphate binders with meals.",
      "Care for your dialysis access (fistula/graft) or catheter meticulously.",
      "Lifestyle Recommendations",
      "If a transplant candidate, complete the evaluation process and stay active on the waitlist.",
    ],
    prevention: [
      "The only true prevention is the early detection and aggressive management of chronic kidney disease to delay or prevent progression to ESRD.",
    ],
    riskFactors: [
      "Primary: Long-standing, poorly controlled diabetes and hypertension.",
      "Secondary: Glomerulonephritis, polycystic kidney disease, long-term urinary tract obstruction.",
    ],
    warningSigns: [
      "Symptoms of uremia (the illness resulting from kidney failure) – severe nausea, confusion, seizures, fluid overload causing shortness of breath – require emergency care.",
    ],
  },
  {
    id: "diabetic-nephropathy",
    name: "Diabetic Nephropathy",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "The leading cause of End-Stage Renal Disease (ESRD) worldwide. • Affects about 20-40% of people with diabetes.",
    description:
      "Diabetic Nephropathy is a serious kidney-related complication of both type 1 and type 2 diabetes. It is characterized by damage to the small blood vessels in the kidneys (the glomeruli), which act as filters. Over time, this damage leads to protein leakage into the urine and a progressive decline in kidney function.",
    desc: "Diabetic Nephropathy is a serious kidney-related complication of both type 1 and type 2 diabetes. It is characterized by damage to the small blood vessels in the kidneys (the glomeruli), which act as filters. Over time, this damage leads to protein leakage into the urine and a progressive decline in kidney function.",
    symptoms: [
      "Early Stages: Often asymptomatic. The first sign is typically small amounts of protein in the urine (microalbuminuria).",
      "Worsening blood pressure control.",
      "Swelling of feet, ankles, hands, or eyes.",
      "Increased need to urinate.",
      "Fatigue, nausea, loss of appetite.",
      "Confusion or difficulty concentrating.",
    ],
    causes: [
      "Long-term high blood sugar and high blood pressure damage the tiny blood vessels and filtering units (glomeruli) in the kidneys. This leads to scarring (glomerulosclerosis) and a loss of filtering capacity.",
    ],
    treatment: [
      "The goal is to slow progression.",
      "Glycemic Control: Maintaining a target HbA1c (usually <7%).",
      "Blood Pressure Control: Tight control to <130/80 mmHg, using ACE inhibitors or ARBs as first-line agents, as they have specific kidney-protective benefits.",
      "SGLT2 Inhibitors: A class of diabetes medication proven to protect the kidneys and slow the progression of diabetic nephropathy.",
      "Dietary Modifications: Reducing protein intake may be recommended.",
    ],
    selfCare: [
      "Meticulously monitor and control your blood sugar.",
      "Check your blood pressure regularly.",
      "Get your urine tested for albumin at least once a year.",
      "Take all medications as prescribed.",
      "Lifestyle Recommendations",
      "Follow a healthy diet for both diabetes and kidney health.",
      "Do not smoke.",
      "Maintain a healthy weight.",
    ],
    prevention: [
      "Optimal control of blood sugar and blood pressure from the time of diabetes diagnosis is the most effective way to prevent or delay diabetic nephropathy.",
    ],
    riskFactors: [
      "Primary: Poorly controlled blood sugar over many years, uncontrolled high blood pressure.",
      "Secondary: Genetics, smoking, high cholesterol.",
    ],
    warningSigns: [
      "A rapid decline in kidney function, or symptoms of fluid overload and uremia, indicate advanced disease.",
    ],
  },
  {
    id: "hypertensive-nephrosclerosis",
    name: "Hypertensive Nephrosclerosis",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "The second leading cause of End-Stage Renal Disease (ESRD) after diabetic nephropathy.",
    description:
      "Hypertensive Nephrosclerosis is kidney damage caused by long-standing, poorly controlled high blood pressure. The persistent high pressure damages the small arteries and blood vessels within the kidneys, leading to scarring (sclerosis), reduced blood flow, and a slow, progressive decline in kidney function.",
    desc: "Hypertensive Nephrosclerosis is kidney damage caused by long-standing, poorly controlled high blood pressure. The persistent high pressure damages the small arteries and blood vessels within the kidneys, leading to scarring (sclerosis), reduced blood flow, and a slow, progressive decline in kidney function.",
    symptoms: [
      "Often asymptomatic in early stages.",
      "Symptoms of poorly controlled hypertension: headaches, shortness of breath, dizziness.",
      "Later, symptoms of chronic kidney disease: fatigue, nausea, loss of appetite, swelling, changes in urination.",
    ],
    causes: [
      "Chronic high blood pressure forces the heart to work harder, which thickens and damages the lining of arteries throughout the body, including those in the kidneys. This reduces the kidneys' blood supply, leading to ischemia and scarring.",
    ],
    treatment: [
      "Aggressive Blood Pressure Control: The single most important treatment. Goal is usually <130/80 mmHg.",
      "Medications: ACE inhibitors or ARBs are first-line, as they protect the kidneys by reducing pressure within the glomeruli.",
      "Lifestyle Modifications: Diet, exercise, weight loss, and salt restriction.",
    ],
    selfCare: [
      "Take blood pressure medication consistently, even if you feel fine.",
      "Monitor blood pressure at home and keep a log.",
      "Get regular blood tests to monitor kidney function.",
      "Lifestyle Recommendations",
      "Adopt the DASH (Dietary Approaches to Stop Hypertension) diet.",
      "Limit alcohol and do not smoke.",
      "Exercise regularly.",
    ],
    prevention: [
      "Lifelong control of high blood pressure is the only way to prevent hypertensive nephrosclerosis.",
    ],
    riskFactors: [
      "Primary: Chronic, uncontrolled hypertension.",
      "Secondary: Older age, Black race, other pre-existing kidney disease.",
    ],
    warningSigns: [
      "A hypertensive emergency (severely high BP with organ damage) or a sudden, rapid loss of kidney function.",
    ],
  },
  {
    id: "acute-interstitial-nephritis",
    name: "Acute Interstitial Nephritis",
    category: "Renal",
    severity: "High",
    prevalence:
      "Accounts for about 15-20% of cases of acute kidney injury in hospitalized patients.",
    description:
      "Acute Interstitial Nephritis (AIN) is a kidney disorder characterized by a sudden inflammation of the interstitium (the tissue between the kidney tubules). This inflammation can cause a rapid decline in kidney function (acute kidney injury). It is most commonly caused by an allergic reaction to a medication.",
    desc: "Acute Interstitial Nephritis (AIN) is a kidney disorder characterized by a sudden inflammation of the interstitium (the tissue between the kidney tubules). This inflammation can cause a rapid decline in kidney function (acute kidney injury). It is most commonly caused by an allergic reaction to a medication.",
    symptoms: [
      'The "classic triad" (present in <10% of cases): fever, rash, and eosinophilia (high eosinophils in blood).',
      "Decreased urine output.",
      "Fatigue, nausea, loss of appetite.",
      "Pain in the flanks (less common).",
    ],
    causes: [
      "Medications (75% of cases): Antibiotics (e.g., penicillin, cephalosporins, sulfa drugs), NSAIDs (e.g., ibuprofen, naproxen), proton pump inhibitors (e.g., omeprazole).",
      "Infections: Various bacterial, viral, or fungal infections.",
      "Autoimmune Diseases: Such as lupus, Sjogren's syndrome.",
    ],
    treatment: [
      "Identify and Remove the Offending Agent: This is the most critical step. Kidney function often improves after the drug is stopped.",
      "Corticosteroids: May be used in severe cases or when kidney function does not recover quickly after stopping the drug.",
      "Supportive Care: Dialysis may be temporarily needed in severe cases.",
    ],
    selfCare: [
      "Be aware of medications that can cause AIN.",
      "Inform all your healthcare providers of any drug allergies or previous adverse reactions.",
      "Use over-the-counter NSAIDs sparingly and for short periods only.",
      "Lifestyle Recommendations",
      "No specific lifestyle changes.",
    ],
    prevention: [
      "Avoid unnecessary medications, especially those known to cause AIN if you have a history of it.",
      "Use the lowest effective dose of medications for the shortest possible time.",
    ],
    riskFactors: [
      "Primary: Recent use of certain medications (see Causes).",
      "Secondary: Underlying autoimmune diseases (e.g., Sjogren's), infections.",
    ],
    warningSigns: [
      "A rapid decline in urine output or other signs of acute kidney injury after starting a new medication require immediate medical evaluation.",
    ],
  },
  {
    id: "simple-renal-cyst",
    name: "Simple Renal Cyst",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "Extremely common; found in nearly 50% of people over the age of 50.",
    description:
      "A Simple Renal Cyst is a benign, fluid-filled sac that develops on the surface or within the kidney. They are very common, especially with aging, and are not cancerous nor do they typically affect kidney function. They are distinct from the cysts found in Polycystic Kidney Disease (PKD).",
    desc: "A Simple Renal Cyst is a benign, fluid-filled sac that develops on the surface or within the kidney. They are very common, especially with aging, and are not cancerous nor do they typically affect kidney function. They are distinct from the cysts found in Polycystic Kidney Disease (PKD).",
    symptoms: [
      "Vast majority are asymptomatic and discovered incidentally on an imaging test for another reason.",
      "If symptomatic: Dull pain in the back or side, abdominal pain, fever (if infected), hematuria (if bleeding into the cyst).",
    ],
    causes: [
      "The cause is unknown. They are thought to develop when a surface tubule in the kidney weakens and fills with fluid, forming a sac that detaches and grows.",
    ],
    treatment: [
      "No treatment is necessary for asymptomatic simple cysts.",
      "Sclerotherapy: Draining the cyst and filling it with alcohol to prevent recurrence.",
      "Surgery (Laparoscopic Decortication): Removing the roof of the cyst. This is rarely needed.",
    ],
    selfCare: [
      "No specific self-care is needed.",
      "If you have known cysts, be aware of the symptoms of complications (pain, fever, blood in urine).",
      "Lifestyle Recommendations",
      "No specific lifestyle changes.",
    ],
    prevention: ["There is no way to prevent simple renal cysts."],
    riskFactors: ["Primary: Increasing age."],
    warningSigns: [
      "Rarely, a cyst can become infected, bleed, or grow large enough to cause pain or obstruction. Sudden, severe pain or fever with flank pain warrants medical attention.",
    ],
  },
  {
    id: "uremic-syndrome",
    name: "Uremic Syndrome",
    category: "Renal",
    severity: "High",
    prevalence:
      "Occurs in patients with advanced acute kidney injury or chronic kidney disease (Stage 5/ESRD).",
    description:
      "Uremic Syndrome, or Uremia, is the clinical illness that occurs when the kidneys are no longer able to filter waste products from the blood effectively, leading to a toxic buildup of urea and other waste products in the bloodstream. It is a sign of end-stage kidney disease.",
    desc: "Uremic Syndrome, or Uremia, is the clinical illness that occurs when the kidneys are no longer able to filter waste products from the blood effectively, leading to a toxic buildup of urea and other waste products in the bloodstream. It is a sign of end-stage kidney disease.",
    symptoms: [
      "Neurological: Fatigue, difficulty concentrating, confusion, seizures, coma.",
      "Gastrointestinal: Nausea, vomiting, loss of appetite, metallic taste in the mouth.",
      "Cardiovascular: Pericarditis (chest pain), fluid overload, high blood pressure.",
      "Hematologic: Anemia, bleeding tendencies.",
      "Dermatologic: Severe itching (pruritus), uremic frost (white crystals on the skin from urea).",
    ],
    causes: [
      "The direct cause is the accumulation of nitrogenous waste products (like urea and creatinine) and other toxins that the failing kidneys cannot excrete.",
    ],
    treatment: [
      "Dialysis: The primary treatment to mechanically filter the blood and correct the biochemical abnormalities of uremia.",
      "Kidney Transplant: The definitive treatment.",
      "Management of Specific Symptoms: e.g., medications for nausea, phosphate binders, erythropoietin for anemia.",
    ],
    selfCare: [
      "For patients with advanced CKD, adhere strictly to dietary restrictions (low potassium, phosphorus, protein) to delay the onset of uremia.",
      "Once on dialysis, adhere strictly to the treatment schedule and prescription.",
      "Lifestyle Recommendations",
      "Work closely with your nephrologist and dialysis team.",
    ],
    prevention: [
      "The only prevention is to prevent kidney failure through early management of kidney disease, or to initiate dialysis in a timely manner before uremic symptoms become severe.",
    ],
    riskFactors: [
      "Primary: Any condition leading to severe, untreated kidney failure.",
    ],
    warningSigns: [
      "The development of uremic symptoms (especially confusion, seizures, or pericarditis) is a medical emergency requiring immediate initiation of dialysis.",
    ],
  },
  {
    id: "clear-cell-renal-cell-carcinoma",
    name: "Clear Cell Renal Cell Carcinoma",
    category: "Renal",
    severity: "Medium",
    prevalence: "The most common subtype of kidney cancer.",
    description:
      "Clear Cell Renal Cell Carcinoma (ccRCC) is the most common and aggressive subtype of renal cell carcinoma, accounting for about 70-80% of all RCC cases. The name comes from the pale or clear appearance of the cancer cells when viewed under a microscope. It arises from the proximal convoluted tubule.",
    desc: "Clear Cell Renal Cell Carcinoma (ccRCC) is the most common and aggressive subtype of renal cell carcinoma, accounting for about 70-80% of all RCC cases. The name comes from the pale or clear appearance of the cancer cells when viewed under a microscope. It arises from the proximal convoluted tubule.",
    symptoms: [
      'Early Stage: Often asymptomatic ("the internist\'s tumor").',
      "Hematuria (blood in the urine).",
      "Flank pain.",
      "A palpable mass in the side or abdomen.",
      "Unexplained weight loss, fever, night sweats.",
      "Paraneoplastic syndromes (e.g., high calcium, high red blood cell count).",
    ],
    causes: [
      "The most common genetic abnormality is the loss of the VHL tumor suppressor gene on chromosome 3, leading to uncontrolled growth of kidney cells.",
    ],
    treatment: [
      "Surgery: The primary treatment for localized disease.",
      "Partial Nephrectomy (nephron-sparing surgery) is the gold standard when possible.",
      "Radical Nephrectomy for larger tumors.",
      "Immunotherapy (e.g., immune checkpoint inhibitors) is now the backbone of treatment.",
      "Targeted Therapy (e.g., tyrosine kinase inhibitors like sunitinib).",
      "Combination Therapies are common.",
    ],
    selfCare: [
      "Attend all follow-up imaging (CT scans) for surveillance after surgery.",
      "Manage side effects of systemic therapy (e.g., fatigue, diarrhea, rash).",
      "Lifestyle Recommendations",
      "Do not smoke.",
      "Maintain a healthy weight and control blood pressure.",
    ],
    prevention: [
      "Don't smoke.",
      "Maintain a healthy weight.",
      "Control high blood pressure.",
    ],
    riskFactors: [
      "Primary: Smoking, obesity, hypertension.",
      "Secondary: Von Hippel-Lindau (VHL) syndrome (strongly associated with ccRCC).",
    ],
    warningSigns: [
      "The classic triad of blood in the urine, flank pain, and a palpable abdominal mass is rare and indicates advanced disease. Any one of these symptoms warrants prompt evaluation.",
    ],
  },
  {
    id: "microscopic-hematuria",
    name: "Microscopic Hematuria",
    category: "Renal",
    severity: "Medium",
    prevalence: "Very common, found in up to 18% of the general population.",
    description:
      "Microscopic Hematuria is the presence of red blood cells (RBCs) in the urine that is not visible to the naked eye. It is detected only by a urine dipstick test or microscopic examination (urinalysis). It is defined as =3 RBCs per high-power field on microscopic evaluation.",
    desc: "Microscopic Hematuria is the presence of red blood cells (RBCs) in the urine that is not visible to the naked eye. It is detected only by a urine dipstick test or microscopic examination (urinalysis). It is defined as =3 RBCs per high-power field on microscopic evaluation.",
    symptoms: [
      "By definition, it is asymptomatic.",
      "The underlying cause (e.g., UTI, stone) may cause symptoms.",
    ],
    causes: [
      "Benign: Vigorous exercise, menstrual contamination, sexual activity, mild trauma.",
      "Common Medical Causes: Urinary Tract Infection, kidney stones, enlarged prostate.",
      "Serious Causes: Bladder cancer, kidney cancer, glomerulonephritis.",
    ],
    treatment: [
      "Treatment is directed at the underlying cause.",
      "Evaluation is Key: The workup typically includes a repeat urinalysis, urine cytology, imaging (e.g., CT urogram), and cystoscopy (a scope to look inside the bladder) to rule out malignancy, especially in high-risk patients.",
    ],
    selfCare: [
      "Do not ignore a diagnosis of microscopic hematuria. Complete the recommended urologic evaluation.",
      "Provide a clean-catch urine sample to avoid contamination.",
      "Lifestyle Recommendations",
      "Stay well-hydrated.",
      "Do not smoke (smoking is a major risk factor for bladder cancer).",
    ],
    prevention: [
      "Prevention depends on the underlying cause (e.g., preventing UTIs, not smoking to prevent bladder cancer).",
    ],
    riskFactors: [
      "Primary: Age (increases with age), female sex (due to contamination), recent vigorous exercise.",
      "Secondary: Smoking, history of urologic disease, occupational exposure to chemicals/ dyes.",
    ],
    warningSigns: [
      "Microscopic hematuria itself is not an emergency, but if it progresses to visible blood (gross hematuria) or is accompanied by pain or other symptoms, seek prompt evaluation.",
    ],
  },
  {
    id: "nephrotic-range-proteinuria",
    name: "Nephrotic-Range Proteinuria",
    category: "Renal",
    severity: "Medium",
    prevalence: "A key diagnostic finding in various kidney diseases.",
    description:
      "Nephrotic-Range Proteinuria is a condition where a very large amount of protein is lost in the urine, specifically more than 3.5 grams of protein per 24 hours. It is a hallmark of Nephrotic Syndrome and indicates significant damage to the glomeruli (the kidneys' filters).",
    desc: "Nephrotic-Range Proteinuria is a condition where a very large amount of protein is lost in the urine, specifically more than 3.5 grams of protein per 24 hours. It is a hallmark of Nephrotic Syndrome and indicates significant damage to the glomeruli (the kidneys' filters).",
    symptoms: [
      "Foamy or frothy urine.",
      "Severe swelling (edema) in the legs, feet, ankles, and around the eyes.",
      "Weight gain from fluid retention.",
      "Fatigue and weakness.",
      "Loss of appetite.",
    ],
    causes: [
      "Damage to the glomerular basement membrane allows large plasma proteins (like albumin) to leak into the urine. This can be caused by primary kidney diseases (e.g., MCD, FSGS) or systemic diseases (e.g., diabetes, lupus).",
    ],
    treatment: [
      "Treatment focuses on the underlying disease and managing symptoms.",
      "Treat the Underlying Glomerular Disease: Often with corticosteroids and other immunosuppressants.",
      "ACE Inhibitors or ARBs: To reduce proteinuria and protect the kidneys.",
      "Diuretics: To control edema.",
      "Statins: For high cholesterol.",
      "Anticoagulants: May be used temporarily if there is a high risk of clotting.",
    ],
    selfCare: [
      "Follow a low-sodium diet to help control swelling.",
      "Monitor your weight daily to track fluid retention.",
      "Collect 24-hour urine tests as requested by your nephrologist.",
      "Lifestyle Recommendations",
      "Limit fluid intake if advised by your doctor.",
    ],
    prevention: [
      "Prevention involves controlling underlying conditions like diabetes and hypertension that can lead to glomerular damage.",
    ],
    riskFactors: [
      "Primary: Having a glomerular disease (e.g., Minimal Change Disease, Focal Segmental Glomerulosclerosis, Diabetic Nephropathy).",
    ],
    warningSigns: [
      "The onset of severe, generalized swelling (anasarca), shortness of breath, or a blood clot (due to hypercoagulability) requires immediate medical care.",
    ],
  },
  {
    id: "prerenal-azotemia",
    name: "Prerenal Azotemia",
    category: "Renal",
    severity: "High",
    prevalence:
      "Accounts for 60-70% of community-acquired acute kidney injury.",
    description:
      'Prerenal Azotemia is the most common form of acute kidney injury (AKI). It is caused by reduced blood flow (hypoperfusion) to the kidneys, rather than direct damage to the kidney tissue itself. The kidneys are "starved" of blood, leading to a buildup of waste products (azotemia). It is often reversible if the cause is corrected promptly.',
    desc: 'Prerenal Azotemia is the most common form of acute kidney injury (AKI). It is caused by reduced blood flow (hypoperfusion) to the kidneys, rather than direct damage to the kidney tissue itself. The kidneys are "starved" of blood, leading to a buildup of waste products (azotemia). It is often reversible if the cause is corrected promptly.',
    symptoms: [
      "Decreased urine output.",
      "Dehydration: Thirst, dry mouth, dizziness.",
      "Heart Failure: Shortness of breath, fatigue, swelling.",
      "Fatigue, nausea, confusion (if azotemia is severe).",
    ],
    causes: [
      "Volume Loss: Dehydration, hemorrhage, severe diarrhea/vomiting.",
      "Reduced Cardiac Output: Heart failure, myocardial infarction.",
      "Systemic Vasodilation: Sepsis, liver cirrhosis, anaphylaxis.",
      "Renal Vasoconstriction: NSAIDs, hypercalcemia.",
    ],
    treatment: [
      "The goal is to restore renal blood flow.",
      "Volume Repletion: Intravenous fluids for dehydration.",
      "Treat Heart Failure with diuretics and medications.",
      "Treat Sepsis with antibiotics and vasopressors.",
      "Discontinue Offending Medications (e.g., NSAIDs).",
    ],
    selfCare: [
      "Stay well-hydrated, especially during illness or in hot weather.",
      "Use over-the-counter NSAIDs with caution.",
      "Manage chronic conditions like heart failure.",
      "Lifestyle Recommendations",
      "No specific lifestyle changes beyond managing underlying health issues.",
    ],
    prevention: [
      "Maintain adequate hydration.",
      "Careful management of chronic illnesses that predispose to prerenal azotemia.",
    ],
    riskFactors: [
      "Primary: Volume depletion (dehydration, bleeding, diarrhea), heart failure, liver failure, medications that affect renal blood flow (e.g., NSAIDs, ACE inhibitors).",
    ],
    warningSigns: [
      "Signs of severe dehydration (dizziness, no urine output) or heart failure (shortness of breath, swelling) with reduced urine output require emergency evaluation.",
    ],
  },
  {
    id: "fanconi-syndrome",
    name: "Fanconi Syndrome",
    category: "Renal",
    severity: "Medium",
    prevalence: "A rare condition.",
    description:
      "Fanconi Syndrome is a disorder of the kidney tubules in which certain substances that are normally absorbed back into the bloodstream by the kidneys are instead excreted in the urine. It is a defect in the proximal tubule, leading to excessive urinary loss of glucose, amino acids, phosphate, bicarbonate, and other electrolytes.",
    desc: "Fanconi Syndrome is a disorder of the kidney tubules in which certain substances that are normally absorbed back into the bloodstream by the kidneys are instead excreted in the urine. It is a defect in the proximal tubule, leading to excessive urinary loss of glucose, amino acids, phosphate, bicarbonate, and other electrolytes.",
    symptoms: [
      "Due to bicarbonate loss: Metabolic acidosis (failure to thrive in children, rapid breathing).",
      "Due to phosphate loss: Rickets (in children) or osteomalacia (in adults) - bone pain and weakness.",
      "Due to potassium loss: Muscle weakness.",
      "Due to water loss: Polyuria (excessive urination), polydipsia (excessive thirst), dehydration.",
    ],
    causes: [
      "Genetic Causes: Cystinosis (most common in children), Wilson's disease, galactosemia.",
      "Acquired Causes: Multiple Myeloma, certain drugs (e.g., outdated tetracycline, ifosfamide, tenofovir), heavy metal poisoning.",
    ],
    treatment: [
      "There is no cure for the tubular defect itself; treatment focuses on replacing what is lost.",
      "Oral Supplements: Potassium, phosphate, and bicarbonate.",
      "Vitamin D: To help with bone disease.",
      "High Fluid Intake: To prevent dehydration.",
      "Treating the Underlying Cause (e.g., chelation for Wilson's disease, chemotherapy for myeloma).",
    ],
    selfCare: [
      "Take all replacement supplements as prescribed.",
      "Ensure adequate fluid intake.",
      "Monitor for symptoms of electrolyte imbalance.",
      "Lifestyle Recommendations",
      "Work closely with a nephrologist and dietitian.",
    ],
    prevention: [
      "Prevention involves avoiding known causative drugs and early treatment of underlying diseases.",
    ],
    riskFactors: [
      "Primary: In children, it is often due to genetic disorders like Cystinosis. In adults, it is often acquired.",
    ],
    warningSigns: [
      "Severe dehydration or electrolyte imbalances causing muscle weakness or cardiac arrhythmias require urgent care.",
    ],
  },
  {
    id: "type-1-renal-tubular-acidosis",
    name: "Type 1 Renal Tubular Acidosis",
    category: "Renal",
    severity: "Medium",
    prevalence: "A rare condition.",
    description:
      "Type 1 Renal Tubular Acidosis (Distal RTA) is a disorder in which the kidneys are unable to acidify the urine, due to a defect in the distal tubule. This leads to the buildup of acid in the blood (metabolic acidosis), which can cause a cascade of problems, including low blood potassium, kidney stones, and bone disease.",
    desc: "Type 1 Renal Tubular Acidosis (Distal RTA) is a disorder in which the kidneys are unable to acidify the urine, due to a defect in the distal tubule. This leads to the buildup of acid in the blood (metabolic acidosis), which can cause a cascade of problems, including low blood potassium, kidney stones, and bone disease.",
    symptoms: [
      "Muscle Weakness or Paralysis: Due to hypokalemia.",
      "Kidney Stones: From alkaline urine, low citrate, and high calcium.",
      "Bone Pain: From chronic acidosis leaching calcium from bones.",
      "In children: failure to thrive.",
    ],
    causes: [
      "A defect in the alpha-intercalated cells of the distal tubule, which are responsible for secreting hydrogen ions into the urine. This can be caused by autoimmune diseases, genetic mutations, or urinary tract obstructions.",
    ],
    treatment: [
      "Alkali Therapy: The mainstay of treatment. Sodium bicarbonate or potassium citrate is given to neutralize the blood acid.",
      "Potassium Supplementation: Often needed, usually given as potassium citrate.",
      "Treatment of the Underlying Cause if one is identified.",
    ],
    selfCare: [
      "Take alkali medication consistently.",
      "Stay well-hydrated to help prevent kidney stones.",
      "Lifestyle Recommendations",
      "No specific lifestyle changes.",
    ],
    prevention: [
      "There is no known prevention for the genetic form. For acquired forms, managing the underlying autoimmune disease may prevent its development.",
    ],
    riskFactors: [
      "Primary: Can be genetic or acquired from autoimmune diseases (e.g., Sjogren's syndrome, SLE), or medications.",
    ],
    warningSigns: [
      "Severe hypokalemia (low potassium) can cause muscle paralysis or dangerous heart rhythms and is a medical emergency.",
    ],
  },
  {
    id: "goodpasture-syndrome",
    name: "Goodpasture Syndrome",
    category: "Renal",
    severity: "Medium",
    prevalence: "Extremely rare.",
    description:
      "Goodpasture Syndrome is a rare and life-threatening autoimmune disorder. The immune system mistakenly produces antibodies that attack a specific protein called the alpha-3 chain of type IV collagen, which is found in the basement membranes of the kidneys and lungs. This leads to rapidly progressive glomerulonephritis and lung hemorrhage.",
    desc: "Goodpasture Syndrome is a rare and life-threatening autoimmune disorder. The immune system mistakenly produces antibodies that attack a specific protein called the alpha-3 chain of type IV collagen, which is found in the basement membranes of the kidneys and lungs. This leads to rapidly progressive glomerulonephritis and lung hemorrhage.",
    symptoms: [
      "Lung Symptoms: Coughing up blood (hemoptysis), shortness of breath, dry cough.",
      "Kidney Symptoms: Blood in the urine (dark or cola-colored), protein in the urine, rapid decline in kidney function, swelling in the legs.",
    ],
    causes: [
      "An autoimmune reaction where autoantibodies bind to the glomerular and alveolar basement membranes, activating the complement system and causing severe inflammation and damage.",
    ],
    treatment: [
      "Treatment must be aggressive and immediate to prevent permanent kidney and lung damage.",
      "Plasmapheresis: The cornerstone of treatment. It removes the harmful antibodies from the blood.",
      "Immunosuppression: High-dose corticosteroids (e.g., methylprednisolone) and cyclophosphamide to stop the production of new antibodies.",
      "Dialysis: For acute kidney failure.",
    ],
    selfCare: [
      "(During/After Treatment)",
      "Strict adherence to the immunosuppressive medication regimen.",
      "Do not smoke.",
      "Avoid exposure to hydrocarbon fumes.",
      "Attend all follow-up appointments to monitor kidney function and for potential relapse.",
      "Lifestyle Recommendations",
      "No specific lifestyle changes beyond avoiding triggers.",
    ],
    prevention: ["There is no known prevention."],
    riskFactors: [
      "Primary: Genetic predisposition, exposure to hydrocarbon solvents or tobacco smoke may be triggers.",
    ],
    warningSigns: [
      "This is a medical emergency. Coughing up blood (hemoptysis) combined with symptoms of kidney failure (reduced urine output, swelling) requires immediate hospitalization.",
    ],
  },
  {
    id: "focal-segmental-glomerulosclerosis",
    name: "Focal Segmental Glomerulosclerosis",
    category: "Renal",
    severity: "High",
    prevalence: "A leading cause of idiopathic nephrotic syndrome in adults.",
    description:
      "Focal Segmental Glomerulosclerosis (FSGS) is a serious kidney disease characterized by scarring (sclerosis) in scattered regions (focal) of some (segmental) of the kidney's glomeruli. It is a common cause of Nephrotic Syndrome in adults and can lead to end-stage renal disease.",
    desc: "Focal Segmental Glomerulosclerosis (FSGS) is a serious kidney disease characterized by scarring (sclerosis) in scattered regions (focal) of some (segmental) of the kidney's glomeruli. It is a common cause of Nephrotic Syndrome in adults and can lead to end-stage renal disease.",
    symptoms: [
      "Severe edema (swelling) in the legs and around the eyes.",
      "Foamy urine.",
      "Weight gain.",
      "Fatigue.",
      "High blood pressure.",
    ],
    causes: [
      "Primary (Idiopathic) FSGS: An unknown circulating factor is suspected.",
      "Secondary FSGS: Due to adaptive changes from reduced nephron mass (e.g., from obesity, reflux) or direct podocyte injury.",
    ],
    treatment: [
      "Corticosteroids (e.g., Prednisone): First-line treatment, but many patients are steroid-resistant.",
      "Other Immunosuppressants: Such as cyclosporine, tacrolimus, or mycophenolate for steroid-resistant cases.",
      "ACE Inhibitors/ARBs: To control blood pressure and reduce proteinuria.",
      "Diuretics: For edema.",
      "Dietary Modifications: Low salt, low protein.",
    ],
    selfCare: [
      "Adhere to the medication regimen, which may be long-term.",
      "Follow a strict renal diet.",
      "Monitor for signs of disease activity (weight gain, foamy urine).",
      "Lifestyle Recommendations",
      "Lose weight if obese.",
    ],
    prevention: [
      "There is no known prevention for primary FSGS. Controlling obesity and managing conditions that can lead to secondary FSGS may be helpful.",
    ],
    riskFactors: [
      "Primary: Often idiopathic. Can be secondary to viruses (HIV), obesity, reflux nephropathy, or certain drugs.",
      "Secondary: African American race, family history.",
    ],
    warningSigns: [
      "The sudden onset of severe nephrotic syndrome (massive swelling, foamy urine) requires prompt nephrology evaluation.",
    ],
  },
  {
    id: "medullary-sponge-kidney",
    name: "Medullary Sponge Kidney",
    category: "Renal",
    severity: "Medium",
    prevalence:
      "A relatively rare condition, estimated to affect 1 in 5,000 to 20,000 people.",
    description:
      'Medullary Sponge Kidney (MSK) is a congenital disorder characterized by cystic malformation in the collecting ducts of the renal pyramids, giving the kidney a "spongy" appearance on imaging. This malformation leads to urinary stasis, which predisposes individuals to kidney stones, urinary tract infections, and blood in the urine.',
    desc: 'Medullary Sponge Kidney (MSK) is a congenital disorder characterized by cystic malformation in the collecting ducts of the renal pyramids, giving the kidney a "spongy" appearance on imaging. This malformation leads to urinary stasis, which predisposes individuals to kidney stones, urinary tract infections, and blood in the urine.',
    symptoms: [
      "Often asymptomatic.",
      "Recurrent kidney stones (calcium-based).",
      "Recurrent urinary tract infections or pyelonephritis.",
      "Hematuria (microscopic or gross), which can be painless.",
    ],
    causes: [
      "The exact cause is unknown, but it is a developmental defect. It is usually sporadic but can sometimes be familial.",
    ],
    treatment: [
      "There is no cure for the underlying abnormality. Treatment focuses on managing complications.",
      "Preventing Stones: High fluid intake is crucial. Thiazide diuretics or potassium citrate may be used to reduce stone formation.",
      "Treating UTIs: Prompt antibiotic therapy for infections.",
      "Managing Pain: For stone episodes.",
    ],
    selfCare: [
      "The single most important action is to drink plenty of fluids (3+ liters per day) to keep urine dilute and flush out the ducts.",
      "Follow a diet to prevent calcium stones (moderate calcium, low sodium, low animal protein).",
      "Lifestyle Recommendations",
      "Regular follow-up with a urologist or nephrologist.",
    ],
    prevention: [
      "The condition cannot be prevented, but its complications (stones and UTIs) can be significantly reduced with aggressive hydration.",
    ],
    riskFactors: [
      "Primary: The condition is present from birth, though symptoms often don't appear until adulthood.",
    ],
    warningSigns: [
      "Severe renal colic from a stone or a high fever from pyelonephritis requires emergency care.",
    ],
  },
  {
    id: "autoimmune-gastritis",
    name: "Autoimmune Gastritis",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence:
      "More common in women and individuals with other autoimmune disorders (e.g., Thyroiditis, Type 1 Diabetes).",
    description:
      "Autoimmune Gastritis is a chronic inflammatory disease where the immune system mistakenly attacks the parietal cells of the stomach lining. These cells produce intrinsic factor (essential for vitamin B12 absorption) and gastric acid. This leads to their destruction, causing achlorhydria (lack of stomach acid) and, eventually, pernicious anemia due to B12 deficiency.",
    desc: "Autoimmune Gastritis is a chronic inflammatory disease where the immune system mistakenly attacks the parietal cells of the stomach lining. These cells produce intrinsic factor (essential for vitamin B12 absorption) and gastric acid. This leads to their destruction, causing achlorhydria (lack of stomach acid) and, eventually, pernicious anemia due to B12 deficiency.",
    symptoms: [
      "Early Stage: Often asymptomatic for years.",
      "From B12 Deficiency: Fatigue, weakness, pale skin, neurological symptoms (numbness, tingling in hands/feet, balance problems).",
      "From Achlorhydria: Indigestion, feeling full early, nausea.",
    ],
    causes: [
      "An autoimmune reaction against the H+/K+ ATPase proton pump of parietal cells. The cause of this autoimmunity is unknown but has a strong genetic component.",
    ],
    treatment: [
      "Vitamin B12 Replacement: Lifelong intramuscular B12 injections or high-dose oral supplements.",
      "Monitoring: Regular checks for iron deficiency (common) and for increased risk of gastric neuroendocrine tumors.",
      "No treatment exists to stop the autoimmune process itself.",
    ],
    selfCare: [
      "Strict adherence to B12 replacement therapy.",
      "Be aware of the symptoms of B12 deficiency.",
      "Inform other doctors of your diagnosis, especially before surgeries involving nitrous oxide anesthesia, which can acutely worsen B12 deficiency.",
      "Lifestyle Recommendations",
      "No specific dietary changes, but a balanced diet is recommended.",
    ],
    prevention: ["There is no known way to prevent autoimmune gastritis."],
    riskFactors: [
      "Primary: Personal or family history of autoimmune diseases.",
      "Secondary: Female sex, age (often diagnosed in people 60+).",
    ],
    warningSigns: [
      "Severe symptoms of B12 deficiency, such as significant neurological changes (numbness, difficulty walking) or severe anemia (shortness of breath, extreme fatigue), require prompt evaluation.",
    ],
  },
  {
    id: "duodenal-ulcer",
    name: "Duodenal Ulcer",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "A common form of peptic ulcer disease.",
    description:
      "A Duodenal Ulcer is a sore that forms in the lining of the first part of the small intestine, the duodenum. It is a type of peptic ulcer disease. It occurs when the protective mechanisms of the duodenal mucosa are overwhelmed by acid and pepsin.",
    desc: "A Duodenal Ulcer is a sore that forms in the lining of the first part of the small intestine, the duodenum. It is a type of peptic ulcer disease. It occurs when the protective mechanisms of the duodenal mucosa are overwhelmed by acid and pepsin.",
    symptoms: [
      "Burning or gnawing pain in the upper abdomen, often occurring when the stomach is empty (between meals or at night) and relieved by eating or antacids.",
      "Bloating, feeling of fullness.",
      "Heartburn.",
    ],
    causes: [
      "H. pylori: A bacterium that weakens the protective mucosal barrier.",
      "NSAIDs: Inhibit prostaglandins, which are crucial for mucosal protection and blood flow.",
      "Acid Hypersecretion: Plays a role, though most patients have normal acid levels.",
    ],
    treatment: [
      'Eradicate H. pylori: A combination of two antibiotics and a proton pump inhibitor (PPI) ("triple therapy").',
      "Acid Suppression: PPIs (e.g., omeprazole) are first-line to promote healing.",
      "Stop NSAID Use.",
      "Surgery: Rarely needed, only for complications like perforation or uncontrolled bleeding.",
    ],
    selfCare: [
      "Complete the full course of H. pylori treatment.",
      "Take all medications as prescribed.",
      "Avoid foods that worsen your pain (spicy foods, caffeine, alcohol are common, but vary by person).",
      "Lifestyle Recommendations",
      "Do not smoke.",
      "Limit or avoid alcohol.",
      "Use acetaminophen instead of NSAIDs for pain relief when possible.",
    ],
    prevention: [
      "Test for and treat H. pylori infection.",
      "Avoid unnecessary use of NSAIDs. If needed, use the lowest dose for the shortest time, and consider taking a PPI with it.",
    ],
    riskFactors: [
      "Primary: Helicobacter pylori (H. pylori) infection, use of NSAIDs (e.g., ibuprofen, aspirin).",
      "Secondary: Smoking, excessive alcohol consumption, severe physiological stress (e.g., burns, major surgery).",
    ],
    warningSigns: [
      "Seek emergency care for: severe, persistent abdominal pain; vomiting blood (red or coffee-ground); black, tarry stools; signs of shock (fainting, rapid pulse). These indicate bleeding or perforation.",
    ],
  },
  {
    id: "refractory-gerd",
    name: "Refractory GERD",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "Affects up to 40% of patients with GERD.",
    description:
      "Refractory GERD (Gastroesophageal Reflux Disease) is diagnosed when classic GERD symptoms (heartburn, regurgitation) persist despite standard-dose Proton Pump Inhibitor (PPI) therapy for at least 8 weeks. It suggests that the current treatment is inadequate or the diagnosis may be incorrect.",
    desc: "Refractory GERD (Gastroesophageal Reflux Disease) is diagnosed when classic GERD symptoms (heartburn, regurgitation) persist despite standard-dose Proton Pump Inhibitor (PPI) therapy for at least 8 weeks. It suggests that the current treatment is inadequate or the diagnosis may be incorrect.",
    symptoms: [
      "Persistent heartburn and/or regurgitation despite PPI use.",
      "Chest pain.",
      "Chronic cough, laryngitis, asthma symptoms (atypical or extra-esophageal manifestations).",
    ],
    causes: [
      "Inadequate Acid Suppression: Weak or rapidly metabolized PPI response.",
      "Non-Acid Reflux: Reflux of bile and other contents not suppressed by PPIs.",
      "Functional Heartburn: A hypersensitive esophagus where normal amounts of reflux cause symptoms.",
      "Misdiagnosis: Could be Eosinophilic Esophagitis (EoE), achalasia, or rumination syndrome.",
    ],
    treatment: [
      "Optimize PPI Therapy: Ensure correct timing (30-60 mins before meals), dose, and adherence.",
      "Add an H2-Receptor Blocker (e.g., famotidine) at bedtime.",
      "Testing: Esophageal pH-impedance testing (on and off PPIs) to confirm/quantify reflux and guide therapy.",
      "Surgery: Consideration of fundoplication if reflux is objectively confirmed and symptoms are persistent.",
    ],
    selfCare: [
      "Take PPIs correctly – first thing in the morning, 30-60 minutes before breakfast.",
      "Elevate the head of your bed 6-8 inches.",
      "Avoid late-night meals (no eating within 3 hours of lying down).",
      "Lifestyle Recommendations",
      "Lose weight if overweight.",
      "Identify and avoid personal food triggers (common ones: fatty foods, chocolate, caffeine, alcohol).",
    ],
    prevention: [
      "Aggressive initial management of GERD and strict adherence to lifestyle modifications may help prevent progression to refractory disease.",
    ],
    riskFactors: [
      "Primary: Severe baseline esophageal injury, large hiatal hernia, obesity.",
      "Secondary: Non-adherence to medication or lifestyle advice, delayed gastric emptying.",
    ],
    warningSigns: [
      '"Alarm features" like difficulty swallowing, painful swallowing, unexplained weight loss, or vomiting blood require immediate medical evaluation to rule out cancer or strictures.',
    ],
  },
  {
    id: "irritable-bowel-syndrome-with-diarrhea-ibs-d",
    name: "Irritable Bowel Syndrome with Diarrhea (IBS-D)",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "Very common; affects about 5-10% of the population globally.",
    description:
      "Irritable Bowel Syndrome with Diarrhea (IBS-D) is a common functional gastrointestinal disorder characterized by recurrent abdominal pain associated with diarrhea as the predominant bowel habit. It is a disorder of gut-brain interaction, meaning the communication between the brain and gut is disrupted.",
    desc: "Irritable Bowel Syndrome with Diarrhea (IBS-D) is a common functional gastrointestinal disorder characterized by recurrent abdominal pain associated with diarrhea as the predominant bowel habit. It is a disorder of gut-brain interaction, meaning the communication between the brain and gut is disrupted.",
    symptoms: [
      "Abdominal pain or cramping, often relieved by defecation.",
      "Frequent, loose, or watery stools.",
      "Urgency to have a bowel movement.",
      "Bloating and gas.",
      "Mucus in the stool.",
    ],
    causes: [
      "Visceral Hypersensitivity: Increased sensitivity to pain in the gut.",
      "Altered Gut Motility: The colon contracts more forcefully and frequently.",
      "Brain-Gut Axis Dysfunction: Stress and emotions can trigger or worsen symptoms.",
      "Post-Infectious Changes: After a gut infection.",
    ],
    treatment: [
      "Dietary Modification: Low FODMAP Diet (under dietitian guidance) is highly effective.",
      "Antispasmodics: For abdominal pain (e.g., hyoscine).",
      "Antidiarrheals: Loperamide (Imodium).",
      "Rifaximin (Xifaxan): A non-absorbable antibiotic for bloating and diarrhea.",
      "Eluxadoline (Viberzi): Reduces diarrhea and pain.",
      "Psychological Therapies: Gut-directed hypnotherapy, cognitive behavioral therapy (CBT).",
    ],
    selfCare: [
      "Keep a food and symptom diary to identify triggers.",
      "Manage stress through mindfulness, meditation, or yoga.",
      "Eat smaller, more frequent meals.",
      "Lifestyle Recommendations",
      "Regular exercise can help regulate bowel function and reduce stress.",
    ],
    prevention: [
      "There is no known prevention, but managing stress and diet can help prevent flares.",
    ],
    riskFactors: [
      'Primary: Female sex, history of anxiety/depression, past history of infectious gastroenteritis ("post-infectious IBS").',
      "Secondary: Food intolerances, genetic predisposition.",
    ],
    warningSigns: [
      '"Red flag" symptoms like rectal bleeding, unexplained weight loss, persistent vomiting, or severe, constant pain require evaluation to rule out IBD or other serious conditions.',
    ],
  },
  {
    id: "crohns-disease-of-the-ileum",
    name: "Crohn's Disease of the Ileum",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence:
      "The terminal ileum is the most common site of involvement in Crohn's disease.",
    description:
      "Crohn's Disease of the Ileum (Ileitis) is a type of Inflammatory Bowel Disease (IBD) that causes chronic inflammation, most commonly affecting the terminal ileum (the last part of the small intestine). It is characterized by transmural inflammation (affecting all layers of the bowel wall) and can lead to complications like strictures and fistulas.",
    desc: "Crohn's Disease of the Ileum (Ileitis) is a type of Inflammatory Bowel Disease (IBD) that causes chronic inflammation, most commonly affecting the terminal ileum (the last part of the small intestine). It is characterized by transmural inflammation (affecting all layers of the bowel wall) and can lead to complications like strictures and fistulas.",
    symptoms: [
      "Abdominal pain and cramping (often in the right lower quadrant).",
      "Persistent diarrhea (may be non-bloody in small bowel disease).",
      "Unintentional weight loss.",
      "Fatigue.",
      "Fever.",
    ],
    causes: [
      "An abnormal immune response to the gut microbiome in a genetically susceptible individual, leading to uncontrolled inflammation.",
    ],
    treatment: [
      "Corticosteroids: For acute flares (e.g., prednisone).",
      "Immunomodulators: Azathioprine, 6-mercaptopurine.",
      "Biologics: Anti-TNF agents (e.g., infliximab, adalimumab), anti-integrins (vedolizumab).",
      "Surgery: Often necessary for complications like strictures, fistulas, or abscesses. Surgery is not curative, as disease often recurs.",
    ],
    selfCare: [
      "Take all medications as prescribed to maintain remission.",
      "If you smoke, quitting is the single most important thing you can do.",
      "During flares, a low-residue or liquid diet may help reduce pain.",
      "Lifestyle Recommendations",
      "Work with a dietitian to ensure adequate nutrition, especially if you have malabsorption.",
    ],
    prevention: [
      "There is no known prevention. Smoking cessation is the most effective way to reduce disease activity and complications.",
    ],
    riskFactors: [
      "Primary: Genetic predisposition (NOD2/CARD15 gene), family history of IBD.",
      "Secondary: Smoking (strongly associated with Crohn's), Western diet.",
    ],
    warningSigns: [
      "Severe, constant abdominal pain, fever, and vomiting could indicate an obstruction or abscess and require emergency care.",
    ],
  },
  {
    id: "ulcerative-proctitis",
    name: "Ulcerative Proctitis",
    category: "Gastrointestinal",
    severity: "Low",
    prevalence: "A common presentation of UC, especially at initial diagnosis.",
    description:
      "Ulcerative Proctitis is a mild form of Ulcerative Colitis (UC), a type of Inflammatory Bowel Disease. The inflammation is confined to the rectum (the last 15 cm of the colon). It is the most limited form of UC and often has a milder course.",
    desc: "Ulcerative Proctitis is a mild form of Ulcerative Colitis (UC), a type of Inflammatory Bowel Disease. The inflammation is confined to the rectum (the last 15 cm of the colon). It is the most limited form of UC and often has a milder course.",
    symptoms: [
      "Rectal bleeding (the most common symptom).",
      "Urgency to defecate.",
      "Tenesmus (a feeling of incomplete evacuation).",
      "Rectal pain.",
      "Passage of mucus.",
    ],
    causes: [
      "Like other forms of IBD, it is thought to be an abnormal immune response to gut bacteria in a genetically susceptible host.",
    ],
    treatment: [
      "Mesalamine Suppositories: Highly effective for treating the rectum directly.",
      "Mesalamine Enemas: Can reach slightly higher if needed.",
      "Oral Mesalamine: May be added if topical therapy is insufficient or if disease extends.",
      "Corticosteroids: Topical or oral for flares.",
    ],
    selfCare: [
      "Adhere to topical medication even when feeling well to maintain remission.",
      "Use a perianal barrier cream to protect skin from irritation caused by frequent bowel movements.",
      "Lifestyle Recommendations",
      "Manage stress, as it can trigger flares.",
    ],
    prevention: [
      "There is no known prevention, but consistent use of maintenance medication can prevent flares.",
    ],
    riskFactors: [
      "Primary: Family history of IBD, Caucasian or Ashkenazi Jewish descent.",
      "Secondary: Possibly environmental factors.",
    ],
    warningSigns: [
      "If symptoms suddenly worsen with high fever, severe bleeding, or intense pain, it may indicate an extension of disease or a severe flare requiring hospitalization.",
    ],
  },
  {
    id: "alcoholic-hepatitis",
    name: "Alcoholic Hepatitis",
    category: "Gastrointestinal",
    severity: "High",
    prevalence:
      "A major cause of alcohol-related liver disease and liver failure.",
    description:
      "Alcoholic Hepatitis is an acute inflammation of the liver caused by heavy alcohol consumption over a period of time. It ranges from mild to severe (life-threatening) and is characterized by hepatocyte swelling, inflammation, and necrosis. It is a distinct condition from cirrhosis but can coexist with it.",
    desc: "Alcoholic Hepatitis is an acute inflammation of the liver caused by heavy alcohol consumption over a period of time. It ranges from mild to severe (life-threatening) and is characterized by hepatocyte swelling, inflammation, and necrosis. It is a distinct condition from cirrhosis but can coexist with it.",
    symptoms: [
      "Jaundice (yellowing of skin and eyes) – the hallmark symptom.",
      "Fatigue and weakness.",
      "Abdominal pain and tenderness, especially in the right upper quadrant.",
      "Fever.",
      "Nausea and vomiting.",
      "Weight loss.",
    ],
    causes: [
      "Direct toxicity from alcohol and its metabolites (especially acetaldehyde) on liver cells, triggering an intense inflammatory response and oxidative stress.",
    ],
    treatment: [
      "Absolute Alcohol Cessation: The cornerstone of treatment. Relapse is common without a structured program.",
      "Nutritional Support: High-calorie, protein-rich diet to combat malnutrition.",
      "Corticosteroids (e.g., Prednisolone): Used in severe cases without infection to reduce inflammation.",
      "Liver Transplant: May be considered in select patients with a first episode of severe disease who are abstinent but not improving.",
    ],
    selfCare: [
      "Complete and permanent abstinence from alcohol is non-negotiable.",
      "Take nutritional supplements as recommended.",
      "Attend all follow-up appointments with hepatology.",
      "Lifestyle Recommendations",
      "Seek help for alcohol dependence (counseling, support groups like AA).",
    ],
    prevention: [
      "Limit alcohol intake to recommended guidelines or abstain completely. For those with any liver disease, complete abstinence is required.",
    ],
    riskFactors: [
      "Primary: Heavy, chronic alcohol use. The quantity and duration are key.",
      "Secondary: Female sex (women are more susceptible at lower doses), obesity, genetic factors.",
    ],
    warningSigns: [
      "This is a medical emergency. Symptoms like jaundice, ascites (fluid in the abdomen), confusion, and fever require immediate hospitalization.",
    ],
  },
  {
    id: "symptomatic-gallstones-cholelithiasis",
    name: "Symptomatic Gallstones (Cholelithiasis)",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence:
      "Very common; affects 10-15% of the adult population, but only 20% of those with stones become symptomatic.",
    description:
      "Symptomatic Gallstones occur when solid particles (gallstones) formed from bile constituents in the gallbladder cause symptoms, most commonly biliary colic. The stones can block the cystic duct, leading to increased gallbladder pressure and pain.",
    desc: "Symptomatic Gallstones occur when solid particles (gallstones) formed from bile constituents in the gallbladder cause symptoms, most commonly biliary colic. The stones can block the cystic duct, leading to increased gallbladder pressure and pain.",
    symptoms: [
      "Biliary Colic: A sudden, constant, severe pain in the right upper quadrant or epigastrium that may radiate to the back or right shoulder. It typically lasts 30 minutes to several hours and is often post-prandial, especially after a fatty meal.",
      "Nausea and vomiting.",
    ],
    causes: [
      "An imbalance in the chemical makeup of bile, leading to precipitation of cholesterol or bilirubin into stones.",
    ],
    treatment: [
      "Laparoscopic Cholecystectomy: Surgical removal of the gallbladder. This is the definitive treatment for symptomatic stones and prevents future attacks and complications.",
      "Non-Surgical Options (rarely used): Oral bile acids (for small, radiolucent stones) or shock wave lithotripsy. These have high recurrence rates.",
    ],
    selfCare: [
      "While awaiting surgery, follow a low-fat diet to reduce the frequency of attacks.",
      "Do not skip meals.",
      "Lifestyle Recommendations",
      "Maintain a healthy weight and avoid rapid weight loss.",
    ],
    prevention: [
      "Maintaining a healthy weight, eating a high-fiber diet, and avoiding rapid weight loss may reduce the risk of stone formation.",
    ],
    riskFactors: [
      "The 4 F's: Female, Forty, Fertile, Fat (Obesity). Also rapid weight loss, pregnancy, certain medications.",
    ],
    warningSigns: [
      "Pain lasting more than 6 hours, fever, chills, persistent vomiting, or jaundice suggest a complication like acute cholecystitis, cholangitis, or pancreatitis and require emergency care.",
    ],
  },
  {
    id: "acute-gallstone-pancreatitis",
    name: "Acute Gallstone Pancreatitis",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence:
      "Gallstones are the leading cause of acute pancreatitis in the Western world.",
    description:
      'Acute Gallstone Pancreatitis is a sudden inflammation of the pancreas caused by a gallstone obstructing the ampulla of Vater, where the common bile duct and pancreatic duct meet. This blockage prevents pancreatic enzymes from being released into the intestine, leading to their activation within the pancreas and subsequent "autodigestion" of the organ.',
    desc: 'Acute Gallstone Pancreatitis is a sudden inflammation of the pancreas caused by a gallstone obstructing the ampulla of Vater, where the common bile duct and pancreatic duct meet. This blockage prevents pancreatic enzymes from being released into the intestine, leading to their activation within the pancreas and subsequent "autodigestion" of the organ.',
    symptoms: [
      "Severe, constant upper abdominal pain that often radiates to the back.",
      "Nausea and vomiting.",
      "Fever.",
      "Tachycardia (rapid heart rate).",
      "Abdominal tenderness.",
    ],
    causes: [
      'The "common channel" theory: a gallstone becomes impacted at the ampulla, causing reflux of bile or obstruction of pancreatic juice, activating digestive enzymes within the pancreas itself.',
    ],
    treatment: [
      "Hospitalization: For IV fluids, pain control, and bowel rest (NPO).",
      "Early, Aggressive Fluid Resuscitation: Critical to prevent necrosis.",
      "Treating the Underlying Cause: A cholecystectomy (gallbladder removal) is required during the same admission or shortly after the inflammation resolves to prevent recurrent attacks.",
      "ERCP: May be performed if a stone is lodged and not passing, causing ongoing obstruction or cholangitis.",
    ],
    selfCare: [
      "(Post-Recovery)",
      "Do not cancel or delay your scheduled cholecystectomy.",
      "Follow a low-fat diet until the gallbladder is removed.",
      "Lifestyle Recommendations",
      "The prevention for this condition is the timely management of symptomatic gallstones.",
    ],
    prevention: [
      "Elective cholecystectomy for symptomatic gallstones is the only way to prevent gallstone pancreatitis.",
    ],
    riskFactors: [
      "Primary: Having symptomatic gallstones.",
      "Secondary: Female sex, obesity.",
    ],
    warningSigns: [
      "This is a medical emergency. Severe, constant upper abdominal pain radiating to the back, with nausea and vomiting, requires immediate hospitalization.",
    ],
  },
  {
    id: "alcoholic-liver-cirrhosis",
    name: "Alcoholic Liver Cirrhosis",
    category: "Gastrointestinal",
    severity: "High",
    prevalence:
      "A leading cause of cirrhosis and liver-related death worldwide.",
    description:
      "Alcoholic Liver Cirrhosis is the late stage of progressive alcoholic liver disease, characterized by the replacement of normal liver tissue with scar tissue (fibrosis) and regenerative nodules. This results in a loss of liver function and is irreversible. It represents the endpoint of years of heavy alcohol use.",
    desc: "Alcoholic Liver Cirrhosis is the late stage of progressive alcoholic liver disease, characterized by the replacement of normal liver tissue with scar tissue (fibrosis) and regenerative nodules. This results in a loss of liver function and is irreversible. It represents the endpoint of years of heavy alcohol use.",
    symptoms: [
      "Early Compensated Cirrhosis: Often asymptomatic or non-specific (fatigue, weight loss).",
      "Jaundice.",
      "Ascites (abdominal swelling).",
      "Easy bruising and bleeding.",
      "Hepatic encephalopathy (confusion, drowsiness).",
      "Pruritus (itching).",
    ],
    causes: [
      "Chronic, excessive alcohol consumption causes oxidative stress, inflammation, and direct toxicity to liver cells (hepatocytes), leading to repeated cycles of injury, cell death, and scarring.",
    ],
    treatment: [
      "Absolute and Lifelong Abstinence from Alcohol: This is critical to halt progression and improve survival.",
      "Diuretics and sodium restriction for ascites.",
      "Lactulose and rifaximin for hepatic encephalopathy.",
      "Beta-blockers and band ligation for varices.",
      "Liver Transplant: The only cure, requires a period of documented abstinence (often 6 months).",
    ],
    selfCare: [
      "Complete abstinence from alcohol.",
      "Follow a low-sodium diet.",
      "Take all medications as prescribed.",
      "Avoid NSAIDs and sedatives.",
      "Lifestyle Recommendations",
      "Seek treatment for alcohol use disorder.",
      "Get vaccinated against Hepatitis A and B.",
    ],
    prevention: [
      "The only sure prevention is to drink alcohol in moderation or not at all. For those who drink heavily, stopping can prevent progression to cirrhosis if caught early.",
    ],
    riskFactors: [
      "Primary: Long-term, heavy alcohol consumption (typically >10 years). The amount varies by individual.",
      "Secondary: Female sex, obesity, concurrent hepatitis C infection.",
    ],
    warningSigns: [
      "Signs of decompensation are medical emergencies: jaundice, ascites, gastrointestinal bleeding from varices, or hepatic encephalopathy (confusion).",
    ],
  },
  {
    id: "acute-appendicitis",
    name: "Acute Appendicitis",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "The most common abdominal surgical emergency.",
    description:
      "Acute Appendicitis is the acute inflammation of the appendix, a small, finger-shaped pouch attached to the large intestine. It is one of the most common causes of acute abdominal pain requiring surgery. If left untreated, the appendix can rupture, leading to a life-threatening infection (peritonitis).",
    desc: "Acute Appendicitis is the acute inflammation of the appendix, a small, finger-shaped pouch attached to the large intestine. It is one of the most common causes of acute abdominal pain requiring surgery. If left untreated, the appendix can rupture, leading to a life-threatening infection (peritonitis).",
    symptoms: [
      "Abdominal pain that starts periumbilical and localizes to the right lower quadrant (McBurney's point).",
      "Anorexia (loss of appetite).",
      "Nausea and vomiting.",
      "Low-grade fever.",
      "Pain with movement or coughing.",
    ],
    causes: [
      "Usually caused by a blockage (obstruction) in the appendix, often by a fecalith (hardened stool), lymphoid hyperplasia, or, rarely, a tumor. The blockage leads to bacterial overgrowth, inflammation, and distension.",
    ],
    treatment: [
      "Appendectomy: Surgical removal of the appendix. This is the standard treatment.",
      "Laparoscopic Appendectomy: Minimally invasive, preferred.",
      "Open Appendectomy: For complicated cases (e.g., rupture).",
      "Antibiotics Alone: May be considered for select cases of uncomplicated appendicitis, but there is a risk of recurrence.",
    ],
    selfCare: [
      "(Post-Op)",
      "Keep the incision site clean and dry.",
      "Avoid strenuous activity for a few weeks.",
      "Take pain medication as directed.",
      "Lifestyle Recommendations",
      "No specific lifestyle changes prevent appendicitis.",
    ],
    prevention: ["There is no known way to prevent appendicitis."],
    riskFactors: [
      "Primary: Age (most common in teens and 20s), but can occur at any age.",
      "Secondary: Family history.",
    ],
    warningSigns: [
      "This is a surgical emergency. Sudden pain that begins around the navel and shifts to the lower right abdomen, with nausea/vomiting and fever, requires immediate medical evaluation. Do not eat, drink, or take laxatives.",
    ],
  },
  {
    id: "thrombosed-hemorrhoids",
    name: "Thrombosed Hemorrhoids",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "A very common anorectal condition.",
    description:
      "Thrombosed Hemorrhoids occur when a blood clot (thrombus) forms within an external hemorrhoid. This leads to a sudden, very painful, firm, and bluish lump at the anal verge. It is a common complication of hemorrhoidal disease.",
    desc: "Thrombosed Hemorrhoids occur when a blood clot (thrombus) forms within an external hemorrhoid. This leads to a sudden, very painful, firm, and bluish lump at the anal verge. It is a common complication of hemorrhoidal disease.",
    symptoms: [
      "Acute, severe anal pain.",
      "A palpable, tender, firm lump at the anal opening.",
      "Perianal swelling.",
      "Minor bleeding may occur if the skin over the clot ulcerates.",
    ],
    causes: [
      "Increased pressure in the hemorrhoidal veins causes them to swell and pool with blood. A clot can form within this pooled blood, leading to a painful, thrombosed hemorrhoid.",
    ],
    treatment: [
      "Conservative Management: For pain that is manageable. Includes sitz baths, stool softeners, topical analgesics (e.g., lidocaine), and NSAIDs. The clot will typically resolve over 1-3 weeks.",
      "Office-Based Procedure (Thrombectomy): If seen within the first 48-72 hours, a doctor can numb the area and make a small incision to evacuate the clot, providing immediate pain relief.",
    ],
    selfCare: [
      "Take warm sitz baths several times a day for 15-20 minutes.",
      "Use over-the-counter stool softeners to avoid straining.",
      "Apply ice packs wrapped in a towel to the area for 15-minute intervals to reduce swelling.",
      "Lifestyle Recommendations",
      "Prevent constipation with a high-fiber diet and adequate water intake.",
    ],
    prevention: [
      "Prevent constipation and straining through diet and lifestyle.",
    ],
    riskFactors: [
      "Primary: Straining during bowel movements, chronic constipation or diarrhea, pregnancy, heavy lifting.",
    ],
    warningSigns: [
      "Severe, unbearable pain or significant rectal bleeding warrants a doctor's visit to confirm the diagnosis and rule out other conditions like an anal fissure or abscess.",
    ],
  },
  {
    id: "acute-diverticulitis",
    name: "Acute Diverticulitis",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence:
      "Very common, especially in Western populations and with increasing age.",
    description:
      "Acute Diverticulitis is the inflammation or infection of diverticula, which are small, bulging pouches that can form in the lining of the digestive system (diverticulosis). When these pouches become blocked with stool and bacteria, they can become inflamed, leading to infection and micro-perforations.",
    desc: "Acute Diverticulitis is the inflammation or infection of diverticula, which are small, bulging pouches that can form in the lining of the digestive system (diverticulosis). When these pouches become blocked with stool and bacteria, they can become inflamed, leading to infection and micro-perforations.",
    symptoms: [
      "Constant, severe pain, typically in the left lower quadrant (though it can be on the right).",
      "Fever and chills.",
      "Nausea and sometimes vomiting.",
      "Abdominal tenderness.",
      "Change in bowel habits (constipation or diarrhea).",
    ],
    causes: [
      "It is believed that increased pressure within the colon (from straining due to constipation) causes weak spots to bulge out, forming diverticula. Fecal matter trapped in a diverticulum leads to bacterial overgrowth and inflammation.",
    ],
    treatment: [
      "Bowel Rest: Clear liquid diet.",
      "Oral Antibiotics (select cases, practice is evolving).",
      "Pain Management.",
      "Hospitalization for IV antibiotics and bowel rest.",
      "Percutaneous Drainage of an abscess.",
      "Surgery (colectomy) for free perforation or failure of medical management.",
    ],
    selfCare: [
      "(During/After Attack)",
      "Follow your doctor's dietary instructions (start with liquids, slowly advance to high-fiber).",
      "After recovery, adopt a permanent high-fiber diet.",
      "Stay well-hydrated.",
      "Lifestyle Recommendations",
      "Regular exercise is associated with a lower risk.",
    ],
    prevention: [
      "A lifelong high-fiber diet is the most effective way to prevent diverticulosis and subsequent diverticulitis.",
    ],
    riskFactors: [
      "Primary: Age (>40), a diet low in fiber and high in red meat.",
      "Secondary: Obesity, smoking, lack of exercise, certain medications (NSAIDs, steroids).",
    ],
    warningSigns: [
      "Severe, constant abdominal pain (usually in the left lower quadrant), fever, and signs of peritonitis (rigid abdomen) require emergency care, as they may indicate a perforation or abscess.",
    ],
  },
  {
    id: "chronic-idiopathic-constipation",
    name: "Chronic Idiopathic Constipation",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "Extremely common, affecting up to 15% of the population.",
    description:
      'Chronic Idiopathic Constipation (CIC) is a functional bowel disorder characterized by persistently difficult, infrequent, or seemingly incomplete defecation for at least 3 months, without a known organic cause ("idiopathic"). It is a diagnosis of exclusion.',
    desc: 'Chronic Idiopathic Constipation (CIC) is a functional bowel disorder characterized by persistently difficult, infrequent, or seemingly incomplete defecation for at least 3 months, without a known organic cause ("idiopathic"). It is a diagnosis of exclusion.',
    symptoms: [
      "Straining during bowel movements.",
      "Lumpy or hard stools.",
      "Sensation of incomplete evacuation.",
      "Sensation of anorectal obstruction/blockage.",
      "Fewer than 3 spontaneous bowel movements per week.",
    ],
    causes: [
      "Slow Transit Constipation: The colon moves stool too slowly.",
      "Dyssynergic Defecation: Impaired coordination of pelvic floor muscles during defecation.",
      "Functional: No clear physiologic cause identified.",
    ],
    treatment: [
      "Step 1: Lifestyle Modifications: Increase fiber and fluid intake, exercise.",
      "Bulk-Forming (Psyllium).",
      "Osmotic (Polyethylene glycol [Miralax], Lactulose).",
      "Stimulant (Senna, Bisacodyl) for short-term use.",
      "Secretagogues (e.g., Linaclotide, Plecanatide, Lubiprostone) which increase fluid secretion in the gut.",
    ],
    selfCare: [
      "Aim for 25-35 grams of fiber per day from food or supplements.",
      "Drink plenty of water throughout the day.",
      "Establish a regular toilet routine (e.g., after breakfast).",
      "Don't ignore the urge to have a bowel movement.",
      "Lifestyle Recommendations",
      "Increase daily physical activity.",
    ],
    prevention: [
      "The same as treatment: a high-fiber diet, adequate fluids, and regular exercise.",
    ],
    riskFactors: [
      "Primary: Female sex, older age.",
      "Secondary: Low-fiber diet, inadequate fluid intake, physical inactivity.",
    ],
    warningSigns: [
      '"Red flag" symptoms like unexplained weight loss, rectal bleeding, anemia, or a family history of colon cancer require evaluation to rule out structural causes.',
    ],
  },
  {
    id: "infectious-diarrhea",
    name: "Infectious Diarrhea",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "Extremely common; a leading cause of illness globally.",
    description:
      "Infectious Diarrhea is an inflammation of the gastrointestinal tract caused by a pathogenic microorganism (bacteria, virus, or parasite). It is characterized by a sudden onset of loose or watery stools, often accompanied by other symptoms like abdominal cramps, nausea, and fever.",
    desc: "Infectious Diarrhea is an inflammation of the gastrointestinal tract caused by a pathogenic microorganism (bacteria, virus, or parasite). It is characterized by a sudden onset of loose or watery stools, often accompanied by other symptoms like abdominal cramps, nausea, and fever.",
    symptoms: [
      "Watery or loose stools (3 or more times in 24 hours).",
      "Abdominal cramps and pain.",
      "Nausea and vomiting.",
      "Fever.",
      "Malaise.",
    ],
    causes: [
      "Bacterial: Campylobacter, Salmonella, Shigella, E. coli.",
      "Viral: Norovirus (most common), Rotavirus.",
      "Parasitic: Giardia, Cryptosporidium.",
    ],
    treatment: [
      "Oral Rehydration Therapy: The most important treatment. Use oral rehydration solutions (ORS) to replace fluids and electrolytes.",
      "Diet: Continue to eat simple foods (BRAT diet - Bananas, Rice, Applesauce, Toast - is no longer highly recommended; instead, simple carbohydrates are fine).",
      "Antibiotics: Only for specific bacterial causes (not for simple cases, as they can prolong some infections).",
      "Antimotility Agents (e.g., Loperamide): Use with caution; avoid in bloody diarrhea or high fever.",
    ],
    selfCare: [
      "Drink small, frequent amounts of clear fluids (water, broth, ORS).",
      "Practice meticulous hand hygiene to prevent spread.",
      "Avoid preparing food for others while you are sick.",
      "Lifestyle Recommendations",
      'When traveling, be cautious with food and water ("boil it, cook it, peel it, or forget it").',
    ],
    prevention: [
      "Proper handwashing with soap and water is the single most effective measure.",
      "Safe food handling and preparation.",
      "Vaccination for Rotavirus in infants.",
    ],
    riskFactors: [
      'Primary: Consumption of contaminated food or water, poor hand hygiene, travel to endemic areas ("Traveler\'s Diarrhea").',
      "Secondary: Weakened immune system, use of acid-suppressing medications.",
    ],
    warningSigns: [
      "Signs of severe dehydration (little/no urination, dizziness, sunken eyes), high fever, bloody stools, or diarrhea lasting more than 3 days require medical attention.",
    ],
  },
  {
    id: "viral-gastroenteritis",
    name: "Viral Gastroenteritis",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence:
      "Extremely common; Norovirus is the leading cause of gastroenteritis outbreaks worldwide.",
    description:
      'Viral Gastroenteritis, often called the "stomach flu," is an intestinal infection marked by watery diarrhea, abdominal cramps, nausea or vomiting, and sometimes fever. It is caused by a virus (most commonly Norovirus or Rotavirus) and is distinct from influenza, which is a respiratory illness.',
    desc: 'Viral Gastroenteritis, often called the "stomach flu," is an intestinal infection marked by watery diarrhea, abdominal cramps, nausea or vomiting, and sometimes fever. It is caused by a virus (most commonly Norovirus or Rotavirus) and is distinct from influenza, which is a respiratory illness.',
    symptoms: [
      "Watery diarrhea (non-bloody).",
      "Nausea and vomiting.",
      "Abdominal cramping.",
      "Low-grade fever.",
      "Headache and muscle aches.",
      "Symptoms appear 1-3 days after infection and last 1-3 days (longer for some viruses).",
    ],
    causes: [
      "Norovirus: Highly contagious, spreads rapidly in closed environments.",
      "Rotavirus: The most common cause in infants and young children before vaccination.",
      "Adenovirus & Astrovirus: Can cause gastroenteritis in children.",
    ],
    treatment: [
      "Supportive Care Only: There is no specific antiviral treatment.",
      "Oral Rehydration: The cornerstone of management.",
      "Rest.",
      "Gradually reintroduce a bland diet as tolerated.",
      "Hospitalization may be needed for severe dehydration for IV fluids.",
    ],
    selfCare: [
      "Sip small amounts of clear liquids frequently. Sucking on ice chips can help.",
      "Clean and disinfect contaminated surfaces with a bleach-based cleaner.",
      "Wash laundry thoroughly.",
      "Lifestyle Recommendations",
      "Do not return to work/school until at least 48 hours after symptoms resolve (for Norovirus).",
    ],
    prevention: [
      "Meticulous handwashing.",
      "Rotavirus vaccination for infants.",
      "Proper cleaning of vomit and diarrhea.",
    ],
    riskFactors: [
      "Primary: Close contact with an infected person, consuming contaminated food or water.",
      "Secondary: Living in close quarters (dorms, nursing homes), having a weakened immune system.",
    ],
    warningSigns: [
      "Same as for infectious diarrhea: signs of severe dehydration, inability to keep liquids down for 24 hours, bloody stools, or a fever above 104°F (40°C).",
    ],
  },
  {
    id: "refractory-celiac-disease",
    name: "Refractory Celiac Disease",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "Rare, affecting 1-2% of patients with Celiac Disease.",
    description:
      "Refractory Celiac Disease (RCD) is a rare condition where the symptoms and intestinal damage of Celiac Disease persist or return despite strict adherence to a gluten-free diet for at least 12 months, and other causes of symptoms have been ruled out. It is classified into two types, with Type 2 having a worse prognosis and a risk of evolving into lymphoma.",
    desc: "Refractory Celiac Disease (RCD) is a rare condition where the symptoms and intestinal damage of Celiac Disease persist or return despite strict adherence to a gluten-free diet for at least 12 months, and other causes of symptoms have been ruled out. It is classified into two types, with Type 2 having a worse prognosis and a risk of evolving into lymphoma.",
    symptoms: [
      "Persistent or recurrent diarrhea and steatorrhea (fatty stools).",
      "Abdominal pain and cramping.",
      "Weight loss.",
      "Nutritional deficiencies (iron, B12, folate) despite supplementation.",
    ],
    causes: [
      "The exact cause is unknown. In RCD Type 2, there is a population of abnormal intraepithelial lymphocytes (IELs) that are unresponsive to normal growth controls, which can be a precursor to lymphoma.",
    ],
    treatment: [
      "Confirm Strict Gluten Elimination: Often requires a dietitian review.",
      "Rule Out Other Conditions (e.g., microscopic colitis, pancreatic insufficiency).",
      "Medications: Immunosuppressants (e.g., corticosteroids like budesonide, azathioprine) are used to control the abnormal immune response.",
      "Nutritional Support: Total parenteral nutrition (TPN) may be needed in severe cases.",
    ],
    selfCare: [
      "Work with an expert dietitian to ensure a truly gluten-free diet.",
      "Be vigilant about cross-contamination.",
      "Keep a detailed food and symptom journal.",
      "Lifestyle Recommendations",
      "Care should be managed at a specialized celiac disease center.",
    ],
    prevention: [
      "There is no known prevention for RCD. Early diagnosis and strict adherence to a gluten-free diet for classic Celiac Disease may reduce the risk.",
    ],
    riskFactors: [
      "Primary: Being diagnosed with Celiac Disease later in life.",
      "Secondary: Inadvertent gluten exposure is the most common cause of non-response; RCD is a diagnosis of exclusion.",
    ],
    warningSigns: [
      "Severe, unexplained weight loss, severe diarrhea leading to dehydration, or new, severe abdominal pain should be evaluated immediately.",
    ],
  },
  {
    id: "rectal-cancer",
    name: "Rectal Cancer",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "A leading cause of cancer death worldwide.",
    description:
      'Rectal Cancer is a disease in which cancer cells form in the tissues of the rectum (the last several inches of the large intestine, just before the anus). It is often grouped with colon cancer and termed "colorectal cancer," but its treatment can be different due to its location in the pelvis.',
    desc: 'Rectal Cancer is a disease in which cancer cells form in the tissues of the rectum (the last several inches of the large intestine, just before the anus). It is often grouped with colon cancer and termed "colorectal cancer," but its treatment can be different due to its location in the pelvis.',
    symptoms: [
      "Rectal bleeding (bright red blood).",
      "A change in bowel habits (diarrhea, constipation).",
      "Tenesmus (feeling that you need to pass a bowel movement even though your bowels are empty).",
      "Abdominal pain or discomfort.",
      "Unexplained weight loss.",
      "Fatigue from anemia.",
    ],
    causes: [
      "Most begin as adenomatous polyps. A series of genetic mutations leads to uncontrolled growth of the cells lining the rectum, transforming a benign polyp into a cancerous tumor over many years.",
    ],
    treatment: [
      "Treatment is multidisciplinary and often involves neoadjuvant (pre-operative) therapy.",
      "Chemoradiation: Radiation combined with chemotherapy is often given first to shrink the tumor before surgery.",
      "Low Anterior Resection (LAR): For higher rectal cancers, preserving the anus.",
      "Abdominoperineal Resection (APR): For very low cancers, requiring a permanent colostomy.",
      "Total Mesorectal Excision (TME) is the standard surgical technique.",
      "Adjuvant Chemotherapy after surgery.",
    ],
    selfCare: [
      "If you have a stoma, learn proper care from an enterostomal therapist.",
      'Manage side effects of treatment (e.g., "low anterior resection syndrome" - LARS).',
      "Attend all follow-up appointments for surveillance.",
      "Lifestyle Recommendations",
      "Adopt a healthy lifestyle to support recovery and overall health.",
    ],
    prevention: [
      "Regular screening (colonoscopy) is the most effective way to prevent rectal cancer by finding and removing precancerous polyps.",
    ],
    riskFactors: [
      "Primary: Age (>50), personal/family history of colorectal cancer or polyps, inflammatory bowel disease.",
      "Secondary: Diet high in red/processed meats, smoking, obesity, heavy alcohol use.",
    ],
    warningSigns: [
      'Rectal bleeding, a persistent change in bowel habits (especially caliber of stool - "pencil-thin"), tenesmus, or unexplained weight loss warrant prompt evaluation, including a colonoscopy.',
    ],
  },
  {
    id: "non-alcoholic-steatohepatitis-nash",
    name: "Non-alcoholic Steatohepatitis (NASH)",
    category: "Gastrointestinal",
    severity: "High",
    prevalence:
      "A rapidly rising cause of chronic liver disease, strongly linked to the obesity epidemic.",
    description:
      "Non-alcoholic Steatohepatitis (NASH) is the more severe form of Non-alcoholic Fatty Liver Disease (NAFLD). It is defined by the presence of fat in the liver plus inflammation and liver cell damage (ballooning), with or without scarring (fibrosis). NASH can progress to cirrhosis, liver failure, and liver cancer.",
    desc: "Non-alcoholic Steatohepatitis (NASH) is the more severe form of Non-alcoholic Fatty Liver Disease (NAFLD). It is defined by the presence of fat in the liver plus inflammation and liver cell damage (ballooning), with or without scarring (fibrosis). NASH can progress to cirrhosis, liver failure, and liver cancer.",
    symptoms: [
      "Typically asymptomatic in early stages.",
      "Some people may experience fatigue or vague right upper quadrant discomfort.",
      "Symptoms of advanced disease are those of cirrhosis.",
    ],
    causes: [
      'The "two-hit" hypothesis: 1) Insulin resistance leads to fat accumulation in the liver (steatosis). 2) A second "hit" from oxidative stress and inflammation causes steatohepatitis (NASH) and fibrosis.',
    ],
    treatment: [
      "There are no FDA-approved medications specifically for NASH.",
      "Weight Loss: A 7-10% total body weight loss can reverse NASH and early fibrosis.",
      "Exercise: Regular physical activity improves insulin sensitivity.",
      "Manage Comorbidities: Tight control of diabetes and cholesterol.",
      "Vitamin E (an antioxidant) may be recommended for non-diabetic patients with biopsy-proven NASH.",
    ],
    selfCare: [
      "Focus on sustainable weight loss through diet and exercise.",
      "Avoid alcohol, as it can compound liver damage.",
      "Take only necessary medications and avoid liver toxins.",
      "Lifestyle Recommendations",
      "Adopt a Mediterranean-style diet (rich in fruits, vegetables, whole grains, healthy fats).",
    ],
    prevention: [
      "Maintain a healthy weight.",
      "Exercise regularly.",
      "Eat a balanced, healthy diet.",
      "Control diabetes and metabolic syndrome.",
    ],
    riskFactors: [
      "Primary: Obesity, Type 2 Diabetes, Metabolic Syndrome (high blood pressure, high cholesterol, insulin resistance).",
      "Secondary: Rapid weight loss, certain medications.",
    ],
    warningSigns: [
      "NASH is often silent until advanced cirrhosis develops. Symptoms of cirrhosis (jaundice, ascites, confusion) are a late and serious sign.",
    ],
  },
  {
    id: "lactose-intolerance-245",
    name: "Lactose Intolerance",
    category: "Gastrointestinal",
    severity: "Low",
    prevalence:
      "Very common; affects about 65% of the global population to some degree.",
    description:
      "Lactose Intolerance is the inability to fully digest lactose, the sugar found in milk and dairy products. This occurs due to a deficiency of lactase, the enzyme produced in the small intestine that breaks down lactose. Undigested lactose causes osmotic diarrhea and is fermented by gut bacteria, producing gas.",
    desc: "Lactose Intolerance is the inability to fully digest lactose, the sugar found in milk and dairy products. This occurs due to a deficiency of lactase, the enzyme produced in the small intestine that breaks down lactose. Undigested lactose causes osmotic diarrhea and is fermented by gut bacteria, producing gas.",
    symptoms: [
      "Symptoms begin 30 minutes to 2 hours after eating/drinking dairy.",
      "Diarrhea.",
      "Nausea, sometimes vomiting.",
      "Abdominal cramps.",
      "Bloating.",
      "Gas.",
    ],
    causes: [
      "Primary Lactase Deficiency: The most common type, where lactase production declines after childhood.",
      "Secondary Lactase Deficiency: Caused by an injury to the small intestine (e.g., from gastroenteritis, celiac disease, Crohn's disease).",
    ],
    treatment: [
      "Dietary Management: The primary treatment.",
      "Limit or avoid foods containing lactose.",
      "Lactase Enzyme Supplements: Tablets or drops taken before consuming dairy can help digest lactose.",
      "Choose Lactose-Free Dairy Products.",
    ],
    selfCare: [
      "Read food labels carefully (lactose is hidden in many processed foods like bread, cereal, salad dressing).",
      "Experiment with tolerance levels. Some people can handle small amounts of dairy, especially yogurt and hard cheeses which are lower in lactose.",
      "Ensure adequate calcium and vitamin D intake from non-dairy sources (leafy greens, fortified foods, supplements).",
      "Lifestyle Recommendations",
      "No other specific lifestyle changes.",
    ],
    prevention: [
      "There is no way to prevent primary lactase deficiency. Managing the underlying condition can resolve secondary lactose intolerance.",
    ],
    riskFactors: [
      "Primary: Ethnicity (more common in people of African, Asian, Hispanic, and Native American descent), age (lactase production often declines after childhood).",
    ],
    warningSigns: [
      "Not a dangerous condition, but symptoms can be uncomfortable. Severe dehydration from diarrhea is rare but possible.",
    ],
  },
  {
    id: "sliding-hiatal-hernia",
    name: "Sliding Hiatal Hernia",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "Very common, especially in people over 50.",
    description:
      "A Sliding Hiatal Hernia (Type I) is a condition where the junction of the esophagus and stomach (the gastroesophageal junction) and a portion of the stomach itself slide up through the diaphragmatic hiatus into the chest. It is the most common type of hiatal hernia.",
    desc: "A Sliding Hiatal Hernia (Type I) is a condition where the junction of the esophagus and stomach (the gastroesophageal junction) and a portion of the stomach itself slide up through the diaphragmatic hiatus into the chest. It is the most common type of hiatal hernia.",
    symptoms: [
      "Many people are asymptomatic.",
      "Heartburn.",
      "Regurgitation of acid or food.",
      "Chest pain.",
      "Difficulty swallowing.",
    ],
    causes: [
      "Weakening of the phrenoesophageal membrane and widening of the diaphragmatic hiatus, allowing the stomach to herniate upward. Increased intra-abdominal pressure can contribute.",
    ],
    treatment: [
      "Treatment is directed at the GERD symptoms, not the hernia itself.",
      "Lifestyle Modifications: Weight loss, avoiding large meals, not lying down after eating.",
      "Medications: Proton Pump Inhibitors (PPIs), H2 Blockers.",
      "Surgery (Fundoplication): Considered only for patients with severe, refractory GERD symptoms. The hernia is repaired during the procedure.",
    ],
    selfCare: [
      "Follow GERD lifestyle recommendations.",
      "Eat smaller, more frequent meals.",
      "Avoid bending over or lying down after meals.",
      "Lifestyle Recommendations",
      "Lose weight if overweight.",
      "Avoid tight-fitting clothing around the abdomen.",
    ],
    prevention: [
      "Maintain a healthy weight and avoid heavy, chronic straining to reduce abdominal pressure.",
    ],
    riskFactors: [
      "Primary: Age-related weakening of the diaphragm, obesity, pregnancy.",
      "Secondary: Increased abdominal pressure from heavy lifting, straining, or chronic coughing.",
    ],
    warningSigns: [
      "A hiatal hernia itself is not an emergency. However, if it becomes incarcerated or strangulated (blood supply cut off), it causes severe chest pain, difficulty swallowing, and vomiting, which is a surgical emergency.",
    ],
  },
  {
    id: "chronic-anal-fissure",
    name: "Chronic Anal Fissure",
    category: "Gastrointestinal",
    severity: "Low",
    prevalence: "A common anorectal condition.",
    description:
      "A Chronic Anal Fissure is a tear or ulcer in the lining of the anal canal that fails to heal within 6-8 weeks. It is located just inside the anal opening and is often associated with a sentinel skin tag externally and a hypertrophied anal papilla internally. It causes a cycle of pain and spasm that prevents healing.",
    desc: "A Chronic Anal Fissure is a tear or ulcer in the lining of the anal canal that fails to heal within 6-8 weeks. It is located just inside the anal opening and is often associated with a sentinel skin tag externally and a hypertrophied anal papilla internally. It causes a cycle of pain and spasm that prevents healing.",
    symptoms: [
      "Sharp, tearing, or burning pain during and especially after a bowel movement that can last for hours.",
      "Bright red blood on the toilet paper or on the surface of the stool.",
      "Visible tear or skin tag at the anal opening.",
    ],
    causes: [
      "Initial injury from hard stool, followed by persistent spasm of the internal anal sphincter. This spasm reduces blood flow to the area, impairing healing and creating a chronic fissure.",
    ],
    treatment: [
      "Stool Softeners / Fiber Supplements to ensure soft, bulky stools.",
      "Topical Nitroglycerin or Nifedipine/Diltiazem Ointment: To relax the internal sphincter and increase blood flow.",
      "Warm Sitz Baths for pain relief and relaxation.",
      "Botulinum Toxin (Botox) Injection: To chemically relax the sphincter.",
      "Third-Line (Surgery): Lateral Internal Sphincterotomy (cutting a small portion of the internal sphincter). Highly effective but carries a small risk of incontinence.",
    ],
    selfCare: [
      "The goal is to have soft, painless bowel movements. Take fiber supplements daily and drink plenty of water.",
      "Use topical medications as prescribed.",
      "Take sitz baths 2-3 times a day and after each bowel movement.",
      "Lifestyle Recommendations",
      "Prevent constipation as a long-term strategy.",
    ],
    prevention: [
      "A lifelong high-fiber diet and adequate fluid intake to prevent hard stools.",
    ],
    riskFactors: [
      "Primary: Passage of hard, large stools (constipation), trauma from diarrhea.",
      "Secondary: Hypertonia (increased resting pressure) of the internal anal sphincter.",
    ],
    warningSigns: [
      "Severe pain or bleeding should be evaluated to rule out other conditions like an abscess, fistula, or cancer.",
    ],
  },
  {
    id: "obstructive-jaundice",
    name: "Obstructive Jaundice",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence:
      "A common clinical sign of hepatobiliary or pancreatic disease.",
    description:
      "Obstructive Jaundice (also known as surgical jaundice or cholestatic jaundice) is a condition where the flow of bile from the liver to the duodenum is blocked. This causes a buildup of bilirubin in the blood, leading to yellowing of the skin and eyes (jaundice), as well as pale stools and dark urine.",
    desc: "Obstructive Jaundice (also known as surgical jaundice or cholestatic jaundice) is a condition where the flow of bile from the liver to the duodenum is blocked. This causes a buildup of bilirubin in the blood, leading to yellowing of the skin and eyes (jaundice), as well as pale stools and dark urine.",
    symptoms: [
      "Jaundice (yellow skin and sclera).",
      "Dark urine (like tea or cola).",
      "Pale, clay-colored stools.",
      "Pruritus (generalized itching) from bile salt deposition in the skin.",
      "Abdominal pain (location depends on cause).",
      "Weight loss (if caused by a malignancy).",
    ],
    causes: [
      "Intraluminal: Gallstones lodged in the common bile duct.",
      "Mural (Wall): Bile duct strictures or tumors (cholangiocarcinoma).",
      "Extraluminal: External compression, most commonly from pancreatic head cancer.",
    ],
    treatment: [
      "Treatment is directed at relieving the obstruction.",
      "ERCP (Endoscopic Retrograde Cholangiopancreatography): The primary procedure. A scope is used to access the bile duct, remove stones, or place a stent to bypass a blockage.",
      "PTC (Percutaneous Transhepatic Cholangiography): A drain is placed through the skin and liver into the bile duct.",
      "Surgery: (e.g., Whipple procedure for pancreatic cancer, or bile duct exploration).",
    ],
    selfCare: [
      "Management depends on the underlying cause.",
      "For itching, use antihistamines or cholestyramine as prescribed.",
      "Take fat-soluble vitamin supplements (A, D, E, K) if the obstruction is chronic.",
      "Lifestyle Recommendations",
      "No specific lifestyle changes for the jaundice itself.",
    ],
    prevention: [
      "Prevention depends on the cause (e.g., cholecystectomy for symptomatic gallstones to prevent stones from migrating to the common bile duct).",
    ],
    riskFactors: [
      "Primary: Gallstones (choledocholithiasis), tumors of the pancreas, bile duct, or ampulla.",
      "Secondary: Benign strictures, chronic pancreatitis.",
    ],
    warningSigns: [
      "Jaundice accompanied by fever with chills (Charcot's triad: RUQ pain, fever, jaundice) suggests acute cholangitis, a life-threatening infection requiring emergency drainage.",
    ],
  },
  {
    id: "portal-hypertension-induced-ascites",
    name: "Portal Hypertension-Induced Ascites",
    category: "Gastrointestinal",
    severity: "High",
    prevalence: "The most common complication of cirrhosis.",
    description:
      "Ascites is the accumulation of fluid in the peritoneal cavity (abdomen). When it is caused by portal hypertension (increased pressure in the portal vein system, usually from cirrhosis), it is a sign of decompensated liver disease. The high pressure forces fluid to leak from the surface of the liver and intestine into the abdomen.",
    desc: "Ascites is the accumulation of fluid in the peritoneal cavity (abdomen). When it is caused by portal hypertension (increased pressure in the portal vein system, usually from cirrhosis), it is a sign of decompensated liver disease. The high pressure forces fluid to leak from the surface of the liver and intestine into the abdomen.",
    symptoms: [
      "Increased abdominal girth and weight gain.",
      "Abdominal discomfort and bloating.",
      "Shortness of breath (from the diaphragm being pushed up).",
      "Early satiety (feeling full quickly).",
      "Swelling in the legs.",
    ],
    causes: [
      "Portal hypertension and systemic vasodilation lead to activation of the renin-angiotensin-aldosterone system, causing sodium and water retention by the kidneys. The fluid accumulates in the abdomen due to the high portal pressure.",
    ],
    treatment: [
      "Sodium Restriction: A low-sodium (low-salt) diet is the foundation of management (<2 grams per day).",
      "Diuretics: Spironolactone (an aldosterone antagonist) first, often with Furosemide.",
      "Large-Volume Paracentesis: Therapeutic removal of fluid via a needle in the abdomen for symptomatic relief.",
      "TIPS (Transjugular Intrahepatic Portosystemic Shunt): A procedure to create a shunt that bypasses the liver, reducing portal pressure. For refractory ascites.",
      "Liver Transplant: The definitive treatment.",
    ],
    selfCare: [
      "Weigh yourself daily to monitor fluid status.",
      "Measure your abdominal girth.",
      "Follow a strict low-sodium diet (no added salt, avoid processed foods).",
      "Limit fluid intake if advised by your doctor.",
      "Lifestyle Recommendations",
      "Complete abstinence from alcohol.",
    ],
    prevention: [
      "Prevent the progression of liver disease to cirrhosis is the only way to prevent portal hypertension and its complications.",
    ],
    riskFactors: [
      "Primary: Any cause of cirrhosis (alcoholic, viral hepatitis, NASH).",
    ],
    warningSigns: [
      "Spontaneous Bacterial Peritonitis (SBP) is a deadly infection of ascitic fluid. New or worsening abdominal pain, fever, or confusion in someone with ascites is a medical emergency.",
    ],
  },
  {
    id: "reflux-esophagitis",
    name: "Reflux Esophagitis",
    category: "Gastrointestinal",
    severity: "Medium",
    prevalence: "A common finding in patients with chronic GERD.",
    description:
      "Reflux Esophagitis is the inflammation and damage to the lining of the esophagus (esophagitis) caused by the backflow (reflux) of stomach acid and other contents. It is a complication of Gastroesophageal Reflux Disease (GERD). On endoscopy, it appears as erosions or ulcers in the distal esophagus.",
    desc: "Reflux Esophagitis is the inflammation and damage to the lining of the esophagus (esophagitis) caused by the backflow (reflux) of stomach acid and other contents. It is a complication of Gastroesophageal Reflux Disease (GERD). On endoscopy, it appears as erosions or ulcers in the distal esophagus.",
    symptoms: [
      "Heartburn (a burning sensation in the chest).",
      "Regurgitation of acid or bitter-tasting fluid.",
      "Chest pain (can mimic cardiac pain).",
      "Difficulty swallowing (dysphagia) if inflammation is severe or a stricture has formed.",
      "Nausea.",
    ],
    causes: [
      "Incompetence of the lower esophageal sphincter (LES) and impaired esophageal clearance allow potent gastric contents (acid, pepsin) to remain in contact with the esophageal mucosa for prolonged periods, causing chemical injury.",
    ],
    treatment: [
      "Lifestyle Modifications: Weight loss, elevating head of bed, avoiding late meals.",
      "Proton Pump Inhibitors (PPIs): First-line treatment (e.g., omeprazole, pantoprazole). They promote healing of erosions.",
      "H2-Receptor Blockers (e.g., famotidine) for milder cases.",
      "Surgery (Fundoplication): For severe, refractory cases.",
    ],
    selfCare: [
      "Take PPIs 30-60 minutes before the first meal of the day for maximum effect.",
      "Identify and avoid personal food triggers (common: coffee, chocolate, alcohol, mint, fatty foods).",
      "Do not lie down for at least 3 hours after eating.",
      "Lifestyle Recommendations",
      "Lose weight if overweight.",
      "Stop smoking.",
    ],
    prevention: [
      "Effective management of GERD with lifestyle changes and medication can prevent the development or recurrence of reflux esophagitis.",
    ],
    riskFactors: [
      "Primary: Hiatal hernia, conditions that delay gastric emptying, obesity.",
      "Secondary: Smoking, pregnancy, certain foods (fatty, spicy), large meals.",
    ],
    warningSigns: [
      "Difficulty or painful swallowing (odynophagia), feeling of food getting stuck, unexplained weight loss, or gastrointestinal bleeding are alarm features requiring prompt evaluation.",
    ],
  },
]
