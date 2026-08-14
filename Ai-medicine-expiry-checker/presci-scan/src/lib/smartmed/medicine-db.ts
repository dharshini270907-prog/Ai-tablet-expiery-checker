export interface MedicineEntry {
  name: string;
  salt?: string;
  dosage?: string;
  category?: string;
}

export const MEDICINE_DB: MedicineEntry[] = [
  { name: "Paracetamol 650mg", salt: "Paracetamol", dosage: "650mg", category: "Analgesic" },
  { name: "Paracetamol 500mg", salt: "Paracetamol", dosage: "500mg", category: "Analgesic" },
  { name: "Dolo 650", salt: "Paracetamol", dosage: "650mg", category: "Analgesic" },
  { name: "Crocin 650", salt: "Paracetamol", dosage: "650mg", category: "Analgesic" },
  { name: "Calpol 650", salt: "Paracetamol", dosage: "650mg", category: "Analgesic" },
  { name: "Amoxicillin 500mg", salt: "Amoxicillin", dosage: "500mg", category: "Antibiotic" },
  { name: "Amoxicillin 250mg", salt: "Amoxicillin", dosage: "250mg", category: "Antibiotic" },
  { name: "Azithromycin 500mg", salt: "Azithromycin", dosage: "500mg", category: "Antibiotic" },
  { name: "Azithromycin 250mg", salt: "Azithromycin", dosage: "250mg", category: "Antibiotic" },
  { name: "Azithral 500", salt: "Azithromycin", dosage: "500mg", category: "Antibiotic" },
  { name: "Zithromax 500", salt: "Azithromycin", dosage: "500mg", category: "Antibiotic" },
  {
    name: "Augmentin 625",
    salt: "Amoxicillin + Clavulanic Acid",
    dosage: "625mg",
    category: "Antibiotic",
  },
  {
    name: "Amoxiclav 625",
    salt: "Amoxicillin + Clavulanic Acid",
    dosage: "625mg",
    category: "Antibiotic",
  },
  {
    name: "Moxikind CV 625",
    salt: "Amoxicillin + Clavulanic Acid",
    dosage: "625mg",
    category: "Antibiotic",
  },
  { name: "Cetirizine 10mg", salt: "Cetirizine", dosage: "10mg", category: "Antihistamine" },
  { name: "Levocetirizine 5mg", salt: "Levocetirizine", dosage: "5mg", category: "Antihistamine" },
  { name: "Loratadine 10mg", salt: "Loratadine", dosage: "10mg", category: "Antihistamine" },
  { name: "Fexofenadine 120mg", salt: "Fexofenadine", dosage: "120mg", category: "Antihistamine" },
  { name: "Allegra 120", salt: "Fexofenadine", dosage: "120mg", category: "Antihistamine" },
  { name: "Metformin 500mg", salt: "Metformin", dosage: "500mg", category: "Antidiabetic" },
  { name: "Metformin 850mg", salt: "Metformin", dosage: "850mg", category: "Antidiabetic" },
  { name: "Metformin 1000mg", salt: "Metformin", dosage: "1000mg", category: "Antidiabetic" },
  { name: "Glycomet 500", salt: "Metformin", dosage: "500mg", category: "Antidiabetic" },
  { name: "Glimepiride 1mg", salt: "Glimepiride", dosage: "1mg", category: "Antidiabetic" },
  { name: "Glimepiride 2mg", salt: "Glimepiride", dosage: "2mg", category: "Antidiabetic" },
  { name: "Glimer 2", salt: "Glimepiride", dosage: "2mg", category: "Antidiabetic" },
  { name: "Dapagliflozin 10mg", salt: "Dapagliflozin", dosage: "10mg", category: "Antidiabetic" },
  { name: "Empagliflozin 10mg", salt: "Empagliflozin", dosage: "10mg", category: "Antidiabetic" },
  { name: "Sitagliptin 100mg", salt: "Sitagliptin", dosage: "100mg", category: "Antidiabetic" },
  { name: "Januvia 100", salt: "Sitagliptin", dosage: "100mg", category: "Antidiabetic" },
  { name: "Insulin Glargine Pen", salt: "Insulin Glargine", category: "Antidiabetic" },
  { name: "Atorvastatin 10mg", salt: "Atorvastatin", dosage: "10mg", category: "Cardiac" },
  { name: "Atorvastatin 20mg", salt: "Atorvastatin", dosage: "20mg", category: "Cardiac" },
  { name: "Atorvastatin 40mg", salt: "Atorvastatin", dosage: "40mg", category: "Cardiac" },
  { name: "Atorlip 10", salt: "Atorvastatin", dosage: "10mg", category: "Cardiac" },
  { name: "Rosuvastatin 10mg", salt: "Rosuvastatin", dosage: "10mg", category: "Cardiac" },
  { name: "Rosuvastatin 20mg", salt: "Rosuvastatin", dosage: "20mg", category: "Cardiac" },
  { name: "Rozucor 10", salt: "Rosuvastatin", dosage: "10mg", category: "Cardiac" },
  { name: "Amlodipine 5mg", salt: "Amlodipine", dosage: "5mg", category: "Cardiac" },
  { name: "Amlodipine 10mg", salt: "Amlodipine", dosage: "10mg", category: "Cardiac" },
  { name: "Telmisartan 40mg", salt: "Telmisartan", dosage: "40mg", category: "Cardiac" },
  { name: "Losartan 50mg", salt: "Losartan", dosage: "50mg", category: "Cardiac" },
  { name: "Losartan 25mg", salt: "Losartan", dosage: "25mg", category: "Cardiac" },
  { name: "Clopidogrel 75mg", salt: "Clopidogrel", dosage: "75mg", category: "Cardiac" },
  { name: "Aspirin 75mg", salt: "Aspirin", dosage: "75mg", category: "Cardiac" },
  { name: "Ecosprin 75", salt: "Aspirin", dosage: "75mg", category: "Cardiac" },
  { name: "Atenolol 50mg", salt: "Atenolol", dosage: "50mg", category: "Cardiac" },
  { name: "Bisoprolol 5mg", salt: "Bisoprolol", dosage: "5mg", category: "Cardiac" },
  { name: "Pantoprazole 40mg", salt: "Pantoprazole", dosage: "40mg", category: "Gastro" },
  { name: "Pan 40", salt: "Pantoprazole", dosage: "40mg", category: "Gastro" },
  { name: "Omeprazole 20mg", salt: "Omeprazole", dosage: "20mg", category: "Gastro" },
  { name: "Esomeprazole 40mg", salt: "Esomeprazole", dosage: "40mg", category: "Gastro" },
  { name: "Nexpro 40", salt: "Esomeprazole", dosage: "40mg", category: "Gastro" },
  { name: "Ranitidine 150mg", salt: "Ranitidine", dosage: "150mg", category: "Gastro" },
  { name: "Rantac 150", salt: "Ranitidine", dosage: "150mg", category: "Gastro" },
  { name: "Ibuprofen 400mg", salt: "Ibuprofen", dosage: "400mg", category: "Analgesic" },
  { name: "Ibuprofen 200mg", salt: "Ibuprofen", dosage: "200mg", category: "Analgesic" },
  { name: "Combiflam", salt: "Ibuprofen + Paracetamol", dosage: "400mg", category: "Analgesic" },
  { name: "Diclofenac 50mg", salt: "Diclofenac", dosage: "50mg", category: "Analgesic" },
  { name: "Aceclofenac 100mg", salt: "Aceclofenac", dosage: "100mg", category: "Analgesic" },
  { name: "Nimesulide 100mg", salt: "Nimesulide", dosage: "100mg", category: "Analgesic" },
  { name: "Mefenamic Acid 250mg", salt: "Mefenamic Acid", dosage: "250mg", category: "Analgesic" },
  { name: "Etoricoxib 90mg", salt: "Etoricoxib", dosage: "90mg", category: "Analgesic" },
  { name: "Ketorolac 10mg", salt: "Ketorolac", dosage: "10mg", category: "Analgesic" },
  { name: "Ondansetron 4mg", salt: "Ondansetron", dosage: "4mg", category: "Antiemetic" },
  { name: "Domperidone 10mg", salt: "Domperidone", dosage: "10mg", category: "Antiemetic" },
  { name: "Cefixime 200mg", salt: "Cefixime", dosage: "200mg", category: "Antibiotic" },
  { name: "Cefixime 100mg", salt: "Cefixime", dosage: "100mg", category: "Antibiotic" },
  { name: "Taxim 200", salt: "Cefixime", dosage: "200mg", category: "Antibiotic" },
  { name: "Cefuroxime 500mg", salt: "Cefuroxime", dosage: "500mg", category: "Antibiotic" },
  { name: "Cefpodoxime 200mg", salt: "Cefpodoxime", dosage: "200mg", category: "Antibiotic" },
  { name: "Ciprofloxacin 500mg", salt: "Ciprofloxacin", dosage: "500mg", category: "Antibiotic" },
  { name: "Ciprofloxacin 250mg", salt: "Ciprofloxacin", dosage: "250mg", category: "Antibiotic" },
  { name: "Levofloxacin 500mg", salt: "Levofloxacin", dosage: "500mg", category: "Antibiotic" },
  { name: "Ofloxacin 200mg", salt: "Ofloxacin", dosage: "200mg", category: "Antibiotic" },
  { name: "Zenflox 200", salt: "Ofloxacin", dosage: "200mg", category: "Antibiotic" },
  { name: "Norfloxacin 400mg", salt: "Norfloxacin", dosage: "400mg", category: "Antibiotic" },
  { name: "Metronidazole 400mg", salt: "Metronidazole", dosage: "400mg", category: "Antibiotic" },
  { name: "Tinidazole 500mg", salt: "Tinidazole", dosage: "500mg", category: "Antibiotic" },
  { name: "Doxycycline 100mg", salt: "Doxycycline", dosage: "100mg", category: "Antibiotic" },
  { name: "Minocycline 100mg", salt: "Minocycline", dosage: "100mg", category: "Antibiotic" },
  { name: "Clindamycin 300mg", salt: "Clindamycin", dosage: "300mg", category: "Antibiotic" },
  { name: "Linezolid 600mg", salt: "Linezolid", dosage: "600mg", category: "Antibiotic" },
  { name: "Albendazole 400mg", salt: "Albendazole", dosage: "400mg", category: "Anthelmintic" },
  { name: "Ivermectin 12mg", salt: "Ivermectin", dosage: "12mg", category: "Anthelmintic" },
  { name: "Fluconazole 150mg", salt: "Fluconazole", dosage: "150mg", category: "Antifungal" },
  { name: "Montelukast 10mg", salt: "Montelukast", dosage: "10mg", category: "Respiratory" },
  { name: "Montelukast 5mg", salt: "Montelukast", dosage: "5mg", category: "Respiratory" },
  { name: "Montair LC", salt: "Montelukast + Levocetirizine", category: "Respiratory" },
  { name: "Montair 10", salt: "Montelukast", dosage: "10mg", category: "Respiratory" },
  { name: "Salbutamol Inhaler", salt: "Salbutamol", category: "Respiratory" },
  { name: "Asthalin Inhaler", salt: "Salbutamol", category: "Respiratory" },
  { name: "Asthalin 2mg", salt: "Salbutamol", dosage: "2mg", category: "Respiratory" },
  { name: "Budesonide Inhaler", salt: "Budesonide", category: "Respiratory" },
  { name: "Budecort Inhaler", salt: "Budesonide", category: "Respiratory" },
  { name: "Foracort Inhaler", salt: "Budesonide + Formoterol", category: "Respiratory" },
  { name: "Duolin Inhaler", salt: "Levosalbutamol + Ipratropium", category: "Respiratory" },
  { name: "Ambroxol 30mg", salt: "Ambroxol", dosage: "30mg", category: "Respiratory" },
  { name: "Doxofylline 400mg", salt: "Doxofylline", dosage: "400mg", category: "Respiratory" },
  { name: "Thyroxine 50mcg", salt: "Levothyroxine", dosage: "50mcg", category: "Hormonal" },
  { name: "Thyroxine 100mcg", salt: "Levothyroxine", dosage: "100mcg", category: "Hormonal" },
  { name: "Thyronorm 50", salt: "Levothyroxine", dosage: "50mcg", category: "Hormonal" },
  { name: "Prednisolone 10mg", salt: "Prednisolone", dosage: "10mg", category: "Steroid" },
  { name: "Dexamethasone 0.5mg", salt: "Dexamethasone", dosage: "0.5mg", category: "Steroid" },
  { name: "Tramadol 50mg", salt: "Tramadol", dosage: "50mg", category: "Analgesic" },
  { name: "Gabapentin 300mg", salt: "Gabapentin", dosage: "300mg", category: "Neuro" },
  { name: "Pregabalin 75mg", salt: "Pregabalin", dosage: "75mg", category: "Neuro" },
  { name: "Duloxetine 30mg", salt: "Duloxetine", dosage: "30mg", category: "Antidepressant" },
  { name: "Fluoxetine 20mg", salt: "Fluoxetine", dosage: "20mg", category: "Antidepressant" },
  { name: "Sertraline 50mg", salt: "Sertraline", dosage: "50mg", category: "Antidepressant" },
  { name: "Escitalopram 10mg", salt: "Escitalopram", dosage: "10mg", category: "Antidepressant" },
  { name: "Amitriptyline 25mg", salt: "Amitriptyline", dosage: "25mg", category: "Antidepressant" },
  { name: "Clonazepam 0.5mg", salt: "Clonazepam", dosage: "0.5mg", category: "Neuro" },
  { name: "Alprazolam 0.5mg", salt: "Alprazolam", dosage: "0.5mg", category: "Neuro" },
  { name: "Carbamazepine 200mg", salt: "Carbamazepine", dosage: "200mg", category: "Neuro" },
  { name: "Phenytoin 100mg", salt: "Phenytoin", dosage: "100mg", category: "Neuro" },
  { name: "Sodium Valproate 200mg", salt: "Sodium Valproate", dosage: "200mg", category: "Neuro" },
  { name: "Levetiracetam 500mg", salt: "Levetiracetam", dosage: "500mg", category: "Neuro" },
  { name: "Topiramate 25mg", salt: "Topiramate", dosage: "25mg", category: "Neuro" },
  { name: "Lamotrigine 25mg", salt: "Lamotrigine", dosage: "25mg", category: "Neuro" },
  { name: "Levodopa + Carbidopa", salt: "Levodopa + Carbidopa", category: "Neuro" },
  { name: "Ropinirole 0.25mg", salt: "Ropinirole", dosage: "0.25mg", category: "Neuro" },
  { name: "Donepezil 5mg", salt: "Donepezil", dosage: "5mg", category: "Neuro" },
  { name: "Memantine 10mg", salt: "Memantine", dosage: "10mg", category: "Neuro" },
  { name: "Vitamin D3 60K", salt: "Cholecalciferol", dosage: "60000IU", category: "Supplement" },
  { name: "Vitamin D3 1000IU", salt: "Cholecalciferol", dosage: "1000IU", category: "Supplement" },
  { name: "Vitamin B Complex", salt: "Vitamin B Complex", category: "Supplement" },
  { name: "Vitamin C 500mg", salt: "Ascorbic Acid", dosage: "500mg", category: "Supplement" },
  { name: "Limcee 500", salt: "Vitamin C", dosage: "500mg", category: "Supplement" },
  { name: "Zincovit Tablets", salt: "Zinc + Multivitamin", category: "Supplement" },
  { name: "Zincovit Syrup", salt: "Zinc + Multivitamin", category: "Supplement" },
  { name: "Calcium + D3 Tablets", salt: "Calcium Carbonate + Vitamin D3", category: "Supplement" },
  { name: "Shelcal 500", salt: "Calcium Carbonate + Vitamin D3", category: "Supplement" },
  { name: "Calcium Sandoz", salt: "Calcium", category: "Supplement" },
  { name: "Iron + Folic Acid", salt: "Ferrous Ascorbate + Folic Acid", category: "Supplement" },
  {
    name: "Vitamin B12 1500mcg",
    salt: "Methylcobalamin",
    dosage: "1500mcg",
    category: "Supplement",
  },
  {
    name: "Mecobalamin 1500mcg",
    salt: "Methylcobalamin",
    dosage: "1500mcg",
    category: "Supplement",
  },
  { name: "Evion 400", salt: "Vitamin E", dosage: "400mg", category: "Supplement" },
  { name: "Becosules", salt: "Vitamin B Complex + C", category: "Supplement" },
  { name: "Neurobion Forte", salt: "Vitamin B Complex", category: "Supplement" },
  { name: "Paracetamol Syrup 60ml", salt: "Paracetamol", category: "Syrup" },
  { name: "Cough Syrup 100ml", salt: "Expectorant", category: "Syrup" },
  { name: "Benadryl Syrup", salt: "Diphenhydramine + Dextromethorphan", category: "Syrup" },
  { name: "Ascoril Syrup", salt: "Guaifenesin + Salbutamol", category: "Syrup" },
  { name: "Pudin Hara", salt: "Ayurvedic", category: "Ayurvedic" },
  { name: "ORS Powder Sachet", salt: "Oral Rehydration Salts", category: "Rehydration" },
  { name: "ORS Glucose", salt: "Oral Rehydration Salts", category: "Rehydration" },
  { name: "Betadine Solution", salt: "Povidone Iodine", category: "Antiseptic" },
  { name: "Betadine Ointment", salt: "Povidone Iodine", category: "Antiseptic" },
  { name: "Diclofenac Gel", salt: "Diclofenac", category: "Topical" },
  { name: "Volini Gel", salt: "Diclofenac", category: "Topical" },
  { name: "Moov Gel", salt: "Methyl Salicylate", category: "Topical" },
  { name: "Clobetasol Cream", salt: "Clobetasol", category: "Topical" },
  { name: "Mometasone Cream", salt: "Mometasone", category: "Topical" },
  { name: "Hydrocortisone Cream", salt: "Hydrocortisone", category: "Topical" },
  { name: "Soframycin Ointment", salt: "Framycetin", category: "Topical" },
  { name: "Boro Plus", salt: "Antiseptic Cream", category: "Topical" },
  { name: "Digene", salt: "Antacid", category: "Gastro" },
  { name: "Gelusil", salt: "Antacid", category: "Gastro" },
  { name: "Eno", salt: "Sodium Bicarbonate", category: "Gastro" },
  { name: "Enterogermina", salt: "Probiotic", category: "Gastro" },
  { name: "Bifilac", salt: "Probiotic", category: "Gastro" },
  { name: "SofZia Eye Drop", salt: "Carboxymethylcellulose", category: "Eye" },
  { name: "Moisture Drops", salt: "Artificial Tears", category: "Eye" },
  { name: "Ciprofloxacin Eye Drop", salt: "Ciprofloxacin", category: "Eye" },
  { name: "Tobramycin Eye Drop", salt: "Tobramycin", category: "Eye" },
  { name: "Brinzolamide Eye Drop", salt: "Brinzolamide", category: "Eye" },
  { name: "Timolol Eye Drop", salt: "Timolol", category: "Eye" },
];

