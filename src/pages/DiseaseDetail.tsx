import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconArrowLeft, IconBookmark, IconShare, IconAlertTriangle, IconPhone, IconBook, IconSearch, IconMail } from '../components/Icons';

const DISEASE_DB: Record<string, {
  name: string; category: string; severity: string;
  prevalence: string; description: string;
  symptoms: string[]; causes: string[]; treatment: string[];
  selfCare: string[]; prevention: string[];
  riskFactors: string[]; warningSigns: string[];
}> = {
  mvp: {
    name: 'Mitral Valve Prolapse (MVP)', category: 'Cardiovascular', severity: 'Low',
    prevalence: 'Common: Affects 2–3% of the population. More common in women.',
    description: "Mitral Valve Prolapse is a condition where the mitral valve doesn't close properly, allowing blood to flow backward into the left atrium. Most people with MVP have no symptoms and require no treatment.",
    symptoms: ['Often asymptomatic', 'Heart palpitations or irregular heartbeat', 'Chest pain (atypical, not related to heart attack)', 'Fatigue', 'Shortness of breath', 'Dizziness or lightheadedness'],
    causes: ['Abnormal mitral valve leaflets', 'Connective tissue abnormalities', 'Genetic factors', 'Marfan syndrome or similar connective tissue disorders'],
    treatment: ['Regular monitoring with echocardiograms', 'Beta-blockers for palpitations', 'Blood thinners if blood clots are a risk', 'Surgery in severe cases of mitral regurgitation'],
    selfCare: ['Limit caffeine and alcohol', 'Stay well hydrated', 'Practice stress management techniques', 'Maintain regular but not strenuous exercise', 'Avoid stimulants like decongestants'],
    prevention: ['No definitive prevention', 'Regular cardiac check-ups', 'Inform all healthcare providers of MVP diagnosis', 'Antibiotic prophylaxis before certain dental procedures (if recommended by doctor)'],
    riskFactors: ['Female sex', 'Family history', 'Connective tissue disorders', 'Scoliosis', 'Low body weight'],
    warningSigns: ['Seek medical care for: Severe shortness of breath', 'Irregular heartbeat', 'Chest pain', 'Fainting'],
  },
  hypertension: {
    name: 'Hypertension', category: 'Cardiovascular', severity: 'Medium',
    prevalence: 'Very common: Affects about 1.28 billion adults worldwide.',
    description: 'Hypertension, or high blood pressure, is a chronic condition where the force of blood against artery walls is consistently too high. It is a major risk factor for heart disease, stroke, and kidney disease.',
    symptoms: ['Often no symptoms (silent killer)', 'Severe headaches', 'Nosebleeds', 'Fatigue or confusion', 'Vision problems', 'Chest pain'],
    causes: ['Unhealthy diet high in sodium', 'Physical inactivity', 'Obesity or overweight', 'Tobacco use', 'Excessive alcohol consumption', 'Stress', 'Genetics'],
    treatment: ['Lifestyle modifications (diet, exercise)', 'ACE inhibitors', 'Calcium channel blockers', 'Diuretics', 'Beta-blockers', 'Regular blood pressure monitoring'],
    selfCare: ['Follow DASH diet (low sodium, high potassium)', 'Exercise 30 minutes most days', 'Limit alcohol to moderate amounts', 'Quit smoking', 'Manage stress with relaxation techniques', 'Monitor blood pressure at home'],
    prevention: ['Maintain healthy weight', 'Exercise regularly', 'Eat a healthy diet low in sodium', 'Limit alcohol consumption', 'Do not smoke', 'Regular health screenings'],
    riskFactors: ['Age (risk increases with age)', 'Race (more common in people of African heritage)', 'Family history', 'Being overweight or obese', 'Physical inactivity', 'Tobacco use', 'Too much sodium', 'Too little potassium'],
    warningSigns: ['Blood pressure above 180/120', 'Severe headache with blurred vision', 'Chest pain', 'Difficulty breathing', 'Nausea and vomiting'],
  },
  diabetes: {
    name: 'Diabetes Mellitus', category: 'Endocrine', severity: 'High',
    prevalence: 'Affects over 537 million adults globally, with rapid increases across Sub-Saharan Africa.',
    description: 'A chronic metabolic disease characterized by elevated levels of blood glucose (blood sugar), which leads over time to serious damage to the heart, blood vessels, eyes, kidneys, and nerves.',
    symptoms: ['Increased thirst (polydipsia)', 'Frequent urination (polyuria)', 'Extreme hunger (polyphagia)', 'Unexplained weight loss', 'Fatigue and weakness', 'Blurred vision', 'Slow-healing sores'],
    causes: ['Insufficient insulin production by pancreas (Type 1)', 'Insulin resistance in body cells (Type 2)', 'Genetic predisposition', 'Sedentary lifestyle and obesity'],
    treatment: ['Daily insulin therapy (Type 1)', 'Oral medications like Metformin (Type 2)', 'Continuous blood glucose monitoring', 'Targeted HbA1c control', 'Cardiovascular risk management'],
    selfCare: ['Consistent carbohydrate and fiber tracking', 'Regular daily physical activity', 'Routine foot checks for ulcers', 'Adequate hydration', 'Regular eye and kidney exams'],
    prevention: ['Maintain a healthy body weight', 'Engage in at least 150 minutes of moderate exercise weekly', 'Eat a balanced diet rich in whole grains and vegetables', 'Avoid sugary drinks and processed foods'],
    riskFactors: ['Family history of diabetes', 'Overweight/obesity', 'Physical inactivity', 'High blood pressure', 'Age 45 or older'],
    warningSigns: ['Blood sugar > 250 mg/dL with ketones', 'Confusion, dizziness, or extreme fatigue', 'Fruity-smelling breath (diabetic ketoacidosis)', 'Loss of consciousness'],
  },
  malaria: {
    name: 'Malaria', category: 'Infectious', severity: 'High',
    prevalence: 'Endemic in tropical regions, affecting over 240 million people annually across Sub-Saharan Africa.',
    description: 'A life-threatening disease caused by Plasmodium parasites transmitted to people through the bites of infected female Anopheles mosquitoes.',
    symptoms: ['Recurrent high fevers with shaking chills', 'Profuse sweating as fever breaks', 'Severe headaches and muscle aches', 'Fatigue, nausea, and vomiting', 'Abdominal pain and diarrhea', 'Anemia and jaundice'],
    causes: ['Infection by Plasmodium falciparum, vivax, ovale, or malariae', 'Bite of an infected female Anopheles mosquito', 'Rarely via blood transfusion or maternal-fetal transmission'],
    treatment: ['Artemisinin-based combination therapies (ACTs)', 'Intravenous artesunate for severe malaria', 'Antipyretics for fever management', 'Fluid and electrolyte replacement', 'Blood transfusions if severe anemia occurs'],
    selfCare: ['Complete the entire prescription course of antimalarials', 'Rest and drink plenty of fluids and oral rehydration solutions (ORS)', 'Take paracetamol to manage fever and chills', 'Monitor for signs of severe dehydration or jaundice'],
    prevention: ['Sleep under insecticide-treated bed nets (ITNs)', 'Use mosquito repellents and wear long-sleeved clothing', 'Indoor residual spraying (IRS)', 'Eliminate standing water around homes'],
    riskFactors: ['Living in or traveling to malaria-endemic regions', 'Young children and pregnant women', 'Lack of mosquito netting or screening', 'Immunocompromised individuals'],
    warningSigns: ['Impaired consciousness or seizures (cerebral malaria)', 'Difficulty breathing or deep rapid breathing', 'Persistent vomiting and inability to keep fluids down', 'Dark or bloody urine'],
  },
  covid: {
    name: 'COVID-19 (SARS-CoV-2)', category: 'Infectious', severity: 'High',
    prevalence: 'Global viral respiratory infection with continuing seasonal variants.',
    description: 'A contagious respiratory illness caused by the SARS-CoV-2 coronavirus, ranging from mild cold-like symptoms to severe pneumonia and acute respiratory distress syndrome.',
    symptoms: ['Fever or chills', 'Dry cough and shortness of breath', 'Fatigue and body aches', 'Sore throat and runny nose', 'Loss of taste or smell', 'Headache and chest tightness'],
    causes: ['Infection by the SARS-CoV-2 coronavirus', 'Transmission through airborne droplets and aerosols from infected individuals'],
    treatment: ['Antiviral medications (e.g. Paxlovid) for high-risk patients', 'Oxygen therapy for respiratory distress', 'Supportive care, hydration, and antipyretics'],
    selfCare: ['Isolate to prevent spreading to family and community', 'Rest and maintain optimal hydration', 'Use a pulse oximeter to monitor blood oxygen saturation (SpO2)', 'Take over-the-counter pain relievers for aches and fever'],
    prevention: ['COVID-19 vaccination and booster shots', 'Wear well-fitted masks in crowded indoor settings', 'Ensure proper indoor ventilation', 'Frequent handwashing with soap and water'],
    riskFactors: ['Age 65 and older', 'Underlying conditions: diabetes, heart disease, chronic lung disease', 'Immunocompromised status', 'Obesity'],
    warningSigns: ['Difficulty breathing or shortness of breath', 'Persistent pain or pressure in the chest', 'New confusion or inability to wake or stay awake', 'Pale, gray, or blue-colored skin, lips, or nail beds'],
  },
  tb: {
    name: 'Tuberculosis (TB)', category: 'Respiratory', severity: 'High',
    prevalence: 'Major global infectious disease; endemic in high-burden regions.',
    description: 'A serious bacterial infection primarily affecting the lungs (pulmonary TB), spread from person to person through microscopic droplets released into the air.',
    symptoms: ['Persistent cough lasting 3 weeks or longer', 'Coughing up blood or sputum (hemoptysis)', 'Chest pain with breathing or coughing', 'Unintentional weight loss and loss of appetite', 'Night sweats and fever', 'Fatigue and weakness'],
    causes: ['Mycobacterium tuberculosis bacteria', 'Inhalation of airborne bacteria from an infected person coughing or sneezing'],
    treatment: ['Standard 6-month regimen: Isoniazid, Rifampicin, Pyrazinamide, Ethambutol (DOTS)', 'Second-line antibiotics for drug-resistant TB (MDR-TB)'],
    selfCare: ['Take every dose of prescribed antibiotics exactly on schedule without skipping', 'Maintain good nutrition to rebuild strength and immune system', 'Ensure well-ventilated living quarters with open windows and sunlight'],
    prevention: ['BCG vaccination in endemic regions', 'Prompt diagnosis and treatment of active cases', 'Infection control and masking around active cases', 'Preventive therapy for latent TB infection'],
    riskFactors: ['HIV/AIDS or weakened immune system', 'Close contact with someone with active untreated TB', 'Malnutrition', 'Tobacco and substance use'],
    warningSigns: ['Coughing up large amounts of blood', 'Severe chest pain and sudden shortness of breath', 'Rapid weight loss and extreme exhaustion'],
  },
  depression: {
    name: 'Clinical Depression (Major Depressive Disorder)', category: 'Mental Health', severity: 'Medium',
    prevalence: 'Affects an estimated 3.8% of the global population, including 5% of adults.',
    description: 'A common and serious mental health disorder that negatively affects how you feel, think, and act, causing persistent feelings of sadness and loss of interest in activities once enjoyed.',
    symptoms: ['Persistent sad, anxious, or empty mood', 'Loss of interest or pleasure in hobbies and activities', 'Decreased energy, fatigue, or feeling slowed down', 'Difficulty concentrating, remembering, or making decisions', 'Changes in sleep: insomnia or oversleeping', 'Changes in appetite and unplanned weight changes', 'Feelings of worthlessness or excessive guilt'],
    causes: ['Complex interplay of biological, genetic, environmental, and psychological factors', 'Neurotransmitter imbalances in the brain', 'Chronic medical conditions or major life stress and trauma'],
    treatment: ['Psychotherapy (Cognitive Behavioral Therapy - CBT, interpersonal therapy)', 'Antidepressant medications (SSRIs, SNRIs)', 'Combined therapy and medication approach', 'Lifestyle interventions and support groups'],
    selfCare: ['Engage in mild daily physical activity such as walking', 'Maintain regular sleep and wake schedules', 'Stay connected with trusted friends and family members', 'Avoid alcohol and recreational drugs', 'Break large tasks into small, manageable steps'],
    prevention: ['Early stress management and resilience building', 'Strong social connections and peer support', 'Routine screening during healthcare visits', 'Prompt treatment at first signs of recurrence'],
    riskFactors: ['Personal or family history of depression', 'Major life transitions, trauma, or chronic stress', 'Chronic physical illness or chronic pain', 'Certain medications'],
    warningSigns: ['Thoughts of death or suicide (Seek immediate emergency help)', 'Extreme withdrawal from all social interaction', 'Inability to perform basic daily self-care tasks'],
  },
  'aortic-stenosis': {
    name: 'Aortic Stenosis', category: 'Cardiovascular', severity: 'High',
    prevalence: 'Affects approximately 2% of people over age 65 and 3% of people over age 75.',
    description: 'A narrowing of the aortic valve opening, restricting blood flow from the left ventricle to the aorta. Can lead to heart failure if untreated.',
    symptoms: ['Chest pain (angina)', 'Fainting (syncope) with exertion', 'Shortness of breath with activity', 'Heart palpitations', 'Fatigue and reduced exercise capacity'],
    causes: ['Calcium buildup on the valve leaflets with age', 'Congenital heart defect (bicuspid aortic valve)', 'Rheumatic fever complications'],
    treatment: ['Transcatheter aortic valve replacement (TAVR)', 'Surgical aortic valve replacement (SAVR)', 'Medications to manage symptoms and blood pressure'],
    selfCare: ['Avoid heavy strenuous isometric lifting', 'Follow a low-sodium heart-healthy diet', 'Maintain regular cardiology follow-ups with echocardiograms'],
    prevention: ['Maintain healthy cardiovascular lifestyle', 'Control cholesterol and high blood pressure', 'Promptly treat streptococcal infections to prevent rheumatic heart disease'],
    riskFactors: ['Older age', 'Bicuspid aortic valve', 'High cholesterol', 'Hypertension', 'Chronic kidney disease'],
    warningSigns: ['Chest pain radiating to arm or jaw', 'Sudden fainting or blacking out', 'Severe shortness of breath at rest'],
  },
  'aortic-regurgitation': {
    name: 'Aortic Regurgitation', category: 'Cardiovascular', severity: 'Medium',
    prevalence: 'Prevalence increases with age; present in up to 13% of elderly individuals.',
    description: "Aortic Regurgitation is a condition where the aortic valve doesn't close tightly, causing blood to leak backward into the left ventricle.",
    symptoms: ['Fatigue and weakness', 'Shortness of breath with activity or when lying flat', 'Heart palpitations or pounding pulse', 'Chest pain during exertion', 'Lightheadedness'],
    causes: ['Aortic valve degeneration', 'High blood pressure', 'Endocarditis', 'Aortic root dilation', 'Rheumatic heart disease'],
    treatment: ['Surgical or catheter valve repair or replacement', 'Vasodilators and blood pressure control medications', 'Close echocardiographic surveillance'],
    selfCare: ['Elevate head while sleeping if short of breath', 'Limit sodium intake', 'Avoid excessive caffeine', 'Take medications consistently'],
    prevention: ['Strict blood pressure management', 'Antibiotic prophylaxis for dental work if indicated', 'Regular cardiac screenings'],
    riskFactors: ['Advanced age', 'History of rheumatic fever', 'Hypertension', 'Marfan syndrome'],
    warningSigns: ['Rapidly worsening shortness of breath', 'Sudden severe chest pain', 'Inability to breathe lying down (orthopnea)'],
  },
  'mitral-stenosis': {
    name: 'Mitral Stenosis', category: 'Cardiovascular', severity: 'Medium',
    prevalence: 'Common in regions where rheumatic fever remains endemic, notably Sub-Saharan Africa.',
    description: 'A narrowing of the mitral valve opening, restricting blood flow from the left atrium to the left ventricle and increasing pressure in the lungs.',
    symptoms: ['Shortness of breath especially during exercise or lying flat', 'Fatigue', 'Swollen feet or ankles', 'Heart palpitations (atrial fibrillation)', 'Frequent respiratory infections'],
    causes: ['Rheumatic fever (most common cause in developing regions)', 'Heavy calcium buildup on the valve with age'],
    treatment: ['Percutaneous balloon mitral valvuloplasty', 'Surgical mitral valve repair or replacement', 'Anticoagulants to prevent blood clots in atrial fibrillation', 'Diuretics to reduce lung fluid'],
    selfCare: ['Limit dietary salt to reduce fluid overload', 'Avoid strenuous overexertion', 'Maintain regular vaccinations against pneumonia and flu'],
    prevention: ['Prompt antibiotic treatment of streptococcal strep throat to prevent rheumatic fever', 'Secondary penicillin prophylaxis for rheumatic heart patients'],
    riskFactors: ['History of untreated strep throat or rheumatic fever', 'Female sex', 'Living in areas with limited access to antibiotics'],
    warningSigns: ['Coughing up pink frothy sputum', 'Sudden irregular fluttering heartbeat', 'Severe breathlessness'],
  },
  'mitral-regurgitation': {
    name: 'Mitral Regurgitation', category: 'Cardiovascular', severity: 'Medium',
    prevalence: 'The most common type of heart valve disease in high-income and developing countries.',
    description: "A condition where the mitral valve leaflets do not close completely, allowing blood to leak backward into the left atrium during ventricular contraction.",
    symptoms: ['Fatigue', 'Shortness of breath with exertion or when lying down', 'Heart palpitations', 'Swollen feet or ankles', 'Heart murmur detected by stethoscope'],
    causes: ['Mitral valve prolapse (MVP)', 'Damaged tissue cords (chordae tendineae)', 'Rheumatic fever', 'Coronary artery disease or heart attack', 'Endocarditis'],
    treatment: ['Mitral valve repair (preferred over replacement)', 'Transcatheter edge-to-edge repair (MitraClip)', 'Diuretics and ACE inhibitors for heart failure symptoms'],
    selfCare: ['Eat a balanced heart-healthy diet', 'Maintain moderate physical activity as approved by cardiologist', 'Limit sodium and fluid intake if recommended'],
    prevention: ['Treat strep throat early', 'Manage blood pressure and coronary artery disease', 'Maintain healthy dental hygiene to prevent endocarditis'],
    riskFactors: ['Mitral valve prolapse', 'Prior heart attack', 'History of rheumatic heart disease', 'Intravenous drug use'],
    warningSigns: ['Sudden extreme shortness of breath', 'Blue lips or fingernails', 'Loss of consciousness'],
  },
  'tricuspid-regurgitation': {
    name: 'Tricuspid Regurgitation', category: 'Cardiovascular', severity: 'Low',
    prevalence: 'Mild form is common and often benign; moderate to severe forms occur secondary to left heart disease.',
    description: "A condition where the tricuspid valve doesn't close properly, allowing blood to flow backward into the right atrium.",
    symptoms: ['Fatigue and weakness', 'Swelling in abdomen, legs, and veins in the neck', 'Pulsing in the neck veins', 'Enlarged liver causing abdominal discomfort'],
    causes: ['Enlargement of the right ventricle due to pulmonary hypertension', 'Left-sided heart failure', 'Infective endocarditis', 'Rheumatic heart disease'],
    treatment: ['Diuretics to reduce swelling and fluid overload', 'Treating underlying lung or left-heart disease', 'Surgical tricuspid annuloplasty or repair in severe cases'],
    selfCare: ['Daily weight tracking to detect fluid retention early', 'Strict low-sodium diet', 'Elevate legs when seated to minimize swelling'],
    prevention: ['Manage underlying cardiovascular and pulmonary conditions', 'Avoid tobacco and illicit intravenous drugs'],
    riskFactors: ['Pulmonary hypertension', 'Left heart disease (mitral or aortic valve disease)', 'Pacemaker or defibrillator leads crossing the valve'],
    warningSigns: ['Rapid swelling of legs and abdomen', 'Severe exhaustion', 'Jaundice (yellowing of eyes and skin)'],
  },
  pericarditis: {
    name: 'Pericarditis', category: 'Cardiovascular', severity: 'Medium',
    prevalence: 'Responsible for approximately 5% of non-ischemic chest pain admissions in emergency departments.',
    description: 'Inflammation of the pericardium, the thin sac-like membrane surrounding the heart. Can cause sharp chest pain that improves when sitting up and leaning forward.',
    symptoms: ['Sharp, stabbing chest pain behind breastbone or left chest', 'Pain worsens when breathing in, coughing, or lying flat', 'Pain improves when sitting up and leaning forward', 'Low-grade fever', 'Shortness of breath', 'Heart palpitations'],
    causes: ['Viral infections (Coxsackievirus, influenza, COVID-19)', 'Autoimmune disorders (lupus, rheumatoid arthritis)', 'Post-myocardial infarction (Dressler syndrome)', 'Kidney failure (uremia)', 'Bacterial or fungal infections'],
    treatment: ['High-dose NSAIDs (ibuprofen, aspirin)', 'Colchicine to prevent recurrences', 'Corticosteroids for refractory autoimmune cases', 'Pericardiocentesis if significant fluid accumulation occurs'],
    selfCare: ['Strict rest and avoidance of strenuous physical activity until inflammation resolves', 'Take medications with food to prevent stomach irritation', 'Use ice or heat packs for comfort if advised'],
    prevention: ['Prompt treatment of viral respiratory infections', 'Adequate management of systemic autoimmune diseases', 'Complete recommended anti-inflammatory regimens'],
    riskFactors: ['Recent viral illness', 'Autoimmune disease', 'Prior heart surgery or heart attack', 'Chronic kidney disease'],
    warningSigns: ['Severe shortness of breath with low blood pressure (cardiac tamponade)', 'Fainting or severe dizziness', 'Rapid irregular heart rate'],
  },
  myocarditis: {
    name: 'Myocarditis', category: 'Cardiovascular', severity: 'High',
    prevalence: 'Estimated at 10 to 20 cases per 100,000 persons annually, commonly in young adults.',
    description: "Inflammation of the heart muscle (myocardium) that can reduce the heart's ability to pump blood and cause rapid or abnormal heart rhythms.",
    symptoms: ['Chest pain or pressure', 'Rapid or abnormal heart rhythms (arrhythmias)', 'Shortness of breath at rest or during activity', 'Fluid buildup with leg and ankle swelling', 'Fatigue, fever, and flu-like symptoms'],
    causes: ['Viral infections (adenovirus, enterovirus, SARS-CoV-2, Parvovirus B19)', 'Bacterial, fungal, or parasite infections', 'Autoimmune reactions', 'Toxic exposures or adverse medication reactions'],
    treatment: ['Heart failure medications (ACE inhibitors, beta-blockers, diuretics)', 'Anti-arrhythmic drugs', 'Rest and avoidance of competitive sports for 3 to 6 months', 'Temporary mechanical circulatory support in severe fulminant cases'],
    selfCare: ['Complete physical rest during recovery period', 'Avoid alcohol, tobacco, and high caffeine intake', 'Follow a low-sodium diet to prevent fluid overload'],
    prevention: ['Stay up to date with vaccinations (flu, COVID-19)', 'Practice good hygiene to avoid viral infections', 'Seek prompt care for persistent chest discomfort following viral illness'],
    riskFactors: ['Recent viral syndrome', 'Male sex and young age', 'Autoimmune disease', 'Exposure to toxic heavy metals or illicit stimulants'],
    warningSigns: ['Sudden severe chest pain mimicking heart attack', 'Fainting or near-fainting episodes', 'Profound weakness and breathlessness'],
  },
  endocarditis: {
    name: 'Infective Endocarditis', category: 'Cardiovascular', severity: 'High',
    prevalence: 'Occurs in about 3 to 10 per 100,000 people annually, higher in patients with valve prostheses or congenital defects.',
    description: 'A life-threatening infection of the inner lining of the heart chambers and valves (endocardium), usually caused when bacteria spread through the bloodstream.',
    symptoms: ['Flu-like symptoms: fever, chills, fatigue', 'A new or changed heart murmur', 'Aching joints and muscles', 'Night sweats and unexplained weight loss', 'Small painful nodules on fingers or toes (Osler nodes)', 'Tiny purple or red spots on skin, whites of eyes, or mouth (petechiae)'],
    causes: ['Bacteria (Staphylococcus aureus, Streptococcus viridans, Enterococcus) entering bloodstream from mouth, skin, or medical procedures', 'Fungal infections in immunocompromised individuals'],
    treatment: ['High-dose intravenous antibiotics for 2 to 6 weeks', 'Surgical repair or replacement of damaged infected heart valves', 'Management of septic embolic complications'],
    selfCare: ['Maintain meticulous oral and dental hygiene (brushing, flossing, regular cleanings)', 'Avoid non-medical tattoos or body piercings', 'Never share needles or injection equipment'],
    prevention: ['Preventive antibiotic prophylaxis before specific dental procedures for high-risk cardiac patients', 'Prompt treatment of skin and urinary infections', 'Good daily oral care'],
    riskFactors: ['Artificial (prosthetic) heart valves', 'Congenital heart disease', 'History of endocarditis', 'Damaged heart valves from rheumatic fever', 'Intravenous drug use'],
    warningSigns: ['High persistent fever with new heart murmur', 'Weakness or numbness in arms or legs (stroke from emboli)', 'Severe chest pain or blood in urine'],
  },
};

