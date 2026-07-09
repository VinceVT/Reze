# Deploying REZE to Vercel

The app lives in the `reze/` subdirectory of this repo, so the only non-default
setting Vercel needs is the **Root Directory**.

## Option A — connect the GitHub repo (recommended)

1. Go to https://vercel.com/new and import `Anoop-Gunawardhena/CSE118Project`
   (install the Vercel GitHub App on the repo if prompted).
2. When configuring the project, set **Root Directory** to `reze`.
   Framework preset auto-detects as Next.js — leave build settings as-is.
3. Deploy. Every push to the connected branch redeploys automatically;
   other branches get preview URLs.

## Option B — one-off deploy from your machine (no GitHub needed)

```bash
cd reze
npm install
npx vercel        # log in, accept defaults; run from inside reze/
npx vercel --prod # promote to production
```

No environment variables are required — the site is fully static
(all routes prerender; cart and waitlist are client-side).