const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, "");

function diceSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const bigrams = new Map<string, number>();
  for (let i = 0; i < a.length - 1; i++) {
    const pair = a.slice(i, i + 2);
    bigrams.set(pair, (bigrams.get(pair) ?? 0) + 1);
  }
  let common = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const pair = b.slice(i, i + 2);
    const count = bigrams.get(pair) ?? 0;
    if (count > 0) {
      common += 1;
      bigrams.set(pair, count - 1);
    }
  }
  return (2 * common) / (a.length - 1 + b.length - 1);
}

function bestSimilarity(token: string, candidates: string[]): number {
  let best = 0;
  for (const candidate of candidates) {
    const sim = diceSimilarity(token, candidate);
    if (sim > best) best = sim;
  }
  return best;
}

export function matchMedicineInText(text: string, focusText?: string): MedicineEntry | null {
  const textTokens = [
    ...new Set(
      text
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .map(norm)
        .filter((t) => t.length >= 2),
    ),
  ];

  if (textTokens.length === 0) return null;

  const focusTokens = focusText
    ? [
        ...new Set(
          focusText
            .toLowerCase()
            .split(/[^a-z0-9]+/)
            .map(norm)
            .filter((t) => t.length >= 2),
        ),
      ]
    : null;

  let best: { entry: MedicineEntry; score: number } | null = null;

  for (const entry of MEDICINE_DB) {
    const nameTokens = entry.name
      .split(/\s+/)
      .map(norm)
      .filter((t) => t.length >= 2);
    if (nameTokens.length === 0) continue;

    let hits = 0;
    for (const token of nameTokens) {
      const sim = bestSimilarity(token, textTokens);
      if (sim >= 0.8) hits += 1;
      else if (sim >= 0.68) hits += 0.5;
    }

    const ratio = hits / nameTokens.length;
    let score = ratio * 3;

    if (entry.salt) {
      const saltSim = bestSimilarity(norm(entry.salt), textTokens);
      if (saltSim >= 0.85) score += 1;
      else if (saltSim >= 0.7) score += 0.5;
    }
    if (entry.dosage) {
      const dosageNorm = norm(entry.dosage);
      if (textTokens.includes(dosageNorm)) score += 0.7;
    }

    // Bonus when the entry matches the primary medicine-name line — lets a
    // brand name printed on the strip (e.g. "DOLO 650") beat its generic
    // equivalent (e.g. "Paracetamol 650mg") when both appear.
    if (focusTokens) {
      let focusHits = 0;
      for (const token of nameTokens) {
        const sim = bestSimilarity(token, focusTokens);
        if (sim >= 0.8) focusHits += 1;
        else if (sim >= 0.68) focusHits += 0.5;
      }
      score += (focusHits / nameTokens.length) * 2;
    }

    if (ratio >= 0.5 && score >= 2.2 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best?.entry ?? null;
}
