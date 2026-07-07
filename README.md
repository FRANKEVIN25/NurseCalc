<!--
  Suggested GitHub repo description:
  "Mobile-first clinical calculator for nurses — drug doses, dose-by-weight, IV drip rates, dilutions and unit conversion. React + Vite."
  Suggested topics: react, vite, healthcare, medical-calculator, nursing, pwa
-->

# NurseCalc 💉

**Mobile-first clinical calculator for nursing professionals.** Fast, offline-friendly calculations for the operations nurses perform dozens of times per shift — with history and favorites so frequent calculations are always one tap away.

## Calculators included

- **Dose calculator** — required volume from prescribed dose and available concentration
- **Dose by weight** — weight-based dosing (mg/kg), essential in pediatrics
- **IV drip rate** — drops/min and mL/h from volume and infusion time
- **Solutions & dilutions** — concentration and dilution calculations
- **Unit converter** — quick conversions between clinical units

## App features

- 📱 Mobile-first UI with bottom navigation, designed to be used one-handed at the point of care
- 🕘 **History** — the last 50 calculations, automatically saved
- ⭐ **Favorites** — pin the calculators you use most
- 👤 Profile screen and clean splash experience

## Tech stack

React 18 · Vite · CSS (mobile-first, app-shell layout)

State is kept in memory with React hooks — no backend required, which keeps the app instant and usable without connectivity.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Disclaimer

NurseCalc is a support tool for professionals. Every calculation must be verified against institutional protocols before administration — this app does not replace clinical judgment.

## Author

**Frank Jáuregui** — [LinkedIn](https://linkedin.com/in/frank-jauregui) · [GitHub](https://github.com/FRANKEVIN25)
