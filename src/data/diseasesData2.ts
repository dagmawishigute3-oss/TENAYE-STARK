// Part database file for Tenaye Disease Library (65 entries)
export interface DiseaseItem {
  id: string;
  name: string;
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  prevalence: string;
  description: string;
  desc: string;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  selfCare: string[];
  prevention: string[];
  riskFactors: string[];
  warningSigns: string[];
}

export const DISEASES_DATA_2: DiseaseItem[] = [
  {
    "id": "respiratory-diphtheria",
    "name": "Respiratory Diphtheria",
    "category": "Infectious",
    "severity": "High",
    "prevalence": "Rare in countries with routine vaccination. • Still occurs in parts of the world where vaccination rates are low.",
    "description": "Respiratory Diphtheria is a serious bacterial infection caused by Corynebacterium diphtheriae that affects the mucous membranes of the throat and nose. The bacterium produces a toxin that can cause a thick, gray membrane to form in the throat, leading to breathing difficulties, heart failure, paralysis, and even death.",
    "desc": "Respiratory Diphtheria is a serious bacterial infection caused by Corynebacterium diphtheriae that affects the mucous membranes of the throat and nose. The bacterium produces a toxin that can cause a thick, gray membrane to form in the throat, leading to breathing difficulties, heart failure, paralysis, and even death.",
    "symptoms": [
      "Sore throat and hoarseness.",
      "Swollen glands (enlarged lymph nodes) in the neck.",
      "Fever and chills.",
      "Malaise.",
      "The characteristic thick, gray membrane that can bleed if peeled."
    ],
    "causes": [
      "The bacterium is spread through respiratory droplets from coughing or sneezing, or by contact with objects contaminated with the bacteria."
    ],
    "treatment": [
      "Prompt treatment is critical.",
      "Diphtheria antitoxin: Given to neutralize the toxin circulating in the body.",
      "Antibiotics (e.g., penicillin or erythromycin): To kill the bacteria and stop toxin production.",
      "Isolation to prevent spread.",
      "Supportive care to manage complications like breathing difficulties."
    ],
    "selfCare": [
      "Complete the full course of antibiotics.",
      "Stay in isolation until your doctor confirms you are no longer contagious.",
      "Lifestyle Recommendations",
      "Get vaccinated with the DTaP/Tdap vaccine."
    ],
    "prevention": [
      "Vaccination is the most effective preventive measure."
    ],
    "riskFactors": [
      "Primary: Not being vaccinated against diphtheria.",
      "Secondary: Travel to an endemic area, crowded or unsanitary living conditions."
    ],
    "warningSigns": [
      "A thick, gray membrane covering the throat and tonsils.",
      "Difficulty breathing or a barking cough.",
      "Drooling (indicating an inability to swallow).",
      "Signs of myocarditis (heart involvement): irregular heartbeat, weakness."
    ]
  },
  {
    "id": "pertussis",
    "name": "Pertussis",
    "category": "Infectious",
    "severity": "Medium",
    "prevalence": "Variable prevalence depending on demographics and global region.",
    "description": "(Note: This is a duplicate of #50. The information is identical. Please refer to the guide for Disease #50: Pertussis.)",
    "desc": "(Note: This is a duplicate of #50. The information is identical. Please refer to the guide for Disease #50: Pertussis.)",
    "symptoms": [
      "Fatigue",
      "Discomfort",
      "Clinical symptoms vary by stage"
    ],
    "causes": [
      "Multifactorial genetic and environmental influences"
    ],
    "treatment": [
      "Consult physician for clinical management protocol"
    ],
    "selfCare": [
      "Maintain healthy diet and adequate hydration",
      "Follow physician prescribed medications"
    ],
    "prevention": [
      "Regular medical check-ups",
      "Healthy lifestyle and balanced nutrition"
    ],
    "riskFactors": [
      "Age",
      "Family history",
      "Environmental exposures"
    ],
    "warningSigns": [
      "Sudden worsening of symptoms",
      "Seek emergency care for severe distress"
    ]
  },
  {
    "id": "lepromatous-leprosy",
    "name": "Lepromatous Leprosy",
    "category": "Infectious",
    "severity": "Medium",
    "prevalence": "Rare, with most cases found in tropical and subtropical countries. • Leprosy is curable and treatment in the early stages can prevent disability.",
    "description": "Lepromatous Leprosy is a severe form of Hansen's disease (leprosy) caused by the bacterium Mycobacterium leprae. It is characterized by widespread skin lesions, nodules, plaques, and thickening of the skin. It is a more infectious form than tuberculoid leprosy because the patient has a lower immune response to the bacteria, leading to a high bacterial load.",
    "desc": "Lepromatous Leprosy is a severe form of Hansen's disease (leprosy) caused by the bacterium Mycobacterium leprae. It is characterized by widespread skin lesions, nodules, plaques, and thickening of the skin. It is a more infectious form than tuberculoid leprosy because the patient has a lower immune response to the bacteria, leading to a high bacterial load.",
    "symptoms": [
      "Symmetrical skin lesions (macules, papules, nodules) that are widespread.",
      "Thickened, shiny skin, especially on the face (leading to \"leonine facies\").",
      "Nasal congestion and nosebleeds from nasal mucosa involvement.",
      "Loss of eyebrows and eyelashes.",
      "Nerve involvement leading to numbness and muscle weakness in the hands and feet.",
      "Inability to feel pain, leading to injuries and infections."
    ],
    "causes": [
      "The cause is infection with Mycobacterium leprae. It is thought to spread through droplets from the nose and mouth of an untreated person with lepromatous leprosy during close, frequent contact."
    ],
    "treatment": [
      "Leprosy is curable with Multidrug Therapy (MDT).",
      "MDT: A combination of antibiotics (dapsone, rifampicin, and clofazimine) taken for 12 months.",
      "Treatment is provided free of charge by the World Health Organization (WHO).",
      "Early treatment prevents the development of disabilities."
    ],
    "selfCare": [
      "Take MDT exactly as prescribed for the full duration.",
      "Care for numb extremities: Check hands and feet daily for cuts and burns to prevent infection.",
      "Use protective footwear.",
      "Manage eye care to prevent dryness and injury.",
      "Lifestyle Recommendations",
      "There is no need for isolation once MDT has started, as the person quickly becomes non-infectious."
    ],
    "prevention": [
      "Early diagnosis and treatment of infected individuals is the key to prevention.",
      "Post-exposure prophylaxis for close contacts of a lepromatous patient may be recommended."
    ],
    "riskFactors": [
      "Primary: Close, prolonged contact with an untreated person with lepromatous leprosy.",
      "Secondary: Living in an endemic area, genetic factors, compromised cell-mediated immunity."
    ],
    "warningSigns": [
      "Seek medical care for any chronic, unexplained skin lesions or nerve damage, especially if you have lived in an endemic area.",
      "Severe nerve damage can lead to loss of sensation, muscle weakness, and paralysis."
    ]
  },
  {
    "id": "bacterial-meningitis",
    "name": "Bacterial Meningitis",
    "category": "Infectious",
    "severity": "High",
    "prevalence": "Can occur at any age, but is more common in infants, young children, and young adults. • Outbreaks can occur in community settings like college dormitories.",
    "description": "Bacterial Meningitis is a serious inflammation of the membranes (meninges) surrounding the brain and spinal cord, caused by a bacterial infection. It is a medical emergency that can cause brain damage, hearing loss, or death within hours.",
    "desc": "Bacterial Meningitis is a serious inflammation of the membranes (meninges) surrounding the brain and spinal cord, caused by a bacterial infection. It is a medical emergency that can cause brain damage, hearing loss, or death within hours.",
    "symptoms": [
      "In adults and children, symptoms can develop over several hours or over 1-2 days.",
      "The classic triad is fever, headache, and stiff neck.",
      "Nausea and vomiting.",
      "Altered mental status (confusion).",
      "High fever.",
      "Constant crying.",
      "Excessive sleepiness or irritability.",
      "Poor feeding."
    ],
    "causes": [
      "Common bacteria include Neisseria meningitidis, Streptococcus pneumoniae, and Haemophilus influenzae type b (Hib). They are spread through respiratory and throat secretions."
    ],
    "treatment": [
      "Immediate hospitalization.",
      "Intravenous antibiotics: Started as soon as possible, often even before test results are back.",
      "Corticosteroids: May be used to reduce the risk of complications like hearing loss and brain swelling.",
      "Supportive care for shock, brain swelling, and seizures."
    ],
    "selfCare": [
      "(For contacts of a patient)",
      "If you've been in close contact with someone with bacterial meningitis, see your doctor for prophylactic antibiotics.",
      "Know the symptoms.",
      "Lifestyle Recommendations",
      "Get vaccinated against meningococcal, pneumococcal, and Hib bacteria."
    ],
    "prevention": [
      "Vaccination is the most effective way to protect against the most common types of bacterial meningitis."
    ],
    "riskFactors": [
      "Primary: Age (infants are at highest risk), not being vaccinated.",
      "Secondary: Crowded living conditions, certain medical conditions (sickle cell disease, no spleen), head trauma."
    ],
    "warningSigns": [
      "Sudden high fever.",
      "Severe headache.",
      "Stiff neck.",
      "Nausea or vomiting.",
      "Confusion or difficulty concentrating.",
      "Seizures.",
      "Sensitivity to light.",
      "A rash that does not fade under pressure (a sign of meningococcal sepsis)."
    ]
  },
  {
    "id": "severe-sepsis",
    "name": "Severe Sepsis",
    "category": "Infectious",
    "severity": "High",
    "prevalence": "A leading cause of death in hospitals. • Affects millions globally each year.",
    "description": "Severe Sepsis is a life-threatening medical emergency that occurs when a known or suspected infection triggers a chain reaction throughout the body, leading to tissue damage, organ failure, and often death. It is defined as sepsis plus organ dysfunction.",
    "desc": "Severe Sepsis is a life-threatening medical emergency that occurs when a known or suspected infection triggers a chain reaction throughout the body, leading to tissue damage, organ failure, and often death. It is defined as sepsis plus organ dysfunction.",
    "symptoms": [
      "High heart rate.",
      "Fever, shivering, or feeling very cold.",
      "Confusion or disorientation.",
      "Shortness of breath.",
      "Extreme pain or discomfort.",
      "Clammy or sweaty skin."
    ],
    "causes": [
      "Sepsis can be triggered by any type of infection—bacterial, viral, or fungal—but bacterial infections are the most common. The infection can start anywhere."
    ],
    "treatment": [
      "Treatment must begin immediately.",
      "1. Give high-flow oxygen.",
      "2. Take blood cultures.",
      "3. Give broad-spectrum intravenous antibiotics.",
      "4. Give intravenous fluid resuscitation.",
      "5. Check lactate level (a marker of tissue perfusion).",
      "6. Measure urine output.",
      "Source Control: Draining an abscess or removing infected tissue."
    ],
    "selfCare": [
      "Prevent infections by getting vaccinated, cleaning wounds, and washing hands.",
      "If you have an infection, watch for sepsis signs.",
      "Seek medical care immediately if you suspect sepsis.",
      "Lifestyle Recommendations",
      "Manage chronic conditions effectively."
    ],
    "prevention": [
      "Prevent infections through vaccination, good hygiene, and proper wound care.",
      "Recognize sepsis early and seek immediate treatment."
    ],
    "riskFactors": [
      "Primary: Having an infection (pneumonia, abdominal, urinary, etc.).",
      "Secondary: Very young or old age, weakened immune system, chronic illnesses (diabetes, cancer, kidney disease), severe injuries or burns."
    ],
    "warningSigns": [
      "S - Shivering, fever, or very cold.",
      "E - Extreme pain or general discomfort (\"worst ever\").",
      "P - Pale or discolored skin.",
      "S - Sleepy, difficult to rouse, confused.",
      "I - \"I feel like I might die.\"",
      "S - Shortness of breath."
    ]
  },
  {
    "id": "gonorrhea",
    "name": "Gonorrhea",
    "category": "Infectious",
    "severity": "High",
    "prevalence": "Very common, with millions of new cases globally each year. • Increasing antibiotic resistance is a major public health concern.",
    "description": "Gonorrhea is a common sexually transmitted infection (STI) caused by the bacterium Neisseria gonorrhoeae. It can infect the genitals, rectum, and throat. If left untreated, it can lead to serious health problems, including infertility and an increased risk of HIV.",
    "desc": "Gonorrhea is a common sexually transmitted infection (STI) caused by the bacterium Neisseria gonorrhoeae. It can infect the genitals, rectum, and throat. If left untreated, it can lead to serious health problems, including infertility and an increased risk of HIV.",
    "symptoms": [
      "Burning sensation when urinating.",
      "White, yellow, or green discharge from the penis.",
      "Painful or swollen testicles (less common).",
      "Increased vaginal discharge.",
      "Painful urination.",
      "Vaginal bleeding between periods.",
      "Abdominal or pelvic pain."
    ],
    "causes": [
      "The bacteria are spread through unprotected sexual contact with an infected person."
    ],
    "treatment": [
      "Antibiotics: Due to high resistance, the current recommended treatment is a single shot of ceftriaxone.",
      "It is crucial that all sexual partners be tested and treated to prevent reinfection.",
      "Follow-up testing is recommended to ensure the infection is cured."
    ],
    "selfCare": [
      "Take all medication as prescribed.",
      "Abstain from sex until you and your partner(s) have completed treatment and are symptom-free.",
      "Get tested for other STIs, including HIV.",
      "Lifestyle Recommendations",
      "Use condoms consistently and correctly.",
      "Have an open dialogue with sexual partners about STI testing."
    ],
    "prevention": [
      "Consistent and correct condom use.",
      "Mutual monogamy with an uninfected partner.",
      "Regular STI screening for sexually active individuals."
    ],
    "riskFactors": [
      "Primary: Unprotected vaginal, anal, or oral sex.",
      "Secondary: Multiple sex partners, a previous diagnosis of gonorrhea, having other STIs."
    ],
    "warningSigns": [
      "Fever.",
      "Rash.",
      "Joint pain and swelling."
    ]
  },
  {
    "id": "primary-syphilis",
    "name": "Primary Syphilis",
    "category": "Infectious",
    "severity": "Medium",
    "prevalence": "Rates have been rising in many parts of the world.",
    "description": "Primary Syphilis is the first stage of the sexually transmitted infection syphilis, caused by the bacterium Treponema pallidum. It is characterized by the appearance of a single sore (called a chancre) at the site where the bacteria entered the body.",
    "desc": "Primary Syphilis is the first stage of the sexually transmitted infection syphilis, caused by the bacterium Treponema pallidum. It is characterized by the appearance of a single sore (called a chancre) at the site where the bacteria entered the body.",
    "symptoms": [
      "The primary symptom is a chancre: a firm, round, and painless sore. It appears 3 weeks after exposure (range 10-90 days) and heals on its own within 3-6 weeks, even without treatment. This does not mean the infection is gone."
    ],
    "causes": [
      "The bacteria are spread through direct contact with a syphilis sore during sexual activity."
    ],
    "treatment": [
      "A single injection of penicillin G is the standard treatment for primary syphilis.",
      "For those allergic to penicillin, other antibiotics like doxycycline may be used.",
      "Follow-up blood tests are needed to ensure the infection is cured."
    ],
    "selfCare": [
      "Notify all sexual partners so they can be tested and treated.",
      "Abstain from sexual contact until the chancre is completely healed and your doctor confirms you are no longer infectious.",
      "Lifestyle Recommendations",
      "Consistent condom use, though condoms only protect if the sore is covered."
    ],
    "prevention": [
      "Consistent and correct condom use.",
      "Regular STI screening."
    ],
    "riskFactors": [
      "Primary: Unprotected vaginal, anal, or oral sex.",
      "Secondary: Multiple sex partners, men who have sex with men (MSM), HIV infection."
    ],
    "warningSigns": [
      "The chancre is a warning sign itself. Seek testing and treatment immediately to prevent progression to secondary, latent, and tertiary syphilis, which can damage the brain, nerves, eyes, heart, and other organs."
    ]
  },
  {
    "id": "chlamydial-urethritis",
    "name": "Chlamydial Urethritis",
    "category": "Infectious",
    "severity": "Medium",
    "prevalence": "Extremely common, especially among sexually active young people. • Often asymptomatic, leading to unintentional spread and complications.",
    "description": "Chlamydial Urethritis is an infection of the urethra (the tube that carries urine out of the body) caused by the bacterium Chlamydia trachomatis. It is the most common bacterial sexually transmitted infection (STI).",
    "desc": "Chlamydial Urethritis is an infection of the urethra (the tube that carries urine out of the body) caused by the bacterium Chlamydia trachomatis. It is the most common bacterial sexually transmitted infection (STI).",
    "symptoms": [
      "Discharge from the penis.",
      "Burning sensation when urinating.",
      "Burning and itching around the opening of the penis.",
      "Symptoms are often mild or absent.",
      "May include abnormal vaginal discharge, burning when urinating, or pain during sex."
    ],
    "causes": [
      "The bacteria are spread through unprotected vaginal, anal, or oral sex."
    ],
    "treatment": [
      "Antibiotics: A single dose of azithromycin or a week of doxycycline are common treatments.",
      "Partners must be treated to prevent reinfection."
    ],
    "selfCare": [
      "Take all medication as directed.",
      "Abstain from sex for 7 days after single-dose therapy or until completion of a 7-day regimen and symptoms are gone.",
      "Get retested in 3 months to check for reinfection.",
      "Lifestyle Recommendations",
      "Use condoms.",
      "Get regular STI screenings if you are sexually active."
    ],
    "prevention": [
      "Consistent and correct condom use.",
      "Regular STI screening for sexually active individuals under 25."
    ],
    "riskFactors": [
      "Primary: Unprotected sexual intercourse.",
      "Secondary: Multiple sex partners, age under 25."
    ],
    "warningSigns": [
      "Seek care for complications, which can include pelvic inflammatory disease (PID) in women and epididymitis in men, both of which can cause infertility."
    ]
  },
  {
    "id": "sars-cov-2-infection",
    "name": "SARS-CoV-2 Infection",
    "category": "Infectious",
    "severity": "High",
    "prevalence": "Variable prevalence depending on demographics and global region.",
    "description": "(Note: This is a duplicate of #36. The information is identical. Please refer to the guide for Disease #36: COVID-19.)*",
    "desc": "(Note: This is a duplicate of #36. The information is identical. Please refer to the guide for Disease #36: COVID-19.)*",
    "symptoms": [
      "Fatigue",
      "Discomfort",
      "Clinical symptoms vary by stage"
    ],
    "causes": [
      "Multifactorial genetic and environmental influences"
    ],
    "treatment": [
      "Consult physician for clinical management protocol"
    ],
    "selfCare": [
      "Maintain healthy diet and adequate hydration",
      "Follow physician prescribed medications"
    ],
    "prevention": [
      "Regular medical check-ups",
      "Healthy lifestyle and balanced nutrition"
    ],
    "riskFactors": [
      "Age",
      "Family history",
      "Environmental exposures"
    ],
    "warningSigns": [
      "Sudden worsening of symptoms",
      "Seek emergency care for severe distress"
    ]
  },
  {
    "id": "bubonic-plague",
    "name": "Bubonic Plague",
    "category": "Infectious",
    "severity": "High",
    "prevalence": "Rare, with a few thousand cases reported globally each year, primarily in rural areas of Africa, Asia, and the Americas (including the western US).",
    "description": "The Bubonic Plague is a serious, potentially fatal bacterial infection caused by Yersinia pestis. It is primarily a disease of rodents and their fleas, but it can spread to humans. It is infamous for causing the \"Black Death\" in the Middle Ages. Modern antibiotics are effective, but it must be treated promptly.",
    "desc": "The Bubonic Plague is a serious, potentially fatal bacterial infection caused by Yersinia pestis. It is primarily a disease of rodents and their fleas, but it can spread to humans. It is infamous for causing the \"Black Death\" in the Middle Ages. Modern antibiotics are effective, but it must be treated promptly.",
    "symptoms": [
      "Sudden onset of fever and chills.",
      "Headache and muscle aches.",
      "Extreme fatigue.",
      "One or more swollen, tender, and painful lymph nodes (called buboes), usually in the groin, armpit, or neck."
    ],
    "causes": [
      "The bacteria are transmitted through the bite of an infected flea, by handling an infected animal, or by inhaling infectious droplets from a person or animal with pneumonic plague."
    ],
    "treatment": [
      "Prompt treatment with antibiotics is essential for survival. Streptomycin and gentamicin are first-line treatments. Doxycycline and ciprofloxacin are also effective.",
      "Patients with pneumonic plague must be isolated."
    ],
    "selfCare": [
      "(For prevention)",
      "Reduce rodent habitat around your home and workplace.",
      "Use insect repellent containing DEET to prevent flea bites.",
      "Avoid handling sick or dead animals.",
      "Use gloves if you must handle potentially infected animals.",
      "Lifestyle Recommendations",
      "Keep pets free of fleas. Do not let pets sleep in your bed in plague-endemic areas."
    ],
    "prevention": [
      "Public health measures to control rodent and flea populations.",
      "Antibiotics can be given to close contacts of a pneumonic plague patient to prevent illness.",
      "There is no commercially available vaccine."
    ],
    "riskFactors": [
      "Primary: Exposure to infected fleas or rodents.",
      "Secondary: Handling infected animals (e.g., hunters), close contact with a person or animal with pneumonic plague."
    ],
    "warningSigns": [
      "Sudden onset of fever, chills, and swollen, painful lymph nodes (buboes).",
      "Cough, chest pain, and bloody sputum (signs of pneumonic plague)."
    ]
  },
  {
    "id": "type-1-diabetes-mellitus",
    "name": "Type 1 Diabetes Mellitus",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Accounts for about 5-10% of all diabetes cases.",
    "description": "Type 1 Diabetes is a chronic autoimmune condition in which the pancreas produces little or no insulin. Insulin is a hormone needed to allow sugar (glucose) to enter cells to produce energy. It is typically diagnosed in children and young adults, but can appear at any age.",
    "desc": "Type 1 Diabetes is a chronic autoimmune condition in which the pancreas produces little or no insulin. Insulin is a hormone needed to allow sugar (glucose) to enter cells to produce energy. It is typically diagnosed in children and young adults, but can appear at any age.",
    "symptoms": [
      "Increased thirst and urination.",
      "Extreme hunger.",
      "Unintended weight loss.",
      "Fatigue and weakness.",
      "Blurred vision.",
      "Irritability."
    ],
    "causes": [
      "The immune system mistakenly attacks and destroys the insulin-producing beta cells in the pancreas. The exact cause is unknown, but it is believed to involve a combination of genetic susceptibility and environmental factors."
    ],
    "treatment": [
      "Lifelong insulin therapy is required.",
      "Insulin Administration: Via multiple daily injections or an insulin pump.",
      "Blood Sugar Monitoring: Checking levels frequently throughout the day.",
      "Carbohydrate Counting.",
      "Regular Exercise and a healthy diet."
    ],
    "selfCare": [
      "Take insulin and other medications as prescribed.",
      "Learn how to count carbohydrates.",
      "Monitor your blood sugar regularly.",
      "Have a sick-day plan.",
      "Wear a medical ID bracelet.",
      "Lifestyle Recommendations",
      "Eat a consistent, healthy diet.",
      "Stay physically active."
    ],
    "prevention": [
      "Currently, there is no known way to prevent Type 1 Diabetes."
    ],
    "riskFactors": [
      "Primary: Family history, genetics.",
      "Secondary: Unknown environmental triggers, geography (more common away from the equator)."
    ],
    "warningSigns": [
      "Nausea and vomiting.",
      "Abdominal pain.",
      "Fruity-scented breath.",
      "Rapid breathing.",
      "Confusion."
    ]
  },
  {
    "id": "type-2-diabetes-mellitus",
    "name": "Type 2 Diabetes Mellitus",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "The most common form of diabetes, accounting for about 90-95% of cases. • A growing global epidemic, linked to rising obesity rates.",
    "description": "Type 2 Diabetes is a chronic condition that affects the way the body processes blood sugar (glucose). It is characterized by insulin resistance, where the body's cells don't respond normally to insulin, and eventually, the pancreas can't make enough insulin to maintain normal glucose levels.",
    "desc": "Type 2 Diabetes is a chronic condition that affects the way the body processes blood sugar (glucose). It is characterized by insulin resistance, where the body's cells don't respond normally to insulin, and eventually, the pancreas can't make enough insulin to maintain normal glucose levels.",
    "symptoms": [
      "Symptoms may develop so slowly that they go unnoticed for years.",
      "Increased thirst and urination.",
      "Increased hunger.",
      "Fatigue.",
      "Blurred vision.",
      "Slow-healing sores or frequent infections.",
      "Areas of darkened skin, usually in the armpits and neck (acanthosis nigricans)."
    ],
    "causes": [
      "It develops due to a combination of genetics and lifestyle factors, primarily obesity and lack of exercise."
    ],
    "treatment": [
      "Healthy eating and regular exercise are the foundation.",
      "Medications: Metformin is usually the first-line oral medication. Other drugs and insulin may be needed as the disease progresses.",
      "Blood sugar monitoring."
    ],
    "selfCare": [
      "Lose weight if you are overweight.",
      "Be physically active for at least 150 minutes per week.",
      "Eat a healthy, balanced diet rich in fruits, vegetables, and whole grains.",
      "Monitor your blood sugar as directed.",
      "Lifestyle Recommendations",
      "Don't smoke.",
      "Manage stress.",
      "Get regular check-ups."
    ],
    "prevention": [
      "Healthy lifestyle choices can prevent or delay the onset of Type 2 Diabetes.",
      "Losing 5-7% of body weight and exercising regularly can reduce risk by over 50%."
    ],
    "riskFactors": [
      "Primary: Overweight or obesity, physical inactivity.",
      "Secondary: Family history, race/ethnicity, age over 45, history of gestational diabetes."
    ],
    "warningSigns": [
      "Extreme thirst and dry mouth.",
      "Confusion, drowsiness, or coma.",
      "Blood sugar levels over 600 mg/dL."
    ]
  },
  {
    "id": "graves-disease",
    "name": "Graves' Disease",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "The leading cause of hyperthyroidism. • More common in women and in people under 40.",
    "description": "Graves' Disease is an autoimmune disorder that causes hyperthyroidism, or an overactive thyroid. In this condition, the immune system attacks the thyroid gland, causing it to produce too much thyroid hormone. It is the most common cause of hyperthyroidism.",
    "desc": "Graves' Disease is an autoimmune disorder that causes hyperthyroidism, or an overactive thyroid. In this condition, the immune system attacks the thyroid gland, causing it to produce too much thyroid hormone. It is the most common cause of hyperthyroidism.",
    "symptoms": [
      "Anxiety and irritability.",
      "A fine tremor in the hands or fingers.",
      "Heat sensitivity and increased sweating.",
      "Weight loss, despite normal eating habits.",
      "Enlargement of the thyroid gland (goiter).",
      "Bulging eyes (Graves' ophthalmopathy).",
      "Fatigue and muscle weakness."
    ],
    "causes": [
      "The body produces an antibody called thyroid-stimulating immunoglobulin (TSI) that mimics TSH, causing the thyroid to make too much hormone."
    ],
    "treatment": [
      "Antithyroid Medications (e.g., methimazole): To reduce hormone production.",
      "Radioactive Iodine Therapy: To destroy overactive thyroid cells.",
      "Beta-Blockers: To control rapid heart rate and other symptoms.",
      "Surgery (Thyroidectomy): Removal of the thyroid gland."
    ],
    "selfCare": [
      "Apply cool compresses to your eyes for Graves' ophthalmopathy.",
      "Wear sunglasses if you have eye symptoms.",
      "Elevate the head of your bed to reduce eye swelling.",
      "Do not smoke, as it worsens ophthalmopathy.",
      "Lifestyle Recommendations",
      "Manage stress.",
      "Get regular exercise to help with symptoms like anxiety and weight gain."
    ],
    "prevention": [
      "There is no known way to prevent Graves' disease."
    ],
    "riskFactors": [
      "Primary: Family history, female sex.",
      "Secondary: Other autoimmune disorders (e.g., type 1 diabetes, rheumatoid arthritis), emotional or physical stress."
    ],
    "warningSigns": [
      "High fever.",
      "Rapid and irregular heartbeat.",
      "Agitation, confusion, delirium.",
      "Shaking, sweating.",
      "Requires immediate emergency care."
    ]
  },
  {
    "id": "hashimotos-thyroiditis",
    "name": "Hashimoto's Thyroiditis",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "The most common cause of hypothyroidism in the United States. • Much more common in women than in men.",
    "description": "Hashimoto's Thyroiditis is an autoimmune disorder in which the immune system attacks and slowly destroys the thyroid gland, leading to an underactive thyroid (hypothyroidism). It is the most common cause of hypothyroidism.",
    "desc": "Hashimoto's Thyroiditis is an autoimmune disorder in which the immune system attacks and slowly destroys the thyroid gland, leading to an underactive thyroid (hypothyroidism). It is the most common cause of hypothyroidism.",
    "symptoms": [
      "Symptoms develop slowly, over years.",
      "Fatigue and sluggishness.",
      "Increased sensitivity to cold.",
      "Constipation.",
      "Pale, dry skin.",
      "A puffy face.",
      "Unexplained weight gain.",
      "Muscle aches and stiffness."
    ],
    "causes": [
      "The immune system creates antibodies that attack the thyroid, causing inflammation and impaired ability to produce hormones."
    ],
    "treatment": [
      "Thyroid Hormone Replacement Therapy: The standard treatment. The synthetic hormone levothyroxine (Synthroid, Levoxyl, etc.) is taken daily to restore normal hormone levels.",
      "Regular blood tests are needed to monitor TSH levels and adjust the dosage."
    ],
    "selfCare": [
      "Take your medication consistently, on an empty stomach as directed.",
      "Get your TSH levels checked regularly.",
      "Be patient; it can take time to find the correct dosage.",
      "Lifestyle Recommendations",
      "Eat a balanced diet. Most people with Hashimoto's do not require a special diet, but ensuring adequate selenium and iodine (but not excessive) may be beneficial for some."
    ],
    "prevention": [
      "There is no known way to prevent Hashimoto's disease."
    ],
    "riskFactors": [
      "Primary: Being a middle-aged woman, having a family history of thyroid or other autoimmune diseases.",
      "Secondary: Other autoimmune diseases (e.g., vitiligo, rheumatoid arthritis, type 1 diabetes)."
    ],
    "warningSigns": [
      "Intense cold intolerance and hypothermia.",
      "Lethargy progressing to coma.",
      "Slow heart rate, low blood pressure.",
      "Requires immediate emergency care."
    ]
  },
  {
    "id": "cushings-syndrome",
    "name": "Cushing's Syndrome",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Relatively rare.",
    "description": "Cushing's Syndrome is a disorder that occurs when your body is exposed to high levels of the hormone cortisol for a long time. The most common cause is the use of corticosteroid medications. An endogenous form, Cushing's Disease, is caused by a pituitary tumor producing too much ACTH, which stimulates the adrenal glands.",
    "desc": "Cushing's Syndrome is a disorder that occurs when your body is exposed to high levels of the hormone cortisol for a long time. The most common cause is the use of corticosteroid medications. An endogenous form, Cushing's Disease, is caused by a pituitary tumor producing too much ACTH, which stimulates the adrenal glands.",
    "symptoms": [
      "Weight gain, especially in the abdomen and face (rounded \"moon face\").",
      "A fatty hump between the shoulders (\"buffalo hump\").",
      "Pink or purple stretch marks (striae) on the skin.",
      "Thinning, fragile skin that bruises easily.",
      "Slow healing of cuts, insect bites, and infections.",
      "Fatigue.",
      "Muscle weakness.",
      "High blood pressure."
    ],
    "causes": [
      "Exogenous (Most Common): Taking glucocorticoid medications.",
      "Endogenous: The body produces too much cortisol, often due to a pituitary adenoma (Cushing's Disease) or an adrenal tumor."
    ],
    "treatment": [
      "Treatment depends on the cause.",
      "If caused by medication: Carefully reducing the dose under a doctor's supervision.",
      "For tumors: Surgery to remove the tumor is the primary treatment. Radiation or medication may be used if surgery is not possible."
    ],
    "selfCare": [
      "Work closely with an endocrinologist.",
      "Increase dietary calcium and Vitamin D to combat bone loss.",
      "Monitor for infections due to a suppressed immune system.",
      "Manage other conditions like high blood pressure and diabetes.",
      "Lifestyle Recommendations",
      "Engage in low-impact exercise to maintain muscle and bone health."
    ],
    "prevention": [
      "Use corticosteroid medications only as prescribed and at the lowest effective dose for the shortest possible time."
    ],
    "riskFactors": [
      "Primary: Long-term, high-dose use of corticosteroid medications (e.g., for asthma, rheumatoid arthritis).",
      "Secondary: Pituitary or adrenal tumors, certain other tumors."
    ],
    "warningSigns": [
      "Seek medical evaluation for the cluster of symptoms below, as long-term high cortisol is damaging to the body."
    ]
  },
  {
    "id": "addisons-disease",
    "name": "Addison's Disease",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Rare: Affects about 1 in 100,000 people.",
    "description": "Addison's Disease, also known as primary adrenal insufficiency, is a rare disorder where the adrenal glands do not produce enough of the hormones cortisol and, often, aldosterone. These hormones are essential for life, regulating metabolism, blood pressure, and the body's response to stress.",
    "desc": "Addison's Disease, also known as primary adrenal insufficiency, is a rare disorder where the adrenal glands do not produce enough of the hormones cortisol and, often, aldosterone. These hormones are essential for life, regulating metabolism, blood pressure, and the body's response to stress.",
    "symptoms": [
      "Extreme fatigue.",
      "Weight loss and decreased appetite.",
      "Darkening of the skin (hyperpigmentation), especially in sun-exposed areas, skin folds, scars, and mucous membranes.",
      "Low blood pressure, even fainting.",
      "Salt craving.",
      "Nausea, diarrhea, or vomiting.",
      "Muscle or joint pains.",
      "Irritability."
    ],
    "causes": [
      "The adrenal cortex is damaged and cannot produce hormones. In an autoimmune response, the body's immune system attacks the adrenal glands. Other causes include infections, bleeding into the glands, and genetic factors."
    ],
    "treatment": [
      "Treatment involves hormone replacement therapy for life.",
      "Corticosteroids: Hydrocortisone or prednisone to replace cortisol. Fludrocortisone to replace aldosterone.",
      "Increased dosage during illness, injury, or surgery to prevent adrenal crisis.",
      "Carrying a medical alert card/bracelet and an emergency injection kit."
    ],
    "selfCare": [
      "Take your medication every day without fail.",
      "Always carry your emergency injection and know how to use it.",
      "Never skip doses, especially when ill or stressed.",
      "Keep extra medication with you.",
      "Lifestyle Recommendations",
      "Have regular follow-ups with an endocrinologist.",
      "Manage stress effectively."
    ],
    "prevention": [
      "There is no way to prevent Addison's disease, but an adrenal crisis can be prevented with proper medication management."
    ],
    "riskFactors": [
      "Primary: Autoimmune disease (most common cause in developed countries).",
      "Secondary: Tuberculosis (a major cause globally), other infections, cancer, surgical removal of adrenal glands."
    ],
    "warningSigns": [
      "Sudden, severe pain in the lower back, abdomen, or legs.",
      "Severe vomiting and diarrhea.",
      "Dehydration.",
      "Low blood pressure.",
      "Loss of consciousness.",
      "Low blood sugar."
    ]
  },
  {
    "id": "morbid-obesity",
    "name": "Morbid Obesity",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "A growing global health epidemic.",
    "description": "Morbid Obesity, now more precisely classified as Class 3 Obesity, is a serious health condition defined by a Body Mass Index (BMI) of 40 or higher. It significantly increases the risk of numerous health problems, reduces life expectancy, and impairs quality of life.",
    "desc": "Morbid Obesity, now more precisely classified as Class 3 Obesity, is a serious health condition defined by a Body Mass Index (BMI) of 40 or higher. It significantly increases the risk of numerous health problems, reduces life expectancy, and impairs quality of life.",
    "symptoms": [
      "Difficulty with physical activity.",
      "Shortness of breath.",
      "Excessive sweating.",
      "Joint and back pain.",
      "Low self-esteem and depression.",
      "Associated conditions: hypertension, high cholesterol, fatty liver disease."
    ],
    "causes": [
      "It is a complex condition resulting from a combination of genetic, physiological, environmental, and psychological factors. An energy imbalance between calories consumed and calories expended is the fundamental cause."
    ],
    "treatment": [
      "A comprehensive, multi-disciplinary approach is required.",
      "Lifestyle Modifications: Supervised diet, structured exercise, and behavioral therapy.",
      "Medications: Prescription weight-loss drugs (e.g., GLP-1 agonists like semaglutide).",
      "Bariatric Surgery: Procedures like gastric sleeve or gastric bypass for eligible patients with a BMI >40 or >35 with comorbidities."
    ],
    "selfCare": [
      "Set realistic, gradual weight-loss goals.",
      "Keep a food and activity diary.",
      "Seek support from a dietitian, therapist, or support group.",
      "Lifestyle Recommendations",
      "Adopt a balanced, reduced-calorie diet.",
      "Incorporate regular physical activity you enjoy.",
      "Prioritize sleep and manage stress."
    ],
    "prevention": [
      "Healthy eating and regular physical activity from a young age.",
      "Addressing weight gain early before it becomes severe."
    ],
    "riskFactors": [
      "Primary: Genetics, diet, physical inactivity.",
      "Secondary: Socioeconomic factors, certain medications, psychological factors, medical conditions (e.g., hypothyroidism)."
    ],
    "warningSigns": [
      "Type 2 Diabetes.",
      "Severe sleep apnea.",
      "Heart disease."
    ]
  },
  {
    "id": "metabolic-syndrome",
    "name": "Metabolic Syndrome",
    "category": "Metabolic",
    "severity": "High",
    "prevalence": "Very common, affecting about one-third of U.S. adults. • Prevalence increases with age.",
    "description": "Metabolic Syndrome is a cluster of conditions that occur together, significantly increasing your risk of heart disease, stroke, and type 2 diabetes. These conditions include increased blood pressure, high blood sugar, excess body fat around the waist, and abnormal cholesterol or triglyceride levels.",
    "desc": "Metabolic Syndrome is a cluster of conditions that occur together, significantly increasing your risk of heart disease, stroke, and type 2 diabetes. These conditions include increased blood pressure, high blood sugar, excess body fat around the waist, and abnormal cholesterol or triglyceride levels.",
    "symptoms": [
      "1.Large waist circumference.",
      "2.High triglyceride level.",
      "3.Low HDL (\"good\") cholesterol.",
      "4.High blood pressure.",
      "5.High fasting blood sugar."
    ],
    "causes": [
      "The underlying cause is insulin resistance, where the body's cells don't respond normally to insulin. Being overweight/obese and inactive contributes strongly to insulin resistance."
    ],
    "treatment": [
      "The goal is to reduce the risk of heart disease and diabetes.",
      "Lifestyle Changes are first-line: Weight loss, heart-healthy diet (DASH or Mediterranean), and regular exercise.",
      "Medications: To control individual components (e.g., statins for cholesterol, drugs for high blood pressure and high blood sugar)."
    ],
    "selfCare": [
      "Know your numbers (waist circumference, blood pressure, cholesterol, blood sugar).",
      "Lose even a modest amount of weight (5-10% of body weight) to make a significant difference.",
      "Lifestyle Recommendations",
      "Exercise regularly (at least 150 minutes per week).",
      "Eat a diet rich in fruits, vegetables, and whole grains.",
      "Quit smoking."
    ],
    "prevention": [
      "Maintain a healthy weight.",
      "Stay physically active.",
      "Get regular health screenings."
    ],
    "riskFactors": [
      "Primary: Obesity/overweight, physical inactivity.",
      "Secondary: Insulin resistance, age, family history."
    ],
    "warningSigns": [
      "Having metabolic syndrome itself is a major warning sign for future cardiovascular events. Aggressive management is required."
    ]
  },
  {
    "id": "phenylketonuria-pku",
    "name": "Phenylketonuria (PKU)",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Rare: Affects about 1 in 10,000-15,000 newborns in the U.S.",
    "description": "Phenylketonuria (PKU) is a rare inherited disorder that causes an amino acid called phenylalanine to build up in the body. Without treatment, it can cause severe intellectual disability and other serious health problems. It is managed through a strict, lifelong diet.",
    "desc": "Phenylketonuria (PKU) is a rare inherited disorder that causes an amino acid called phenylalanine to build up in the body. Without treatment, it can cause severe intellectual disability and other serious health problems. It is managed through a strict, lifelong diet.",
    "symptoms": [
      "Intellectual disability.",
      "Delayed development.",
      "Behavioral, emotional, and social problems.",
      "Psychiatric disorders.",
      "A musty odor in the breath, skin, or urine.",
      "Eczema.",
      "Seizures."
    ],
    "causes": [
      "A defect in the gene that helps create the enzyme needed to break down phenylalanine. It is an autosomal recessive disorder."
    ],
    "treatment": [
      "A lifelong low-phenylalanine diet: This involves avoiding high-protein foods (meat, dairy, nuts) and the artificial sweetener aspartame.",
      "Special medical formulas provide necessary nutrients without phenylalanine.",
      "Newer medications (e.g., Kuvan, Palynziq) can help some individuals increase their tolerance to phenylalanine."
    ],
    "selfCare": [
      "Strict adherence to the diet is essential, especially during pregnancy for women with PKU to prevent birth defects.",
      "Regular blood testing to monitor phenylalanine levels.",
      "Work closely with a dietitian specializing in metabolic disorders.",
      "Lifestyle Recommendations",
      "Read food labels meticulously."
    ],
    "prevention": [
      "Newborn screening allows for immediate diagnosis and treatment, preventing intellectual disability.",
      "Genetic counseling for families with a history of PKU."
    ],
    "riskFactors": [
      "Primary: Having two parents who carry the defective PKU gene."
    ],
    "warningSigns": [
      "For an untreated individual, high phenylalanine levels are toxic to the brain. In a newborn, this is a medical emergency requiring immediate dietary intervention."
    ]
  },
  {
    "id": "acute-gouty-arthritis",
    "name": "Acute Gouty Arthritis",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Common, especially in men over 40 and postmenopausal women.",
    "description": "Acute Gouty Arthritis, commonly known as a gout attack, is a complex form of inflammatory arthritis characterized by sudden, severe attacks of pain, redness, swelling, and tenderness in the joints, often at the base of the big toe. It is caused by elevated levels of uric acid in the blood, leading to the formation of urate crystals in a joint.",
    "desc": "Acute Gouty Arthritis, commonly known as a gout attack, is a complex form of inflammatory arthritis characterized by sudden, severe attacks of pain, redness, swelling, and tenderness in the joints, often at the base of the big toe. It is caused by elevated levels of uric acid in the blood, leading to the formation of urate crystals in a joint.",
    "symptoms": [
      "Intense joint pain: Typically peaks within 4-12 hours.",
      "Lingering discomfort: After the severe pain subsides, some joint discomfort can last days to weeks.",
      "Redness and swelling of the affected joint.",
      "Limited range of motion."
    ],
    "causes": [
      "Uric acid crystallizes in the joint, triggering a severe inflammatory response. This happens when the body produces too much uric acid or the kidneys excrete too little."
    ],
    "treatment": [
      "NSAIDs (e.g., ibuprofen, naproxen).",
      "Colchicine: Most effective if taken early in the attack.",
      "Corticosteroids (e.g., prednisone).",
      "Urate-lowering therapy (e.g., allopurinol, febuxostat) for people with recurrent attacks or tophi."
    ],
    "selfCare": [
      "Take medication as prescribed at the first sign of an attack.",
      "Rest the affected joint.",
      "Ice the joint for 15-20 minutes at a time.",
      "Elevate the joint.",
      "Lifestyle Recommendations",
      "Stay well-hydrated.",
      "Limit alcohol and sugary drinks.",
      "Limit high-purine foods."
    ],
    "prevention": [
      "Long-term use of urate-lowering drugs is the primary method for preventing recurrent attacks.",
      "Lifestyle modifications are also key."
    ],
    "riskFactors": [
      "Primary: High levels of uric acid (hyperuricemia).",
      "Secondary: Diet rich in purines (red meat, organ meat, seafood), alcohol consumption (especially beer), obesity, certain medications (diuretics)."
    ],
    "warningSigns": [
      "Severe joint pain that comes on suddenly, often at night.",
      "A joint that is hot, swollen, and so tender that even the weight of a sheet is intolerable."
    ]
  },
  {
    "id": "familial-hypercholesterolemia",
    "name": "Familial Hypercholesterolemia",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "More common than thought, affecting about 1 in 250 people. • Underdiagnosed and undertreated.",
    "description": "Familial Hypercholesterolemia (FH) is a common inherited disorder characterized by very high levels of LDL (\"bad\") cholesterol from birth, which dramatically increases the risk of early-onset heart disease and heart attacks.",
    "desc": "Familial Hypercholesterolemia (FH) is a common inherited disorder characterized by very high levels of LDL (\"bad\") cholesterol from birth, which dramatically increases the risk of early-onset heart disease and heart attacks.",
    "symptoms": [
      "Often, there are no visible symptoms until a heart attack occurs.",
      "High LDL cholesterol that is resistant to diet and exercise.",
      "Xanthomas: Fatty skin deposits on knuckles, elbows, knees, and Achilles tendons.",
      "Corneal Arcus: A white or gray ring around the cornea."
    ],
    "causes": [
      "A mutation in one of several genes that control how the body recycles LDL cholesterol. This leads to very high lifetime exposure to LDL."
    ],
    "treatment": [
      "Aggressive, lifelong cholesterol management is required.",
      "High-intensity statin therapy started in childhood or young adulthood.",
      "Other cholesterol-lowering drugs: Ezetimibe, PCSK9 inhibitors.",
      "Lifestyle changes (healthy diet, exercise) are important but insufficient alone."
    ],
    "selfCare": [
      "Get all first-degree relatives (parents, siblings, children) screened.",
      "Take medication consistently.",
      "Follow a heart-healthy diet.",
      "Do not smoke.",
      "Lifestyle Recommendations",
      "Regular exercise.",
      "Regular monitoring with a cardiologist or lipid specialist."
    ],
    "prevention": [
      "Early diagnosis through family screening and genetic testing is the key to preventing early heart attacks."
    ],
    "riskFactors": [
      "Primary: Having a parent with FH."
    ],
    "warningSigns": [
      "A personal or family history of early heart disease (men <55, women <65).",
      "Physical signs like cholesterol deposits on tendons (xanthomas) or around the cornea of the eye (corneal arcus)."
    ]
  },
  {
    "id": "reactive-hypoglycemia",
    "name": "Reactive Hypoglycemia",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Uncommon. True reactive hypoglycemia is rare.",
    "description": "Reactive Hypoglycemia, also called postprandial hypoglycemia, is a condition where blood sugar drops too low within a few hours after eating a meal. It is not related to diabetes and its exact cause is often unclear, but it may be due to an overproduction of insulin after a high-carbohydrate meal.",
    "desc": "Reactive Hypoglycemia, also called postprandial hypoglycemia, is a condition where blood sugar drops too low within a few hours after eating a meal. It is not related to diabetes and its exact cause is often unclear, but it may be due to an overproduction of insulin after a high-carbohydrate meal.",
    "symptoms": [
      "Shakiness or trembling.",
      "Dizziness or lightheadedness.",
      "Sweating.",
      "Hunger.",
      "Irritability or anxiety.",
      "Fatigue.",
      "A fast heartbeat."
    ],
    "causes": [
      "The body releases too much insulin after a carbohydrate-rich meal. It can be a precursor to type 2 diabetes. In people who have had stomach surgery, food can empty into the small intestine too quickly (dumping syndrome)."
    ],
    "treatment": [
      "Dietary modification is the primary treatment.",
      "There are no medications typically used."
    ],
    "selfCare": [
      "Eat small, frequent meals and snacks throughout the day.",
      "Eat a balanced diet that includes protein, fiber, and complex carbohydrates.",
      "Avoid sugary drinks and high-sugar foods on an empty stomach.",
      "Combine carbohydrates with protein or fat.",
      "Lifestyle Recommendations",
      "Keep a food and symptom diary to identify triggers.",
      "Exercise regularly, but have a snack if you feel symptoms starting."
    ],
    "prevention": [
      "Following the dietary recommendations above can prevent episodes."
    ],
    "riskFactors": [
      "Primary: Prediabetes, stomach surgery (dumping syndrome).",
      "Secondary: Unknown."
    ],
    "warningSigns": [
      "Confusion, abnormal behavior, or visual disturbances.",
      "Seizures.",
      "Loss of consciousness."
    ]
  },
  {
    "id": "vitamin-d-resistant-rickets",
    "name": "Vitamin D-Resistant Rickets",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Rare.",
    "description": "Vitamin D-Resistant Rickets, more accurately known as X-Linked Hypophosphatemia (XLH), is a rare genetic disorder characterized by low levels of phosphate in the blood. This leads to impaired bone mineralization, causing rickets in children and osteomalacia (softening of the bones) in adults. It is \"resistant\" because it does not improve with standard vitamin D supplementation.",
    "desc": "Vitamin D-Resistant Rickets, more accurately known as X-Linked Hypophosphatemia (XLH), is a rare genetic disorder characterized by low levels of phosphate in the blood. This leads to impaired bone mineralization, causing rickets in children and osteomalacia (softening of the bones) in adults. It is \"resistant\" because it does not improve with standard vitamin D supplementation.",
    "symptoms": [
      "Bowed legs or knock knees.",
      "Short stature.",
      "Bone pain.",
      "Dental abscesses.",
      "Abnormal gait (waddling).",
      "Osteomalacia.",
      "Osteoarthritis.",
      "Enthesopathy (mineralization of tendons and ligaments)."
    ],
    "causes": [
      "A mutation in the PHEX gene causes elevated levels of a hormone called FGF23, which leads to excessive phosphate wasting in the urine."
    ],
    "treatment": [
      "Traditional Therapy: Multiple daily doses of oral phosphate supplements and active vitamin D (calcitriol).",
      "Newer Therapy: Burosumab (Crysvita), a monoclonal antibody that targets FGF23. This is now the standard of care for many patients."
    ],
    "selfCare": [
      "Strict adherence to medication is crucial.",
      "Regular monitoring of blood and urine calcium and phosphate levels is needed to avoid complications.",
      "Dental care is important due to the risk of abscesses.",
      "Lifestyle Recommendations",
      "Physical therapy to maintain mobility and strength."
    ],
    "prevention": [
      "Genetic counseling for families with a history of XLH."
    ],
    "riskFactors": [
      "Primary: Family history (X-linked dominant inheritance)."
    ],
    "warningSigns": [
      "This is a chronic condition requiring lifelong management. Early diagnosis in childhood is key to preventing severe bone deformities."
    ]
  },
  {
    "id": "postmenopausal-osteoporosis",
    "name": "Postmenopausal Osteoporosis",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Very common: Affects about one in two postmenopausal women.",
    "description": "Postmenopausal Osteoporosis is a bone disease that develops in women after menopause, when estrogen levels drop significantly. Estrogen helps protect bone density; its loss leads to an accelerated rate of bone loss, making bones brittle and more likely to fracture.",
    "desc": "Postmenopausal Osteoporosis is a bone disease that develops in women after menopause, when estrogen levels drop significantly. Estrogen helps protect bone density; its loss leads to an accelerated rate of bone loss, making bones brittle and more likely to fracture.",
    "symptoms": [
      "Back pain, caused by a fractured or collapsed vertebra.",
      "Loss of height over time.",
      "A stooped posture (kyphosis).",
      "A bone that breaks much more easily than expected."
    ],
    "causes": [
      "The balance between bone resorption (breakdown) and bone formation is disrupted after menopause, leading to a net loss of bone mass and deterioration of bone microarchitecture."
    ],
    "treatment": [
      "Calcium and Vitamin D supplementation is foundational.",
      "Bisphosphonates (e.g., alendronate, zoledronic acid) are first-line medications.",
      "Other drugs: Denosumab, Raloxifene, Teriparatide, Romosozumab."
    ],
    "selfCare": [
      "Get a bone density test (DEXA scan) at menopause or if you have risk factors.",
      "Ensure adequate calcium (1,200 mg/day) and Vitamin D (800-1000 IU/day).",
      "Perform weight-bearing and muscle-strengthening exercises.",
      "Lifestyle Recommendations",
      "Do not smoke.",
      "Limit alcohol.",
      "Fall prevention strategies (e.g., remove home hazards, improve lighting)."
    ],
    "prevention": [
      "Building strong bone mass during youth is the best defense.",
      "Healthy lifestyle and adequate nutrition before and after menopause."
    ],
    "riskFactors": [
      "Primary: Female sex, postmenopausal status, advanced age.",
      "Secondary: Family history, low body weight, smoking, excessive alcohol, certain medications (e.g., corticosteroids), low calcium/vitamin D intake."
    ],
    "warningSigns": [
      "Osteoporosis is often called a \"silent disease\" until a fracture occurs. A fracture from a minor fall or even bending or coughing is a major warning sign."
    ]
  },
  {
    "id": "hereditary-hemochromatosis",
    "name": "Hereditary Hemochromatosis",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "One of the most common genetic disorders in people of Northern European descent.",
    "description": "Hereditary Hemochromatosis is a genetic disorder that causes the body to absorb too much iron from the diet. The excess iron is stored in the body's organs, particularly the liver, heart, and pancreas, leading to organ damage and failure over time.",
    "desc": "Hereditary Hemochromatosis is a genetic disorder that causes the body to absorb too much iron from the diet. The excess iron is stored in the body's organs, particularly the liver, heart, and pancreas, leading to organ damage and failure over time.",
    "symptoms": [
      "Fatigue and weakness.",
      "Joint pain.",
      "Abdominal pain.",
      "Weight loss.",
      "Bronze or gray skin color.",
      "Diabetes.",
      "Loss of body hair.",
      "Irregular heart rhythms."
    ],
    "causes": [
      "A mutation in the HFE gene disrupts the normal regulation of iron absorption in the small intestine."
    ],
    "treatment": [
      "Therapeutic Phlebotomy: The first-line treatment. It is identical to donating blood and is done regularly to remove excess iron from the body.",
      "Iron Chelation Therapy (if phlebotomy is not possible)."
    ],
    "selfCare": [
      "Do not take iron supplements or vitamin C supplements (which increases iron absorption).",
      "Avoid raw shellfish, as people with hemochromatosis are susceptible to bacterial infections from them.",
      "Limit alcohol to protect the liver.",
      "Lifestyle Recommendations",
      "Get family members screened.",
      "Follow a balanced diet; there is no need to avoid all iron-rich foods, just supplements."
    ],
    "prevention": [
      "Early diagnosis and treatment before organ damage occurs can prevent complications and allow for a normal life expectancy."
    ],
    "riskFactors": [
      "Primary: Having two copies of the HFE gene mutation (C282Y)."
    ],
    "warningSigns": [
      "Chronic fatigue, joint pain.",
      "Abdominal pain.",
      "Loss of sex drive or impotence.",
      "Signs of liver disease."
    ]
  },
  {
    "id": "wilsons-disease",
    "name": "Wilson's Disease",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Rare: Affects about 1 in 30,000 people worldwide.",
    "description": "Wilson's Disease is a rare inherited disorder that causes copper to accumulate in the liver, brain, and other vital organs. Copper is essential, but in excess, it is toxic and can cause life-threatening organ damage.",
    "desc": "Wilson's Disease is a rare inherited disorder that causes copper to accumulate in the liver, brain, and other vital organs. Copper is essential, but in excess, it is toxic and can cause life-threatening organ damage.",
    "symptoms": [
      "Symptoms vary depending on the organs affected.",
      "Fatigue, jaundice, abdominal pain, vomiting.",
      "Tremors, difficulty speaking, difficulty walking, drooling.",
      "Personality changes, depression, anxiety, psychosis.",
      "Kayser-Fleischer rings (a rusty-brown ring around the cornea of the eye)."
    ],
    "causes": [
      "A mutation in the ATP7B gene prevents the liver from properly excreting copper into bile, leading to its buildup."
    ],
    "treatment": [
      "Liflong treatment is essential.",
      "Chelating Agents: Drugs that bind copper and help remove it from the body (e.g., D-penicillamine, trientine).",
      "Zinc Acetate: Prevents the intestines from absorbing copper from food.",
      "Liver Transplant for severe liver failure."
    ],
    "selfCare": [
      "Lifelong adherence to medication is non-negotiable.",
      "Avoid copper-rich foods (liver, shellfish, mushrooms, nuts, chocolate).",
      "Have your drinking water checked for copper content.",
      "Lifestyle Recommendations",
      "Get all siblings tested.",
      "Wear a medical alert bracelet."
    ],
    "prevention": [
      "Screening of siblings of an identified patient allows for pre-symptomatic treatment and prevents organ damage."
    ],
    "riskFactors": [
      "Primary: Having two parents who carry the defective ATP7B gene."
    ],
    "warningSigns": [
      "Jaundice, abdominal swelling, confusion."
    ]
  },
  {
    "id": "classic-galactosemia",
    "name": "Classic Galactosemia",
    "category": "Metabolic",
    "severity": "Low",
    "prevalence": "Rare: Affects about 1 in 30,000-60,000 newborns.",
    "description": "Classic Galactosemia is a rare, serious genetic metabolic disorder where the body cannot process the simple sugar galactose, which is primarily found in milk (as part of lactose). Ingestion of galactose is toxic and can cause life-threatening complications in newborns.",
    "desc": "Classic Galactosemia is a rare, serious genetic metabolic disorder where the body cannot process the simple sugar galactose, which is primarily found in milk (as part of lactose). Ingestion of galactose is toxic and can cause life-threatening complications in newborns.",
    "symptoms": [
      "Learning disabilities.",
      "Speech and language problems.",
      "Neurological issues (tremor, ataxia).",
      "Ovarian failure in females."
    ],
    "causes": [
      "A deficiency of the enzyme GALT, which is needed to break down galactose."
    ],
    "treatment": [
      "A strict, lifelong galactose-free diet: This means eliminating all milk and dairy products (including breast milk) and many other foods that contain galactose.",
      "Infants are fed a special soy-based or elemental formula."
    ],
    "selfCare": [
      "Read all food labels carefully.",
      "Work closely with a metabolic dietitian.",
      "Carry a medical alert card.",
      "Lifestyle Recommendations",
      "Ensure early intervention for developmental delays."
    ],
    "prevention": [
      "Newborn screening allows for immediate diagnosis and dietary intervention, preventing the acute, life-threatening neonatal crisis."
    ],
    "riskFactors": [
      "Primary: Having two parents who carry the defective GALT gene."
    ],
    "warningSigns": [
      "Lethargy, vomiting, poor feeding.",
      "Jaundice.",
      "Liver damage, bleeding, and E. coli sepsis."
    ]
  },
  {
    "id": "maple-syrup-urine-disease",
    "name": "Maple Syrup Urine Disease",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Very rare.",
    "description": "Maple Syrup Urine Disease (MSUD) is a rare, inherited metabolic disorder where the body cannot process certain amino acids (leucine, isoleucine, and valine). This causes a buildup of these acids and their byproducts in the blood and urine, giving the urine a distinctive sweet smell, like maple syrup. It is life-threatening without treatment.",
    "desc": "Maple Syrup Urine Disease (MSUD) is a rare, inherited metabolic disorder where the body cannot process certain amino acids (leucine, isoleucine, and valine). This causes a buildup of these acids and their byproducts in the blood and urine, giving the urine a distinctive sweet smell, like maple syrup. It is life-threatening without treatment.",
    "symptoms": [
      "Without treatment, severe neurological damage occurs. Even with treatment, managing the condition is challenging, and metabolic crises can be triggered by illness or stress."
    ],
    "causes": [
      "A deficiency in the branched-chain alpha-keto acid dehydrogenase (BCKD) enzyme complex."
    ],
    "treatment": [
      "A strict, lifelong diet extremely low in the three offending amino acids. This involves a special medical formula and carefully controlled food intake.",
      "Close monitoring of blood levels.",
      "Hospitalization for \"sick day\" management with IV fluids and nutrition."
    ],
    "selfCare": [
      "Adherence to the diet is critical.",
      "Have a sick-day plan in place.",
      "Frequent blood tests are necessary.",
      "Lifestyle Recommendations",
      "Genetic counseling for the family."
    ],
    "prevention": [
      "Newborn screening is vital for early diagnosis and prevention of disability and death."
    ],
    "riskFactors": [
      "Primary: Having two parents who carry the defective gene."
    ],
    "warningSigns": [
      "Poor feeding, vomiting, lethargy.",
      "Urine that smells like maple syrup.",
      "Seizures, coma."
    ]
  },
  {
    "id": "lactose-intolerance",
    "name": "Lactose Intolerance",
    "category": "Metabolic",
    "severity": "Low",
    "prevalence": "Very common worldwide. It is the norm in most adult populations except those of Northern European descent.",
    "description": "Lactose Intolerance is the inability to fully digest lactose, the sugar found in milk and dairy products. This is due to a deficiency of the enzyme lactase in the small intestine. It leads to gastrointestinal symptoms after consuming dairy.",
    "desc": "Lactose Intolerance is the inability to fully digest lactose, the sugar found in milk and dairy products. This is due to a deficiency of the enzyme lactase in the small intestine. It leads to gastrointestinal symptoms after consuming dairy.",
    "symptoms": [
      "Diarrhea.",
      "Nausea, and sometimes vomiting.",
      "Abdominal cramps.",
      "Bloating.",
      "Gas."
    ],
    "causes": [
      "Low levels of lactase enzyme prevent the breakdown of lactose, which then ferments in the colon, drawing in water and producing gas."
    ],
    "treatment": [
      "Dietary Management: Avoiding or limiting lactose-containing foods.",
      "Lactase Enzyme Supplements: Taken before consuming dairy to help with digestion.",
      "Choosing lactose-free milk and dairy products."
    ],
    "selfCare": [
      "Experiment to find your personal tolerance level.",
      "Dairy is often better tolerated when eaten with other foods.",
      "Hard cheeses and yogurt are often better tolerated than milk.",
      "Lifestyle Recommendations",
      "Ensure adequate calcium intake from non-dairy sources (leafy greens, fortified foods, sardines)."
    ],
    "prevention": [
      "There is no way to prevent lactose intolerance, but symptoms can be managed by avoiding triggers."
    ],
    "riskFactors": [
      "Primary: Ethnicity (more common in Asian, African, Hispanic, and Native American populations).",
      "Secondary: Age (lactase production often declines with age), injury to the small intestine."
    ],
    "warningSigns": [
      "Lactose intolerance is uncomfortable but not dangerous. However, see a doctor to rule out other conditions like Crohn's disease or celiac disease if symptoms are severe."
    ]
  },
  {
    "id": "severe-vitamin-d-deficiency",
    "name": "Severe Vitamin D Deficiency",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Common, especially in older adults, people with limited sun exposure, and those with dark skin.",
    "description": "Severe Vitamin D Deficiency occurs when the level of vitamin D in your body is too low to maintain bone health and support other bodily functions. Vitamin D is crucial for calcium absorption. Severe deficiency can lead to soft, weak bones (rickets in children, osteomalacia in adults) and other health problems.",
    "desc": "Severe Vitamin D Deficiency occurs when the level of vitamin D in your body is too low to maintain bone health and support other bodily functions. Vitamin D is crucial for calcium absorption. Severe deficiency can lead to soft, weak bones (rickets in children, osteomalacia in adults) and other health problems.",
    "symptoms": [
      "Fatigue.",
      "Bone pain and back pain.",
      "Muscle weakness, aches, or cramps.",
      "Mood changes, like depression.",
      "Impaired wound healing.",
      "Hair loss."
    ],
    "causes": [
      "Insufficient intake from diet and sunlight, or the body's inability to absorb or convert it to its active form."
    ],
    "treatment": [
      "High-dose Vitamin D supplementation for a period of time (e.g., 50,000 IU once a week for 8 weeks), followed by a maintenance dose.",
      "Treatment of the underlying cause (e.g., managing malabsorption)."
    ],
    "selfCare": [
      "Take supplements as prescribed by your doctor.",
      "Get sensible sun exposure (10-30 minutes several times a week).",
      "Eat vitamin D-rich foods (fatty fish, fortified milk, egg yolks).",
      "Lifestyle Recommendations",
      "Maintain a healthy weight.",
      "Get your level checked if you have risk factors."
    ],
    "prevention": [
      "Adequate sun exposure and dietary intake.",
      "Prophylactic supplementation for at-risk groups."
    ],
    "riskFactors": [
      "Primary: Lack of sun exposure, obesity.",
      "Secondary: Malabsorption disorders (e.g., Crohn's, celiac), kidney or liver disease, certain medications."
    ],
    "warningSigns": [
      "Severe deficiency can lead to hypocalcemia (low blood calcium), which can cause muscle spasms (tetany), seizures, and heart rhythm disturbances."
    ]
  },
  {
    "id": "diabetic-ketoacidosis-dka",
    "name": "Diabetic Ketoacidosis (DKA)",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "A leading cause of mortality in children and young adults with Type 1 Diabetes.",
    "description": "Diabetic Ketoacidosis (DKA) is a serious complication of diabetes that occurs when your body produces high levels of blood acids called ketones. It develops when there's not enough insulin in the body to allow glucose into cells for energy, so the liver breaks down fat for fuel, producing ketones. It is most common in Type 1 Diabetes.",
    "desc": "Diabetic Ketoacidosis (DKA) is a serious complication of diabetes that occurs when your body produces high levels of blood acids called ketones. It develops when there's not enough insulin in the body to allow glucose into cells for energy, so the liver breaks down fat for fuel, producing ketones. It is most common in Type 1 Diabetes.",
    "symptoms": [
      "Excessive thirst and dry mouth.",
      "Frequent urination.",
      "High blood sugar level.",
      "High ketone levels in urine.",
      "Fatigue."
    ],
    "causes": [
      "A critical lack of insulin, often triggered by an illness, infection, or insulin non-adherence."
    ],
    "treatment": [
      "Hospitalization is required.",
      "Intravenous Fluids: To treat dehydration.",
      "IV Insulin: To lower blood sugar and stop ketone production.",
      "Electrolyte Replacement: To correct imbalances in potassium, sodium, and chloride."
    ],
    "selfCare": [
      "(For diabetics to prevent DKA)",
      "Take insulin as prescribed.",
      "Monitor your blood sugar closely, especially when sick.",
      "Check urine for ketones when blood sugar is high (>240 mg/dL) or you are ill.",
      "Have a \"sick-day\" plan from your doctor.",
      "Lifestyle Recommendations",
      "Stay hydrated.",
      "Never skip insulin."
    ],
    "prevention": [
      "Careful diabetes management and sick-day rules are the best prevention."
    ],
    "riskFactors": [
      "Primary: Having Type 1 Diabetes.",
      "Secondary: Illness, infection, missing insulin doses, problems with insulin pump therapy."
    ],
    "warningSigns": [
      "Nausea and vomiting.",
      "Abdominal pain.",
      "Fruity-scented breath.",
      "Rapid, deep breathing (Kussmaul respirations).",
      "Confusion."
    ]
  },
  {
    "id": "subacute-thyroiditis",
    "name": "Subacute Thyroiditis",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Uncommon.",
    "description": "Subacute Thyroiditis (de Quervain's Thyroiditis) is a painful inflammatory disorder of the thyroid gland, often preceded by a viral upper respiratory infection. It typically follows a triphasic course: a hyperthyroid phase, a hypothyroid phase, and then a return to normal function.",
    "desc": "Subacute Thyroiditis (de Quervain's Thyroiditis) is a painful inflammatory disorder of the thyroid gland, often preceded by a viral upper respiratory infection. It typically follows a triphasic course: a hyperthyroid phase, a hypothyroid phase, and then a return to normal function.",
    "symptoms": [
      "Pain in the thyroid gland (front of neck), which may radiate to the jaw or ears.",
      "Hyperthyroid phase symptoms: Fatigue, irritability, heat intolerance, palpitations.",
      "Hypothyroid phase symptoms: Fatigue, weight gain, cold intolerance.",
      "Fever.",
      "Malaise."
    ],
    "causes": [
      "Believed to be a viral or post-viral inflammatory process."
    ],
    "treatment": [
      "Pain and Inflammation: High-dose aspirin or NSAIDs. For severe pain, corticosteroids (e.g., prednisone) are very effective.",
      "Hyperthyroid symptoms: Beta-blockers (e.g., propranolol) to control rapid heart rate and tremors.",
      "Hypothyroid phase: Temporary thyroid hormone replacement may be needed."
    ],
    "selfCare": [
      "Rest.",
      "Use pain relievers as directed.",
      "Follow up with your doctor to monitor thyroid function until it recovers.",
      "Lifestyle Recommendations",
      "Manage symptoms according to the phase of the illness."
    ],
    "prevention": [
      "There is no known way to prevent it."
    ],
    "riskFactors": [
      "Primary: Recent viral illness (e.g., mumps, coxsackie, influenza).",
      "Secondary: More common in middle-aged women."
    ],
    "warningSigns": [
      "The pain can be severe and require treatment. See a doctor for a painful, tender neck and symptoms of hyperthyroidism."
    ]
  },
  {
    "id": "congenital-adrenal-hyperplasia",
    "name": "Congenital Adrenal Hyperplasia",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "The most common form is a rare disorder.",
    "description": "Congenital Adrenal Hyperplasia (CAH) refers to a group of genetic disorders that affect the adrenal glands' ability to produce cortisol and, often, aldosterone. The most common form, 21-hydroxylase deficiency, causes a buildup of precursor hormones that are diverted to produce excess androgens (male sex hormones).",
    "desc": "Congenital Adrenal Hyperplasia (CAH) refers to a group of genetic disorders that affect the adrenal glands' ability to produce cortisol and, often, aldosterone. The most common form, 21-hydroxylase deficiency, causes a buildup of precursor hormones that are diverted to produce excess androgens (male sex hormones).",
    "symptoms": [
      "Vary by severity and type.",
      "In females: Ambiguous genitalia at birth.",
      "In both sexes: Poor weight gain, vomiting, early appearance of pubic hair, rapid growth in childhood but short adult stature.",
      "Early puberty.",
      "Acne, excessive body hair.",
      "Irregular periods and infertility in women."
    ],
    "causes": [
      "A genetic defect in one of the enzymes needed to make cortisol."
    ],
    "treatment": [
      "Liflong hormone replacement: Hydrocortisone to replace cortisol. Fludrocortisone to replace aldosterone in salt-wasters.",
      "Increased \"stress dosing\" of hydrocortisone during illness or surgery.",
      "Prenatal treatment may be considered for affected female fetuses."
    ],
    "selfCare": [
      "Never skip medication.",
      "Always carry a medical alert card/bracelet and an emergency injection kit.",
      "Parents must learn to give an emergency injection.",
      "Lifestyle Recommendations",
      "Regular follow-up with a pediatric or adult endocrinologist."
    ],
    "prevention": [
      "Newborn screening identifies the severe, classic form and prevents salt-wasting crises.",
      "Genetic counseling for at-risk families."
    ],
    "riskFactors": [
      "Primary: Having two parents who carry the defective gene."
    ],
    "warningSigns": [
      "Vomiting, dehydration.",
      "Low blood sodium, high blood potassium.",
      "Shock, cardiac arrest."
    ]
  },
  {
    "id": "primary-hyperparathyroidism",
    "name": "Primary Hyperparathyroidism",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Most common cause of hypercalcemia in the general population. • More common in postmenopausal women.",
    "description": "Primary Hyperparathyroidism is a disorder where one or more of the four parathyroid glands in the neck become overactive, producing too much parathyroid hormone (PTH). This leads to high levels of calcium in the blood (hypercalcemia), which can cause various health problems.",
    "desc": "Primary Hyperparathyroidism is a disorder where one or more of the four parathyroid glands in the neck become overactive, producing too much parathyroid hormone (PTH). This leads to high levels of calcium in the blood (hypercalcemia), which can cause various health problems.",
    "symptoms": [
      "Stones: Kidney stones.",
      "Bones: Bone pain, osteoporosis, fractures.",
      "Groans: Abdominal pain, nausea, constipation (due to pancreatitis or PUD).",
      "Psychiatric overtones: Depression, fatigue, cognitive dysfunction."
    ],
    "causes": [
      "In about 80% of cases, a benign tumor (adenoma) on one gland is the cause. Less commonly, hyperplasia of all four glands or, rarely, cancer."
    ],
    "treatment": [
      "Surgical removal of the overactive gland(s) (Parathyroidectomy): This is the only cure and is recommended for symptomatic patients or those meeting specific criteria (young age, high calcium, reduced kidney function, osteoporosis).",
      "Monitoring: For mild, asymptomatic cases.",
      "Medications: Cinacalcet to lower calcium, bisphosphonates for bone protection."
    ],
    "selfCare": [
      "Stay well-hydrated to help the kidneys excrete calcium and reduce the risk of stones.",
      "Avoid thiazide diuretics, which can raise calcium levels.",
      "Ensure adequate, but not excessive, calcium intake from food (do not take supplements unless directed).",
      "Lifestyle Recommendations",
      "Weight-bearing exercise to protect bones."
    ],
    "prevention": [
      "There is no known way to prevent primary hyperparathyroidism."
    ],
    "riskFactors": [
      "Primary: Female sex, advanced age.",
      "Secondary: A history of radiation to the head/neck, certain genetic syndromes."
    ],
    "warningSigns": [
      "Profound dehydration, confusion, coma.",
      "Severe nausea and vomiting.",
      "Requires hospitalization."
    ]
  },
  {
    "id": "hypoparathyroidism",
    "name": "Hypoparathyroidism",
    "category": "Metabolic",
    "severity": "Medium",
    "prevalence": "Rare.",
    "description": "Hypoparathyroidism is a rare condition where the parathyroid glands in the neck produce too little or no parathyroid hormone (PTH). This leads to low levels of calcium (hypocalcemia) and high levels of phosphorus in the blood.",
    "desc": "Hypoparathyroidism is a rare condition where the parathyroid glands in the neck produce too little or no parathyroid hormone (PTH). This leads to low levels of calcium (hypocalcemia) and high levels of phosphorus in the blood.",
    "symptoms": [
      "Tingling or burning sensations (paresthesias) in the fingertips, toes, and lips.",
      "Muscle aches or cramps.",
      "Fatigue and weakness.",
      "Dry skin, brittle nails.",
      "Hair loss.",
      "Dental problems.",
      "Anxiety or depression."
    ],
    "causes": [
      "The most common cause is injury to the parathyroid glands during thyroid or other neck surgery."
    ],
    "treatment": [
      "Calcium and Vitamin D Supplements: High doses of calcium carbonate and active Vitamin D (calcitriol) are required for life.",
      "The goal is to relieve symptoms and raise calcium to the low-normal range, not to normalize it completely.",
      "Recombinant human PTH (Natpara) is an option for some patients who cannot be well-controlled with standard therapy."
    ],
    "selfCare": [
      "Take supplements exactly as prescribed.",
      "Know the symptoms of low and high calcium.",
      "Have your calcium levels monitored regularly.",
      "Lifestyle Recommendations",
      "Maintain a consistent diet; avoid sudden changes in calcium or phosphate intake."
    ],
    "prevention": [
      "Careful surgical technique during thyroid surgery is the primary way to prevent the most common form."
    ],
    "riskFactors": [
      "Primary: Damage or accidental removal of the parathyroid glands during neck surgery (most common cause).",
      "Secondary: Autoimmune disease, genetic disorders."
    ],
    "warningSigns": [
      "Painful muscle spasms in the hands, feet, and face.",
      "Seizures.",
      "Laryngospasm (spasm of the vocal cords, impairing breathing).",
      "Prolonged QT interval on EKG, risking fatal arrhythmias."
    ]
  },
  {
    "id": "major-depressive-disorder",
    "name": "Major Depressive Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "One of the most common mental disorders. • Lifetime prevalence is about 10-15%.",
    "description": "Major Depressive Disorder (MDD), commonly known as clinical depression, is a common but serious mood disorder. It causes severe symptoms that affect how you feel, think, and handle daily activities, such as sleeping, eating, or working. It is more than just \"feeling sad.\"",
    "desc": "Major Depressive Disorder (MDD), commonly known as clinical depression, is a common but serious mood disorder. It causes severe symptoms that affect how you feel, think, and handle daily activities, such as sleeping, eating, or working. It is more than just \"feeling sad.\"",
    "symptoms": [
      "To be diagnosed with MDD, you must have five or more of the following symptoms for at least two weeks, and they must represent a change from previous functioning. At least one of the symptoms must be either (1) depressed mood or (2) loss of interest or pleasure.",
      "1.Depressed mood most of the day.",
      "2.Markedly diminished interest or pleasure in all, or almost all, activities.",
      "3.Significant weight loss or gain, or change in appetite.",
      "4.Insomnia or hypersomnia.",
      "5.Psychomotor agitation or retardation.",
      "6.Fatigue or loss of energy.",
      "7.Feelings of worthlessness or excessive guilt."
    ],
    "causes": [
      "The exact cause is unknown, but it's believed to be a combination of genetic, biological, environmental, and psychological factors. It involves changes in brain chemistry and function."
    ],
    "treatment": [
      "Psychotherapy (Talk Therapy): Such as Cognitive Behavioral Therapy (CBT) or Interpersonal Therapy (IPT).",
      "Antidepressant Medications: Such as SSRIs (e.g., sertraline, escitalopram) or SNRIs (e.g., venlafaxine, duloxetine).",
      "Brain Stimulation Therapies: Like Electroconvulsive Therapy (ECT) for severe, treatment-resistant depression."
    ],
    "selfCare": [
      "Stick to your treatment plan. Don't skip therapy sessions or stop medication without consulting your doctor.",
      "Learn about depression.",
      "Pay attention to warning signs and have a plan to manage them.",
      "Lifestyle Recommendations",
      "Get regular exercise.",
      "Avoid alcohol and recreational drugs.",
      "Practice stress management (e.g., mindfulness, meditation).",
      "Don't isolate yourself; stay connected with friends and family."
    ],
    "prevention": [
      "There's no sure way to prevent depression, but strategies can help.",
      "Control stress, build resilience, and boost self-esteem.",
      "Reach out to family and friends in times of crisis.",
      "Get treatment at the earliest sign of a problem to prevent worsening."
    ],
    "riskFactors": [
      "Primary: Personal or family history of depression.",
      "Secondary: Trauma, stress, major life changes, certain physical illnesses and medications."
    ],
    "warningSigns": [
      "Thoughts about death or suicide.",
      "Suicide plans or an attempt.",
      "Thoughts of self-harm."
    ]
  },
  {
    "id": "generalized-anxiety-disorder",
    "name": "Generalized Anxiety Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common: Affects about 3% of the adult population in a given year.",
    "description": "Generalized Anxiety Disorder (GAD) is characterized by persistent and excessive worry about a number of different things. People with GAD may anticipate disaster and be overly concerned about money, health, family, work, or other issues. The worry is difficult to control and is often accompanied by physical symptoms.",
    "desc": "Generalized Anxiety Disorder (GAD) is characterized by persistent and excessive worry about a number of different things. People with GAD may anticipate disaster and be overly concerned about money, health, family, work, or other issues. The worry is difficult to control and is often accompanied by physical symptoms.",
    "symptoms": [
      "Persistent worrying or anxiety about a number of areas that are out of proportion to the impact of the events.",
      "Overthinking plans and solutions to all possible worst-case outcomes.",
      "Perceiving situations and events as threatening, even when they aren't.",
      "Difficulty handling uncertainty.",
      "Indecisiveness and fear of making the wrong decision.",
      "Physical symptoms: Restlessness, feeling keyed up or on edge, easily fatigued, difficulty concentrating, irritability, muscle tension, sleep disturbances."
    ],
    "causes": [
      "Like depression, it involves a combination of genetic predisposition, brain chemistry, personality, and life experiences."
    ],
    "treatment": [
      "Psychotherapy: Cognitive Behavioral Therapy (CBT) is highly effective. It teaches new ways of thinking and reacting to anxiety-provoking situations.",
      "Medications: Antidepressants (SSRIs, SNRIs) are first-line. Benzodiazepines may be used for short-term relief but are avoided for long-term use due to risk of dependence."
    ],
    "selfCare": [
      "Stay active. Exercise is a powerful anxiety reducer.",
      "Avoid alcohol and recreational drugs.",
      "Prioritize sleep.",
      "Use relaxation techniques (deep breathing, meditation, yoga).",
      "Eat a healthy diet.",
      "Lifestyle Recommendations",
      "Learn to say no and manage your time to avoid becoming overwhelmed."
    ],
    "prevention": [
      "There's no way to predict for certain what will cause someone to develop GAD, but getting treatment early can reduce its impact."
    ],
    "riskFactors": [
      "Primary: Family history of anxiety, personality (timid or negative).",
      "Secondary: Trauma, chronic stress, other mental health disorders, substance abuse."
    ],
    "warningSigns": [
      "While not typically an emergency like depression, severe anxiety can be debilitating. Seek help if anxiety is interfering with your work, relationships, or daily life."
    ]
  },
  {
    "id": "bipolar-i-disorder",
    "name": "Bipolar I Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Less common than Major Depression, affecting about 1% of the population.",
    "description": "Bipolar I Disorder is a mental health condition characterized by severe mood swings that include at least one manic episode. The mood episodes range from extreme \"highs\" (mania) to \"lows\" (depression). Mania can cause a significant impairment in functioning and may require hospitalization.",
    "desc": "Bipolar I Disorder is a mental health condition characterized by severe mood swings that include at least one manic episode. The mood episodes range from extreme \"highs\" (mania) to \"lows\" (depression). Mania can cause a significant impairment in functioning and may require hospitalization.",
    "symptoms": [
      "The disorder is defined by the occurrence of one or more manic or mixed episodes.",
      "Manic Episode: A distinct period of abnormally and persistently elevated, expansive, or irritable mood, lasting at least one week. Includes symptoms like inflated self-esteem, decreased need for sleep, more talkative, flight of ideas, distractibility, increase in goal-directed activity, excessive involvement in pleasurable activities that have a high potential for painful consequences.",
      "Major Depressive Episode: (See symptoms for MDD, #101)."
    ],
    "causes": [
      "The exact cause is unknown, but it is strongly linked to genetics and differences in brain structure and function."
    ],
    "treatment": [
      "Mood Stabilizers: The cornerstone of treatment (e.g., lithium, valproate).",
      "Atypical Antipsychotics (e.g., quetiapine, olanzapine).",
      "Psychotherapy to help cope with the condition and identify mood triggers.",
      "Often, a combination of medication and therapy is used."
    ],
    "selfCare": [
      "Take your medication consistently. This is the most important factor in preventing relapse.",
      "Keep a mood chart to track your symptoms and identify patterns.",
      "Avoid drugs and alcohol.",
      "Maintain a regular sleep schedule; disruption can trigger episodes.",
      "Lifestyle Recommendations",
      "Learn your early warning signs of a mood shift (e.g., sleeping less, feeling more energetic) and have a plan with your doctor."
    ],
    "prevention": [
      "There is no way to prevent bipolar disorder, but long-term preventive treatment can help control the symptoms and prevent relapse."
    ],
    "riskFactors": [
      "Primary: Having a first-degree relative (parent or sibling) with bipolar disorder.",
      "Secondary: Periods of high stress, drug or alcohol abuse."
    ],
    "warningSigns": [
      "Manic symptoms: Decreased need for sleep, racing thoughts, reckless behavior (spending sprees, impulsive sex), grandiosity, psychosis (delusions or hallucinations).",
      "Severe depressive symptoms: Suicidal thoughts or plans."
    ]
  },
  {
    "id": "paranoid-schizophrenia",
    "name": "Paranoid Schizophrenia",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Schizophrenia affects about 1% of the population. • The paranoid subtype was once the most common diagnosis.",
    "description": "Paranoid Schizophrenia is a subtype of Schizophrenia, a chronic and severe mental disorder that affects how a person thinks, feels, and behaves. The \"paranoid\" subtype is characterized by prominent delusions and/or auditory hallucinations, with relative preservation of cognitive function and affect.",
    "desc": "Paranoid Schizophrenia is a subtype of Schizophrenia, a chronic and severe mental disorder that affects how a person thinks, feels, and behaves. The \"paranoid\" subtype is characterized by prominent delusions and/or auditory hallucinations, with relative preservation of cognitive function and affect.",
    "symptoms": [
      "Delusions: Fixed, false beliefs, often of persecution or grandeur.",
      "Hallucinations: Hearing voices is most common; the voices are often critical or commanding.",
      "Disorganized speech and thinking.",
      "Negative Symptoms (taken away from the personality): Are less prominent in the paranoid subtype but may include flat affect and social withdrawal."
    ],
    "causes": [
      "A combination of genetics, brain chemistry (dopamine imbalance), and environment."
    ],
    "treatment": [
      "Antipsychotic Medications: The primary treatment. Both typical (e.g., haloperidol) and atypical (e.g., risperidone, olanzapine) antipsychotics are used.",
      "Psychosocial Treatments: Psychotherapy, social skills training, and vocational rehabilitation to help with integration into society.",
      "Hospitalization may be necessary during acute episodes."
    ],
    "selfCare": [
      "Medication adherence is crucial to prevent relapse.",
      "Avoid alcohol and drugs.",
      "Learn stress-management techniques.",
      "Join a support group.",
      "Lifestyle Recommendations",
      "Maintain a structured daily routine."
    ],
    "prevention": [
      "No reliable way to prevent schizophrenia, but early diagnosis and treatment can help get symptoms under control before serious complications develop."
    ],
    "riskFactors": [
      "Primary: Genetics (having a close relative with schizophrenia).",
      "Secondary: Complications during pregnancy/birth, psychoactive drug use in adolescence."
    ],
    "warningSigns": [
      "Behavior that is dangerous to themselves or others.",
      "Inability to care for their basic needs.",
      "Severe paranoia or hallucinations that are causing distress."
    ]
  },
  {
    "id": "post-traumatic-stress-disorder-ptsd",
    "name": "Post-Traumatic Stress Disorder (PTSD)",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common. Affects about 7-8% of the population at some point in their lives.",
    "description": "Post-Traumatic Stress Disorder (PTSD) is a psychiatric disorder that can occur in people who have experienced or witnessed a traumatic event such as a natural disaster, a serious accident, a terrorist act, war/combat, rape, or other violent personal assault.",
    "desc": "Post-Traumatic Stress Disorder (PTSD) is a psychiatric disorder that can occur in people who have experienced or witnessed a traumatic event such as a natural disaster, a serious accident, a terrorist act, war/combat, rape, or other violent personal assault.",
    "symptoms": [
      "1.Intrusive Memories: Recurrent, unwanted distressing memories; flashbacks; nightmares.",
      "2.Avoidance: Avoiding places, activities, or people that remind you of the trauma.",
      "3.Negative Changes in Thinking and Mood: Negative thoughts about yourself or the world, hopelessness, memory problems, feeling detached, inability to experience positive emotions.",
      "4.Changes in Physical and Emotional Reactions (Arousal): Being easily startled, always being on guard for danger, self-destructive behavior, trouble sleeping, irritability."
    ],
    "causes": [
      "Develops after exposure to a terrifying event or ordeal in which grave physical harm occurred or was threatened."
    ],
    "treatment": [
      "Trauma-focused CBT.",
      "Eye Movement Desensitization and Reprocessing (EMDR).",
      "Medications: Antidepressants (SSRIs like sertraline and paroxetine are FDA-approved)."
    ],
    "selfCare": [
      "Follow your treatment plan.",
      "Learn about PTSD to understand your feelings.",
      "Take care of your physical health: Exercise, eat well, get enough sleep.",
      "Don't self-medicate with alcohol or drugs.",
      "Break the cycle by talking to a trusted friend or therapist when you feel bad.",
      "Lifestyle Recommendations",
      "Spend time with supportive friends and family.",
      "Consider a support group."
    ],
    "prevention": [
      "Getting prompt support after a traumatic event through therapy or a support network may help reduce the risk of developing PTSD."
    ],
    "riskFactors": [
      "Primary: Experiencing intense or long-lasting trauma.",
      "Secondary: Having a history of other mental health problems, lack of a good support system, childhood trauma."
    ],
    "warningSigns": [
      "Having severe, distressing flashbacks or nightmares.",
      "Using alcohol or drugs to cope.",
      "Feeling completely numb or detached."
    ]
  },
  {
    "id": "obsessive-compulsive-disorder-ocd",
    "name": "Obsessive-Compulsive Disorder (OCD)",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common: Affects about 1-2% of the population.",
    "description": "Obsessive-Compulsive Disorder (OCD) is a disorder in which people have recurring, unwanted thoughts, ideas, or sensations (obsessions) that make them feel driven to do something repetitively (compulsions). The repetitive behaviors can significantly interfere with a person's daily activities and social interactions.",
    "desc": "Obsessive-Compulsive Disorder (OCD) is a disorder in which people have recurring, unwanted thoughts, ideas, or sensations (obsessions) that make them feel driven to do something repetitively (compulsions). The repetitive behaviors can significantly interfere with a person's daily activities and social interactions.",
    "symptoms": [
      "Obsessions: Repeated, persistent, and unwanted thoughts, urges, or images that cause anxiety. Common themes include fear of contamination, needing things orderly, aggressive thoughts.",
      "Compulsions: Repetitive behaviors that a person feels driven to perform in response to an obsession. Common compulsions include washing, checking, counting, repeating words silently."
    ],
    "causes": [
      "The cause is not fully understood, but theories involve genetics and differences in the brain related to communication along the fronto-striatal pathways."
    ],
    "treatment": [
      "Psychotherapy: Exposure and Response Prevention (ERP), a type of CBT, is the gold standard. It involves gradually exposing you to a feared object or obsession and teaching you healthy ways to cope with the anxiety.",
      "Medications: SSRIs are the primary psychiatric medications used."
    ],
    "selfCare": [
      "Practice the techniques you learn in ERP.",
      "Take medication as directed.",
      "Join an OCD support group.",
      "Learn to manage stress.",
      "Lifestyle Recommendations",
      "Stay physically active.",
      "Get adequate sleep."
    ],
    "prevention": [
      "There's no sure way to prevent OCD. However, getting treatment as soon as possible may help prevent it from worsening."
    ],
    "riskFactors": [
      "Primary: Genetics, brain structure and function.",
      "Secondary: Trauma, history of physical or sexual abuse in childhood."
    ],
    "warningSigns": [
      "Taking up a great deal of time (more than 1 hour a day).",
      "Causing significant distress.",
      "Interfering with your work, social life, or relationships."
    ]
  },
  {
    "id": "anorexia-nervosa",
    "name": "Anorexia Nervosa",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "More common in females, but also affects males. • Often begins during adolescence.",
    "description": "Anorexia Nervosa is a serious, potentially life-threatening eating disorder characterized by self-starvation and excessive weight loss. People with anorexia have a distorted body image and an intense fear of gaining weight, leading them to eat very little.",
    "desc": "Anorexia Nervosa is a serious, potentially life-threatening eating disorder characterized by self-starvation and excessive weight loss. People with anorexia have a distorted body image and an intense fear of gaining weight, leading them to eat very little.",
    "symptoms": [
      "Physical: Extreme weight loss, thin appearance, fatigue, insomnia, dizziness, bluish discoloration of fingers, hair that thins or falls out, absence of menstruation.",
      "Emotional/Behavioral: Preoccupation with food, refusal to eat, denial of hunger, excessive exercise, flat mood, social withdrawal."
    ],
    "causes": [
      "A complex interplay of genetic, biological, psychological, and sociocultural factors."
    ],
    "treatment": [
      "Medical Care: To address health complications and restore weight. Hospitalization may be necessary.",
      "Nutritional Counseling: To establish healthy eating patterns.",
      "Psychotherapy: Family-based therapy (FBT) is first-line for adolescents. CBT is used for adults.",
      "Medications: No medications are FDA-approved for anorexia, but antidepressants may help with co-occurring depression or anxiety."
    ],
    "selfCare": [
      "Stick to your treatment plan. Do not skip therapy sessions or meals.",
      "Talk to your doctor about appropriate vitamin and mineral supplements.",
      "Resist the urge to weigh yourself constantly.",
      "Lifestyle Recommendations",
      "Learn about anorexia to understand your condition.",
      "Explore healthy ways to cope with emotional pain."
    ],
    "prevention": [
      "There's no guaranteed way to prevent anorexia, but promoting healthy body image and eating habits may help."
    ],
    "riskFactors": [
      "Primary: Genetics, personality traits (perfectionism, neuroticism).",
      "Secondary: Societal pressure to be thin, participation in activities that value leanness (e.g., ballet, modeling), history of dieting."
    ],
    "warningSigns": [
      "Severe malnutrition.",
      "Fainting, irregular heart rate, or very low blood pressure.",
      "Electrolyte imbalances.",
      "Suicidal thoughts."
    ]
  },
  {
    "id": "borderline-personality-disorder",
    "name": "Borderline Personality Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Affects about 1.6% of the adult population.",
    "description": "Borderline Personality Disorder (BPD) is a mental health disorder that impacts the way you think and feel about yourself and others, causing problems functioning in everyday life. It includes a pattern of unstable intense relationships, distorted self-image, extreme emotions, and impulsivity.",
    "desc": "Borderline Personality Disorder (BPD) is a mental health disorder that impacts the way you think and feel about yourself and others, causing problems functioning in everyday life. It includes a pattern of unstable intense relationships, distorted self-image, extreme emotions, and impulsivity.",
    "symptoms": [
      "Frantic efforts to avoid real or imagined abandonment.",
      "A pattern of unstable and intense interpersonal relationships.",
      "Identity disturbance.",
      "Impulsivity in at least two areas that are self-damaging (e.g., spending, sex, substance abuse, reckless driving).",
      "Recurrent suicidal behavior or self-mutilating behavior.",
      "Affective instability due to a marked reactivity of mood.",
      "Chronic feelings of emptiness.",
      "Inappropriate, intense anger."
    ],
    "causes": [
      "Likely a combination of genetics, brain chemistry, and environmental factors like a history of childhood trauma."
    ],
    "treatment": [
      "Dialectical Behavior Therapy (DBT) was developed specifically for BPD and is the gold standard.",
      "Other therapies like Mentalization-Based Treatment (MBT) are also effective.",
      "Medications: No drugs are FDA-approved for BPD, but they may be used to treat co-occurring symptoms like depression, impulsivity, or anxiety."
    ],
    "selfCare": [
      "Learn about BPD to understand your triggers and symptoms.",
      "Learn healthy ways to manage emotional pain instead of self-harm.",
      "Get regular exercise to help manage mood and stress.",
      "Avoid drugs and alcohol.",
      "Lifestyle Recommendations",
      "Stick with your treatment. It can take time to feel better.",
      "Practice mindfulness and distress tolerance skills learned in therapy."
    ],
    "prevention": [
      "It may not be possible to prevent BPD, but early intervention for children and adolescents showing signs of the disorder can be helpful."
    ],
    "riskFactors": [
      "Primary: Family history, brain abnormalities.",
      "Secondary: Traumatic life events (e.g., abuse, neglect, separation in childhood)."
    ],
    "warningSigns": [
      "Self-harming behavior (cutting, burning).",
      "Suicidal threats or attempts.",
      "Feelings of intense emptiness or abandonment."
    ]
  },
  {
    "id": "panic-disorder",
    "name": "Panic Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common: Affects about 2-3% of the population in a given year.",
    "description": "Panic Disorder is an anxiety disorder characterized by recurrent, unexpected panic attacks. A panic attack is a sudden episode of intense fear that triggers severe physical reactions when there is no real danger or apparent cause. People with panic disorder often live in fear of having another attack.",
    "desc": "Panic Disorder is an anxiety disorder characterized by recurrent, unexpected panic attacks. A panic attack is a sudden episode of intense fear that triggers severe physical reactions when there is no real danger or apparent cause. People with panic disorder often live in fear of having another attack.",
    "symptoms": [
      "Palpitations or accelerated heart rate.",
      "Sweating.",
      "Trembling or shaking.",
      "Sensations of shortness of breath.",
      "Feelings of choking.",
      "Chest pain or discomfort.",
      "Nausea.",
      "Dizziness or lightheadedness."
    ],
    "causes": [
      "The exact cause is unknown, but it may involve genetics, major stress, or a temperament that is more sensitive to stress."
    ],
    "treatment": [
      "Psychotherapy: CBT is highly effective. It helps you understand panic attacks and learn coping skills.",
      "Medications: Antidepressants (SSRIs, SNRIs) are preferred for long-term prevention. Benzodiazepines may be used for immediate relief but are generally avoided for regular use."
    ],
    "selfCare": [
      "Stick to your treatment plan.",
      "Join a support group.",
      "Avoid caffeine, alcohol, and recreational drugs, which can trigger or worsen panic attacks.",
      "Practice stress management and relaxation techniques.",
      "Get regular physical activity.",
      "Lifestyle Recommendations",
      "Prioritize sleep."
    ],
    "prevention": [
      "There's no sure way to prevent panic disorder, but getting treatment for anxiety as soon as it appears may help."
    ],
    "riskFactors": [
      "Primary: Family history, major life stress.",
      "Secondary: History of physical or sexual abuse, significant life changes."
    ],
    "warningSigns": [
      "A panic attack can feel like a heart attack. Go to the emergency room if you experience chest pain, shortness of breath, or fainting for the first time to rule out a cardiac event. For known panic disorder, seek therapy to break the cycle of fear."
    ]
  },
  {
    "id": "autism-spectrum-disorder-asd",
    "name": "Autism Spectrum Disorder (ASD)",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common: Affects about 1 in 36 children.",
    "description": "Autism Spectrum Disorder (ASD) is a complex neurodevelopmental disorder that affects communication, behavior, and social interaction. The term \"spectrum\" reflects the wide variation in challenges and strengths possessed by each person with autism.",
    "desc": "Autism Spectrum Disorder (ASD) is a complex neurodevelopmental disorder that affects communication, behavior, and social interaction. The term \"spectrum\" reflects the wide variation in challenges and strengths possessed by each person with autism.",
    "symptoms": [
      "Difficulties with social-emotional reciprocity (e.g., back-and-forth conversation).",
      "Deficits in nonverbal communicative behaviors (e.g., eye contact, body language).",
      "Difficulties developing and maintaining relationships.",
      "Stereotyped or repetitive movements, speech, or use of objects.",
      "Insistence on sameness, inflexible adherence to routines.",
      "Highly restricted, fixated interests that are abnormal in intensity or focus.",
      "Hyper- or hyporeactivity to sensory input."
    ],
    "causes": [
      "The cause is not known, but it is believed to be a combination of genetic and environmental factors that affect early brain development. There is no link between vaccines and autism."
    ],
    "treatment": [
      "There is no \"cure.\" Treatment focuses on therapies to improve skills.",
      "Behavioral Interventions: Applied Behavior Analysis (ABA) is a common approach.",
      "Educational Therapies.",
      "Speech, Occupational, and Physical Therapy.",
      "Family Therapies to teach parents how to interact with their child.",
      "Medications may be used to manage co-occurring symptoms like anxiety, depression, or hyperactivity."
    ],
    "selfCare": [
      "(For parents/caregivers)",
      "Learn about autism to understand your child's needs.",
      "Be consistent with therapies and routines.",
      "Find nonverbal ways to connect (through play, touch).",
      "Pay attention to your child's sensory sensitivities.",
      "Lifestyle Recommendations",
      "Take care of yourself as a caregiver to avoid burnout.",
      "Connect with other families with children who have ASD."
    ],
    "prevention": [
      "There is no known way to prevent ASD. The focus is on early diagnosis and intervention to improve outcomes."
    ],
    "riskFactors": [
      "Primary: Having a sibling with ASD, genetic conditions (e.g., Fragile X syndrome).",
      "Secondary: Advanced parental age, low birth weight."
    ],
    "warningSigns": [
      "No babbling or pointing by 12 months.",
      "No single words by 16 months.",
      "No two-word spontaneous phrases by 24 months.",
      "Loss of language or social skills at any age.",
      "Poor eye contact, lack of response to name, repetitive behaviors."
    ]
  },
  {
    "id": "attention-deficit-hyperactivity-disorder-adhd",
    "name": "Attention Deficit Hyperactivity Disorder (ADHD)",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common: Affects about 5-8% of children and about 2.5% of adults.",
    "description": "Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder characterized by a persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development.",
    "desc": "Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder characterized by a persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with functioning or development.",
    "symptoms": [
      "Inattention: Makes careless mistakes, difficulty sustaining attention, does not seem to listen, fails to finish tasks, difficulty organizing, avoids tasks requiring mental effort, loses things, easily distracted, forgetful.",
      "Hyperactivity/Impulsivity: Fidgets, leaves seat, runs/climbs excessively, unable to play quietly, \"on the go,\" talks excessively, blurts answers, difficulty waiting turn, interrupts."
    ],
    "causes": [
      "The exact cause is unknown but involves genetics, differences in brain anatomy and function, and environmental factors. It is linked to dopamine and norepinephrine pathways."
    ],
    "treatment": [
      "Medication: Stimulants (e.g., methylphenidate, amphetamines) are first-line and most effective. Non-stimulants (e.g., atomoxetine) are also used.",
      "Behavioral Therapy: To teach coping skills and improve organization.",
      "Combination of medication and therapy is often most effective."
    ],
    "selfCare": [
      "Use planners, reminders, and routines to stay organized.",
      "Break down large tasks into smaller, manageable steps.",
      "Minimize distractions in your work/study environment.",
      "Get regular physical exercise.",
      "Lifestyle Recommendations",
      "Ensure adequate sleep.",
      "Eat a balanced diet."
    ],
    "prevention": [
      "There is no known way to prevent ADHD, but early diagnosis and management can prevent many of the associated difficulties."
    ],
    "riskFactors": [
      "Primary: Genetics (strongly heritable).",
      "Secondary: Premature birth, low birth weight, brain injury, prenatal exposure to alcohol or tobacco."
    ],
    "warningSigns": [
      "ADHD itself is not an emergency, but it can lead to dangerous impulsivity. Seek evaluation if symptoms cause significant problems at school, work, or in relationships."
    ]
  },
  {
    "id": "narcolepsy",
    "name": "Narcolepsy",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Rare: Affects about 1 in 2,000 people.",
    "description": "Narcolepsy is a chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep. It often includes cataplexy (a sudden loss of muscle tone triggered by strong emotions).",
    "desc": "Narcolepsy is a chronic sleep disorder characterized by overwhelming daytime drowsiness and sudden attacks of sleep. It often includes cataplexy (a sudden loss of muscle tone triggered by strong emotions).",
    "symptoms": [
      "Excessive Daytime Sleepiness (EDS): The primary symptom.",
      "Cataplexy: Sudden, brief loss of muscle control while awake (e.g., knee buckling, head droop).",
      "Sleep Paralysis: Temporary inability to move or speak when falling asleep or waking up.",
      "Hypnagogic Hallucinations: Vivid, dream-like experiences when falling asleep."
    ],
    "causes": [
      "The loss of hypocretin-producing neurons in the brain. The cause is thought to be autoimmune in most cases."
    ],
    "treatment": [
      "Stimulants (e.g., modafinil, armodafinil) or Xyrem (sodium oxybate) for EDS and cataplexy.",
      "Antidepressants (e.g., SSRIs) to help manage cataplexy.",
      "Scheduled naps can be helpful."
    ],
    "selfCare": [
      "Stick to a strict sleep schedule.",
      "Take short, scheduled naps.",
      "Avoid caffeine or alcohol close to bedtime.",
      "Exercise regularly.",
      "Lifestyle Recommendations",
      "Inform your employer/school about your condition.",
      "Do not drive until your sleepiness is well-controlled."
    ],
    "prevention": [
      "There is no known way to prevent narcolepsy."
    ],
    "riskFactors": [
      "Primary: Family history, low levels of hypocretin (a brain chemical that regulates sleep).",
      "Secondary: Age (typically begins in teens or 20s), certain genetic markers."
    ],
    "warningSigns": [
      "Narcolepsy can be dangerous if a sleep attack occurs during activities like driving. Seek diagnosis and treatment if you experience uncontrollable sleepiness."
    ]
  },
  {
    "id": "vascular-dementia",
    "name": "Vascular Dementia",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common, especially in people with cardiovascular risk factors.",
    "description": "Vascular Dementia is a general term describing problems with reasoning, planning, judgment, memory, and other thought processes caused by brain damage from impaired blood flow to the brain. It is the second most common cause of dementia after Alzheimer's.",
    "desc": "Vascular Dementia is a general term describing problems with reasoning, planning, judgment, memory, and other thought processes caused by brain damage from impaired blood flow to the brain. It is the second most common cause of dementia after Alzheimer's.",
    "symptoms": [
      "Symptoms can vary depending on the brain area affected.",
      "Confusion.",
      "Difficulty paying attention and concentrating.",
      "Problems with short-term memory.",
      "Difficulty with organization and planning.",
      "Slowed thinking.",
      "Depression or apathy.",
      "Unsteady gait."
    ],
    "causes": [
      "Caused by conditions that damage blood vessels in the brain, reducing circulation. This includes strokes, small vessel disease, and atherosclerosis."
    ],
    "treatment": [
      "Managing underlying conditions: Controlling blood pressure, cholesterol, and diabetes to prevent further damage.",
      "Medications for Alzheimer's (e.g., donepezil) may offer some benefit.",
      "Therapy: Physical, occupational, and speech therapy as needed."
    ],
    "selfCare": [
      "Manage cardiovascular risk factors aggressively.",
      "Stay physically and mentally active.",
      "Eat a heart-healthy diet (e.g., Mediterranean diet).",
      "Lifestyle Recommendations",
      "Don't smoke.",
      "Limit alcohol."
    ],
    "prevention": [
      "Preventing stroke and heart disease through a healthy lifestyle is the best way to prevent vascular dementia."
    ],
    "riskFactors": [
      "Primary: Stroke, hypertension, high cholesterol, diabetes, smoking.",
      "Secondary: Age, heart disease, atrial fibrillation."
    ],
    "warningSigns": [
      "The onset can be sudden after a major stroke. Seek immediate medical attention for signs of a stroke (B.E. F.A.S.T.)."
    ]
  },
  {
    "id": "alzheimers-disease",
    "name": "Alzheimer's Disease",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "The most common cause of dementia, affecting over 6 million Americans.",
    "description": "Alzheimer's Disease is an irreversible, progressive brain disorder that slowly destroys memory and thinking skills, and eventually, the ability to carry out the simplest tasks. It is the most common cause of dementia.",
    "desc": "Alzheimer's Disease is an irreversible, progressive brain disorder that slowly destroys memory and thinking skills, and eventually, the ability to carry out the simplest tasks. It is the most common cause of dementia.",
    "symptoms": [
      "Early: Memory loss, difficulty with problem-solving, confusion with time/place, challenges completing familiar tasks.",
      "Middle: Worsening memory, mood/personality changes, getting lost, difficulty with language.",
      "Late: Inability to communicate, need for full-time care, physical decline (swallowing, walking)."
    ],
    "causes": [
      "The exact cause is unknown but is characterized by the buildup of amyloid plaques and tau tangles in the brain, leading to nerve cell damage and death."
    ],
    "treatment": [
      "Medications: Cholinesterase inhibitors (e.g., donepezil) and memantine can help manage symptoms for a limited time.",
      "Newer disease-modifying therapies (e.g., lecanemab) can slow progression in early-stage disease.",
      "Supportive care and safety management are crucial."
    ],
    "selfCare": [
      "(For caregivers)",
      "Establish routines.",
      "Ensure a safe environment (remove trip hazards, install locks).",
      "Focus on communication: Use simple words, maintain eye contact.",
      "Lifestyle Recommendations (For prevention)",
      "Stay physically and socially active.",
      "Eat a healthy diet.",
      "Manage cardiovascular risk factors."
    ],
    "prevention": [
      "No definitive prevention, but a healthy lifestyle may reduce risk or delay onset."
    ],
    "riskFactors": [
      "Primary: Age (greatest risk factor), family history, genetics (APOE-e4 allele).",
      "Secondary: History of head trauma, cardiovascular disease risk factors."
    ],
    "warningSigns": [
      "A diagnosis should be sought when memory loss disrupts daily life. It is a progressive condition, not an acute emergency."
    ]
  },
  {
    "id": "brief-psychotic-disorder",
    "name": "Brief Psychotic Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Rare.",
    "description": "Brief Psychotic Disorder is a sudden, short-term disorder characterized by psychotic symptoms (delusions, hallucinations, disorganized speech/behavior) lasting at least one day but less than one month, with an eventual full return to normal functioning. It is often triggered by a major stressor.",
    "desc": "Brief Psychotic Disorder is a sudden, short-term disorder characterized by psychotic symptoms (delusions, hallucinations, disorganized speech/behavior) lasting at least one day but less than one month, with an eventual full return to normal functioning. It is often triggered by a major stressor.",
    "symptoms": [
      "Delusions (fixed false beliefs).",
      "Hallucinations (hearing or seeing things that aren't there).",
      "Disorganized speech (incoherent or irrational talking).",
      "Grossly disorganized or catatonic behavior."
    ],
    "causes": [
      "Often a severe reaction to extreme stress. The exact biological mechanism is not well understood."
    ],
    "treatment": [
      "Hospitalization may be necessary for safety.",
      "Antipsychotic Medications to quickly control symptoms.",
      "Psychotherapy to help process the triggering stressor after the acute episode."
    ],
    "selfCare": [
      "After recovery, focus on stress management.",
      "Get adequate rest.",
      "Avoid drugs and alcohol.",
      "Lifestyle Recommendations",
      "Build a strong support system."
    ],
    "prevention": [
      "There is no known way to prevent it, but managing stress and seeking support during crises may help."
    ],
    "riskFactors": [
      "Primary: Experiencing a major stressor (e.g., trauma, loss of a loved one).",
      "Secondary: Pre-existing personality disorders, postpartum period."
    ],
    "warningSigns": [
      "Psychosis is a psychiatric emergency. Seek immediate help if someone experiences a sudden break from reality, as they may be a danger to themselves or others."
    ]
  },
  {
    "id": "social-anxiety-disorder",
    "name": "Social Anxiety Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common.",
    "description": "Social Anxiety Disorder (Social Phobia) is an intense, persistent fear of being watched, judged, embarrassed, or humiliated in social or performance situations. This fear can interfere with work, school, and other daily activities.",
    "desc": "Social Anxiety Disorder (Social Phobia) is an intense, persistent fear of being watched, judged, embarrassed, or humiliated in social or performance situations. This fear can interfere with work, school, and other daily activities.",
    "symptoms": [
      "Fear of situations where you may be judged.",
      "Worrying about embarrassing or humiliating yourself.",
      "Intense fear of interacting with strangers.",
      "Avoidance of social situations.",
      "Physical symptoms: Blushing, sweating, trembling, nausea, difficulty talking."
    ],
    "causes": [
      "A combination of genetics, brain structure (overactive amygdala), and environment."
    ],
    "treatment": [
      "Psychotherapy: CBT, particularly exposure therapy, is highly effective.",
      "Medications: Antidepressants (SSRIs, SNRIs) are first-line. Beta-blockers can help with performance anxiety."
    ],
    "selfCare": [
      "Practice the skills you learn in therapy.",
      "Join a support group.",
      "Avoid alcohol as a coping mechanism.",
      "Get enough sleep and exercise.",
      "Lifestyle Recommendations",
      "Challenge negative thoughts by setting small, achievable social goals."
    ],
    "prevention": [
      "There's no way to prevent social anxiety disorder, but early intervention can reduce its impact."
    ],
    "riskFactors": [
      "Primary: Family history, negative social experiences (e.g., bullying).",
      "Secondary: Shy temperament, having a noticeable physical condition."
    ],
    "warningSigns": [
      "The anxiety can be debilitating. Seek help if fear of social situations causes you to avoid work, school, or socializing, leading to isolation."
    ]
  },
  {
    "id": "opioid-use-disorder",
    "name": "Opioid Use Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "A major public health crisis.",
    "description": "Opioid Use Disorder (OUD) is a pattern of opioid use leading to significant impairment or distress. It is characterized by a powerful, compulsive urge to use opioid drugs, even when they are no longer required medically.",
    "desc": "Opioid Use Disorder (OUD) is a pattern of opioid use leading to significant impairment or distress. It is characterized by a powerful, compulsive urge to use opioid drugs, even when they are no longer required medically.",
    "symptoms": [
      "Taking opioids in larger amounts or over a longer period than intended.",
      "Persistent desire or unsuccessful efforts to cut down.",
      "Craving.",
      "Failure to fulfill major role obligations.",
      "Continued use despite social/interpersonal problems.",
      "Tolerance and withdrawal."
    ],
    "causes": [
      "Opioids hijack the brain's reward system. Chronic use leads to changes in brain chemistry that drive compulsive use."
    ],
    "treatment": [
      "Medication for Opioid Use Disorder (MOUD): The gold standard. Includes methadone, buprenorphine, and naltrexone.",
      "Counseling and Behavioral Therapies.",
      "Overdose reversal: Naloxone (Narcan)."
    ],
    "selfCare": [
      "Adherence to MOUD is critical for recovery.",
      "Avoid triggers (people, places, things associated with drug use).",
      "Build a new social network in recovery.",
      "Address co-occurring mental health conditions.",
      "Lifestyle Recommendations",
      "Engage in healthy activities and hobbies."
    ],
    "prevention": [
      "Proper prescribing of pain medications.",
      "Safe storage and disposal of unused medications.",
      "Education about the risks of opioids."
    ],
    "riskFactors": [
      "Primary: History of substance misuse, genetics.",
      "Secondary: Chronic pain, mental health disorders, poverty, trauma."
    ],
    "warningSigns": [
      "Opioid overdose is a medical emergency. Call 911 for: slow/stopped breathing, unresponsiveness, pinpoint pupils. Administer naloxone (Narcan) if available."
    ]
  },
  {
    "id": "adjustment-disorder-with-anxiety",
    "name": "Adjustment Disorder with Anxiety",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common.",
    "description": "Adjustment Disorder is a short-term condition that occurs when a person has significant difficulty coping with or adjusting to a specific, identifiable life stressor (e.g., divorce, job loss, illness). The \"with anxiety\" specifier means the predominant symptoms are nervousness, worry, and jitteriness.",
    "desc": "Adjustment Disorder is a short-term condition that occurs when a person has significant difficulty coping with or adjusting to a specific, identifiable life stressor (e.g., divorce, job loss, illness). The \"with anxiety\" specifier means the predominant symptoms are nervousness, worry, and jitteriness.",
    "symptoms": [
      "Feeling worried, anxious, nervous.",
      "Feeling overwhelmed.",
      "Difficulty concentrating.",
      "Tearfulness.",
      "Withdrawal from social activities.",
      "Symptoms occur within 3 months of the stressor and resolve within 6 months of the stressor ending."
    ],
    "causes": [
      "An unhealthy or excessive reaction to an identifiable psychosocial stressor."
    ],
    "treatment": [
      "Psychotherapy (e.g., CBT, talk therapy) is the primary treatment.",
      "Short-term use of medications (e.g., anti-anxiety drugs) may be considered for severe symptoms."
    ],
    "selfCare": [
      "Talk to supportive friends and family.",
      "Engage in stress-reducing activities (exercise, hobbies).",
      "Maintain a routine.",
      "Get enough sleep.",
      "Lifestyle Recommendations",
      "Build resilience through healthy coping skills."
    ],
    "prevention": [
      "Strong social support and good coping skills can make a person less vulnerable."
    ],
    "riskFactors": [
      "Primary: Experiencing a significant life stressor.",
      "Secondary: Lack of social support, multiple simultaneous stressors."
    ],
    "warningSigns": [
      "While distressing, it is typically not an emergency. However, it can lead to suicidal thoughts in severe cases. Seek help if you feel overwhelmed."
    ]
  },
  {
    "id": "delusional-disorder",
    "name": "Delusional Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Rare.",
    "description": "Delusional Disorder is a psychotic disorder characterized by the presence of one or more delusions (fixed, false beliefs) that persist for at least one month. Apart from the impact of the delusion, functioning is not markedly impaired, and behavior is not obviously bizarre.",
    "desc": "Delusional Disorder is a psychotic disorder characterized by the presence of one or more delusions (fixed, false beliefs) that persist for at least one month. Apart from the impact of the delusion, functioning is not markedly impaired, and behavior is not obviously bizarre.",
    "symptoms": [
      "Persecutory: Being followed, poisoned, conspired against.",
      "Jealous: That a spouse or lover is unfaithful.",
      "Erotomanic: That another person, often of higher status, is in love with them.",
      "Somatic: A preoccupation with health and organ function."
    ],
    "causes": [
      "The cause is unknown but likely involves genetic, biological, and environmental factors."
    ],
    "treatment": [
      "Antipsychotic Medications.",
      "Psychotherapy: CBT can help manage the distress caused by the delusions. Building trust is key.",
      "Treatment can be challenging as the person often lacks insight into their condition."
    ],
    "selfCare": [
      "Take medication as prescribed.",
      "Avoid alcohol and drugs.",
      "Attend therapy regularly.",
      "Lifestyle Recommendations",
      "Stay connected with supportive family and friends."
    ],
    "prevention": [
      "There is no known way to prevent delusional disorder."
    ],
    "riskFactors": [
      "Primary: Family history of schizophrenia or delusional disorder.",
      "Secondary: Advanced age, social isolation, sensory impairments (e.g., deafness)."
    ],
    "warningSigns": [
      "The delusion can sometimes lead to dangerous behavior (e.g., a person with persecutory delusions may confront their perceived persecutor). Seek psychiatric evaluation."
    ]
  },
  {
    "id": "somatic-symptom-disorder",
    "name": "Somatic Symptom Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common in primary care settings.",
    "description": "Somatic Symptom Disorder is a mental health condition in which a person feels extremely anxious about physical symptoms (e.g., pain, weakness, shortness of breath) and has a disproportionate and persistent level of worry about their health. The symptoms may or may not be associated with a diagnosed medical condition.",
    "desc": "Somatic Symptom Disorder is a mental health condition in which a person feels extremely anxious about physical symptoms (e.g., pain, weakness, shortness of breath) and has a disproportionate and persistent level of worry about their health. The symptoms may or may not be associated with a diagnosed medical condition.",
    "symptoms": [
      "One or more somatic symptoms that are distressing or disruptive to daily life.",
      "Persistent high level of anxiety about health.",
      "Disproportionate and persistent concerns about the seriousness of symptoms.",
      "Devoting excessive time and energy to health concerns."
    ],
    "causes": [
      "The exact cause is unknown, but it may involve a heightened awareness of bodily sensations, which are then interpreted as a sign of serious illness."
    ],
    "treatment": [
      "Regular, scheduled appointments with a single primary care doctor to avoid unnecessary tests and procedures.",
      "Psychotherapy: CBT is effective in changing the thoughts and behaviors that fuel the anxiety.",
      "Treatment for co-occurring anxiety or depression."
    ],
    "selfCare": [
      "Practice stress management (mindfulness, relaxation).",
      "Engage in regular physical activity as tolerated.",
      "Stay involved in work and social activities to avoid focusing on symptoms.",
      "Lifestyle Recommendations",
      "Limit health-related internet searches."
    ],
    "prevention": [
      "Not known, but early intervention for anxiety may help."
    ],
    "riskFactors": [
      "Primary: Anxiety or depression.",
      "Secondary: History of childhood illness, trauma, or neglect."
    ],
    "warningSigns": [
      "The disorder leads to significant distress and impairment. It is not an acute emergency, but the suffering is real and requires treatment."
    ]
  },
  {
    "id": "tourette-syndrome",
    "name": "Tourette Syndrome",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Relatively uncommon.",
    "description": "Tourette Syndrome is a neurological disorder characterized by repetitive, stereotyped, involuntary movements and vocalizations called tics. The tics typically begin in childhood and can vary in type, frequency, and severity.",
    "desc": "Tourette Syndrome is a neurological disorder characterized by repetitive, stereotyped, involuntary movements and vocalizations called tics. The tics typically begin in childhood and can vary in type, frequency, and severity.",
    "symptoms": [
      "Motor Tics: Eye blinking, head jerking, shoulder shrugging, facial grimacing.",
      "Vocal Tics: Grunting, throat clearing, shouting, coprolalia (involuntary utterance of obscenities) is rare.",
      "Tics often wax and wane in severity."
    ],
    "causes": [
      "A complex disorder likely caused by a combination of genetic and environmental factors affecting brain circuits and neurotransmitters (dopamine)."
    ],
    "treatment": [
      "Many people do not require medication if tics are mild.",
      "Behavioral Therapy: Comprehensive Behavioral Intervention for Tics (CBIT) is first-line.",
      "Medications: Neuroleptics (e.g., haloperidol, risperidone) or alpha-2 agonists (e.g., clonidine) for more severe tics."
    ],
    "selfCare": [
      "Get adequate sleep and manage stress, as these can worsen tics.",
      "Educate friends, teachers, and coworkers about the condition.",
      "Lifestyle Recommendations",
      "Don't focus on or call attention to the tics.",
      "Provide a supportive environment."
    ],
    "prevention": [
      "There is no known way to prevent Tourette Syndrome."
    ],
    "riskFactors": [
      "Primary: Family history.",
      "Secondary: Male sex (3-4 times more common in boys)."
    ],
    "warningSigns": [
      "Tourette's is not an emergency, but severe tics can be painful or socially debilitating. Seek evaluation for a child with persistent tics."
    ]
  },
  {
    "id": "antisocial-personality-disorder",
    "name": "Antisocial Personality Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "More common in men.",
    "description": "Antisocial Personality Disorder (ASPD) is a mental health condition in which a person has a long-term pattern of manipulating, exploiting, or violating the rights of others. This behavior is often criminal. It is synonymous with, though not identical to, the term \"sociopathy.\"",
    "desc": "Antisocial Personality Disorder (ASPD) is a mental health condition in which a person has a long-term pattern of manipulating, exploiting, or violating the rights of others. This behavior is often criminal. It is synonymous with, though not identical to, the term \"sociopathy.\"",
    "symptoms": [
      "Failure to conform to social norms/lawful behavior.",
      "Deceitfulness.",
      "Impulsivity or failure to plan ahead.",
      "Irritability and aggressiveness.",
      "Reckless disregard for safety of self or others.",
      "Consistent irresponsibility.",
      "Lack of remorse."
    ],
    "causes": [
      "Believed to be a combination of genetic predisposition and environmental factors like childhood trauma."
    ],
    "treatment": [
      "Extremely difficult to treat due to lack of insight and remorse.",
      "Psychotherapy focused on managing problematic behaviors may be attempted.",
      "There are no medications approved for ASPD, but they may be used for co-occurring conditions."
    ],
    "selfCare": [
      "(This section is not applicable, as individuals with ASPD do not typically engage in self-care for this condition. The focus is on protecting others.)"
    ],
    "prevention": [
      "Early intervention for children with conduct problems may help prevent the development of full ASPD."
    ],
    "riskFactors": [
      "Primary: Diagnosis of Conduct Disorder in childhood, family history.",
      "Secondary: Childhood abuse or neglect, unstable family life."
    ],
    "warningSigns": [
      "Individuals with ASPD can be dangerous and pose a risk to others. They rarely seek help on their own. If you feel threatened by someone with these traits, prioritize your safety."
    ]
  },
  {
    "id": "cyclothymic-disorder",
    "name": "Cyclothymic Disorder",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Relatively rare.",
    "description": "Cyclothymic Disorder (Cyclothymia) is a chronic mood disorder that involves numerous periods of hypomanic symptoms and periods of depressive symptoms. These symptoms are less severe than those of Bipolar I or II but are persistent, lasting for at least two years in adults.",
    "desc": "Cyclothymic Disorder (Cyclothymia) is a chronic mood disorder that involves numerous periods of hypomanic symptoms and periods of depressive symptoms. These symptoms are less severe than those of Bipolar I or II but are persistent, lasting for at least two years in adults.",
    "symptoms": [
      "Hypomanic Symptoms: Periods of elevated mood, inflated self-esteem, decreased need for sleep, increased talkativeness.",
      "Depressive Symptoms: Periods of low mood, loss of interest, feelings of worthlessness.",
      "Symptoms never meet the full criteria for a major depressive or manic episode."
    ],
    "causes": [
      "Likely involves genetics and is considered a part of the bipolar spectrum."
    ],
    "treatment": [
      "Mood Stabilizers (e.g., lithium, valproate).",
      "Atypical Antipsychotics.",
      "Psychotherapy (e.g., CBT, psychoeducation) to help manage mood swings."
    ],
    "selfCare": [
      "Keep a mood chart.",
      "Maintain a regular sleep schedule.",
      "Avoid drugs and alcohol.",
      "Learn your triggers.",
      "Lifestyle Recommendations",
      "Manage stress through healthy outlets."
    ],
    "prevention": [
      "There is no known way to prevent cyclothymia."
    ],
    "riskFactors": [
      "Primary: Family history of bipolar disorder."
    ],
    "warningSigns": [
      "The chronic instability can be distressing and impairing. It also carries a risk of developing full-blown bipolar disorder. Seek evaluation for chronic mood swings."
    ]
  },
  {
    "id": "chronic-insomnia",
    "name": "Chronic Insomnia",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Very common.",
    "description": "Chronic Insomnia is a persistent sleep disorder characterized by difficulty falling asleep, staying asleep, or waking up too early, despite adequate opportunity for sleep. It occurs at least three nights per week for at least three months and causes daytime impairment.",
    "desc": "Chronic Insomnia is a persistent sleep disorder characterized by difficulty falling asleep, staying asleep, or waking up too early, despite adequate opportunity for sleep. It occurs at least three nights per week for at least three months and causes daytime impairment.",
    "symptoms": [
      "Difficulty falling asleep at night.",
      "Waking up during the night.",
      "Waking up too early.",
      "Not feeling well-rested after a night's sleep.",
      "Daytime tiredness, irritability, difficulty paying attention."
    ],
    "causes": [
      "Often begins with a stressor and becomes perpetuated by poor sleep habits and anxiety about sleep itself."
    ],
    "treatment": [
      "Cognitive Behavioral Therapy for Insomnia (CBT-I): The first-line and most effective treatment. It addresses thoughts and behaviors around sleep.",
      "Medications (e.g., zolpidem, eszopiclone) should be used short-term due to side effects and dependency risks."
    ],
    "selfCare": [
      "Stick to a consistent sleep schedule, even on weekends.",
      "Create a relaxing bedtime routine.",
      "Make your bedroom quiet, dark, and cool.",
      "Avoid caffeine, nicotine, and large meals before bed.",
      "Lifestyle Recommendations",
      "Get regular exercise (but not too close to bedtime).",
      "Manage stress."
    ],
    "prevention": [
      "Good sleep hygiene from a young age can help prevent chronic insomnia."
    ],
    "riskFactors": [
      "Primary: Stress, anxiety, depression.",
      "Secondary: Irregular sleep schedule, poor sleep habits, certain medications, chronic pain."
    ],
    "warningSigns": [
      "Chronic sleep deprivation can lead to serious health problems and accidents. Seek help if poor sleep affects your daytime functioning."
    ]
  },
  {
    "id": "seasonal-affective-disorder-sad",
    "name": "Seasonal Affective Disorder (SAD)",
    "category": "Mental Health",
    "severity": "Medium",
    "prevalence": "Common, especially in northern latitudes with less winter sunlight.",
    "description": "Seasonal Affective Disorder (SAD) is a type of depression that's related to changes in seasons. SAD begins and ends at about the same times every year, with symptoms typically starting in the fall and continuing into the winter months.",
    "desc": "Seasonal Affective Disorder (SAD) is a type of depression that's related to changes in seasons. SAD begins and ends at about the same times every year, with symptoms typically starting in the fall and continuing into the winter months.",
    "symptoms": [
      "Low energy.",
      "Hypersomnia (oversleeping).",
      "Overeating, carbohydrate cravings.",
      "Weight gain.",
      "Social withdrawal.",
      "Spring/Summer SAD (less common) often includes insomnia, poor appetite, and anxiety."
    ],
    "causes": [
      "Believed to be related to reduced sunlight, which can disrupt your body's internal clock (circadian rhythm) and reduce serotonin and melatonin levels."
    ],
    "treatment": [
      "Light Therapy: Sitting in front of a special bright light box for 20-30 minutes each morning.",
      "Psychotherapy (CBT).",
      "Antidepressants (SSRIs).",
      "Vitamin D supplementation."
    ],
    "selfCare": [
      "Get outside during daylight hours.",
      "Make your environment sunnier and brighter.",
      "Exercise regularly.",
      "Practice stress management.",
      "Lifestyle Recommendations",
      "Plan a winter vacation to a sunny location if possible."
    ],
    "prevention": [
      "Starting light therapy or other treatments early in the season (before symptoms hit) may prevent SAD."
    ],
    "riskFactors": [
      "Primary: Living far from the equator, female sex, family history."
    ],
    "warningSigns": [
      "Like other forms of depression, SAD can lead to suicidal thoughts. Seek help if your winter mood drop is severe."
    ]
  },
  {
    "id": "temporal-lobe-epilepsy",
    "name": "Temporal Lobe Epilepsy",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "The most common epilepsy syndrome in adults.",
    "description": "Temporal Lobe Epilepsy (TLE) is the most common form of focal epilepsy. The seizures originate in the temporal lobes of the brain, which are involved in memory, emotion, and processing sensory input.",
    "desc": "Temporal Lobe Epilepsy (TLE) is the most common form of focal epilepsy. The seizures originate in the temporal lobes of the brain, which are involved in memory, emotion, and processing sensory input.",
    "symptoms": [
      "Focal Aware Seizures (simple partial): May involve a rising sensation in the stomach, déjà vu, fear, joy, or unusual smells/tastes.",
      "Focal Impaired Awareness Seizures (complex partial): The person may stare blankly, be unresponsive, and perform automatic, repetitive movements (automatisms) like lip-smacking or fumbling."
    ],
    "causes": [
      "Often linked to mesial temporal sclerosis (scarring in the hippocampus). Other causes include tumors, strokes, or malformations of cortical development."
    ],
    "treatment": [
      "Anti-seizure Medications: The first-line treatment (e.g., carbamazepine, levetiracetam).",
      "Epilepsy Surgery: If medications fail, resection of the seizure focus can be curative.",
      "Vagus Nerve Stimulation (VNS) or Responsive Neurostimulation (RNS) for inoperable cases."
    ],
    "selfCare": [
      "Take medication consistently.",
      "Get adequate sleep (sleep deprivation is a common trigger).",
      "Limit alcohol.",
      "Wear a medical alert bracelet.",
      "Lifestyle Recommendations",
      "Identify and avoid personal seizure triggers."
    ],
    "prevention": [
      "There is no known way to prevent TLE, but preventing head injuries may reduce risk."
    ],
    "riskFactors": [
      "Primary: Febrile seizures in childhood, head trauma, brain infections.",
      "Secondary: Family history, structural abnormalities in the temporal lobe (e.g., hippocampal sclerosis)."
    ],
    "warningSigns": [
      "A seizure that lasts more than 5 minutes or repeated seizures without regaining consciousness (status epilepticus) is a medical emergency."
    ]
  },
  {
    "id": "parkinsons-disease",
    "name": "Parkinson's Disease",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Common neurodegenerative disease, second only to Alzheimer's.",
    "description": "Parkinson's Disease is a progressive neurodegenerative disorder that affects movement. It develops gradually, often starting with a barely noticeable tremor in one hand. It is caused by the loss of dopamine-producing neurons in the brain.",
    "desc": "Parkinson's Disease is a progressive neurodegenerative disorder that affects movement. It develops gradually, often starting with a barely noticeable tremor in one hand. It is caused by the loss of dopamine-producing neurons in the brain.",
    "symptoms": [
      "Tremor at rest (\"pill rolling\").",
      "Bradykinesia (slowness of movement).",
      "Muscle rigidity.",
      "Postural instability (impaired balance).",
      "Loss of smell.",
      "Sleep problems.",
      "Constipation.",
      "Depression and anxiety."
    ],
    "causes": [
      "The loss of dopamine-producing cells in the substantia nigra region of the brain. The cause of this cell death is largely unknown."
    ],
    "treatment": [
      "Levodopa/Carbidopa: The most effective medication to replace dopamine.",
      "Dopamine Agonists (e.g., pramipexole).",
      "MAO-B Inhibitors.",
      "Deep Brain Stimulation (DBS) surgery for advanced cases.",
      "Physical, Occupational, and Speech Therapy."
    ],
    "selfCare": [
      "Stay active with exercises that improve balance and flexibility (e.g., tai chi).",
      "Eat a high-fiber diet to prevent constipation.",
      "Fall-proof your home.",
      "Lifestyle Recommendations",
      "Join a support group."
    ],
    "prevention": [
      "No known prevention."
    ],
    "riskFactors": [
      "Primary: Age (usually begins around age 60).",
      "Secondary: Genetics, exposure to certain toxins."
    ],
    "warningSigns": [
      "A progressive condition, not an acute emergency. However, advanced stages can lead to falls and swallowing difficulties that require immediate attention."
    ]
  },
  {
    "id": "relapsing-remitting-multiple-sclerosis",
    "name": "Relapsing-Remitting Multiple Sclerosis",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "The most common form of MS at diagnosis (about 85% of cases).",
    "description": "Relapsing-Remitting Multiple Sclerosis (RRMS) is the most common course of MS, characterized by clearly defined attacks (relapses) of new or increasing neurologic symptoms. These are followed by periods of partial or complete recovery (remissions), where the disease does not progress.",
    "desc": "Relapsing-Remitting Multiple Sclerosis (RRMS) is the most common course of MS, characterized by clearly defined attacks (relapses) of new or increasing neurologic symptoms. These are followed by periods of partial or complete recovery (remissions), where the disease does not progress.",
    "symptoms": [
      "Vary widely depending on the location of nerve damage.",
      "Numbness or weakness in one or more limbs.",
      "Electric-shock sensations with neck movements (Lhermitte sign).",
      "Tremor, lack of coordination.",
      "Vision problems (optic neuritis).",
      "Fatigue.",
      "Dizziness."
    ],
    "causes": [
      "An autoimmune disorder where the immune system attacks the myelin sheath (the protective covering of nerves) in the central nervous system."
    ],
    "treatment": [
      "Disease-Modifying Therapies (DMTs): To reduce the frequency and severity of relapses and slow disease progression (e.g., interferons, monoclonal antibodies, oral medications).",
      "Corticosteroids: To shorten the duration and severity of acute relapses.",
      "Symptom Management for fatigue, spasticity, pain, etc."
    ],
    "selfCare": [
      "Manage body temperature; heat can worsen symptoms.",
      "Get regular exercise as tolerated.",
      "Eat a balanced diet.",
      "Get enough rest to combat fatigue.",
      "Lifestyle Recommendations",
      "Don't smoke.",
      "Ensure adequate Vitamin D."
    ],
    "prevention": [
      "No known way to prevent MS, but DMTs can prevent future relapses and disability accumulation."
    ],
    "riskFactors": [
      "Primary: Being female, age 20-40, genetics.",
      "Secondary: Vitamin D deficiency, smoking, Epstein-Barr virus infection."
    ],
    "warningSigns": [
      "A severe relapse (e.g., causing significant vision loss or paralysis) requires prompt medical evaluation, often treated with high-dose corticosteroids."
    ]
  },
  {
    "id": "migraine-with-aura",
    "name": "Migraine with Aura",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Common; affects about 1 in 5 migraine sufferers.",
    "description": "Migraine with Aura is a severe, recurring headache that is preceded or accompanied by sensory disturbances known as an \"aura.\" These can include flashes of light, blind spots, tingling in the face or hands, and other neurological symptoms.",
    "desc": "Migraine with Aura is a severe, recurring headache that is preceded or accompanied by sensory disturbances known as an \"aura.\" These can include flashes of light, blind spots, tingling in the face or hands, and other neurological symptoms.",
    "symptoms": [
      "Visual phenomena (seeing shapes, bright spots, flashes of light).",
      "Vision loss.",
      "Pins-and-needles sensations.",
      "Speech or language difficulty.",
      "Throbbing or pulsing pain, usually on one side.",
      "Sensitivity to light, sound, and sometimes smell.",
      "Nausea and vomiting."
    ],
    "causes": [
      "Believed to involve abnormal brain activity affecting nerve signals, chemicals, and blood vessels. The aura is thought to be caused by a wave of electrical activity spreading across the cortex."
    ],
    "treatment": [
      "Acute Treatments: Triptans, NSAIDs, anti-nausea drugs. Triptans are most effective when taken at the onset of the headache phase.",
      "Preventive Treatments: For frequent migraines, medications like beta-blockers, anticonvulsants, or CGRP monoclonal antibodies."
    ],
    "selfCare": [
      "Keep a headache diary to identify triggers.",
      "Rest in a quiet, dark room during an attack.",
      "Apply a cold compress to your head or neck.",
      "Lifestyle Recommendations",
      "Establish a regular sleep schedule.",
      "Eat regular meals and stay hydrated.",
      "Manage stress."
    ],
    "prevention": [
      "Avoiding known triggers and using preventive medications if needed."
    ],
    "riskFactors": [
      "Primary: Family history, female sex.",
      "Secondary: Stress, hormonal changes, certain foods, sleep disturbances."
    ],
    "warningSigns": [
      "A \"thunderclap\" headache (instant, severe peak) or a headache with neurological symptoms like confusion, fever, or weakness could be a sign of a more serious condition like a stroke and requires emergency evaluation."
    ]
  },
  {
    "id": "early-onset-alzheimers-disease",
    "name": "Early-Onset Alzheimer's Disease",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Rare, accounting for about 5-6% of all Alzheimer's cases.",
    "description": "Early-Onset Alzheimer's Disease is a form of Alzheimer's that occurs in people under the age of 65, often between their 40s and 50s. It is rare and can be linked to specific genetic mutations.",
    "desc": "Early-Onset Alzheimer's Disease is a form of Alzheimer's that occurs in people under the age of 65, often between their 40s and 50s. It is rare and can be linked to specific genetic mutations.",
    "symptoms": [
      "Memory loss that disrupts daily life.",
      "Difficulty with planning or problem-solving.",
      "Confusion with time or place.",
      "Difficulty completing familiar tasks.",
      "Changes in mood and personality."
    ],
    "causes": [
      "Often has a stronger genetic component than late-onset Alzheimer's. Autosomal dominant mutations in one of three genes can cause the disease."
    ],
    "treatment": [
      "Same as late-onset Alzheimer's: Cholinesterase inhibitors, memantine, and newer disease-modifying therapies (e.g., lecanemab).",
      "Genetic counseling is highly recommended for the family."
    ],
    "selfCare": [
      "Plan for the future early, including financial and care planning.",
      "Seek support from organizations specializing in young-onset dementia.",
      "Lifestyle Recommendations",
      "Stay physically and mentally active."
    ],
    "prevention": [
      "No known prevention, especially for the genetic forms."
    ],
    "riskFactors": [
      "Primary: Genetics (mutations in APP, PSEN1, or PSEN2 genes).",
      "Secondary: Family history."
    ],
    "warningSigns": [
      "Similar to late-onset Alzheimer's, but the early age of onset often leads to misdiagnosis. Seek a specialist evaluation for progressive memory loss in a young person."
    ]
  }
];
