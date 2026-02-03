# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Portfolio demo mode (no Firebase)

This repo was adapted for a portfolio-friendly demo:

- Comments, reviews, and favorites are stored in **localStorage** (read-only demo behavior; no backend required).
- A small amount of sample data is seeded on first load.
- For SPA routing on Vercel, `vercel.json` includes a rewrite rule to always serve `index.html`.

### Run locally

```bash
npm install
npm run dev
```

### Deploy for free (recommended)

**Vercel**
1. Import the repo as a new project.
2. Build is detected automatically (`npm run build`), output is `dist`.
3. After deployment, you can share the Production URL.

If your app uses client-side routes, Vercel will work because of the included rewrite rule in `vercel.json`.
