// Pre-mapped clinical & anatomical images from Wikimedia Commons & Medical Archives
export interface DiseaseImageInfo {
  url: string
  caption: string
  source: "Wikimedia Commons" | "Unsplash Medical"
}

export const DISEASE_IMAGES: Record<string, DiseaseImageInfo> = {
  "hypertension-htn": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Grade_1_hypertension.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Hypertension (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "coronary-artery-disease-cad": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Blausen_0259_CoronaryArteryDisease_02.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Coronary artery disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "congestive-heart-failure-chf": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Elevated_JVP.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Heart failure (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "atrial-fibrillation-afib": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Afib_ecg.svg/960px-Afib_ecg.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Atrial fibrillation (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "myocardial-infarction-heart-attack": {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Blausen_0463_HeartAttack.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Myocardial infarction (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "peripheral-artery-disease-pad": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "aortic-aneurysm": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Aortic_aneurysm_hariadhi_svg.svg/960px-Aortic_aneurysm_hariadhi_svg.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Aortic aneurysm (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "hypertrophic-cardiomyopathy-hcm": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "infective-endocarditis": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "constrictive-pericarditis": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "mitral-valve-stenosis": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "rheumatic-heart-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Rheumatic_heart_disease%2C_gross_pathology_20G0013_lores.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Rheumatic fever (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "pulmonary-hypertension": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Pulmonary_Hypertension.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Pulmonary hypertension (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  atherosclerosis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Blausen_0257_CoronaryArtery_Plaque.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Atherosclerosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "unstable-angina": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "third-degree-heart-block": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "supraventricular-tachycardia-svt": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "sick-sinus-syndrome": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "sudden-cardiac-arrest": {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/20/US_Navy_040421-N-8090G-001_Hospital_Corpsman_3rd_Class_Flowers_administers_chest_compressions_to_a_simulated_cardiac_arrest_victim.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Cardiac arrest (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "ischemic-stroke": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "deep-vein-thrombosis-dvt": {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Deep_vein_thrombosis_of_the_right_leg.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Deep vein thrombosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chronic-venous-insufficiency-cvi": {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/38/VenousInsufficiency-left-a.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Chronic venous insufficiency (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "pulmonary-embolism-pe": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Pulmonary-embolism.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Pulmonary embolism (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "ventricular-tachycardia-v-tach": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "takayasus-arteritis": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "allergic-asthma": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Asthma_%28Lungs%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Asthma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chronic-bronchitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Bronchitis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Bronchitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "bacterial-pneumonia": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "acute-bronchitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/99/Bronchitis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Bronchitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "pulmonary-tuberculosis-tb": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Tuberculosis-x-ray-1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Tuberculosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "non-small-cell-lung-cancer-nsclc": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Squamous_carcinoma_lung_cytology.gif?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Non-small-cell lung cancer (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "panlobular-emphysema": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "idiopathic-pulmonary-fibrosis-ipf": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Ipf_NIH.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Idiopathic pulmonary fibrosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "obstructive-sleep-apnea-osa": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Obstruction_ventilation_apn%C3%A9e_sommeil.svg/960px-Obstruction_ventilation_apn%C3%A9e_sommeil.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Obstructive sleep apnea (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "influenza-a": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/00/Viruses-12-00504-g001.webp?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Influenza A virus (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "covid-19": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/48/Fphar-11-00937-g001.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: COVID-19 (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "malignant-pleural-effusion": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "spontaneous-pneumothorax": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "cystic-fibrosis-cf": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Cysticfibrosis02.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Cystic fibrosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "non-cystic-fibrosis-bronchiectasis": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "chronic-laryngitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/74/Laryngitis_gastrica.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Laryngitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chronic-sinusitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Sinusitis_cdc.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Sinusitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "recurrent-tonsillitis": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "streptococcal-pharyngitis": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "acute-respiratory-distress-syndrome-ards": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/19/ARDSSevere.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Acute respiratory distress syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  silicosis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Coupe_de_poumon_atteint_de_silicose.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Silicosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  asbestosis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/02/Asbestosis_-_Fibrous_pleural_plaque_%287468458430%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Asbestosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "cardiogenic-pulmonary-edema": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "rhinovirus-infection": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "pertussis-whooping-cough": {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Pertussis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Whooping cough (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "plasmodium-falciparum-malaria": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Malaria_Parasite_Connecting_to_Human_Red_Blood_Cell_%2834034143483%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Malaria (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "symptomatic-hiv-infection": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/HIV-budding-Color.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: HIV (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-hepatitis-b": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Hepatitis-B_virions.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Hepatitis B (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chronic-hepatitis-c": {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3b/HCV_EM_picture_2.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Hepatitis C (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "typhoid-fever": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  cholera: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Adult_cholera_patient.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Cholera (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "dengue-hemorrhagic-fever": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Denguerash.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Dengue fever (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  measles: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/27/RougeoleDP.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Measles (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  mumps: {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/80/Mumps_PHIL_130_lores.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Mumps (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "congenital-rubella-syndrome": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  "chickenpox-varicella": {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Varicela_Aranzales.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Chickenpox (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "herpes-zoster-ophthalmicus": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  "ebola-virus-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/7042_lores-Ebola-Zaire-CDC_Photo.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Ebola (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "zika-virus": {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Zika_EM_CDC_20541.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Zika virus (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "generalized-tetanus": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Opisthotonus_in_a_patient_suffering_from_tetanus_-_Painting_by_Sir_Charles_Bell_-_1809.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Tetanus (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "respiratory-diphtheria": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  pertussis: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Pertussis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Whooping cough (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "lepromatous-leprosy": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  "bacterial-meningitis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Meninges-en.svg/500px-Meninges-en.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Meningitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "severe-sepsis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Sepsis-Mikrothomben1.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Sepsis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  gonorrhea: {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Gonococcal_lesion_on_the_skin_PHIL_2038_lores.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Gonorrhea (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "primary-syphilis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Treponema_pallidum_Bacteria_%28Syphilis%29_%28cropped%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Syphilis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chlamydial-urethritis": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  "sars-cov-2-infection": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  "bubonic-plague": {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Plague_-buboes.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Bubonic plague (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "type-1-diabetes-mellitus": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Blue_circle_for_diabetes.svg/250px-Blue_circle_for_diabetes.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Type 1 diabetes (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "type-2-diabetes-mellitus": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Blue_circle_for_diabetes.svg/250px-Blue_circle_for_diabetes.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Type 2 diabetes (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "graves-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Proptosis_and_lid_retraction_from_Graves%27_Disease.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Graves' disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "hashimotos-thyroiditis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Hashimoto_thyroiditis_-_alt_--_very_low_mag.jpg/3840px-Hashimoto_thyroiditis_-_alt_--_very_low_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Hashimoto's thyroiditis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "cushings-syndrome": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/CushingsFace.jpg/3840px-CushingsFace.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Cushing's syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "addisons-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Addison%27sLegs.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Addison's disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "morbid-obesity": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/73/FatCT2008_%28cropped%29.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Obesity (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "metabolic-syndrome": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Obesity6.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Metabolic syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "phenylketonuria-pku": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/L-Phenylalanin_-_L-Phenylalanine.svg/250px-L-Phenylalanin_-_L-Phenylalanine.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Phenylketonuria (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-gouty-arthritis": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "familial-hypercholesterolemia": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "reactive-hypoglycemia": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "vitamin-d-resistant-rickets": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "postmenopausal-osteoporosis": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "hereditary-hemochromatosis": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "wilsons-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/da/Wilson%27s_Disease_4.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Wilson's disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "classic-galactosemia": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Beta-D-Galactopyranose.svg/960px-Beta-D-Galactopyranose.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Galactosemia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "maple-syrup-urine-disease": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/L-Leucine.svg/330px-L-Leucine.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Maple syrup urine disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "lactose-intolerance": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Lactose_Haworth.svg/330px-Lactose_Haworth.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Lactose intolerance (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "severe-vitamin-d-deficiency": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "diabetic-ketoacidosis-dka": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "subacute-thyroiditis": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "congenital-adrenal-hyperplasia": {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "primary-hyperparathyroidism": {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Illu_thyroid_parathyroid.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Primary hyperparathyroidism (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  hypoparathyroidism: {
    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&auto=format",
    caption: "Metabolic Medical Reference",
    source: "Unsplash Medical",
  },
  "major-depressive-disorder": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/At_Eternity%27s_Gate_-_Vincent_Van_Gogh.jpg/3840px-At_Eternity%27s_Gate_-_Vincent_Van_Gogh.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Major depressive disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "generalized-anxiety-disorder": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Generalized anxiety disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "bipolar-i-disorder": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  "paranoid-schizophrenia": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Cloth_embroidered_by_a_schizophrenia_sufferer.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Schizophrenia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "post-traumatic-stress-disorder-ptsd": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  "obsessive-compulsive-disorder-ocd": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/OCD_Cycle.svg/960px-OCD_Cycle.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Obsessive–compulsive disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "anorexia-nervosa": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Gull_-_Anorexia_Miss_A.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Anorexia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "borderline-personality-disorder": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/04/Edvard_Munch_-_The_Brooch._Eva_Mudocci_-_Google_Art_Project.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Borderline personality disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "panic-disorder": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/45/Panic_attack.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Panic disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "autism-spectrum-disorder-asd": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Autism-stacking-cans_2nd_edit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Autism (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "attention-deficit-hyperactivity-disorder-adhd": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  narcolepsy: {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2d/1R02_crystallography.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Narcolepsy (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "vascular-dementia": {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/BrainAtrophy%28exvacuo%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Vascular dementia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "alzheimers-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Brain-ALZH.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Alzheimer's disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "brief-psychotic-disorder": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  "social-anxiety-disorder": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/20220801_Introversion_-_Shyness_-_Social_anxiety_disorder_-_comparative_chart.svg/1920px-20220801_Introversion_-_Shyness_-_Social_anxiety_disorder_-_comparative_chart.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Social anxiety disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "opioid-use-disorder": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Morphin_-_Morphine.svg/330px-Morphin_-_Morphine.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Opioid use disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "adjustment-disorder-with-anxiety": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  "delusional-disorder": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Th%C3%A9odore_G%C3%A9ricault_-_Man_with_Delusions_of_Military_Command_-_WGA08633.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Delusional disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "somatic-symptom-disorder": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  "tourette-syndrome": {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/37/Tourette2.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Tourette syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "antisocial-personality-disorder": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  "cyclothymic-disorder": {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
    caption: "Mental Health Medical Reference",
    source: "Unsplash Medical",
  },
  "chronic-insomnia": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b7/53-aspetti_di_vita_quotidiana%2C_insonnia%2C_Taccuino_Sanitatis%2C.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Insomnia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "seasonal-affective-disorder-sad": {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Light_Therapy_for_SAD.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Seasonal affective disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "temporal-lobe-epilepsy": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Lobes_of_the_brain_NL.svg/1280px-Lobes_of_the_brain_NL.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Temporal lobe epilepsy (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "parkinsons-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/05/Parkinson%E2%80%99s_disease_1880s.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Parkinson's disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "relapsing-remitting-multiple-sclerosis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Myelin_sheath_damage_in_multiple_sclerosis_%28larger_text%29.svg/1280px-Myelin_sheath_damage_in_multiple_sclerosis_%28larger_text%29.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Multiple sclerosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "migraine-with-aura": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "early-onset-alzheimers-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Brain-ALZH.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Alzheimer's disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "hemorrhagic-stroke": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "bells-palsy": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Bellspalsy.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Bell's palsy (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "viral-meningitis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Meninges-en.svg/500px-Meninges-en.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Viral meningitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "herpes-simplex-encephalitis": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "guillain-barr-syndrome": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "huntingtons-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/03/Neuron_with_mHtt_inclusion.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Huntington's disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "spastic-cerebral-palsy": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "glioblastoma-multiforme": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Glioblastoma_-_MR_coronal_with_contrast.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Glioblastoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "myasthenia-gravis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/DiplopiaMG1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Myasthenia gravis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "diabetic-peripheral-neuropathy": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "essential-tremor": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Spiral_drawing_of_Essential_Tremor_patient.svg/960px-Spiral_drawing_of_Essential_Tremor_patient.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Essential tremor (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "benign-paroxysmal-positional-vertigo-bppv": {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/33/Balance_Disorder_Illustration_A.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Benign paroxysmal positional vertigo (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "generalized-seizure-disorder": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "traumatic-spinal-cord-injury": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "obstructive-hydrocephalus": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "cluster-headache": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Gray778.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Cluster headache (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "trigeminal-neuralgia": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Gray778.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Trigeminal neuralgia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "carpal-tunnel-syndrome": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Untreated_Carpal_Tunnel_Syndrome.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Carpal tunnel syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "friedreichs-ataxia": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Protein_FXN_PDB_1ekg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Friedreich's ataxia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "spasmodic-torticollis": {
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop&auto=format",
    caption: "Neurological Medical Reference",
    source: "Unsplash Medical",
  },
  "osteoarthritis-of-the-knee": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Heberden-Arthrose.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Osteoarthritis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "seropositive-rheumatoid-arthritis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Rheumatoid_Arthritis.JPG/3840px-Rheumatoid_Arthritis.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Rheumatoid arthritis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  gout: {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Gout_Signs_and_Symptoms.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Gout (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "osteoporosis-with-pathological-fracture": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "rotator-cuff-tendinitis": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "olecranon-bursitis": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  fibromyalgia: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Widespread_Pain_Index_Areas.svg/250px-Widespread_Pain_Index_Areas.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Fibromyalgia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "duchenne-muscular-dystrophy": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/49/Duchenne-muscular-dystrophy.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Duchenne muscular dystrophy (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "adolescent-idiopathic-scoliosis": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "compound-fracture": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Broken_fixed_arm.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Bone fracture (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "ankle-sprain": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "hamstring-strain": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "shoulder-dislocation": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "chronic-lower-back-pain": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Lumbar_region_in_human_skeleton.svg/250px-Lumbar_region_in_human_skeleton.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Low back pain (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "cervicalgia-neck-pain": {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Neck_pain_illustration.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Neck pain (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "scheuermanns-kyphosis": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  lordosis: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Illu_vertebral_column.svg/960px-Illu_vertebral_column.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Lordosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "knee-joint-effusion": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "carpal-tunnel-syndrome-169": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Untreated_Carpal_Tunnel_Syndrome.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Carpal tunnel syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "full-thickness-rotator-cuff-tear": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "achilles-tendon-rupture": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Achilles_Tendon_Tear.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Achilles tendon rupture (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "medial-tibial-stress-syndrome-shin-splints": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Tibia_-_frontal_view2.png/3840px-Tibia_-_frontal_view2.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Shin splints (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "lateral-epicondylitis-tennis-elbow": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/En-elbow_joint.svg/960px-En-elbow_joint.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Tennis elbow (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "medial-epicondylitis-golfers-elbow": {
    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&auto=format",
    caption: "Musculoskeletal Medical Reference",
    source: "Unsplash Medical",
  },
  "plantar-fasciitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/PF-PainAreas.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Plantar fasciitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "invasive-ductal-carcinoma-breast": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/48/Weibliche_brust_en.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Breast (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "small-cell-lung-cancer": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/92/Small_cell_lung_cancer_-_cytology.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Small-cell carcinoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "adenocarcinoma-of-the-prostate": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Diagram_showing_prostate_cancer_pressing_on_the_urethra_CRUK_182.svg/500px-Diagram_showing_prostate_cancer_pressing_on_the_urethra_CRUK_182.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Prostate cancer (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "colon-cancer": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Blausen_0246_ColorectalCancer.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Colorectal cancer (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-lymphoblastic-leukemia": {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Morphological_types_of_acute_lymphoblastic_leukemia.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Acute lymphoblastic leukemia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "non-hodgkin-lymphoma": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Mantle_cell_lymphoma_-_intermed_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Non-Hodgkin lymphoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "malignant-melanoma": {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Melanoma.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Melanoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "pancreatic-adenocarcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "hepatocellular-carcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "squamous-cell-carcinoma-of-cervix": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "epithelial-ovarian-cancer": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "transitional-cell-carcinoma-of-bladder": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  meningioma: {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Huge_Meningioma.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Meningioma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  osteosarcoma: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Osteosarcoma_-_intermed_mag.jpg/3840px-Osteosarcoma_-_intermed_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Osteosarcoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "papillary-thyroid-carcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "esophageal-adenocarcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "renal-cell-carcinoma": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Clear_cell_renal_cell_carcinoma_high_mag.jpg/3840px-Clear_cell_renal_cell_carcinoma_high_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Renal cell carcinoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "gastric-adenocarcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "testicular-seminoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "basal-cell-carcinoma": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Superficial_basal_cell_carcinoma.jpg/3840px-Superficial_basal_cell_carcinoma.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Basal-cell carcinoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "kaposis-sarcoma": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Kaposis_sarcoma_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Kaposi's sarcoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "nasopharyngeal-carcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "gallbladder-adenocarcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "endometrioid-endometrial-carcinoma": {
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&auto=format",
    caption: "Oncology Medical Reference",
    source: "Unsplash Medical",
  },
  "hodgkins-lymphoma": {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Hodgkin_lymphoma_cytology_large.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Hodgkin lymphoma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "stage-3-chronic-kidney-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/CKD_-_Chronic_kidney_disease.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Chronic kidney disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-kidney-injury-from-sepsis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Sepsis-Mikrothomben1.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Sepsis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-poststreptococcal-glomerulonephritis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Post-infectious_glomerulonephritis_-_very_high_mag.jpg/3840px-Post-infectious_glomerulonephritis_-_very_high_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Acute proliferative glomerulonephritis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "minimal-change-disease-nephrotic-syndrome": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Minimal_Change_Disease_Pathology_Diagram.svg/960px-Minimal_Change_Disease_Pathology_Diagram.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Minimal change disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "autosomal-dominant-polycystic-kidney-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/CKD_-_Chronic_kidney_disease.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Chronic kidney disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "calcium-oxalate-kidney-stones": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Nefrolit.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Kidney stone disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "complicated-urinary-tract-infection": {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Pyuria.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Urinary tract infection (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-pyelonephritis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Xanthogranulomatous_pyelonephritis_cd68.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Pyelonephritis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "congenital-hydronephrosis": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "atherosclerotic-renal-artery-stenosis": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "end-stage-renal-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0b/CKD_-_Chronic_kidney_disease.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Chronic kidney disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "diabetic-nephropathy": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "hypertensive-nephrosclerosis": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "acute-interstitial-nephritis": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "simple-renal-cyst": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "uremic-syndrome": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "clear-cell-renal-cell-carcinoma": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "microscopic-hematuria": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "nephrotic-range-proteinuria": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "prerenal-azotemia": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "fanconi-syndrome": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "type-1-renal-tubular-acidosis": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "goodpasture-syndrome": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Crescentic_glomerulonephritis_-_high_mag.jpg/3840px-Crescentic_glomerulonephritis_-_high_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Goodpasture syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "focal-segmental-glomerulosclerosis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Focal_segmental_glomerulosclerosis_-_high_mag.jpg/3840px-Focal_segmental_glomerulosclerosis_-_high_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Focal segmental glomerulosclerosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "medullary-sponge-kidney": {
    url: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop&auto=format",
    caption: "Renal Medical Reference",
    source: "Unsplash Medical",
  },
  "autoimmune-gastritis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Gastritis_helicobacter_-_intermed_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Gastritis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "duodenal-ulcer": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Gastric_Ulcer.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Peptic ulcer disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "refractory-gerd": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Gastroesophageal_reflux_barium_X-ray.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Gastroesophageal reflux disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "irritable-bowel-syndrome-with-diarrhea-ibs-d": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Irritable_bowel_syndrome.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Irritable bowel syndrome (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "crohns-disease-of-the-ileum": {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Macro_Il%C3%A9on_terminal%2C_caecum_et_c%C3%B4lon_ascendant_-_Maladie_de_Crohn_55-o.apatho-1691p-ilcaco.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Crohn's disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "ulcerative-proctitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Gastric_Ulcer.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Peptic ulcer disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "alcoholic-hepatitis": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "symptomatic-gallstones-cholelithiasis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/73/Gallstones.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Gallstone (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-gallstone-pancreatitis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/Illu_pancrease.svg/330px-Illu_pancrease.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Pancreatitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "alcoholic-liver-cirrhosis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Cirrhosis_of_liver.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Cirrhosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-appendicitis": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/En.Wikipedia-VideoWiki-Appendicitis.webm/1280px--En.Wikipedia-VideoWiki-Appendicitis.webm.jpg",
    caption: "Real clinical reference: Appendicitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "thrombosed-hemorrhoids": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Internal_and_external_hemorrhoids.png/3840px-Internal_and_external_hemorrhoids.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Hemorrhoid (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-diverticulitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Diverticula%2C_sigmoid_colon.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Diverticulitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chronic-idiopathic-constipation": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "infectious-diarrhea": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "viral-gastroenteritis": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "refractory-celiac-disease": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/59/Coeliac_disease_endoscopy.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Coeliac disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "rectal-cancer": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/12/Blausen_0246_ColorectalCancer.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Colorectal cancer (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "non-alcoholic-steatohepatitis-nash": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "lactose-intolerance-245": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/36/Lactose_Haworth.svg/330px-Lactose_Haworth.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Lactose intolerance (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "sliding-hiatal-hernia": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "chronic-anal-fissure": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "obstructive-jaundice": {
    url: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&h=600&fit=crop&auto=format",
    caption: "Gastrointestinal Medical Reference",
    source: "Unsplash Medical",
  },
  "portal-hypertension-induced-ascites": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Grade_1_hypertension.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Hypertension (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "reflux-esophagitis": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Gastroesophageal_reflux_barium_X-ray.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Gastroesophageal reflux disease (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  hypertension: {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Grade_1_hypertension.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Hypertension (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  malaria: {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Malaria_Parasite_Connecting_to_Human_Red_Blood_Cell_%2834034143483%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Malaria (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  diabetes: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Blue_circle_for_diabetes.svg/250px-Blue_circle_for_diabetes.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Type 2 diabetes (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  depression: {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/At_Eternity%27s_Gate_-_Vincent_Van_Gogh.jpg/3840px-At_Eternity%27s_Gate_-_Vincent_Van_Gogh.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Major depressive disorder (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  asthma: {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Asthma_%28Lungs%29.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Asthma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "hypertensive-heart-disease-251": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/47/Grade_1_hypertension.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Hypertension (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "stable-angina-252": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/73/Horse_stable_-_Middletown.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Stable (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "right-sided-heart-failure-253": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "atrial-flutter-254": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Atrial_flutter34.svg/3840px-Atrial_flutter34.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Atrial flutter (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "non-st-elevation-myocardial-infarction-nstemi-255": {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Blausen_0463_HeartAttack.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Myocardial infarction (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "critical-limb-ischemia-256": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "thoracic-aortic-aneurysm-257": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Chest.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Thorax (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "dilated-cardiomyopathy-258": {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Myocardiopathy_dilated2.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Dilated cardiomyopathy (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "nonbacterial-thrombotic-endocarditis-nbte-259": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "acute-pericarditis-260": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Pericarditis10.JPG/3840px-Pericarditis10.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Pericarditis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "mitral-regurgitation-261": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Diagram_of_the_human_heart_%28cropped%29.svg/960px-Diagram_of_the_human_heart_%28cropped%29.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Mitral valve (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-rheumatic-fever-262": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Rheumatic_heart_disease%2C_gross_pathology_20G0013_lores.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Rheumatic fever (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chronic-thromboembolic-pulmonary-hypertension-cteph-263": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "coronary-artery-atherosclerosis-264": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "prinzmetals-angina-265": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "first-degree-heart-block-266": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "atrial-tachycardia-267": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Diagram_of_the_human_heart_%28cropped%29.svg/960px-Diagram_of_the_human_heart_%28cropped%29.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Atrium (heart) (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "bradycardia-tachycardia-syndrome-268": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "pulseless-electrical-activity-pea-269": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "transient-ischemic-attack-tia-270": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Transient_ischemic_attack_by_hariadhi_dedicated_to_my_dad.svg/960px-Transient_ischemic_attack_by_hariadhi_dedicated_to_my_dad.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption:
      "Real clinical reference: Transient ischemic attack (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "upper-extremity-deep-vein-thrombosis-dvt-271": {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Deep_vein_thrombosis_of_the_right_leg.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption:
      "Real clinical reference: Deep vein thrombosis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "varicose-veins-with-inflammation-272": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Leg_Before_1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Varicose veins (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "amniotic-fluid-embolism-273": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "paroxysmal-atrial-fibrillation-274": {
    url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop&auto=format",
    caption: "Cardiovascular Medical Reference",
    source: "Unsplash Medical",
  },
  "giant-cell-arteritis-temporal-arteritis-275": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/07/Rhinegold_and_the_Valkyries_p_032.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Giant (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "exercise-induced-bronchoconstriction-eib-276": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/92/Blausen_0620_Lungs_NormalvsInflamedAirway.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Bronchoconstriction (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "emphysema-277": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Emphysema%2C_centrilobular_%284563270814%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Emphysema (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "viral-pneumonia-278": {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/81/Chest_radiograph_in_influensa_and_H_influenzae%2C_posteroanterior%2C_annotated.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Pneumonia (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "chronic-obstructive-bronchitis-279": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "latent-tuberculosis-infection-ltbi-280": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
  "small-cell-lung-cancer-sclc-281": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/03/LungCACXR.PNG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Lung cancer (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "centrilobular-emphysema-282": {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Emphysema%2C_centrilobular_%284563270814%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Emphysema (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "hypersensitivity-pneumonitis-283": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/2228_Immune_Hypersensitivity_new.jpg/3840px-2228_Immune_Hypersensitivity_new.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Hypersensitivity (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "central-sleep-apnea-csa-284": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Obstruction_ventilation_apn%C3%A9e_sommeil.svg/960px-Obstruction_ventilation_apn%C3%A9e_sommeil.svg.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Sleep apnea (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "influenza-b-285": {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Ijms-18-00020-g001.B.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Influenza B virus (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "post-covid-syndrome-long-covid-286": {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/94/Coronavirus._SARS-CoV-2.png?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Long COVID (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "parapneumonic-effusion-287": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "tension-pneumothorax-288": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "cystic-fibrosis-with-pancreatic-insufficiency-289": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Bronchogenic_cyst_high_mag.jpg/3840px-Bronchogenic_cyst_high_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Cyst (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "cystic-fibrosis-bronchiectasis-290": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Bronchogenic_cyst_high_mag.jpg/3840px-Bronchogenic_cyst_high_mag.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Cyst (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-laryngitis-291": {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/74/Laryngitis_gastrica.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Laryngitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "acute-bacterial-sinusitis-292": {
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=600&fit=crop&auto=format",
    caption: "Respiratory Medical Reference",
    source: "Unsplash Medical",
  },
  "acute-tonsillitis-293": {
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Pos_strep.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Tonsillitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "viral-pharyngitis-294": {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Pharyngitis.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Pharyngitis (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "neonatal-respiratory-distress-syndrome-rds-295": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/The_newborn_baby_in_men.jpg/3840px-The_newborn_baby_in_men.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Infant (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "coal-workers-pneumoconiosis-cwp-296": {
    url: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Bituminous_Coal.JPG/3840px-Bituminous_Coal.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    caption: "Real clinical reference: Coal (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "mesothelioma-297": {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/53/MesotheliomaCT.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Mesothelioma (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "non-cardiogenic-pulmonary-edema-ards-298": {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1c/PulmEdema.PNG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Pulmonary edema (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "adenovirus-infection-299": {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Adenovirus_4.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    caption: "Real clinical reference: Adenoviridae (Wikimedia Commons)",
    source: "Wikimedia Commons",
  },
  "parapertussis-300": {
    url: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop&auto=format",
    caption: "Infectious Medical Reference",
    source: "Unsplash Medical",
  },
}
