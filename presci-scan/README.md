# SmartMed AI

Act as a Principal Software Engineer and Full-Stack Architect. Build a production-ready, highly responsive Web Application called "SmartMed AI — AI-Powered Expiry Prevention & Sustainable Pharmacy Management System" built on the PAB (Predict, Act, Block) framework.

---

🛠️ Tech Stack Specification

- Frontend: HTML5, CSS3 (Tailwind CSS Dark Mode Theme), Vanilla JavaScript (ES6+ Modular Scripts)

- Backend Logic & REST APIs: Python 3.10+ with FastAPI Framework

- Database & Authentication: Firebase SDK (Firestore Database & Firebase Auth)

- AI & Vision Features:

  - Client-side OCR using Tesseract.js (Extracting Medicine Name, Batch No, Expiry Date from strip images)

  - Python-based AI Expiry Prediction & Financial Loss Algorithm

- Barcode Scanning: WebRTC Camera Access + ZXing / HTML5-QRCode Library

- Data Visualization & Audio: Chart.js / Recharts (CDN) & Web Audio API (POS Beep System)

---

🎨 Theme & Styling System (Tailwind Dark Theme)

- Background: Dark Slate (#0F172A, #1E293B)

- Valid / Safe Stock: Emerald Green (#10B981)

- Near-Expiry Warning: Amber (#F59E0B)

- Block / Expired Alert: Crimson Red (#EF4444)

- Primary Accent / AI Highlights: Indigo / Electric Teal (#6366F1 / #06B6D4)

---

🔐 1. Authentication & Role-Based Access Control (RBAC)

Implement Firebase Authentication + Firestore User Profiles (`users` collection):

- Registration & Login Screens: Full Name, Email, Password, Mobile Number (for SMS Alerts), Pharmacy Name, Role Selection.

- Roles & Permissions Matrix:

  - 👑 Shop Owner (Admin): Access ALL features (Dashboard, Inventory, AI Prediction, Billing, Alerts, Reports, Settings).

  - 👨‍⚕️ Shop Keeper (Staff): RESTRICTED ACCESS. Can ONLY access Billing Counter / POS, Scan Medicine, Read-Only Inventory, and Live Alerts. Redirect if they try to open AI Predictions or Financial Reports.

---

📄 2. Detailed Page Specifications & Core Features

A. 🎓 First-Time User Onboarding & Interactive Video Demos

- Platform Tour Demo Video Modal: First-time users or operators clicking "Website Guide / Demo" will see an interactive modal explaining:

  1. How to navigate the platform.

  2. How the PAB Framework works.

  3. How to use Barcode Scanning vs Manual Type-to-Bill.

  4. How automatic dual-alerts protect the business.

- POS & Stock Entry Tutorial Card: A built-in visual tutorial card explaining proper camera alignment for barcode scanning, lighting tips, and manual batch fallback.

B. 📊 Dashboard View

- Metric Cards: Total SKU Count, Total Inventory Value (₹), Near-Expiry Count (Amber), Expired Count (Red).

- Donut Chart: Stock Breakdown (Safe vs Near-Expiry vs Expired).

- High-Risk FEFO Urgency Table: Top 5 items facing immediate expiry.

C. 📦 Inventory Management

- Columns: Medicine Name | Batch No | Stock Received Timestamp (DD/MM/YYYY HH:MM AM/PM) | Expiry Date | Quantity | Price (₹) | Status Badge | Actions.

- Filters & Sort: Real-time search, Category Filter, Status Filter, and Sorting by Recently Received Stock.

D. 📸 Stock Entry (3 Input Methods)

1. Tab 1: Live Webcam Barcode Scanner with explicit "Capture & Scan" trigger.

2. Tab 2: AI OCR Image Upload powered by Tesseract.js to scan medicine strips.

3. Tab 3: Bulk CSV Upload with sample template download.

- Auto-Timestamp: Automatically record `stock_received_timestamp` when saving to Firestore.

E. 💳 Billing Counter / POS Scanner (CORE BLOCK & HYBRID ENTRY)

- Hybrid Billing Input:

  1. Live Optical Barcode Viewfinder.

  2. Manual Search & Bill Fallback: Input field to manually type Medicine Name or Batch Number and add directly to the cart.

- Real-Time PAB Verification Engine:

  - 🛑 IF EXPIRED:

    1. Play loud error audio alert (880Hz frequency beep).

    2. Display BIG RED BLOCK MODAL: "🚫 BILLING BLOCKED! This medicine is EXPIRED. Sale Cannot Proceed."

    3. FEFO Auto-Substitution: "Recommended Alternate Batch: [Batch B] - X units available."

    4. Trigger immediate alert log for both Shop Owner and Shop Keeper.

  - ⚠️ IF NEAR-EXPIRY (<= 30 Days):

    1. Play soft warning sound.

    2. Auto-apply dynamic AI clearance discount (30% or 50% off).

  - ✅ IF VALID: Add item directly to the active billing cart.

- Print-Ready Invoice Generator: Calculate Subtotal, GST (12%), Discounts, and Total Payable (₹).

F. 🤖 AI Expiry Prediction Engine (Python FastAPI Backend)

- Python Algorithm:

  Predicted Unsold Qty = Current Stock - ((Avg Monthly Sales / 30) * Days to Expiry)

  Potential Financial Loss (₹) = Predicted Unsold Qty * Price per Unit

- Dynamic Action Engine:

  - Expiry <= 30 Days -> Auto-suggest 30% Discount

  - Expiry <= 15 Days -> Auto-suggest 50% Discount ("Clearance Sale")

  - One-click button: "Apply AI Discount Strategy to Inventory".

G. 🚨 Automatic Multi-Role Alerts & Notification System

- Dual Automated Alerts Trigger:

  1. Shop Owner Alert: Automated SMS/Email log when stock enters the 30-day window or when an expired sale is blocked (Focus: Financial Loss Mitigation).

  2. Shop Keeper Alert: Real-time visual banner on the POS screen + audio alert when an expired item is scanned (Focus: Safety & Counter Clearance).

- Alert Logs Table: Timestamped audit trail of all generated alerts.

---

📊 3. Pre-populated Mock Database (25+ Products)

Seed Firestore / local JavaScript state with 25+ realistic medicines (Paracetamol 650mg, Amoxicillin 500mg, Vitamin D3, Cetirizine, Azithromycin, Dolo 650, Metformin, Syrups, etc.) across various expiry states with dynamic timestamps.

---

🛠️ Deliverables Required

1. Clean, production-ready HTML5, Tailwind CSS, JavaScript frontend code integrated with Firebase SDK.

2. Complete Python FastAPI backend scripts for AI Expiry Prediction and Barcode Verification endpoints.

3. Fully functional Hybrid Billing (Barcode Scan + Manual Search/Type).

4. Onboarding Video / Demo Modals for Website Usage & Barcode Scanning.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
