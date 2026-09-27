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

export const DISEASES_DATA_3: DiseaseItem[] = [
  {
    "id": "hemorrhagic-stroke",
    "name": "Hemorrhagic Stroke",
    "category": "Neurological",
    "severity": "High",
    "prevalence": "Accounts for about 13% of all strokes.",
    "description": "A Hemorrhagic Stroke occurs when a blood vessel in the brain leaks or ruptures, causing bleeding into or around the brain. This bleeding puts pressure on brain cells and damages them. It is less common than ischemic stroke but is more often fatal.",
    "desc": "A Hemorrhagic Stroke occurs when a blood vessel in the brain leaks or ruptures, causing bleeding into or around the brain. This bleeding puts pressure on brain cells and damages them. It is less common than ischemic stroke but is more often fatal.",
    "symptoms": [
      "Sudden numbness or weakness of the face, arm, or leg (especially on one side).",
      "Sudden confusion, trouble speaking or understanding.",
      "Sudden trouble seeing.",
      "Sudden trouble walking, dizziness, loss of balance.",
      "Sudden, severe headache."
    ],
    "causes": [
      "Intracerebral Hemorrhage: Bleeding within the brain tissue, usually from chronic hypertension.",
      "Subarachnoid Hemorrhage: Bleeding into the space between the brain and the surrounding membrane, usually from a ruptured aneurysm."
    ],
    "treatment": [
      "Emergency stabilization: Controlling blood pressure, reducing intracranial pressure.",
      "Reversing any anticoagulant medication.",
      "Surgery: To repair blood vessel malformations (AVM, aneurysm) or to remove the clot and relieve pressure (craniotomy)."
    ],
    "selfCare": [
      "(For recovery and prevention)",
      "Strict blood pressure control.",
      "Participate in stroke rehabilitation (physical, occupational, speech therapy).",
      "Lifestyle Recommendations",
      "Do not smoke.",
      "Eat a heart-healthy diet."
    ],
    "prevention": [
      "Controlling high blood pressure is the single most important thing you can do to prevent hemorrhagic stroke."
    ],
    "riskFactors": [
      "Primary: High blood pressure (the most important risk factor), cerebral amyloid angiopathy.",
      "Secondary: Aneurysms, AVMs, bleeding disorders, use of anticoagulants."
    ],
    "warningSigns": [
      "A sudden, severe \"thunderclap\" headache.",
      "Nausea and vomiting.",
      "Seizures."
    ]
  },
  {
    "id": "bells-palsy",
    "name": "Bell's Palsy",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "The most common cause of acute facial paralysis.",
    "description": "Bell's Palsy is a condition that causes sudden, temporary weakness or paralysis of the muscles on one side of the face. This is due to inflammation or compression of the seventh cranial (facial) nerve. The exact cause is unknown, but it's often linked to a viral infection.",
    "desc": "Bell's Palsy is a condition that causes sudden, temporary weakness or paralysis of the muscles on one side of the face. This is due to inflammation or compression of the seventh cranial (facial) nerve. The exact cause is unknown, but it's often linked to a viral infection.",
    "symptoms": [
      "The weakness or paralysis often comes on suddenly, reaching its peak within 48-72 hours.",
      "Rapid onset of mild weakness to total paralysis on one side of the face.",
      "Facial droop and difficulty making facial expressions.",
      "Drooling.",
      "Pain around the jaw or behind the ear.",
      "Increased sensitivity to sound on the affected side.",
      "Loss of taste.",
      "Headache."
    ],
    "causes": [
      "The leading theory is reactivation of a dormant viral infection (like herpes simplex), which causes inflammation and swelling of the facial nerve."
    ],
    "treatment": [
      "Corticosteroids (e.g., prednisone): Started within 72 hours of symptom onset to reduce nerve inflammation. This is the cornerstone of treatment.",
      "Antiviral Drugs: May be used in severe cases, but evidence is debated.",
      "Eye protection: Using artificial tears, eye patches, and lubricating ointment to protect the cornea if the eye doesn't close completely."
    ],
    "selfCare": [
      "Protect your eye from drying out, especially at night.",
      "Take over-the-counter pain relievers for any discomfort.",
      "Gently massage and exercise your facial muscles as recommended by your doctor or physical therapist.",
      "Lifestyle Recommendations",
      "Be patient; recovery can take weeks to months."
    ],
    "prevention": [
      "There is no known way to prevent Bell's Palsy."
    ],
    "riskFactors": [
      "Primary: Recent viral infection (e.g., herpes simplex, herpes zoster).",
      "Secondary: Diabetes, pregnancy, upper respiratory infections."
    ],
    "warningSigns": [
      "Sudden facial weakness can be a sign of a stroke. It is crucial to seek immediate medical attention to rule out a stroke, which is a life-threatening emergency. Bell's Palsy is a diagnosis of exclusion."
    ]
  },
  {
    "id": "viral-meningitis",
    "name": "Viral Meningitis",
    "category": "Neurological",
    "severity": "High",
    "prevalence": "More common than bacterial meningitis.",
    "description": "Viral Meningitis is an inflammation of the membranes (meninges) surrounding the brain and spinal cord, caused by a viral infection. It is often less severe than bacterial meningitis and most people recover completely on their own.",
    "desc": "Viral Meningitis is an inflammation of the membranes (meninges) surrounding the brain and spinal cord, caused by a viral infection. It is often less severe than bacterial meningitis and most people recover completely on their own.",
    "symptoms": [
      "In infants: Fever, irritability, poor eating, sleepiness, lethargy.",
      "In adults: Fever, headache, stiff neck, sensitivity to light, sleepiness, nausea."
    ],
    "causes": [
      "Most often caused by enteroviruses. Other viruses include herpes simplex, HIV, mumps, and West Nile virus."
    ],
    "treatment": [
      "Supportive Care: Rest, fluids, and over-the-counter pain relievers to reduce fever and relieve body aches.",
      "Hospitalization may be needed for severe cases or for people with weakened immune systems.",
      "Antibiotics are often started until bacterial meningitis is ruled out.",
      "Antiviral medication if a specific virus like herpes is suspected."
    ],
    "selfCare": [
      "Get plenty of rest.",
      "Drink fluids to stay hydrated.",
      "Take pain medication as needed for headache and fever.",
      "Lifestyle Recommendations",
      "Practice good hygiene (handwashing) to prevent the spread of viruses."
    ],
    "prevention": [
      "Vaccination against some causes (measles, mumps, chickenpox, influenza).",
      "Good hygiene, especially handwashing."
    ],
    "riskFactors": [
      "Primary: Age (children under 5 are at higher risk).",
      "Secondary: Weakened immune system, summer and fall seasons (for enteroviruses, the most common cause)."
    ],
    "warningSigns": [
      "Sudden high fever.",
      "Severe headache.",
      "Stiff neck.",
      "Nausea or vomiting.",
      "Sensitivity to light."
    ]
  },
  {
    "id": "herpes-simplex-encephalitis",
    "name": "Herpes Simplex Encephalitis",
    "category": "Neurological",
    "severity": "High",
    "prevalence": "The most common cause of sporadic fatal encephalitis worldwide.",
    "description": "Herpes Simplex Encephalitis (HSE) is a rare but severe and potentially fatal viral infection of the brain caused by the herpes simplex virus (HSV-1, and rarely HSV-2). It causes inflammation and destruction of brain tissue.",
    "desc": "Herpes Simplex Encephalitis (HSE) is a rare but severe and potentially fatal viral infection of the brain caused by the herpes simplex virus (HSV-1, and rarely HSV-2). It causes inflammation and destruction of brain tissue.",
    "symptoms": [
      "Altered mental status (confusion, agitation).",
      "Personality changes.",
      "Speech problems.",
      "Memory loss.",
      "Seizures."
    ],
    "causes": [
      "Most cases are caused by the reactivation of a latent HSV-1 infection that travels to the brain, often affecting the temporal lobes."
    ],
    "treatment": [
      "Intravenous Acyclovir (an antiviral drug): Must be started immediately upon suspicion to reduce mortality and morbidity. It is life-saving.",
      "Supportive care in the hospital, often in the ICU, to manage brain swelling and seizures."
    ],
    "selfCare": [
      "(For recovery)",
      "Rehabilitation (physical, occupational, speech therapy) is often needed due to potential brain damage.",
      "Lifestyle Recommendations",
      "There is no way to prevent the initial HSV infection, but prompt treatment of HSE is critical."
    ],
    "prevention": [
      "No known prevention."
    ],
    "riskFactors": [
      "Primary: HSV infection.",
      "Secondary: Weakened immune system."
    ],
    "warningSigns": [
      "Sudden onset of fever.",
      "Headache.",
      "Confusion, disorientation, or hallucinations.",
      "Seizures.",
      "Focal neurological deficits (e.g., weakness, aphasia)."
    ]
  },
  {
    "id": "guillain-barr-syndrome",
    "name": "Guillain-Barré Syndrome",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Rare.",
    "description": "Guillain-Barré Syndrome (GBS) is a rare disorder in which the body's immune system attacks the peripheral nerves. This leads to rapid-onset muscle weakness, which can progress to paralysis. It is often preceded by an infection.",
    "desc": "Guillain-Barré Syndrome (GBS) is a rare disorder in which the body's immune system attacks the peripheral nerves. This leads to rapid-onset muscle weakness, which can progress to paralysis. It is often preceded by an infection.",
    "symptoms": [
      "Pins-and-needles sensations in the fingers, toes, ankles, or wrists.",
      "Weakness in the legs that spreads to the upper body.",
      "Unsteady walking or inability to walk.",
      "Difficulty with eye or facial movements.",
      "Severe pain (achy or cramp-like).",
      "Difficulty with bladder control or bowel function.",
      "Rapid heart rate and blood pressure fluctuations."
    ],
    "causes": [
      "An autoimmune disorder, often triggered by a preceding bacterial or viral infection that misdirects the immune response to attack the nerves."
    ],
    "treatment": [
      "Plasmapheresis (Plasma Exchange) or Intravenous Immunoglobulin (IVIG): These treatments are equally effective and can stop the immune attack and shorten recovery time.",
      "Supportive care, including a ventilator for respiratory failure and pain management.",
      "Extensive rehabilitation is usually required."
    ],
    "selfCare": [
      "(During recovery)",
      "Be patient; recovery can be slow, from a few weeks to a few years.",
      "Participate fully in physical and occupational therapy.",
      "Lifestyle Recommendations",
      "Focus on nutrition to support healing."
    ],
    "prevention": [
      "There is no known way to prevent GBS."
    ],
    "riskFactors": [
      "Primary: Recent infection (e.g., Campylobacter jejuni, CMV, Epstein-Barr virus).",
      "Secondary: Recent surgery, vaccination (very rare)."
    ],
    "warningSigns": [
      "Tingling or weakness that starts in your feet/legs and spreads upward.",
      "Weakness that is rapidly worsening.",
      "Difficulty breathing, speaking, or swallowing."
    ]
  },
  {
    "id": "huntingtons-disease",
    "name": "Huntington's Disease",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Rare.",
    "description": "Huntington's Disease is a rare, inherited, progressive neurodegenerative disorder that causes the breakdown of nerve cells in the brain. It has a broad impact on a person's functional abilities and usually results in movement, thinking, and psychiatric disorders.",
    "desc": "Huntington's Disease is a rare, inherited, progressive neurodegenerative disorder that causes the breakdown of nerve cells in the brain. It has a broad impact on a person's functional abilities and usually results in movement, thinking, and psychiatric disorders.",
    "symptoms": [
      "Movement Disorders: Chorea (involuntary jerking or writhing movements), muscle rigidity, dystonia, impaired gait and posture.",
      "Cognitive Disorders: Difficulty organizing and focusing, lack of flexibility, lack of impulse control, slowness in processing thoughts.",
      "Psychiatric Disorders: Depression, OCD, mania, bipolar disorder."
    ],
    "causes": [
      "A genetic mutation in the HTT gene, which leads to the production of an abnormally long huntingtin protein that is toxic to nerve cells."
    ],
    "treatment": [
      "No cure exists. Treatment is focused on managing symptoms.",
      "Medications to control movement and psychiatric symptoms.",
      "Therapy: Physical, occupational, and speech therapy."
    ],
    "selfCare": [
      "Maintain a healthy and active lifestyle for as long as possible.",
      "Use assistive devices as recommended to maintain independence.",
      "Lifestyle Recommendations",
      "Genetic counseling is crucial for family members."
    ],
    "prevention": [
      "There is no way to prevent the disease if the gene is inherited. Pre-implantation genetic diagnosis can be used to prevent passing the gene to children."
    ],
    "riskFactors": [
      "Primary: Having a parent with Huntington's disease. It is an autosomal dominant disorder."
    ],
    "warningSigns": [
      "A progressive condition. The onset of symptoms is a life-changing event that requires comprehensive planning and care."
    ]
  },
  {
    "id": "spastic-cerebral-palsy",
    "name": "Spastic Cerebral Palsy",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "The most common motor disability in childhood.",
    "description": "Spastic Cerebral Palsy is the most common type of CP, accounting for about 80% of cases. It is characterized by increased muscle tone (hypertonia), leading to stiff muscles and awkward movements. The spasticity can affect different parts of the body (diplegia, hemiplegia, quadriplegia).",
    "desc": "Spastic Cerebral Palsy is the most common type of CP, accounting for about 80% of cases. It is characterized by increased muscle tone (hypertonia), leading to stiff muscles and awkward movements. The spasticity can affect different parts of the body (diplegia, hemiplegia, quadriplegia).",
    "symptoms": [
      "Stiff, tight muscles (spasticity).",
      "Exaggerated reflexes.",
      "Toe walking.",
      "\"Scissor\" gait (knees crossing).",
      "Muscle weakness.",
      "Difficulty with fine motor skills."
    ],
    "causes": [
      "Damage to or abnormalities in the developing brain that disrupt the brain's ability to control movement and posture."
    ],
    "treatment": [
      "Physical Therapy: To improve mobility and strength.",
      "Occupational Therapy: To improve daily living skills.",
      "Speech Therapy.",
      "Medications: (e.g., baclofen) to reduce spasticity.",
      "Orthopedic Surgery to correct contractures or bone deformities."
    ],
    "selfCare": [
      "(For parents/caregivers)",
      "Engage in daily home therapy programs.",
      "Use adaptive equipment as recommended.",
      "Focus on the child's abilities, not disabilities.",
      "Lifestyle Recommendations",
      "Ensure a supportive and inclusive environment."
    ],
    "prevention": [
      "Good prenatal care, preventing premature birth, and vaccinating against infections can reduce the risk."
    ],
    "riskFactors": [
      "Primary: Brain injury or abnormal development before, during, or shortly after birth.",
      "Secondary: Premature birth, low birth weight, multiple births, infections during pregnancy."
    ],
    "warningSigns": [
      "CP is a lifelong condition, not an acute illness. Early diagnosis and intervention are key to maximizing a child's potential."
    ]
  },
  {
    "id": "glioblastoma-multiforme",
    "name": "Glioblastoma Multiforme",
    "category": "Neurological",
    "severity": "High",
    "prevalence": "Rare, but the most common high-grade primary brain tumor.",
    "description": "Glioblastoma (GBM) is a fast-growing and aggressive type of brain tumor that forms from glial cells. It is a Grade IV astrocytoma and is the most common malignant primary brain tumor in adults. It is largely incurable.",
    "desc": "Glioblastoma (GBM) is a fast-growing and aggressive type of brain tumor that forms from glial cells. It is a Grade IV astrocytoma and is the most common malignant primary brain tumor in adults. It is largely incurable.",
    "symptoms": [
      "Worsening headache.",
      "Nausea and vomiting.",
      "Seizures.",
      "Difficulty with balance.",
      "Memory loss.",
      "Personality changes.",
      "Weakness on one side of the body.",
      "Speech difficulties."
    ],
    "causes": [
      "The cause is largely unknown. Most cases are sporadic, with only a small percentage linked to genetic predisposition."
    ],
    "treatment": [
      "Maximal Safe Surgical Resection: The first step, but it is difficult to remove all of the tumor due to its invasive nature.",
      "Radiation Therapy and Chemotherapy (Temozolomide): The standard of care after surgery (the \"Stupp protocol\").",
      "Tumor Treating Fields (TTF): A wearable device that delivers electric fields to the brain to slow tumor growth."
    ],
    "selfCare": [
      "Manage treatment side effects with the help of your healthcare team.",
      "Seek palliative/supportive care early to manage symptoms and maintain quality of life.",
      "Lifestyle Recommendations",
      "Build a strong support system.",
      "Consider joining a clinical trial."
    ],
    "prevention": [
      "There are no known ways to prevent glioblastoma."
    ],
    "riskFactors": [
      "Primary: Age (most common in older adults), male sex.",
      "Secondary: Prior radiation therapy to the head, certain genetic syndromes."
    ],
    "warningSigns": [
      "The onset of new neurological symptoms, especially seizures or persistent headaches, warrants prompt medical evaluation."
    ]
  },
  {
    "id": "myasthenia-gravis",
    "name": "Myasthenia Gravis",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Rare.",
    "description": "Myasthenia Gravis (MG) is a chronic autoimmune neuromuscular disorder that causes weakness in the skeletal muscles, which are the muscles your body uses for movement. It occurs when communication between nerve cells and muscles is disrupted.",
    "desc": "Myasthenia Gravis (MG) is a chronic autoimmune neuromuscular disorder that causes weakness in the skeletal muscles, which are the muscles your body uses for movement. It occurs when communication between nerve cells and muscles is disrupted.",
    "symptoms": [
      "The hallmark of MG is muscle weakness that worsens with activity and improves with rest.",
      "Drooping of one or both eyelids (ptosis).",
      "Double vision (diplopia).",
      "Difficulty swallowing, chewing, and speaking.",
      "Change in facial expression.",
      "Weakness in the arms, hands, fingers, legs, and neck.",
      "Shortness of breath."
    ],
    "causes": [
      "Antibodies block, alter, or destroy the receptors for acetylcholine at the neuromuscular junction, preventing muscle contraction."
    ],
    "treatment": [
      "Acetylcholinesterase Inhibitors (e.g., pyridostigmine): To improve communication between nerves and muscles.",
      "Immunosuppressants (e.g., prednisone, azathioprine): To reduce antibody production.",
      "Plasmapheresis and IVIG: For acute worsening or crisis.",
      "Thymectomy: Surgical removal of the thymus gland can improve symptoms, especially if a thymoma is present."
    ],
    "selfCare": [
      "Pace your activities and take rest breaks.",
      "Use an eye patch for double vision.",
      "Eat soft foods if chewing is difficult.",
      "Avoid medications that can worsen MG (your doctor will provide a list).",
      "Lifestyle Recommendations",
      "Manage stress and avoid getting sick, as these can exacerbate symptoms."
    ],
    "prevention": [
      "There is no known way to prevent MG."
    ],
    "riskFactors": [
      "Primary: Being a woman under 40 or a man over 60.",
      "Secondary: Having other autoimmune diseases."
    ],
    "warningSigns": [
      "A life-threatening complication where the muscles that control breathing become too weak to function. This is a medical emergency requiring immediate treatment and often a ventilator."
    ]
  },
  {
    "id": "diabetic-peripheral-neuropathy",
    "name": "Diabetic Peripheral Neuropathy",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Very common in people with long-standing diabetes.",
    "description": "Diabetic Peripheral Neuropathy is the most common type of nerve damage caused by diabetes. It typically affects the feet and legs first, followed by the hands and arms. High blood sugar over time can injure the walls of the tiny blood vessels that nourish nerves.",
    "desc": "Diabetic Peripheral Neuropathy is the most common type of nerve damage caused by diabetes. It typically affects the feet and legs first, followed by the hands and arms. High blood sugar over time can injure the walls of the tiny blood vessels that nourish nerves.",
    "symptoms": [
      "Symptoms are often worse at night.",
      "Numbness or reduced ability to feel pain or temperature changes.",
      "Tingling or burning sensation.",
      "Sharp pains or cramps.",
      "Extreme sensitivity to touch.",
      "Muscle weakness.",
      "Loss of reflexes.",
      "Foot problems like ulcers, infections, and bone/joint pain."
    ],
    "causes": [
      "A combination of factors, including high blood sugar, metabolic factors, damage to blood vessels, and inflammation."
    ],
    "treatment": [
      "Strict Blood Sugar Control: The most important step to prevent progression.",
      "Pain Medications: Antidepressants (e.g., duloxetine) or anticonvulsants (e.g., pregabalin, gabapentin) are first-line for neuropathic pain.",
      "Topical treatments like capsaicin cream.",
      "Foot care is paramount."
    ],
    "selfCare": [
      "Inspect your feet daily for cuts, blisters, or redness.",
      "Wear proper footwear.",
      "Keep your feet clean and dry.",
      "Manage your blood pressure and cholesterol.",
      "Lifestyle Recommendations",
      "Don't smoke.",
      "Get regular exercise."
    ],
    "prevention": [
      "The best prevention is tight glycemic control from the time of diabetes diagnosis."
    ],
    "riskFactors": [
      "Primary: Poorly controlled blood sugar.",
      "Secondary: Long duration of diabetes, obesity, smoking, high blood pressure."
    ],
    "warningSigns": [
      "Neuropathy itself is not an emergency, but it leads to a high risk of foot ulcers and infections due to loss of sensation. Any foot sore, cut, or blister requires immediate medical attention to prevent amputation."
    ]
  },
  {
    "id": "essential-tremor",
    "name": "Essential Tremor",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Very common, affecting millions of people worldwide. • Often runs in families (autosomal dominant inheritance).",
    "description": "Essential Tremor (ET) is a neurological disorder that causes involuntary and rhythmic shaking, most often in the hands, but it can also affect the head, voice, arms, or legs. It is not associated with other neurological diseases like Parkinson's and is often misdiagnosed as such. It is the most common movement disorder.",
    "desc": "Essential Tremor (ET) is a neurological disorder that causes involuntary and rhythmic shaking, most often in the hands, but it can also affect the head, voice, arms, or legs. It is not associated with other neurological diseases like Parkinson's and is often misdiagnosed as such. It is the most common movement disorder.",
    "symptoms": [
      "A rhythmic, back-and-forth tremor that is typically most prominent in the hands and arms.",
      "The \"action tremor\" – it occurs during voluntary movement (like holding a cup) rather than at rest.",
      "May be mild and non-progressive for many years, or can worsen over time.",
      "Can be aggravated by stress, fatigue, caffeine, or extreme temperatures."
    ],
    "causes": [
      "The exact cause is unknown, but it involves abnormal communication between certain areas of the brain, including the cerebellum. For many, it is an inherited condition."
    ],
    "treatment": [
      "Beta-blockers (e.g., propranolol).",
      "Anticonvulsants (e.g., primidone).",
      "Botulinum Toxin (Botox) Injections: For head and voice tremors.",
      "Deep Brain Stimulation (DBS): A surgical treatment for severe, medication-resistant tremor."
    ],
    "selfCare": [
      "Avoid triggers like caffeine and stress where possible.",
      "Use adaptive devices like weighted utensils or pens to improve control.",
      "Get adequate rest.",
      "Lifestyle Recommendations",
      "Physical or occupational therapy can help manage the tremor and suggest helpful techniques."
    ],
    "prevention": [
      "There is no known way to prevent essential tremor."
    ],
    "riskFactors": [
      "Primary: Family history (genetic predisposition).",
      "Secondary: Age (risk and severity increase with age)."
    ],
    "warningSigns": [
      "ET is not life-threatening but can be severely disabling. Seek evaluation if the tremor interferes with daily activities like eating, writing, or drinking."
    ]
  },
  {
    "id": "benign-paroxysmal-positional-vertigo-bppv",
    "name": "Benign Paroxysmal Positional Vertigo (BPPV)",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "The most common cause of vertigo.",
    "description": "BPPV is a common disorder of the inner ear that causes brief, intense episodes of vertigo (a sensation of spinning) triggered by specific changes in head position, such as rolling over in bed, looking up, or bending down. It occurs when tiny calcium crystals (otoconia) become dislodged and migrate into the semicircular canals.",
    "desc": "BPPV is a common disorder of the inner ear that causes brief, intense episodes of vertigo (a sensation of spinning) triggered by specific changes in head position, such as rolling over in bed, looking up, or bending down. It occurs when tiny calcium crystals (otoconia) become dislodged and migrate into the semicircular canals.",
    "symptoms": [
      "A sudden sensation that you or the room is spinning (vertigo).",
      "Triggered by head movement.",
      "Lasts for less than one minute per episode.",
      "Nausea (and sometimes vomiting).",
      "A feeling of unsteadiness or loss of balance."
    ],
    "causes": [
      "Dislodged otoconia (canaliths) in the inner ear that shift when the head moves, sending false signals of movement to the brain."
    ],
    "treatment": [
      "Canalith Repositioning Procedures: The primary and highly effective treatment. A doctor or therapist performs a series of specific head maneuvers (e.g., Epley maneuver) to guide the particles back to their proper chamber.",
      "Brandt-Daroff Exercises: Can be performed at home for less common variants."
    ],
    "selfCare": [
      "After treatment, sleep propped up for the first night or two.",
      "Avoid sudden head movements that trigger the vertigo.",
      "Be cautious when walking, bending over, or looking up.",
      "Lifestyle Recommendations",
      "Perform the prescribed exercises consistently."
    ],
    "prevention": [
      "There is no sure way to prevent BPPV, as it often occurs spontaneously."
    ],
    "riskFactors": [
      "Primary: Age (more common over 50), head trauma.",
      "Secondary: Prolonged bed rest, other inner ear diseases, migraine."
    ],
    "warningSigns": [
      "While vertigo can be frightening, BPPV itself is not dangerous. However, see a doctor to rule out more serious causes like stroke, especially if accompanied by neurological symptoms (weakness, slurred speech)."
    ]
  },
  {
    "id": "generalized-seizure-disorder",
    "name": "Generalized Seizure Disorder",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "A common form of epilepsy.",
    "description": "Generalized Seizure Disorder refers to epilepsy where seizures begin simultaneously in both hemispheres of the brain from the onset. This leads to a loss of awareness or consciousness and can involve convulsions. Types include absence, tonic-clonic, atonic, and myoclonic seizures.",
    "desc": "Generalized Seizure Disorder refers to epilepsy where seizures begin simultaneously in both hemispheres of the brain from the onset. This leads to a loss of awareness or consciousness and can involve convulsions. Types include absence, tonic-clonic, atonic, and myoclonic seizures.",
    "symptoms": [
      "Tonic-Clonic (Grand Mal): Loss of consciousness, body stiffening (tonic) followed by jerking (clonic).",
      "Absence (Petit Mal): Brief loss of awareness, staring spell.",
      "Atonic: Sudden loss of muscle tone (drop attacks).",
      "Myoclonic: Sudden, brief jerks of a muscle or group of muscles."
    ],
    "causes": [
      "Often genetic, but can be due to metabolic disturbances, brain injury, or unknown causes (idiopathic)."
    ],
    "treatment": [
      "Anti-seizure Medications (ASMs): The cornerstone of treatment. The goal is to control seizures with the fewest side effects.",
      "Ketogenic Diet: A high-fat, low-carb diet that can be effective, especially in children.",
      "Vagus Nerve Stimulation (VNS) or Deep Brain Stimulation (DBS) for medication-resistant cases."
    ],
    "selfCare": [
      "Take medication consistently.",
      "Get adequate sleep (sleep deprivation is a major trigger).",
      "Limit alcohol.",
      "Wear a medical alert bracelet.",
      "Lifestyle Recommendations",
      "Identify and avoid personal seizure triggers."
    ],
    "prevention": [
      "No known prevention for the disorder itself, but medication prevents seizures."
    ],
    "riskFactors": [
      "Primary: Genetics, brain malformations.",
      "Secondary: Head trauma, stroke, brain infection."
    ],
    "warningSigns": [
      "Status Epilepticus is a medical emergency – a seizure lasting more than 5 minutes or repeated seizures without regaining consciousness. Call 911."
    ]
  },
  {
    "id": "traumatic-spinal-cord-injury",
    "name": "Traumatic Spinal Cord Injury",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "A leading cause of permanent disability.",
    "description": "A Traumatic Spinal Cord Injury (SCI) is damage to the spinal cord resulting from a sudden, traumatic blow that fractures, dislocates, crushes, or compresses one or more vertebrae. This can cause permanent loss of strength, sensation, and function below the site of the injury.",
    "desc": "A Traumatic Spinal Cord Injury (SCI) is damage to the spinal cord resulting from a sudden, traumatic blow that fractures, dislocates, crushes, or compresses one or more vertebrae. This can cause permanent loss of strength, sensation, and function below the site of the injury.",
    "symptoms": [
      "Loss of movement.",
      "Loss of sensation, including the ability to feel heat, cold, and touch.",
      "Loss of bowel or bladder control.",
      "Exaggerated reflex activities or spasms.",
      "Pain or an intense stinging sensation.",
      "Difficulty breathing, coughing, or clearing secretions."
    ],
    "causes": [
      "Motor vehicle accidents.",
      "Falls.",
      "Acts of violence.",
      "Sports injuries.",
      "Diseases like cancer or arthritis can also cause non-traumatic SCI."
    ],
    "treatment": [
      "Immobilization and Stabilization: At the scene and in the hospital.",
      "High-dose Corticosteroids (Methylprednisolone): May be given shortly after injury to reduce inflammation (use is controversial).",
      "Surgery: To remove bone fragments, herniated disks, or fractured vertebrae and stabilize the spine.",
      "Rehabilitation: Intensive physical, occupational, and psychological therapy."
    ],
    "selfCare": [
      "Prevent complications: Meticulous skin care to prevent pressure sores, bladder/bowel management, respiratory care.",
      "Maintain a healthy weight.",
      "Prevent secondary infections (UTIs, respiratory).",
      "Lifestyle Recommendations",
      "Utilize assistive technology and home modifications for independence.",
      "Seek peer and psychological support."
    ],
    "prevention": [
      "Drive safely, wear a seatbelt.",
      "Check water depth before diving.",
      "Prevent falls (use handrails, non-slip mats).",
      "Wear proper protective gear during sports."
    ],
    "riskFactors": [
      "Primary: Male sex, age (young adults 16-30 and adults over 65).",
      "Secondary: Alcohol or drug use, risky behavior (e.g., diving, contact sports)."
    ],
    "warningSigns": [
      "A suspected spinal cord injury is a medical emergency. Assume a spinal injury in any trauma and immobilize the head/neck. Call 911. Do not move the person."
    ]
  },
  {
    "id": "obstructive-hydrocephalus",
    "name": "Obstructive Hydrocephalus",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Can occur at any age.",
    "description": "Obstructive (or Non-communicating) Hydrocephalus is a condition where cerebrospinal fluid (CSF) accumulates in the brain's ventricles, causing them to enlarge and put pressure on the brain. \"Obstructive\" means the flow of CSF is blocked within the ventricular system.",
    "desc": "Obstructive (or Non-communicating) Hydrocephalus is a condition where cerebrospinal fluid (CSF) accumulates in the brain's ventricles, causing them to enlarge and put pressure on the brain. \"Obstructive\" means the flow of CSF is blocked within the ventricular system.",
    "symptoms": [
      "Unusually large head.",
      "Bulging fontanelle (soft spot).",
      "Vomiting.",
      "Sleepiness.",
      "Seizures.",
      "Headache.",
      "Nausea and vomiting.",
      "Balance problems."
    ],
    "causes": [
      "Any blockage in the narrow pathways connecting the ventricles, such as from a tumor, infection (meningitis), hemorrhage, or congenital stenosis (Aqueductal Stenosis)."
    ],
    "treatment": [
      "Surgical placement of a Shunt: The most common treatment. A tube is placed in the ventricle to drain excess CSF to another part of the body (usually the abdomen), where it is absorbed.",
      "Endoscopic Third Ventriculostomy (ETV): A surgical procedure that creates a new pathway for CSF to flow, bypassing the obstruction."
    ],
    "selfCare": [
      "For those with a shunt, know the signs of shunt malfunction (return of original symptoms, headache, vomiting) and seek immediate medical attention.",
      "Attend regular follow-ups with a neurosurgeon.",
      "Lifestyle Recommendations",
      "Live a full and active life once the condition is treated and stable."
    ],
    "prevention": [
      "There is no way to prevent most cases of obstructive hydrocephalus."
    ],
    "riskFactors": [
      "Primary: Brain tumors, cysts, hemorrhage, infections, or structural malformations that block CSF pathways."
    ],
    "warningSigns": [
      "Severe headache, nausea, vomiting.",
      "Lethargy, drowsiness, or coma.",
      "Blurred or double vision (from pressure on cranial nerves)."
    ]
  },
  {
    "id": "cluster-headache",
    "name": "Cluster Headache",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Rare, affecting less than 1% of the population. • More common in men.",
    "description": "Cluster Headaches are one of the most painful types of primary headache. They occur in cyclical patterns or \"clusters,\" with frequent attacks (often at the same time of day/night) over weeks or months, followed by remission periods. The pain is strictly one-sided, typically around the eye.",
    "desc": "Cluster Headaches are one of the most painful types of primary headache. They occur in cyclical patterns or \"clusters,\" with frequent attacks (often at the same time of day/night) over weeks or months, followed by remission periods. The pain is strictly one-sided, typically around the eye.",
    "symptoms": [
      "Excruciating, burning, or piercing pain, always on one side, centered around one eye.",
      "Attacks last 15 minutes to 3 hours.",
      "Occur with clock-like regularity, often waking the person from sleep.",
      "Autonomic symptoms on the same side: Red/watery eye, drooping eyelid, pupil constriction, runny or stuffy nose, forehead/facial sweating."
    ],
    "causes": [
      "The exact cause is unknown but involves abnormal activity in the hypothalamus (the brain's \"biological clock\") and activation of the trigeminal nerve."
    ],
    "treatment": [
      "High-flow 100% Oxygen via a non-rebreather mask.",
      "Triptan Injections (e.g., sumatriptan).",
      "Preventive Therapy (during a cluster cycle): Verapamil, corticosteroids, lithium, galcanezumab.",
      "Nerve blocks or neuromodulation devices may be used."
    ],
    "selfCare": [
      "Strictly avoid alcohol during a cluster period.",
      "Maintain a very regular sleep schedule.",
      "During an attack, pacing or rocking may be more helpful than lying down.",
      "Lifestyle Recommendations",
      "Identify and avoid all triggers during a cluster cycle."
    ],
    "prevention": [
      "Taking preventive medication at the first sign of a new cluster cycle can reduce the frequency and severity of attacks."
    ],
    "riskFactors": [
      "Primary: Male sex, smoking, family history.",
      "Secondary: Alcohol use during a cluster period (a major trigger)."
    ],
    "warningSigns": [
      "The pain is so severe it is often called a \"suicide headache.\" While not life-threatening, it requires urgent and aggressive treatment to abort the attack."
    ]
  },
  {
    "id": "trigeminal-neuralgia",
    "name": "Trigeminal Neuralgia",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Rare. • More common in women and in people over 50.",
    "description": "Trigeminal Neuralgia (TN), also known as tic douloureux, is a chronic pain condition that affects the trigeminal nerve, which carries sensation from your face to your brain. It causes sudden, severe, electric-shock-like or stabbing pain on one side of the face.",
    "desc": "Trigeminal Neuralgia (TN), also known as tic douloureux, is a chronic pain condition that affects the trigeminal nerve, which carries sensation from your face to your brain. It causes sudden, severe, electric-shock-like or stabbing pain on one side of the face.",
    "symptoms": [
      "Episodes of severe, shooting or jabbing pain that may feel like an electric shock.",
      "Spontaneous attacks or triggered by touching the face, chewing, speaking, or brushing teeth.",
      "Pain is confined to one side of the face, typically in the cheek, jaw, teeth, gums, or lips.",
      "Bouts of pain lasting from a few seconds to several minutes."
    ],
    "causes": [
      "In most cases, it's caused by a blood vessel compressing the trigeminal nerve near the brainstem. This compression wears away the nerve's protective coating (myelin)."
    ],
    "treatment": [
      "Anticonvulsant Medications: Carbamazepine or oxcarbazepine are first-line and highly effective.",
      "Other medications: Baclofen, lamotrigine.",
      "Surgical Options: Microvascular decompression (moving the compressing blood vessel), Gamma Knife radiosurgery, or rhizotomy (damaging the nerve to block pain signals)."
    ],
    "selfCare": [
      "Eat soft foods if chewing is a trigger.",
      "Avoid trigger activities like windy weather or specific facial movements.",
      "Use a warm compress on the area for muscle spasms.",
      "Lifestyle Recommendations",
      "Manage stress, as it can exacerbate attacks."
    ],
    "prevention": [
      "There is no known way to prevent trigeminal neuralgia."
    ],
    "riskFactors": [
      "Primary: Compression of the trigeminal nerve by a blood vessel.",
      "Secondary: Multiple sclerosis, a tumor, or a brain lesion."
    ],
    "warningSigns": [
      "The pain is debilitating and requires medical management. It is not an emergency in the life-threatening sense, but the suffering is extreme."
    ]
  },
  {
    "id": "carpal-tunnel-syndrome",
    "name": "Carpal Tunnel Syndrome",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "Extremely common.",
    "description": "Carpal Tunnel Syndrome (CTS) is a common condition that causes pain, numbness, and tingling in the hand and arm. It occurs when the median nerve, which runs from the forearm into the palm, becomes compressed or squeezed at the wrist within the carpal tunnel.",
    "desc": "Carpal Tunnel Syndrome (CTS) is a common condition that causes pain, numbness, and tingling in the hand and arm. It occurs when the median nerve, which runs from the forearm into the palm, becomes compressed or squeezed at the wrist within the carpal tunnel.",
    "symptoms": [
      "Numbness, tingling, or burning in the thumb, index, middle, and ring fingers.",
      "Shock-like sensations that radiate to the fingers.",
      "Pain or tingling that may travel up the forearm.",
      "Weakness in the hand and a tendency to drop objects.",
      "Symptoms often worse at night."
    ],
    "causes": [
      "Pressure on the median nerve from swelling or a reduction in the size of the carpal tunnel. This is often due to repetitive motions, hormonal changes, or underlying health conditions."
    ],
    "treatment": [
      "Wrist splinting (especially at night).",
      "Nonsteroidal anti-inflammatory drugs (NSAIDs).",
      "Activity changes.",
      "Corticosteroid injections into the carpal tunnel.",
      "Surgery (Carpal Tunnel Release): To cut the ligament pressing on the nerve, for severe or unresponsive cases."
    ],
    "selfCare": [
      "Take frequent breaks from repetitive tasks.",
      "Stretch your hands and wrists regularly.",
      "Wear a splint at night to keep your wrist in a neutral position.",
      "Apply cold packs to reduce swelling.",
      "Lifestyle Recommendations",
      "Maintain a healthy weight.",
      "Ensure proper ergonomics at your workstation."
    ],
    "prevention": [
      "Ergonomic workspace setup.",
      "Taking breaks and stretching during repetitive work."
    ],
    "riskFactors": [
      "Primary: Repetitive hand use, anatomy (smaller carpal tunnel).",
      "Secondary: Obesity, pregnancy, rheumatoid arthritis, diabetes, hypothyroidism."
    ],
    "warningSigns": [
      "Seek evaluation if you have persistent symptoms to prevent permanent nerve damage. Sudden, severe weakness or numbness warrants prompt attention."
    ]
  },
  {
    "id": "friedreichs-ataxia",
    "name": "Friedreich's Ataxia",
    "category": "Neurological",
    "severity": "Medium",
    "prevalence": "The most common hereditary ataxia.",
    "description": "Friedreich's Ataxia (FA) is a rare, inherited, progressive neurodegenerative disease that causes impaired muscle coordination (ataxia), speech problems, heart disease, and diabetes. It is caused by a genetic defect that leads to excessive repeats of a DNA sequence.",
    "desc": "Friedreich's Ataxia (FA) is a rare, inherited, progressive neurodegenerative disease that causes impaired muscle coordination (ataxia), speech problems, heart disease, and diabetes. It is caused by a genetic defect that leads to excessive repeats of a DNA sequence.",
    "symptoms": [
      "Neurological: Gait ataxia (difficulty walking), poor coordination, dysarthria (slurred speech), loss of sensation, muscle weakness.",
      "Cardiac: Hypertrophic cardiomyopathy (thickening of the heart muscle), arrhythmias.",
      "Musculoskeletal: Scoliosis, foot deformities (pes cavus).",
      "Diabetes."
    ],
    "causes": [
      "A mutation in the FXN gene leads to reduced production of the protein frataxin, which is essential for mitochondrial function. This causes damage to the nervous system and heart."
    ],
    "treatment": [
      "There is no cure. Treatment is supportive and multidisciplinary.",
      "Physical, Occupational, and Speech Therapy.",
      "Medications to manage cardiac symptoms and diabetes.",
      "Orthopedic devices (braces, walkers) and surgery for scoliosis."
    ],
    "selfCare": [
      "Stay as active as possible with physical therapy.",
      "Use assistive devices to maintain mobility and independence.",
      "Monitor for and manage cardiac and diabetic symptoms.",
      "Lifestyle Recommendations",
      "Genetic counseling for the family."
    ],
    "prevention": [
      "No known prevention. Genetic testing can identify carriers."
    ],
    "riskFactors": [
      "Primary: Having two parents who carry the defective FXN gene (autosomal recessive)."
    ],
    "warningSigns": [
      "A progressive condition. Early diagnosis allows for management of complications like cardiomyopathy and diabetes."
    ]
  },
  {
    "id": "spasmodic-torticollis",
    "name": "Spasmodic Torticollis",
    "category": "Neurological",
    "severity": "Low",
    "prevalence": "The most common form of focal dystonia.",
    "description": "Spasmodic Torticollis, also known as Cervical Dystonia, is a painful neurological condition characterized by involuntary muscle contractions in the neck, causing the head to twist or turn to one side, or to tilt forward or backward.",
    "desc": "Spasmodic Torticollis, also known as Cervical Dystonia, is a painful neurological condition characterized by involuntary muscle contractions in the neck, causing the head to twist or turn to one side, or to tilt forward or backward.",
    "symptoms": [
      "Involuntary pulling, twisting, or tilting of the head and neck.",
      "Neck pain that often radiates to the shoulders.",
      "Head tremor.",
      "Symptoms may worsen with stress, fatigue, or certain activities.",
      "Symptoms often improve with a \"sensory trick\" (e.g., lightly touching the chin or face)."
    ],
    "causes": [
      "The exact cause is unknown but is thought to involve abnormal functioning of the basal ganglia in the brain. It can be primary (idiopathic) or secondary to another condition."
    ],
    "treatment": [
      "Botulinum Toxin (Botox) Injections: The first-line and most effective treatment. It works by blocking the nerve signals that cause muscle spasms.",
      "Oral Medications: Anticholinergics, muscle relaxants (usually less effective).",
      "Physical Therapy.",
      "Deep Brain Stimulation (DBS) for severe, refractory cases."
    ],
    "selfCare": [
      "Apply heat or ice packs to help relieve pain.",
      "Learn and use sensory tricks.",
      "Practice stress management techniques.",
      "Lifestyle Recommendations",
      "Physical therapy to learn stretching and strengthening exercises."
    ],
    "prevention": [
      "There is no known way to prevent spasmodic torticollis."
    ],
    "riskFactors": [
      "Primary: Middle age, female sex.",
      "Secondary: Family history of dystonia, head/neck injury."
    ],
    "warningSigns": [
      "The condition is not life-threatening but can be painful and socially isolating. Seek a neurologist's evaluation for diagnosis and treatment."
    ]
  },
  {
    "id": "osteoarthritis-of-the-knee",
    "name": "Osteoarthritis of the Knee",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Extremely common, especially with increasing age.",
    "description": "Osteoarthritis (OA) of the knee is the most common form of arthritis, characterized by the breakdown of the cartilage that cushions the ends of the bones in the knee joint. This leads to pain, stiffness, and loss of mobility.",
    "desc": "Osteoarthritis (OA) of the knee is the most common form of arthritis, characterized by the breakdown of the cartilage that cushions the ends of the bones in the knee joint. This leads to pain, stiffness, and loss of mobility.",
    "symptoms": [
      "Pain that increases with activity and is relieved by rest.",
      "Stiffness, especially in the morning or after inactivity.",
      "Swelling.",
      "A grating sensation or sound (crepitus) when moving the knee.",
      "Decreased range of motion.",
      "A feeling of joint instability."
    ],
    "causes": [
      "\"Wear and tear\" arthritis. The protective cartilage wears down over time, leading to bone-on-bone friction."
    ],
    "treatment": [
      "Weight loss (if overweight).",
      "Physical therapy for strengthening.",
      "Low-impact exercise (swimming, cycling).",
      "Pain relievers (acetaminophen, NSAIDs).",
      "Injections: Corticosteroids or hyaluronic acid.",
      "Surgery: Arthroscopic debridement, osteotomy, or total knee replacement for severe cases."
    ],
    "selfCare": [
      "Lose weight to reduce stress on the knee.",
      "Use assistive devices like a cane or knee brace if needed.",
      "Apply heat for stiffness and cold packs for acute pain and swelling.",
      "Lifestyle Recommendations",
      "Stay active with joint-friendly exercises to maintain strength and flexibility."
    ],
    "prevention": [
      "Maintain a healthy weight.",
      "Stay active to keep muscles strong.",
      "Avoid joint injury."
    ],
    "riskFactors": [
      "Primary: Age, obesity.",
      "Secondary: Previous knee injury, repetitive stress, genetics, female sex."
    ],
    "warningSigns": [
      "OA is a chronic, progressive condition. Seek evaluation for persistent knee pain that limits your activities."
    ]
  },
  {
    "id": "seropositive-rheumatoid-arthritis",
    "name": "Seropositive Rheumatoid Arthritis",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Affects about 1% of the population.",
    "description": "Seropositive Rheumatoid Arthritis (RA) is an autoimmune and inflammatory disease where the immune system attacks the joints, leading to inflammation, pain, and eventual joint damage. \"Seropositive\" means blood tests are positive for rheumatoid factor (RF) and/or anti-CCP antibodies, indicating a more classic and often more aggressive form of RA.",
    "desc": "Seropositive Rheumatoid Arthritis (RA) is an autoimmune and inflammatory disease where the immune system attacks the joints, leading to inflammation, pain, and eventual joint damage. \"Seropositive\" means blood tests are positive for rheumatoid factor (RF) and/or anti-CCP antibodies, indicating a more classic and often more aggressive form of RA.",
    "symptoms": [
      "Pain, swelling, and stiffness in multiple joints (often symmetrical).",
      "Morning stiffness lasting more than 30 minutes.",
      "Fatigue, fever, and weight loss.",
      "Joint deformities in advanced disease.",
      "Can affect other organs (eyes, heart, lungs)."
    ],
    "causes": [
      "An autoimmune disorder where the immune system mistakenly attacks the synovium (the lining of the membranes that surround the joints)."
    ],
    "treatment": [
      "Disease-Modifying Antirheumatic Drugs (DMARDs): The cornerstone of treatment (e.g., methotrexate).",
      "Biologic Response Modifiers: Target specific parts of the immune system (e.g., TNF inhibitors like etanercept).",
      "JAK Inhibitors: A newer class of oral DMARDs.",
      "NSAIDs and Corticosteroids for short-term symptom control."
    ],
    "selfCare": [
      "Take medications as prescribed to control the disease.",
      "Balance activity with rest.",
      "Use splints to support inflamed joints.",
      "Lifestyle Recommendations",
      "Don't smoke.",
      "Eat a healthy, anti-inflammatory diet.",
      "Engage in regular, low-impact exercise."
    ],
    "prevention": [
      "There is no known prevention, but early treatment prevents damage."
    ],
    "riskFactors": [
      "Primary: Genetics, female sex.",
      "Secondary: Smoking, obesity."
    ],
    "warningSigns": [
      "RA is a systemic disease. Early, aggressive treatment is crucial to prevent permanent joint damage and disability. Seek a rheumatologist's evaluation for persistent joint pain and swelling."
    ]
  },
  {
    "id": "gout",
    "name": "Gout",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Increasingly common, linked to obesity and dietary trends.",
    "description": "(Note: This is a more detailed guide for the specific disease, building on the earlier entry for Acute Gouty Arthritis #85) Gout is a common and complex form of inflammatory arthritis characterized by sudden, severe attacks of pain, swelling, redness, and tenderness in the joints, often at the base of the big toe. It is caused by hyperuricemia—elevated levels of uric acid in the blood—which can lead to the formation of needle-like urate crystals ",
    "desc": "(Note: This is a more detailed guide for the specific disease, building on the earlier entry for Acute Gouty Arthritis #85) Gout is a common and complex form of inflammatory arthritis characterized by sudden, severe attacks of pain, swelling, redness, and tenderness in the joints, often at the base of the big toe. It is caused by hyperuricemia—elevated levels of uric acid in the blood—which can lead to the formation of needle-like urate crystals ",
    "symptoms": [
      "The gout attack: Intense joint pain, typically peaking within 12-24 hours.",
      "Lingering discomfort: After the severe pain subsides, some joint discomfort can last days to weeks.",
      "Inflammation and redness: The affected joint is swollen, warm, and red.",
      "Limited range of motion."
    ],
    "causes": [
      "The body produces too much uric acid or the kidneys excrete too little. This leads to hyperuricemia and the formation of urate crystals in the joint, triggering a severe inflammatory response."
    ],
    "treatment": [
      "NSAIDs (e.g., ibuprofen, naproxen).",
      "Colchicine.",
      "Corticosteroids (e.g., prednisone).",
      "Xanthine Oxidase Inhibitors: Allopurinol or febuxostat.",
      "Uricosurics: Probenecid."
    ],
    "selfCare": [
      "During an attack: Rest the joint, ice it, and keep it elevated.",
      "Take medications as prescribed at the first sign of an attack.",
      "Stay well-hydrated to help flush uric acid.",
      "Lifestyle Recommendations",
      "Limit alcohol and sugary drinks.",
      "Limit high-purine foods.",
      "Maintain a healthy weight."
    ],
    "prevention": [
      "Long-term use of urate-lowering drugs is the primary method for preventing recurrent attacks and complications.",
      "Lifestyle modifications are also key."
    ],
    "riskFactors": [
      "Primary: Diet high in purines (red meat, organ meats, seafood), alcohol (especially beer), obesity.",
      "Secondary: Certain medications (diuretics), family history, chronic conditions (kidney disease, hypertension)."
    ],
    "warningSigns": [
      "A gout attack (acute gouty arthritis) is intensely painful. Chronic, untreated gout can lead to tophi (chalky deposits under the skin) and permanent joint damage."
    ]
  },
  {
    "id": "osteoporosis-with-pathological-fracture",
    "name": "Osteoporosis with Pathological Fracture",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "A major public health problem, especially for postmenopausal women.",
    "description": "Osteoporosis is a bone disease that occurs when the body loses too much bone, makes too little bone, or both, leading to weak, brittle bones. A \"pathological fracture\" is a broken bone that occurs due to the weakened state of the bone from osteoporosis, often from a minor fall or even from simple actions like bending or coughing.",
    "desc": "Osteoporosis is a bone disease that occurs when the body loses too much bone, makes too little bone, or both, leading to weak, brittle bones. A \"pathological fracture\" is a broken bone that occurs due to the weakened state of the bone from osteoporosis, often from a minor fall or even from simple actions like bending or coughing.",
    "symptoms": [
      "Osteoporosis is often called a \"silent disease\" until a fracture occurs.",
      "Back pain, caused by a fractured or collapsed vertebra.",
      "Loss of height over time.",
      "A stooped posture (kyphosis).",
      "A bone that breaks much more easily than expected."
    ],
    "causes": [
      "An imbalance between bone resorption (breakdown) and bone formation, leading to a net loss of bone mass and deterioration of bone microarchitecture."
    ],
    "treatment": [
      "Calcium and Vitamin D supplementation is foundational.",
      "Bisphosphonates (e.g., alendronate, zoledronic acid) are first-line medications.",
      "Other drugs: Denosumab, Teriparatide, Romosozumab.",
      "Treatment of the fracture (e.g., surgery for hip fracture)."
    ],
    "selfCare": [
      "Ensure adequate calcium (1,200 mg/day) and Vitamin D (800-1000 IU/day).",
      "Perform weight-bearing and muscle-strengthening exercises.",
      "Fall prevention strategies (e.g., remove home hazards, improve lighting).",
      "Lifestyle Recommendations",
      "Do not smoke.",
      "Limit alcohol."
    ],
    "prevention": [
      "Building strong bone mass during youth is the best defense.",
      "Healthy lifestyle and adequate nutrition before and after menopause."
    ],
    "riskFactors": [
      "Primary: Age, female sex, postmenopausal status.",
      "Secondary: Low body weight, family history, smoking, excessive alcohol, long-term corticosteroid use."
    ],
    "warningSigns": [
      "A fracture is a major warning sign of advanced osteoporosis. Any fracture from a low-impact incident requires evaluation and aggressive treatment for osteoporosis."
    ]
  },
  {
    "id": "rotator-cuff-tendinitis",
    "name": "Rotator Cuff Tendinitis",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Very common, especially among athletes and manual laborers.",
    "description": "Rotator Cuff Tendinitis is the inflammation or irritation of the tendons and muscles that help move the shoulder joint. It is often caused by repetitive overhead activities or degeneration of the tendon with age. It is a common cause of shoulder pain.",
    "desc": "Rotator Cuff Tendinitis is the inflammation or irritation of the tendons and muscles that help move the shoulder joint. It is often caused by repetitive overhead activities or degeneration of the tendon with age. It is a common cause of shoulder pain.",
    "symptoms": [
      "Dull ache deep in the shoulder.",
      "Disturbed sleep, especially if you lie on the affected shoulder.",
      "Difficulty with overhead activities.",
      "Pain when lowering the arm from a raised position.",
      "Weakness in the arm."
    ],
    "causes": [
      "Overuse or repetitive stress on the rotator cuff tendons, causing inflammation and micro-tears. It can also be due to age-related wear and tear."
    ],
    "treatment": [
      "Rest and activity modification.",
      "Physical Therapy: To strengthen the rotator cuff muscles.",
      "NSAIDs for pain and inflammation.",
      "Corticosteroid Injections for severe pain.",
      "Surgery (arthroscopic debridement or repair) for tears that don't improve."
    ],
    "selfCare": [
      "Apply ice to the shoulder for 15-20 minutes several times a day.",
      "Avoid activities that cause pain.",
      "Perform prescribed stretching and strengthening exercises.",
      "Lifestyle Recommendations",
      "Maintain good posture.",
      "Warm up properly before exercise or overhead work."
    ],
    "prevention": [
      "Regular shoulder strengthening and stretching exercises.",
      "Proper technique in sports and work activities."
    ],
    "riskFactors": [
      "Primary: Repetitive overhead motion (e.g., painting, swimming, tennis).",
      "Secondary: Age (degenerative changes), poor posture."
    ],
    "warningSigns": [
      "If you experience a sudden, severe tear with significant weakness after an injury, seek prompt medical care."
    ]
  },
  {
    "id": "olecranon-bursitis",
    "name": "Olecranon Bursitis",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Common.",
    "description": "Olecranon Bursitis is the inflammation of the bursa located at the tip of the elbow (the olecranon). A bursa is a small, fluid-filled sac that acts as a cushion between bones and soft tissues. When it becomes inflamed, it fills with excess fluid, causing a visible swelling at the back of the elbow.",
    "desc": "Olecranon Bursitis is the inflammation of the bursa located at the tip of the elbow (the olecranon). A bursa is a small, fluid-filled sac that acts as a cushion between bones and soft tissues. When it becomes inflamed, it fills with excess fluid, causing a visible swelling at the back of the elbow.",
    "symptoms": [
      "Swelling at the tip of the elbow. The swelling may develop gradually or suddenly.",
      "Pain, especially when bending the elbow or applying pressure.",
      "Redness and warmth if the bursa is infected or severely inflamed."
    ],
    "causes": [
      "Trauma: A hard blow to the elbow.",
      "Prolonged Pressure: Leaning on the elbow for long periods on hard surfaces.",
      "Infection: Bacteria entering through a cut or insect bite near the bursa.",
      "Medical Conditions: Gout, rheumatoid arthritis."
    ],
    "treatment": [
      "Protection and Rest: Avoid activities that put pressure on the elbow.",
      "Ice Packs to reduce swelling.",
      "NSAIDs for pain and inflammation.",
      "Elbow Pads for protection.",
      "Aspiration: Draining the bursa fluid with a needle, sometimes followed by a corticosteroid injection.",
      "Antibiotics for septic bursitis.",
      "Surgery to remove the bursa in chronic, recurrent cases."
    ],
    "selfCare": [
      "Use elbow pads when engaging in activities that could injure the elbow.",
      "Avoid leaning on your elbows.",
      "If you have a cut near your elbow, keep it clean and covered.",
      "Lifestyle Recommendations",
      "Manage underlying conditions like gout or RA."
    ],
    "prevention": [
      "Wear protective elbow pads during high-risk activities.",
      "Avoid putting constant pressure on your elbows."
    ],
    "riskFactors": [
      "Primary: Trauma to the elbow, prolonged pressure (leaning on elbows).",
      "Secondary: Infection, inflammatory conditions (rheumatoid arthritis, gout)."
    ],
    "warningSigns": [
      "Seek immediate care if the elbow is red, warm, and very painful, especially if you have a fever, as this could indicate septic bursitis (an infection), which is a serious condition."
    ]
  },
  {
    "id": "fibromyalgia",
    "name": "Fibromyalgia",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Common, affecting about 2-4% of the population, predominantly women.",
    "description": "Fibromyalgia is a chronic disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory, and mood issues. It is believed to amplify painful sensations by affecting the way the brain processes pain signals.",
    "desc": "Fibromyalgia is a chronic disorder characterized by widespread musculoskeletal pain accompanied by fatigue, sleep, memory, and mood issues. It is believed to amplify painful sensations by affecting the way the brain processes pain signals.",
    "symptoms": [
      "Widespread pain: A constant dull ache that has lasted for at least three months.",
      "Fatigue and tiredness upon waking.",
      "Cognitive difficulties (\"fibro fog\").",
      "Headaches, depression, anxiety.",
      "Irritable bowel syndrome."
    ],
    "causes": [
      "The exact cause is unknown, but it likely involves a combination of genetics and triggers like infection or physical/emotional stress. It involves abnormal levels of certain brain chemicals and a phenomenon called central sensitization."
    ],
    "treatment": [
      "Anticonvulsants (e.g., pregabalin).",
      "Antidepressants (e.g., duloxetine, milnacipran).",
      "Therapy: Cognitive Behavioral Therapy (CBT), physical therapy.",
      "Lifestyle modifications: Stress reduction, gentle exercise, good sleep hygiene."
    ],
    "selfCare": [
      "Reduce stress through meditation, yoga, or other relaxation techniques.",
      "Establish a consistent sleep routine.",
      "Pace yourself; don't overdo it on good days.",
      "Engage in gentle, regular exercise like walking or swimming.",
      "Lifestyle Recommendations",
      "Join a support group."
    ],
    "prevention": [
      "There is no known way to prevent fibromyalgia."
    ],
    "riskFactors": [
      "Primary: Female sex, family history.",
      "Secondary: Rheumatic diseases, PTSD, physical or emotional trauma."
    ],
    "warningSigns": [
      "Fibromyalgia is not life-threatening but can be severely debilitating. Seek a diagnosis to rule out other conditions and begin management."
    ]
  },
  {
    "id": "duchenne-muscular-dystrophy",
    "name": "Duchenne Muscular Dystrophy",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "The most common and severe form of muscular dystrophy in children.",
    "description": "Duchenne Muscular Dystrophy (DMD) is a severe, progressive, genetic muscle-wasting disorder caused by the absence of dystrophin, a protein that helps keep muscle cells intact. It primarily affects boys, with symptoms usually beginning between ages 3 and 5.",
    "desc": "Duchenne Muscular Dystrophy (DMD) is a severe, progressive, genetic muscle-wasting disorder caused by the absence of dystrophin, a protein that helps keep muscle cells intact. It primarily affects boys, with symptoms usually beginning between ages 3 and 5.",
    "symptoms": [
      "Frequent falls, difficulty rising from the floor.",
      "Large calf muscles (pseudohypertrophy).",
      "Waddling gait, toe walking.",
      "Progressive muscle weakness, starting in the hips/pelvis and thighs.",
      "Loss of ability to walk by early teens.",
      "Eventually affects heart and respiratory muscles."
    ],
    "causes": [
      "A mutation in the DMD gene on the X chromosome, which provides instructions for making the dystrophin protein."
    ],
    "treatment": [
      "Corticosteroids (e.g., prednisone, deflazacort): The standard of care to slow muscle degeneration.",
      "Physical, Occupational, and Respiratory Therapy.",
      "Cardiac and respiratory support.",
      "Newer genetic therapies (e.g., Exondys 51) that target specific mutations."
    ],
    "selfCare": [
      "(For caregivers)",
      "Encourage activity and mobility for as long as possible.",
      "Prevent contractures with stretching and braces.",
      "Monitor for respiratory and cardiac complications.",
      "Lifestyle Recommendations",
      "Ensure good nutrition to maintain a healthy weight."
    ],
    "prevention": [
      "Genetic counseling and testing for female carriers.",
      "Prenatal testing is available."
    ],
    "riskFactors": [
      "Primary: Being male, family history (X-linked recessive inheritance)."
    ],
    "warningSigns": [
      "Early diagnosis is key for intervention. Be concerned if a young boy has delayed motor milestones, difficulty running/jumping, or a Gowers' maneuver (using hands to \"walk\" up the legs when rising from the floor)."
    ]
  },
  {
    "id": "adolescent-idiopathic-scoliosis",
    "name": "Adolescent Idiopathic Scoliosis",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Common, affecting 2-3% of adolescents. • More common in girls, and girls are more likely to have curves that progress.",
    "description": "Adolescent Idiopathic Scoliosis (AIS) is a lateral (side-to-side) curvature of the spine that occurs in children aged 10 to 18, for which the cause is unknown (\"idiopathic\"). It is a three-dimensional deformity that can involve rotation of the vertebrae.",
    "desc": "Adolescent Idiopathic Scoliosis (AIS) is a lateral (side-to-side) curvature of the spine that occurs in children aged 10 to 18, for which the cause is unknown (\"idiopathic\"). It is a three-dimensional deformity that can involve rotation of the vertebrae.",
    "symptoms": [
      "Uneven shoulders or waist.",
      "One shoulder blade that appears more prominent.",
      "One hip higher than the other.",
      "The body leans to one side.",
      "Back pain is not common in AIS but can occur."
    ],
    "causes": [
      "The cause is unknown, but it is believed to involve a combination of genetic and hormonal factors, and possibly nervous system dysfunction."
    ],
    "treatment": [
      "Treatment depends on the curve magnitude and skeletal maturity.",
      "Observation: For small curves (<25 degrees).",
      "Bracing: To prevent progression of moderate curves (25-45 degrees) in patients who are still growing.",
      "Surgery (Spinal Fusion): For severe curves (>45-50 degrees) that are likely to progress."
    ],
    "selfCare": [
      "Wear the brace as prescribed if recommended.",
      "Maintain a healthy weight.",
      "Stay active; exercise does not worsen scoliosis and is beneficial for overall health.",
      "Lifestyle Recommendations",
      "Regular check-ups with an orthopedic surgeon are crucial during growth."
    ],
    "prevention": [
      "There is no known way to prevent AIS. Screening allows for early detection and management."
    ],
    "riskFactors": [
      "Primary: Female sex, family history.",
      "Secondary: Age (growth spurt just before puberty)."
    ],
    "warningSigns": [
      "Scoliosis is not an emergency, but early detection is important to monitor for progression. Signs include uneven shoulders, a prominent shoulder blade, uneven waist, or one hip higher than the other."
    ]
  },
  {
    "id": "compound-fracture",
    "name": "Compound Fracture",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "A common type of fracture from high-energy trauma.",
    "description": "A Compound Fracture, also known as an open fracture, is a break in the bone where the fractured bone pierces through the skin. This creates an open wound, making the injury highly susceptible to infection and requiring immediate medical attention.",
    "desc": "A Compound Fracture, also known as an open fracture, is a break in the bone where the fractured bone pierces through the skin. This creates an open wound, making the injury highly susceptible to infection and requiring immediate medical attention.",
    "symptoms": [
      "A visible break in the skin with the bone protruding.",
      "Severe pain.",
      "Bleeding.",
      "Swelling and bruising.",
      "Obvious deformity of the limb.",
      "Numbness or tingling below the fracture site."
    ],
    "causes": [
      "A severe force that breaks the bone with enough energy to also tear the skin and soft tissues."
    ],
    "treatment": [
      "Emergency Care: Stabilization, IV antibiotics to prevent infection, tetanus shot.",
      "Surgery: Urgent irrigation and debridement (cleaning) of the wound and fracture site to remove contaminated tissue. The bone is then stabilized with internal (plates/screws) or external fixation.",
      "Wound management and closure."
    ],
    "selfCare": [
      "(During recovery)",
      "Keep the wound clean and dry.",
      "Take all prescribed antibiotics.",
      "Attend all follow-up appointments.",
      "Participate in physical therapy.",
      "Lifestyle Recommendations",
      "Ensure good nutrition to support bone healing."
    ],
    "prevention": [
      "Use safety equipment (seatbelts, helmets).",
      "Fall prevention strategies for the elderly.",
      "Maintain bone health (calcium, vitamin D, exercise)."
    ],
    "riskFactors": [
      "Primary: High-impact trauma (car accidents, falls from height, gunshot wounds).",
      "Secondary: Osteoporosis (can make a simple fall lead to a severe fracture)."
    ],
    "warningSigns": [
      "This is a medical emergency. Call 911. Do not try to push the bone back in. Cover the wound with a sterile dressing if available."
    ]
  },
  {
    "id": "ankle-sprain",
    "name": "Ankle Sprain",
    "category": "Musculoskeletal",
    "severity": "Low",
    "prevalence": "One of the most common musculoskeletal injuries.",
    "description": "An Ankle Sprain is an injury that occurs when one or more of the ligaments in the ankle are stretched or torn, usually by a sudden twisting or rolling motion. The most common type is an inversion sprain, injuring the ligaments on the outside of the ankle.",
    "desc": "An Ankle Sprain is an injury that occurs when one or more of the ligaments in the ankle are stretched or torn, usually by a sudden twisting or rolling motion. The most common type is an inversion sprain, injuring the ligaments on the outside of the ankle.",
    "symptoms": [
      "Pain, especially when bearing weight.",
      "Swelling and bruising.",
      "Tenderness to touch.",
      "Instability of the ankle.",
      "Restricted range of motion."
    ],
    "causes": [
      "The foot rolls inward or outward unexpectedly, forcing the ankle joint into a position beyond its normal range of motion, overstretching or tearing the ligaments."
    ],
    "treatment": [
      "Rest: Avoid activities that cause pain.",
      "Ice: Apply for 15-20 minutes every 2-3 hours.",
      "Compression: Use an elastic bandage to reduce swelling.",
      "Elevation: Raise the ankle above heart level.",
      "NSAIDs for pain and inflammation.",
      "Physical Therapy for moderate to severe sprains to restore strength and prevent recurrence."
    ],
    "selfCare": [
      "Follow the R.I.C.E. protocol immediately after injury.",
      "Use crutches if bearing weight is too painful.",
      "Wear a brace for support during recovery.",
      "Lifestyle Recommendations",
      "Perform balance and strengthening exercises to prevent future sprains."
    ],
    "prevention": [
      "Wear proper, supportive footwear.",
      "Warm up before exercise.",
      "Be mindful of walking/running surfaces."
    ],
    "riskFactors": [
      "Primary: Participation in sports, walking or running on uneven surfaces.",
      "Secondary: Previous ankle sprain, poor conditioning."
    ],
    "warningSigns": [
      "Seek medical care if you are unable to bear weight on the ankle, have significant swelling, or if you heard a \"pop\" sound, as this could indicate a more severe sprain or a fracture."
    ]
  },
  {
    "id": "hamstring-strain",
    "name": "Hamstring Strain",
    "category": "Musculoskeletal",
    "severity": "Low",
    "prevalence": "A very common sports injury.",
    "description": "A Hamstring Strain is an injury to one or more of the three muscles at the back of the thigh (the hamstrings). It ranges from a mild \"pull\" (overstretching) to a complete tear of the muscle fibers.",
    "desc": "A Hamstring Strain is an injury to one or more of the three muscles at the back of the thigh (the hamstrings). It ranges from a mild \"pull\" (overstretching) to a complete tear of the muscle fibers.",
    "symptoms": [
      "Sudden, sharp pain in the back of the thigh.",
      "A \"popping\" or tearing sensation at the time of injury.",
      "Swelling and tenderness within a few hours.",
      "Bruising or discoloration.",
      "Weakness in the hamstring."
    ],
    "causes": [
      "The muscle is stretched beyond its capacity or subjected to a sudden, heavy load, often during sprinting when the muscle is both lengthening and contracting."
    ],
    "treatment": [
      "R.I.C.E. Protocol (Rest, Ice, Compression, Elevation).",
      "NSAIDs for pain and swelling.",
      "Physical Therapy: Crucial for rehabilitation, focusing on gentle stretching and progressive strengthening.",
      "Surgery is rarely needed, only for complete tears at the tendon-bone connection."
    ],
    "selfCare": [
      "Avoid stretching the hamstring aggressively in the first few days; let pain be your guide.",
      "Use crutches for a severe strain.",
      "Gradually return to activity only after pain has resolved and strength is regained.",
      "Lifestyle Recommendations",
      "Always warm up properly before exercise.",
      "Incorporate hamstring stretching and strengthening into your regular routine."
    ],
    "prevention": [
      "Consistent stretching and strengthening of the hamstrings and surrounding muscles.",
      "Adequate warm-up before explosive activities."
    ],
    "riskFactors": [
      "Primary: Sports involving sprinting or kicking (soccer, football, track).",
      "Secondary: Tight hamstrings, muscle fatigue, previous hamstring injury."
    ],
    "warningSigns": [
      "A severe strain with a \"pop\" sound and immediate inability to walk requires prompt medical evaluation to assess the extent of the tear."
    ]
  },
  {
    "id": "shoulder-dislocation",
    "name": "Shoulder Dislocation",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "The most common major joint dislocation.",
    "description": "A Shoulder Dislocation occurs when the head of the upper arm bone (humerus) pops out of the cup-shaped socket (glenoid) of the shoulder blade (scapula). The shoulder is the body's most mobile and most commonly dislocated joint.",
    "desc": "A Shoulder Dislocation occurs when the head of the upper arm bone (humerus) pops out of the cup-shaped socket (glenoid) of the shoulder blade (scapula). The shoulder is the body's most mobile and most commonly dislocated joint.",
    "symptoms": [
      "A visibly deformed or out-of-place shoulder.",
      "Swelling or bruising.",
      "Intense pain.",
      "Inability to move the joint.",
      "Numbness, weakness, or tingling near the injury (e.g., down the arm)."
    ],
    "causes": [
      "A forceful blow or extreme rotation that forces the ball of the humerus out of the shallow shoulder socket."
    ],
    "treatment": [
      "Closed Reduction: A doctor will gently maneuver the arm bone back into the socket. Pain medication or sedation is often used.",
      "Immobilization: Using a sling or shoulder immobilizer for a few weeks.",
      "Rehabilitation: Physical therapy to restore range of motion and strengthen the muscles.",
      "Surgery: For recurrent dislocations or if there is significant tissue damage."
    ],
    "selfCare": [
      "After reduction, wear the sling as directed.",
      "Ice the shoulder to reduce pain and swelling.",
      "Perform rehabilitation exercises as prescribed to prevent stiffness and future dislocations.",
      "Lifestyle Recommendations",
      "Avoid risky activities until the shoulder is fully healed and strengthened."
    ],
    "prevention": [
      "Shoulder strengthening exercises are the best way to prevent recurrence."
    ],
    "riskFactors": [
      "Primary: Trauma (falls, sports injuries).",
      "Secondary: Previous dislocation (makes the joint unstable and prone to recurrence)."
    ],
    "warningSigns": [
      "A dislocated shoulder is a painful medical emergency. Go to the ER. Do not try to pop it back in yourself, as you can damage nerves and blood vessels."
    ]
  },
  {
    "id": "chronic-lower-back-pain",
    "name": "Chronic Lower Back Pain",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "A leading cause of disability worldwide.",
    "description": "Chronic Lower Back Pain is defined as pain that persists for 12 weeks or longer, even after an initial injury or underlying cause of acute low back pain has been treated. It is a very common condition with a significant impact on quality of life.",
    "desc": "Chronic Lower Back Pain is defined as pain that persists for 12 weeks or longer, even after an initial injury or underlying cause of acute low back pain has been treated. It is a very common condition with a significant impact on quality of life.",
    "symptoms": [
      "A persistent ache or stiffness anywhere along the spine.",
      "Sharp, localized pain in the lower back.",
      "Chronic aching after sitting or standing for long periods.",
      "Pain that radiates from the low back to the buttocks and down the leg (sciatica)."
    ],
    "causes": [
      "Degenerative disc disease.",
      "Herniated disc.",
      "Spinal stenosis.",
      "Arthritis.",
      "Myofascial pain syndrome."
    ],
    "treatment": [
      "Physical Therapy and Exercise: The cornerstone of treatment.",
      "Cognitive Behavioral Therapy (CBT): To address the psychological aspects of chronic pain.",
      "Medications: NSAIDs, antidepressants, anticonvulsants for nerve pain.",
      "Interventional Procedures: Epidural steroid injections, nerve blocks.",
      "Surgery: Only for specific anatomical problems."
    ],
    "selfCare": [
      "Stay active; prolonged bed rest is not helpful.",
      "Practice good posture.",
      "Learn proper lifting techniques.",
      "Use heat or cold packs for pain relief.",
      "Lifestyle Recommendations",
      "Lose weight if overweight.",
      "Quit smoking.",
      "Manage stress."
    ],
    "prevention": [
      "Regular exercise to strengthen core and back muscles.",
      "Maintain a healthy weight.",
      "Use ergonomic furniture."
    ],
    "riskFactors": [
      "Primary: Age, sedentary lifestyle, obesity.",
      "Secondary: Physically demanding job, smoking, psychological conditions (depression, anxiety)."
    ],
    "warningSigns": [
      "Loss of bowel or bladder control.",
      "Severe or progressive numbness/weakness in the legs.",
      "Fever.",
      "Unexplained weight loss. (Could indicate cauda equina syndrome, infection, or cancer)."
    ]
  },
  {
    "id": "cervicalgia-neck-pain",
    "name": "Cervicalgia (Neck Pain)",
    "category": "Musculoskeletal",
    "severity": "Low",
    "prevalence": "Very common.",
    "description": "Cervicalgia is the general medical term for pain in the neck region. It is an extremely common complaint that can stem from a variety of problems, including muscle strain, worn joints, nerve compression, or injury.",
    "desc": "Cervicalgia is the general medical term for pain in the neck region. It is an extremely common complaint that can stem from a variety of problems, including muscle strain, worn joints, nerve compression, or injury.",
    "symptoms": [
      "Pain that is often worsened by holding the head in one position for long periods.",
      "Muscle tightness and spasms.",
      "Decreased ability to move the head.",
      "Headache."
    ],
    "causes": [
      "Muscle strains from poor posture or overuse.",
      "Worn joints (cervical osteoarthritis).",
      "Herniated discs.",
      "Nerve compression.",
      "Injuries (e.g., whiplash)."
    ],
    "treatment": [
      "Self-care: Ice/heat, over-the-counter pain relievers, gentle stretching.",
      "Physical Therapy: To strengthen and stretch neck muscles.",
      "Improving Ergonomics: Adjusting workstation and posture.",
      "Prescription medications or injections for more severe pain."
    ],
    "selfCare": [
      "Use a supportive pillow when sleeping.",
      "Take frequent breaks from your desk or computer.",
      "Practice good posture (ears over shoulders).",
      "Perform gentle neck stretches.",
      "Lifestyle Recommendations",
      "Manage stress, as it can cause muscle tension."
    ],
    "prevention": [
      "Maintain good posture.",
      "Set up an ergonomic workspace.",
      "Stay active and include neck-strengthening exercises."
    ],
    "riskFactors": [
      "Primary: Age (wear and tear), poor posture (\"text neck\").",
      "Secondary: Occupational strain (desk work), whiplash injury, stress."
    ],
    "warningSigns": [
      "Radiating pain/numbness/weakness into shoulders, arms, or hands.",
      "Loss of bowel or bladder control.",
      "Severe headache with a stiff neck. (Could indicate meningitis)."
    ]
  },
  {
    "id": "scheuermanns-kyphosis",
    "name": "Scheuermann's Kyphosis",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "A common cause of structural kyphosis in adolescents.",
    "description": "Scheuermann's Kyphosis is a developmental disorder of the spine that causes a rounded, hunched back (kyphosis). It occurs when the front of the upper spine doesn't grow as fast as the back, causing the vertebrae to become wedge-shaped, leading to a forward curvature.",
    "desc": "Scheuermann's Kyphosis is a developmental disorder of the spine that causes a rounded, hunched back (kyphosis). It occurs when the front of the upper spine doesn't grow as fast as the back, causing the vertebrae to become wedge-shaped, leading to a forward curvature.",
    "symptoms": [
      "A rounded, hunched back appearance (the curve is rigid and does not correct with posture change).",
      "Back pain, which is often mild but can be severe.",
      "Fatigue in the back after sitting/standing.",
      "Tight hamstrings."
    ],
    "causes": [
      "The cause is unknown, but it is believed to involve a growth abnormality of the vertebral endplates during puberty."
    ],
    "treatment": [
      "Observation: For small curves and skeletally immature patients.",
      "Physical Therapy: To improve posture and core strength.",
      "Bracing: For moderate curves in patients who are still growing.",
      "Surgery: For severe curves (>75 degrees) that cause pain or breathing problems."
    ],
    "selfCare": [
      "Wear the brace as prescribed.",
      "Stay active with low-impact exercises.",
      "Perform core-strengthening exercises.",
      "Lifestyle Recommendations",
      "Regular follow-up with an orthopedic surgeon."
    ],
    "prevention": [
      "There is no known way to prevent Scheuermann's kyphosis."
    ],
    "riskFactors": [
      "Primary: Adolescent growth spurt.",
      "Secondary: Genetics."
    ],
    "warningSigns": [
      "A progressive condition best managed when diagnosed early. Look for a rigid, rounded back that doesn't straighten when the adolescent bends forward."
    ]
  },
  {
    "id": "lordosis",
    "name": "Lordosis",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Common.",
    "description": "Lordosis is an excessive inward curvature of the spine, typically in the lower back (lumbar) or neck (cervical) regions. A small degree of lordosis is normal, but excessive curvature can lead to pain and postural problems.",
    "desc": "Lordosis is an excessive inward curvature of the spine, typically in the lower back (lumbar) or neck (cervical) regions. A small degree of lordosis is normal, but excessive curvature can lead to pain and postural problems.",
    "symptoms": [
      "The main sign is an exaggerated posture, with the buttocks appearing more prominent.",
      "Low back pain.",
      "Discomfort that worsens with activity.",
      "Limited mobility."
    ],
    "causes": [
      "Postural: From having a large abdomen (e.g., obesity, pregnancy).",
      "Congenital: Present from birth.",
      "Secondary: To other spinal conditions or neuromuscular diseases."
    ],
    "treatment": [
      "Physical Therapy: To strengthen core and hip muscles and improve posture.",
      "Weight Loss: If obesity is a contributing factor.",
      "Pain Management: NSAIDs, pain relievers.",
      "Bracing: In children and teens.",
      "Surgery: Only in severe cases with neurological involvement."
    ],
    "selfCare": [
      "Practice good posture when sitting and standing.",
      "Sleep on a firm mattress.",
      "Perform core-strengthening exercises (e.g., pelvic tilts, planks).",
      "Lifestyle Recommendations",
      "Maintain a healthy weight."
    ],
    "prevention": [
      "Maintaining good posture and a healthy weight can help prevent postural lordosis."
    ],
    "riskFactors": [
      "Primary: Poor posture, obesity.",
      "Secondary: Certain conditions like spondylolisthesis, osteoporosis, discitis."
    ],
    "warningSigns": [
      "Usually not an emergency. Seek evaluation if the curve is rigid, painful, or getting worse, or if it's accompanied by neurological symptoms."
    ]
  },
  {
    "id": "knee-joint-effusion",
    "name": "Knee Joint Effusion",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "A very common symptom of many knee conditions.",
    "description": "Knee Joint Effusion, commonly known as \"water on the knee,\" is the accumulation of excess fluid in or around the knee joint. It is a sign of an underlying problem, such as injury, overuse, or disease.",
    "desc": "Knee Joint Effusion, commonly known as \"water on the knee,\" is the accumulation of excess fluid in or around the knee joint. It is a sign of an underlying problem, such as injury, overuse, or disease.",
    "symptoms": [
      "Swelling and puffiness around the bony parts of the knee.",
      "Stiffness and difficulty bending or straightening the knee.",
      "Pain, which can range from a dull ache to severe pain depending on the cause."
    ],
    "causes": [
      "Injuries: Torn ligament (ACL), meniscus tear, fracture.",
      "Diseases: Osteoarthritis, rheumatoid arthritis, gout, septic arthritis.",
      "Overuse."
    ],
    "treatment": [
      "Treat the underlying cause.",
      "R.I.C.E. Protocol (Rest, Ice, Compression, Elevation).",
      "NSAIDs for pain and inflammation.",
      "Aspiration (Arthrocentesis): Draining the fluid with a needle, which can also be sent for analysis.",
      "Corticosteroid Injection after aspiration to reduce inflammation."
    ],
    "selfCare": [
      "Rest the knee and avoid activities that worsen the pain.",
      "Ice the knee for 15-20 minutes several times a day.",
      "Use a compression bandage.",
      "Keep the knee elevated when resting.",
      "Lifestyle Recommendations",
      "Strengthen the muscles around the knee to provide better support."
    ],
    "prevention": [
      "Preventing knee injuries through proper technique and strength training."
    ],
    "riskFactors": [
      "Primary: Trauma, overuse.",
      "Secondary: Arthritis (OA, RA, gout), infection."
    ],
    "warningSigns": [
      "Fever, redness, and warmth (signs of infection).",
      "Inability to bear weight.",
      "A popping sound at the time of injury."
    ]
  },
  {
    "id": "carpal-tunnel-syndrome-169",
    "name": "Carpal Tunnel Syndrome",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Variable prevalence depending on demographics and global region.",
    "description": "(Note: This is a duplicate of #148. The information is identical.)",
    "desc": "(Note: This is a duplicate of #148. The information is identical.)",
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
    "id": "full-thickness-rotator-cuff-tear",
    "name": "Full-Thickness Rotator Cuff Tear",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Common, especially with increasing age.",
    "description": "A Full-Thickness Rotator Cuff Tear is a complete tear of one of the rotator cuff tendons in the shoulder, meaning the tendon is torn all the way through, detaching the muscle from the bone. This can result from an acute injury or from chronic degeneration.",
    "desc": "A Full-Thickness Rotator Cuff Tear is a complete tear of one of the rotator cuff tendons in the shoulder, meaning the tendon is torn all the way through, detaching the muscle from the bone. This can result from an acute injury or from chronic degeneration.",
    "symptoms": [
      "Deep, aching pain in the shoulder, often worse at night.",
      "Significant weakness in the arm, especially with lifting or rotating.",
      "Inability to raise the arm actively (due to pain/weakness), though it can be moved passively.",
      "A crackling sensation (crepitus) when moving the shoulder."
    ],
    "causes": [
      "Acute Tear: From a fall, lifting something heavy, or a sudden forceful movement.",
      "Degenerative Tear: Slow wearing of the tendon over time due to repetitive stress, decreased blood flow, and bone spurs."
    ],
    "treatment": [
      "Conservative Treatment: For less active individuals or those with partial tears. Includes rest, NSAIDs, physical therapy, and corticosteroid injections.",
      "Surgery (Rotator Cuff Repair): The primary treatment for active individuals with a full-thickness tear, especially if it's causing significant weakness. The tendon is reattached to the bone, often arthroscopically."
    ],
    "selfCare": [
      "After surgery, follow the strict rehabilitation protocol. Do not use the arm for lifting until cleared by your surgeon.",
      "Use a sling as directed post-operatively.",
      "Attend all physical therapy sessions.",
      "Lifestyle Recommendations",
      "Modify activities to avoid reinjury."
    ],
    "prevention": [
      "Maintain shoulder strength and flexibility.",
      "Practice proper technique in sports and work."
    ],
    "riskFactors": [
      "Primary: Age-related degeneration, repetitive overhead activities.",
      "Secondary: Acute trauma, smoking, family history."
    ],
    "warningSigns": [
      "A sudden tear from an injury with immediate weakness and pain requires prompt evaluation. Chronic tears cause progressive weakness and difficulty with overhead activities."
    ]
  },
  {
    "id": "achilles-tendon-rupture",
    "name": "Achilles Tendon Rupture",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Most common tendon rupture in the lower extremity.",
    "description": "An Achilles Tendon Rupture is a complete or partial tear of the Achilles tendon, the large tendon that connects the calf muscles to the heel bone. This injury typically occurs during recreational sports that involve running, jumping, and sudden accelerations.",
    "desc": "An Achilles Tendon Rupture is a complete or partial tear of the Achilles tendon, the large tendon that connects the calf muscles to the heel bone. This injury typically occurs during recreational sports that involve running, jumping, and sudden accelerations.",
    "symptoms": [
      "The feeling of being kicked or shot in the back of the calf.",
      "A loud \"pop\" or \"snap\" sound at the time of injury.",
      "Severe pain and swelling near the heel.",
      "Inability to bend the foot downward or \"push off\" the injured leg when walking.",
      "Difficulty standing on tiptoe."
    ],
    "causes": [
      "A sudden, forceful stress on the tendon, often when pushing off the foot while the knee is straight. Degenerative changes in the tendon can make it more susceptible to rupture."
    ],
    "treatment": [
      "Non-Surgical (Conservative): Involves casting or bracing the ankle in a pointed-toe position to allow the torn ends to heal together. Often used for less active individuals.",
      "Surgical Repair: Involves stitching the torn tendon back together. This is often recommended for younger, active individuals as it has a lower re-rupture rate."
    ],
    "selfCare": [
      "Follow R.I.C.E. immediately after injury (Rest, Ice, Compression, Elevation).",
      "Whether surgical or conservative, strict adherence to the rehabilitation protocol is critical.",
      "Attend all physical therapy appointments to regain strength and range of motion.",
      "Lifestyle Recommendations",
      "Gradually return to sports only after full medical clearance."
    ],
    "prevention": [
      "Consistently stretch and strengthen calf muscles.",
      "Increase intensity of physical activity gradually.",
      "Wear proper footwear."
    ],
    "riskFactors": [
      "Primary: Age (30-40), participation in sports with sudden bursts of activity (e.g., basketball, tennis).",
      "Secondary: Steroid injections, fluoroquinolone antibiotics, prior tendonitis."
    ],
    "warningSigns": [
      "This is a significant injury requiring prompt medical attention. Seek care immediately if you hear a \"pop\" in the back of your heel and have difficulty walking."
    ]
  },
  {
    "id": "medial-tibial-stress-syndrome-shin-splints",
    "name": "Medial Tibial Stress Syndrome (Shin Splints)",
    "category": "Musculoskeletal",
    "severity": "Low",
    "prevalence": "Extremely common among athletes.",
    "description": "Medial Tibial Stress Syndrome (MTSS), commonly known as shin splints, is pain along the inner edge of the shinbone (tibia). It is an overuse injury common in runners and military recruits, caused by inflammation of the muscles, tendons, and bone tissue around the tibia.",
    "desc": "Medial Tibial Stress Syndrome (MTSS), commonly known as shin splints, is pain along the inner edge of the shinbone (tibia). It is an overuse injury common in runners and military recruits, caused by inflammation of the muscles, tendons, and bone tissue around the tibia.",
    "symptoms": [
      "Dull, aching pain along the inner part of the lower leg.",
      "Pain that is initially present at the start of exercise and may decrease during activity, but returns afterward.",
      "Pain that may progress to a more constant ache.",
      "Tenderness to the touch along the inner border of the shinbone."
    ],
    "causes": [
      "Repetitive stress on the shinbone and the connective tissues that attach muscles to the bone. The stress causes inflammation and micro-tears."
    ],
    "treatment": [
      "Rest: The primary treatment. Avoid activities that cause pain.",
      "Ice: Apply ice packs to the affected area for 15-20 minutes, several times a day.",
      "NSAIDs for pain and inflammation.",
      "Orthotics or proper footwear to correct biomechanical issues.",
      "Physical therapy for stretching and strengthening."
    ],
    "selfCare": [
      "Analyze your gait and footwear.",
      "Cross-train with low-impact activities like swimming or cycling while recovering.",
      "Stretch the muscles of your lower legs regularly.",
      "Lifestyle Recommendations",
      "Increase training intensity and duration gradually (the 10% rule per week)."
    ],
    "prevention": [
      "Wear shoes with good arch support and cushioning.",
      "Run on softer surfaces when possible.",
      "Incorporate strength training for the lower legs."
    ],
    "riskFactors": [
      "Primary: Sudden increase in duration, frequency, or intensity of exercise.",
      "Secondary: Flat feet or rigid arches, running on hard surfaces, improper footwear."
    ],
    "warningSigns": [
      "Shin splints are not typically an emergency. However, if pain is severe, persists during rest, or is localized to a specific point (which could indicate a stress fracture), seek medical evaluation."
    ]
  },
  {
    "id": "lateral-epicondylitis-tennis-elbow",
    "name": "Lateral Epicondylitis (Tennis Elbow)",
    "category": "Musculoskeletal",
    "severity": "Low",
    "prevalence": "Very common.",
    "description": "Lateral Epicondylitis, or Tennis Elbow, is a painful condition of the elbow caused by overuse. It is an inflammation of the tendons that join the forearm muscles on the outside of the elbow. These muscles extend the wrist and fingers. Despite the name, most people who get it are not tennis players.",
    "desc": "Lateral Epicondylitis, or Tennis Elbow, is a painful condition of the elbow caused by overuse. It is an inflammation of the tendons that join the forearm muscles on the outside of the elbow. These muscles extend the wrist and fingers. Despite the name, most people who get it are not tennis players.",
    "symptoms": [
      "Pain or burning on the outer part of the elbow.",
      "Weak grip strength.",
      "Pain that worsens with forearm activity (e.g., shaking hands, turning a doorknob, holding a coffee cup)."
    ],
    "causes": [
      "Repetitive contraction of the forearm muscles used to straighten and raise the hand and wrist. This leads to small tears in the tendons attached to the lateral epicondyle."
    ],
    "treatment": [
      "Rest and activity modification.",
      "Physical Therapy to stretch and strengthen the forearm muscles.",
      "Brace: A counterforce brace worn over the forearm muscle.",
      "NSAIDs.",
      "Corticosteroid Injections for short-term pain relief.",
      "Surgery is rare, for cases that don't improve after 6-12 months."
    ],
    "selfCare": [
      "Apply ice to the outside of the elbow for 15 minutes, 3-4 times a day.",
      "Use proper technique and equipment in your activities.",
      "Perform eccentric strengthening exercises as prescribed.",
      "Lifestyle Recommendations",
      "Take frequent breaks from repetitive tasks."
    ],
    "prevention": [
      "Strengthen forearm muscles.",
      "Stretch before activity.",
      "Use lightweight tools with larger grips."
    ],
    "riskFactors": [
      "Primary: Repetitive gripping and wrist extension activities (e.g., plumbing, painting, carpentry, computer use).",
      "Secondary: Age (most common between 30-50)."
    ],
    "warningSigns": [
      "Not an emergency, but seek evaluation if pain is severe or does not improve with rest, as it can become chronic."
    ]
  },
  {
    "id": "medial-epicondylitis-golfers-elbow",
    "name": "Medial Epicondylitis (Golfer's Elbow)",
    "category": "Musculoskeletal",
    "severity": "Low",
    "prevalence": "Less common than tennis elbow.",
    "description": "Medial Epicondylitis, or Golfer's Elbow, is a condition that causes pain where the tendons of the forearm muscles attach to the bony bump on the inside of the elbow. The pain can spread into the forearm and wrist. It is similar to tennis elbow but occurs on the inside of the elbow.",
    "desc": "Medial Epicondylitis, or Golfer's Elbow, is a condition that causes pain where the tendons of the forearm muscles attach to the bony bump on the inside of the elbow. The pain can spread into the forearm and wrist. It is similar to tennis elbow but occurs on the inside of the elbow.",
    "symptoms": [
      "Pain and tenderness on the inner side of the elbow.",
      "Pain that worsens with certain movements, especially forceful wrist flexion and pronation (turning palm down).",
      "Stiffness in the elbow.",
      "Weakness in the hands and wrists.",
      "Numbness or tingling radiating into the fingers (less common)."
    ],
    "causes": [
      "Overuse of the muscles that control wrist and finger flexion, leading to small tears in the tendons attached to the medial epicondyle."
    ],
    "treatment": [
      "Rest and avoiding the aggravating activity.",
      "Ice the affected area.",
      "NSAIDs.",
      "Physical Therapy for stretching and strengthening.",
      "Brace or splint.",
      "Corticosteroid Injections.",
      "Surgery for persistent, severe cases."
    ],
    "selfCare": [
      "Start activities slowly and gradually increase intensity.",
      "Use proper form during sports and work.",
      "Stretch and warm up before activity.",
      "Lifestyle Recommendations",
      "Strengthen forearm muscles."
    ],
    "prevention": [
      "Use correct technique in sports and work.",
      "Stop activity if you feel elbow pain."
    ],
    "riskFactors": [
      "Primary: Repetitive forceful gripping and wrist flexion (e.g., swinging a golf club, throwing, weightlifting, hammering).",
      "Secondary: Age, smoking, obesity."
    ],
    "warningSigns": [
      "Not an emergency. Seek evaluation for persistent pain that interferes with daily activities."
    ]
  },
  {
    "id": "plantar-fasciitis",
    "name": "Plantar Fasciitis",
    "category": "Musculoskeletal",
    "severity": "Medium",
    "prevalence": "Extremely common.",
    "description": "Plantar Fasciitis is one of the most common causes of heel pain. It involves inflammation of the thick band of tissue (the plantar fascia) that runs across the bottom of your foot and connects your heel bone to your toes. It is common in runners and overweight individuals.",
    "desc": "Plantar Fasciitis is one of the most common causes of heel pain. It involves inflammation of the thick band of tissue (the plantar fascia) that runs across the bottom of your foot and connects your heel bone to your toes. It is common in runners and overweight individuals.",
    "symptoms": [
      "Stabbing pain near the heel, usually worst with the first few steps in the morning or after a period of rest.",
      "Pain that decreases after walking for a while but may return after long periods of standing or when standing up after sitting."
    ],
    "causes": [
      "Repetitive stretching and tearing of the plantar fascia causes irritation and inflammation. The cause is often unclear but is associated with increased tension and stress on the fascia."
    ],
    "treatment": [
      "Stretching exercises for the plantar fascia and Achilles tendon.",
      "Night splints to hold the foot in a stretched position.",
      "Supportive shoes and orthotics.",
      "Ice and NSAIDs.",
      "Physical Therapy.",
      "Corticosteroid injections.",
      "Shock wave therapy or surgery for chronic cases."
    ],
    "selfCare": [
      "Roll a frozen water bottle under your foot for ice massage.",
      "Avoid walking barefoot on hard surfaces.",
      "Perform calf and foot stretches consistently, especially in the morning.",
      "Lifestyle Recommendations",
      "Lose weight if needed to reduce stress on the plantar fascia."
    ],
    "prevention": [
      "Wear supportive shoes.",
      "Maintain a healthy weight.",
      "Stretch your arches and calves regularly."
    ],
    "riskFactors": [
      "Primary: Age (40-60), obesity, long-distance running.",
      "Secondary: Tight calf muscles, high arches, flat feet, occupations that keep you on your feet."
    ],
    "warningSigns": [
      "Not an emergency, but can be very painful. Seek evaluation to confirm the diagnosis and rule out other causes like a stress fracture."
    ]
  },
  {
    "id": "invasive-ductal-carcinoma-breast",
    "name": "Invasive Ductal Carcinoma (Breast)",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common type of breast cancer.",
    "description": "Invasive Ductal Carcinoma (IDC) is the most common type of breast cancer, accounting for about 80% of all cases. It begins in the milk ducts of the breast but has \"invaded\" or spread through the duct wall into the surrounding breast tissue. From there, it can metastasize to other parts of the body.",
    "desc": "Invasive Ductal Carcinoma (IDC) is the most common type of breast cancer, accounting for about 80% of all cases. It begins in the milk ducts of the breast but has \"invaded\" or spread through the duct wall into the surrounding breast tissue. From there, it can metastasize to other parts of the body.",
    "symptoms": [
      "A hard, irregular-shaped lump in the breast.",
      "Swelling of all or part of the breast.",
      "Skin irritation or dimpling (like an orange peel).",
      "Breast or nipple pain.",
      "Nipple retraction (turning inward).",
      "Redness or flaky skin on the nipple or breast."
    ],
    "causes": [
      "The exact cause is unknown. It develops when genetic mutations occur in the DNA of a ductal cell, allowing it to grow and divide uncontrollably."
    ],
    "treatment": [
      "Treatment is highly personalized and depends on the cancer's stage, grade, and hormone receptor status.",
      "Surgery: Lumpectomy (removal of the tumor) or mastectomy (removal of the breast).",
      "Radiation Therapy.",
      "Chemotherapy.",
      "Hormone Therapy: For cancers that are hormone receptor-positive.",
      "Targeted Therapy: For cancers with specific markers like HER2."
    ],
    "selfCare": [
      "Attend all follow-up appointments for monitoring.",
      "Manage treatment side effects with the help of your care team.",
      "Seek support from friends, family, or support groups.",
      "Lifestyle Recommendations",
      "Maintain a healthy weight.",
      "Limit alcohol.",
      "Stay physically active as tolerated."
    ],
    "prevention": [
      "There is no sure way to prevent breast cancer, but you can reduce risk.",
      "Limit alcohol, maintain a healthy weight, be physically active.",
      "For high-risk women, preventive medications or surgery may be an option."
    ],
    "riskFactors": [
      "Primary: Female sex, increasing age, family history, inherited gene mutations (BRCA1/BRCA2).",
      "Secondary: Dense breast tissue, personal history of breast conditions, obesity, alcohol consumption."
    ],
    "warningSigns": [
      "A new lump or mass.",
      "Thickening or swelling of part of the breast.",
      "Irritation or dimpling of breast skin.",
      "Nipple retraction or discharge."
    ]
  },
  {
    "id": "small-cell-lung-cancer",
    "name": "Small Cell Lung Cancer",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "Almost exclusively found in people with a history of smoking.",
    "description": "Small Cell Lung Cancer (SCLC) is a fast-growing type of lung cancer that typically starts in the bronchi in the center of the chest. It is strongly linked to smoking and accounts for about 10-15% of all lung cancers. It spreads (metastasizes) very early and aggressively.",
    "desc": "Small Cell Lung Cancer (SCLC) is a fast-growing type of lung cancer that typically starts in the bronchi in the center of the chest. It is strongly linked to smoking and accounts for about 10-15% of all lung cancers. It spreads (metastasizes) very early and aggressively.",
    "symptoms": [
      "Persistent cough.",
      "Coughing up blood.",
      "Chest pain.",
      "Shortness of breath.",
      "Wheezing.",
      "Hoarseness.",
      "Paraneoplastic syndromes (symptoms caused by hormone-like substances secreted by the tumor), such as SIADH (low sodium) or Cushing syndrome."
    ],
    "causes": [
      "Overwhelmingly caused by tobacco smoke, which induces genetic mutations in lung cells, leading to uncontrolled growth."
    ],
    "treatment": [
      "Chemotherapy: The primary treatment, as SCLC is very responsive to it initially.",
      "Immunotherapy is now often combined with chemotherapy.",
      "Radiation Therapy: Often used concurrently with chemo for limited-stage disease, or to treat metastases (e.g., in the brain).",
      "Surgery is rarely an option due to early spread."
    ],
    "selfCare": [
      "If you smoke, quit. This is critical, even after diagnosis.",
      "Manage side effects of treatment like nausea and fatigue.",
      "Seek palliative care early to manage symptoms and improve quality of life.",
      "Lifestyle Recommendations",
      "Get support for the emotional and physical challenges."
    ],
    "prevention": [
      "Do not smoke. If you smoke, quit. Avoid secondhand smoke."
    ],
    "riskFactors": [
      "Primary: Cigarette smoking (the most significant risk factor).",
      "Secondary: Exposure to radon, asbestos, or other carcinogens."
    ],
    "warningSigns": [
      "SCLC is often diagnosed after it has already spread. Symptoms like a persistent cough, coughing up blood, chest pain, and unexplained weight loss warrant immediate medical evaluation."
    ]
  },
  {
    "id": "adenocarcinoma-of-the-prostate",
    "name": "Adenocarcinoma of the Prostate",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common cancer in men (other than skin cancer).",
    "description": "Adenocarcinoma is the most common type of prostate cancer, accounting for over 95% of cases. It develops in the gland cells that make the prostate fluid that is added to semen. It is typically slow-growing but can be aggressive.",
    "desc": "Adenocarcinoma is the most common type of prostate cancer, accounting for over 95% of cases. It develops in the gland cells that make the prostate fluid that is added to semen. It is typically slow-growing but can be aggressive.",
    "symptoms": [
      "Early Stage: Often asymptomatic.",
      "Trouble urinating.",
      "Decreased force in the stream of urine.",
      "Blood in the urine or semen.",
      "Bone pain (especially in the back or hips).",
      "Erectile dysfunction."
    ],
    "causes": [
      "The exact cause is unknown. It begins when cells in the prostate develop mutations in their DNA, causing them to grow and divide more rapidly than normal cells."
    ],
    "treatment": [
      "Depends on the cancer's aggressiveness (Gleason score) and stage.",
      "Active Surveillance: For low-risk, slow-growing cancers.",
      "Surgery: Radical prostatectomy.",
      "Radiation Therapy.",
      "Hormone Therapy (Androgen Deprivation Therapy): To block testosterone, which fuels cancer growth.",
      "Chemotherapy for advanced, hormone-resistant disease."
    ],
    "selfCare": [
      "Discuss the risks and benefits of all treatment options with your doctor, as they can have significant side effects (incontinence, impotence).",
      "Maintain a healthy weight and exercise.",
      "Lifestyle Recommendations",
      "Eat a heart-healthy diet rich in fruits and vegetables."
    ],
    "prevention": [
      "No proven prevention, but a healthy lifestyle may lower risk.",
      "Discuss the pros and cons of screening with your doctor."
    ],
    "riskFactors": [
      "Primary: Age (risk increases rapidly after 50), family history, African-American race.",
      "Secondary: Obesity, genetic mutations."
    ],
    "warningSigns": [
      "Early prostate cancer often has no symptoms. Later stages may cause urinary symptoms (weak flow, frequency) or bone pain if it has spread. Screening with a PSA test is controversial and should be discussed with a doctor."
    ]
  },
  {
    "id": "colon-cancer",
    "name": "Colon Cancer",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The third most common cancer diagnosed in both men and women.",
    "description": "Colon Cancer is a type of cancer that begins in the large intestine (colon). It typically starts as a small, noncancerous (benign) clump of cells called an adenomatous polyp. Over time, some of these polyps can become colon cancers.",
    "desc": "Colon Cancer is a type of cancer that begins in the large intestine (colon). It typically starts as a small, noncancerous (benign) clump of cells called an adenomatous polyp. Over time, some of these polyps can become colon cancers.",
    "symptoms": [
      "A persistent change in your bowel habits, including diarrhea or constipation.",
      "Rectal bleeding or blood in your stool.",
      "Persistent abdominal discomfort (cramps, gas, pain).",
      "A feeling that your bowel doesn't empty completely.",
      "Weakness or fatigue.",
      "Unexplained weight loss."
    ],
    "causes": [
      "Most begin as precancerous polyps. Genetic mutations that cause cells to divide uncontrollably lead to the formation of these polyps and their eventual transformation into cancer."
    ],
    "treatment": [
      "Surgery: The primary treatment. For early-stage cancer, a polypectomy or partial colectomy may be curative.",
      "Chemotherapy: Often given after surgery if the cancer is more advanced.",
      "Radiation Therapy: More common for rectal cancer.",
      "Targeted Therapy and Immunotherapy for advanced disease."
    ],
    "selfCare": [
      "Attend all recommended screening colonoscopies.",
      "If you have a colostomy, learn proper stoma care.",
      "Manage side effects of treatment like nausea and fatigue.",
      "Lifestyle Recommendations",
      "Eat a variety of fruits, vegetables, and whole grains.",
      "Exercise regularly.",
      "Maintain a healthy weight.",
      "Limit alcohol and don't smoke."
    ],
    "prevention": [
      "Regular screening is the most effective way to prevent colon cancer.",
      "Lifestyle modifications (diet, exercise, weight management)."
    ],
    "riskFactors": [
      "Primary: Older age, personal or family history of polyps/cancer, inflammatory bowel disease (IBD).",
      "Secondary: Low-fiber, high-fat diet, sedentary lifestyle, diabetes, smoking, alcohol."
    ],
    "warningSigns": [
      "See a doctor for any persistent change in bowel habits, rectal bleeding, or unexplained abdominal pain. Screening is key as it can find and remove polyps before they become cancerous."
    ]
  },
  {
    "id": "acute-lymphoblastic-leukemia",
    "name": "Acute Lymphoblastic Leukemia",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "Most common childhood cancer, but can also occur in adults.",
    "description": "Acute Lymphoblastic Leukemia (ALL) is a cancer of the blood and bone marrow. \"Acute\" means it progresses rapidly. In ALL, the bone marrow produces too many immature lymphocytes (a type of white blood cell), which crowd out healthy blood cells. It is the most common type of cancer in children.",
    "desc": "Acute Lymphoblastic Leukemia (ALL) is a cancer of the blood and bone marrow. \"Acute\" means it progresses rapidly. In ALL, the bone marrow produces too many immature lymphocytes (a type of white blood cell), which crowd out healthy blood cells. It is the most common type of cancer in children.",
    "symptoms": [
      "Fever.",
      "Easy bruising or bleeding (petechiae).",
      "Bone pain.",
      "Pale skin.",
      "Shortness of breath.",
      "Frequent infections.",
      "Loss of appetite and weight loss."
    ],
    "causes": [
      "A DNA mutation in a single bone marrow cell causes it to grow and divide uncontrollably. The cause of the mutation is usually unknown."
    ],
    "treatment": [
      "Treatment is intensive and occurs in phases over 2-3 years.",
      "Chemotherapy: The main treatment, given in multiple phases (induction, consolidation, maintenance).",
      "Targeted Therapy: For specific genetic abnormalities (e.g., Philadelphia chromosome).",
      "Radiation Therapy: To the brain or other sites.",
      "Stem Cell Transplant: For high-risk or relapsed cases."
    ],
    "selfCare": [
      "(For patients and families)",
      "Meticulous infection prevention is crucial due to a weakened immune system.",
      "Practice good oral hygiene to prevent mouth sores.",
      "Ensure good nutrition.",
      "Seek emotional and psychological support.",
      "Lifestyle Recommendations",
      "Follow the care team's instructions precisely during treatment."
    ],
    "prevention": [
      "There is no known way to prevent most cases of ALL."
    ],
    "riskFactors": [
      "Primary: Genetic syndromes (e.g., Down syndrome), having a sibling with ALL.",
      "Secondary: Previous chemotherapy or radiation exposure."
    ],
    "warningSigns": [
      "ALL progresses quickly. Symptoms like persistent fever, easy bruising/bleeding, bone pain, and pallor require immediate medical evaluation."
    ]
  },
  {
    "id": "non-hodgkin-lymphoma",
    "name": "Non-Hodgkin Lymphoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "More common than Hodgkin Lymphoma.",
    "description": "Non-Hodgkin Lymphoma (NHL) is a cancer that begins in the lymphatic system, which is part of the body's germ-fighting immune system. In NHL, tumors develop from lymphocytes (a type of white blood cell). There are many different subtypes of NHL.",
    "desc": "Non-Hodgkin Lymphoma (NHL) is a cancer that begins in the lymphatic system, which is part of the body's germ-fighting immune system. In NHL, tumors develop from lymphocytes (a type of white blood cell). There are many different subtypes of NHL.",
    "symptoms": [
      "Painless, swollen lymph nodes in the neck, armpits, or groin.",
      "Unexplained weight loss.",
      "Fever.",
      "Drenching night sweats.",
      "Fatigue.",
      "Abdominal pain or swelling.",
      "Chest pain, coughing, or trouble breathing."
    ],
    "causes": [
      "The body produces too many abnormal lymphocytes that don't die off. They accumulate and form tumors. The cause is often unknown but is linked to immune system problems and infections."
    ],
    "treatment": [
      "Depends on the type and stage of NHL.",
      "Chemotherapy and Immunotherapy (e.g., Rituximab).",
      "Radiation Therapy.",
      "Targeted Therapy drugs.",
      "Stem Cell Transplant for recurrent NHL."
    ],
    "selfCare": [
      "Manage side effects of treatment, such as nausea and fatigue.",
      "Protect against infection.",
      "Attend all follow-up appointments for monitoring.",
      "Lifestyle Recommendations",
      "Maintain a healthy lifestyle to support your body during and after treatment."
    ],
    "prevention": [
      "There is no known way to prevent most NHLs."
    ],
    "riskFactors": [
      "Primary: Weakened immune system (e.g., from HIV, organ transplant).",
      "Secondary: Certain infections (e.g., Epstein-Barr, H. pylori), age (risk increases with age)."
    ],
    "warningSigns": [
      "See a doctor for persistent, painless swelling of lymph nodes in the neck, armpit, or groin, especially if accompanied by fever, night sweats, and weight loss."
    ]
  },
  {
    "id": "malignant-melanoma",
    "name": "Malignant Melanoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "Less common than other skin cancers, but causes the majority of skin cancer deaths.",
    "description": "Malignant Melanoma is the most serious type of skin cancer. It develops in the cells (melanocytes) that produce melanin — the pigment that gives your skin its color. It can develop anywhere on the body and can spread rapidly to internal organs if not caught early.",
    "desc": "Malignant Melanoma is the most serious type of skin cancer. It develops in the cells (melanocytes) that produce melanin — the pigment that gives your skin its color. It can develop anywhere on the body and can spread rapidly to internal organs if not caught early.",
    "symptoms": [
      "A new, unusual-looking growth on your skin.",
      "A change in an existing mole (see ABCDEs).",
      "A painful lesion that itches or burns.",
      "A dark spot under a nail not caused by an injury."
    ],
    "causes": [
      "Most are caused by intense, intermittent UV exposure that damages the DNA in skin cells. This damage triggers mutations that lead to uncontrolled cellular growth."
    ],
    "treatment": [
      "Surgery: Wide excision to remove the melanoma and a margin of healthy tissue. This is the primary treatment for early-stage melanoma.",
      "Sentinel Lymph Node Biopsy to check for spread.",
      "Immunotherapy, Targeted Therapy, Chemotherapy, and Radiation for advanced disease."
    ],
    "selfCare": [
      "Perform regular skin self-exams.",
      "See a dermatologist annually for a full-body skin check.",
      "Protect your skin from the sun with broad-spectrum sunscreen, protective clothing, and seeking shade.",
      "Lifestyle Recommendations",
      "Avoid tanning beds completely."
    ],
    "prevention": [
      "Sun protection is the most effective way to reduce your risk.",
      "Be vigilant about skin changes."
    ],
    "riskFactors": [
      "Primary: UV exposure (sunlight, tanning beds), fair skin, history of sunburns.",
      "Secondary: Many moles, family history, weakened immune system."
    ],
    "warningSigns": [
      "Asymmetry.",
      "Border irregularity.",
      "Color that is not uniform.",
      "Diameter greater than 6mm.",
      "Evolving in size, shape, or color."
    ]
  },
  {
    "id": "pancreatic-adenocarcinoma",
    "name": "Pancreatic Adenocarcinoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "Relatively rare, but is a leading cause of cancer death due to late diagnosis.",
    "description": "Pancreatic Adenocarcinoma is the most common type of pancreatic cancer, accounting for about 90% of cases. It begins in the exocrine cells that line the ducts of the pancreas. It is often called a \"silent\" disease because it rarely causes symptoms until it has advanced and spread.",
    "desc": "Pancreatic Adenocarcinoma is the most common type of pancreatic cancer, accounting for about 90% of cases. It begins in the exocrine cells that line the ducts of the pancreas. It is often called a \"silent\" disease because it rarely causes symptoms until it has advanced and spread.",
    "symptoms": [
      "Abdominal pain that radiates to the back.",
      "Loss of appetite or unintended weight loss.",
      "Yellowing of your skin and the whites of your eyes (jaundice).",
      "Light-colored stools and dark urine.",
      "New-onset diabetes.",
      "Blood clots."
    ],
    "causes": [
      "Acquired or inherited DNA mutations cause uncontrolled cell growth in the pancreas. The exact trigger is often unknown."
    ],
    "treatment": [
      "Surgery (Whipple procedure): The only potential cure, but only possible if the cancer is localized (about 15-20% of cases).",
      "Chemotherapy is the main treatment for most patients.",
      "Radiation Therapy.",
      "Targeted Therapy for specific genetic markers."
    ],
    "selfCare": [
      "Seek care at a specialized cancer center.",
      "Manage pain and other symptoms aggressively with palliative care.",
      "Focus on nutrition; a dietitian can help manage digestive issues.",
      "Lifestyle Recommendations",
      "Don't smoke."
    ],
    "prevention": [
      "Not smoking is the most significant modifiable risk factor.",
      "Maintain a healthy weight and diet."
    ],
    "riskFactors": [
      "Primary: Smoking, chronic pancreatitis, long-standing diabetes.",
      "Secondary: Obesity, family history, certain genetic syndromes."
    ],
    "warningSigns": [
      "See a doctor for unexplained weight loss, persistent abdominal pain that radiates to the back, new-onset diabetes, or jaundice (yellowing of the skin and eyes)."
    ]
  },
  {
    "id": "hepatocellular-carcinoma",
    "name": "Hepatocellular Carcinoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common primary liver cancer.",
    "description": "Hepatocellular Carcinoma (HCC) is the most common type of primary liver cancer. It occurs in the main type of liver cell (hepatocyte). It most commonly develops in people with chronic liver diseases, such as cirrhosis caused by hepatitis B or C, or alcohol use.",
    "desc": "Hepatocellular Carcinoma (HCC) is the most common type of primary liver cancer. It occurs in the main type of liver cell (hepatocyte). It most commonly develops in people with chronic liver diseases, such as cirrhosis caused by hepatitis B or C, or alcohol use.",
    "symptoms": [
      "Losing weight without trying.",
      "Loss of appetite.",
      "Upper abdominal pain.",
      "Nausea and vomiting.",
      "General weakness and fatigue.",
      "Abdominal swelling (ascites).",
      "Jaundice."
    ],
    "causes": [
      "Chronic damage to the liver (cirrhosis) creates an environment where genetic mutations are more likely to occur, leading to cancerous growth in hepatocytes."
    ],
    "treatment": [
      "Depends on the stage of the cancer and the underlying liver function.",
      "Liver Transplant: Can be curative for select patients.",
      "Surgical Resection: Removing the part of the liver with the tumor.",
      "Ablation Therapy: Using heat or ethanol to destroy tumors.",
      "Embolization Therapy: Blocking the blood supply to the tumor.",
      "Targeted Therapy and Immunotherapy for advanced disease."
    ],
    "selfCare": [
      "If you have chronic liver disease, adhere to your treatment plan (e.g., antiviral therapy for hepatitis).",
      "Avoid alcohol completely.",
      "Manage other conditions like diabetes and obesity.",
      "Lifestyle Recommendations",
      "Get vaccinated against Hepatitis B."
    ],
    "prevention": [
      "Preventing cirrhosis is the key. This includes vaccination for Hep B, treating Hep C, limiting alcohol, and maintaining a healthy weight."
    ],
    "riskFactors": [
      "Primary: Cirrhosis from any cause (hepatitis B/C, alcohol, NASH).",
      "Secondary: Aflatoxin exposure, smoking, obesity, type 2 diabetes."
    ],
    "warningSigns": [
      "People with cirrhosis should be in a surveillance program with regular ultrasounds. Symptoms like abdominal pain, unexplained weight loss, and jaundice require prompt evaluation."
    ]
  },
  {
    "id": "squamous-cell-carcinoma-of-cervix",
    "name": "Squamous Cell Carcinoma of Cervix",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "A leading cause of cancer death in women in developing countries. Incidence has dropped dramatically in countries with screening programs.",
    "description": "Squamous Cell Carcinoma (SCC) of the cervix is the most common type of cervical cancer, accounting for about 80-90% of cases. It begins in the thin, flat cells (squamous cells) lining the outer part of the cervix (the ectocervix). It is almost always caused by persistent infection with high-risk Human Papillomavirus (HPV).",
    "desc": "Squamous Cell Carcinoma (SCC) of the cervix is the most common type of cervical cancer, accounting for about 80-90% of cases. It begins in the thin, flat cells (squamous cells) lining the outer part of the cervix (the ectocervix). It is almost always caused by persistent infection with high-risk Human Papillomavirus (HPV).",
    "symptoms": [
      "Early Stage: Often no symptoms.",
      "Vaginal bleeding after intercourse, between periods, or after menopause.",
      "Watery, bloody vaginal discharge that may be heavy and have a foul odor.",
      "Pelvic pain or pain during intercourse."
    ],
    "causes": [
      "Persistent infection with high-risk HPV strains (especially 16 and 18) leads to changes in the squamous cells, which can progress from pre-cancer (CIN) to invasive cancer over many years."
    ],
    "treatment": [
      "Pre-cancer (CIN): Can be treated with procedures like LEEP or cryotherapy to remove the abnormal cells.",
      "Surgery: For early-stage cancer (hysterectomy).",
      "Radiation Therapy and Chemotherapy: Often used together for more advanced stages."
    ],
    "selfCare": [
      "Get regular cervical cancer screening as recommended by your doctor.",
      "If you smoke, quit.",
      "Use condoms to reduce HPV exposure.",
      "Lifestyle Recommendations",
      "Get the HPV vaccine. It is highly effective at preventing the HPV infections that cause most cervical cancers."
    ],
    "prevention": [
      "HPV vaccination.",
      "Routine cervical cancer screening (Pap/HPV tests).",
      "Practicing safe sex."
    ],
    "riskFactors": [
      "Primary: Persistent infection with high-risk HPV.",
      "Secondary: Smoking, a weakened immune system, long-term use of oral contraceptives."
    ],
    "warningSigns": [
      "Regular screening with Pap tests/HPV tests is crucial to find pre-cancerous changes before they become cancer. See a doctor for abnormal vaginal bleeding or discharge."
    ]
  },
  {
    "id": "epithelial-ovarian-cancer",
    "name": "Epithelial Ovarian Cancer",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The leading cause of death from gynecologic cancers.",
    "description": "Epithelial Ovarian Cancer is the most common type of ovarian cancer, accounting for about 85-90% of cases. It begins in the cells on the surface of the ovary. It is often diagnosed at an advanced stage because early symptoms are vague or absent.",
    "desc": "Epithelial Ovarian Cancer is the most common type of ovarian cancer, accounting for about 85-90% of cases. It begins in the cells on the surface of the ovary. It is often diagnosed at an advanced stage because early symptoms are vague or absent.",
    "symptoms": [
      "Abdominal bloating or swelling.",
      "Quickly feeling full when eating.",
      "Weight loss.",
      "Discomfort in the pelvic area.",
      "Changes in bowel habits, such as constipation.",
      "A frequent need to urinate."
    ],
    "causes": [
      "The exact cause is unknown. Some may start in the fallopian tubes. Risk is higher with certain genetic mutations and a family history."
    ],
    "treatment": [
      "Surgery: The primary treatment. The goal is \"debulking\" – removing as much of the tumor as possible.",
      "Chemotherapy: Given after surgery for most patients.",
      "Targeted Therapy (e.g., PARP inhibitors) for cancers with BRCA mutations.",
      "Hormone Therapy for some slow-growing tumors."
    ],
    "selfCare": [
      "Seek care from a gynecologic oncologist, a specialist in these cancers.",
      "Manage side effects of surgery and chemotherapy.",
      "Seek support for the emotional impact of the disease.",
      "Lifestyle Recommendations",
      "For high-risk women, discuss risk-reducing surgery (removal of ovaries and tubes)."
    ],
    "prevention": [
      "There is no reliable screening test for average-risk women.",
      "For high-risk women, genetic counseling, increased surveillance, and risk-reducing surgery may be options.",
      "Oral contraceptive use reduces the risk."
    ],
    "riskFactors": [
      "Primary: Age, family history, inherited gene mutations (BRCA1/BRCA2).",
      "Secondary: Endometriosis, never having been pregnant."
    ],
    "warningSigns": [
      "See a doctor (preferably a gynecologist) for persistent symptoms like bloating, pelvic pain, feeling full quickly, and urinary urgency. These symptoms are common, but when they are new and persistent, they warrant evaluation."
    ]
  },
  {
    "id": "transitional-cell-carcinoma-of-bladder",
    "name": "Transitional Cell Carcinoma of Bladder",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common type of bladder cancer. • Fourth most common cancer in men.",
    "description": "Transitional Cell Carcinoma (TCC), also known as Urothelial Carcinoma, is the most common type of bladder cancer, accounting for over 90% of cases. It begins in the urothelial cells that line the inside of the bladder. These cells are stretchable, allowing the bladder to expand and contract. TCC can be non-invasive (confined to the inner layer), invasive (spreading into the muscle wall), or metastatic.",
    "desc": "Transitional Cell Carcinoma (TCC), also known as Urothelial Carcinoma, is the most common type of bladder cancer, accounting for over 90% of cases. It begins in the urothelial cells that line the inside of the bladder. These cells are stretchable, allowing the bladder to expand and contract. TCC can be non-invasive (confined to the inner layer), invasive (spreading into the muscle wall), or metastatic.",
    "symptoms": [
      "Hematuria: Blood in the urine, which may be visible (gross) or only detectable under a microscope. It is often painless.",
      "Irritative Voiding Symptoms: Frequent urination, pain or burning during urination (dysuria), and a strong, persistent urge to urinate.",
      "Advanced Disease Symptoms: Pelvic or back pain on one side, unintentional weight loss, and bone pain."
    ],
    "causes": [
      "The primary cause is damage to the DNA of urothelial cells by carcinogens excreted in the urine. These genetic mutations cause the cells to grow uncontrollably and form tumors. Smoking and chemical exposures are the main sources of these carcinogens."
    ],
    "treatment": [
      "Treatment depends heavily on the stage and grade (aggressiveness) of the cancer.",
      "Transurethral Resection of Bladder Tumor (TURBT): The primary procedure to remove the tumor and determine its stage.",
      "Intravesical Therapy: Medications like BCG (Bacillus Calmette-Guérin) or chemotherapy are delivered directly into the bladder to kill remaining cancer cells and reduce recurrence risk.",
      "Radical Cystectomy: Surgical removal of the entire bladder. In men, the prostate is also removed; in women, the uterus, ovaries, and part of the vagina may be removed.",
      "Neobladder Construction: A new bladder can sometimes be created from a piece of intestine.",
      "Chemotherapy and Radiation: Often used in combination, either before surgery (neoadjuvant) or as a primary treatment for those who cannot have surgery.",
      "Metastatic Disease: Chemotherapy, immunotherapy, and targeted therapy."
    ],
    "selfCare": [
      "If you smoke, quit. This is non-negotiable.",
      "Attend all scheduled cystoscopy follow-ups as recurrence is common.",
      "Stay well-hydrated to dilute potential carcinogens in the urine.",
      "Lifestyle Recommendations",
      "Minimize exposure to industrial chemicals and follow all workplace safety protocols.",
      "Eat a diet rich in fruits and vegetables."
    ],
    "prevention": [
      "Do not smoke, and if you do, quit.",
      "Reduce exposure to occupational carcinogens with proper protective equipment.",
      "Drink plenty of fluids, especially water."
    ],
    "riskFactors": [
      "Primary: Smoking (the single greatest risk factor, causing about half of all cases), occupational exposure to chemicals used in dye, rubber, paint, and printing industries.",
      "Secondary: Chronic bladder inflammation (e.g., from long-term catheter use), previous chemotherapy or radiation, parasitic infection (schistosomiasis), age (most common over 55)."
    ],
    "warningSigns": [
      "See a doctor immediately for painless blood in the urine (hematuria), even if it comes and goes. Do not ignore this symptom."
    ]
  },
  {
    "id": "meningioma",
    "name": "Meningioma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common primary brain tumor in adults. • More common in women.",
    "description": "A Meningioma is a tumor that arises from the meninges — the membranes that surround your brain and spinal cord. The vast majority (over 90%) are benign (non-cancerous) and slow-growing. However, they can still cause serious problems if they grow large enough to press on the brain or spinal cord.",
    "desc": "A Meningioma is a tumor that arises from the meninges — the membranes that surround your brain and spinal cord. The vast majority (over 90%) are benign (non-cancerous) and slow-growing. However, they can still cause serious problems if they grow large enough to press on the brain or spinal cord.",
    "symptoms": [
      "Symptoms develop gradually and vary by location. Many small meningiomas cause no symptoms (incidentalomas).",
      "General: Headaches that worsen over time, seizures.",
      "Sphenoid Wing: Vision changes (loss of peripheral vision).",
      "Olfactory Groove: Loss of smell.",
      "Parasagittal/Falx: Leg weakness.",
      "Posterior Fossa: Hearing loss, facial numbness."
    ],
    "causes": [
      "The exact cause is unknown. It begins when cells in the meninges develop genetic mutations that allow them to divide and grow uncontrollably. Hormones (e.g., progesterone) may play a role, explaining the higher prevalence in women."
    ],
    "treatment": [
      "Observation: For small, asymptomatic meningiomas, \"watchful waiting\" with periodic MRI scans is often recommended.",
      "Surgery: The primary treatment for symptomatic or growing tumors. The goal is total removal.",
      "Radiation Therapy: Used for tumors that cannot be fully removed with surgery, are high-grade, or recur. Stereotactic radiosurgery (e.g., Gamma Knife) is common."
    ],
    "selfCare": [
      "Adhere to your MRI monitoring schedule if on observation.",
      "Manage headaches as recommended by your doctor.",
      "If you have seizures, take anti-seizure medication as prescribed.",
      "Lifestyle Recommendations",
      "Maintain a healthy lifestyle to support overall brain health."
    ],
    "prevention": [
      "There is no known way to prevent meningiomas. Avoiding unnecessary radiation to the head is the only modifiable risk factor."
    ],
    "riskFactors": [
      "Primary: Female sex, age (risk increases with age).",
      "Secondary: Prior radiation therapy to the head, the genetic disorder neurofibromatosis type 2 (NF2)."
    ],
    "warningSigns": [
      "Seek medical attention for new, persistent headaches, seizures, or progressive neurological deficits like vision changes or limb weakness."
    ]
  },
  {
    "id": "osteosarcoma",
    "name": "Osteosarcoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common primary bone cancer in children and adolescents.",
    "description": "Osteosarcoma is the most common type of cancer that starts in the bones. It arises from osteoblasts, the cells that form bone. It most commonly occurs in the long bones around the knee (distal femur, proximal tibia) and in the upper arm (proximal humerus). It is most common in children, adolescents, and young adults.",
    "desc": "Osteosarcoma is the most common type of cancer that starts in the bones. It arises from osteoblasts, the cells that form bone. It most commonly occurs in the long bones around the knee (distal femur, proximal tibia) and in the upper arm (proximal humerus). It is most common in children, adolescents, and young adults.",
    "symptoms": [
      "Bone pain in the affected area, which may initially be intermittent but becomes constant.",
      "Swelling or a palpable lump near a joint.",
      "Weakened bone, leading to a fracture from minor injury (pathologic fracture).",
      "Limping, if the tumor is in a leg bone."
    ],
    "causes": [
      "The cause is largely unknown in most cases. It is associated with periods of rapid bone growth, suggesting that rapidly dividing cells are more susceptible to the genetic errors that lead to cancer."
    ],
    "treatment": [
      "Chemotherapy: Given both before (neoadjuvant) and after (adjuvant) surgery to shrink the tumor and kill any metastatic cells.",
      "Surgery: The goal is to remove the entire tumor. Limb-salvage (limb-sparing) surgery is now standard, but amputation may be necessary in some cases.",
      "Radiation Therapy: Rarely used, as osteosarcoma is relatively resistant."
    ],
    "selfCare": [
      "(For patients and families)",
      "Adherence to the intense chemotherapy regimen is critical.",
      "Physical therapy and rehabilitation are essential after surgery to regain function.",
      "Seek psychosocial support to cope with the emotional and physical challenges.",
      "Lifestyle Recommendations",
      "Focus on nutrition to maintain strength during treatment."
    ],
    "prevention": [
      "There is no known way to prevent osteosarcoma."
    ],
    "riskFactors": [
      "Primary: Age (peak incidence during the adolescent growth spurt), height (taller children have a slightly higher risk).",
      "Secondary: Previous radiation therapy, certain benign bone conditions (Paget's disease), inherited cancer syndromes (Li-Fraumeni, RB1 gene)."
    ],
    "warningSigns": [
      "Persistent, deep bone pain, especially in a long bone, that may be worse at night, or a noticeable lump or swelling, warrants immediate medical evaluation."
    ]
  },
  {
    "id": "papillary-thyroid-carcinoma",
    "name": "Papillary Thyroid Carcinoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common endocrine cancer. • Incidence is increasing globally.",
    "description": "Papillary Thyroid Carcinoma (PTC) is the most common type of thyroid cancer, accounting for about 80% of all cases. It arises from the follicular cells of the thyroid and tends to grow slowly. It often spreads to lymph nodes in the neck but is generally very treatable and has an excellent prognosis.",
    "desc": "Papillary Thyroid Carcinoma (PTC) is the most common type of thyroid cancer, accounting for about 80% of all cases. It arises from the follicular cells of the thyroid and tends to grow slowly. It often spreads to lymph nodes in the neck but is generally very treatable and has an excellent prognosis.",
    "symptoms": [
      "A lump (nodule) in the front of the neck.",
      "Swollen lymph nodes in the neck.",
      "Hoarseness or other voice changes that do not go away.",
      "Difficulty swallowing or breathing (in larger tumors)."
    ],
    "causes": [
      "Genetic mutations (often in the BRAF or RAS genes) cause thyroid cells to grow and multiply uncontrollably. A history of radiation exposure is a well-established environmental risk factor."
    ],
    "treatment": [
      "Surgery: The primary treatment. This is typically a total or near-total thyroidectomy. A central neck lymph node dissection is often also performed.",
      "Radioactive Iodine (RAI) Therapy: Used after surgery to destroy any remaining thyroid tissue and microscopic cancer cells. This is only effective for cancers that take up iodine.",
      "Thyroid Hormone Suppression Therapy: Taking high doses of thyroid hormone to suppress TSH, a hormone that can stimulate cancer growth.",
      "Targeted Therapy for advanced, RAI-resistant disease."
    ],
    "selfCare": [
      "Lifelong adherence to thyroid hormone medication is mandatory after thyroid removal.",
      "Attend all follow-up appointments for thyroglobulin blood tests and neck ultrasounds.",
      "If undergoing RAI, follow all radiation safety precautions.",
      "Lifestyle Recommendations",
      "Maintain a healthy, balanced diet."
    ],
    "prevention": [
      "There is no proven prevention, but avoiding unnecessary exposure to radiation, especially in childhood, is recommended."
    ],
    "riskFactors": [
      "Primary: Female sex (it is 3 times more common in women), exposure to ionizing radiation to the head and neck (especially in childhood).",
      "Secondary: Family history, certain genetic syndromes (e.g., Familial Adenomatous Polyposis)."
    ],
    "warningSigns": [
      "See a doctor for a lump or nodule in the neck, persistent hoarseness, or swollen lymph nodes."
    ]
  },
  {
    "id": "esophageal-adenocarcinoma",
    "name": "Esophageal Adenocarcinoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "Incidence has increased over 600% in the last few decades. • More common in white men.",
    "description": "Esophageal Adenocarcinoma is a type of cancer that starts in the glandular cells of the lower esophagus, near the stomach. It is strongly associated with a condition called Barrett's Esophagus, which is a change in the lining of the esophagus due to chronic acid reflux (GERD). Its incidence has risen dramatically in Western countries.",
    "desc": "Esophageal Adenocarcinoma is a type of cancer that starts in the glandular cells of the lower esophagus, near the stomach. It is strongly associated with a condition called Barrett's Esophagus, which is a change in the lining of the esophagus due to chronic acid reflux (GERD). Its incidence has risen dramatically in Western countries.",
    "symptoms": [
      "Dysphagia: Difficulty swallowing, initially with solid foods, progressing to liquids. This is the most common symptom.",
      "Weight loss without trying.",
      "Chest pain, pressure, or burning.",
      "Worsening indigestion or heartburn.",
      "Coughing or hoarseness."
    ],
    "causes": [
      "Chronic damage to the esophageal lining from stomach acid causes the normal squamous cells to be replaced by intestinal-type glandular cells (Barrett's Esophagus). These abnormal cells can then develop further genetic mutations, leading to adenocarcinoma."
    ],
    "treatment": [
      "Early-Stage (in Barrett's or very early cancer): Can often be treated with endoscopic procedures like Radiofrequency Ablation (RFA), Endoscopic Mucosal Resection (EMR), or cryotherapy.",
      "Esophagectomy: Surgical removal of part or most of the esophagus.",
      "Chemotherapy and Radiation (Chemoradiation): Often given before surgery (neoadjuvant) or as the primary treatment.",
      "Metastatic Disease: Chemotherapy, immunotherapy, and targeted therapy to control the cancer."
    ],
    "selfCare": [
      "If you have Barrett's Esophagus, adhere to your endoscopic surveillance schedule.",
      "Manage GERD aggressively with medication and lifestyle changes.",
      "After esophagectomy, follow dietary guidelines (small, frequent meals).",
      "Lifestyle Recommendations",
      "Achieve and maintain a healthy weight.",
      "Avoid foods that trigger reflux (spicy, fatty, acidic).",
      "Do not smoke.",
      "Limit alcohol."
    ],
    "prevention": [
      "Effectively managing GERD is the cornerstone of prevention.",
      "Maintain a healthy weight.",
      "Don't smoke."
    ],
    "riskFactors": [
      "Primary: Chronic Gastroesophageal Reflux Disease (GERD), Barrett's Esophagus (the most important precancerous condition).",
      "Secondary: Obesity (especially central), smoking, male sex."
    ],
    "warningSigns": [
      "See a doctor for persistent difficulty swallowing (dysphagia), unexplained weight loss, or worsening heartburn/reflux."
    ]
  },
  {
    "id": "renal-cell-carcinoma",
    "name": "Renal Cell Carcinoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "Accounts for about 90% of all kidney cancers.",
    "description": "Renal Cell Carcinoma (RCC) is the most common type of kidney cancer in adults, accounting for about 90% of cases. It originates in the lining of the proximal convoluted tubule—the very small tubes in the kidney that filter the blood and make urine. RCC is often \"silent\" until it is advanced.",
    "desc": "Renal Cell Carcinoma (RCC) is the most common type of kidney cancer in adults, accounting for about 90% of cases. It originates in the lining of the proximal convoluted tubule—the very small tubes in the kidney that filter the blood and make urine. RCC is often \"silent\" until it is advanced.",
    "symptoms": [
      "Early Stage: Often asymptomatic; discovered incidentally on an imaging test for another reason.",
      "Hematuria (blood in the urine).",
      "Flank pain (pain in the side, between the ribs and hip).",
      "A palpable mass in the side or abdomen.",
      "Unexplained weight loss, fever, and fatigue."
    ],
    "causes": [
      "The exact cause is unknown. It involves genetic mutations in kidney cells, leading to uncontrolled growth and tumor formation. In hereditary cases, these mutations are inherited."
    ],
    "treatment": [
      "Surgery: The primary treatment for localized disease.",
      "Partial Nephrectomy: Removing the tumor and a small margin of healthy tissue. Preferred when possible.",
      "Radical Nephrectomy: Removing the entire kidney.",
      "Ablation Therapies: Using heat or cold to destroy small tumors.",
      "Immunotherapy and Targeted Therapy: The mainstays of treatment for advanced or metastatic RCC, as it is generally resistant to chemotherapy."
    ],
    "selfCare": [
      "Manage underlying conditions like high blood pressure.",
      "Attend all follow-up imaging (CT scans) to monitor for recurrence.",
      "Lifestyle Recommendations",
      "Do not smoke.",
      "Maintain a healthy weight.",
      "Control high blood pressure."
    ],
    "prevention": [
      "Don't smoke.",
      "Maintain a healthy weight.",
      "Control high blood pressure."
    ],
    "riskFactors": [
      "Primary: Smoking, obesity, high blood pressure.",
      "Secondary: Advanced kidney disease requiring dialysis, family history (e.g., Von Hippel-Lindau syndrome), occupational exposure to certain chemicals."
    ],
    "warningSigns": [
      "The \"classic triad\" of symptoms (blood in urine, flank pain, and a palpable mass) is rare and usually indicates advanced disease. See a doctor for any blood in the urine."
    ]
  },
  {
    "id": "gastric-adenocarcinoma",
    "name": "Gastric Adenocarcinoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The 5th most common cancer globally, though less common in the U.S.",
    "description": "Gastric Adenocarcinoma is a cancer that starts in the glandular cells lining the stomach. It is the most common type of stomach cancer, accounting for about 95% of cases. Its incidence is higher in Eastern Asia, Eastern Europe, and South America.",
    "desc": "Gastric Adenocarcinoma is a cancer that starts in the glandular cells lining the stomach. It is the most common type of stomach cancer, accounting for about 95% of cases. Its incidence is higher in Eastern Asia, Eastern Europe, and South America.",
    "symptoms": [
      "Early Stage: Often vague or absent. Can include indigestion, stomach discomfort, bloating, and mild nausea.",
      "Unintentional weight loss.",
      "Persistent abdominal pain.",
      "Difficulty swallowing.",
      "Vomiting (sometimes with blood).",
      "Black, tarry stools (melena) indicating digested blood."
    ],
    "causes": [
      "Chronic inflammation of the stomach lining (often from H. pylori) leads to precancerous changes. Over time, genetic mutations accumulate in the glandular cells, leading to adenocarcinoma."
    ],
    "treatment": [
      "Surgery (Gastrectomy): The only potential cure for localized cancer. This can be a partial or total removal of the stomach.",
      "Chemotherapy and Radiation: Often given before and/or after surgery (perioperative) to improve outcomes.",
      "Targeted Therapy and Immunotherapy for advanced cancers with specific markers (e.g., HER2, MSI-H)."
    ],
    "selfCare": [
      "After gastrectomy, follow a specific diet (small, frequent meals) to manage \"dumping syndrome\" and ensure adequate nutrition.",
      "Work with a dietitian to prevent weight loss and vitamin deficiencies.",
      "Lifestyle Recommendations",
      "Eat a diet rich in fresh fruits and vegetables.",
      "Limit intake of salted, smoked, and pickled foods.",
      "Don't smoke."
    ],
    "prevention": [
      "Test for and treat H. pylori infection if present.",
      "Eat a healthy, balanced diet.",
      "Don't smoke.",
      "In high-risk areas, screening endoscopy may be recommended."
    ],
    "riskFactors": [
      "Primary: Helicobacter pylori (H. pylori) infection (the most significant risk factor), smoking, a diet high in smoked, salted, and pickled foods.",
      "Secondary: Chronic atrophic gastritis, pernicious anemia, family history, obesity."
    ],
    "warningSigns": [
      "See a doctor for persistent indigestion or stomach discomfort, feeling full after eating small amounts, or unexplained weight loss."
    ]
  },
  {
    "id": "testicular-seminoma",
    "name": "Testicular Seminoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common type of testicular cancer in men over 30. • Overall, a rare cancer, but the most common solid tumor in young men (ages 15-35).",
    "description": "Testicular Seminoma is a type of germ cell tumor (cancer) of the testicle. It is one of the two main types, along with non-seminoma. Seminomas tend to grow and spread more slowly than non-seminomas and are very sensitive to radiation and chemotherapy. They have an excellent cure rate, even when advanced.",
    "desc": "Testicular Seminoma is a type of germ cell tumor (cancer) of the testicle. It is one of the two main types, along with non-seminoma. Seminomas tend to grow and spread more slowly than non-seminomas and are very sensitive to radiation and chemotherapy. They have an excellent cure rate, even when advanced.",
    "symptoms": [
      "A painless lump or swelling in either testicle.",
      "A feeling of heaviness or aching in the scrotum or lower abdomen.",
      "A sudden buildup of fluid in the scrotum.",
      "Pain or discomfort in the testicle or scrotum (less common)."
    ],
    "causes": [
      "The cause is unknown. It begins when germ cells (the cells that make sperm) develop genetic abnormalities, causing them to grow uncontrollably. An undescended testicle is the strongest risk factor."
    ],
    "treatment": [
      "Radical Inguinal Orchiectomy: Surgical removal of the affected testicle through the groin. This is the first step for both diagnosis and treatment.",
      "Surveillance: For very early-stage disease, careful monitoring may be an option.",
      "Radiation Therapy: Very effective for seminoma, often used to treat the lymph nodes in the abdomen after surgery.",
      "Chemotherapy: Used for advanced or recurrent disease. It is highly effective."
    ],
    "selfCare": [
      "Perform regular testicular self-exams.",
      "Adhere to the follow-up schedule (CT scans, tumor markers), which can last for 5-10 years.",
      "Sperm banking should be discussed before any treatment that could affect fertility.",
      "Lifestyle Recommendations",
      "There are no specific lifestyle changes to prevent it."
    ],
    "prevention": [
      "There is no known way to prevent testicular cancer.",
      "Early detection through self-exams is the best strategy for a cure."
    ],
    "riskFactors": [
      "Primary: Cryptorchidism (an undescended testicle), personal or family history.",
      "Secondary: HIV/AIDS, Caucasian race."
    ],
    "warningSigns": [
      "Any lump, swelling, or hardness in the testicle, or a feeling of heaviness in the scrotum, requires immediate medical evaluation."
    ]
  },
  {
    "id": "basal-cell-carcinoma",
    "name": "Basal Cell Carcinoma",
    "category": "Oncology",
    "severity": "High",
    "prevalence": "The most common of all cancers. • Millions of cases are diagnosed each year.",
    "description": "Basal Cell Carcinoma (BCC) is the most common form of skin cancer. It arises from the basal cells in the deepest layer of the epidermis. BCCs rarely spread (metastasize) to other parts of the body but can be locally destructive if left untreated, damaging surrounding skin and bone.",
    "desc": "Basal Cell Carcinoma (BCC) is the most common form of skin cancer. It arises from the basal cells in the deepest layer of the epidermis. BCCs rarely spread (metastasize) to other parts of the body but can be locally destructive if left untreated, damaging surrounding skin and bone.",
    "symptoms": [
      "A reddish patch or irritated area.",
      "A shiny, pearly, or translucent bump.",
      "A pink growth with a slightly raised, rolled border.",
      "A scar-like area that is white, yellow, or waxy."
    ],
    "causes": [
      "Most are caused by intense, long-term exposure to ultraviolet (UV) radiation from sunlight or tanning beds. The UV radiation damages the DNA in basal cells, leading to uncontrolled growth."
    ],
    "treatment": [
      "The goal is to completely remove the cancer. The choice depends on the size, location, and type of BCC.",
      "Surgical Excision: Cutting out the tumor and a margin of healthy skin.",
      "Mohs Surgery: A specialized technique that removes the cancer layer by layer, sparing as much healthy tissue as possible. Ideal for sensitive areas like the face.",
      "Electrodessication and Curettage (ED&C): Scraping away the cancer cells and searing the base with an electric needle.",
      "Topical Medications (e.g., Imiquimod, 5-FU) for very superficial BCCs."
    ],
    "selfCare": [
      "Perform regular skin self-exams.",
      "See a dermatologist annually for a full-body skin check.",
      "Protect your skin from the sun daily with broad-spectrum sunscreen (SPF 30+), protective clothing, and seeking shade.",
      "Lifestyle Recommendations",
      "Avoid tanning beds completely."
    ],
    "prevention": [
      "Sun protection is the most effective way to reduce your risk.",
      "Be vigilant about skin changes."
    ],
    "riskFactors": [
      "Primary: Cumulative, long-term UV exposure from the sun and tanning beds.",
      "Secondary: Fair skin, light eyes, blonde or red hair, history of sunburns, age."
    ],
    "warningSigns": [
      "Not an emergency, but should be evaluated and treated promptly to prevent local damage. See a dermatologist for any new, changing, or non-healing spot on the skin."
    ]
  }
];