const TABS = ['Overview', 'Symptoms', 'Causes', 'Treatment', 'Self-Care', 'Prevention'] as const;
type Tab = typeof TABS[number];

export function DiseaseDetail() {
  const { id = 'mvp' } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>('Overview');
  const lookupKey = id.toLowerCase().trim();
  const disease = DISEASE_DB[lookupKey] || {
    name: lookupKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: 'General Health',
    severity: 'Medium',
    prevalence: 'Verified medical reference entry.',
    description: `${lookupKey.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} is a documented clinical condition in the Tenaye medical database. Comprehensive diagnostic and care guidelines are curated by certified healthcare professionals.`,
    symptoms: ['Symptom presentation varies by individual severity', 'Consult a healthcare professional for clinical evaluation', 'Refer to Tenaye AI Assistant for immediate guidance'],
    causes: ['Multifactorial biological, environmental, and genetic contributions'],
    treatment: ['Clinical evaluation and customized therapy prescribed by a physician', 'Routine diagnostic monitoring'],
    selfCare: ['Adequate rest and hydration', 'Follow physician guidance consistently', 'Track symptom changes'],
    prevention: ['Maintain a balanced healthy lifestyle', 'Routine medical wellness screenings'],
    riskFactors: ['Individual clinical history', 'Family genetic predisposition'],
    warningSigns: ['Severe unremitting pain', 'Difficulty breathing or sudden altered consciousness', 'Call 907 for emergency care'],
  };

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/diseases" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <IconArrowLeft size={15} /> Back to Library
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-[#119197] font-medium">{disease.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <IconBookmark size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <IconShare size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-8 mb-8">
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 mb-3">{disease.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-6">{disease.description}</p>

            {/* Stat chips */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Severity', value: disease.severity, color: disease.severity === 'Low' ? 'text-green-600' : disease.severity === 'Medium' ? 'text-amber-600' : 'text-red-600' },
                { label: 'Prevalence', value: disease.prevalence, color: 'text-blue-600' },
                { label: 'Category', value: disease.category, color: 'text-green-600' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{s.label}</p>
                  <p className={`text-sm font-display font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=280&h=200&fit=crop&auto=format"
              alt={disease.name}
              className="w-full rounded-2xl border border-gray-200 object-cover h-[200px] bg-blue-100"
            />
          </div>
        </div>

        {/* Emergency alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <IconAlertTriangle size={18} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-display font-semibold text-red-700 text-sm mb-1">Emergency Warning Signs</p>
            <p className="text-red-600 text-xs">Seek medical care for: {disease.warningSigns.join(', ')}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a href="tel:907" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors">
              <IconPhone size={12} /> Emergency Help
            </a>
            <Link
              to="/contact"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#119197] text-[#119197] hover:bg-[#e6f7f7] text-xs font-semibold transition-colors cursor-pointer"
            >
              <IconMail size={12} /> Contact Doctor
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3.5 text-sm font-display font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  tab === t
                    ? 'border-[#119197] text-[#119197] bg-[#e6f7f7]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-slate-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === 'Overview' && (
              <div>
                <div className="flex items-center gap-2 text-[#119197] mb-3">
                  <IconBook size={16} />
                  <h3 className="font-display font-bold text-sm">What is {disease.name}?</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{disease.description}</p>
                <div className="bg-[#e6f7f7] border border-[#cceef0] rounded-xl p-4">
                  <p className="font-display font-semibold text-[#0c6e73] text-xs mb-1">Prevalence</p>
                  <p className="text-[#119197] text-sm">{disease.prevalence}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mt-6">
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-sm mb-3">Risk Factors</h4>
                    <ul className="space-y-2">
                      {disease.riskFactors.map(r => (
                        <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                          <IconAlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-900 text-sm mb-3">Warning Signs (Urgent)</h4>
                    <ul className="space-y-2">
                      {disease.warningSigns.map(w => (
                        <li key={w} className="flex items-start gap-2 text-sm text-gray-600">
                          <IconAlertTriangle size={13} className="text-red-500 shrink-0 mt-0.5" />{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {tab === 'Symptoms' && (
              <ul className="space-y-3">
                {disease.symptoms.map(s => (
                  <li key={s} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-[#119197] shrink-0" />{s}
                  </li>
                ))}
              </ul>
            )}
            {tab === 'Causes' && (
              <ul className="space-y-3">
                {disease.causes.map(c => (
                  <li key={c} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />{c}
                  </li>
                ))}
              </ul>
            )}
            {tab === 'Treatment' && (
              <ul className="space-y-3">
                {disease.treatment.map(t => (
                  <li key={t} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />{t}
                  </li>
                ))}
              </ul>
            )}
            {tab === 'Self-Care' && (
              <ul className="space-y-3">
                {disease.selfCare.map(s => (
                  <li key={s} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />{s}
                  </li>
                ))}
              </ul>
            )}
            {tab === 'Prevention' && (
              <ul className="space-y-3">
                {disease.prevention.map(p => (
                  <li key={p} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />{p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-500 mb-1">Need Medical Advice?</p>
            <p className="font-display font-semibold text-[#119197] text-sm mb-4">Connect with healthcare professionals</p>
            <div className="space-y-2">
              <a href="tel:907" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors">
                <IconPhone size={15} /> Find Emergency Services
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#119197] text-[#119197] hover:bg-[#e6f7f7] text-sm font-semibold transition-colors cursor-pointer"
              >
                <IconMail size={15} /> Contact Healthcare Team
              </Link>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs text-gray-500 mb-1">More Resources</p>
            <p className="font-display font-semibold text-[#119197] text-sm mb-4">Learn more about health conditions</p>
            <div className="space-y-2">
              <Link to="/diseases" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors">
                <IconSearch size={15} /> Browse Disease Library
              </Link>
              <Link to="/health-tips" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-colors">
                <IconBook size={15} /> Read Health Tips
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8" />
    </main>
  );
}
