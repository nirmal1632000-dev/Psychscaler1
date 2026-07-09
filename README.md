# PsychScaler — Clinical Assessment Toolkit

**Privacy-first, browser-based tool for scoring and interpreting psychological & psychiatric scales.**

Designed for hospital/clinic use. All data stays on your device.

## For Hospital Staff — Quick Start

### 1. Open the App
- Go to the deployed link (or open `index.html` locally for now).
- No installation required.

### 2. Start a New Case
1. Click **"Configure Active Case"** on the landing page.
2. Fill in:
   - Patient name / ID
   - Age, Gender, DOB
   - Case ID / File number
   - Clinician name
   - Assessment date
3. Click **Save & Continue**

This information will appear in all reports.

### 3. Administer Scales
- Go to **Dashboard**
- Choose a category:
  - **Psychiatric Rating Scales** (PHQ-9, GAD-7, BDI, HAM-D, YMRS, etc.)
  - **Cognitive & Intellectual** (MMSE, WAIS, MISIC, BKT, DST)
  - **Personality Inventories** (MMPI-2, MCMI-III, Draw-a-Person)
  - **Projective Assistants** (Rorschach, TAT/CAT)
- Click any scale to open it.
- Fill in the items.
- Click **Save Report** when done.

### 4. View & Export Reports
- Go to **Reports** (from sidebar or landing).
- You will see a compiled **Clinical Assessment Dossier**.
- Use the buttons at the top:
  - **Download Full Session (JSON)** → Save everything for records / backup
  - **Print / Save as PDF** → Best for printing or sharing with doctors

### 5. Backup Your Work
**Important**: Data is stored in your browser.
- Always download the JSON backup before closing the browser or clearing data.
- You can restore a backup later (feature coming in next update).

## Supported Scales (Current)

**Psychiatric**
- PHQ-9, GAD-7, BDI-II, HAM-A, HAM-D, YMRS, Y-BOCS, ASRS, AUDIT, PSYRATS, Conners, OSCARS, WAI, etc.

**Cognitive / Intelligence**
- MMSE, WAIS-IV / WISC-V profiler, MISIC, BKT (Binet-Kamat), DST

**Personality & Projective**
- MMPI-2 Plotter, MCMI-III, DAP, Rorschach (Exner-style), TAT/CAT

## Important Notes for Clinical Use

- This tool **calculates scores and generates interpretations** based on standard published criteria.
- Always use clinical judgment. The interpretations are aids, not replacements for professional assessment.
- All calculations run 100% locally in your browser — no data is sent anywhere.

## For IT / Deployment

- Static React app built with Vite.
- Deploy to Vercel, Netlify, or any static hosting.
- Build command: `npm run build`
- Output folder: `dist`

## Development (for maintainers)

```bash
npm install
npm run dev
```

---

**Version**: 0.1 — Hospital Pilot  
**Contact**: [Add your team contact here]

*All patient data remains on the clinician's device.*
