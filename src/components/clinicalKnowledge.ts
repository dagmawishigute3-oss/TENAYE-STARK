import { ALL_DISEASES, DiseaseItem } from "../data/diseasesIndex"

/**
 * High-precision, comprehensive clinical knowledge engine.
 * Guarantees direct, immediate, and fully structured medical guidance
 * in both English and Amharic, matching the full clinical depth of the Tenaye platform.
 */
function getRawClinicalResponse(query: string, isAmharic: boolean): string {
  const q = (query || "").toLowerCase().trim()

  // 0. Conversational audio check: "can you hear me", "can u hear me", "are you there", "hey can you hear me", etc.
  if (
    /\b(can\s+you\s+hear\s+me|do\s+you\s+hear\s+me|are\s+you\s+listening|hear\s+me|can\s+u\s+hear\s+me|testing\s+mic|can\s+you\s+hear|hey\s+can\s+you\s+hear|can\s+you\s+hear\s+us|can\s+you\s+hear\b)/i.test(
      q,
    ) ||
    /^(hey\s+)?can\s+(you\s+)?(hear)?$/i.test(q) ||
    /(ትሰማኛለህ|ትሰሚያለሽ|ትሰማለህ|እየሰማኸኝ|እየሰማሽኝ|ድምፄ\s*ይሰማል|ይሰማል)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አዎ፣ በደንብ እሰማዎታለሁ!**\n\n" +
        "እኔ የጤናዬ (Tenaye) የድምጽና የጽሑፍ የጤና ረዳት ነኝ። ዛሬ በጤና ጉዳይዎ፣ በህመም ምልክቶች ወይም በድንገተኛ አደጋ መረጃ እንዴት ልረዳዎት እችላለሁ?"
      )
    }
    return (
      "**Yes, I can hear you clearly!**\n\n" +
      "I am your Tenaye Health Assistant. How can I assist you with your health questions, symptoms, or medical guidance today?"
    )
  }

  // 0.1 Generic greeting without medical questions
  if (
    /^(hello|hi|hey|greetings|good\s+(morning|afternoon|evening))\b[?.!\s]*$/i.test(
      q,
    ) ||
    /^(ሰላም|ጤና\s*ይስጥልኝ|እንደምን\s*(አደርክ|አደርሽ|ዋልክ|ዋልሽ))[?.!\s]*$/i.test(q)
  ) {
    if (isAmharic) {
      return (
        "**ጤና ይስጥልኝ!**\n\n" +
        "ጤናዬ ነኝ። ዛሬ ምን ዓይነት የጤና መረጃ፣ የምልክቶች ምርመራ ወይም ድጋፍ ይፈልጋሉ?"
      )
    }
    return (
      "**Hello!**\n\n" +
      "I am Tenaye Health Assistant. How can I assist you with your health questions, disease information, or symptom assessment today?"
    )
  }

  // 1. Founders and Core Team
  if (
    /\b(founder|founders|creator|creators|who made|who created|built this|team|author)\b/i.test(
      q,
    ) ||
    /(መስራች|መስራቾች|የሰራው|ማነው የሰራው|ማን ሰራው|ቡድን)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**የጤናዬ (Tenaye) መስራቾች እና የቡድን አባላት፡**\n\n" +
        "ጤናዬ በኢትዮጵያ ዲጂታል የጤና አጠባበቅን ለማዘመን በወሰኑ ወጣት የቴክኖሎጂና የህክምና ባለሙያዎች የተሰራ መድረክ ነው፡\n\n" +
        "• **ዮናታን ሙሉቀን (Yonatan Muluken):** ዋና መስራች እና ሲስተም አርክቴክት (Lead System Architect)\n" +
        "• **ናሆም ጥበቡ (Nahom Tibebu):** ተባባሪ መስራች (Co-founder)\n" +
        "• **ዳግማዊ ሽጉጤ (Dagmawi Shigute):** ተባባሪ መስራች (Co-founder)\n" +
        "• **አዩብ ኢብራሂም (Ayub Ebrahim):** ተባባሪ መስራች (Co-founder)\n\n" +
        "ተልዕኳችን በኢትዮጵያ ውስጥ ጥራት ያለው፣ ፈጣን እና አስተማማኝ የጤና መረጃና ድንገተኛ የህክምና ድጋፍ ለሁሉም ህብረተሰብ ተደራሽ ማድረግ ነው።"
      )
    }
    return (
      "**Tenaye (ጤናዬ) Founders & Core Team:**\n\n" +
      "Tenaye was created and developed by a dedicated team of Ethiopian technologists and healthcare innovators:\n\n" +
      "• **Yonatan Muluken:** Lead System Architect & Co-Founder\n" +
      "• **Nahom Tibebu:** Co-Founder\n" +
      "• **Dagmawi Shigute:** Co-Founder\n" +
      "• **Ayub Ebrahim:** Co-Founder\n\n" +
      "Our mission is to make trusted health education, life-saving first aid, emergency dispatch 907, and bilingual AI guidance universally accessible across Ethiopia."
    )
  }

  // 2. Emergency 907 Hotline
  if (
    /\b(emergency|ambulance|hotline|907|call 907|paramedic)\b/i.test(q) ||
    /(ድንገተኛ|አምቡላንስ|907|የአደጋ ጊዜ)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**የአደጋ ጊዜ እና አምቡላንስ ጥሪ (ኢትዮጵያ)፡**\n\n" +
        "በድንገተኛ የህክምና አደጋ ጊዜ ወዲያውኑ የሚከተሉትን የነጻ ጥሪ መስመሮች ይጠቀሙ፡\n\n" +
        "• **907 — የነጻ አምቡላንስ ጥሪ እና የህክምና ድንገተኛ አደጋ መቆጣጠሪያ (መላው ኢትዮጵያ)**\n" +
        "• **991 — የፌዴራል ፖሊስ ድንገተኛ አደጋ መቆጣጠሪያ**\n" +
        "• **939 — የኢትዮጵያ ቀይ መስቀል ማህበር አምቡላንስ አገልግሎት**\n\n" +
        "**አስቸኳይ መመሪያ፡**\n" +
        "1. የህመምተኛውን ትክክለኛ መገኛ አድራሻ እና ሁኔታ ለኦፕሬተሩ በግልጽ ያስረዱ።\n" +
        "2. የትንፋሽ መቆም ወይም ከባድ የደም መፍሰስ ካለ አምቡላንስ እስኪደርስ ድረስ የመጀመሪያ እርዳታ ይስጡ።\n" +
        "3. በሽተኛው ራሱን ካሳተ ትውከት ወደ ሳንባ እንዳይገባ በጎን (Recovery Position) አስተኝተው ይጠብቁ።"
      )
    }
    return (
      "**Emergency Hotlines & Ambulance Dispatch (Ethiopia):**\n\n" +
      "In the event of a medical emergency, call the following toll-free hotlines immediately:\n\n" +
      "• **907 — Ethiopian National Ambulance Dispatch & Medical Emergency Hotline**\n" +
      "• **991 — Federal Police Emergency Command Center**\n" +
      "• **939 — Ethiopian Red Cross Society Ambulance Services**\n\n" +
      "**Critical Emergency Actions:**\n" +
      "1. Clearly state your exact location, landmarks, and the patient's current condition.\n" +
      "2. For severe bleeding or unconsciousness, begin first aid immediately while the ambulance is en route.\n" +
      "3. If the patient is unconscious but breathing, place them in the lateral recovery position to keep their airway open."
    )
  }

  // 3. Diarrhea & Gastroenteritis (ተቅማጥ እና የተቅማጥ በሽታ)
  if (
    /\b(diarrhea|diarrhoea|loose stool|watery stool|gastroenteritis|dysentery)\b/i.test(
      q,
    ) ||
    /(ተቅማጥ|የተቅማጥ|ፈሳሽ\s*ሰገራ|የሆድ\s*ቁርጠት|አሜባ|ጃርዲያ)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አጠቃላይ መግለጫ (Overview):**\n" +
        "ተቅማጥ በቀን ውስጥ ከሶስት ጊዜ በላይ ፈሳሽ ወይም ልል የሆነ ዓይነ ምድር መውጣት ሲሆን በአብዛኛው በባክቴሪያ፣ በቫይረስ ወይም በፓራሳይት ኢንፌክሽን የሚከሰት ነው። በወቅቱ ካልታከመ ለከፍተኛ የሰውነት ፈሳሽና ጨው ማነስ (Dehydration) እና ለሕይወት አስጊ ችግሮች ሊዳርግ ይችላል።\n\n" +
        "**ዋና ዋና ምልክቶች (Key Symptoms):**\n" +
        "• በቀን በተደጋጋሚ የሚወጣ ፈሳሽ ወይም ውኃ የመሰለ ሰገራ\n" +
        "• የሆድ ቁርጠት፣ መነፋት እና ከባድ የሆድ ህመም\n" +
        "• ማቅለሽለሽ፣ ማስመለስ እና የምግብ ፍላጎት መቀነስ\n" +
        "• ትኩሳት፣ ራስ ምታት እና አጠቃላይ የሰውነት መዛል\n" +
        "• የከፍተኛ ድርቀት ምልክቶች፡ ከባድ የውሃ ጥም፣ የአፍና የምላስ መድረቅ፣ የዓይን መጎድጎድ፣ የሽንት መጠን መቀነስ እና ቀለም ማጨለም\n\n" +
        "**መንስኤዎች እና መተላለፊያ መንገዶች (Causes & Transmission):**\n" +
        "• በባክቴሪያ (E. coli, Salmonella, Shigella)፣ በቫይረስ (Rotavirus) ወይም በፓራሳይት (Amoeba, Giardia) ኢንፌክሽን\n" +
        "• ያልተፈላ ወይም በቆሻሻ የተበከለ የመጠጥ ውሃ መጠጣት\n" +
        "• ያልታጠበ፣ ያደረ ወይም በዝንብ የተበከለ ምግብ መመገብ\n" +
        "• ምግብ ከማዘጋጀት ወይም ከመመገብ በፊት እና ከመጸዳጃ ቤት መልስ እጅን በሳሙና አለመታጠብ\n\n" +
        "**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n" +
        "• **የኦ.አር.ኤስ (ORS) አጠቃቀም፡** ወዲያውኑ የኦ.አር.ኤስ የፈሳሽ ጨው በ1 ሊትር ንጹህ የተቀቀለና የቀዘቀዘ ውሃ በጥብጦ በእያንዳንዱ የተቅማጥ ዙር ቢያንስ አንድ ኩባያ መጠጣት።\n" +
        "• **የዚንክ ኪኒን (Zinc Supplement):** በተለይ ለህጻናት በቀን 1 ኪኒን ለ10-14 ተከታታይ ቀናት መስጠት የአንጀት ህዋሳትን ቶሎ ያድሳል።\n" +
        "• **ፈሳሽ መውሰድ፡** ንጹህ ውሃ፣ የሩዝ ውሃ፣ የአጃ አጥሚት እና የዶሮ ሾርባ በብዛት መውሰድ።\n" +
        "• **ቀላል ምግቦች፡** ሙዝ፣ ሩዝ፣ ቶስት ወይም ቂጣ የመሳሰሉ በቀላሉ የሚፈጩ ምግቦችን መመገብ።\n" +
        "• **የተከለከሉ፡** ለስላሳ መጠጦች፣ አልኮል፣ ቅባት የበዛባቸው ምግቦች እና የወተት ተዋጽኦዎችን ማቆም።\n\n" +
        "**መከላከያ መንገዶች (Prevention):**\n" +
        "• የመጠጥ ውሃን በደንብ ማፍላት ወይም በውሃ ማከሚያ (ውሃ አጋር / ክሎሪን) ማከም\n" +
        "• ምግብ ከማብሰል፣ ከመመገብ በፊት እና ከመጸዳጃ ቤት መልስ እጅን በሳሙና እና በሚፈስ ውሃ ለ20 ሰከንድ መታጠብ\n" +
        "• ፍራፍሬዎችንና አትክልቶችን በንጹህ ውሃ በሚገባ አጥቦ መመገብ\n" +
        "• ህጻናት የሮታቫይረስ (Rotavirus) ክትባት በወቅቱ እንዲወስዱ ማድረግ\n\n" +
        "**ወደ ሐኪም መቼ መሄድ እንዳለብዎት (When to see a doctor):**\n" +
        "• በሰገራ ውስጥ ደም ወይም ንፍጥ ከታየ\n" +
        "• ተቅማጡ ከ2 ቀናት በላይ ከቀጠለ ወይም ከከፍተኛ ትኩሳት ጋር ከተያያዘ\n" +
        "• በሽተኛው ምንም ፈሳሽ መውሰድ ካልቻለ፣ ደጋግሞ የሚያስመልሰው ከሆነ ወይም ራሱን የሚስት ከሆነ በአፋጣኝ ወደ ሆስፒታል ይሂዱ ወይም 907 ይደውሉ።"
      )
    }
    return (
      "**Overview:**\n" +
      "Diarrhea is defined as the passage of three or more loose or watery stools per day. It is a common symptom of gastrointestinal infection caused by a variety of bacterial, viral, and parasitic organisms. If untreated, severe diarrhea leads to life-threatening dehydration and electrolyte imbalance.\n\n" +
      "**Key Symptoms:**\n" +
      "• Frequent, loose, watery bowel movements\n" +
      "• Abdominal cramps, bloating, and painful spasms\n" +
      "• Nausea, vomiting, and loss of appetite\n" +
      "• Low-grade fever, headache, and general fatigue\n" +
      "• Signs of Dehydration: Excessive thirst, dry mouth and tongue, sunken eyes, skin tenting, and dark or diminished urine output\n\n" +
      "**Causes & Transmission:**\n" +
      "• **Infectious Pathogens:** Rotavirus, Norovirus, Escherichia coli (E. coli), Salmonella, Shigella, Entamoeba histolytica, and Giardia lamblia.\n" +
      "• **Fecal-Oral Transmission:** Consuming contaminated, untreated drinking water or improperly stored/cooked food.\n" +
      "• **Poor Hygiene:** Inadequate handwashing after using the toilet or before meal preparation.\n\n" +
      "**Treatment & Home Care:**\n" +
      "• **Oral Rehydration Salts (ORS):** Mix one packet of ORS in exactly 1 liter of clean, boiled-and-cooled water. Drink after each loose bowel movement to replace vital fluids and electrolytes.\n" +
      "• **Zinc Supplementation:** Essential for pediatric diarrhea—20 mg zinc daily for 10-14 days speeds intestinal recovery.\n" +
      "• **Hydration:** Consume clean broth, salted rice water, diluted fruit juices, and boiled water.\n" +
      "• **Bland Diet (BRAT):** Bananas, white rice, applesauce, toast, boiled potatoes, and lean meats.\n" +
      "• **Avoid:** Sugary soda, caffeine, alcohol, extremely greasy dishes, and raw unpasteurized dairy.\n\n" +
      "**Prevention:**\n" +
      "• Boil or chemically treat all domestic drinking water (chlorine or water purification tablets).\n" +
      "• Wash hands rigorously with soap and clean water before eating, cooking, and after defecation.\n" +
      "• Cook foods thoroughly and protect cooked meals from flies and insects.\n" +
      "• Ensure infants receive full Rotavirus vaccination according to national immunization guidelines.\n\n" +
      "**When to See a Doctor:**\n" +
      "• Presence of blood or pus in stools (dysentery).\n" +
      "• Inability to keep oral fluids down due to persistent vomiting.\n" +
      "• High fever (>38.5°C) or diarrhea persisting beyond 48 hours.\n" +
      "• Signs of severe dehydration, confusion, lethargy, or extreme dizziness—call emergency dispatch **907** immediately."
    )
  }

  // 4. Diabetes Mellitus (ስኳር በሽታ)
  if (
    /\b(diabetes|sugar|glycemia|hyperglycemia|insulin|diabetic)\b/i.test(q) ||
    /(ስኳር(\s*በሽታ)?|የስኳር\s*መጠን|ኢንሱሊን)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አጠቃላይ መግለጫ (Overview):**\n" +
        "ስኳር በሽታ ሰውነታችን ግሉኮስን (ስኳርን) ወደ ሀይል የመቀየር ሂደቱ ሲዛባ ወይም የጣፊያችን ኢንሱሊን የማምረት አቅም ሲዳከም የሚከሰት ሥር የሰደደ የጤና እክል ነው። በዋነኝነት ዓይነት 1፣ ዓይነት 2 እና የእርግዝና ስኳር ተብሎ ይመደባል።\n\n" +
        "**ዋና ዋና ምልክቶች (Key Symptoms):**\n" +
        "• ያልተለመደ ከባድ የውሃ ጥም እና አፍ መድረቅ\n" +
        "• በተደጋጋሚ በተለይም በሌሊት ሽንት መሽናት\n" +
        "• ያልታሰበ ፈጣን የሰውነት ክብደት መቀነስ እና ከፍተኛ ድካም\n" +
        "• የእይታ ብዥታ እና የዓይን እይታ መቀነስ\n" +
        "• የቆሰለ ቁስል ቶሎ አለመዳን ወይም ኢንፌክሽን መደጋገም\n" +
        "• በእጆች ወይም በእግሮች ላይ የመደንዘዝ፣ የማቃጠል ወይም የመውጋት ስሜት\n\n" +
        "**መንስኤዎች እና መተላለፊያ መንገዶች (Causes & Transmission):**\n" +
        "• ዓይነት 1፡ የበሽታ መከላከያ ህዋሳት የጣፊያ ኢንሱሊን አምራች ህዋሳትን በስህተት ሲያጠፉ የሚከሰት ነው\n" +
        "• ዓይነት 2፡ በውፍረት፣ በአካል ብቃት እንቅስቃሴ ማነስ፣ በዘር ውርስ እና ባልተመጣጠነ የአመጋገብ ልማድ የሚከሰት ነው\n" +
        "• ማሳሰቢያ፡ ስኳር በሽታ ተላላፊ አይደለም\n\n" +
        "**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n" +
        "• የታዘዘውን የኢንሱሊን መርፌ ወይም የስኳር ኪኒን በሰዓቱና በትክክል መውሰድ\n" +
        "• የደም ስኳር መጠንን በቤት ውስጥ በግሉኮሜትር አዘውትሮ መለካትና መከታተል\n" +
        "• ጣፋጭ ምግቦችን፣ ለስላሳ መጠጦችን እና ነጭ ዱቄትን በመቀነስ በአትክልትና ፋይበር የበለጸገ ምግብ መመገብ\n" +
        "• በቀን ቢያንስ ለ30 ደቂቃ የእግር ጉዞ ወይም መጠነኛ የአካል ብቃት እንቅስቃሴ ማድረግ\n" +
        "• የእግር እንክብካቤ ማድረግና ቁስለት እንዳይፈጠር በየቀኑ እግርን መመርመር\n\n" +
        "**መከላከያ መንገዶች (Prevention):**\n" +
        "• ጤናማ የሰውነት ክብደትን መጠበቅና ውፍረትን መቀነስ\n" +
        "• ጤናማ የአመጋገብ ስርዓት መከተልና በቂ ውሃ መጠጣት\n" +
        "• በየጊዜው የደም ስኳር ምርመራ ማድረግ\n\n" +
        "**ወደ ሐኪም መቼ መሄድ እንዳለብዎት (When to see a doctor):**\n" +
        "• የደም ስኳር መጠን ከ250 mg/dL በላይ ከፍ ካለ፣ ከፍተኛ ማቅለሽለሽ፣ የትንፋሽ መጥፎ ጠረን ወይም ግራ መጋባት ከተከሰተ አስቸኳይ የህክምና እርዳታ ያግኙ።"
      )
    }
    return (
      "**Overview:**\n" +
      "Diabetes Mellitus is a chronic metabolic disorder characterized by elevated levels of blood glucose. It occurs when the pancreas produces insufficient insulin (Type 1), or when the body's cells become resistant to the insulin produced (Type 2).\n\n" +
      "**Key Symptoms:**\n" +
      "• Excessive thirst (polydipsia) and frequent urination, especially at night (polyuria)\n" +
      "• Unexplained weight loss despite constant hunger (polyphagia)\n" +
      "• Extreme and persistent fatigue or lethargy\n" +
      "• Blurred vision and headaches\n" +
      "• Slow-healing sores, cuts, or frequent recurrent infections\n" +
      "• Tingling, burning, or numbness in the hands and feet (peripheral neuropathy)\n\n" +
      "**Causes:**\n" +
      "• **Type 1 Diabetes:** Autoimmune destruction of insulin-producing beta cells in the pancreas, typically diagnosed in childhood or young adulthood.\n" +
      "• **Type 2 Diabetes:** Progressive insulin resistance influenced by obesity, sedentary lifestyle, high-glycemic diet, and genetic predisposition.\n" +
      "• **Gestational Diabetes:** Hormonal changes during pregnancy causing temporary insulin resistance.\n\n" +
      "**Treatment & Home Care:**\n" +
      "• **Medical Management:** Strict adherence to prescribed medications (metformin, sulfonylureas) or insulin injection regimens.\n" +
      "• **Glucose Monitoring:** Regular fasting and post-prandial blood glucose checks using a home glucometer.\n" +
      "• **Nutritional Therapy:** High-fiber complex carbohydrates (whole grains, teff, legumes, leafy greens), lean proteins, and strict reduction of refined sugars.\n" +
      "• **Physical Activity:** At least 150 minutes of moderate aerobic exercise (brisk walking, cycling) per week.\n" +
      "• **Foot Care:** Daily inspection of feet for blisters, cuts, or dry cracks to avoid diabetic ulcers.\n\n" +
      "**Prevention:**\n" +
      "• Maintain a healthy BMI through regular exercise and portion control.\n" +
      "• Replace sugary beverages and ultra-processed foods with water and whole foods.\n" +
      "• Perform routine annual health checkups and HbA1c screening tests.\n\n" +
      "**When to See a Doctor:**\n" +
      "• Seek immediate medical attention if you experience extreme drowsiness, rapid deep breathing, fruity-smelling breath, or persistent vomiting (signs of Diabetic Ketoacidosis)."
    )
  }

  // 5. Malaria (ወባ)
  if (
    /\b(malaria|plasmodium|anopheles|weba)\b/i.test(q) ||
    /(ወባ(\s*በሽታ)?|ፕላዝሞዲየም|ቢንቢ|አኖፌለስ)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አጠቃላይ መግለጫ (Overview):**\n" +
        "ወባ በፕላዝሞዲየም ጥገኛ ተውሳክ አማካኝነት የሚከሰት እና በአኖፌለስ የወባ ቢንቢ ንክሻ የሚተላለፍ ከባድ የህመም ዓይነት ነው። በወቅቱ ህክምና ካልተደረገለት ለከፍተኛ የደም ማነስ እና ለሕይወት አስጊ ችግሮች ሊዳርግ ይችላል።\n\n" +
        "**ዋና ዋና ምልክቶች (Key Symptoms):**\n" +
        "• ድንገተኛ ከፍተኛ ትኩሳት እና ሰውነትን የሚያንቀጠቅጥ ብርድ ብርድ ማለት\n" +
        "• ከፍተኛ ላብ እና ራስ ምታት\n" +
        "• የመገጣጠሚያ እና የጡንቻዎች ከባድ ህመም\n" +
        "• ማቅለሽለሽ፣ ማስመለስ እና የምግብ ፍላጎት መቀነስ\n" +
        "• ከፍተኛ ድካም እና አጠቃላይ የሰውነት መዛል\n\n" +
        "**መንስኤዎች እና መተላለፊያ መንገዶች (Causes & Transmission):**\n" +
        "• የወባ ጥገኛ ተውሳክ ያለባትን ሴት አኖፌለስ ቢንቢ ሰውን በምትነክስበት ጊዜ ተውሳኩ ወደ ደም ውስጥ ይገባል\n" +
        "• ከተበከለ ደም ንክኪ ወይም መርፌ ጋር ሊተላለፍ ይችላል\n" +
        "• ከሰው ወደ ሰው በቀጥታ ንክኪ፣ በአየር ወይም በሳል አይተላለፍም\n\n" +
        "**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n" +
        "• የደም ምርመራ (Rapid Diagnostic Test ወይም ማይክሮስኮፕ) በአፋጣኝ በማድረግ በሐኪም የታዘዙ ፀረ-ወባ መድኃኒቶችን (ለምሳሌ ኮአርተም / Coartem) ሙሉ ኮርሱን መጨረስ\n" +
        "• በቂ እረፍት ማድረግ እና የሰውነት ድርቀትን ለመከላከል ብዙ ንጹህ ፈሳሾችን፣ ሾርባ እና የሎሚ ውሃ መጠጣት\n" +
        "• ትኩሳቱን ለማስታገስ በፓራሲታሞል መጠቀም እና ግንባርን በለብ ያለ ውሃ ማበስ\n\n" +
        "**መከላከያ መንገዶች (Prevention):**\n" +
        "• ሁልጊዜ ማታ በፀረ-ተባይ በተነከረ አጎበር (ITN) ውስጥ መተኛት\n" +
        "• በቤት ዙሪያ የሚገኙ ውኃ ያቆሩ ኩሬዎችን፣ ጎማዎችንና ቆሻሻዎችን ማድረቅ\n" +
        "• ማታ ማታ እጅና እግርን የሚሸፍኑ ረጅም ልብሶችን መልበስ\n\n" +
        "**ወደ ሐኪም መቼ መሄድ እንዳለብዎት (When to see a doctor):**\n" +
        "• ትኩሳት ከ39°C በላይ ከፍ ካለ፣ የዓይን ወይም የቆዳ ቢጫ መሆን፣ የትንፋሽ ማጠር ወይም መደናበር ከታየ በአፋጣኝ ወደ ሆስፒታል ይሂዱ።"
      )
    }
    return (
      "**Overview:**\n" +
      "Malaria is a life-threatening infectious disease caused by Plasmodium parasites transmitted to humans through the bites of infected female Anopheles mosquitoes. It is endemic in tropical and subtropical regions.\n\n" +
      "**Key Symptoms:**\n" +
      "• High fever cycles and shaking rigors / intense chills\n" +
      "• Profuse sweating as the fever breaks\n" +
      "• Severe persistent headache and body aches\n" +
      "• Nausea, vomiting, abdominal cramps, and diarrhea\n" +
      "• Extreme fatigue, weakness, and loss of appetite\n\n" +
      "**Causes & Transmission:**\n" +
      "• Transmission occurs via the bite of an infected female Anopheles mosquito injecting Plasmodium sporozoites into the bloodstream.\n" +
      "• It is not contagious from casual person-to-person contact, coughing, or sneezing.\n\n" +
      "**Treatment & Home Care:**\n" +
      "• **Rapid Diagnosis:** Immediate microscopic blood smear or rapid diagnostic test (RDT).\n" +
      "• **Antimalarial Therapy:** Artemisinin-based Combination Therapies (ACTs, such as artemether-lumefantrine) taken strictly as prescribed for the complete duration.\n" +
      "• **Fluid Replacement:** Drink oral rehydration solutions, clear broths, and boiled clean water to prevent dehydration.\n" +
      "• **Fever Management:** Use paracetamol for fever and pain relief.\n\n" +
      "**Prevention:**\n" +
      "• Sleep under long-lasting insecticide-treated mosquito nets (LLINs) every night.\n" +
      "• Eliminate stagnant water pools, old tires, and open containers around dwellings where mosquitoes breed.\n" +
      "• Apply DEET-based mosquito repellent and wear long-sleeved clothing during evening and dawn hours.\n\n" +
      "**When to See a Doctor:**\n" +
      "• Seek emergency clinical care if severe vomiting prevents medication absorption, or if jaundice, severe breathlessness, dark urine, or confusion develops."
    )
  }

  // 6. Common Cold (ጉንፋን)
  if (
    /\b(cold|common cold|runny nose|sore throat|sneezing|rhinovirus)\b/i.test(
      q,
    ) ||
    /(ጉንፋን|አፍንጫ\s*ማፍሰስ|የጉሮሮ\s*ህመም|ማስነጠስ)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አጠቃላይ መግለጫ (Overview):**\n" +
        "ጉንፋን በአብዛኛው በራይኖቫይረስ (Rhinovirus) አማካኝነት የሚከሰት የላይኛው የመተንፈሻ አካላት ተላላፊ የቫይረስ ኢንፌክሽን ነው። አብዛኛውን ጊዜ በ7 እስከ 10 ቀናት ውስጥ በቤት ውስጥ እንክብካቤ ይድናል።\n\n" +
        "**ዋና ዋና ምልክቶች (Key Symptoms):**\n" +
        "• የአፍንጫ መታፈን ወይም ንፍጥ መዝረክረክ\n" +
        "• የጉሮሮ መከርከር ወይም መቁሰል\n" +
        "• ተደጋጋሚ ማስነጠስ እና መለስተኛ ሳል\n" +
        "• መለስተኛ ራስ ምታት እና የሰውነት ድካም\n" +
        "• መጠነኛ ትኩሳት (በተለይ በህጻናት ላይ)\n\n" +
        "**መንስኤዎች እና መተላለፊያ መንገዶች (Causes & Transmission):**\n" +
        "• የታመመ ሰው በሚያስነጥስበት ወይም በሚያስልበት ጊዜ በአየር በሚረጩ ጠብታዎች ይተላለፋል\n" +
        "• ቫይረሱ ያረፈባቸውን እቃዎች ነክቶ አፍ፣ አፍንጫ ወይም ዓይንን በመንካት ይተላለፋል\n\n" +
        "**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n" +
        "• አንቲባዮቲክስ ለቫይረስ አይሰራም፤ ስለዚህ ያለ ሐኪም ትዕዛዝ አንቲባዮቲክስ አይውሰዱ\n" +
        "• በቂ እረፍት ማድረግ እና ሙቅ ፈሳሾችን (ሻይ ከዝንጅብልና ሎሚ ጋር፣ የዶሮ ሾርባ) መጠጣት\n" +
        "• የጉሮሮ ህመምን ለማስታገስ በሞቀ ውሃ እና በጨው መጉመጥመጥ\n" +
        "• የአፍንጫ መታፈንን ለማስታገስ የእንፋሎት ትንፋሽ መሳብ (የባህር ዛፍ ቅጠል በመጠቀም)\n" +
        "• ራስ ምታትንና ትኩሳትን ለማስታገስ ፓራሲታሞል መውሰድ\n\n" +
        "**መከላከያ መንገዶች (Prevention):**\n" +
        "• እጅን በሳሙና እና በውሃ አዘውትሮ መታጠብ\n" +
        "• በሚያስነጥሱበት ጊዜ አፍና አፍንጫን በሶፍት ወይም በክንድ መሸፈን\n" +
        "• ከታመሙ ሰዎች ጋር የቅርብ ንክኪን መቀነስ\n\n" +
        "**ወደ ሐኪም መቼ መሄድ እንዳለብዎት (When to see a doctor):**\n" +
        "• ሳል እና ትኩሳት ከ10 ቀናት በላይ ከቆየ፣ የደረት ህመም ወይም የመተንፈስ ችግር ከተፈጠረ የሳንባ ምች ሊሆን ስለሚችል ወደ ክሊኒክ ይሂዱ።"
      )
    }
    return (
      "**Overview:**\n" +
      "The common cold is a mild, highly contagious viral infection affecting the upper respiratory tract (nose and throat), most commonly caused by rhinoviruses.\n\n" +
      "**Key Symptoms:**\n" +
      "• Nasal congestion, runny nose, and sneezing\n" +
      "• Scratchy or sore throat\n" +
      "• Mild dry cough and chest tightness\n" +
      "• Low-grade fever, mild headache, and general malaise\n\n" +
      "**Causes & Transmission:**\n" +
      "• Spread via airborne respiratory droplets when an infected person coughs, sneezes, or talks.\n" +
      "• Indirect transmission occurs through touching contaminated surfaces and subsequently touching the face.\n\n" +
      "**Treatment & Home Care:**\n" +
      "• **Symptomatic Relief:** Antibiotics are ineffective against viral colds. Do not take antibiotics without a physician's prescription.\n" +
      "• **Hydration:** Generous fluid intake including hot herbal teas, lemon-ginger infusions, and warm broths.\n" +
      "• **Steam Inhalation:** Inhale steam from boiled water or eucalyptus to clear nasal passages.\n" +
      "• **Salt Water Gargle:** Warm salt water gargles 3-4 times daily to relieve throat soreness.\n" +
      "• **Analgesics:** Paracetamol or ibuprofen to alleviate body aches and mild fever.\n\n" +
      "**Prevention:**\n" +
      "• Frequent handwashing with soap and clean running water for at least 20 seconds.\n" +
      "• Cover coughs and sneezes with a tissue or your inner elbow.\n" +
      "• Avoid touching the eyes, nose, or mouth with unwashed hands.\n\n" +
      "**When to See a Doctor:**\n" +
      "• Seek clinical evaluation if symptoms worsen after 10 days, or if high fever, severe earache, or shortness of breath develops."
    )
  }

  // 7. Hypertension / High Blood Pressure (የደም ግፊት)
  if (
    /\b(hypertension|high blood pressure|blood pressure|htn)\b/i.test(q) ||
    /(ደም\s*ግፊት|የደም\s*ግፊት|ከፍተኛ\s*የደም\s*ግፊት)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አጠቃላይ መግለጫ (Overview):**\n" +
        'የደም ግፊት ደም በደም ሥሮች ግድግዳ ላይ የሚያሳድረው ግፊት ከተለመደው መጠን በላይ በቋሚነት ከፍ ብሎ ሲገኝ የሚከሰት ነው። ምልክት ባለማሳየቱ "ዝምተኛው ገዳይ" ተብሎ የሚጠራ ሲሆን ለልብ ድካም፣ ለስትሮክ እና ለኩላሊት ህመም ዋነኛ መንስኤ ነው።\n\n' +
        "**ዋና ዋና ምልክቶች (Key Symptoms):**\n" +
        "• አብዛኛውን ጊዜ ምንም አይነት ግልጽ ምልክት አያሳይም\n" +
        "• ግፊቱ በጣም ከፍ ሲል፡ ከባድ የራስ ምታት በተለይ በጠዋት\n" +
        "• የትንፋሽ ማጠር እና የልብ ምት መፍጠን\n" +
        "• የማዞር ስሜት እና የእይታ ብዥታ\n" +
        "• የአፍንጫ ደም መፍሰስ\n\n" +
        "**መንስኤዎች እና መተላለፊያ መንገዶች (Causes & Transmission):**\n" +
        "• ጨዋማ ምግቦችን አብዝቶ መመገብ\n" +
        "• ከመጠን ያለፈ ውፍረት እና የአካል ብቃት እንቅስቃሴ ማነስ\n" +
        "• የዘር ውርስ (በቤተሰብ ውስጥ የደም ግፊት ታሪክ መኖር)\n" +
        "• የአእምሮ ጭንቀት እና አልኮል ወይም ሲጋራ ማጨስ\n\n" +
        "**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n" +
        "• በሐኪም የታዘዙ የደም ግፊት ማውረጃ መድኃኒቶችን ሳያቋርጡ በየቀኑ መውሰድ\n" +
        "• የጨው አጠቃቀምን በቀን ከአንድ የሻይ ማንኪያ በታች መቀነስ\n" +
        "• አትክልት፣ ፍራፍሬ እና ሙሉ እህሎችን መመገብ (DASH Diet)\n" +
        "• በቀን ቢያንስ 30 ደቂቃ መራመድ ወይም ስፖርት መስራት\n" +
        "• የደም ግፊትን በየጊዜው መለካት እና መመዝገብ\n\n" +
        "**መከላከያ መንገዶች (Prevention):**\n" +
        "• የጨው እና ቅባት የበዛባቸውን ምግቦች መቀነስ\n" +
        "• የሰውነት ክብደትን መቆጣጠርና ሲጋራን ማቆም\n" +
        "• ቢያንስ በዓመት አንድ ጊዜ የደም ግፊት ምርመራ ማድረግ\n\n" +
        "**ወደ ሐኪም መቼ መሄድ እንዳለብዎት (When to see a doctor):**\n" +
        "• የደም ግፊት መጠን ከ180/120 mmHg በላይ ከሆነ፣ ከባድ የደረት ህመም ወይም የመደንዘዝ ስሜት ከተሰማ ወደ ድንገተኛ ክፍል ወዲያውኑ ይሂዱ።"
      )
    }
    return (
      "**Overview:**\n" +
      "Hypertension (high blood pressure) is a chronic cardiovascular condition in which the force of the blood against artery walls is persistently elevated (130/80 mmHg or higher). Often asymptomatic, it significantly increases the risk of heart disease, stroke, and chronic kidney disease.\n\n" +
      "**Key Symptoms:**\n" +
      "• Often called the 'silent killer' because most individuals have no symptoms.\n" +
      "• Severe hypertension may cause morning headaches, dizziness, or blurred vision.\n" +
      "• Shortness of breath, chest tightness, or unprovoked nosebleeds.\n\n" +
      "**Causes & Risk Factors:**\n" +
      "• Excessive sodium consumption and processed food intake.\n" +
      "• Sedentary lifestyle and obesity.\n" +
      "• Genetic family history and advancing age.\n" +
      "• Chronic stress, tobacco smoking, and excessive alcohol use.\n\n" +
      "**Treatment & Home Care:**\n" +
      "• **Antihypertensive Medication:** Daily adherence to prescribed medications (ACE inhibitors, ARBs, calcium channel blockers, diuretics).\n" +
      "• **DASH Dietary Pattern:** High in potassium, calcium, magnesium, and dietary fiber; strict sodium restriction (under 2,000 mg/day).\n" +
      "• **Aerobic Exercise:** At least 30 minutes of brisk walking or swimming 5 days weekly.\n" +
      "• **Self-Monitoring:** Log blood pressure readings twice weekly with a validated arm cuff.\n\n" +
      "**Prevention:**\n" +
      "• Maintain a normal body mass index (BMI 18.5 - 24.9).\n" +
      "• Limit salt intake and avoid tobacco products.\n" +
      "• Regular routine blood pressure screenings.\n\n" +
      "**When to See a Doctor:**\n" +
      "• Seek emergency medical attention if blood pressure exceeds 180/120 mmHg or is accompanied by chest pain, shortness of breath, back pain, or vision changes (Hypertensive Crisis)."
    )
  }

  // 8. Pneumonia (የሳንባ ምች)
  if (
    /\b(pneumonia|chest infection|lung infection)\b/i.test(q) ||
    /(ሳንባ\s*ምች|የሳንባ\s*ምች|የደረት\s*ኢንፌክሽን)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አጠቃላይ መግለጫ (Overview):**\n" +
        "የሳንባ ምች በአንድ ወይም በሁለቱም ሳንባዎች ውስጥ ባሉ የአየር ከረጢቶች ላይ የሚከሰት ከባድ የኢንፌክሽን አይነት ነው። አየር ከረጢቶቹ በፈሳሽ ወይም በንፍጥ ሲሞሉ መተንፈስ አዳጋች ይሆናል።\n\n" +
        "**ዋና ዋና ምልክቶች (Key Symptoms):**\n" +
        "• በከፍተኛ ትኩሳት የታጀበ ፈጣን የትንፋሽ መቆራረጥ\n" +
        "• አክታ ያለው ከባድ ሳል (አረንጓዴ፣ ቢጫ ወይም የዛገ ደም ቀለም ያለው)\n" +
        "• በጥልቀት በሚተነፍሱበት ወይም በሚያስሉበት ወቅት የሚባባስ የደረት ህመም\n" +
        "• ከባድ ብርድ ብርድ ማለት እና ማንቀጥቀጥ\n" +
        "• የምግብ ፍላጎት መቀነስ እና ከፍተኛ የሰውነት መዛል\n\n" +
        "**መንስኤዎች እና መተላለፊያ መንገዶች (Causes & Transmission):**\n" +
        "• በባክቴሪያ (Streptococcus pneumoniae) ወይም በቫይረሶች አማካኝነት ይከሰታል\n" +
        "• የታመመ ሰው በሚያስልበት ወይም በሚያስነጥስበት ጊዜ በአየር ይተላለፋል\n\n" +
        "**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n" +
        "• በሐኪም የታዘዘውን አንቲባዮቲክስ መድኃኒት ሙሉ ኮርሱን ሳያቋርጡ መውሰድ\n" +
        "• በቂ እረፍት ማድረግ እና ሙቅ ፈሳሾችን አዘውትሮ መጠጣት\n" +
        "• ትኩሳቱን ለማስታገስ ፓራሲታሞል መጠቀም\n\n" +
        "**መከላከያ መንገዶች (Prevention):**\n" +
        "• የሳንባ ምች (Pneumococcal) ክትባቶችን በተለይ ለህጻናትና ለአረጋውያን መውሰድ\n" +
        "• እጅን በሳሙና አዘውትሮ መታጠብ እና የቤት ውስጥ አየር ንጽህናን መጠበቅ\n\n" +
        "**ወደ ሐኪም መቼ መሄድ እንዳለብዎት:**\n" +
        "• የመተንፈስ ችግር ከተባባሰ፣ የከንፈር ወይም የጥፍር ሰማያዊ መሆን ከታየ ወዲያውኑ ወደ ድንገተኛ ክፍል ይሂዱ።"
      )
    }
    return (
      "**Overview:**\n" +
      "Pneumonia is an infection that inflames the air sacs (alveoli) in one or both lungs, which may fill with fluid or purulent material. It ranges from mild to life-threatening.\n\n" +
      "**Key Symptoms:**\n" +
      "• Cough producing greenish, yellow, or bloody phlegm\n" +
      "• High fever, shaking chills, and shortness of breath\n" +
      "• Sharp, stabbing chest pain that worsens with deep breathing or coughing\n" +
      "• Extreme fatigue, nausea, or confusion (especially in older adults)\n\n" +
      "**Treatment & Care:**\n" +
      "• Targeted antibiotic therapy for bacterial causes, taken strictly for the full duration.\n" +
      "• Rest, supplemental oxygen if indicated, and generous oral hydration.\n\n" +
      "**When to See a Doctor:**\n" +
      "• Severe shortness of breath, persistent high fever, or bluish lips require immediate emergency evaluation."
    )
  }

  // 9. Gastritis & Acid Reflux (የጨጓራ ህመም እና ቃር)
  if (
    /\b(gastritis|acid reflux|heartburn|gerd|peptic ulcer|stomach ulcer)\b/i.test(
      q,
    ) ||
    /(ጨጓራ|የጨጓራ\s*ህመም|ቃር|የሆድ\s*ማቃጠል|የጨጓራ\s*ቁስለት)/.test(q)
  ) {
    if (isAmharic) {
      return (
        "**አጠቃላይ መግለጫ (Overview):**\n" +
        "የጨጓራ ህመም የጨጓራ የውስጠኛውን ግድግዳ የሚሸፍነው ገለፈት ሲቆጣ ወይም ሲያብጥ የሚከሰት ነው። በኤች ፓይሎሪ (H. pylori) ባክቴሪያ ወይም በህመም ማስታገሻ መድኃኒቶች አብዝቶ መውሰድ ሳቢያ ይከሰታል።\n\n" +
        "**ዋና ዋና ምልክቶች (Key Symptoms):**\n" +
        "• በሆድ የላይኛው ክፍል ላይ የሚሰማ የማቃጠል ስሜት ወይም ህመም\n" +
        "• ቶሎ የመጥገብ ስሜት፣ ማቅለሽለሽ እና የሆድ መነፋት\n" +
        "• ተደጋጋሚ ግሳት እና የጉሮሮ ማቃጠል (ቃር)\n" +
        "• ምግብ ከተመገቡ በኋላ የሚባባስ ወይም የሚሻሻል ህመም\n\n" +
        "**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n" +
        "• የኤች ፓይሎሪ ባክቴሪያ ምርመራ በማድረግ በሐኪም የታዘዙ ፀረ-ባክቴሪያ እና የጨጓራ አሲድ ማስታገሻዎችን መውሰድ\n" +
        "• በቅመም፣ በርበሬ እና በዘይት የበለጸጉ ምግቦችን ማስወገድ\n" +
        "• ቡና፣ አልኮል፣ ሲጋራ እና ለስላሳ መጠጦችን ማቆም\n" +
        "• ባዶ ሆድ አለመቆየት እና በትንሽ በትንሹ በየሰዓቱ መመገብ\n\n" +
        "**ወደ ሐኪም መቼ መሄድ እንዳለብዎት:**\n" +
        "• ደም የቀላቀለ ትውከት፣ ጥቁር ቀለም ያለው ሰገራ ወይም ከባድ የማያቋርጥ ህመም ካለ በአፋጣኝ ወደ ሆስፒታል ይሂዱ።"
      )
    }
    return (
      "**Overview:**\n" +
      "Gastritis is an inflammation or erosion of the protective stomach lining, most frequently triggered by Helicobacter pylori (H. pylori) infection, frequent NSAID painkiller use, or chronic stress.\n\n" +
      "**Key Symptoms:**\n" +
      "• Burning or gnawing ache in the upper abdomen\n" +
      "• Nausea, bloating, belching, and feeling full early during meals\n" +
      "• Acid regurgitation and heartburn\n\n" +
      "**Treatment & Care:**\n" +
      "• H. pylori eradication therapy (antibiotics + proton pump inhibitor) when verified.\n" +
      "• Avoid spicy, fried, and highly acidic foods; eliminate coffee, alcohol, and smoking.\n" +
      "• Eat smaller, frequent meals.\n\n" +
      "**When to See a Doctor:**\n" +
      "• Vomiting blood or passing black, tarry stools indicates active gastrointestinal bleeding requiring urgent clinical intervention."
    )
  }

  // 10. Multi-lingual Amharic-to-English translation mapping for ALL_DISEASES search
  const AMHARIC_KEYWORDS: Record<string, string> = {
    ተቅማጥ: "diarrhea",
    የተቅማጥ: "diarrhea",
    ስኳር: "diabetes",
    የስኳር: "diabetes",
    ወባ: "malaria",
    የወባ: "malaria",
    ግፊት: "hypertension",
    "የደም ግፊት": "hypertension",
    ጉንፋን: "cold",
    "ሳንባ ምች": "pneumonia",
    አስም: "asthma",
    ታይፎይድ: "typhoid",
    ጨጓራ: "gastritis",
    ልብ: "heart",
    ነቀርሳ: "tuberculosis",
    ቲቢ: "tuberculosis",
    ኮሌራ: "cholera",
    "ራስ ምታት": "headache",
    ኩላሊት: "kidney",
    ጉበት: "liver",
    ካንሰር: "cancer",
    ኤችአይቪ: "hiv",
    ትኩሳት: "fever",
    ቁስል: "wound",
    ማቃጠል: "burn",
  }

  let translatedQuery = q
  for (const [amharicWord, englishEquivalent] of Object.entries(
    AMHARIC_KEYWORDS,
  )) {
    if (q.includes(amharicWord)) {
      translatedQuery += " " + englishEquivalent
    }
  }

  // Stop words that must never trigger disease matching
  const STOP_WORDS = new Set([
    "can", "you", "hear", "the", "for", "with", "about", "what", "how", "why",
    "are", "have", "has", "had", "will", "was", "were", "see", "tell", "give",
    "help", "hey", "hello", "hi", "there", "page", "open", "this", "that", "from"
  ])

  // 11. Search ALL_DISEASES library for an authentic matching condition (whole word or exact title match)
  const matched = ALL_DISEASES.find((d) => {
    const dName = d.name.toLowerCase()
    const dId = d.id.toLowerCase()
    if (q.includes(dName) || (d.amharicName && q.includes(d.amharicName))) return true

    const tokens = translatedQuery
      .replace(/[^a-z0-9\s]/gi, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !STOP_WORDS.has(w))

    return tokens.some((token) => {
      const reg = new RegExp(`\\b${token}\\b`, "i")
      return reg.test(dName) || reg.test(dId)
    })
  })

  if (matched) {
    if (isAmharic) {
      const sympList = matched.symptoms
        .slice(0, 4)
        .map((s) => `• ${s}`)
        .join("\n")
      const causeList = matched.causes
        .slice(0, 3)
        .map((c) => `• ${c}`)
        .join("\n")
      const treatList = matched.treatment
        .slice(0, 3)
        .map((t) => `• ${t}`)
        .join("\n")
      const prevList = matched.prevention
        .slice(0, 3)
        .map((p) => `• ${p}`)
        .join("\n")

      return (
        `**አጠቃላይ መግለጫ (Overview):**\n${matched.description || matched.desc}\n\n` +
        `**ዋና ዋና ምልክቶች (Key Symptoms):**\n${sympList || "• የጤና መጓደልና ድካም"}\n\n` +
        `**መንስኤዎች እና መተላለፊያ መንገዶች (Causes):**\n${causeList || "• በጤና ምርመራ የሚረጋገጡ መንስኤዎች"}\n\n` +
        `**ህክምና እና የቤት ውስጥ እንክብካቤ (Treatment & Care):**\n${treatList || "• በሐኪም የታዘዙ መድኃኒቶችን መውሰድና እረፍት ማድረግ"}\n\n` +
        `**መከላከያ መንገዶች (Prevention):**\n${prevList || "• ጤናማ የአኗኗር ዘይቤ መከተል"}\n\n` +
        `**ወደ ሐኪም መቼ መሄድ እንዳለብዎት:**\nምልክቶች ከቀጠሉ ወይም የከፋ የህመም ስሜት ከተሰማዎት በአቅራቢያዎ ወደሚገኝ የጤና ተቋም ሄደው ሐኪም ያማክሩ።`
      )
    }

    const sympList = matched.symptoms
      .slice(0, 5)
      .map((s) => `• ${s}`)
      .join("\n")
    const causeList = matched.causes
      .slice(0, 4)
      .map((c) => `• ${c}`)
      .join("\n")
    const treatList = matched.treatment
      .slice(0, 4)
      .map((t) => `• ${t}`)
      .join("\n")
    const prevList = matched.prevention
      .slice(0, 3)
      .map((p) => `• ${p}`)
      .join("\n")

    return (
      `**Overview:**\n${matched.description || matched.desc}\n\n` +
      `**Key Symptoms:**\n${sympList}\n\n` +
      `**Causes & Risk Factors:**\n${causeList}\n\n` +
      `**Treatment & Clinical Care:**\n${treatList}\n\n` +
      `**Prevention:**\n${prevList}\n\n` +
      `**When to See a Doctor:**\nIf your symptoms persist, worsen, or are accompanied by severe pain, high fever, or breathing difficulty, consult a licensed healthcare professional promptly.`
    )
  }

  // 12. General Health & Clinical Inquiry Fallback (Symptom & Self-Care Guidance)
  if (isAmharic) {
    return (
      "**የክሊኒካል ጤና ግምገማ እና የመጀመሪያ ደረጃ ምክር (Clinical Guidance):**\n\n" +
      "ለተሰማዎት የጤና እክል እና የህመም ምልክቶች የሚከተሉትን ተግባራዊ የቤት ውስጥ እንክብካቤ እርምጃዎች ይውሰዱ፦\n\n" +
      "• **አሁን ምን ማድረግ አለብዎት (What You Should Do Now)፦**\n" +
      "  1. **ፈሳሽ መውሰድ፦** ንጹህ የፈላ ውሃ፣ የኦ.አር.ኤስ (ORS) መፍትሄ ወይም ሞቅ ያለ ሻይ በየተወሰነ ደቂቃው በትንሹ ይጠጡ።\n" +
      "  2. **እረፍት ማድረግ፦** አድካሚ እንቅስቃሴዎችን ያቁሙ እና ምቹ በሆነ ቦታ ጋደም ብለው እረፍት ይውሰዱ።\n" +
      "  3. **ቀለል ያለ አመጋገብ፦** ቅባት፣ ቅመም እና የሚያቃጥሉ ምግቦችን በማስወገድ እንደ ሩዝ፣ ገንፎ እና ሙዝ የመሳሰሉ ምግቦችን ይመገቡ።\n" +
      "  4. **ህመም ማስታገሻ፦** ለከፍተኛ ራስ ምታት ወይም ትኩሳት ፓራሲታሞል (Paracetamol) በአግባቡ መውሰድ ይችላሉ (የሆድ ወይም የጨጓራ ህመም ካለብዎት አስፕሪን ወይም ኢቡፕሮፌን አይውሰዱ)።\n\n" +
      "• **ወደ ሐኪም መቼ መሄድ እንዳለብዎት (When to See a Doctor)፦**\n" +
      "  የማያቋርጥ ትውከት፣ ከፍተኛ ትኩሳት፣ የትንፋሽ ማጠር፣ ወይም ከ24 ሰዓት በላይ የሚቆይ የከፋ ህመም ካጋጠመዎት በአቅራቢያዎ ወደሚገኝ ጤና ጣቢያ ወይም ሆስፒታል በአስቸኳይ ይሂዱ።"
    )
  }

  return (
    "**Clinical Health Evaluation & Immediate Guidance:**\n\n" +
    "Based on your symptoms and current discomfort, here are practical clinical self-care steps you should follow right now:\n\n" +
    "• **WHAT YOU SHOULD DO NOW (Immediate Action Steps):**\n" +
    "  1. **Maintain Hydration:** Sip clean boiled water, Oral Rehydration Salts (ORS), or warm herbal tea frequently in small sips.\n" +
    "  2. **Rest & Recovery:** Stop physically strenuous tasks and rest in a well-ventilated, quiet room.\n" +
    "  3. **Gentle Nutrition:** Avoid oily, spicy, dairy, or fried foods. Stick to bland foods like rice, bananas, toast, or clear broth.\n" +
    "  4. **Symptom Relief:** For headache or fever, paracetamol may be taken as directed. Avoid NSAIDs (aspirin/ibuprofen) if stomach irritation is present.\n\n" +
    "• **WHEN TO SEEK IMMEDIATE MEDICAL ATTENTION:**\n" +
    "  If you develop high fever, continuous vomiting, breathing difficulty, or if your pain does not lessen within 24 hours, visit a nearby clinic or hospital immediately."
  )
}

