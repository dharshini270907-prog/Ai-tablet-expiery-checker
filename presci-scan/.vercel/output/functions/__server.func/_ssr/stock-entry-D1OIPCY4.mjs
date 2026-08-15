import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useSmartMed, s as formatStamp, u as statusOf } from "./router-DNXHUjnj.mjs";
import { D as Download, E as FileSpreadsheet, f as ScanText, n as Upload } from "../_libs/lucide-react.mjs";
import { s as ScanTutorialCard, t as Button } from "./DemoModal-B7pTYoCn.mjs";
import { t as AppShell } from "./AppShell-B6tSKcW8.mjs";
import { r as playSuccessBeep, t as CameraScanner } from "./audio-DuQezuKq.mjs";
import { t as Input } from "./input-DJ-55TZt.mjs";
import { a as TabsTrigger, i as TabsList, n as Tabs, r as TabsContent, t as Label } from "./tabs-Cq2pPm0t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-entry-D1OIPCY4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MEDICINE_DB = [
	{
		name: "Paracetamol 650mg",
		salt: "Paracetamol",
		dosage: "650mg",
		category: "Analgesic"
	},
	{
		name: "Paracetamol 500mg",
		salt: "Paracetamol",
		dosage: "500mg",
		category: "Analgesic"
	},
	{
		name: "Dolo 650",
		salt: "Paracetamol",
		dosage: "650mg",
		category: "Analgesic"
	},
	{
		name: "Crocin 650",
		salt: "Paracetamol",
		dosage: "650mg",
		category: "Analgesic"
	},
	{
		name: "Calpol 650",
		salt: "Paracetamol",
		dosage: "650mg",
		category: "Analgesic"
	},
	{
		name: "Amoxicillin 500mg",
		salt: "Amoxicillin",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Amoxicillin 250mg",
		salt: "Amoxicillin",
		dosage: "250mg",
		category: "Antibiotic"
	},
	{
		name: "Azithromycin 500mg",
		salt: "Azithromycin",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Azithromycin 250mg",
		salt: "Azithromycin",
		dosage: "250mg",
		category: "Antibiotic"
	},
	{
		name: "Azithral 500",
		salt: "Azithromycin",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Zithromax 500",
		salt: "Azithromycin",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Augmentin 625",
		salt: "Amoxicillin + Clavulanic Acid",
		dosage: "625mg",
		category: "Antibiotic"
	},
	{
		name: "Amoxiclav 625",
		salt: "Amoxicillin + Clavulanic Acid",
		dosage: "625mg",
		category: "Antibiotic"
	},
	{
		name: "Moxikind CV 625",
		salt: "Amoxicillin + Clavulanic Acid",
		dosage: "625mg",
		category: "Antibiotic"
	},
	{
		name: "Cetirizine 10mg",
		salt: "Cetirizine",
		dosage: "10mg",
		category: "Antihistamine"
	},
	{
		name: "Levocetirizine 5mg",
		salt: "Levocetirizine",
		dosage: "5mg",
		category: "Antihistamine"
	},
	{
		name: "Loratadine 10mg",
		salt: "Loratadine",
		dosage: "10mg",
		category: "Antihistamine"
	},
	{
		name: "Fexofenadine 120mg",
		salt: "Fexofenadine",
		dosage: "120mg",
		category: "Antihistamine"
	},
	{
		name: "Allegra 120",
		salt: "Fexofenadine",
		dosage: "120mg",
		category: "Antihistamine"
	},
	{
		name: "Metformin 500mg",
		salt: "Metformin",
		dosage: "500mg",
		category: "Antidiabetic"
	},
	{
		name: "Metformin 850mg",
		salt: "Metformin",
		dosage: "850mg",
		category: "Antidiabetic"
	},
	{
		name: "Metformin 1000mg",
		salt: "Metformin",
		dosage: "1000mg",
		category: "Antidiabetic"
	},
	{
		name: "Glycomet 500",
		salt: "Metformin",
		dosage: "500mg",
		category: "Antidiabetic"
	},
	{
		name: "Glimepiride 1mg",
		salt: "Glimepiride",
		dosage: "1mg",
		category: "Antidiabetic"
	},
	{
		name: "Glimepiride 2mg",
		salt: "Glimepiride",
		dosage: "2mg",
		category: "Antidiabetic"
	},
	{
		name: "Glimer 2",
		salt: "Glimepiride",
		dosage: "2mg",
		category: "Antidiabetic"
	},
	{
		name: "Dapagliflozin 10mg",
		salt: "Dapagliflozin",
		dosage: "10mg",
		category: "Antidiabetic"
	},
	{
		name: "Empagliflozin 10mg",
		salt: "Empagliflozin",
		dosage: "10mg",
		category: "Antidiabetic"
	},
	{
		name: "Sitagliptin 100mg",
		salt: "Sitagliptin",
		dosage: "100mg",
		category: "Antidiabetic"
	},
	{
		name: "Januvia 100",
		salt: "Sitagliptin",
		dosage: "100mg",
		category: "Antidiabetic"
	},
	{
		name: "Insulin Glargine Pen",
		salt: "Insulin Glargine",
		category: "Antidiabetic"
	},
	{
		name: "Atorvastatin 10mg",
		salt: "Atorvastatin",
		dosage: "10mg",
		category: "Cardiac"
	},
	{
		name: "Atorvastatin 20mg",
		salt: "Atorvastatin",
		dosage: "20mg",
		category: "Cardiac"
	},
	{
		name: "Atorvastatin 40mg",
		salt: "Atorvastatin",
		dosage: "40mg",
		category: "Cardiac"
	},
	{
		name: "Atorlip 10",
		salt: "Atorvastatin",
		dosage: "10mg",
		category: "Cardiac"
	},
	{
		name: "Rosuvastatin 10mg",
		salt: "Rosuvastatin",
		dosage: "10mg",
		category: "Cardiac"
	},
	{
		name: "Rosuvastatin 20mg",
		salt: "Rosuvastatin",
		dosage: "20mg",
		category: "Cardiac"
	},
	{
		name: "Rozucor 10",
		salt: "Rosuvastatin",
		dosage: "10mg",
		category: "Cardiac"
	},
	{
		name: "Amlodipine 5mg",
		salt: "Amlodipine",
		dosage: "5mg",
		category: "Cardiac"
	},
	{
		name: "Amlodipine 10mg",
		salt: "Amlodipine",
		dosage: "10mg",
		category: "Cardiac"
	},
	{
		name: "Telmisartan 40mg",
		salt: "Telmisartan",
		dosage: "40mg",
		category: "Cardiac"
	},
	{
		name: "Losartan 50mg",
		salt: "Losartan",
		dosage: "50mg",
		category: "Cardiac"
	},
	{
		name: "Losartan 25mg",
		salt: "Losartan",
		dosage: "25mg",
		category: "Cardiac"
	},
	{
		name: "Clopidogrel 75mg",
		salt: "Clopidogrel",
		dosage: "75mg",
		category: "Cardiac"
	},
	{
		name: "Aspirin 75mg",
		salt: "Aspirin",
		dosage: "75mg",
		category: "Cardiac"
	},
	{
		name: "Ecosprin 75",
		salt: "Aspirin",
		dosage: "75mg",
		category: "Cardiac"
	},
	{
		name: "Atenolol 50mg",
		salt: "Atenolol",
		dosage: "50mg",
		category: "Cardiac"
	},
	{
		name: "Bisoprolol 5mg",
		salt: "Bisoprolol",
		dosage: "5mg",
		category: "Cardiac"
	},
	{
		name: "Pantoprazole 40mg",
		salt: "Pantoprazole",
		dosage: "40mg",
		category: "Gastro"
	},
	{
		name: "Pan 40",
		salt: "Pantoprazole",
		dosage: "40mg",
		category: "Gastro"
	},
	{
		name: "Omeprazole 20mg",
		salt: "Omeprazole",
		dosage: "20mg",
		category: "Gastro"
	},
	{
		name: "Esomeprazole 40mg",
		salt: "Esomeprazole",
		dosage: "40mg",
		category: "Gastro"
	},
	{
		name: "Nexpro 40",
		salt: "Esomeprazole",
		dosage: "40mg",
		category: "Gastro"
	},
	{
		name: "Ranitidine 150mg",
		salt: "Ranitidine",
		dosage: "150mg",
		category: "Gastro"
	},
	{
		name: "Rantac 150",
		salt: "Ranitidine",
		dosage: "150mg",
		category: "Gastro"
	},
	{
		name: "Ibuprofen 400mg",
		salt: "Ibuprofen",
		dosage: "400mg",
		category: "Analgesic"
	},
	{
		name: "Ibuprofen 200mg",
		salt: "Ibuprofen",
		dosage: "200mg",
		category: "Analgesic"
	},
	{
		name: "Combiflam",
		salt: "Ibuprofen + Paracetamol",
		dosage: "400mg",
		category: "Analgesic"
	},
	{
		name: "Diclofenac 50mg",
		salt: "Diclofenac",
		dosage: "50mg",
		category: "Analgesic"
	},
	{
		name: "Aceclofenac 100mg",
		salt: "Aceclofenac",
		dosage: "100mg",
		category: "Analgesic"
	},
	{
		name: "Nimesulide 100mg",
		salt: "Nimesulide",
		dosage: "100mg",
		category: "Analgesic"
	},
	{
		name: "Mefenamic Acid 250mg",
		salt: "Mefenamic Acid",
		dosage: "250mg",
		category: "Analgesic"
	},
	{
		name: "Etoricoxib 90mg",
		salt: "Etoricoxib",
		dosage: "90mg",
		category: "Analgesic"
	},
	{
		name: "Ketorolac 10mg",
		salt: "Ketorolac",
		dosage: "10mg",
		category: "Analgesic"
	},
	{
		name: "Ondansetron 4mg",
		salt: "Ondansetron",
		dosage: "4mg",
		category: "Antiemetic"
	},
	{
		name: "Domperidone 10mg",
		salt: "Domperidone",
		dosage: "10mg",
		category: "Antiemetic"
	},
	{
		name: "Cefixime 200mg",
		salt: "Cefixime",
		dosage: "200mg",
		category: "Antibiotic"
	},
	{
		name: "Cefixime 100mg",
		salt: "Cefixime",
		dosage: "100mg",
		category: "Antibiotic"
	},
	{
		name: "Taxim 200",
		salt: "Cefixime",
		dosage: "200mg",
		category: "Antibiotic"
	},
	{
		name: "Cefuroxime 500mg",
		salt: "Cefuroxime",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Cefpodoxime 200mg",
		salt: "Cefpodoxime",
		dosage: "200mg",
		category: "Antibiotic"
	},
	{
		name: "Ciprofloxacin 500mg",
		salt: "Ciprofloxacin",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Ciprofloxacin 250mg",
		salt: "Ciprofloxacin",
		dosage: "250mg",
		category: "Antibiotic"
	},
	{
		name: "Levofloxacin 500mg",
		salt: "Levofloxacin",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Ofloxacin 200mg",
		salt: "Ofloxacin",
		dosage: "200mg",
		category: "Antibiotic"
	},
	{
		name: "Zenflox 200",
		salt: "Ofloxacin",
		dosage: "200mg",
		category: "Antibiotic"
	},
	{
		name: "Norfloxacin 400mg",
		salt: "Norfloxacin",
		dosage: "400mg",
		category: "Antibiotic"
	},
	{
		name: "Metronidazole 400mg",
		salt: "Metronidazole",
		dosage: "400mg",
		category: "Antibiotic"
	},
	{
		name: "Tinidazole 500mg",
		salt: "Tinidazole",
		dosage: "500mg",
		category: "Antibiotic"
	},
	{
		name: "Doxycycline 100mg",
		salt: "Doxycycline",
		dosage: "100mg",
		category: "Antibiotic"
	},
	{
		name: "Minocycline 100mg",
		salt: "Minocycline",
		dosage: "100mg",
		category: "Antibiotic"
	},
	{
		name: "Clindamycin 300mg",
		salt: "Clindamycin",
		dosage: "300mg",
		category: "Antibiotic"
	},
	{
		name: "Linezolid 600mg",
		salt: "Linezolid",
		dosage: "600mg",
		category: "Antibiotic"
	},
	{
		name: "Albendazole 400mg",
		salt: "Albendazole",
		dosage: "400mg",
		category: "Anthelmintic"
	},
	{
		name: "Ivermectin 12mg",
		salt: "Ivermectin",
		dosage: "12mg",
		category: "Anthelmintic"
	},
	{
		name: "Fluconazole 150mg",
		salt: "Fluconazole",
		dosage: "150mg",
		category: "Antifungal"
	},
	{
		name: "Montelukast 10mg",
		salt: "Montelukast",
		dosage: "10mg",
		category: "Respiratory"
	},
	{
		name: "Montelukast 5mg",
		salt: "Montelukast",
		dosage: "5mg",
		category: "Respiratory"
	},
	{
		name: "Montair LC",
		salt: "Montelukast + Levocetirizine",
		category: "Respiratory"
	},
	{
		name: "Montair 10",
		salt: "Montelukast",
		dosage: "10mg",
		category: "Respiratory"
	},
	{
		name: "Salbutamol Inhaler",
		salt: "Salbutamol",
		category: "Respiratory"
	},
	{
		name: "Asthalin Inhaler",
		salt: "Salbutamol",
		category: "Respiratory"
	},
	{
		name: "Asthalin 2mg",
		salt: "Salbutamol",
		dosage: "2mg",
		category: "Respiratory"
	},
	{
		name: "Budesonide Inhaler",
		salt: "Budesonide",
		category: "Respiratory"
	},
	{
		name: "Budecort Inhaler",
		salt: "Budesonide",
		category: "Respiratory"
	},
	{
		name: "Foracort Inhaler",
		salt: "Budesonide + Formoterol",
		category: "Respiratory"
	},
	{
		name: "Duolin Inhaler",
		salt: "Levosalbutamol + Ipratropium",
		category: "Respiratory"
	},
	{
		name: "Ambroxol 30mg",
		salt: "Ambroxol",
		dosage: "30mg",
		category: "Respiratory"
	},
	{
		name: "Doxofylline 400mg",
		salt: "Doxofylline",
		dosage: "400mg",
		category: "Respiratory"
	},
	{
		name: "Thyroxine 50mcg",
		salt: "Levothyroxine",
		dosage: "50mcg",
		category: "Hormonal"
	},
	{
		name: "Thyroxine 100mcg",
		salt: "Levothyroxine",
		dosage: "100mcg",
		category: "Hormonal"
	},
	{
		name: "Thyronorm 50",
		salt: "Levothyroxine",
		dosage: "50mcg",
		category: "Hormonal"
	},
	{
		name: "Prednisolone 10mg",
		salt: "Prednisolone",
		dosage: "10mg",
		category: "Steroid"
	},
	{
		name: "Dexamethasone 0.5mg",
		salt: "Dexamethasone",
		dosage: "0.5mg",
		category: "Steroid"
	},
	{
		name: "Tramadol 50mg",
		salt: "Tramadol",
		dosage: "50mg",
		category: "Analgesic"
	},
	{
		name: "Gabapentin 300mg",
		salt: "Gabapentin",
		dosage: "300mg",
		category: "Neuro"
	},
	{
		name: "Pregabalin 75mg",
		salt: "Pregabalin",
		dosage: "75mg",
		category: "Neuro"
	},
	{
		name: "Duloxetine 30mg",
		salt: "Duloxetine",
		dosage: "30mg",
		category: "Antidepressant"
	},
	{
		name: "Fluoxetine 20mg",
		salt: "Fluoxetine",
		dosage: "20mg",
		category: "Antidepressant"
	},
	{
		name: "Sertraline 50mg",
		salt: "Sertraline",
		dosage: "50mg",
		category: "Antidepressant"
	},
	{
		name: "Escitalopram 10mg",
		salt: "Escitalopram",
		dosage: "10mg",
		category: "Antidepressant"
	},
	{
		name: "Amitriptyline 25mg",
		salt: "Amitriptyline",
		dosage: "25mg",
		category: "Antidepressant"
	},
	{
		name: "Clonazepam 0.5mg",
		salt: "Clonazepam",
		dosage: "0.5mg",
		category: "Neuro"
	},
	{
		name: "Alprazolam 0.5mg",
		salt: "Alprazolam",
		dosage: "0.5mg",
		category: "Neuro"
	},
	{
		name: "Carbamazepine 200mg",
		salt: "Carbamazepine",
		dosage: "200mg",
		category: "Neuro"
	},
	{
		name: "Phenytoin 100mg",
		salt: "Phenytoin",
		dosage: "100mg",
		category: "Neuro"
	},
	{
		name: "Sodium Valproate 200mg",
		salt: "Sodium Valproate",
		dosage: "200mg",
		category: "Neuro"
	},
	{
		name: "Levetiracetam 500mg",
		salt: "Levetiracetam",
		dosage: "500mg",
		category: "Neuro"
	},
	{
		name: "Topiramate 25mg",
		salt: "Topiramate",
		dosage: "25mg",
		category: "Neuro"
	},
	{
		name: "Lamotrigine 25mg",
		salt: "Lamotrigine",
		dosage: "25mg",
		category: "Neuro"
	},
	{
		name: "Levodopa + Carbidopa",
		salt: "Levodopa + Carbidopa",
		category: "Neuro"
	},
	{
		name: "Ropinirole 0.25mg",
		salt: "Ropinirole",
		dosage: "0.25mg",
		category: "Neuro"
	},
	{
		name: "Donepezil 5mg",
		salt: "Donepezil",
		dosage: "5mg",
		category: "Neuro"
	},
	{
		name: "Memantine 10mg",
		salt: "Memantine",
		dosage: "10mg",
		category: "Neuro"
	},
	{
		name: "Vitamin D3 60K",
		salt: "Cholecalciferol",
		dosage: "60000IU",
		category: "Supplement"
	},
	{
		name: "Vitamin D3 1000IU",
		salt: "Cholecalciferol",
		dosage: "1000IU",
		category: "Supplement"
	},
	{
		name: "Vitamin B Complex",
		salt: "Vitamin B Complex",
		category: "Supplement"
	},
	{
		name: "Vitamin C 500mg",
		salt: "Ascorbic Acid",
		dosage: "500mg",
		category: "Supplement"
	},
	{
		name: "Limcee 500",
		salt: "Vitamin C",
		dosage: "500mg",
		category: "Supplement"
	},
	{
		name: "Zincovit Tablets",
		salt: "Zinc + Multivitamin",
		category: "Supplement"
	},
	{
		name: "Zincovit Syrup",
		salt: "Zinc + Multivitamin",
		category: "Supplement"
	},
	{
		name: "Calcium + D3 Tablets",
		salt: "Calcium Carbonate + Vitamin D3",
		category: "Supplement"
	},
	{
		name: "Shelcal 500",
		salt: "Calcium Carbonate + Vitamin D3",
		category: "Supplement"
	},
	{
		name: "Calcium Sandoz",
		salt: "Calcium",
		category: "Supplement"
	},
	{
		name: "Iron + Folic Acid",
		salt: "Ferrous Ascorbate + Folic Acid",
		category: "Supplement"
	},
	{
		name: "Vitamin B12 1500mcg",
		salt: "Methylcobalamin",
		dosage: "1500mcg",
		category: "Supplement"
	},
	{
		name: "Mecobalamin 1500mcg",
		salt: "Methylcobalamin",
		dosage: "1500mcg",
		category: "Supplement"
	},
	{
		name: "Evion 400",
		salt: "Vitamin E",
		dosage: "400mg",
		category: "Supplement"
	},
	{
		name: "Becosules",
		salt: "Vitamin B Complex + C",
		category: "Supplement"
	},
	{
		name: "Neurobion Forte",
		salt: "Vitamin B Complex",
		category: "Supplement"
	},
	{
		name: "Paracetamol Syrup 60ml",
		salt: "Paracetamol",
		category: "Syrup"
	},
	{
		name: "Cough Syrup 100ml",
		salt: "Expectorant",
		category: "Syrup"
	},
	{
		name: "Benadryl Syrup",
		salt: "Diphenhydramine + Dextromethorphan",
		category: "Syrup"
	},
	{
		name: "Ascoril Syrup",
		salt: "Guaifenesin + Salbutamol",
		category: "Syrup"
	},
	{
		name: "Pudin Hara",
		salt: "Ayurvedic",
		category: "Ayurvedic"
	},
	{
		name: "ORS Powder Sachet",
		salt: "Oral Rehydration Salts",
		category: "Rehydration"
	},
	{
		name: "ORS Glucose",
		salt: "Oral Rehydration Salts",
		category: "Rehydration"
	},
	{
		name: "Betadine Solution",
		salt: "Povidone Iodine",
		category: "Antiseptic"
	},
	{
		name: "Betadine Ointment",
		salt: "Povidone Iodine",
		category: "Antiseptic"
	},
	{
		name: "Diclofenac Gel",
		salt: "Diclofenac",
		category: "Topical"
	},
	{
		name: "Volini Gel",
		salt: "Diclofenac",
		category: "Topical"
	},
	{
		name: "Moov Gel",
		salt: "Methyl Salicylate",
		category: "Topical"
	},
	{
		name: "Clobetasol Cream",
		salt: "Clobetasol",
		category: "Topical"
	},
	{
		name: "Mometasone Cream",
		salt: "Mometasone",
		category: "Topical"
	},
	{
		name: "Hydrocortisone Cream",
		salt: "Hydrocortisone",
		category: "Topical"
	},
	{
		name: "Soframycin Ointment",
		salt: "Framycetin",
		category: "Topical"
	},
	{
		name: "Boro Plus",
		salt: "Antiseptic Cream",
		category: "Topical"
	},
	{
		name: "Digene",
		salt: "Antacid",
		category: "Gastro"
	},
	{
		name: "Gelusil",
		salt: "Antacid",
		category: "Gastro"
	},
	{
		name: "Eno",
		salt: "Sodium Bicarbonate",
		category: "Gastro"
	},
	{
		name: "Enterogermina",
		salt: "Probiotic",
		category: "Gastro"
	},
	{
		name: "Bifilac",
		salt: "Probiotic",
		category: "Gastro"
	},
	{
		name: "SofZia Eye Drop",
		salt: "Carboxymethylcellulose",
		category: "Eye"
	},
	{
		name: "Moisture Drops",
		salt: "Artificial Tears",
		category: "Eye"
	},
	{
		name: "Ciprofloxacin Eye Drop",
		salt: "Ciprofloxacin",
		category: "Eye"
	},
	{
		name: "Tobramycin Eye Drop",
		salt: "Tobramycin",
		category: "Eye"
	},
	{
		name: "Brinzolamide Eye Drop",
		salt: "Brinzolamide",
		category: "Eye"
	},
	{
		name: "Timolol Eye Drop",
		salt: "Timolol",
		category: "Eye"
	}
];
var norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
function diceSimilarity(a, b) {
	if (a === b) return 1;
	if (a.length < 2 || b.length < 2) return 0;
	const bigrams = /* @__PURE__ */ new Map();
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
	return 2 * common / (a.length - 1 + b.length - 1);
}
function bestSimilarity(token, candidates) {
	let best = 0;
	for (const candidate of candidates) {
		const sim = diceSimilarity(token, candidate);
		if (sim > best) best = sim;
	}
	return best;
}
function matchMedicineInText(text, focusText) {
	const textTokens = [...new Set(text.toLowerCase().split(/[^a-z0-9]+/).map(norm).filter((t) => t.length >= 2))];
	if (textTokens.length === 0) return null;
	const focusTokens = focusText ? [...new Set(focusText.toLowerCase().split(/[^a-z0-9]+/).map(norm).filter((t) => t.length >= 2))] : null;
	let best = null;
	for (const entry of MEDICINE_DB) {
		const nameTokens = entry.name.split(/\s+/).map(norm).filter((t) => t.length >= 2);
		if (nameTokens.length === 0) continue;
		let hits = 0;
		for (const token of nameTokens) {
			const sim = bestSimilarity(token, textTokens);
			if (sim >= .8) hits += 1;
			else if (sim >= .68) hits += .5;
		}
		const ratio = hits / nameTokens.length;
		let score = ratio * 3;
		if (entry.salt) {
			const saltSim = bestSimilarity(norm(entry.salt), textTokens);
			if (saltSim >= .85) score += 1;
			else if (saltSim >= .7) score += .5;
		}
		if (entry.dosage) {
			const dosageNorm = norm(entry.dosage);
			if (textTokens.includes(dosageNorm)) score += .7;
		}
		if (focusTokens) {
			let focusHits = 0;
			for (const token of nameTokens) {
				const sim = bestSimilarity(token, focusTokens);
				if (sim >= .8) focusHits += 1;
				else if (sim >= .68) focusHits += .5;
			}
			score += focusHits / nameTokens.length * 2;
		}
		if (ratio >= .5 && score >= 2.2 && (!best || score > best.score)) best = {
			entry,
			score
		};
	}
	return best?.entry ?? null;
}
var ALNUM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/._:- ";
var DATE_CHARS = "0123456789/.-: ";
var MAX_DIMENSION = 2400;
var TARGET_MIN_WIDTH = 1600;
var workerPromise = null;
async function getWorker() {
	if (!workerPromise) workerPromise = (async () => {
		const { default: Tesseract } = await import("../_libs/tesseract.js.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
		return Tesseract.createWorker("eng", 1, { logger: (msg) => {
			const m = msg;
			if (m.status === "recognizing text") {
				const pct = Math.round((m.progress ?? 0) * 100);
				globalThis.dispatchEvent(new CustomEvent("smartmed:ocr-progress", { detail: pct }));
			}
		} });
	})();
	return workerPromise;
}
function buildIntegral(values, width, height) {
	const stride = width + 1;
	const sum = new Float64Array(stride * (height + 1));
	const sumSq = new Float64Array(stride * (height + 1));
	for (let y = 0; y < height; y++) {
		let rowSum = 0;
		let rowSumSq = 0;
		const row = y * width;
		for (let x = 0; x < width; x++) {
			const v = values[row + x] ?? 0;
			rowSum += v;
			rowSumSq += v * v;
			const p = (y + 1) * stride + x + 1;
			sum[p] = (sum[p - stride] ?? 0) + rowSum;
			sumSq[p] = (sumSq[p - stride] ?? 0) + rowSumSq;
		}
	}
	return {
		sum,
		sumSq,
		stride
	};
}
function boxSum(int, x0, y0, x1, y1, square) {
	const { stride, sum, sumSq } = int;
	const grid = square ? sumSq : sum;
	return (grid[y1 * stride + x1] ?? 0) - (grid[y0 * stride + x1] ?? 0) - (grid[y1 * stride + x0] ?? 0) + (grid[y0 * stride + x0] ?? 0);
}
/** Sauvola adaptive threshold — handles glare, shadows and uneven lighting far
* better than a global Otsu threshold for photos of shiny medicine strips. */
function sauvolaThreshold(values, width, height) {
	const out = new Uint8Array(width * height);
	const integral = buildIntegral(values, width, height);
	const win = Math.min(40, Math.max(15, Math.round(Math.min(width, height) / 18)));
	const k = .22;
	const R = 128;
	for (let y = 0; y < height; y++) {
		const y0 = Math.max(0, y - win);
		const y1 = Math.min(height, y + win + 1);
		for (let x = 0; x < width; x++) {
			const x0 = Math.max(0, x - win);
			const x1 = Math.min(width, x + win + 1);
			const area = (x1 - x0) * (y1 - y0);
			const s = boxSum(integral, x0, y0, x1, y1, false);
			const sq = boxSum(integral, x0, y0, x1, y1, true);
			const mean = s / area;
			const variance = Math.max(0, sq / area - mean * mean);
			const threshold = mean * (1 + k * (Math.sqrt(variance) / R - 1));
			out[y * width + x] = (values[y * width + x] ?? 0) > threshold ? 255 : 0;
		}
	}
	return out;
}
async function preprocessImage(file) {
	const bitmap = await createImageBitmap(file);
	try {
		const scale = Math.min(MAX_DIMENSION / bitmap.width, Math.max(1, TARGET_MIN_WIDTH / bitmap.width), 3);
		const width = Math.max(1, Math.round(bitmap.width * scale));
		const height = Math.max(1, Math.round(bitmap.height * scale));
		const gray = document.createElement("canvas");
		gray.width = width;
		gray.height = height;
		const gctx = gray.getContext("2d", { willReadFrequently: true });
		if (!gctx) throw new Error("Canvas 2D context unavailable");
		gctx.imageSmoothingEnabled = true;
		gctx.imageSmoothingQuality = "high";
		gctx.drawImage(bitmap, 0, 0, width, height);
		const imageData = gctx.getImageData(0, 0, width, height);
		const px = imageData.data;
		const luminance = new Float32Array(width * height);
		let min = 255;
		let max = 0;
		for (let i = 0; i < width * height; i++) {
			const r = px[i * 4] ?? 0;
			const g = px[i * 4 + 1] ?? 0;
			const b = px[i * 4 + 2] ?? 0;
			const v = .299 * r + .587 * g + .114 * b;
			luminance[i] = v;
			if (v < min) min = v;
			if (v > max) max = v;
		}
		const range = Math.max(max - min, 1);
		const stretched = new Float32Array(width * height);
		for (let i = 0; i < width * height; i++) stretched[i] = ((luminance[i] ?? 0) - min) / range * 255;
		const sharp = new Float32Array(width * height);
		const amount = 1.1;
		for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
			const i = y * width + x;
			const c = stretched[i] ?? 0;
			const up = stretched[y > 0 ? i - width : i] ?? c;
			const down = stretched[y < height - 1 ? i + width : i] ?? c;
			const left = stretched[x > 0 ? i - 1 : i] ?? c;
			const right = stretched[x < width - 1 ? i + 1 : i] ?? c;
			const blur = (up + down + left + right + c * 4) / 8;
			sharp[i] = Math.max(0, Math.min(255, c + amount * (c - blur)));
		}
		for (let i = 0; i < width * height; i++) {
			const v = sharp[i] ?? 0;
			px[i * 4] = px[i * 4 + 1] = px[i * 4 + 2] = v;
			px[i * 4 + 3] = 255;
		}
		gctx.putImageData(imageData, 0, 0);
		const bin = document.createElement("canvas");
		bin.width = width;
		bin.height = height;
		const bctx = bin.getContext("2d", { willReadFrequently: true });
		if (!bctx) throw new Error("Canvas 2D context unavailable");
		let binary = sauvolaThreshold(stretched, width, height);
		let dark = 0;
		for (let i = 0; i < binary.length; i++) if ((binary[i] ?? 0) < 128) dark++;
		if (dark > binary.length * .5) {
			const flipped = new Uint8Array(binary.length);
			for (let i = 0; i < binary.length; i++) flipped[i] = 255 - (binary[i] ?? 0);
			binary = flipped;
		}
		const bdata = bctx.createImageData(width, height);
		const bpx = bdata.data;
		for (let i = 0; i < width * height; i++) {
			const v = binary[i] ?? 255;
			bpx[i * 4] = bpx[i * 4 + 1] = bpx[i * 4 + 2] = v;
			bpx[i * 4 + 3] = 255;
		}
		bctx.putImageData(bdata, 0, 0);
		return {
			gray,
			bin
		};
	} finally {
		bitmap.close();
	}
}
async function runPass(worker, image, options) {
	const { data } = await worker.recognize(image, options);
	return {
		text: data.text ?? "",
		confidence: data.confidence ?? 0
	};
}
async function recognizeStrip(file) {
	const { gray, bin } = await preprocessImage(file);
	const worker = await getWorker();
	const [fullPass, fullBinPass, codePass, datePass] = await Promise.all([
		runPass(worker, gray, {
			psm: "6",
			preserve_interword_spaces: "1",
			rotateAuto: true
		}),
		runPass(worker, bin, {
			psm: "6",
			preserve_interword_spaces: "1",
			rotateAuto: true
		}),
		runPass(worker, bin, {
			psm: "11",
			tessedit_char_whitelist: ALNUM_CHARS
		}),
		runPass(worker, bin, {
			psm: "11",
			tessedit_char_whitelist: DATE_CHARS
		})
	]);
	return parseStripResult(fullPass, fullBinPass, codePass, datePass);
}
var EXP_LABEL_RE = /(?:exp(?:iry)?)\s*[:.-]?\s*(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})\b/i;
var PLAIN_DATE_RE = /\b(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})\b/g;
var MFG_LABEL_RE = /(?:mfg|mfd|manufactured|manuf\.?)\s*[:.-]?\s*(\d{1,2})\s*[/.-]\s*(\d{2}|\d{4})\b/i;
var BATCH_LABEL_RE = /(?:^|[|;\s])(?:m\.?\s*b\.?|b(?:atch)?)\s*\.?\s*n[o°№.]?\s*\.?\s*[:=]?\s*([A-Z0-9][A-Z0-9/._-]{2,19})/i;
var DOSAGE_RE = /\b(\d{1,4}(?:\.\d+)?)\s*(mg|mcg|µg|g|gm|ml|iu|units?|tablets?|tabs?|capsules?|caps?)\b/i;
var MFG_NAME_RE = /(?:mfd|mfg|manufactured|made)\s*(?:by|at)?\s*[:.]?\s*([A-Za-z][A-Za-z0-9&.'\- ]{3,}?)(?=\s+(?:pvt|private|limited|ltd|india)|$)/i;
var NAME_TAIL_RE = /\s*(?:tablets?|tabs?|capsules?|caps?|ip|bp|usp|strip|pack|film[- ]?coated|sugar[- ]?coated|drops|syrup|injection|gel|cream|ointment|solution|suspension|infusion)\s*$/i;
var STRONG_SKIP_RE = /^(?:batch|b\.?\s*n[o°]?\.?|mfg|mfd|exp|mrp|price|lic|gst|reg|ph\.?|n[o°]?\.?)\b/i;
function normalizeDate(month, year) {
	const m = Number(month);
	if (!Number.isInteger(m) || m < 1 || m > 12) return null;
	const y = year.length === 2 ? 2e3 + Number(year) : Number(year);
	if (!Number.isInteger(y) || y < 2e3 || y > 2100) return null;
	const lastDay = new Date(y, m, 0).getDate();
	return `${y}-${String(m).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
}
function collectDates(text) {
	const out = [];
	for (const match of text.matchAll(PLAIN_DATE_RE)) {
		const normalized = normalizeDate(match[1] ?? "", match[2] ?? "");
		if (normalized) out.push(normalized);
	}
	return out;
}
function cleanName(line) {
	let s = line;
	const dosage = DOSAGE_RE.exec(s);
	if (dosage?.index) s = s.slice(0, dosage.index);
	s = s.replace(NAME_TAIL_RE, "");
	s = s.replace(/\s+/g, " ").trim().replace(/^[^\w]+|[^\w]+$/g, "");
	return s;
}
function guessMedicineName(lines) {
	let best = null;
	for (const line of lines) {
		if (line.length < 4 || line.length > 60) continue;
		if (STRONG_SKIP_RE.test(line)) continue;
		if (DOSAGE_RE.test(line)) continue;
		if (/^\d+$/.test(line) || !/[a-z]/i.test(line)) continue;
		if (PLAIN_DATE_RE.test(line)) continue;
		const words = line.split(/\s+/);
		const score = words.filter((w) => /^[A-Z][A-Za-z0-9]*$/.test(w) && w.length > 1).length + (words.length >= 2 ? 1 : 0);
		if (!best || score > best.score) best = {
			score,
			line
		};
	}
	return best?.line ?? null;
}
function extractManufacturer(text) {
	const m = MFG_NAME_RE.exec(text);
	if (!m?.[1]) return null;
	const cut = m[1].replace(/^[\s:.-]+/, "").replace(/[\s:.-]+$/, "").split(/\s+(?:regd|regd\.|country|imported|plot|address|website|www|ph|tel)/i)[0];
	return cut ? cut.trim().replace(/[.\s]+$/, "") : null;
}
function parseStripResult(full, fullBin, code, dates) {
	const fullText = full.text.trim();
	const fullBinText = fullBin.text.trim();
	const codeText = code.text.trim();
	const dateText = dates.text.trim();
	const allText = [
		fullText,
		fullBinText,
		codeText,
		dateText
	].filter((t) => t.length > 0).join("\n");
	let batchNumber = null;
	for (const source of [
		codeText,
		fullText,
		fullBinText
	]) {
		const m = BATCH_LABEL_RE.exec(source);
		if (m?.[1]) {
			batchNumber = m[1].trim().replace(/[.:]+$/, "");
			break;
		}
	}
	if (!batchNumber) {
		const fallback = /\b([A-Z][A-Z0-9]{2,}-[0-9]{2,}|[A-Z0-9]{3,}[0-9]{2,}[A-Z0-9]*)\b/.exec(codeText);
		if (fallback?.[1] && /[0-9]/.test(fallback[1])) batchNumber = fallback[1];
	}
	let expiryDate = null;
	const expMatch = EXP_LABEL_RE.exec(`${dateText}\n${fullText}\n${fullBinText}`);
	if (expMatch) expiryDate = normalizeDate(expMatch[1] ?? "", expMatch[2] ?? "");
	if (!expiryDate) {
		const candidates = [...new Set(collectDates(`${dateText}\n${fullText}\n${fullBinText}`))].sort();
		expiryDate = candidates[candidates.length - 1] ?? null;
	}
	let mfgDate = null;
	const mfgMatch = MFG_LABEL_RE.exec(`${fullText}\n${fullBinText}`);
	if (mfgMatch) mfgDate = normalizeDate(mfgMatch[1] ?? "", mfgMatch[2] ?? "");
	let dosage = null;
	const dosageMatch = DOSAGE_RE.exec(`${fullText}\n${fullBinText}`);
	if (dosageMatch) dosage = `${dosageMatch[1]}${(dosageMatch[2] ?? "").toLowerCase()}`;
	const lines = (fullText.length >= fullBinText.length ? fullText : fullBinText).split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
	let medicineName = null;
	let saltComposition = null;
	const dosageLineIdx = lines.findIndex((l) => DOSAGE_RE.test(l));
	if (dosageLineIdx >= 0) {
		medicineName = cleanName(lines[dosageLineIdx] ?? "");
		if (medicineName) {
			const compLine = lines.find((l, i) => i !== dosageLineIdx && (/(?:each|composition|contains|comp\.|salt)/i.test(l) || DOSAGE_RE.test(l)));
			if (compLine) saltComposition = cleanName(compLine) || null;
		}
	}
	if (!medicineName) medicineName = guessMedicineName(lines);
	const dictionaryHit = matchMedicineInText(allText, [medicineName, saltComposition].filter(Boolean).join(" ") || void 0);
	if (dictionaryHit) {
		medicineName = dictionaryHit.name;
		saltComposition = dictionaryHit.salt ?? saltComposition;
		dosage = dictionaryHit.dosage ?? dosage;
	}
	const manufacturer = extractManufacturer(`${fullText}\n${fullBinText}`);
	const foundScore = (batchNumber ? 1 : 0) + (expiryDate ? 1 : 0) + (medicineName ? 1 : 0);
	const adjusted = Math.max(full.confidence, fullBin.confidence, code.confidence) + (foundScore >= 2 ? 15 : 0) + (batchNumber && expiryDate ? 15 : 0);
	return {
		rawText: fullText || fullBinText || codeText || dateText,
		confidence: adjusted >= 70 && batchNumber && expiryDate ? "High" : adjusted >= 45 || batchNumber || expiryDate ? "Medium" : "Low",
		medicineName,
		saltComposition,
		batchNumber,
		expiryDate,
		mfgDate,
		dosage,
		manufacturer
	};
}
var CSV_TEMPLATE = "name,batchNo,barcode,category,expiryDate,quantity,price,avgMonthlySales\nParacetamol 650mg,PC650-NEW1,8901234567,Analgesic,2027-06-30,200,2.40,180\nCetirizine 10mg,CTZ10-NEW2,8901234568,Antihistamine,2026-11-15,150,1.80,140\n";
var emptyDraft = {
	name: "",
	batchNo: "",
	barcode: "",
	category: "",
	expiryDate: "",
	quantity: "",
	price: "",
	avgMonthlySales: ""
};
function StockEntryPage() {
	const { addMedicine, inventory, logAlert } = useSmartMed();
	const [draft, setDraft] = (0, import_react.useState)(emptyDraft);
	const [ocrBusy, setOcrBusy] = (0, import_react.useState)(false);
	const [ocrResult, setOcrResult] = (0, import_react.useState)(null);
	const [ocrProgress, setOcrProgress] = (0, import_react.useState)(0);
	const set = (k, v) => setDraft((d) => ({
		...d,
		[k]: v
	}));
	const handleDecode = (value) => {
		if (!value) {
			toast.error("No barcode detected. Improve lighting or use manual entry below.");
			return;
		}
		playSuccessBeep();
		const known = inventory.find((m) => m.barcode === value);
		if (known) {
			setDraft({
				name: known.name,
				batchNo: "",
				barcode: known.barcode,
				category: known.category,
				expiryDate: "",
				quantity: "",
				price: String(known.price),
				avgMonthlySales: String(known.avgMonthlySales)
			});
			toast.success(`Matched ${known.name} — enter the new batch & expiry.`);
		} else {
			set("barcode", value);
			toast.success(`Barcode ${value} captured — complete the details.`);
		}
	};
	const runOcr = async (file) => {
		setOcrBusy(true);
		setOcrResult(null);
		setOcrProgress(0);
		const listener = (e) => {
			const detail = e.detail;
			if (typeof detail === "number") setOcrProgress(detail);
		};
		globalThis.addEventListener("smartmed:ocr-progress", listener);
		try {
			const result = await recognizeStrip(file);
			setOcrResult(result);
			const draftUpdate = {};
			if (result.medicineName) draftUpdate.name = result.medicineName;
			if (result.batchNumber) draftUpdate.batchNo = result.batchNumber;
			if (result.expiryDate) draftUpdate.expiryDate = result.expiryDate;
			setDraft((d) => ({
				...d,
				...draftUpdate
			}));
			if (!result.batchNumber && !result.expiryDate) toast.warning("No batch/expiry detected — check the image or enter manually.");
			else toast.success(`OCR complete · ${result.confidence} confidence — verify the fields.`);
		} catch {
			toast.error("OCR failed on this image. Try a sharper, well-lit photo.");
		} finally {
			globalThis.removeEventListener("smartmed:ocr-progress", listener);
			setOcrBusy(false);
		}
	};
	const saveDraft = (e) => {
		e.preventDefault();
		const created = addMedicine({
			name: draft.name.trim(),
			batchNo: draft.batchNo.trim(),
			barcode: draft.barcode.trim() || String(Math.floor(89e8 + Math.random() * 99999999)),
			category: draft.category.trim() || "General",
			expiryDate: new Date(draft.expiryDate).toISOString(),
			quantity: Number(draft.quantity),
			price: Number(draft.price),
			avgMonthlySales: Number(draft.avgMonthlySales || 0)
		});
		const st = statusOf(created);
		if (st !== "safe") logAlert({
			audience: "owner",
			channel: "SMS",
			severity: st === "expired" ? "critical" : "warning",
			medicine: created.name,
			batchNo: created.batchNo,
			message: st === "expired" ? "Expired batch received into stock — quarantine and raise a supplier return." : "Received batch already inside the 30-day expiry window — clearance strategy advised."
		});
		toast.success(`${created.name} saved · received ${formatStamp(created.receivedAt)}`);
		setDraft(emptyDraft);
	};
	const importCsv = async (file) => {
		const [, ...body] = (await file.text()).split(/\r?\n/).filter((l) => l.trim());
		let ok = 0;
		for (const line of body) {
			const [name, batchNo, barcode, category, expiryDate, quantity, price, avg] = line.split(",");
			if (!name || !batchNo || !expiryDate) continue;
			const parsed = new Date(expiryDate.trim());
			if (Number.isNaN(parsed.getTime())) continue;
			addMedicine({
				name: name.trim(),
				batchNo: batchNo.trim(),
				barcode: (barcode ?? "").trim(),
				category: (category ?? "General").trim(),
				expiryDate: parsed.toISOString(),
				quantity: Number(quantity ?? 0),
				price: Number(price ?? 0),
				avgMonthlySales: Number(avg ?? 0)
			});
			ok += 1;
		}
		toast[ok ? "success" : "error"](ok ? `${ok} batches imported with live timestamps.` : "No valid rows found in this CSV.");
	};
	const downloadTemplate = () => {
		const url = URL.createObjectURL(new Blob([CSV_TEMPLATE], { type: "text/csv" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "smartmed-stock-template.csv";
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		ownerOnly: true,
		title: "Stock Entry",
		subtitle: "Three input methods — every save stamps an automatic stock-received timestamp.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 xl:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel p-5 xl:col-span-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "scan",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "scan",
									className: "flex-1",
									children: "Barcode Scanner"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "ocr",
									className: "flex-1",
									children: "AI OCR Upload"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "csv",
									className: "flex-1",
									children: "Bulk CSV"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "scan",
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraScanner, { onDecode: handleDecode })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "ocr",
							className: "mt-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm",
									children: "Upload a photo of the medicine strip. Multi-pass client-side OCR (Tesseract.js) auto-enhances the image and extracts the medicine name, batch number, expiry date, dosage and manufacturer."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "ocr-file",
									className: "hover:bg-secondary/40 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-8 text-center transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanText, { className: "text-accent size-6" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: ocrBusy ? `Reading strip… ${ocrProgress}%` : "Click to upload strip image"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-xs",
											children: "PNG / JPG · sharp, glare-free"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "ocr-file",
									type: "file",
									accept: "image/*",
									className: "hidden",
									disabled: ocrBusy,
									onChange: (e) => {
										const f = e.target.files?.[0];
										if (f) runOcr(f);
										e.target.value = "";
									}
								}),
								ocrBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-secondary/40 h-1.5 overflow-hidden rounded-full border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-accent h-full rounded-full transition-[width] duration-200",
										style: { width: `${Math.max(8, ocrProgress)}%` }
									})
								}),
								ocrResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-secondary/40 space-y-2 rounded-lg border border-border p-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Extracted fields"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `rounded-full px-2 py-0.5 font-semibold uppercase ${ocrResult.confidence === "High" ? "bg-emerald-500/20 text-emerald-400" : ocrResult.confidence === "Medium" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}`,
												children: ocrResult.confidence
											})]
										}),
										[
											["Medicine", ocrResult.medicineName],
											["Composition", ocrResult.saltComposition],
											["Dosage", ocrResult.dosage],
											["Batch No.", ocrResult.batchNumber],
											["Expiry", ocrResult.expiryDate],
											["Mfg date", ocrResult.mfgDate],
											["Manufacturer", ocrResult.manufacturer]
										].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground shrink-0",
												children: label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-right font-medium break-all",
												children: value ?? "—"
											})]
										}, label)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
											className: "group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
												className: "text-muted-foreground cursor-pointer select-none",
												children: "Raw OCR text"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
												className: "mt-1 max-h-40 overflow-auto rounded-md bg-black/20 p-2 whitespace-pre-wrap",
												children: ocrResult.rawText
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "csv",
							className: "mt-5 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground text-sm",
									children: "Import a supplier invoice sheet. Columns: name, batchNo, barcode, category, expiryDate (YYYY-MM-DD), quantity, price, avgMonthlySales."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											onClick: downloadTemplate,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Download sample template"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "csv-file",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 cursor-pointer items-center gap-2 rounded-md px-4 text-sm font-medium",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Upload CSV"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "csv-file",
											type: "file",
											accept: ".csv,text/csv",
											className: "hidden",
											onChange: (e) => {
												const f = e.target.files?.[0];
												if (f) importCsv(f);
											}
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "size-4" }), " Rows with an invalid expiry date are skipped."]
								})
							]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "panel space-y-4 p-5 xl:col-span-2",
				onSubmit: saveDraft,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Confirm & save batch"
					}),
					[
						[
							"name",
							"Medicine name",
							"text"
						],
						[
							"batchNo",
							"Batch number",
							"text"
						],
						[
							"barcode",
							"Barcode",
							"text"
						],
						[
							"category",
							"Category",
							"text"
						],
						[
							"expiryDate",
							"Expiry date",
							"date"
						],
						[
							"quantity",
							"Quantity",
							"number"
						],
						[
							"price",
							"Price per unit (₹)",
							"number"
						],
						[
							"avgMonthlySales",
							"Avg monthly sales",
							"number"
						]
					].map(([key, label, type]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `f-${key}`,
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `f-${key}`,
							type,
							step: type === "number" ? "any" : void 0,
							required: key !== "barcode" && key !== "avgMonthlySales" && key !== "category",
							value: draft[key],
							onChange: (e) => set(key, e.target.value),
							maxLength: 80
						})]
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: "Save to inventory"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground text-xs",
						children: [
							"Saved at: ",
							formatStamp((/* @__PURE__ */ new Date()).toISOString()),
							" (auto-stamped on submit)"
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanTutorialCard, {})
		})]
	});
}
//#endregion
export { StockEntryPage as component };