/**
 * Intelligently tailors clinical guidance strictly to the user's inquiry:
 * - If user asks for "symptoms, causes and treatment", returns ONLY Overview, Symptoms, Causes, and Treatment.
 * - If user asks for "symptoms", returns ONLY Overview and Symptoms (no causes, treatment, prevention, doctor).
 * - If user asks for "treatment" or "cause" or "prevention", returns ONLY Overview and that requested section.
 * - If user asks a general question ("What is diabetes", "Tell me about malaria"), returns the full guide.
 */
export function filterClinicalSections(
  fullText: string,
  query: string,
): string {
  if (!fullText || !fullText.trim()) return ""
  const q = (query || "").toLowerCase().trim()

  // If query is about founders, emergency numbers, or general platform inquiry, do not strip sections
  if (
    /\b(founder|founders|creator|creators|team|built this)\b/i.test(q) ||
    /(መስራች|መስራቾች|የሰራው)/.test(q) ||
    /\b(emergency|ambulance|907|hotline)\b/i.test(q) ||
    /(ድንገተኛ|አምቡላንስ|907)/.test(q)
  ) {
    return fullText
  }

  // Detect which specific aspects the user asked for:
  const wantsSymptoms =
    /\b(symptom|symptoms|sign|signs)\b/i.test(q) || /(ምልክት|ምልክቶች)/.test(q)
  const wantsCauses =
    /\b(cause|causes|transmission|how do you get|why does|origin|risk factors?)\b/i.test(
      q,
    ) || /(መንስኤ|መንስኤዎች|መተላለፊያ|እንዴት ይያዛል|ምክንያት|የሚያመጣ)/.test(q)
  const wantsTreatment =
    /\b(treatment|treatments|treat|cure|care|home care|medicine|medication|remedy|management|how to treat|how to cure)\b/i.test(
      q,
    ) || /(ህክምና|ማከም|መድኃኒት|እንክብካቤ|የቤት ውስጥ)/.test(q)
  const wantsPrevention =
    /\b(prevention|prevent|preventing|how to prevent|avoid|avoiding)\b/i.test(
      q,
    ) || /(መከላከያ|መከላከል)/.test(q)
  const wantsDoctor =
    /\b(doctor|physician|hospital|when to see|emergency warning)\b/i.test(q) ||
    /(ወደ ሐኪም|ሀኪም|ሆስፒታል)/.test(q)

  const hasSpecificRequest =
    wantsSymptoms ||
    wantsCauses ||
    wantsTreatment ||
    wantsPrevention ||
    wantsDoctor

  // If user asked generally (e.g. "Tell me about diabetes", "What is malaria?"), provide the full guide!
  if (!hasSpecificRequest) {
    return fullText
  }

  // Split into sections by markdown bold headers: e.g. **Header:** or **Header**
  const rawSections = fullText.split(/\n+(?=\*\*[^*]+?\*\*)/)

  if (rawSections.length <= 1) {
    return fullText
  }

  const keptSections: string[] = []

  for (const sec of rawSections) {
    const trimmed = sec.trim()
    if (!trimmed) continue
    const headerLine = (trimmed.split("\n")[0] || "").toLowerCase()

    const isOverview = /overview|አጠቃላይ\s*መግለጫ/.test(headerLine)
    const isSymptoms = /symptom|signs|ምልክቶች|ምልክት/.test(headerLine)
    const isCauses = /cause|transmission|risk factor|መንስኤ|መተላለፊያ|ምክንያት/.test(
      headerLine,
    )
    const isTreatment = /treatment|care|action|ህክምና|እንክብካቤ/.test(headerLine)
    const isPrevention = /prevention|መከላከያ|መከላከል/.test(headerLine)
    const isDoctor = /when to see|doctor|ሐኪም|ሀኪም/.test(headerLine)

    // 1. Overview is ALWAYS preserved to provide clear context
    if (isOverview) {
      keptSections.push(trimmed)
      continue
    }

    // 2. Specific requested sections
    if (isSymptoms && wantsSymptoms) {
      keptSections.push(trimmed)
      continue
    }

    if (isCauses && wantsCauses) {
      keptSections.push(trimmed)
      continue
    }

    if (isTreatment && wantsTreatment) {
      keptSections.push(trimmed)
      continue
    }

    if (isPrevention && wantsPrevention) {
      keptSections.push(trimmed)
      continue
    }

    if (isDoctor && wantsDoctor) {
      keptSections.push(trimmed)
      continue
    }
  }

  if (keptSections.length === 0) {
    return fullText
  }

  return keptSections.join("\n\n")
}

/**
 * Returns tailored clinical response strictly filtered according to user's requested topics.
 */
export function getClinicalResponse(query: string, isAmharic: boolean): string {
  const raw = getRawClinicalResponse(query, isAmharic)
  return filterClinicalSections(raw, query)
}
